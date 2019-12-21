/**
 * @fileoverview
 * @externs
 */

/* typal types/idio.xml externs */
/** @const */
var _idio = {}
/**
 * The application with some additions.
 * Constructor method.
 * @extends {_goa.Application}
 * @interface
 */
_idio.Application = function() {}
/**
 * The context object for each request.
 * @type {!_idio.Context}
 */
_idio.Application.prototype.context
/**
 * Terminate all active connections and close the server.
 * @return {!Promise}
 */
_idio.Application.prototype.destroy = function() {}
/**
 * The extension to the standard Goa context with properties set by middleware.
 * Constructor method.
 * @extends {_goa.Context}
 * @interface
 */
_idio.Context = function() {}
/**
 * The session object for updating, if `session` was installed. Default `null`.
 * @type {?_idio.Session}
 */
_idio.Context.prototype.session
/**
 * The options used to create the session middleware. Default `null`.
 * @type {?_idio.SessionConfig}
 */
_idio.Context.prototype.sessionOptions
/**
 * A flag added by `koa-compress` middleware. Default `null`.
 * @type {?boolean}
 */
_idio.Context.prototype.compress
/**
 * When middleware was invoked by the router, this will set the url, e.g., `user/:id`. Default `null`.
 * @type {?string}
 */
_idio.Context.prototype._matchedRoute
/**
 * When middleware was invoked by the router, this will set the route name if the route was created with a name. Default `null`.
 * @type {?string}
 */
_idio.Context.prototype._matchedRouteName
/**
 * The parameters extracted from the router. Default `null`.
 * @type {?Object}
 */
_idio.Context.prototype.params
/**
 * An instance of the router if the middleware was invoked via it. Default `null`.
 * @type {?_goa.Router}
 */
_idio.Context.prototype.router
/**
 * The function to handle requests which can be installed with the `.use` method.
 * @typedef {function(!_idio.Context,!Function=): (!Promise|void)}
 */
_idio.Middleware