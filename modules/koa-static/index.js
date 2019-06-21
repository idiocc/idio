import Debug from '@idio/debug'
import { resolve } from 'path'
import assert from 'assert'
import send from '../koa-send'

const debug = Debug('koa-static')

/**
 * Serve static files from `root`.
 *
 * @param {string} root
 * @param {_idio.KoaStaticConfig} [opts]
 * @returns {_goa.Middleware}
 */
export default (root, opts = {}) => {
  assert(root, 'root directory is required to serve files')

  // options
  debug('static "%s" %j', root, opts)
  opts.root = resolve(root)
  if (opts.index !== false) opts.index = opts.index || 'index.html'

  if (!opts.defer) {
    return async function serve(ctx, next) {
      let done = false

      if (ctx.method === 'HEAD' || ctx.method === 'GET') {
        try {
          done = await send(ctx, ctx.path, opts)
        } catch (err) {
          if (err.status != 404) {
            throw err
          }
        }
      }

      if (!done) {
        await next()
      }
    }
  }

  return async function serve(ctx, next) {
    await next()

    if (ctx.method != 'HEAD' && ctx.method != 'GET') return
    // response is already handled
    if (ctx.body != null || ctx.status != 404) return // eslint-disable-line

    try {
      await send(ctx, ctx.path, opts)
    } catch (err) {
      if (err.status != 404) {
        throw err
      }
    }
  }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').KoaStaticConfig} _idio.KoaStaticConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/goa').Middleware} _goa.Middleware
 */