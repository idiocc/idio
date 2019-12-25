import aqt from '@rqt/aqt'
import idio from '../compile'

(async () => {
  /* start example */
  const { url, app } = await idio({
    // Idio's bundled middleware.
    session: {
      use: true,
      algorithm: 'sha512',
      keys: ['hello', 'world'],
      prefix: 'example-',
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
  await app.destroy()
})()