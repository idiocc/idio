import FormData from '@multipart/form-data'
import compose from '@goa/compose'

/**
 * This class exposes the `file`, `files` and `body` properties
 * assigned to the ctx.req by multer, to ctx.file[s] and ctx.request.body.
 */
class FD extends FormData {
  any() {
    return proxyFD(super.any())
  }
  array(...args) {
    return proxyFD(super.array(...args))
  }
  fields(...args) {
    return proxyFD(super.fields(...args))
  }
  none(...args) {
    return proxyFD(super.none(...args))
  }
  single(...args) {
    return proxyFD(super.single(...args))
  }
}

const proxyFD = (original) => {
  /** @type {!_idio.Middleware} */
  async function middleware(ctx, next) {
    if (ctx.req.file) ctx.file = ctx.req.file
    if (ctx.req.files) ctx.files = ctx.req.files
    if (ctx.req.body) ctx.request.body = ctx.req.body
    if (ctx.file || ctx.files) {
      ctx.neoluddite('@multipart/form-data', 'file')
    } else if (ctx.request.body) {
      ctx.neoluddite('@multipart/form-data', 'body')
    }
    await next()
  }
  return compose([original, middleware])
}

/**
 * The Form Data middleware.
 * @param {!_goa.Application} app
 * @param {!Object} _
 * @param {!_idio.FormDataOptions} options
 */
export default function setupFormData(app, _, options) {
  const { any, array, none, fields, single, ...rest } = options
  const config = /** @type {!_multipart.FormDataConfig} */ (rest)
  if (any) {
    const f = new FD(config)
    return f.any()
  }
  if (array) {
    const f = new FD(config)
    return f.array(array.name, array.maxFiles)
  }
  if (none) {
    const f = new FD(config)
    return f.none()
  }
  if (fields) {
    const f = new FD(config)
    return f.fields(fields)
  }
  if (single) {
    const f = new FD(config)
    return f.single(single)
  }
  const f = new FD(config)
  return f
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').FormDataConfig} _multipart.FormDataConfig
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../..').FormDataOptions} _idio.FormDataOptions
 */