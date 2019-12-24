<img src="https://raw.github.com/idiocc/core/master/images/multer.svg?sanitize=true" align="left" height="100">

File uploads on the internet are usually performed by attaching files to a form, and the browser encodes the request into `@multipart/form-data` format, that includes a boundary and the filename. The Form Data middleware allows to decompose the incoming request and extract binary data from it. Even if there are no files, the forms can also be handled using this functionality.


