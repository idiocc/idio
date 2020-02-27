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
/* typal-embed node_modules/@goa/compress/types/index.xml namespace */
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
/* typal-embed node_modules/@goa/session/types/index.xml ignore:_idio.KoaContextSession,_goa.Context namespace */
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
/* typal-embed node_modules/@goa/cors/types/index.xml ignore:_goa.Context namespace */
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
 * @typedef {_idio.NeoLudditeOptions} NeoLudditeOptions `＠record` Options for the neoluddite.dev client.
 * @typedef {Object} _idio.NeoLudditeOptions `＠record` Options for the neoluddite.dev client.
 * @prop {string} key The API key received from the app.
 * @prop {string} [env] The environment (e.g., `dev`/`staging`). The production env must be indicated as `prod` which is billed.
 * @prop {string} [host="https://neoluddite.dev"] The hostname of the server. Default `https://neoluddite.dev`.
 * @prop {string} [app] The name of the application.
 * @typedef {_idio.CsrfCheckOptions} CsrfCheckOptions `＠record` Options for validating a csrf token.
 * @typedef {Object} _idio.CsrfCheckOptions `＠record` Options for validating a csrf token.
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {boolean} [body=true] Check for the presence of token in `ctx.request.body` (requires prior Form-Data middleware). Used in POST requests. Default `true`.
 * @prop {boolean} [query=true] Check for the presence of token in `ctx.query`. Can be used in GET requests. Default `true`.
 * @typedef {_idio.JSONErrorsOptions} JSONErrorsOptions `＠record` Options for serving errors via JSON.
 * @typedef {Object} _idio.JSONErrorsOptions `＠record` Options for serving errors via JSON.
 * @prop {boolean} [use=false] Use this middleware for every request. Default `false`.
 * @prop {boolean} [exposeStack=false] Whether to add the `stack` property to the returned object. Don't set to true unless on development environment. Default `false`.
 * @prop {boolean} [logClientErrors=true] Whether to print client errors. Default `true`.
 * @prop {boolean} [clearIdio=true] Removes `@idio/idio` lines from the error stack. Default `true`.
 * @typedef {_idio.GitHubOptions} GitHubOptions `＠record` Options for GitHub OAuth.
 * @typedef {_idio.$GitHubOptions & _idio.GithubOAuthConfig} _idio.GitHubOptions `＠record` Options for GitHub OAuth.
 * @typedef {Object} _idio.$GitHubOptions `＠record` Options for GitHub OAuth.
 * @prop {!Object<string, ?string>} paths Instead of passing one path, multiple paths with different scopes could also be specified, e.g.,
 * ```
 * paths: {
 *   '/github': null,
 *   '/github-email': 'user:email',
 * },
 * ```
 * In this case, giving `redirectPath` is required as it will have to be the same one because _GitHub_ only allows one redirect path per `client_id`.
 * @prop {boolean} [session] `PRIVATE` do not set this property! You'll need to configure `session` above `github` in the middleware config.
 */
/* typal-embed node_modules/@idio/frontend/types/index.xml ignore:_alaJsx.Config namespace */
/**
 * @typedef {_idio.FrontEndConfig} FrontEndConfig Options for the middleware.
 * @typedef {Object} _idio.FrontEndConfig Options for the middleware.
 * @prop {string|!Array<string>} [directory="frontend"] The directory or directories from which to serve files. Default `frontend`.
 * @prop {string} [mount="."] The directory on which to mount. The dirname must be inside the mount. E.g., to serve `example/src/index.js` from `/src/index.js`, the **mount** is `example/src` and **directory** is `src`. Default `.`.
 * @prop {!Object<string, string>} [override] Instead of resolving the _package.json_ path for packages and looking up the module and main fields, paths can be passed manually in the override. E.g., `{ preact: '/node_modules/preact/src/preact.js' }` will serve the source code of _Preact_ instead of the resolved dist version.
 * @prop {string} [pragma="import { h } from 'preact'"] The pragma function to import. This enables to skip writing `h` at the beginning of each file. JSX will be transpiled to have `h` pragma, therefore to use React it's possible to do `import { createElement: h } from 'react'`. Default `import { h } from 'preact'`.
 * @prop {boolean|!Function} [log=false] Log to console when source files were patched. Default `false`.
 * @prop {!_alaJsx.Config} [jsxOptions] Options for the transpiler.
 * @prop {boolean} [exportClasses=true] When serving CSS, also export class names. Default `true`.
 */
/* typal-embed node_modules/@a-la/jsx/types/index.xml namespace */
/**
 * @typedef {_alaJsx.Config} Config Options for the program.
 * @typedef {Object} _alaJsx.Config Options for the program.
 * @prop {(boolean|string)} [quoteProps=false] Whether to surround property names with quotes. When the `dom` string is passed, it will only quote props for invoking html components, i.e., those that start with a lowercase letter (E.g., for the _Google Closure Compiler_). Default `false`.
 * @prop {(...args: string[]) => ?} [warn] The function to receive warnings, e.g., when destructuring of properties is used on dom elements (for Closure Compiler).
 * @prop {boolean} [prop2class=false] If a property name starts with a capital letter, the `className` of the _VNode_ will be updated. Default `false`.
 * @prop {!Array<string>|!Object} [classNames] The list of properties to put into the `className` property.
 * @prop {!Object<string, string>} [renameMap] How to rename classes (only applies to `prop2class` and `classNames`).
 */
