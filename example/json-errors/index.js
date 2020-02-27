import aqt from '@rqt/aqt'
import idio, { Router } from '../../compile'

(async () => {
  let a
  try {
    /* start example */
    const { url, app, middleware: { jsonErrors: [
      jsonErrors, jsonErrorsWithStack,
    ] }, router } = await idio({
      jsonErrors: [
        {},
        { exposeStack: true },
      ],
    }, { port: 5011 })
    /* end example */
    app.use((ctx, next) => {
      console.log('//', ctx.method,
        ctx.path)
      return next()
    })
    /* start example */
    const api = new Router()
    const dev = new Router()
    ;[api, dev].forEach((r) => {
      r.get('/client1', () => {
        throw new Error('!Client Error')
      })
        .get('/client2', (ctx) => {
          ctx.throw(400, 'Incorrect data')
        })
        .get('/server', (ctx) => {
          ctx.throw(500, 'Not enough permissions')
        })
    })
    router.use('/api', jsonErrors, api.routes())
    router.use('/dev', jsonErrorsWithStack, dev.routes())
    app.use(router.routes())
    /* end example */
    a = app
    let { body } = await aqt(`${url}/api/client1`)
    console.log(body)
    ;({ body } = await aqt(`${url}/api/client2`))
    console.log(body)
    ;({ body } = await aqt(`${url}/api/server`))
    console.log(body)

    ;({ body } = await aqt(`${url}/dev/client1`))
    console.log(body)
  } finally {
    if (a) a.destroy()
  }
})()