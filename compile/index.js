const { _createApp, _startApp, _compose, _Keygrip, _Router } = require('./idio')

/**
 * Just create a _Goa_ app without starting it.
 * @param {!_idio.MiddlewareConfig} [middlewareConfig] Middleware configuration for the `idio` server.
 * @param {!_idio.StaticOptions} [middlewareConfig.static] _Static_ middleware options.
 * @param {!_idio.CompressOptions} [middlewareConfig.compress] _Compression_ middleware options.
 * @param {!_idio.SessionOptions} [middlewareConfig.session] _Session_ middleware options.
 * @param {!_idio.CorsOptions} [middlewareConfig.cors] _CORS_ middleware options.
 * @param {!_idio.FormDataOptions} [middlewareConfig.form] _Form Data_ middleware options for receiving file uploads and form submissions.
 * @param {!_idio.FrontEndOptions} [middlewareConfig.frontend] _Front End_ middleware allows to serve source code from `node_modules` and transpile JSX.
 * @param {!_goa.RouterConfig=} [routerConfig] The optional configuration for the router.
 * @return {Promise<{ app: !_idio.Application, middleware: !Object<string, !_idio.Middleware>, router: !_goa.Router }>}
 */
async function createApp(middlewareConfig) {
  return _createApp(middlewareConfig)
}

/**
 * Start the server. Sets the `proxy` property to `true` when the NODE_ENV is equal to _production_.
 * @param {!_idio.MiddlewareConfig} [middlewareConfig] Middleware configuration for the `idio` server.
 * @param {!_idio.StaticOptions} [middlewareConfig.static] _Static_ middleware options.
 * @param {!_idio.CompressOptions} [middlewareConfig.compress] _Compression_ middleware options.
 * @param {!_idio.SessionOptions} [middlewareConfig.session] _Session_ middleware options.
 * @param {!_idio.CorsOptions} [middlewareConfig.cors] _CORS_ middleware options.
 * @param {!_idio.FormDataOptions} [middlewareConfig.form] _Form Data_ middleware options for receiving file uploads and form submissions.
 * @param {!_idio.FrontEndOptions} [middlewareConfig.frontend] _Front End_ middleware allows to serve source code from `node_modules` and transpile JSX.
 * @param {!_idio.Config} [config] Server configuration object.
 * @param {number} [config.port=5000] The port on which to start the server. Default `5000`.
 * @param {string} [config.host="0.0.0.0"] The host on which to listen. Default `0.0.0.0`.
 * @param {!_goa.RouterConfig} [config.router] The configuration for the router.
 * @return {Promise<!_idio.Idio>}
 */
async function idio(middlewareConfig = {}, config = {}) {
  return _startApp(middlewareConfig, config)
}

module.exports = idio
module.exports.createApp = createApp

/**
 * Signing and verifying data (such as cookies or URLs) through a rotating credential system.
 * @type {new (keys: !Array<string>, algorithm?: string, encoding?: string) => _goa.Keygrip}
 */
module.exports.$Keygrip = _Keygrip

/**
 * Router For Goa Apps.
 */
