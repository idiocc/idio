import Context from '../../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'installs routes via the router'({ createApp, startApp }) {
    const { router, app } = await createApp()
    app.use(router.routes())
    const body = 'test'
    router.get('/test', (ctx) => {
      ctx.body = 'hello world ' + body
    })
    await startApp()
      .get('/test')
      .assert(200, 'hello world test')
  },
  async 'uses session'({ createApp, startApp }) {
    const { router, app, middleware: { session } } = await createApp({
      session: {
        keys: ['test'],
      },
    })
    app.use(router.routes())
    router.get('/test', session, (ctx) => {
      ctx.session.user = 'user'
      ctx.body = 'hello world'
    })
    router.get('/test2', session, (ctx) => {
      ctx.body = 'hello ' + ctx.session.user
    })
    await startApp()
      .session()
      .get('/test')
      .assert(200, 'hello world')
      .get('/test2')
      .assert(200, 'hello user')
  },
}

export default T