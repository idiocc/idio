const { createApp: _createApp, startApp } = require('./depack')

/**
 * Just create a Goa App.
 * @param {MiddlewareConfig} middlewareConfig
 * @returns {{app: Application, middleware: Middleware}}
 */
async function createApp(middlewareConfig) {
  return _createApp(middlewareConfig)
}

async function idio(middlewareConfig = {}, config = {}) {
  return startApp(middlewareConfig, config)
}

module.exports = idio
module.exports.createApp = createApp

/**
 * @typedef {import('../types').Config} Config
 * @typedef {import('../types').MiddlewareConfig} MiddlewareConfig
 * @typedef {import('@goa/goa').Application} Application
 * @typedef {import('@goa/goa').Middleware} Middleware
 */
