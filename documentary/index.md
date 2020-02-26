# @idio/idio

%NPM: @idio/idio%
![Node.js CI](https://github.com/idiocc/idio/workflows/Node.js%20CI/badge.svg)

<a href="https://github.com/idiocc/idio"><img src="https://raw.github.com/idiocc/core/master/images/logo.svg?sanitize=true" width="150" align="left"></a>

`@idio/idio` contains Koa's fork called Goa &mdash; web server compiled with _Closure Compiler_ so that its source code is optimised and contains only 1 external dependency (`mime-db`). Idio adds essential middleware to Goa for session, static files, CORS and compression and includes the router. As the project grows, more middleware will be added and optimised.

This is a production-ready server that puts all components together for the ease of use, while providing great developer experience using JSDoc annotations for auto-completions. _Idio_ is not a framework, but a library that enables **idiomatic** usage and compilation of the server and middleware.

<p align="center">
  <a href="https://www.idio.cc"><img alt="Developer-Friendly Suggestions For Middleware" src="app2.gif"></a>
</p>


```console
idio~:$ \
yarn add @idio/idio
npm install @idio/idio
```

%~%

## Example Apps

There are some example apps that you can look at.

1. [File Upload](https://github.com/art-deco/file-upload.artdeco.app): a front-end + back-end application for uploading photos. [Demo](https://file-upload.artdeco.app/) requires GitHub authorisation without any scope permissions to enable session middleware showcase.
1. [Akashic.Page](https://github.com/art-deco/akashic.page): a service for managing email and web-push subscriptions, with JS widgets and Mongo database connection.

%~%

## Table Of Contents

%TOC%

%~%

<include-typedefs>@goa/router</include-typedefs>
<include-typedefs>@goa/goa</include-typedefs>