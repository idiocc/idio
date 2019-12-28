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

/**
 * @constructor {_goa.Keygrip}
 */
class Keygrip extends _Keygrip {}

module.exports = idio
module.exports.createApp = createApp
module.exports.Router = IdioRouter
module.exports.Keygrip = Keygrip

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
 * @typedef {_idio.StaticConfig} StaticConfig
 *
 * @typedef {_idio.FormDataOptions} FormDataOptions
 * @typedef {_multipart.FormDataConfig} FormDataConfig
 * @typedef {_multipart.FormDataField} FormDataField
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

// typework
/**
 * @typedef {import('../types/goa/vendor/cookies').Cookies} Cookies
 * @typedef {import('../types/goa/vendor/accepts').Accepts} Accepts
 * @typedef {import('../types/goa/typedefs/application').Middleware} Middleware
 * @typedef {import('../types/goa/typedefs/application').Application} Application
 * @typedef {import('../types/goa/typedefs/application').ApplicationOptions} ApplicationOptions
 * @typedef {import('../types/goa/typedefs/context').Context} Context
 * @typedef {import('../types/goa/typedefs/request').Request} Request
 * @typedef {import('../types/goa/typedefs/request').ContextDelegatedRequest} ContextDelegatedRequest
 * @typedef {import('../types/goa/typedefs/response').Response} Response
 * @typedef {import('../types/goa/typedefs/response').ContextDelegatedResponse} ContextDelegatedResponse
 */