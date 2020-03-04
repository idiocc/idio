#!/usr/bin/env node
             
const assert = require('assert');
const tty = require('tty');
const util = require('util');
const _crypto = require('crypto');
const zlib = require('zlib');
const path = require('path');
const fs = require('fs');
const os = require('os');
const stream = require('stream');
const querystring = require('querystring');
const https = require('https');
const http = require('http');
const url = require('url');
const events = require('events');
const vm = require('vm');
const net = require('net');             
/*
 MIT
 (c) dead-horse
 https://npmjs.org/koa-compose
*/
function aa(a) {
  if (!Array.isArray(a)) {
    throw new TypeError("Middleware stack must be an array!");
  }
  for (const b of a) {
    if ("function" != typeof b) {
      throw new TypeError("Middleware must be composed of functions!");
    }
  }
  return (b, c) => {
    function d(f) {
      if (f <= e) {
        return Promise.reject(Error("next() called multiple times"));
      }
      e = f;
      let g = a[f];
      f == a.length && (g = c);
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
;var ba = {[100]:"Continue", [101]:"Switching Protocols", [102]:"Processing", [103]:"Early Hints", [200]:"OK", [201]:"Created", [202]:"Accepted", [203]:"Non-Authoritative Information", [204]:"No Content", [205]:"Reset Content", [206]:"Partial Content", [207]:"Multi-Status", [208]:"Already Reported", [226]:"IM Used", [300]:"Multiple Choices", [301]:"Moved Permanently", [302]:"Found", [303]:"See Other", [304]:"Not Modified", [305]:"Use Proxy", [306]:"(Unused)", [307]:"Temporary Redirect", [308]:"Permanent Redirect", 
[400]:"Bad Request", [401]:"Unauthorized", [402]:"Payment Required", [403]:"Forbidden", [404]:"Not Found", [405]:"Method Not Allowed", [406]:"Not Acceptable", [407]:"Proxy Authentication Required", [408]:"Request Timeout", [409]:"Conflict", [410]:"Gone", [411]:"Length Required", [412]:"Precondition Failed", [413]:"Payload Too Large", [414]:"URI Too Long", [415]:"Unsupported Media Type", [416]:"Range Not Satisfiable", [417]:"Expectation Failed", [418]:"I'm a teapot", [421]:"Misdirected Request", [422]:"Unprocessable Entity", 
[423]:"Locked", [424]:"Failed Dependency", [425]:"Unordered Collection", [426]:"Upgrade Required", [428]:"Precondition Required", [429]:"Too Many Requests", [431]:"Request Header Fields Too Large", [451]:"Unavailable For Legal Reasons", [500]:"Internal Server Error", [501]:"Not Implemented", [502]:"Bad Gateway", [503]:"Service Unavailable", [504]:"Gateway Timeout", [505]:"HTTP Version Not Supported", [506]:"Variant Also Negotiates", [507]:"Insufficient Storage", [508]:"Loop Detected", [509]:"Bandwidth Limit Exceeded", 
[510]:"Not Extended", [511]:"Network Authentication Required"};
/*
 statuses
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2016 Douglas Christopher Wilson
 MIT Licensed
*/
const ea = da(), fa = {[300]:!0, [301]:!0, [302]:!0, [303]:!0, [305]:!0, [307]:!0, [308]:!0}, ha = {[204]:!0, [205]:!0, [304]:!0};
function da() {
  var a = I;
  const b = [];
  Object.keys(ba).forEach(c => {
    const d = ba[c];
    c = Number(c);
    a[c] = d;
    a[d] = c;
    a[d.toLowerCase()] = c;
    b.push(c);
  });
  return b;
}
function I(a) {
  if ("number" == typeof a) {
    if (!I[a]) {
      throw Error("invalid status code: " + a);
    }
    return a;
  }
  if ("string" != typeof a) {
    throw new TypeError("code must be a number or string");
  }
  var b = parseInt(a, 10);
  if (!isNaN(b)) {
    if (!I[b]) {
      throw Error("invalid status code: " + b);
    }
    return b;
  }
  b = I[a.toLowerCase()];
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
function J(...a) {
  let b, c, d = 500, e = {};
  for (let f = 0; f < a.length; f++) {
    let g = a[f];
    if (g instanceof Error) {
      b = g, d = b.status || b.statusCode || d;
    } else {
      switch(typeof g) {
        case "string":
          c = g;
          break;
        case "number":
          d = g;
          0 !== f && process.emitWarning("non-first-argument status code; replace with createError(" + g + ", ...)", "DeprecationWarning");
          break;
        case "object":
          e = g;
      }
    }
  }
  "number" == typeof d && (400 > d || 600 <= d) && process.emitWarning("non-error status code; use only 4xx or 5xx status codes", "DeprecationWarning");
  if ("number" != typeof d || !I[d] && (400 > d || 600 <= d)) {
    d = 500;
  }
  a = J[d] || J[Number(String(d).charAt(0) + "00")];
  b || (b = a ? new a(c) : Error(c || I[d]), Error.captureStackTrace(b, J));
  a && b instanceof a && b.status === d || (b.expose = 500 > d, b.status = b.statusCode = d);
  for (let f in e) {
    "status" != f && "statusCode" != f && (b[f] = e[f]);
  }
  return b;
}
class ia extends Error {
  constructor(a) {
    super();
    this.message = a;
    this.statusCode = this.status = null;
    this.expose = !1;
    this.headers = null;
  }
  set code(a) {
    this.statusCode = this.status = a;
    this.message || (this.message = I[a]);
  }
}
ea.forEach(a => {
  let b;
  const c = ja(I[a]), d = c.match(/Error$/) ? c : c + "Error";
  switch(Number(String(a).charAt(0) + "00")) {
    case 400:
      b = class extends ia {
        constructor(e) {
          super(e);
          this.code = a;
          this.name = d;
          this.expose = !0;
        }
      };
      break;
    case 500:
      b = class extends ia {
        constructor(e) {
          super(e);
          this.code = a;
          this.name = d;
          this.expose = !1;
        }
      };
  }
  b && (J[a] = b, J[c] = b);
}, {});
function ja(a) {
  return a.split(" ").map(function(b) {
    return b.charAt(0).toUpperCase() + b.slice(1);
  }).join("").replace(/[^ _0-9a-z]/gi, "");
}
;var K = assert;
const ka = assert.equal;
var la = tty;
const ma = util.debuglog, na = util.format, oa = util.inspect;
/*

 Copyright (c) 2016 Zeit, Inc.
 https://npmjs.org/ms
*/
function pa(a) {
  var b = {}, c = typeof a;
  if ("string" == c && 0 < a.length) {
    return qa(a);
  }
  if ("number" == c && isFinite(a)) {
    return b.jb ? (b = Math.abs(a), a = 864E5 <= b ? ra(a, b, 864E5, "day") : 36E5 <= b ? ra(a, b, 36E5, "hour") : 6E4 <= b ? ra(a, b, 6E4, "minute") : 1000 <= b ? ra(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}
function qa(a) {
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
function ra(a, b, c, d) {
  return Math.round(a / c) + " " + d + (b >= 1.5 * c ? "s" : "");
}
;/*
 bytes
 Copyright(c) 2012-2014 TJ Holowaychuk
 Copyright(c) 2015 Jed Watson
 MIT Licensed
*/
const sa = /\B(?=(\d{3})+(?!\d))/g, ta = /(?:\.0*|(\.[^0]+)0+)$/, L = {b:1, kb:1024, mb:1048576, gb:1073741824, tb:Math.pow(1024, 4), pb:Math.pow(1024, 5)};
function ua(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), d = b && b.nb || "", e = b && b.qb || "", f = b && void 0 !== b.Aa ? b.Aa : 2, g = !(!b || !b.hb);
  (b = b && b.ob || "") && L[b.toLowerCase()] || (b = c >= L.pb ? "PB" : c >= L.tb ? "TB" : c >= L.gb ? "GB" : c >= L.mb ? "MB" : c >= L.kb ? "KB" : "B");
  a = (a / L[b.toLowerCase()]).toFixed(f);
  g || (a = a.replace(ta, "$1"));
  d && (a = a.replace(sa, d));
  return a + e + b;
}
;/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const va = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90}, wa = {black:40, red:41, green:42, yellow:43, blue:44, magenta:45, cyan:46, white:47};
function M(a, b) {
  return (b = va[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
function xa(a, b) {
  return (b = wa[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var ya = {f:ua, ["fy"](a) {
  return M(ua(a) || "", "yellow");
}, ["fr"](a) {
  return M(ua(a) || "", "red");
}, ["fb"](a) {
  return M(ua(a) || "", "blue");
}, ["fg"](a) {
  return M(ua(a) || "", "green");
}, ["fc"](a) {
  return M(ua(a) || "", "cyan");
}, ["fm"](a) {
  return M(ua(a) || "", "magenta");
}};
const za = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, e) => e.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), Aa = {init:function(a) {
  a.inspectOpts = {...za};
}, log:function(...a) {
  return process.stderr.write(na(...a) + "\n");
}, formatArgs:function(a) {
  var b = this.namespace, c = this.color;
  const d = this.diff;
  this.useColors ? (c = "\u001b[3" + (8 > c ? c : "8;5;" + c), b = `  ${c};1m${b} \u001B[0m`, a[0] = b + a[0].split("\n").join("\n" + b), a.push(c + "m+" + pa(d) + "\u001b[0m")) : a[0] = (za.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in za ? !!za.colors : la.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:za, formatters:{o:function(a) {
  return oa(a, {...this.inspectOpts, colors:this.useColors}).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  return oa(a, {...this.inspectOpts, colors:this.useColors});
}, ...ya}};
function Ba(a) {
  function b(...g) {
    if (b.enabled) {
      var h = Number(new Date);
      b.diff = h - (f || h);
      b.prev = f;
      f = b.curr = h;
      g[0] = Ca(g[0]);
      "string" != typeof g[0] && g.unshift("%O");
      var k = 0;
      g[0] = g[0].replace(/%([a-zA-Z%]+)/g, (l, m) => {
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
function Da(a) {
  const b = Ba(a);
  "function" == typeof a.init && a.init(b);
  a.a.push(b);
  return b;
}
function Ea(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function Fa(a) {
  var b = Aa.load();
  a.save(b);
  a.c = [];
  a.g = [];
  let c;
  const d = ("string" == typeof b ? b : "").split(/[\s,]+/), e = d.length;
  for (c = 0; c < e; c++) {
    d[c] && (b = d[c].replace(/\*/g, ".*?"), "-" == b[0] ? a.g.push(new RegExp("^" + b.substr(1) + "$")) : a.c.push(new RegExp("^" + b + "$")));
  }
  for (c = 0; c < a.a.length; c++) {
    b = a.a[c], b.enabled = a.enabled(b.namespace);
  }
}
class Ga {
  constructor(a) {
    this.colors = a.colors;
    this.formatArgs = a.formatArgs;
    this.inspectOpts = a.inspectOpts;
    this.log = a.log;
    this.save = a.save;
    this.init = a.init;
    this.formatters = a.formatters || {};
    this.a = [];
    this.c = [];
    this.g = [];
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
    for (c = this.g.length; b < c; b++) {
      if (this.g[b].test(a)) {
        return !1;
      }
    }
    b = 0;
    for (c = this.c.length; b < c; b++) {
      if (this.c[b].test(a)) {
        return !0;
      }
    }
    return !1;
  }
}
function Ha() {
  const a = new Ga(Aa);
  return function(b) {
    const c = Da(a);
    c.namespace = b;
    c.useColors = Aa.useColors();
    c.enabled = a.enabled(b);
    c.color = Ea(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, e) {
      d = this.namespace + (void 0 === e ? ":" : e) + d;
      d.log = this.log;
      return d;
    };
    Fa(a);
    return c;
  };
}
function Ca(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;function N(a) {
  if (!a) {
    throw Error("To use debug, pass the namespace.");
  }
  return Ha()(a);
}
;const Ia = N("koa-mount");
function Ja(a, b) {
  function c(g) {
    const h = a;
    if (0 != g.indexOf(h)) {
      return !1;
    }
    g = g.replace(h, "") || "/";
    return e ? g : "/" != g[0] ? !1 : g;
  }
  "string" != typeof a && (b = a, a = "/");
  ka(a[0], "/", 'mount path must begin with "/"');
  const d = b.middleware ? aa(b.middleware) : b;
  if ("/" == a) {
    return d;
  }
  const e = "/" == a.slice(-1), f = b.name || "unnamed";
  Ia("mount %s %s", a, f);
  return async function(g, h) {
    const k = g.path, l = c(k);
    Ia("mount %s %s -> %s", a, f, l);
    if (!l) {
      return await h();
    }
    g.mountPath = a;
    g.path = l;
    Ia("enter %s -> %s", k, g.path);
    g.neoluddite && g.neoluddite("koa-mount", "mount");
    await d(g, async() => {
      g.path = k;
      await h();
      g.path = l;
    });
    Ia("leave %s -> %s", k, g.path);
    g.path = k;
  };
}
;const Ka = _crypto.createHash, La = _crypto.createHmac, Ma = _crypto.pseudoRandomBytes, Na = _crypto.randomBytes;
function Oa(a, b, c, d) {
  return La(b, c).update(a).digest(d).replace(/\/|\+|=/g, e => ({"/":"_", "+":"-", "=":""})[e]);
}
;function Pa(a, b) {
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
;/*
 keygrip
 Copyright(c) 2011-2014 Jed Schmidt
 MIT Licensed
*/
class Qa {
  constructor(a, b = "sha1", c = "base64") {
    if (!(a && 0 in a)) {
      throw Error("Keys must be provided.");
    }
    this.algorithm = b;
    this.encoding = c;
    this.keys = a;
  }
  sign(a) {
    return Oa(a, this.algorithm, this.keys[0], this.encoding);
  }
  verify(a, b) {
    return -1 < this.index(a, b);
  }
  index(a, b) {
    for (let c = 0, d = this.keys.length; c < d; c++) {
      const e = Oa(a, this.algorithm, this.keys[c], this.encoding);
      if (Pa(b, e)) {
        return c;
      }
    }
    return -1;
  }
}
;/*
 vary
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
const Ra = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function Sa(a, b) {
  if ("string" != typeof a) {
    throw new TypeError("header argument is required");
  }
  if (!b) {
    throw new TypeError("field argument is required");
  }
  b = Array.isArray(b) ? b : Ta(`${b}`);
  for (var c = 0; c < b.length; c++) {
    if (!Ra.test(b[c])) {
      throw new TypeError("field argument contains an invalid header name");
    }
  }
  if ("*" == a) {
    return a;
  }
  c = a;
  a = Ta(a.toLowerCase());
  if (b.includes("*") || a.includes("*")) {
    return "*";
  }
  for (let d = 0; d < b.length; d++) {
    const e = b[d].toLowerCase();
    a.includes(e) || (a.push(e), c = c ? c + ", " + b[d] : b[d]);
  }
  return c;
}
function Ta(a) {
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
;function Ua(a = {}) {
  let {allowMethods:b = "GET,HEAD,PUT,POST,DELETE,PATCH", exposeHeaders:c, allowHeaders:d, maxAge:e, credentials:f = !1, keepHeadersOnError:g = !0, origin:h} = a;
  Array.isArray(b) && (b = b.join(","));
  Array.isArray(c) && (c = c.join(","));
  Array.isArray(d) && (d = d.join(","));
  e && (e = `${e}`);
  return async function(k, l) {
    var m = k.get("Origin");
    k.vary("Origin");
    if (!m) {
      return await l();
    }
    if ("function" == typeof h) {
      var p = h(k);
      p instanceof Promise && (p = await p);
      if (!p) {
        return await l();
      }
    } else {
      p = h || m;
    }
    m = {};
    if ("OPTIONS" != k.method) {
      k.set("Access-Control-Allow-Origin", p);
      m["Access-Control-Allow-Origin"] = p;
      f && (k.set("Access-Control-Allow-Credentials", "true"), m["Access-Control-Allow-Credentials"] = "true");
      c && (p = c, k.set("Access-Control-Expose-Headers", p), m["Access-Control-Expose-Headers"] = p);
      k.neoluddite && k.neoluddite("@goa/cors", "headers");
      if (!g) {
        return await l();
      }
      try {
        return await l();
      } catch (n) {
        throw k = n.headers || {}, l = Sa(k.vary || k.Vary || "", "Origin"), delete k.$a, n.headers = Object.assign({}, k, m, {vary:l}), n;
      }
    } else {
      if (!k.get("Access-Control-Request-Method")) {
        return await l();
      }
      k.neoluddite && k.neoluddite("@goa/cors", "options");
      k.set("Access-Control-Allow-Origin", p);
      f && k.set("Access-Control-Allow-Credentials", "true");
      e && k.set("Access-Control-Max-Age", e);
      b && k.set("Access-Control-Allow-Methods", b);
      d || (d = k.get("Access-Control-Request-Headers"));
      d && k.set("Access-Control-Allow-Headers", d);
      k.status = 204;
    }
  };
}
;const Va = path.basename, Wa = path.dirname, Xa = path.extname, Ya = path.isAbsolute, P = path.join, Za = path.normalize, $a = path.parse, Q = path.relative, ab = path.resolve, bb = path.sep;
const cb = fs.ReadStream, db = fs.createReadStream, eb = fs.createWriteStream, fb = fs.exists, gb = fs.existsSync, hb = fs.lstat, ib = fs.mkdirSync, jb = fs.readFileSync, kb = fs.readdir, lb = fs.rmdir, mb = fs.stat, nb = fs.unlink;
const ob = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, pb = (a, b = !1) => ob(a, 2 + (b ? 1 : 0)), qb = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const R = os.EOL, rb = os.homedir, sb = os.tmpdir;
const tb = /\s+at.*(?:\(|\s)(.*)\)?/, ub = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, vb = rb(), wb = (a, b) => {
  const {pretty:c = !1, ignoredModules:d = ["pirates"]} = b || {};
  b = d.join("|");
  const e = new RegExp(ub.source.replace("IGNORED_MODULES", b));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(tb);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => c ? f.replace(tb, (g, h) => g.replace(h, h.replace(vb, "~"))) : f).join("\n");
};
function xb(a, b, c = !1) {
  return function(d) {
    var e = qb(arguments), {stack:f} = Error();
    const g = ob(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = wb(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function yb(a) {
  var {stack:b} = Error();
  const c = qb(arguments);
  b = pb(b, a);
  return xb(c, b, a);
}
;async function S(a, b, c) {
  const d = yb(!0);
  if ("function" != typeof a) {
    throw Error("Function must be passed.");
  }
  if (!a.length) {
    throw Error(`Function${a.name ? ` ${a.name}` : ""} does not accept any arguments.`);
  }
  return await new Promise((e, f) => {
    const g = (k, l) => k ? (k = d(k), f(k)) : e(c || l);
    let h = [g];
    Array.isArray(b) ? h = [...b, g] : 1 < Array.from(arguments).length && (h = [b, g]);
    a(...h);
  });
}
;/*
 resolve-path
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2015-2018 Douglas Christopher Wilson
 MIT Licensed
*/
const zb = /(?:^|[\\/])\.\.(?:[\\/]|$)/;
function Ab(a, b) {
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
    throw J(400, "Malicious Path");
  }
  if (Ya(c)) {
    throw J(400, "Malicious Path");
  }
  if (zb.test(Za("." + bb + c))) {
    throw J(403);
  }
  return Za(P(ab(d), c));
}
;const Bb = async(...a) => await S(fb, ...a), Cb = async(...a) => await S(mb, ...a), Db = N("koa-send");
async function Eb(a, b, c = {}) {
  K(a, "koa context required");
  K(b, "pathname required");
  Db('send "%s" %j', b, c);
  var d = c.root ? Za(ab(c.root)) : "", e = "/" == b[b.length - 1];
  b = b.substr($a(b).root.length);
  var f = c.index;
  const g = c.maxage || c.maxAge || 0;
  var h = c.immutable || !1;
  const k = c.hidden || !1, l = !1 !== c.format;
  var m = Array.isArray(c.extensions) ? c.extensions : !1, p = !1 !== c.brotli, n = !1 !== c.gzip;
  if ((c = c.setHeaders) && "function" !== typeof c) {
    throw new TypeError("option setHeaders must be function");
  }
  try {
    b = decodeURIComponent(b);
  } catch (r) {
    b = -1;
  }
  if (-1 == b) {
    return a.throw(400, "failed to decode");
  }
  f && e && (b += f);
  b = Ab(d, b);
  if (!(e = k)) {
    a: {
      d = b.substr(d.length).split(bb);
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
    "br" == a.acceptsEncodings("br", "identity") && p && await Bb(b + ".br") ? (b += ".br", a.set("Content-Encoding", "br"), a.res.removeHeader("Content-Length"), d = ".br") : "gzip" == a.acceptsEncodings("gzip", "identity") && n && await Bb(b + ".gz") && (b += ".gz", a.set("Content-Encoding", "gzip"), a.res.removeHeader("Content-Length"), d = ".gz");
    if (m && !/\.[^/]*$/.exec(b)) {
      for (m = [...m], p = 0; p < m.length; p++) {
        n = m[p];
        if ("string" != typeof n) {
          throw new TypeError("Option extensions must be an array of strings.");
        }
        /^\./.exec(n) || (n = "." + n);
        if (await Bb(b + n)) {
          b += n;
          break;
        }
      }
    }
    try {
      var q = await Cb(b);
      if (q.isDirectory()) {
        if (l && f) {
          b += "/" + f, q = await Cb(b);
        } else {
          return;
        }
      }
    } catch (r) {
      if (["ENOENT", "ENAMETOOLONG", "ENOTDIR"].includes(r.code)) {
        throw J(404, r);
      }
      r.status = 500;
      throw r;
    }
    c && c(a.res, b, q);
    a.set("Content-Length", q.size);
    a.response.get("Last-Modified") || a.set("Last-Modified", q.mtime.toUTCString());
    a.response.get("Cache-Control") || (f = ["max-age=" + (g / 1000 | 0)], h && f.push("immutable"), a.set("Cache-Control", f.join(",")));
    a.type || (h = b, h = "" !== d ? Xa(Va(h, d)) : Xa(h), a.type = h);
    a.neoluddite && a.neoluddite("koa-send", "stream");
    a.body = db(b);
    return b;
  }
}
;const Fb = N("koa-static");
var Gb = (a, b = {}) => {
  K(a, "root directory is required to serve files");
  Fb('static "%s" %j', a, b);
  b.root = ab(a);
  !1 !== b.index && (b.index = b.index || "index.html");
  return b.defer ? async(c, d) => {
    await d();
    if (("HEAD" == c.method || "GET" == c.method) && null == c.body && 404 == c.status) {
      try {
        await Eb(c, c.path, b);
      } catch (e) {
        if (404 != e.status) {
          throw e;
        }
      }
    }
  } : async(c, d) => {
    let e = !1;
    if ("HEAD" == c.method || "GET" == c.method) {
      try {
        e = await Eb(c, c.path, b);
      } catch (f) {
        if (404 != f.status) {
          throw f;
        }
      }
    }
    e || await d();
  };
};
/*
 compressible
 Copyright(c) 2013 Jonathan Ong
 Copyright(c) 2014 Jeremiah Senkpiel
 Copyright(c) 2015 Douglas Christopher Wilson
 MIT Licensed
*/
const Hb = require("mime-db"), Ib = /^text\/|\+(?:json|text|xml)$/i, Jb = /^\s*([^;\s]*)(?:;|\s|$)/;
function Kb(a) {
  if (!a || "string" != typeof a) {
    return !1;
  }
  a = (a = Jb.exec(a)) && a[1].toLowerCase();
  const b = Hb[a];
  return b && "compressible" in b ? b.compressible : Ib.test(a) || null;
}
;/*
 MIT
 Jonathan Ong
 https://npmjs.org/koa-is-json
*/
function Lb(a) {
  return !a || "string" == typeof a || "function" == typeof a.pipe || Buffer.isBuffer(a) ? !1 : !0;
}
;var Mb = stream;
const Nb = stream.Readable, Ob = stream.Transform, Pb = stream.Writable;
const Qb = zlib.constants, Rb = zlib.createGunzip;
const Sb = /(?:\.0*|(\.[^0]+)0+)$/, U = {eb:1, Ra:1024, Ta:1048576, Ja:1073741824, Za:Math.pow(1024, 4), Va:Math.pow(1024, 5)};
var Tb = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
function Ub(a) {
  if ("string" == typeof a) {
    if ("number" !== typeof a || isNaN(a)) {
      if ("string" !== typeof a) {
        a = null;
      } else {
        var b = Tb.exec(a);
        b ? (a = parseFloat(b[1]), b = b[4].toLowerCase()) : (a = parseInt(a, 10), b = "b");
        a = Math.floor(U[b] * a);
      }
    }
  } else {
    if ("number" == typeof a) {
      if (Number.isFinite(a)) {
        var c = Math.abs(a);
        b = "", b = c >= U.Va ? "PB" : c >= U.Za ? "TB" : c >= U.Ja ? "GB" : c >= U.Ta ? "MB" : c >= U.Ra ? "KB" : "B";
        a = (a / U[b.toLowerCase()]).toFixed(2);
        a = a.replace(Sb, "$1");
        a += b;
      } else {
        a = null;
      }
    } else {
      a = null;
    }
  }
  return a;
}
;const Vb = {gzip:zlib.createGzip, deflate:zlib.createDeflate};
function Wb(a = {}) {
  let {filter:b = Kb, threshold:c = 1024} = a;
  "string" == typeof c && (c = Ub(c));
  return async function(d, e) {
    d.vary("Accept-Encoding");
    await e();
    ({body:e} = d);
    if (e && !d.res.headersSent && d.writable && !1 !== d.compress && "HEAD" != d.request.method && !ha[d.response.status] && !d.response.get("Content-Encoding") && (!0 === d.compress || b(d.response.type))) {
      var f = d.acceptsEncodings("gzip", "deflate", "identity");
      f || d.throw(406, "supported encodings: gzip, deflate, identity");
      if ("identity" != f) {
        Lb(e) && (e = d.body = JSON.stringify(e));
        if (c) {
          if (d.body instanceof Nb) {
            const g = d.body;
            let h = 0, k = !1, l;
            const {qa:m, callback:p} = await new Promise((n, q) => {
              const r = new Ob({transform(u, t, x) {
                this.push(u);
                k ? x() : (h += u.length, h > c ? (k = !0, n({qa:this, callback:x})) : x());
              }});
              r.once("finish", () => n({qa:r}));
              g.once("error", u => {
                l = u;
                n({});
              });
              r.once("error", q);
              g.pipe(r);
              r.pause();
            });
            if (l) {
              return;
            }
            e = m;
            e.resume();
            if (!p) {
              d.body = e;
              return;
            }
            p();
          } else {
            if (d.response.length < c) {
              return;
            }
          }
        }
        d.set("Content-Encoding", f);
        d.res.removeHeader("Content-Length");
        f = d.body = Vb[f](a);
        e instanceof Mb ? (d.neoluddite && d.neoluddite("@goa/compress", "stream"), e.pipe(f)) : (d.neoluddite && d.neoluddite("@goa/compress", "data"), f.end(e));
      }
    }
  };
}
;const Xb = https.request;
const Yb = http.METHODS, Zb = http.OutgoingMessage, $b = http.createServer, ac = http.request;
const bc = url.URL, cc = url.Url, dc = url.format, ec = url.parse;
const fc = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class gc extends Pb {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {R:e = yb(!0), proxyError:f} = a || {}, g = (h, k) => e(k);
    super(d);
    this.a = [];
    this.xa = new Promise((h, k) => {
      this.on("finish", () => {
        let l;
        b ? l = Buffer.concat(this.a) : l = this.a.join("");
        h(l);
        this.a = [];
      });
      this.once("error", l => {
        if (-1 == l.stack.indexOf("\n")) {
          g`${l}`;
        } else {
          const m = wb(l.stack);
          l.stack = m;
          f && g`${l}`;
        }
        k(l);
      });
      c && fc(this, c).pipe(this);
    });
  }
  _write(a, b, c) {
    this.a.push(a);
    c();
  }
  get fa() {
    return this.xa;
  }
}
const hc = async(a, b = {}) => {
  ({fa:a} = new gc({rs:a, ...b, R:yb(!0)}));
  return await a;
};
const ic = (a, b, c = {}) => {
  const {justHeaders:d, binary:e, R:f = yb(!0)} = c;
  let g, h, k, l, m = 0, p = 0;
  c = (new Promise((n, q) => {
    g = a(b, async r => {
      ({headers:h} = r);
      k = {statusMessage:r.statusMessage, statusCode:r.statusCode};
      if (d) {
        r.destroy();
      } else {
        var u = "gzip" == r.headers["content-encoding"];
        r.on("data", t => m += t.byteLength);
        r = u ? r.pipe(Rb()) : r;
        l = await hc(r, {binary:e});
        p = l.length;
      }
      n();
    }).on("error", r => {
      r = f(r);
      q(r);
    }).on("timeout", () => {
      g.abort();
    });
  })).then(() => ({body:l, headers:h, ...k, Xa:m, byteLength:p, ra:null}));
  return {req:g, fa:c};
};
const jc = (a = {}) => Object.keys(a).reduce((b, c) => {
  const d = a[c];
  c = `${encodeURIComponent(c)}=${encodeURIComponent(d)}`;
  return [...b, c];
}, []).join("&").replace(/%20/g, "+"), kc = async(a, b, {data:c, justHeaders:d, binary:e, R:f = yb(!0)}) => {
  const {req:g, fa:h} = ic(a, b, {justHeaders:d, binary:e, R:f});
  g.end(c);
  a = await h;
  if ((a.headers["content-type"] || "").startsWith("application/json") && a.body) {
    try {
      a.ra = JSON.parse(a.body);
    } catch (k) {
      throw f = f(k), f.response = a.body, f;
    }
  }
  return a;
};
let lc;
try {
  const {version:a, name:b} = require("../package.json");
  lc = "@rqt/aqt" == b ? `@rqt/aqt/${a}` : `@rqt/aqt via ${b}/${a}`;
} catch (a) {
  lc = "@aqt/rqt";
}
const mc = ma("aqt"), nc = async(a, b = {}) => {
  const {data:c, type:d = "json", headers:e = {"User-Agent":`Mozilla/5.0 (Node.JS) ${lc}`}, compress:f = !0, binary:g = !1, justHeaders:h = !1, method:k, timeout:l} = b;
  b = yb(!0);
  const {hostname:m, protocol:p, port:n, path:q} = ec(a), r = "https:" === p ? Xb : ac, u = {hostname:m, port:n, path:q, headers:{...e}, timeout:l, method:k};
  if (c) {
    var t = d;
    var x = c;
    switch(t) {
      case "json":
        x = JSON.stringify(x);
        t = "application/json";
        break;
      case "form":
        x = jc(x), t = "application/x-www-form-urlencoded";
    }
    x = {data:x, contentType:t};
    ({data:t} = x);
    x = x.contentType;
    u.method = k || "POST";
    "Content-Type" in u.headers || (u.headers["Content-Type"] = x);
    "Content-Length" in u.headers || (u.headers["Content-Length"] = Buffer.byteLength(t));
  }
  !f || "Accept-Encoding" in u.headers || (u.headers["Accept-Encoding"] = "gzip, deflate");
  const {body:w, headers:E, byteLength:y, statusCode:v, statusMessage:z, Xa:H, ra:D} = await kc(r, u, {data:t, justHeaders:h, binary:g, R:b});
  mc("%s %s B%s", a, y, `${y != H ? ` (raw ${H} B)` : ""}`);
  return {body:D ? D : w, headers:E, statusCode:v, statusMessage:z};
};
const oc = async(a, b = {}) => {
  ({body:a} = await nc(a, b));
  return a;
}, pc = async(a, b = {}) => {
  ({body:a} = await nc(a, b));
  return a;
};
const qc = querystring.parse, rc = querystring.stringify;
const sc = async(a, b, c, d) => {
  a.session.token = b;
  a.session.scope = c;
  a.session.user = d;
  await a.session.manuallyCommit();
  a.redirect("/");
};
function tc(a, b) {
  if (!b) {
    throw Error("Config with at least client_id and client_secret is required.");
  }
  const {client_id:c = "", client_secret:d = "", path:e = "/auth/github", redirectPath:f = `${e}/redirect`, scope:g = "", error:h = (n, q, r) => {
    throw Error(r);
  }, finish:k = sc, session:l} = b;
  c || console.warn("[github] No client id - the dialog won't work.");
  d || console.warn("[github] No client secret - the redirect won't work.");
  const m = async n => {
    if (!n.session) {
      throw Error("Cannot start github middleware because session was not started.");
    }
    var q = Math.floor(10000 * Math.random());
    n.session["githib-state"] = q;
    await n.session.manuallyCommit();
    const r = uc(n, f);
    q = vc({ga:r, client_id:c, scope:g, state:q});
    n.redirect(q);
  }, p = async(n, q) => {
    var r = uc(n, f);
    let u;
    if (!n.session) {
      throw Error("Cannot finish github middleware because session was not started.");
    }
    u = n.query.state;
    if (u != n.session["githib-state"]) {
      throw Error("The state is incorrect.");
    }
    n.session["githib-state"] = null;
    await n.session.manuallyCommit();
    if (n.query.error) {
      await h(n, n.query.error, n.query.error_description, q);
    } else {
      var t = n.query.code;
      if (!t) {
        throw Error("Code Not Found.");
      }
      var {access_token:x, scope:w} = await wc({client_id:c, client_secret:d, ga:r, code:t, state:u});
      r = [xc(x), .../user:email/.test(w) ? [yc(x)] : []];
      var [E, y] = await Promise.all(r);
      y && (E.emails = y);
      await k(n, x, w, E, q);
    }
  };
  a.use(async(n, q) => {
    if (n.path == e) {
      l && await l(n, () => {
      }), await m(n);
    } else {
      if (n.path == f) {
        l && await l(n, () => {
        }), await p(n, q);
      } else {
        return q();
      }
    }
  });
}
const xc = async a => await zc({ua:a, path:"user"}), yc = async a => await zc({ua:a, path:"user/emails"}), zc = async a => {
  var b = a.ua;
  const c = `https://api.github.com/${a.path}`;
  a = rc(a.data);
  b = await pc(`${c}?${a}`, {headers:{Authorization:`token ${b}`, Accept:"application/json", "User-Agent":"@idio/github http://github.com/idiocc/github"}});
  if (b.message) {
    throw Error(b.message);
  }
  return b;
}, wc = async({code:a, client_id:b, client_secret:c, ga:d, state:e}) => {
  const {access_token:f, scope:g, token_type:h, error:k, error_description:l} = await pc("https://github.com/login/oauth/access_token", {data:{code:a, redirect_uri:d, client_id:b, client_secret:c, ...e ? {state:e} : {}}, headers:{Accept:"application/json"}});
  if (k) {
    throw a = Error(l), a.type = k, a;
  }
  return {access_token:f, scope:g, token_type:h};
}, vc = ({ga:a, client_id:b, scope:c, state:d}) => `https://www.github.com/login/oauth/authorize?${rc({client_id:b, redirect_uri:a, ...d ? {state:d} : {}, ...c ? {scope:c} : {}})}`, uc = ({protocol:a, host:b}, c) => [/\.ngrok\.io$/.test(b) ? "https" : a, "://", b, c].join("");
function Ac() {
  return Na(16);
}
;for (var V = [], Bc = 0; 256 > Bc; ++Bc) {
  V[Bc] = (Bc + 256).toString(16).substr(1);
}
;function Cc(a = {}, b = null, c = 0) {
  c = b && c;
  "string" == typeof a && (b = "binary" == a ? Array(16) : null, a = null);
  const {random:d, rng:e = Ac} = a;
  a = d || e();
  a[6] = a[6] & 15 | 64;
  a[8] = a[8] & 63 | 128;
  if (b) {
    for (var f = 0; 16 > f; ++f) {
      b[c + f] = a[f];
    }
  }
  b || (b = 0, b = [V[a[b++]], V[a[b++]], V[a[b++]], V[a[b++]], "-", V[a[b++]], V[a[b++]], "-", V[a[b++]], V[a[b++]], "-", V[a[b++]], V[a[b++]], "-", V[a[b++]], V[a[b++]], V[a[b++]], V[a[b++]], V[a[b++]], V[a[b++]]].join(""));
  return b;
}
;class Dc {
  constructor(a, b) {
    this._expire = 0;
    this._requireSave = !1;
    this._sessCtx = a;
    this._ctx = a.ctx;
    if (b) {
      for (const c in b) {
        "_maxAge" == c ? this._ctx.sessionOptions.maxAge = b._maxAge : "_session" == c ? this._ctx.sessionOptions.maxAge = "session" : this[c] = b[c];
      }
    } else {
      this.isNew = !0;
    }
  }
  toJSON() {
    const a = {};
    Object.keys(this).forEach(b => {
      "isNew" != b && "_" != b[0] && (a[b] = this[b]);
    });
    return a;
  }
  inspect() {
    return this.toJSON();
  }
  get length() {
    return Object.keys(this.toJSON()).length;
  }
  get populated() {
    return !!this.length;
  }
  get maxAge() {
    return this._ctx.sessionOptions.maxAge;
  }
  set maxAge(a) {
    this._ctx.sessionOptions.maxAge = a;
    this._requireSave = !0;
  }
  save() {
    this._requireSave = !0;
  }
  async manuallyCommit() {
    await this._sessCtx.commit();
  }
}
;function Ec(a) {
  a = Buffer.from(a, "base64").toString("utf8");
  return JSON.parse(a);
}
function Fc(a) {
  a = JSON.stringify(a);
  return Buffer.from(a).toString("base64");
}
;const W = N("koa-session:context");
async function Gc(a) {
  W("init from external");
  var b = a.ctx, c = a.opts;
  c.externalKey ? (b = c.externalKey.get(b), W("get external key from custom %s", b)) : (b = b.cookies.get(c.key, c), W("get external key from cookie %s", b));
  b ? (c = await a.store.get(b, c.maxAge, {rolling:c.rolling || !1}), a.valid(c, b) ? (a.create(c, b), a.a = JSON.stringify(a.session.toJSON())) : a.create()) : a.create();
}
function Hc(a) {
  const b = a.a;
  var c = a.session;
  if (c._requireSave) {
    return "force";
  }
  const d = c.toJSON();
  return b || Object.keys(d).length ? b !== JSON.stringify(d) ? "changed" : a.opts.rolling ? "rolling" : a.opts.renew && (a = c._expire, c = c.maxAge, a && c && a - Date.now() < c / 2) ? "renew" : "" : "";
}
class Ic {
  constructor(a, b = {}) {
    this.ctx = a;
    this.app = a.app;
    this.opts = {...b};
    this.store = b.ContextStore ? new b.ContextStore(a) : b.store;
    this.a = this.externalKey = this.session = void 0;
  }
  get() {
    var a = this.session;
    if (a) {
      return a;
    }
    if (null === a) {
      return null;
    }
    if (!this.store) {
      a: {
        W("init from cookie");
        a = this.ctx;
        const c = this.opts, d = a.cookies.get(c.key, c);
        if (d) {
          W("parse %s", d);
          try {
            var b = c.decode(d);
          } catch (e) {
            W("decode %j error: %s", d, e);
            if (!(e instanceof SyntaxError)) {
              throw a.cookies.set(c.key, "", c), e.headers = {"set-cookie":a.response.get("set-cookie")}, e;
            }
            this.create();
            break a;
          }
          W("parsed %j", b);
          this.valid(b) ? (this.create(b), this.a = JSON.stringify(this.session.toJSON())) : this.create();
        } else {
          this.create();
        }
      }
    }
    return this.session;
  }
  set(a) {
    if (null === a) {
      this.session = null;
    } else {
      if ("object" == typeof a) {
        this.create(a, this.externalKey);
      } else {
        throw Error("this.session can only be set as null or an object.");
      }
    }
  }
  valid(a, b) {
    const c = this.ctx;
    if (!a) {
      return this.emit("missed", {key:b, value:a, ctx:c}), !1;
    }
    if (a._expire && a._expire < Date.now()) {
      return W("expired session"), this.emit("expired", {key:b, value:a, ctx:c}), !1;
    }
    const d = this.opts.valid;
    return "function" != typeof d || d(c, a) ? !0 : (W("invalid session"), this.emit("invalid", {key:b, value:a, ctx:c}), !1);
  }
  emit(a, b) {
    setImmediate(() => {
      this.app.emit(`session:${a}`, b);
    });
  }
  create(a, b) {
    W("create session with val: %j externalKey: %s", a, b);
    this.store && (this.externalKey = b || this.opts.genid && this.opts.genid(this.ctx));
    this.session = new Dc(this, a);
  }
  async commit() {
    const {session:a, opts:{beforeSave:b}, ctx:c} = this;
    if (void 0 !== a) {
      if (null === a) {
        await this.remove();
      } else {
        var d = Hc(this);
        W("should save session: %s", d);
        d && ("function" == typeof b && (W("before save"), b(c, a)), await this.save("changed" == d));
      }
    }
  }
  async remove() {
    const {opts:{key:a}, ctx:b, externalKey:c, store:d} = this;
    c && await d.destroy(c);
    b.cookies.set(a, "", this.opts);
  }
  async save(a) {
    const {opts:{key:b, rolling:c = !1, encode:d, externalKey:e}, externalKey:f} = this;
    let {opts:{maxAge:g = 864E5}} = this, h = this.session.toJSON();
    "session" == g ? (this.opts.maxAge = void 0, h._session = !0) : (h._expire = g + Date.now(), h._maxAge = g);
    f ? (W("save %j to external key %s", h, f), "number" == typeof g && (g += 10000), await this.store.set(f, h, g, {changed:a, rolling:c}), this.use("save-external"), e ? e.set(this.ctx, f) : this.ctx.cookies.set(b, f, this.opts)) : (W("save %j to cookie", h), h = d(h), W("save %s", h), this.use("save"), this.ctx.cookies.set(b, h, this.opts));
  }
  use(a) {
    this.ctx.neoluddite && this.ctx.neoluddite("@goa/session", a);
  }
}
;/*

 MIT https://github.com/miguelmota/is-class
*/
const Jc = N("koa-session"), Kc = Symbol("context#contextSession");
Symbol("context#_contextSession");
function Lc(a = {}) {
  Mc(a);
  return async function(b, c) {
    b = Nc(b, a);
    b.store && await Gc(b);
    try {
      await c();
    } finally {
      a.autoCommit && await b.commit();
    }
  };
}
function Mc(a = {}) {
  a.key = a.key || "koa:sess";
  a.maxAge = a.maxAge || 864E5;
  null == a.overwrite && (a.overwrite = !0);
  null == a.httpOnly && (a.httpOnly = !0);
  null == a.signed && (a.signed = !0);
  null == a.autoCommit && (a.autoCommit = !0);
  Jc("session options %j", a);
  "function" != typeof a.encode && (a.encode = Fc);
  "function" != typeof a.decode && (a.decode = Ec);
  var b = a.store;
  b && (K("function" == typeof b.get, "store.get must be function"), K("function" == typeof b.set, "store.set must be function"), K("function" == typeof b.destroy, "store.destroy must be function"));
  if (b = a.externalKey) {
    K("function" == typeof b.get, "externalKey.get must be function"), K("function" == typeof b.set, "externalKey.set must be function");
  }
  if (b = a.ContextStore) {
    K("function" == typeof b && (/^class[\s{]/.test(b.toString()) || /classCallCheck\(/.test(b.toString().replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, ""))), "ContextStore must be a class"), K("function" == typeof b.prototype.get, "ContextStore.prototype.get must be function"), K("function" == typeof b.prototype.set, "ContextStore.prototype.set must be function"), K("function" == typeof b.prototype.destroy, "ContextStore.prototype.destroy must be function");
  }
  a.genid || (a.prefix ? a.genid = () => `${a.prefix}${Cc()}` : a.genid = Cc);
}
function Nc(a, b) {
  if (!a.hasOwnProperty(Kc)) {
    Object.defineProperties(a, {session:{get() {
      return c.get();
    }, set(d) {
      c.set(d);
    }, configurable:!0}, sessionOptions:{get() {
      return c.opts;
    }}});
    var c = new Ic(a, b);
    return c;
  }
}
;const Oc = N("idio");
var Pc = events;
const Qc = events.EventEmitter;
/*
 MIT streamsearch by Brian White
 https://github.com/mscdex/streamsearch
*/
function Rc(a, b, c, d, e) {
  for (var f = 0; f < e; ++f, ++b, ++d) {
    if (a[b] !== c[d]) {
      return !1;
    }
  }
  return !0;
}
function Sc(a, b) {
  var c = b.length, d = a.l, e = d.length, f = -a.a, g = d[e - 1], h = a.i, k = a.h;
  if (0 > f) {
    for (; 0 > f && f <= c - e;) {
      var l = f + e - 1;
      l = 0 > l ? a.h[a.a + l] : b[l];
      if (l === g && Tc(a, b, f, e - 1)) {
        return a.a = 0, ++a.g, f > -a.a ? a.emit("info", !0, k, 0, a.a + f) : a.emit("info", !0), a.c = f + e;
      }
      f += h[l];
    }
    if (0 > f) {
      for (; 0 > f && !Tc(a, b, f, c - f);) {
        f++;
      }
    }
    if (0 <= f) {
      a.emit("info", !1, k, 0, a.a), a.a = 0;
    } else {
      return d = a.a + f, 0 < d && a.emit("info", !1, k, 0, d), k.copy(k, 0, d, a.a - d), a.a -= d, b.copy(k, a.a), a.a += c, a.c = c;
    }
  }
  for (0 <= f && (f += a.c); f <= c - e;) {
    l = b[f + e - 1];
    if (l === g && b[f] === d[0] && Rc(d, 0, b, f, e - 1)) {
      return ++a.g, 0 < f ? a.emit("info", !0, b, a.c, f) : a.emit("info", !0), a.c = f + e;
    }
    f += h[l];
  }
  if (f < c) {
    for (; f < c && (b[f] !== d[0] || !Rc(b, f, d, 0, c - f));) {
      ++f;
    }
    f < c && (b.copy(k, 0, f, f + (c - f)), a.a = c - f);
  }
  0 < f && a.emit("info", !1, b, a.c, f < c ? f : c);
  return a.c = c;
}
function Tc(a, b, c, d) {
  for (var e = 0; e < d;) {
    var f = c + e;
    if ((0 > f ? a.h[a.a + f] : b[f]) === a.l[e]) {
      ++e;
    } else {
      return !1;
    }
  }
  return !0;
}
class Uc extends Qc {
  constructor(a) {
    super();
    "string" === typeof a && (a = new Buffer(a));
    var b, c = a.length;
    this.u = Infinity;
    this.g = 0;
    this.i = Array(256);
    this.a = 0;
    this.l = a;
    this.c = 0;
    this.h = new Buffer(c);
    for (b = 0; 256 > b; ++b) {
      this.i[b] = c;
    }
    if (1 <= c) {
      for (b = 0; b < c - 1; ++b) {
        this.i[a[b]] = c - 1 - b;
      }
    }
  }
  reset() {
    this.c = this.g = this.a = 0;
  }
  push(a, b = 0) {
    Buffer.isBuffer(a) || (a = new Buffer(a, "binary"));
    var c = a.length;
    for (this.c = b; d !== c && this.g < this.u;) {
      var d = Sc(this, a);
    }
    return d;
  }
}
;class Vc extends Nb {
  constructor(a) {
    super(a);
  }
  _read() {
  }
}
;const Wc = Buffer.from("\r\n\r\n"), Xc = /\r\n/g, Yc = /^([^:]+):[ \t]?([\x00-\xFF]+)?$/;
class Zc extends Qc {
  constructor(a = {}) {
    super();
    ({maxHeaderPairs:a = 2000} = a);
    this.a = 0;
    this.h = !1;
    this.i = 0;
    this.maxHeaderPairs = a;
    this.buffer = "";
    this.header = {};
    this.g = !1;
    this.c = new Uc(Wc);
    this.c.on("info", (b, c, d, e) => {
      c && !this.h && (81920 < this.a + (e - d) ? (e = 81920 - this.a, this.a = 81920) : this.a += e - d, 81920 === this.a && (this.h = !0), this.buffer += c.toString("binary", d, e));
      if (b) {
        if (this.buffer && this.i !== this.maxHeaderPairs) {
          b = this.buffer.split(Xc);
          c = b.length;
          e = !1;
          for (let g = 0; g < c; ++g) {
            if (0 !== b[g].length) {
              if ("\t" == b[g][0] || " " == b[g][0]) {
                this.header[f][this.header[f].length - 1] += b[g];
              } else {
                if (d = Yc.exec(b[g])) {
                  var f = d[1].toLowerCase();
                  d[2] ? void 0 === this.header[f] ? this.header[f] = [d[2]] : this.header[f].push(d[2]) : this.header[f] = [""];
                  if (++this.i === this.maxHeaderPairs) {
                    break;
                  }
                } else {
                  this.buffer = b[g];
                  e = !0;
                  break;
                }
              }
            }
          }
          e || (this.buffer = "");
        }
        this.c.g = this.c.u;
        f = this.header;
        this.header = {};
        this.buffer = "";
        this.g = !0;
        this.a = this.i = 0;
        this.h = !1;
        this.emit("header", f);
      }
    });
  }
  push(a) {
    a = this.c.push(a);
    if (this.g) {
      return a;
    }
  }
  reset() {
    this.g = !1;
    this.buffer = "";
    this.header = {};
    this.c.reset();
  }
}
;/*
 MIT dicer by Brian White
 https://github.com/mscdex/dicer
*/
const $c = Buffer.from("-"), ad = Buffer.from("\r\n"), bd = () => {
};
function cd(a, b, c, d, e) {
  var f, g = 0, h = !0;
  if (!a.a && a.F && c) {
    for (; 2 > a.h && d + g < e;) {
      if (45 === c[d + g]) {
        ++g, ++a.h;
      } else {
        a.h && (f = $c);
        a.h = 0;
        break;
      }
    }
    2 === a.h && (d + g < e && a._events.trailer && a.emit("trailer", c.slice(d + g, e)), a.reset(), a.H = !0, 0 === a.X && (a.c = !0, a.emit("finish"), a.c = !1));
    if (a.h) {
      return;
    }
  }
  a.F && (a.F = !1);
  a.a || (a.a = new Vc(a.ka), a.a._read = () => {
    dd(a);
  }, g = a.g ? "preamble" : "part", a._events[g] ? a.emit(g, a.a) : a._ignore(), a.g || (a.u = !0));
  c && d < e && !a.A && (a.g || !a.u ? (f && (h = a.a.push(f)), h = a.a.push(c.slice(d, e)), h || (a.D = !0)) : !a.g && a.u && (f && a.i.push(f), f = a.i.push(c.slice(d, e)), !a.u && void 0 !== f && f < e && cd(a, !1, c, d + f, e)));
  b && (a.i.reset(), a.g ? a.g = !1 : (++a.X, a.a.on("end", () => {
    0 === --a.X && (a.H ? (a.c = !0, a.emit("finish"), a.c = !1) : dd(a));
  })), a.a.push(null), a.a = void 0, a.A = !1, a.F = !0, a.h = 0);
}
function dd(a) {
  if (a.D && (a.D = !1, a.B)) {
    const b = a.B;
    a.B = void 0;
    b();
  }
}
class ed extends Pb {
  constructor(a) {
    super(a);
    if (!a || !a.headerFirst && "string" != typeof a.boundary) {
      throw new TypeError("Boundary required");
    }
    "string" == typeof a.boundary ? this.setBoundary(a.boundary) : this.l = void 0;
    this.wa = a.headerFirst;
    this.X = this.h = 0;
    this.c = this.H = !1;
    this.g = !0;
    this.F = !1;
    this.u = this.ja = !0;
    this.B = this.a = void 0;
    this.A = !1;
    this.ka = "number" == typeof a.partHwm ? {highWaterMark:a.partHwm} : {};
    this.D = !1;
    this.i = new Zc(a);
    this.i.on("header", b => {
      this.u = !1;
      this.a.emit("header", b);
    });
  }
  emit(a) {
    "finish" != a || this.c ? Pb.prototype.emit.apply(this, arguments) : this.H || process.nextTick(() => {
      this.emit("error", Error("Unexpected end of multipart data"));
      this.a && !this.A ? (this.a.emit("error", Error((this.g ? "Preamble" : "Part") + " terminated early due to unexpected end of multipart data")), this.a.push(null), process.nextTick(() => {
        this.c = !0;
        this.emit("finish");
        this.c = !1;
      })) : (this.c = !0, this.emit("finish"), this.c = !1);
    });
    return !1;
  }
  _write(a, b, c) {
    if (!this.i && !this.l) {
      return c();
    }
    if (this.wa && this.g) {
      if (this.a || (this.a = new Vc(this.ka), this._events.preamble ? this.emit("preamble", this.a) : this._ignore()), b = this.i.push(a), !this.u && void 0 !== b && b < a.length) {
        a = a.slice(b);
      } else {
        return c();
      }
    }
    this.ja && (this.l.push(ad), this.ja = !1);
    this.l.push(a);
    this.D ? this.B = c : c();
  }
  reset() {
    this.i = this.l = this.a = void 0;
  }
  setBoundary(a) {
    this.l = new Uc("\r\n--" + a);
    this.l.on("info", (b, c, d, e) => {
      cd(this, b, c, d, e);
    });
  }
  _ignore() {
    this.a && !this.A && (this.A = !0, this.a.on("error", bd), this.a.resume());
  }
}
;const {TextDecoder:fd} = require("text-decoding"), gd = /%([a-fA-F0-9]{2})/g;
function hd(a, b) {
  return String.fromCharCode(parseInt(b, 16));
}
function id(a) {
  let b = [], c = "key", d = "", e = !1, f = !1, g = 0, h = "";
  for (var k = 0, l = a.length; k < l; ++k) {
    if ("\\" === a[k] && e) {
      if (f) {
        f = !1;
      } else {
        f = !0;
        continue;
      }
    } else {
      if ('"' == a[k]) {
        if (f) {
          f = !1;
        } else {
          e ? (e = !1, c = "key") : e = !0;
          continue;
        }
      } else {
        if (f && e && (h += "\\"), f = !1, ("charset" === c || "lang" === c) && "'" === a[k]) {
          "charset" === c ? (c = "lang", d = h.substring(1)) : c = "value";
          h = "";
          continue;
        } else {
          if ("key" == c && ("*" == a[k] || "=" == a[k]) && b.length) {
            c = "*" == a[k] ? "charset" : "value";
            b[g] = [h, void 0];
            h = "";
            continue;
          } else {
            if (!e && ";" == a[k]) {
              c = "key";
              d ? (h.length && (h = X(h.replace(gd, hd), d)), d = "") : h.length && (h = X(h, "utf8"));
              void 0 === b[g] ? b[g] = h : b[g][1] = h;
              h = "";
              ++g;
              continue;
            } else {
              if (!e && (" " === a[k] || "\t" === a[k])) {
                continue;
              }
            }
          }
        }
      }
    }
    h += a[k];
  }
  d && h.length ? h = X(h.replace(gd, hd), d) : h && (h = X(h, "utf8"));
  void 0 === b[g] ? h && (b[g] = h) : b[g][1] = h;
  return b;
}
function X(a, b) {
  let c;
  if (a) {
    try {
      c = (new fd(b)).decode(Buffer.from(a, "binary"));
    } catch (d) {
    }
  }
  return "string" == typeof c ? c : a;
}
const jd = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], kd = /\+/g;
class ld {
  constructor() {
    this.buffer = void 0;
  }
  write(a) {
    a = a.replace(kd, " ");
    for (var b = "", c = 0, d = 0, e = a.length; c < e; ++c) {
      void 0 !== this.buffer ? jd[a.charCodeAt(c)] ? (this.buffer += a[c], ++d, 2 === this.buffer.length && (b += String.fromCharCode(parseInt(this.buffer, 16)), this.buffer = void 0)) : (b += "%" + this.buffer, this.buffer = void 0, --c) : "%" == a[c] && (c > d && (b += a.substring(d, c), d = c), this.buffer = "", ++d);
    }
    d < e && void 0 === this.buffer && (b += a.substring(d));
    return b;
  }
  reset() {
    this.buffer = void 0;
  }
}
function md(a) {
  if ("string" != typeof a) {
    return "";
  }
  for (let b = a.length - 1; 0 <= b; --b) {
    switch(a.charCodeAt(b)) {
      case 47:
      case 92:
        return a = a.slice(b + 1), ".." == a || "." == a ? "" : a;
    }
  }
  return ".." == a || "." == a ? "" : a;
}
const nd = a => {
  const {fieldSize:b = 1048576, fieldNameSize:c = 100, fileSize:d = Infinity, files:e = Infinity, fields:f = Infinity, parts:g = Infinity} = a;
  return {J:b, Ga:d, Ha:e, K:f, Ua:g, U:c};
};
class od extends Pb {
  constructor(a = {}) {
    super({...a.highWaterMark ? {highWaterMark:a.highWaterMark} : {}});
    this.a = !1;
    this.c = void 0;
    this.u = this.l = this.g = this.i = !1;
    this.opts = a;
    if (a.headers && "string" == typeof a.headers["content-type"]) {
      a: {
        a = a.headers;
        this.c = void 0;
        if (a["content-type"]) {
          const b = id(a["content-type"]);
          let c, d;
          for (let e = 0; e < this.h.length && (d = this.h[e], "function" == typeof d.detect ? c = d.detect(b) : c = d.detect.test(b[0]), !c); ++e) {
          }
          if (c) {
            this.c = new d(this, {limits:this.opts.limits, headers:a, parsedConType:b, highWaterMark:this.opts.highWaterMark, fileHwm:this.opts.fileHwm, defCharset:this.opts.defCharset, preservePath:this.opts.preservePath});
            break a;
          }
        }
        throw Error("Unsupported content type: " + a["content-type"]);
      }
    } else {
      throw Error("Missing Content-Type");
    }
  }
  emit(a, ...b) {
    if ("finish" == a) {
      if (!this.a) {
        return this.c && this.c.end(), !1;
      }
      if (this.i) {
        return !1;
      }
      this.i = !0;
    }
    return super.emit(a, ...b);
  }
  get h() {
    return [];
  }
  _write(a, b, c) {
    if (!this.c) {
      return c(Error("Not ready to parse. Missing Content-Type?"));
    }
    this.c.write(a, c);
  }
}
;const pd = /^boundary$/i, qd = /^form-data$/i, rd = /^charset$/i, sd = /^filename$/i, td = /^name$/i;
class ud {
  static get detect() {
    return /^multipart\/form-data/i;
  }
  constructor(a, {limits:b = {}, preservePath:c, fileHwm:d, parsedConType:e = [], highWaterMark:f}) {
    function g() {
      0 === x && E && !a.a && (E = !1, process.nextTick(() => {
        a.a = !0;
        a.emit("finish");
      }));
    }
    let h, k;
    [, e] = e.find(v => Array.isArray(v) && pd.test(v[0])) || [];
    if ("string" != typeof e) {
      throw Error("Multipart: Boundary not found");
    }
    const {Ua:l, Ha:m, Ga:p, K:n, J:q} = nd(b);
    let r, u = 0, t = 0, x = 0, w, E = !1;
    this.g = this.h = !1;
    this.a = void 0;
    this.l = 0;
    this.i = a;
    this.c = new ed({boundary:e, maxHeaderPairs:b.headerPairs, highWaterMark:f, fileHwm:d});
    this.c.on("drain", () => {
      this.h = !1;
      if (this.a && !this.g) {
        const v = this.a;
        this.a = void 0;
        v();
      }
    }).on("error", v => {
      a.emit("error", v);
    }).on("finish", () => {
      E = !0;
      g();
    });
    const y = v => {
      if (++this.l > l) {
        return this.c.removeListener("part", y), this.c.on("part", vd), a.u = !0, a.emit("partsLimit"), vd(v);
      }
      if (w) {
        const z = w;
        z.emit("end");
        z.removeAllListeners("end");
      }
      v.on("header", z => {
        let H = "text/plain", D = "7bit", T;
        let C = 0;
        if (z["content-type"]) {
          var B = id(z["content-type"][0]);
          if (B[0]) {
            for (H = B[0].toLowerCase(), h = 0, k = B.length; h < k && !rd.test(B[h][0]); ++h) {
            }
          }
        }
        if (z["content-disposition"]) {
          B = id(z["content-disposition"][0]);
          if (!qd.test(B[0])) {
            return vd(v);
          }
          h = 0;
          for (k = B.length; h < k; ++h) {
            if (td.test(B[h][0])) {
              T = B[h][1];
            } else {
              if (sd.test(B[h][0])) {
                var F = B[h][1];
                c || (F = md(F));
              }
            }
          }
        } else {
          return vd(v);
        }
        z["content-transfer-encoding"] && (D = z["content-transfer-encoding"][0].toLowerCase());
        if ("application/octet-stream" == H || void 0 !== F) {
          if (u == m) {
            return a.l || (a.l = !0, a.emit("filesLimit")), vd(v);
          }
          ++u;
          if (!a._events.file) {
            this.c._ignore();
            return;
          }
          ++x;
          const A = new wd({highWaterMark:d});
          r = A;
          A.on("end", () => {
            --x;
            this.g = !1;
            g();
            if (this.a && !this.h) {
              const G = this.a;
              this.a = void 0;
              G();
            }
          });
          A._read = () => {
            if (this.g && (this.g = !1, this.a && !this.h)) {
              const G = this.a;
              this.a = void 0;
              G();
            }
          };
          a.emit("file", T, A, F, D, H, v);
          z = G => {
            if ((C += G.length) > p) {
              const O = p - (C - G.length);
              0 < O && A.push(G.slice(0, O));
              A.emit("limit");
              A.truncated = !0;
              v.removeAllListeners("data");
            } else {
              A.push(G) || (this.g = !0);
            }
          };
          F = () => {
            r = void 0;
            A.push(null);
          };
        } else {
          if (t == n) {
            return a.g || (a.g = !0, a.emit("fieldsLimit")), vd(v);
          }
          ++t;
          ++x;
          const A = [];
          let G = !1;
          w = v;
          z = O => {
            let ca = O;
            C += O.length;
            C > q && (ca = Buffer.from(O, 0, q).slice(0, q), G = !0, v.removeAllListeners("data"));
            A.push(ca);
          };
          F = () => {
            w = void 0;
            var O = Buffer.concat(A);
            try {
              O = (new fd(void 0)).decode(O);
            } catch (ca) {
            }
            a.emit("field", T, O, !1, G, D, H);
            --x;
            g();
          };
        }
        v._readableState.sync = !1;
        v.on("data", z);
        v.on("end", F);
      }).on("error", z => {
        r && r.emit("error", z);
      });
    };
    this.c.on("part", y);
  }
  end() {
    0 !== this.l || this.i.a ? this.c.writable && this.c.end() : process.nextTick(() => {
      this.i.a = !0;
      this.i.emit("finish");
    });
  }
  write(a, b) {
    (a = this.c.write(a)) && !this.g ? b() : (this.h = !a, this.a = b);
  }
}
function vd(a) {
  a.resume();
}
class wd extends Nb {
  constructor(a) {
    super(a);
    this.truncated = !1;
  }
  _read() {
  }
}
;const xd = /^charset$/i;
class yd {
  static get detect() {
    return /^application\/x-www-form-urlencoded/i;
  }
  constructor(a, {limits:b = {}, parsedConType:c, defCharset:d = "utf8"}) {
    this.h = a;
    this.l = void 0;
    const {J:e, U:f, K:g} = nd(b);
    this.J = e;
    this.U = f;
    this.K = g;
    a = d;
    for (let h = 0, k = c.length; h < k; ++h) {
      if (Array.isArray(c[h]) && xd.test(c[h][0])) {
        a = c[h][1].toLowerCase();
        break;
      }
    }
    this.i = new ld;
    this.charset = a;
    this.B = 0;
    this.D = "key";
    this.c = !0;
    this.F = this.A = 0;
    this.g = this.a = "";
    this.H = this.u = !1;
  }
  write(a, b) {
    if (this.B === this.K) {
      return this.h.g || (this.h.g = !0, this.h.emit("fieldsLimit")), b();
    }
    for (var c, d, e, f = 0, g = a.length; f < g;) {
      if ("key" == this.D) {
        c = d = void 0;
        for (e = f; e < g; ++e) {
          this.c || ++f;
          if (61 === a[e]) {
            c = e;
            break;
          } else {
            if (38 === a[e]) {
              d = e;
              break;
            }
          }
          if (this.c && this.A === this.U) {
            this.l = !0;
            break;
          } else {
            this.c && ++this.A;
          }
        }
        if (void 0 !== c) {
          c > f && (this.a += this.i.write(a.toString("binary", f, c))), this.D = "val", this.l = !1, this.c = !0, this.g = "", this.F = 0, this.H = !1, this.i.reset(), f = c + 1;
        } else {
          if (void 0 !== d) {
            if (++this.B, c = this.u, f = d > f ? this.a += this.i.write(a.toString("binary", f, d)) : this.a, this.l = !1, this.c = !0, this.a = "", this.A = 0, this.u = !1, this.i.reset(), f.length && this.h.emit("field", X(f, this.charset), "", c, !1), f = d + 1, this.B === this.K) {
              return b();
            }
          } else {
            this.l ? (e > f && (this.a += this.i.write(a.toString("binary", f, e))), f = e, (this.A = this.a.length) === this.U && (this.c = !1, this.u = !0)) : (f < g && (this.a += this.i.write(a.toString("binary", f))), f = g);
          }
        }
      } else {
        d = void 0;
        for (e = f; e < g; ++e) {
          this.c || ++f;
          if (38 === a[e]) {
            d = e;
            break;
          }
          if (this.c && this.F === this.J) {
            this.l = !0;
            break;
          } else {
            this.c && ++this.F;
          }
        }
        if (void 0 !== d) {
          if (++this.B, d > f && (this.g += this.i.write(a.toString("binary", f, d))), this.h.emit("field", X(this.a, this.charset), X(this.g, this.charset), this.u, this.H), this.D = "key", this.l = !1, this.c = !0, this.a = "", this.A = 0, this.u = !1, this.i.reset(), f = d + 1, this.B === this.K) {
            return b();
          }
        } else {
          if (this.l) {
            if (e > f && (this.g += this.i.write(a.toString("binary", f, e))), f = e, "" === this.g && 0 === this.J || (this.F = this.g.length) === this.J) {
              this.c = !1, this.H = !0;
            }
          } else {
            f < g && (this.g += this.i.write(a.toString("binary", f))), f = g;
          }
        }
      }
    }
    b();
  }
  end() {
    this.h.a || ("key" == this.D && 0 < this.a.length ? this.h.emit("field", X(this.a, this.charset), "", this.u, !1) : "val" == this.D && this.h.emit("field", X(this.a, this.charset), X(this.g, this.charset), this.u, this.H), this.h.a = !0, this.h.emit("finish"));
  }
}
;class zd extends od {
  constructor(a) {
    super(a);
  }
  get h() {
    return [ud, yd];
  }
}
;const Ad = /^[^[]*/, Bd = /^\[(\d+)\]/, Cd = /^\[([^\]]+)\]/;
function Dd(a) {
  function b() {
    return [{type:"object", key:a, aa:!0}];
  }
  var c = Ad.exec(a)[0];
  if (!c) {
    return b();
  }
  const d = a.length;
  let e = c.length;
  c = {type:"object", key:c};
  const f = [c];
  for (; e < d;) {
    let g;
    if ("[" === a[e] && "]" === a[e + 1]) {
      if (e += 2, c.append = !0, e !== d) {
        return b();
      }
    } else {
      if (g = Bd.exec(a.substring(e)), null !== g) {
        e += g[0].length, c.ba = "array", c = {type:"array", key:parseInt(g[1], 10)}, f.push(c);
      } else {
        if (g = Cd.exec(a.substring(e)), null !== g) {
          e += g[0].length, c.ba = "object", c = {type:"object", key:g[1]}, f.push(c);
        } else {
          return b();
        }
      }
    }
  }
  c.aa = !0;
  return f;
}
;function Ed(a) {
  return void 0 === a ? "undefined" : Array.isArray(a) ? "array" : "object" == typeof a ? "object" : "scalar";
}
function Fd(a, b, c, d) {
  switch(Ed(c)) {
    case "undefined":
      a[b.key] = b.append ? [d] : d;
      break;
    case "array":
      a[b.key].push(d);
      break;
    case "object":
      return Fd(c, {type:"object", key:"", aa:!0}, c[""], d);
    case "scalar":
      a[b.key] = [a[b.key], d];
  }
  return a;
}
function Gd(a, b, c, d) {
  if (b.aa) {
    return Fd(a, b, c, d);
  }
  let e;
  switch(Ed(c)) {
    case "undefined":
      return a[b.key] = "array" == b.ba ? [] : {}, a[b.key];
    case "object":
      return a[b.key];
    case "array":
      if ("array" == b.ba) {
        return c;
      }
      e = {};
      a[b.key] = e;
      c.forEach(function(f, g) {
        void 0 !== f && (e["" + g] = f);
      });
      return e;
    case "scalar":
      return e = {}, e[""] = c, a[b.key] = e;
  }
}
;function Hd(a, b, c) {
  Dd(b).reduce(function(d, e) {
    return Gd(d, e, d[e.key], c);
  }, a);
}
;function Id(a, {fieldname:b}) {
  const c = {fieldname:b};
  switch(a.strategy) {
    case "ARRAY":
      a.req.files.push(c);
      break;
    case "OBJECT":
      a.req.files[b] ? a.req.files[b].push(c) : a.req.files[b] = [c];
  }
  return c;
}
function Jd(a, b) {
  switch(a.strategy) {
    case "ARRAY":
      a = a.req.files;
      b = a.indexOf(b);
      ~b && a.splice(b, 1);
      break;
    case "OBJECT":
      1 == a.req.files[b.fieldname].length ? delete a.req.files[b.fieldname] : (a = a.req.files[b.fieldname], b = a.indexOf(b), ~b && a.splice(b, 1));
  }
}
function Kd(a, b, c) {
  "VALUE" == a.strategy ? a.req.file = c : (delete b.fieldname, Object.assign(b, c));
}
class Ld {
  constructor(a, b) {
    this.strategy = a;
    this.req = b;
    switch(a) {
      case "NONE":
        break;
      case "VALUE":
        break;
      case "ARRAY":
        b.files = [];
        break;
      case "OBJECT":
        b.files = {};
        break;
      default:
        throw Error("Unknown file strategy: " + a);
    }
  }
}
;const Md = {LIMIT_PART_COUNT:"Too many parts", LIMIT_FILE_SIZE:"File too large", LIMIT_FILE_COUNT:"Too many files", LIMIT_FIELD_KEY:"Field name too long", LIMIT_FIELD_VALUE:"Field value too long", LIMIT_FIELD_COUNT:"Too many fields", LIMIT_UNEXPECTED_FILE:"Unexpected field"};
function Y(a, b) {
  const c = new Nd(Md[a]);
  c.code = a;
  b && (c.field = b);
  return c;
}
class Nd extends Error {
  constructor(a) {
    super(a);
    this.code = "";
    this.field = void 0;
  }
}
;function Od(a) {
  0 === --a.value && a.emit("zero");
}
async function Pd(a) {
  await new Promise((b, c) => {
    if (0 === a.value) {
      b();
    } else {
      a.once("zero", b);
    }
    a.once("error", c);
  });
}
class Qd extends Qc {
  constructor() {
    super();
    this.value = 0;
  }
}
;const Rd = a => (a = a["content-type"]) ? a.toLowerCase().startsWith("multipart/form-data") : !1;
function Sd(a) {
  return async function(b, c) {
    const d = b.req;
    if (!Rd(d.headers)) {
      return c();
    }
    const {limits:e = {}, storage:f, fileFilter:g, pa:h, preservePath:k} = a, l = {};
    d.body = l;
    const m = new zd({limits:e, preservePath:k, headers:d.headers}), p = new Ld(h, d), n = new Qd, q = [];
    let r = !1;
    m.on("field", (u, t, x, w) => {
      if (w) {
        return m.emit("error", Y("LIMIT_FIELD_VALUE", u));
      }
      if (e.fieldNameSize && u.length > e.fieldNameSize) {
        return m.emit("error", Y("LIMIT_FIELD_KEY"));
      }
      Hd(l, u, t);
    });
    m.on("file", async(u, t, x, w, E) => {
      if (!x) {
        return t.resume();
      }
      if (e.fieldNameSize && u.length > e.fieldNameSize) {
        return m.emit("error", Y("LIMIT_FIELD_KEY"));
      }
      w = {fieldname:u, originalname:x, encoding:w, mimetype:E, stream:t};
      const y = Id(p, w);
      let v = !1;
      x = () => {
        if (v) {
          return Jd(p, y), v;
        }
      };
      t.on("error", D => {
        Od(n);
        m.emit("error", D);
      }).on("limit", () => {
        v = !0;
        m.emit("error", Y("LIMIT_FILE_SIZE", u));
      });
      let z;
      try {
        z = await g(d, w);
      } catch (D) {
        Jd(p, y);
        m.emit("error", D);
        return;
      }
      if (z) {
        n.value++;
        try {
          if (!x()) {
            var H = await f._handleFile(d, w);
            t = {...w, ...H};
            if (x()) {
              return q.push(t);
            }
            Kd(p, y, t);
            q.push(t);
          }
        } catch (D) {
          Jd(p, y), r ? n.emit("error", D) : m.emit("error", D);
        } finally {
          Od(n);
        }
      } else {
        Jd(p, y), t.resume();
      }
    });
    d.pipe(m);
    b = u => f._removeFile(d, u);
    try {
      await new Promise((u, t) => {
        m.on("error", t).on("partsLimit", () => {
          t(Y("LIMIT_PART_COUNT"));
        }).on("filesLimit", () => {
          t(Y("LIMIT_FILE_COUNT"));
        }).on("fieldsLimit", () => {
          t(Y("LIMIT_FIELD_COUNT"));
        }).on("finish", u);
      });
    } catch (u) {
      await Pd(n);
      const t = await Td(q, b);
      u.storageErrors = t;
      throw u;
    } finally {
      r = !0, d.unpipe(m), m.removeAllListeners();
    }
    await Pd(n);
    await c();
  };
}
async function Td(a, b) {
  return await a.reduce(async(c, d) => {
    c = await c;
    try {
      await b(d);
    } catch (e) {
      e.file = d, e.field = d.fieldname, c.push(e);
    }
    return c;
  }, []);
}
;async function Ud(a, b) {
  b = b.map(async c => {
    const d = P(a, c);
    return {lstat:await S(hb, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const Vd = a => a.lstat.isDirectory(), Wd = a => !a.lstat.isDirectory();
async function Xd(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  const {ignore:b = []} = {};
  if (!(await S(hb, a)).isDirectory()) {
    var c = Error("Path is not a directory");
    c.code = "ENOTDIR";
    throw c;
  }
  c = await S(kb, a);
  var d = await Ud(a, c);
  c = d.filter(Vd);
  d = d.filter(Wd).reduce((e, f) => {
    var g = f.lstat.isDirectory() ? "Directory" : f.lstat.isFile() ? "File" : f.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return {...e, [f.relativePath]:{type:g}};
  }, {});
  c = await c.reduce(async(e, {path:f, relativePath:g}) => {
    const h = Q(a, f);
    if (b.includes(h)) {
      return e;
    }
    e = await e;
    f = await Xd(f);
    return {...e, [g]:f};
  }, {});
  return {content:{...d, ...c}, type:"Directory"};
}
;const Yd = async a => {
  await S(nb, a);
}, Zd = async a => {
  const {content:b} = await Xd(a);
  var c = Object.keys(b).filter(e => {
    ({type:e} = b[e]);
    if ("File" == e || "SymbolicLink" == e) {
      return !0;
    }
  }), d = Object.keys(b).filter(e => {
    ({type:e} = b[e]);
    if ("Directory" == e) {
      return !0;
    }
  });
  c = c.map(e => P(a, e));
  await Promise.all(c.map(Yd));
  d = d.map(e => P(a, e));
  await Promise.all(d.map(Zd));
  await S(lb, a);
}, $d = async a => {
  (await S(hb, a)).isDirectory() ? await Zd(a) : await Yd(a);
};
function ae(a) {
  a = Wa(a);
  try {
    be(a);
  } catch (b) {
    if (!/EEXIST/.test(b.message) || -1 == b.message.indexOf(a)) {
      throw b;
    }
  }
}
function be(a) {
  try {
    ib(a);
  } catch (b) {
    if ("ENOENT" == b.code) {
      const c = Wa(a);
      be(c);
      be(a);
    } else {
      if ("EEXIST" != b.code) {
        throw b;
      }
    }
  }
}
;async function ce() {
  return await new Promise((a, b) => {
    Ma(16, (c, d) => {
      if (c) {
        return b(c);
      }
      a(d.toString("hex"));
    });
  });
}
class de {
  constructor(a = {}) {
    const {filename:b = ce, destination:c = sb} = a;
    this.c = b;
    "string" == typeof c ? (ae(P(c, "file.dat")), this.a = () => c) : this.a = c;
  }
  async _handleFile(a, b) {
    const c = await this.a(a, b);
    a = await this.c(a, b);
    const d = P(c, a), e = eb(d);
    await new Promise((f, g) => {
      b.stream.pipe(e);
      b.stream.on("error", g);
      e.on("error", g);
      e.on("finish", f);
    });
    return {destination:c, filename:a, path:d, size:e.bytesWritten};
  }
  async _removeFile(a, b) {
    ({path:a} = b);
    delete b.destination;
    delete b.filename;
    delete b.path;
    await $d(a);
  }
}
;class ee {
  async _handleFile(a, b) {
    a = await hc(b.stream, {binary:!0});
    return {buffer:a, size:a.length};
  }
  async _removeFile(a, b) {
    delete b.buffer;
    return null;
  }
}
;function fe() {
  return !0;
}
function ge(a, b, c) {
  const d = a.fileFilter, e = {};
  b.forEach(({maxCount:f = Infinity, name:g}) => {
    e[g] = f;
  });
  return {limits:a.limits, preservePath:a.preservePath, storage:a.storage, fileFilter:function(f, g) {
    if (0 >= (e[g.fieldname] || 0)) {
      throw Y("LIMIT_UNEXPECTED_FILE", g.fieldname);
    }
    --e[g.fieldname];
    return d(f, g);
  }, pa:c};
}
class he {
  constructor(a = {}) {
    const {storage:b, dest:c, limits:d = {}, preservePath:e = !1, fileFilter:f = fe} = a;
    b ? this.storage = b : c ? this.storage = new de({destination:c}) : this.storage = new ee;
    this.limits = d;
    this.preservePath = e;
    this.fileFilter = f;
  }
  single(a) {
    a = ge(this, [{name:a, maxCount:1}], "VALUE");
    return Sd(a);
  }
  array(a, b) {
    a = ge(this, [{name:a, maxCount:b}], "ARRAY");
    return Sd(a);
  }
  fields(a) {
    a = ge(this, a, "OBJECT");
    return Sd(a);
  }
  none() {
    const a = ge(this, [], "NONE");
    return Sd(a);
  }
  any() {
    return Sd({limits:this.limits, preservePath:this.preservePath, storage:this.storage, fileFilter:this.fileFilter, pa:"ARRAY"});
  }
}
;class ie extends he {
  any() {
    return je(super.any());
  }
  array(...a) {
    return je(super.array(...a));
  }
  fields(...a) {
    return je(super.fields(...a));
  }
  none(...a) {
    return je(super.none(...a));
  }
  single(...a) {
    return je(super.single(...a));
  }
}
const je = a => aa([a, async function(b, c) {
  b.req.file && (b.file = b.req.file);
  b.req.files && (b.files = b.req.files);
  b.req.body && (b.request.body = b.req.body);
  b.file || b.files ? b.neoluddite("@multipart/form-data", "file") : b.request.body && b.neoluddite("@multipart/form-data", "body");
  await c();
}]);
function ke(a, b, c, d) {
  return async(e, f) => {
    e._usage = [];
    try {
      await f();
    } finally {
      if (!e._usage.length) {
        return;
      }
      e = e._usage.map(g => {
        a && (g.app = a);
        b && (g.env = b);
        return g;
      });
      try {
        await oc(`${c}/use?key=${d}`, {data:e});
      } catch (g) {
        a.emit("error", g);
      }
    }
  };
}
;async function le(a) {
  a = db(a);
  return await hc(a);
}
;const me = vm.Script;
const ne = (a, b) => {
  const [c, , d] = a.split("\n");
  a = parseInt(c.replace(/.+?(\d+)$/, (f, g) => g)) - 1;
  const e = d.indexOf("^");
  ({length:b} = b.split("\n").slice(0, a).join("\n"));
  return b + e + (a ? 1 : 0);
};
const oe = a => {
  try {
    new me(a);
  } catch (b) {
    const c = b.stack;
    if (!/Unexpected token '?</.test(b.message)) {
      throw b;
    }
    return ne(c, a);
  }
  return null;
};
function pe(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const b = a.re instanceof RegExp;
  a = -1 != ["string", "function"].indexOf(typeof a.replacement);
  return b && a;
}
const qe = (a, b) => {
  if (!(b instanceof Error)) {
    throw b;
  }
  [, , a] = a.stack.split("\n", 3);
  a = b.stack.indexOf(a);
  if (-1 == a) {
    throw b;
  }
  a = b.stack.substr(0, a - 1);
  const c = a.lastIndexOf("\n");
  b.stack = a.substr(0, c);
  throw b;
};
function re(a, b) {
  function c() {
    return b.filter(pe).reduce((d, {re:e, replacement:f}) => {
      if (this.I) {
        return d;
      }
      if ("string" == typeof f) {
        return d = d.replace(e, f);
      }
      {
        let g;
        return d.replace(e, (h, ...k) => {
          g = Error();
          try {
            return this.I ? h : f.call(this, h, ...k);
          } catch (l) {
            qe(g, l);
          }
        });
      }
    }, `${a}`);
  }
  c.a = () => {
    c.I = !0;
  };
  return c.call(c);
}
;const se = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), te = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, ue = (a, b) => Object.keys(a).reduce((c, d) => {
  {
    var e = a[d];
    const {getReplacement:f = te, getRegex:g = se} = b || {}, h = g(d);
    e = {name:d, re:e, regExp:h, getReplacement:f, map:{}, lastIndex:0};
  }
  return {...c, [d]:e};
}, {}), ve = a => {
  var b = [];
  const c = a.map;
  return {re:a.regExp, replacement(d, e) {
    d = c[e];
    delete c[e];
    e = Array.isArray(b) ? b : [b];
    return re(d, e);
  }};
}, we = a => {
  const b = a.map, c = a.getReplacement, d = a.name;
  return {re:a.re, replacement(e) {
    const f = a.lastIndex;
    b[f] = e;
    a.lastIndex += 1;
    return c(d, f);
  }};
};
async function xe(a, b) {
  return ye(a, b);
}
class ze extends Ob {
  constructor(a, b) {
    super(b);
    this.a = (Array.isArray(a) ? a : [a]).filter(pe);
    this.I = !1;
    this.c = b;
  }
  async replace(a, b) {
    const c = new ze(this.a, this.c);
    b && Object.assign(c, b);
    a = await xe(c, a);
    c.I && (this.I = !0);
    b && Object.keys(b).forEach(d => {
      b[d] = c[d];
    });
    return a;
  }
  async reduce(a) {
    return await this.a.reduce(async(b, {re:c, replacement:d}) => {
      b = await b;
      if (this.I) {
        return b;
      }
      if ("string" == typeof d) {
        b = b.replace(c, d);
      } else {
        const e = [];
        let f;
        const g = b.replace(c, (h, ...k) => {
          f = Error();
          try {
            if (this.I) {
              return e.length ? e.push(Promise.resolve(h)) : h;
            }
            const l = d.call(this, h, ...k);
            l instanceof Promise && e.push(l);
            return l;
          } catch (l) {
            qe(f, l);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(c, () => h.shift());
          } catch (h) {
            qe(f, h);
          }
        } else {
          b = g;
        }
      }
      return b;
    }, `${a}`);
  }
  async _transform(a, b, c) {
    try {
      const d = await this.reduce(a);
      this.push(d);
      c();
    } catch (d) {
      a = wb(d.stack), d.stack = a, c(d);
    }
  }
}
async function ye(a, b) {
  b instanceof Mb ? b.pipe(a) : a.end(b);
  return await hc(a);
}
;const Ae = a => {
  [, a] = /<\s*(.+?)(?:\s+[\s\S]+)?\s*\/?\s*>/.exec(a) || [];
  return a;
}, Ce = (a, {ia:b = !1, classNames:c = [], renameMap:d = {}} = {}) => {
  let e = 0;
  const f = [];
  let g;
  re(a, [{re:/[{}]/g, replacement(n, q) {
    n = "}" == n;
    const r = !n;
    if (!e && n) {
      throw Error("A closing } is found without opening one.");
    }
    e += r ? 1 : -1;
    1 == e && r ? g = {open:q} : 0 == e && n && (g.close = q, f.push(g), g = {});
  }}]);
  if (e) {
    throw Error(`Unbalanced props (level ${e}) ${a}`);
  }
  const h = {}, k = [], l = {};
  var m = f.reduce((n, {open:q, close:r}) => {
    n = a.slice(n, q);
    const [, u, t, x, w] = /(\s*)(\S+)(\s*)=(\s*)$/.exec(n) || [];
    q = a.slice(q + 1, r);
    if (!t && !/\s*\.\.\./.test(q)) {
      throw Error("Could not detect prop name");
    }
    t ? h[t] = q : k.push(q);
    l[t] = {before:u, na:x, ma:w};
    q = n || "";
    q = q.slice(0, q.length - (t || "").length - 1);
    const {ea:E, T:y} = Be(q);
    Object.assign(h, E);
    Object.assign(l, y);
    return r + 1;
  }, 0);
  if (f.length) {
    m = a.slice(m);
    const {ea:n, T:q} = Be(m);
    Object.assign(h, n);
    Object.assign(l, q);
  } else {
    const {ea:n, T:q} = Be(a);
    Object.assign(h, n);
    Object.assign(l, q);
  }
  let p = h;
  if (b || Array.isArray(c) && c.length || Object.keys(c).length) {
    ({...p} = h);
    const n = [];
    Object.keys(p).forEach(q => {
      const r = () => {
        n.push(q);
        delete p[q];
      };
      if (Array.isArray(c) && c.includes(q)) {
        r();
      } else {
        if (c[q]) {
          r();
        } else {
          if (b) {
            const u = q[0];
            u.toUpperCase() == u && r();
          }
        }
      }
    });
    n.length && (m = n.map(q => q in d ? d[q] : q).join(" "), p.className ? /[`"']$/.test(p.className) ? p.className = p.className.replace(/([`"'])$/, ` ${m}$1`) : p.className += `+' ${m}'` : p.class ? /[`"']$/.test(p.class) ? p.class = p.class.replace(/([`"'])$/, ` ${m}$1`) : p.class += `+' ${m}'` : p.className = `'${m}'`);
  }
  return {da:p, $:k, T:l};
}, Be = a => {
  const b = [], c = {};
  a.replace(/(\s*)(\S+)(\s*)=(\s*)(["'])([\s\S]*?)\5/g, (d, e, f, g, h, k, l, m) => {
    c[f] = {before:e, na:g, ma:h};
    b.push({j:m, name:f, va:`${k}${l}${k}`});
    return "%".repeat(d.length);
  }).replace(/(\s*)([^\s%]+)/g, (d, e, f, g) => {
    c[f] = {before:e};
    b.push({j:g, name:f, va:"true"});
  });
  return {ea:[...b.reduce((d, {j:e, name:f, va:g}) => {
    d[e] = [f, g];
    return d;
  }, [])].filter(Boolean).reduce((d, [e, f]) => {
    d[e] = f;
    return d;
  }, {}), T:c};
}, De = (a, b = [], c = !1, d = {}, e = "") => {
  const f = Object.keys(a);
  return f.length || b.length ? `{${f.reduce((g, h) => {
    const k = a[h], l = c || -1 != h.indexOf("-") ? `'${h}'` : h, {before:m = "", na:p = "", ma:n = ""} = d[h] || {};
    return [...g, `${m}${l}${p}:${n}${k}`];
  }, b).join(",")}${e}}` : "{}";
}, Ee = (a = "") => {
  [a] = a;
  if (!a) {
    throw Error("No tag name is given");
  }
  return a.toUpperCase() == a;
}, Fe = (a, b = {}, c = [], d = [], e = !1, f = null, g = {}, h = "") => {
  const k = Ee(a), l = k ? a : `'${a}'`;
  if (!Object.keys(b).length && !c.length && !d.length) {
    return `h(${l})`;
  }
  const m = k && "dom" == e ? !1 : e;
  k || !d.length || e && "dom" != e || f && f(`JSX: destructuring ${d.join(" ")} is used without quoted props on HTML ${a}.`);
  a = De(b, d, m, g, h);
  b = c.reduce((p, n, q) => {
    q = c[q - 1];
    let r = "";
    q && /^\/\*[\s\S]*\*\/$/.test(q) ? r = "" : q && /\S/.test(q) && (r = ",");
    return `${p}${r}${n}`;
  }, "");
  return `h(${l},${a}${b ? `,${b}` : ""})`;
};
const Ge = (a, b = []) => {
  let c = 0, d;
  a = re(a, [...b, {re:/[<>]/g, replacement(e, f) {
    if (d) {
      return e;
    }
    const g = "<" == e;
    c += g ? 1 : -1;
    0 == c && !g && (d = f);
    return e;
  }}]);
  if (c) {
    throw Error(1);
  }
  return {Wa:a, oa:d};
}, Ie = a => {
  const b = Ae(a);
  let c;
  const {ya:d} = ue({ya:/=>/g});
  try {
    ({Wa:k, oa:c} = Ge(a, [we(d)]));
  } catch (l) {
    if (1 === l) {
      throw Error(`Could not find the matching closing > for ${b}.`);
    }
  }
  const e = k.slice(0, c + 1);
  var f = e.replace(/<\s*[^\s/>]+/, "");
  if (/\/\s*>$/.test(f)) {
    return a = f.replace(/\/\s*>$/, ""), f = "", new He({N:e.replace(d.regExp, "=>"), G:a.replace(d.regExp, "=>"), content:"", tagName:b});
  }
  a = f.replace(/>$/, "");
  f = c + 1;
  c = !1;
  let g = 1, h;
  re(k, [{re:new RegExp(`[\\s\\S](?:<\\s*${b}(\\s+|>)|/\\s*${b}\\s*>)`, "g"), replacement(l, m, p, n) {
    if (c) {
      return l;
    }
    m = !m && l.endsWith(">");
    const q = !m;
    if (q) {
      n = n.slice(p);
      const {oa:r} = Ge(n.replace(/^[\s\S]/, " "));
      n = n.slice(0, r + 1);
      if (/\/\s*>$/.test(n)) {
        return l;
      }
    }
    g += q ? 1 : -1;
    0 == g && m && (c = p, h = c + l.length);
    return l;
  }}]);
  if (g) {
    throw Error(`Could not find the matching closing </${b}>.`);
  }
  f = k.slice(f, c);
  var k = k.slice(0, h).replace(d.regExp, "=>");
  return new He({N:k, G:a.replace(d.regExp, "=>"), content:f.replace(d.regExp, "=>"), tagName:b});
};
class He {
  constructor(a) {
    this.N = a.N;
    this.G = a.G;
    this.content = a.content;
    this.tagName = a.tagName;
  }
}
;const Je = a => {
  let b = "", c = "";
  a = a.replace(/^(\r?\n\s*)([\s\S]+)?/, (d, e, f = "") => {
    b = e;
    return f;
  }).replace(/([\s\S]+?)?(\r?\n\s*)$/, (d, e = "", f = "") => {
    c = f;
    return e;
  });
  return `${b}${a ? `\`${a}\`` : ""}${c}`;
}, Le = a => {
  const b = [];
  let c = {}, d = 0, e = 0;
  re(a, [{re:/[<{}]/g, replacement(f, g) {
    if (!(g < e)) {
      if (/[{}]/.test(f)) {
        d += "{" == f ? 1 : -1, 1 == d && void 0 == c.from ? c.from = g : 0 == d && (c.ta = g + 1, c.Ea = a.slice(c.from + 1, g), b.push(c), c = {});
      } else {
        if (d) {
          return f;
        }
        f = Ie(a.slice(g));
        e = g + f.N.length;
        c.Fa = f;
        c.ta = e;
        c.from = g;
        b.push(c);
        c = {};
      }
    }
  }}, {}]);
  return b.length ? Ke(a, b) : [Je(a)];
}, Ke = (a, b) => {
  let c = 0;
  b = b.reduce((d, {from:e, ta:f, Ea:g, Fa:h}) => {
    (e = a.slice(c, e)) && d.push(Je(e));
    c = f;
    g ? d.push(g) : h && d.push(h);
    return d;
  }, []);
  if (c < a.length) {
    const d = a.slice(c, a.length);
    d && b.push(Je(d));
  }
  return b;
};
const Ne = (a, b = {}) => {
  var c = b.quoteProps, d = b.warn;
  const e = b.prop2class, f = b.classNames, g = b.renameMap;
  var h = oe(a);
  if (null === h) {
    return a;
  }
  var k = a.slice(h);
  const {G:l = "", content:m, tagName:p, N:{length:n}} = Ie(k);
  k = Me(m, c, d, b);
  const {da:q, $:r, T:u} = Ce(l.replace(/^ */, ""), {ia:e, classNames:f, renameMap:g});
  d = Fe(p, q, k, r, c, d, u, /\s*$/.exec(l) || [""]);
  c = a.slice(0, h);
  a = a.slice(h + n);
  h = n - d.length;
  0 < h && (d = `${" ".repeat(h)}${d}`);
  a = `${c}${d}${a}`;
  return Ne(a, b);
}, Me = (a, b = !1, c = null, d = {}) => a ? Le(a).reduce((e, f) => {
  if (f instanceof He) {
    const {G:k = "", content:l, tagName:m} = f, {da:p, $:n} = Ce(k, {ia:d.prop2class, classNames:d.classNames, renameMap:d.renameMap});
    f = Me(l, b, c, d);
    f = Fe(m, p, f, n, b, c);
    return [...e, f];
  }
  const g = oe(f);
  if (g) {
    var h = f.slice(g);
    const {N:{length:k}, G:l = "", content:m, tagName:p} = Ie(h), {da:n, $:q} = Ce(l, {ia:d.prop2class, classNames:d.classNames, renameMap:d.renameMap});
    h = Me(m, b, c, d);
    h = Fe(p, n, h, q, b, c);
    const r = f.slice(0, g);
    f = f.slice(g + k);
    return [...e, `${r}${h}${f}`];
  }
  return [...e, f];
}, []) : [];
const Oe = (a, b = {}) => {
  const {e:c, Ba:d, Da:e, j:f, Na:g, Oa:h} = ue({Ba:/^ *export\s+default\s+{[\s\S]+?}/mg, e:/^ *export\s+(?:default\s+)?/mg, Da:/^ *export\s+{[^}]+}\s+from\s+(['"])(?:.+?)\1/mg, j:/^ *import(\s+([^\s,]+)\s*,?)?(\s*{(?:[^}]+)})?\s+from\s+['"].+['"]/gm, Na:/^ *import\s+(?:(.+?)\s*,\s*)?\*\s+as\s+.+?\s+from\s+['"].+['"]/gm, Oa:/^ *import\s+['"].+['"]/gm}, {getReplacement(k, l) {
    return `/*%%_RESTREAM_${k.toUpperCase()}_REPLACEMENT_${l}_%%*/`;
  }, getRegex(k) {
    return new RegExp(`/\\*%%_RESTREAM_${k.toUpperCase()}_REPLACEMENT_(\\d+)_%%\\*/`, "g");
  }});
  a = re(a, [we(e), we(d), we(c), we(f), we(g), we(h)]);
  b = Ne(a, b);
  return re(b, [ve(e), ve(d), ve(c), ve(f), ve(g), ve(h)]);
};
const Pe = async a => {
  try {
    return await S(hb, a);
  } catch (b) {
    return null;
  }
};
const Re = async a => {
  var b = await Pe(a);
  let c = a, d = !1;
  if (!b) {
    if (c = await Qe(a), !c) {
      throw Error(`${a}.js or ${a}.jsx is not found.`);
    }
  } else {
    if (b.isDirectory()) {
      b = !1;
      let e;
      a.endsWith("/") || (e = c = await Qe(a), b = !0);
      if (!e) {
        c = await Qe(P(a, "index"));
        if (!c) {
          throw Error(`${b ? `${a}.jsx? does not exist, and ` : ""}index.jsx? file is not found in ${a}`);
        }
        d = !0;
      }
    }
  }
  return {path:a.startsWith(".") ? Q("", c) : c, Pa:d};
}, Qe = async a => {
  a = `${a}.js`;
  let b = await Pe(a);
  b || (a = `${a}x`);
  if (b = await Pe(a)) {
    return a;
  }
};
function Se(a, b, c) {
  const d = [];
  b.replace(a, (e, ...f) => {
    e = f.slice(0, f.length - 2).reduce((g, h, k) => {
      k = c[k];
      if (!k || void 0 === h) {
        return g;
      }
      g[k] = h;
      return g;
    }, {});
    d.push(e);
  });
  return d;
}
;function Te(a) {
  a = JSON.stringify(a);
  const b = Buffer.byteLength(a), c = 126 > b ? 0 : 2;
  var d = 0 === c ? b : 126;
  const e = Buffer.alloc(2 + c + b);
  e.writeUInt8(129, 0);
  e.writeUInt8(d, 1);
  d = 2;
  0 < c && (e.writeUInt16BE(b, 2), d += c);
  e.write(a, d);
  return e;
}
function Ue(a) {
  return Ka("sha1").update(`${a}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`, "binary").digest("base64");
}
;function Ve(a, b = {}) {
  const {onMessage:c = () => {
  }, onConnect:d = () => {
  }, log:e = !0} = b, f = {};
  a.on("upgrade", function(g, h) {
    if ("websocket" != g.headers.upgrade) {
      h.end("HTTP/1.1 400 Bad Request");
    } else {
      var k = g.headers["sec-websocket-protocol"], l = g.headers["sec-websocket-key"];
      g = ["HTTP/1.1 101 Web Socket Protocol Handshake", "Upgrade: WebSocket", "Connection: Upgrade", `Sec-WebSocket-Accept: ${Ue(l)}`];
      (k ? k.split(",").map(m => m.trim()) : []).includes("json") && g.push("Sec-WebSocket-Protocol: json");
      h.write(g.join("\r\n") + "\r\n\r\n");
      e && console.log(xa("Client connected.", "green"));
      h.on("data", m => {
        var p = m.readUInt8(0) & 15;
        if (8 === p) {
          m = null;
        } else {
          if (1 === p) {
            var n = m.readUInt8(1), q = !!(n >>> 7 & 1);
            p = 2;
            n &= 127;
            if (125 < n) {
              if (126 === n) {
                n = m.readUInt16BE(p), p += 2;
              } else {
                throw m.readUInt32BE(p), m.readUInt32BE(p + 4), Error("Large payloads not currently implemented");
              }
            }
            if (q) {
              var r = m.readUInt32BE(p);
              p += 4;
            }
            var u = Buffer.alloc(n);
            if (q) {
              for (let t = 0, x = 0; t < n; ++t, x = t % 4) {
                q = 3 == x ? 0 : 3 - x << 3;
                q = (0 == q ? r : r >>> q) & 255;
                const w = m.readUInt8(p++);
                u.writeUInt8(q ^ w, t);
              }
            } else {
              m.copy(u, 0, p++);
            }
            m = `${u}`;
          } else {
            m = void 0;
          }
        }
        m ? c(l, m) : null === m && (delete f[l], e && console.log(xa("Client disconnected.", "red")));
      });
      f[l] = (m, p) => {
        h.write(Te({event:m, message:p}));
      };
      d(l);
    }
  });
  return f;
}
;let We;
const Ye = async(a, b, c = {}) => {
  We || ({root:We} = $a(process.cwd()));
  const {fields:d, soft:e = !1} = c;
  var f = P(a, "node_modules", b);
  f = P(f, "package.json");
  const g = await Pe(f);
  if (g) {
    a = await Xe(f, d);
    if (void 0 === a) {
      throw Error(`The package ${Q("", f)} does export the module.`);
    }
    if (!a.entryExists && !e) {
      throw Error(`The exported module ${a.main} in package ${b} does not exist.`);
    }
    const {entry:h, version:k, packageName:l, main:m, entryExists:p, ...n} = a;
    return {entry:Q("", h), packageJson:Q("", f), ...k ? {version:k} : {}, packageName:l, ...m ? {hasMain:!0} : {}, ...p ? {} : {entryExists:!1}, ...n};
  }
  if (a == We && !g) {
    throw Error(`Package.json for module ${b} not found.`);
  }
  return Ye(P(ab(a), ".."), b, c);
}, Xe = async(a, b = []) => {
  const c = await le(a);
  let d, e, f, g, h;
  try {
    ({module:d, version:e, name:f, main:g, ...h} = JSON.parse(c)), h = b.reduce((l, m) => {
      l[m] = h[m];
      return l;
    }, {});
  } catch (l) {
    throw Error(`Could not parse ${a}.`);
  }
  a = Wa(a);
  b = d || g;
  if (!b) {
    if (!await Pe(P(a, "index.js"))) {
      return;
    }
    b = g = "index.js";
  }
  a = P(a, b);
  let k;
  try {
    ({path:k} = await Re(a)), a = k;
  } catch (l) {
  }
  return {entry:a, version:e, packageName:f, main:!d && g, entryExists:!!k, ...h};
};
const $e = async(a, b, {mount:c, override:d = {}}) => {
  var e = async(f, g, h) => {
    var k = Wa(a);
    if (/^[/.]/.test(h)) {
      return f;
    }
    {
      let [p, n, ...q] = h.split("/");
      !p.startsWith("@") && n ? (q = [n, ...q], n = p) : n = p.startsWith("@") ? `${p}/${n}` : p;
      f = {name:n, paths:q.join("/")};
    }
    const {name:l, paths:m} = f;
    if (d[l]) {
      return `${g}'${d[l]}'`;
    }
    ({packageJson:k} = await Ye(k, l));
    f = ab(k);
    k = Wa(f);
    if (m) {
      return Ze(k, m, g, c);
    }
    ({module:f} = require(f));
    return f ? Ze(k, f, g, c) : (console.warn("[\u219b] Package %s does not specify module in package.json, trying src", k), Ze(k, "src", g));
  };
  e = new ze([{re:/^( *import(?:\s+[^\s,]+\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+)['"](.+)['"]/gm, replacement:e}, {re:/^( *import\s+)['"](.+)['"]/gm, replacement:e}]);
  e.end(b);
  return await hc(e);
}, Ze = (a, b, c, d) => {
  a = P(a, b);
  b = Q("", a);
  d && (b = Q(d, b));
  return `${c}'/${b}${/[/\\]$/.test(a) ? "/" : ""}'`.replace(/\\/g, "/");
};
function af(a = "") {
  let b;
  window["FRONTEND-STYLE-ID"] ? (b = window["FRONTEND-STYLE-ID"], b.innerText = "") : (b = document.createElement("style"), b.id = "FRONTEND-STYLE-ID", document.head.appendChild(b));
  b.type = "text/css";
  b.styleSheet ? b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a));
}
;const bf = a => Se(/^export\s+(default\s+)?class\s+([^\s{]+)/gm, a, ["def", "name"]).reduce((b, {def:c, name:d}) => {
  b[c ? "default" : d] = d;
  return b;
}, {}), cf = a => Se(/^export\s+(const|let)\s+(\S+)\s+=/gm, a, ["type", "name"]).reduce((b, {name:c}) => {
  b[c] = c;
  return b;
}, {}), df = (a, b, c) => {
  b = Object.entries(b).map(([d, e]) => `'${d}': ${e},`);
  return `/* IDIO HOT RELOAD */
if (window.idioHotReload) {
  let i = 0
  idioHotReload('${a}', async () => {
    i++
    const module = await import(\`./${Va(a).replace(/\.jsx?$/, "")}?ihr=\${i}\`)
${Object.keys(c).map(d => `    if(\`\${${d}}\` != \`\${module['${d}']}\`) {
      console.log('Export %s updated', '${d}')
      ${d} = module['${d}']
    }`).join("\n")}
    return {
      module,
      classes: {
${b.map(d => `        ${d}`).join(R)}
      },
    }
  })
}`.replace(/\r?\n/g, R);
};
let ef;
const ff = jb(P(__dirname, "listener.js"));
function gf(a = {}) {
  const {directory:b = "frontend", pragma:c = "import { h } from 'preact'", mount:d = ".", override:e = {}, jsxOptions:f, exportClasses:g = !0, hotReload:h} = a;
  let {log:k} = a;
  !0 === k && (k = console.log);
  let l = Array.isArray(b) ? b : [b];
  l = l.map(q => {
    const r = P(d, q);
    if (!gb(r)) {
      throw Error(`Frontend directory ${q} does not exist.`);
    }
    return q.replace(/\\/g, "/");
  });
  let m = {}, p;
  h && ({watchers:p = {}} = h);
  let n = !1;
  return async(q, r) => {
    if (h && q.path == (h.path || "/hot-reload.js")) {
      q.type = "js", q.body = ff, n || (q = h.getServer(), m = Ve(q), n = !0);
    } else {
      var u = q.path.replace("/", "");
      if (!(l.includes(u) || l.some(y => u.startsWith(`${y}/`)) || q.path.startsWith("/node_modules/"))) {
        return r();
      }
      u = P(d, u).replace(/\\/g, "/");
      var {path:t, Pa:x} = await Re(u);
      if (x && !u.endsWith("/")) {
        r = d ? Q(d, t).replace(/\\/g, "/") : t, q.redirect(`/${r}`);
      } else {
        try {
          var w = await S(hb, t);
        } catch (y) {
          q.status = 404;
          return;
        }
        q.status = 200;
        q.etag = `${w.mtime.getTime()}`;
        if (q.fresh) {
          return q.status = 304, await r();
        }
        r = await le(t);
        w = (new Date).getTime();
        r = await hf(t, r, c, {mount:d, override:e, jsxOptions:f, exportClasses:g});
        var E = (new Date).getTime();
        k && k("%s patched in %sms", t, E - w);
        q.type = "application/javascript";
        if (h && !q.query.ib && ({ignoreNodeModules:w = !0} = h, !t.startsWith("node_modules") || !w)) {
          try {
            ef || (ef = require("node-watch"));
          } catch (y) {
            return console.log("Could not require node-watch for front-end hot reload."), console.log("Did you install node-watch?"), q.body = r;
          }
          t in p || (w = ef(t, (y, v) => {
            console.log("%s File %s changed", M("[frontend]", "grey"), M(v, "yellow"));
            Object.values(m).forEach(z => {
              z("update", {filename:v});
            });
          }), p[t] = w);
          w = bf(r);
          E = cf(r);
          w = df(t, w, E);
          r = r.replace(/export(\s+)const(\s+)(\S+)\s+=/, y => y.replace("const", "let"));
          r += `${R}${R}${w}`;
        }
        q.body = r;
      }
    }
  };
}
const hf = async(a, b, c, d) => {
  const e = d.jsxOptions, f = d.exportClasses;
  /\.jsx$/.test(a) && (b = Oe(b, e), c && (b = `${c}${R}${b}`));
  return b = /\.css$/.test(a) ? jf(b, {exportClasses:f, path:a}) : await $e(a, b, d);
}, jf = (a, {exportClasses:b = !0, path:c = ""} = {}) => {
  var d = [];
  b && (d = a.split(/\r?\n/).filter(e => /^\S/.test(e)).join(R), d = Se(/\.([\w\d_-]+)/g, d, ["className"]).map(({className:e}) => e).filter((e, f, g) => g.indexOf(e) == f));
  c = c.replace(/\.css$/, "").replace(/[/\\]/g, "-").replace(/[^\w\d_-]/g, "");
  return `(${af.toString().replace(/FRONTEND-STYLE-ID/g, c)})(\`${a}\`)
${d.map(e => `export const $${e} = '${e}'`).join(R)}`.replace(/\r?\n/g, R).trim();
};
const kf = {["static"](a, b, c) {
  const {root:d = [], mount:e, ...f} = c;
  if (!Array.isArray(d)) {
    return a = Gb(d, f), e ? Ja(e, a) : a;
  }
  a = d.map(g => Gb(g, {...f}));
  a = aa(a);
  return e ? Ja(e, a) : a;
}, ["compress"](a, b, c) {
  return Wb({flush:Qb.Z_SYNC_FLUSH, ...c});
}, session:function(a, b, c) {
  let {keys:d, keygrip:e, algorithm:f, ...g} = c;
  if (d && !Array.isArray(d)) {
    throw Error("session: Keys must be an array.");
  }
  if (f) {
    if (!(d && 0 in d)) {
      throw Error("To create a Keygrip instance with custom algorithm, keys must be provided.");
    }
    e = new Qa(d, f);
    Oc("Created Keygrip instance with %s algorithm", f);
  }
  if (!(!1 === g.signed || e || d && 0 in d)) {
    throw Error("Session keys are signed by default, unless you set signed=false, you must provide an array with keys.");
  }
  e ? Oc("session: Setting a Keygrip instance on the app") : d ? Oc("session: Setting an array of keys of length %s on the app", d.length) : Oc("session: the cookies won't be signed as no keys are provided.");
  a.keys = e || d;
  return Lc(g);
}, ["cors"](a, b, c) {
  const {origin:d, ...e} = c;
  a = Array.isArray(d) ? f => {
    const g = f.get("Origin");
    return d.find(h => h == g);
  } : d;
  return Ua({origin:a, ...e});
}, form:function(a, b, c) {
  const {any:d, array:e, none:f, fields:g, single:h, ...k} = c;
  return d ? (new ie(k)).any() : e ? (new ie(k)).array(e.name, e.maxFiles) : f ? (new ie(k)).none() : g ? (new ie(k)).fields(g) : h ? (new ie(k)).single(h) : new ie(k);
}, frontend:function(a, b, c, d, e) {
  !0 === c.hotReload && (c.hotReload = {});
  a = c.hotReload;
  let f;
  a && (a.getServer || (a.getServer = e.getServer), a.watchers ? f = a.watchers : (f = {}, a.watchers = f));
  c = gf(c);
  f && (c.watchers = f);
  return c;
}, csrfCheck:function(a, b, c) {
  return function(d, e) {
    const {body:f = !0, query:g = !0} = c;
    var h = d.session;
    h || d.throw(401, "Session does not exist.");
    (h = h.csrf) || d.throw(500, "CSRF is missing from session.");
    let k, l;
    f && (k = (d.request.body || {}).csrf);
    g && (l = d.query.csrf);
    h != (k || l) && d.throw(403, "Invalid CSRF token");
    return e();
  };
}, jsonErrors:function(a, b, c) {
  const {logClientErrors:d = !0, exposeStack:e = !1, clearIdio:f = !0} = c;
  return async function(g, h) {
    try {
      await h();
    } catch (k) {
      k.statusCode && 400 <= k.statusCode && 500 > k.statusCode && (k.message = k.message.replace(/^([^!])/, "!$1")), k.stack = wb(k.stack, f ? {ignoredModules:["@idio/idio"]} : void 0), k.message.startsWith("!") ? (g.body = {error:k.message.replace("!", ""), stack:e ? k.stack : void 0}, d && console.log(k.message)) : (g.body = {error:"internal server error", stack:e ? k.stack : void 0}, a.emit("error", k));
    }
  };
}, ["jsonBody"]() {
  return async function(a, b) {
    if (!a.is("json")) {
      return b();
    }
    let c = await hc(a.req);
    try {
      c = JSON.parse(c);
    } catch (d) {
      a.throw(400, "Could not parse JSON.");
    }
    a.request.body = c;
    return b();
  };
}, ["github"](a, b, c, d) {
  if (!d.session) {
    throw Error("You need to configure session before GitHub middleware.");
  }
  let {path:e, paths:f, redirectPath:g, scope:h, ...k} = c;
  if (f && !g) {
    throw Error("When giving multiple paths, the redirect path is also required.");
  }
  f || (f = {[e]:h});
  Object.entries(f).forEach(([l, m]) => {
    tc(a, {path:l, scope:m, redirectPath:g, ...k, session:d.session});
  });
}};
async function lf(a, b, c, d, e = {}) {
  if ("function" == typeof b) {
    return c.use(b), b;
  }
  const {use:f, config:g = {}, middlewareConstructor:h, ...k} = b;
  if (a in kf) {
    b = kf[a];
  } else {
    if (h) {
      if (b = h, "function" != typeof b) {
        throw Error(`Expecting a function in the "middlewareConstructor" of the ${a} middleware.`);
      }
    } else {
      throw Error(`Unknown middleware config item "${a}". Either specify one from the idio bundle, or pass the "middlewareConstructor" property.`);
    }
  }
  a = await b(c, g, k, d, e);
  f && c.use(a);
  return a;
}
async function mf(a, b, c = {}) {
  const {neoluddite:d, ...e} = a;
  if (d) {
    const {app:f, env:g, key:h, host:k = "https://neoluddite.dev"} = d;
    if (!h) {
      throw Error("key is expected for neoluddite integration.");
    }
    b.use(ke(f, g, k, h));
  }
  return await Object.keys(e).reduce(async(f, g) => {
    f = await f;
    var h = a[g];
    Array.isArray(h) ? (h = h.map(async k => await lf(g, k, b, f, c)), h = await Promise.all(h)) : h = await lf(g, h, b, f, c);
    return {...f, [g]:h};
  }, {});
}
;/*
 MIT 2014 Jordan Harband
 https://github.com/ljharb/is-generator-function
*/
const nf = Object.prototype.toString, of = Function.prototype.toString, pf = /^\s*(?:function)?\*/, qf = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, rf = Object.getPrototypeOf;
var sf;
a: {
  if (qf) {
    try {
      sf = Function("return function*() {}")();
      break a;
    } catch (a) {
    }
    sf = void 0;
  } else {
    sf = !1;
  }
}
const tf = sf, uf = tf ? rf(tf) : {};
/*
 ee-first
 Copyright(c) 2014 Jonathan Ong
 MIT Licensed
*/
function vf(a, b) {
  function c() {
    d();
    b.apply(null, arguments);
  }
  function d() {
    for (var n, q = 0; q < f.length; q++) {
      n = f[q], n.Ca.removeListener(n.event, n.Ia);
    }
  }
  function e(n) {
    b = n;
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
      var m = h[l], p = wf(m, c);
      k.on(m, p);
      f.push({Ca:k, event:m, Ia:p});
    }
  }
  e.cancel = d;
  return e;
}
function wf(a, b) {
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
function xf(a, b) {
  var c = a.socket;
  c = "boolean" == typeof a.finished ? !!(a.finished || c && !c.writable) : "boolean" == typeof a.complete ? !(!a.upgrade && c && c.readable && (!a.complete || a.readable)) : void 0;
  !1 !== c ? setImmediate(b, null, a) : (c = a.__onFinished, c && c.S || (c = a.__onFinished = yf(a), zf(a, c)), c.S.push(b));
}
function zf(a, b) {
  function c(h) {
    g.cancel();
    e.cancel();
    f = !0;
    b(h);
  }
  function d(h) {
    a.removeListener("socket", d);
    f || g === e && (e = vf([[h, "error", "close"]], c));
  }
  var e, f = !1;
  var g = e = vf([[a, "end", "finish"]], c);
  if (a.socket) {
    d(a.socket);
  } else {
    a.on("socket", d);
  }
}
function yf(a) {
  function b(c) {
    a.__onFinished === b && (a.__onFinished = null);
    if (b.S) {
      var d = b.S;
      b.S = null;
      for (var e = 0; e < d.length; e++) {
        d[e](c, a);
      }
    }
  }
  b.S = [];
  return b;
}
;/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 https://npmjs.org/destroy
*/
function Af(a) {
  if (a instanceof cb) {
    a.destroy();
    if ("function" == typeof a.close) {
      a.on("open", Bf);
    }
    return a;
  }
  if (!(a instanceof Mb)) {
    return a;
  }
  "function" == typeof a.destroy && a.destroy();
  return a;
}
function Bf() {
  "number" == typeof this.fd && this.close();
}
;/*
 MIT
 Copyright (c) 2014 Jonathan Ong <me@jongleberry.com>
 Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com>
 https://npmjs.com/package/mime-types
*/
const Cf = require("mime-db"), Df = /^\s*([^;\s]*)(?:;|\s|$)/, Ef = /^text\//i, Ff = Object.create(null), Gf = Object.create(null);
Hf();
function If(a) {
  return a && "string" == typeof a ? (a = Xa("x." + a).toLowerCase().substr(1)) ? Gf[a] || !1 : !1 : !1;
}
function Hf() {
  const a = ["nginx", "apache", void 0, "iana"];
  Object.keys(Cf).forEach(b => {
    const c = Cf[b], d = c.extensions;
    if (d && d.length) {
      Ff[b] = d;
      for (let e = 0; e < d.length; e++) {
        const f = d[e];
        if (Gf[f]) {
          const g = a.indexOf(Cf[Gf[f]].source), h = a.indexOf(c.source);
          if ("application/octet-stream" != Gf[f] && (g > h || g == h && "application/" == Gf[f].substr(0, 12))) {
            continue;
          }
        }
        Gf[f] = b;
      }
    }
  });
}
;/*
 MIT content-type
 2015 Douglas Christopher Wilson
*/
const Jf = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g, Kf = /\\([\u000b\u0020-\u00ff])/g, Lf = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
function Mf(a) {
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
  if (!Lf.test(c)) {
    throw new TypeError("invalid media type");
  }
  c = new Nf(c.toLowerCase());
  if (-1 != b) {
    let e;
    var d;
    for (Jf.lastIndex = b; d = Jf.exec(a);) {
      if (d.index !== b) {
        throw new TypeError("invalid parameter format");
      }
      b += d[0].length;
      e = d[1].toLowerCase();
      d = d[2];
      '"' == d[0] && (d = d.substr(1, d.length - 2).replace(Kf, "$1"));
      c.parameters[e] = d;
    }
    if (b != a.length) {
      throw new TypeError("invalid parameter format");
    }
  }
  return c;
}
class Nf {
  constructor(a) {
    this.parameters = {};
    this.type = a;
  }
}
;/*
 MIT media-typer
 2014-2017 Douglas Christopher Wilson
*/
const Of = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;
/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2015 Douglas Christopher Wilson
 https://npmjs.org/type-is
*/
function Pf(a, b) {
  var c = [];
  if ("string" != typeof a) {
    var d = null;
  } else {
    try {
      var {type:e} = Mf(a);
      if (!e) {
        throw new TypeError("argument string is required");
      }
      if ("string" != typeof e) {
        throw new TypeError("argument string is required to be a string");
      }
      d = Of.test(e.toLowerCase()) ? e : null;
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
    var f = Qf(d = b[c]);
    !1 === f ? e = !1 : (e = a.split("/"), f = f.split("/"), e = 2 != e.length || 2 != f.length || "*" != f[0] && f[0] != e[0] ? !1 : "*+" == f[1].substr(0, 2) ? f[1].length <= e[1].length + 1 && f[1].substr(1) == e[1].substr(1 - f[1].length) : "*" != f[1] && f[1] != e[1] ? !1 : !0);
    if (e) {
      return "+" == d[0] || -1 !== d.indexOf("*") ? a : d;
    }
  }
  return !1;
}
function Rf(a, b, ...c) {
  var d = a.headers;
  d = void 0 !== d["transfer-encoding"] || !isNaN(d["content-length"]);
  if (!d) {
    return null;
  }
  2 < arguments.length && (b = [b, ...c]);
  return Pf(a.headers["content-type"], b);
}
function Qf(a) {
  if ("string" != typeof a) {
    return !1;
  }
  switch(a) {
    case "urlencoded":
      return "application/x-www-form-urlencoded";
    case "multipart":
      return "multipart/*";
  }
  return "+" == a[0] ? "*/*" + a : -1 == a.indexOf("/") ? If(a) : a;
}
;/*
 content-disposition
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
var Sf = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g, Tf = /%[0-9A-Fa-f]{2}/, Uf = /[^\x20-\x7e\xa0-\xff]/g, Vf = /([\\"])/g, Wf = /^[\x20-\x7e\x80-\xff]+$/, Xf = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/;
function Yf(a, b = {}) {
  const {type:c = "attachment", fallback:d = !0} = b;
  a = Zf(a, d);
  return $f(new ag(c, a));
}
function Zf(a, b = !0) {
  if (void 0 !== a) {
    var c = {};
    if ("string" != typeof a) {
      throw new TypeError("filename must be a string");
    }
    if ("string" != typeof b && "boolean" != typeof b) {
      throw new TypeError("fallback must be a string or boolean");
    }
    if ("string" == typeof b && Uf.test(b)) {
      throw new TypeError("fallback must be ISO-8859-1 string");
    }
    a = Va(a);
    var d = Wf.test(a);
    b = "string" != typeof b ? b && String(a).replace(Uf, "?") : Va(b);
    var e = "string" == typeof b && b != a;
    if (e || !d || Tf.test(a)) {
      c["filename*"] = a;
    }
    if (d || e) {
      c.filename = e ? b : a;
    }
    return c;
  }
}
function $f({parameters:a, type:b}) {
  if ("string" != typeof b || !Xf.test(b)) {
    throw new TypeError("invalid type");
  }
  b = `${b}`.toLowerCase();
  if (a && "object" == typeof a) {
    let c;
    const d = Object.keys(a).sort();
    for (let e = 0; e < d.length; e++) {
      c = d[e];
      const f = "*" == c.substr(-1) ? "UTF-8''" + encodeURIComponent(String(a[c])).replace(Sf, bg) : '"' + String(a[c]).replace(Vf, "\\$1") + '"';
      b += "; " + c + "=" + f;
    }
  }
  return b;
}
function bg(a) {
  return "%" + String(a).charCodeAt(0).toString(16).toUpperCase();
}
class ag {
  constructor(a, b) {
    this.type = a;
    this.parameters = b;
  }
}
;/*
 MIT
 Author dead_horse <dead_horse@qq.com>
 https://github.com/node-modules/error-inject
*/
function cg(a, b) {
  if (a instanceof Mb && !a.listeners("error").includes(b)) {
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
function dg(a, b, c) {
  a.cache.set(b, c);
  a.size++;
  a.size >= a.max && (a.size = 0, a.a = a.cache, a.cache = new Map);
}
class eg {
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
    b = b.maxAge;
    let e;
    if (d) {
      return d.w && c() > d.w ? (d.w = 0, d.value = void 0) : void 0 !== b && (a = b ? c() + b : 0, d.w = a), d.value;
    }
    if (d = this.a.get(a)) {
      return d.w && c() > d.w ? (d.w = 0, d.value = void 0) : (dg(this, a, d), void 0 !== b && (a = b ? c() + b : 0, d.w = a)), d.value;
    }
  }
  set(a, b, c = {}) {
    c = (c = c.maxAge) ? Date.now() + c : 0;
    let d = this.cache.get(a);
    d ? (d.w = c, d.value = b) : (d = {value:b, w:c}, dg(this, a, d));
  }
  keys() {
    function a(d) {
      const e = d[0], f = d[1];
      (d[1].value && !d[1].w || f.w >= c) && b.add(e);
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
const fg = new eg(100);
/*
 escape-html
 Copyright(c) 2012-2013 TJ Holowaychuk
 Copyright(c) 2015 Andreas Lubbe
 Copyright(c) 2015 Tiancheng "Timothy" Gu
 MIT Licensed
*/
var gg = /["'&<>]/;
const hg = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, ig = /^(?:lax|strict)$/i;
function jg(a) {
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
class kg {
  constructor(a, b, c) {
    this.path = "/";
    this.maxAge = this.domain = this.expires = void 0;
    this.httpOnly = !0;
    this.overwrite = this.secure = this.sameSite = !1;
    if (!hg.test(a)) {
      throw new TypeError("argument name is invalid");
    }
    if (b && !hg.test(b)) {
      throw new TypeError("argument value is invalid");
    }
    b || (this.expires = new Date(0));
    this.name = a;
    this.value = b || "";
    for (let d in c) {
      this[d] = c[d];
    }
    if (this.path && !hg.test(this.path)) {
      throw new TypeError("option path is invalid");
    }
    if (this.domain && !hg.test(this.domain)) {
      throw new TypeError("option domain is invalid");
    }
    if (this.sameSite && !0 !== this.sameSite && !ig.test(this.sameSite)) {
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
const lg = {};
class mg {
  constructor(a, b, c) {
    this.secure = void 0;
    this.request = a;
    this.response = b;
    c && (this.keys = Array.isArray(c.keys) ? new Qa(c.keys) : c.keys, this.secure = c.secure);
  }
  get(a, b) {
    const c = `${a}.sig`;
    var d;
    const e = b && void 0 !== b.signed ? b.signed : !!this.keys;
    if (d = this.request.headers.cookie) {
      if (d = d.match(lg[a] ? lg[a] : lg[a] = new RegExp("(?:^|;) *" + a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "=([^;]*)"))) {
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
  set(a, b, c = {}) {
    const d = this.response;
    var e = this.request;
    let f = d.getHeader("Set-Cookie") || [];
    "string" == typeof f && (f = [f]);
    var g = e.protocol;
    e = e.connection.encrypted;
    g = void 0 !== this.secure ? !!this.secure : "https" == g || e;
    const {signed:h = !!this.keys, ...k} = c;
    a = new kg(a, b, k);
    if (!g && c.secure) {
      throw Error("Cannot send secure cookie over unencrypted connection");
    }
    a.secure = g;
    "secure" in c || (a.secure = g);
    ng(f, a);
    if (c && h) {
      if (!this.keys) {
        throw Error(".keys required for signed cookies");
      }
      a.value = this.keys.sign(a.toString());
      a.name += ".sig";
      ng(f, a);
    }
    (d.set ? Zb.prototype.setHeader : d.setHeader).call(d, "Set-Cookie", f);
    return this;
  }
}
function ng(a, b) {
  if (b.overwrite) {
    for (var c = a.length - 1; 0 <= c; c--) {
      0 === a[c].indexOf(b.name + "=") && a.splice(c, 1);
    }
  }
  a.push(jg(b));
}
;const og = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function pg(a) {
  return a.split(",").map((b, c) => {
    var d = og.exec(b.trim());
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
      c = {charset:b, q:e, j:c};
    } else {
      c = null;
    }
    if (c) {
      return c;
    }
  }).filter(Boolean);
}
function qg(a, b) {
  const c = pg(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(rg).sort(sg).map(tg);
  }
  const d = b.map((e, f) => {
    {
      let h = {m:-1, q:0, s:0};
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
          g = {j:f, s:l, m:g.j, q:g.q};
        }
        g && 0 > (h.s - g.s || h.q - g.q || h.m - g.m) && (h = g);
      }
      e = h;
    }
    return e;
  });
  return d.filter(rg).sort(sg).map(e => b[d.indexOf(e)]);
}
function sg(a, b) {
  return b.q - a.q || b.s - a.s || a.m - b.m || a.j - b.j || 0;
}
function tg(a) {
  return a.charset;
}
function rg(a) {
  return 0 < a.q;
}
;const ug = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function vg(a) {
  a = a.split(",");
  for (var b = !1, c = 1, d = 0, e = 0; d < a.length; d++) {
    var f = d;
    var g = ug.exec(a[d].trim());
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
      f = {encoding:h, q:k, j:f};
    } else {
      f = null;
    }
    f && (a[e++] = f, b = b || wg("identity", f, void 0), c = Math.min(c, f.q || 1));
  }
  b || (a[e++] = {encoding:"identity", q:c, j:d});
  a.length = e;
  return a;
}
function wg(a, b, c) {
  var d = 0;
  if (b.encoding.toLowerCase() === a.toLowerCase()) {
    d |= 1;
  } else {
    if ("*" !== b.encoding) {
      return null;
    }
  }
  return {j:c, m:b.j, q:b.q, s:d};
}
function xg(a, b) {
  var c = vg(a || "");
  if (!b) {
    return c.filter(yg).sort(zg).map(Ag);
  }
  var d = b.map(function(e, f) {
    for (var g = {m:-1, q:0, s:0}, h = 0; h < c.length; h++) {
      var k = wg(e, c[h], f);
      k && 0 > (g.s - k.s || g.q - k.q || g.m - k.m) && (g = k);
    }
    return g;
  });
  return d.filter(yg).sort(zg).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function zg(a, b) {
  return b.q - a.q || b.s - a.s || a.m - b.m || a.j - b.j || 0;
}
function Ag(a) {
  return a.encoding;
}
function yg(a) {
  return 0 < a.q;
}
;const Bg = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
function Cg(a) {
  a = a.split(",");
  for (var b = 0, c = 0; b < a.length; b++) {
    var d = Dg(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function Dg(a, b) {
  var c = Bg.exec(a);
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
  return {prefix:a, P:d, q:f, j:b, M:e};
}
function Eg(a, b) {
  var c = Cg(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(Fg).sort(Gg).map(Hg);
  }
  var d = b.map(function(e, f) {
    for (var g = {m:-1, q:0, s:0}, h = 0; h < c.length; h++) {
      a: {
        var k = c[h];
        var l = f, m = Dg(e, void 0);
        if (m) {
          var p = 0;
          if (k.M.toLowerCase() === m.M.toLowerCase()) {
            p |= 4;
          } else {
            if (k.prefix.toLowerCase() === m.M.toLowerCase()) {
              p |= 2;
            } else {
              if (k.M.toLowerCase() === m.prefix.toLowerCase()) {
                p |= 1;
              } else {
                if ("*" !== k.M) {
                  k = null;
                  break a;
                }
              }
            }
          }
          k = {j:l, m:k.j, q:k.q, s:p};
        } else {
          k = null;
        }
      }
      k && 0 > (g.s - k.s || g.q - k.q || g.m - k.m) && (g = k);
    }
    return g;
  });
  return d.filter(Fg).sort(Gg).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function Gg(a, b) {
  return b.q - a.q || b.s - a.s || a.m - b.m || a.j - b.j || 0;
}
function Hg(a) {
  return a.M;
}
function Fg(a) {
  return 0 < a.q;
}
;const Ig = /^\s*([^s/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
function Jg(a) {
  a = a.split(",");
  for (var b = 1, c = 0; b < a.length; b++) {
    0 == Kg(a[c]) % 2 ? a[++c] = a[b] : a[c] += "," + a[b];
  }
  a.length = c + 1;
  for (c = b = 0; b < a.length; b++) {
    var d = Lg(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function Lg(a, b) {
  var c = Ig.exec(a);
  if (!c) {
    return null;
  }
  a = Object.create(null);
  var d = 1, e = c[2], f = c[1];
  if (c[3]) {
    c = c[3].split(";");
    for (var g = 1, h = 0; g < c.length; g++) {
      0 == Kg(c[h]) % 2 ? c[++h] = c[g] : c[h] += ";" + c[g];
    }
    c.length = h + 1;
    for (g = 0; g < c.length; g++) {
      c[g] = c[g].trim();
    }
    c = c.map(Mg);
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
  return {type:f, W:e, params:a, q:d, j:b};
}
function Ng(a, b, c) {
  var d = Lg(a, void 0);
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
  if (b.W.toLowerCase() == d.W.toLowerCase()) {
    a |= 2;
  } else {
    if ("*" != b.W) {
      return null;
    }
  }
  var e = Object.keys(b.params);
  if (0 < e.length) {
    if (e.every(function(f) {
      return "*" == b.params[f] || (b.params[f] || "").toLowerCase() == (d.params[f] || "").toLowerCase();
    })) {
      a |= 1;
    } else {
      return null;
    }
  }
  return {j:c, m:b.j, q:b.q, s:a};
}
function Og(a, b) {
  var c = Jg(void 0 === a ? "*/*" : a || "");
  if (!b) {
    return c.filter(Pg).sort(Qg).map(Rg);
  }
  var d = b.map(function(e, f) {
    for (var g = {m:-1, q:0, s:0}, h = 0; h < c.length; h++) {
      var k = Ng(e, c[h], f);
      k && 0 > (g.s - k.s || g.q - k.q || g.m - k.m) && (g = k);
    }
    return g;
  });
  return d.filter(Pg).sort(Qg).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function Qg(a, b) {
  return b.q - a.q || b.s - a.s || a.m - b.m || a.j - b.j || 0;
}
function Rg(a) {
  return a.type + "/" + a.W;
}
function Pg(a) {
  return 0 < a.q;
}
function Kg(a) {
  for (var b = 0, c = 0; -1 !== (c = a.indexOf('"', c));) {
    b++, c++;
  }
  return b;
}
function Mg(a) {
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
class Sg {
  constructor(a) {
    this.request = a;
    this.headers = this.request.headers;
  }
  charset(a) {
    return (a = this.charsets(a)) && a[0];
  }
  charsets(a) {
    return qg(this.headers["accept-charset"], a);
  }
  encoding(a) {
    return (a = this.encodings(a)) && a[0];
  }
  encodings(a) {
    return xg(this.headers["accept-encoding"], a);
  }
  language(a) {
    return (a = this.languages(a)) && a[0];
  }
  languages(a) {
    return Eg(this.headers["accept-language"], a);
  }
  mediaType(a) {
    return (a = this.mediaTypes(a)) && a[0];
  }
  mediaTypes(a) {
    return Og(this.headers.accept, a);
  }
}
;/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2015 Douglas Christopher Wilson
 https://npmjs.org/accepts
*/
class Tg {
  constructor(a) {
    this.headers = a.headers;
    this.a = new Sg(a);
  }
  types(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    if (!a || 0 == a.length) {
      return this.a.mediaTypes();
    }
    if (!this.headers.accept) {
      return a[0];
    }
    b = a.map(Ug);
    var c = this.a.mediaTypes(b.filter(Vg));
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
function Ug(a) {
  return -1 == a.indexOf("/") ? If(a) : a;
}
function Vg(a) {
  return "string" == typeof a;
}
;/*
 MIT Copyright (c) 2015 TJ Holowaychuk <tj@vision-media.ca>
 https://npmjs.org/delegates
*/
function Z(a, b) {
  const c = a.a, d = a.target;
  a.c.push(b);
  c.__defineGetter__(b, function() {
    return this[d][b];
  });
  return a;
}
function Wg(a, b) {
  var c = a.a, d = a.target;
  a.g.push(b);
  c.__defineSetter__(b, function(e) {
    return this[d][b] = e;
  });
  return a;
}
class Xg {
  constructor(a, b) {
    this.a = a;
    this.target = b;
    this.methods = [];
    this.c = [];
    this.g = [];
  }
  method(a) {
    const b = this.a, c = this.target;
    this.methods.push(a);
    b[a] = function() {
      return this[c][a].apply(this[c], arguments);
    };
    return this;
  }
  access(a) {
    return Wg(Z(this, a), a);
  }
}
;/*
 MIT jshttp/http-assert
*/
function Yg(a, b, c, d) {
  if (!a) {
    throw J(b, c, d);
  }
}
;const Zg = net.isIP;
/*
 parseurl
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
function $g(a) {
  var b = a.url;
  if (void 0 !== b) {
    var c = a._parsedUrl;
    if ("object" === typeof c && null !== c && (void 0 === cc || c instanceof cc) && c._raw === b) {
      return c;
    }
    a: {
      if ("string" !== typeof b || 47 !== b.charCodeAt(0)) {
        c = ec(b);
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
              c = ec(b);
              break a;
          }
        }
        f = void 0 !== cc ? new cc : {};
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
var ah = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;
function bh(a, b) {
  var c = a["if-modified-since"], d = a["if-none-match"];
  if (!c && !d || (a = a["cache-control"]) && ah.test(a)) {
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
  return !c || (b = b["last-modified"], b && ch(b) <= ch(c)) ? !0 : !1;
}
function ch(a) {
  a = a && Date.parse(a);
  return "number" === typeof a ? a : NaN;
}
;const dh = Symbol("context#ip");
class eh {
  constructor() {
    this.res = this.req = this.response = this.ctx = this.app = null;
    this.originalUrl = "";
    this.la = {};
    this.Y = this.V = null;
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
    return $g(this.req).pathname;
  }
  set path(a) {
    const b = $g(this.req);
    b.pathname !== a && (b.pathname = a, b.path = null, this.url = dc(b));
  }
  get query() {
    const a = this.querystring, b = this.la = this.la || {};
    return b[a] || (b[a] = qc(a));
  }
  set query(a) {
    this.querystring = rc(a);
  }
  get querystring() {
    return this.req ? $g(this.req).query || "" : "";
  }
  set querystring(a) {
    const b = $g(this.req);
    b.search !== `?${a}` && (b.search = a, b.path = null, this.url = dc(b));
  }
  get search() {
    return this.querystring ? `?${this.querystring}` : "";
  }
  set search(a) {
    this.querystring = a;
  }
  get host() {
    let a = this.app.proxy && this.get("X-Forwarded-Host");
    a || (2 <= this.req.httpVersionMajor && (a = this.get(":authority")), a || (a = this.get("Host")));
    return a ? a.split(/\s*,\s*/, 1)[0] : "";
  }
  get hostname() {
    const a = this.host;
    return a ? "[" == a[0] ? this.URL.hostname || "" : a.split(":", 1)[0] : "";
  }
  get URL() {
    if (!this.V) {
      const a = this.originalUrl || "";
      try {
        this.V = new bc(`${this.origin}${a}`);
      } catch (b) {
        this.V = Object.create(null);
      }
    }
    return this.V;
  }
  get fresh() {
    const a = this.method, b = this.ctx.status;
    return "GET" != a && "HEAD" != a ? !1 : 200 <= b && 300 > b || 304 == b ? bh(this.header, this.response.header) : !1;
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
      const {parameters:a} = Mf(this.req);
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
    const a = this.app.proxy, b = this.get("X-Forwarded-For");
    return a && b ? b.split(/\s*,\s*/) : [];
  }
  get ip() {
    this[dh] || (this[dh] = this.ips[0] || this.socket.remoteAddress || "");
    return this[dh];
  }
  set ip(a) {
    this[dh] = a;
  }
  get subdomains() {
    const a = this.app.subdomainOffset, b = this.hostname;
    return Zg(b) ? [] : b.split(".").reverse().slice(a);
  }
  get accept() {
    return this.Y || (this.Y = new Tg(this.req));
  }
  set accept(a) {
    this.Y = a;
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
      return Rf(this.req);
    }
    Array.isArray(a) || (a = [a, ...b]);
    return Rf(this.req, a);
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
  [oa.custom]() {
    return this.inspect();
  }
}
;const fh = Symbol("context#cookies");
class gh {
  constructor() {
    this.state = this.originalUrl = this.res = this.req = this.response = this.request = this.app = null;
    this[fh] = null;
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
    return Yg;
  }
  throw(...a) {
    throw J(...a);
  }
  onerror(a) {
    if (null != a) {
      a instanceof Error || (a = Error(na("non-error thrown: %j", a)));
      var b = !1;
      if (this.headerSent || !this.writable) {
        b = a.headerSent = !0;
      }
      this.app.emit("error", a, this);
      if (!b) {
        var c = this.res;
        c.getHeaderNames().forEach(d => c.removeHeader(d));
        this.set(a.headers);
        this.type = "text";
        "ENOENT" == a.code && (a.status = 404);
        "number" == typeof a.status && I[a.status] || (a.status = 500);
        b = I[a.status];
        b = a.expose ? a.message : b;
        this.status = a.status;
        this.length = Buffer.byteLength(b);
        c.end(b);
      }
    }
  }
  get cookies() {
    this[fh] || (this[fh] = new mg(this.req, this.res, {keys:this.app.keys, secure:this.request.secure}));
    return this[fh];
  }
  set cookies(a) {
    this[fh] = a;
  }
  [oa.custom]() {
    return this.inspect();
  }
}
Z(Z((new Xg(gh.prototype, "response")).method("attachment").method("redirect").method("remove").method("vary").method("set").method("append").method("flushHeaders").access("status").access("message").access("body").access("length").access("type").access("lastModified").access("etag"), "headerSent"), "writable");
Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z((new Xg(gh.prototype, "request")).method("acceptsLanguages").method("acceptsEncodings").method("acceptsCharsets").method("accepts").method("get").method("is").access("querystring").access("idempotent").access("socket").access("search").access("method").access("query").access("path").access("url").access("accept"), "origin"), "href"), "subdomains"), "protocol"), "host"), "hostname"), "URL"), "header"), "headers"), "secure"), "stale"), "fresh"), "ips"), "ip");
class hh {
  constructor() {
    this.c = this.res = this.req = this.request = this.ctx = this.app = null;
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
    this.headerSent || (K(Number.isInteger(a), "status code must be a number"), K(100 <= a && 999 >= a, `invalid status code: ${a}`), this.c = !0, this.res.statusCode = a, 2 > this.req.httpVersionMajor && (this.res.statusMessage = I[a]), this.body && ha[a] && (this.body = null));
  }
  get message() {
    return this.res.statusMessage || I[this.status];
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
      ha[this.status] || (this.status = 204), this.remove("Content-Type"), this.remove("Content-Length"), this.remove("Transfer-Encoding");
    } else {
      this.c || (this.status = 200);
      var c = !this.header["content-type"];
      "string" == typeof a ? (c && (this.type = /^\s*</.test(a) ? "html" : "text"), this.length = Buffer.byteLength(a)) : Buffer.isBuffer(a) ? (c && (this.type = "bin"), this.length = a.length) : "function" == typeof a.pipe ? (xf(this.res, Af.bind(null, a)), cg(a, d => this.ctx.onerror(d)), null != b && b != a && this.remove("Content-Length"), c && (this.type = "bin")) : (this.remove("Content-Length"), this.type = "json");
    }
  }
  set length(a) {
    this.set("Content-Length", a);
  }
  get length() {
    const a = this.header["content-length"], b = this.body;
    return null == a ? b ? "string" == typeof b ? Buffer.byteLength(b) : Buffer.isBuffer(b) ? b.length : Lb(b) ? Buffer.byteLength(JSON.stringify(b)) : null : null : Math.trunc(parseInt(a, 10)) || 0;
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
        let c = b.getHeader("Vary") || "";
        const d = Array.isArray(c) ? c.join(", ") : `${c}`;
        (c = Sa(d, a)) && b.setHeader("Vary", c);
      }
    }
  }
  redirect(a, b) {
    "back" == a && (a = this.ctx.get("Referrer") || b || "/");
    this.set("Location", a);
    fa[this.status] || (this.status = 302);
    if (this.ctx.accepts("html")) {
      var c = gg.exec(a);
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
    a && (this.type = Xa(a));
    this.set("Content-Disposition", Yf(a, b));
  }
  set type(a) {
    var b = fg.get(a);
    if (!b) {
      if (a && "string" == typeof a) {
        if (b = -1 == a.indexOf("/") ? If(a) : a) {
          if (!b.includes("charset")) {
            var c;
            if (b && "string" == typeof b) {
              var d = (c = Df.exec(b)) && Cf[c[1].toLowerCase()];
              c = d && d.charset ? d.charset : c && Ef.test(c[1]) ? "UTF-8" : !1;
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
      fg.set(a, b);
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
    return Pf(c, a);
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
  [oa.custom]() {
    return this.inspect();
  }
}
;const ih = N("@goa/koa:application");
async function jh(a, b) {
  const c = a.res;
  c.statusCode = 404;
  xf(c, d => a.onerror(d));
  try {
    return await b(a), kh(a);
  } catch (d) {
    a.onerror(d);
  }
}
class lh extends Pc {
  constructor(a = {}) {
    const {proxy:b = !1, subdomainOffset:c = 2, env:d = process.env.NODE_ENV || "development", keys:e, Context:f = gh} = a;
    super();
    this.proxy = b;
    this.silent = !1;
    this.middleware = [];
    this.subdomainOffset = c;
    this.env = d;
    this.context = Object.create(f.prototype);
    this.request = Object.create(eh.prototype);
    this.response = Object.create(hh.prototype);
    this.keys = e;
  }
  [oa.custom]() {
    return this.inspect();
  }
  listen(...a) {
    ih("listen");
    return $b(this.callback()).listen(...a);
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
    if ("function" != typeof a ? 0 : pf.test(of.call(a)) || (qf ? rf(a) == uf : "[object GeneratorFunction]" == nf.call(a))) {
      throw Error("Generator functions are not supported by @goa/koa. Use koa-convert on them first.");
    }
    ih("use %s", a.cb || a.name || "-");
    this.middleware.push(a);
    return this;
  }
  callback() {
    const a = aa(this.middleware);
    if (!this.listenerCount("error")) {
      this.on("error", this.onerror);
    }
    return (b, c) => {
      b = this.createContext(b, c);
      return jh(b, a);
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
      throw new TypeError(na("non-error thrown: %j", a));
    }
    404 == a.status || a.expose || this.silent || (a = a.stack || a.toString(), console.error(), console.error(a.replace(/^/gm, "  ")), console.error());
  }
}
function kh(a) {
  if (0 != a.respond && a.writable) {
    var b = a.res, c = a.status, d = a.body;
    if (ha[c]) {
      return a.body = null, b.end();
    }
    if ("HEAD" == a.method) {
      return !b.headersSent && Lb(d) && (a.length = Buffer.byteLength(JSON.stringify(d))), b.end();
    }
    if (null == d) {
      return d = 2 <= a.req.httpVersionMajor ? String(c) : a.message || String(c), b.headersSent || (a.type = "text", a.length = Buffer.byteLength(d)), b.end(d);
    }
    if (Buffer.isBuffer(d)) {
      return b.end(d);
    }
    if ("string" == typeof d) {
      return b.end(d);
    }
    if (d instanceof Mb) {
      return d.pipe(b);
    }
    d = JSON.stringify(d);
    b.headersSent || (a.length = Buffer.byteLength(d));
    b.end(d);
  }
}
;/*
 path-to-regexp
 The MIT License (MIT)
 Copyright (c) 2014 Blake Embrey (hello@blakeembrey.com)
*/
function mh(a) {
  const b = [];
  let c = 0;
  for (; c < a.length;) {
    var d = a[c];
    if ("*" === d || "+" === d || "?" === d) {
      b.push({type:"MODIFIER", index:c, value:a[c++]});
    } else {
      if ("\\" === d) {
        b.push({type:"ESCAPED_CHAR", index:c++, value:a[c++]});
      } else {
        if ("{" === d) {
          b.push({type:"OPEN", index:c, value:a[c++]});
        } else {
          if ("}" === d) {
            b.push({type:"CLOSE", index:c, value:a[c++]});
          } else {
            if (":" === d) {
              d = "";
              for (var e = c + 1; e < a.length;) {
                var f = a.charCodeAt(e);
                if (48 <= f && 57 >= f || 65 <= f && 90 >= f || 97 <= f && 122 >= f || 95 === f) {
                  d += a[e++];
                } else {
                  break;
                }
              }
              if (!d) {
                throw new TypeError(`Missing parameter name at ${c}`);
              }
              b.push({type:"NAME", index:c, value:d});
              c = e;
            } else {
              if ("(" === d) {
                d = 1;
                e = "";
                f = c + 1;
                if ("?" === a[f]) {
                  throw new TypeError(`Pattern cannot start with '?' at ${f}`);
                }
                for (; f < a.length;) {
                  if ("\\" === a[f]) {
                    e += a[f++] + a[f++];
                  } else {
                    if (")" === a[f]) {
                      if (d--, 0 === d) {
                        f++;
                        break;
                      }
                    } else {
                      if ("(" === a[f] && (d++, "?" !== a[f + 1])) {
                        throw new TypeError(`Capturing groups are not allowed at ${f}`);
                      }
                    }
                    e += a[f++];
                  }
                }
                if (d) {
                  throw new TypeError(`Unbalanced pattern at ${c}`);
                }
                if (!e) {
                  throw new TypeError(`Missing pattern at ${c}`);
                }
                b.push({type:"PATTERN", index:c, value:e});
                c = f;
              } else {
                b.push({type:"CHAR", index:c, value:a[c++]});
              }
            }
          }
        }
      }
    }
  }
  b.push({type:"END", index:c, value:""});
  return b;
}
function nh(a, b = {}) {
  const c = mh(a);
  ({lb:a = "./"} = b);
  b = `[^${oh(b.delimiter || "/#?")}]+?`;
  const d = [];
  let e = 0, f = 0, g = "";
  const h = q => {
    if (f < c.length && c[f].type === q) {
      return c[f++].value;
    }
  }, k = q => {
    const r = h(q);
    if (void 0 !== r) {
      return r;
    }
    const {type:u, index:t} = c[f];
    throw new TypeError(`Unexpected ${u} at ${t}, expected ${q}`);
  }, l = () => {
    let q = "", r;
    for (; r = h("CHAR") || h("ESCAPED_CHAR");) {
      q += r;
    }
    return q;
  };
  for (; f < c.length;) {
    var m = h("CHAR"), p = h("NAME"), n = h("PATTERN");
    if (p || n) {
      m = m || "", -1 === a.indexOf(m) && (g += m, m = ""), g && (d.push(g), g = ""), d.push({name:p || e++, prefix:m, P:"", pattern:n || b, v:h("MODIFIER") || ""});
    } else {
      if (p = m || h("ESCAPED_CHAR")) {
        g += p;
      } else {
        if (g && (d.push(g), g = ""), h("OPEN")) {
          p = l();
          n = h("NAME") || "";
          m = h("PATTERN") || "";
          const q = l();
          k("CLOSE");
          d.push({name:n || (m ? e++ : ""), pattern:n && !m ? b : m, prefix:p, P:q, v:h("MODIFIER") || ""});
        } else {
          k("END");
        }
      }
    }
  }
  return d;
}
function ph(a) {
  var b = {encode:encodeURIComponent};
  return qh(nh(a, b), b);
}
function qh(a, b = {}) {
  const c = rh(b), {encode:d = g => g, rb:e = !0} = b, f = a.map(g => {
    if ("object" === typeof g) {
      return new RegExp(`^(?:${g.pattern})$`, c);
    }
  });
  return g => {
    let h = "";
    for (let p = 0; p < a.length; p++) {
      const n = a[p];
      if ("string" === typeof n) {
        h += n;
      } else {
        var k = g ? g[n.name] : void 0, l = "?" === n.v || "*" === n.v, m = "*" === n.v || "+" === n.v;
        if (Array.isArray(k)) {
          if (!m) {
            throw new TypeError(`Expected '${n.name}' to not repeat, but got an array`);
          }
          if (0 === k.length) {
            if (l) {
              continue;
            }
            throw new TypeError(`Expected '${n.name}' to not be empty`);
          }
          for (l = 0; l < k.length; l++) {
            m = d(k[l], n);
            if (e && !f[p].test(m)) {
              throw new TypeError(`Expected all '${n.name}' to match '${n.pattern}', but got '${m}'`);
            }
            h += n.prefix + m + n.P;
          }
        } else {
          if ("string" === typeof k || "number" === typeof k) {
            k = d(String(k), n);
            if (e && !f[p].test(k)) {
              throw new TypeError(`Expected '${n.name}' to match '${n.pattern}', but got '${k}'`);
            }
            h += n.prefix + k + n.P;
          } else {
            if (!l) {
              throw new TypeError(`Expected '${n.name}' to be ${m ? "an array" : "a string"}`);
            }
          }
        }
      }
    }
    return h;
  };
}
function oh(a) {
  return a.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function rh(a = {}) {
  return a.sensitive ? "" : "i";
}
function sh(a, b, c) {
  a = a.map(d => th(d, b, c).source);
  return new RegExp(`(?:${a.join("|")})`, rh(c));
}
function uh(a, b, c = {}) {
  const {strict:d = !1, start:e = !0, end:f = !0, encode:g = m => m} = c, h = `[${oh(c.endsWith || "")}]|$`, k = `[${oh(c.delimiter || "/#?")}]`;
  let l = e ? "^" : "";
  for (const m of a) {
    if ("string" == typeof m) {
      l += oh(g(m));
    } else {
      const p = oh(g(m.prefix)), n = oh(g(m.P));
      m.pattern ? (b && b.push(m), l = p || n ? "+" == m.v || "*" == m.v ? l + `(?:${p}((?:${m.pattern})(?:${n}${p}(?:${m.pattern}))*)${n})${"*" == m.v ? "?" : ""}` : l + `(?:${p}(${m.pattern})${n})${m.v}` : l + `(${m.pattern})${m.v}`) : l += `(?:${p}${n})${m.v}`;
    }
  }
  f ? (d || (l += `${k}?`), l += c.endsWith ? `(?=${h})` : "$") : (a = a[a.length - 1], a = "string" === typeof a ? -1 < k.indexOf(a[a.length - 1]) : void 0 === a, d || (l += `(?:${k}(?=${h}))?`), a || (l += `(?=${k}|${h})`));
  return new RegExp(l, rh(c));
}
function th(a, b, c) {
  if (a instanceof RegExp) {
    if (b && (c = a.source.match(/\((?!\?)/g))) {
      for (var d = 0; d < c.length; d++) {
        b.push({name:d, prefix:"", P:"", v:"", pattern:""});
      }
    }
  } else {
    Array.isArray(a) ? d = sh(a, b, c) : d = uh(nh(a, c), b, c), a = d;
  }
  return a;
}
;const vh = N("koa-router");
function wh(a, b) {
  a.path && (a.path = b + a.path, a.paramNames = [], b = a.path, a.regexp = th("string" == typeof b ? b.replace(/\/$/, "") : b, a.paramNames, a.opts));
}
class xh {
  constructor(a, b, c, d = {}) {
    const {name:e = null} = d;
    this.opts = d;
    this.name = e;
    this.methods = [];
    this.paramNames = [];
    this.stack = Array.isArray(c) ? c : [c];
    b.forEach(f => {
      f = this.methods.push(f.toUpperCase());
      "GET" == this.methods[f - 1] && this.methods.unshift("HEAD");
    });
    this.stack.forEach(f => {
      f = typeof f;
      if ("function" != f) {
        throw Error(b.toString() + " `" + (e || a) + "`: `middleware` must be a function, not `" + f + "`");
      }
    });
    this.path = a;
    this.regexp = th("string" == typeof a ? a.replace(/\/$/, "") : a, this.paramNames, this.opts);
    vh("defined route %s %s", this.methods, this.opts.prefix + this.path);
  }
  match(a) {
    return this.regexp.test(a);
  }
  params(a, b, c = {}) {
    for (let e = b.length, f = 0; f < e; f++) {
      if (this.paramNames[f]) {
        a = b[f];
        if (a) {
          try {
            var d = decodeURIComponent(a);
          } catch (g) {
            d = a;
          }
        } else {
          d = a;
        }
        c[this.paramNames[f].name] = d;
      }
    }
    return c;
  }
  Z(a) {
    return this.opts.ignoreCaptures ? [] : a.match(this.regexp).slice(1);
  }
  url(a, b) {
    var c = a, d = this.path.replace(/\(\.\*\)/g, ""), e = ph(d);
    "object" != typeof a && (c = [...arguments], "object" == typeof c[c.length - 1] && (b = c[c.length - 1], c = c.slice(0, c.length - 1)));
    d = nh(d);
    let f = {};
    if (Array.isArray(c)) {
      for (let g = d.length, h = 0, k = 0; h < g; h++) {
        d[h].name && (f[d[h].name] = c[k++]);
      }
    } else {
      d.some(g => g.name) ? f = a : b = a;
    }
    c = e(f);
    return b && b.query ? (e = b.query, e = "string" == typeof e ? e : rc(e), `${c}?${e}`) : c;
  }
  param(a, b) {
    function c(f, g) {
      return b.call(this, f.params[a], f, g);
    }
    c.param = a;
    const d = this.paramNames.map(({name:f}) => f), e = d.indexOf(a);
    -1 < e && this.stack.some((f, g) => {
      if (!f.param || d.indexOf(f.param) > e) {
        return this.stack.splice(g, 0, c), !0;
      }
    });
    return this;
  }
}
;/*
 RESTful resource routing middleware for koa.

 @author Alex Mingoia <talk@alexmingoia.com>
 @link https://github.com/alexmingoia/koa-router
*/
const yh = N("@goa/router");
class zh {
  constructor(a = {}) {
    const {methods:b = "HEAD OPTIONS GET PUT PATCH POST DELETE".split(" ")} = a;
    this.opts = a;
    this.methods = b;
    this.params = {};
    this.stack = [];
  }
  allowedMethods(a = {}) {
    const {throw:b = !1, notImplemented:c, methodNotAllowed:d} = a;
    return async(e, f) => {
      await f();
      const g = {};
      ({status:f = 404} = e);
      if (404 == f) {
        if (e.a.forEach(h => {
          h.methods.forEach(k => {
            g[k] = k;
          });
        }), f = Object.keys(g), !this.methods.includes(e.method)) {
          if (b) {
            let h;
            "function" == typeof c ? h = c() : h = new J.NotImplemented;
            throw h;
          }
          e.status = 501;
          e.set("Allow", f.join(", "));
        } else {
          if (f.length) {
            if ("OPTIONS" == e.method) {
              e.status = 200, e.body = "", e.set("Allow", f.join(", "));
            } else {
              if (!g[e.method]) {
                if (b) {
                  let h;
                  "function" == typeof d ? h = d() : h = new J.MethodNotAllowed;
                  throw h;
                }
                e.status = 405;
                e.set("Allow", f.join(", "));
              }
            }
          }
        }
      }
    };
  }
  redirect(a, b, c = 301) {
    if ("/" != a[0] && (a = this.url(a), a instanceof Error)) {
      throw a;
    }
    if ("/" != b[0]) {
      const d = this.url(b);
      if (d instanceof Error) {
        throw d;
      }
      b = d;
    }
    return this.all(a, d => {
      d.redirect(b);
      d.status = c;
    });
  }
  register(a, b, c, d = {}) {
    const {ignoreCaptures:e, prefix:f = this.opts.prefix || "", strict:g = this.opts.strict || !1, end:h = !0, name:k, sensitive:l = this.opts.sensitive || !1} = d;
    if (Array.isArray(a)) {
      return a.forEach(p => {
        this.register(p, b, c, d);
      }), this;
    }
    const m = new xh(a, b, c, {end:h, name:k, sensitive:l, strict:g, prefix:f, ignoreCaptures:e});
    this.opts.prefix && wh(m, this.opts.prefix);
    Object.keys(this.params).forEach(p => {
      m.param(p, this.params[p]);
    });
    this.stack.push(m);
    return m;
  }
  route(a) {
    const b = this.stack;
    for (let c = b.length, d = 0; d < c; d++) {
      if (b[d].name && b[d].name == a) {
        return b[d];
      }
    }
    return null;
  }
  url(a, ...b) {
    const c = this.route(a);
    return c ? c.url(...b) : Error(`No route found for name: ${a}`);
  }
  match(a, b) {
    const c = this.stack;
    let d;
    const e = {path:[], sa:[], route:!1};
    for (let f = c.length, g = 0; g < f; g++) {
      if (d = c[g], yh("test %s %s", d.path, d.regexp), d.match(a) && (e.path.push(d), 0 == d.methods.length || d.methods.includes(b))) {
        e.sa.push(d), d.methods.length && (e.route = !0);
      }
    }
    return e;
  }
  param(a, b) {
    this.params[a] = b;
    this.stack.forEach(c => {
      c.param(a, b);
    });
    return this;
  }
  prefix(a) {
    a = a.replace(/\/$/, "");
    this.opts.prefix = a;
    this.stack.forEach(b => {
      wh(b, a);
    });
    return this;
  }
  use(a, ...b) {
    if (Array.isArray(a) && "string" == typeof a[0]) {
      return a.forEach(d => {
        this.use(d, ...b);
      }), this;
    }
    const c = "string" == typeof a;
    c || (b.unshift(a), a = null);
    b.forEach(d => {
      const e = d.router;
      e ? (e.stack.forEach(f => {
        a && wh(f, a);
        this.opts.prefix && wh(f, this.opts.prefix);
        this.stack.push(f);
      }), this.params && Object.keys(this.params).forEach(f => {
        e.param(f, this.params[f]);
      })) : this.register(a || "(.*)", [], d, {end:!1, ignoreCaptures:!c});
    });
    return this;
  }
  get routes() {
    return this.middleware;
  }
  middleware() {
    const a = (b, c) => {
      yh("%s %s", b.method, b.path);
      const d = this.opts.routerPath || b.routerPath || b.path;
      var e = this.match(d, b.method);
      b.a ? b.a.push(e.path) : b.a = e.path;
      b.router = this;
      if (!e.route) {
        return c();
      }
      e = e.sa;
      const f = e[e.length - 1];
      b._matchedRoute = f.path;
      f.name && (b._matchedRouteName = f.name);
      e = e.reduce((g, h) => {
        g.push((k, l) => {
          k.Z = h.Z(d);
          k.params = h.params(d, k.Z, k.params);
          k.c = h.name;
          return l();
        });
        return g.concat(h.stack);
      }, []);
      return aa(e)(b, c);
    };
    a.router = this;
    return a;
  }
}
zh.url = function(a, ...b) {
  return xh.prototype.url.apply({path:a}, b);
};
const Ah = Yb.map(a => a.toLowerCase());
[...Ah, "all"].forEach(a => {
  function b(c, d, ...e) {
    "string" == typeof d || d instanceof RegExp || (e = [d, ...e], d = c, c = null);
    this.register(d, "all" == a ? Ah : [a], e, {name:c});
    return this;
  }
  zh.prototype[a] = b;
  "delete" == a && (zh.prototype.del = b);
});
class Bh extends gh {
  constructor() {
    super();
    this.sessionOptions = this.session = void 0;
    this._usage = this.files = this.file = this.mountPath = this.router = this.params = this._matchedRouteName = this._matchedRoute = this.compress = null;
  }
  neoluddite(a, b, c = {}) {
    this._usage && this._usage.push({"package":a, item:b, timestamp:(new Date).getTime(), ...c});
  }
}
;const Ch = a => {
  const b = {};
  a.on("connection", c => {
    const d = [c.remoteAddress, c.remotePort].join(":");
    b[d] = c;
    c.on("close", () => {
      delete b[d];
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
};
const Dh = async(a = {}, b = {}, c = {}) => {
  const d = new lh({Context:Bh});
  a = await mf(a, d, c);
  "production" == d.env && (d.proxy = !0);
  return {app:d, middleware:a, router:new zh(b)};
};
function Eh(a, b, c = "0.0.0.0") {
  const d = yb(!0);
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
;const Fh = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
let Gh = a => `${a}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), Hh = a => 40 < `${a}`.length || -1 != `${a}`.indexOf("\n") || -1 !== `${a}`.indexOf("<");
const Ih = {};
function Jh(a) {
  const b = {...a.attributes, children:a.children};
  a = a.nodeName.fb;
  if (void 0 !== a) {
    for (let c in a) {
      void 0 === b[c] && (b[c] = a[c]);
    }
  }
  return b;
}
;const Kh = (a, b, {allAttributes:c, xml:d, Qa:e, sort:f, ha:g} = {}) => {
  let h;
  const k = Object.keys(a);
  f && k.sort();
  return {Sa:k.map(l => {
    var m = a[l];
    if ("children" != l && !l.match(/[\s\n\\/='"\0<>]/) && (c || !["key", "ref"].includes(l))) {
      if ("className" == l) {
        if (a.class) {
          return;
        }
        l = "class";
      } else {
        if ("htmlFor" == l) {
          if (a.for) {
            return;
          }
          l = "for";
        } else {
          if ("srcSet" == l) {
            if (a.srcset) {
              return;
            }
            l = "srcset";
          }
        }
      }
      e && l.match(/^xlink:?./) && (l = l.toLowerCase().replace(/^xlink:?/, "xlink:"));
      if ("style" == l && m && "object" == typeof m) {
        {
          let n = "";
          for (var p in m) {
            let q = m[p];
            null != q && (n && (n += " "), n += Ih[p] || (Ih[p] = p.replace(/([A-Z])/g, "-$1").toLowerCase()), n += ": ", n += q, "number" == typeof q && !1 === Fh.test(p) && (n += "px"), n += ";");
          }
          m = n || void 0;
        }
      }
      if ("dangerouslySetInnerHTML" == l) {
        h = m && m.__html;
      } else {
        if ((m || 0 === m || "" === m) && "function" != typeof m) {
          if (!0 === m || "" === m) {
            if (m = l, !d) {
              return l;
            }
          }
          p = "";
          if ("value" == l) {
            if ("select" == b) {
              g = m;
              return;
            }
            "option" == b && g == m && (p = "selected ");
          }
          return `${p}${l}="${Gh(m)}"`;
        }
      }
    }
  }).filter(Boolean), Ma:h, ha:g};
};
const Lh = [], Mh = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, Nh = /^(a|abbr|acronym|audio|b|bdi|bdo|big|br|button|canvas|cite|code|data|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|label|map|mark|meter|noscript|object|output|picture|progress|q|ruby|s|samp|slot|small|span|strong|sub|sup|svg|template|textarea|time|u|tt|var|video|wbr)$/;
function Oh(a, b = {}, c = {}, d = !1, e = !1, f) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:g = !1, shallow:h = !1, renderRootComponent:k = !1, shallowHighOrder:l = !1, sortAttributes:m, allAttributes:p, xml:n, initialPadding:q = 0, closeVoidTags:r = !1} = b;
  let {lineLength:u = 40} = b;
  u -= q;
  let {nodeName:t, attributes:x = {}} = a;
  var w = ["textarea", "pre"].includes(t);
  const E = " ".repeat(q), y = "string" == typeof g ? g : `  ${E}`;
  if ("object" != typeof a && !t) {
    return Gh(a);
  }
  if ("function" == typeof t) {
    if (!h || !d && k) {
      return w = Jh(a), t.prototype && "function" == typeof t.prototype.Ya ? (a = new t(w, c), a.bb = a.ab = !0, a.G = w, a.context = c, t.La ? a.state = {...a.state, ...t.La(a.G, a.state)} : a.za && a.za(), w = a.Ya(a.G, a.state, a.context), a.Ka && (c = {...c, ...a.Ka()})) : w = t(w, c), Oh(w, b, c, l, e, f);
    }
    t = t.displayName || t !== Function && t.name || Ph(t);
  }
  let v = "";
  ({Sa:z, Ma:d, ha:f} = Kh(x, t, {allAttributes:p, xml:n, Qa:e, sort:m, ha:f}));
  if (g) {
    let D = `<${t}`.length;
    v = z.reduce((T, C) => {
      const B = D + 1 + C.length;
      if (B > u) {
        return D = y.length, `${T}\n${y}${C}`;
      }
      D = B;
      return `${T} ${C}`;
    }, "");
  } else {
    v = z.length ? " " + z.join(" ") : "";
  }
  v = `<${t}${v}>`;
  if (`${t}`.match(/[\s\n\\/='"\0<>]/)) {
    throw v;
  }
  var z = `${t}`.match(Mh);
  r && z && (v = v.replace(/>$/, " />"));
  let H = [];
  if (d) {
    !w && g && (Hh(d) || d.length + Qh(v) > u) && (d = "\n" + y + `${d}`.replace(/(\n+)/g, "$1" + (y || "\t"))), v += d;
  } else {
    if (a.children) {
      let D = g && v.includes("\n");
      const T = [];
      H = a.children.map((C, B) => {
        if (null != C && !1 !== C) {
          var F = Oh(C, b, c, !0, "svg" == t ? !0 : "foreignObject" == t ? !1 : e, f);
          if (F) {
            g && F.length + Qh(v) > u && (D = !0);
            if ("string" == typeof C.nodeName) {
              const A = F.replace(new RegExp(`</${C.nodeName}>$`), "");
              Rh(C.nodeName, A) && (T[B] = F.length);
            }
            return F;
          }
        }
      }).filter(Boolean);
      g && D && !w && (H = H.reduce((C, B, F) => {
        var A = (F = T[F - 1]) && /^<([\s\S]+?)>/.exec(B);
        A && ([, A] = A, A = !Nh.test(A));
        if (F && !A) {
          A = /[^<]*?(\s)/y;
          var G;
          let O = !0, ca;
          for (; null !== (G = A.exec(B));) {
            const [Sh] = G;
            [, ca] = G;
            A.lastIndex + Sh.length - 1 > u - (O ? F : 0) && (G = B.slice(0, A.lastIndex - 1), B = B.slice(A.lastIndex), O ? (C.push(G), O = !1) : C.push("\n" + y + `${G}`.replace(/(\n+)/g, "$1" + (y || "\t"))), A.lastIndex = 0);
          }
          ca && C.push(ca);
          C.push(B);
        } else {
          C.push("\n" + y + `${B}`.replace(/(\n+)/g, "$1" + (y || "\t")));
        }
        return C;
      }, []));
    }
  }
  if (H.length) {
    v += H.join("");
  } else {
    if (n) {
      return v.substring(0, v.length - 1) + " />";
    }
  }
  z || (!Rh(t, H[H.length - 1]) && !w && g && v.includes("\n") && (v += `\n${E}`), v += `</${t}>`);
  return v;
}
const Rh = (a, b) => `${a}`.match(Nh) && (b ? !/>$/.test(b) : !0);
function Ph(a) {
  var b = (Function.prototype.toString.call(a).match(/^\s*function\s+([^( ]+)/) || "")[1];
  if (!b) {
    b = -1;
    for (let c = Lh.length; c--;) {
      if (Lh[c] === a) {
        b = c;
        break;
      }
    }
    0 > b && (b = Lh.push(a) - 1);
    b = `UnnamedComponent${b}`;
  }
  return b;
}
const Qh = a => {
  a = a.split("\n");
  return a[a.length - 1].length;
};
/*

 @idio/idio: A compied Koa-based web server with essential middleware.

 Copyright (C) 2020  Art Deco

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
module.exports = {_createApp:Dh, _compose:aa, _startApp:async function(a = {}, b = {}) {
  const {port:c = 5000, host:d = "0.0.0.0", router:e} = b, f = () => {
    h.destroy().then(() => {
      process.kill(process.pid, "SIGUSR2");
    });
  };
  process.once("SIGUSR2", f);
  let g;
  a = await Dh(a, e, {getServer:() => g});
  const h = a.app, k = a.middleware;
  a = a.router;
  g = await Eh(h, c, d);
  Ch(g);
  h.destroy = async() => {
    k.frontend && k.frontend.watchers && Object.values(k.frontend.watchers).forEach(l => {
      l.close();
    });
    await g.destroy();
    process.removeListener("SIGUSR2", f);
  };
  ({port:b} = g.address());
  return {app:h, middleware:k, url:`http://localhost:${b}`, server:g, router:a};
}, _httpErrors:J, _mount:Ja, _Keygrip:Qa, _Router:zh, _render:(a, b = {}, c = {}) => {
  const d = b.addDoctype, e = b.pretty;
  a = Oh(a, b, c);
  return d ? `<!doctype html>${e ? "\n" : ""}${a}` : a;
}, _websocket:Ve};


//# sourceMappingURL=idio.js.map