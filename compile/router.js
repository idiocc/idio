const { _Router } = require('./idio')

/**
 * Router For Goa Apps.
 */
class $Router extends _Router {
  /**
   * Create a new router.
   * @param {!_goa.RouterConfig} [opts] Config for the router.
   * @param {!Array<string>} [opts.methods] The methods to serve.
   * Default `HEAD`, `OPTIONS`, `GET`, `PUT`, `PATCH`, `POST`, `DELETE`.
   * @param {string} [opts.prefix] Prefix router paths.
   * @param {string} [opts.routerPath] Custom routing path.
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
   * @param {!_goa.AllowedMethodsOptions} options The options for the `allowedMethods` middleware generation.
   * @param {boolean} [options.throw] Throw error instead of setting status and header.
   * @param {() => !Error} [options.notImplemented] Throw the returned value in place of the default `NotImplemented` error.
   * @param {() => !Error} [options.methodNotAllowed] Throw the returned value in place of the default `MethodNotAllowed` error.
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

/**
 * The router decorated with HTTP method properties.
 */
class IdioRouter extends $Router {
  /**
   * Constructor method.
   */
  constructor() {
    super()
  }
  /**
   * Handle `ACL` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.acl(name, path, ...middleware)
   * router.acl(path, ...middleware)
   * router.acl(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  acl(...nameOrPathOrMiddleware) {
    return super.acl(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `BIND` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.bind(name, path, ...middleware)
   * router.bind(path, ...middleware)
   * router.bind(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  bind(...nameOrPathOrMiddleware) {
    return super.bind(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `CHECKOUT` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.checkout(name, path, ...middleware)
   * router.checkout(path, ...middleware)
   * router.checkout(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  checkout(...nameOrPathOrMiddleware) {
    return super.checkout(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `CONNECT` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.connect(name, path, ...middleware)
   * router.connect(path, ...middleware)
   * router.connect(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  connect(...nameOrPathOrMiddleware) {
    return super.connect(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `COPY` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.copy(name, path, ...middleware)
   * router.copy(path, ...middleware)
   * router.copy(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  copy(...nameOrPathOrMiddleware) {
    return super.copy(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `DELETE` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.delete(name, path, ...middleware)
   * router.delete(path, ...middleware)
   * router.delete(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  delete(...nameOrPathOrMiddleware) {
    return super.delete(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `GET` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.get(name, path, ...middleware)
   * router.get(path, ...middleware)
   * router.get(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  get(...nameOrPathOrMiddleware) {
    return super.get(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `HEAD` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.head(name, path, ...middleware)
   * router.head(path, ...middleware)
   * router.head(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  head(...nameOrPathOrMiddleware) {
    return super.head(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `LINK` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.link(name, path, ...middleware)
   * router.link(path, ...middleware)
   * router.link(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  link(...nameOrPathOrMiddleware) {
    return super.link(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `LOCK` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.lock(name, path, ...middleware)
   * router.lock(path, ...middleware)
   * router.lock(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  lock(...nameOrPathOrMiddleware) {
    return super.lock(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `MERGE` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.merge(name, path, ...middleware)
   * router.merge(path, ...middleware)
   * router.merge(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  merge(...nameOrPathOrMiddleware) {
    return super.merge(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `MKACTIVITY` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.mkactivity(name, path, ...middleware)
   * router.mkactivity(path, ...middleware)
   * router.mkactivity(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  mkactivity(...nameOrPathOrMiddleware) {
    return super.mkactivity(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `MKCALENDAR` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.mkcalendar(name, path, ...middleware)
   * router.mkcalendar(path, ...middleware)
   * router.mkcalendar(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  mkcalendar(...nameOrPathOrMiddleware) {
    return super.mkcalendar(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `MKCOL` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.mkcol(name, path, ...middleware)
   * router.mkcol(path, ...middleware)
   * router.mkcol(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  mkcol(...nameOrPathOrMiddleware) {
    return super.mkcol(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `MOVE` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.move(name, path, ...middleware)
   * router.move(path, ...middleware)
   * router.move(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  move(...nameOrPathOrMiddleware) {
    return super.move(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `NOTIFY` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.notify(name, path, ...middleware)
   * router.notify(path, ...middleware)
   * router.notify(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  notify(...nameOrPathOrMiddleware) {
    return super.notify(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `OPTIONS` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.options(name, path, ...middleware)
   * router.options(path, ...middleware)
   * router.options(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  options(...nameOrPathOrMiddleware) {
    return super.options(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `PATCH` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.patch(name, path, ...middleware)
   * router.patch(path, ...middleware)
   * router.patch(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  patch(...nameOrPathOrMiddleware) {
    return super.patch(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `POST` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.post(name, path, ...middleware)
   * router.post(path, ...middleware)
   * router.post(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  post(...nameOrPathOrMiddleware) {
    return super.post(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `PROPFIND` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.propfind(name, path, ...middleware)
   * router.propfind(path, ...middleware)
   * router.propfind(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  propfind(...nameOrPathOrMiddleware) {
    return super.propfind(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `PROPPATCH` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.proppatch(name, path, ...middleware)
   * router.proppatch(path, ...middleware)
   * router.proppatch(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  proppatch(...nameOrPathOrMiddleware) {
    return super.proppatch(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `PURGE` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.purge(name, path, ...middleware)
   * router.purge(path, ...middleware)
   * router.purge(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  purge(...nameOrPathOrMiddleware) {
    return super.purge(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `PUT` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.put(name, path, ...middleware)
   * router.put(path, ...middleware)
   * router.put(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  put(...nameOrPathOrMiddleware) {
    return super.put(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `REBIND` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.rebind(name, path, ...middleware)
   * router.rebind(path, ...middleware)
   * router.rebind(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  rebind(...nameOrPathOrMiddleware) {
    return super.rebind(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `REPORT` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.report(name, path, ...middleware)
   * router.report(path, ...middleware)
   * router.report(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  report(...nameOrPathOrMiddleware) {
    return super.report(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `SEARCH` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.search(name, path, ...middleware)
   * router.search(path, ...middleware)
   * router.search(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  search(...nameOrPathOrMiddleware) {
    return super.search(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `SOURCE` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.source(name, path, ...middleware)
   * router.source(path, ...middleware)
   * router.source(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  source(...nameOrPathOrMiddleware) {
    return super.source(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `SUBSCRIBE` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.subscribe(name, path, ...middleware)
   * router.subscribe(path, ...middleware)
   * router.subscribe(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  subscribe(...nameOrPathOrMiddleware) {
    return super.subscribe(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `TRACE` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.trace(name, path, ...middleware)
   * router.trace(path, ...middleware)
   * router.trace(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  trace(...nameOrPathOrMiddleware) {
    return super.trace(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `UNBIND` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.unbind(name, path, ...middleware)
   * router.unbind(path, ...middleware)
   * router.unbind(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  unbind(...nameOrPathOrMiddleware) {
    return super.unbind(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `UNLINK` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.unlink(name, path, ...middleware)
   * router.unlink(path, ...middleware)
   * router.unlink(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  unlink(...nameOrPathOrMiddleware) {
    return super.unlink(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `UNLOCK` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.unlock(name, path, ...middleware)
   * router.unlock(path, ...middleware)
   * router.unlock(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  unlock(...nameOrPathOrMiddleware) {
    return super.unlock(...nameOrPathOrMiddleware)
  }
  /**
   * Handle `UNSUBSCRIBE` requests. The signature accepts 3 possible ways of assigning a route:
   * ```js
   * router.unsubscribe(name, path, ...middleware)
   * router.unsubscribe(path, ...middleware)
   * router.unsubscribe(...middleware)
   * ```
   * @param {...(string|!RegExp|!_idio.Middleware)} nameOrPathOrMiddleware The arguments.
   */
  unsubscribe(...nameOrPathOrMiddleware) {
    return super.unsubscribe(...nameOrPathOrMiddleware)
  }
}

module.exports = IdioRouter

/**
 * @typedef {import('.').Middleware} _idio.Middleware
 * @typedef {import('../types/goa/typedefs/application').Middleware} _goa.Middleware
 */


/* typal node_modules/@goa/router/types/index.xml ignore:_goa.LayerConfig,_goa.Middleware namespace */
/**
 * @typedef {_goa.Layer} Layer `＠interface` A single piece of middleware that can be matched for all possible routes.
 * @typedef {Object} _goa.Layer `＠interface` A single piece of middleware that can be matched for all possible routes.
 * @prop {!Array<{ name: string }>} paramNames Parameter names stored in this layer. Default `[]`.
 */

/* typal node_modules/@goa/router/types/router.xml ignore:_goa.Middleware,_goa.Router namespace */
/**
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
