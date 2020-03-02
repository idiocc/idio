import compose from '@goa/compose'
import cors from '@goa/cors'
import frontend from '@idio/frontend'
import serve from '../../modules/koa-static'
import Mount from '../../modules/koa-mount'
import compress from '@goa/compress'
import github from '@idio/github'
import { constants } from 'zlib'
import cleanStack from '@artdeco/clean-stack'
import rqt from 'rqt'
import { collect } from 'catchment'
import session from './session'
import form from './form'

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
  /**
   * CSRF check. todo: add header validation
   * @param {!_goa.Application} app
   * @param {!Object} _
   * @param {_idio.CsrfCheckOptions} options
   */
  'csrfCheck'(app, _, options) {
    /**
     * @type {_idio.Middleware}
     */
    function csrfCheck(ctx, next) {
      const { body = true, query = true } = options
      const { session: ses } = ctx
      if (!ses) ctx.throw(401, 'Session does not exist.')

      const csrf = ses['csrf']
      if (!csrf) ctx.throw(500, 'CSRF is missing from session.')

      let c1, c2
      if (body) c1 = (ctx.request.body || {})['csrf']
      if (query) c2 = ctx.query['csrf']
      const c = c1 || c2
      if (csrf != c) ctx.throw(403, 'Invalid CSRF token')
      return next()
    }
    return csrfCheck
  },
  /**
   * Serve errors as JSON.
   * @param {!_goa.Application} app
   * @param {!Object} _
   * @param {_idio.JSONErrorsOptions} options
   */
  'jsonErrors'(app, _, options) {
    const { logClientErrors = true, exposeStack = false, clearIdio = true } = options
    /**
     * @type {_idio.Middleware}
     */
    async function jsonErrors(ctx, next) {
      try {
        await next()
      } catch (err) {
        if (err.statusCode && err.statusCode >= 400 && err.statusCode < 500) {
          err.message = err.message.replace(/^([^!])/, '!$1')
        }
        err.stack = cleanStack(err.stack, clearIdio ? {
          ignoredModules: ['@idio/idio'],
        } : undefined)
        if (err.message.startsWith('!')) {
          ctx.body = {
            error: err.message.replace('!', ''),
            stack: exposeStack ? err.stack : undefined,
          }
          if (logClientErrors) console.log(err.message)
        } else {
          ctx.body = {
            error: 'internal server error',
            stack: exposeStack ? err.stack : undefined,
          }
          app.emit('error', err)
        }
      }
    }
    return jsonErrors
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
async function initMiddleware(name, conf, app, acc) {
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
  const res = await fn(app, config, options, acc)

  if (use) app.use(res)
  return res
}

const makeNeoluddite = (app, env, host, key) => {
  return async (ctx, next) => {
    ctx._usage = []
    try {
      await next()
    } finally {
      if (!ctx._usage.length) return
      const usage = ctx._usage.map((u) => {
        if (app) u['app'] = app
        if (env) u['env'] = env
        return u
      })
      try {
        const res = await rqt(`${host}/use?key=${key}`, {
          data: usage,
        })
      } catch (err) {
        app.emit('error', err)
      }
    }
  }
}

/**
 * @param {!_idio.MiddlewareConfig} middlewareConfig
 * @param {!_idio.Application} app
 */
export default async function setupMiddleware(middlewareConfig, app) {
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
          return await initMiddleware(name, c, app, acc)
        })
        installed = await Promise.all(p)
      } else {
        installed = await initMiddleware(name, conf, app, acc)
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
 * @typedef {import('../../types/options').FrontEndOptions} _idio.FrontEndOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types/options').FrontEndConfig} _idio.FrontEndConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types/options').CsrfCheckOptions} _idio.CsrfCheckOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types/options').GitHubOptions} _idio.GitHubOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types/options').JSONErrorsOptions} _idio.JSONErrorsOptions
 */