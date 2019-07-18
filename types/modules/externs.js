/**
 * @fileoverview The bundled modules' externs.
 * @externs
 */
/* typal types/modules/koa-compress.xml externs */
/** @const */
var _idio = {}
/**
 * @typedef {{ filter: ((function(string): boolean)|undefined), threshold: (number|undefined), flush: (number|undefined), finishFlush: (number|undefined), chunkSize: (number|undefined), windowBits: (number|undefined), level: (number|undefined), memLevel: (number|undefined), strategy: (number|undefined), dictionary: ((*)|undefined) }}
 */
_idio.KoaCompressConfig

/* typal types/modules/set-headers.xml externs */
/**
 * @typedef {function(http.ServerResponse, string, fs.Stats)}
 */
_idio.SetHeaders

/* typal types/modules/koa-send.xml externs */
/**
 * @typedef {{ maxage: (number|undefined), immutable: (boolean|undefined), hidden: (boolean|undefined), root: (string|undefined), index: (string|undefined), gzip: (boolean|undefined), brotli: (boolean|undefined), format: (boolean|undefined), setHeaders: (_idio.SetHeaders|undefined), extensions: (boolean|undefined) }}
 */
_idio.KoaSendConfig

/* typal types/modules/koa-static.xml externs */
/**
 * @typedef {{ maxage: (number|undefined), hidden: (boolean|undefined), index: (string|undefined), defer: (boolean|undefined), gzip: (boolean|undefined), br: (boolean|undefined), setHeaders: (_idio.SetHeaders|undefined), extensions: (boolean|undefined) }}
 */
_idio.KoaStaticConfig
