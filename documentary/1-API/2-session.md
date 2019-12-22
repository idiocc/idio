## Session

<img src="https://raw.github.com/idiocc/core/master/images/session.svg?sanitize=true" align="left" height="100"><kbd>👳‍♂️[Explore Session Middleware Configuration](../../wiki/Session)</kbd>

Allows to store data in the `.session` property of the context. The session is serialised and placed in cookies. When the request contains the cookie, the session will be restored and validated (if signed) against the key.

<table>
<!-- block-start -->
<tr><th><a href="example/session.js">Session source</a></th><th>The Output</th></tr>
<tr><td>

%EXAMPLE: example/session, .. => @idio/idio%
</td>
<td>

%FORK example/session%
</td>
<!-- <td>%FORKERR-fs example/session%</td> -->
</tr>
</table>

%~%