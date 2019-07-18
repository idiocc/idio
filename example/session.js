import aqt from '@rqt/aqt'
import idio from '..'

(async () => {
  /* start example */
  const { url, app } = await idio({
    session: { use: true, keys:
      ['hello', 'world'], config: {
      signed: false,
    } },
    async middleware(ctx, next) {
      if (ctx.session.user)
        ctx.body = 'welcome back '
          + ctx.session.user
      else {
        ctx.session.user = 'u'
          +( Math.random() * 1000).toFixed(1)
        ctx.body = 'hello new user'
      }
      await next()
    },
  })
  /* end example */
  console.log(url)
  let { body, headers } = await aqt(url)
  console.log(body)

  ;({ body, headers } = await aqt(url, {
    headers: {
      'Cookie': headers['set-cookie'],
    },
  }))
  console.log(body)
  app.destroy()
})()