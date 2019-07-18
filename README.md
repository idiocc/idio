# @idio/idio

[![npm version](https://badge.fury.io/js/%40idio%2Fidio.svg)](https://npmjs.org/package/@idio/idio)

`@idio/idio` is @Goa/Koa Web Server Bundled With Essential Middleware.

```sh
yarn add @idio/idio
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`async idio(middlewareConfig?: MiddlewareConfig, conf?: Config): { app, url, middleware }`](#async-idiomiddlewareconfig-middlewareconfigconf-config--app-url-middleware-)
  * [`MiddlewareConfig`](#type-middlewareconfig)
  * [`Config`](#type-config)
- [Static](#static)
- [Session](#session)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import idio from '@idio/idio'
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `async idio(`<br/>&nbsp;&nbsp;`middlewareConfig?: MiddlewareConfig,`<br/>&nbsp;&nbsp;`conf?: Config,`<br/>`): { app, url, middleware }`

Starts the server and returns the `app` and `url` properties. The app can be stopped with an async `.destroy` method implemented on it that closes all connections.

__<a name="type-middlewareconfig">`MiddlewareConfig`</a>__: Middleware configuration for the `idio` server.

|   Name   |           Type           |       Description       |
| -------- | ------------------------ | ----------------------- |
| static   | <em>StaticOptions</em>   | `koa-static` options.   |
| compress | <em>CompressOptions</em> | `koa-compress` options. |
| session  | <em>SessionOptions</em>  | `koa-session` options.  |

__<a name="type-config">`Config`</a>__: Server configuration object.

| Name |      Type       |              Description               |  Default  |
| ---- | --------------- | -------------------------------------- | --------- |
| port | <em>number</em> | The port on which to start the server. | `5000`    |
| host | <em>string</em> | The host on which to listen.           | `0.0.0.0` |

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

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Static

[Read Static Middleware Configuration](/doc/static.md)


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
/ welcome back u844.0
```
</td></tr>
</table>

## Session

[Read Session Component Configuration](/doc/session.md)

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/3.svg?sanitize=true"></a></p>

## Copyright

(c) [Idio][1] 2019

[1]: https://idio.cc

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/-1.svg?sanitize=true"></a></p>