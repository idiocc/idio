## Compression

<a href="../../wiki/cors"><img src="https://raw.github.com/idiocc/core/master/images/compress.svg?sanitize=true" align="left" height="100"></a>
<kbd>🗜[Explore Compression Middleware Configuration](../../wiki/Compression)</kbd>

When the body of the response is set to a string (or JSON, but not a stream), the response can be compressed using gzip compression. This allows to save data transmitted over the network. Compression with streams is only possible when there's no threshold, or if the stream contains the `.length` property.

<table>
<!-- block-start -->
<tr><th><a href="example/compression.js">Compression source</a></th><th>The Output</th></tr>
<tr><td>

%EXAMPLE: example/compression, ../compile => @idio/idio%
</td>
<td>

<fork lang="js">example/compression</fork>
</td>
<!-- <td>%FORKERR-fs example/session%</td> -->
</tr>
</table>

%~%