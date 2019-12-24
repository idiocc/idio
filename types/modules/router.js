export {}

/* typal node_modules/@goa/router/types/index.xml ignore:_goa.LayerConfig,_goa.Middleware namespace */
/**
 * @typedef {_goa.Layer} Layer `＠interface` A single piece of middleware that can be matched for all possible routes.
 * @typedef {Object} _goa.Layer `＠interface` A single piece of middleware that can be matched for all possible routes.
 * @prop {!Array<{ name: string }>} paramNames Parameter names stored in this layer. Default `[]`.
 */

/* typal node_modules/@goa/router/types/router.xml ignore:_goa.Middleware namespace */
/**
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

/**
  * @typedef {import('../../').Middleware} _goa.Middleware
  */