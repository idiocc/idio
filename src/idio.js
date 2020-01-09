import Context from '@goa/goa/src/context'

/**
 * @implements {_idio.Context}
 */
export default class IdioContext extends Context {
  constructor() {
    super()
    this.session = undefined
    this.sessionOptions = undefined
    this.compress = null
    // router
    this._matchedRoute = null
    this._matchedRouteName = null
    this.params = null
    this.router = null
    this.mountPath = null

    // form-data
    this.file = null
    this.files = null

    // usage
    this._usage = null
  }
  /**
   * Records a billed item for neoluddite.dev
   * @param {string} p The package name.
   * @param {string} item The billed item name.
   * @param {!Object} [d] Any additional options.
   */
  neoluddite(p, item, d = {}) {
    if (!this._usage) return
    this._usage.push({
      'package': p,
      'item': item,
      'timestamp': new Date().getTime(),
      ...d,
    })
  }
}