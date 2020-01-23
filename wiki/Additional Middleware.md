There are smaller pieces of middleware that can come in handy.

<typedef name="CsrfCheckOptions">types/options/index.xml</typedef>

This is useful to assert on the existence of session, and that its `csrf` property matches the `csrf` parameter either from parsed request body, or query.

%EXAMPLE: test/spec/middleware/csrf-check%

<typedef narrow name="GitHubOptions">types/options/index.xml</typedef>

GitHub middleware allows to authorise users with GitHub OAuth protocol. You need to make sure that the session middleware is setup first (even without `use: true` property) so that the security code can be set in cookies to prevent man-in-the-middle attack.

The middleware will be installed on the app automatically, without having to set up routes for it.

A number of GitHub middleware can be installed, if an array is passed. This is useful for different scopes.

%EXAMPLE: example/github%

<fork lang="js">example/github</fork>