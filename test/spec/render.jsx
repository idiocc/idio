import { render } from '../../src'
import Context from '../context'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async'renders jsx'({ createApp, startApp }) {
    await createApp({
      serve(ctx) {
        ctx.body = render(<html>
          <body>
            Hello World
          </body>
        </html>, {
          addDoctype: true,
        })
      },
    })
    await startApp()
      .get('/')
      .assert(200, '<!doctype html><html><body>Hello World</body></html>')
  },
}

export default T