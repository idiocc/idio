export {}
/* typal node_modules/@goa/accepts/types/index.xml noSuppress closure */
/**
 * @typedef {_goa.Accepts} Accepts `＠interface` Higher-Level Content Negotiation.
 */
/**
 * @typedef {Object} _goa.Accepts `＠interface` Higher-Level Content Negotiation.
 * @prop {function((string|!Array<string>)=, ...string): (string|!Array<string>|boolean)} types Check if the given `type(s)` is acceptable, returning the best match when true, otherwise `false`, in which case you should respond with 406 "Not Acceptable".
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
 * @prop {function((string|!Array<string>)=, ...string): (string|!Array<string>|boolean)} type An alias for `types`.
 * @prop {function((string|!Array<string>)=, ...string): (string|!Array<string>|boolean)} encodings Return accepted encodings or best fit based on `encodings`. Given `Accept-Encoding: gzip, deflate` an array sorted by quality is returned: `['gzip', 'deflate']`.
 * @prop {function((string|!Array<string>)=, ...string): (string|!Array<string>|boolean)} encoding An alias for `encodings`.
 * @prop {function((string|!Array<string>)=, ...string): (string|!Array<string>|boolean)} charsets Return accepted charsets or best fit based on `charsets`. Given `Accept-Charset: utf-8, iso-8859-1;q=0.2, utf-7;q=0.5` an array sorted by quality is returned: `['utf-8', 'utf-7', 'iso-8859-1']`.
 * @prop {function((string|!Array<string>)=, ...string): (string|!Array<string>|boolean)} charset An alias for `charsets`.
 * @prop {function((string|!Array<string>)=, ...string): (string|!Array<string>|boolean)} languages Return accepted languages or best fit based on `langs`. Given `Accept-Language: en;q=0.8, es, pt` an array sorted by quality is returned: `['es', 'pt', 'en']`.
 * @prop {function((string|!Array<string>)=, ...string): (string|!Array<string>|boolean)} language An alias for `languages`.
 * @prop {function((string|!Array<string>)=, ...string): (string|!Array<string>|boolean)} langs An alias for `languages`.
 * @prop {function((string|!Array<string>)=, ...string): (string|!Array<string>|boolean)} lang An alias for `languages`.
 */
