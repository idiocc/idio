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
 * The function to handle requests which can be installed with the `.use` method.
 * @typedef {function(!_idio.Context,!Function=): (!Promise|void)}
 */
_idio.Middleware
