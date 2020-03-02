import aqt from '@rqt/aqt'
import idio from '../../../compile'

(async () => {
  /* start example */
  const { url, app } = await idio({
    async log(ctx, next) {
      console.log('//', ctx.method, ctx.path)
      await next()
    },
    // serves from example/wiki/frontend at /frontend
    frontend: {
      use: true,
      directory: 'frontend',
      mount: 'wiki/Front-End',
    },
  }, { port: null })
  /* end example */
  let { body } = await aqt(`${url}/frontend/index`)
  console.log(body)
  console.log()

  await app.destroy()
})()