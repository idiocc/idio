export {}
/* typal node_modules/@goa/accepts/types/index.xml namespace */
/**
 * @typedef {_goa.Accepts} Accepts `＠interface` Higher-Level Content Negotiation.
 * @typedef {Object} _goa.Accepts `＠interface` Higher-Level Content Negotiation.
 * @prop {(type?: (!Array<string>|string), ...types: string[]) => (string|!Array<string>|boolean)} types Check if the given `type(s)` is acceptable, returning the best match when true, otherwise `false`, in which case you should respond with 406 "Not Acceptable".
 *
 * The `type` value may be a single mime type string such as "application/json", the extension name such as "json" or an array `["json", "html", "text/plain"]`. When a list or array is given the _best_ match, if any is returned. When no types are given as arguments, returns all types accepted by the client in the preference order.
 * _Examples:_
 * - Accept: text/html
 * ```js
 * ctx.request.accepts('html')
 * // => "html"
 * ```
 * - Accept: text/＊, application/json
 * ```js
 * ctx.request.accepts('html')
 * // => "html"
 * ctx.request.accepts('text/html')
 * // => "text/html"
 * ctx.request.accepts('json', 'text')
 * // => "json"
 * ctx.request.accepts('application/json')
 * // => "application/json"
 * ```
 * - Accept: text/＊, application/json
 * ```js
 * ctx.request.accepts('image/png')
 * // => false
 * ctx.request.accepts('png')
 * // => false
 * ```
 * - Accept: text/＊;q=.5, application/json
 * ```js
 * ctx.request.accepts(['html', 'json'])
 * // => "json"
 * ctx.request.accepts('html', 'json')
 * // => "json"
 * ```
 * - Accept: application/＊;q=0.2, image/jpeg;q=0.8, text/html, text/plain
 * ```js
 * ctx.request.accepts([
 *   "text/html", "text/plain",
 *   "image/jpeg", "application/＊",
 * ])
 * ```
 * @prop {(type?: (!Array<string>|string), ...types: string[]) => (string|!Array<string>|boolean)} type An alias for `types`.
 * _Examples:_
 * - Accept: text/html
 * ```js
 * ctx.request.accepts('html')
 * // => "html"
 * ```
 * - Accept: text/＊, application/json
 * ```js
 * ctx.request.accepts('html')
 * // => "html"
 * ctx.request.accepts('text/html')
 * // => "text/html"
 * ctx.request.accepts('json', 'text')
 * // => "json"
 * ctx.request.accepts('application/json')
 * // => "application/json"
 * ```
 * - Accept: text/＊, application/json
 * ```js
 * ctx.request.accepts('image/png')
 * // => false
 * ctx.request.accepts('png')
 * // => false
 * ```
 * - Accept: text/＊;q=.5, application/json
 * ```js
 * ctx.request.accepts(['html', 'json'])
 * // => "json"
 * ctx.request.accepts('html', 'json')
 * // => "json"
 * ```
 * - Accept: application/＊;q=0.2, image/jpeg;q=0.8, text/html, text/plain
 * ```js
 * ctx.request.accepts([
 *   "text/html", "text/plain",
 *   "image/jpeg", "application/＊",
 * ])
 * ```
 * @prop {(encoding?: (!Array<string>|string), ...encodings: string[]) => (string|!Array<string>|boolean)} encoding Return accepted encodings or best fit based on `encodings`. Given `Accept-Encoding: gzip, deflate` an array sorted by quality is returned: `['gzip', 'deflate']`.
 * @prop {(encoding?: (!Array<string>|string), ...encodings: string[]) => (string|!Array<string>|boolean)} encodings An alias for `encoding`.
 * @prop {(charset?: (!Array<string>|string), ...charsets: string[]) => (string|!Array<string>|boolean)} charset Return accepted charsets or best fit based on `charsets`. Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5` an array sorted by quality is returned: `['utf-8', 'utf-7', 'iso-8859-1']`.
 * @prop {(charset?: (!Array<string>|string), ...charsets: string[]) => (string|!Array<string>|boolean)} charsets An alias for `charset`.
 * @prop {(language?: (!Array<string>|string), ...languages: string[]) => (string|!Array<string>|boolean)} language Return accepted languages or best fit based on `langs`. Given `Accept-Language: en;q=0.8, es, pt` an array sorted by quality is returned: `['es', 'pt', 'en']`.
 * @prop {(language?: (!Array<string>|string), ...languages: string[]) => (string|!Array<string>|boolean)} languages An alias for `language`.
 * @prop {(language?: (!Array<string>|string), ...languages: string[]) => (string|!Array<string>|boolean)} langs An alias for `language`.
 * @prop {(language?: (!Array<string>|string), ...languages: string[]) => (string|!Array<string>|boolean)} lang An alias for `language`.
 */
