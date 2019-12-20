import aqt from '@rqt/aqt'
import idio, { Keygrip } from '../compile'

(async () => {
  /* start example */
  const { url, app } = await idio({
    session: { use: true, keys: new Keygrip(
      ['hello', 'world']) },
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