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
  * [`_idio.MiddlewareConfig`](#type-_idiomiddlewareconfig)
  * [`_idio.Config`](#type-_idioconfig)
- [Static](#static)
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

__<a name="type-_idiomiddlewareconfig">`_idio.MiddlewareConfig`</a>__: Middleware configuration for the `idio` server.

|   Name   |                           Type                           |       Description       |
| -------- | -------------------------------------------------------- | ----------------------- |
| static   | <em>[_idio.StaticOptions](#type-_idiostaticoptions)</em> | `koa-static` options.   |
| compress | <em>_idio.CompressOptions</em>                           | `koa-compress` options. |
| session  | <em>_idio.SessionOptions</em>                            | `koa-session` options.  |

__<a name="type-_idioconfig">`_idio.Config`</a>__: Server configuration object.

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

The static middleware can serve static files.

__<a name="type-_idiostaticoptions">`_idio.StaticOptions`</a>__

|   Name    |                             Type                             |                    Description                    | Default |
| --------- | ------------------------------------------------------------ | ------------------------------------------------- | ------- |
| __root*__ | <em>(string \| !Array&lt;string&gt;)</em>                    | Root or multiple roots from which to serve files. | -       |
| use       | <em>boolean</em>                                             | Use this middleware for every request.            | `false` |
| mount     | <em>string</em>                                              | Path from which to serve files.                   | `/`     |
| maxage    | <em>number</em>                                              | How long to cache files for.                      | `0`     |
| config    | <em>[_idio.KoaStaticConfig](#type-_idiokoastaticconfig)</em> | `koa-static` configuration.                       | -       |

__<a name="type-_idiokoastaticconfig">`_idio.KoaStaticConfig`</a>__

|    Name    |           Type            |                                                                                             Description                                                                                             |   Default    |
| ---------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| maxage     | <em>number</em>           | Browser cache max-age in milliseconds.                                                                                                                                                              | `0`          |
| hidden     | <em>boolean</em>          | Allow transfer of hidden files.                                                                                                                                                                     | `false`      |
| index      | <em>string</em>           | Default file name.                                                                                                                                                                                  | `index.html` |
| defer      | <em>boolean</em>          | If `true`, serves after return next(), allowing any downstream middleware to respond first.                                                                                                         | `false`      |
| gzip       | <em>boolean</em>          | Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with `.gz` extension exists.                                                  | `true`       |
| br         | <em>boolean</em>          | Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with `.br` extension exists (note, that brotli is only accepted over https). | `true`       |
| setHeaders | <em>_idio.SetHeaders</em> | Function to set custom headers on response.                                                                                                                                                         | -            |
| extensions | <em>boolean</em>          | Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served.                                                                           | `false`      |

<table>
<tr><th><a href="example/index.js">Source</a></th><th>Output</th>
</tr><tr>
<td>

```js
const { url, app } = await idio({
  static: {
    root: ['example'],
  },
})
```
</td>
<td>

```
http://localhost:5000/example/hello-world.txt
Not Found
```
</td></tr>
</table>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/3.svg?sanitize=true"></a></p>

## Copyright

(c) [Idio][1] 2019

[1]: https://idio.cc

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/-1.svg?sanitize=true"></a></p>