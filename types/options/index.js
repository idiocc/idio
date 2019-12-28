export {}
/* typal types/options/compress.xml namespace */
/**
 * @typedef {_idio.CompressOptions} CompressOptions `＠record`
 * @typedef {_idio.$CompressOptions & _goa.CompressConfig} _idio.CompressOptions `＠record`
 * @typedef {Object} _idio.$CompressOptions `＠record`
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {number} [flush=Z_SYNC_FLUSH] Deflate flush method for [zlib options](https://nodejs.org/api/zlib.html#zlib_class_options).
 * Must be one of the constants, e.g.,
 * ```js
 * import { constants } from 'zlib'
 * idio({ compress: { flush: constants.Z_FULL_FLUSH } })
 * ```
 * Default `Z_SYNC_FLUSH`.
 */

/* typal node_modules/@goa/compress/types/index.xml namespace */
/**
 * @typedef {import('zlib').ZlibOptions} zlib.ZlibOptions
 * @typedef {_goa.CompressConfig} CompressConfig `＠record`
 * @typedef {_goa.$CompressConfig & zlib.ZlibOptions} _goa.CompressConfig `＠record`
 * @typedef {Object} _goa.$CompressConfig `＠record`
 * @prop {number} [threshold=1024] Minimum response size in bytes to compress. Default `1024`.
 * @prop {(type?: string) => boolean} [filter] An optional function that checks the response content type to decide whether to compress. By default, it uses `compressible`.
 */

/* typal types/options/static.xml namespace */
/**
 * @typedef {_idio.StaticOptions} StaticOptions `＠record` Top-level options when setting up static middleware.
 * @typedef {_idio.$StaticOptions & _idio.StaticConfig} _idio.StaticOptions `＠record` Top-level options when setting up static middleware.
 * @typedef {Object} _idio.$StaticOptions `＠record` Top-level options when setting up static middleware.
 * @prop {string|!Array<string>} root Root or multiple roots from which to serve files.
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {string} [mount="/"] Path from which to serve files. Default `/`.
 */

/* typal types/options/session.xml namespace */
/**
 * @typedef {_idio.SessionOptions} SessionOptions `＠record` Options for the session that extend the session config.
 * @typedef {_idio.$SessionOptions & _idio.SessionConfig} _idio.SessionOptions `＠record` Options for the session that extend the session config.
 * @typedef {Object} _idio.$SessionOptions `＠record` Options for the session that extend the session config.
 * @prop {!Array<string>} [keys] A set of keys to be installed in `app.keys`, if signing cookies. Required by default, but can be omitted when setting the `signed` config option to `false`.
 * @prop {string} [algorithm] Optional algorithm for _Keygrip_, e.g., `sha512` (default is `sha1`).
 * @prop {!_goa.Keygrip} [keygrip] A custom `Keygrip` instance.
 */

/* typal node_modules/@goa/session/types/index.xml ignore:_idio.KoaContextSession,_goa.Context namespace */
/**
 * @typedef {_idio.ExternalStore} ExternalStore `＠interface` By implementing this class, the session can be recorded and retrieved from an external store (e.g., a database), instead of cookies.
 * @typedef {Object} _idio.ExternalStore `＠interface` By implementing this class, the session can be recorded and retrieved from an external store (e.g., a database), instead of cookies.
 * @prop {(key: string, maxAge: (number|string), opts: { rolling: boolean }) => !Promise<!Object>} get Get session object by key.
 * @prop {(key: string, sess: !Object, maxAge: (number|string), opts: { rolling: boolean, changed: boolean }) => !Promise} set Set session object for key, with a `maxAge` (in ms, or as `'session'`).
 * @prop {(key: string) => !Promise} destroy Destroy session for key.
 * @typedef {_idio.SessionConfig} SessionConfig `＠record` Configuration for the session middleware.
 * @typedef {Object} _idio.SessionConfig `＠record` Configuration for the session middleware.
 * @prop {string} [key="koa:sess"] The cookie key. Default `koa:sess`.
 * @prop {string|number} [maxAge=86400000] `maxAge` in ms with default of 1 day. Either a number or 'session'. `session` will result in a cookie that expires when session/browser is closed. Warning: If a session cookie is stolen, this cookie will never expire. Default `86400000`.
 * @prop {boolean} [overwrite=true] Can overwrite or not. Default `true`.
 * @prop {boolean} [httpOnly=true] httpOnly or not. Default `true`.
 * @prop {boolean} [signed=true] Signed or not. Default `true`.
 * @prop {boolean} [autoCommit=true] Automatically commit headers. Default `true`.
 * @prop {_idio.ExternalStore} [store] You can store the session content in external stores (Redis, MongoDB or other DBs) by passing an instance of a store with three methods (these need to be async functions).
 * @prop {{ get: function(_goa.Context): string, set: function(_goa.Context, string): void }} [externalKey] When using a store, the external key is recorded in cookies by default, but you can use `options.externalKey` to customize your own external key methods.
 * @prop {new (arg0: !_goa.Context) => _idio.ExternalStore} [ContextStore] If your session store requires data or utilities from context, `opts.ContextStore` can be used to set a constructor for the store that implements the _ExternalStore_ interface.
 * @prop {string} [prefix] If you want to add prefix for all external session id. It will not work if `options.genid(ctx)` present.
 * @prop {boolean} [rolling=false] Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. Default `false`.
 * @prop {boolean} [renew=false] Renew session when session is nearly expired, so we can always keep user logged in. Default `false`.
 * @prop {(ctx: !_goa.Context, sess: !Object) => boolean} [valid] The validation hook: valid session value before use it.
 * @prop {(ctx: !_goa.Context, sess: !_idio.KoaSession) => boolean} [beforeSave] The hook before save session.
 * @prop {(ctx: !_goa.Context) => string} [genid="uuid-v4"] The way of generating external session id. Default `uuid-v4`.
 * @prop {(sess: !Object) => string} [encode] Use options.encode and options.decode to customize your own encode/decode methods.
 * @prop {(sess: string) => !Object} [decode] Use options.encode and options.decode to customize your own encode/decode methods.
 */

