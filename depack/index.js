const { createApp: _createApp, startApp } = require('./depack')

/**
 * Just create a Goa App.
 * @param {MiddlewareConfig} middlewareConfig Middleware configuration for the `idio` `core` server.
 * @param {_idio.StaticOptions} [middlewareConfig.static] `static` options.
 * @returns {Promise<{app: Application, middleware: Middleware}>}
 */
async function createApp(middlewareConfig) {
  return _createApp(middlewareConfig)
}

/**
 * Start the server. Sets the `proxy` property to `true` when the NODE_ENV is equal to _production_.
 * @param {MiddlewareConfig} [middlewareConfig] Middleware configuration for the `idio` `core` server.
 * @param {_idio.StaticOptions} [middlewareConfig.static] `static` options.
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
  return startApp(middlewareConfig, config)
}

module.exports = idio
module.exports.createApp = createApp

/**
 * @typedef {_idio.StaticOptions} StaticOptions
 * @typedef {import('../types/options').StaticOptions} _idio.StaticOptions
 * @typedef {_idio.KoaStaticConfig} KoaStaticConfig
 * @typedef {import('../types/modules').KoaStaticConfig} _idio.KoaStaticConfig
 */

/* typal types/index.xml */
/**
 * @typedef {Object} Config Server configuration object.
 * @prop {number} [port=5000] The port on which to start the server. Default `5000`.
 * @prop {string} [host="0.0.0.0"] The host on which to listen. Default `0.0.0.0`.
 */

/* typal types/middleware.xml */
/**
 * @typedef {Object} MiddlewareConfig Middleware configuration for the `idio` `core` server.
 * @prop {_idio.StaticOptions} [static] `static` options.
 */

/* typework */
/**
 * @typedef {import('../types/goa/vendor/cookies').Keygrip} Keygrip
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