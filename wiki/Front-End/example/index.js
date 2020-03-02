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
        'wiki/Front-End/frontend',
        'example/frontend',
      ],
    },
  })
  /* end example */
  let headers, statusCode
  let { body } = await aqt(`${url}/wiki/Front-End/frontend/Example`)
  console.log(body)
  console.log()
  ;({ body } = await aqt(`${url}/wiki/Front-End/frontend/index`))
  console.log(body)

  ;({ body, headers, statusCode } = await aqt(`${url}/wiki/Front-End/frontend`))
  console.log('/*\n * status: %s,\n * location: %s \n */', statusCode, headers.location)
  console.log()

  ;({ body } = await aqt(`${url}/wiki/Front-End/frontend/style.css`))
  console.log(body)

  await app.destroy()
})()