export {}

/* typal node_modules/@goa/session/types/session.xml closure noSuppress */
/**
 * @typedef {_idio.KoaSession} KoaSession `＠interface`
 */
/**
 * @typedef {Object} _idio.KoaSession `＠interface`
 * @prop {boolean} isNew Returns true if the session is new.
 * @prop {boolean} populated Populated flag, which is just a boolean alias of `.length`.
 * @prop {number|string} maxAge Get/set cookie's maxAge.
 * @prop {number} _maxAge Private JSON serialisation.
 * @prop {number} _expire Private JSON serialisation.
 * @prop {string} _session Private JSON serialisation.
 * @prop {_idio.KoaContextSession} _sessCtx Private JSON serialisation.
 * @prop {_goa.Context} _ctx Private JSON serialisation.
 * @prop {function(): void} save Save this session no matter whether it is populated.
 * @prop {function(): Promise} manuallyCommit Session headers are auto committed by default. Use this if autoCommit is set to false.
 */

/* typal node_modules/@goa/session/types/index.xml closure noSuppress */
/**
 * @typedef {_idio.KoaContextSession} KoaContextSession `＠interface`
 */
/**
 * @typedef {Object} _idio.KoaContextSession `＠interface`
 * @prop {_goa.Context} ctx The context.
 * @prop {function(): !Promise} commit Commit the session changes or removal.
 */
/**
 * @typedef {_idio.ContextStore} ContextStore `＠interface`
 */
/**
 * @typedef {Object} _idio.ContextStore `＠interface`
 * @prop {function(string, (number|string), { rolling: boolean }): !Promise<!Object>} get Get session object by key.
 * @prop {function(string, !Object, (number|string), { rolling, changed }): !Promise} set Set session object for key, with a `maxAge` (in ms, or as `'session'`).
 * @prop {function(string): !Promise} destroy Destroy session for key.
 */
/**
 * @typedef {_idio.KoaSessionConfig} KoaSessionConfig `＠record` Configuration passed to `koa-session`.
 */
/**
 * @typedef {Object} _idio.KoaSessionConfig `＠record` Configuration passed to `koa-session`.
 * @prop {string} [key="koa:sess"] Cookie key. Default `koa:sess`.
 * @prop {string|number} [maxAge=86400000] `maxAge` in ms with default of 1 day. Either a number or 'session'. `session` will result in a cookie that expires when session/browser is closed. Warning: If a session cookie is stolen, this cookie will never expire. Default `86400000`.
 * @prop {boolean} [overwrite=true] Can overwrite or not. Default `true`.
 * @prop {boolean} [httpOnly=true] httpOnly or not. Default `true`.
 * @prop {boolean} [signed=true] Signed or not. Default `true`.
 * @prop {boolean} [autoCommit=true] Automatically commit headers. Default `true`.
 * @prop {function(!_goa.Context, *): boolean} [valid] The validation hook: valid session value before use it.
 * @prop {function(!_goa.Context, !_idio.KoaSession): boolean} [beforeSave] The hook before save session.
 * @prop {function(!_goa.Context): string} [genid="uuid-v4"] The way of generating external session id. Default `uuid-v4`.
 * @prop {_idio.ContextStore} [store] You can store the session content in external stores (Redis, MongoDB or other DBs) by passing options.store with three methods (these need to be async functions).
 * @prop {{ get: function(_goa.Context), set: function(_goa.Context, string) }} [externalKey] External key is used the cookie by default, but you can use options.externalKey to customize your own external key methods.
 * @prop {function(new: _idio.ContextStore, !_goa.Context)} [ContextStore] If your session store requires data or utilities from context, `opts.ContextStore` is also supported.
 * @prop {string} [prefix] If you want to add prefix for all external session id. It will not work if `options.genid(ctx)` present.
 * @prop {function(!Object): string} [encode] Use options.encode and options.decode to customize your own encode/decode methods.
 * @prop {function(string): !Object} [decode] Use options.encode and options.decode to customize your own encode/decode methods.
 * @prop {boolean} [rolling=false] Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. Default `false`.
 * @prop {boolean} [renew=false] Renew session when session is nearly expired, so we can always keep user logged in. Default `false`.
 */

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').Context} _goa.Context
 */