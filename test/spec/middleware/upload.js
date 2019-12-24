import Context from '../../context'
import { join } from 'path'
import { ok } from '@zoroaster/assert'
import TempContext from 'temp-context'

/** @type {Object.<string, (c: Context, t: TempContext)>} */
const T = {
  context: [Context, TempContext],
  async 'handles a single file upload'({ createApp, startApp, staticDir }, { TEMP, snapshot }) {
    const s = join(staticDir, 'small.txt')
    const { middleware: { form }, app, router } = await createApp({
      form: {
        config: {
          dest: TEMP,
        },
      },
    })
    app.use(router.routes())
    router.post('/test', form.any(), (ctx) => {
      ok(ctx.req.files[0])
      delete ctx.req.files[0].stream
      delete ctx.req.files[0].filename
      delete ctx.req.files[0].path
      ctx.body = ctx.req.files
    })
    await startApp()
      .postForm('/test', async (f) => {
        await f.addFile(s, 'upload')
      })
      .assert(200, [{
        fieldname: 'upload',
        originalname: 'small.txt',
        encoding: '7bit',
        mimetype: 'application/octet-stream',
        destination: 'test/temp',
        size: 12,
      }])
    const st = await snapshot()
    return st.replace(/# .+/, '# file')
  },
}

export default T