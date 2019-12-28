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
      dest: 'example/upload',
    },
  })
  app.use(router.routes())
  router.post('/example',
    form.single('bio'),
    (ctx) => {
      delete ctx.file.stream
      ctx.body = { file: ctx.file,
        body: ctx.request.body }
    }
  )
  /* end example */
  const f = new Form()
  await f.addFile('example/bio.txt', 'bio')
  f.addSection('hello', 'world')
  // console.log(url, '\n')
  let { body } = await aqt(`${url}/example`, {
    data: f.data,
    type: `multipart/form-data; boundary=${f.boundary}`,
  })
  try {
    await rm(body.file.path)
    body.file.path = body.file.path.replace(/upload\/(.{5}).+/, 'upload/$1')
    body.file.filename = body.file.filename.replace(/(.{5}).+/, '$1')
    console.log(body)
  } finally {
    await app.destroy()
  }
})()