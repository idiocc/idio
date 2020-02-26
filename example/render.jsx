import aqt from '@rqt/aqt'
/* start example */
import idio, { render } from '../compile'
/* end example */

(async () => {
  let a
  try {
    /* start example */
    const { url, app, router } = await idio()
    router.get('/', (ctx) => {
      ctx.body = render(<html>
        <head>
          <title>Example</title>
        </head>
        <body>
          Hello World!
        </body>
      </html>, {
        addDoctype: true,
        pretty: true,
      })
    })
    app.use(router.routes())
    /* end example */
    a = app
    const { body } = await aqt(url)
    console.log(body)
  } catch (err) {
    console.log(err.stack)
  } finally {
    if (a) await a.destroy()
  }
})()