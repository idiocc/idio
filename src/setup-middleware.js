import compose from '@goa/goa/modules/koa-compose'
import session from '@goa/session'
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
   * @param {_goa.Application} app
   * @param {_idio.KoaSessionConfig} config
   * @param {_idio.SessionOptions} options
   */
  'session'(app, config, { keys }) {
    if (!Array.isArray(keys)) {
      throw new Error('Keys must be an array')
    }
    app.keys = keys
    const ses = session(app, config)
    return ses
  },
  // cors: setupCors,
  // frontend: setupFrontend,
}

async function initMiddleware(name, conf, app) {
  if (typeof conf == 'function') {
    /** @type {_goa.Middleware} */
    const c = conf
    app.use(c)
    return c
  }
  let fn
  if (name in map) {
    fn = map[name]
  } else if (conf['middlewareConstructor']) {
    if (typeof conf['middlewareConstructor'] != 'function') {
      throw new Error(`Expecting a function in the "middlewareConstructor" of the ${name} middleware.`)
    }
    fn = conf['middlewareConstructor']
  } else {
    throw new Error(`Either the "middleware" or "middlewareConstructor" properties must be passed for middleware "${name}".`)
  }
  const { 'use': use, 'config': config = {}, ...options } = conf
  /** @type {_goa.Middleware} */
  const res = await fn(app, config, options)
  if (use) {
    app.use(res)
  }
  return res
}

/**
 * @param {_idio.MiddlewareConfig} middlewareConfig
 * @param {_goa.Application} app
 */
export default async function setupMiddleware(middlewareConfig, app) {
  /** @type {Object.<string, _goa.Middleware>} */
  const res = await Object.keys(middlewareConfig)
    .reduce(async (acc, name) => {
      const accRes = await acc
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
        ...accRes,
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
 * @typedef {import('..').KoaStaticConfig} _idio.KoaStaticConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').KoaCompressConfig} _idio.KoaCompressConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').KoaSessionConfig} _idio.KoaSessionConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').MiddlewareConfig} _idio.MiddlewareConfig
 */