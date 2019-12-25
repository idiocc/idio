import { METHODS } from 'http'

const t = (n, m) => `<fn name="${n}" return="!_idio.Router">
  <arg type="string|!RegExp|!_idio.Middleware" name="...nameOrPathOrMiddleware">
    The arguments.
  </arg>
  Handle \`${m}\` requests. The signature accepts 3 possible ways of assigning a route:
  \`\`\`js
  router.${n}(name, path, ...middleware)
  router.${n}(path, ...middleware)
  router.${n}(...middleware)
  \`\`\`
</fn>`

METHODS.forEach((m) => {
  const n = m.toLowerCase()
  if (n == 'm-search') return
  console.log(t(n, m))
})
