import aqt from '@rqt/aqt'
import { parse } from 'path'
import idio from '../../compile'
import { readFileSync, createReadStream } from 'fs'
import { join } from 'path'

(async () => {
  /* start example */
  const { url, app, router } = await idio({
    compress: {
      use: true,
    },
  }, { port: null })
  router.use(async (ctx, next) => {
    console.log('//', ctx.method, ctx.path)
    await next()
  })
  app.use(router.routes())

  router.get('/file/:filename', (ctx) => {
    const { filename } = ctx.params
    ctx.type = parse(filename).ext
    ctx.body = createReadStream(join(
      'example/wiki', filename))
  })
  router.get('/raw/:filename', (ctx) => {
    const { filename } = ctx.params
    // disable compression manually
    ctx.compress = false
    ctx.body = readFileSync(join(
      'example/wiki', filename))
  })
  /* end example */
  try {
    const { headers }
      = await aqt(`${url}/file/session.js`)
    console.log(headers)
    console.log()

    const { headers: headers2 }
      = await aqt(`${url}/raw/session.js`)

    console.log(headers2)
  } finally {
    await app.destroy()
  }
})()