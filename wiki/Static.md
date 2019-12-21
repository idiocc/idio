The static middleware can serve static files.

<img src="https://raw.github.com/idiocc/core/master/images/static.svg?sanitize=true" align="left" height="100">

%TOC%

<typedef narrow flatten>types/options/static.xml</typedef>

<typedef narrow flatten>types/modules/koa-static.xml</typedef>

<typedef narrow flatten>types/modules/set-headers.xml</typedef>

## Example

The `static` options slot accepts either a single, or multiple configuration items, which additionally can be mounted at certain path. The behaviour of serving files is to find the requested file in the root directory, and return its stream. With mount, the path will be prepended with the mount (must start with `/`), e.g., `example/t.dat` _->_`mount/t.dat` when `root` is `example` and `mount` is `mount`.

<table>
<!-- block-start -->
<tr><th><a href="example/index.js">Source</a></th><th>Output</th>
</tr><tr>
<td>

%EXAMPLE: example/static0, .. => @idio/idio%
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