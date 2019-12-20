# Static

The static middleware can serve static files.

<img src="https://raw.github.com/idiocc/core/master/images/static.svg?sanitize=true" align="left" height="100">

<a name="table-of-contents"></a>

* [`StaticOptions`](#type-staticoptions)
* [`KoaStaticConfig`](#type-koastaticconfig)
* [`SetHeaders`](#type-setheaders)
- [Example](#example)

__<a name="type-staticoptions">`StaticOptions`</a>__: The top-level options when setting up the static middleware.

|   Name    |                                                         Type                                                          |                    Description                    | Default |
| --------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- | ------- |
| __root*__ | <em>(string \| !Array&lt;string&gt;)</em>                                                                             | Root or multiple roots from which to serve files. | -       |
| use       | <em>boolean</em>                                                                                                      | Use this middleware for every request.            | `false` |
| mount     | <em>string</em>                                                                                                       | Path from which to serve files.                   | `/`     |
| maxage    | <em>number</em>                                                                                                       | How long to cache files for.                      | `0`     |
| config    | <em><a href="#type-koastaticconfig" title="The configuration that is passed to koa-session.">KoaStaticConfig</a></em> | `koa-static` configuration.                       | -       |

[](https://github.com/koajs/session/#example) __<a name="type-koastaticconfig">`KoaStaticConfig`</a>__: The configuration that is passed to koa-session.

|    Name    |                                                                  Type                                                                  |                                                                                             Description                                                                                             |   Default    |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| maxage     | <em>number</em>                                                                                                                        | Browser cache max-age in milliseconds.                                                                                                                                                              | `0`          |
| hidden     | <em>boolean</em>                                                                                                                       | Allow transfer of hidden files.                                                                                                                                                                     | `false`      |
| index      | <em>(string \| boolean)</em>                                                                                                           | Default file name. Pass `false` to not have default name.                                                                                                                                           | `index.html` |
| defer      | <em>boolean</em>                                                                                                                       | If `true`, serves after return next(), allowing any downstream middleware to respond first.                                                                                                         | `false`      |
| gzip       | <em>boolean</em>                                                                                                                       | Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with `.gz` extension exists.                                                  | `true`       |
| br         | <em>boolean</em>                                                                                                                       | Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with `.br` extension exists (note, that brotli is only accepted over https). | `true`       |
| setHeaders | <em><a href="#type-setheaders" title="The function which allows to set the headers prior to sending the response.">SetHeaders</a></em> | Function to set custom headers on response.                                                                                                                                                         | -            |
| extensions | <em>boolean</em>                                                                                                                       | Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served.                                                                           | `false`      |

[`import('http').ServerResponse`](https://nodejs.org/api/http.html#http_class_http_serverresponse) __<a name="type-httpserverresponse">`http.ServerResponse`</a>__: A writable stream that communicates data to the client. The second argument of the http.Server.on("request") event.

[`import('fs').Stats`](https://nodejs.org/api/fs.html#fs_class_fs_stats) __<a name="type-fsstats">`fs.Stats`</a>__

`(res: ServerResponse, path: string, stats: Stats) => any` __<a name="type-setheaders">`SetHeaders`</a>__: The function which allows to set the headers prior to sending the response.

## Example

The `static` options slot accepts either a single, or multiple configuration items, which additionally can be mounted at certain path. The behaviour of serving files is to find the requested file in the root directory, and return its stream. With mount, the path will be prepended with the mount (must start with `/`), e.g., `example/t.dat` _->_`mount/t.dat` when `root` is `example` and `mount` is `mount`.

<table>
<tr><th><a href="example/index.js">Source</a></th><th>Output</th>
</tr><tr>
<td>

```js
const { url, app } = await idio({
  static: [{
    root: 'example', use: true,
  }, {
    root: 'd', use: true,
    mount: '/mount',
  }, {
    root: ['src', 'test'], use: true,
    mount: '/_',
  }],
})
```
</td>
<td>

```html
<!-- http://localhost:53713/app.css -->
body {
  font-size: larger;
} 

<!-- http://localhost:53713/mount/em.svg -->
<xml></xml> 

<!-- http://localhost:53713/_/fixture/test.txt -->
a test file
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
Date: Fri, 20 Dec 2019 07:05:43 GMT
Connection: close

Content-Length: 11
Last-Modified: Thu, 18 Jul 2019 14:47:20 GMT
Cache-Control: max-age=0
Content-Type: image/svg+xml
Date: Fri, 20 Dec 2019 07:05:43 GMT
Connection: close

Content-Length: 12
Last-Modified: Sun, 12 May 2019 15:06:56 GMT
Cache-Control: max-age=0
Content-Type: text/plain; charset=utf-8
Date: Fri, 20 Dec 2019 07:05:43 GMT
Connection: close
```
</details>
</td>
</tr>
</table>


<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

[Back To Documentation](/)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>