export {}

/* typal types/Application.xml closure noSuppress */
/**
 * @typedef {_goa.Application} Application `＠interface` The application interface.
 */
/**
 * @typedef {events.EventEmitter & _goa.$Application} _goa.Application `＠interface` The application interface.
 */
/**
 * @typedef {Object} _goa.$Application `＠interface` The application interface.
 * @prop {boolean} [proxy] Whether the server is running behind a proxy.
 * @prop {!Array<!_goa.Middleware>} middleware The array with middleware used on the server.
 * @prop {!_goa.Context} context The context object for each request.
 * @prop {!_goa.Request} request The request object for each request.
 * @prop {!_goa.Response} response The response object for each request.
 * @prop {string} [env="development"] The value from the `NODE_ENV` environment variable. Default `development`.
 * @prop {!(_goa.Keygrip|Array<string>)} [keys] The keys for signing of the cookies.
 * @prop {boolean} [silent=false] Whether to not log an error when it happens. Default `false`.
 * @prop {function(!_goa.Middleware): !_goa.Application} use Use the given middleware `fn`. Old-style middleware will be converted.
 * @prop {function(): function(!http.IncomingMessage, !http.ServerResponse)} callback Returns the request handler callback for node's native http/http2 server composed of the installed middleware.
 * @prop {function(!http.IncomingMessage, !http.ServerResponse)} createContext `＠private` Initialize a new context.
 * @prop {function(!Error)} onerror `＠private` Default error handler.
 * @prop {number} [subdomainOffset] For example, if the domain is "tobi.ferrets.example.com": If `app.subdomainOffset` is not set, request.subdomains is `["ferrets", "tobi"]`. If `app.subdomainOffset` is 3, request.subdomains is `["tobi"]`.
 */
/**
 * @typedef {_goa.Middleware} Middleware
 */
/**
 * @typedef {function(!_goa.Context, !Function): *} _goa.Middleware
 */
/**
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 */
/**
 * @typedef {import('http').ServerResponse} http.ServerResponse
 */
/**
 * @typedef {import('events').EventEmitter} events.EventEmitter
 */

/**
 * @typedef {import('../vendor/cookies').Keygrip} _goa.Keygrip
 * @typedef {import('../../../depack').Context} _goa.Context
 * @typedef {import('../../../depack').Request} _goa.Request
 * @typedef {import('../../../depack').Response} _goa.Response
 */

// <import from="@goa/cookies/types" ns="_goa" name="Keygrip" desc="The Keygrip constructor." link="https://github.com/idiocc/cookies#type-_goakeygrip" />