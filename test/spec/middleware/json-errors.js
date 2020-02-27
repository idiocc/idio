import { equal, ok } from '@zoroaster/assert'
import Context from '../../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async'serves json client error via !'({ createApp, startApp }) {
    await createApp({
      jsonErrors: { use: true },
      serve() { throw new Error('!test') },
    })
    await startApp()
      .get('/')
      .assert(200, { error: 'test' })
  },
  async'serves json server error'({ createApp, startApp }) {
    await createApp({
      jsonErrors: { use: true },
      serve() { throw new Error('test') },
    })
    await startApp()
      .get('/')
      .assert(200, { error: 'internal server error' })
  },
  async'serves json client error via code'({ createApp, startApp }) {
    await createApp({
      jsonErrors: { use: true },
      serve(ctx) { ctx.throw(400, 'test') },
    })
    await startApp()
      .get('/')
      .assert(200, { error: 'test' })
  },
  async'serves json server error via code'({ createApp, startApp }) {
    await createApp({
      jsonErrors: { use: true },
      serve(ctx) { ctx.throw(500, 'test') },
    })
    await startApp()
      .get('/')
      .assert(200, { error: 'internal server error' })
  },
  async'exposes client stack'({ createApp, startApp }) {
    await createApp({
      jsonErrors: { use: true, exposeStack: true },
      serve(ctx) { ctx.throw(400, 'test') },
    })
    await startApp()
      .get('/')
      .assert((ret) => {
        const { statusCode, body: { error, stack } } = ret
        equal(statusCode, 200)
        equal(error, 'test')
        ok(stack, 'Stack property is not present')
      })
  },
  async'exposes server stack'({ createApp, startApp }) {
    await createApp({
      jsonErrors: { use: true, exposeStack: true },
      serve(ctx) { ctx.throw(500, 'test') },
    })
    await startApp()
      .get('/')
      .assert((ret) => {
        const { statusCode, body: { error, stack } } = ret
        equal(statusCode, 200)
        equal(error, 'internal server error')
        ok(stack, 'Stack property is not present')
      })
  },
}

export default T