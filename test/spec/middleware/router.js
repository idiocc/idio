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
}

export default T