class Router extends _Router {
  /**
   * Create a new router.
   * @param {!_goa.RouterConfig=} [opts] The options for the router.
   * @example
   * ```js
   * import Goa from '＠goa/koa'
   * import Router from '＠goa/router'
   *
   * const app = new Goa()
   * const router = new Router()
   *
   * router.get('/', (ctx, next) => {
   *   // ctx.router available
   * })
   *
   * app
   *   .use(router.routes())
   *   .use(router.allowedMethods())
   * ```
   */
  constructor(opts) {
    super(opts)
  }
  /**
   * Generate URL from url pattern and given `params`.
   * @param {string} path The URL pattern.
   * @param {...!Object} params The URL parameters.
   * @return {string}
   * @example
   * ```js
   * const url = Router.url('/users/:id', { id: 1 })
   * // => "/users/1"
   * ```
   */
  static url(path, ...params) {
    return _Router.url(path, ...params)
  }
  /**
   * Returns separate middleware for responding to `OPTIONS` requests with
   * an `Allow` header containing the allowed methods, as well as responding
   * with `405 Method Not Allowed` and `501 Not Implemented` as appropriate.
   * @param {!_goa.AllowedMethodsOptions} options The options.
   * @return {!_goa.Middleware}
   * @example
   * ```js
   * import Goa from '＠goa/koa'
   * import Router from '＠goa/router'
   *
   * const app = new Goa()
   * const router = new Router()
   *
   * app.use(router.routes())
   * app.use(router.allowedMethods())
   * ```
   */
  allowedMethods(options) {
    return super.allowedMethods(options)
  }
  /**
   * Run middleware for named route parameters. Useful for auto-loading or validation.
   * @param {string} param The name of the param.
   * @param {!_goa.Middleware} middleware The middleware.
   * @example
   * ```js
   * router
   *   .param('user', (id, ctx, next) => {
   *     ctx.user = users[id]
   *     if (!ctx.user) return ctx.status = 404
   *     return next()
   *   })
   *   .get('/users/:user', ctx => {
   *     ctx.body = ctx.user
   *   })
   *   .get('/users/:user/friends', async ctx => {
   *     ctx.body = await ctx.user.getFriends()
   *   })
   * ```
   */
  param(param, middleware) {
    return super.param(param, middleware)
  }
  /**
   * Redirect `source` to `destination` URL with optional 30x status `code`.
   * Both `source` and `destination` can be route names.
   * @param {string} source URL or route name.
   * @param {string} destination URL or route name.
   * @param {number=} [code] The HTTP status code. Default `301`.
   */
  redirect(source, destination, code) {
    return super.redirect(source, destination, code)
  }
  /**
   * Lookup route with given `name`. If the route is not found, returns `null`.
   * @param {string} name The route name.
   * @return {_goa.Layer}
   */
  route(name) {
    return super.route(name)
  }
  /**
   * Generate URL for route. Takes a route name and map of named `params`. If the route is not found, returns an error. The last argument can be an object with the `query` property.
   * @param {string} name The route name.
   * @param {...!Object} params The URL parameters and options.
   * @return {(string|!Error)}
   * @example
   * ```js
   * // To use urls, a named route should be created:
   * router.get('user', '/users/:id', (ctx, next) => {
   *   // ...
   * })
   * ```
   * Get the URL by passing a **simple** parameter
   * ```js
   * router.url('user', 3)
   * // => "/users/3"
   * ```
   * Get the URL by passing parameters in an **object**
   * ```js
   * router.url('user', { id: 3 })
   * // => "/users/3"
   * ```
   * Use the url method for **redirects** to named routes:
   * ```js
   * router.use((ctx) => {
   *   ctx.redirect(ctx.router.url('sign-in'))
   * })
   * ```
   * Pass an **object query**:
   * ```js
   * router.url('user', { id: 3 }, { query: { limit: 1 } })
   * // => "/users/3?limit=1"
   * ```
   * Pass an already **serialised query**:
   * ```js
   * router.url('user', { id: 3 }, { query: 'limit=1' })
   * // => "/users/3?limit=1"
   * ```
   */
  url(name, ...params) {
    return super.url(name, ...params)
  }
  /**
   * Use given middleware.
   * Middleware run in the order they are defined by `.use()`. They are invoked
   * sequentially, requests start at the first middleware and work their way
   * "down" the middleware stack.
   * @param {(string|!Array<string>|!_goa.Middleware)} path The path or an array of paths. Pass middleware without path to apply to `*`.
   * @param {...!_goa.Middleware} middleware The middleware to use.
   * @example
   * ```js
   * // session middleware will run before authorize
   * router
   *   .use(session())
   *   .use(authorize())
   * // use middleware only with given path
   * router.use('/users', userAuth())
   * // or with an array of paths
   * router.use(['/users', '/admin'], userAuth())
   * app.use(router.routes())
   * ```
   */
  use(path, ...middleware) {
    return super.use(path, ...middleware)
  }
  /**
   * Set the path prefix for a Router instance that was already initialized.
   * @param {string} prefix The prefix to set.
   * @example
   * ```js
   * router.prefix('/things/:thing_id')
   * ```
   */
  prefix(prefix) {
    return super.prefix(prefix)
  }
  /**
   * Returns router middleware which dispatches a route matching the request.
   * @return {!_goa.Middleware}
   */
  middleware() {
    return super.middleware()
  }
  /**
   * Returns router middleware which dispatches a route matching the request.
   * @return {!_goa.Middleware}
   * @alias middleware An alias for **middleware**.
   */
  routes() {
    return super.middleware()
  }
}

