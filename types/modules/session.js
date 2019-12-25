export {}

/* typal node_modules/@goa/session/types/session.xml ignore:_idio.KoaSession namespace */
/**
 * @typedef {_idio.Session} Session `＠record` The session instance accessible via Goa's context.
 * @typedef {Object} _idio.Session `＠record` The session instance accessible via Goa's context.
 * @prop {boolean} isNew Returns true if the session is new.
 * @prop {boolean} populated Populated flag, which is just a boolean alias of `.length`.
 * @prop {number|string} maxAge Get/set cookie's maxAge.
 * @prop {() => void} save Save this session no matter whether it is populated.
 * @prop {() => !Promise} manuallyCommit Session headers are auto committed by default. Use this if `autoCommit` is set to false.
 */
