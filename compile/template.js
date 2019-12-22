const { _createApp, _startApp, _compose, _Keygrip, _Router } = require('./idio')

/**
 * @methodType {_idio.createApp}
 */
async function createApp(middlewareConfig) {
  return _createApp(middlewareConfig)
}

/**
 * @methodType {_idio.idio}
 */
async function idio(middlewareConfig = {}, config = {}) {
  return _startApp(middlewareConfig, config)
}

module.exports = idio
module.exports.createApp = createApp

/**
 * Signing and verifying data (such as cookies or URLs) through a rotating credential system.
 * @type {new (keys: !Array<string>, algorithm?: string, encoding?: string) => _goa.Keygrip}
 */
module.exports.$Keygrip = _Keygrip

/**
 * A new router constructor.
 * @type {new (opts: _goa.RouterConfig) => _goa.Router}
 */
module.exports.$Router = _Router

/**
 * @typedef {_idio.StaticOptions} StaticOptions
 * @typedef {_idio.KoaStaticConfig} KoaStaticConfig
 *
 * @typedef {_idio.CompressOptions} CompressOptions
 * @typedef {_idio.KoaCompressConfig} KoaCompressConfig
 *
 * @typedef {_idio.SessionOptions} SessionOptions
 * @typedef {_idio.SessionConfig} SessionConfig
 *
 * @typedef {_idio.CorsOptions} CorsOptions
 * @typedef {_goa.CorsConfig} CorsConfig
 */

/* typal types/idio.xml namespace */

/* typal types/index.xml namespace */

/* typal types/middleware.xml namespace */

/* typal node_modules/@goa/router/types/index.xml ignore:_goa.LayerConfig namespace */

/* typal node_modules/@goa/router/types/router.xml namespace */

/* typal node_modules/@goa/session/types/session.xml ignore:KoaSession namespace */

/* typework */
