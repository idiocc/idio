/* start example */
import idio, { websocket } from '../../compile'
/* end example */

(async () => {
  /* start example */
  const { url, app, server } = await idio()
  // clients stores current connections against ID
  const clients = websocket(server, {
    onConnect(clientId) {
      // the value is a function to send messages
      clients[clientId]('intro-event', 'Hello Client!')
    },
  })
  /* end example */
  await app.destroy()
})()