export {}

/* typal types/Context.xml namespace */
/**
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 * @typedef {import('http').ServerResponse} http.ServerResponse
 * @typedef {import('../../../compile').Cookies} _goa.Cookies
 * @typedef {import('../../../compile').Application} _goa.Application
 * @typedef {import('../../../compile').Request} _goa.Request
 * @typedef {import('../../../compile').Response} _goa.Response
 * @typedef {import('../../../compile').ContextDelegatedResponse} _goa.ContextDelegatedResponse
 * @typedef {import('../../../compile').ContextDelegatedRequest} _goa.ContextDelegatedRequest
 * @typedef {_goa.Context} Context `＠interface` The context object for each request.
 * @typedef {_goa.ContextDelegatedResponse & _goa.ContextDelegatedRequest & _goa.$Context} _goa.Context `＠interface` The context object for each request.
 * @typedef {Object} _goa.$Context `＠interface` The context object for each request.
 * @prop {!_goa.Cookies} cookies The cookies instance.
 * @prop {boolean} respond To bypass Koa's built-in response handling, you may explicitly set `ctx.respond = false;`
 * @prop {string} originalUrl Get request original URL.
 * @prop {Object} state The recommended namespace for passing information through middleware and to your frontend views.
 * @prop {!_goa.Application} app The reference to the application.
 * @prop {!_goa.Request} request The reference to the request instance.
 * @prop {!_goa.Response} response The reference to the response instance.
 * @prop {!http.IncomingMessage} req The message from the client.
 * @prop {!http.ServerResponse} res The response from the server.
 * @prop {() => !Object} inspect `util.inspect()` implementation, which just returns the JSON output.
 * @prop {() => !Object} toJSON Return JSON representation.
 * @prop {(value: *, status?: number, message?: string, opts?: !Object) => void} assert Similar to .throw(), adds assertion.
 * ```js
 * ctx.assert(ctx.user, 401, 'Please login!')
 * ```
 * @prop {(status?: number, message?: string, props?: string) => ?} throw Throw an error with `msg` and optional `status` defaulting to 500. Note that these are user-level errors, and the message may be exposed to the client.
 * ```js
 * ctx.throw(403)
 * ctx.throw(400, 'name required')
 * ctx.throw('something exploded')
 * ctx.throw(new Error('invalid'))
 * ctx.throw(400, new Error('invalid'))
 * ```
 * @prop {(error: !Error) => ?} onerror Default error handling.
 */
