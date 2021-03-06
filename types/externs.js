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
 * The return type of the idio.
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
 * The Goa application instance (with additional `.destroy` method).
 * @type {!_idio.Application}
 */
_idio.Idio.prototype.app
/**
 * An object with configured middleware functions, which can be installed manually using `app.use`, or `router.use`. The context will be a standard Goa context with certain properties set by bundled middleware such as `.session`.
 * @type {!_idio.ConfiguredMiddleware}
 */
_idio.Idio.prototype.middleware
/**
 * The router instance.
 * @type {!_idio.Router}
 */
_idio.Idio.prototype.router
/**
 * The object with all configured middleware after the server has been configured.
 * @typedef {!Object<string, !_idio.Middleware>}
 */
_idio.MiddlewareObject
/**
 * Idio-specific properties of the middleware object.
 * @extends {_idio.MiddlewareObject}
 * @record
 */
_idio.ConfiguredMiddleware
/**
 * An instance of the form data class that can be used to create middleware.
 * @type {(!_multipart.FormData)|undefined}
 */
_idio.ConfiguredMiddleware.prototype.form
/**
 * The session middleware to be installed on individual routes.
 * @type {(!_idio.Middleware)|undefined}
 */
_idio.ConfiguredMiddleware.prototype.session
/**
 * The frontend middleware.
 * @type {(!_idio.Middleware)|undefined}
 */
_idio.ConfiguredMiddleware.prototype.frontend
/**
 * Configured CSRF check middleware.
 * @type {(!_idio.Middleware)|undefined}
 */
_idio.ConfiguredMiddleware.prototype.csrfCheck
/**
 * Middleware to server errors as JSON.
 * @type {(!_idio.Middleware|!Array<!_idio.Middleware>)|undefined}
 */
_idio.ConfiguredMiddleware.prototype.jsonErrors

/* typal types/middleware.xml externs */
/**
 * Middleware configuration for the `idio` server.
 * @extends {_idio.FnMiddlewareConfig}
 * @record
 */
_idio.MiddlewareConfig
/**
 * _Static_ middleware options.
 * @type {(!_idio.StaticOptions|!Array<!_idio.StaticOptions>)|undefined}
 */
_idio.MiddlewareConfig.prototype.static
/**
 * _Compression_ middleware options.
 * @type {(boolean|!_idio.CompressOptions)|undefined}
 */
_idio.MiddlewareConfig.prototype.compress
/**
 * _Session_ middleware options.
 * @type {(!_idio.SessionOptions)|undefined}
 */
_idio.MiddlewareConfig.prototype.session
/**
 * _CORS_ middleware options.
 * @type {(!_idio.CorsOptions)|undefined}
 */
_idio.MiddlewareConfig.prototype.cors
/**
 * _Form Data_ middleware options for receiving file uploads and form submissions.
 * @type {(!_idio.FormDataOptions)|undefined}
 */
_idio.MiddlewareConfig.prototype.form
/**
 * _Front End_ middleware allows to serve source code from `node_modules` and transpile JSX.
 * @type {(!_idio.FrontEndOptions)|undefined}
 */
_idio.MiddlewareConfig.prototype.frontend
/**
 * Records the usage of middleware to compensate their developers' intellectual work.
 * @type {(!_idio.NeoLudditeOptions)|undefined}
 */
_idio.MiddlewareConfig.prototype.neoluddite
/**
 * Enables the check for the presence of session with `csrf` property, and whether it matches the token from either `ctx.request.body` or `ctx.query`.
 * @type {(!_idio.CsrfCheckOptions)|undefined}
 */
_idio.MiddlewareConfig.prototype.csrfCheck
/**
 * Sets up a route for GitHub OAuth authentication. The returned middleware will be installed on the `app` automatically so it doesn't need to be passed to the router.
 * @type {(!_idio.GitHubOptions|!Array<!_idio.GitHubOptions>)|undefined}
 */
_idio.MiddlewareConfig.prototype.github
/**
 * Tries all downstream middleware, and if an error was caught, serves a JSON response with `error` and `stack` properties (only if `exposeStack` is set to true). Client errors with status code _4xx_ (or that start with `!`) will have full message, but server errors with status code _5xx_ will only be served as `{ error: 'internal server error '}` and the app will emit an error via `app.emit('error')` so that it's logged.
 * @type {(boolean|!_idio.JSONErrorsOptions|!Array<!_idio.JSONErrorsOptions>)|undefined}
 */
_idio.MiddlewareConfig.prototype.jsonErrors
/**
 * Allows to parse incoming JSON request and store the result in `ctx.request.body`. Throws 400 when the request cannot be parsed.
 * @type {(boolean|!_idio.JSONBodyOptions)|undefined}
 */
_idio.MiddlewareConfig.prototype.jsonBody
/**
 * Options to record hits in _ElasticSearch_.
 * @type {(!_idio.LogarithmOptions)|undefined}
 */
_idio.MiddlewareConfig.prototype.logarithm
/**
 * Middleware Config With Functions.
 * @typedef {!Object<string, !_idio.ConfigItem>}
 */
_idio.FnMiddlewareConfig
/**
 * An item in middleware configuration.
 * @typedef {!_goa.Middleware|{ use: boolean, middlewareConstructor: (!_idio.MiddlewareConstructor|undefined), config: (!Object|undefined) }|boolean}
 */
_idio.ConfigItem
/**
 * A function used to create middleware. It will generate a middleware function using the options and config.
 * @typedef {function(!_goa.Application,!Object,!Object): !Promise<!_goa.Middleware|!_multipart.FormData>}
 */
_idio.MiddlewareConstructor

/* typal types/api.xml externs */
/**
 * Start the server. Sets the `proxy` property to `true` when the NODE_ENV is equal to _production_.
 * @typedef {function(!_idio.MiddlewareConfig=,!_idio.Config=): !Promise<!_idio.Idio>}
 */
_idio.idio
/**
 * Just create a _Goa_ app without starting it.
 * @typedef {function(!_idio.MiddlewareConfig=,!_goa.RouterConfig=): !Promise<{ app: !_idio.Application, middleware: !Object<string, !_idio.Middleware>, router: !_idio.Router }>}
 */
_idio.createApp

// this we implemented manually
/** @type {!Function} */
http.Server.prototype.destroy
