import aqt from '@rqt/aqt'
import createApp from './'

(async () => {
  const { app, url } = await createApp()
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

  await app.destroy()
})()