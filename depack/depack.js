             
let DEPACK_EXPORT;
const path = require('path');
const assert = require('assert');
const tty = require('tty');
const util = require('util');
const fs = require('fs');
const os = require('os');
const http = require('http');
const stream = require('stream');
const events = require('events');
const _crypto = require('crypto');
const url = require('url');
const net = require('net');
const querystring = require('querystring');             
/*
 MIT
 (c) dead-horse
 https://npmjs.org/koa-compose
*/
function n(a) {
  if (!Array.isArray(a)) {
    throw new TypeError("Middleware stack must be an array!");
  }
  for (const b of a) {
    if ("function" != typeof b) {
      throw new TypeError("Middleware must be composed of functions!");
    }
  }
  return function(b, c) {
    function d(f) {
      if (f <= e) {
        return Promise.reject(Error("next() called multiple times"));
      }
      e = f;
      let g = a[f];
      f === a.length && (g = c);
      if (!g) {
        return Promise.resolve();
      }
      try {
        return Promise.resolve(g(b, d.bind(null, f + 1)));
      } catch (h) {
        return Promise.reject(h);
      }
    }
    let e = -1;
    return d(0);
  };
}
;var aa = tty;
const {format:r, inspect:t} = util;
/*

 Copyright (c) 2016 Zeit, Inc.
 https://npmjs.org/ms
*/
function ba(a) {
  var b = {}, c = typeof a;
  if ("string" == c && 0 < a.length) {
    return ca(a);
  }
  if ("number" == c && isFinite(a)) {
    return b.B ? (b = Math.abs(a), a = 864E5 <= b ? v(a, b, 864E5, "day") : 36E5 <= b ? v(a, b, 36E5, "hour") : 6E4 <= b ? v(a, b, 6E4, "minute") : 1000 <= b ? v(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}
function ca(a) {
  a = String(a);
  if (!(100 < a.length) && (a = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(a))) {
    var b = parseFloat(a[1]);
    switch((a[2] || "ms").toLowerCase()) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return 315576E5 * b;
      case "weeks":
      case "week":
      case "w":
        return 6048E5 * b;
      case "days":
      case "day":
      case "d":
        return 864E5 * b;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return 36E5 * b;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return 6E4 * b;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return 1000 * b;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return b;
    }
  }
}
function v(a, b, c, d) {
  return Math.round(a / c) + " " + d + (b >= 1.5 * c ? "s" : "");
}
;const w = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, e) => e.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), x = {init:function(a) {
  a.inspectOpts = Object.assign({}, w);
}, log:function(...a) {
  return process.stderr.write(r(...a) + "\n");
}, formatArgs:function(a) {
  const {namespace:b, useColors:c, color:d, diff:e} = this;
  if (c) {
    const f = "\u001b[3" + (8 > d ? d : "8;5;" + d), g = `  ${f};1m${b} \u001B[0m`;
    a[0] = g + a[0].split("\n").join("\n" + g);
    a.push(f + "m+" + ba(e) + "\u001b[0m");
  } else {
    a[0] = (w.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
  }
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in w ? !!w.colors : aa.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:w, formatters:{o:function(a) {
  const b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return t(a, b).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  const b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return t(a, b);
}}};
function da(a) {
  function b(...g) {
    if (b.enabled) {
      var h = Number(new Date);
      b.diff = h - (f || h);
      b.prev = f;
      f = b.curr = h;
      g[0] = ea(g[0]);
      "string" != typeof g[0] && g.unshift("%O");
      var k = 0;
      g[0] = g[0].replace(/%([a-zA-Z%])/g, (l, m) => {
        if ("%%" == l) {
          return l;
        }
        k++;
        if (m = c[m]) {
          l = m.call(b, g[k]), g.splice(k, 1), k--;
        }
        return l;
      });
      d.call(b, g);
      (b.log || e).apply(b, g);
    }
  }
  const c = a.formatters, d = a.formatArgs, e = a.log;
  let f;
  return b;
}
function fa(a) {
  const b = da(a);
  "function" == typeof a.init && a.init(b);
  a.a.push(b);
  return b;
}
function ha(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function ia(a) {
  var b = x.load();
  a.save(b);
  a.g = [];
  a.h = [];
  let c;
  const d = ("string" == typeof b ? b : "").split(/[\s,]+/), e = d.length;
  for (c = 0; c < e; c++) {
    d[c] && (b = d[c].replace(/\*/g, ".*?"), "-" == b[0] ? a.h.push(new RegExp("^" + b.substr(1) + "$")) : a.g.push(new RegExp("^" + b + "$")));
  }
  for (c = 0; c < a.a.length; c++) {
    b = a.a[c], b.enabled = a.enabled(b.namespace);
  }
}
class ja {
  constructor(a) {
    this.colors = a.colors;
    this.formatArgs = a.formatArgs;
    this.inspectOpts = a.inspectOpts;
    this.log = a.log;
    this.save = a.save;
    this.init = a.init;
    this.formatters = a.formatters || {};
    this.a = [];
    this.g = [];
    this.h = [];
  }
  destroy(a) {
    a = this.a.indexOf(a);
    return -1 !== a ? (this.a.splice(a, 1), !0) : !1;
  }
  enabled(a) {
    if ("*" == a[a.length - 1]) {
      return !0;
    }
    let b, c;
    b = 0;
    for (c = this.h.length; b < c; b++) {
      if (this.h[b].test(a)) {
        return !1;
      }
    }
    b = 0;
    for (c = this.g.length; b < c; b++) {
      if (this.g[b].test(a)) {
        return !0;
      }
    }
    return !1;
  }
}
function y() {
  const a = new ja(x);
  return function(b) {
    const c = fa(a);
    c.namespace = b;
    c.useColors = x.useColors();
    c.enabled = a.enabled(b);
    c.color = ha(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, e) {
      d = this.namespace + (void 0 === e ? ":" : e) + d;
      d.log = this.log;
      return d;
    };
    ia(a);
    return c;
  };
}
function ea(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;const {basename:A, extname:B, isAbsolute:ka, join:la, normalize:C, parse:ma, resolve:D, sep:na} = path;
var E = assert;
const {equal:oa} = assert;
var pa = {[100]:"Continue", [101]:"Switching Protocols", [102]:"Processing", [103]:"Early Hints", [200]:"OK", [201]:"Created", [202]:"Accepted", [203]:"Non-Authoritative Information", [204]:"No Content", [205]:"Reset Content", [206]:"Partial Content", [207]:"Multi-Status", [208]:"Already Reported", [226]:"IM Used", [300]:"Multiple Choices", [301]:"Moved Permanently", [302]:"Found", [303]:"See Other", [304]:"Not Modified", [305]:"Use Proxy", [306]:"(Unused)", [307]:"Temporary Redirect", [308]:"Permanent Redirect", 
[400]:"Bad Request", [401]:"Unauthorized", [402]:"Payment Required", [403]:"Forbidden", [404]:"Not Found", [405]:"Method Not Allowed", [406]:"Not Acceptable", [407]:"Proxy Authentication Required", [408]:"Request Timeout", [409]:"Conflict", [410]:"Gone", [411]:"Length Required", [412]:"Precondition Failed", [413]:"Payload Too Large", [414]:"URI Too Long", [415]:"Unsupported Media Type", [416]:"Range Not Satisfiable", [417]:"Expectation Failed", [418]:"I'm a teapot", [421]:"Misdirected Request", [422]:"Unprocessable Entity", 
[423]:"Locked", [424]:"Failed Dependency", [425]:"Unordered Collection", [426]:"Upgrade Required", [428]:"Precondition Required", [429]:"Too Many Requests", [431]:"Request Header Fields Too Large", [451]:"Unavailable For Legal Reasons", [500]:"Internal Server Error", [501]:"Not Implemented", [502]:"Bad Gateway", [503]:"Service Unavailable", [504]:"Gateway Timeout", [505]:"HTTP Version Not Supported", [506]:"Variant Also Negotiates", [507]:"Insufficient Storage", [508]:"Loop Detected", [509]:"Bandwidth Limit Exceeded", 
[510]:"Not Extended", [511]:"Network Authentication Required"};
/*
 statuses
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2016 Douglas Christopher Wilson
 MIT Licensed
*/
const ra = qa(), sa = {[300]:!0, [301]:!0, [302]:!0, [303]:!0, [305]:!0, [307]:!0, [308]:!0}, F = {[204]:!0, [205]:!0, [304]:!0};
function qa() {
  var a = G;
  const b = [];
  Object.keys(pa).forEach(c => {
    const d = pa[c];
    c = Number(c);
    a[c] = d;
    a[d] = c;
    a[d.toLowerCase()] = c;
    b.push(c);
  });
  return b;
}
function G(a) {
  if ("number" == typeof a) {
    if (!G[a]) {
      throw Error("invalid status code: " + a);
    }
    return a;
  }
  if ("string" != typeof a) {
    throw new TypeError("code must be a number or string");
  }
  var b = parseInt(a, 10);
  if (!isNaN(b)) {
    if (!G[b]) {
      throw Error("invalid status code: " + b);
    }
    return b;
  }
  b = G[a.toLowerCase()];
  if (!b) {
    throw Error('invalid status message: "' + a + '"');
  }
  return b;
}
;/*
 http-errors
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2016 Douglas Christopher Wilson
 MIT Licensed
 toidentifier
 Copyright(c) 2016 Douglas Christopher Wilson
 MIT Licensed
*/
function H(...a) {
  let b = 500, c = {};
  for (var d = 0; d < a.length; d++) {
    var e = a[d];
    if (e instanceof Error) {
      var f = e;
      b = f.status || f.statusCode || b;
    } else {
      switch(typeof e) {
        case "string":
          var g = e;
          break;
        case "number":
          b = e;
          0 !== d && process.emitWarning("non-first-argument status code; replace with createError(" + e + ", ...)", "DeprecationWarning");
          break;
        case "object":
          c = e;
      }
    }
  }
  "number" == typeof b && (400 > b || 600 <= b) && process.emitWarning("non-error status code; use only 4xx or 5xx status codes", "DeprecationWarning");
  if ("number" != typeof b || !G[b] && (400 > b || 600 <= b)) {
    b = 500;
  }
  a = H[b] || H[Number(String(b).charAt(0) + "00")];
  f || (f = a ? new a(g) : Error(g || G[b]), Error.captureStackTrace(f, H));
  a && f instanceof a && f.status === b || (f.expose = 500 > b, f.status = f.statusCode = b);
  for (let h in c) {
    "status" != h && "statusCode" != h && (f[h] = c[h]);
  }
  return f;
}
class ta extends Error {
  constructor(a) {
    super();
    this.message = a;
    this.statusCode = this.status = null;
  }
  set code(a) {
    this.statusCode = this.status = a;
    this.message || (this.message = G[a]);
  }
}
ra.forEach(a => {
  let b;
  const c = ua(G[a]), d = c.match(/Error$/) ? c : c + "Error";
  switch(Number(String(a).charAt(0) + "00")) {
    case 400:
      b = class extends ta {
        constructor(e) {
          super(e);
          this.code = a;
          this.name = d;
          this.expose = !0;
        }
      };
      break;
    case 500:
      b = class extends ta {
        constructor(e) {
          super(e);
          this.code = a;
          this.name = d;
          this.expose = !1;
        }
      };
  }
  b && (H[a] = b, H[c] = b);
}, {});
function ua(a) {
  return a.split(" ").map(function(b) {
    return b.charAt(0).toUpperCase() + b.slice(1);
  }).join("").replace(/[^ _0-9a-z]/gi, "");
}
;const {ReadStream:va, createReadStream:wa, exists:xa, stat:ya} = fs;
const za = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, Aa = (a, b = !1) => za(a, 2 + (b ? 1 : 0)), Ba = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:Ca} = os;
const Da = /\s+at.*(?:\(|\s)(.*)\)?/, Ea = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Fa = Ca(), Ga = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(Ea.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(Da);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(Da, (g, h) => g.replace(h, h.replace(Fa, "~"))) : f).join("\n");
};
function Ha(a, b, c = !1) {
  return function(d) {
    var e = Ba(arguments), {stack:f} = Error();
    const g = za(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = Ga(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function Ia(a) {
  var {stack:b} = Error();
  const c = Ba(arguments);
  b = Aa(b, a);
  return Ha(c, b, a);
}
;function Ja(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function Ka(a, b, c) {
  const d = Ia(!0);
  if ("function" !== typeof a) {
    throw Error("Function must be passed.");
  }
  const {length:e} = a;
  if (!e) {
    throw Error("Function does not accept any arguments.");
  }
  return await new Promise((f, g) => {
    const h = (l, m) => l ? (l = d(l), g(l)) : f(c || m);
    let k = [h];
    Array.isArray(b) ? (b.forEach((l, m) => {
      Ja(e, m);
    }), k = [...b, h]) : 1 < Array.from(arguments).length && (Ja(e, 0), k = [b, h]);
    a(...k);
  });
}
;/*
 resolve-path
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2015-2018 Douglas Christopher Wilson
 MIT Licensed
*/
const La = /(?:^|[\\/])\.\.(?:[\\/]|$)/;
function Ma(a, b) {
  var c = b, d = a;
  1 === arguments.length && (c = a, d = process.cwd());
  if (null == d) {
    throw new TypeError("argument rootPath is required");
  }
  if ("string" !== typeof d) {
    throw new TypeError("argument rootPath must be a string");
  }
  if (null == c) {
    throw new TypeError("argument relativePath is required");
  }
  if ("string" !== typeof c) {
    throw new TypeError("argument relativePath must be a string");
  }
  if (-1 !== c.indexOf("\x00")) {
    throw H(400, "Malicious Path");
  }
  if (ka(c)) {
    throw H(400, "Malicious Path");
  }
  if (La.test(C("." + na + c))) {
    throw H(403);
  }
  return C(la(D(d), c));
}
;const I = async(...a) => await Ka(xa, ...a), Na = async(...a) => await Ka(ya, ...a), Oa = y()("koa-send");
async function Pa(a, b, c = {}) {
  E(a, "koa context required");
  E(b, "pathname required");
  Oa('send "%s" %j', b, c);
  var d = c.root ? C(D(c.root)) : "", e = "/" == b[b.length - 1];
  b = b.substr(ma(b).root.length);
  var f = c.index;
  const g = c.maxage || c.maxAge || 0;
  var h = c.immutable || !1;
  const k = c.hidden || !1, l = !1 !== c.format;
  var m = Array.isArray(c.extensions) ? c.extensions : !1, q = !1 !== c.brotli, p = !1 !== c.gzip;
  if ((c = c.setHeaders) && "function" !== typeof c) {
    throw new TypeError("option setHeaders must be function");
  }
  try {
    b = decodeURIComponent(b);
  } catch (z) {
    b = -1;
  }
  if (-1 == b) {
    return a.throw(400, "failed to decode");
  }
  f && e && (b += f);
  b = Ma(d, b);
  if (!(e = k)) {
    a: {
      d = b.substr(d.length).split(na);
      for (e = 0; e < d.length; e++) {
        if ("." == d[e][0]) {
          d = !0;
          break a;
        }
      }
      d = !1;
    }
    e = !d;
  }
  if (e) {
    d = "";
    "br" == a.acceptsEncodings("br", "identity") && q && await I(b + ".br") ? (b += ".br", a.set("Content-Encoding", "br"), a.res.removeHeader("Content-Length"), d = ".br") : "gzip" == a.acceptsEncodings("gzip", "identity") && p && await I(b + ".gz") && (b += ".gz", a.set("Content-Encoding", "gzip"), a.res.removeHeader("Content-Length"), d = ".gz");
    if (m && !/\.[^/]*$/.exec(b)) {
      for (m = [].concat(m), q = 0; q < m.length; q++) {
        p = m[q];
        if ("string" !== typeof p) {
          throw new TypeError("option extensions must be array of strings or false");
        }
        /^\./.exec(p) || (p = "." + p);
        if (await I(b + p)) {
          b += p;
          break;
        }
      }
    }
    try {
      var u = await Na(b);
      if (u.isDirectory()) {
        if (l && f) {
          b += "/" + f, u = await Na(b);
        } else {
          return;
        }
      }
    } catch (z) {
      if (["ENOENT", "ENAMETOOLONG", "ENOTDIR"].includes(z.code)) {
        throw H(404, z);
      }
      z.status = 500;
      throw z;
    }
    c && c(a.res, b, u);
    a.set("Content-Length", u.size);
    a.response.get("Last-Modified") || a.set("Last-Modified", u.mtime.toUTCString());
    a.response.get("Cache-Control") || (f = ["max-age=" + (g / 1000 | 0)], h && f.push("immutable"), a.set("Cache-Control", f.join(",")));
    a.type || (h = b, h = "" !== d ? B(A(h, d)) : B(h), a.type = h);
    a.body = wa(b);
    return b;
  }
}
;const Qa = y()("koa-static");
var Ra = (a, b = {}) => {
  E(a, "root directory is required to serve files");
  Qa('static "%s" %j', a, b);
  b.root = D(a);
  !1 !== b.index && (b.index = b.index || "index.html");
  return b.defer ? async function(c, d) {
    await d();
    if (("HEAD" == c.method || "GET" == c.method) && null == c.body && 404 == c.status) {
      try {
        await Pa(c, c.path, b);
      } catch (e) {
        if (404 != e.status) {
          throw e;
        }
      }
    }
  } : async function(c, d) {
    let e = !1;
    if ("HEAD" === c.method || "GET" === c.method) {
      try {
        e = await Pa(c, c.path, b);
      } catch (f) {
        if (404 != f.status) {
          throw f;
        }
      }
    }
    e || await d();
  };
};
const J = y()("koa-mount");
function Sa(a, b) {
  function c(g) {
    const h = a;
    if (0 != g.indexOf(h)) {
      return !1;
    }
    g = g.replace(h, "") || "/";
    return e ? g : "/" != g[0] ? !1 : g;
  }
  "string" != typeof a && (b = a, a = "/");
  oa(a[0], "/", 'mount path must begin with "/"');
  const d = b.middleware ? n(b.middleware) : b;
  if ("/" == a) {
    return d;
  }
  const e = "/" == a.slice(-1), f = b.name || "unnamed";
  J("mount %s %s", a, f);
  return async function(g, h) {
    const k = g.path, l = c(k);
    J("mount %s %s -> %s", a, f, l);
    if (!l) {
      return await h();
    }
    g.mountPath = a;
    g.path = l;
    J("enter %s -> %s", k, g.path);
    await d(g, async() => {
      g.path = k;
      await h();
      g.path = l;
    });
    J("leave %s -> %s", k, g.path);
    g.path = k;
  };
}
;const Ta = {["static"](a, b, c) {
  var {root:d = [], maxage:e, mount:f} = c;
  a = (Array.isArray(d) ? d : [d]).map(g => Ra(g, Object.assign({}, {maxage:e}, b)));
  a = n(a);
  return f ? Sa(f, a) : a;
}};
async function Ua(a, b, c) {
  if ("function" == typeof b) {
    return c.use(b), b;
  }
  if (a in Ta) {
    var d = Ta[a];
  } else {
    if (b.u) {
      if ("function" != typeof b.u) {
        throw Error(`Expecting a function in the "middlewareConstructor" of the ${a} middleware.`);
      }
      d = b.u;
    } else {
      throw Error('Either the "middleware" or "middlewareConstructor" properties must be passed.');
    }
  }
  var e = Object.assign({}, b);
  a = b.use;
  b = void 0 === b.config ? {} : b.config;
  e = (delete e.use, delete e.config, e);
  d = await d(c, b, e);
  a && c.use(d);
  return d;
}
async function Va(a, b) {
  return await Object.keys(a).reduce(async(c, d) => {
    c = await c;
    var e = a[d];
    Array.isArray(e) ? (e = e.map(async f => {
      await Ua(d, f, b);
    }), e = await Promise.all(e)) : e = await Ua(d, e, b);
    return Object.assign({}, c, {[d]:e});
  }, {});
}
;function Wa(a) {
  var b = {}, c = typeof a;
  if ("string" == c && 0 < a.length) {
    return Xa(a);
  }
  if ("number" == c && isFinite(a)) {
    return b.B ? (b = Math.abs(a), a = 864E5 <= b ? K(a, b, 864E5, "day") : 36E5 <= b ? K(a, b, 36E5, "hour") : 6E4 <= b ? K(a, b, 6E4, "minute") : 1000 <= b ? K(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}
function Xa(a) {
  a = String(a);
  if (!(100 < a.length) && (a = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(a))) {
    var b = parseFloat(a[1]);
    switch((a[2] || "ms").toLowerCase()) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return 315576E5 * b;
      case "weeks":
      case "week":
      case "w":
        return 6048E5 * b;
      case "days":
      case "day":
      case "d":
        return 864E5 * b;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return 36E5 * b;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return 6E4 * b;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return 1000 * b;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return b;
    }
  }
}
function K(a, b, c, d) {
  return Math.round(a / c) + " " + d + (b >= 1.5 * c ? "s" : "");
}
;const L = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, e) => e.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), M = {init:function(a) {
  a.inspectOpts = Object.assign({}, L);
}, log:function(...a) {
  return process.stderr.write(r(...a) + "\n");
}, formatArgs:function(a) {
  const {namespace:b, useColors:c, color:d, diff:e} = this;
  if (c) {
    const f = "\u001b[3" + (8 > d ? d : "8;5;" + d), g = `  ${f};1m${b} \u001B[0m`;
    a[0] = g + a[0].split("\n").join("\n" + g);
    a.push(f + "m+" + Wa(e) + "\u001b[0m");
  } else {
    a[0] = (L.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
  }
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in L ? !!L.colors : aa.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:L, formatters:{o:function(a) {
  const b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return t(a, b).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  const b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return t(a, b);
}}};
function Ya(a) {
  function b(...g) {
    if (b.enabled) {
      var h = Number(new Date);
      b.diff = h - (f || h);
      b.prev = f;
      f = b.curr = h;
      g[0] = Za(g[0]);
      "string" != typeof g[0] && g.unshift("%O");
      var k = 0;
      g[0] = g[0].replace(/%([a-zA-Z%])/g, (l, m) => {
        if ("%%" == l) {
          return l;
        }
        k++;
        if (m = c[m]) {
          l = m.call(b, g[k]), g.splice(k, 1), k--;
        }
        return l;
      });
      d.call(b, g);
      (b.log || e).apply(b, g);
    }
  }
  const c = a.formatters, d = a.formatArgs, e = a.log;
  let f;
  return b;
}
function $a(a) {
  const b = Ya(a);
  "function" == typeof a.init && a.init(b);
  a.a.push(b);
  return b;
}
function ab(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function bb(a) {
  var b = M.load();
  a.save(b);
  a.g = [];
  a.h = [];
  let c;
  const d = ("string" == typeof b ? b : "").split(/[\s,]+/), e = d.length;
  for (c = 0; c < e; c++) {
    d[c] && (b = d[c].replace(/\*/g, ".*?"), "-" == b[0] ? a.h.push(new RegExp("^" + b.substr(1) + "$")) : a.g.push(new RegExp("^" + b + "$")));
  }
  for (c = 0; c < a.a.length; c++) {
    b = a.a[c], b.enabled = a.enabled(b.namespace);
  }
}
class cb {
  constructor(a) {
    this.colors = a.colors;
    this.formatArgs = a.formatArgs;
    this.inspectOpts = a.inspectOpts;
    this.log = a.log;
    this.save = a.save;
    this.init = a.init;
    this.formatters = a.formatters || {};
    this.a = [];
    this.g = [];
    this.h = [];
  }
  destroy(a) {
    a = this.a.indexOf(a);
    return -1 !== a ? (this.a.splice(a, 1), !0) : !1;
  }
  enabled(a) {
    if ("*" == a[a.length - 1]) {
      return !0;
    }
    let b, c;
    b = 0;
    for (c = this.h.length; b < c; b++) {
      if (this.h[b].test(a)) {
        return !1;
      }
    }
    b = 0;
    for (c = this.g.length; b < c; b++) {
      if (this.g[b].test(a)) {
        return !0;
      }
    }
    return !1;
  }
}
function Za(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;const db = Object.prototype.toString, eb = Function.prototype.toString, fb = /^\s*(?:function)?\*/, gb = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, hb = Object.getPrototypeOf;
var N;
a: {
  if (gb) {
    try {
      N = Function("return function*() {}")();
      break a;
    } catch (a) {
    }
    N = void 0;
  } else {
    N = !1;
  }
}
const ib = N, jb = ib ? hb(ib) : {};
const {OutgoingMessage:kb, createServer:lb} = http;
var O = stream;
var mb = events;
/*
 ee-first
 Copyright(c) 2014 Jonathan Ong
 MIT Licensed
*/
function nb(a, b) {
  function c() {
    d();
    b.apply(null, arguments);
  }
  function d() {
    for (var p, u = 0; u < f.length; u++) {
      p = f[u], p.v.removeListener(p.event, p.A);
    }
  }
  function e(p) {
    b = p;
  }
  if (!Array.isArray(a)) {
    throw new TypeError("arg must be an array of [ee, events...] arrays");
  }
  for (var f = [], g = 0; g < a.length; g++) {
    var h = a[g];
    if (!Array.isArray(h) || 2 > h.length) {
      throw new TypeError("each array member must be [ee, events...]");
    }
    for (var k = h[0], l = 1; l < h.length; l++) {
      var m = h[l], q = ob(m, c);
      k.on(m, q);
      f.push({v:k, event:m, A:q});
    }
  }
  e.cancel = d;
  return e;
}
function ob(a, b) {
  return function(c) {
    for (var d = Array(arguments.length), e = "error" == a ? c : null, f = 0; f < d.length; f++) {
      d[f] = arguments[f];
    }
    b(e, this, a, d);
  };
}
;/*
 on-finished
 Copyright(c) 2013 Jonathan Ong
 Copyright(c) 2014 Douglas Christopher Wilson
 MIT Licensed
*/
function pb(a, b) {
  var c = a.socket;
  c = "boolean" == typeof a.finished ? !!(a.finished || c && !c.writable) : "boolean" == typeof a.complete ? !(!a.upgrade && c && c.readable && (!a.complete || a.readable)) : void 0;
  !1 !== c ? setImmediate(b, null, a) : (c = a.__onFinished, c && c.l || (c = a.__onFinished = qb(a), rb(a, c)), c.l.push(b));
}
function rb(a, b) {
  function c(h) {
    g.cancel();
    e.cancel();
    f = !0;
    b(h);
  }
  function d(h) {
    a.removeListener("socket", d);
    f || g === e && (e = nb([[h, "error", "close"]], c));
  }
  var e, f = !1;
  var g = e = nb([[a, "end", "finish"]], c);
  if (a.socket) {
    d(a.socket);
  } else {
    a.on("socket", d);
  }
}
function qb(a) {
  function b(c) {
    a.__onFinished === b && (a.__onFinished = null);
    if (b.l) {
      var d = b.l;
      b.l = null;
      for (var e = 0; e < d.length; e++) {
        d[e](c, a);
      }
    }
  }
  b.l = [];
  return b;
}
;/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 https://npmjs.org/destroy
*/
function sb(a) {
  if (a instanceof va) {
    a.destroy();
    if ("function" == typeof a.close) {
      a.on("open", tb);
    }
    return a;
  }
  if (!(a instanceof O)) {
    return a;
  }
  "function" == typeof a.destroy && a.destroy();
  return a;
}
function tb() {
  "number" == typeof this.fd && this.close();
}
;/*
 vary
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
const ub = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function vb(a) {
  for (var b = 0, c = [], d = 0, e = 0, f = a.length; e < f; e++) {
    switch(a.charCodeAt(e)) {
      case 32:
        d == b && (d = b = e + 1);
        break;
      case 44:
        c.push(a.substring(d, b));
        d = b = e + 1;
        break;
      default:
        b = e + 1;
    }
  }
  c.push(a.substring(d, b));
  return c;
}
;/*
 MIT
 Copyright (c) 2014 Jonathan Ong <me@jongleberry.com>
 Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com>
 https://npmjs.com/package/mime-types
*/
const P = require("mime-db"), wb = /^\s*([^;\s]*)(?:;|\s|$)/, xb = /^text\//i, yb = Object.create(null), Q = Object.create(null);
zb();
function R(a) {
  return a && "string" == typeof a ? (a = B("x." + a).toLowerCase().substr(1)) ? Q[a] || !1 : !1 : !1;
}
function zb() {
  const a = ["nginx", "apache", void 0, "iana"];
  Object.keys(P).forEach(b => {
    const c = P[b], d = c.extensions;
    if (d && d.length) {
      yb[b] = d;
      for (let e = 0; e < d.length; e++) {
        const f = d[e];
        if (Q[f]) {
          const g = a.indexOf(P[Q[f]].source), h = a.indexOf(c.source);
          if ("application/octet-stream" != Q[f] && (g > h || g == h && "application/" == Q[f].substr(0, 12))) {
            continue;
          }
        }
        Q[f] = b;
      }
    }
  });
}
;/*
 content-type
 Copyright(c) 2015 Douglas Christopher Wilson
 MIT Licensed
*/
const Ab = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g, Bb = /\\([\u000b\u0020-\u00ff])/g, Cb = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
function Db(a) {
  if (!a) {
    throw new TypeError("argument string is required");
  }
  if ("object" == typeof a) {
    if ("function" == typeof a.getHeader) {
      var b = a.getHeader("content-type");
    } else {
      "object" == typeof a.headers && (b = (a = a.headers) && a["content-type"]);
    }
    if ("string" != typeof b) {
      throw new TypeError("content-type header is missing from object");
    }
    a = b;
  }
  if ("string" != typeof a) {
    throw new TypeError("argument string is required to be a string");
  }
  b = a.indexOf(";");
  var c = -1 != b ? a.substr(0, b).trim() : a.trim();
  if (!Cb.test(c)) {
    throw new TypeError("invalid media type");
  }
  c = new Eb(c.toLowerCase());
  if (-1 != b) {
    let e;
    var d;
    for (Ab.lastIndex = b; d = Ab.exec(a);) {
      if (d.index !== b) {
        throw new TypeError("invalid parameter format");
      }
      b += d[0].length;
      e = d[1].toLowerCase();
      d = d[2];
      '"' == d[0] && (d = d.substr(1, d.length - 2).replace(Bb, "$1"));
      c.parameters[e] = d;
    }
    if (b != a.length) {
      throw new TypeError("invalid parameter format");
    }
  }
  return c;
}
class Eb {
  constructor(a) {
    this.parameters = Object.create(null);
    this.type = a;
  }
}
;/*
 media-typer
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
const Fb = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;
/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2015 Douglas Christopher Wilson
 https://npmjs.org/type-is
*/
function Gb(a, b) {
  var c = [];
  if ("string" != typeof a) {
    var d = null;
  } else {
    try {
      var e = Db(a).type;
      if (!e) {
        throw new TypeError("argument string is required");
      }
      if ("string" != typeof e) {
        throw new TypeError("argument string is required to be a string");
      }
      d = Fb.test(e.toLowerCase()) ? e : null;
    } catch (g) {
      d = null;
    }
  }
  a = d;
  if (!a) {
    return !1;
  }
  b && !Array.isArray(b) && (b = [b, ...c]);
  if (!b || !b.length) {
    return a;
  }
  for (c = 0; c < b.length; c++) {
    var f = Hb(d = b[c]);
    !1 === f ? e = !1 : (e = a.split("/"), f = f.split("/"), e = 2 != e.length || 2 != f.length || "*" != f[0] && f[0] != e[0] ? !1 : "*+" == f[1].substr(0, 2) ? f[1].length <= e[1].length + 1 && f[1].substr(1) == e[1].substr(1 - f[1].length) : "*" != f[1] && f[1] != e[1] ? !1 : !0);
    if (e) {
      return "+" == d[0] || -1 !== d.indexOf("*") ? a : d;
    }
  }
  return !1;
}
function Ib(a, b, ...c) {
  var d = a.headers;
  d = void 0 !== d["transfer-encoding"] || !isNaN(d["content-length"]);
  if (!d) {
    return null;
  }
  2 < arguments.length && (b = [b, ...c]);
  return Gb(a.headers["content-type"], b);
}
function Hb(a) {
  if ("string" != typeof a) {
    return !1;
  }
  switch(a) {
    case "urlencoded":
      return "application/x-www-form-urlencoded";
    case "multipart":
      return "multipart/*";
  }
  return "+" == a[0] ? "*/*" + a : -1 == a.indexOf("/") ? R(a) : a;
}
;/*
 content-disposition
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
var Jb = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g, Kb = /%[0-9A-Fa-f]{2}/, Lb = /[^\x20-\x7e\xa0-\xff]/g, Mb = /([\\"])/g, Nb = /^[\x20-\x7e\x80-\xff]+$/, Ob = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/;
function Pb(a, b) {
  var c = b || {};
  b = c.type || "attachment";
  var d = c.fallback;
  if (void 0 !== a) {
    c = {};
    if ("string" !== typeof a) {
      throw new TypeError("filename must be a string");
    }
    void 0 === d && (d = !0);
    if ("string" !== typeof d && "boolean" !== typeof d) {
      throw new TypeError("fallback must be a string or boolean");
    }
    if ("string" === typeof d && Lb.test(d)) {
      throw new TypeError("fallback must be ISO-8859-1 string");
    }
    a = A(a);
    var e = Nb.test(a);
    d = "string" !== typeof d ? d && String(a).replace(Lb, "?") : A(d);
    var f = "string" === typeof d && d !== a;
    if (f || !e || Kb.test(a)) {
      c["filename*"] = a;
    }
    if (e || f) {
      c.filename = f ? d : a;
    }
  } else {
    c = void 0;
  }
  c = new Qb(b, c);
  b = c.parameters;
  c = c.type;
  if (!c || "string" !== typeof c || !Ob.test(c)) {
    throw new TypeError("invalid type");
  }
  c = String(c).toLowerCase();
  if (b && "object" === typeof b) {
    for (e = Object.keys(b).sort(), d = 0; d < e.length; d++) {
      a = e[d], f = "*" === a.substr(-1) ? "UTF-8''" + encodeURIComponent(String(b[a])).replace(Jb, Rb) : '"' + String(b[a]).replace(Mb, "\\$1") + '"', c += "; " + a + "=" + f;
    }
  }
  return c;
}
function Rb(a) {
  return "%" + String(a).charCodeAt(0).toString(16).toUpperCase();
}
function Qb(a, b) {
  this.type = a;
  this.parameters = b;
}
;/*
 MIT
 Author dead_horse <dead_horse@qq.com>
 https://github.com/node-modules/error-inject
*/
function Sb(a, b) {
  if (a instanceof O && !a.listeners("error").includes(b)) {
    a.on("error", b);
  }
}
;/*
 MIT
 [cache-content-type] Author dead_horse <dead_horse@qq.com>
 https://github.com/node-modules/cache-content-type
 [ylru] Author fengmk2
 https://github.com/node-modules/ylru
*/
function Tb(a, b, c) {
  a.cache.set(b, c);
  a.size++;
  a.size >= a.max && (a.size = 0, a.a = a.cache, a.cache = new Map);
}
class Ub {
  constructor(a) {
    this.max = a;
    this.size = 0;
    this.cache = new Map;
    this.a = new Map;
  }
  get(a, b = {}) {
    function c() {
      return e = e || Date.now();
    }
    let d = this.cache.get(a);
    ({maxAge:b} = b);
    let e;
    if (d) {
      return d.i && c() > d.i ? (d.i = 0, d.value = void 0) : void 0 !== b && (a = b ? c() + b : 0, d.i = a), d.value;
    }
    if (d = this.a.get(a)) {
      return d.i && c() > d.i ? (d.i = 0, d.value = void 0) : (Tb(this, a, d), void 0 !== b && (a = b ? c() + b : 0, d.i = a)), d.value;
    }
  }
  set(a, b, c = {}) {
    ({maxAge:c} = c);
    c = c ? Date.now() + c : 0;
    let d = this.cache.get(a);
    d ? (d.i = c, d.value = b) : (d = {value:b, i:c}, Tb(this, a, d));
  }
  keys() {
    function a(d) {
      const e = d[0], f = d[1];
      (d[1].value && !d[1].i || f.i >= c) && b.add(e);
    }
    const b = new Set, c = Date.now();
    for (const d of this.cache.entries()) {
      a(d);
    }
    for (const d of this.a.entries()) {
      a(d);
    }
    return Array.from(b.keys());
  }
}
const Vb = new Ub(100);
/*
 MIT
 Jonathan Ong
 https://npmjs.org/koa-is-json
*/
function Wb(a) {
  return !a || "string" == typeof a || "function" == typeof a.pipe || Buffer.isBuffer(a) ? !1 : !0;
}
;/*
 escape-html
 Copyright(c) 2012-2013 TJ Holowaychuk
 Copyright(c) 2015 Andreas Lubbe
 Copyright(c) 2015 Tiancheng "Timothy" Gu
 MIT Licensed
*/
var Xb = /["'&<>]/;
const {createHmac:Yb} = _crypto;
/*
 keygrip
 Copyright(c) 2011-2014 Jed Schmidt
 MIT Licensed
*/
class Zb {
  constructor(a, b = "sha1", c = "base64") {
    if (!(a && 0 in a)) {
      throw Error("Keys must be provided.");
    }
    this.a = b;
    this.encoding = c;
    this.keys = a;
  }
  sign(a) {
    return $b(a, this.a, this.keys[0], this.encoding);
  }
  verify(a, b) {
    return -1 < this.index(a, b);
  }
  index(a, b) {
    for (let c = 0, d = this.keys.length; c < d; c++) {
      const e = $b(a, this.a, this.keys[c], this.encoding);
      if (ac(b, e)) {
        return c;
      }
    }
    return -1;
  }
}
function $b(a, b, c, d) {
  return Yb(b, c).update(a).digest(d).replace(/\/|\+|=/g, e => ({"/":"_", "+":"-", "=":""})[e]);
}
function ac(a, b) {
  if (null == a && null != b || null == b && null != a) {
    return !1;
  }
  if (null == a && null == b) {
    return !0;
  }
  if (a.length != b.length) {
    return !1;
  }
  for (var c = 0, d = 0; d < a.length; d++) {
    c |= a.charCodeAt(d) ^ b.charCodeAt(d);
  }
  return 0 === c;
}
;const S = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, bc = /^(?:lax|strict)$/i;
function cc(a) {
  var b = a.toString();
  a.maxAge && (a.expires = new Date(Date.now() + a.maxAge));
  a.path && (b += "; path=" + a.path);
  a.expires && (b += "; expires=" + a.expires.toUTCString());
  a.domain && (b += "; domain=" + a.domain);
  a.sameSite && (b += "; samesite=", b = !0 === a.sameSite ? b + "strict" : b + a.sameSite.toLowerCase());
  a.secure && (b += "; secure");
  a.httpOnly && (b += "; httponly");
  return b;
}
class dc {
  constructor(a, b, c) {
    this.path = "/";
    this.maxAge = this.domain = this.expires = void 0;
    this.httpOnly = !0;
    this.overwrite = this.secure = this.sameSite = !1;
    if (!S.test(a)) {
      throw new TypeError("argument name is invalid");
    }
    if (b && !S.test(b)) {
      throw new TypeError("argument value is invalid");
    }
    b || (this.expires = new Date(0));
    this.name = a;
    this.value = b || "";
    for (let d in c) {
      this[d] = c[d];
    }
    if (this.path && !S.test(this.path)) {
      throw new TypeError("option path is invalid");
    }
    if (this.domain && !S.test(this.domain)) {
      throw new TypeError("option domain is invalid");
    }
    if (this.sameSite && !0 !== this.sameSite && !bc.test(this.sameSite)) {
      throw new TypeError("option sameSite is invalid");
    }
  }
  toString() {
    return this.name + "=" + this.value;
  }
}
;/*
 cookies
 Copyright(c) 2014 Jed Schmidt, http://jed.is/
 Copyright(c) 2015-2016 Douglas Christopher Wilson
 MIT Licensed
*/
const T = {};
class ec {
  constructor(a, b, c) {
    this.secure = void 0;
    this.request = a;
    this.response = b;
    c && (this.keys = Array.isArray(c.keys) ? new Zb(c.keys) : c.keys, this.secure = c.secure);
  }
  get(a, b) {
    var c = a + ".sig", d, e = b && void 0 !== b.signed ? b.signed : !!this.keys;
    if (d = this.request.headers.cookie) {
      if (d = d.match(T[a] ? T[a] : T[a] = new RegExp("(?:^|;) *" + a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "=([^;]*)"))) {
        d = d[1];
        if (!b || !e) {
          return d;
        }
        if (b = this.get(c)) {
          a = a + "=" + d;
          if (!this.keys) {
            throw Error(".keys required for signed cookies");
          }
          b = this.keys.index(a, b);
          if (0 > b) {
            this.set(c, null, {path:"/", signed:!1});
          } else {
            return b && this.set(c, this.keys.sign(a), {signed:!1}), d;
          }
        }
      }
    }
  }
  set(a, b, c) {
    const {response:d, request:e} = this;
    let f = d.getHeader("Set-Cookie") || [];
    "string" == typeof f && (f = [f]);
    var g = e.protocol;
    const h = e.connection.encrypted;
    g = void 0 !== this.secure ? !!this.secure : "https" == g || h;
    a = new dc(a, b, c);
    b = c && void 0 !== c.signed ? c.signed : !!this.keys;
    if (!g && c && c.secure) {
      throw Error("Cannot send secure cookie over unencrypted connection");
    }
    a.secure = g;
    c && "secure" in c && (a.secure = c.secure);
    fc(f, a);
    if (c && b) {
      if (!this.keys) {
        throw Error(".keys required for signed cookies");
      }
      a.value = this.keys.sign(a.toString());
      a.name += ".sig";
      fc(f, a);
    }
    (d.set ? kb.prototype.setHeader : d.setHeader).call(d, "Set-Cookie", f);
    return this;
  }
}
function fc(a, b) {
  if (b.overwrite) {
    for (var c = a.length - 1; 0 <= c; c--) {
      0 === a[c].indexOf(b.name + "=") && a.splice(c, 1);
    }
  }
  a.push(cc(b));
}
;const gc = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function hc(a) {
  return a.split(",").map((b, c) => {
    var d = gc.exec(b.trim());
    if (d) {
      b = d[1];
      var e = 1;
      if (d[2]) {
        d = d[2].split(";");
        for (let f = 0; f < d.length; f++) {
          const g = d[f].trim().split("=");
          if ("q" == g[0]) {
            e = parseFloat(g[1]);
            break;
          }
        }
      }
      c = {charset:b, q:e, f:c};
    } else {
      c = null;
    }
    if (c) {
      return c;
    }
  }).filter(Boolean);
}
function ic(a, b) {
  const c = hc(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(jc).sort(kc).map(lc);
  }
  const d = b.map((e, f) => {
    {
      let h = {b:-1, q:0, c:0};
      for (let k = 0; k < c.length; k++) {
        a: {
          var g = c[k];
          let l = 0;
          if (g.charset.toLowerCase() === e.toLowerCase()) {
            l |= 1;
          } else {
            if ("*" != g.charset) {
              g = null;
              break a;
            }
          }
          g = {f, c:l, b:g.f, q:g.q};
        }
        g && 0 > (h.c - g.c || h.q - g.q || h.b - g.b) && (h = g);
      }
      e = h;
    }
    return e;
  });
  return d.filter(jc).sort(kc).map(e => b[d.indexOf(e)]);
}
function kc(a, b) {
  return b.q - a.q || b.c - a.c || a.b - b.b || a.f - b.f || 0;
}
function lc(a) {
  return a.charset;
}
function jc(a) {
  return 0 < a.q;
}
;const mc = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function nc(a) {
  a = a.split(",");
  for (var b = !1, c = 1, d = 0, e = 0; d < a.length; d++) {
    var f = d;
    var g = mc.exec(a[d].trim());
    if (g) {
      var h = g[1], k = 1;
      if (g[2]) {
        g = g[2].split(";");
        for (var l = 0; l < g.length; l++) {
          var m = g[l].trim().split("=");
          if ("q" == m[0]) {
            k = parseFloat(m[1]);
            break;
          }
        }
      }
      f = {encoding:h, q:k, f};
    } else {
      f = null;
    }
    f && (a[e++] = f, b = b || oc("identity", f, void 0), c = Math.min(c, f.q || 1));
  }
  b || (a[e++] = {encoding:"identity", q:c, f:d});
  a.length = e;
  return a;
}
function oc(a, b, c) {
  var d = 0;
  if (b.encoding.toLowerCase() === a.toLowerCase()) {
    d |= 1;
  } else {
    if ("*" !== b.encoding) {
      return null;
    }
  }
  return {f:c, b:b.f, q:b.q, c:d};
}
function pc(a, b) {
  var c = nc(a || "");
  if (!b) {
    return c.filter(qc).sort(rc).map(sc);
  }
  var d = b.map(function(e, f) {
    for (var g = {b:-1, q:0, c:0}, h = 0; h < c.length; h++) {
      var k = oc(e, c[h], f);
      k && 0 > (g.c - k.c || g.q - k.q || g.b - k.b) && (g = k);
    }
    return g;
  });
  return d.filter(qc).sort(rc).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function rc(a, b) {
  return b.q - a.q || b.c - a.c || a.b - b.b || a.f - b.f || 0;
}
function sc(a) {
  return a.encoding;
}
function qc(a) {
  return 0 < a.q;
}
;const tc = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
function uc(a) {
  a = a.split(",");
  for (var b = 0, c = 0; b < a.length; b++) {
    var d = vc(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function vc(a, b) {
  var c = tc.exec(a);
  if (!c) {
    return null;
  }
  a = c[1];
  var d = c[2], e = a;
  d && (e += "-" + d);
  var f = 1;
  if (c[3]) {
    c = c[3].split(";");
    for (var g = 0; g < c.length; g++) {
      var h = c[g].split("=");
      "q" == h[0] && (f = parseFloat(h[1]));
    }
  }
  return {prefix:a, D:d, q:f, f:b, j:e};
}
function wc(a, b) {
  var c = uc(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(xc).sort(yc).map(zc);
  }
  var d = b.map(function(e, f) {
    for (var g = {b:-1, q:0, c:0}, h = 0; h < c.length; h++) {
      a: {
        var k = c[h];
        var l = f, m = vc(e, void 0);
        if (m) {
          var q = 0;
          if (k.j.toLowerCase() === m.j.toLowerCase()) {
            q |= 4;
          } else {
            if (k.prefix.toLowerCase() === m.j.toLowerCase()) {
              q |= 2;
            } else {
              if (k.j.toLowerCase() === m.prefix.toLowerCase()) {
                q |= 1;
              } else {
                if ("*" !== k.j) {
                  k = null;
                  break a;
                }
              }
            }
          }
          k = {f:l, b:k.f, q:k.q, c:q};
        } else {
          k = null;
        }
      }
      k && 0 > (g.c - k.c || g.q - k.q || g.b - k.b) && (g = k);
    }
    return g;
  });
  return d.filter(xc).sort(yc).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function yc(a, b) {
  return b.q - a.q || b.c - a.c || a.b - b.b || a.f - b.f || 0;
}
function zc(a) {
  return a.j;
}
function xc(a) {
  return 0 < a.q;
}
;const Ac = /^\s*([^s/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
function Bc(a) {
  a = a.split(",");
  for (var b = 1, c = 0; b < a.length; b++) {
    0 == Cc(a[c]) % 2 ? a[++c] = a[b] : a[c] += "," + a[b];
  }
  a.length = c + 1;
  for (c = b = 0; b < a.length; b++) {
    var d = Dc(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function Dc(a, b) {
  var c = Ac.exec(a);
  if (!c) {
    return null;
  }
  a = Object.create(null);
  var d = 1, e = c[2], f = c[1];
  if (c[3]) {
    c = c[3].split(";");
    for (var g = 1, h = 0; g < c.length; g++) {
      0 == Cc(c[h]) % 2 ? c[++h] = c[g] : c[h] += ";" + c[g];
    }
    c.length = h + 1;
    for (g = 0; g < c.length; g++) {
      c[g] = c[g].trim();
    }
    c = c.map(Ec);
    for (g = 0; g < c.length; g++) {
      var k = c[g];
      h = k[0].toLowerCase();
      k = (k = k[1]) && '"' === k[0] && '"' === k[k.length - 1] ? k.substr(1, k.length - 2) : k;
      if ("q" === h) {
        d = parseFloat(k);
        break;
      }
      a[h] = k;
    }
  }
  return {type:f, s:e, m:a, q:d, f:b};
}
function Fc(a, b, c) {
  var d = Dc(a, void 0);
  a = 0;
  if (!d) {
    return null;
  }
  if (b.type.toLowerCase() == d.type.toLowerCase()) {
    a |= 4;
  } else {
    if ("*" != b.type) {
      return null;
    }
  }
  if (b.s.toLowerCase() == d.s.toLowerCase()) {
    a |= 2;
  } else {
    if ("*" != b.s) {
      return null;
    }
  }
  var e = Object.keys(b.m);
  if (0 < e.length) {
    if (e.every(function(f) {
      return "*" == b.m[f] || (b.m[f] || "").toLowerCase() == (d.m[f] || "").toLowerCase();
    })) {
      a |= 1;
    } else {
      return null;
    }
  }
  return {f:c, b:b.f, q:b.q, c:a};
}
function Gc(a, b) {
  var c = Bc(void 0 === a ? "*/*" : a || "");
  if (!b) {
    return c.filter(Hc).sort(Ic).map(Jc);
  }
  var d = b.map(function(e, f) {
    for (var g = {b:-1, q:0, c:0}, h = 0; h < c.length; h++) {
      var k = Fc(e, c[h], f);
      k && 0 > (g.c - k.c || g.q - k.q || g.b - k.b) && (g = k);
    }
    return g;
  });
  return d.filter(Hc).sort(Ic).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function Ic(a, b) {
  return b.q - a.q || b.c - a.c || a.b - b.b || a.f - b.f || 0;
}
function Jc(a) {
  return a.type + "/" + a.s;
}
function Hc(a) {
  return 0 < a.q;
}
function Cc(a) {
  for (var b = 0, c = 0; -1 !== (c = a.indexOf('"', c));) {
    b++, c++;
  }
  return b;
}
function Ec(a) {
  var b = a.indexOf("=");
  if (-1 === b) {
    var c = a;
  } else {
    c = a.substr(0, b);
    var d = a.substr(b + 1);
  }
  return [c, d];
}
;/*
 MIT
 Copyright(c) 2012 Federico Romero
 Copyright(c) 2012-2014 Isaac Z. Schlueter
 Copyright(c) 2015 Douglas Christopher Wilson
 https://npmjs.org/negotiator
*/
class Kc {
  constructor(a) {
    this.request = a;
    this.headers = this.request.headers;
  }
  charset(a) {
    return (a = this.charsets(a)) && a[0];
  }
  charsets(a) {
    return ic(this.headers["accept-charset"], a);
  }
  encoding(a) {
    return (a = this.encodings(a)) && a[0];
  }
  encodings(a) {
    return pc(this.headers["accept-encoding"], a);
  }
  language(a) {
    return (a = this.languages(a)) && a[0];
  }
  languages(a) {
    return wc(this.headers["accept-language"], a);
  }
  mediaType(a) {
    return (a = this.mediaTypes(a)) && a[0];
  }
  mediaTypes(a) {
    return Gc(this.headers.accept, a);
  }
}
;/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2015 Douglas Christopher Wilson
 https://npmjs.org/accepts
*/
class Lc {
  constructor(a) {
    this.headers = a.headers;
    this.a = new Kc(a);
  }
  types(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    if (!a || 0 == a.length) {
      return this.a.mediaTypes();
    }
    if (!this.headers.accept) {
      return a[0];
    }
    b = a.map(Mc);
    var c = this.a.mediaTypes(b.filter(Nc));
    [c] = c;
    return c ? a[b.indexOf(c)] : !1;
  }
  get type() {
    return this.types;
  }
  encodings(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    return a && 0 != a.length ? this.a.encodings(a)[0] || !1 : this.a.encodings();
  }
  get encoding() {
    return this.encodings;
  }
  charsets(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    return a && 0 != a.length ? this.a.charsets(a)[0] || !1 : this.a.charsets();
  }
  get charset() {
    return this.charsets;
  }
  languages(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    return a && 0 != a.length ? this.a.languages(a)[0] || !1 : this.a.languages();
  }
  get lang() {
    return this.languages;
  }
  get langs() {
    return this.languages;
  }
  get language() {
    return this.languages;
  }
}
function Mc(a) {
  return -1 == a.indexOf("/") ? R(a) : a;
}
function Nc(a) {
  return "string" == typeof a;
}
;/*
 MIT Copyright (c) 2015 TJ Holowaychuk <tj@vision-media.ca>
 https://npmjs.org/delegates
*/
function U(a, b) {
  const c = a.a, d = a.target;
  a.h.push(b);
  c.__defineGetter__(b, function() {
    return this[d][b];
  });
  return a;
}
function Oc(a, b) {
  var c = a.a, d = a.target;
  a.w.push(b);
  c.__defineSetter__(b, function(e) {
    return this[d][b] = e;
  });
  return a;
}
class Pc {
  constructor(a, b) {
    this.a = a;
    this.target = b;
    this.g = [];
    this.h = [];
    this.w = [];
  }
  method(a) {
    const b = this.a, c = this.target;
    this.g.push(a);
    b[a] = function() {
      return this[c][a].apply(this[c], arguments);
    };
    return this;
  }
  access(a) {
    return Oc(U(this, a), a);
  }
}
;/*
 MIT jshttp/http-assert
*/
function Qc(a, b, c, d) {
  if (!a) {
    throw H(b, c, d);
  }
}
;const {URL:Rc, Url:V, format:Sc, parse:Tc} = url;
const {isIP:Uc} = net;
const {parse:Vc, stringify:Wc} = querystring;
/*
 parseurl
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
function W(a) {
  var b = a.url;
  if (void 0 !== b) {
    var c = a._parsedUrl;
    if ("object" === typeof c && null !== c && (void 0 === V || c instanceof V) && c._raw === b) {
      return c;
    }
    a: {
      if ("string" !== typeof b || 47 !== b.charCodeAt(0)) {
        c = Tc(b);
      } else {
        c = b;
        for (var d = null, e = null, f = 1; f < b.length; f++) {
          switch(b.charCodeAt(f)) {
            case 63:
              null === e && (c = b.substring(0, f), d = b.substring(f + 1), e = b.substring(f));
              break;
            case 9:
            case 10:
            case 12:
            case 13:
            case 32:
            case 35:
            case 160:
            case 65279:
              c = Tc(b);
              break a;
          }
        }
        f = void 0 !== V ? new V : {};
        f.path = b;
        f.href = b;
        f.pathname = c;
        null !== e && (f.query = d, f.search = e);
        c = f;
      }
    }
    c._raw = b;
    return a._parsedUrl = c;
  }
}
;/*
 fresh
 Copyright(c) 2012 TJ Holowaychuk
 Copyright(c) 2016-2017 Douglas Christopher Wilson
 MIT Licensed
*/
var Xc = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;
function Yc(a, b) {
  var c = a["if-modified-since"], d = a["if-none-match"];
  if (!c && !d || (a = a["cache-control"]) && Xc.test(a)) {
    return !1;
  }
  if (d && "*" !== d) {
    a = b.etag;
    if (!a) {
      return !1;
    }
    for (var e = !0, f = 0, g = [], h = 0, k = 0, l = d.length; k < l; k++) {
      switch(d.charCodeAt(k)) {
        case 32:
          h === f && (h = f = k + 1);
          break;
        case 44:
          g.push(d.substring(h, f));
          h = f = k + 1;
          break;
        default:
          f = k + 1;
      }
    }
    g.push(d.substring(h, f));
    for (d = 0; d < g.length; d++) {
      if (f = g[d], f === a || f === "W/" + a || "W/" + f === a) {
        e = !1;
        break;
      }
    }
    if (e) {
      return !1;
    }
  }
  return !c || (b = b["last-modified"], b && Zc(b) <= Zc(c)) ? !0 : !1;
}
function Zc(a) {
  a = a && Date.parse(a);
  return "number" === typeof a ? a : NaN;
}
;const X = Symbol("context#ip");
class $c {
  constructor() {
    this.res = this.req = this.response = this.ctx = this.app = null;
    this.originalUrl = "";
    this.h = {};
    this.g = this.a = null;
  }
  get header() {
    return this.req.headers;
  }
  set header(a) {
    this.req.headers = a;
  }
  get headers() {
    return this.req.headers;
  }
  set headers(a) {
    this.req.headers = a;
  }
  get url() {
    return this.req.url;
  }
  set url(a) {
    this.req.url = a;
  }
  get origin() {
    return `${this.protocol}://${this.host}`;
  }
  get href() {
    return /^https?:\/\//i.test(this.originalUrl) ? this.originalUrl : this.origin + this.originalUrl;
  }
  get method() {
    return this.req.method;
  }
  set method(a) {
    this.req.method = a;
  }
  get path() {
    return W(this.req).pathname;
  }
  set path(a) {
    const b = W(this.req);
    b.pathname !== a && (b.pathname = a, b.path = null, this.url = Sc(b));
  }
  get query() {
    const a = this.querystring, b = this.h = this.h || {};
    return b[a] || (b[a] = Vc(a));
  }
  set query(a) {
    this.querystring = Wc(a);
  }
  get querystring() {
    return this.req ? W(this.req).query || "" : "";
  }
  set querystring(a) {
    const b = W(this.req);
    b.search !== `?${a}` && (b.search = a, b.path = null, this.url = Sc(b));
  }
  get search() {
    return this.querystring ? `?${this.querystring}` : "";
  }
  set search(a) {
    this.querystring = a;
  }
  get host() {
    var {proxy:a} = this.app;
    a = a && this.get("X-Forwarded-Host");
    a || (2 <= this.req.httpVersionMajor && (a = this.get(":authority")), a || (a = this.get("Host")));
    return a ? a.split(/\s*,\s*/, 1)[0] : "";
  }
  get hostname() {
    const a = this.host;
    return a ? "[" == a[0] ? this.URL.hostname || "" : a.split(":", 1)[0] : "";
  }
  get URL() {
    if (!this.a) {
      const a = this.protocol, b = this.host, c = this.originalUrl || "";
      try {
        this.a = new Rc(`${a}://${b}${c}`);
      } catch (d) {
        this.a = Object.create(null);
      }
    }
    return this.a;
  }
  get fresh() {
    const a = this.method, b = this.ctx.status;
    return "GET" != a && "HEAD" != a ? !1 : 200 <= b && 300 > b || 304 == b ? Yc(this.header, this.response.header) : !1;
  }
  get stale() {
    return !this.fresh;
  }
  get idempotent() {
    return "GET HEAD PUT DELETE OPTIONS TRACE".split(" ").includes(this.method);
  }
  get socket() {
    return this.req.socket;
  }
  get charset() {
    try {
      const {parameters:a} = Db(this.req);
      return a.charset || "";
    } catch (a) {
      return "";
    }
  }
  get length() {
    const a = this.get("Content-Length");
    return "" == a ? null : ~~a;
  }
  get protocol() {
    if (this.socket.encrypted) {
      return "https";
    }
    if (!this.app.proxy) {
      return "http";
    }
    const a = this.get("X-Forwarded-Proto");
    return a ? a.split(/\s*,\s*/, 1)[0] : "http";
  }
  get secure() {
    return "https" == this.protocol;
  }
  get ips() {
    const {proxy:a} = this.app, b = this.get("X-Forwarded-For");
    return a && b ? b.split(/\s*,\s*/) : [];
  }
  get ip() {
    this[X] || (this[X] = this.ips[0] || this.socket.remoteAddress || "");
    return this[X];
  }
  set ip(a) {
    this[X] = a;
  }
  get subdomains() {
    const a = this.app.subdomainOffset, b = this.hostname;
    return Uc(b) ? [] : b.split(".").reverse().slice(a);
  }
  get accept() {
    return this.g || (this.g = new Lc(this.req));
  }
  set accept(a) {
    this.g = a;
  }
  accepts(a, ...b) {
    return this.accept.types(a, ...b);
  }
  acceptsEncodings(a, ...b) {
    return this.accept.encodings(a, ...b);
  }
  acceptsCharsets(a, ...b) {
    return this.accept.charsets(a, ...b);
  }
  acceptsLanguages(a, ...b) {
    return this.accept.languages(a, ...b);
  }
  is(a, ...b) {
    if (!a) {
      return Ib(this.req);
    }
    Array.isArray(a) || (a = [a, ...b]);
    return Ib(this.req, a);
  }
  get type() {
    const a = this.get("Content-Type");
    return a ? a.split(";")[0] : "";
  }
  get(a) {
    const b = this.req;
    switch(a = a.toLowerCase()) {
      case "referer":
      case "referrer":
        return b.headers.referrer || b.headers.referer || "";
      default:
        return b.headers[a] || "";
    }
  }
  inspect() {
    if (this.req) {
      return this.toJSON();
    }
  }
  toJSON() {
    return {method:this.method, url:this.url, header:this.header};
  }
  [t.custom]() {
    return this.inspect();
  }
}
;const Y = Symbol("context#cookies");
class Z {
  constructor() {
    this.state = this.originalUrl = this.res = this.req = this.response = this.request = this.app = null;
    this[Y] = null;
    this.respond = !0;
    this.url = this.path = this.query = this.method = this.search = this.socket = this.idempotent = this.querystring = this.is = this.get = this.accepts = this.acceptsCharsets = this.acceptsEncodings = this.acceptsLanguages = void 0;
    this.accept = null;
    this.etag = this.lastModified = this.type = this.length = this.body = this.message = this.status = this.flushHeaders = this.append = this.set = this.vary = this.remove = this.redirect = this.attachment = this.ip = this.ips = this.fresh = this.stale = this.secure = this.headers = this.header = this.URL = this.hostname = this.host = this.protocol = this.subdomains = this.href = this.origin = void 0;
    this.writable = this.headerSent = !1;
  }
  inspect() {
    return this.toJSON();
  }
  toJSON() {
    return {request:this.request.toJSON(), response:this.response.toJSON(), app:this.app.toJSON(), originalUrl:this.originalUrl, req:"<original node req>", res:"<original node res>", socket:"<original node socket>"};
  }
  get assert() {
    return Qc;
  }
  throw(...a) {
    throw H(...a);
  }
  onerror(a) {
    if (null != a) {
      a instanceof Error || (a = Error(r("non-error thrown: %j", a)));
      var b = !1;
      if (this.headerSent || !this.writable) {
        b = a.headerSent = !0;
      }
      this.app.emit("error", a, this);
      if (!b) {
        var {res:c} = this;
        "function" == typeof c.getHeaderNames ? c.getHeaderNames().forEach(d => c.removeHeader(d)) : c._headers = {};
        this.set(a.headers);
        this.type = "text";
        "ENOENT" == a.code && (a.status = 404);
        "number" == typeof a.status && G[a.status] || (a.status = 500);
        b = G[a.status];
        b = a.expose ? a.message : b;
        this.status = a.status;
        this.length = Buffer.byteLength(b);
        c.end(b);
      }
    }
  }
  get cookies() {
    this[Y] || (this[Y] = new ec(this.req, this.res, {keys:this.app.keys, secure:this.request.secure}));
    return this[Y];
  }
  set cookies(a) {
    this[Y] = a;
  }
  [t.custom]() {
    return this.inspect();
  }
}
U(U((new Pc(Z.prototype, "response")).method("attachment").method("redirect").method("remove").method("vary").method("set").method("append").method("flushHeaders").access("status").access("message").access("body").access("length").access("type").access("lastModified").access("etag"), "headerSent"), "writable");
U(U(U(U(U(U(U(U(U(U(U(U(U(U((new Pc(Z.prototype, "request")).method("acceptsLanguages").method("acceptsEncodings").method("acceptsCharsets").method("accepts").method("get").method("is").access("querystring").access("idempotent").access("socket").access("search").access("method").access("query").access("path").access("url").access("accept"), "origin"), "href"), "subdomains"), "protocol"), "host"), "hostname"), "URL"), "header"), "headers"), "secure"), "stale"), "fresh"), "ips"), "ip");
class ad {
  constructor() {
    this.g = this.res = this.req = this.request = this.ctx = this.app = null;
    this.a = void 0;
  }
  get socket() {
    return this.res.socket;
  }
  get header() {
    return this.res.getHeaders();
  }
  get headers() {
    return this.header;
  }
  get status() {
    return this.res.statusCode;
  }
  set status(a) {
    this.headerSent || (E(Number.isInteger(a), "status code must be a number"), E(100 <= a && 999 >= a, `invalid status code: ${a}`), this.g = !0, this.res.statusCode = a, 2 > this.req.httpVersionMajor && (this.res.statusMessage = G[a]), this.body && F[a] && (this.body = null));
  }
  get message() {
    return this.res.statusMessage || G[this.status];
  }
  set message(a) {
    this.res.statusMessage = a;
  }
  get body() {
    return this.a;
  }
  set body(a) {
    const b = this.a;
    this.a = a;
    if (null == a) {
      F[this.status] || (this.status = 204), this.remove("Content-Type"), this.remove("Content-Length"), this.remove("Transfer-Encoding");
    } else {
      this.g || (this.status = 200);
      var c = !this.header["content-type"];
      "string" == typeof a ? (c && (this.type = /^\s*</.test(a) ? "html" : "text"), this.length = Buffer.byteLength(a)) : Buffer.isBuffer(a) ? (c && (this.type = "bin"), this.length = a.length) : "function" == typeof a.pipe ? (pb(this.res, sb.bind(null, a)), Sb(a, d => this.ctx.onerror(d)), null != b && b != a && this.remove("Content-Length"), c && (this.type = "bin")) : (this.remove("Content-Length"), this.type = "json");
    }
  }
  set length(a) {
    this.set("Content-Length", a);
  }
  get length() {
    const a = this.header["content-length"], b = this.body;
    return null == a ? b ? "string" == typeof b ? Buffer.byteLength(b) : Buffer.isBuffer(b) ? b.length : Wb(b) ? Buffer.byteLength(JSON.stringify(b)) : null : null : Math.trunc(parseInt(a, 10)) || 0;
  }
  get headerSent() {
    return this.res.headersSent;
  }
  vary(a) {
    if (!this.headerSent) {
      {
        var b = this.res;
        if (!b || !b.getHeader || !b.setHeader) {
          throw new TypeError("res argument is required");
        }
        let e = b.getHeader("Vary") || "";
        var c = Array.isArray(e) ? e.join(", ") : `${e}`;
        if ("string" != typeof c) {
          throw new TypeError("header argument is required");
        }
        if (!a) {
          throw new TypeError("field argument is required");
        }
        a = Array.isArray(a) ? a : vb(`${a}`);
        for (var d = 0; d < a.length; d++) {
          if (!ub.test(a[d])) {
            throw new TypeError("field argument contains an invalid header name");
          }
        }
        if ("*" == c) {
          a = c;
        } else {
          if (d = c, c = vb(c.toLowerCase()), a.includes("*") || c.includes("*")) {
            a = "*";
          } else {
            for (let f = 0; f < a.length; f++) {
              const g = a[f].toLowerCase();
              c.includes(g) || (c.push(g), d = d ? d + ", " + a[f] : a[f]);
            }
            a = d;
          }
        }
        (e = a) && b.setHeader("Vary", e);
      }
    }
  }
  redirect(a, b) {
    "back" == a && (a = this.ctx.get("Referrer") || b || "/");
    this.set("Location", a);
    sa[this.status] || (this.status = 302);
    if (this.ctx.accepts("html")) {
      var c = Xb.exec(a);
      if (c) {
        b = "";
        var d, e = 0;
        for (d = c.index; d < a.length; d++) {
          switch(a.charCodeAt(d)) {
            case 34:
              c = "&quot;";
              break;
            case 38:
              c = "&amp;";
              break;
            case 39:
              c = "&#39;";
              break;
            case 60:
              c = "&lt;";
              break;
            case 62:
              c = "&gt;";
              break;
            default:
              continue;
          }
          e !== d && (b += a.substring(e, d));
          e = d + 1;
          b += c;
        }
        a = e !== d ? b + a.substring(e, d) : b;
      }
      this.type = "text/html; charset=utf-8";
      this.body = `Redirecting to <a href="${a}">${a}</a>.`;
    } else {
      this.type = "text/plain; charset=utf-8", this.body = `Redirecting to ${a}.`;
    }
  }
  attachment(a, b) {
    a && (this.type = B(a));
    this.set("Content-Disposition", Pb(a, b));
  }
  set type(a) {
    var b = Vb.get(a);
    if (!b) {
      if (a && "string" == typeof a) {
        if (b = -1 == a.indexOf("/") ? R(a) : a) {
          if (!b.includes("charset")) {
            var c;
            if (b && "string" == typeof b) {
              var d = (c = wb.exec(b)) && P[c[1].toLowerCase()];
              c = d && d.charset ? d.charset : c && xb.test(c[1]) ? "UTF-8" : !1;
            } else {
              c = !1;
            }
            c && (b += "; charset=" + c.toLowerCase());
          }
        } else {
          b = !1;
        }
      } else {
        b = !1;
      }
      Vb.set(a, b);
    }
    (a = b) ? this.set("Content-Type", a) : this.remove("Content-Type");
  }
  set lastModified(a) {
    "string" == typeof a && (a = new Date(a));
    this.set("Last-Modified", a.toUTCString());
  }
  get lastModified() {
    const a = this.get("last-modified");
    return a ? new Date(a) : null;
  }
  set etag(a) {
    /^(W\/)?"/.test(a) || (a = `"${a}"`);
    this.set("ETag", a);
  }
  get etag() {
    return this.get("ETag");
  }
  get type() {
    const a = this.get("Content-Type");
    return a ? a.split(";", 1)[0] : "";
  }
  is(a, ...b) {
    const c = this.type;
    if (!a) {
      return c || !1;
    }
    Array.isArray(a) || (a = [a, ...b]);
    return Gb(c, a);
  }
  get(a) {
    return this.header[a.toLowerCase()] || "";
  }
  set(a, b) {
    if (!this.headerSent) {
      if (2 == arguments.length) {
        Array.isArray(b) ? b = b.map(c => "string" == typeof c ? c : String(c)) : "string" != typeof b && (b = String(b)), this.res.setHeader(a, b);
      } else {
        for (const c in a) {
          this.set(c, a[c]);
        }
      }
    }
  }
  append(a, b) {
    const c = this.get(a);
    c && (b = Array.isArray(c) ? c.concat(b) : [c].concat(b));
    return this.set(a, b);
  }
  remove(a) {
    this.headerSent || this.res.removeHeader(a);
  }
  get writable() {
    if (this.res.finished) {
      return !1;
    }
    const a = this.res.socket;
    return a ? a.writable : !0;
  }
  inspect() {
    if (this.res) {
      var a = this.toJSON();
      a.body = this.body;
      return a;
    }
  }
  toJSON() {
    return {status:this.status, message:this.message, header:this.header};
  }
  flushHeaders() {
    this.res.flushHeaders();
  }
  [t.custom]() {
    return this.inspect();
  }
}
;const bd = function() {
  const a = new cb(M);
  return function(b) {
    const c = $a(a);
    c.namespace = b;
    c.useColors = M.useColors();
    c.enabled = a.enabled(b);
    c.color = ab(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, e) {
      d = this.namespace + (void 0 === e ? ":" : e) + d;
      d.log = this.log;
      return d;
    };
    bb(a);
    return c;
  };
}()("@goa/koa:application");
async function cd(a, b) {
  const c = a.res;
  c.statusCode = 404;
  pb(c, d => a.onerror(d));
  try {
    return await b(a), await dd(a);
  } catch (d) {
    a.onerror(d);
  }
}
class ed extends mb {
  constructor() {
    super();
    this.silent = this.proxy = !1;
    this.middleware = [];
    this.subdomainOffset = 2;
    this.env = process.env.NODE_ENV || "development";
    this.context = Object.create(Z.prototype);
    this.request = Object.create($c.prototype);
    this.response = Object.create(ad.prototype);
    this.keys = void 0;
  }
  [t.custom]() {
    return this.inspect();
  }
  listen(...a) {
    bd("listen");
    return lb(this.callback()).listen(...a);
  }
  toJSON() {
    return {subdomainOffset:this.subdomainOffset, proxy:this.proxy, env:this.env};
  }
  inspect() {
    return this.toJSON();
  }
  use(a) {
    if ("function" != typeof a) {
      throw new TypeError("middleware must be a function!");
    }
    if ("function" != typeof a ? 0 : fb.test(eb.call(a)) || (gb ? hb(a) == jb : "[object GeneratorFunction]" == db.call(a))) {
      throw Error("Generator functions are not supported by @goa/koa. Use koa-convert on them first.");
    }
    bd("use %s", a.C || a.name || "-");
    this.middleware.push(a);
    return this;
  }
  callback() {
    const a = n(this.middleware);
    if (!this.listenerCount("error")) {
      this.on("error", this.onerror);
    }
    return (b, c) => {
      b = this.createContext(b, c);
      return cd(b, a);
    };
  }
  createContext(a, b) {
    const c = Object.create(this.context), d = c.request = Object.create(this.request), e = c.response = Object.create(this.response);
    c.app = d.app = e.app = this;
    c.req = d.req = e.req = a;
    c.res = d.res = e.res = b;
    d.ctx = e.ctx = c;
    d.response = e;
    e.request = d;
    c.originalUrl = d.originalUrl = a.url;
    c.state = {};
    return c;
  }
  onerror(a) {
    if (!(a instanceof Error)) {
      throw new TypeError(r("non-error thrown: %j", a));
    }
    404 == a.status || a.expose || this.silent || (a = a.stack || a.toString(), console.error(), console.error(a.replace(/^/gm, "  ")), console.error());
  }
}
function dd(a) {
  if (0 != a.respond && a.writable) {
    var b = a.res, c = a.body, d = a.status;
    if (F[d]) {
      return a.body = null, b.end();
    }
    if ("HEAD" == a.method) {
      return !b.headersSent && Wb(c) && (a.length = Buffer.byteLength(JSON.stringify(c))), b.end();
    }
    if (null == c) {
      return 2 <= a.req.httpVersionMajor ? c = String(d) : c = a.message || String(d), b.headersSent || (a.type = "text", a.length = Buffer.byteLength(c)), b.end(c);
    }
    if (Buffer.isBuffer(c)) {
      return b.end(c);
    }
    if ("string" == typeof c) {
      return b.end(c);
    }
    if (c instanceof O) {
      return c.pipe(b);
    }
    c = JSON.stringify(c);
    b.headersSent || (a.length = Buffer.byteLength(c));
    b.end(c);
  }
}
;const fd = async a => {
  const b = {};
  a.on("connection", c => {
    const {remoteAddress:d, remotePort:e} = c, f = [d, e].join(":");
    b[f] = c;
    c.on("close", () => {
      delete b[f];
    });
  });
  a.destroy = async() => {
    await new Promise(c => {
      a.close(c);
      for (let d in b) {
        b[d].destroy();
      }
    });
  };
}, gd = async a => {
  const b = new ed;
  a = await Va(a, b);
  "production" == b.env && (b.proxy = !0);
  return {app:b, middleware:a};
};
function hd(a, b, c) {
  c = void 0 === c ? "0.0.0.0" : c;
  const d = Ia(!0);
  return new Promise((e, f) => {
    const g = k => {
      k = d(k);
      f(k);
    }, h = a.listen(b, c, () => {
      e(h);
      a.removeListener("error", g);
    }).once("error", g);
  });
}
;DEPACK_EXPORT = {startApp:async function(a, b) {
  a = void 0 === a ? {} : a;
  b = void 0 === b ? {} : b;
  const {port:c = 5000, host:d = "0.0.0.0"} = b, e = () => {
    f.destroy().then(() => {
      process.kill(process.pid, "SIGUSR2");
    });
  };
  process.once("SIGUSR2", e);
  a = await gd(a);
  const {app:f} = a, g = await hd(f, c, d);
  fd(g);
  f.destroy = async() => {
    await g.destroy();
    process.removeListener("SIGUSR2", e);
  };
  ({port:b} = g.address());
  return Object.assign({}, a, {url:`http://localhost:${b}`, server:g});
}, createApp:gd, compose:n, httpErrors:H, mount:Sa};


module.exports = DEPACK_EXPORT