/**
 * @fileoverview The bundled modules' externs.
 * @externs
 */
/* typal types/index.xml externs */
/** @const */
var _idio = {}
/**
 * Server configuration object.
 * @typedef {{ port: (number|undefined), host: (string|undefined), router: ((!_goa.RouterConfig)|undefined) }}
 */
_idio.Config
/**
 * @record
 */
_idio.Idio
/**
 * The URL on which the server was started, such as `http://localhost:5000`.
 * @type {string}
 */
_idio.Idio.prototype.url
/**
 * The server instance.
 * @type {!http.Server}
 */
_idio.Idio.prototype.server
/**
 * The Goa application instance.
 * @type {!_goa.Application}
 */
_idio.Idio.prototype.app
/**
 * An object with configured middleware functions, which can be installed manually using `app.use`, or `router.use`.
 * @type {!Object<string, !_goa.Middleware>}
 */
_idio.Idio.prototype.middleware
/**
 * The router instance.
 * @type {!_goa.Router}
 */
_idio.Idio.prototype.router

/* typal types/middleware.xml externs */
/**
 * Middleware configuration for the `idio` server.
 * @extends {_idio.FnMiddlewareConfig}
 * @record
 */
_idio.MiddlewareConfig
/**
 * `koa-static` options.
 * @type {_idio.StaticOptions|undefined}
 */
_idio.MiddlewareConfig.prototype.static
/**
 * `koa-compress` options.
 * @type {_idio.CompressOptions|undefined}
 */
_idio.MiddlewareConfig.prototype.compress
/**
 * `koa-session` options.
 * @type {_idio.SessionOptions|undefined}
 */
_idio.MiddlewareConfig.prototype.session
/**
 * `koa-cors` options.
 * @type {_idio.CorsOptions|undefined}
 */
_idio.MiddlewareConfig.prototype.cors
/**
 * Middleware Config With Functions.
 * @typedef {!Object<string, !_idio.ConfigItem>}
 */
_idio.FnMiddlewareConfig
/**
 * An item in middleware configuration.
 * @typedef {!_goa.Middleware|{ use: boolean, middlewareConstructor: !_idio.MiddlewareConstructor, config: !Object }}
 */
_idio.ConfigItem
/**
 * A function used to create middleware.
 * @typedef {function(!_goa.Application,!Object,!Object): !Promise<!_goa.Middleware>}
 */
_idio.MiddlewareConstructor

/**
 * This is added by the koa-compress middleware.
 * @type {boolean}
 */
_goa.Context.prototype.compress
/** @type {!Function} */
_goa.Application.prototype.destroy
/** @type {!Function} */
http.Server.prototype.destroy