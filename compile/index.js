const { _createApp, _startApp, _compose, _Keygrip, _render, _websocket } = require('./idio')
const IdioRouter = require('./router')

/**
 * Just create a _Goa_ app without starting it.
 * @param {!_idio.MiddlewareConfig} [middlewareConfig] Middleware configuration for the `idio` server.
 * @param {!_idio.StaticOptions|!Array<!_idio.StaticOptions>} [middlewareConfig.static] _Static_ middleware options.
 * @param {!_idio.CompressOptions} [middlewareConfig.compress] _Compression_ middleware options.
 * @param {!_idio.SessionOptions} [middlewareConfig.session] _Session_ middleware options.
 * @param {!_idio.CorsOptions} [middlewareConfig.cors] _CORS_ middleware options.
 * @param {!_idio.FormDataOptions} [middlewareConfig.form] _Form Data_ middleware options for receiving file uploads and form submissions.
 * @param {!_idio.FrontEndOptions} [middlewareConfig.frontend] _Front End_ middleware allows to serve source code from `node_modules` and transpile JSX.
 * @param {!_idio.NeoLudditeOptions} [middlewareConfig.neoluddite] Records the usage of middleware to compensate their developers' intellectual work.
 * @param {!_idio.CsrfCheckOptions} [middlewareConfig.csrfCheck] Enables the check for the presence of session with `csrf` property, and whether it matches the token from either `ctx.request.body` or `ctx.query`.
 * @param {!_idio.GitHubOptions|!Array<!_idio.GitHubOptions>} [middlewareConfig.github] Sets up a route for GitHub OAuth authentication. The returned middleware will be installed on the `app` automatically so it doesn't need to be passed to the router.
 * @param {!_idio.JSONErrorsOptions|!Array<!_idio.JSONErrorsOptions>} [middlewareConfig.jsonErrors] Tries all downstream middleware, and if an error was caught, serves a JSON response with `error` and `stack` properties (only if `exposeStack` is set to true). Client errors with status code _4xx_ (or that start with `!`) will have full message, but server errors with status code _5xx_ will only be served as `{ error: 'internal server error '}` and the app will emit an error via `app.emit('error')` so that it's logged.
 * @param {!_idio.JSONBodyOptions} [middlewareConfig.jsonBody] Allows to parse incoming JSON request and store the result in `ctx.request.body`. Throws 400 when the request cannot be parsed.
 * @param {!_goa.RouterConfig=} [routerConfig] The optional configuration for the router.
 * @return {Promise<{ app: !_idio.Application, middleware: !Object<string, !_idio.Middleware>, router: !_idio.Router }>}
 */
async function createApp(middlewareConfig) {
  return _createApp(middlewareConfig)
}

