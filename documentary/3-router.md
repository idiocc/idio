## Router Set-up

After the _Application_ and _Router_ instances are obtained after starting the server as the `app` and `router` properties of the <link type="Idio">returned object</link>, the router can be configured to respond to custom paths. This can be done by assigning configured middleware from the map and standalone middleware, and calling the `use` method on the _Application_ instance.

%EXAMPLE: example/router, ../compile => @idio/core%

<table>
<tr><th>Logging</th><th>Response</th></tr>
<!-- block-start -->
<tr><td>

%FORK example/router%
</td>
<td>

%FORKERR-js example/router%
</td></tr>
</table>

%~%