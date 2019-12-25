import aqt from '@rqt/aqt'
import idio from '../../../compile'

(async () => {
  /* start example */
  const { url, app } = await idio({
    async log(ctx, next) {
      console.log('//', ctx.method, ctx.path)
      await next()
    },
    frontend: {
      use: true,
      directory: [
        'example/wiki/frontend',
        'example/frontend',
      ],
    },
  })
  /* end example */
  let headers, statusCode
  let { body } = await aqt(`${url}/example/wiki/frontend/index`)
  console.log(body)
  console.log()

  ;({ body, headers, statusCode } = await aqt(`${url}/example/wiki/frontend`))
  console.log('/*\n * status: %s,\n * location: %s \n */', statusCode, headers.location)
  console.log()

  ;({ body } = await aqt(`${url}/example/wiki/frontend/style.css`))
  console.log(body)

  await app.destroy()
})()