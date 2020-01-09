import Context from '../../context'
import { throws, equal } from '@zoroaster/assert'
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
  async'csrf check for GET'({ createApp, startApp }) {
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