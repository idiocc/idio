export {}

/* typal node_modules/@goa/session/types/session.xml namespace */
/**
 * @typedef {_idio.Session} Session `＠record` The session instance accessible via Goa's context.
 * @typedef {Object} _idio.Session `＠record` The session instance accessible via Goa's context.
 * @prop {boolean} isNew Returns true if the session is new.
 * @prop {boolean} populated Populated flag, which is just a boolean alias of `.length`.
 * @prop {number|string} maxAge Get/set cookie's maxAge.
 * @prop {() => void} save Save this session no matter whether it is populated.
 * @prop {() => !Promise} manuallyCommit Session headers are auto committed by default. Use this if `autoCommit` is set to false.
 * @typedef {_idio.KoaSession} KoaSession `＠interface` A private session model.
 * @typedef {_idio.Session & _idio.$KoaSession} _idio.KoaSession `＠interface` A private session model.
 * @typedef {Object} _idio.$KoaSession `＠interface` A private session model.
 * @prop {number} _expire Private JSON serialisation.
 * @prop {boolean} _requireSave Private JSON serialisation.
 * @prop {_idio.KoaContextSession} _sessCtx Private JSON serialisation.
 * @prop {_goa.Context} _ctx Private JSON serialisation.
 */

/* typal node_modules/@goa/session/types/index.xml namespace */
/**
 * @typedef {_idio.KoaContextSession} KoaContextSession `＠interface` The context for the session API. Is actually private, as only accessible from context by a symbol.
 * @typedef {Object} _idio.KoaContextSession `＠interface` The context for the session API. Is actually private, as only accessible from context by a symbol.
 * @prop {!_goa.Context} ctx The context.
 * @prop {() => !Promise} commit Commit the session changes or removal.
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

/**
 * @typedef {import('../..').Context} _goa.Context
 */