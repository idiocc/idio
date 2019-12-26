import { equal } from '@zoroaster/assert'
import { gunzipSync } from 'zlib'
import { request } from 'http'
import Catchment from 'catchment'
import { createReadStream, readFileSync } from 'fs'
import { parse } from 'url'
import Context from '../../context'

const req = async (url, headers = {}) => {
  const c = new Catchment({ binary: 1 })
  const { hostname, path, port } = parse(url)
  const r = request({
    hostname, port, path,
    headers,
  }, (res) => {
    res.pipe(c)
  })
  r.end()
  const res = await c.promise
  return res
}

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'uses compression'({ createApp, startApp, readFixture, assignRoute }) {
    const body = await readFixture()
    await createApp({ compress: { use: true } })
    await startApp()
    const fullUrl = assignRoute('/dracula.txt', body)
    const res = await req(fullUrl, {
      'Accept-Encoding': 'gzip, deflate, br',
    })
    const actual = gunzipSync(res).toString()
    equal(actual, body)
  },
  async 'uses compression on streams'({ createApp, startApp }) {
    const { app, router } = await createApp({ compress: { use: true } })
    app.use(router.routes())
    router.get('/dracula.txt', async (ctx, next) => {
      ctx.type = 'text/plain'
      ctx.body = createReadStream('test/fixture/medium.txt', {
        highWaterMark: 1024 * 32,
      })
      await next()
    })
    await startApp()
      .get('/dracula.txt')
      .assert(200, readFileSync('test/fixture/medium.txt', 'utf8'))
      .assert('content-encoding', 'gzip')
  },
  async 'passes threshold to the constructor'({ createApp, startApp, readFixture, assignRoute }) {
    const body = await readFixture()
    await createApp({
      compress: { use: true, config: { threshold: body.length + 1 } },
    })
    await startApp()
    const fullUrl = assignRoute('/dracula.txt', body)
    const actual = await req(fullUrl, {
      'Accept-Encoding': 'gzip, deflate, br',
    })
    equal(actual, body)
  },
}

export default T