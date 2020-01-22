import aqt from '@rqt/aqt'
import dotenv from '@demimonde/dotenv'
import idio from '../../compile'
dotenv();

(async () => {
  /* start example */
  const { CLIENT_ID: client_id, CLIENT_SECRET: client_secret } = process.env
  async function finish(ctx, token, scope, user) {
    ctx.session.user = user
    ctx.session.token = token
    await ctx.session.manuallyCommit()
    ctx.redirect('/example')
  }
  const { url, app, middleware: { session }, router } = await idio({
    session: {
      keys: ['example-key'],
    },
    github: [{ // no scope auth
      client_id,
      client_secret,
      path: '/github',
      finish,
    }, { // email auth
      scope: 'user:email',
      client_id,
      client_secret,
      path: '/github-email',
      redirectPath: `/github/redirect`, // reuse prev one
      finish,
    }],
  })
  router.get('/example', session, (ctx) => {
    const { user = {} } = ctx.session
    ctx.body = JSON.stringify(user, null, 2)
  })
  router.get('/signout', session, (ctx) => {
    ctx.session = null
    ctx.redirect('/example')
  })
  app.use(router.routes())
  /* end example */
  let { headers } = await aqt(`${url}/github-email`)
  console.log(headers)
  await app.destroy()
})()