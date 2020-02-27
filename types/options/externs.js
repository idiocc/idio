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

/* typal types/options/compress.xml externs no-embed */
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

/* typal types/options/session.xml externs no-embed */
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

/* typal types/options/cors.xml externs no-embed */
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

/* typal types/options/index.xml externs no-embed */
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
/**
 * Options for the neoluddite.dev client.
 * @record
 */
_idio.NeoLudditeOptions
/**
 * The API key received from the app.
 * @type {string}
 */
_idio.NeoLudditeOptions.prototype.key
/**
 * The environment (e.g., `dev`/`staging`). The production env must be indicated as `prod` which is billed.
 * @type {string|undefined}
 */
_idio.NeoLudditeOptions.prototype.env
/**
 * The hostname of the server. Default `https://neoluddite.dev`.
 * @type {string|undefined}
 */
_idio.NeoLudditeOptions.prototype.host
/**
 * The name of the application.
 * @type {string|undefined}
 */
_idio.NeoLudditeOptions.prototype.app
/**
 * Options for validating a csrf token.
 * @record
 */
_idio.CsrfCheckOptions
/**
 * Use this middleware for every request. Default `false`.
 * @type {boolean|undefined}
 */
_idio.CsrfCheckOptions.prototype.use
/**
 * Check for the presence of token in `ctx.request.body` (requires prior Form-Data middleware). Used in POST requests. Default `true`.
 * @type {boolean|undefined}
 */
_idio.CsrfCheckOptions.prototype.body
/**
 * Check for the presence of token in `ctx.query`. Can be used in GET requests. Default `true`.
 * @type {boolean|undefined}
 */
_idio.CsrfCheckOptions.prototype.query
/**
 * Options for serving errors via JSON.
 * @record
 */
_idio.JSONErrorsOptions
/**
 * Use this middleware for every request. Default `false`.
 * @type {boolean|undefined}
 */
_idio.JSONErrorsOptions.prototype.use
/**
 * Whether to add the `stack` property to the returned object. Don't set to true unless on development environment. Default `false`.
 * @type {boolean|undefined}
 */
_idio.JSONErrorsOptions.prototype.exposeStack
/**
 * Whether to print client errors. Default `true`.
 * @type {boolean|undefined}
 */
_idio.JSONErrorsOptions.prototype.logClientErrors
/**
 * Removes `@idio/idio` lines from the error stack. Default `true`.
 * @type {boolean|undefined}
 */
_idio.JSONErrorsOptions.prototype.clearIdio
/**
 * Options for GitHub OAuth.
 * @extends {_idio.GithubOAuthConfig}
 * @record
 */
_idio.GitHubOptions
/**
 * Instead of passing one path, multiple paths with different scopes could also be specified, e.g.,
 * ```
 * paths: {
 *   '/github': null,
 *   '/github-email': 'user:email',
 * },
 * ```
 * In this case, giving `redirectPath` is required as it will have to be the same one because _GitHub_ only allows one redirect path per `client_id`.
 * @type {!Object<string, ?string>}
 */
_idio.GitHubOptions.prototype.paths
/**
 * `PRIVATE` do not set this property! You'll need to configure `session` above `github` in the middleware config.
 * @type {boolean|undefined}
 */
_idio.GitHubOptions.prototype.session
