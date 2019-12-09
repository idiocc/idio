export {}

/* typal types/Request.xml namespace */
/**
 * @typedef {import('http').IncomingMessage} http.IncomingMessage
 * @typedef {import('http').ServerResponse} http.ServerResponse
 * @typedef {import('url').URL} url.URL
 * @typedef {import('net').Socket} net.Socket
 * @typedef {import('../../../compile').Accepts} _goa.Accepts
 * @typedef {import('../../../compile').Application} _goa.Application
 * @typedef {import('../../../compile').Context} _goa.Context
 * @typedef {import('../../../compile').Response} _goa.Response
 * @typedef {_goa.ContextDelegatedRequest} ContextDelegatedRequest `＠interface` The request API available via Context.
 * @typedef {Object} _goa.ContextDelegatedRequest `＠interface` The request API available via Context.
 * @prop {(arg0?: (!Array<string>|string), ...args: string[]) => (string|!Array<string>|boolean)} acceptsLanguages Return accepted languages or best fit based on `langs`. Given `Accept-Language: en;q=0.8, es, pt` an array sorted by quality is returned: `['es', 'pt', 'en']`.
 * @prop {(arg0?: (!Array<string>|string), ...args: string[]) => (string|!Array<string>|boolean)} acceptsEncodings Return accepted encodings or best fit based on `encodings`. Given `Accept-Encoding: gzip, deflate` an array sorted by quality is returned: `['gzip', 'deflate']`.
 * @prop {(arg0?: (!Array<string>|string), ...args: string[]) => (string|!Array<string>|boolean)} acceptsCharsets Return accepted charsets or best fit based on `charsets`. Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5` an array sorted by quality is returned: `['utf-8', 'utf-7', 'iso-8859-1']`.
 * @prop {(arg0?: (!Array<string>|string), ...args: string[]) => (string|!Array<string>|boolean)} accepts Check if the given `type(s)` is acceptable, returning the best match when true, otherwise `false`, in which case you should respond with 406 "Not Acceptable".
 *
 * The `type` value may be a single mime type string such as "application/json", the extension name such as "json" or an array `["json", "html", "text/plain"]`. When a list or array is given the _best_ match, if any is returned. When no types are given as arguments, returns all types accepted by the client in the preference order.
 *
 * _Examples_:
 *
 * - Accept: text/html
 *
 *     ```js
 *     this.types('html') => "html"
 *     ```
 * - Accept: text/＊, application/json
 *
 *     ```js
 *     this.types('html') => "html"
 *     this.types('text/html') => "text/html"
 *     this.types('json', 'text') => "json"
 *     this.types('application/json') => "application/json"
 *     ```
 * - Accept: text/＊, application/json
 *
 *     ```js
 *     this.types('image/png') => false
 *     this.types('png') => false
 *     ```
 * - Accept: text/＊;q=.5, application/json
 *
 *     ```js
 *     this.types(['html', 'json']) => "json"
 *     this.types('html', 'json') => "json"
 *     ```
 * - Accept: application/＊;q=0.2, image/jpeg;q=0.8, text/html, text/plain
 *
 *     ```js
 *     this.types() => ["text/html", "text/plain",
 *       "image/jpeg", "application/＊"]
 *     ```
 * @prop {(arg0: string) => string} get Return request header. The `Referrer` header field is special-cased, both `Referrer` and `Referer` are interchangeable.
 *
 * _Examples_:
 *
 * ```js
 * this.get('Content-Type') => "text/plain"
 * this.get('content-type') => "text/plain"
 * this.get('Something') => undefined
 * ```
 * @prop {(arg0: (!Array<string>|string), ...args: string[]) => ?} is Check if the incoming request contains the "Content-Type" header field, and it contains any of the give mime `type`s. If there is no request body, `null` is returned. If there is no content type, `false` is returned. Otherwise, it returns the first `type` that matches.
 *
 * _Examples_:
 *
 * - With Content-Type: text/html; charset=utf-8
 *
 *     ```js
 *     this.is('html'); // => 'html'
 *     this.is('text/html'); // => 'text/html'
 *     this.is('text/*', 'application/json');
 *       // => 'text/html'
 *     ```
 * - When Content-Type is application/json
 *
 *     ```js
 *     this.is('json', 'urlencoded'); // => 'json'
 *     this.is('application/json'); // => 'application/json'
 *     this.is('html', 'application/*');
 *               // => 'application/json'
 *     this.is('html'); // => false
 *     ```
 * @prop {string} querystring Get/Set query string.
 * @prop {boolean} idempotent Check if the request is idempotent.
 * @prop {net.Socket} socket Return the request socket.
 * @prop {string} search Get the search string. Same as the querystring except it includes the leading ?. Set the search string. Same as `response.querystring=` but included for ubiquity.
 * @prop {string} method Get/Set request method.
 * @prop {!Object|string} query Get parsed query-string. Set query-string as an object.
 * @prop {string} path Get request pathname. Set pathname, retaining the query-string when present.
 * @prop {string} url Get/Set request URL.
 * @prop {_goa.Accepts} accept Get accept object. Lazily memoized.
 * @prop {string} origin Get origin of URL.
 * @prop {string} href Get full request URL.
 * @prop {!Array<string>} subdomains Return subdomains as an array.
 * Subdomains are the dot-separated parts of the host before the main domain of the app. By default, the domain of the app is assumed to be the last two parts of the host. This can be changed by setting `app.subdomainOffset`. For example, if the domain is "tobi.ferrets.example.com":
 * - If `app.subdomainOffset` is not set, this.subdomains is `["ferrets", "tobi"]`.
 * - If `app.subdomainOffset` is 3, this.subdomains is `["tobi"]`.
 * @prop {string} protocol Return the protocol string "http" or "https" when requested with TLS. When the proxy setting is enabled the "X-Forwarded-Proto" header is enabled the "X-Forwarded-Proto" header a reverse proxy that supplies https for you this may be enabled.
 * @prop {string} host Parse the "Host" header field host and support X-Forwarded-Host when a proxy is enabled.
 * @prop {string} hostname Parse the "Host" header field hostname and support X-Forwarded-Host when a proxy is enabled.
 * @prop {url.URL|Object} URL Get WHATWG parsed URL object.
 * @prop {!Object<string, string>} header Return request header.
 * @prop {!Object<string, string>} headers Return request header, alias as `request.header`.
 * @prop {boolean} secure Short-hand for: `this.protocol == 'https'`.
 * @prop {boolean} stale Check if the request is stale, aka "Last-Modified" and / or the "ETag" for the resource has changed.
 * @prop {boolean} fresh Check if the request is fresh, aka Last-Modified and/or the ETag still match.
 * @prop {!Array<string>} ips When `app.proxy` is `true`, parse the "X-Forwarded-For" ip address list. For example if the value were "client, proxy1, proxy2" you would receive the array `["client", "proxy1", "proxy2"]` where "proxy2" is the furthest down-stream.
 * @prop {string} ip Request remote address. Supports X-Forwarded-For when app.proxy is true.
 * @typedef {_goa.BaseRequest} BaseRequest `＠interface` The additional API not available via Context.
 * @typedef {_goa.ContextDelegatedRequest & _goa.$BaseRequest} _goa.BaseRequest `＠interface` The additional API not available via Context.
 * @typedef {Object} _goa.$BaseRequest `＠interface` The additional API not available via Context.
 * @prop {string} [charset] Get the charset when present or undefined.
 * @prop {?number} length Return parsed Content-Length when present.
 * @prop {string} [type] Return the request mime type void of parameters such as "charset".
 * @typedef {_goa.Request} Request `＠interface` The request object.
 * @typedef {_goa.BaseRequest & _goa.$Request} _goa.Request `＠interface` The request object.
 * @typedef {Object} _goa.$Request `＠interface` The request object.
 * @prop {!_goa.Application} app The reference to the application.
 * @prop {!_goa.Context} ctx The reference to the context instance.
 * @prop {!_goa.Response} response The reference to the request instance.
 * @prop {!http.IncomingMessage} req The message from the client.
 * @prop {!http.ServerResponse} res The response from the server.
 * @prop {string} [originalUrl] The original url set by the `parseurl` package.
 */
