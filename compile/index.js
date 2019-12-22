const { _createApp, _startApp, _compose, _Keygrip } = require('./idio')

/**
 * Just create a _Goa_ app without starting it.
 * @param {!_idio.MiddlewareConfig} [middlewareConfig] Middleware configuration for the `idio` server.
 * @param {_idio.StaticOptions} [middlewareConfig.static] `koa-static` options.
 * @param {_idio.CompressOptions} [middlewareConfig.compress] `koa-compress` options.
 * @param {_idio.SessionOptions} [middlewareConfig.session] `koa-session` options.
 * @param {_idio.CorsOptions} [middlewareConfig.cors] `koa-cors` options.
 * @param {!_goa.RouterConfig} [routerConfig] Config for the router.
 * @param {!Array<string>} [routerConfig.methods] The methods to serve.
 * Default `HEAD`, `OPTIONS`, `GET`, `PUT`, `PATCH`, `POST`, `DELETE`.
 * @param {string} [routerConfig.prefix] Prefix router paths.
 * @param {string} [routerConfig.routerPath] Custom routing path.
 * @return {Promise<{ app: !_idio.Application, middleware: !Object<string, !_idio.Middleware>, router: !_goa.Router }>}
 */
async function createApp(middlewareConfig) {
  return _createApp(middlewareConfig)
}

/**
 * Start the server. Sets the `proxy` property to `true` when the NODE_ENV is equal to _production_.
 * @param {!_idio.MiddlewareConfig} [middlewareConfig] Middleware configuration for the `idio` server.
 * @param {_idio.StaticOptions} [middlewareConfig.static] `koa-static` options.
 * @param {_idio.CompressOptions} [middlewareConfig.compress] `koa-compress` options.
 * @param {_idio.SessionOptions} [middlewareConfig.session] `koa-session` options.
 * @param {_idio.CorsOptions} [middlewareConfig.cors] `koa-cors` options.
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
 * @type {new (keys: !Array<string>, algorithm?: string, encoding?: string) => $$Keygrip}
 */
const $Keygrip = _Keygrip

module.exports = idio
module.exports.createApp = createApp
module.exports.Keygrip = $Keygrip

/**
 * @typedef {_idio.StaticOptions} StaticOptions
 * @typedef {_idio.KoaStaticConfig} KoaStaticConfig
 *
 * @typedef {_idio.CompressOptions} CompressOptions
 * @typedef {_idio.KoaCompressConfig} KoaCompressConfig
 *
 * @typedef {_idio.SessionOptions} SessionOptions
 * @typedef {_idio.SessionConfig} SessionConfig
 *
 * @typedef {_idio.CorsOptions} CorsOptions
 * @typedef {_goa.CorsConfig} CorsConfig
 */

/* typal types/idio.xml namespace */
/**
 * @typedef {import('@typedefs/goa').Application} _goa.Application
 * @typedef {import('@typedefs/goa').Context} _goa.Context
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
 * @prop {?boolean} compress A flag added by `koa-compress` middleware. Default `null`.
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
 * @prop {!Object<string, !_idio.Middleware>} middleware An object with configured middleware functions, which can be installed manually using `app.use`, or `router.use`. The context will be a standard Goa context with certain properties set by bundled middleware such as `.session`.
 * @prop {!_goa.Router} router The router instance.
 */

/* typal types/middleware.xml namespace */
/**
 * @typedef {import('../types/options').CorsOptions} _idio.CorsOptions
 * @typedef {import('../types/modules/cors').CorsConfig} _goa.CorsConfig
 * @typedef {import('../types/options').StaticOptions} _idio.StaticOptions
 * @typedef {import('../types/modules').KoaStaticConfig} _idio.KoaStaticConfig
 * @typedef {import('../types/options').CompressOptions} _idio.CompressOptions
 * @typedef {import('../types/modules').KoaCompressConfig} _idio.KoaCompressConfig
 * @typedef {import('../types/options').SessionOptions} _idio.SessionOptions
 * @typedef {import('../types/modules/session').SessionConfig} _idio.SessionConfig
 * @typedef {import('../').Middleware} _goa.Middleware
 * @typedef {import('../').Application} _goa.Application
 * @typedef {_idio.MiddlewareConfig} MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 * @typedef {_idio.FnMiddlewareConfig & _idio.$MiddlewareConfig} _idio.MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 * @typedef {Object} _idio.$MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 * @prop {_idio.StaticOptions} [static] `koa-static` options.
 * @prop {_idio.CompressOptions} [compress] `koa-compress` options.
 * @prop {_idio.SessionOptions} [session] `koa-session` options.
 * @prop {_idio.CorsOptions} [cors] `koa-cors` options.
 * @typedef {_idio.FnMiddlewareConfig} FnMiddlewareConfig Middleware Config With Functions.
 * @typedef {!Object<string, !_idio.ConfigItem>} _idio.FnMiddlewareConfig Middleware Config With Functions.
 * @typedef {_idio.ConfigItem} ConfigItem An item in middleware configuration.
 * @typedef {!_goa.Middleware|{ use: boolean, middlewareConstructor: !_idio.MiddlewareConstructor, config: !Object }} _idio.ConfigItem An item in middleware configuration.
 * @typedef {_idio.MiddlewareConstructor} MiddlewareConstructor A function used to create middleware.
 * @typedef {(app: !_goa.Application, config: !Object, options: !Object) => !_goa.Middleware} _idio.MiddlewareConstructor A function used to create middleware.
 */

/* typal node_modules/@goa/router/types/index.xml ignore:_goa.LayerConfig namespace */
/**
 * @typedef {import('@typedefs/goa').Middleware} _goa.Middleware
 * @typedef {_goa.Layer} Layer `＠interface` A single piece of middleware that can be matched for all possible routes.
 * @typedef {Object} _goa.Layer `＠interface` A single piece of middleware that can be matched for all possible routes.
 * @prop {!Array<{ name: string }>} paramNames Parameter names stored in this layer. Default `[]`.
 */

