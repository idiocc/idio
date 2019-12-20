import idio from '../../compile'

const APIServer = async (port) => {
  const { url } = await idio({
    // 1. Add logging middleware.
    async log(ctx, next) {
      await next()
      console.log(' --> API: %s %s %s', ctx.method, ctx.url, ctx.status)
    },
    // 2. Add always used error middleware.
    async error(ctx, next) {
      try {
        await next()
      } catch (err) {
        ctx.status = 403
        ctx.body = err.message
      }
    },
    // 3. Add validation middleware.
    async validateKey(ctx, next) {
      if (ctx.query.key !== 'app-secret')
        throw new Error('Wrong API key.')
      ctx.body = 'ok'
      await next()
    },
  }, { port })
  return url
}

export default APIServer