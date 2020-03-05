<typedef narrow name="JSONBodyOptions">types/options/index.xml</typedef>

When an incoming request has the `application/json` content type, it will be collected into a buffer, parsed with _JSON.parse_, and saved into `ctx.request.body` for downstream middleware. If an error was encountered during parsing, the server will return status 400. Passing `true` is equivalent to `{ use: true }` minimal options set.

%EXAMPLE: ./example/json-body%

<fork lang="js">./example/json-body</fork>

%~%