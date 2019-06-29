export {}
/* typal types/options/compress.xml closure noSuppress */
/**
 * @typedef {_idio.CompressOptions} CompressOptions
 */
/**
 * @typedef {Object} _idio.CompressOptions
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {_idio.KoaCompressConfig} [config] `koa-compress` configuration.
 */

/* typal types/options/static.xml closure noSuppress */
/**
 * @typedef {_idio.StaticOptions} StaticOptions
 */
/**
 * @typedef {Object} _idio.StaticOptions
 * @prop {(string|!Array<string>)} root Root or multiple roots from which to serve files.
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {string} [mount="/"] Path from which to serve files. Default `/`.
 * @prop {number} [maxage=0] How long to cache files for. Default `0`.
 * @prop {_idio.KoaStaticConfig} [config] `koa-static` configuration.
 */

/* typal types/options/session.xml closure noSuppress */
/**
 * @typedef {_idio.SessionOptions} SessionOptions
 */
/**
 * @typedef {Object} _idio.SessionOptions
 * @prop {!Array<string>} keys A set of keys to be installed in `app.keys`.
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {_idio.KoaSessionConfig} [config] The `koa-session` configuration.
 */

/**
 * @typedef {import('../..').KoaStaticConfig} _idio.KoaStaticConfig
 * @typedef {import('../..').KoaCompressConfig} _idio.KoaCompressConfig
 * @typedef {import('../..').KoaSessionConfig} _idio.KoaSessionConfig
 */