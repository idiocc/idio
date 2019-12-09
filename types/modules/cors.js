export {}

/* typal node_modules/@goa/cors/types/index.xml namespace */
/**
 * @typedef {import('@typedefs/goa').Context} _goa.Context
 * @typedef {_goa.CorsConfig} CorsConfig `＠record` Options for the program.
 * @typedef {Object} _goa.CorsConfig `＠record` Options for the program.
 * @prop {string|function(!_goa.Context)} [origin] `Access-Control-Allow-Origin` header, default is taken from the `Origin` request header.
 * @prop {string|!Array<string>} [allowMethods="GET,HEAD,PUT,POST,DELETE,PATCH"] `Access-Control-Allow-Methods` header. Default `GET,HEAD,PUT,POST,DELETE,PATCH`.
 * @prop {string|!Array<string>} [exposeHeaders] `Access-Control-Expose-Headers` header.
 * @prop {string|!Array<string>} [allowHeaders] `Access-Control-Allow-Headers` header.
 * @prop {string|number} [maxAge] `Access-Control-Max-Age` header in seconds.
 * @prop {boolean} [credentials=false] `Access-Control-Max-Age` header in seconds. Default `false`.
 * @prop {boolean} [keepHeadersOnError=true] Add set headers to `err.header` if an error is thrown. Default `true`.
 */

/**
 * @typedef {import('../..').Context} _goa.Context
 */