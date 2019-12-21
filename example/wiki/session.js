import aqt from '@rqt/aqt'
import idio from '../../compile'

(async () => {
  /* start example */
  const { url, app, middleware: { session }, router } = await idio({
    session: {
      keys: ['key-a', 'key-b'],
      config: {
        httpOnly: true,
      },
    },
  })
  app.use(router.routes())

  router.get('/signin', session, async (ctx) => {
    ctx.session.user = 'User'
    ctx.body = 'You\'ve signed in'
  })
  router.get('/member', session, (ctx) => {
    ctx.body = ctx.session.user
  })

  // NOT using session
  router.get('/member', (ctx) => {
    ctx.body = ctx.session.user
  })
  /* end example */
  const { body, headers } = await aqt(`${url}/signin`)
  console.log(body, headers.cookie)
  app.destroy()
})()