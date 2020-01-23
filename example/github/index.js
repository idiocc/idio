import aqt from '@rqt/aqt'
import dotenv from '@demimonde/dotenv'
// import test from '../../test'
import idio from '../../compile'
dotenv();

(async () => {
  /* start example */
  const { CLIENT_ID: client_id, CLIENT_SECRET: client_secret } = process.env

  const { url, app, middleware: { session }, router } = await idio({
    session: {
      keys: ['example-key'],
    },
    github: {
      client_id,
      client_secret,
      paths: {
        '/github': null, // no scope
        '/github-email': 'user:email',
      },
      redirectPath: '/github/redirect',
      async finish(ctx, token, scope, user) {
        // don't save whole user as cookie will be massive
        ctx.session.login = user.login
        ctx.session.token = token
        ctx.session.emails = user.emails
        await ctx.session.manuallyCommit()
        ctx.redirect('/')
      },
    },
  }, { port: 5010 })
  router.get('/', session, (ctx) => {
    const { login } = ctx.session
    ctx.type = 'html'
    if (login) ctx.body = `Hello, ${login}.
    <a href="/signout">Sign out</a>`
    else ctx.body = `<a href="/github">Sign in</a>`
  })
  router.get('/signout', session, (ctx) => {
    ctx.session = null
    ctx.redirect('/')
  })
  app.use(router.routes())
  /* end example */
  let { headers } = await aqt(`${url}/github-email`)
  console.log(headers)
  await app.destroy()
})()