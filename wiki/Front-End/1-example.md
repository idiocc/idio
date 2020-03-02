## Example

By default, the `frontend` directory is used to serve files, but it can be changes and multiple folders can be specified in the config. Files can be served without the extension, and when requesting a directory, the middleware will redirect to the index file. Scripts can also import CSS styles, and the middleware will serve them via dynamic JS.

%EXAMPLE: ./example, ../../../compile => @idio/idio%

<fork lang="jsx">./example</fork>

Class names can be extracted from stylesheets also using `import` statements. Front End has very basic class detection name. This feature can be used together with _ÀLaMode_ when building package for publishing, and _Depack_ when creating deployable web bundles. The point of importing classes like that is that they can be renamed with _Closure Stylesheets_.

### Mounting

The paths used to serve front-end files will have to contain the path to the frontend dir passed during configuration. To mount them on a separate path, the `mount` config option can be used, however the served folder must be inside of the mount point as shown below.

%EXAMPLE: ./example/mount, ../../../compile => @idio/idio%

<fork lang="jsx">./example/mount</fork>

%~%