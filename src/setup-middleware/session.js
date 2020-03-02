import session from '@goa/session'
import Keygrip from '@goa/cookies/src/Keygrip'
import Debug from '@idio/debug'

const debug = Debug('idio')

/**
 * The session middleware.
 * @param {!_goa.Application} app
 * @param {!Object} _
 * @param {!_idio.SessionOptions} options
 */
export default function setupSession(app, _, options) {
  let { keys, keygrip, algorithm, ...rest } = options
  if (keys && !Array.isArray(keys)) throw new Error('session: Keys must be an array.')
  if (algorithm) {
    if (!keys || !(0 in keys))
      throw new Error('To create a Keygrip instance with custom algorithm, keys must be provided.')
    keygrip = new Keygrip(keys, algorithm)
    debug('Created Keygrip instance with %s algorithm', algorithm)
  }
  const config = /** @type {!_idio.SessionConfig} */ (rest)
  if (config.signed !== false && !keygrip) {
    if (!keys || !(0 in keys))
      throw new Error('Session keys are signed by default, unless you set signed=false, you must provide an array with keys.')
  }
  if (keygrip) debug('session: Setting a Keygrip instance on the app')
  else if (keys) debug('session: Setting an array of keys of length %s on the app', keys.length)
  else debug('session: the cookies won\'t be signed as no keys are provided.')

  app.keys = keygrip || keys
  const ses = session(config)
  return ses
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('@typedefs/goa').Application} _goa.Application
 */
/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../../types/options').SessionOptions} _idio.SessionOptions
 */
