## Static

The static middleware can serve static files.

__<a name="type-staticoptions">`StaticOptions`</a>__

|   Name    |                       Type                        |                    Description                    | Default |
| --------- | ------------------------------------------------- | ------------------------------------------------- | ------- |
| __root*__ | <em>(string \| !Array&lt;string&gt;)</em>         | Root or multiple roots from which to serve files. | -       |
| use       | <em>boolean</em>                                  | Use this middleware for every request.            | `false` |
| mount     | <em>string</em>                                   | Path from which to serve files.                   | `/`     |
| maxage    | <em>number</em>                                   | How long to cache files for.                      | `0`     |
| config    | <em>[KoaStaticConfig](#type-koastaticconfig)</em> | `koa-static` configuration.                       | -       |

__<a name="type-koastaticconfig">`KoaStaticConfig`</a>__

|    Name    |        Type         |                                                                                             Description                                                                                             |   Default    |
| ---------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| maxage     | <em>number</em>     | Browser cache max-age in milliseconds.                                                                                                                                                              | `0`          |
| hidden     | <em>boolean</em>    | Allow transfer of hidden files.                                                                                                                                                                     | `false`      |
| index      | <em>string</em>     | Default file name.                                                                                                                                                                                  | `index.html` |
| defer      | <em>boolean</em>    | If `true`, serves after return next(), allowing any downstream middleware to respond first.                                                                                                         | `false`      |
| gzip       | <em>boolean</em>    | Try to serve the gzipped version of a file automatically when gzip is supported by a client and if the requested file with `.gz` extension exists.                                                  | `true`       |
| br         | <em>boolean</em>    | Try to serve the brotli version of a file automatically when brotli is supported by a client and if the requested file with `.br` extension exists (note, that brotli is only accepted over https). | `true`       |
| setHeaders | <em>SetHeaders</em> | Function to set custom headers on response.                                                                                                                                                         | -            |
| extensions | <em>boolean</em>    | Try to match extensions from passed array to search for file when no extension is sufficed in URL. First found is served.                                                                           | `false`      |

<table>
<tr><th><a href="example/index.js">Source</a></th><th>Output</th>
</tr><tr>
<td>

```js
const { url, app } = await idio({
  static: {
    root: ['example'], use: true,
  },
})
```
</td>
<td>

```
http://localhost:5000/hello-world.txt
hello world!
```
</td></tr>
</table>

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/0.svg?sanitize=true"></a></p>