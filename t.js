import idio, { createApp } from './'

(async () => {
  const { app } = await idio({
    async test(ctx) {
      ctx.session
      ctx.accept.charset('utf8')
    },
  })
  await app.destroy()
})()