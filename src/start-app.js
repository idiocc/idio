import setupMiddleware from './setup-middleware'
import Goa from '@goa/goa'
import Router from '@goa/router'
// import Debug from '@idio/debug'
import erotic from 'erotic'
import IdioContext from './idio'
import { enableDestroy } from './lib'

/**
 * @type {_idio.idio}
 */
async function $idio(middlewareConfig = {}, config = {}) {
  const {
    port = 5000,
    host = '0.0.0.0',
    router: routerConfig,
  } = config

  // close all connections when running nodemon
  const sigListener = () => {
    app.destroy().then(() => {
      process.kill(process.pid, 'SIGUSR2')
    })
  }
  process.once('SIGUSR2', sigListener)

  const appMeta = await createApp(middlewareConfig, routerConfig)
  const { app, middleware, router } = appMeta

  const server = await listen(app, port, host)

  enableDestroy(server)
  app.destroy = async () => {
    await server.destroy()
    process.removeListener('SIGUSR2', sigListener)
  }
  const { port: p } = server.address()

  const url = `http://localhost:${p}`

  return { app, middleware, url, server, router }
}

export default $idio

/**
 * @param {!_idio.MiddlewareConfig} [middlewareConfig]
 * @param {!_goa.RouterConfig} [routerConfig]
 */
export const createApp = async (middlewareConfig = {}, routerConfig = {}) => {
  const app = new Goa({
    Context: IdioContext,
  })

  const middleware = await setupMiddleware(middlewareConfig, /** @type {!_idio.Application} */ (app))

  if (app.env == 'production') {
    app.proxy = true
  }

  const router = new Router(routerConfig)

  return {
    app,
    middleware,
    router,
  }
}

/**
 * @param {_goa.Application} app
 * @param {number} [port]
 * @param {string} [hostname='0.0.0.0']
 * @return {!Promise<!http.Server>}
 */
function listen(app, port, hostname = '0.0.0.0') {
  const cb = erotic(true)
  return new Promise((r, j) => {
    const ec = (err) => {
      const e = cb(err)
      j(e)
    }
    /** @type {http.Server} */
    const server = app.listen(port, hostname, () => {
      r(server)
      app.removeListener('error', ec)
    }).once('error', ec)
  })
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/goa').Application} _goa.Application
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').Server} http.Server
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('net').Socket} net.Socket
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').Config} _idio.Config
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').MiddlewareConfig} _idio.MiddlewareConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('..').Idio} _idio.Idio
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/goa').Application} _goa.Application
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@goa/router').RouterConfig} _goa.RouterConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types/api').idio} _idio.idio
 */
