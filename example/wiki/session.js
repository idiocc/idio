import aqt from '@rqt/aqt'
import mismatch from 'mismatch'
import idio from '../../compile'

(async () => {
  /* start example */
  const { url, app, middleware: {
    session, // initialise but don't use everywhere
  }, router } = await idio({
    session: {
      keys: ['key-a', 'key-b'],
      httpOnly: true,
      key: 'example:sess',
    },
  }, { port: null })
  router.use(async (ctx, next) => {
    console.log('#', ctx.method, ctx.path)
    await next()
  })
  app.use(router.routes())

  router.get('/signin', session, (ctx) => {
    ctx.session.user = 'User'
    ctx.body = 'You\'ve signed in.'
  })
  router.get('/member', session, (ctx) => {
    ctx.body = 'You are: ' + ctx.session.user
  })

  // NOT using session
  router.get('/info', (ctx) => {
    console.log('# Cookie:', ctx.cookies.get('example:sess'))
    if (ctx.session) {
      ctx.body = 'Are you user: ' + ctx.session.user
    } else ctx.body = 'You are not user.'
  })
  /* end example */
  try {
    const { body, headers: { 'set-cookie': setCookie } }
      = await aqt(`${url}/signin`)
    console.log('>', body)
    console.log(setCookie.map(parseSetCookie))
    console.log()

    const { body: body2 }
      = await aqt(`${url}/member`, { headers: {
        cookie: setCookie,
      } })

    console.log('>', body2, '\n')

    const { body: body3 }
      = await aqt(`${url}/info`, { headers: {
        cookie: setCookie,
      } })
    console.log('>', body3)
  } finally {
    await app.destroy()
  }
})()


/**
 * Parses the `set-cookie` header.
 * @param {string} header
 */
export function parseSetCookie(header) {
  const pattern = /\s*([^=;]+)(?:=([^;]*);?|;|$)/g

  const pairs = mismatch(pattern, header, ['name', 'value'])

  /** @type {{ name: string, value: string }} */
  const cookie = pairs.shift()

  for (let i = 0; i < pairs.length; i++) {
    const match = pairs[i]
    cookie[match.name.toLowerCase()] = (match.value || true)
  }

  return cookie
}