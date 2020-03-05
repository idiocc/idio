import { collect } from 'catchment'

export default function setupJsonBody() {
  /**
   * @type {_idio.Middleware}
   */
  async function jsonBody(ctx, next) {
    if (!ctx.is('json')) {
      return next()
    }
    let body = await collect(ctx.req)
    try {
      body = JSON.parse(body)
    } catch (err) {
      ctx.throw(400, 'Could not parse JSON.')
    }
    ctx.request.body = /** @type {Object} */ (body)
    return next()
  }
  return jsonBody
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').Middleware} _idio.Middleware
 */