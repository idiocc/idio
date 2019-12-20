const { _createApp, _startApp, _compose, _Keygrip } = require('./idio')

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
 * @typedef {_idio.StaticOptions} StaticOptions
 * @typedef {_idio.KoaStaticConfig} KoaStaticConfig
 *
 * @typedef {_idio.CompressOptions} CompressOptions
 * @typedef {_idio.KoaCompressConfig} KoaCompressConfig
 *
 * @typedef {_idio.SessionOptions} SessionOptions
 * @typedef {_idio.KoaSessionConfig} KoaSessionConfig
 *
 * @typedef {_idio.CorsOptions} CorsOptions
 * @typedef {_goa.CorsConfig} CorsConfig
 */

/* typal types/index.xml namespace */
/**
 * @typedef {Object} Config Server configuration object.
 * @prop {number} [port=5000] The port on which to start the server. Default `5000`.
 * @prop {string} [host="0.0.0.0"] The host on which to listen. Default `0.0.0.0`.
 */

/* typal types/middleware.xml namespace */
/**
 * @typedef {import('../types/options').CorsOptions} _idio.CorsOptions
 * @typedef {import('../types/modules/cors').CorsConfig} _goa.CorsConfig
 * @typedef {import('../types/options').StaticOptions} _idio.StaticOptions
 * @typedef {import('../types/modules').KoaStaticConfig} _idio.KoaStaticConfig
 * @typedef {import('../types/options').CompressOptions} _idio.CompressOptions
 * @typedef {import('../types/modules').KoaCompressConfig} _idio.KoaCompressConfig
 * @typedef {import('../types/options').SessionOptions} _idio.SessionOptions
 * @typedef {import('../types/modules/session').KoaSessionConfig} _idio.KoaSessionConfig
 * @typedef {import('../').Middleware} _goa.Middleware
 * @typedef {import('../').Application} _goa.Application
 * @typedef {_idio.MiddlewareConfig} MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 * @typedef {_idio.FnMiddlewareConfig & _idio.$MiddlewareConfig} _idio.MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 * @typedef {Object} _idio.$MiddlewareConfig `＠record` Middleware configuration for the `idio` server.
 * @prop {_idio.StaticOptions} [static] `koa-static` options.
 * @prop {_idio.CompressOptions} [compress] `koa-compress` options.
 * @prop {_idio.SessionOptions} [session] `koa-session` options.
 * @prop {_idio.CorsOptions} [cors] `koa-cors` options.
 * @typedef {_idio.FnMiddlewareConfig} FnMiddlewareConfig Middleware Config With Functions.
 * @typedef {!Object<string, !_idio.ConfigItem>} _idio.FnMiddlewareConfig Middleware Config With Functions.
 * @typedef {_idio.ConfigItem} ConfigItem An item in middleware configuration.
 * @typedef {!_goa.Middleware|{ use: boolean, middlewareConstructor: !_idio.MiddlewareConstructor, config: !Object }} _idio.ConfigItem An item in middleware configuration.
 * @typedef {_idio.MiddlewareConstructor} MiddlewareConstructor A function used to create middleware.
 * @typedef {(app: !_goa.Application, config: !Object, options: !Object) => !_goa.Middleware} _idio.MiddlewareConstructor A function used to create middleware.
 */

/* typal node_modules/@goa/router/types/index.xml ignore:_goa.LayerConfig namespace */

/* typal node_modules/@goa/router/types/router.xml namespace */

/**
* @typedef {import('http').Server} http.Server
*/

/* typework */