/* typal types/options/cors.xml ignore:_goa.Context namespace */
/**
 * @typedef {_idio.CorsOptions} CorsOptions `＠record`
 * @typedef {_idio.$CorsOptions & _goa.CorsConfig} _idio.CorsOptions `＠record`
 * @typedef {Object} _idio.$CorsOptions `＠record`
 * @prop {string|Array<string>|(function(!_goa.Context): string)} [origin] The origin or an array of origins to accept as valid.
 * - In case of an array, the origin from the request headers will be searched in the array, and if found, it will be returned (since browsers only support a single `Access-Control-Allow-Origin` header).
 * - If a function is passed, it should return the string with the origin to set.
 * - If not passed, the request origin is returned, allowing any origin to access the resource (use with caution).
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 */

/* typal node_modules/@goa/cors/types/index.xml ignore:_goa.Context namespace  */
/**
 * @typedef {_goa.CorsConfig} CorsConfig `＠record` Options for the program.
 * @typedef {Object} _goa.CorsConfig `＠record` Options for the program.
 * @prop {string|function(!_goa.Context)} [origin] `Access-Control-Allow-Origin` header, default is taken from the `Origin` request header.
 * @prop {string|!Array<string>} [allowMethods="GET,HEAD,PUT,POST,DELETE,PATCH"] `Access-Control-Allow-Methods` header. Default `GET,HEAD,PUT,POST,DELETE,PATCH`.
 * @prop {string|!Array<string>} [exposeHeaders] `Access-Control-Expose-Headers` header.
 * @prop {string|!Array<string>} [allowHeaders] `Access-Control-Allow-Headers` header.
 * @prop {string|number} [maxAge] `Access-Control-Max-Age` header in seconds.
 * @prop {boolean} [credentials=false] `Access-Control-Max-Age` header in seconds. Default `false`.
 * @prop {boolean} [keepHeadersOnError=true] Add set headers to `err.header` if an error is thrown. Default `true`.
 */

/* typal types/options/form-data.xml namespace ignore:_multipart.FormDataConfig */
/**
 * @typedef {_idio.FormDataOptions} FormDataOptions Options for Form Data (and file uploads) streams handling.
 * @typedef {_idio.$FormDataOptions & _multipart.FormDataConfig} _idio.FormDataOptions Options for Form Data (and file uploads) streams handling.
 * @typedef {Object} _idio.$FormDataOptions Options for Form Data (and file uploads) streams handling.
 * @prop {boolean} [any] Create middleware function for any type of upload.
 * @prop {{ name: string, maxFiles: number }} [array] Accept multiple files given the field name and the maximum number of uploaded files.
 * @prop {!Array<_multipart.FormDataField>} [fields] Accept uploads according to the configuration.
 * @prop {boolean} [none] Don't accept any file uploads.
 * @prop {string} [single] Accept a single file at the given fieldname.
 */

/* typal types/options/index.xml namespace */
/**
 * @typedef {_idio.FrontEndOptions} FrontEndOptions `＠record` Options for the frontend.
 * @typedef {_idio.$FrontEndOptions & _idio.FrontEndConfig} _idio.FrontEndOptions `＠record` Options for the frontend.
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
 * @typedef {import('../..').StaticConfig} _idio.StaticConfig
 * @typedef {import('../..').FormDataConfig} _multipart.FormDataConfig
 * @typedef {import('../..').FormDataField} _multipart.FormDataField
 * @typedef {import('../..').Keygrip} _goa.Keygrip
 *
 * @typedef {import('../..').Context} _goa.Context
 */