/**
 * Start the server. Sets the `proxy` property to `true` when the NODE_ENV is equal to _production_.
 * @param {!_idio.MiddlewareConfig} [middlewareConfig] Middleware configuration for the `idio` server.
 * @param {!_idio.StaticOptions|!Array<!_idio.StaticOptions>} [middlewareConfig.static] _Static_ middleware options.
 * @param {!_idio.CompressOptions} [middlewareConfig.compress] _Compression_ middleware options.
 * @param {!_idio.SessionOptions} [middlewareConfig.session] _Session_ middleware options.
 * @param {!_idio.CorsOptions} [middlewareConfig.cors] _CORS_ middleware options.
 * @param {!_idio.FormDataOptions} [middlewareConfig.form] _Form Data_ middleware options for receiving file uploads and form submissions.
 * @param {!_idio.FrontEndOptions} [middlewareConfig.frontend] _Front End_ middleware allows to serve source code from `node_modules` and transpile JSX.
 * @param {!_idio.NeoLudditeOptions} [middlewareConfig.neoluddite] Records the usage of middleware to compensate their developers' intellectual work.
 * @param {!_idio.CsrfCheckOptions} [middlewareConfig.csrfCheck] Enables the check for the presence of session with `csrf` property, and whether it matches the token from either `ctx.request.body` or `ctx.query`.
 * @param {!_idio.GitHubOptions|!Array<!_idio.GitHubOptions>} [middlewareConfig.github] Sets up a route for GitHub OAuth authentication. The returned middleware will be installed on the `app` automatically so it doesn't need to be passed to the router.
 * @param {!_idio.JSONErrorsOptions|!Array<!_idio.JSONErrorsOptions>} [middlewareConfig.jsonErrors] Tries all downstream middleware, and if an error was caught, serves a JSON response with `error` and `stack` properties (only if `exposeStack` is set to true). Client errors with status code _4xx_ (or that start with `!`) will have full message, but server errors with status code _5xx_ will only be served as `{ error: 'internal server error '}` and the app will emit an error via `app.emit('error')` so that it's logged.
 * @param {!_idio.JSONBodyOptions} [middlewareConfig.jsonBody] Allows to parse incoming JSON request and store the result in `ctx.request.body`. Throws 400 when the request cannot be parsed.
 * @param {!_idio.Config} [config] Server configuration object.
 * @param {number} [config.port=5000] The port on which to start the server. Default `5000`.
 * @param {string} [config.host="0.0.0.0"] The host on which to listen. Default `0.0.0.0`.
 * @param {!_goa.RouterConfig} [config.router] The configuration for the router.
 * @return {Promise<!_idio.Idio>}
 */
async function idio(middlewareConfig = {}, config = {}) {
  return _startApp(middlewareConfig, config)
}

/**
 * Renders the _VNode_ into the string.
 * @param {preact.VNode} vnode The VNode to render. Can be written in JSX syntax in `.jsx` files.
 * @param {!_depack.RenderConfig} [config] Rendering options.
 * @param {boolean} [config.addDoctype=false] Adds the `<!doctype html>` at the beginning of the return string. Default `false`.
 * @param {boolean} [config.shallow=false] If `true`, renders nested Components as HTML elements (`<Foo a="b" />`). Default `false`.
 * @param {boolean} [config.xml=false] If `true`, uses self-closing tags for elements without children. Default `false`.
 * @param {boolean} [config.pretty=false] If `true`, adds `  ` whitespace for readability. Pass a string to indicate the indentation character, e.g., `\t`. Default `false`.
 * @param {number} [config.lineLength=40] The number of characters on one line above which the line should be split in the `pretty` mode. Default `40`.
 * @param {number} [config.initialPadding=0] The initial padding to apply to each line when pretty printing. Default `0`.
 * @param {boolean} [config.closeVoidTags=false] Whether the void tags will be auto-closed (for xhtml support). Default `false`.
 * @param {boolean} [config.renderRootComponent=false] When shallow rendering is on, will render root component. Default `false`.
 * @param {boolean} [config.shallowHighOrder=false] When shallow rendering is on, will render root component. Default `false`.
 * @param {boolean} [config.sortAttributes=false] Sort attributes' keys using the `.sort` method. Default `false`.
 * @param {boolean} [config.allAttributes=false] Render all attributes, including `key` and `ref`. Default `false`.
 * @param {*=} [context] The context for the node.
 * @return {string}
 */
function render(vnode, config, context) {
  return _render(vnode, config, context)
}

/**
 * Sets up a listener for the `UPGRADE` event on the server, and stores all connected clients in the client list. When clients disconnect, they are removed from this list. The list is a hash object where each key is the _accept key_ sent by the client, and values are the callback functions to send messages to those clients.
 * @param {!http.Server} server The server on which to setup the listener.
 * @param {!_idio.WebSocketConfig} [config] Options for the web socket protocol communication.
 * @param {boolean} [config.log=true] Whether to log on connect and disconnect. Default `true`.
 * @param {(clientID: string, message: string) => void} [config.onMessage] The callback when a message is received from a client.
 * @param {(clientID: string) => void} [config.onConnect] The callback when a client is connected.
 * @return {!Object<string, _idio.sendMessage>}
 */
function websocket(server, config) {
  return _websocket(server, config)
}

