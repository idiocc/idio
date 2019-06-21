export {}

/* typal types/Response.xml closure noSuppress */
/**
 * @typedef {_goa.ContextDelegatedResponse} ContextDelegatedResponse `＠interface` The response API available via Context.
 */
/**
 * @typedef {Object} _goa.ContextDelegatedResponse `＠interface` The response API available via Context.
 * @prop {function(string, ?): void} attachment Set Content-Disposition header to "attachment" with optional `filename`.
 * @prop {function(string, string=): void} redirect Perform a 302 redirect to `url`. The string "back" is special-cased to provide Referrer support, when Referrer is not present `alt` or "/" is used. _Examples_:
      - `this.redirect('back')`
      - `this.redirect('back', '/index.html')`
      - `this.redirect('/login')`
      - `this.redirect('http://google.com')`
 * @prop {function(string): void} remove Remove header `field`.
 * @prop {function(string): void} vary Vary on `field`.
 * @prop {function((string|!Object), (string|!Array|number)=): void} set Set header `field` to `val`, or pass an object of header fields. _Examples_:
      - `this.set('Foo', ['bar', 'baz'])`
      - `this.set('Accept', 'application/json')`
      - `this.set({ Accept: 'text/plain', 'X-API-Key': 'tobi' })`.
 * @prop {function(string, (string|!Array)): void} append Append additional header `field` with value `val`. _Examples_:
      - `this.append('Link', ['<http://localhost>', '<http://localhost:3000>'])`
      - `this.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')`
      - `this.append('Warning', '199 Miscellaneous warning')`
 * @prop {function(): void} flushHeaders Flush any set headers, and begin the body.
 * @prop {number} status Get/set response status code.
 * @prop {string} message Get/set response status message.
 * @prop {string|!Buffer|Object|!stream.Stream} body Get/set response body.
 * @prop {?number} length Return parsed response `Content-Length` when present. Set `Content-Length` field to `n`.
 * @prop {string} type Return the response mime type void of parameters such as "charset". Set Content-Type response header with `type` through `mime.lookup()` when it does not contain a charset. _Examples_:
      - `this.type = '.html'`
      - `this.type = 'html'`
      - `this.type = 'json'`
      - `this.type = 'application/json'`
      - `this.type = 'png'`
 * @prop {string|Date} lastModified Get the Last-Modified date in Date form, if it exists. Set the Last-Modified date using a string or a Date. _Examples_:
      - `this.response.lastModified = new Date()`
      - `this.response.lastModified = '2013-09-13'`
 * @prop {string} etag Get/Set the ETag of a response. This will normalize the quotes if necessary. _Examples_:
      - `this.response.etag = 'md5hashsum'`
      - `this.response.etag = '"md5hashsum"'`
      - `this.response.etag = 'W/"123456789"'`
 * @prop {boolean} headerSent Check if a header has been written to the socket.
 * @prop {boolean} writable Checks if the request is writable. Tests for the existence of the socket as _Node.JS_ sometimes does not set it.
 */
/**
 * @typedef {_goa.BaseResponse} BaseResponse `＠interface` The additional API not available via Context.
 */
/**
 * @typedef {_goa.ContextDelegatedResponse & _goa.$BaseResponse} _goa.BaseResponse `＠interface` The additional API not available via Context.
 */
/**
 * @typedef {Object} _goa.$BaseResponse `＠interface` The additional API not available via Context.
 * @prop {!net.Socket} socket Return the request socket.
 * @prop {!Object<string, string>} header Return response header (_OutgoingHttpHeaders_).
 * @prop {!Object<string, string>} headers Return response header, alias as `response.header` (_OutgoingHttpHeaders_).
 * @prop {function((string|!Array<string>), ...string): (string|boolean)} is Check whether the response is one of the listed types. Pretty much the same as `this.request.is()`.
 * @prop {function(string): string} get Return response header. _Examples_:
      - `this.get('Content-Type')` => `"text/plain"`
      - `this.get('content-type')` => `"text/plain"`
 */
/**
 * @typedef {_goa.Response} Response `＠interface` The response object.
 */
/**
 * @typedef {_goa.BaseResponse & _goa.$Response} _goa.Response `＠interface` The response object.
 */
/**
 * @typedef {Object} _goa.$Response `＠interface` The response object.
 * @prop {!_goa.Application} app The reference to the application.
 * @prop {!_goa.Context} ctx The reference to the context instance.
 * @prop {!_goa.Request} request The reference to the request instance.
 * @prop {!http.IncomingMessage} req The message from the client.
 * @prop {!http.ServerResponse} res The response from the server.
 */
/**
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 */
/**
 * @typedef {import('http').ServerResponse} http.ServerResponse
 */

/**
 * @typedef {import('../../../depack').Application} _goa.Application
 * @typedef {import('../../../depack').Context} _goa.Context
 * @typedef {import('../../../depack').Request} _goa.Request
 */
