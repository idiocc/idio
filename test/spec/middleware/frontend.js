import Zoroaster from 'zoroaster'
import Context from '../../context'

/** @type {Object.<string, (c: Context, z: Zoroaster)>} */
const T = {
  context: [Context, Zoroaster],
  async 'serves frontend files'({ createApp, startApp }, { snapshotExtension }) {
    snapshotExtension('jsx')
    await createApp({
      frontend: {
        use: true,
        directory: 'example/frontend',
      },
    })
    let res
    await startApp()
      .get('/example/frontend/example')
      .assert(200)
      .assert(({ body }) => {
        res = body
      })
    return res
  },
}

export default T