/**
 * Signing and verifying data (such as cookies or URLs) through a rotating credential system.
 */
class Keygrip extends _Keygrip {
  /**
   * Creates a new Keygrip instance. Default algorithm is `sha1` and default encoding is `base64`.
   * @param {!Array<string>} keys The keys to use for signing.
   * @param {string=} [algorithm] The algorithm. Default `sha1`.
   * @param {string=} [encoding] The encoding. Default `base64`.
   */
  constructor(keys, algorithm, encoding) {
    super(keys, algorithm, encoding)
  }
  /**
   * This creates a SHA1 HMAC based on the _first_ key in the keylist, and outputs it as a 27-byte url-safe base64 digest (base64 without padding, replacing `+` with `-` and `/` with `_`).
   * @param {*} data The value to sign.
   * @return {string}
   */
  sign(data) {
    return super.sign(data)
  }
  /**
   * This loops through all of the keys currently in the keylist until the digest of the current key matches the given digest, at which point the current index is returned. If no key is matched, -1 is returned. The idea is that if the index returned is greater than `0`, the data should be re-signed to prevent premature credential invalidation, and enable better performance for subsequent challenges.
   * @param {*} data The value to verify.
   * @param {string} digest The digest to verify against.
   * @return {number}
   */
  index(data, digest) {
    return super.index(data, digest)
  }
  /**
   * This uses `index` to return true if the digest matches any existing keys, and false otherwise.
   * @param {*} data The value to verify.
   * @param {string} digest The digest to verify against.
   * @return {boolean}
   */
  verify(data, digest) {
    return super.verify(data, digest)
  }
}

module.exports = idio
module.exports.createApp = createApp
module.exports.Router = IdioRouter
module.exports.Keygrip = Keygrip
module.exports.render = render
module.exports.websocket = websocket

/**
 * Compose a single middleware function for Goa out of many.
 * @param {!Array<!Function>} middleware The array with the middleware.
 * @return {!_goa.Middleware}
 */
function $compose(middleware) {
  return _compose(middleware)
}

module.exports.compose = $compose

/**
 * @typedef {IdioRouter} _idio.Router
 * @typedef {_idio.StaticOptions} StaticOptions
 * @typedef {_idio.StaticConfig} StaticConfig
 *
 * @typedef {_idio.FormDataOptions} FormDataOptions
 * @typedef {_multipart.FormDataConfig} FormDataConfig
 * @typedef {_multipart.FormDataField} FormDataField
 *
 * @typedef {import('../types/goa/typedefs/application').Application} _goa.Application
 * @typedef {import('../types/goa/typedefs/application').Middleware} _goa.Middleware
 * @typedef {import('../types/goa/typedefs/context').Context} _goa.Context
 * @typedef {import('../types/goa/typedefs/request').Request} _goa.Request
 *
 * @typedef {import('./router').RouterConfig} _goa.RouterConfig
 */

