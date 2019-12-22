import aqt from '@rqt/aqt'
import idio from '../compile'

(async () => {
  /* start example */
  const { NODE_ENV } = process.env

  const { url, app } = await idio({
    async example(ctx, next) {
      console.log('//', ctx.method,
        ctx.path, 'from', ctx.get('Origin'))

      ctx.body = 'hello world'
      await next()
    },
    cors: {
      use: true,
      origin: NODE_ENV == 'production' ?
        'http://prod.com' : null,
      config: {
        allowMethods: ['GET', 'POST'],
      },
    },
  })
  /* end example */
  let { headers } = await aqt(url, {
    headers: {
      origin: 'https://3rd.party',
    },
  })
  console.log(headers)
  console.log()

  ;({ headers } = await aqt(url, {
    headers: {
      origin: 'http://prod.com',
    },
  }))
  console.log(headers)
  await app.destroy()
})()