import setupMiddleware from './setup-middleware'
import Goa, { Context } from '@goa/goa'
import Router from '@goa/router'
// import Debug from '@idio/debug'
import erotic from 'erotic'

// const debug = Debug('idio')

/**
 * @implements {_idio.Context}
 */
class IdioContext extends Context {
  constructor() {
    super()
    this.session = null
    this.sessionOptions = null
    this.compress = null
  }
}

/**
 * Start the server. Sets the `proxy` property to `true` when the NODE_ENV is equal to _production_.
 * @param {!_idio.MiddlewareConfig} [middlewareConfig]
 * @param {!_idio.Config} [config]
 * @return {!Promise<!_idio.Idio>}
 */
export default async function startApp(middlewareConfig = {}, config = {}) {
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

/**
 * @param {!http.Server} server
 */
const enableDestroy = async (server) => {
  /** @type {Object<string, net.Socket>} */
  const connections = {}
  server.on('connection', (con) => {
    const { remoteAddress, remotePort } = con
    const k = [remoteAddress, remotePort].join(':')
    connections[k] = con
    con.on('close', () => {
      delete connections[k]
    })
  })
  server.destroy = async () => {
    await new Promise(r => {
      server.close(r)
      for (let k in connections) {
        connections[k].destroy()
      }
    })
  }
}

/**
 * @param {!_idio.MiddlewareConfig} [middlewareConfig]
 * @param {!_goa.RouterConfig} [routerConfig]
 */
export const createApp = async (middlewareConfig = {}, routerConfig = {}) => {
  const app = new Goa({
    Context: IdioContext,
  })

  const middleware = await setupMiddleware(middlewareConfig, app)

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
