import aqt from '@rqt/aqt'
import idio from '../compile'

(async () => {
  /* start example */
  const { url, app } = await idio({
    example(ctx, next) {
      console.log('//', ctx.method, ctx.path, 'from', ctx.get('Origin'))
      ctx.body = 'hello world'
      return next()
    },
    cors: {
      use: true,
      origin: process.env.NODE_ENV == 'production' ?
        'https://prod.com' : null,
      config: {
        allowMethods: ['GET', 'POST'],
      },
    },
  })
  /* end example */
  let { body, headers } = await aqt(url, {
    headers: {
      origin: 'https://3rd.party',
    },
  })
  console.log(headers)

  ;({ body, headers } = await aqt(url, {
    headers: {
      origin: 'https://prod.com',
    },
  }))
  console.log(headers)
  await app.destroy()
})()