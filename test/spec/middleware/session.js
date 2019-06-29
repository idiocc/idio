import Context from '../../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'sets up the session'({ createApp, startApp }) {
    await createApp({
      session: {
        use: true,
        keys: ['a'],
      },
      test(ctx) {
        if (ctx.path == '/set') {
          ctx.session.test = 'hello'
          ctx.status = 204
        } else if (ctx.path == '/exit') {
          ctx.session = null
          ctx.status = 204
        } else {
          ctx.body = ctx.session.test || 'no cookie'
        }
      },
    })
    await startApp()
      .session()
      .get('/set').assert(204)
      .get('/').assert(200, 'hello')
      .get('/exit').assert(204)
      .get('/').assert(200, 'no cookie')
  },
}

export default T