/* start example */
import rqt from 'rqt'
import idio from '../../compile'
import APIServer from './api-server'

const ProxyServer = async (port) => {
  // 1. Start the API server.
  const API = await APIServer(5001)
  console.log('API server started at %s', API)

  // 2. Start a proxy server to the API.
  const { url } = await idio({
    async log(ctx, next) {
      await next()
      console.log(' --> Proxy: %s %s %s', ctx.method, ctx.url, ctx.status)
    },
    api: {
      use: true,
      async middlewareConstructor(app, config) {
        // e.g., read from a virtual network
        app.context.SECRET = await Promise.resolve('app-secret')

        /** @type {import('@typedefs/goa').Middleware} */
        const fn = async (ctx, next) => {
          const { path } = ctx
          const res = await rqt(`${config.API}${path}?key=${ctx.SECRET}`)
          ctx.body = res
          await next()
        }
        return fn
      },
      config: {
        API,
      },
    },
  }, { port })
  return url
}
/* end example */
(async () => {
  const url = await ProxyServer(5002)
  console.log('Proxy started at %s', url)
  await rqt(url)
  process.exit()
})()