<img src="https://raw.github.com/idiocc/core/master/images/frontend.svg?sanitize=true" align="left" height="100">

Latest browsers support pretty much all JavaScript features that are used to write modern code. Therefore, if a front-end package publishes its source code, it's possible to just execute it in the browser, without compiling or transpiling it. The only problem is that browser won't be able to handle `import packageName from 'package-name'`, since modules must be imported by path. Therefore, the frontend middleware will patch the source code to update those cases.

This middleware also allows to serve JSX files by transpiling them on-the-fly using a sinple JSX parser (no proper ASTs). Although there are some [limitations](#todo--jsx-limitations), the parser works great

<include-typedefs>@idio/frontend</include-typedefs>
<include-typedefs>@a-la/jsx</include-typedefs>

_Front End_ options just extend the _Front End_ <link external type="FrontEndConfig">configuration record</link>, providing the `.use` method.

<typedef level="2" name="FrontEndOptions" narrow>types/options/index.xml</typedef>

<typedef level="2" name="FrontEndConfig" narrow>node_modules/@idio/frontend/types/index.xml</typedef>

The middleware will assign the `etag` on the response which is equal to the date when the patched file changed. This means that the browser will cache the file without the middleware having to do the work again which is useful to speed up development by preserving memory.

%~%