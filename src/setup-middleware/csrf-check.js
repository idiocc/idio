/**
 * CSRF check. todo: add header validation
 * @param {!_goa.Application} app
 * @param {!Object} _
 * @param {_idio.CsrfCheckOptions} options
 */
export default function setupCsrfCheck(app, _, options) {
  /**
   * @type {_idio.Middleware}
   */
  function csrfCheck(ctx, next) {
    const { body = true, query = true } = options
    const { session: ses } = ctx
    if (!ses) ctx.throw(401, 'Session does not exist.')

    const csrf = ses['csrf']
    if (!csrf) ctx.throw(500, 'CSRF is missing from session.')

    let c1, c2
    if (body) c1 = (ctx.request.body || {})['csrf']
    if (query) c2 = ctx.query['csrf']
    const c = c1 || c2
    if (csrf != c) ctx.throw(403, 'Invalid CSRF token')
    return next()
  }
  return csrfCheck
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types/options').CsrfCheckOptions} _idio.CsrfCheckOptions
 */