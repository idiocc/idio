import Context from '../../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async'csrf check for GET'({ createApp, startApp }) {
    const { app, router, middleware } = await createApp({
      session: {
        use: true,
        signed: false,
      },
      csrfCheck: {},
    })
    router.get('/set', (ctx) => {
      ctx.session = {
        csrf: 'test',
        hello: 'world',
      }
      ctx.status = 204
    })
    router.get('/test', middleware.csrfCheck, (ctx) => {
      ctx.body = ctx.session.hello
    })
    app.use(router.routes())
    await startApp()
      .session()
      .get('/set').assert(204)
      .get('/test').assert(403, 'Invalid CSRF token')
      .get('/test?csrf=test').assert(200, 'world')
  },
  async'csrf check for POST'({ createApp, startApp }) {
    /* start example */
    const { app, router, middleware } = await createApp({
      session: {
        use: true,
        signed: false,
      },
      form: { none: true },
      csrfCheck: {},
    })
    router.get('/set', (ctx) => {
      ctx.session = {
        csrf: 'test',
        hello: 'world',
      }
      ctx.status = 204
    })
    router.post('/test', middleware.form, middleware.csrfCheck, (ctx) => {
      ctx.body = ctx.session.hello
    })
    app.use(router.routes())
    /* end example */
    await startApp()
      .session()
      .get('/set').assert(204)
      .postForm('/test', (form) => {
        form.addSection('data', 'no-token')
      }).assert(403, 'Invalid CSRF token')

      .postForm('/test?csrf=test', (form) => {
        form.addSection('data', 'get-token')
      }).assert(200, 'world')

      .postForm('/test', (form) => {
        form.addSection('csrf', 'test')
      }).assert(200, 'world')
  },
}

export default T