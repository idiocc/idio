### Session

<img src="https://raw.github.com/idiocc/core/master/images/session.svg?sanitize=true" align="right" height="100"><kbd>👳‍♂️[Explore Session Middleware Configuration](../../wiki/Session)</kbd>

Allows to store data in the `.session` property of the context. The session is serialised and placed in cookies. When the request contains the cookie, the session will be restored and validated (if signed) against the key.

<table>
<!-- block-start -->
<tr><th><a href="example/session.js">Session Config</a></th></tr>
<tr><td>

%EXAMPLE: example/session, .. => @idio/idio%
</td>
</tr>
<tr><td>
<md2html>The session data is encrypted with `base64` and signed by default, unless the `.signed` option is set to false. Signing means that the signature will contain the hash which will be validated server-side, to ensure that the session data was not modified by the client. The default algorithm for signing is `sha1`, but it can be easily changed to a more secure `sha512`.</md2html>
</td>
</tr>
<tr>
<td>

%FORK-js example/session%
</td>
<!-- <td>%FORKERR-fs example/session%</td> -->
</tr>
</table>

%~ width="25"%