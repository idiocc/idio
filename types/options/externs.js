/**
 * @fileoverview The bundled modules' externs.
 * @externs
 */
/* typal types/options/static.xml externs */
/** @const */
var _idio = {}
/**
 * Top-level options when setting up static middleware.
 * @extends {_idio.StaticConfig}
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

/* typal types/options/compress.xml externs */
/**
 * @extends {_goa.CompressConfig}
 * @record
 */
_idio.CompressOptions
/**
 * Use this middleware for every request. Default `false`.
 * @type {boolean|undefined}
 */
_idio.CompressOptions.prototype.use
/**
 * Deflate flush method for [zlib options](https://nodejs.org/api/zlib.html#zlib_class_options).
 * Must be one of the constants, e.g.,
 * ```js
 * import { constants } from 'zlib'
 * idio({ compress: { flush: constants.Z_FULL_FLUSH } })
 * ```
 * Default `Z_SYNC_FLUSH`.
 * @type {number|undefined}
 */
_idio.CompressOptions.prototype.flush

/* typal types/options/session.xml externs */
/**
 * Options for the session that extend the session config.
 * @extends {_idio.SessionConfig}
 * @record
 */
_idio.SessionOptions
/**
 * A set of keys to be installed in `app.keys`, if signing cookies. Required by default, but can be omitted when setting the `signed` config option to `false`.
 * @type {(!Array<string>)|undefined}
 */
_idio.SessionOptions.prototype.keys
/**
 * Optional algorithm for _Keygrip_, e.g., `sha512` (default is `sha1`).
 * @type {string|undefined}
 */
_idio.SessionOptions.prototype.algorithm
/**
 * A custom `Keygrip` instance.
 * @type {(!_goa.Keygrip)|undefined}
 */
_idio.SessionOptions.prototype.keygrip

/* typal types/options/cors.xml externs */
/**
 * @extends {_goa.CorsConfig}
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

/* typal types/options/form-data.xml externs */
/**
 * Options for Form Data (and file uploads) streams handling.
 * @typedef {{ any: (boolean|undefined), array: (({ name: string, maxFiles: number })|undefined), fields: ((!Array<_multipart.FormDataField>)|undefined), none: (boolean|undefined), single: (string|undefined) }}
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
