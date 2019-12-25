### Compression

<a href="../../wiki/compression"><img src="https://raw.github.com/idiocc/core/master/images/compress.svg?sanitize=true" align="right" height="100"></a>
<kbd>🗜[Explore Compression Middleware Configuration](../../wiki/Compression)</kbd>

When the body of the response is non-empty, it can be compressed using `gzip` algorithm. This allows to save data transmitted over the network. The default threshold is `1024` bytes, since below that the benefits of compression are lost as the compressed response might end up being even larger.

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
<!-- %~ width="25"% -->

%~ width="25"%