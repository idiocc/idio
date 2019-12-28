import Context from '../../context'

/** @type {Object.<string, (c: Context, { origin: string })>} */
const T = {
  context: [Context, { origin: 'http://test.page' }],
  async'returns Access-Control-Allow-Methods headers'({ createApp, startApp }, { origin }) {
    await createApp({
      cors: {
        use: true,
        allowMethods: ['GET', 'POST'],
      },
    })
    await startApp()
      .set('Origin', origin)
      .set('Access-Control-Request-Method', 'GET')
      .options('/')
      .assert('access-control-allow-methods', 'GET,POST')
  },
  async'returns CORS headers with a function'({ createApp, startApp }, { origin }) {
    await createApp({
      cors: {
        use: true,
        origin() { return origin },
      },
    })
    await startApp()
      .set('Origin', origin)
      .get('/')
      .assert('access-control-allow-origin', origin)
  },
  async'returns CORS headers with a string'({ createApp, startApp }, { origin }) {
    await createApp({
      cors: {
        use: true,
        origin,
      },
    })
    await startApp()
      .set('Origin', origin)
      .get('/')
      .assert('access-control-allow-origin', origin)
  },
  async'returns CORS headers with an array'({ createApp, startApp }, { origin }) {
    await createApp({
      cors: {
        use: true,
        origin: [origin, 'www.test.com'],
      },
    })
    await startApp()
      .set('Origin', origin)
      .get('/')
      .assert('access-control-allow-origin', origin)
  },
}

export default T