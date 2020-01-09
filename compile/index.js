const { _createApp, _startApp, _compose, _Keygrip } = require('./idio')
const IdioRouter = require('./router')

/**
 * Just create a _Goa_ app without starting it.
 * @param {!_idio.MiddlewareConfig} [middlewareConfig] Middleware configuration for the `idio` server.
 * @param {!_idio.StaticOptions|!Array<!_idio.StaticOptions>} [middlewareConfig.static] _Static_ middleware options.
 * @param {!_idio.CompressOptions} [middlewareConfig.compress] _Compression_ middleware options.
 * @param {!_idio.SessionOptions} [middlewareConfig.session] _Session_ middleware options.
 * @param {!_idio.CorsOptions} [middlewareConfig.cors] _CORS_ middleware options.
 * @param {!_idio.FormDataOptions} [middlewareConfig.form] _Form Data_ middleware options for receiving file uploads and form submissions.
 * @param {!_idio.FrontEndOptions} [middlewareConfig.frontend] _Front End_ middleware allows to serve source code from `node_modules` and transpile JSX.
 * @param {!_idio.NeoLudditeOptions} [middlewareConfig.neoluddite] Records the usage of middleware to compensate their developers' intellectual work.
 * @param {!_goa.RouterConfig=} [routerConfig] The optional configuration for the router.
 * @return {Promise<{ app: !_idio.Application, middleware: !Object<string, !_idio.Middleware>, router: !_idio.Router }>}
 */
async function createApp(middlewareConfig) {
  return _createApp(middlewareConfig)
}

/**
 * Start the server. Sets the `proxy` property to `true` when the NODE_ENV is equal to _production_.
 * @param {!_idio.MiddlewareConfig} [middlewareConfig] Middleware configuration for the `idio` server.
 * @param {!_idio.StaticOptions|!Array<!_idio.StaticOptions>} [middlewareConfig.static] _Static_ middleware options.
 * @param {!_idio.CompressOptions} [middlewareConfig.compress] _Compression_ middleware options.
 * @param {!_idio.SessionOptions} [middlewareConfig.session] _Session_ middleware options.
 * @param {!_idio.CorsOptions} [middlewareConfig.cors] _CORS_ middleware options.
 * @param {!_idio.FormDataOptions} [middlewareConfig.form] _Form Data_ middleware options for receiving file uploads and form submissions.
 * @param {!_idio.FrontEndOptions} [middlewareConfig.frontend] _Front End_ middleware allows to serve source code from `node_modules` and transpile JSX.
 * @param {!_idio.NeoLudditeOptions} [middlewareConfig.neoluddite] Records the usage of middleware to compensate their developers' intellectual work.
 * @param {!_idio.Config} [config] Server configuration object.
 * @param {number} [config.port=5000] The port on which to start the server. Default `5000`.
 * @param {string} [config.host="0.0.0.0"] The host on which to listen. Default `0.0.0.0`.
 * @param {!_goa.RouterConfig} [config.router] The configuration for the router.
 * @return {Promise<!_idio.Idio>}
 */
async function idio(middlewareConfig = {}, config = {}) {
  return _startApp(middlewareConfig, config)
}

/**
 * Signing and verifying data (such as cookies or URLs) through a rotating credential system.
 */
class Keygrip extends _Keygrip {
  /**
   * Creates a new Keygrip instance. Default algorithm is `sha1` and default encoding is `base64`.
   * @param {!Array<string>} keys The keys to use for signing.
   * @param {string=} [algorithm] The algorithm. Default `sha1`.
   * @param {string=} [encoding] The encoding. Default `base64`.
   */
  constructor(keys, algorithm, encoding) {
    super(keys, algorithm, encoding)
  }
  /**
   * This creates a SHA1 HMAC based on the _first_ key in the keylist, and outputs it as a 27-byte url-safe base64 digest (base64 without padding, replacing `+` with `-` and `/` with `_`).
   * @param {*} data The value to sign.
   * @return {string}
   */
  sign(data) {
    return super.sign(data)
  }
  /**
   * This loops through all of the keys currently in the keylist until the digest of the current key matches the given digest, at which point the current index is returned. If no key is matched, -1 is returned. The idea is that if the index returned is greater than `0`, the data should be re-signed to prevent premature credential invalidation, and enable better performance for subsequent challenges.
   * @param {*} data The value to verify.
   * @param {string} digest The digest to verify against.
   * @return {number}
   */
  index(data, digest) {
    return super.index(data, digest)
  }
  /**
   * This uses `index` to return true if the digest matches any existing keys, and false otherwise.
   * @param {*} data The value to verify.
   * @param {string} digest The digest to verify against.
   * @return {boolean}
   */
  verify(data, digest) {
    return super.verify(data, digest)
  }
}

module.exports = idio
module.exports.createApp = createApp
module.exports.Router = IdioRouter
module.exports.Keygrip = Keygrip

/**
 * Compose a single middleware function for Goa out of many.
 * @param {!Array<!Function>} middleware The array with the middleware.
 * @return {!_goa.Middleware}
 */
