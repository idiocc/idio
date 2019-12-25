### Front End

<a href="../../wiki/Front-End"><img src="https://raw.github.com/idiocc/core/master/images/frontend.svg?sanitize=true" align="left" height="100"></a>
<kbd>🌐[Explore Front End Middleware Configuration](../../wiki/Front-End)</kbd>

Web applications are always full stack and involve both back-end together with front-end. Whereas all previously described middleware was for the server only, the front-end middleware facilitates browser development, as it allows to serve source code from `node_modules` directory and transpile JSX. Modern browsers support modules, but JavaScript needs to be patched to rename imports like
```js
// was
import X from 'package-name'
// becomes
import X from '/node_modules/package-name/src/index.mjs'
```
This is achieved by resolving the `module` field from `package.json` of served packages (with fallback to the `main` field, but in that case `require` statements will not work).

<table>
<!-- block-start -->
<tr><th><a href="example/frontend/index.js">Configuration</a></th><th><a href="example/frontend/example.jsx">JSX Component</a></th></tr>
<tr><td>

%EXAMPLE: example/frontend, ../compile => @idio/idio%

</td>
<td>

%EXAMPLE: example/frontend/example, ../compile => @idio/idio%

</td>
<!-- <td>%FORKERR-fs example/session%</td> -->
</tr>
<tr>
<td colspan="2">
<md2html>Using the simple configuration from above, and a JSX file, the browser will receive the following patched source code. The middleware will also look for requests that start with the `/node_modules` path, and serve them also. The pragma (`import { h } from 'preact'`) is also added automatically, but it can be configured.</md2html>
</td>
</tr>
<tr>
<td colspan="2">

<fork lang="js">example/frontend</fork>
</td>
</tr>
</table>

The idea here is to provide a basic mechanism to serve front-end JavaScript code, without inventing any module systems, adapting to _CommonJS_, or transpiling old features. We simply want to execute our modern code and browsers are more than capable to do that, without us having to run complex build systems on the development code. Our simple JSX parser is not rocket science either and works perfectly well without building ASTs (but check for minor limitations in Wiki).