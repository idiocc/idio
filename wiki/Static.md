<img src="https://raw.github.com/idiocc/core/master/images/static.svg?sanitize=true" align="left" height="100"> Static middleware can serve files from the filesystem. It will set the correct `content-length` header based on the size of the file, as well as the `content-type` header according to the extension of the file being served.

%TOC%

## Example

The `static` options slot accepts either a single, or multiple configuration items, which additionally can be mounted at certain path. The behaviour of serving files is to find the requested file in the root directory, and return its stream. With mount, the path will be served from the mount URL (must start with `/`), e.g., `example/t.dat` _->_`mount/t.dat` when `root` is `example` and `mount` is `/mount`.

<table>
<!-- block-start -->
<tr><th><a href="example/static0.js">Source</a></th><th>Output</th>
</tr><tr>
<td>

%EXAMPLE: example/static0, ../compile => @idio/idio%
</td>
<td>

%FORK-html example/static0%
</td></tr>
<!-- <tr>
  <td colspan="2" align="center">
    <strong>The Headers</strong>
  </td>
</tr> -->
<tr>
<td colspan="2">

<details>
<summary>Show Response Headers</summary>

%FORKERR-http example/static0%
</details>
</td>
</tr>
</table>

Static options extend the static configuration used for `koa-send`.

<typedef level="2" narrow>types/options/static.xml</typedef>

<typedef level="2" narrow>types/modules/koa-static.xml</typedef>

<typedef narrow>types/modules/set-headers.xml</typedef>