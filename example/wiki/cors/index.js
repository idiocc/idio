import idio, { Router } from '../../../compile'

export default async () => {
  /* start example */
  const { url, app, router, middleware: { cors } } = await idio({
    cors: {
      origin: process.env.NODE_ENV == 'production' ?
        ['https://www.host.com', 'http://localhost:5000']:
        null,
    },
  }, { port: null })
  const api = new Router()
  api.get('/user', (ctx) => {
    ctx.body = { id: 3 }
  })
  router.use('/api', cors, api.routes())
  app.use(async (ctx, next) => {
    console.log('//', ctx.method, ctx.path, 'FROM', ctx.get('origin'))
    await next()
  })
  app.use(router.routes())
  /* end example */
  return { url, app }
}