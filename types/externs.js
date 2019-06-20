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
 * @typedef {{ static: (_idio.StaticOptions|undefined) }}
 */
_idio.MiddlewareConfig