module.exports.Router = Router

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
 * @typedef {_idio.StaticOptions} StaticOptions
 * @typedef {_idio.KoaStaticConfig} KoaStaticConfig
 *
 * @typedef {_idio.CompressOptions} CompressOptions
 * @typedef {_goa.CompressConfig} CompressConfig
 *
 * @typedef {_idio.SessionOptions} SessionOptions
 * @typedef {_idio.SessionConfig} SessionConfig
 *
 * @typedef {_idio.CorsOptions} CorsOptions
 * @typedef {_goa.CorsConfig} CorsConfig
 *
 * @typedef {_idio.FormDataOptions} FormDataOptions
 * @typedef {_multipart.FormDataConfig} FormDataConfig
 *
 * @typedef {import('../types/goa/typedefs/application').Application} _goa.Application
 * @typedef {import('../types/goa/typedefs/application').Middleware} _goa.Middleware
 * @typedef {import('../types/goa/typedefs/context').Context} _goa.Context
 */

/* typal types/idio.xml namespace ignore:_goa.Application,_goa.Context */
/**
 * @typedef {_idio.Application} Application `＠interface` The application with some additions.
 * @typedef {_goa.Application & _idio.$Application} _idio.Application `＠interface` The application with some additions.
 * @typedef {Object} _idio.$Application `＠interface` The application with some additions.
 * @prop {!_idio.Context} context The context object for each request.
 * @prop {!Array<!_idio.Middleware>} middleware The array with middleware used on the server. Default `[]`.
 * @prop {() => !Promise} destroy Terminate all active connections and close the server.
 * @prop {(middleware: !_idio.Middleware) => !_idio.Application} use Use the given middleware `fn`. Old-style middleware will be converted.
 * @typedef {_idio.Context} Context `＠interface` The extension to the standard Goa context with properties set by middleware.
 * @typedef {_goa.Context & _idio.$Context} _idio.Context `＠interface` The extension to the standard Goa context with properties set by middleware.
 * @typedef {Object} _idio.$Context `＠interface` The extension to the standard Goa context with properties set by middleware.
 * @prop {!_idio.Session|undefined} session The session object for updating, if `session` was installed. Set the `ctx.session` to null to destroy the session.
 * @prop {!_idio.SessionConfig|undefined} sessionOptions The options used to create the session middleware. Deep cloned for each request.
 * @prop {?boolean} compress A flag that can be added to explicitly set whether the response should be compressed by the `compress` middleware. Default `null`.
 * @prop {?string} _matchedRoute When middleware was invoked by the router, this will set the url, e.g., `user/:id`. Default `null`.
 * @prop {?string} _matchedRouteName When middleware was invoked by the router, this will set the route name if the route was created with a name. Default `null`.
 * @prop {?Object} params The parameters extracted from the router. Default `null`.
 * @prop {?_goa.Router} router An instance of the router if the middleware was invoked via it. Default `null`.
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
 * @prop {!_goa.Router} router The router instance.
 * @typedef {_idio.MiddlewareObject} MiddlewareObject The object with all configured middleware after the server has been configured.
 * @typedef {!Object<string, !_idio.Middleware>} _idio.MiddlewareObject The object with all configured middleware after the server has been configured.
 * @typedef {_idio.ConfiguredMiddleware} ConfiguredMiddleware `＠record` Idio-specific properties of the middleware object.
 * @typedef {_idio.MiddlewareObject & _idio.$ConfiguredMiddleware} _idio.ConfiguredMiddleware `＠record` Idio-specific properties of the middleware object.
 * @typedef {Object} _idio.$ConfiguredMiddleware `＠record` Idio-specific properties of the middleware object.
 * @prop {!_multipart.FormData} [form] An instance of the form data class that can be used to create middleware.
 * @prop {!_idio.Middleware} [session] The session middleware to be installed on individual routes.
 */

