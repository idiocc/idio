<a href="https://github.com/idiocc/idio"><img src="https://raw.github.com/idiocc/core/master/images/compress.svg?sanitize=true" align="left" height="100"></a> Compression allows to gzip server response and minimise the number of bytes transmitted. The browser will use decompression algorithm to restore the original data. This might increase the CPU usage on devices however using compression is an industry standard today.

<include-typedefs>@goa/compress</include-typedefs>

---

## On This Page

%TOC%

## Example

Below we show to to setup the compression middleware.

%EXAMPLE: example/wiki/compression, ../../../compile => @idio/idio%

<fork lang="js">example/wiki/compression</fork>

When requesting files larger than default threshold (`1024` bytes), the server will respond with `gzip` content-encoding header, if the client accepts it. After setting `ctx.compress` to `false` manually, the compression will be skipped for that particular route.

When setting the `ctx.body` to an instance of _Stream_ or _Buffer_, it is important to specify `ctx.type` also, so that the filter can deduct whether the type is compressible.

%~%

Compression options extend the compression configuration from the <link external type="_goa.CompressConfig">`@goa/compress`</link> package, and override the default `flush` property to set to `Z_SYNC_FLUSH`.

<typedef level="2" narrow>types/options/compress.xml</typedef>

<typedef level="2" name="CompressConfig" narrow>node_modules/@goa/compress/types/index.xml</typedef>
