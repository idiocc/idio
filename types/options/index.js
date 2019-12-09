export {}
/* typal types/options/compress.xml namespace */
/**
 * @typedef {_idio.CompressOptions} CompressOptions `＠record`
 * @typedef {Object} _idio.CompressOptions `＠record`
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {_idio.KoaCompressConfig} [config] `koa-compress` configuration.
 */

/* typal types/options/static.xml namespace */
/**
 * @typedef {_idio.StaticOptions} StaticOptions `＠record` The top-level options when setting up the static middleware.
 * @typedef {Object} _idio.StaticOptions `＠record` The top-level options when setting up the static middleware.
 * @prop {(string|!Array<string>)} root Root or multiple roots from which to serve files.
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {string} [mount="/"] Path from which to serve files. Default `/`.
 * @prop {number} [maxage=0] How long to cache files for. Default `0`.
 * @prop {_idio.KoaStaticConfig} [config] `koa-static` configuration.
 */

/* typal types/options/session.xml namespace */
/**
 * @typedef {_idio.SessionOptions} SessionOptions `＠record`
 * @typedef {Object} _idio.SessionOptions `＠record`
 * @prop {!Array<string>} keys A set of keys to be installed in `app.keys`.
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {_idio.KoaSessionConfig} [config] The `koa-session` configuration.
 */

/* typal types/options/cors.xml namespace */
/**
 * @typedef {import('../..').Context} _goa.Context
 * @typedef {_idio.CorsOptions} CorsOptions `＠record`
 * @typedef {Object} _idio.CorsOptions `＠record`
 * @prop {string|Array<string>|(function(!_goa.Context): string)} [origin] The origin or an array of origins to accept as valid.
 * - In case of an array, the origin from the request headers will be searched in the array, and if found, it will be returned (since browsers only support a single `Access-Control-Allow-Origin` header).
 * - If a function is passed, it should return the string with the origin to set.
 * - If not passed, the request origin is returned, allowing any origin to access the resource (use with caution).
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {!_goa.CorsConfig} [config] `@koa/cors` configuration.
 */

/**
 * @typedef {import('../..').KoaStaticConfig} _idio.KoaStaticConfig
 * @typedef {import('../..').KoaCompressConfig} _idio.KoaCompressConfig
 * @typedef {import('../..').KoaSessionConfig} _idio.KoaSessionConfig
 * @typedef {import('../..').CorsConfig} _goa.CorsConfig
 */