import compose from '@goa/compose'
import session from '@goa/session'
import Keygrip from '@goa/cookies/src/Keygrip'
import cors from '@goa/cors'
import serve from '../modules/koa-static'
import Mount from '../modules/koa-mount'
import compress from '../modules/koa-compress'
import { Z_SYNC_FLUSH } from 'zlib'

const map = {
  // session: setupSession,
  // multer: setupMulter,
  // csrf: setupCsrf,
  // compress: setupCompress,
  // bodyparser: setupBodyParser,
  // checkauth: setupCheckAuth,
  // logger: setupLogger,
  /**
   * @param {_goa.Application} app
   * @param {_idio.KoaStaticConfig} config
   * @param {_idio.StaticOptions} options
   */
  'static'(app, config, {
    root = [],
    maxage,
    mount,
  }) {
    const roots = Array.isArray(root) ? root : [root]
    const m = roots.map((r) => {
      const fn = serve(r, {
        maxage,
        ...config,
      })
      return fn
    })
    const c = compose(m)
    if (mount) return Mount(mount, c)
    return c
  },
  /**
   * @param {_goa.Application} app
   * @param {_idio.KoaCompressConfig} config
   * @param {_idio.CompressOptions} options
   */
  'compress'(app, config, {
    threshold = 1024,
  }) {
    const fn = compress({
      threshold,
      flush: Z_SYNC_FLUSH,
      ...config,
    })
    return fn
  },
  /**
   * The session middleware.
   * @param {_goa.Application} app
   * @param {_idio.KoaSessionConfig} config
   * @param {_idio.SessionOptions} options
   */
  'session'(app, config, { keys }) {
    if (!(keys instanceof Keygrip) && !Array.isArray(keys)) {
      throw new Error('Keys must be an array or an instance of Keygrip / child classes.')
    }
    app.keys = keys
    const ses = session(app, config)
    return ses
  },
  /**
   * The CORS middleware.
   * @param {_goa.Application} app
   * @param {_goa.CorsConfig} config
   * @param {_idio.CorsOptions} options
   */
  'cors'(app, config, { origin }) {
    const o = Array.isArray(origin) ? (ctx) => {
      const oh = ctx.get('Origin')
      const found = origin.find(a => a == oh)
      return found
    } : origin
    const fn = cors({
      origin: o,
      ...config,
    })
    return fn
  },
  // frontend: setupFrontend,
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
  /** @type {Object.<string, !_goa.Middleware>} */
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
 * @typedef {import('..').StaticOptions} _idio.StaticOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').CompressOptions} _idio.CompressOptions
 */

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').SessionOptions} _idio.SessionOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').KoaSessionConfig} _idio.KoaSessionConfig
 */

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').CorsOptions} _idio.CorsOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').CorsConfig} _goa.CorsConfig
 */

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').KoaStaticConfig} _idio.KoaStaticConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').KoaCompressConfig} _idio.KoaCompressConfig
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