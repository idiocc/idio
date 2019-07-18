## API

The package is available by importing its default function:

```js
import idio from '@idio/idio'
```

%~%

```## async idio => { app, url, middleware }
[
  ["middlewareConfig?", "MiddlewareConfig"],
  ["conf?", "Config"]
]
```

Starts the server and returns the `app` and `url` properties. The app can be stopped with an async `.destroy` method implemented on it that closes all connections.

%TYPEDEF types/middleware.xml MiddlewareConfig%

%TYPEDEF types/index.xml Config%

<table>
<!-- block-start -->
<tr><th><a href="example/index.js">Source</a></th><th>Output</th>
</tr><tr>
<td>

%EXAMPLE: example, .. => @idio/idio%
</td>
<td>

%FORK example%
</td></tr>
</table>

%~%