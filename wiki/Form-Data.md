<img src="https://raw.github.com/idiocc/core/master/images/multer.svg?sanitize=true" align="left" height="100">

File uploads on the internet are usually performed by attaching files to a form, and the browser encodes the request into `@multipart/form-data` format, that includes a boundary and the filename. The Form Data middleware allows to decompose the incoming request and extract binary data from it. Even if there are no files, the forms can also be handled using this functionality.

<include-typedefs>@multipart/form-data</include-typedefs>
<include-typedefs>@goa/busboy</include-typedefs>

%~%

The options extend the configuration as shortcuts for _FormData_ instance methods, such as `.any .array .none .fields .single`. If none of them are set, the created instance of _FormData_ will be accessed via the `middleware` return property. When any of the shortcuts options were specified, the middleware function will be returned instead.

<typedef level="2" narrow>types/options/form-data.xml</typedef>

Without options, middleware functions can be generated using `.any`, `.single`, _etc_ methods on the instance.

<typedef slimFunctions level="2" name="FormData" narrow>node_modules/@multipart/form-data/types/misc.xml</typedef>

%~%

The configuration is from the <link external type="_multipart.FormDataConfig">`@multipart/form-data`</link> package.

<typedef level="2" name="FormDataConfig" narrow>node_modules/@multipart/form-data/types/index.xml</typedef>

%~%

If files, or file, were extracted from the request, they will be assigned to `ctx` on `.file` or `.files` property by _Idio_ (the middleware will also assign `ctx.request.file[s]`). The type of this variable depends on the way the middleware was setup (`.fields`/`.array`/`.file` _etc_).

<typedef slimFunctions level="2" name="FormDataFile" narrow>node_modules/@multipart/form-data/types/file.xml</typedef>

The request object on the context will also be assigned the `.body` property with parsed key-value pairs.

%~%

## Storage

To enable storage on the hard drive, pass the `dest` property, otherwise files will be saved in memory, and their contents accessed via **buffer** property: `ctx.file.buffer`.