/* typal node_modules/@goa/router/types/router.xml namespace */
/**
 * @typedef {import('@typedefs/goa').Middleware} _goa.Middleware
 * @typedef {_goa.Router} Router `＠interface` Router For Goa Apps.
 * @typedef {Object} _goa.Router `＠interface` Router For Goa Apps.
 * @prop {!_goa.RouterConfig} opts Stored options passed to the _Router_ constructor.
 * @prop {(options: !_goa.AllowedMethodsOptions) => !_goa.Middleware} allowedMethods Returns separate middleware for responding to `OPTIONS` requests with
 * an `Allow` header containing the allowed methods, as well as responding
 * with `405 Method Not Allowed` and `501 Not Implemented` as appropriate.
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
 * @prop {(param: string, middleware: !_goa.Middleware) => !_goa.Router} param Run middleware for named route parameters. Useful for auto-loading or validation.
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
 * @prop {(source: string, destination: string, code?: number) => !_goa.Router} redirect Redirect `source` to `destination` URL with optional 30x status `code`.
 * Both `source` and `destination` can be route names.
 * @prop {(name: string) => _goa.Layer} route Lookup route with given `name`. If the route is not found, returns `null`.
 * @prop {(name: string, ...params: !Object[]) => (string|!Error)} url Generate URL for route. Takes a route name and map of named `params`. If the route is not found, returns an error. The last argument can be an object with the `query` property.
 * ```js
 * // To use urls, a named route should be created:
 * router.get('user', '/users/:id', (ctx, next) => {
 *   // ...
 * })
 * ```
 * Get the URL by passing a ＊＊simple＊＊ parameter
 * ```js
 * router.url('user', 3)
 * // => "/users/3"
 * ```
 * Get the URL by passing parameters in an ＊＊object＊＊
 * ```js
 * router.url('user', { id: 3 })
 * // => "/users/3"
 * ```
 * Use the url method for ＊＊redirects＊＊ to named routes:
 * ```js
 * router.use((ctx) => {
 *   ctx.redirect(ctx.router.url('sign-in'))
 * })
 * ```
 * Pass an ＊＊object query＊＊:
 * ```js
 * router.url('user', { id: 3 }, { query: { limit: 1 } })
 * // => "/users/3?limit=1"
 * ```
 * Pass an already ＊＊serialised query＊＊:
 * ```js
 * router.url('user', { id: 3 }, { query: 'limit=1' })
 * // => "/users/3?limit=1"
 * ```
 * @prop {(path: (string|!Array<string>|!_goa.Middleware), ...middleware: !_goa.Middleware[]) => !_goa.Router} use Use given middleware.
 * Middleware run in the order they are defined by `.use()`. They are invoked
 * sequentially, requests start at the first middleware and work their way
 * "down" the middleware stack.
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
 * @prop {(prefix: string) => !_goa.Router} prefix Set the path prefix for a Router instance that was already initialized.
 * ```js
 * router.prefix('/things/:thing_id')
 * ```
 * @prop {() => !_goa.Middleware} middleware Returns router middleware which dispatches a route matching the request.
 * @prop {() => !_goa.Middleware} routes An alias for `middleware`.
 * @typedef {_goa.AllowedMethodsOptions} AllowedMethodsOptions `＠record` The options for the `allowedMethods` middleware generation.
 * @typedef {Object} _goa.AllowedMethodsOptions `＠record` The options for the `allowedMethods` middleware generation.
 * @prop {boolean} [throw] Throw error instead of setting status and header.
 * @prop {() => !Error} [notImplemented] Throw the returned value in place of the default `NotImplemented` error.
 * @prop {() => !Error} [methodNotAllowed] Throw the returned value in place of the default `MethodNotAllowed` error.
 * @typedef {_goa.RouterConfig} RouterConfig `＠record` Config for the router.
 * @typedef {Object} _goa.RouterConfig `＠record` Config for the router.
 * @prop {!Array<string>} [methods] The methods to serve.
 * Default `HEAD`, `OPTIONS`, `GET`, `PUT`, `PATCH`, `POST`, `DELETE`.
 * @prop {string} [prefix] Prefix router paths.
 * @prop {string} [routerPath] Custom routing path.
 */

/* typal node_modules/@goa/session/types/session.xml ignore:KoaSession namespace */
/**
 * @typedef {_idio.Session} Session `＠record` The session instance accessible via Goa's context.
 * @typedef {Object} _idio.Session `＠record` The session instance accessible via Goa's context.
 * @prop {boolean} isNew Returns true if the session is new.
 * @prop {boolean} populated Populated flag, which is just a boolean alias of `.length`.
 * @prop {number|string} maxAge Get/set cookie's maxAge.
 * @prop {() => void} save Save this session no matter whether it is populated.
 * @prop {() => !Promise} manuallyCommit Session headers are auto committed by default. Use this if `autoCommit` is set to false.
 * @typedef {_idio.KoaSession} KoaSession `＠interface` A private session model.
 * @typedef {_idio.Session & _idio.$KoaSession} _idio.KoaSession `＠interface` A private session model.
 * @typedef {Object} _idio.$KoaSession `＠interface` A private session model.
 * @prop {number} _expire Private JSON serialisation.
 * @prop {boolean} _requireSave Private JSON serialisation.
 * @prop {_idio.KoaContextSession} _sessCtx Private JSON serialisation.
 * @prop {_goa.Context} _ctx Private JSON serialisation.
 */

/**
 * @typedef {import('../types/goa/vendor/cookies').Keygrip} $$Keygrip
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