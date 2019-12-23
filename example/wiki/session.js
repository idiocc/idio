import aqt from '@rqt/aqt'
import idio from '../../compile'

(async () => {
  /* start example */
  const { url, app, middleware: {
    session, // initialise but don't use everywhere
  }, router } = await idio({
    session: {
      keys: ['key-a', 'key-b'],
      config: {
        httpOnly: true,
        key: 'example:sess',
      },
    },
  }, { port: null })
  router.use(async (ctx, next) => {
    console.log('#', ctx.method, ctx.path)
    await next()
  })
  app.use(router.routes())

  router.get('/signin', session, (ctx) => {
    ctx.session.user = 'User'
    ctx.body = 'You\'ve signed in.'
  })
  router.get('/member', session, (ctx) => {
    ctx.body = 'You are: ' + ctx.session.user
  })

  // NOT using session
  router.get('/info', (ctx) => {
    console.log('# Cookie:', ctx.cookies.get('example:sess'))
    if (ctx.session) {
      ctx.body = 'Are you user: ' + ctx.session.user
    } else ctx.body = 'You are not user.'
  })
  /* end example */
  try {
    const { body, headers: { 'set-cookie': setCookie } }
      = await aqt(`${url}/signin`)
    console.log('>', body)
    console.log('>', setCookie.map(s => s.split(';').join('\n ')).join('\n> '), '\n')

    const { body: body2 }
      = await aqt(`${url}/member`, { headers: {
        cookie: setCookie,
      } })

    console.log('>', body2, '\n')

    const { body: body3 }
      = await aqt(`${url}/info`, { headers: {
        cookie: setCookie,
      } })
    console.log('>', body3)
  } finally {
    await app.destroy()
  }
})()