## Additional Middleware

There are some small bits of middleware that can be used in server as well, but which are not essential to its functioning. They are listed in <kbd>📖 [Wiki](../../wiki/Additional_Middleware)</kbd>.

- `csrfCheck`: ensures that the `csrf` token from session matches one in the request.
- `jsonErrors`: Allows to serve errors as _JSON_, which is useful for APIs.
- `github`: sets up GitHub OAuth routes.

%~%

## Custom Middleware

When required to add any other middleware in the application not included in the _Idio_ bundle, it can be done in several ways.

1. Passing the middleware function as part of the <link type="MiddlewareConfig">_MiddlewareConfig_</link>. It will be automatically installed to be used by the _Application_. All middleware will be installed in order it is found in the _MiddlewareConfig_.
    %EXAMPLE: example/custom-middleware/api-server, ../../compile => @idio/idio%
    %FORK example/custom-middleware/run-api%
2. Passing a configuration object as part of the _MiddlewareConfig_ that includes the `middlewareConstructor` property which will receive the reference to the `app`. Other properties such as `conf` and `use` will be used in the same way as when setting up bundled middleware: setting `use` to `true` will result in the middleware being used for every request, and the `config` will be passed to the constructor.
    %EXAMPLE: example/custom-middleware/proxy, ../../compile => @idio/idio%
    %FORK example/custom-middleware/proxy%

%~%