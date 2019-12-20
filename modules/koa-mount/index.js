import { equal } from 'assert'
import Debug from '@idio/debug'
import compose from '@goa/compose'

const debug = Debug('koa-mount')

/**
 * Mount `app` with `prefix`, `app` may be a Koa application or middleware function.
 *
 * @param {string|_goa.Application|_goa.Middleware} prefix prefix, app, or middleware
 * @param {_goa.Application|_goa.Middleware} app app or middleware
 * @return {_goa.Middleware}
 */
export default function mount(prefix, app) {
  if (typeof prefix != 'string') {
    app = prefix
    prefix = '/'
  }

  equal(prefix[0], '/', 'mount path must begin with "/"')

  // compose
  const downstream = app.middleware
    ? compose(app.middleware)
    : app

  // don't need to do mounting here
  if (prefix == '/') return downstream

  const trailingSlash = prefix.slice(-1) == '/'

  const name = app.name || 'unnamed'
  debug('mount %s %s', prefix, name)

  return async function (ctx, upstream) {
    const prev = ctx.path
    const newPath = match(prev)
    debug('mount %s %s -> %s', prefix, name, newPath)
    if (!newPath) return await upstream()

    ctx['mountPath'] = prefix
    ctx.path = newPath
    debug('enter %s -> %s', prev, ctx.path)

    await downstream(ctx, async () => {
      ctx.path = prev
      await upstream()
      ctx.path = newPath
    })

    debug('leave %s -> %s', prev, ctx.path)
    ctx.path = prev
  }

  /**
   * Check if `prefix` satisfies a `path`.
   * Returns the new path.
   *
   * match('/images/', '/lkajsldkjf') => false
   * match('/images', '/images') => /
   * match('/images/', '/images') => false
   * match('/images/', '/images/asdf') => /asdf
   *
   * @param {string} path
   * @return {string|boolean}
   */
  function match (path) {
    const p = /** @type {string} */ (prefix)
    // does not match prefix at all
    if (path.indexOf(p) != 0) return false

    const newPath = path.replace(p, '') || '/'
    if (trailingSlash) return newPath

    // `/mount` does not match `/mountlkjalskjdf`
    if (newPath[0] != '/') return false
    return newPath
  }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@goa/goa').Application} _goa.Application
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@goa/goa').Middleware} _goa.Middleware
 */