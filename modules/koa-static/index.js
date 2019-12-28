import Debug from '@idio/debug'
import { resolve } from 'path'
import assert from 'assert'
import send from '../koa-send'

const debug = Debug('koa-static')

/**
 * Serve static files from `root`.
 * @param {string} root
 * @param {_idio.StaticConfig} [opts]
 */
export default (root, opts = {}) => {
  assert(root, 'root directory is required to serve files')

  // options
  debug('static "%s" %j', root, opts)
  opts.root = resolve(root)
  if (opts.index !== false) opts.index = opts.index || 'index.html'

  if (!opts.defer) {
    /** @type {!_goa.Middleware} */
    const serve = async (ctx, next) => {
      let done = false

      if (ctx.method == 'HEAD' || ctx.method == 'GET') {
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
    return serve
  }

  /** @type {!_goa.Middleware} */
  const serve = async (ctx, next) => {
    await next()

    if (ctx.method != 'HEAD' && ctx.method != 'GET') return
    // response is already handled
    if (ctx.body != null || ctx.status != 404) return

    try {
      await send(ctx, ctx.path, opts)
    } catch (err) {
      if (err.status != 404) {
        throw err
      }
    }
  }
  return serve
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').StaticConfig} _idio.StaticConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/goa').Middleware} _goa.Middleware
 */