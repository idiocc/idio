import aqt from '@rqt/aqt'
import createApp from './'

(async () => {
  let app
  try {
    const { app: a, url } = await createApp()
    app = a
    const res = await aqt(`${url}/api/user`, {
      headers: {
        origin: 'http://insecure.com',
      },
    })
    console.log(res)
    const localhost = await aqt(`${url}/api/user`, {
      headers: {
        origin: 'http://localhost:5000',
      },
    })
    console.log(localhost)
  } finally {
    await app.destroy()
  }
})()