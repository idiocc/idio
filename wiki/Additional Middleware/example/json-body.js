import aqt from '@rqt/aqt'
import idio from '../../../compile'

(async () => {
  let a
  try {
    /* start example */
    const { url, app, middleware: { jsonBody }, router } = await idio({
      jsonBody: { },
    }, { port: 5012 })
    router.post('/', jsonBody, (ctx) => {
      ctx.body = ctx.request.body
    })
    app.use(router.routes())
    /* end example */
    a = app
    let data = {
      hello: 'world',
    }
    console.log('// request:', data)
    let { body, statusCode } = await aqt(`${url}/`, {
      data,
    })
    console.log(statusCode, body)
    data = '{ data'
    console.log('// request:', data)
    ;({ body, statusCode } = await aqt(`${url}/`, {
      data,
      type: 'application/json',
    }))
    console.log(statusCode, body)
  } finally {
    if (a) a.destroy()
  }
})()