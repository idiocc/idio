export {}

/* typal types/modules/set-headers.xml closure noSuppress */
/**
 * @typedef {_idio.SetHeaders} SetHeaders
 */
/**
 * @typedef {function(http.ServerResponse, string, fs.Stats)} _idio.SetHeaders
 */
/**
 * @typedef {import('http').ServerResponse} http.ServerResponse
 */
/**
 * @typedef {import('fs').Stats} fs.Stats
 */

/* typal types/modules/koa-send.xml closure noSuppress */
/**
 * @typedef {_idio.KoaSendConfig} KoaSendConfig
 */
/**
 * @typedef {Object} _idio.KoaSendConfig
 * @prop {number} [maxage=0] Browser cache max-age in milliseconds. Default `0`.
 * @prop {boolean} [immutable=false] Tell the browser the resource is immutable and can be cached indefinitely. Default `false`.
 * @prop {boolean} [hidden=false] Allow transfer of hidden files. Default `false`.
 * @prop {string} [root=""] Root directory to restrict file access. Default ``.
 * @prop {string} [index] Name of the index file to serve automatically when visiting the root location. (defaults to none).
 * @prop {boolean} [gzip=true] Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with `.gz` extension exists. Default `true`.
 * @prop {boolean} [brotli=true] Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with `.br` extension exists (note, that brotli is only accepted over https). Default `true`.
 * @prop {boolean} [format=true] Format the path to serve static file servers and not require a trailing slash for directories, so that you can do both `/directory` and `/directory/`. Default `true`.
 * @prop {_idio.SetHeaders} [setHeaders] Function to set custom headers on response.
 * @prop {boolean} [extensions=false] Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. Default `false`.
 */

/* typal types/modules/koa-static.xml closure noSuppress */
/**
 * @typedef {_idio.KoaStaticConfig} KoaStaticConfig
 */
/**
 * @typedef {Object} _idio.KoaStaticConfig
 * @prop {number} [maxage=0] Browser cache max-age in milliseconds. Default `0`.
 * @prop {boolean} [hidden=false] Allow transfer of hidden files. Default `false`.
 * @prop {string} [index="index.html"] Default file name. Default `index.html`.
 * @prop {boolean} [defer=false] If `true`, serves after return next(), allowing any downstream middleware to respond first. Default `false`.
 * @prop {boolean} [gzip=true] Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with `.gz` extension exists. Default `true`.
 * @prop {boolean} [br=true] Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with `.br` extension exists (note, that brotli is only accepted over https). Default `true`.
 * @prop {_idio.SetHeaders} [setHeaders] Function to set custom headers on response.
 * @prop {boolean} [extensions=false] Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served. Default `false`.
 */
