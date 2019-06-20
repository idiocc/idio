export {}
/* typal types/index.xml closure noSuppress */
/**
 * @typedef {_idio.Config} Config Server configuration object.
 */
/**
 * @typedef {Object} _idio.Config Server configuration object.
 * @prop {number} [port=5000] The port on which to start the server. Default `5000`.
 * @prop {string} [host="0.0.0.0"] The host on which to listen. Default `0.0.0.0`.
 */

/* typal types/middleware.xml closure noSuppress */
/**
 * @typedef {_idio.MiddlewareConfig} MiddlewareConfig Middleware configuration for the `idio` `core` server.
 */
/**
 * @typedef {Object} _idio.MiddlewareConfig Middleware configuration for the `idio` `core` server.
 * @prop {_idio.StaticOptions} [static] `static` options.
 */

/**
 * @typedef {import('../src').StaticOptions} _idio.StaticOptions
 */