import aqt from '@rqt/aqt'
import Form from '@multipart/form'
import rm from '@wrote/rm'
import idio from '../compile'

(async () => {
  /* start example */
  const { url, app, router, middleware: {
    form,
  } } = await idio({
    form: {
      config: {
        dest: 'example/upload',
      },
    },
  })
  app.use(router.routes())
  router.post('/example', form.single('bio'), (ctx) => {
    delete ctx.req.file.stream
    ctx.body = ctx.req.file
  })
  /* end example */
  const f = new Form()
  await f.addFile('example/bio.txt', 'bio')
  // console.log(url, '\n')
  let { body } = await aqt(`${url}/example`, {
    data: f.data,
    type: `multipart/form-data; boundary=${f.boundary}`,
  })
  console.log(body)
  try {
    await rm(body.path)
  } finally {
    await app.destroy()
  }
})()