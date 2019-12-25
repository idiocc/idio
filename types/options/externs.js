/**
 * @fileoverview The bundled modules' externs.
 * @externs
 */
/* typal types/options/static.xml externs */
/**
 * The top-level options when setting up the static middleware.
 * @record
 */
_idio.StaticOptions
/**
 * Root or multiple roots from which to serve files.
 * @type {string|!Array<string>}
 */
_idio.StaticOptions.prototype.root
/**
 * Use this middleware for every request. Default `false`.
 * @type {boolean|undefined}
 */
_idio.StaticOptions.prototype.use
/**
 * Path from which to serve files. Default `/`.
 * @type {string|undefined}
 */
_idio.StaticOptions.prototype.mount
/**
 * How long to cache files for. Default `0`.
 * @type {number|undefined}
 */
_idio.StaticOptions.prototype.maxage
/**
 * `koa-static` configuration.
 * @type {_idio.KoaStaticConfig|undefined}
 */
_idio.StaticOptions.prototype.config

/* typal types/options/compress.xml externs */
/**
 * @record
 */
_idio.CompressOptions
/**
 * Use this middleware for every request. Default `false`.
 * @type {boolean|undefined}
 */
_idio.CompressOptions.prototype.use
/**
 * The `compress` configuration.
 * @type {(!_goa.CompressConfig)|undefined}
 */
_idio.CompressOptions.prototype.config

/* typal types/options/session.xml externs */
/**
 * Options for the session.
 * @record
 */
_idio.SessionOptions
/**
 * A set of keys to be installed in `app.keys`.
 * @type {!Array<string>}
 */
_idio.SessionOptions.prototype.keys
/**
 * Use this middleware for every request. Default `false`.
 * @type {boolean|undefined}
 */
_idio.SessionOptions.prototype.use
/**
 * The `koa-session` configuration.
 * @type {_idio.SessionConfig|undefined}
 */
_idio.SessionOptions.prototype.config

/* typal types/options/cors.xml externs */
/** @const */
var _idio = {}
/**
 * @record
 */
_idio.CorsOptions
/**
 * The origin or an array of origins to accept as valid.
 * - In case of an array, the origin from the request headers will be searched in the array, and if found, it will be returned (since browsers only support a single `Access-Control-Allow-Origin` header).
 * - If a function is passed, it should return the string with the origin to set.
 * - If not passed, the request origin is returned, allowing any origin to access the resource (use with caution).
 * @type {(string|Array<string>|(function(!_goa.Context): string))|undefined}
 */
_idio.CorsOptions.prototype.origin
/**
 * Use this middleware for every request. Default `false`.
 * @type {boolean|undefined}
 */
_idio.CorsOptions.prototype.use
/**
 * The CORS configuration.
 * @type {(!_goa.CorsConfig)|undefined}
 */
_idio.CorsOptions.prototype.config

/* typal types/options/form-data.xml externs */
/**
 * @typedef {{ config: (_multipart.FormDataConfig|undefined) }}
 */
_idio.FormDataOptions

/* typal types/options/index.xml externs */
/**
 * Options for the frontend.
 * @extends {_idio.FrontEndConfig}
 * @record
 */
_idio.FrontEndOptions
/**
 * Use this middleware for every request. Default `false`.
 * @type {boolean|undefined}
 */
_idio.FrontEndOptions.prototype.use
