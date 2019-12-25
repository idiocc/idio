const { _createApp, _startApp, _compose, _Keygrip } = require('./idio')
const IdioRouter = require('./router')

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
module.exports.Router = IdioRouter

/**
 * Signing and verifying data (such as cookies or URLs) through a rotating credential system.
 * @type {new (keys: !Array<string>, algorithm?: string, encoding?: string) => _goa.Keygrip}
 */
module.exports.$Keygrip = _Keygrip

/**
 * Compose a single middleware function for Goa out of many.
 * @param {!Array<!Function>} middleware The array with the middleware.
 * @return {!_goa.Middleware}
 */
function $compose(middleware) {
  return _compose(middleware)
}

module.exports.compose = $compose

/**
 * @typedef {IdioRouter} _idio.Router
 * @typedef {_idio.StaticOptions} StaticOptions
 * @typedef {_idio.KoaStaticConfig} KoaStaticConfig
 *
 * @typedef {_idio.CompressOptions} CompressOptions
 * @typedef {_goa.CompressConfig} CompressConfig
 *
 * @typedef {_idio.CorsOptions} CorsOptions
 * @typedef {_goa.CorsConfig} CorsConfig
 *
 * @typedef {_idio.FormDataOptions} FormDataOptions
 * @typedef {_multipart.FormDataConfig} FormDataConfig
 *
 * @typedef {import('../types/goa/typedefs/application').Application} _goa.Application
 * @typedef {import('../types/goa/typedefs/application').Middleware} _goa.Middleware
 * @typedef {import('../types/goa/typedefs/context').Context} _goa.Context
 * @typedef {import('../types/goa/typedefs/request').Request} _goa.Request
 *
 * @typedef {import('./router').RouterConfig} _goa.RouterConfig
 */

/* typal types/idio.xml namespace ignore:_goa.Application,_goa.Context */

/* typal types/index.xml namespace */

/* typal types/middleware.xml namespace */

/* typework */
