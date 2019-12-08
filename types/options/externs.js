/**
 * @fileoverview The bundled modules' externs.
 * @externs
 */
/* typal types/options/static.xml externs */
/** @const */
var _idio = {}
/**
 * The top-level options when setting up the static middleware.
 * @record
 */
_idio.StaticOptions
/**
 * Root or multiple roots from which to serve files.
 * @type {(string|!Array<string>)}
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
 * `koa-compress` configuration.
 * @type {_idio.KoaCompressConfig|undefined}
 */
_idio.CompressOptions.prototype.config

/* typal types/options/session.xml externs */
/**
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
 * @type {_idio.KoaSessionConfig|undefined}
 */
_idio.SessionOptions.prototype.config
