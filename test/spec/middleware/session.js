import Context from '../../context'
import { throws } from '@zoroaster/assert'
import { Keygrip } from '../../../src'

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
  async 'accepts keygrip instance'({ createApp, startApp }) {
    await createApp({
      session: {
        use: true,
        keys: new Keygrip(['a']),
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
  async 'throws when keys are not passed'({ createApp }) {
    await throws({
      fn: createApp,
      args: [{
        session: {
          use: true,
          keys: 123,
        },
      }],
      message: /Keys must be an array or an instance of Keygrip \/ child classes/,
    })
  },
}

export default T