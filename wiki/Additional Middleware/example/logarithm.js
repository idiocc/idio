import aqt from '@rqt/aqt'
import idio from '../../../compile'

(async () => {
  let a
  const { app: elastic, url: ELASTIC_URL } = await idio({
    jsonBody: { use: true },
    serve(ctx) {
      console.log('/* > ELASTIC SERVER */')
      console.log('// > %s %s', ctx.method, ctx.path)
      console.log(ctx.request.body)
    },
  })
  try {
    /* start example */
    const { url, app, router } = await idio({
      logarithm: {
        use: true,
        app: 'example.app',
        url: ELASTIC_URL,
      },
    }, { port: 5013 })
    /* end example */
    app.use((ctx, next) => {
      console.log('//', ctx.method,
        ctx.path)
      return next()
    })
    /* start example */
    router.get('/', (ctx) => {
      ctx.body = 'hello world'
    })
    router.post('/error', (ctx) => {
      ctx.throw(400, 'Incorrect data.')
    })
    app.use(router.routes())
    /* end example */
    a = app
    let { body } = await aqt(`${url}/`)
    ;({ body } = await aqt(`${url}/error`, {
      method: 'POST',
      data: { hello: 'world' },
    }))
    await new Promise(r => setTimeout(r, 100))
  } finally {
    if (a) a.destroy()
    elastic.destroy()
  }
})()