/* typal-embed node_modules/@idio/github/types/index.xml ignore:_goa.Middleware,_idio.Context namespace */
/**
 * @typedef {_idio.GithubOAuthConfig} GithubOAuthConfig `＠record` Options for the program.
 * @typedef {Object} _idio.GithubOAuthConfig `＠record` Options for the program.
 * @prop {string} client_id The app's client id.
 * @prop {string} client_secret The app's client secret.
 * @prop {string} [path="/auth/github"] The server path to start the login flaw at. Default `/auth/github`.
 * @prop {string} [redirectPath] The redirect path (must start with `/`). If not specified, `${path}/redirect` will be used.
 * @prop {string} [scope] The scope to ask permissions for. No scope by default.
 * @prop {!_goa.Middleware} [session] The configured session middleware in case the `session` property is not globally available on the context.
 * @prop {(ctx: _idio.Context, token: string, scope: string, user: !_idio.GithubUser, next: function()) => !Promise} [finish="setSession; redirect;"] The function to complete the authentication that receives the token and the data about the user, such as name and id. The default function redirects to `/`. Default `setSession; redirect;`.
 * @prop {(ctx: !_idio.Context, error: string, description: string, next: function()) => !Promise} [error="throw;"] The function to be called in case of error. If not specified, the middleware will throw an internal server error. Default `throw;`.
 */
/* typal-embed node_modules/@idio/github/types/user.xml namespace */
/**
 * @typedef {_idio.GithubEmail} GithubEmail `＠record`
 * @typedef {Object} _idio.GithubEmail `＠record`
 * @prop {string} email The email address.
 * @prop {boolean} verified Whether the email was verified.
 * @prop {boolean} primary Whether the email is primary.
 * @prop {string} visibility Either `public` or `private`.
 * @typedef {_idio.GithubUser} GithubUser Public user information
 * @typedef {Object} _idio.GithubUser Public user information
 * @prop {?string} email Publicly visible email address. `octocat＠github.com` or `null`.
 * @prop {!Array<!_idio.GithubEmail>} emails All email addresses accessible if the `user:email` scope was requested.
 * @prop {string} login `octocat`
 * @prop {number} id 1
 * @prop {string} node_id `MDQ6VXNlcjE=`
 * @prop {string} avatar_url `https://github.com/images/error/octocat_happy.gif`
 * @prop {string} gravatar_id ``
 * @prop {string} url `https://api.github.com/users/octocat`
 * @prop {string} html_url `https://github.com/octocat`
 * @prop {string} followers_url `https://api.github.com/users/octocat/followers`
 * @prop {string} following_url `https://api.github.com/users/octocat/following{/other_user}`
 * @prop {string} gists_url `https://api.github.com/users/octocat/gists{/gist_id}`
 * @prop {string} starred_url `https://api.github.com/users/octocat/starred{/owner}{/repo}`
 * @prop {string} subscriptions_url `https://api.github.com/users/octocat/subscriptions`
 * @prop {string} organizations_url `https://api.github.com/users/octocat/orgs`
 * @prop {string} repos_url `https://api.github.com/users/octocat/repos`
 * @prop {string} events_url `https://api.github.com/users/octocat/events{/privacy}`
 * @prop {string} received_events_url `https://api.github.com/users/octocat/received_events`
 * @prop {string} type `User`
 * @prop {boolean} site_admin false
 * @prop {string} name `monalisa octocat`
 * @prop {string} company `GitHub`
 * @prop {string} blog `https://github.com/blog`
 * @prop {string} location `San Francisco`
 * @prop {boolean} hireable false
 * @prop {string} bio `There once was...`
 * @prop {number} public_repos 2
 * @prop {number} public_gists 1
 * @prop {number} followers 20
 * @prop {number} following 0
 * @prop {string} created_at `2008-01-14T04:33:35Z`
 * @prop {string} updated_at `2008-01-14T04:33:35Z`
 */

/**
 * @typedef {import('../..').StaticConfig} _idio.StaticConfig
 * @typedef {import('../..').FormDataConfig} _multipart.FormDataConfig
 * @typedef {import('../..').FormDataField} _multipart.FormDataField
 * @typedef {import('../..').FormDataField} _multipart.FormDataField
 * @typedef {import('../..').Keygrip} _goa.Keygrip
 *
 * @typedef {import('../..').Context} _goa.Context
 * @typedef {import('../..').Context} _idio.Context
 * @typedef {import('../..').Middleware} _goa.Middleware
 */