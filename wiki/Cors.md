<a href="https://github.com/idiocc/idio"><img src="https://raw.github.com/idiocc/core/master/images/cors.svg?sanitize=true" align="left" height="100"></a> When making dynamic requests using JavaScript, such as _Ajax_ or _fetch_, browsers will check if they are allowed by sending an OPTION request first, to receive `CORS` headers. This middleware allows to respond to such requests with allowed security settings.

---

## On This Page

%TOC%

## Example

The example shows how to handle CORS requests both on production and local environments.

%EXAMPLE: example/wiki/cors, ../../../compile => @idio/idio%

On a localhost, the middleware receives `null` as the origin property, so that requests from any host are allowed.

<fork lang="js">example/wiki/cors/req</fork>

When deploying to a production server, the `NODE_ENV` will be read and only applicable hosts are applied. The server still returns data, but because the `Access-Control-Allow-Origin` header is missing, the browser will not process the response. The header is missing because an array is set as possible origins, if it was set to a string, it will set such header to the value passed in options, and the browser will be responsible to see if origins match. There's no difference security-wise.

<fork env="NODE_ENV=production" lang="js">example/wiki/cors/req</fork>

> ^ The `access-control-allow-origin` is missing for the requests from _http://insecure.com_ and the browser won't process the response.

%~%

CORS options extend the original package's config by allowing to set multiple origins as an array.

<typedef level="2" narrow>types/options/cors.xml</typedef>

%~%

Session configuration is from the <link external type="_goa.CorsConfig">`@goa/cors`</link> package.

<typedef level="2" name="CorsConfig" narrow>node_modules/@goa/cors/types/index.xml</typedef>
