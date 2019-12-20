# @idio/idio

[![npm version](https://badge.fury.io/js/%40idio%2Fidio.svg)](https://www.npmjs.com/package/@idio/idio)

`@idio/idio` is a Koa's fork called Goa web server compiled with Closure Compiler so that its source code is optimised and contains only 1 external dependency (`mime-db`). Idio adds essential middleware to Goa, and includes the router.

```sh
yarn add @idio/idio
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`async idio(middlewareConfig=: !MiddlewareConfig, config=: !Config): !Idio`](#async-idiomiddlewareconfig-middlewareconfigconfig-config-idio)
  * [`Config`](#type-config)
  * [`Idio`](#type-idio)
- [Static](#static)
- [Session](#session)
- [Copyright & License](#copyright--license)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>



## API

The package is available by importing its default function:

```js
import idio from '@idio/idio'
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## <code>async <ins>idio</ins>(</code><sub><br/>&nbsp;&nbsp;`middlewareConfig=: !MiddlewareConfig,`<br/>&nbsp;&nbsp;`config=: !Config,`<br/></sub><code>): <i>!Idio</i></code>
Start the server. Sets the `proxy` property to `true` when the NODE_ENV is equal to _production_.

 - <kbd>middlewareConfig</kbd> <em>`!MiddlewareConfig`</em> (optional): The middleware configuration for the `idio` server.
 - <kbd>config</kbd> <em><code><a href="#type-config" title="Server configuration object.">!Config</a></code></em> (optional): The server configuration object.

The app can be stopped with an async `.destroy` method implemented on it that closes all connections.

__<a name="type-config">`Config`</a>__: Server configuration object.
<table>
 <thead><tr>
  <th>Name</th>
  <th>Type &amp; Description</th>
  <th>Default</th>
 </tr></thead>
 <tr>
  <td rowSpan="3" align="center">port</td>
  <td><em>number</em></td>
  <td rowSpan="3"><code>5000</code></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   The port on which to start the server.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">host</td>
  <td><em>string</em></td>
  <td rowSpan="3"><code>0.0.0.0</code></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   The host on which to listen.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center">router</td>
  <td><em><a href="https://github.com/idiocc/goa-router/wiki/Home#type-routerconfig" title="Config for the router.">!_goa.RouterConfig</a></em></td>
  <td rowSpan="3">-</td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   The configuration for the router.
  </td>
 </tr>
</table>


__<a name="type-idio">`Idio`</a>__: The return type of the idio.
<table>
 <thead><tr>
  <th>Name</th>
  <th>Type &amp; Description</th>
 </tr></thead>
 <tr>
  <td rowSpan="3" align="center"><strong>url*</strong></td>
  <td><em>string</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   The URL on which the server was started, such as <code>http://localhost:5000</code>.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>server*</strong></td>
  <td><em><a href="https://nodejs.org/api/http.html#http_class_http_server" title="An HTTP server that extends net.Server to handle network requests."><img src=".documentary/type-icons/node-even.png" alt="Node.JS Docs">!http.Server</a></em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   The server instance.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>app*</strong></td>
  <td><em><a href="https://github.com/idiocc/goa/wiki/Application#type-application" title="The application interface.">!_goa.Application</a></em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   The Goa application instance.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>middleware*</strong></td>
  <td><em>!Object&lt;string, <a href="https://github.com/idiocc/goa/wiki/Application#middlewarectx-contextnext-function-promisevoid" title="The function to handle requests which can be installed with the `.use` method.">!_goa.Middleware</a>&gt;</em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   An object with configured middleware functions, which can be installed manually using <code>app.use</code>, or <code>router.use</code>.
  </td>
 </tr>
 <tr>
  <td rowSpan="3" align="center"><strong>router*</strong></td>
  <td><em><a href="https://github.com/idiocc/goa-router/wiki/Home#type-router" title="Router For Goa Apps.">!_goa.Router</a></em></td>
 </tr>
 <tr></tr>
 <tr>
  <td>
   The router instance.
  </td>
 </tr>
</table>

<table>
<tr><th><a href="example/index.js">Source</a></th><th>Output</th>
</tr><tr>
<td>

```js
const { url, app } = await idio({
  session: { use: true, keys: new Keygrip(
    ['hello', 'world']) },
  async middleware(ctx, next) {
    ctx.body = 'hello world'
    await next()
  },
})
```
</td>
<td>

```
http://localhost:5000
hello world
```
</td></tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## Static

> <img src="https://raw.github.com/idiocc/core/master/images/static.svg?sanitize=true" align="left" height="100">
> <kbd>🗂 <a href="/doc/static.md">Read Static Middleware Configuration</a></kbd> <kbd>🗿 <a href="https://idio.cc/static.html">Static Idio</a></kbd>

Used to serve static files, such as stylesheets, images, videos, html and everything else. Will perform mime-type lookup to serve the correct content-type in the returned header.

<table>
<tr><th><a href="example/static.js">Static</a> <a href="example/static2.js">source</a></th><th>The Output</th></tr>
<tr><td>

```js
const { url, app } = await idio({
  static: {
    root: 'example', use: true,
  },
```

```js
// or multiple locations
  static: [{
    root: ['example'], use: true,
  }, {
    root: ['d'], use: true,
  }],
})
```
</td>
<td>

```css
/** http://localhost:53685/app.css */ 

body {
  font-size: larger;
}
```



```svg
<!-- http://localhost:5000/em.svg --> 

<xml></xml>
```
</td></tr>

<tr>
<td colspan="2">

<details>
<summary>Show Response Headers</summary>

```http
Content-Length: 29
Last-Modified: Thu, 18 Jul 2019 14:34:31 GMT
Cache-Control: max-age=0
Content-Type: text/css; charset=utf-8
Date: Fri, 20 Dec 2019 07:04:57 GMT
Connection: close
```



```http
Content-Length: 11
Last-Modified: Thu, 18 Jul 2019 14:47:20 GMT
Cache-Control: max-age=0
Content-Type: image/svg+xml
Date: Fri, 20 Dec 2019 07:05:38 GMT
Connection: close
```
</details>
</td>
</tr>
</table>



## Session


<img src="https://raw.github.com/idiocc/core/master/images/session.svg?sanitize=true" align="left" height="100"><kbd>[Read Session Configuration](/doc/session.md)</kbd>

Allows to store data in the `.session` property of the context. The session is serialised and placed in cookies. When the request contains the cookie, the session will be restored and validated (if signed) against the key.

<table>
<tr><th><a href="example/session.js">Session source</a></th><th>The Output</th></tr>
<tr><td>

```js
const { url, app } = await idio({
  session: { use: true, keys:
    ['hello', 'world'], config: {
    signed: false,
  } },
  async middleware(ctx, next) {
    if (ctx.session.user)
      ctx.body = 'welcome back '
        + ctx.session.user
    else {
      ctx.session.user = 'u'
        +( Math.random() * 1000).toFixed(1)
      ctx.body = 'hello new user'
    }
    await next()
  },
})
```
</td>
<td>

```
http://localhost:5000 

/ hello new user
/ welcome back u190.1
```
</td>
</tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/3.svg?sanitize=true">
</a></p>

## Copyright & License

GNU Affero General Public License v3.0

All original work on middleware and Koa are under MIT license.

<idio-footer>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>