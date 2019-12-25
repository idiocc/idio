import aqt from '@rqt/aqt'
import idio from '../../compile'

(async () => {
  /* start example */
  const { url, app } = await idio({
    frontend: {
      use: true,
      directory: 'example/frontend',
    },
  })
  /* end example */
  let { body } = await aqt(`${url}/example`)
  console.log(body)

  await app.destroy()
})()