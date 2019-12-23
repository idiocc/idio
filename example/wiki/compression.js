import aqt from '@rqt/aqt'
import idio from '../../compile'
import { readFileSync } from 'fs'
import { join } from 'path'

(async () => {
  /* start example */
  const { url, app, router } = await idio({
    compress: {
      use: true,
      config: {
        // default threashold
        threshold: 1024,
      },
    },
  }, { port: null })
  router.use(async (ctx, next) => {
    console.log('//', ctx.method, ctx.path)
    await next()
  })
  app.use(router.routes())

  router.get('/file/:filename', (ctx) => {
    ctx.body = readFileSync(join(
      'example/wiki', ctx.params.filename), 'utf8')
  })
  router.get('/raw/:filename', (ctx) => {
    // disable compression manually
    ctx.compress = false
    ctx.body = readFileSync(join(
      'example/wiki', ctx.params.filename))
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