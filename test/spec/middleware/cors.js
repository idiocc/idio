import { equal } from 'assert'
import { aqt } from 'rqt'
import Context from '../../context'

/** @type {Object.<string, (c: Context, { origin: string })>} */
const T = {
  context: [Context, { origin: 'http://test.page' }],
  async 'returns CORS headers with a function'({ createApp, startApp }, { origin }) {
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
  async 'returns CORS headers with a string'({ createApp, startApp }, { origin }) {
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
  async 'returns CORS headers with an array'({ createApp, startApp }, { origin }) {
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