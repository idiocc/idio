import rqt from 'rqt'

export default function makeNeoluddite(app, env, host, key) {
  return async (ctx, next) => {
    ctx._usage = []
    try {
      await next()
    } finally {
      if (!ctx._usage.length) return
      const usage = ctx._usage.map((u) => {
        if (app) u['app'] = app
        if (env) u['env'] = env
        return u
      })
      try {
        const res = await rqt(`${host}/use?key=${key}`, {
          data: usage,
        })
      } catch (err) {
        app.emit('error', err)
      }
    }
  }
}