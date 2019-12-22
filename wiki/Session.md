<img src="https://raw.github.com/idiocc/core/master/images/session.svg?sanitize=true" align="left" height="100">

Session handles the cookies to implement state persistance with the browser. It's recommended to not use session for all routes by default, but extract it via the _Idio_ return and install it manually for each route that requires it.

---

## On This Page

%TOC%

## Example

The example below configures session middleware, but does not use it (since `use` is not set to `true`). The session is passed to router manually before the actual routing middleware, so that the context will contain the `.session` property. When the session is not added to the router (`/info` path), the `ctx.session` does not exist.

%EXAMPLE: example/wiki/session%

<fork lang="c">example/wiki/session</fork>

%~%

The options for _Idio_ contain the `keys` property which must be set.

<typedef level="2" narrow>types/options/session.xml</typedef>

%~%

Session configuration is from the <link external type="SessionConfig">`@goa/session`</link> package.

<typedef level="2" slimFunctions name="SessionConfig" narrow>node_modules/@goa/session/types/index.xml</typedef>

%~%

Finally, the context will receive the session property when `session` was used.

<typedef level="2" name="Session" narrow>node_modules/@goa/session/types/session.xml</typedef>
