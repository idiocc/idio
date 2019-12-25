### Front End

<a href="../../wiki/Form-Data"><img src="https://raw.github.com/idiocc/core/master/images/frontend.svg?sanitize=true" align="left" height="100"></a>
<kbd>🖼[Explore Front End Middleware Configuration](../../wiki/Form-Data)</kbd>

Web applications are always full stack and involve both back-end together with front-end. Whereas all previously described middleware was for the server only, the front-end middleware facilitates browser development, as it allows to serve source code from `node_modules` directory and transpile JSX. Modern browsers support modules, but JavaScript needs to be patched to rename imports like `import X from 'package-name'` into `import X from '/node_modules/package-name/src/index.mjs'`.

<table>
<!-- block-start -->
<tr><th><a href="example/frontend/index.js">Front End source</a></th><th>The Output</th></tr>
<tr><td>

%EXAMPLE: example/frontend, ../compile => @idio/idio%

</td>
<td>

%EXAMPLE: example/frontend/example, ../compile => @idio/idio%

</td>
<!-- <td>%FORKERR-fs example/session%</td> -->
</tr>
<tr>
<td>
Using the simple configuration from above, and a JSX file, the browser will receive the following patched source code. The middleware will also look for requests that start with the `/node_modules` path, and serve them also. The pragma (`import { h } from 'preact'`) is also added automatically, but it can be configured.
</td>
</tr>
<tr>
<td>

<fork lang="js">example/frontend</fork>
</td>
</tr>
</table>