import Debug from '@idio/debug'
import { normalize, basename, extname, resolve, parse, sep } from 'path'
import createError from '@goa/http-errors'
import assert from 'assert'
import { exists as fsExists, stat as fsStat, createReadStream } from 'fs'
import makePromise from 'makepromise'
import resolvePath from '../resolve-path'

const exists = async (...args) => {
  return await makePromise(fsExists, ...args)
}
const stat = async (...args) => {
  return await makePromise(fsStat, ...args)
}

const debug = Debug('koa-send')

/**
 * Send file at `path` with the given `options` to the koa `ctx`.
 * @param {!_goa.Context} ctx
 * @param {string} path
 * @param {_idio.KoaSendConfig} [opts]
 */
export default async function send(ctx, path, opts = {}) {
  assert(ctx, 'koa context required')
  assert(path, 'pathname required')

  // options
  debug('send "%s" %j', path, opts)
  const root = opts.root ? normalize(resolve(opts.root)) : ''
  const trailingSlash = path[path.length - 1] == '/'
  path = path.substr(parse(path).root.length)
  const index = opts.index
  const maxage = opts.maxage || opts.maxAge || 0
  const immutable = opts.immutable || false
  const hidden = opts.hidden || false
  const format = opts.format !== false
  const extensions = Array.isArray(opts.extensions) ? opts.extensions : false
  const brotli = opts.brotli !== false
  const gzip = opts.gzip !== false
  const setHeaders = opts.setHeaders

  if (setHeaders && typeof setHeaders !== 'function') {
    throw new TypeError('option setHeaders must be function')
  }

  // normalize path
  path = decode(path)

  if (path == -1) return ctx.throw(400, 'failed to decode')

  // index file support
  if (index && trailingSlash) path += index

  path = resolvePath(root, path)

  // hidden file support, ignore
  if (!hidden && isHidden(root, path)) return

  let encodingExt = ''
  // serve brotli file when possible otherwise gzipped file when possible
  if (ctx.acceptsEncodings('br', 'identity') == 'br' && brotli && (await exists(path + '.br'))) {
    path = path + '.br'
    ctx.set('Content-Encoding', 'br')
    ctx.res.removeHeader('Content-Length')
    encodingExt = '.br'
  } else if (ctx.acceptsEncodings('gzip', 'identity') == 'gzip' && gzip && (await exists(path + '.gz'))) {
    path = path + '.gz'
    ctx.set('Content-Encoding', 'gzip')
    ctx.res.removeHeader('Content-Length')
    encodingExt = '.gz'
  }

  if (extensions && !/\.[^/]*$/.exec(path)) {
    const list = [...extensions]
    for (let i = 0; i < list.length; i++) {
      let ext = list[i]
      if (typeof ext != 'string') {
        throw new TypeError('Option extensions must be an array of strings.')
      }
      if (!/^\./.exec(ext)) ext = '.' + ext
      if (await exists(path + ext)) {
        path = path + ext
        break
      }
    }
  }

  // stat
  let stats
  try {
    stats = await stat(path)

    // Format the path to serve static file servers
    // and not require a trailing slash for directories,
    // so that you can do both `/directory` and `/directory/`
    if (stats.isDirectory()) {
      if (format && index) {
        path += '/' + index
        stats = await stat(path)
      } else {
        return
      }
    }
  } catch (err) {
    const notfound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR']
    if (notfound.includes(err.code)) {
      throw createError(404, err)
    }
    err.status = 500
    throw err
  }

  if (setHeaders) setHeaders(ctx.res, path, stats)

  // stream
  ctx.set('Content-Length', stats.size)
  if (!ctx.response.get('Last-Modified')) ctx.set('Last-Modified', stats.mtime.toUTCString())
  if (!ctx.response.get('Cache-Control')) {
    const directives = ['max-age=' + (maxage / 1000 | 0)]
    if (immutable) {
      directives.push('immutable')
    }
    ctx.set('Cache-Control', directives.join(','))
  }
  if (!ctx.type) ctx.type = type(path, encodingExt)
  ctx.body = createReadStream(path)

  return path
}

/**
 * Check if it's hidden.
 */

function isHidden (root, path) {
  path = path.substr(root.length).split(sep)
  for (let i = 0; i < path.length; i++) {
    if (path[i][0] == '.') return true
  }
  return false
}

/**
 * File type.
 */

function type (file, ext) {
  return ext !== '' ? extname(basename(file, ext)) : extname(file)
}

/**
 * Decode `path`.
 */

function decode (path) {
  try {
    return decodeURIComponent(path)
  } catch (err) {
    return -1
  }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@goa/goa').Context} _goa.Context
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types/modules').KoaSendConfig} _idio.KoaSendConfig
 */