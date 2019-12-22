## CORS

<img src="https://raw.github.com/idiocc/core/master/images/cors.svg?sanitize=true" align="left" height="100"><kbd>👮‍♀️[Explore CORS Middleware Configuration](../../wiki/Cors)</kbd>

To enable dynamic communication between clients and the server via JavaScript requests from the browser, the server must respond with `Access-Control-Allow-Origin` header that sets the appropriate allowed _Origin_s. This middleware is easy to use on production and development environments.

<table>
<!-- block-start -->
<tr><th><a href="example/cors.js">CORS source</a></th><th>The Output</th></tr>
<tr><td>

%EXAMPLE: example/cors, ../compile => @idio/idio%
</td>
<td>

<fork lang="js" env="NODE_ENV=production">example/cors</fork>
</td>
<!-- <td>%FORKERR-fs example/session%</td> -->
</tr>
</table>

%~%