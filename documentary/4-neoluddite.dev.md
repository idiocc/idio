## NeoLuddite.Dev

This web server integrates with [NeoLuddite](https://neoluddite.dev): the package monetary reward scheme. It's currently in beta, and this section will be relevant when it's open to the public.

Every time you invoke certain functionality in a package somebody has written (e.g., `koa-static` for static files, `koa-session` for creation of session), via _Idio_, your usage will be counted and your balance in _Ludds_ on the neoluddite server will be transferred to the software engineer as a reward for his/her intellectual work. Contact license@neoluddite.dev for any requests.

<!-- To use the server online (not intranet), you must sign up for the API key to be able to compensate middleware owners their invested time. The key is then specified in the middleware config: -->

```js
const { url, app,
  middleware: { session, form },
  router,
} = await idio({
  // Developers' payment scheme neoluddite.dev
  neoluddite: {
    env: process.env.NODE_ENV,
    key: '0799b7f0-d2c7-4903-a541-10d8092c2911',
    app: 'idio.example',
  },
  // ...
}
```

The usage will be billed for apps running in production mode, therefore the `env` variable is needed. Setting the `app` has no effect but allows to break down statistics by web application on the portal. See the license section for more info.

<a href="https://neoluddite.dev"><img src="doc/ludds.png"></a>

<typedef name="NeoLudditeOptions">types/options/index.xml</typedef>

%~%