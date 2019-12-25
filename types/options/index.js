export {}
/* typal types/options/compress.xml namespace */
/**
 * @typedef {import('@goa/compress').CompressConfig} _goa.CompressConfig
 * @typedef {_idio.CompressOptions} CompressOptions `＠record`
 * @typedef {Object} _idio.CompressOptions `＠record`
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {!_goa.CompressConfig} [config] The `compress` configuration.
 */

/* typal types/options/static.xml namespace */
/**
 * @typedef {_idio.StaticOptions} StaticOptions `＠record` The top-level options when setting up the static middleware.
 * @typedef {Object} _idio.StaticOptions `＠record` The top-level options when setting up the static middleware.
 * @prop {string|!Array<string>} root Root or multiple roots from which to serve files.
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {string} [mount="/"] Path from which to serve files. Default `/`.
 * @prop {number} [maxage=0] How long to cache files for. Default `0`.
 * @prop {_idio.KoaStaticConfig} [config] `koa-static` configuration.
 */

/* typal types/options/session.xml namespace */
/**
 * @typedef {_idio.SessionOptions} SessionOptions `＠record` Options for the session.
 * @typedef {Object} _idio.SessionOptions `＠record` Options for the session.
 * @prop {!Array<string>} keys A set of keys to be installed in `app.keys`.
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {_idio.SessionConfig} [config] The `koa-session` configuration.
 */

/* typal types/options/cors.xml namespace */
/**
 * @typedef {import('@typedefs/goa').Context} _goa.Context
 * @typedef {_idio.CorsOptions} CorsOptions `＠record`
 * @typedef {Object} _idio.CorsOptions `＠record`
 * @prop {string|Array<string>|(function(!_goa.Context): string)} [origin] The origin or an array of origins to accept as valid.
 * - In case of an array, the origin from the request headers will be searched in the array, and if found, it will be returned (since browsers only support a single `Access-Control-Allow-Origin` header).
 * - If a function is passed, it should return the string with the origin to set.
 * - If not passed, the request origin is returned, allowing any origin to access the resource (use with caution).
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {!_goa.CorsConfig} [config] The CORS configuration.
 */

/* typal types/options/form-data.xml namespace ignore:_multipart.FormDataConfig */
/**
 * @typedef {_idio.FormDataOptions} FormDataOptions
 * @typedef {Object} _idio.FormDataOptions
 * @prop {_multipart.FormDataConfig} [config] The configuration object configuration.
 */

/* typal types/options/index.xml namespace */
/**
 * @typedef {_idio.FrontEndOptions} FrontEndOptions `＠record` Options for the frontend.
 * @typedef {_idio.FrontEndConfig & _idio.$FrontEndOptions} _idio.FrontEndOptions `＠record` Options for the frontend.
 * @typedef {Object} _idio.$FrontEndOptions `＠record` Options for the frontend.
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 */

/* typal node_modules/@idio/frontend/types/index.xml namespace */
/**
 * @typedef {_idio.FrontEndConfig} FrontEndConfig Options for the middleware.
 * @typedef {Object} _idio.FrontEndConfig Options for the middleware.
 * @prop {string|!Array<string>} [directory="frontend"] The directory or directories from which to serve files. Default `frontend`.
 * @prop {string} [mount="."] The directory on which to mount. The dirname must be inside the mount. E.g., to serve `example/src/index.js` from `/src/index.js`, the **mount** is `example/src` and **directory** is `src`. Default `.`.
 * @prop {!Object<string, string>} [override] Instead of resolving the _package.json_ path for packages and looking up the module and main fields, paths can be passed manually in the override. E.g., `{ preact: '/node_modules/preact/src/preact.js' }` will serve the source code of _Preact_ instead of the resolved dist version.
 * @prop {string} [pragma="import { h } from 'preact'"] The pragma function to import. This enables to skip writing `h` at the beginning of each file. JSX will be transpiled to have `h` pragma, therefore to use React it's possible to do `import { createElement: h } from 'react'`. Default `import { h } from 'preact'`.
 * @prop {boolean|!Function} [log=false] Log to console when source files were patched. Default `false`.
 */

/**
 * @typedef {import('../..').KoaStaticConfig} _idio.KoaStaticConfig
 * @typedef {import('../..').KoaCompressConfig} _idio.KoaCompressConfig
 * @typedef {import('../..').SessionConfig} _idio.SessionConfig
 * @typedef {import('../..').CorsConfig} _goa.CorsConfig
 * @typedef {import('../..').FormDataConfig} _multipart.FormDataConfig
 */