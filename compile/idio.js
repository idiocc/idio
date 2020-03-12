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
const events = require('events');
const https = require('https');
const http = require('http');
const url = require('url');
const vm = require('vm');
const querystring = require('querystring');
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
  var a = G;
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
  if ("number" != typeof d || !G[d] && (400 > d || 600 <= d)) {
    d = 500;
  }
  a = H[d] || H[Number(String(d).charAt(0) + "00")];
  b || (b = a ? new a(c) : Error(c || G[d]), Error.captureStackTrace(b, H));
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
    this.message || (this.message = G[a]);
  }
}
ea.forEach(a => {
  let b;
  const c = ja(G[a]), d = c.match(/Error$/) ? c : c + "Error";
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
  b && (H[a] = b, H[c] = b);
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
const sa = /\B(?=(\d{3})+(?!\d))/g, ta = /(?:\.0*|(\.[^0]+)0+)$/, ua = {b:1, kb:1024, mb:1048576, gb:1073741824, tb:Math.pow(1024, 4), pb:Math.pow(1024, 5)};
function va(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), d = b && b.nb || "", e = b && b.qb || "", f = b && void 0 !== b.Ea ? b.Ea : 2, g = !(!b || !b.hb);
  (b = b && b.ob || "") && ua[b.toLowerCase()] || (b = c >= ua.pb ? "PB" : c >= ua.tb ? "TB" : c >= ua.gb ? "GB" : c >= ua.mb ? "MB" : c >= ua.kb ? "KB" : "B");
  a = (a / ua[b.toLowerCase()]).toFixed(f);
  g || (a = a.replace(ta, "$1"));
  d && (a = a.replace(sa, d));
  return a + e + b;
}
;/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const wa = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90}, xa = {black:40, red:41, green:42, yellow:43, blue:44, magenta:45, cyan:46, white:47};
function L(a, b) {
  return (b = wa[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
function ya(a, b) {
  return (b = xa[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var za = {f:va, ["fy"](a) {
  return L(va(a) || "", "yellow");
}, ["fr"](a) {
  return L(va(a) || "", "red");
}, ["fb"](a) {
  return L(va(a) || "", "blue");
}, ["fg"](a) {
  return L(va(a) || "", "green");
}, ["fc"](a) {
  return L(va(a) || "", "cyan");
}, ["fm"](a) {
  return L(va(a) || "", "magenta");
}};
const Aa = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, e) => e.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), Ba = {init:function(a) {
  a.inspectOpts = {...Aa};
}, log:function(...a) {
  return process.stderr.write(na(...a) + "\n");
}, formatArgs:function(a) {
  var b = this.namespace, c = this.color;
  const d = this.diff;
  this.useColors ? (c = "\u001b[3" + (8 > c ? c : "8;5;" + c), b = `  ${c};1m${b} \u001B[0m`, a[0] = b + a[0].split("\n").join("\n" + b), a.push(c + "m+" + pa(d) + "\u001b[0m")) : a[0] = (Aa.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in Aa ? !!Aa.colors : la.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:Aa, formatters:{o:function(a) {
  return oa(a, {...this.inspectOpts, colors:this.useColors}).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  return oa(a, {...this.inspectOpts, colors:this.useColors});
}, ...za}};
function Ca(a) {
  function b(...g) {
    if (b.enabled) {
      var h = Number(new Date);
      b.diff = h - (f || h);
      b.prev = f;
      f = b.curr = h;
      g[0] = Da(g[0]);
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
function Ea(a) {
  const b = Ca(a);
  "function" == typeof a.init && a.init(b);
  a.a.push(b);
  return b;
}
function Fa(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function Ga(a) {
  var b = Ba.load();
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
class Ha {
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
function Ia() {
  const a = new Ha(Ba);
  return function(b) {
    const c = Ea(a);
    c.namespace = b;
    c.useColors = Ba.useColors();
    c.enabled = a.enabled(b);
    c.color = Fa(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, e) {
      d = this.namespace + (void 0 === e ? ":" : e) + d;
      d.log = this.log;
      return d;
    };
    Ga(a);
    return c;
  };
}
function Da(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;function M(a) {
  if (!a) {
    throw Error("To use debug, pass the namespace.");
  }
  return Ia()(a);
}
;const Ja = M("koa-mount");
function Ka(a, b) {
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
  Ja("mount %s %s", a, f);
  return async function(g, h) {
    const k = g.path, l = c(k);
    Ja("mount %s %s -> %s", a, f, l);
    if (!l) {
      return await h();
    }
    g.mountPath = a;
    g.path = l;
    Ja("enter %s -> %s", k, g.path);
    g.neoluddite && g.neoluddite("koa-mount", "mount");
    await d(g, async() => {
      g.path = k;
      await h();
      g.path = l;
    });
    Ja("leave %s -> %s", k, g.path);
    g.path = k;
  };
}
;const La = _crypto.createHash, Ma = _crypto.createHmac, Na = _crypto.pseudoRandomBytes, Oa = _crypto.randomBytes;
function Pa(a, b, c, d) {
  return Ma(b, c).update(a).digest(d).replace(/\/|\+|=/g, e => ({"/":"_", "+":"-", "=":""})[e]);
}
;function Qa(a, b) {
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
class Ra {
  constructor(a, b = "sha1", c = "base64") {
    if (!(a && 0 in a)) {
      throw Error("Keys must be provided.");
    }
    this.algorithm = b;
    this.encoding = c;
    this.keys = a;
  }
  sign(a) {
    return Pa(a, this.algorithm, this.keys[0], this.encoding);
  }
  verify(a, b) {
    return -1 < this.index(a, b);
  }
  index(a, b) {
    for (let c = 0, d = this.keys.length; c < d; c++) {
      const e = Pa(a, this.algorithm, this.keys[c], this.encoding);
      if (Qa(b, e)) {
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
const Sa = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function Ta(a, b) {
  if ("string" != typeof a) {
    throw new TypeError("header argument is required");
  }
  if (!b) {
    throw new TypeError("field argument is required");
  }
  b = Array.isArray(b) ? b : Ua(`${b}`);
  for (var c = 0; c < b.length; c++) {
    if (!Sa.test(b[c])) {
      throw new TypeError("field argument contains an invalid header name");
    }
  }
  if ("*" == a) {
    return a;
  }
  c = a;
  a = Ua(a.toLowerCase());
  if (b.includes("*") || a.includes("*")) {
    return "*";
  }
  for (let d = 0; d < b.length; d++) {
    const e = b[d].toLowerCase();
    a.includes(e) || (a.push(e), c = c ? c + ", " + b[d] : b[d]);
  }
  return c;
}
function Ua(a) {
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
;function Va(a = {}) {
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
        throw k = n.headers || {}, l = Ta(k.vary || k.Vary || "", "Origin"), delete k.cb, n.headers = Object.assign({}, k, m, {vary:l}), n;
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
;const Wa = path.basename, Xa = path.dirname, Ya = path.extname, Za = path.isAbsolute, N = path.join, $a = path.normalize, ab = path.parse, P = path.relative, bb = path.resolve, cb = path.sep;
const db = fs.ReadStream, eb = fs.createReadStream, fb = fs.createWriteStream, gb = fs.exists, hb = fs.existsSync, ib = fs.lstat, jb = fs.mkdirSync, kb = fs.readFileSync, lb = fs.readdir, mb = fs.rmdir, nb = fs.stat, ob = fs.unlink;
const pb = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, qb = (a, b = !1) => pb(a, 2 + (b ? 1 : 0)), rb = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const Q = os.EOL, sb = os.homedir, tb = os.tmpdir;
const ub = /\s+at.*(?:\(|\s)(.*)\)?/, vb = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, wb = sb(), xb = (a, b) => {
  const {pretty:c = !1, ignoredModules:d = ["pirates"]} = b || {};
  b = d.join("|");
  const e = new RegExp(vb.source.replace("IGNORED_MODULES", b));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(ub);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => c ? f.replace(ub, (g, h) => g.replace(h, h.replace(wb, "~"))) : f).join("\n");
};
function yb(a, b, c = !1) {
  return function(d) {
    var e = rb(arguments), {stack:f} = Error();
    const g = pb(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = xb(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function R(a) {
  var {stack:b} = Error();
  const c = rb(arguments);
  b = qb(b, a);
  return yb(c, b, a);
}
;async function S(a, b, c) {
  const d = R(!0);
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
    throw H(400, "Malicious Path");
  }
  if (Za(c)) {
    throw H(400, "Malicious Path");
  }
  if (zb.test($a("." + cb + c))) {
    throw H(403);
  }
  return $a(N(bb(d), c));
}
;const Bb = async(...a) => await S(gb, ...a), Cb = async(...a) => await S(nb, ...a), Db = M("koa-send");
async function Eb(a, b, c = {}) {
  K(a, "koa context required");
  K(b, "pathname required");
  Db('send "%s" %j', b, c);
  var d = c.root ? $a(bb(c.root)) : "", e = "/" == b[b.length - 1];
  b = b.substr(ab(b).root.length);
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
      d = b.substr(d.length).split(cb);
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
        throw H(404, r);
      }
      r.status = 500;
      throw r;
    }
    c && c(a.res, b, q);
    a.set("Content-Length", q.size);
    a.response.get("Last-Modified") || a.set("Last-Modified", q.mtime.toUTCString());
    a.response.get("Cache-Control") || (f = ["max-age=" + (g / 1000 | 0)], h && f.push("immutable"), a.set("Cache-Control", f.join(",")));
    a.type || (h = b, h = "" !== d ? Ya(Wa(h, d)) : Ya(h), a.type = h);
    a.neoluddite && a.neoluddite("koa-send", "stream");
    a.body = eb(b);
    return b;
  }
}
;const Fb = M("koa-static");
var Gb = (a, b = {}) => {
  K(a, "root directory is required to serve files");
  Fb('static "%s" %j', a, b);
  b.root = bb(a);
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
const Sb = /(?:\.0*|(\.[^0]+)0+)$/, U = {fb:1, Ta:1024, Va:1048576, Na:1073741824, bb:Math.pow(1024, 4), Ya:Math.pow(1024, 5)};
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
        b = "", b = c >= U.Ya ? "PB" : c >= U.bb ? "TB" : c >= U.Na ? "GB" : c >= U.Va ? "MB" : c >= U.Ta ? "KB" : "B";
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
            const {ua:m, callback:p} = await new Promise((n, q) => {
              const r = new Ob({transform(u, t, w) {
                this.push(u);
                k ? w() : (h += u.length, h > c ? (k = !0, n({ua:this, callback:w})) : w());
              }});
              r.once("finish", () => n({ua:r}));
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
;function Xb() {
  return Oa(16);
}
;for (var V = [], Yb = 0; 256 > Yb; ++Yb) {
  V[Yb] = (Yb + 256).toString(16).substr(1);
}
;function Zb(a = {}, b = null, c = 0) {
  c = b && c;
  "string" == typeof a && (b = "binary" == a ? Array(16) : null, a = null);
  const {random:d, rng:e = Xb} = a;
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
;class $b {
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
;function ac(a) {
  a = Buffer.from(a, "base64").toString("utf8");
  return JSON.parse(a);
}
function bc(a) {
  a = JSON.stringify(a);
  return Buffer.from(a).toString("base64");
}
;const W = M("koa-session:context");
async function cc(a) {
  W("init from external");
  var b = a.ctx, c = a.opts;
  c.externalKey ? (b = c.externalKey.get(b), W("get external key from custom %s", b)) : (b = b.cookies.get(c.key, c), W("get external key from cookie %s", b));
  b ? (c = await a.store.get(b, c.maxAge, {rolling:c.rolling || !1}), a.valid(c, b) ? (a.create(c, b), a.a = JSON.stringify(a.session.toJSON())) : a.create()) : a.create();
}
function dc(a) {
  const b = a.a;
  var c = a.session;
  if (c._requireSave) {
    return "force";
  }
  const d = c.toJSON();
  return b || Object.keys(d).length ? b !== JSON.stringify(d) ? "changed" : a.opts.rolling ? "rolling" : a.opts.renew && (a = c._expire, c = c.maxAge, a && c && a - Date.now() < c / 2) ? "renew" : "" : "";
}
class ec {
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
    this.session = new $b(this, a);
  }
  async commit() {
    const {session:a, opts:{beforeSave:b}, ctx:c} = this;
    if (void 0 !== a) {
      if (null === a) {
        await this.remove();
      } else {
        var d = dc(this);
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
const fc = M("koa-session"), gc = Symbol("context#contextSession");
Symbol("context#_contextSession");
function hc(a = {}) {
  ic(a);
  return async function(b, c) {
    b = jc(b, a);
    b.store && await cc(b);
    try {
      await c();
    } finally {
      a.autoCommit && await b.commit();
    }
  };
}
function ic(a = {}) {
  a.key = a.key || "koa:sess";
  a.maxAge = a.maxAge || 864E5;
  null == a.overwrite && (a.overwrite = !0);
  null == a.httpOnly && (a.httpOnly = !0);
  null == a.signed && (a.signed = !0);
  null == a.autoCommit && (a.autoCommit = !0);
  fc("session options %j", a);
  "function" != typeof a.encode && (a.encode = bc);
  "function" != typeof a.decode && (a.decode = ac);
  var b = a.store;
  b && (K("function" == typeof b.get, "store.get must be function"), K("function" == typeof b.set, "store.set must be function"), K("function" == typeof b.destroy, "store.destroy must be function"));
  if (b = a.externalKey) {
    K("function" == typeof b.get, "externalKey.get must be function"), K("function" == typeof b.set, "externalKey.set must be function");
  }
  if (b = a.ContextStore) {
    K("function" == typeof b && (/^class[\s{]/.test(b.toString()) || /classCallCheck\(/.test(b.toString().replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, ""))), "ContextStore must be a class"), K("function" == typeof b.prototype.get, "ContextStore.prototype.get must be function"), K("function" == typeof b.prototype.set, "ContextStore.prototype.set must be function"), K("function" == typeof b.prototype.destroy, "ContextStore.prototype.destroy must be function");
  }
  a.genid || (a.prefix ? a.genid = () => `${a.prefix}${Zb()}` : a.genid = Zb);
}
function jc(a, b) {
  if (!a.hasOwnProperty(gc)) {
    Object.defineProperties(a, {session:{get() {
      return c.get();
    }, set(d) {
      c.set(d);
    }, configurable:!0}, sessionOptions:{get() {
      return c.opts;
    }}});
    var c = new ec(a, b);
    return c;
  }
}
;const kc = M("idio");
var lc = events;
const mc = events.EventEmitter;
/*
 MIT streamsearch by Brian White
 https://github.com/mscdex/streamsearch
*/
function nc(a, b, c, d, e) {
  for (var f = 0; f < e; ++f, ++b, ++d) {
    if (a[b] !== c[d]) {
      return !1;
    }
  }
  return !0;
}
function oc(a, b) {
  var c = b.length, d = a.u, e = d.length, f = -a.a, g = d[e - 1], h = a.j, k = a.i;
  if (0 > f) {
    for (; 0 > f && f <= c - e;) {
      var l = f + e - 1;
      l = 0 > l ? a.i[a.a + l] : b[l];
      if (l === g && pc(a, b, f, e - 1)) {
        return a.a = 0, ++a.g, f > -a.a ? a.emit("info", !0, k, 0, a.a + f) : a.emit("info", !0), a.c = f + e;
      }
      f += h[l];
    }
    if (0 > f) {
      for (; 0 > f && !pc(a, b, f, c - f);) {
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
    if (l === g && b[f] === d[0] && nc(d, 0, b, f, e - 1)) {
      return ++a.g, 0 < f ? a.emit("info", !0, b, a.c, f) : a.emit("info", !0), a.c = f + e;
    }
    f += h[l];
  }
  if (f < c) {
    for (; f < c && (b[f] !== d[0] || !nc(b, f, d, 0, c - f));) {
      ++f;
    }
    f < c && (b.copy(k, 0, f, f + (c - f)), a.a = c - f);
  }
  0 < f && a.emit("info", !1, b, a.c, f < c ? f : c);
  return a.c = c;
}
function pc(a, b, c, d) {
  for (var e = 0; e < d;) {
    var f = c + e;
    if ((0 > f ? a.i[a.a + f] : b[f]) === a.u[e]) {
      ++e;
    } else {
      return !1;
    }
  }
  return !0;
}
class qc extends mc {
  constructor(a) {
    super();
    "string" === typeof a && (a = new Buffer(a));
    var b, c = a.length;
    this.v = Infinity;
    this.g = 0;
    this.j = Array(256);
    this.a = 0;
    this.u = a;
    this.c = 0;
    this.i = new Buffer(c);
    for (b = 0; 256 > b; ++b) {
      this.j[b] = c;
    }
    if (1 <= c) {
      for (b = 0; b < c - 1; ++b) {
        this.j[a[b]] = c - 1 - b;
      }
    }
  }
  reset() {
    this.c = this.g = this.a = 0;
  }
  push(a, b = 0) {
    Buffer.isBuffer(a) || (a = new Buffer(a, "binary"));
    var c = a.length;
    for (this.c = b; d !== c && this.g < this.v;) {
      var d = oc(this, a);
    }
    return d;
  }
}
;class rc extends Nb {
  constructor(a) {
    super(a);
  }
  _read() {
  }
}
;const sc = Buffer.from("\r\n\r\n"), tc = /\r\n/g, uc = /^([^:]+):[ \t]?([\x00-\xFF]+)?$/;
class vc extends mc {
  constructor(a = {}) {
    super();
    ({maxHeaderPairs:a = 2000} = a);
    this.a = 0;
    this.i = !1;
    this.j = 0;
    this.maxHeaderPairs = a;
    this.buffer = "";
    this.header = {};
    this.g = !1;
    this.c = new qc(sc);
    this.c.on("info", (b, c, d, e) => {
      c && !this.i && (81920 < this.a + (e - d) ? (e = 81920 - this.a, this.a = 81920) : this.a += e - d, 81920 === this.a && (this.i = !0), this.buffer += c.toString("binary", d, e));
      if (b) {
        if (this.buffer && this.j !== this.maxHeaderPairs) {
          b = this.buffer.split(tc);
          c = b.length;
          e = !1;
          for (let g = 0; g < c; ++g) {
            if (0 !== b[g].length) {
              if ("\t" == b[g][0] || " " == b[g][0]) {
                this.header[f][this.header[f].length - 1] += b[g];
              } else {
                if (d = uc.exec(b[g])) {
                  var f = d[1].toLowerCase();
                  d[2] ? void 0 === this.header[f] ? this.header[f] = [d[2]] : this.header[f].push(d[2]) : this.header[f] = [""];
                  if (++this.j === this.maxHeaderPairs) {
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
        this.c.g = this.c.v;
        f = this.header;
        this.header = {};
        this.buffer = "";
        this.g = !0;
        this.a = this.j = 0;
        this.i = !1;
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
const wc = Buffer.from("-"), xc = Buffer.from("\r\n"), yc = () => {
};
function zc(a, b, c, d, e) {
  var f, g = 0, h = !0;
  if (!a.a && a.G && c) {
    for (; 2 > a.i && d + g < e;) {
      if (45 === c[d + g]) {
        ++g, ++a.i;
      } else {
        a.i && (f = wc);
        a.i = 0;
        break;
      }
    }
    2 === a.i && (d + g < e && a._events.trailer && a.emit("trailer", c.slice(d + g, e)), a.reset(), a.H = !0, 0 === a.X && (a.c = !0, a.emit("finish"), a.c = !1));
    if (a.i) {
      return;
    }
  }
  a.G && (a.G = !1);
  a.a || (a.a = new rc(a.na), a.a._read = () => {
    Ac(a);
  }, g = a.g ? "preamble" : "part", a._events[g] ? a.emit(g, a.a) : a._ignore(), a.g || (a.v = !0));
  c && d < e && !a.A && (a.g || !a.v ? (f && (h = a.a.push(f)), h = a.a.push(c.slice(d, e)), h || (a.F = !0)) : !a.g && a.v && (f && a.j.push(f), f = a.j.push(c.slice(d, e)), !a.v && void 0 !== f && f < e && zc(a, !1, c, d + f, e)));
  b && (a.j.reset(), a.g ? a.g = !1 : (++a.X, a.a.on("end", () => {
    0 === --a.X && (a.H ? (a.c = !0, a.emit("finish"), a.c = !1) : Ac(a));
  })), a.a.push(null), a.a = void 0, a.A = !1, a.G = !0, a.i = 0);
}
function Ac(a) {
  if (a.F && (a.F = !1, a.D)) {
    const b = a.D;
    a.D = void 0;
    b();
  }
}
class Bc extends Pb {
  constructor(a) {
    super(a);
    if (!a || !a.headerFirst && "string" != typeof a.boundary) {
      throw new TypeError("Boundary required");
    }
    "string" == typeof a.boundary ? this.setBoundary(a.boundary) : this.u = void 0;
    this.Aa = a.headerFirst;
    this.X = this.i = 0;
    this.c = this.H = !1;
    this.g = !0;
    this.G = !1;
    this.v = this.ma = !0;
    this.D = this.a = void 0;
    this.A = !1;
    this.na = "number" == typeof a.partHwm ? {highWaterMark:a.partHwm} : {};
    this.F = !1;
    this.j = new vc(a);
    this.j.on("header", b => {
      this.v = !1;
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
    if (!this.j && !this.u) {
      return c();
    }
    if (this.Aa && this.g) {
      if (this.a || (this.a = new rc(this.na), this._events.preamble ? this.emit("preamble", this.a) : this._ignore()), b = this.j.push(a), !this.v && void 0 !== b && b < a.length) {
        a = a.slice(b);
      } else {
        return c();
      }
    }
    this.ma && (this.u.push(xc), this.ma = !1);
    this.u.push(a);
    this.F ? this.D = c : c();
  }
  reset() {
    this.j = this.u = this.a = void 0;
  }
  setBoundary(a) {
    this.u = new qc("\r\n--" + a);
    this.u.on("info", (b, c, d, e) => {
      zc(this, b, c, d, e);
    });
  }
  _ignore() {
    this.a && !this.A && (this.A = !0, this.a.on("error", yc), this.a.resume());
  }
}
;const {TextDecoder:Cc} = require("text-decoding"), Dc = /%([a-fA-F0-9]{2})/g;
function Ec(a, b) {
  return String.fromCharCode(parseInt(b, 16));
}
function Fc(a) {
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
              d ? (h.length && (h = X(h.replace(Dc, Ec), d)), d = "") : h.length && (h = X(h, "utf8"));
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
  d && h.length ? h = X(h.replace(Dc, Ec), d) : h && (h = X(h, "utf8"));
  void 0 === b[g] ? h && (b[g] = h) : b[g][1] = h;
  return b;
}
function X(a, b) {
  let c;
  if (a) {
    try {
      c = (new Cc(b)).decode(Buffer.from(a, "binary"));
    } catch (d) {
    }
  }
  return "string" == typeof c ? c : a;
}
const Gc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], Hc = /\+/g;
class Ic {
  constructor() {
    this.buffer = void 0;
  }
  write(a) {
    a = a.replace(Hc, " ");
    for (var b = "", c = 0, d = 0, e = a.length; c < e; ++c) {
      void 0 !== this.buffer ? Gc[a.charCodeAt(c)] ? (this.buffer += a[c], ++d, 2 === this.buffer.length && (b += String.fromCharCode(parseInt(this.buffer, 16)), this.buffer = void 0)) : (b += "%" + this.buffer, this.buffer = void 0, --c) : "%" == a[c] && (c > d && (b += a.substring(d, c), d = c), this.buffer = "", ++d);
    }
    d < e && void 0 === this.buffer && (b += a.substring(d));
    return b;
  }
  reset() {
    this.buffer = void 0;
  }
}
function Jc(a) {
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
const Kc = a => {
  const {fieldSize:b = 1048576, fieldNameSize:c = 100, fileSize:d = Infinity, files:e = Infinity, fields:f = Infinity, parts:g = Infinity} = a;
  return {J:b, Ka:d, La:e, K:f, Xa:g, U:c};
};
class Lc extends Pb {
  constructor(a = {}) {
    super({...a.highWaterMark ? {highWaterMark:a.highWaterMark} : {}});
    this.a = !1;
    this.c = void 0;
    this.v = this.u = this.g = this.j = !1;
    this.opts = a;
    if (a.headers && "string" == typeof a.headers["content-type"]) {
      a: {
        a = a.headers;
        this.c = void 0;
        if (a["content-type"]) {
          const b = Fc(a["content-type"]);
          let c, d;
          for (let e = 0; e < this.i.length && (d = this.i[e], "function" == typeof d.detect ? c = d.detect(b) : c = d.detect.test(b[0]), !c); ++e) {
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
      if (this.j) {
        return !1;
      }
      this.j = !0;
    }
    return super.emit(a, ...b);
  }
  get i() {
    return [];
  }
  _write(a, b, c) {
    if (!this.c) {
      return c(Error("Not ready to parse. Missing Content-Type?"));
    }
    this.c.write(a, c);
  }
}
;const Mc = /^boundary$/i, Nc = /^form-data$/i, Oc = /^charset$/i, Pc = /^filename$/i, Qc = /^name$/i;
class Rc {
  static get detect() {
    return /^multipart\/form-data/i;
  }
  constructor(a, {limits:b = {}, preservePath:c, fileHwm:d, parsedConType:e = [], highWaterMark:f}) {
    function g() {
      0 === w && I && !a.a && (I = !1, process.nextTick(() => {
        a.a = !0;
        a.emit("finish");
      }));
    }
    let h, k;
    [, e] = e.find(v => Array.isArray(v) && Mc.test(v[0])) || [];
    if ("string" != typeof e) {
      throw Error("Multipart: Boundary not found");
    }
    const {Xa:l, La:m, Ka:p, K:n, J:q} = Kc(b);
    let r, u = 0, t = 0, w = 0, x, I = !1;
    this.g = this.i = !1;
    this.a = void 0;
    this.u = 0;
    this.j = a;
    this.c = new Bc({boundary:e, maxHeaderPairs:b.headerPairs, highWaterMark:f, fileHwm:d});
    this.c.on("drain", () => {
      this.i = !1;
      if (this.a && !this.g) {
        const v = this.a;
        this.a = void 0;
        v();
      }
    }).on("error", v => {
      a.emit("error", v);
    }).on("finish", () => {
      I = !0;
      g();
    });
    const y = v => {
      if (++this.u > l) {
        return this.c.removeListener("part", y), this.c.on("part", Sc), a.v = !0, a.emit("partsLimit"), Sc(v);
      }
      if (x) {
        const A = x;
        A.emit("end");
        A.removeAllListeners("end");
      }
      v.on("header", A => {
        let J = "text/plain", D = "7bit", T;
        let C = 0;
        if (A["content-type"]) {
          var B = Fc(A["content-type"][0]);
          if (B[0]) {
            for (J = B[0].toLowerCase(), h = 0, k = B.length; h < k && !Oc.test(B[h][0]); ++h) {
            }
          }
        }
        if (A["content-disposition"]) {
          B = Fc(A["content-disposition"][0]);
          if (!Nc.test(B[0])) {
            return Sc(v);
          }
          h = 0;
          for (k = B.length; h < k; ++h) {
            if (Qc.test(B[h][0])) {
              T = B[h][1];
            } else {
              if (Pc.test(B[h][0])) {
                var E = B[h][1];
                c || (E = Jc(E));
              }
            }
          }
        } else {
          return Sc(v);
        }
        A["content-transfer-encoding"] && (D = A["content-transfer-encoding"][0].toLowerCase());
        if ("application/octet-stream" == J || void 0 !== E) {
          if (u == m) {
            return a.u || (a.u = !0, a.emit("filesLimit")), Sc(v);
          }
          ++u;
          if (!a._events.file) {
            this.c._ignore();
            return;
          }
          ++w;
          const z = new Tc({highWaterMark:d});
          r = z;
          z.on("end", () => {
            --w;
            this.g = !1;
            g();
            if (this.a && !this.i) {
              const F = this.a;
              this.a = void 0;
              F();
            }
          });
          z._read = () => {
            if (this.g && (this.g = !1, this.a && !this.i)) {
              const F = this.a;
              this.a = void 0;
              F();
            }
          };
          a.emit("file", T, z, E, D, J, v);
          A = F => {
            if ((C += F.length) > p) {
              const O = p - (C - F.length);
              0 < O && z.push(F.slice(0, O));
              z.emit("limit");
              z.truncated = !0;
              v.removeAllListeners("data");
            } else {
              z.push(F) || (this.g = !0);
            }
          };
          E = () => {
            r = void 0;
            z.push(null);
          };
        } else {
          if (t == n) {
            return a.g || (a.g = !0, a.emit("fieldsLimit")), Sc(v);
          }
          ++t;
          ++w;
          const z = [];
          let F = !1;
          x = v;
          A = O => {
            let ca = O;
            C += O.length;
            C > q && (ca = Buffer.from(O, 0, q).slice(0, q), F = !0, v.removeAllListeners("data"));
            z.push(ca);
          };
          E = () => {
            x = void 0;
            var O = Buffer.concat(z);
            try {
              O = (new Cc(void 0)).decode(O);
            } catch (ca) {
            }
            a.emit("field", T, O, !1, F, D, J);
            --w;
            g();
          };
        }
        v._readableState.sync = !1;
        v.on("data", A);
        v.on("end", E);
      }).on("error", A => {
        r && r.emit("error", A);
      });
    };
    this.c.on("part", y);
  }
  end() {
    0 !== this.u || this.j.a ? this.c.writable && this.c.end() : process.nextTick(() => {
      this.j.a = !0;
      this.j.emit("finish");
    });
  }
  write(a, b) {
    (a = this.c.write(a)) && !this.g ? b() : (this.i = !a, this.a = b);
  }
}
function Sc(a) {
  a.resume();
}
class Tc extends Nb {
  constructor(a) {
    super(a);
    this.truncated = !1;
  }
  _read() {
  }
}
;const Uc = /^charset$/i;
class Vc {
  static get detect() {
    return /^application\/x-www-form-urlencoded/i;
  }
  constructor(a, {limits:b = {}, parsedConType:c, defCharset:d = "utf8"}) {
    this.i = a;
    this.u = void 0;
    const {J:e, U:f, K:g} = Kc(b);
    this.J = e;
    this.U = f;
    this.K = g;
    a = d;
    for (let h = 0, k = c.length; h < k; ++h) {
      if (Array.isArray(c[h]) && Uc.test(c[h][0])) {
        a = c[h][1].toLowerCase();
        break;
      }
    }
    this.j = new Ic;
    this.charset = a;
    this.D = 0;
    this.F = "key";
    this.c = !0;
    this.G = this.A = 0;
    this.g = this.a = "";
    this.H = this.v = !1;
  }
  write(a, b) {
    if (this.D === this.K) {
      return this.i.g || (this.i.g = !0, this.i.emit("fieldsLimit")), b();
    }
    for (var c, d, e, f = 0, g = a.length; f < g;) {
      if ("key" == this.F) {
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
            this.u = !0;
            break;
          } else {
            this.c && ++this.A;
          }
        }
        if (void 0 !== c) {
          c > f && (this.a += this.j.write(a.toString("binary", f, c))), this.F = "val", this.u = !1, this.c = !0, this.g = "", this.G = 0, this.H = !1, this.j.reset(), f = c + 1;
        } else {
          if (void 0 !== d) {
            if (++this.D, c = this.v, f = d > f ? this.a += this.j.write(a.toString("binary", f, d)) : this.a, this.u = !1, this.c = !0, this.a = "", this.A = 0, this.v = !1, this.j.reset(), f.length && this.i.emit("field", X(f, this.charset), "", c, !1), f = d + 1, this.D === this.K) {
              return b();
            }
          } else {
            this.u ? (e > f && (this.a += this.j.write(a.toString("binary", f, e))), f = e, (this.A = this.a.length) === this.U && (this.c = !1, this.v = !0)) : (f < g && (this.a += this.j.write(a.toString("binary", f))), f = g);
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
          if (this.c && this.G === this.J) {
            this.u = !0;
            break;
          } else {
            this.c && ++this.G;
          }
        }
        if (void 0 !== d) {
          if (++this.D, d > f && (this.g += this.j.write(a.toString("binary", f, d))), this.i.emit("field", X(this.a, this.charset), X(this.g, this.charset), this.v, this.H), this.F = "key", this.u = !1, this.c = !0, this.a = "", this.A = 0, this.v = !1, this.j.reset(), f = d + 1, this.D === this.K) {
            return b();
          }
        } else {
          if (this.u) {
            if (e > f && (this.g += this.j.write(a.toString("binary", f, e))), f = e, "" === this.g && 0 === this.J || (this.G = this.g.length) === this.J) {
              this.c = !1, this.H = !0;
            }
          } else {
            f < g && (this.g += this.j.write(a.toString("binary", f))), f = g;
          }
        }
      }
    }
    b();
  }
  end() {
    this.i.a || ("key" == this.F && 0 < this.a.length ? this.i.emit("field", X(this.a, this.charset), "", this.v, !1) : "val" == this.F && this.i.emit("field", X(this.a, this.charset), X(this.g, this.charset), this.v, this.H), this.i.a = !0, this.i.emit("finish"));
  }
}
;class Wc extends Lc {
  constructor(a) {
    super(a);
  }
  get i() {
    return [Rc, Vc];
  }
}
;const Xc = /^[^[]*/, Yc = /^\[(\d+)\]/, Zc = /^\[([^\]]+)\]/;
function $c(a) {
  function b() {
    return [{type:"object", key:a, da:!0}];
  }
  var c = Xc.exec(a)[0];
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
      if (g = Yc.exec(a.substring(e)), null !== g) {
        e += g[0].length, c.ea = "array", c = {type:"array", key:parseInt(g[1], 10)}, f.push(c);
      } else {
        if (g = Zc.exec(a.substring(e)), null !== g) {
          e += g[0].length, c.ea = "object", c = {type:"object", key:g[1]}, f.push(c);
        } else {
          return b();
        }
      }
    }
  }
  c.da = !0;
  return f;
}
;function ad(a) {
  return void 0 === a ? "undefined" : Array.isArray(a) ? "array" : "object" == typeof a ? "object" : "scalar";
}
function bd(a, b, c, d) {
  switch(ad(c)) {
    case "undefined":
      a[b.key] = b.append ? [d] : d;
      break;
    case "array":
      a[b.key].push(d);
      break;
    case "object":
      return bd(c, {type:"object", key:"", da:!0}, c[""], d);
    case "scalar":
      a[b.key] = [a[b.key], d];
  }
  return a;
}
function cd(a, b, c, d) {
  if (b.da) {
    return bd(a, b, c, d);
  }
  let e;
  switch(ad(c)) {
    case "undefined":
      return a[b.key] = "array" == b.ea ? [] : {}, a[b.key];
    case "object":
      return a[b.key];
    case "array":
      if ("array" == b.ea) {
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
;function dd(a, b, c) {
  $c(b).reduce(function(d, e) {
    return cd(d, e, d[e.key], c);
  }, a);
}
;function ed(a, {fieldname:b}) {
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
function fd(a, b) {
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
function gd(a, b, c) {
  "VALUE" == a.strategy ? a.req.file = c : (delete b.fieldname, Object.assign(b, c));
}
class hd {
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
;const id = {LIMIT_PART_COUNT:"Too many parts", LIMIT_FILE_SIZE:"File too large", LIMIT_FILE_COUNT:"Too many files", LIMIT_FIELD_KEY:"Field name too long", LIMIT_FIELD_VALUE:"Field value too long", LIMIT_FIELD_COUNT:"Too many fields", LIMIT_UNEXPECTED_FILE:"Unexpected field"};
function Y(a, b) {
  const c = new jd(id[a]);
  c.code = a;
  b && (c.field = b);
  return c;
}
class jd extends Error {
  constructor(a) {
    super(a);
    this.code = "";
    this.field = void 0;
  }
}
;function kd(a) {
  0 === --a.value && a.emit("zero");
}
async function ld(a) {
  await new Promise((b, c) => {
    if (0 === a.value) {
      b();
    } else {
      a.once("zero", b);
    }
    a.once("error", c);
  });
}
class md extends mc {
  constructor() {
    super();
    this.value = 0;
  }
}
;const nd = a => (a = a["content-type"]) ? a.toLowerCase().startsWith("multipart/form-data") : !1;
function od(a) {
  return async function(b, c) {
    const d = b.req;
    if (!nd(d.headers)) {
      return c();
    }
    const {limits:e = {}, storage:f, fileFilter:g, ta:h, preservePath:k} = a, l = {};
    d.body = l;
    const m = new Wc({limits:e, preservePath:k, headers:d.headers}), p = new hd(h, d), n = new md, q = [];
    let r = !1;
    m.on("field", (u, t, w, x) => {
      if (x) {
        return m.emit("error", Y("LIMIT_FIELD_VALUE", u));
      }
      if (e.fieldNameSize && u.length > e.fieldNameSize) {
        return m.emit("error", Y("LIMIT_FIELD_KEY"));
      }
      dd(l, u, t);
    });
    m.on("file", async(u, t, w, x, I) => {
      if (!w) {
        return t.resume();
      }
      if (e.fieldNameSize && u.length > e.fieldNameSize) {
        return m.emit("error", Y("LIMIT_FIELD_KEY"));
      }
      x = {fieldname:u, originalname:w, encoding:x, mimetype:I, stream:t};
      const y = ed(p, x);
      let v = !1;
      w = () => {
        if (v) {
          return fd(p, y), v;
        }
      };
      t.on("error", D => {
        kd(n);
        m.emit("error", D);
      }).on("limit", () => {
        v = !0;
        m.emit("error", Y("LIMIT_FILE_SIZE", u));
      });
      let A;
      try {
        A = await g(d, x);
      } catch (D) {
        fd(p, y);
        m.emit("error", D);
        return;
      }
      if (A) {
        n.value++;
        try {
          if (!w()) {
            var J = await f._handleFile(d, x);
            t = {...x, ...J};
            if (w()) {
              return q.push(t);
            }
            gd(p, y, t);
            q.push(t);
          }
        } catch (D) {
          fd(p, y), r ? n.emit("error", D) : m.emit("error", D);
        } finally {
          kd(n);
        }
      } else {
        fd(p, y), t.resume();
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
      await ld(n);
      const t = await pd(q, b);
      u.storageErrors = t;
      throw u;
    } finally {
      r = !0, d.unpipe(m), m.removeAllListeners();
    }
    await ld(n);
    await c();
  };
}
async function pd(a, b) {
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
;async function qd(a, b) {
  b = b.map(async c => {
    const d = N(a, c);
    return {lstat:await S(ib, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const rd = a => a.lstat.isDirectory(), sd = a => !a.lstat.isDirectory();
async function td(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  const {ignore:b = []} = {};
  if (!(await S(ib, a)).isDirectory()) {
    var c = Error("Path is not a directory");
    c.code = "ENOTDIR";
    throw c;
  }
  c = await S(lb, a);
  var d = await qd(a, c);
  c = d.filter(rd);
  d = d.filter(sd).reduce((e, f) => {
    var g = f.lstat.isDirectory() ? "Directory" : f.lstat.isFile() ? "File" : f.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return {...e, [f.relativePath]:{type:g}};
  }, {});
  c = await c.reduce(async(e, {path:f, relativePath:g}) => {
    const h = P(a, f);
    if (b.includes(h)) {
      return e;
    }
    e = await e;
    f = await td(f);
    return {...e, [g]:f};
  }, {});
  return {content:{...d, ...c}, type:"Directory"};
}
;const ud = async a => {
  await S(ob, a);
}, vd = async a => {
  const {content:b} = await td(a);
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
  c = c.map(e => N(a, e));
  await Promise.all(c.map(ud));
  d = d.map(e => N(a, e));
  await Promise.all(d.map(vd));
  await S(mb, a);
}, wd = async a => {
  (await S(ib, a)).isDirectory() ? await vd(a) : await ud(a);
};
function xd(a) {
  a = Xa(a);
  try {
    yd(a);
  } catch (b) {
    if (!/EEXIST/.test(b.message) || -1 == b.message.indexOf(a)) {
      throw b;
    }
  }
}
function yd(a) {
  try {
    jb(a);
  } catch (b) {
    if ("ENOENT" == b.code) {
      const c = Xa(a);
      yd(c);
      yd(a);
    } else {
      if ("EEXIST" != b.code) {
        throw b;
      }
    }
  }
}
;async function zd() {
  return await new Promise((a, b) => {
    Na(16, (c, d) => {
      if (c) {
        return b(c);
      }
      a(d.toString("hex"));
    });
  });
}
class Ad {
  constructor(a = {}) {
    const {filename:b = zd, destination:c = tb} = a;
    this.c = b;
    "string" == typeof c ? (xd(N(c, "file.dat")), this.a = () => c) : this.a = c;
  }
  async _handleFile(a, b) {
    const c = await this.a(a, b);
    a = await this.c(a, b);
    const d = N(c, a), e = fb(d);
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
    await wd(a);
  }
}
;const Bd = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Cd extends Pb {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {R:e = R(!0), proxyError:f} = a || {}, g = (h, k) => e(k);
    super(d);
    this.a = [];
    this.Ba = new Promise((h, k) => {
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
          const m = xb(l.stack);
          l.stack = m;
          f && g`${l}`;
        }
        k(l);
      });
      c && Bd(this, c).pipe(this);
    });
  }
  _write(a, b, c) {
    this.a.push(a);
    c();
  }
  get ha() {
    return this.Ba;
  }
}
const Dd = async(a, b = {}) => {
  ({ha:a} = new Cd({rs:a, ...b, R:R(!0)}));
  return await a;
};
class Ed {
  async _handleFile(a, b) {
    a = await Dd(b.stream, {binary:!0});
    return {buffer:a, size:a.length};
  }
  async _removeFile(a, b) {
    delete b.buffer;
    return null;
  }
}
;function Fd() {
  return !0;
}
function Gd(a, b, c) {
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
  }, ta:c};
}
class Hd {
  constructor(a = {}) {
    const {storage:b, dest:c, limits:d = {}, preservePath:e = !1, fileFilter:f = Fd} = a;
    b ? this.storage = b : c ? this.storage = new Ad({destination:c}) : this.storage = new Ed;
    this.limits = d;
    this.preservePath = e;
    this.fileFilter = f;
  }
  single(a) {
    a = Gd(this, [{name:a, maxCount:1}], "VALUE");
    return od(a);
  }
  array(a, b) {
    a = Gd(this, [{name:a, maxCount:b}], "ARRAY");
    return od(a);
  }
  fields(a) {
    a = Gd(this, a, "OBJECT");
    return od(a);
  }
  none() {
    const a = Gd(this, [], "NONE");
    return od(a);
  }
  any() {
    return od({limits:this.limits, preservePath:this.preservePath, storage:this.storage, fileFilter:this.fileFilter, ta:"ARRAY"});
  }
}
;class Id extends Hd {
  any() {
    return Jd(super.any());
  }
  array(...a) {
    return Jd(super.array(...a));
  }
  fields(...a) {
    return Jd(super.fields(...a));
  }
  none(...a) {
    return Jd(super.none(...a));
  }
  single(...a) {
    return Jd(super.single(...a));
  }
}
const Jd = a => aa([a, async function(b, c) {
  b.req.file && (b.file = b.req.file);
  b.req.files && (b.files = b.req.files);
  b.req.body && (b.request.body = b.req.body);
  b.file || b.files ? b.neoluddite("@multipart/form-data", "file") : b.request.body && b.neoluddite("@multipart/form-data", "body");
  await c();
}]);
const Kd = https.request;
const Ld = http.METHODS, Md = http.OutgoingMessage, Nd = http.createServer, Od = http.request;
const Pd = url.URL, Qd = url.Url, Rd = url.format, Sd = url.parse;
const Td = (a, b, c = {}) => {
  const {justHeaders:d, binary:e, R:f = R(!0)} = c;
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
        l = await Dd(r, {binary:e});
        p = l.length;
      }
      n();
    }).on("error", r => {
      r = f(r);
      q(r);
    }).on("timeout", () => {
      g.abort();
    });
  })).then(() => ({body:l, headers:h, ...k, $a:m, byteLength:p, va:null}));
  return {req:g, ha:c};
};
const Ud = (a = {}) => Object.keys(a).reduce((b, c) => {
  const d = a[c];
  c = `${encodeURIComponent(c)}=${encodeURIComponent(d)}`;
  return [...b, c];
}, []).join("&").replace(/%20/g, "+"), Vd = async(a, b, {data:c, justHeaders:d, binary:e, R:f = R(!0)}) => {
  const {req:g, ha:h} = Td(a, b, {justHeaders:d, binary:e, R:f});
  g.end(c);
  a = await h;
  if ((a.headers["content-type"] || "").startsWith("application/json") && a.body) {
    try {
      a.va = JSON.parse(a.body);
    } catch (k) {
      throw f = f(k), f.response = a.body, f;
    }
  }
  return a;
};
let Wd;
try {
  const {version:a, name:b} = require("../package.json");
  Wd = "@rqt/aqt" == b ? `@rqt/aqt/${a}` : `@rqt/aqt via ${b}/${a}`;
} catch (a) {
  Wd = "@aqt/rqt";
}
const Xd = ma("aqt"), Yd = async(a, b = {}) => {
  const {data:c, type:d = "json", headers:e = {"User-Agent":`Mozilla/5.0 (Node.JS) ${Wd}`}, compress:f = !0, binary:g = !1, justHeaders:h = !1, method:k, timeout:l} = b;
  b = R(!0);
  const {hostname:m, protocol:p, port:n, path:q} = Sd(a), r = "https:" === p ? Kd : Od, u = {hostname:m, port:n, path:q, headers:{...e}, timeout:l, method:k};
  if (c) {
    var t = d;
    var w = c;
    switch(t) {
      case "json":
        w = JSON.stringify(w);
        t = "application/json";
        break;
      case "form":
        w = Ud(w), t = "application/x-www-form-urlencoded";
    }
    w = {data:w, contentType:t};
    ({data:t} = w);
    w = w.contentType;
    u.method = k || "POST";
    "Content-Type" in u.headers || (u.headers["Content-Type"] = w);
    "Content-Length" in u.headers || (u.headers["Content-Length"] = Buffer.byteLength(t));
  }
  !f || "Accept-Encoding" in u.headers || (u.headers["Accept-Encoding"] = "gzip, deflate");
  const {body:x, headers:I, byteLength:y, statusCode:v, statusMessage:A, $a:J, va:D} = await Vd(r, u, {data:t, justHeaders:h, binary:g, R:b});
  Xd("%s %s B%s", a, y, `${y != J ? ` (raw ${J} B)` : ""}`);
  return {body:D ? D : x, headers:I, statusCode:v, statusMessage:A};
};
const Zd = async(a, b = {}) => {
  ({body:a} = await Yd(a, b));
  return a;
}, $d = async(a, b = {}) => {
  ({body:a} = await Yd(a, b));
  return a;
};
function ae(a, b, c, d) {
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
        await Zd(`${c}/use?key=${d}`, {data:e});
      } catch (g) {
        a.emit("error", g);
      }
    }
  };
}
;async function be(a) {
  a = eb(a);
  return await Dd(a);
}
;const ce = vm.Script;
const de = (a, b) => {
  const [c, , d] = a.split("\n");
  a = parseInt(c.replace(/.+?(\d+)$/, (f, g) => g)) - 1;
  const e = d.indexOf("^");
  ({length:b} = b.split("\n").slice(0, a).join("\n"));
  return b + e + (a ? 1 : 0);
};
const ee = a => {
  try {
    new ce(a);
  } catch (b) {
    const c = b.stack;
    if (!/Unexpected token '?</.test(b.message)) {
      throw b;
    }
    return de(c, a);
  }
  return null;
};
function fe(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const b = a.re instanceof RegExp;
  a = -1 != ["string", "function"].indexOf(typeof a.replacement);
  return b && a;
}
const ge = (a, b) => {
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
function he(a, b) {
  function c() {
    return b.filter(fe).reduce((d, {re:e, replacement:f}) => {
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
            ge(g, l);
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
;const ie = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), je = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, ke = (a, b) => Object.keys(a).reduce((c, d) => {
  {
    var e = a[d];
    const {getReplacement:f = je, getRegex:g = ie} = b || {}, h = g(d);
    e = {name:d, re:e, regExp:h, getReplacement:f, map:{}, lastIndex:0};
  }
  return {...c, [d]:e};
}, {}), le = a => {
  var b = [];
  const c = a.map;
  return {re:a.regExp, replacement(d, e) {
    d = c[e];
    delete c[e];
    e = Array.isArray(b) ? b : [b];
    return he(d, e);
  }};
}, me = a => {
  const b = a.map, c = a.getReplacement, d = a.name;
  return {re:a.re, replacement(e) {
    const f = a.lastIndex;
    b[f] = e;
    a.lastIndex += 1;
    return c(d, f);
  }};
};
async function ne(a, b) {
  return oe(a, b);
}
class pe extends Ob {
  constructor(a, b) {
    super(b);
    this.a = (Array.isArray(a) ? a : [a]).filter(fe);
    this.I = !1;
    this.c = b;
  }
  async replace(a, b) {
    const c = new pe(this.a, this.c);
    b && Object.assign(c, b);
    a = await ne(c, a);
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
            ge(f, l);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(c, () => h.shift());
          } catch (h) {
            ge(f, h);
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
      a = xb(d.stack), d.stack = a, c(d);
    }
  }
}
async function oe(a, b) {
  b instanceof Mb ? b.pipe(a) : a.end(b);
  return await Dd(a);
}
;const qe = a => {
  [, a] = /<\s*(.+?)(?:\s+[\s\S]+)?\s*\/?\s*>/.exec(a) || [];
  return a;
}, se = (a, {ka:b = !1, classNames:c = [], renameMap:d = {}} = {}) => {
  let e = 0;
  const f = [];
  let g;
  he(a, [{re:/[{}]/g, replacement(n, q) {
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
    const [, u, t, w, x] = /(\s*)(\S+)(\s*)=(\s*)$/.exec(n) || [];
    q = a.slice(q + 1, r);
    if (!t && !/\s*\.\.\./.test(q)) {
      throw Error("Could not detect prop name");
    }
    t ? h[t] = q : k.push(q);
    l[t] = {before:u, ra:w, qa:x};
    q = n || "";
    q = q.slice(0, q.length - (t || "").length - 1);
    const {ga:I, T:y} = re(q);
    Object.assign(h, I);
    Object.assign(l, y);
    return r + 1;
  }, 0);
  if (f.length) {
    m = a.slice(m);
    const {ga:n, T:q} = re(m);
    Object.assign(h, n);
    Object.assign(l, q);
  } else {
    const {ga:n, T:q} = re(a);
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
  return {fa:p, ba:k, T:l};
}, re = a => {
  const b = [], c = {};
  a.replace(/(\s*)(\S+)(\s*)=(\s*)(["'])([\s\S]*?)\5/g, (d, e, f, g, h, k, l, m) => {
    c[f] = {before:e, ra:g, qa:h};
    b.push({l:m, name:f, za:`${k}${l}${k}`});
    return "%".repeat(d.length);
  }).replace(/(\s*)([^\s%]+)/g, (d, e, f, g) => {
    c[f] = {before:e};
    b.push({l:g, name:f, za:"true"});
  });
  return {ga:[...b.reduce((d, {l:e, name:f, za:g}) => {
    d[e] = [f, g];
    return d;
  }, [])].filter(Boolean).reduce((d, [e, f]) => {
    d[e] = f;
    return d;
  }, {}), T:c};
}, te = (a, b = [], c = !1, d = {}, e = "") => {
  const f = Object.keys(a);
  return f.length || b.length ? `{${f.reduce((g, h) => {
    const k = a[h], l = c || -1 != h.indexOf("-") ? `'${h}'` : h, {before:m = "", ra:p = "", qa:n = ""} = d[h] || {};
    return [...g, `${m}${l}${p}:${n}${k}`];
  }, b).join(",")}${e}}` : "{}";
}, ue = (a = "") => {
  [a] = a;
  if (!a) {
    throw Error("No tag name is given");
  }
  return a.toUpperCase() == a;
}, ve = (a, b = {}, c = [], d = [], e = !1, f = null, g = {}, h = "") => {
  const k = ue(a), l = k ? a : `'${a}'`;
  if (!Object.keys(b).length && !c.length && !d.length) {
    return `h(${l})`;
  }
  const m = k && "dom" == e ? !1 : e;
  k || !d.length || e && "dom" != e || f && f(`JSX: destructuring ${d.join(" ")} is used without quoted props on HTML ${a}.`);
  a = te(b, d, m, g, h);
  b = c.reduce((p, n, q) => {
    q = c[q - 1];
    let r = "";
    q && /^\/\*[\s\S]*\*\/$/.test(q) ? r = "" : q && /\S/.test(q) && (r = ",");
    return `${p}${r}${n}`;
  }, "");
  return `h(${l},${a}${b ? `,${b}` : ""})`;
};
const we = (a, b = []) => {
  let c = 0, d;
  a = he(a, [...b, {re:/[<>]/g, replacement(e, f) {
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
  return {Za:a, sa:d};
}, ye = a => {
  const b = qe(a);
  let c;
  const {Ca:d} = ke({Ca:/=>/g});
  try {
    ({Za:k, sa:c} = we(a, [me(d)]));
  } catch (l) {
    if (1 === l) {
      throw Error(`Could not find the matching closing > for ${b}.`);
    }
  }
  const e = k.slice(0, c + 1);
  var f = e.replace(/<\s*[^\s/>]+/, "");
  if (/\/\s*>$/.test(f)) {
    return a = f.replace(/\/\s*>$/, ""), f = "", new xe({N:e.replace(d.regExp, "=>"), props:a.replace(d.regExp, "=>"), content:"", tagName:b});
  }
  a = f.replace(/>$/, "");
  f = c + 1;
  c = !1;
  let g = 1, h;
  he(k, [{re:new RegExp(`[\\s\\S](?:<\\s*${b}(\\s+|>)|/\\s*${b}\\s*>)`, "g"), replacement(l, m, p, n) {
    if (c) {
      return l;
    }
    m = !m && l.endsWith(">");
    const q = !m;
    if (q) {
      n = n.slice(p);
      const {sa:r} = we(n.replace(/^[\s\S]/, " "));
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
  return new xe({N:k, props:a.replace(d.regExp, "=>"), content:f.replace(d.regExp, "=>"), tagName:b});
};
class xe {
  constructor(a) {
    this.N = a.N;
    this.props = a.props;
    this.content = a.content;
    this.tagName = a.tagName;
  }
}
;const ze = a => {
  let b = "", c = "";
  a = a.replace(/^(\r?\n\s*)([\s\S]+)?/, (d, e, f = "") => {
    b = e;
    return f;
  }).replace(/([\s\S]+?)?(\r?\n\s*)$/, (d, e = "", f = "") => {
    c = f;
    return e;
  });
  return `${b}${a ? `\`${a}\`` : ""}${c}`;
}, Be = a => {
  const b = [];
  let c = {}, d = 0, e = 0;
  he(a, [{re:/[<{}]/g, replacement(f, g) {
    if (!(g < e)) {
      if (/[{}]/.test(f)) {
        d += "{" == f ? 1 : -1, 1 == d && void 0 == c.from ? c.from = g : 0 == d && (c.xa = g + 1, c.Ia = a.slice(c.from + 1, g), b.push(c), c = {});
      } else {
        if (d) {
          return f;
        }
        f = ye(a.slice(g));
        e = g + f.N.length;
        c.Ja = f;
        c.xa = e;
        c.from = g;
        b.push(c);
        c = {};
      }
    }
  }}, {}]);
  return b.length ? Ae(a, b) : [ze(a)];
}, Ae = (a, b) => {
  let c = 0;
  b = b.reduce((d, {from:e, xa:f, Ia:g, Ja:h}) => {
    (e = a.slice(c, e)) && d.push(ze(e));
    c = f;
    g ? d.push(g) : h && d.push(h);
    return d;
  }, []);
  if (c < a.length) {
    const d = a.slice(c, a.length);
    d && b.push(ze(d));
  }
  return b;
};
const De = (a, b = {}) => {
  var c = b.quoteProps, d = b.warn;
  const e = b.prop2class, f = b.classNames, g = b.renameMap;
  var h = ee(a);
  if (null === h) {
    return a;
  }
  var k = a.slice(h);
  const {props:l = "", content:m, tagName:p, N:{length:n}} = ye(k);
  k = Ce(m, c, d, b);
  const {fa:q, ba:r, T:u} = se(l.replace(/^ */, ""), {ka:e, classNames:f, renameMap:g});
  d = ve(p, q, k, r, c, d, u, /\s*$/.exec(l) || [""]);
  c = a.slice(0, h);
  a = a.slice(h + n);
  h = n - d.length;
  0 < h && (d = `${" ".repeat(h)}${d}`);
  a = `${c}${d}${a}`;
  return De(a, b);
}, Ce = (a, b = !1, c = null, d = {}) => a ? Be(a).reduce((e, f) => {
  if (f instanceof xe) {
    const {props:k = "", content:l, tagName:m} = f, {fa:p, ba:n} = se(k, {ka:d.prop2class, classNames:d.classNames, renameMap:d.renameMap});
    f = Ce(l, b, c, d);
    f = ve(m, p, f, n, b, c);
    return [...e, f];
  }
  const g = ee(f);
  if (g) {
    var h = f.slice(g);
    const {N:{length:k}, props:l = "", content:m, tagName:p} = ye(h), {fa:n, ba:q} = se(l, {ka:d.prop2class, classNames:d.classNames, renameMap:d.renameMap});
    h = Ce(m, b, c, d);
    h = ve(p, n, h, q, b, c);
    const r = f.slice(0, g);
    f = f.slice(g + k);
    return [...e, `${r}${h}${f}`];
  }
  return [...e, f];
}, []) : [];
const Ee = (a, b = {}) => {
  const {e:c, Fa:d, Ha:e, l:f, Pa:g, Qa:h} = ke({Fa:/^ *export\s+default\s+{[\s\S]+?}/mg, e:/^ *export\s+(?:default\s+)?/mg, Ha:/^ *export\s+{[^}]+}\s+from\s+(['"])(?:.+?)\1/mg, l:/^ *import(\s+([^\s,]+)\s*,?)?(\s*{(?:[^}]+)})?\s+from\s+['"].+['"]/gm, Pa:/^ *import\s+(?:(.+?)\s*,\s*)?\*\s+as\s+.+?\s+from\s+['"].+['"]/gm, Qa:/^ *import\s+['"].+['"]/gm}, {getReplacement(k, l) {
    return `/*%%_RESTREAM_${k.toUpperCase()}_REPLACEMENT_${l}_%%*/`;
  }, getRegex(k) {
    return new RegExp(`/\\*%%_RESTREAM_${k.toUpperCase()}_REPLACEMENT_(\\d+)_%%\\*/`, "g");
  }});
  a = he(a, [me(e), me(d), me(c), me(f), me(g), me(h)]);
  b = De(a, b);
  return he(b, [le(e), le(d), le(c), le(f), le(g), le(h)]);
};
const Fe = async a => {
  try {
    return await S(ib, a);
  } catch (b) {
    return null;
  }
};
const He = async a => {
  var b = await Fe(a);
  let c = a, d = !1;
  if (!b) {
    if (c = await Ge(a), !c) {
      throw Error(`${a}.js or ${a}.jsx is not found.`);
    }
  } else {
    if (b.isDirectory()) {
      b = !1;
      let e;
      a.endsWith("/") || (e = c = await Ge(a), b = !0);
      if (!e) {
        c = await Ge(N(a, "index"));
        if (!c) {
          throw Error(`${b ? `${a}.jsx? does not exist, and ` : ""}index.jsx? file is not found in ${a}`);
        }
        d = !0;
      }
    }
  }
  return {path:a.startsWith(".") ? P("", c) : c, Ra:d};
}, Ge = async a => {
  a = `${a}.js`;
  let b = await Fe(a);
  b || (a = `${a}x`);
  if (b = await Fe(a)) {
    return a;
  }
};
function Ie(a, b, c) {
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
;function Je(a) {
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
function Ke(a) {
  return La("sha1").update(`${a}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`, "binary").digest("base64");
}
;function Le(a, b = {}) {
  const {onMessage:c = () => {
  }, onConnect:d = () => {
  }, log:e = !0} = b, f = {};
  a.on("upgrade", function(g, h) {
    if ("websocket" != g.headers.upgrade) {
      h.end("HTTP/1.1 400 Bad Request");
    } else {
      var k = g.headers["sec-websocket-protocol"], l = g.headers["sec-websocket-key"];
      g = ["HTTP/1.1 101 Web Socket Protocol Handshake", "Upgrade: WebSocket", "Connection: Upgrade", `Sec-WebSocket-Accept: ${Ke(l)}`];
      (k ? k.split(",").map(m => m.trim()) : []).includes("json") && g.push("Sec-WebSocket-Protocol: json");
      h.write(g.join("\r\n") + "\r\n\r\n");
      e && console.log(ya("Client connected.", "green"));
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
              for (let t = 0, w = 0; t < n; ++t, w = t % 4) {
                q = 3 == w ? 0 : 3 - w << 3;
                q = (0 == q ? r : r >>> q) & 255;
                const x = m.readUInt8(p++);
                u.writeUInt8(q ^ x, t);
              }
            } else {
              m.copy(u, 0, p++);
            }
            m = `${u}`;
          } else {
            m = void 0;
          }
        }
        m ? c(l, m) : null === m && (delete f[l], e && console.log(ya("Client disconnected.", "red")));
      });
      f[l] = (m, p) => {
        h.write(Je({event:m, message:p}));
      };
      d(l);
    }
  });
  return f;
}
;let Me;
const Oe = async(a, b, c = {}) => {
  Me || ({root:Me} = ab(process.cwd()));
  const {fields:d, soft:e = !1} = c;
  var f = N(a, "node_modules", b);
  f = N(f, "package.json");
  const g = await Fe(f);
  if (g) {
    a = await Ne(f, d);
    if (void 0 === a) {
      throw Error(`The package ${P("", f)} does export the module.`);
    }
    if (!a.entryExists && !e) {
      throw Error(`The exported module ${a.main} in package ${b} does not exist.`);
    }
    const {entry:h, version:k, packageName:l, main:m, entryExists:p, ...n} = a;
    return {entry:P("", h), packageJson:P("", f), ...k ? {version:k} : {}, packageName:l, ...m ? {hasMain:!0} : {}, ...p ? {} : {entryExists:!1}, ...n};
  }
  if (a == Me && !g) {
    throw Error(`Package.json for module ${b} not found.`);
  }
  return Oe(N(bb(a), ".."), b, c);
}, Ne = async(a, b = []) => {
  const c = await be(a);
  let d, e, f, g, h;
  try {
    ({module:d, version:e, name:f, main:g, ...h} = JSON.parse(c)), h = b.reduce((l, m) => {
      l[m] = h[m];
      return l;
    }, {});
  } catch (l) {
    throw Error(`Could not parse ${a}.`);
  }
  a = Xa(a);
  b = d || g;
  if (!b) {
    if (!await Fe(N(a, "index.js"))) {
      return;
    }
    b = g = "index.js";
  }
  a = N(a, b);
  let k;
  try {
    ({path:k} = await He(a)), a = k;
  } catch (l) {
  }
  return {entry:a, version:e, packageName:f, main:!d && g, entryExists:!!k, ...h};
};
const Qe = async(a, b, {mount:c, override:d = {}}) => {
  var e = async(f, g, h) => {
    var k = Xa(a);
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
    ({packageJson:k} = await Oe(k, l));
    f = bb(k);
    k = Xa(f);
    if (m) {
      return Pe(k, m, g, c);
    }
    ({module:f} = require(f));
    return f ? Pe(k, f, g, c) : (console.warn("[\u219b] Package %s does not specify module in package.json, trying src", k), Pe(k, "src", g));
  };
  e = new pe([{re:/^( *import(?:\s+[^\s,]+\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+)['"](.+)['"]/gm, replacement:e}, {re:/^( *import\s+)['"](.+)['"]/gm, replacement:e}]);
  e.end(b);
  return await Dd(e);
}, Pe = (a, b, c, d) => {
  a = N(a, b);
  b = P("", a);
  d && (b = P(d, b));
  return `${c}'/${b}${/[/\\]$/.test(a) ? "/" : ""}'`.replace(/\\/g, "/");
};
function Re(a = "") {
  let b;
  window["FRONTEND-STYLE-ID"] ? (b = window["FRONTEND-STYLE-ID"], b.innerText = "") : (b = document.createElement("style"), b.id = "FRONTEND-STYLE-ID", document.head.appendChild(b));
  b.type = "text/css";
  b.styleSheet ? b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a));
}
;const Se = a => {
  const b = Ie(/^export\s+(default\s+)?class\s+([^\s{]+)/gm, a, ["def", "name"]).reduce((g, {def:h, name:k}) => {
    if ("extends" == k) {
      return g;
    }
    g[h ? "default" : k] = k;
    return g;
  }, {}), c = Ie(/^class\s+([^\s{]+)/gm, a, ["name"]).map(({name:g}) => g).filter(g => "extends" != g), d = Ie(/^export\s+{([^}]+)}/gm, a, ["exp"]).reduce((g, {exp:h}) => [...g, ...h.split(/\s+/).filter(Boolean)], []), {$:e, Z:f} = d.reduce(({Z:g, $:h}, k) => {
    c.includes(k) ? h.push(k) : g.push(k);
    return {Z:g, $:h};
  }, {Z:[], $:[]});
  e.forEach(g => b[g] = g);
  a = Ie(/^export\s+default\s+(\S+)/gm, a, ["name"]).map(({name:g}) => g).filter(g => c.includes(g));
  [a] = a;
  a && (b["default"] = a);
  return {Da:b, Wa:f};
}, Te = a => Ie(/^export\s+(const|let)\s+(\S+)\s+=/gm, a, ["type", "name"]).reduce((b, {name:c}) => {
  b[c] = c;
  return b;
}, {}), Ue = (a, b, c, d = null) => {
  b = Object.entries(b).map(([e, f]) => `'${e}': ${f},`);
  return `/* IDIO HOT RELOAD */
${d ? `import { idioHotReload } from '${d}'` : "const idioHotReload = window.idioHotReload"}
if (idioHotReload) {
  let _idio = 0
  idioHotReload('${a}', async () => {
    _idio++
    const module = await import(\`./${Wa(a).replace(/\.jsx?$/, "")}?ihr=\${_idio}\`)
${Object.keys(c).map(e => `    ${e} = module['${e}']`).join("\n")}
    return {
      module,${b.length ? `
      classes: {
${b.map(e => `        ${e}`).join(Q)}
      },` : ""}
    }
  })
}`.replace(/\r?\n/g, Q);
};
let Ve, We, Xe, Ye;
function Ze(a = {}) {
  const {directory:b = "frontend", pragma:c = "import { h } from 'preact'", mount:d = ".", jsxOptions:e, exportClasses:f = !0, hotReload:g} = a;
  let {log:h, override:k = {}} = a;
  !0 === h && (h = console.log);
  let l = Array.isArray(b) ? b : [b];
  l = l.map(q => {
    const r = N(d, q);
    if (!hb(r)) {
      throw Error(`Frontend directory ${q} does not exist.`);
    }
    return q.replace(/\\/g, "/");
  });
  let m = {}, p;
  g && (g.path || (g.path = "/hot-reload"), "module" in g || (g.module = !0), "ignoreNodeModules" in g || (g.ignoreNodeModules = !0), {watchers:a = {}} = g, m.oa = a, m.la = {}, k = {...k, "@idio/hot-reload":g.path}, a = g.path, p = [a, a.replace(/\.jsx?$/, "")].filter((q, r, u) => u.indexOf(q) == r));
  let n = !1;
  return async(q, r) => {
    if (g && p.includes(q.path)) {
      q.type = "js", g.module && !Ye ? Ye = kb(N(__dirname, "listener.mjs")) : g.module || Xe || (Xe = kb(N(__dirname, "listener.js"))), q.body = g.module ? Ye : Xe, n || (q = g.getServer(), m.la = Le(q), n = !0);
    } else {
      var u = q.path.replace("/", "");
      if (!(l.includes(u) || l.some(y => u.startsWith(`${y}/`)) || q.path.startsWith("/node_modules/"))) {
        return r();
      }
      u = N(d, u).replace(/\\/g, "/");
      var {path:t, Ra:w} = await He(u);
      if (w && !u.endsWith("/")) {
        r = d ? P(d, t).replace(/\\/g, "/") : t, q.redirect(`/${r}`);
      } else {
        try {
          var x = await S(ib, t);
        } catch (y) {
          q.status = 404;
          return;
        }
        q.status = 200;
        q.etag = `${x.mtime.getTime()}`;
        if (q.fresh) {
          return q.status = 304, r();
        }
        r = await be(t);
        x = (new Date).getTime();
        r = await $e(t, r, c, {mount:d, override:k, jsxOptions:e, exportClasses:f});
        var I = (new Date).getTime();
        h && h("%s patched in %sms", t, I - x);
        q.type = "application/javascript";
        g && !q.query.ib && (r = af(t, r, g, m));
        q.body = r;
      }
    }
  };
}
const af = (a, b, c, d) => {
  var e = c.ignoreNodeModules, f = c.module;
  c = c.path;
  if (a.startsWith("node_modules") && e) {
    return b;
  }
  const g = L("[@idio/frontend]", "grey");
  try {
    Ve || (Ve = require("node-watch"));
  } catch (m) {
    console.error("%s node-watch is recommended for front-end hot reload.", g), console.error("%s Falling back to standard watch.", g), We = !0, Ve = require("fs").watch;
  }
  a in d.oa || (e = Ve(a, (m, p) => {
    console.error("%s File %s changed", g, L(p, "yellow"));
    Object.values(d.la).forEach(n => {
      n("update", {filename:We ? a : p});
    });
  }), d.oa[a] = e);
  const {Da:h, Wa:k = []} = Se(b), l = Te(b);
  k.forEach(m => {
    l[m] = m;
  });
  f = Ue(a, h, l, f ? c : null);
  b = b.replace(/^export(\s+)const(\s+)(\S+)\s+=/gm, m => m.replace("const", "let"));
  k.length && (b = b.replace(new RegExp(`^const(\\s+(?:${k.join("|")})\\s+)`, "gm"), "let$1"));
  return b += `${Q}${Q}${f}`;
}, $e = async(a, b, c, d) => {
  const e = d.jsxOptions, f = d.exportClasses;
  /\.jsx$/.test(a) && (b = Ee(b, e), c && (b = `${c}${Q}${b}`));
  return b = /\.css$/.test(a) ? bf(b, {exportClasses:f, path:a}) : await Qe(a, b, d);
}, bf = (a, {exportClasses:b = !0, path:c = ""} = {}) => {
  var d = [];
  b && (d = a.split(/\r?\n/).filter(e => /^\S/.test(e)).join(Q), d = Ie(/\.([\w\d_-]+)/g, d, ["className"]).map(({className:e}) => e).filter((e, f, g) => g.indexOf(e) == f));
  c = c.replace(/\.css$/, "").replace(/[/\\]/g, "-").replace(/[^\w\d_-]/g, "");
  return `(${Re.toString().replace(/FRONTEND-STYLE-ID/g, c)})(\`${a}\`)
${d.map(e => `export const $${e} = '${e}'`).join(Q)}`.replace(/\r?\n/g, Q).trim();
};
const cf = querystring.parse, df = querystring.stringify;
const ef = async(a, b, c, d) => {
  a.session.token = b;
  a.session.scope = c;
  a.session.user = d;
  await a.session.manuallyCommit();
  a.redirect("/");
};
function ff(a, b) {
  if (!b) {
    throw Error("Config with at least client_id and client_secret is required.");
  }
  const {client_id:c = "", client_secret:d = "", path:e = "/auth/github", redirectPath:f = `${e}/redirect`, scope:g = "", error:h = (n, q, r) => {
    throw Error(r);
  }, finish:k = ef, session:l} = b;
  c || console.warn("[github] No client id - the dialog won't work.");
  d || console.warn("[github] No client secret - the redirect won't work.");
  const m = async n => {
    if (!n.session) {
      throw Error("Cannot start github middleware because session was not started.");
    }
    var q = Math.floor(10000 * Math.random());
    n.session["githib-state"] = q;
    await n.session.manuallyCommit();
    const r = gf(n, f);
    q = hf({ia:r, client_id:c, scope:g, state:q});
    n.redirect(q);
  }, p = async(n, q) => {
    var r = gf(n, f);
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
      var {access_token:w, scope:x} = await jf({client_id:c, client_secret:d, ia:r, code:t, state:u});
      r = [kf(w), .../user:email/.test(x) ? [lf(w)] : []];
      var [I, y] = await Promise.all(r);
      y && (I.emails = y);
      await k(n, w, x, I, q);
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
const kf = async a => await mf({ya:a, path:"user"}), lf = async a => await mf({ya:a, path:"user/emails"}), mf = async a => {
  var b = a.ya;
  const c = `https://api.github.com/${a.path}`;
  a = df(a.data);
  b = await $d(`${c}?${a}`, {headers:{Authorization:`token ${b}`, Accept:"application/json", "User-Agent":"@idio/github http://github.com/idiocc/github"}});
  if (b.message) {
    throw Error(b.message);
  }
  return b;
}, jf = async({code:a, client_id:b, client_secret:c, ia:d, state:e}) => {
  const {access_token:f, scope:g, token_type:h, error:k, error_description:l} = await $d("https://github.com/login/oauth/access_token", {data:{code:a, redirect_uri:d, client_id:b, client_secret:c, ...e ? {state:e} : {}}, headers:{Accept:"application/json"}});
  if (k) {
    throw a = Error(l), a.type = k, a;
  }
  return {access_token:f, scope:g, token_type:h};
}, hf = ({ia:a, client_id:b, scope:c, state:d}) => `https://www.github.com/login/oauth/authorize?${df({client_id:b, redirect_uri:a, ...d ? {state:d} : {}, ...c ? {scope:c} : {}})}`, gf = ({protocol:a, host:b}, c) => [/\.ngrok\.io$/.test(b) ? "https" : a, "://", b, c].join("");
const nf = async(a, {ab:b, query:c = {}} = {}, d) => {
  const e = R();
  c = df(c);
  const {error:f, ...g} = await Zd(`${/^https?:\/\//.test(a) ? a : `http://${a}`}${c ? `?${c}` : ""}`, {...b, data:d});
  if (f) {
    throw a = Error("string" == typeof f ? f : f.reason), f.type && (a.type = f.type), e(a);
  }
  return g;
};
const pf = (a, b) => {
  const {app:c, index:d = c, pipeline:e = "info", url:f, timeout:g = 5000, strategy:h = of} = b, {request:{ip:k, path:l}, headers:{...m}, method:p, status:n, query:q} = a;
  b = new Date;
  a = {app:c, method:p, ip:k, path:decodeURI(l), headers:{"user-agent":"", ...m, cookie:void 0}, status:n, date:b};
  Object.keys(q).length && (a.query = q);
  b = h(d, b);
  nf(`${f}/${b}/_doc`, {ab:{method:"POST", timeout:g}, query:{pipeline:e}}, a).then(() => {
  }).catch(({message:r}) => {
    console.log(`Logarithm ERROR: ${r}`);
  });
}, qf = a => {
  if (!a) {
    throw Error("Options are not given");
  }
  if (!a.app) {
    throw Error("The app is not defined");
  }
  return async(b, c) => {
    const d = b.onerror;
    let e = !1;
    b.onerror = f => {
      d.call(b, f);
      f && (e = !0, pf(b, a));
    };
    await c();
    e ? console.log("[logarithm] Error has been handled by context but not thrown in middleware chain.") : pf(b, a);
  };
}, of = (a, b) => `${a}-${b.getFullYear()}.${b.getMonth() + 1}`;
const rf = {["static"](a, b, c) {
  const {root:d = [], mount:e, ...f} = c;
  if (!Array.isArray(d)) {
    return a = Gb(d, f), e ? Ka(e, a) : a;
  }
  a = d.map(g => Gb(g, {...f}));
  a = aa(a);
  return e ? Ka(e, a) : a;
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
    e = new Ra(d, f);
    kc("Created Keygrip instance with %s algorithm", f);
  }
  if (!(!1 === g.signed || e || d && 0 in d)) {
    throw Error("Session keys are signed by default, unless you set signed=false, you must provide an array with keys.");
  }
  e ? kc("session: Setting a Keygrip instance on the app") : d ? kc("session: Setting an array of keys of length %s on the app", d.length) : kc("session: the cookies won't be signed as no keys are provided.");
  a.keys = e || d;
  return hc(g);
}, ["cors"](a, b, c) {
  const {origin:d, ...e} = c;
  a = Array.isArray(d) ? f => {
    const g = f.get("Origin");
    return d.find(h => h == g);
  } : d;
  return Va({origin:a, ...e});
}, form:function(a, b, c) {
  const {any:d, array:e, none:f, fields:g, single:h, ...k} = c;
  return d ? (new Id(k)).any() : e ? (new Id(k)).array(e.name, e.maxFiles) : f ? (new Id(k)).none() : g ? (new Id(k)).fields(g) : h ? (new Id(k)).single(h) : new Id(k);
}, frontend:function(a, b, c, d, e) {
  !0 === c.hotReload && (c.hotReload = {});
  a = c.hotReload;
  let f;
  a && (a.getServer || (a.getServer = e.getServer), a.watchers ? f = a.watchers : (f = {}, a.watchers = f));
  c = Ze(c);
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
      k.statusCode && 400 <= k.statusCode && 500 > k.statusCode && (k.message = k.message.replace(/^([^!])/, "!$1")), k.stack = xb(k.stack, f ? {ignoredModules:["@idio/idio"]} : void 0), k.message.startsWith("!") ? (g.body = {error:k.message.replace("!", ""), stack:e ? k.stack : void 0}, d && console.log(k.message)) : (g.body = {error:"internal server error", stack:e ? k.stack : void 0}, a.emit("error", k));
    }
  };
}, ["logarithm"](a, b, c) {
  return qf(c);
}, jsonBody:function() {
  return async function(a, b) {
    if (!a.is("json")) {
      return b();
    }
    let c = await Dd(a.req);
    try {
      c = JSON.parse(c);
    } catch (d) {
      a.throw(400, "Could not parse JSON.");
    }
    a.request.body = c;
    return b();
  };
}, github:function(a, b, c, d) {
  if (!d.session) {
    throw Error("You need to configure session before GitHub middleware.");
  }
  let {path:e, paths:f, redirectPath:g, scope:h, ...k} = c;
  if (f && !g) {
    throw Error("When giving multiple paths, the redirect path is also required.");
  }
  f || (f = {[e]:h});
  Object.entries(f).forEach(([l, m]) => {
    ff(a, {path:l, scope:m, redirectPath:g, ...k, session:d.session});
  });
}};
async function sf(a, b, c, d, e = {}) {
  if ("function" == typeof b) {
    return a = b, c.use(a), a;
  }
  !0 === b && (b = {use:!0});
  const {use:f, config:g = {}, middlewareConstructor:h, ...k} = b;
  if (a in rf) {
    b = rf[a];
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
async function tf(a, b, c = {}) {
  const {neoluddite:d, ...e} = a;
  if (d) {
    const {app:f, env:g, key:h, host:k = "https://neoluddite.dev"} = d;
    if (!h) {
      throw Error("key is expected for neoluddite integration.");
    }
    b.use(ae(f, g, k, h));
  }
  return await Object.keys(e).reduce(async(f, g) => {
    f = await f;
    var h = a[g];
    Array.isArray(h) ? (h = h.map(async k => await sf(g, k, b, f, c)), h = await Promise.all(h)) : h = await sf(g, h, b, f, c);
    return {...f, [g]:h};
  }, {});
}
;/*
 MIT 2014 Jordan Harband
 https://github.com/ljharb/is-generator-function
*/
const uf = Object.prototype.toString, vf = Function.prototype.toString, wf = /^\s*(?:function)?\*/, xf = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, yf = Object.getPrototypeOf;
var zf;
a: {
  if (xf) {
    try {
      zf = Function("return function*() {}")();
      break a;
    } catch (a) {
    }
    zf = void 0;
  } else {
    zf = !1;
  }
}
const Af = zf, Bf = Af ? yf(Af) : {};
/*
 ee-first
 Copyright(c) 2014 Jonathan Ong
 MIT Licensed
*/
function Cf(a, b) {
  function c() {
    d();
    b.apply(null, arguments);
  }
  function d() {
    for (var n, q = 0; q < f.length; q++) {
      n = f[q], n.Ga.removeListener(n.event, n.Ma);
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
      var m = h[l], p = Df(m, c);
      k.on(m, p);
      f.push({Ga:k, event:m, Ma:p});
    }
  }
  e.cancel = d;
  return e;
}
function Df(a, b) {
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
function Ef(a, b) {
  var c = a.socket;
  c = "boolean" == typeof a.finished ? !!(a.finished || c && !c.writable) : "boolean" == typeof a.complete ? !(!a.upgrade && c && c.readable && (!a.complete || a.readable)) : void 0;
  !1 !== c ? setImmediate(b, null, a) : (c = a.__onFinished, c && c.S || (c = a.__onFinished = Ff(a), Gf(a, c)), c.S.push(b));
}
function Gf(a, b) {
  function c(h) {
    g.cancel();
    e.cancel();
    f = !0;
    b(h);
  }
  function d(h) {
    a.removeListener("socket", d);
    f || g === e && (e = Cf([[h, "error", "close"]], c));
  }
  var e, f = !1;
  var g = e = Cf([[a, "end", "finish"]], c);
  if (a.socket) {
    d(a.socket);
  } else {
    a.on("socket", d);
  }
}
function Ff(a) {
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
function Hf(a) {
  if (a instanceof db) {
    a.destroy();
    if ("function" == typeof a.close) {
      a.on("open", If);
    }
    return a;
  }
  if (!(a instanceof Mb)) {
    return a;
  }
  "function" == typeof a.destroy && a.destroy();
  return a;
}
function If() {
  "number" == typeof this.fd && this.close();
}
;/*
 MIT
 Copyright (c) 2014 Jonathan Ong <me@jongleberry.com>
 Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com>
 https://npmjs.com/package/mime-types
*/
const Jf = require("mime-db"), Kf = /^\s*([^;\s]*)(?:;|\s|$)/, Lf = /^text\//i, Mf = Object.create(null), Nf = Object.create(null);
Of();
function Pf(a) {
  return a && "string" == typeof a ? (a = Ya("x." + a).toLowerCase().substr(1)) ? Nf[a] || !1 : !1 : !1;
}
function Of() {
  const a = ["nginx", "apache", void 0, "iana"];
  Object.keys(Jf).forEach(b => {
    const c = Jf[b], d = c.extensions;
    if (d && d.length) {
      Mf[b] = d;
      for (let e = 0; e < d.length; e++) {
        const f = d[e];
        if (Nf[f]) {
          const g = a.indexOf(Jf[Nf[f]].source), h = a.indexOf(c.source);
          if ("application/octet-stream" != Nf[f] && (g > h || g == h && "application/" == Nf[f].substr(0, 12))) {
            continue;
          }
        }
        Nf[f] = b;
      }
    }
  });
}
;/*
 MIT content-type
 2015 Douglas Christopher Wilson
*/
const Qf = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g, Rf = /\\([\u000b\u0020-\u00ff])/g, Sf = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
function Tf(a) {
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
  if (!Sf.test(c)) {
    throw new TypeError("invalid media type");
  }
  c = new Uf(c.toLowerCase());
  if (-1 != b) {
    let e;
    var d;
    for (Qf.lastIndex = b; d = Qf.exec(a);) {
      if (d.index !== b) {
        throw new TypeError("invalid parameter format");
      }
      b += d[0].length;
      e = d[1].toLowerCase();
      d = d[2];
      '"' == d[0] && (d = d.substr(1, d.length - 2).replace(Rf, "$1"));
      c.parameters[e] = d;
    }
    if (b != a.length) {
      throw new TypeError("invalid parameter format");
    }
  }
  return c;
}
class Uf {
  constructor(a) {
    this.parameters = {};
    this.type = a;
  }
}
;/*
 MIT media-typer
 2014-2017 Douglas Christopher Wilson
*/
const Vf = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;
/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2015 Douglas Christopher Wilson
 https://npmjs.org/type-is
*/
function Wf(a, b) {
  var c = [];
  if ("string" != typeof a) {
    var d = null;
  } else {
    try {
      var {type:e} = Tf(a);
      if (!e) {
        throw new TypeError("argument string is required");
      }
      if ("string" != typeof e) {
        throw new TypeError("argument string is required to be a string");
      }
      d = Vf.test(e.toLowerCase()) ? e : null;
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
    var f = Xf(d = b[c]);
    !1 === f ? e = !1 : (e = a.split("/"), f = f.split("/"), e = 2 != e.length || 2 != f.length || "*" != f[0] && f[0] != e[0] ? !1 : "*+" == f[1].substr(0, 2) ? f[1].length <= e[1].length + 1 && f[1].substr(1) == e[1].substr(1 - f[1].length) : "*" != f[1] && f[1] != e[1] ? !1 : !0);
    if (e) {
      return "+" == d[0] || -1 !== d.indexOf("*") ? a : d;
    }
  }
  return !1;
}
function Yf(a, b, ...c) {
  var d = a.headers;
  d = void 0 !== d["transfer-encoding"] || !isNaN(d["content-length"]);
  if (!d) {
    return null;
  }
  2 < arguments.length && (b = [b, ...c]);
  return Wf(a.headers["content-type"], b);
}
function Xf(a) {
  if ("string" != typeof a) {
    return !1;
  }
  switch(a) {
    case "urlencoded":
      return "application/x-www-form-urlencoded";
    case "multipart":
      return "multipart/*";
  }
  return "+" == a[0] ? "*/*" + a : -1 == a.indexOf("/") ? Pf(a) : a;
}
;/*
 content-disposition
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
var Zf = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g, $f = /%[0-9A-Fa-f]{2}/, ag = /[^\x20-\x7e\xa0-\xff]/g, bg = /([\\"])/g, cg = /^[\x20-\x7e\x80-\xff]+$/, dg = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/;
function eg(a, b = {}) {
  const {type:c = "attachment", fallback:d = !0} = b;
  a = fg(a, d);
  return gg(new hg(c, a));
}
function fg(a, b = !0) {
  if (void 0 !== a) {
    var c = {};
    if ("string" != typeof a) {
      throw new TypeError("filename must be a string");
    }
    if ("string" != typeof b && "boolean" != typeof b) {
      throw new TypeError("fallback must be a string or boolean");
    }
    if ("string" == typeof b && ag.test(b)) {
      throw new TypeError("fallback must be ISO-8859-1 string");
    }
    a = Wa(a);
    var d = cg.test(a);
    b = "string" != typeof b ? b && String(a).replace(ag, "?") : Wa(b);
    var e = "string" == typeof b && b != a;
    if (e || !d || $f.test(a)) {
      c["filename*"] = a;
    }
    if (d || e) {
      c.filename = e ? b : a;
    }
    return c;
  }
}
function gg({parameters:a, type:b}) {
  if ("string" != typeof b || !dg.test(b)) {
    throw new TypeError("invalid type");
  }
  b = `${b}`.toLowerCase();
  if (a && "object" == typeof a) {
    let c;
    const d = Object.keys(a).sort();
    for (let e = 0; e < d.length; e++) {
      c = d[e];
      const f = "*" == c.substr(-1) ? "UTF-8''" + encodeURIComponent(String(a[c])).replace(Zf, ig) : '"' + String(a[c]).replace(bg, "\\$1") + '"';
      b += "; " + c + "=" + f;
    }
  }
  return b;
}
function ig(a) {
  return "%" + String(a).charCodeAt(0).toString(16).toUpperCase();
}
class hg {
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
function jg(a, b) {
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
function kg(a, b, c) {
  a.cache.set(b, c);
  a.size++;
  a.size >= a.max && (a.size = 0, a.a = a.cache, a.cache = new Map);
}
class lg {
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
      return d.B && c() > d.B ? (d.B = 0, d.value = void 0) : void 0 !== b && (a = b ? c() + b : 0, d.B = a), d.value;
    }
    if (d = this.a.get(a)) {
      return d.B && c() > d.B ? (d.B = 0, d.value = void 0) : (kg(this, a, d), void 0 !== b && (a = b ? c() + b : 0, d.B = a)), d.value;
    }
  }
  set(a, b, c = {}) {
    c = (c = c.maxAge) ? Date.now() + c : 0;
    let d = this.cache.get(a);
    d ? (d.B = c, d.value = b) : (d = {value:b, B:c}, kg(this, a, d));
  }
  keys() {
    function a(d) {
      const e = d[0], f = d[1];
      (d[1].value && !d[1].B || f.B >= c) && b.add(e);
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
const mg = new lg(100);
/*
 escape-html
 Copyright(c) 2012-2013 TJ Holowaychuk
 Copyright(c) 2015 Andreas Lubbe
 Copyright(c) 2015 Tiancheng "Timothy" Gu
 MIT Licensed
*/
var ng = /["'&<>]/;
const og = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, pg = /^(?:lax|strict)$/i;
function qg(a) {
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
class rg {
  constructor(a, b, c) {
    this.path = "/";
    this.maxAge = this.domain = this.expires = void 0;
    this.httpOnly = !0;
    this.overwrite = this.secure = this.sameSite = !1;
    if (!og.test(a)) {
      throw new TypeError("argument name is invalid");
    }
    if (b && !og.test(b)) {
      throw new TypeError("argument value is invalid");
    }
    b || (this.expires = new Date(0));
    this.name = a;
    this.value = b || "";
    for (let d in c) {
      this[d] = c[d];
    }
    if (this.path && !og.test(this.path)) {
      throw new TypeError("option path is invalid");
    }
    if (this.domain && !og.test(this.domain)) {
      throw new TypeError("option domain is invalid");
    }
    if (this.sameSite && !0 !== this.sameSite && !pg.test(this.sameSite)) {
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
const sg = {};
class tg {
  constructor(a, b, c) {
    this.secure = void 0;
    this.request = a;
    this.response = b;
    c && (this.keys = Array.isArray(c.keys) ? new Ra(c.keys) : c.keys, this.secure = c.secure);
  }
  get(a, b) {
    const c = `${a}.sig`;
    var d;
    const e = b && void 0 !== b.signed ? b.signed : !!this.keys;
    if (d = this.request.headers.cookie) {
      if (d = d.match(sg[a] ? sg[a] : sg[a] = new RegExp("(?:^|;) *" + a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "=([^;]*)"))) {
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
    a = new rg(a, b, k);
    if (!g && c.secure) {
      throw Error("Cannot send secure cookie over unencrypted connection");
    }
    a.secure = g;
    "secure" in c || (a.secure = g);
    ug(f, a);
    if (c && h) {
      if (!this.keys) {
        throw Error(".keys required for signed cookies");
      }
      a.value = this.keys.sign(a.toString());
      a.name += ".sig";
      ug(f, a);
    }
    (d.set ? Md.prototype.setHeader : d.setHeader).call(d, "Set-Cookie", f);
    return this;
  }
}
function ug(a, b) {
  if (b.overwrite) {
    for (var c = a.length - 1; 0 <= c; c--) {
      0 === a[c].indexOf(b.name + "=") && a.splice(c, 1);
    }
  }
  a.push(qg(b));
}
;const vg = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function wg(a) {
  return a.split(",").map((b, c) => {
    var d = vg.exec(b.trim());
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
      c = {charset:b, q:e, l:c};
    } else {
      c = null;
    }
    if (c) {
      return c;
    }
  }).filter(Boolean);
}
function xg(a, b) {
  const c = wg(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(yg).sort(zg).map(Ag);
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
          g = {l:f, s:l, m:g.l, q:g.q};
        }
        g && 0 > (h.s - g.s || h.q - g.q || h.m - g.m) && (h = g);
      }
      e = h;
    }
    return e;
  });
  return d.filter(yg).sort(zg).map(e => b[d.indexOf(e)]);
}
function zg(a, b) {
  return b.q - a.q || b.s - a.s || a.m - b.m || a.l - b.l || 0;
}
function Ag(a) {
  return a.charset;
}
function yg(a) {
  return 0 < a.q;
}
;const Bg = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function Cg(a) {
  a = a.split(",");
  for (var b = !1, c = 1, d = 0, e = 0; d < a.length; d++) {
    var f = d;
    var g = Bg.exec(a[d].trim());
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
      f = {encoding:h, q:k, l:f};
    } else {
      f = null;
    }
    f && (a[e++] = f, b = b || Dg("identity", f, void 0), c = Math.min(c, f.q || 1));
  }
  b || (a[e++] = {encoding:"identity", q:c, l:d});
  a.length = e;
  return a;
}
function Dg(a, b, c) {
  var d = 0;
  if (b.encoding.toLowerCase() === a.toLowerCase()) {
    d |= 1;
  } else {
    if ("*" !== b.encoding) {
      return null;
    }
  }
  return {l:c, m:b.l, q:b.q, s:d};
}
function Eg(a, b) {
  var c = Cg(a || "");
  if (!b) {
    return c.filter(Fg).sort(Gg).map(Hg);
  }
  var d = b.map(function(e, f) {
    for (var g = {m:-1, q:0, s:0}, h = 0; h < c.length; h++) {
      var k = Dg(e, c[h], f);
      k && 0 > (g.s - k.s || g.q - k.q || g.m - k.m) && (g = k);
    }
    return g;
  });
  return d.filter(Fg).sort(Gg).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function Gg(a, b) {
  return b.q - a.q || b.s - a.s || a.m - b.m || a.l - b.l || 0;
}
function Hg(a) {
  return a.encoding;
}
function Fg(a) {
  return 0 < a.q;
}
;const Ig = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
function Jg(a) {
  a = a.split(",");
  for (var b = 0, c = 0; b < a.length; b++) {
    var d = Kg(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function Kg(a, b) {
  var c = Ig.exec(a);
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
  return {prefix:a, P:d, q:f, l:b, M:e};
}
function Lg(a, b) {
  var c = Jg(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(Mg).sort(Ng).map(Og);
  }
  var d = b.map(function(e, f) {
    for (var g = {m:-1, q:0, s:0}, h = 0; h < c.length; h++) {
      a: {
        var k = c[h];
        var l = f, m = Kg(e, void 0);
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
          k = {l, m:k.l, q:k.q, s:p};
        } else {
          k = null;
        }
      }
      k && 0 > (g.s - k.s || g.q - k.q || g.m - k.m) && (g = k);
    }
    return g;
  });
  return d.filter(Mg).sort(Ng).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function Ng(a, b) {
  return b.q - a.q || b.s - a.s || a.m - b.m || a.l - b.l || 0;
}
function Og(a) {
  return a.M;
}
function Mg(a) {
  return 0 < a.q;
}
;const Pg = /^\s*([^s/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
function Qg(a) {
  a = a.split(",");
  for (var b = 1, c = 0; b < a.length; b++) {
    0 == Rg(a[c]) % 2 ? a[++c] = a[b] : a[c] += "," + a[b];
  }
  a.length = c + 1;
  for (c = b = 0; b < a.length; b++) {
    var d = Sg(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function Sg(a, b) {
  var c = Pg.exec(a);
  if (!c) {
    return null;
  }
  a = Object.create(null);
  var d = 1, e = c[2], f = c[1];
  if (c[3]) {
    c = c[3].split(";");
    for (var g = 1, h = 0; g < c.length; g++) {
      0 == Rg(c[h]) % 2 ? c[++h] = c[g] : c[h] += ";" + c[g];
    }
    c.length = h + 1;
    for (g = 0; g < c.length; g++) {
      c[g] = c[g].trim();
    }
    c = c.map(Tg);
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
  return {type:f, W:e, params:a, q:d, l:b};
}
function Ug(a, b, c) {
  var d = Sg(a, void 0);
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
  return {l:c, m:b.l, q:b.q, s:a};
}
function Vg(a, b) {
  var c = Qg(void 0 === a ? "*/*" : a || "");
  if (!b) {
    return c.filter(Wg).sort(Xg).map(Yg);
  }
  var d = b.map(function(e, f) {
    for (var g = {m:-1, q:0, s:0}, h = 0; h < c.length; h++) {
      var k = Ug(e, c[h], f);
      k && 0 > (g.s - k.s || g.q - k.q || g.m - k.m) && (g = k);
    }
    return g;
  });
  return d.filter(Wg).sort(Xg).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function Xg(a, b) {
  return b.q - a.q || b.s - a.s || a.m - b.m || a.l - b.l || 0;
}
function Yg(a) {
  return a.type + "/" + a.W;
}
function Wg(a) {
  return 0 < a.q;
}
function Rg(a) {
  for (var b = 0, c = 0; -1 !== (c = a.indexOf('"', c));) {
    b++, c++;
  }
  return b;
}
function Tg(a) {
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
class Zg {
  constructor(a) {
    this.request = a;
    this.headers = this.request.headers;
  }
  charset(a) {
    return (a = this.charsets(a)) && a[0];
  }
  charsets(a) {
    return xg(this.headers["accept-charset"], a);
  }
  encoding(a) {
    return (a = this.encodings(a)) && a[0];
  }
  encodings(a) {
    return Eg(this.headers["accept-encoding"], a);
  }
  language(a) {
    return (a = this.languages(a)) && a[0];
  }
  languages(a) {
    return Lg(this.headers["accept-language"], a);
  }
  mediaType(a) {
    return (a = this.mediaTypes(a)) && a[0];
  }
  mediaTypes(a) {
    return Vg(this.headers.accept, a);
  }
}
;/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2015 Douglas Christopher Wilson
 https://npmjs.org/accepts
*/
class $g {
  constructor(a) {
    this.headers = a.headers;
    this.a = new Zg(a);
  }
  types(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    if (!a || 0 == a.length) {
      return this.a.mediaTypes();
    }
    if (!this.headers.accept) {
      return a[0];
    }
    b = a.map(ah);
    var c = this.a.mediaTypes(b.filter(bh));
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
function ah(a) {
  return -1 == a.indexOf("/") ? Pf(a) : a;
}
function bh(a) {
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
function ch(a, b) {
  var c = a.a, d = a.target;
  a.g.push(b);
  c.__defineSetter__(b, function(e) {
    return this[d][b] = e;
  });
  return a;
}
class dh {
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
    return ch(Z(this, a), a);
  }
}
;/*
 MIT jshttp/http-assert
*/
function eh(a, b, c, d) {
  if (!a) {
    throw H(b, c, d);
  }
}
;const fh = net.isIP;
/*
 parseurl
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
function gh(a) {
  var b = a.url;
  if (void 0 !== b) {
    var c = a._parsedUrl;
    if ("object" === typeof c && null !== c && (void 0 === Qd || c instanceof Qd) && c._raw === b) {
      return c;
    }
    a: {
      if ("string" !== typeof b || 47 !== b.charCodeAt(0)) {
        c = Sd(b);
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
              c = Sd(b);
              break a;
          }
        }
        f = void 0 !== Qd ? new Qd : {};
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
var hh = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;
function ih(a, b) {
  var c = a["if-modified-since"], d = a["if-none-match"];
  if (!c && !d || (a = a["cache-control"]) && hh.test(a)) {
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
  return !c || (b = b["last-modified"], b && jh(b) <= jh(c)) ? !0 : !1;
}
function jh(a) {
  a = a && Date.parse(a);
  return "number" === typeof a ? a : NaN;
}
;const kh = Symbol("context#ip");
class lh {
  constructor() {
    this.res = this.req = this.response = this.ctx = this.app = null;
    this.originalUrl = "";
    this.pa = {};
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
    return gh(this.req).pathname;
  }
  set path(a) {
    const b = gh(this.req);
    b.pathname !== a && (b.pathname = a, b.path = null, this.url = Rd(b));
  }
  get query() {
    const a = this.querystring, b = this.pa = this.pa || {};
    return b[a] || (b[a] = cf(a));
  }
  set query(a) {
    this.querystring = df(a);
  }
  get querystring() {
    return this.req ? gh(this.req).query || "" : "";
  }
  set querystring(a) {
    const b = gh(this.req);
    b.search !== `?${a}` && (b.search = a, b.path = null, this.url = Rd(b));
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
        this.V = new Pd(`${this.origin}${a}`);
      } catch (b) {
        this.V = Object.create(null);
      }
    }
    return this.V;
  }
  get fresh() {
    const a = this.method, b = this.ctx.status;
    return "GET" != a && "HEAD" != a ? !1 : 200 <= b && 300 > b || 304 == b ? ih(this.header, this.response.header) : !1;
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
      const {parameters:a} = Tf(this.req);
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
    this[kh] || (this[kh] = this.ips[0] || this.socket.remoteAddress || "");
    return this[kh];
  }
  set ip(a) {
    this[kh] = a;
  }
  get subdomains() {
    const a = this.app.subdomainOffset, b = this.hostname;
    return fh(b) ? [] : b.split(".").reverse().slice(a);
  }
  get accept() {
    return this.Y || (this.Y = new $g(this.req));
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
      return Yf(this.req);
    }
    Array.isArray(a) || (a = [a, ...b]);
    return Yf(this.req, a);
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
;const mh = Symbol("context#cookies");
class nh {
  constructor() {
    this.state = this.originalUrl = this.res = this.req = this.response = this.request = this.app = null;
    this[mh] = null;
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
    return eh;
  }
  throw(...a) {
    throw H(...a);
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
    this[mh] || (this[mh] = new tg(this.req, this.res, {keys:this.app.keys, secure:this.request.secure}));
    return this[mh];
  }
  set cookies(a) {
    this[mh] = a;
  }
  [oa.custom]() {
    return this.inspect();
  }
}
Z(Z((new dh(nh.prototype, "response")).method("attachment").method("redirect").method("remove").method("vary").method("set").method("append").method("flushHeaders").access("status").access("message").access("body").access("length").access("type").access("lastModified").access("etag"), "headerSent"), "writable");
Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z((new dh(nh.prototype, "request")).method("acceptsLanguages").method("acceptsEncodings").method("acceptsCharsets").method("accepts").method("get").method("is").access("querystring").access("idempotent").access("socket").access("search").access("method").access("query").access("path").access("url").access("accept"), "origin"), "href"), "subdomains"), "protocol"), "host"), "hostname"), "URL"), "header"), "headers"), "secure"), "stale"), "fresh"), "ips"), "ip");
class oh {
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
    this.headerSent || (K(Number.isInteger(a), "status code must be a number"), K(100 <= a && 999 >= a, `invalid status code: ${a}`), this.c = !0, this.res.statusCode = a, 2 > this.req.httpVersionMajor && (this.res.statusMessage = G[a]), this.body && ha[a] && (this.body = null));
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
      ha[this.status] || (this.status = 204), this.remove("Content-Type"), this.remove("Content-Length"), this.remove("Transfer-Encoding");
    } else {
      this.c || (this.status = 200);
      var c = !this.header["content-type"];
      "string" == typeof a ? (c && (this.type = /^\s*</.test(a) ? "html" : "text"), this.length = Buffer.byteLength(a)) : Buffer.isBuffer(a) ? (c && (this.type = "bin"), this.length = a.length) : "function" == typeof a.pipe ? (Ef(this.res, Hf.bind(null, a)), jg(a, d => this.ctx.onerror(d)), null != b && b != a && this.remove("Content-Length"), c && (this.type = "bin")) : (this.remove("Content-Length"), this.type = "json");
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
        (c = Ta(d, a)) && b.setHeader("Vary", c);
      }
    }
  }
  redirect(a, b) {
    "back" == a && (a = this.ctx.get("Referrer") || b || "/");
    this.set("Location", a);
    fa[this.status] || (this.status = 302);
    if (this.ctx.accepts("html")) {
      var c = ng.exec(a);
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
    a && (this.type = Ya(a));
    this.set("Content-Disposition", eg(a, b));
  }
  set type(a) {
    var b = mg.get(a);
    if (!b) {
      if (a && "string" == typeof a) {
        if (b = -1 == a.indexOf("/") ? Pf(a) : a) {
          if (!b.includes("charset")) {
            var c;
            if (b && "string" == typeof b) {
              var d = (c = Kf.exec(b)) && Jf[c[1].toLowerCase()];
              c = d && d.charset ? d.charset : c && Lf.test(c[1]) ? "UTF-8" : !1;
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
      mg.set(a, b);
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
    return Wf(c, a);
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
;const ph = M("@goa/koa:application");
async function qh(a, b) {
  const c = a.res;
  c.statusCode = 404;
  Ef(c, d => a.onerror(d));
  try {
    return await b(a), rh(a);
  } catch (d) {
    a.onerror(d);
  }
}
class sh extends lc {
  constructor(a = {}) {
    const {proxy:b = !1, subdomainOffset:c = 2, env:d = process.env.NODE_ENV || "development", keys:e, Context:f = nh} = a;
    super();
    this.proxy = b;
    this.silent = !1;
    this.middleware = [];
    this.subdomainOffset = c;
    this.env = d;
    this.context = Object.create(f.prototype);
    this.request = Object.create(lh.prototype);
    this.response = Object.create(oh.prototype);
    this.keys = e;
  }
  [oa.custom]() {
    return this.inspect();
  }
  listen(...a) {
    ph("listen");
    return Nd(this.callback()).listen(...a);
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
    if ("function" != typeof a ? 0 : wf.test(vf.call(a)) || (xf ? yf(a) == Bf : "[object GeneratorFunction]" == uf.call(a))) {
      throw Error("Generator functions are not supported by @goa/koa. Use koa-convert on them first.");
    }
    ph("use %s", a.eb || a.name || "-");
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
      return qh(b, a);
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
function rh(a) {
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
function th(a) {
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
function uh(a, b = {}) {
  const c = th(a);
  ({lb:a = "./"} = b);
  b = `[^${vh(b.delimiter || "/#?")}]+?`;
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
      m = m || "", -1 === a.indexOf(m) && (g += m, m = ""), g && (d.push(g), g = ""), d.push({name:p || e++, prefix:m, P:"", pattern:n || b, w:h("MODIFIER") || ""});
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
          d.push({name:n || (m ? e++ : ""), pattern:n && !m ? b : m, prefix:p, P:q, w:h("MODIFIER") || ""});
        } else {
          k("END");
        }
      }
    }
  }
  return d;
}
function wh(a) {
  var b = {encode:encodeURIComponent};
  return xh(uh(a, b), b);
}
function xh(a, b = {}) {
  const c = yh(b), {encode:d = g => g, rb:e = !0} = b, f = a.map(g => {
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
        var k = g ? g[n.name] : void 0, l = "?" === n.w || "*" === n.w, m = "*" === n.w || "+" === n.w;
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
function vh(a) {
  return a.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function yh(a = {}) {
  return a.sensitive ? "" : "i";
}
function zh(a, b, c) {
  a = a.map(d => Ah(d, b, c).source);
  return new RegExp(`(?:${a.join("|")})`, yh(c));
}
function Bh(a, b, c = {}) {
  const {strict:d = !1, start:e = !0, end:f = !0, encode:g = m => m} = c, h = `[${vh(c.endsWith || "")}]|$`, k = `[${vh(c.delimiter || "/#?")}]`;
  let l = e ? "^" : "";
  for (const m of a) {
    if ("string" == typeof m) {
      l += vh(g(m));
    } else {
      const p = vh(g(m.prefix)), n = vh(g(m.P));
      m.pattern ? (b && b.push(m), l = p || n ? "+" == m.w || "*" == m.w ? l + `(?:${p}((?:${m.pattern})(?:${n}${p}(?:${m.pattern}))*)${n})${"*" == m.w ? "?" : ""}` : l + `(?:${p}(${m.pattern})${n})${m.w}` : l + `(${m.pattern})${m.w}`) : l += `(?:${p}${n})${m.w}`;
    }
  }
  f ? (d || (l += `${k}?`), l += c.endsWith ? `(?=${h})` : "$") : (a = a[a.length - 1], a = "string" === typeof a ? -1 < k.indexOf(a[a.length - 1]) : void 0 === a, d || (l += `(?:${k}(?=${h}))?`), a || (l += `(?=${k}|${h})`));
  return new RegExp(l, yh(c));
}
function Ah(a, b, c) {
  if (a instanceof RegExp) {
    if (b && (c = a.source.match(/\((?!\?)/g))) {
      for (var d = 0; d < c.length; d++) {
        b.push({name:d, prefix:"", P:"", w:"", pattern:""});
      }
    }
  } else {
    Array.isArray(a) ? d = zh(a, b, c) : d = Bh(uh(a, c), b, c), a = d;
  }
  return a;
}
;const Ch = M("koa-router");
function Dh(a, b) {
  a.path && (a.path = b + a.path, a.paramNames = [], b = a.path, a.regexp = Ah("string" == typeof b ? b.replace(/\/$/, "") : b, a.paramNames, a.opts));
}
class Eh {
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
    this.regexp = Ah("string" == typeof a ? a.replace(/\/$/, "") : a, this.paramNames, this.opts);
    Ch("defined route %s %s", this.methods, this.opts.prefix + this.path);
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
  aa(a) {
    return this.opts.ignoreCaptures ? [] : a.match(this.regexp).slice(1);
  }
  url(a, b) {
    var c = a, d = this.path.replace(/\(\.\*\)/g, ""), e = wh(d);
    "object" != typeof a && (c = [...arguments], "object" == typeof c[c.length - 1] && (b = c[c.length - 1], c = c.slice(0, c.length - 1)));
    d = uh(d);
    let f = {};
    if (Array.isArray(c)) {
      for (let g = d.length, h = 0, k = 0; h < g; h++) {
        d[h].name && (f[d[h].name] = c[k++]);
      }
    } else {
      d.some(g => g.name) ? f = a : b = a;
    }
    c = e(f);
    return b && b.query ? (e = b.query, e = "string" == typeof e ? e : df(e), `${c}?${e}`) : c;
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
const Fh = M("@goa/router");
class Gh {
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
            "function" == typeof c ? h = c() : h = new H.NotImplemented;
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
                  "function" == typeof d ? h = d() : h = new H.MethodNotAllowed;
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
    const m = new Eh(a, b, c, {end:h, name:k, sensitive:l, strict:g, prefix:f, ignoreCaptures:e});
    this.opts.prefix && Dh(m, this.opts.prefix);
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
    const e = {path:[], wa:[], route:!1};
    for (let f = c.length, g = 0; g < f; g++) {
      if (d = c[g], Fh("test %s %s", d.path, d.regexp), d.match(a) && (e.path.push(d), 0 == d.methods.length || d.methods.includes(b))) {
        e.wa.push(d), d.methods.length && (e.route = !0);
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
      Dh(b, a);
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
        a && Dh(f, a);
        this.opts.prefix && Dh(f, this.opts.prefix);
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
      Fh("%s %s", b.method, b.path);
      const d = this.opts.routerPath || b.routerPath || b.path;
      var e = this.match(d, b.method);
      b.a ? b.a.push(e.path) : b.a = e.path;
      b.router = this;
      if (!e.route) {
        return c();
      }
      e = e.wa;
      const f = e[e.length - 1];
      b._matchedRoute = f.path;
      f.name && (b._matchedRouteName = f.name);
      e = e.reduce((g, h) => {
        g.push((k, l) => {
          k.aa = h.aa(d);
          k.params = h.params(d, k.aa, k.params);
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
Gh.url = function(a, ...b) {
  return Eh.prototype.url.apply({path:a}, b);
};
const Hh = Ld.map(a => a.toLowerCase());
[...Hh, "all"].forEach(a => {
  function b(c, d, ...e) {
    "string" == typeof d || d instanceof RegExp || (e = [d, ...e], d = c, c = null);
    this.register(d, "all" == a ? Hh : [a], e, {name:c});
    return this;
  }
  Gh.prototype[a] = b;
  "delete" == a && (Gh.prototype.del = b);
});
class Ih extends nh {
  constructor() {
    super();
    this.sessionOptions = this.session = void 0;
    this._usage = this.files = this.file = this.mountPath = this.router = this.params = this._matchedRouteName = this._matchedRoute = this.compress = null;
  }
  neoluddite(a, b, c = {}) {
    this._usage && this._usage.push({"package":a, item:b, timestamp:(new Date).getTime(), ...c});
  }
}
;const Jh = a => {
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
const Kh = async(a = {}, b = {}, c = {}) => {
  const d = new sh({Context:Ih});
  a = await tf(a, d, c);
  "production" == d.env && (d.proxy = !0);
  return {app:d, middleware:a, router:new Gh(b)};
};
function Lh(a, b, c = "0.0.0.0") {
  const d = R(!0);
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
;const Mh = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
let Nh = a => `${a}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), Oh = a => 40 < `${a}`.length || -1 != `${a}`.indexOf("\n") || -1 !== `${a}`.indexOf("<");
const Ph = {};
function Qh(a) {
  const b = {...a.attributes, children:a.children};
  a = a.nodeName.defaultProps;
  if (void 0 !== a) {
    for (let c in a) {
      void 0 === b[c] && (b[c] = a[c]);
    }
  }
  return b;
}
;const Rh = (a, b, {allAttributes:c, xml:d, Sa:e, sort:f, ja:g} = {}) => {
  let h;
  const k = Object.keys(a);
  f && k.sort();
  return {Ua:k.map(l => {
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
            null != q && (n && (n += " "), n += Ph[p] || (Ph[p] = p.replace(/([A-Z])/g, "-$1").toLowerCase()), n += ": ", n += q, "number" == typeof q && !1 === Mh.test(p) && (n += "px"), n += ";");
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
          return `${p}${l}="${Nh(m)}"`;
        }
      }
    }
  }).filter(Boolean), Oa:h, ja:g};
};
const Sh = [], Th = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, Uh = /^(a|abbr|acronym|audio|b|bdi|bdo|big|br|button|canvas|cite|code|data|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|label|map|mark|meter|noscript|object|output|picture|progress|q|ruby|s|samp|slot|small|span|strong|sub|sup|svg|template|textarea|time|u|tt|var|video|wbr)$/;
function Vh(a, b = {}, c = {}, d = !1, e = !1, f) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:g = !1, shallow:h = !1, renderRootComponent:k = !1, shallowHighOrder:l = !1, sortAttributes:m, allAttributes:p, xml:n, initialPadding:q = 0, closeVoidTags:r = !1} = b;
  let {lineLength:u = 40} = b;
  u -= q;
  let {nodeName:t, attributes:w = {}} = a;
  var x = ["textarea", "pre"].includes(t);
  const I = " ".repeat(q), y = "string" == typeof g ? g : `  ${I}`;
  if ("object" != typeof a && !t) {
    return Nh(a);
  }
  if ("function" == typeof t) {
    if (!h || !d && k) {
      return x = Qh(a), t.prototype && "function" == typeof t.prototype.render ? (a = new t(x, c), a._disable = a.__x = !0, a.props = x, a.context = c, t.getDerivedStateFromProps ? a.state = {...a.state, ...t.getDerivedStateFromProps(a.props, a.state)} : a.componentWillMount && a.componentWillMount(), x = a.render(a.props, a.state, a.context), a.getChildContext && (c = {...c, ...a.getChildContext()})) : x = t(x, c), Vh(x, b, c, l, e, f);
    }
    t = t.displayName || t !== Function && t.name || Wh(t);
  }
  let v = "";
  ({Ua:A, Oa:d, ja:f} = Rh(w, t, {allAttributes:p, xml:n, Sa:e, sort:m, ja:f}));
  if (g) {
    let D = `<${t}`.length;
    v = A.reduce((T, C) => {
      const B = D + 1 + C.length;
      if (B > u) {
        return D = y.length, `${T}\n${y}${C}`;
      }
      D = B;
      return `${T} ${C}`;
    }, "");
  } else {
    v = A.length ? " " + A.join(" ") : "";
  }
  v = `<${t}${v}>`;
  if (`${t}`.match(/[\s\n\\/='"\0<>]/)) {
    throw v;
  }
  var A = `${t}`.match(Th);
  r && A && (v = v.replace(/>$/, " />"));
  let J = [];
  if (d) {
    !x && g && (Oh(d) || d.length + Xh(v) > u) && (d = "\n" + y + `${d}`.replace(/(\n+)/g, "$1" + (y || "\t"))), v += d;
  } else {
    if (a.children) {
      let D = g && v.includes("\n");
      const T = [];
      J = a.children.map((C, B) => {
        if (null != C && !1 !== C) {
          var E = Vh(C, b, c, !0, "svg" == t ? !0 : "foreignObject" == t ? !1 : e, f);
          if (E) {
            g && E.length + Xh(v) > u && (D = !0);
            if ("string" == typeof C.nodeName) {
              const z = E.replace(new RegExp(`</${C.nodeName}>$`), "");
              Yh(C.nodeName, z) && (T[B] = E.length);
            }
            return E;
          }
        }
      }).filter(Boolean);
      g && D && !x && (J = J.reduce((C, B, E) => {
        var z = (E = T[E - 1]) && /^<([\s\S]+?)>/.exec(B);
        z && ([, z] = z, z = !Uh.test(z));
        if (E && !z) {
          z = /[^<]*?(\s)/y;
          var F;
          let O = !0, ca;
          for (; null !== (F = z.exec(B));) {
            const [Zh] = F;
            [, ca] = F;
            z.lastIndex + Zh.length - 1 > u - (O ? E : 0) && (F = B.slice(0, z.lastIndex - 1), B = B.slice(z.lastIndex), O ? (C.push(F), O = !1) : C.push("\n" + y + `${F}`.replace(/(\n+)/g, "$1" + (y || "\t"))), z.lastIndex = 0);
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
  if (J.length) {
    v += J.join("");
  } else {
    if (n) {
      return v.substring(0, v.length - 1) + " />";
    }
  }
  A || (!Yh(t, J[J.length - 1]) && !x && g && v.includes("\n") && (v += `\n${I}`), v += `</${t}>`);
  return v;
}
const Yh = (a, b) => `${a}`.match(Uh) && (b ? !/>$/.test(b) : !0);
function Wh(a) {
  var b = (Function.prototype.toString.call(a).match(/^\s*function\s+([^( ]+)/) || "")[1];
  if (!b) {
    b = -1;
    for (let c = Sh.length; c--;) {
      if (Sh[c] === a) {
        b = c;
        break;
      }
    }
    0 > b && (b = Sh.push(a) - 1);
    b = `UnnamedComponent${b}`;
  }
  return b;
}
const Xh = a => {
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
module.exports = {_createApp:Kh, _compose:aa, _startApp:async function(a = {}, b = {}) {
  const {port:c = 5000, host:d = "0.0.0.0", router:e} = b, f = () => {
    h.destroy().then(() => {
      process.kill(process.pid, "SIGUSR2");
    });
  };
  process.once("SIGUSR2", f);
  let g;
  a = await Kh(a, e, {getServer:() => g});
  const h = a.app, k = a.middleware;
  a = a.router;
  g = await Lh(h, c, d);
  Jh(g);
  h.destroy = async() => {
    k.frontend && k.frontend.watchers && Object.values(k.frontend.watchers).forEach(l => {
      l.close();
    });
    await g.destroy();
    process.removeListener("SIGUSR2", f);
  };
  ({port:b} = g.address());
  return {app:h, middleware:k, url:`http://localhost:${b}`, server:g, router:a};
}, _httpErrors:H, _mount:Ka, _Keygrip:Ra, _Router:Gh, _render:(a, b = {}, c = {}) => {
  const d = b.addDoctype, e = b.pretty;
  a = Vh(a, b, c);
  return d ? `<!doctype html>${e ? "\n" : ""}${a}` : a;
}, _websocket:Le};


//# sourceMappingURL=idio.js.map