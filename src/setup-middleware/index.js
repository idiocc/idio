import compose from '@goa/compose'
import cors from '@goa/cors'
import serve from '../../modules/koa-static'
import Mount from '../../modules/koa-mount'
import compress from '@goa/compress'
import github from '@idio/github'
import { constants } from 'zlib'
import { collect } from 'catchment'
import session from './session'
import form from './form'
import jsonErrors from './json-errors'
import csrfCheck from './csrf-check'
import makeNeoluddite from './neoluddite'
import frontend from './front-end'
import logarithm from 'logarithm'

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
  'session': session,
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
  'form': form,
  'frontend': frontend,
  'csrfCheck': csrfCheck,
  'jsonErrors': jsonErrors,
  /**
   * Logarithm middleware.
   * @param {!_goa.Application} app
   * @param {!Object} _
   * @param {!_idio.LogarithmOptions} options
   */
  'logarithm'(app, _, options) {
    const l = logarithm(options)
    return l
  },
  /**
   * Parse JSON body.
   */
  'jsonBody'() {
    /**
     * @type {_idio.Middleware}
     */
    async function jsonBody(ctx, next) {
      if (!ctx.is('json')) {
        return next()
      }
      let body = await collect(ctx.req)
      try {
        body = JSON.parse(body)
      } catch (err) {
        ctx.throw(400, 'Could not parse JSON.')
      }
      ctx.request.body = /** @type {Object} */ (body)
      return next()
    }
    return jsonBody
  },
  /**
   * GitHub OAuth.
   * @param {!_goa.Application} app
   * @param {!Object} _
   * @param {_idio.GitHubOptions} options
   * @param {!_idio.ConfiguredMiddleware} acc
   */
  'github'(app, _, options, acc) {
    if (!acc.session) throw new Error('You need to configure session before GitHub middleware.')
    let { path, paths, redirectPath, scope, ...rest } = options
    if (paths && !redirectPath) throw new Error('When giving multiple paths, the redirect path is also required.')
    if (!paths) paths = { [path]: scope }
    Object.entries(paths).forEach(([p, s]) => {
      github(app, {
        path: p,
        scope: s,
        redirectPath,
        ...rest,
        session: acc.session,
      })
    })
  },
}

/**
 * Initialise the middleware function, either using the middleware constructors from the bundle, or a custom one.
 * @param {string} name The name of the middleware.
 * @param {!_idio.ConfigItem} conf The item from the middleware config.
 * @param {!_goa.Application} app The application instance.
 * @param {!_idio.ConfiguredMiddleware} acc Currently configured middleware.
 */
async function initMiddleware(name, conf, app, acc, _options = {}) {
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
  const res = await fn(app, config, options, acc, _options)

  if (use) app.use(res)
  return res
}

/**
 * @param {!_idio.MiddlewareConfig} middlewareConfig
 * @param {!_idio.Application} app
 */
export default async function setupMiddleware(middlewareConfig, app, _options = {}) {
  const { neoluddite, ...rest } = middlewareConfig
  if (neoluddite) {
    const { app: a, env, key, host = 'https://neoluddite.dev' } = neoluddite
    if (!key) throw new Error('key is expected for neoluddite integration.')
    app.use(makeNeoluddite(a, env, host, key))
  }

  /** @type {!_idio.ConfiguredMiddleware} */
  const res = await Object.keys(rest)
    .reduce(async (acc, name) => {
      acc = await acc
      const conf = middlewareConfig[name]
      let installed
      if (Array.isArray(conf)) {
        const p = conf.map(async (c) => {
          return await initMiddleware(name, c, app, acc, _options)
        })
        installed = await Promise.all(p)
      } else {
        installed = await initMiddleware(name, conf, app, acc, _options)
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
 * @typedef {import('../..').Application} _idio.Application
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/goa').Middleware} _goa.Middleware
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').Middleware} _idio.Middleware
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').StaticOptions} _idio.StaticOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types/options').CompressOptions} _idio.CompressOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types/options').CorsOptions} _idio.CorsOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').MiddlewareConfig} _idio.MiddlewareConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').ConfigItem} _idio.ConfigItem
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').MiddlewareConstructor} _idio.MiddlewareConstructor
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').ConfiguredMiddleware} _idio.ConfiguredMiddleware
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types/options').GitHubOptions} _idio.GitHubOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types/options').LogarithmOptions} _idio.LogarithmOptions
 */