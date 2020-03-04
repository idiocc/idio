import frontend from '@idio/frontend'

/**
 * The Front End middleware.
 * @param {!_goa.Application} app
 * @param {!Object} _
 * @param {_idio.FrontEndOptions} options
 */
export default function setupFrontend(app, _, options, acc, _options) {
  // const config = /** @type {_idio.FrontEndConfig} */ (options)

  if (options.hotReload === true) options.hotReload = {}
  const { hotReload } = options

  let watchers
  if (hotReload) {
    if (!hotReload.getServer) hotReload.getServer = _options.getServer
    if (hotReload.watchers) watchers = hotReload.watchers
    else {
      watchers = {}
      hotReload.watchers = watchers
    }
  }
  const f = frontend(/** @type {_idio.FrontEndConfig} */ (options))
  // remember for destroy
  if (watchers) f.watchers = watchers
  return f
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types/options').FrontEndOptions} _idio.FrontEndOptions
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types/options').FrontEndConfig} _idio.FrontEndConfig
 */