function $compose(middleware) {
  return _compose(middleware)
}

module.exports.compose = $compose

/**
 * @typedef {IdioRouter} _idio.Router
 * @typedef {_idio.StaticOptions} StaticOptions
 * @typedef {_idio.StaticConfig} StaticConfig
 *
 * @typedef {_idio.FormDataOptions} FormDataOptions
 * @typedef {_multipart.FormDataConfig} FormDataConfig
 * @typedef {_multipart.FormDataField} FormDataField
 *
 * @typedef {import('../types/goa/typedefs/application').Application} _goa.Application
 * @typedef {import('../types/goa/typedefs/application').Middleware} _goa.Middleware
 * @typedef {import('../types/goa/typedefs/context').Context} _goa.Context
 * @typedef {import('../types/goa/typedefs/request').Request} _goa.Request
 *
 * @typedef {import('./router').RouterConfig} _goa.RouterConfig
 */

/* typal types/idio.xml namespace ignore:_goa.Application,_goa.Context */
/**
 * @typedef {_idio.Application} Application `＠interface` The application with some additions.
 * @typedef {_idio.$Application & _goa.Application} _idio.Application `＠interface` The application with some additions.
 * @typedef {Object} _idio.$Application `＠interface` The application with some additions.
 * @prop {!_idio.Context} context The context object for each request.
 * @prop {!Array<!_idio.Middleware>} middleware The array with middleware used on the server. Default `[]`.
 * @prop {() => !Promise} destroy Terminate all active connections and close the server.
 * @prop {(middleware: !_idio.Middleware) => !_idio.Application} use Use the given middleware `fn`. Old-style middleware will be converted.
 * @typedef {_idio.Request} Request `＠interface` The Goa request with additional properties.
 * @typedef {_idio.$Request & _goa.Request} _idio.Request `＠interface` The Goa request with additional properties.
 * @typedef {Object} _idio.$Request `＠interface` The Goa request with additional properties.
 * @prop {Object} body Parsed body of the request, extract using _Form Data_ middleware. Default `null`.
 * @typedef {_idio.Context} Context `＠interface` The extension to the standard Goa context with properties set by middleware.
 * @typedef {_idio.$Context & _goa.Context} _idio.Context `＠interface` The extension to the standard Goa context with properties set by middleware.
 * @typedef {Object} _idio.$Context `＠interface` The extension to the standard Goa context with properties set by middleware.
 * @prop {!_idio.Request} request The request instance specific to _Idio_.
 * @prop {!_idio.Session|undefined} session The session object for updating, if `session` was installed. Set the `ctx.session` to null to destroy the session.
 * @prop {!_idio.SessionConfig|undefined} sessionOptions The options used to create the session middleware. Deep cloned for each request.
 * @prop {?boolean} compress A flag that can be added to explicitly set whether the response should be compressed by the `compress` middleware. Default `null`.
 * @prop {!Array<_multipart.FormDataFile>|!Object<string, !Array<_multipart.FormDataFile>>|_multipart.FormDataFile} files Files extracted from the request's form data. Default `null`.
 * @prop {_multipart.FormDataFile} file A single file extracted from the request's form data. Default `null`.
 * @prop {?string} _matchedRoute When middleware was invoked by the router, this will set the url, e.g., `user/:id`. Default `null`.
 * @prop {?string} _matchedRouteName When middleware was invoked by the router, this will set the route name if the route was created with a name. Default `null`.
 * @prop {?Object} params The parameters extracted from the router. Default `null`.
 * @prop {?_idio.Router} router An instance of the router if the middleware was invoked via it. Default `null`.
 * @prop {?string} mountPath When serving files through `mount`, this property will be set to the mount prefix. Default `null`.
 * @typedef {_idio.Middleware} Middleware The function to handle requests which can be installed with the `.use` method.
 * @typedef {(ctx: !_idio.Context, next?: !Function) => (!Promise|void)} _idio.Middleware The function to handle requests which can be installed with the `.use` method.
 */

/* typal types/index.xml namespace */
/**
 * @typedef {import('http').Server} http.Server
 * @typedef {_idio.Config} Config Server configuration object.
 * @typedef {Object} _idio.Config Server configuration object.
 * @prop {number} [port=5000] The port on which to start the server. Default `5000`.
 * @prop {string} [host="0.0.0.0"] The host on which to listen. Default `0.0.0.0`.
 * @prop {!_goa.RouterConfig} [router] The configuration for the router.
 * @typedef {_idio.Idio} Idio `＠record` The return type of the idio.
 * @typedef {Object} _idio.Idio `＠record` The return type of the idio.
 * @prop {string} url The URL on which the server was started, such as `http://localhost:5000`.
 * @prop {!http.Server} server The server instance.
 * @prop {!_idio.Application} app The Goa application instance (with additional `.destroy` method).
 * @prop {!_idio.ConfiguredMiddleware} middleware An object with configured middleware functions, which can be installed manually using `app.use`, or `router.use`. The context will be a standard Goa context with certain properties set by bundled middleware such as `.session`.
 * @prop {!_idio.Router} router The router instance.
 * @typedef {_idio.MiddlewareObject} MiddlewareObject The object with all configured middleware after the server has been configured.
 * @typedef {!Object<string, !_idio.Middleware>} _idio.MiddlewareObject The object with all configured middleware after the server has been configured.
 * @typedef {_idio.ConfiguredMiddleware} ConfiguredMiddleware `＠record` Idio-specific properties of the middleware object.
 * @typedef {_idio.$ConfiguredMiddleware & _idio.MiddlewareObject} _idio.ConfiguredMiddleware `＠record` Idio-specific properties of the middleware object.
 * @typedef {Object} _idio.$ConfiguredMiddleware `＠record` Idio-specific properties of the middleware object.
 * @prop {!_multipart.FormData} [form] An instance of the form data class that can be used to create middleware.
 * @prop {!_idio.Middleware} [session] The session middleware to be installed on individual routes.
 */

