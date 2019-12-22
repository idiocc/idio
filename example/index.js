import aqt from '@rqt/aqt'
import idio, { $Keygrip } from '../compile'

(async () => {
  /* start example */
  const { url, app } = await idio({
    // Idio's bundled middleware.
    session: {
      use: true,
      keys: new $Keygrip(['hello', 'world'], 'sha512'),
      config: {
        prefix: 'example-',
      },
    },

    // Any middleware function to be installed.
    async middleware(ctx, next) {
      ctx.body = 'hello world'
      await next()
    },
  })
  /* end example */
  console.log(url)
  const { body } = await aqt(url)
  console.log(body)
  app.destroy()
})()