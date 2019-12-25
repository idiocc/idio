import aqt from '@rqt/aqt'
import mismatch from 'mismatch'
import idio from '../compile'

(async () => {
  /* start example */
  const { url, app } = await idio({
    session: { use: true, keys:
      ['hello', 'world'], algorithm: 'sha512' },
    async middleware(ctx, next) {
      if (ctx.session.user)
        ctx.body = 'welcome back '
          + ctx.session.user
      else {
        ctx.session.user = 'u'
          + (Math.random() * 1000).toFixed(1)
        ctx.body = 'hello new user'
      }
      await next()
    },
  })
  /* end example */
  // console.log(url, '\n')
  let { body, headers } = await aqt(url)
  console.log('// GET /\n"%s"', body)
  console.log('/* set-cookie */')
  console.log(headers['set-cookie'].map(parseSetCookie))

  ;({ body, headers } = await aqt(url, {
    headers: {
      cookie: headers['set-cookie'],
    },
  }))
  console.log('// GET /\n"%s"', body)
  await app.destroy()
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