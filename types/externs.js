/* typal types/index.xml externs */
/** @const */
var _idio = {}
/**
 * Server configuration object.
 * @typedef {{ port: (number|undefined), host: (string|undefined) }}
 */
_idio.Config

/* typal types/middleware.xml externs */
/**
 * Middleware configuration for the `idio` `core` server.
 * @typedef {{ static: (_idio.StaticOptions|undefined), compress: (_idio.CompressOptions|undefined) }}
 */
_idio.MiddlewareConfig

/**
 * This is added by the koa-compress middleware.
 * @type {boolean}
 */
_goa.Context.prototype.compress
/** @type {!Function} */
_goa.Application.prototype.destroy
/** @type {!Function} */
http.Server.prototype.destroy