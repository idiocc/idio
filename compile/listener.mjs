/* eslint-env browser */
const ws = new WebSocket(`ws://${location.host}`, 'json')
setInterval(() => {
  if (ws.readyState == ws.OPEN) ws.send('')
}, 2000)

const listeners = {}
const reloaders = []

/**
 * Functions that render root applications, called for re-renderning.
 * This must be called by the developer.
 * @param {!Function} cb The function to call on reload.
 */
export default function idioAddHotReload(cb) {
  reloaders.push(cb)
}

/**
 * Register a callback for hot reload.
 * This is called by code from front-end middleware.
 * @param {string} path The path to the module.
 * @param {!Function}
 */
export const idioHotReload = (path, callback) => {
  // already registered for that path
  if (path in listeners) return
  listeners[path] = callback
}

ws.addEventListener('message', async (event) => {
  const { message, event: e } = JSON.parse(event.data)
  console.log('Received %s:', e, message)
  const { filename } = message
  const cb = listeners[filename]
  if (cb) {
    const { module, classes = {} } = await cb()
    Object.entries(classes).forEach(([key, Class]) => {
      const NewClass = module[key]
      if (!NewClass) {
        console.error('A class with key %s wasn\'t exported by new module.', key)
        return
      }
      const { prototype: OriginalPrototype } = Class
      const { prototype: NewPrototype } = NewClass
      Object.getOwnPropertyNames(OriginalPrototype).forEach((prop) => {
        if (!(prop in NewPrototype)) {
          console.log('Removing %s from %s', prop, Class.name)
          delete Class.prototype[prop]
        }
      })
      const desc = Object.getOwnPropertyDescriptors(NewPrototype)
      Object.defineProperties(OriginalPrototype, desc)
    })
    reloaders.forEach((rcb) => {
      rcb()
    })
  } else {
    console.log('Listener for %s not found', filename)
  }
})