/* typal types/idio.xml namespace ignore:_goa.Application,_goa.Context */
/**
 * @typedef {_idio.Application} Application `＠interface` The application with some additions.
 * @typedef {_idio.$Application & _goa.Application} _idio.Application `＠interface` The application with some additions.
 * @typedef {Object} _idio.$Application `＠interface` The application with some additions.
 * @prop {!_idio.Context} context The context object for each request.
 * @prop {!Array<!_idio.Middleware>} middleware The array with middleware used on the server. Default `[]`.
 * @prop {() => !Promise} destroy Terminate all active connections and close the server.
 * @prop {(middleware: !_idio.Middleware) => !_idio.Application} use Use the given middleware `fn`. Old-style middleware will be converted.
 * @typedef {_idio.Request} Request `＠interface` The Goa request with additional properties.
 * @typedef {_idio.$Request & _goa.Request} _idio.Request `＠interface` The Goa request with additional properties.
 * @typedef {Object} _idio.$Request `＠interface` The Goa request with additional properties.
 * @prop {Object} body Parsed body of the request, extract using _Form Data_ or _JSON Body_ middleware. Default `null`.
 * @typedef {_idio.Context} Context `＠interface` The extension to the standard Goa context with properties set by middleware.
 * @typedef {_idio.$Context & _goa.Context} _idio.Context `＠interface` The extension to the standard Goa context with properties set by middleware.
 * @typedef {Object} _idio.$Context `＠interface` The extension to the standard Goa context with properties set by middleware.
 * @prop {!_idio.Request} request The request instance specific to _Idio_.
 * @prop {!_idio.Session|undefined} session The session object for updating, if `session` was installed. Set the `ctx.session` to null to destroy the session.
 * @prop {!_idio.SessionConfig|undefined} sessionOptions The options used to create the session middleware. Deep cloned for each request.
 * @prop {?boolean} compress A flag that can be added to explicitly set whether the response should be compressed by the `compress` middleware. Default `null`.
 * @prop {!Array<_multipart.FormDataFile>|!Object<string, !Array<_multipart.FormDataFile>>|_multipart.FormDataFile} files Files extracted from the request's form data. Default `null`.
 * @prop {_multipart.FormDataFile} file A single file extracted from the request's form data. Default `null`.
 * @prop {?string} _matchedRoute When middleware was invoked by the router, this will set the url, e.g., `user/:id`. Default `null`.
 * @prop {?string} _matchedRouteName When middleware was invoked by the router, this will set the route name if the route was created with a name. Default `null`.
 * @prop {?Object} params The parameters extracted from the router. Default `null`.
 * @prop {?_idio.Router} router An instance of the router if the middleware was invoked via it. Default `null`.
 * @prop {?string} mountPath When serving files through `mount`, this property will be set to the mount prefix. Default `null`.
 * @prop {Array} _usage An array with accumulated usage events. Default `null`.
 * @prop {(pckg: string, item: string, props?: !Object) => void} neoluddite Records the item for usage via `neoluddite.dev`.
 * @typedef {_idio.Middleware} Middleware The function to handle requests which can be installed with the `.use` method.
 * @typedef {(ctx: !_idio.Context, next?: !Function) => (!Promise|void)} _idio.Middleware The function to handle requests which can be installed with the `.use` method.
 */

/* typal types/index.xml namespace */
/**
 * @typedef {import('http').Server} http.Server
 * @typedef {_idio.Config} Config Server configuration object.
 * @typedef {Object} _idio.Config Server configuration object.
 * @prop {number} [port=5000] The port on which to start the server. Default `5000`.
 * @prop {string} [host="0.0.0.0"] The host on which to listen. Default `0.0.0.0`.
 * @prop {!_goa.RouterConfig} [router] The configuration for the router.
 * @typedef {_idio.Idio} Idio `＠record` The return type of the idio.
 * @typedef {Object} _idio.Idio `＠record` The return type of the idio.
 * @prop {string} url The URL on which the server was started, such as `http://localhost:5000`.
 * @prop {!http.Server} server The server instance.
 * @prop {!_idio.Application} app The Goa application instance (with additional `.destroy` method).
 * @prop {!_idio.ConfiguredMiddleware} middleware An object with configured middleware functions, which can be installed manually using `app.use`, or `router.use`. The context will be a standard Goa context with certain properties set by bundled middleware such as `.session`.
 * @prop {!_idio.Router} router The router instance.
 * @typedef {_idio.MiddlewareObject} MiddlewareObject The object with all configured middleware after the server has been configured.
 * @typedef {!Object<string, !_idio.Middleware>} _idio.MiddlewareObject The object with all configured middleware after the server has been configured.
 * @typedef {_idio.ConfiguredMiddleware} ConfiguredMiddleware `＠record` Idio-specific properties of the middleware object.
 * @typedef {_idio.$ConfiguredMiddleware & _idio.MiddlewareObject} _idio.ConfiguredMiddleware `＠record` Idio-specific properties of the middleware object.
 * @typedef {Object} _idio.$ConfiguredMiddleware `＠record` Idio-specific properties of the middleware object.
 * @prop {!_multipart.FormData} [form] An instance of the form data class that can be used to create middleware.
 * @prop {!_idio.Middleware} [session] The session middleware to be installed on individual routes.
 * @prop {!_idio.Middleware} [csrfCheck] Configured CSRF check middleware.
 * @prop {!_idio.Middleware|!Array<!_idio.Middleware>} [jsonErrors] Configured CSRF check middleware.
 */

