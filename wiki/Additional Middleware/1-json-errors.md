<typedef narrow name="JSONErrorsOptions">types/options/index.xml</typedef>

This middleware will catch errors that happen during processing of requests, and serve it as a JSON object, with `error` and `stack` properties (when stack is explicitly exposed via the options).

There are 2 ways to throw client errors: either with `ctx.throw(4xx, 'client error')`, or by simply adding a `!` before an error message. The response is always served with status code 200, but the error is contained in the response object.

%EXAMPLE: example/json-errors%

<fork lang="js">example/json-errors</fork>