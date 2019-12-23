import aqt from '@rqt/aqt'
import packageJson from '../package'
import idio from '../compile'

(async () => {
  /* start example */
  const { url, app } = await idio({
    async serve(ctx, next) {
      console.log('//',
        ctx.method, ctx.path)

      ctx.body = packageJson
      await next()
    },
    compress: {
      use: true,
    },
  })
  /* end example */
  let { headers } = await aqt(url)
  console.log(headers)
  await app.destroy()
})()