### File Upload

<a href="../../wiki/Form-Data"><img src="https://raw.github.com/idiocc/core/master/images/multer.svg?sanitize=true" align="left" height="100"></a>
<kbd>🖼[Explore Form Data Middleware Configuration](../../wiki/Form-Data)</kbd>

Browser will submit forms and send files using `multipart/form-data` type of request. It will put all fields of the form together and stream them to the server, sending pairs of keys/values as well as files when they were attached. The _Form Data_ middleware is the **[Multer](https://github.com/expressjs/multer)** middleware specifically rewritten for Koa that can handle file uploads.

<table>
<!-- block-start -->
<tr><th><a href="example/upload.js">File Upload source</a></th><th>The Output</th></tr>
<tr><td>

%EXAMPLE: example/upload, ../compile => @idio/idio%
</td>
<td>

<fork lang="js">example/upload</fork>
</td>
<!-- <td>%FORKERR-fs example/session%</td> -->
</tr>
</table>

%~%