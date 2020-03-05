import Context from '../../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async'parses json body'({ createApp, startApp }) {
    await createApp({
      jsonBody: { use: true },
      serve(ctx) {
        ctx.body = ctx.request.body
      },
    })
    const body = {
      hello: 'world',
    }
    await startApp()
      .post('/', body)
      .assert(200, body)
  },
  async'can setup with true'({ createApp, startApp }) {
    await createApp({
      jsonBody: true,
      serve(ctx) {
        ctx.body = ctx.request.body
      },
    })
    const body = {
      hello: 'world',
    }
    await startApp()
      .post('/', body)
      .assert(200, body)
  },
  async'throws error when cannot parse'({ createApp, startApp }) {
    await createApp({
      jsonBody: { use: true },
      serve(ctx) {
        ctx.body = ctx.request.body
      },
    })
    await startApp()
      .post('/', '{ bad', {
        type: 'application/json',
      })
      .assert(400, 'Could not parse JSON.')
  },
}

export default T