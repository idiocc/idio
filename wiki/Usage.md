Idio will collect usage of middleware and send it to [NeoLuddite.Dev](https://neoluddite.dev) service when the api key is configured. Each middleware and other packages will emit the `use` event, which is then tracked on the portal. This will allow package creators to receive fair compensation proportionate to the number of times their intellectual property was used.

The following events are currently collected from middleware:

## static: _koa-send_

1. `stream`: When streaming static data.

## session: _@goa/session_

1. `save`: When the session is saved via cookies.
1. `save-external`: When the session is saved via external storage.

## cors: _@goa/cors_

1. `headers`: When setting the CORS headers.
1. `options`: When responding to pre-flight requests via the `Options` method.

## compress: _@goa/compress_

1. `stream`: When the compression is applied to stream.
1. `data`: When non-stream body is compressed.

## form-data: _@multipart/form-data_

1. `file`: Receive files in the request.
1. `body`: Receive fields only in the request.

##