/* typal types/middleware.xml namespace */
/**
 * @typedef {import('../types/options').CorsOptions} _idio.CorsOptions
 * @typedef {import('../types/modules/cors').CorsConfig} _goa.CorsConfig
 * @typedef {import('../types/options').StaticOptions} _idio.StaticOptions
 * @typedef {import('../types/modules/static').StaticConfig} _idio.StaticConfig
 * @typedef {import('../types/options').CompressOptions} _idio.CompressOptions
 * @typedef {import('../types/modules').CompressConfig} _goa.CompressConfig
 * @typedef {import('../types/options').SessionOptions} _idio.SessionOptions
 * @typedef {import('../types/options').SessionConfig} _idio.SessionConfig
 * @typedef {import('../types/modules/session').Session} _idio.Session
 * @typedef {import('../types/options').FormDataOptions} _idio.FormDataOptions
 * @typedef {import('../types/modules/form-data').FormDataConfig} _multipart.FormDataConfig
 * @typedef {import('../types/modules/form-data').FormData} _multipart.FormData
 * @typedef {import('../types/modules/form-data').FormDataFile} _multipart.FormDataFile
 * @typedef {import('../types/modules/form-data').FormDataField} _multipart.FormDataField
 * @typedef {import('../types/options').FrontEndOptions} _idio.FrontEndOptions
 * @typedef {import('../types/options').NeoLudditeOptions} _idio.NeoLudditeOptions
 * @typedef {import('../types/options').CsrfCheckOptions} _idio.CsrfCheckOptions
 * @typedef {import('../types/options').JSONErrorsOptions} _idio.JSONErrorsOptions
 * @typedef {import('../types/options').GitHubOptions} _idio.GitHubOptions
 * @typedef {_idio.MiddlewareConfig} MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 * @typedef {_idio.$MiddlewareConfig & _idio.FnMiddlewareConfig} _idio.MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 * @typedef {Object} _idio.$MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 * @prop {!_idio.StaticOptions|!Array<!_idio.StaticOptions>} [static] _Static_ middleware options.
 * @prop {!_idio.CompressOptions} [compress] _Compression_ middleware options.
 * @prop {!_idio.SessionOptions} [session] _Session_ middleware options.
 * @prop {!_idio.CorsOptions} [cors] _CORS_ middleware options.
 * @prop {!_idio.FormDataOptions} [form] _Form Data_ middleware options for receiving file uploads and form submissions.
 * @prop {!_idio.FrontEndOptions} [frontend] _Front End_ middleware allows to serve source code from `node_modules` and transpile JSX.
 * @prop {!_idio.NeoLudditeOptions} [neoluddite] Records the usage of middleware to compensate their developers' intellectual work.
 * @prop {!_idio.CsrfCheckOptions} [csrfCheck] Enables the check for the presence of session with `csrf` property, and whether it matches the token from either `ctx.request.body` or `ctx.query`.
 * @prop {!_idio.GitHubOptions|!Array<!_idio.GitHubOptions>} [github] Sets up a route for GitHub OAuth authentication. The returned middleware will be installed on the `app` automatically so it doesn't need to be passed to the router.
 * @prop {!_idio.JSONErrorsOptions|!Array<!_idio.JSONErrorsOptions>} [jsonErrors] Tries all downstream middleware, and if an error was caught, serves a JSON response with `error` and `stack` properties (only if `exposeStack` is set to true). Client errors with status code _4xx_ (or that start with `!`) will have full message, but server errors with status code _5xx_ will only be served as `{ error: 'internal server error '}` and the app will emit an error via `app.emit('error')` so that it's logged.
 * @prop {!_idio.JSONBodyOptions} [jsonBody] Allows to parse incoming JSON request and store the result in `ctx.request.body`. Throws 400 when the request cannot be parsed.
 * @typedef {_idio.FnMiddlewareConfig} FnMiddlewareConfig Middleware Config With Functions.
 * @typedef {!Object<string, !_idio.ConfigItem>} _idio.FnMiddlewareConfig Middleware Config With Functions.
 * @typedef {_idio.ConfigItem} ConfigItem An item in middleware configuration.
 * @typedef {!_goa.Middleware|{ use: boolean, middlewareConstructor: !_idio.MiddlewareConstructor, config: !Object }} _idio.ConfigItem An item in middleware configuration.
 * @typedef {_idio.MiddlewareConstructor} MiddlewareConstructor A function used to create middleware. It will generate a middleware function using the options and config.
 * @typedef {(app: !_goa.Application, config: !Object, options: !Object) => !_goa.Middleware|!_multipart.FormData} _idio.MiddlewareConstructor A function used to create middleware. It will generate a middleware function using the options and config.
 */

