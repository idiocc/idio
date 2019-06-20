import setupMiddleware from './setup-middleware'
import Goa from '@goa/goa'
import Debug from '@idio/debug'
import erotic from 'erotic'

const debug = Debug('idio')

async function destroy(server) {
  await new Promise((resolve) => {
    server.on('close', resolve)
    server.destroy()
  })
  debug('Destroyed the server')
}

/**
 * Start the server.
 * @param {MiddlewareConfig} [middlewareConfig] Middleware configuration.
 * @param {_idio.Config} [config] Configuration object.
 */
export default async function startApp(middlewareConfig, config = {}) {
  const {
    port = 5000,
    host = '0.0.0.0',
  } = config

  // close all connections when running nodemon
  const sigListener = async () => {
    await app.destroy()
    process.kill(process.pid, 'SIGUSR2')
  }
  process.once('SIGUSR2', sigListener)

  const appMeta = await createApp(middlewareConfig, config)
  const { app } = appMeta

  const server = await listen(app, port, host)

  enableDestroy(server)
  app.destroy = async () => {
    await destroy(server)
    process.removeListener('SIGUSR2', sigListener)
  }
  const { port: p } = server.address()

  const url = `http://localhost:${p}`

  // const router = new Router()

  return { ...appMeta, url, server }
}

/**
 * @param {http.Server} server
 */
const enableDestroy = async (server) => {
  const connections = {}
  server.on('connection', (con) => {
    const { remoteAddress, remotePort } = con
    const k = [remoteAddress, remotePort].join(':')
    connections[k] = con
    con.on('close', () => {
      delete connections[k]
    })
  })

  await new Promise(r => {
    server.close(r)
    for (let k in connections) {
      connections[k].destroy()
    }
  })
}

export const createApp = async (middlewareConfig) => {
  const app = new Goa()

  const middleware = await setupMiddleware(middlewareConfig, app)

  if (app.env == 'production') {
    app.proxy = true
  }

  return {
    app,
    middleware,
  }
}

/**
 * @param {_goa.Application} app
 * @param {number} [port]
 * @param {string} [hostname='0.0.0.0']
 * @return {http.Server}
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
 * @typedef {import('@goa/goa').Application} _goa.Application
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('http').Server} http.Server
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').Config} _idio.Config
 */