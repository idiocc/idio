import { equal } from 'assert'
import { aqt } from 'rqt'
import Context from '../../context'

/** @type {Object.<string, (c: Context, { origin: string })>} */
const T = {
  context: [Context, { origin: 'http://test.page' }],
  async '!returns CORS headers with a function'({ createApp, startApp }, { origin }) {
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
  async 'returns CORS headers with a string'({ start }, { origin }) {
    const { url } = await start({
      cors: {
        origin,
        use: true,
      },
    })
    const { headers: {
      'access-control-allow-origin': actual,
    } } = await aqt(url, {
      headers: {
        Origin: origin,
      },
    })
    equal(actual, origin)
  },
  async 'returns CORS headers with an array'({ start }, { origin }) {
    const { url } = await start({
      cors: {
        origin: [origin, 'http://test.com'],
        use: true,
      },
    })
    const { headers: {
      'access-control-allow-origin': actual,
    } } = await aqt(url, {
      headers: {
        Origin: origin,
      },
    })
    equal(actual, origin)
  },
}

export default T