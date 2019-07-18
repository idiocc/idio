const { _createApp, _startApp, _compose, _Keygrip } = require('./idio')

/**
 * Just create a Goa App.
 * @param {MiddlewareConfig} middlewareConfig Middleware configuration for the `idio` server.
 * @param {_idio.StaticOptions} [middlewareConfig.static] `koa-static` options.
 * @param {_idio.CompressOptions} [middlewareConfig.compress] `koa-compress` options.
 * @param {_idio.SessionOptions} [middlewareConfig.session] `koa-session` options.
 * @returns {Promise<{app: Application, middleware: Middleware}>}
 */
async function createApp(middlewareConfig) {
  return _createApp(middlewareConfig)
}

/**
 * Start the server. Sets the `proxy` property to `true` when the NODE_ENV is equal to _production_.
 * @param {MiddlewareConfig} [middlewareConfig] Middleware configuration for the `idio` server.
 * @param {_idio.StaticOptions} [middlewareConfig.static] `koa-static` options.
 * @param {_idio.CompressOptions} [middlewareConfig.compress] `koa-compress` options.
 * @param {_idio.SessionOptions} [middlewareConfig.session] `koa-session` options.
 * @param {Config} [config] Server configuration object.
 * @param {number} [config.port=5000] The port on which to start the server. Default `5000`.
 * @param {string} [config.host="0.0.0.0"] The host on which to listen. Default `0.0.0.0`.
 * @returns {Promise<{url:string, server: http.Server, app: Application, middleware: Object<string, Middleware>}>}
 * @example
  ```js
  // start a server, and serve files from the "static" directory.
  await idio({
    static: {
      use: true,
      root: 'static',
      config: {
        hidden: true,
      },
    },
  })
  ```
 */
async function idio(middlewareConfig = {}, config = {}) {
  return _startApp(middlewareConfig, config)
}

module.exports = idio
module.exports.createApp = createApp
module.exports.compose = _compose
module.exports.Keygrip = _Keygrip

/**
 * @typedef {_idio.StaticOptions} StaticOptions
 * @typedef {_idio.CompressOptions} CompressOptions
 * @typedef {_idio.SessionOptions} SessionOptions
 * @typedef {import('../types/options').StaticOptions} _idio.StaticOptions
 * @typedef {import('../types/options').CompressOptions} _idio.CompressOptions
 * @typedef {import('../types/options').SessionOptions} _idio.SessionOptions
 * @typedef {import('../types/modules').KoaStaticConfig} KoaStaticConfig
 * @typedef {import('../types/modules').KoaCompressConfig} KoaCompressConfig
 * @typedef {import('../types/modules/session').KoaSessionConfig} KoaSessionConfig
 */

/* typal types/index.xml */
/**
 * @typedef {Object} Config Server configuration object.
 * @prop {number} [port=5000] The port on which to start the server. Default `5000`.
 * @prop {string} [host="0.0.0.0"] The host on which to listen. Default `0.0.0.0`.
 */

/* typal types/middleware.xml closure noSuppress */
/**
 * @typedef {_idio.MiddlewareConfig} MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 */
/**
 * @typedef {_idio.FnMiddlewareConfig & _idio.$MiddlewareConfig} _idio.MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 */
/**
 * @typedef {Object} _idio.$MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 * @prop {_idio.StaticOptions} [static] `koa-static` options.
 * @prop {_idio.CompressOptions} [compress] `koa-compress` options.
 * @prop {_idio.SessionOptions} [session] `koa-session` options.
 */
/**
 * @typedef {_idio.FnMiddlewareConfig} FnMiddlewareConfig Middleware Config With Functions.
 */
/**
 * @typedef {!Object<string, !_goa.Middleware>} _idio.FnMiddlewareConfig Middleware Config With Functions.
 */

/* typework */
/**
 * @typedef {import('../types/goa/vendor/cookies').Keygrip} Keygrip
 * @typedef {Middleware} _goa.Middleware
 * @typedef {import('../types/goa/typedefs/application').Middleware} Middleware
 * @typedef {import('../types/goa/typedefs/application').Application} Application
 * @typedef {import('../types/goa/typedefs/context').KoaContext} Context
 * @typedef {import('../types/goa/typedefs/request').Request} Request
 * @typedef {import('../types/goa/typedefs/request').ContextDelegatedRequest} ContextDelegatedRequest
 * @typedef {import('../types/goa/typedefs/response').Response} Response
 * @typedef {import('../types/goa/typedefs/response').ContextDelegatedResponse} ContextDelegatedResponse
 */

/**
  * @suppress {nonStandardJsDocs}
  * @typedef {import('http').Server} http.Server
  */