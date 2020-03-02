import cleanStack from '@artdeco/clean-stack'
/**
 * Serve errors as JSON.
 * @param {!_goa.Application} app
 * @param {!Object} _
 * @param {_idio.JSONErrorsOptions} options
 */
export default function setupJsonErrors(app, _, options) {
  const { logClientErrors = true, exposeStack = false, clearIdio = true } = options
  /**
   * @type {_idio.Middleware}
   */
  async function jsonErrors(ctx, next) {
    try {
      await next()
    } catch (err) {
      if (err.statusCode && err.statusCode >= 400 && err.statusCode < 500) {
        err.message = err.message.replace(/^([^!])/, '!$1')
      }
      err.stack = cleanStack(err.stack, clearIdio ? {
        ignoredModules: ['@idio/idio'],
      } : undefined)
      if (err.message.startsWith('!')) {
        ctx.body = {
          error: err.message.replace('!', ''),
          stack: exposeStack ? err.stack : undefined,
        }
        if (logClientErrors) console.log(err.message)
      } else {
        ctx.body = {
          error: 'internal server error',
          stack: exposeStack ? err.stack : undefined,
        }
        app.emit('error', err)
      }
    }
  }
  return jsonErrors
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types/options').JSONErrorsOptions} _idio.JSONErrorsOptions
 */