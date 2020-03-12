## Hot Reload

The middleware supports native module reload, via a simple hack: we'll add a very short code at the bottom of each served file that will update exported bindings from that file. If a function is updated, it will be replaced, whereas if a class is updated, it's prototype will receive new properties.

> It's recommended to install the `node-watch` dependency for this feature, as native Node watching is pretty buggy and some IDEs fire update events twice..

%EXAMPLE: ./example/hot-reload, ../../../compile => @idio/idio%

<fork lang="jsx">./example/hot-reload</fork>

<kbd>🖥 [Read more](https://github.com/idiocc/frontend#hot-reload)</kbd>

%~%