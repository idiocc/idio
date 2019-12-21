export {}

/**
 * @typedef {import('..').MiddlewareConfig} _idio.MiddlewareConfig
 * @typedef {import('..').Config} _idio.Config
 * @typedef {import('..').RouterConfig} _goa.RouterConfig
 * @typedef {import('..').Router} _goa.Router
 * @typedef {import('..').Middleware} _idio.Middleware
 */

/* typal types/api.xml namespace */
/**
 * @typedef {_idio.idio} idio Start the server. Sets the `proxy` property to `true` when the NODE_ENV is equal to _production_.
 * @typedef {(middlewareConfig?: !_idio.MiddlewareConfig, config?: !_idio.Config) => !_idio.Idio} _idio.idio Start the server. Sets the `proxy` property to `true` when the NODE_ENV is equal to _production_.
 * @typedef {_idio.createApp} createApp Just create a _Goa_ app without starting it.
 * @typedef {(middlewareConfig?: !_idio.MiddlewareConfig, routerConfig?: !_goa.RouterConfig) => { app: !_idio.Application, middleware: !Object<string, !_idio.Middleware>, router: !_goa.Router }} _idio.createApp Just create a _Goa_ app without starting it.
 */
