import Context from '../../context'
import { throws } from '@zoroaster/assert'
import { Keygrip } from '../../../src'

function test(ctx) {
  if (ctx.path == '/set') {
    ctx.session.test = 'hello'
    ctx.status = 204
  } else if (ctx.path == '/exit') {
    ctx.session = null
    ctx.status = 204
  } else {
    ctx.body = ctx.session.test || 'no cookie'
  }
}

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'sets up the session'({ createApp, startApp }) {
    await createApp({
      session: {
        use: true,
        keys: ['a'],
      },
      test,
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
        keygrip: new Keygrip(['a']),
      },
      test,
    })
    await startApp()
      .session()
      .get('/set').assert(204)
      .get('/').assert(200, 'hello')
      .get('/exit').assert(204)
      .get('/').assert(200, 'no cookie')
  },
  async 'accepts keygrip algorithm'({ createApp, startApp }) {
    await createApp({
      session: {
        use: true,
        keys: ['test'],
        algorithm: 'sha512',
      },
      test,
    })
    await startApp()
      .session()
      .get('/set').assert(204)
      .get('/').assert(200, 'hello')
      .get('/exit').assert(204)
      .get('/').assert(200, 'no cookie')
  },
  async 'throws when keys are not an array'({ createApp }) {
    await throws({
      fn: createApp,
      args: [{
        session: {
          use: true,
          keys: 123,
        },
      }],
      message: /Keys must be an array/,
    })
  },
  async 'works without keys on non-signed'({ createApp, startApp }) {
    await createApp({
      session: {
        use: true,
        signed: false,
      },
      test,
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