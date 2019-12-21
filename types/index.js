export {}

/* typal types/idio.xml namespace */
/**
 * @typedef {import('@typedefs/goa').Application} _goa.Application
 * @typedef {import('@typedefs/goa').Context} _goa.Context
 * @typedef {_idio.Application} Application `＠interface` The application with some additions.
 * @typedef {_goa.Application & _idio.$Application} _idio.Application `＠interface` The application with some additions.
 * @typedef {Object} _idio.$Application `＠interface` The application with some additions.
 * @prop {!_idio.Context} context The context object for each request.
 * @prop {() => !Promise} destroy Terminate all active connections and close the server.
 * @typedef {_idio.Context} Context `＠interface` The extension to the standard Goa context with properties set by middleware.
 * @typedef {_goa.Context & _idio.$Context} _idio.Context `＠interface` The extension to the standard Goa context with properties set by middleware.
 * @typedef {Object} _idio.$Context `＠interface` The extension to the standard Goa context with properties set by middleware.
 * @prop {?_idio.Session} session The session object for updating, if `session` was installed. Default `null`.
 * @prop {?_idio.SessionConfig} sessionOptions The options used to create the session middleware. Default `null`.
 * @prop {?boolean} compress A flag added by `koa-compress` middleware. Default `null`.
 * @typedef {_idio.Middleware} Middleware The function to handle requests which can be installed with the `.use` method.
 * @typedef {(ctx: !_idio.Context, next?: !Function) => (!Promise|void)} _idio.Middleware The function to handle requests which can be installed with the `.use` method.
 */
