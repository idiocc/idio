## Hot Reload

The middleware supports native module reload, via a simple hack: we'll add a very short code at the bottom of each served file that will update exported bindings from that file. If a function is updated, it will be replaced, whereas if a class is updated, it's prototype will receive new properties.

%EXAMPLE: ./example/hot-reload, ../../../compile => @idio/idio%

<fork lang="jsx">./example/hot-reload</fork>

%~%