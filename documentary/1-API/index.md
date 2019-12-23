## API

The package is available by importing its default function and named components:

```js
import idio, { Keygrip, Router } from '@idio/idio'
```

%~%

<typedef noArgTypesInToc name="idio">types/api.xml</typedef>

The app can be stopped with an async `.destroy` method implemented on it that closes all connections.

<include-typedefs>typedefs.json</include-typedefs>

There are multiple items for middleware configuration:

<typedef name="MiddlewareConfig">types/middleware.xml</typedef>

The types for starting the server include the address, port and router configuration.

<typedef name="Config">types/index.xml</typedef>

After the app is started, it can be accessed from the return type.

<typedef name="Idio">types/index.xml</typedef>

The example below starts a simple server with session and custom middleware, which is installed (used) automatically because it's defined as a function.

<table>
<!-- block-start -->
<tr><th><a href="example/index.js">Source</a></th><th>Output</th>
</tr><tr>
<td>

%EXAMPLE: example, ../compile => @idio/idio%
</td>
<td>

%FORK example%
</td></tr>
</table>

%~%

## Middleware

Idio's advantage is that is has the essential middleware, that was compiled together with the server, so that the packages are reused and memory footprint is low.

%~ width="25"%