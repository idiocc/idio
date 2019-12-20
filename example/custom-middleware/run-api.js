import rqt from 'rqt'
import APIServer from './api-server'

(async () => {
  const url = await APIServer(5005)
  console.log('Started API server at: %s', url)
  await rqt(url)
  await rqt(`${url}?key=app-secret`)
  process.exit()
})()