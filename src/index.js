import startApp from './start-app'

/**
 * Start the server. Sets the `proxy` property to `true` when the NODE_ENV is equal to _production_.
 * @param {MiddlewareConfig} [middlewareConfig] Middleware configuration for the `idio` `core` server.
 * @param {StaticOptions} [middlewareConfig.static] `static` options.
 * @param {_idio.Config} [config] Server configuration object.
 * @param {number} [config.port=5000] The port on which to start the server. Default `5000`.
 * @param {string} [config.host="0.0.0.0"] The host on which to listen. Default `0.0.0.0`.
 * @example
```js
// start a server, and serve files from the "static" directory.
await idio({
  static: {
    use: true,
    root: 'static',
    config: {
      hidden: true,
    },
  },
})
```
 */
export default async function idio(middlewareConfig = {}, config = {}) {
  return await startApp(middlewareConfig, config)
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').Config} _idio.Config
 */