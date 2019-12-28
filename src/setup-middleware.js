import compose from '@goa/compose'
import session from '@goa/session'
import Keygrip from '@goa/cookies/src/Keygrip'
import cors from '@goa/cors'
import frontend from '@idio/frontend'
import FormData from '@multipart/form-data'
import serve from '../modules/koa-static'
import Mount from '../modules/koa-mount'
import compress from '@goa/compress'
import Debug from '@idio/debug'
import { constants } from 'zlib'

const debug = Debug('idio')

const proxyFD = (original) => {
  /** @type {!_idio.Middleware} */
  async function middleware(ctx, next) {
    if (ctx.req.file) ctx.file = ctx.req.file
    if (ctx.req.files) ctx.files = ctx.req.files
    if (ctx.req.body) ctx.request.body = ctx.req.body
    await next()
  }
  return compose([original, middleware])
}

const map = {
  // multer: setupMulter,
  // csrf: setupCsrf,
  // bodyparser: setupBodyParser,
  // checkauth: setupCheckAuth,
  // logger: setupLogger,
  /**
   * @param {!_goa.Application} app
   * @param {!Object} _
   * @param {!_idio.StaticOptions} options
   */
  'static'(app, _, options) {
    const {
      root = [],
      mount,
      ...rest
    } = options
    if (!Array.isArray(root)) {
      const fn = serve(root, /** @type {_idio.StaticConfig} */ (rest))
      if (mount) return Mount(mount, fn)
      else return fn
    }
    const m = root.map((r) => {
      const fn = serve(r, /** @type {_idio.StaticConfig} */ ({ ...rest }))
      return fn
    })
    const c = compose(m)
    if (mount) return Mount(mount, c)
    return c
  },
  /**
   * @param {!_goa.Application} app
   * @param {!Object} _
   * @param {!_idio.CompressOptions} options
   */
  'compress'(app, _, options) {
    const fn = compress({
      flush: constants.Z_SYNC_FLUSH,
      ...options,
    })
    return fn
  },
  /**
   * The session middleware.
   * @param {!_goa.Application} app
   * @param {!Object} _
   * @param {!_idio.SessionOptions} options
   */
  'session'(app, _, options) {
    let { keys, keygrip, algorithm, ...rest } = options
    if (keys && !Array.isArray(keys)) throw new Error('session: Keys must be an array.')
    if (algorithm) {
      if (!keys || !(0 in keys))
        throw new Error('To create a Keygrip instance with custom algorithm, keys must be provided.')
      keygrip = new Keygrip(keys, algorithm)
      debug('Created Keygrip instance with %s algorithm', algorithm)
    }
    const config = /** @type {!_idio.SessionConfig} */ (rest)
    if (config.signed !== false && !keygrip) {
      if (!keys || !(0 in keys))
        throw new Error('Session keys are signed by default, unless you set signed=false, you must provide an array with keys.')
    }
    if (keygrip) debug('session: Setting a Keygrip instance on the app')
    else if (keys) debug('session: Setting an array of keys of length %s on the app', keys.length)
    else debug('session: the cookies won\'t be signed as no keys are provided.')

    app.keys = keygrip || keys
    const ses = session(config)
    return ses
  },
  /**
   * The CORS middleware.
   * @param {!_goa.Application} app
   * @param {!Object} _
   * @param {!_idio.CorsOptions} options
   */
  'cors'(app, _, options) {
    const { origin, ...rest } = options

    const o = Array.isArray(origin) ? (ctx) => {
      const oh = ctx.get('Origin')
      const found = origin.find(a => a == oh)
      return found
    } : origin

    const fn = cors({
      origin: o,
      ...rest,
    })
    return fn
  },
  /**
   * The Form Data middleware.
   * @param {!_goa.Application} app
   * @param {_multipart.FormDataConfig} config
   * @param {_idio.FormDataOptions} options
   */
  'form'(app, config, options) {
    // todo check options to return middleware
    class FD extends FormData {
      any() {
        return proxyFD(super.any())
      }
      array(...args) {
        return proxyFD(super.array(...args))
      }
      fields(...args) {
        return proxyFD(super.fields(...args))
      }
      none(...args) {
        return proxyFD(super.none(...args))
      }
      single(...args) {
        return proxyFD(super.single(...args))
      }
    }
    const f = new FD(config)
    return f
  },
  /**
   * The Front End middleware.
   * @param {!_goa.Application} app
   * @param {!Object} _
   * @param {_idio.FrontEndOptions} options
   */
  'frontend'(app, _, options) {
    const config = /** @type {_idio.FrontEndConfig} */ (options)
    const f = frontend(config)
    return f
  },
}

/**
 * Initialise the middleware function, either using the middleware constructors from the bundle, or a custom one.
 * @param {string} name The name of the middleware.
 * @param {!_idio.ConfigItem} conf The item from the middleware config.
 * @param {!_goa.Application} app The application instance.
 */
async function initMiddleware(name, conf, app) {
  if (typeof conf == 'function') {
    const c = conf
    app.use(c)
    return c
  }
  const { use, config = {}, middlewareConstructor,
    ...options } = conf

  /** @type {!_idio.MiddlewareConstructor} */
  let fn
  if (name in map) {
    fn = map[name]
  } else if (middlewareConstructor) {
    fn = middlewareConstructor
    if (typeof fn != 'function') {
      throw new Error(`Expecting a function in the "middlewareConstructor" of the ${name} middleware.`)
    }
  } else {
    throw new Error(`Unknown middleware config item "${name}". Either specify one from the idio bundle, or pass the "middlewareConstructor" property.`)
  }
  const res = await fn(app, config, options)

  if (use) app.use(res)
  return res
}

/**
 * @param {!_idio.MiddlewareConfig} middlewareConfig
 * @param {!_goa.Application} app
 */
export default async function setupMiddleware(middlewareConfig, app) {
  /** @type {!_idio.ConfiguredMiddleware} */
  const res = await Object.keys(middlewareConfig)
    .reduce(async (acc, name) => {
      acc = await acc
      const conf = middlewareConfig[name]
      let installed
      if (Array.isArray(conf)) {
        const p = conf.map(async (c) => {
          await initMiddleware(name, c, app)
        })
        installed = await Promise.all(p)
      } else {
        installed = await initMiddleware(name, conf, app)
      }
      return {
        ...acc,
        [name]: installed,
      }
    }, {})
  return res
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/goa').Application} _goa.Application
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/goa').Middleware} _goa.Middleware
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').Middleware} _idio.Middleware
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').StaticOptions} _idio.StaticOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/options').CompressOptions} _idio.CompressOptions
 */

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/options').SessionOptions} _idio.SessionOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/options').SessionConfig} _idio.SessionConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/options').CorsOptions} _idio.CorsOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').MiddlewareConfig} _idio.MiddlewareConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').ConfigItem} _idio.ConfigItem
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').MiddlewareConstructor} _idio.MiddlewareConstructor
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').FormDataConfig} _multipart.FormDataConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').FormDataOptions} _idio.FormDataOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').ConfiguredMiddleware} _idio.ConfiguredMiddleware
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/options').FrontEndOptions} _idio.FrontEndOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/options').FrontEndConfig} _idio.FrontEndConfig
 */