import aqt from '@rqt/aqt'
import idio from '../compile'

(async () => {
  /* start example */
  const { url, app,
    middleware: { session, form },
    router,
  } = await idio({
    // Idio's bundled middleware.
    session: {
      algorithm: 'sha512',
      keys: ['hello', 'world'],
      prefix: 'example-',
    },
    static: {
      use: true,
      root: 'upload',
    },
    form: {
      config: {
        dest: 'upload',
      },
    },
    // Any middleware function to be use app-wise.
    async middleware(ctx, next) {
      console.log('//', ctx.method, ctx.path)
      await next()
    },
  })
  app.use(router.routes())
  router.get('/', session, (ctx) => {
    ctx.body = 'hello world'
  })
  router.post('/upload', session, async (ctx, next) => {
    if (!ctx.session.user) {
      ctx.status = 403
      ctx.body = 'you must sign in to upload'
      return
    }
    await next()
  }, form.single('/upload'), (ctx) => {
    // db.create({
    //  user: ctx.session.id,
    //  file: ctx.req.file.path,
    // })
    ctx.body = 'Thanks for the upload. Link: ' +
      `${url}/${ctx.file.filename}`
  })
  /* end example */
  console.log(url)
  const { body } = await aqt(url)
  console.log(body)
  await app.destroy()
})()