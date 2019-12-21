/**
 * @param {!http.Server} server
 */
export const enableDestroy = (server) => {
  /** @type {Object<string, !net.Socket>} */
  const connections = {}
  server.on('connection', (con) => {
    const { remoteAddress, remotePort } = con
    const k = [remoteAddress, remotePort].join(':')
    connections[k] = con
    con.on('close', () => {
      delete connections[k]
    })
  })
  server.destroy = async () => {
    await new Promise(r => {
      server.close(r)
      for (let k in connections) {
        connections[k].destroy()
      }
    })
  }
}