/* typal types/middleware.xml namespace */
/**
 * @typedef {import('../types/options').CorsOptions} _idio.CorsOptions
 * @typedef {import('../types/modules/cors').CorsConfig} _goa.CorsConfig
 * @typedef {import('../types/options').StaticOptions} _idio.StaticOptions
 * @typedef {import('../types/modules').KoaStaticConfig} _idio.KoaStaticConfig
 * @typedef {import('../types/options').CompressOptions} _idio.CompressOptions
 * @typedef {import('../types/modules').CompressConfig} _goa.CompressConfig
 * @typedef {import('../types/options').SessionOptions} _idio.SessionOptions
 * @typedef {import('../types/modules/session').SessionConfig} _idio.SessionConfig
 * @typedef {import('../types/options').FormDataOptions} _idio.FormDataOptions
 * @typedef {import('../types/modules/form-data').FormDataConfig} _multipart.FormDataConfig
 * @typedef {import('../types/modules/form-data').FormData} _multipart.FormData
 * @typedef {import('../types/modules/router').Layer} _goa.Layer
 * @typedef {import('../types/modules/router').Router} _goa.Router
 * @typedef {import('../types/modules/router').RouterConfig} _goa.RouterConfig
 * @typedef {import('../types/modules/router').AllowedMethodsOptions} _goa.AllowedMethodsOptions
 * @typedef {import('../types/options').FrontEndOptions} _idio.FrontEndOptions
 * @typedef {_idio.MiddlewareConfig} MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 * @typedef {_idio.FnMiddlewareConfig & _idio.$MiddlewareConfig} _idio.MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 * @typedef {Object} _idio.$MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 * @prop {!_idio.StaticOptions} [static] _Static_ middleware options.
 * @prop {!_idio.CompressOptions} [compress] _Compression_ middleware options.
 * @prop {!_idio.SessionOptions} [session] _Session_ middleware options.
 * @prop {!_idio.CorsOptions} [cors] _CORS_ middleware options.
 * @prop {!_idio.FormDataOptions} [form] _Form Data_ middleware options for receiving file uploads and form submissions.
 * @prop {!_idio.FrontEndOptions} [frontend] _Front End_ middleware allows to serve source code from `node_modules` and transpile JSX.
 * @typedef {_idio.FnMiddlewareConfig} FnMiddlewareConfig Middleware Config With Functions.
 * @typedef {!Object<string, !_idio.ConfigItem>} _idio.FnMiddlewareConfig Middleware Config With Functions.
 * @typedef {_idio.ConfigItem} ConfigItem An item in middleware configuration.
 * @typedef {!_goa.Middleware|{ use: boolean, middlewareConstructor: !_idio.MiddlewareConstructor, config: !Object }} _idio.ConfigItem An item in middleware configuration.
 * @typedef {_idio.MiddlewareConstructor} MiddlewareConstructor A function used to create middleware. It will generate a middleware function using the options and config.
 * @typedef {(app: !_goa.Application, config: !Object, options: !Object) => !_goa.Middleware|!_multipart.FormData} _idio.MiddlewareConstructor A function used to create middleware. It will generate a middleware function using the options and config.
 */

/* typework */
/**
 * @typedef {import('../types/goa/vendor/cookies').Keygrip} Keygrip
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