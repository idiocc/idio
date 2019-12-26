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
      allowMethods: ['GET', 'POST'],
    },
  })
  /* end example */
  let { headers } = await aqt(url, {
    headers: {
      'Access-Control-Request-Method': 'GET',
      origin: 'https://3rd.party',
    },
  })
  delete headers['content-type']
  delete headers['content-length']
  console.log(headers)
  console.log()

  ;({ headers } = await aqt(url, {
    headers: {
      origin: 'http://prod.com',
    },
  }))
  delete headers['content-type']
  delete headers['content-length']
  console.log(headers)
  console.log()

  ;({ headers } = await aqt(url, {
    method: 'OPTIONS',
    headers: {
      origin: 'http://prod.com',
      'Access-Control-Request-Method': 'GET',
    },
  }))
  delete headers['content-type']
  delete headers['content-length']
  console.log(headers)
  await app.destroy()
})()