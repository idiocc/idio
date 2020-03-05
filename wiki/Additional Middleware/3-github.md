<include-typedefs>@idio/github</include-typedefs>

<typedef narrow name="GitHubOptions">types/options/index.xml</typedef>

GitHub middleware allows to authorise users with GitHub OAuth protocol. You need to make sure that the session middleware is setup first (even without `use: true` property) so that the security code can be set in cookies to prevent the man-in-the-middle attack vector.

The middleware will be installed on the app automatically, without having to set up routes for it.

A number of GitHub middleware can be installed, if an array is passed. This is useful for different scopes.

%EXAMPLE: example/github%

<fork lang="js">example/github</fork>

%~%