import Context from '../../context'
import { join } from 'path'
import { ok, deepEqual } from '@zoroaster/assert'
import TempContext from 'temp-context'

/** @type {Object.<string, (c: Context, t: TempContext, e: Context)>} */
const T = {
  context: [Context, TempContext, Context],
  async'handles any file upload'({ createApp, startApp, staticDir }, { TEMP, snapshot }) {
    const s = join(staticDir, 'small.txt')
    let usage
    const { middleware: { form }, app, router } = await createApp({
      async usage(ctx, next) {
        ctx._usage = []
        await next()
        usage = ctx._usage.map((a) => {
          delete a.timestamp
          delete a.env
          return a
        })
      },
      form: {
        dest: TEMP,
      },
    })
    app.use(router.routes())
    router.post('/test', form.any(), (ctx) => {
      ok(ctx.req.files[0])
      ok(ctx.files[0])
      ok(ctx.files[0] === ctx.req.files[0])
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
    deepEqual(usage, [{ package: '@multipart/form-data', item: 'file' }])
    return st.replace(/# .+/, '# file')
  },
  async'handles any file upload via config'({ createApp, startApp, staticDir }, { TEMP, snapshot }) {
    const s = join(staticDir, 'small.txt')
    const { middleware: { form }, app, router } = await createApp({
      form: {
        any: true,
        dest: TEMP,
      },
    })
    app.use(router.routes())
    router.post('/test', form, (ctx) => {
      ok(ctx.req.files[0])
      ok(ctx.files[0])
      ok(ctx.files[0] === ctx.req.files[0])
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
  async'handles fields file upload'({ createApp, startApp, staticDir }, { TEMP, snapshot }) {
    const s = join(staticDir, 'small.txt')
    const { middleware: { form }, app, router } = await createApp({
      form: {
        dest: TEMP,
      },
    })
    app.use(router.routes())
    router.post('/test', form.fields([{
      name: 'upload',
    }]), (ctx) => {
      ok(ctx.req.files && ctx.req.files.upload)
      ok(ctx.files && ctx.files.upload === ctx.req.files.upload)
      const file = ctx.files.upload[0]
      delete file.filename
      delete file.stream
      delete file.path
      ctx.body = { file, body: ctx.request.body }
    })
    await startApp()
      .postForm('/test', async (f) => {
        f.addSection('test', 'data')
        await f.addFile(s, 'upload')
      })
      .assert(200, { file: {
        fieldname: 'upload',
        originalname: 'small.txt',
        encoding: '7bit',
        mimetype: 'application/octet-stream',
        destination: 'test/temp',
        size: 12,
      }, body: { test: 'data' } })
    const st = await snapshot()
    return st.replace(/# .+/, '# file')
  },
  async'handles just body'({ createApp, startApp }) {
    let usage
    const { middleware: { form }, app, router } = await createApp({
      async usage(ctx, next) {
        ctx._usage = []
        await next()
        usage = ctx._usage.map((a) => {
          delete a.timestamp
          delete a.env
          return a
        })
      },
      form: {},
    })
    app.use(router.routes())
    router.post('/test', form.none(), (ctx) => {
      ctx.body = ctx.request.body
    })
    await startApp()
      .postForm('/test', async (f) => {
        f.addSection('test', 'data')
        f.addSection('hello', 'world')
      })
      .assert(200, { test: 'data', hello: 'world' })
    deepEqual(usage, [{ package: '@multipart/form-data', item: 'body' }])
  },
}

export default T