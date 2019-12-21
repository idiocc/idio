export {}

/* typal types/Application.xml namespace */
/**
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 * @typedef {import('http').ServerResponse} http.ServerResponse
 * @typedef {import('http').Server} http.Server
 * @typedef {import('events').EventEmitter} events.EventEmitter
 * @typedef {import('../../../compile').Keygrip} _goa.Keygrip
 * @typedef {import('../../../compile').Context} _goa.Context
 * @typedef {import('../../../compile').Request} _goa.Request
 * @typedef {import('../../../compile').Response} _goa.Response
 * @typedef {_goa.Application} Application `＠interface` The application interface.
 * @typedef {events.EventEmitter & _goa.$Application} _goa.Application `＠interface` The application interface.
 * @typedef {Object} _goa.$Application `＠interface` The application interface.
 * @prop {boolean} [proxy=false] Whether the server is running behind a proxy. Default `false`.
 * @prop {!Array<!_goa.Middleware>} middleware The array with middleware used on the server. Default `[]`.
 * @prop {!_goa.Context} context The context object for each request.
 * @prop {!_goa.Request} request The request object for each request.
 * @prop {!_goa.Response} response The response object for each request.
 * @prop {string} [env="development"] The value from the `NODE_ENV` environment variable. Default `development`.
 * @prop {!(_goa.Keygrip|Array<string>)} [keys] The keys for signing of the cookies.
 * @prop {boolean} [silent=false] Whether to not log an error when it happens. Default `false`.
 * @prop {number} [subdomainOffset=2] For example, if the domain is _tobi.ferrets.example.com_:
 * - if `app.subdomainOffset` is not set, request.subdomains is `["ferrets", "tobi"]`.
 * - if `app.subdomainOffset` is 3, request.subdomains is `["tobi"]`. Default `2`.
 * @prop {(...args: *[]) => !http.Server} listen Shorthand for: `http.createServer(app.callback()).listen(...)`.
 * @prop {(middleware: !_goa.Middleware) => !_goa.Application} use Use the given middleware `fn`. Old-style middleware will be converted.
 * @prop {() => function(!http.IncomingMessage, !http.ServerResponse)} callback Returns the request handler callback for Node's native _http/http2_ server composed of the installed middleware.
 * @prop {(req: !http.IncomingMessage, res: !http.ServerResponse) => !_goa.Context} createContext `＠private` Initialize a new context.
 * @prop {(error: !Error) => ?} onerror `＠private` Default error handler.
 * @prop {() => !Object} toJSON Return JSON representation.
 * @prop {() => !Object} inspect `util.inspect()` implementation, which just returns the JSON output.
 * @typedef {_goa.ApplicationOptions} ApplicationOptions `＠record` Options for the application constructor.
 * @typedef {Object} _goa.ApplicationOptions `＠record` Options for the application constructor.
 * @prop {boolean} [proxy=false] Whether the app should start in a proxy mode. Default `false`.
 * @prop {number} [subdomainOffset=2] The offset for subdomains. Default `2`.
 * @prop {string} [env] App environment. The default is `process.env.NODE_ENV || 'development'`.
 * @prop {!(_goa.Keygrip|Array<string>)} [keys] The keys for cookies, or a _Keygrip_ instance.
 * @prop {new () => _goa.Context} [Context] The custom context constructor.
 * @typedef {_goa.Middleware} Middleware The function to handle requests which can be installed with the `.use` method.
 * @typedef {(ctx: !_goa.Context, next?: !Function) => (!Promise|void)} _goa.Middleware The function to handle requests which can be installed with the `.use` method.
 */
