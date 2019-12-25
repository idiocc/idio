<img src="https://raw.github.com/idiocc/core/master/images/frontend.svg?sanitize=true" align="left" height="100">

Modern browsers support pretty much all JavaScript features that are used to write modern code. Therefore, if a front-end package publishes its source code, it's possible to just execute it in the browser, without compiling or transpiling it. The only problem is that browser won't be able to handle `import packageName from 'package-name'`, since modules must be imported by path. Therefore, the frontend middleware will patch the source code to update those cases.

This middleware also allows to serve JSX files by transpiling them on-the-fly using a sinple JSX parser (no proper ASTs). Although there are some [limitations](#todo--jsx-limitations), the parser works great

<include-typedefs>@idio/frontend</include-typedefs>

_Front End_ options just extend the _Front End_ <link external type="FrontEndConfig">configuration record</link>, providing the `.use` method.

<typedef level="2" name="FrontEndOptions" narrow>types/options/index.xml</typedef>

<typedef level="2" name="FrontEndConfig" narrow>node_modules/@idio/frontend/types/index.xml</typedef>

The middleware will assign the `etag` on the response which is equal to the date when the patched file changed. This means that the browser will cache the file without the middleware having to do the work again which is useful to speed up development by preserving memory.

%~%

## Example

By default, the `frontend` directory is used to serve files, but it can be changes and multiple folders can be specified in the config. Files can be served without the extension, and when requesting a directory, the middleware will redirect to the index file. Scripts can also import CSS styles, and the middleware will serve them via dynamic JS.

%EXAMPLE: example/wiki/frontend/example, ../../../compile => @idio/idio%

<fork lang="jsx">example/wiki/frontend/example</fork>

### Mounting

The paths used to serve front-end files will have to contain the path to the frontend dir passed during configuration. To mount them on a separate path, the `mount` config option can be used, however the served folder must be inside of the mount point as shown below.

%EXAMPLE: example/wiki/frontend/mount, ../../../compile => @idio/idio%

<fork lang="jsx">example/wiki/frontend/mount</fork>

%~%

## TODO & JSX Limitations

1. Front-end development isn't fully efficient without reloading modules as they are updated, therefore the next version will include hot-module reload.
1. JSX does not support comments like that right now
    ```jsx
    render(<div>
      {/* hello world */}
    </div>)
    ```
1. No curly braces in components' attributes are allowed.
    ```jsx
    render(<div title="hello{world}"/>)
    ```
1. No `>` sign inside components is permitted. Use `&gt` or take comparisons outside JSX tag.
    ```jsx
    // won't work
    render(<div title="hello > world">
      {(length > 10) && <span>Next Page</span>}
    </div>)

    // updated
    const hasNextPage = length > 10
    render(<div title="hello &gt; world">
      {hasNextPage && <span>Next Page</span>}
    </div>)
    ```