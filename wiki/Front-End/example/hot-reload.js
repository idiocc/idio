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
      directory: 'wiki/Front-End/frontend',
      hotReload: true, // enable reload
    },
  })
  /* end example */
  const { body } = await aqt(`${url}/wiki/Front-End/frontend/Example`)
  console.log(body)
  await app.destroy()
})()