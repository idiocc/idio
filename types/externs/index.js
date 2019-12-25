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
 * The array with middleware used on the server. Default `[]`.
 * @type {!Array<!_idio.Middleware>}
 */
_idio.Application.prototype.middleware
/**
 * Terminate all active connections and close the server.
 * @return {!Promise}
 */
_idio.Application.prototype.destroy = function() {}
/**
 * Use the given middleware `fn`. Old-style middleware will be converted.
 * @param {!_idio.Middleware} middleware The middleware to install.
 * @return {!_idio.Application}
 */
_idio.Application.prototype.use = function(middleware) {}
/**
 * The extension to the standard Goa context with properties set by middleware.
 * Constructor method.
 * @extends {_goa.Context}
 * @interface
 */
_idio.Context = function() {}
/**
 * The session object for updating, if `session` was installed. Set the `ctx.session` to null to destroy the session.
 * @type {!_idio.Session|undefined}
 */
_idio.Context.prototype.session
/**
 * The options used to create the session middleware. Deep cloned for each request.
 * @type {!_idio.SessionConfig|undefined}
 */
_idio.Context.prototype.sessionOptions
/**
 * A flag that can be added to explicitly set whether the response should be compressed by the `compress` middleware. Default `null`.
 * @type {?boolean}
 */
_idio.Context.prototype.compress
/**
 * Files extracted from the request's form data. Default `null`.
 * @type {!Array<_multipart.FormDataFile>|!Object<string, !Array<_multipart.FormDataFile>>|_multipart.FormDataFile}
 */
_idio.Context.prototype.files
/**
 * A single file extracted from the request's form data. Default `null`.
 * @type {_multipart.FormDataFile}
 */
_idio.Context.prototype.file
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
 * @type {?_idio.Router}
 */
_idio.Context.prototype.router
/**
 * The function to handle requests which can be installed with the `.use` method.
 * @typedef {function(!_idio.Context,!Function=): (!Promise|void)}
 */
_idio.Middleware

/**
 * Just manually add the router.
 * @extends {_goa.Router}
 * @interface
 */
_idio.Router = function() {}