/* typal types/middleware.xml namespace */
/**
 * @typedef {import('../types/options').CorsOptions} _idio.CorsOptions
 * @typedef {import('../types/modules/cors').CorsConfig} _goa.CorsConfig
 * @typedef {import('../types/options').StaticOptions} _idio.StaticOptions
 * @typedef {import('../types/modules/static').StaticConfig} _idio.StaticConfig
 * @typedef {import('../types/options').CompressOptions} _idio.CompressOptions
 * @typedef {import('../types/modules').CompressConfig} _goa.CompressConfig
 * @typedef {import('../types/options').SessionOptions} _idio.SessionOptions
 * @typedef {import('../types/options').SessionConfig} _idio.SessionConfig
 * @typedef {import('../types/modules/session').Session} _idio.Session
 * @typedef {import('../types/options').FormDataOptions} _idio.FormDataOptions
 * @typedef {import('../types/modules/form-data').FormDataConfig} _multipart.FormDataConfig
 * @typedef {import('../types/modules/form-data').FormData} _multipart.FormData
 * @typedef {import('../types/modules/form-data').FormDataFile} _multipart.FormDataFile
 * @typedef {import('../types/modules/form-data').FormDataField} _multipart.FormDataField
 * @typedef {import('../types/options').FrontEndOptions} _idio.FrontEndOptions
 * @typedef {import('../types/options').NeoLudditeOptions} _idio.NeoLudditeOptions
 * @typedef {_idio.MiddlewareConfig} MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 * @typedef {_idio.$MiddlewareConfig & _idio.FnMiddlewareConfig} _idio.MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 * @typedef {Object} _idio.$MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 * @prop {!_idio.StaticOptions|!Array<!_idio.StaticOptions>} [static] _Static_ middleware options.
 * @prop {!_idio.CompressOptions} [compress] _Compression_ middleware options.
 * @prop {!_idio.SessionOptions} [session] _Session_ middleware options.
 * @prop {!_idio.CorsOptions} [cors] _CORS_ middleware options.
 * @prop {!_idio.FormDataOptions} [form] _Form Data_ middleware options for receiving file uploads and form submissions.
 * @prop {!_idio.FrontEndOptions} [frontend] _Front End_ middleware allows to serve source code from `node_modules` and transpile JSX.
 * @prop {!_idio.NeoLudditeOptions} [neoluddite] Records the usage of middleware to compensate their developers' intellectual work.
 * @typedef {_idio.FnMiddlewareConfig} FnMiddlewareConfig Middleware Config With Functions.
 * @typedef {!Object<string, !_idio.ConfigItem>} _idio.FnMiddlewareConfig Middleware Config With Functions.
 * @typedef {_idio.ConfigItem} ConfigItem An item in middleware configuration.
 * @typedef {!_goa.Middleware|{ use: boolean, middlewareConstructor: !_idio.MiddlewareConstructor, config: !Object }} _idio.ConfigItem An item in middleware configuration.
 * @typedef {_idio.MiddlewareConstructor} MiddlewareConstructor A function used to create middleware. It will generate a middleware function using the options and config.
 * @typedef {(app: !_goa.Application, config: !Object, options: !Object) => !_goa.Middleware|!_multipart.FormData} _idio.MiddlewareConstructor A function used to create middleware. It will generate a middleware function using the options and config.
 */

// typework
/**
 * @typedef {import('../types/goa/vendor/cookies').Cookies} Cookies
 * @typedef {import('../types/goa/vendor/accepts').Accepts} Accepts
 * @typedef {import('../types/goa/typedefs/application').Middleware} Middleware
 * @typedef {import('../types/goa/typedefs/application').Application} Application
 * @typedef {import('../types/goa/typedefs/application').ApplicationOptions} ApplicationOptions
 * @typedef {import('../types/goa/typedefs/context').Context} Context
 * @typedef {import('../types/goa/typedefs/request').Request} Request
 * @typedef {import('../types/goa/typedefs/request').ContextDelegatedRequest} ContextDelegatedRequest
 * @typedef {import('../types/goa/typedefs/response').Response} Response
 * @typedef {import('../types/goa/typedefs/response').ContextDelegatedResponse} ContextDelegatedResponse
 */