/* typal node_modules/@depack/render/types/index.xml namespace */
/**
 * @typedef {_depack.RenderConfig} RenderConfig `＠record` Rendering options.
 * @typedef {Object} _depack.RenderConfig `＠record` Rendering options.
 * @prop {boolean} [addDoctype=false] Adds the `<!doctype html>` at the beginning of the return string. Default `false`.
 * @prop {boolean} [shallow=false] If `true`, renders nested Components as HTML elements (`<Foo a="b" />`). Default `false`.
 * @prop {boolean} [xml=false] If `true`, uses self-closing tags for elements without children. Default `false`.
 * @prop {boolean} [pretty=false] If `true`, adds `  ` whitespace for readability. Pass a string to indicate the indentation character, e.g., `\t`. Default `false`.
 * @prop {number} [lineLength=40] The number of characters on one line above which the line should be split in the `pretty` mode. Default `40`.
 * @prop {number} [initialPadding=0] The initial padding to apply to each line when pretty printing. Default `0`.
 * @prop {boolean} [closeVoidTags=false] Whether the void tags will be auto-closed (for xhtml support). Default `false`.
 * @prop {boolean} [renderRootComponent=false] When shallow rendering is on, will render root component. Default `false`.
 * @prop {boolean} [shallowHighOrder=false] When shallow rendering is on, will render root component. Default `false`.
 * @prop {boolean} [sortAttributes=false] Sort attributes' keys using the `.sort` method. Default `false`.
 * @prop {boolean} [allAttributes=false] Render all attributes, including `key` and `ref`. Default `false`.
 */

/* typal node_modules/@idio/websocket/types/index.xml namespace */
/**
 * @typedef {_idio.WebSocketConfig} WebSocketConfig Options for the web socket protocol communication.
 * @typedef {Object} _idio.WebSocketConfig Options for the web socket protocol communication.
 * @prop {boolean} [log=true] Whether to log on connect and disconnect. Default `true`.
 * @prop {(clientID: string, message: string) => void} [onMessage] The callback when a message is received from a client.
 * @prop {(clientID: string) => void} [onConnect] The callback when a client is connected.
 */

// typework
/**
 * @typedef {import('../types/goa/vendor/cookies').Cookies} Cookies
 * @typedef {import('../types/goa/vendor/accepts').Accepts} Accepts
 * @typedef {import('../types/goa/typedefs/application').Middleware} Middleware
 * @typedef {import('../types/goa/typedefs/application').Application} Application
 * @typedef {import('../types/goa/typedefs/application').ApplicationOptions} ApplicationOptions
 * @typedef {import('../types/goa/typedefs/context').Context} Context
 * @typedef {import('../types/goa/typedefs/request').Request} Request
 * @typedef {import('../types/goa/typedefs/request').ContextDelegatedRequest} ContextDelegatedRequest
 * @typedef {import('../types/goa/typedefs/response').Response} Response
 * @typedef {import('../types/goa/typedefs/response').ContextDelegatedResponse} ContextDelegatedResponse
 */