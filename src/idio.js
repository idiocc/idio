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
  }
}