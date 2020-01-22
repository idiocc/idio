#!/usr/bin/env node
             
const assert = require('assert');
const tty = require('tty');
const util = require('util');
const _crypto = require('crypto');
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');
const stream = require('stream');
const os = require('os');
const vm = require('vm');
const events = require('events');
const querystring = require('querystring');
const https = require('https');
const http = require('http');
const url = require('url');
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
const da = ca(), ea = {[300]:!0, [301]:!0, [302]:!0, [303]:!0, [305]:!0, [307]:!0, [308]:!0}, fa = {[204]:!0, [205]:!0, [304]:!0};
function ca() {
  var a = z;
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
function z(a) {
  if ("number" == typeof a) {
    if (!z[a]) {
      throw Error("invalid status code: " + a);
    }
    return a;
  }
  if ("string" != typeof a) {
    throw new TypeError("code must be a number or string");
  }
  var b = parseInt(a, 10);
  if (!isNaN(b)) {
    if (!z[b]) {
      throw Error("invalid status code: " + b);
    }
    return b;
  }
  b = z[a.toLowerCase()];
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
function A(...a) {
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
  if ("number" != typeof d || !z[d] && (400 > d || 600 <= d)) {
    d = 500;
  }
  a = A[d] || A[Number(String(d).charAt(0) + "00")];
  b || (b = a ? new a(c) : Error(c || z[d]), Error.captureStackTrace(b, A));
  a && b instanceof a && b.status === d || (b.expose = 500 > d, b.status = b.statusCode = d);
  for (let f in e) {
    "status" != f && "statusCode" != f && (b[f] = e[f]);
  }
  return b;
}
class ha extends Error {
  constructor(a) {
    super();
    this.message = a;
    this.statusCode = this.status = null;
    this.expose = !1;
    this.headers = null;
  }
  set code(a) {
    this.statusCode = this.status = a;
    this.message || (this.message = z[a]);
  }
}
da.forEach(a => {
  let b;
  const c = ia(z[a]), d = c.match(/Error$/) ? c : c + "Error";
  switch(Number(String(a).charAt(0) + "00")) {
    case 400:
      b = class extends ha {
        constructor(e) {
          super(e);
          this.code = a;
          this.name = d;
          this.expose = !0;
        }
      };
      break;
    case 500:
      b = class extends ha {
        constructor(e) {
          super(e);
          this.code = a;
          this.name = d;
          this.expose = !1;
        }
      };
  }
  b && (A[a] = b, A[c] = b);
}, {});
function ia(a) {
  return a.split(" ").map(function(b) {
    return b.charAt(0).toUpperCase() + b.slice(1);
  }).join("").replace(/[^ _0-9a-z]/gi, "");
}
;var B = assert;
const ja = assert.equal;
var ka = tty;
const la = util.debuglog, ma = util.format, na = util.inspect;
/*

 Copyright (c) 2016 Zeit, Inc.
 https://npmjs.org/ms
*/
function oa(a) {
  var b = {}, c = typeof a;
  if ("string" == c && 0 < a.length) {
    return pa(a);
  }
  if ("number" == c && isFinite(a)) {
    return b.Va ? (b = Math.abs(a), a = 864E5 <= b ? qa(a, b, 864E5, "day") : 36E5 <= b ? qa(a, b, 36E5, "hour") : 6E4 <= b ? qa(a, b, 6E4, "minute") : 1000 <= b ? qa(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}
function pa(a) {
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
function qa(a, b, c, d) {
  return Math.round(a / c) + " " + d + (b >= 1.5 * c ? "s" : "");
}
;/*
 bytes
 Copyright(c) 2012-2014 TJ Holowaychuk
 Copyright(c) 2015 Jed Watson
 MIT Licensed
*/
const ra = /\B(?=(\d{3})+(?!\d))/g, sa = /(?:\.0*|(\.[^0]+)0+)$/, C = {b:1, kb:1024, mb:1048576, gb:1073741824, tb:Math.pow(1024, 4), pb:Math.pow(1024, 5)};
function D(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), d = b && b.Xa || "", e = b && b.Za || "", f = b && void 0 !== b.xa ? b.xa : 2, g = !(!b || !b.Ua);
  (b = b && b.Ya || "") && C[b.toLowerCase()] || (b = c >= C.pb ? "PB" : c >= C.tb ? "TB" : c >= C.gb ? "GB" : c >= C.mb ? "MB" : c >= C.kb ? "KB" : "B");
  a = (a / C[b.toLowerCase()]).toFixed(f);
  g || (a = a.replace(sa, "$1"));
  d && (a = a.replace(ra, d));
  return a + e + b;
}
;/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const ta = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function ua(a, b) {
  return (b = ta[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var va = {f:D, ["fy"](a) {
  return ua(D(a) || "", "yellow");
}, ["fr"](a) {
  return ua(D(a) || "", "red");
}, ["fb"](a) {
  return ua(D(a) || "", "blue");
}, ["fg"](a) {
  return ua(D(a) || "", "green");
}, ["fc"](a) {
  return ua(D(a) || "", "cyan");
}, ["fm"](a) {
  return ua(D(a) || "", "magenta");
}};
const wa = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, e) => e.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), xa = {init:function(a) {
  a.inspectOpts = {...wa};
}, log:function(...a) {
  return process.stderr.write(ma(...a) + "\n");
}, formatArgs:function(a) {
  var b = this.namespace, c = this.color;
  const d = this.diff;
  this.useColors ? (c = "\u001b[3" + (8 > c ? c : "8;5;" + c), b = `  ${c};1m${b} \u001B[0m`, a[0] = b + a[0].split("\n").join("\n" + b), a.push(c + "m+" + oa(d) + "\u001b[0m")) : a[0] = (wa.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in wa ? !!wa.colors : ka.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:wa, formatters:{o:function(a) {
  return na(a, {...this.inspectOpts, colors:this.useColors}).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  return na(a, {...this.inspectOpts, colors:this.useColors});
}, ...va}};
function ya(a) {
  function b(...g) {
    if (b.enabled) {
      var h = Number(new Date);
      b.diff = h - (f || h);
      b.prev = f;
      f = b.curr = h;
      g[0] = za(g[0]);
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
function Ba(a) {
  const b = ya(a);
  "function" == typeof a.init && a.init(b);
  a.a.push(b);
  return b;
}
function Ca(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function Da(a) {
  var b = xa.load();
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
class Ea {
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
function Fa() {
  const a = new Ea(xa);
  return function(b) {
    const c = Ba(a);
    c.namespace = b;
    c.useColors = xa.useColors();
    c.enabled = a.enabled(b);
    c.color = Ca(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, e) {
      d = this.namespace + (void 0 === e ? ":" : e) + d;
      d.log = this.log;
      return d;
    };
    Da(a);
    return c;
  };
}
function za(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;function E(a) {
  if (!a) {
    throw Error("To use debug, pass the namespace.");
  }
  return Fa()(a);
}
;const Ga = E("koa-mount");
function Ha(a, b) {
  function c(g) {
    const h = a;
    if (0 != g.indexOf(h)) {
      return !1;
    }
    g = g.replace(h, "") || "/";
    return e ? g : "/" != g[0] ? !1 : g;
  }
  "string" != typeof a && (b = a, a = "/");
  ja(a[0], "/", 'mount path must begin with "/"');
  const d = b.middleware ? aa(b.middleware) : b;
  if ("/" == a) {
    return d;
  }
  const e = "/" == a.slice(-1), f = b.name || "unnamed";
  Ga("mount %s %s", a, f);
  return async function(g, h) {
    const k = g.path, l = c(k);
    Ga("mount %s %s -> %s", a, f, l);
    if (!l) {
      return await h();
    }
    g.mountPath = a;
    g.path = l;
    Ga("enter %s -> %s", k, g.path);
    g.neoluddite && g.neoluddite("koa-mount", "mount");
    await d(g, async() => {
      g.path = k;
      await h();
      g.path = l;
    });
    Ga("leave %s -> %s", k, g.path);
    g.path = k;
  };
}
;const Ia = _crypto.createHmac, Ja = _crypto.pseudoRandomBytes, Ka = _crypto.randomBytes;
function La(a, b, c, d) {
  return Ia(b, c).update(a).digest(d).replace(/\/|\+|=/g, e => ({"/":"_", "+":"-", "=":""})[e]);
}
;function Ma(a, b) {
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
class Na {
  constructor(a, b = "sha1", c = "base64") {
    if (!(a && 0 in a)) {
      throw Error("Keys must be provided.");
    }
    this.algorithm = b;
    this.encoding = c;
    this.keys = a;
  }
  sign(a) {
    return La(a, this.algorithm, this.keys[0], this.encoding);
  }
  verify(a, b) {
    return -1 < this.index(a, b);
  }
  index(a, b) {
    for (let c = 0, d = this.keys.length; c < d; c++) {
      const e = La(a, this.algorithm, this.keys[c], this.encoding);
      if (Ma(b, e)) {
        return c;
      }
    }
    return -1;
  }
}
;function Oa() {
  return Ka(16);
}
;for (var H = [], Pa = 0; 256 > Pa; ++Pa) {
  H[Pa] = (Pa + 256).toString(16).substr(1);
}
;function Qa(a = {}, b = null, c = 0) {
  c = b && c;
  "string" == typeof a && (b = "binary" == a ? Array(16) : null, a = null);
  const {random:d, rng:e = Oa} = a;
  a = d || e();
  a[6] = a[6] & 15 | 64;
  a[8] = a[8] & 63 | 128;
  if (b) {
    for (var f = 0; 16 > f; ++f) {
      b[c + f] = a[f];
    }
  }
  b || (b = 0, b = [H[a[b++]], H[a[b++]], H[a[b++]], H[a[b++]], "-", H[a[b++]], H[a[b++]], "-", H[a[b++]], H[a[b++]], "-", H[a[b++]], H[a[b++]], "-", H[a[b++]], H[a[b++]], H[a[b++]], H[a[b++]], H[a[b++]], H[a[b++]]].join(""));
  return b;
}
;class Ra {
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
;function Sa(a) {
  a = Buffer.from(a, "base64").toString("utf8");
  return JSON.parse(a);
}
function Ta(a) {
  a = JSON.stringify(a);
  return Buffer.from(a).toString("base64");
}
;const L = E("koa-session:context");
async function Ua(a) {
  L("init from external");
  var b = a.ctx, c = a.opts;
  c.externalKey ? (b = c.externalKey.get(b), L("get external key from custom %s", b)) : (b = b.cookies.get(c.key, c), L("get external key from cookie %s", b));
  b ? (c = await a.store.get(b, c.maxAge, {rolling:c.rolling || !1}), a.valid(c, b) ? (a.create(c, b), a.a = JSON.stringify(a.session.toJSON())) : a.create()) : a.create();
}
function Va(a) {
  const b = a.a;
  var c = a.session;
  if (c._requireSave) {
    return "force";
  }
  const d = c.toJSON();
  return b || Object.keys(d).length ? b !== JSON.stringify(d) ? "changed" : a.opts.rolling ? "rolling" : a.opts.renew && (a = c._expire, c = c.maxAge, a && c && a - Date.now() < c / 2) ? "renew" : "" : "";
}
class Wa {
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
        L("init from cookie");
        a = this.ctx;
        const c = this.opts, d = a.cookies.get(c.key, c);
        if (d) {
          L("parse %s", d);
          try {
            var b = c.decode(d);
          } catch (e) {
            L("decode %j error: %s", d, e);
            if (!(e instanceof SyntaxError)) {
              throw a.cookies.set(c.key, "", c), e.headers = {"set-cookie":a.response.get("set-cookie")}, e;
            }
            this.create();
            break a;
          }
          L("parsed %j", b);
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
      return L("expired session"), this.emit("expired", {key:b, value:a, ctx:c}), !1;
    }
    const d = this.opts.valid;
    return "function" != typeof d || d(c, a) ? !0 : (L("invalid session"), this.emit("invalid", {key:b, value:a, ctx:c}), !1);
  }
  emit(a, b) {
    setImmediate(() => {
      this.app.emit(`session:${a}`, b);
    });
  }
  create(a, b) {
    L("create session with val: %j externalKey: %s", a, b);
    this.store && (this.externalKey = b || this.opts.genid && this.opts.genid(this.ctx));
    this.session = new Ra(this, a);
  }
  async commit() {
    const {session:a, opts:{beforeSave:b}, ctx:c} = this;
    if (void 0 !== a) {
      if (null === a) {
        await this.remove();
      } else {
        var d = Va(this);
        L("should save session: %s", d);
        d && ("function" == typeof b && (L("before save"), b(c, a)), await this.save("changed" == d));
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
    f ? (L("save %j to external key %s", h, f), "number" == typeof g && (g += 10000), await this.store.set(f, h, g, {changed:a, rolling:c}), this.use("save-external"), e ? e.set(this.ctx, f) : this.ctx.cookies.set(b, f, this.opts)) : (L("save %j to cookie", h), h = d(h), L("save %s", h), this.use("save"), this.ctx.cookies.set(b, h, this.opts));
  }
  use(a) {
    this.ctx.neoluddite && this.ctx.neoluddite("@goa/session", a);
  }
}
;/*

 MIT https://github.com/miguelmota/is-class
*/
const Xa = E("koa-session"), Ya = Symbol("context#contextSession");
Symbol("context#_contextSession");
function Za(a = {}) {
  $a(a);
  return async function(b, c) {
    b = ab(b, a);
    b.store && await Ua(b);
    try {
      await c();
    } finally {
      a.autoCommit && await b.commit();
    }
  };
}
function $a(a = {}) {
  a.key = a.key || "koa:sess";
  a.maxAge = a.maxAge || 864E5;
  null == a.overwrite && (a.overwrite = !0);
  null == a.httpOnly && (a.httpOnly = !0);
  null == a.signed && (a.signed = !0);
  null == a.autoCommit && (a.autoCommit = !0);
  Xa("session options %j", a);
  "function" != typeof a.encode && (a.encode = Ta);
  "function" != typeof a.decode && (a.decode = Sa);
  var b = a.store;
  b && (B("function" == typeof b.get, "store.get must be function"), B("function" == typeof b.set, "store.set must be function"), B("function" == typeof b.destroy, "store.destroy must be function"));
  if (b = a.externalKey) {
    B("function" == typeof b.get, "externalKey.get must be function"), B("function" == typeof b.set, "externalKey.set must be function");
  }
  if (b = a.ContextStore) {
    B("function" == typeof b && (/^class[\s{]/.test(b.toString()) || /classCallCheck\(/.test(b.toString().replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, ""))), "ContextStore must be a class"), B("function" == typeof b.prototype.get, "ContextStore.prototype.get must be function"), B("function" == typeof b.prototype.set, "ContextStore.prototype.set must be function"), B("function" == typeof b.prototype.destroy, "ContextStore.prototype.destroy must be function");
  }
  a.genid || (a.prefix ? a.genid = () => `${a.prefix}${Qa()}` : a.genid = Qa);
}
function ab(a, b) {
  if (!a.hasOwnProperty(Ya)) {
    Object.defineProperties(a, {session:{get() {
      return c.get();
    }, set(d) {
      c.set(d);
    }, configurable:!0}, sessionOptions:{get() {
      return c.opts;
    }}});
    var c = new Wa(a, b);
    return c;
  }
}
;/*
 vary
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
const bb = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function cb(a, b) {
  if ("string" != typeof a) {
    throw new TypeError("header argument is required");
  }
  if (!b) {
    throw new TypeError("field argument is required");
  }
  b = Array.isArray(b) ? b : db(`${b}`);
  for (var c = 0; c < b.length; c++) {
    if (!bb.test(b[c])) {
      throw new TypeError("field argument contains an invalid header name");
    }
  }
  if ("*" == a) {
    return a;
  }
  c = a;
  a = db(a.toLowerCase());
  if (b.includes("*") || a.includes("*")) {
    return "*";
  }
  for (let d = 0; d < b.length; d++) {
    const e = b[d].toLowerCase();
    a.includes(e) || (a.push(e), c = c ? c + ", " + b[d] : b[d]);
  }
  return c;
}
function db(a) {
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
;function eb(a = {}) {
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
        throw k = n.headers || {}, l = cb(k.vary || k.Vary || "", "Origin"), delete k.Ra, n.headers = Object.assign({}, k, m, {vary:l}), n;
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
;const fb = fs.ReadStream, ib = fs.createReadStream, jb = fs.createWriteStream, kb = fs.exists, lb = fs.existsSync, mb = fs.lstat, nb = fs.mkdirSync, ob = fs.readdir, pb = fs.rmdir, qb = fs.stat, rb = fs.unlink;
var sb = stream;
const tb = stream.Readable, ub = stream.Transform, vb = stream.Writable;
const wb = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, xb = (a, b = !1) => wb(a, 2 + (b ? 1 : 0)), yb = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const zb = os.homedir, Ab = os.tmpdir;
const Bb = /\s+at.*(?:\(|\s)(.*)\)?/, Cb = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Db = zb(), Eb = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(Cb.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(Bb);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(Bb, (g, h) => g.replace(h, h.replace(Db, "~"))) : f).join("\n");
};
function Fb(a, b, c = !1) {
  return function(d) {
    var e = yb(arguments), {stack:f} = Error();
    const g = wb(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = Eb(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function M(a) {
  var {stack:b} = Error();
  const c = yb(arguments);
  b = xb(b, a);
  return Fb(c, b, a);
}
;const Gb = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Hb extends vb {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {R:e = M(!0), proxyError:f} = a || {}, g = (h, k) => e(k);
    super(d);
    this.a = [];
    this.va = new Promise((h, k) => {
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
          const m = Eb(l.stack);
          l.stack = m;
          f && g`${l}`;
        }
        k(l);
      });
      c && Gb(this, c).pipe(this);
    });
  }
  _write(a, b, c) {
    this.a.push(a);
    c();
  }
  get fa() {
    return this.va;
  }
}
const Ib = async(a, b = {}) => {
  ({fa:a} = new Hb({rs:a, ...b, R:M(!0)}));
  return await a;
};
async function Jb(a) {
  a = ib(a);
  return await Ib(a);
}
;const Kb = vm.Script;
const Lb = (a, b) => {
  const [c, , d] = a.split("\n");
  a = parseInt(c.replace(/.+?(\d+)$/, (f, g) => g)) - 1;
  const e = d.indexOf("^");
  ({length:b} = b.split("\n").slice(0, a).join("\n"));
  return b + e + (a ? 1 : 0);
};
const Mb = a => {
  try {
    new Kb(a);
  } catch (b) {
    const c = b.stack;
    if ("Unexpected token <" != b.message) {
      throw b;
    }
    return Lb(c, a);
  }
  return null;
};
function Nb(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const b = a.re instanceof RegExp;
  a = -1 != ["string", "function"].indexOf(typeof a.replacement);
  return b && a;
}
const Ob = (a, b) => {
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
function P(a, b) {
  function c() {
    return b.filter(Nb).reduce((d, {re:e, replacement:f}) => {
      if (this.H) {
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
            return this.H ? h : f.call(this, h, ...k);
          } catch (l) {
            Ob(g, l);
          }
        });
      }
    }, `${a}`);
  }
  c.a = () => {
    c.H = !0;
  };
  return c.call(c);
}
;const Pb = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), Qb = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, Rb = (a, b) => Object.keys(a).reduce((c, d) => {
  {
    var e = a[d];
    const {getReplacement:f = Qb, getRegex:g = Pb} = b || {}, h = g(d);
    e = {name:d, re:e, regExp:h, getReplacement:f, map:{}, lastIndex:0};
  }
  return {...c, [d]:e};
}, {}), Sb = a => {
  var b = [];
  const c = a.map;
  return {re:a.regExp, replacement(d, e) {
    d = c[e];
    delete c[e];
    e = Array.isArray(b) ? b : [b];
    return P(d, e);
  }};
}, R = a => {
  const b = a.map, c = a.getReplacement, d = a.name;
  return {re:a.re, replacement(e) {
    const f = a.lastIndex;
    b[f] = e;
    a.lastIndex += 1;
    return c(d, f);
  }};
};
async function Tb(a, b) {
  return Ub(a, b);
}
class Vb extends ub {
  constructor(a, b) {
    super(b);
    this.a = (Array.isArray(a) ? a : [a]).filter(Nb);
    this.H = !1;
    this.c = b;
  }
  async replace(a, b) {
    const c = new Vb(this.a, this.c);
    b && Object.assign(c, b);
    a = await Tb(c, a);
    c.H && (this.H = !0);
    b && Object.keys(b).forEach(d => {
      b[d] = c[d];
    });
    return a;
  }
  async reduce(a) {
    return await this.a.reduce(async(b, {re:c, replacement:d}) => {
      b = await b;
      if (this.H) {
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
            if (this.H) {
              return e.length ? e.push(Promise.resolve(h)) : h;
            }
            const l = d.call(this, h, ...k);
            l instanceof Promise && e.push(l);
            return l;
          } catch (l) {
            Ob(f, l);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(c, () => h.shift());
          } catch (h) {
            Ob(f, h);
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
      a = Eb(d.stack), d.stack = a, c(d);
    }
  }
}
async function Ub(a, b) {
  b instanceof sb ? b.pipe(a) : a.end(b);
  return await Ib(a);
}
;const Wb = a => {
  [, a] = /<\s*(.+?)(?:\s+[\s\S]+)?\s*\/?\s*>/.exec(a) || [];
  return a;
}, Yb = a => {
  let b = 0;
  const c = [];
  let d;
  P(a, [{re:/[{}]/g, replacement(k, l) {
    k = "}" == k;
    const m = !k;
    if (!b && k) {
      throw Error("A closing } is found without opening one.");
    }
    b += m ? 1 : -1;
    1 == b && m ? d = {open:l} : 0 == b && k && (d.close = l, c.push(d), d = {});
  }}]);
  if (b) {
    throw Error(`Unbalanced props (level ${b}) ${a}`);
  }
  const e = {}, f = [], g = {};
  var h = c.reduce((k, {open:l, close:m}) => {
    k = a.slice(k, l);
    const [, p, n, q, r] = /(\s*)(\S+)(\s*)=(\s*)$/.exec(k) || [];
    l = a.slice(l + 1, m);
    if (!n && !/\s*\.\.\./.test(l)) {
      throw Error("Could not detect prop name");
    }
    n ? e[n] = l : f.push(l);
    g[n] = {before:p, la:q, ka:r};
    l = k || "";
    l = l.slice(0, l.length - (n || "").length - 1);
    const {ea:t, T:u} = Xb(l);
    Object.assign(e, t);
    Object.assign(g, u);
    return m + 1;
  }, 0);
  if (c.length) {
    h = a.slice(h);
    const {ea:k, T:l} = Xb(h);
    Object.assign(e, k);
    Object.assign(g, l);
  } else {
    const {ea:k, T:l} = Xb(a);
    Object.assign(e, k);
    Object.assign(g, l);
  }
  return {da:e, $:f, T:g};
}, Xb = a => {
  const b = [], c = {};
  a.replace(/(\s*)(\S+)(\s*)=(\s*)(["'])([\s\S]+?)\5/g, (d, e, f, g, h, k, l, m) => {
    c[f] = {before:e, la:g, ka:h};
    b.push({j:m, name:f, ta:`${k}${l}${k}`});
    return "%".repeat(d.length);
  }).replace(/(\s*)([^\s%]+)/g, (d, e, f, g) => {
    c[f] = {before:e};
    b.push({j:g, name:f, ta:"true"});
  });
  return {ea:[...b.reduce((d, {j:e, name:f, ta:g}) => {
    d[e] = [f, g];
    return d;
  }, [])].filter(Boolean).reduce((d, [e, f]) => {
    d[e] = f;
    return d;
  }, {}), T:c};
}, Zb = (a, b = [], c = !1, d = {}, e = "") => {
  const f = Object.keys(a);
  return f.length || b.length ? `{${f.reduce((g, h) => {
    const k = a[h], l = c || -1 != h.indexOf("-") ? `'${h}'` : h, {before:m = "", la:p = "", ka:n = ""} = d[h] || {};
    return [...g, `${m}${l}${p}:${n}${k}`];
  }, b).join(",")}${e}}` : "{}";
}, $b = (a = "") => {
  [a] = a;
  if (!a) {
    throw Error("No tag name is given");
  }
  return a.toUpperCase() == a;
}, ac = (a, b = {}, c = [], d = [], e = !1, f = null, g = {}, h = "") => {
  const k = $b(a), l = k ? a : `'${a}'`;
  if (!Object.keys(b).length && !c.length && !d.length) {
    return `h(${l})`;
  }
  const m = k && "dom" == e ? !1 : e;
  k || !d.length || e && "dom" != e || f && f(`JSX: destructuring ${d.join(" ")} is used without quoted props on HTML ${a}.`);
  a = Zb(b, d, m, g, h);
  b = c.reduce((p, n, q) => {
    q = c[q - 1];
    return `${p}${q && /\S/.test(q) ? "," : ""}${n}`;
  }, "");
  return `h(${l},${a}${b ? `,${b}` : ""})`;
};
const bc = (a, b = []) => {
  let c = 0, d;
  a = P(a, [...b, {re:/[<>]/g, replacement(e, f) {
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
  return {Oa:a, ma:d};
}, dc = a => {
  const b = Wb(a);
  let c;
  const {wa:d} = Rb({wa:/=>/g});
  try {
    ({Oa:k, ma:c} = bc(a, [R(d)]));
  } catch (l) {
    if (1 === l) {
      throw Error(`Could not find the matching closing > for ${b}.`);
    }
  }
  const e = k.slice(0, c + 1);
  var f = e.replace(/<\s*[^\s/>]+/, "");
  if (/\/\s*>$/.test(f)) {
    return a = f.replace(/\/\s*>$/, ""), f = "", new cc({N:e.replace(d.regExp, "=>"), M:a.replace(d.regExp, "=>"), content:"", tagName:b});
  }
  a = f.replace(/>$/, "");
  f = c + 1;
  c = !1;
  let g = 1, h;
  P(k, [{re:new RegExp(`[\\s\\S](?:<\\s*${b}(\\s+|>)|/\\s*${b}\\s*>)`, "g"), replacement(l, m, p, n) {
    if (c) {
      return l;
    }
    m = !m && l.endsWith(">");
    const q = !m;
    if (q) {
      n = n.slice(p);
      const {ma:r} = bc(n.replace(/^[\s\S]/, " "));
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
  return new cc({N:k, M:a.replace(d.regExp, "=>"), content:f.replace(d.regExp, "=>"), tagName:b});
};
class cc {
  constructor(a) {
    this.N = a.N;
    this.M = a.M;
    this.content = a.content;
    this.tagName = a.tagName;
  }
}
;const ec = a => {
  let b = "", c = "";
  a = a.replace(/^(\n\s*)([\s\S]+)?/, (d, e, f = "") => {
    b = e;
    return f;
  }).replace(/([\s\S]+?)?(\n\s*)$/, (d, e = "", f = "") => {
    c = f;
    return e;
  });
  return `${b}${a ? `\`${a}\`` : ""}${c}`;
}, gc = a => {
  const b = [];
  let c = {}, d = 0, e = 0;
  P(a, [{re:/[<{}]/g, replacement(f, g) {
    if (!(g < e)) {
      if (/[{}]/.test(f)) {
        d += "{" == f ? 1 : -1, 1 == d && void 0 == c.from ? c.from = g : 0 == d && (c.ra = g + 1, c.Ba = a.slice(c.from + 1, g), b.push(c), c = {});
      } else {
        if (d) {
          return f;
        }
        f = dc(a.slice(g));
        e = g + f.N.length;
        c.Ca = f;
        c.ra = e;
        c.from = g;
        b.push(c);
        c = {};
      }
    }
  }}, {}]);
  return b.length ? fc(a, b) : [ec(a)];
}, fc = (a, b) => {
  let c = 0;
  b = b.reduce((d, {from:e, ra:f, Ba:g, Ca:h}) => {
    (e = a.slice(c, e)) && d.push(ec(e));
    c = f;
    g ? d.push(g) : h && d.push(h);
    return d;
  }, []);
  if (c < a.length) {
    const d = a.slice(c, a.length);
    d && b.push(ec(d));
  }
  return b;
};
const ic = (a, b = {}) => {
  var c = b.quoteProps, d = b.warn, e = Mb(a);
  if (null === e) {
    return a;
  }
  var f = a.slice(e);
  const {M:g = "", content:h, tagName:k, N:{length:l}} = dc(f);
  f = hc(h, c, d);
  const {da:m, $:p, T:n} = Yb(g.replace(/^ */, ""));
  d = ac(k, m, f, p, c, d, n, /\s*$/.exec(g) || [""]);
  c = a.slice(0, e);
  a = a.slice(e + l);
  e = l - d.length;
  0 < e && (d = `${" ".repeat(e)}${d}`);
  a = `${c}${d}${a}`;
  return ic(a, b);
}, hc = (a, b = !1, c = null) => a ? gc(a).reduce((d, e) => {
  if (e instanceof cc) {
    const {M:h = "", content:k, tagName:l} = e, {da:m, $:p} = Yb(h);
    e = hc(k, b, c);
    e = ac(l, m, e, p, b, c);
    return [...d, e];
  }
  const f = Mb(e);
  if (f) {
    var g = e.slice(f);
    const {N:{length:h}, M:k = "", content:l, tagName:m} = dc(g), {da:p, $:n} = Yb(k);
    g = hc(l, b, c);
    g = ac(m, p, g, n, b, c);
    const q = e.slice(0, f);
    e = e.slice(f + h);
    return [...d, `${q}${g}${e}`];
  }
  return [...d, e];
}, []) : [];
const jc = a => {
  const {e:b, ya:c, Aa:d, j:e, Ha:f, Ia:g} = Rb({ya:/^ *export\s+default\s+{[\s\S]+?}/mg, e:/^ *export\s+(?:default\s+)?/mg, Aa:/^ *export\s+{[^}]+}\s+from\s+(['"])(?:.+?)\1/mg, j:/^ *import(\s+([^\s,]+)\s*,?)?(\s*{(?:[^}]+)})?\s+from\s+['"].+['"]/gm, Ha:/^ *import\s+(?:(.+?)\s*,\s*)?\*\s+as\s+.+?\s+from\s+['"].+['"]/gm, Ia:/^ *import\s+['"].+['"]/gm}, {getReplacement(h, k) {
    return `/*%%_RESTREAM_${h.toUpperCase()}_REPLACEMENT_${k}_%%*/`;
  }, getRegex(h) {
    return new RegExp(`/\\*%%_RESTREAM_${h.toUpperCase()}_REPLACEMENT_(\\d+)_%%\\*/`, "g");
  }});
  a = P(a, [R(d), R(c), R(b), R(e), R(f), R(g)]);
  a = ic(a, {});
  return P(a, [Sb(d), Sb(c), Sb(b), Sb(e), Sb(f), Sb(g)]);
};
function kc(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function S(a, b, c) {
  const d = M(!0);
  if ("function" !== typeof a) {
    throw Error("Function must be passed.");
  }
  const e = a.length;
  if (!e) {
    throw Error("Function does not accept any arguments.");
  }
  return await new Promise((f, g) => {
    const h = (l, m) => l ? (l = d(l), g(l)) : f(c || m);
    let k = [h];
    Array.isArray(b) ? (b.forEach((l, m) => {
      kc(e, m);
    }), k = [...b, h]) : 1 < Array.from(arguments).length && (kc(e, 0), k = [b, h]);
    a(...k);
  });
}
;const lc = async a => {
  try {
    return await S(mb, a);
  } catch (b) {
    return null;
  }
};
const mc = path.basename, nc = path.dirname, oc = path.extname, pc = path.isAbsolute, T = path.join, qc = path.normalize, rc = path.parse, U = path.relative, sc = path.resolve, tc = path.sep;
const vc = async a => {
  var b = await lc(a);
  let c = a, d = !1;
  if (!b) {
    if (c = await uc(a), !c) {
      throw Error(`${a}.js or ${a}.jsx is not found.`);
    }
  } else {
    if (b.isDirectory()) {
      b = !1;
      let e;
      a.endsWith("/") || (e = c = await uc(a), b = !0);
      if (!e) {
        c = await uc(T(a, "index"));
        if (!c) {
          throw Error(`${b ? `${a}.jsx? does not exist, and ` : ""}index.jsx? file is not found in ${a}`);
        }
        d = !0;
      }
    }
  }
  return {path:a.startsWith(".") ? U("", c) : c, Ja:d};
}, uc = async a => {
  a = `${a}.js`;
  let b = await lc(a);
  b || (a = `${a}x`);
  if (b = await lc(a)) {
    return a;
  }
};
const xc = async(a, b, c = {}) => {
  const {fields:d, soft:e = !1} = c;
  var f = T(a, "node_modules", b);
  f = T(f, "package.json");
  const g = await lc(f);
  if (g) {
    a = await wc(f, d);
    if (void 0 === a) {
      throw Error(`The package ${U("", f)} does export the module.`);
    }
    if (!a.entryExists && !e) {
      throw Error(`The exported module ${a.main} in package ${b} does not exist.`);
    }
    const {entry:h, version:k, packageName:l, main:m, entryExists:p, ...n} = a;
    return {entry:U("", h), packageJson:U("", f), ...k ? {version:k} : {}, packageName:l, ...m ? {hasMain:!0} : {}, ...p ? {} : {entryExists:!1}, ...n};
  }
  if ("/" == a && !g) {
    throw Error(`Package.json for module ${b} not found.`);
  }
  return xc(T(sc(a), ".."), b, c);
}, wc = async(a, b = []) => {
  const c = await Jb(a);
  let d, e, f, g, h;
  try {
    ({module:d, version:e, name:f, main:g, ...h} = JSON.parse(c)), h = b.reduce((l, m) => {
      l[m] = h[m];
      return l;
    }, {});
  } catch (l) {
    throw Error(`Could not parse ${a}.`);
  }
  a = nc(a);
  b = d || g;
  if (!b) {
    if (!await lc(T(a, "index.js"))) {
      return;
    }
    b = g = "index.js";
  }
  a = T(a, b);
  let k;
  try {
    ({path:k} = await vc(a)), a = k;
  } catch (l) {
  }
  return {entry:a, version:e, packageName:f, main:!d && g, entryExists:!!k, ...h};
};
const zc = async(a, b, {mount:c, override:d = {}}) => {
  var e = async(f, g, h) => {
    var k = nc(a);
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
    ({packageJson:k} = await xc(k, l));
    f = sc(k);
    k = nc(f);
    if (m) {
      return yc(k, m, g, c);
    }
    ({module:f} = require(f));
    return f ? yc(k, f, g, c) : (console.warn("[\u219b] Package %s does not specify module in package.json, trying src", k), yc(k, "src", g));
  };
  e = new Vb([{re:/^( *import(?:\s+[^\s,]+\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+)['"](.+)['"]/gm, replacement:e}, {re:/^( *import\s+)['"](.+)['"]/gm, replacement:e}]);
  e.end(b);
  return await Ib(e);
}, yc = (a, b, c, d) => {
  a = T(a, b);
  b = U("", a);
  d && (b = U(d, b));
  return `${c}'/${b}${a.endsWith("/") ? "/" : ""}'`;
};
function Ac(a = {}) {
  const {directory:b = "frontend", pragma:c = "import { h } from 'preact'", mount:d = ".", override:e = {}} = a;
  let {log:f} = a;
  !0 === f && (f = console.log);
  const g = Array.isArray(b) ? b : [b];
  g.forEach(h => {
    const k = T(d, h);
    if (!lb(k)) {
      throw Error(`Frontend directory ${h} does not exist.`);
    }
  });
  return async(h, k) => {
    let l = h.path.replace("/", "");
    if (!(g.includes(l) || g.some(r => l.startsWith(`${r}/`)) || h.path.startsWith("/node_modules/"))) {
      return await k();
    }
    l = T(d, l);
    const {path:m, Ja:p} = await vc(l);
    if (p && !l.endsWith("/")) {
      k = d ? U(d, m) : m, h.redirect(`/${k}`);
    } else {
      try {
        var n = await S(mb, m);
      } catch (r) {
        h.status = 404;
        return;
      }
      h.status = 200;
      h.etag = `${n.mtime.getTime()}`;
      if (h.fresh) {
        return h.status = 304, await k();
      }
      k = await Jb(m);
      n = (new Date).getTime();
      k = await Bc(m, k, c, {mount:d, override:e});
      var q = (new Date).getTime();
      f && f("%s patched in %sms", m, q - n);
      h.type = "application/javascript";
      h.body = k;
    }
  };
}
const Bc = async(a, b, c, {mount:d, override:e}) => {
  /\.jsx$/.test(a) && (b = jc(b), c && (b = `${c}\n${b}`));
  return b = /\.css$/.test(a) ? `function __$styleInject(css = '') {
  const head = document.head
  const style = document.createElement('style')
  style.type = 'text/css'
  if (style.styleSheet){
    style.styleSheet.cssText = css
  } else {
    style.appendChild(document.createTextNode(css))
  }
  head.appendChild(style)
}
const style = \`${b}\`
__$styleInject(style)` : await zc(a, b, {mount:d, override:e});
};
var Cc = events;
const Dc = events.EventEmitter;
/*
 MIT streamsearch by Brian White
 https://github.com/mscdex/streamsearch
*/
function Ec(a, b, c, d, e) {
  for (var f = 0; f < e; ++f, ++b, ++d) {
    if (a[b] !== c[d]) {
      return !1;
    }
  }
  return !0;
}
function Fc(a, b) {
  var c = b.length, d = a.l, e = d.length, f = -a.a, g = d[e - 1], h = a.i, k = a.h;
  if (0 > f) {
    for (; 0 > f && f <= c - e;) {
      var l = f + e - 1;
      l = 0 > l ? a.h[a.a + l] : b[l];
      if (l === g && Gc(a, b, f, e - 1)) {
        return a.a = 0, ++a.g, f > -a.a ? a.emit("info", !0, k, 0, a.a + f) : a.emit("info", !0), a.c = f + e;
      }
      f += h[l];
    }
    if (0 > f) {
      for (; 0 > f && !Gc(a, b, f, c - f);) {
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
    if (l === g && b[f] === d[0] && Ec(d, 0, b, f, e - 1)) {
      return ++a.g, 0 < f ? a.emit("info", !0, b, a.c, f) : a.emit("info", !0), a.c = f + e;
    }
    f += h[l];
  }
  if (f < c) {
    for (; f < c && (b[f] !== d[0] || !Ec(b, f, d, 0, c - f));) {
      ++f;
    }
    f < c && (b.copy(k, 0, f, f + (c - f)), a.a = c - f);
  }
  0 < f && a.emit("info", !1, b, a.c, f < c ? f : c);
  return a.c = c;
}
function Gc(a, b, c, d) {
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
class Hc extends Dc {
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
      var d = Fc(this, a);
    }
    return d;
  }
}
;class Ic extends tb {
  constructor(a) {
    super(a);
  }
  _read() {
  }
}
;const Jc = Buffer.from("\r\n\r\n"), Kc = /\r\n/g, Lc = /^([^:]+):[ \t]?([\x00-\xFF]+)?$/;
class Mc extends Dc {
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
    this.c = new Hc(Jc);
    this.c.on("info", (b, c, d, e) => {
      c && !this.h && (81920 < this.a + (e - d) ? (e = 81920 - this.a, this.a = 81920) : this.a += e - d, 81920 === this.a && (this.h = !0), this.buffer += c.toString("binary", d, e));
      if (b) {
        if (this.buffer && this.i !== this.maxHeaderPairs) {
          b = this.buffer.split(Kc);
          c = b.length;
          e = !1;
          for (let g = 0; g < c; ++g) {
            if (0 !== b[g].length) {
              if ("\t" == b[g][0] || " " == b[g][0]) {
                this.header[f][this.header[f].length - 1] += b[g];
              } else {
                if (d = Lc.exec(b[g])) {
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
const Nc = Buffer.from("-"), Oc = Buffer.from("\r\n"), Pc = () => {
};
function Qc(a, b, c, d, e) {
  var f, g = 0, h = !0;
  if (!a.a && a.F && c) {
    for (; 2 > a.h && d + g < e;) {
      if (45 === c[d + g]) {
        ++g, ++a.h;
      } else {
        a.h && (f = Nc);
        a.h = 0;
        break;
      }
    }
    2 === a.h && (d + g < e && a._events.trailer && a.emit("trailer", c.slice(d + g, e)), a.reset(), a.G = !0, 0 === a.X && (a.c = !0, a.emit("finish"), a.c = !1));
    if (a.h) {
      return;
    }
  }
  a.F && (a.F = !1);
  a.a || (a.a = new Ic(a.ia), a.a._read = () => {
    Rc(a);
  }, g = a.g ? "preamble" : "part", a._events[g] ? a.emit(g, a.a) : a._ignore(), a.g || (a.u = !0));
  c && d < e && !a.A && (a.g || !a.u ? (f && (h = a.a.push(f)), h = a.a.push(c.slice(d, e)), h || (a.D = !0)) : !a.g && a.u && (f && a.i.push(f), f = a.i.push(c.slice(d, e)), !a.u && void 0 !== f && f < e && Qc(a, !1, c, d + f, e)));
  b && (a.i.reset(), a.g ? a.g = !1 : (++a.X, a.a.on("end", () => {
    0 === --a.X && (a.G ? (a.c = !0, a.emit("finish"), a.c = !1) : Rc(a));
  })), a.a.push(null), a.a = void 0, a.A = !1, a.F = !0, a.h = 0);
}
function Rc(a) {
  if (a.D && (a.D = !1, a.B)) {
    const b = a.B;
    a.B = void 0;
    b();
  }
}
class Sc extends vb {
  constructor(a) {
    super(a);
    if (!a || !a.headerFirst && "string" != typeof a.boundary) {
      throw new TypeError("Boundary required");
    }
    "string" == typeof a.boundary ? this.setBoundary(a.boundary) : this.l = void 0;
    this.ua = a.headerFirst;
    this.X = this.h = 0;
    this.c = this.G = !1;
    this.g = !0;
    this.F = !1;
    this.u = this.ha = !0;
    this.B = this.a = void 0;
    this.A = !1;
    this.ia = "number" == typeof a.partHwm ? {highWaterMark:a.partHwm} : {};
    this.D = !1;
    this.i = new Mc(a);
    this.i.on("header", b => {
      this.u = !1;
      this.a.emit("header", b);
    });
  }
  emit(a) {
    "finish" != a || this.c ? vb.prototype.emit.apply(this, arguments) : this.G || process.nextTick(() => {
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
    if (this.ua && this.g) {
      if (this.a || (this.a = new Ic(this.ia), this._events.preamble ? this.emit("preamble", this.a) : this._ignore()), b = this.i.push(a), !this.u && void 0 !== b && b < a.length) {
        a = a.slice(b);
      } else {
        return c();
      }
    }
    this.ha && (this.l.push(Oc), this.ha = !1);
    this.l.push(a);
    this.D ? this.B = c : c();
  }
  reset() {
    this.i = this.l = this.a = void 0;
  }
  setBoundary(a) {
    this.l = new Hc("\r\n--" + a);
    this.l.on("info", (b, c, d, e) => {
      Qc(this, b, c, d, e);
    });
  }
  _ignore() {
    this.a && !this.A && (this.A = !0, this.a.on("error", Pc), this.a.resume());
  }
}
;const {TextDecoder:Tc} = require("text-decoding"), Uc = /%([a-fA-F0-9]{2})/g;
function Vc(a, b) {
  return String.fromCharCode(parseInt(b, 16));
}
function Wc(a) {
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
              d ? (h.length && (h = V(h.replace(Uc, Vc), d)), d = "") : h.length && (h = V(h, "utf8"));
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
  d && h.length ? h = V(h.replace(Uc, Vc), d) : h && (h = V(h, "utf8"));
  void 0 === b[g] ? h && (b[g] = h) : b[g][1] = h;
  return b;
}
function V(a, b) {
  let c;
  if (a) {
    try {
      c = (new Tc(b)).decode(Buffer.from(a, "binary"));
    } catch (d) {
    }
  }
  return "string" == typeof c ? c : a;
}
const Xc = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], Yc = /\+/g;
class Zc {
  constructor() {
    this.buffer = void 0;
  }
  write(a) {
    a = a.replace(Yc, " ");
    for (var b = "", c = 0, d = 0, e = a.length; c < e; ++c) {
      void 0 !== this.buffer ? Xc[a.charCodeAt(c)] ? (this.buffer += a[c], ++d, 2 === this.buffer.length && (b += String.fromCharCode(parseInt(this.buffer, 16)), this.buffer = void 0)) : (b += "%" + this.buffer, this.buffer = void 0, --c) : "%" == a[c] && (c > d && (b += a.substring(d, c), d = c), this.buffer = "", ++d);
    }
    d < e && void 0 === this.buffer && (b += a.substring(d));
    return b;
  }
  reset() {
    this.buffer = void 0;
  }
}
function $c(a) {
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
const ad = a => {
  const {fieldSize:b = 1048576, fieldNameSize:c = 100, fileSize:d = Infinity, files:e = Infinity, fields:f = Infinity, parts:g = Infinity} = a;
  return {I:b, Da:d, Ea:e, J:f, Ma:g, U:c};
};
class bd extends vb {
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
          const b = Wc(a["content-type"]);
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
;const cd = /^boundary$/i, dd = /^form-data$/i, ed = /^charset$/i, fd = /^filename$/i, gd = /^name$/i;
class hd {
  static get detect() {
    return /^multipart\/form-data/i;
  }
  constructor(a, {limits:b = {}, preservePath:c, fileHwm:d, parsedConType:e = [], highWaterMark:f}) {
    function g() {
      0 === v && N && !a.a && (N = !1, process.nextTick(() => {
        a.a = !0;
        a.emit("finish");
      }));
    }
    let h, k;
    [, e] = e.find(w => Array.isArray(w) && cd.test(w[0])) || [];
    if ("string" != typeof e) {
      throw Error("Multipart: Boundary not found");
    }
    const {Ma:l, Ea:m, Da:p, J:n, I:q} = ad(b);
    let r, t = 0, u = 0, v = 0, y, N = !1;
    this.g = this.h = !1;
    this.a = void 0;
    this.l = 0;
    this.i = a;
    this.c = new Sc({boundary:e, maxHeaderPairs:b.headerPairs, highWaterMark:f, fileHwm:d});
    this.c.on("drain", () => {
      this.h = !1;
      if (this.a && !this.g) {
        const w = this.a;
        this.a = void 0;
        w();
      }
    }).on("error", w => {
      a.emit("error", w);
    }).on("finish", () => {
      N = !0;
      g();
    });
    const F = w => {
      if (++this.l > l) {
        return this.c.removeListener("part", F), this.c.on("part", id), a.u = !0, a.emit("partsLimit"), id(w);
      }
      if (y) {
        const x = y;
        x.emit("end");
        x.removeAllListeners("end");
      }
      w.on("header", x => {
        let Q = "text/plain", G = "7bit", gb;
        let Aa = 0;
        if (x["content-type"]) {
          var J = Wc(x["content-type"][0]);
          if (J[0]) {
            for (Q = J[0].toLowerCase(), h = 0, k = J.length; h < k && !ed.test(J[h][0]); ++h) {
            }
          }
        }
        if (x["content-disposition"]) {
          J = Wc(x["content-disposition"][0]);
          if (!dd.test(J[0])) {
            return id(w);
          }
          h = 0;
          for (k = J.length; h < k; ++h) {
            if (gd.test(J[h][0])) {
              gb = J[h][1];
            } else {
              if (fd.test(J[h][0])) {
                var Z = J[h][1];
                c || (Z = $c(Z));
              }
            }
          }
        } else {
          return id(w);
        }
        x["content-transfer-encoding"] && (G = x["content-transfer-encoding"][0].toLowerCase());
        if ("application/octet-stream" == Q || void 0 !== Z) {
          if (t == m) {
            return a.l || (a.l = !0, a.emit("filesLimit")), id(w);
          }
          ++t;
          if (!a._events.file) {
            this.c._ignore();
            return;
          }
          ++v;
          const I = new jd({highWaterMark:d});
          r = I;
          I.on("end", () => {
            --v;
            this.g = !1;
            g();
            if (this.a && !this.h) {
              const K = this.a;
              this.a = void 0;
              K();
            }
          });
          I._read = () => {
            if (this.g && (this.g = !1, this.a && !this.h)) {
              const K = this.a;
              this.a = void 0;
              K();
            }
          };
          a.emit("file", gb, I, Z, G, Q, w);
          x = K => {
            if ((Aa += K.length) > p) {
              const O = p - (Aa - K.length);
              0 < O && I.push(K.slice(0, O));
              I.emit("limit");
              I.truncated = !0;
              w.removeAllListeners("data");
            } else {
              I.push(K) || (this.g = !0);
            }
          };
          Z = () => {
            r = void 0;
            I.push(null);
          };
        } else {
          if (u == n) {
            return a.g || (a.g = !0, a.emit("fieldsLimit")), id(w);
          }
          ++u;
          ++v;
          const I = [];
          let K = !1;
          y = w;
          x = O => {
            let hb = O;
            Aa += O.length;
            Aa > q && (hb = Buffer.from(O, 0, q).slice(0, q), K = !0, w.removeAllListeners("data"));
            I.push(hb);
          };
          Z = () => {
            y = void 0;
            var O = Buffer.concat(I);
            try {
              O = (new Tc(void 0)).decode(O);
            } catch (hb) {
            }
            a.emit("field", gb, O, !1, K, G, Q);
            --v;
            g();
          };
        }
        w._readableState.sync = !1;
        w.on("data", x);
        w.on("end", Z);
      }).on("error", x => {
        r && r.emit("error", x);
      });
    };
    this.c.on("part", F);
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
function id(a) {
  a.resume();
}
class jd extends tb {
  constructor(a) {
    super(a);
    this.truncated = !1;
  }
  _read() {
  }
}
;const kd = /^charset$/i;
class ld {
  static get detect() {
    return /^application\/x-www-form-urlencoded/i;
  }
  constructor(a, {limits:b = {}, parsedConType:c, defCharset:d = "utf8"}) {
    this.h = a;
    this.l = void 0;
    const {I:e, U:f, J:g} = ad(b);
    this.I = e;
    this.U = f;
    this.J = g;
    a = d;
    for (let h = 0, k = c.length; h < k; ++h) {
      if (Array.isArray(c[h]) && kd.test(c[h][0])) {
        a = c[h][1].toLowerCase();
        break;
      }
    }
    this.i = new Zc;
    this.charset = a;
    this.B = 0;
    this.D = "key";
    this.c = !0;
    this.F = this.A = 0;
    this.g = this.a = "";
    this.G = this.u = !1;
  }
  write(a, b) {
    if (this.B === this.J) {
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
          c > f && (this.a += this.i.write(a.toString("binary", f, c))), this.D = "val", this.l = !1, this.c = !0, this.g = "", this.F = 0, this.G = !1, this.i.reset(), f = c + 1;
        } else {
          if (void 0 !== d) {
            if (++this.B, c = this.u, f = d > f ? this.a += this.i.write(a.toString("binary", f, d)) : this.a, this.l = !1, this.c = !0, this.a = "", this.A = 0, this.u = !1, this.i.reset(), f.length && this.h.emit("field", V(f, this.charset), "", c, !1), f = d + 1, this.B === this.J) {
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
          if (this.c && this.F === this.I) {
            this.l = !0;
            break;
          } else {
            this.c && ++this.F;
          }
        }
        if (void 0 !== d) {
          if (++this.B, d > f && (this.g += this.i.write(a.toString("binary", f, d))), this.h.emit("field", V(this.a, this.charset), V(this.g, this.charset), this.u, this.G), this.D = "key", this.l = !1, this.c = !0, this.a = "", this.A = 0, this.u = !1, this.i.reset(), f = d + 1, this.B === this.J) {
            return b();
          }
        } else {
          if (this.l) {
            if (e > f && (this.g += this.i.write(a.toString("binary", f, e))), f = e, "" === this.g && 0 === this.I || (this.F = this.g.length) === this.I) {
              this.c = !1, this.G = !0;
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
    this.h.a || ("key" == this.D && 0 < this.a.length ? this.h.emit("field", V(this.a, this.charset), "", this.u, !1) : "val" == this.D && this.h.emit("field", V(this.a, this.charset), V(this.g, this.charset), this.u, this.G), this.h.a = !0, this.h.emit("finish"));
  }
}
;class md extends bd {
  constructor(a) {
    super(a);
  }
  get h() {
    return [hd, ld];
  }
}
;const nd = /^[^[]*/, od = /^\[(\d+)\]/, pd = /^\[([^\]]+)\]/;
function qd(a) {
  function b() {
    return [{type:"object", key:a, aa:!0}];
  }
  var c = nd.exec(a)[0];
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
      if (g = od.exec(a.substring(e)), null !== g) {
        e += g[0].length, c.ba = "array", c = {type:"array", key:parseInt(g[1], 10)}, f.push(c);
      } else {
        if (g = pd.exec(a.substring(e)), null !== g) {
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
;function rd(a) {
  return void 0 === a ? "undefined" : Array.isArray(a) ? "array" : "object" == typeof a ? "object" : "scalar";
}
function sd(a, b, c, d) {
  switch(rd(c)) {
    case "undefined":
      a[b.key] = b.append ? [d] : d;
      break;
    case "array":
      a[b.key].push(d);
      break;
    case "object":
      return sd(c, {type:"object", key:"", aa:!0}, c[""], d);
    case "scalar":
      a[b.key] = [a[b.key], d];
  }
  return a;
}
function td(a, b, c, d) {
  if (b.aa) {
    return sd(a, b, c, d);
  }
  let e;
  switch(rd(c)) {
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
;function ud(a, b, c) {
  qd(b).reduce(function(d, e) {
    return td(d, e, d[e.key], c);
  }, a);
}
;function vd(a, {fieldname:b}) {
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
function wd(a, b) {
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
function xd(a, b, c) {
  "VALUE" == a.strategy ? a.req.file = c : (delete b.fieldname, Object.assign(b, c));
}
class yd {
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
;const zd = {LIMIT_PART_COUNT:"Too many parts", LIMIT_FILE_SIZE:"File too large", LIMIT_FILE_COUNT:"Too many files", LIMIT_FIELD_KEY:"Field name too long", LIMIT_FIELD_VALUE:"Field value too long", LIMIT_FIELD_COUNT:"Too many fields", LIMIT_UNEXPECTED_FILE:"Unexpected field"};
function W(a, b) {
  const c = new Ad(zd[a]);
  c.code = a;
  b && (c.field = b);
  return c;
}
class Ad extends Error {
  constructor(a) {
    super(a);
    this.code = "";
    this.field = void 0;
  }
}
;function Bd(a) {
  0 === --a.value && a.emit("zero");
}
async function Cd(a) {
  await new Promise((b, c) => {
    if (0 === a.value) {
      b();
    } else {
      a.once("zero", b);
    }
    a.once("error", c);
  });
}
class Dd extends Dc {
  constructor() {
    super();
    this.value = 0;
  }
}
;const Ed = a => (a = a["content-type"]) ? a.toLowerCase().startsWith("multipart/form-data") : !1;
function Fd(a) {
  return async function(b, c) {
    const d = b.req;
    if (!Ed(d.headers)) {
      return c();
    }
    const {limits:e = {}, storage:f, fileFilter:g, na:h, preservePath:k} = a, l = {};
    d.body = l;
    const m = new md({limits:e, preservePath:k, headers:d.headers}), p = new yd(h, d), n = new Dd, q = [];
    let r = !1;
    m.on("field", (t, u, v, y) => {
      if (y) {
        return m.emit("error", W("LIMIT_FIELD_VALUE", t));
      }
      if (e.fieldNameSize && t.length > e.fieldNameSize) {
        return m.emit("error", W("LIMIT_FIELD_KEY"));
      }
      ud(l, t, u);
    });
    m.on("file", async(t, u, v, y, N) => {
      if (!v) {
        return u.resume();
      }
      if (e.fieldNameSize && t.length > e.fieldNameSize) {
        return m.emit("error", W("LIMIT_FIELD_KEY"));
      }
      y = {fieldname:t, originalname:v, encoding:y, mimetype:N, stream:u};
      const F = vd(p, y);
      let w = !1;
      v = () => {
        if (w) {
          return wd(p, F), w;
        }
      };
      u.on("error", G => {
        Bd(n);
        m.emit("error", G);
      }).on("limit", () => {
        w = !0;
        m.emit("error", W("LIMIT_FILE_SIZE", t));
      });
      let x;
      try {
        x = await g(d, y);
      } catch (G) {
        wd(p, F);
        m.emit("error", G);
        return;
      }
      if (x) {
        n.value++;
        try {
          if (!v()) {
            var Q = await f._handleFile(d, y);
            u = {...y, ...Q};
            if (v()) {
              return q.push(u);
            }
            xd(p, F, u);
            q.push(u);
          }
        } catch (G) {
          wd(p, F), r ? n.emit("error", G) : m.emit("error", G);
        } finally {
          Bd(n);
        }
      } else {
        wd(p, F), u.resume();
      }
    });
    d.pipe(m);
    b = t => f._removeFile(d, t);
    try {
      await new Promise((t, u) => {
        m.on("error", u).on("partsLimit", () => {
          u(W("LIMIT_PART_COUNT"));
        }).on("filesLimit", () => {
          u(W("LIMIT_FILE_COUNT"));
        }).on("fieldsLimit", () => {
          u(W("LIMIT_FIELD_COUNT"));
        }).on("finish", t);
      });
    } catch (t) {
      await Cd(n);
      const u = await Gd(q, b);
      t.storageErrors = u;
      throw t;
    } finally {
      r = !0, d.unpipe(m), m.removeAllListeners();
    }
    await Cd(n);
    await c();
  };
}
async function Gd(a, b) {
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
;async function Hd(a, b) {
  b = b.map(async c => {
    const d = T(a, c);
    return {lstat:await S(mb, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const Id = a => a.lstat.isDirectory(), Jd = a => !a.lstat.isDirectory();
async function Kd(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  const {ignore:b = []} = {};
  if (!(await S(mb, a)).isDirectory()) {
    var c = Error("Path is not a directory");
    c.code = "ENOTDIR";
    throw c;
  }
  c = await S(ob, a);
  var d = await Hd(a, c);
  c = d.filter(Id);
  d = d.filter(Jd).reduce((e, f) => {
    var g = f.lstat.isDirectory() ? "Directory" : f.lstat.isFile() ? "File" : f.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return {...e, [f.relativePath]:{type:g}};
  }, {});
  c = await c.reduce(async(e, {path:f, relativePath:g}) => {
    const h = U(a, f);
    if (b.includes(h)) {
      return e;
    }
    e = await e;
    f = await Kd(f);
    return {...e, [g]:f};
  }, {});
  return {content:{...d, ...c}, type:"Directory"};
}
;const Ld = async a => {
  await S(rb, a);
}, Md = async a => {
  const {content:b} = await Kd(a);
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
  c = c.map(e => T(a, e));
  await Promise.all(c.map(Ld));
  d = d.map(e => T(a, e));
  await Promise.all(d.map(Md));
  await S(pb, a);
}, Nd = async a => {
  (await S(mb, a)).isDirectory() ? await Md(a) : await Ld(a);
};
function Od(a) {
  a = nc(a);
  try {
    Pd(a);
  } catch (b) {
    if (!/EEXIST/.test(b.message) || -1 == b.message.indexOf(a)) {
      throw b;
    }
  }
}
function Pd(a) {
  try {
    nb(a);
  } catch (b) {
    if ("ENOENT" == b.code) {
      const c = nc(a);
      Pd(c);
      Pd(a);
    } else {
      if ("EEXIST" != b.code) {
        throw b;
      }
    }
  }
}
;async function Qd() {
  return await new Promise((a, b) => {
    Ja(16, (c, d) => {
      if (c) {
        return b(c);
      }
      a(d.toString("hex"));
    });
  });
}
class Rd {
  constructor(a = {}) {
    const {filename:b = Qd, destination:c = Ab} = a;
    this.c = b;
    "string" == typeof c ? (Od(T(c, "file.dat")), this.a = () => c) : this.a = c;
  }
  async _handleFile(a, b) {
    const c = await this.a(a, b);
    a = await this.c(a, b);
    const d = T(c, a), e = jb(d);
    await new Promise((f, g) => {
      b.stream.pipe(e);
      b.stream.on("error", g);
      e.on("error", g);
      e.on("finish", f);
    });
    return {destination:c, filename:a, path:d, size:e.bytesWritten};
  }
  async _removeFile(a, b) {
    a = b.path;
    delete b.destination;
    delete b.filename;
    delete b.path;
    await Nd(a);
  }
}
;class Sd {
  async _handleFile(a, b) {
    a = await Ib(b.stream, {binary:!0});
    return {buffer:a, size:a.length};
  }
  async _removeFile(a, b) {
    delete b.buffer;
    return null;
  }
}
;function Td() {
  return !0;
}
function Ud(a, b, c) {
  const d = a.fileFilter, e = {};
  b.forEach(({maxCount:f = Infinity, name:g}) => {
    e[g] = f;
  });
  return {limits:a.limits, preservePath:a.preservePath, storage:a.storage, fileFilter:function(f, g) {
    if (0 >= (e[g.fieldname] || 0)) {
      throw W("LIMIT_UNEXPECTED_FILE", g.fieldname);
    }
    --e[g.fieldname];
    return d(f, g);
  }, na:c};
}
class Vd {
  constructor(a = {}) {
    const {storage:b, dest:c, limits:d = {}, preservePath:e = !1, fileFilter:f = Td} = a;
    b ? this.storage = b : c ? this.storage = new Rd({destination:c}) : this.storage = new Sd;
    this.limits = d;
    this.preservePath = e;
    this.fileFilter = f;
  }
  single(a) {
    a = Ud(this, [{name:a, maxCount:1}], "VALUE");
    return Fd(a);
  }
  array(a, b) {
    a = Ud(this, [{name:a, maxCount:b}], "ARRAY");
    return Fd(a);
  }
  fields(a) {
    a = Ud(this, a, "OBJECT");
    return Fd(a);
  }
  none() {
    const a = Ud(this, [], "NONE");
    return Fd(a);
  }
  any() {
    return Fd({limits:this.limits, preservePath:this.preservePath, storage:this.storage, fileFilter:this.fileFilter, na:"ARRAY"});
  }
}
;/*
 resolve-path
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2015-2018 Douglas Christopher Wilson
 MIT Licensed
*/
const Wd = /(?:^|[\\/])\.\.(?:[\\/]|$)/;
function Xd(a, b) {
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
    throw A(400, "Malicious Path");
  }
  if (pc(c)) {
    throw A(400, "Malicious Path");
  }
  if (Wd.test(qc("." + tc + c))) {
    throw A(403);
  }
  return qc(T(sc(d), c));
}
;const Yd = async(...a) => await S(kb, ...a), Zd = async(...a) => await S(qb, ...a), $d = E("koa-send");
async function ae(a, b, c = {}) {
  B(a, "koa context required");
  B(b, "pathname required");
  $d('send "%s" %j', b, c);
  var d = c.root ? qc(sc(c.root)) : "", e = "/" == b[b.length - 1];
  b = b.substr(rc(b).root.length);
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
  b = Xd(d, b);
  if (!(e = k)) {
    a: {
      d = b.substr(d.length).split(tc);
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
    "br" == a.acceptsEncodings("br", "identity") && p && await Yd(b + ".br") ? (b += ".br", a.set("Content-Encoding", "br"), a.res.removeHeader("Content-Length"), d = ".br") : "gzip" == a.acceptsEncodings("gzip", "identity") && n && await Yd(b + ".gz") && (b += ".gz", a.set("Content-Encoding", "gzip"), a.res.removeHeader("Content-Length"), d = ".gz");
    if (m && !/\.[^/]*$/.exec(b)) {
      for (m = [...m], p = 0; p < m.length; p++) {
        n = m[p];
        if ("string" != typeof n) {
          throw new TypeError("Option extensions must be an array of strings.");
        }
        /^\./.exec(n) || (n = "." + n);
        if (await Yd(b + n)) {
          b += n;
          break;
        }
      }
    }
    try {
      var q = await Zd(b);
      if (q.isDirectory()) {
        if (l && f) {
          b += "/" + f, q = await Zd(b);
        } else {
          return;
        }
      }
    } catch (r) {
      if (["ENOENT", "ENAMETOOLONG", "ENOTDIR"].includes(r.code)) {
        throw A(404, r);
      }
      r.status = 500;
      throw r;
    }
    c && c(a.res, b, q);
    a.set("Content-Length", q.size);
    a.response.get("Last-Modified") || a.set("Last-Modified", q.mtime.toUTCString());
    a.response.get("Cache-Control") || (f = ["max-age=" + (g / 1000 | 0)], h && f.push("immutable"), a.set("Cache-Control", f.join(",")));
    a.type || (h = b, h = "" !== d ? oc(mc(h, d)) : oc(h), a.type = h);
    a.neoluddite && a.neoluddite("koa-send", "stream");
    a.body = ib(b);
    return b;
  }
}
;const be = E("koa-static");
var ce = (a, b = {}) => {
  B(a, "root directory is required to serve files");
  be('static "%s" %j', a, b);
  b.root = sc(a);
  !1 !== b.index && (b.index = b.index || "index.html");
  return b.defer ? async(c, d) => {
    await d();
    if (("HEAD" == c.method || "GET" == c.method) && null == c.body && 404 == c.status) {
      try {
        await ae(c, c.path, b);
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
        e = await ae(c, c.path, b);
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
const de = require("mime-db"), ee = /^text\/|\+(?:json|text|xml)$/i, fe = /^\s*([^;\s]*)(?:;|\s|$)/;
function ge(a) {
  if (!a || "string" != typeof a) {
    return !1;
  }
  a = (a = fe.exec(a)) && a[1].toLowerCase();
  const b = de[a];
  return b && "compressible" in b ? b.compressible : ee.test(a) || null;
}
;/*
 MIT
 Jonathan Ong
 https://npmjs.org/koa-is-json
*/
function he(a) {
  return !a || "string" == typeof a || "function" == typeof a.pipe || Buffer.isBuffer(a) ? !1 : !0;
}
;const ie = zlib.constants, je = zlib.createGunzip;
const ke = /(?:\.0*|(\.[^0]+)0+)$/, X = {Ta:1, Ka:1024, La:1048576, Ga:1073741824, Qa:Math.pow(1024, 4), Na:Math.pow(1024, 5)};
var le = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
function me(a) {
  if ("string" == typeof a) {
    if ("number" !== typeof a || isNaN(a)) {
      if ("string" !== typeof a) {
        a = null;
      } else {
        var b = le.exec(a);
        b ? (a = parseFloat(b[1]), b = b[4].toLowerCase()) : (a = parseInt(a, 10), b = "b");
        a = Math.floor(X[b] * a);
      }
    }
  } else {
    if ("number" == typeof a) {
      if (Number.isFinite(a)) {
        var c = Math.abs(a);
        b = "", b = c >= X.Na ? "PB" : c >= X.Qa ? "TB" : c >= X.Ga ? "GB" : c >= X.La ? "MB" : c >= X.Ka ? "KB" : "B";
        a = (a / X[b.toLowerCase()]).toFixed(2);
        a = a.replace(ke, "$1");
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
;const ne = {gzip:zlib.createGzip, deflate:zlib.createDeflate};
function oe(a = {}) {
  let {filter:b = ge, threshold:c = 1024} = a;
  "string" == typeof c && (c = me(c));
  return async function(d, e) {
    d.vary("Accept-Encoding");
    await e();
    ({body:e} = d);
    if (e && !d.res.headersSent && d.writable && !1 !== d.compress && "HEAD" != d.request.method && !fa[d.response.status] && !d.response.get("Content-Encoding") && (!0 === d.compress || b(d.response.type))) {
      var f = d.acceptsEncodings("gzip", "deflate", "identity");
      f || d.throw(406, "supported encodings: gzip, deflate, identity");
      if ("identity" != f) {
        he(e) && (e = d.body = JSON.stringify(e));
        if (c) {
          if (d.body instanceof tb) {
            const g = d.body;
            let h = 0, k = !1, l;
            const {oa:m, callback:p} = await new Promise((n, q) => {
              const r = new ub({transform(t, u, v) {
                this.push(t);
                k ? v() : (h += t.length, h > c ? (k = !0, n({oa:this, callback:v})) : v());
              }});
              r.once("finish", () => n({oa:r}));
              g.once("error", t => {
                l = t;
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
        f = d.body = ne[f](a);
        e instanceof sb ? (d.neoluddite && d.neoluddite("@goa/compress", "stream"), e.pipe(f)) : (d.neoluddite && d.neoluddite("@goa/compress", "data"), f.end(e));
      }
    }
  };
}
;const pe = https.request;
const qe = http.METHODS, re = http.OutgoingMessage, se = http.createServer, te = http.request;
const ue = url.URL, ve = url.Url, we = url.format, xe = url.parse;
const ye = (a, b, c = {}) => {
  const {justHeaders:d, binary:e, R:f = M(!0)} = c;
  let g, h, k, l, m = 0, p = 0;
  c = (new Promise((n, q) => {
    g = a(b, async r => {
      ({headers:h} = r);
      k = {statusMessage:r.statusMessage, statusCode:r.statusCode};
      if (d) {
        r.destroy();
      } else {
        var t = "gzip" == r.headers["content-encoding"];
        r.on("data", u => m += u.byteLength);
        r = t ? r.pipe(je()) : r;
        l = await Ib(r, {binary:e});
        p = l.length;
      }
      n();
    }).on("error", r => {
      r = f(r);
      q(r);
    }).on("timeout", () => {
      g.abort();
    });
  })).then(() => ({body:l, headers:h, ...k, Pa:m, byteLength:p, pa:null}));
  return {req:g, fa:c};
};
const ze = (a = {}) => Object.keys(a).reduce((b, c) => {
  const d = a[c];
  c = `${encodeURIComponent(c)}=${encodeURIComponent(d)}`;
  return [...b, c];
}, []).join("&").replace(/%20/g, "+"), Ae = async(a, b, {data:c, justHeaders:d, binary:e, R:f = M(!0)}) => {
  const {req:g, fa:h} = ye(a, b, {justHeaders:d, binary:e, R:f});
  g.end(c);
  a = await h;
  if ((a.headers["content-type"] || "").startsWith("application/json") && a.body) {
    try {
      a.pa = JSON.parse(a.body);
    } catch (k) {
      throw f = f(k), f.response = a.body, f;
    }
  }
  return a;
};
let Be;
try {
  const {version:a, name:b} = require("../package.json");
  Be = "@rqt/aqt" == b ? `@rqt/aqt/${a}` : `@rqt/aqt via ${b}/${a}`;
} catch (a) {
  Be = "@aqt/rqt";
}
const Ce = la("aqt"), De = async(a, b = {}) => {
  const {data:c, type:d = "json", headers:e = {"User-Agent":`Mozilla/5.0 (Node.JS) ${Be}`}, compress:f = !0, binary:g = !1, justHeaders:h = !1, method:k, timeout:l} = b;
  b = M(!0);
  const {hostname:m, protocol:p, port:n, path:q} = xe(a), r = "https:" === p ? pe : te, t = {hostname:m, port:n, path:q, headers:{...e}, timeout:l, method:k};
  if (c) {
    var u = d;
    var v = c;
    switch(u) {
      case "json":
        v = JSON.stringify(v);
        u = "application/json";
        break;
      case "form":
        v = ze(v), u = "application/x-www-form-urlencoded";
    }
    v = {data:v, contentType:u};
    ({data:u} = v);
    v = v.contentType;
    t.method = k || "POST";
    "Content-Type" in t.headers || (t.headers["Content-Type"] = v);
    "Content-Length" in t.headers || (t.headers["Content-Length"] = Buffer.byteLength(u));
  }
  !f || "Accept-Encoding" in t.headers || (t.headers["Accept-Encoding"] = "gzip, deflate");
  const {body:y, headers:N, byteLength:F, statusCode:w, statusMessage:x, Pa:Q, pa:G} = await Ae(r, t, {data:u, justHeaders:h, binary:g, R:b});
  Ce("%s %s B%s", a, F, `${F != Q ? ` (raw ${Q} B)` : ""}`);
  return {body:G ? G : y, headers:N, statusCode:w, statusMessage:x};
};
const Ee = async(a, b = {}) => {
  ({body:a} = await De(a, b));
  return a;
}, Fe = async(a, b = {}) => {
  ({body:a} = await De(a, b));
  return a;
};
const Ge = querystring.parse, He = querystring.stringify;
const Ie = async(a, b, c, d) => {
  a.session.token = b;
  a.session.scope = c;
  a.session.user = d;
  await a.session.manuallyCommit();
  a.redirect("/");
};
function Je(a, b) {
  if (!b) {
    throw Error("Config with at least client_id and client_secret is required.");
  }
  const {client_id:c = "", client_secret:d = "", path:e = "/auth/github", redirectPath:f = `${e}/redirect`, scope:g = "", error:h = (n, q, r) => {
    throw Error(r);
  }, finish:k = Ie, session:l} = b;
  c || console.warn("[github] No client id - the dialog won't work.");
  d || console.warn("[github] No client secret - the redirect won't work.");
  const m = async n => {
    if (!n.session) {
      throw Error("Cannot start github middleware because session was not started.");
    }
    var q = Math.floor(10000 * Math.random());
    n.session["githib-state"] = q;
    await n.session.manuallyCommit();
    const r = Ke(n, f);
    q = Le({ga:r, client_id:c, scope:g, state:q});
    n.redirect(q);
  }, p = async(n, q) => {
    var r = Ke(n, f);
    let t;
    if (!n.session) {
      throw Error("Cannot finish github middleware because session was not started.");
    }
    t = n.query.state;
    if (t != n.session["githib-state"]) {
      throw Error("The state is incorrect.");
    }
    n.session["githib-state"] = null;
    await n.session.manuallyCommit();
    if (n.query.error) {
      await h(n, n.query.error, n.query.error_description, q);
    } else {
      var u = n.query.code;
      if (!u) {
        throw Error("Code Not Found.");
      }
      var {access_token:v, scope:y} = await Me({client_id:c, client_secret:d, ga:r, code:u, state:t});
      r = [Ne(v), .../user:email/.test(y) ? [Oe(v)] : []];
      var [N, F] = await Promise.all(r);
      F && (N.emails = F);
      await k(n, v, y, N, q);
    }
  };
  a.use(async(n, q) => {
    if (n.path == e) {
      l && await l(n, () => {
      }), await m(n);
    } else {
      if (n.path.startsWith(f)) {
        l && await l(n, () => {
        }), await p(n, q);
      } else {
        return q();
      }
    }
  });
}
const Ne = async a => await Pe({sa:a, path:"user"}), Oe = async a => await Pe({sa:a, path:"user/emails"}), Pe = async a => {
  var b = a.sa;
  const c = `https://api.github.com/${a.path}`;
  a = He(a.data);
  b = await Fe(`${c}?${a}`, {headers:{Authorization:`token ${b}`, Accept:"application/json", "User-Agent":"@idio/github http://github.com/idiocc/github"}});
  if (b.message) {
    throw Error(b.message);
  }
  return b;
}, Me = async({code:a, client_id:b, client_secret:c, ga:d, state:e}) => {
  const {access_token:f, scope:g, token_type:h, error:k, error_description:l} = await Fe("https://github.com/login/oauth/access_token", {data:{code:a, redirect_uri:d, client_id:b, client_secret:c, ...e ? {state:e} : {}}, headers:{Accept:"application/json"}});
  if (k) {
    throw a = Error(l), a.type = k, a;
  }
  return {access_token:f, scope:g, token_type:h};
}, Le = ({ga:a, client_id:b, scope:c, state:d}) => `https://www.github.com/login/oauth/authorize?${He({client_id:b, redirect_uri:a, ...d ? {state:d} : {}, ...c ? {scope:c} : {}})}`, Ke = ({protocol:a, host:b}, c) => [/\.ngrok\.io$/.test(b) ? "https" : a, "://", b, c].join("");
class Qe extends Vd {
  any() {
    return Re(super.any());
  }
  array(...a) {
    return Re(super.array(...a));
  }
  fields(...a) {
    return Re(super.fields(...a));
  }
  none(...a) {
    return Re(super.none(...a));
  }
  single(...a) {
    return Re(super.single(...a));
  }
}
const Se = E("idio"), Re = a => aa([a, async function(b, c) {
  b.req.file && (b.file = b.req.file);
  b.req.files && (b.files = b.req.files);
  b.req.body && (b.request.body = b.req.body);
  b.file || b.files ? b.neoluddite("@multipart/form-data", "file") : b.request.body && b.neoluddite("@multipart/form-data", "body");
  await c();
}]), Te = {["static"](a, b, c) {
  const {root:d = [], mount:e, ...f} = c;
  if (!Array.isArray(d)) {
    return a = ce(d, f), e ? Ha(e, a) : a;
  }
  a = d.map(g => ce(g, {...f}));
  a = aa(a);
  return e ? Ha(e, a) : a;
}, ["compress"](a, b, c) {
  return oe({flush:ie.Z_SYNC_FLUSH, ...c});
}, ["session"](a, b, c) {
  let {keys:d, keygrip:e, algorithm:f, ...g} = c;
  if (d && !Array.isArray(d)) {
    throw Error("session: Keys must be an array.");
  }
  if (f) {
    if (!(d && 0 in d)) {
      throw Error("To create a Keygrip instance with custom algorithm, keys must be provided.");
    }
    e = new Na(d, f);
    Se("Created Keygrip instance with %s algorithm", f);
  }
  if (!(!1 === g.signed || e || d && 0 in d)) {
    throw Error("Session keys are signed by default, unless you set signed=false, you must provide an array with keys.");
  }
  e ? Se("session: Setting a Keygrip instance on the app") : d ? Se("session: Setting an array of keys of length %s on the app", d.length) : Se("session: the cookies won't be signed as no keys are provided.");
  a.keys = e || d;
  return Za(g);
}, ["cors"](a, b, c) {
  const {origin:d, ...e} = c;
  a = Array.isArray(d) ? f => {
    const g = f.get("Origin");
    return d.find(h => h == g);
  } : d;
  return eb({origin:a, ...e});
}, ["form"](a, b, c) {
  const {any:d, array:e, none:f, fields:g, single:h, ...k} = c;
  return d ? (new Qe(k)).any() : e ? (new Qe(k)).array(e.name, e.maxFiles) : f ? (new Qe(k)).none() : g ? (new Qe(k)).fields(g) : h ? (new Qe(k)).single(h) : new Qe(k);
}, ["frontend"](a, b, c) {
  return Ac(c);
}, ["csrfCheck"](a, b, c) {
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
}, ["github"](a, b, c, d) {
  if (!d) {
    throw Error("You need to configure session before GitHub middleware.");
  }
  Je(a, {session:d.session, ...c});
}};
async function Ue(a, b, c, d) {
  if ("function" == typeof b) {
    return c.use(b), b;
  }
  const {use:e, config:f = {}, middlewareConstructor:g, ...h} = b;
  if (a in Te) {
    b = Te[a];
  } else {
    if (g) {
      if (b = g, "function" != typeof b) {
        throw Error(`Expecting a function in the "middlewareConstructor" of the ${a} middleware.`);
      }
    } else {
      throw Error(`Unknown middleware config item "${a}". Either specify one from the idio bundle, or pass the "middlewareConstructor" property.`);
    }
  }
  a = await b(c, f, h, d);
  e && c.use(a);
  return a;
}
async function Ve(a, b) {
  const {neoluddite:c, ...d} = a;
  if (c) {
    const {app:e, env:f, key:g, host:h = "https://neoluddite.dev"} = c;
    if (!g) {
      throw Error("key is expected for neoluddite integration.");
    }
    b.use(async(k, l) => {
      k._usage = [];
      try {
        await l();
      } finally {
        if (!k._usage.length) {
          return;
        }
        k = k._usage.map(m => {
          e && (m.app = e);
          f && (m.env = f);
          return m;
        });
        try {
          await Ee(`${h}/use?key=${g}`, {data:k});
        } catch (m) {
          b.emit("error", m);
        }
      }
    });
  }
  return await Object.keys(d).reduce(async(e, f) => {
    e = await e;
    var g = a[f];
    Array.isArray(g) ? (g = g.map(async h => {
      await Ue(f, h, b, e);
    }), g = await Promise.all(g)) : g = await Ue(f, g, b, e);
    return {...e, [f]:g};
  }, {});
}
;/*
 MIT 2014 Jordan Harband
 https://github.com/ljharb/is-generator-function
*/
const We = Object.prototype.toString, Xe = Function.prototype.toString, Ye = /^\s*(?:function)?\*/, Ze = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, $e = Object.getPrototypeOf;
var af;
a: {
  if (Ze) {
    try {
      af = Function("return function*() {}")();
      break a;
    } catch (a) {
    }
    af = void 0;
  } else {
    af = !1;
  }
}
const bf = af, cf = bf ? $e(bf) : {};
/*
 ee-first
 Copyright(c) 2014 Jonathan Ong
 MIT Licensed
*/
function df(a, b) {
  function c() {
    d();
    b.apply(null, arguments);
  }
  function d() {
    for (var n, q = 0; q < f.length; q++) {
      n = f[q], n.za.removeListener(n.event, n.Fa);
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
      var m = h[l], p = ef(m, c);
      k.on(m, p);
      f.push({za:k, event:m, Fa:p});
    }
  }
  e.cancel = d;
  return e;
}
function ef(a, b) {
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
function ff(a, b) {
  var c = a.socket;
  c = "boolean" == typeof a.finished ? !!(a.finished || c && !c.writable) : "boolean" == typeof a.complete ? !(!a.upgrade && c && c.readable && (!a.complete || a.readable)) : void 0;
  !1 !== c ? setImmediate(b, null, a) : (c = a.__onFinished, c && c.S || (c = a.__onFinished = gf(a), hf(a, c)), c.S.push(b));
}
function hf(a, b) {
  function c(h) {
    g.cancel();
    e.cancel();
    f = !0;
    b(h);
  }
  function d(h) {
    a.removeListener("socket", d);
    f || g === e && (e = df([[h, "error", "close"]], c));
  }
  var e, f = !1;
  var g = e = df([[a, "end", "finish"]], c);
  if (a.socket) {
    d(a.socket);
  } else {
    a.on("socket", d);
  }
}
function gf(a) {
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
function jf(a) {
  if (a instanceof fb) {
    a.destroy();
    if ("function" == typeof a.close) {
      a.on("open", kf);
    }
    return a;
  }
  if (!(a instanceof sb)) {
    return a;
  }
  "function" == typeof a.destroy && a.destroy();
  return a;
}
function kf() {
  "number" == typeof this.fd && this.close();
}
;/*
 MIT
 Copyright (c) 2014 Jonathan Ong <me@jongleberry.com>
 Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com>
 https://npmjs.com/package/mime-types
*/
const lf = require("mime-db"), mf = /^\s*([^;\s]*)(?:;|\s|$)/, nf = /^text\//i, of = Object.create(null), pf = Object.create(null);
qf();
function rf(a) {
  return a && "string" == typeof a ? (a = oc("x." + a).toLowerCase().substr(1)) ? pf[a] || !1 : !1 : !1;
}
function qf() {
  const a = ["nginx", "apache", void 0, "iana"];
  Object.keys(lf).forEach(b => {
    const c = lf[b], d = c.extensions;
    if (d && d.length) {
      of[b] = d;
      for (let e = 0; e < d.length; e++) {
        const f = d[e];
        if (pf[f]) {
          const g = a.indexOf(lf[pf[f]].source), h = a.indexOf(c.source);
          if ("application/octet-stream" != pf[f] && (g > h || g == h && "application/" == pf[f].substr(0, 12))) {
            continue;
          }
        }
        pf[f] = b;
      }
    }
  });
}
;/*
 MIT content-type
 2015 Douglas Christopher Wilson
*/
const sf = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g, tf = /\\([\u000b\u0020-\u00ff])/g, uf = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
function vf(a) {
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
  if (!uf.test(c)) {
    throw new TypeError("invalid media type");
  }
  c = new wf(c.toLowerCase());
  if (-1 != b) {
    let e;
    var d;
    for (sf.lastIndex = b; d = sf.exec(a);) {
      if (d.index !== b) {
        throw new TypeError("invalid parameter format");
      }
      b += d[0].length;
      e = d[1].toLowerCase();
      d = d[2];
      '"' == d[0] && (d = d.substr(1, d.length - 2).replace(tf, "$1"));
      c.parameters[e] = d;
    }
    if (b != a.length) {
      throw new TypeError("invalid parameter format");
    }
  }
  return c;
}
class wf {
  constructor(a) {
    this.parameters = {};
    this.type = a;
  }
}
;/*
 MIT media-typer
 2014-2017 Douglas Christopher Wilson
*/
const xf = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;
/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2015 Douglas Christopher Wilson
 https://npmjs.org/type-is
*/
function yf(a, b) {
  var c = [];
  if ("string" != typeof a) {
    var d = null;
  } else {
    try {
      var {type:e} = vf(a);
      if (!e) {
        throw new TypeError("argument string is required");
      }
      if ("string" != typeof e) {
        throw new TypeError("argument string is required to be a string");
      }
      d = xf.test(e.toLowerCase()) ? e : null;
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
    var f = zf(d = b[c]);
    !1 === f ? e = !1 : (e = a.split("/"), f = f.split("/"), e = 2 != e.length || 2 != f.length || "*" != f[0] && f[0] != e[0] ? !1 : "*+" == f[1].substr(0, 2) ? f[1].length <= e[1].length + 1 && f[1].substr(1) == e[1].substr(1 - f[1].length) : "*" != f[1] && f[1] != e[1] ? !1 : !0);
    if (e) {
      return "+" == d[0] || -1 !== d.indexOf("*") ? a : d;
    }
  }
  return !1;
}
function Af(a, b, ...c) {
  var d = a.headers;
  d = void 0 !== d["transfer-encoding"] || !isNaN(d["content-length"]);
  if (!d) {
    return null;
  }
  2 < arguments.length && (b = [b, ...c]);
  return yf(a.headers["content-type"], b);
}
function zf(a) {
  if ("string" != typeof a) {
    return !1;
  }
  switch(a) {
    case "urlencoded":
      return "application/x-www-form-urlencoded";
    case "multipart":
      return "multipart/*";
  }
  return "+" == a[0] ? "*/*" + a : -1 == a.indexOf("/") ? rf(a) : a;
}
;/*
 content-disposition
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
var Bf = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g, Cf = /%[0-9A-Fa-f]{2}/, Df = /[^\x20-\x7e\xa0-\xff]/g, Ef = /([\\"])/g, Ff = /^[\x20-\x7e\x80-\xff]+$/, Gf = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/;
function Hf(a, b = {}) {
  const {type:c = "attachment", fallback:d = !0} = b;
  a = If(a, d);
  return Jf(new Kf(c, a));
}
function If(a, b = !0) {
  if (void 0 !== a) {
    var c = {};
    if ("string" != typeof a) {
      throw new TypeError("filename must be a string");
    }
    if ("string" != typeof b && "boolean" != typeof b) {
      throw new TypeError("fallback must be a string or boolean");
    }
    if ("string" == typeof b && Df.test(b)) {
      throw new TypeError("fallback must be ISO-8859-1 string");
    }
    a = mc(a);
    var d = Ff.test(a);
    b = "string" != typeof b ? b && String(a).replace(Df, "?") : mc(b);
    var e = "string" == typeof b && b != a;
    if (e || !d || Cf.test(a)) {
      c["filename*"] = a;
    }
    if (d || e) {
      c.filename = e ? b : a;
    }
    return c;
  }
}
function Jf({parameters:a, type:b}) {
  if ("string" != typeof b || !Gf.test(b)) {
    throw new TypeError("invalid type");
  }
  b = `${b}`.toLowerCase();
  if (a && "object" == typeof a) {
    let c;
    const d = Object.keys(a).sort();
    for (let e = 0; e < d.length; e++) {
      c = d[e];
      const f = "*" == c.substr(-1) ? "UTF-8''" + encodeURIComponent(String(a[c])).replace(Bf, Lf) : '"' + String(a[c]).replace(Ef, "\\$1") + '"';
      b += "; " + c + "=" + f;
    }
  }
  return b;
}
function Lf(a) {
  return "%" + String(a).charCodeAt(0).toString(16).toUpperCase();
}
class Kf {
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
function Mf(a, b) {
  if (a instanceof sb && !a.listeners("error").includes(b)) {
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
function Nf(a, b, c) {
  a.cache.set(b, c);
  a.size++;
  a.size >= a.max && (a.size = 0, a.a = a.cache, a.cache = new Map);
}
class Of {
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
      return d.w && c() > d.w ? (d.w = 0, d.value = void 0) : (Nf(this, a, d), void 0 !== b && (a = b ? c() + b : 0, d.w = a)), d.value;
    }
  }
  set(a, b, c = {}) {
    c = (c = c.maxAge) ? Date.now() + c : 0;
    let d = this.cache.get(a);
    d ? (d.w = c, d.value = b) : (d = {value:b, w:c}, Nf(this, a, d));
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
const Pf = new Of(100);
/*
 escape-html
 Copyright(c) 2012-2013 TJ Holowaychuk
 Copyright(c) 2015 Andreas Lubbe
 Copyright(c) 2015 Tiancheng "Timothy" Gu
 MIT Licensed
*/
var Qf = /["'&<>]/;
const Rf = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, Sf = /^(?:lax|strict)$/i;
function Tf(a) {
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
class Uf {
  constructor(a, b, c) {
    this.path = "/";
    this.maxAge = this.domain = this.expires = void 0;
    this.httpOnly = !0;
    this.overwrite = this.secure = this.sameSite = !1;
    if (!Rf.test(a)) {
      throw new TypeError("argument name is invalid");
    }
    if (b && !Rf.test(b)) {
      throw new TypeError("argument value is invalid");
    }
    b || (this.expires = new Date(0));
    this.name = a;
    this.value = b || "";
    for (let d in c) {
      this[d] = c[d];
    }
    if (this.path && !Rf.test(this.path)) {
      throw new TypeError("option path is invalid");
    }
    if (this.domain && !Rf.test(this.domain)) {
      throw new TypeError("option domain is invalid");
    }
    if (this.sameSite && !0 !== this.sameSite && !Sf.test(this.sameSite)) {
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
const Vf = {};
class Wf {
  constructor(a, b, c) {
    this.secure = void 0;
    this.request = a;
    this.response = b;
    c && (this.keys = Array.isArray(c.keys) ? new Na(c.keys) : c.keys, this.secure = c.secure);
  }
  get(a, b) {
    const c = `${a}.sig`;
    var d;
    const e = b && void 0 !== b.signed ? b.signed : !!this.keys;
    if (d = this.request.headers.cookie) {
      if (d = d.match(Vf[a] ? Vf[a] : Vf[a] = new RegExp("(?:^|;) *" + a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "=([^;]*)"))) {
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
    a = new Uf(a, b, k);
    if (!g && c.secure) {
      throw Error("Cannot send secure cookie over unencrypted connection");
    }
    a.secure = g;
    "secure" in c || (a.secure = g);
    Xf(f, a);
    if (c && h) {
      if (!this.keys) {
        throw Error(".keys required for signed cookies");
      }
      a.value = this.keys.sign(a.toString());
      a.name += ".sig";
      Xf(f, a);
    }
    (d.set ? re.prototype.setHeader : d.setHeader).call(d, "Set-Cookie", f);
    return this;
  }
}
function Xf(a, b) {
  if (b.overwrite) {
    for (var c = a.length - 1; 0 <= c; c--) {
      0 === a[c].indexOf(b.name + "=") && a.splice(c, 1);
    }
  }
  a.push(Tf(b));
}
;const Yf = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function Zf(a) {
  return a.split(",").map((b, c) => {
    var d = Yf.exec(b.trim());
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
function $f(a, b) {
  const c = Zf(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(ag).sort(bg).map(cg);
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
  return d.filter(ag).sort(bg).map(e => b[d.indexOf(e)]);
}
function bg(a, b) {
  return b.q - a.q || b.s - a.s || a.m - b.m || a.j - b.j || 0;
}
function cg(a) {
  return a.charset;
}
function ag(a) {
  return 0 < a.q;
}
;const dg = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function eg(a) {
  a = a.split(",");
  for (var b = !1, c = 1, d = 0, e = 0; d < a.length; d++) {
    var f = d;
    var g = dg.exec(a[d].trim());
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
    f && (a[e++] = f, b = b || fg("identity", f, void 0), c = Math.min(c, f.q || 1));
  }
  b || (a[e++] = {encoding:"identity", q:c, j:d});
  a.length = e;
  return a;
}
function fg(a, b, c) {
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
function gg(a, b) {
  var c = eg(a || "");
  if (!b) {
    return c.filter(hg).sort(ig).map(jg);
  }
  var d = b.map(function(e, f) {
    for (var g = {m:-1, q:0, s:0}, h = 0; h < c.length; h++) {
      var k = fg(e, c[h], f);
      k && 0 > (g.s - k.s || g.q - k.q || g.m - k.m) && (g = k);
    }
    return g;
  });
  return d.filter(hg).sort(ig).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function ig(a, b) {
  return b.q - a.q || b.s - a.s || a.m - b.m || a.j - b.j || 0;
}
function jg(a) {
  return a.encoding;
}
function hg(a) {
  return 0 < a.q;
}
;const kg = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
function lg(a) {
  a = a.split(",");
  for (var b = 0, c = 0; b < a.length; b++) {
    var d = mg(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function mg(a, b) {
  var c = kg.exec(a);
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
  return {prefix:a, P:d, q:f, j:b, K:e};
}
function ng(a, b) {
  var c = lg(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(og).sort(pg).map(qg);
  }
  var d = b.map(function(e, f) {
    for (var g = {m:-1, q:0, s:0}, h = 0; h < c.length; h++) {
      a: {
        var k = c[h];
        var l = f, m = mg(e, void 0);
        if (m) {
          var p = 0;
          if (k.K.toLowerCase() === m.K.toLowerCase()) {
            p |= 4;
          } else {
            if (k.prefix.toLowerCase() === m.K.toLowerCase()) {
              p |= 2;
            } else {
              if (k.K.toLowerCase() === m.prefix.toLowerCase()) {
                p |= 1;
              } else {
                if ("*" !== k.K) {
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
  return d.filter(og).sort(pg).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function pg(a, b) {
  return b.q - a.q || b.s - a.s || a.m - b.m || a.j - b.j || 0;
}
function qg(a) {
  return a.K;
}
function og(a) {
  return 0 < a.q;
}
;const rg = /^\s*([^s/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
function sg(a) {
  a = a.split(",");
  for (var b = 1, c = 0; b < a.length; b++) {
    0 == tg(a[c]) % 2 ? a[++c] = a[b] : a[c] += "," + a[b];
  }
  a.length = c + 1;
  for (c = b = 0; b < a.length; b++) {
    var d = ug(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function ug(a, b) {
  var c = rg.exec(a);
  if (!c) {
    return null;
  }
  a = Object.create(null);
  var d = 1, e = c[2], f = c[1];
  if (c[3]) {
    c = c[3].split(";");
    for (var g = 1, h = 0; g < c.length; g++) {
      0 == tg(c[h]) % 2 ? c[++h] = c[g] : c[h] += ";" + c[g];
    }
    c.length = h + 1;
    for (g = 0; g < c.length; g++) {
      c[g] = c[g].trim();
    }
    c = c.map(vg);
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
function wg(a, b, c) {
  var d = ug(a, void 0);
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
function xg(a, b) {
  var c = sg(void 0 === a ? "*/*" : a || "");
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
  return a.type + "/" + a.W;
}
function yg(a) {
  return 0 < a.q;
}
function tg(a) {
  for (var b = 0, c = 0; -1 !== (c = a.indexOf('"', c));) {
    b++, c++;
  }
  return b;
}
function vg(a) {
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
class Bg {
  constructor(a) {
    this.request = a;
    this.headers = this.request.headers;
  }
  charset(a) {
    return (a = this.charsets(a)) && a[0];
  }
  charsets(a) {
    return $f(this.headers["accept-charset"], a);
  }
  encoding(a) {
    return (a = this.encodings(a)) && a[0];
  }
  encodings(a) {
    return gg(this.headers["accept-encoding"], a);
  }
  language(a) {
    return (a = this.languages(a)) && a[0];
  }
  languages(a) {
    return ng(this.headers["accept-language"], a);
  }
  mediaType(a) {
    return (a = this.mediaTypes(a)) && a[0];
  }
  mediaTypes(a) {
    return xg(this.headers.accept, a);
  }
}
;/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2015 Douglas Christopher Wilson
 https://npmjs.org/accepts
*/
class Cg {
  constructor(a) {
    this.headers = a.headers;
    this.a = new Bg(a);
  }
  types(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    if (!a || 0 == a.length) {
      return this.a.mediaTypes();
    }
    if (!this.headers.accept) {
      return a[0];
    }
    b = a.map(Dg);
    var c = this.a.mediaTypes(b.filter(Eg));
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
function Dg(a) {
  return -1 == a.indexOf("/") ? rf(a) : a;
}
function Eg(a) {
  return "string" == typeof a;
}
;/*
 MIT Copyright (c) 2015 TJ Holowaychuk <tj@vision-media.ca>
 https://npmjs.org/delegates
*/
function Y(a, b) {
  const c = a.a, d = a.target;
  a.c.push(b);
  c.__defineGetter__(b, function() {
    return this[d][b];
  });
  return a;
}
function Fg(a, b) {
  var c = a.a, d = a.target;
  a.g.push(b);
  c.__defineSetter__(b, function(e) {
    return this[d][b] = e;
  });
  return a;
}
class Gg {
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
    return Fg(Y(this, a), a);
  }
}
;/*
 MIT jshttp/http-assert
*/
function Hg(a, b, c, d) {
  if (!a) {
    throw A(b, c, d);
  }
}
;const Ig = net.isIP;
/*
 parseurl
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
function Jg(a) {
  var b = a.url;
  if (void 0 !== b) {
    var c = a._parsedUrl;
    if ("object" === typeof c && null !== c && (void 0 === ve || c instanceof ve) && c._raw === b) {
      return c;
    }
    a: {
      if ("string" !== typeof b || 47 !== b.charCodeAt(0)) {
        c = xe(b);
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
              c = xe(b);
              break a;
          }
        }
        f = void 0 !== ve ? new ve : {};
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
var Kg = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;
function Lg(a, b) {
  var c = a["if-modified-since"], d = a["if-none-match"];
  if (!c && !d || (a = a["cache-control"]) && Kg.test(a)) {
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
  return !c || (b = b["last-modified"], b && Mg(b) <= Mg(c)) ? !0 : !1;
}
function Mg(a) {
  a = a && Date.parse(a);
  return "number" === typeof a ? a : NaN;
}
;const Ng = Symbol("context#ip");
class Og {
  constructor() {
    this.res = this.req = this.response = this.ctx = this.app = null;
    this.originalUrl = "";
    this.ja = {};
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
    return Jg(this.req).pathname;
  }
  set path(a) {
    const b = Jg(this.req);
    b.pathname !== a && (b.pathname = a, b.path = null, this.url = we(b));
  }
  get query() {
    const a = this.querystring, b = this.ja = this.ja || {};
    return b[a] || (b[a] = Ge(a));
  }
  set query(a) {
    this.querystring = He(a);
  }
  get querystring() {
    return this.req ? Jg(this.req).query || "" : "";
  }
  set querystring(a) {
    const b = Jg(this.req);
    b.search !== `?${a}` && (b.search = a, b.path = null, this.url = we(b));
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
        this.V = new ue(`${this.origin}${a}`);
      } catch (b) {
        this.V = Object.create(null);
      }
    }
    return this.V;
  }
  get fresh() {
    const a = this.method, b = this.ctx.status;
    return "GET" != a && "HEAD" != a ? !1 : 200 <= b && 300 > b || 304 == b ? Lg(this.header, this.response.header) : !1;
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
      const {parameters:a} = vf(this.req);
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
    this[Ng] || (this[Ng] = this.ips[0] || this.socket.remoteAddress || "");
    return this[Ng];
  }
  set ip(a) {
    this[Ng] = a;
  }
  get subdomains() {
    const a = this.app.subdomainOffset, b = this.hostname;
    return Ig(b) ? [] : b.split(".").reverse().slice(a);
  }
  get accept() {
    return this.Y || (this.Y = new Cg(this.req));
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
      return Af(this.req);
    }
    Array.isArray(a) || (a = [a, ...b]);
    return Af(this.req, a);
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
  [na.custom]() {
    return this.inspect();
  }
}
;const Pg = Symbol("context#cookies");
class Qg {
  constructor() {
    this.state = this.originalUrl = this.res = this.req = this.response = this.request = this.app = null;
    this[Pg] = null;
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
    return Hg;
  }
  throw(...a) {
    throw A(...a);
  }
  onerror(a) {
    if (null != a) {
      a instanceof Error || (a = Error(ma("non-error thrown: %j", a)));
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
        "number" == typeof a.status && z[a.status] || (a.status = 500);
        b = z[a.status];
        b = a.expose ? a.message : b;
        this.status = a.status;
        this.length = Buffer.byteLength(b);
        c.end(b);
      }
    }
  }
  get cookies() {
    this[Pg] || (this[Pg] = new Wf(this.req, this.res, {keys:this.app.keys, secure:this.request.secure}));
    return this[Pg];
  }
  set cookies(a) {
    this[Pg] = a;
  }
  [na.custom]() {
    return this.inspect();
  }
}
Y(Y((new Gg(Qg.prototype, "response")).method("attachment").method("redirect").method("remove").method("vary").method("set").method("append").method("flushHeaders").access("status").access("message").access("body").access("length").access("type").access("lastModified").access("etag"), "headerSent"), "writable");
Y(Y(Y(Y(Y(Y(Y(Y(Y(Y(Y(Y(Y(Y((new Gg(Qg.prototype, "request")).method("acceptsLanguages").method("acceptsEncodings").method("acceptsCharsets").method("accepts").method("get").method("is").access("querystring").access("idempotent").access("socket").access("search").access("method").access("query").access("path").access("url").access("accept"), "origin"), "href"), "subdomains"), "protocol"), "host"), "hostname"), "URL"), "header"), "headers"), "secure"), "stale"), "fresh"), "ips"), "ip");
class Rg {
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
    this.headerSent || (B(Number.isInteger(a), "status code must be a number"), B(100 <= a && 999 >= a, `invalid status code: ${a}`), this.c = !0, this.res.statusCode = a, 2 > this.req.httpVersionMajor && (this.res.statusMessage = z[a]), this.body && fa[a] && (this.body = null));
  }
  get message() {
    return this.res.statusMessage || z[this.status];
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
      fa[this.status] || (this.status = 204), this.remove("Content-Type"), this.remove("Content-Length"), this.remove("Transfer-Encoding");
    } else {
      this.c || (this.status = 200);
      var c = !this.header["content-type"];
      "string" == typeof a ? (c && (this.type = /^\s*</.test(a) ? "html" : "text"), this.length = Buffer.byteLength(a)) : Buffer.isBuffer(a) ? (c && (this.type = "bin"), this.length = a.length) : "function" == typeof a.pipe ? (ff(this.res, jf.bind(null, a)), Mf(a, d => this.ctx.onerror(d)), null != b && b != a && this.remove("Content-Length"), c && (this.type = "bin")) : (this.remove("Content-Length"), this.type = "json");
    }
  }
  set length(a) {
    this.set("Content-Length", a);
  }
  get length() {
    const a = this.header["content-length"], b = this.body;
    return null == a ? b ? "string" == typeof b ? Buffer.byteLength(b) : Buffer.isBuffer(b) ? b.length : he(b) ? Buffer.byteLength(JSON.stringify(b)) : null : null : Math.trunc(parseInt(a, 10)) || 0;
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
        (c = cb(d, a)) && b.setHeader("Vary", c);
      }
    }
  }
  redirect(a, b) {
    "back" == a && (a = this.ctx.get("Referrer") || b || "/");
    this.set("Location", a);
    ea[this.status] || (this.status = 302);
    if (this.ctx.accepts("html")) {
      var c = Qf.exec(a);
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
    a && (this.type = oc(a));
    this.set("Content-Disposition", Hf(a, b));
  }
  set type(a) {
    var b = Pf.get(a);
    if (!b) {
      if (a && "string" == typeof a) {
        if (b = -1 == a.indexOf("/") ? rf(a) : a) {
          if (!b.includes("charset")) {
            var c;
            if (b && "string" == typeof b) {
              var d = (c = mf.exec(b)) && lf[c[1].toLowerCase()];
              c = d && d.charset ? d.charset : c && nf.test(c[1]) ? "UTF-8" : !1;
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
      Pf.set(a, b);
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
    return yf(c, a);
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
  [na.custom]() {
    return this.inspect();
  }
}
;const Sg = E("@goa/koa:application");
async function Tg(a, b) {
  const c = a.res;
  c.statusCode = 404;
  ff(c, d => a.onerror(d));
  try {
    return await b(a), Ug(a);
  } catch (d) {
    a.onerror(d);
  }
}
class Vg extends Cc {
  constructor(a = {}) {
    const {proxy:b = !1, subdomainOffset:c = 2, env:d = process.env.NODE_ENV || "development", keys:e, Context:f = Qg} = a;
    super();
    this.proxy = b;
    this.silent = !1;
    this.middleware = [];
    this.subdomainOffset = c;
    this.env = d;
    this.context = Object.create(f.prototype);
    this.request = Object.create(Og.prototype);
    this.response = Object.create(Rg.prototype);
    this.keys = e;
  }
  [na.custom]() {
    return this.inspect();
  }
  listen(...a) {
    Sg("listen");
    return se(this.callback()).listen(...a);
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
    if ("function" != typeof a ? 0 : Ye.test(Xe.call(a)) || (Ze ? $e(a) == cf : "[object GeneratorFunction]" == We.call(a))) {
      throw Error("Generator functions are not supported by @goa/koa. Use koa-convert on them first.");
    }
    Sg("use %s", a.Sa || a.name || "-");
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
      return Tg(b, a);
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
      throw new TypeError(ma("non-error thrown: %j", a));
    }
    404 == a.status || a.expose || this.silent || (a = a.stack || a.toString(), console.error(), console.error(a.replace(/^/gm, "  ")), console.error());
  }
}
function Ug(a) {
  if (0 != a.respond && a.writable) {
    var b = a.res, c = a.status, d = a.body;
    if (fa[c]) {
      return a.body = null, b.end();
    }
    if ("HEAD" == a.method) {
      return !b.headersSent && he(d) && (a.length = Buffer.byteLength(JSON.stringify(d))), b.end();
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
    if (d instanceof sb) {
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
function Wg(a) {
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
function Xg(a, b = {}) {
  const c = Wg(a);
  ({Wa:a = "./"} = b);
  b = `[^${Yg(b.delimiter || "/#?")}]+?`;
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
    const {type:t, index:u} = c[f];
    throw new TypeError(`Unexpected ${t} at ${u}, expected ${q}`);
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
function Zg(a) {
  var b = {encode:encodeURIComponent};
  return $g(Xg(a, b), b);
}
function $g(a, b = {}) {
  const c = ah(b), {encode:d = g => g, $a:e = !0} = b, f = a.map(g => {
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
function Yg(a) {
  return a.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function ah(a = {}) {
  return a.sensitive ? "" : "i";
}
function bh(a, b, c) {
  a = a.map(d => ch(d, b, c).source);
  return new RegExp(`(?:${a.join("|")})`, ah(c));
}
function dh(a, b, c = {}) {
  const {strict:d = !1, start:e = !0, end:f = !0, encode:g = m => m} = c, h = `[${Yg(c.endsWith || "")}]|$`, k = `[${Yg(c.delimiter || "/#?")}]`;
  let l = e ? "^" : "";
  for (const m of a) {
    if ("string" == typeof m) {
      l += Yg(g(m));
    } else {
      const p = Yg(g(m.prefix)), n = Yg(g(m.P));
      m.pattern ? (b && b.push(m), l = p || n ? "+" == m.v || "*" == m.v ? l + `(?:${p}((?:${m.pattern})(?:${n}${p}(?:${m.pattern}))*)${n})${"*" == m.v ? "?" : ""}` : l + `(?:${p}(${m.pattern})${n})${m.v}` : l + `(${m.pattern})${m.v}`) : l += `(?:${p}${n})${m.v}`;
    }
  }
  f ? (d || (l += `${k}?`), l += c.endsWith ? `(?=${h})` : "$") : (a = a[a.length - 1], a = "string" === typeof a ? -1 < k.indexOf(a[a.length - 1]) : void 0 === a, d || (l += `(?:${k}(?=${h}))?`), a || (l += `(?=${k}|${h})`));
  return new RegExp(l, ah(c));
}
function ch(a, b, c) {
  if (a instanceof RegExp) {
    if (b && (c = a.source.match(/\((?!\?)/g))) {
      for (var d = 0; d < c.length; d++) {
        b.push({name:d, prefix:"", P:"", v:"", pattern:""});
      }
    }
  } else {
    Array.isArray(a) ? d = bh(a, b, c) : d = dh(Xg(a, c), b, c), a = d;
  }
  return a;
}
;const eh = E("koa-router");
function fh(a, b) {
  a.path && (a.path = b + a.path, a.paramNames = [], b = a.path, a.regexp = ch("string" == typeof b ? b.replace(/\/$/, "") : b, a.paramNames, a.opts));
}
class gh {
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
    this.regexp = ch("string" == typeof a ? a.replace(/\/$/, "") : a, this.paramNames, this.opts);
    eh("defined route %s %s", this.methods, this.opts.prefix + this.path);
  }
  match(a) {
    return this.regexp.test(a);
  }
  params(a, b, c = {}) {
    for (let f = b.length, g = 0; g < f; g++) {
      if (this.paramNames[g]) {
        var d = b[g];
        a = this.paramNames[g].name;
        if (d) {
          try {
            var e = decodeURIComponent(d);
          } catch (h) {
            e = d;
          }
        } else {
          e = d;
        }
        c[a] = e;
      }
    }
    return c;
  }
  Z(a) {
    return this.opts.ignoreCaptures ? [] : a.match(this.regexp).slice(1);
  }
  url(a, b) {
    var c = a, d = this.path.replace(/\(\.\*\)/g, ""), e = Zg(d);
    "object" != typeof a && (c = [...arguments], "object" == typeof c[c.length - 1] && (b = c[c.length - 1], c = c.slice(0, c.length - 1)));
    d = Xg(d);
    let f = {};
    if (Array.isArray(c)) {
      for (let g = d.length, h = 0, k = 0; h < g; h++) {
        d[h].name && (f[d[h].name] = c[k++]);
      }
    } else {
      d.some(g => g.name) ? f = a : b = a;
    }
    c = e(f);
    return b && b.query ? (e = b.query, e = "string" == typeof e ? e : He(e), `${c}?${e}`) : c;
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
const hh = E("@goa/router");
class ih {
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
            "function" == typeof c ? h = c() : h = new A.NotImplemented;
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
                  "function" == typeof d ? h = d() : h = new A.MethodNotAllowed;
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
    const m = new gh(a, b, c, {end:h, name:k, sensitive:l, strict:g, prefix:f, ignoreCaptures:e});
    this.opts.prefix && fh(m, this.opts.prefix);
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
    const e = {path:[], qa:[], route:!1};
    for (let f = c.length, g = 0; g < f; g++) {
      if (d = c[g], hh("test %s %s", d.path, d.regexp), d.match(a) && (e.path.push(d), 0 == d.methods.length || d.methods.includes(b))) {
        e.qa.push(d), d.methods.length && (e.route = !0);
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
      fh(b, a);
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
        a && fh(f, a);
        this.opts.prefix && fh(f, this.opts.prefix);
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
      hh("%s %s", b.method, b.path);
      const d = this.opts.routerPath || b.routerPath || b.path;
      var e = this.match(d, b.method);
      b.a ? b.a.push(e.path) : b.a = e.path;
      b.router = this;
      if (!e.route) {
        return c();
      }
      e = e.qa;
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
ih.url = function(a, ...b) {
  return gh.prototype.url.apply({path:a}, b);
};
const jh = qe.map(a => a.toLowerCase());
[...jh, "all"].forEach(a => {
  function b(c, d, ...e) {
    "string" == typeof d || d instanceof RegExp || (e = [d, ...e], d = c, c = null);
    this.register(d, "all" == a ? jh : [a], e, {name:c});
    return this;
  }
  ih.prototype[a] = b;
  "delete" == a && (ih.prototype.del = b);
});
class kh extends Qg {
  constructor() {
    super();
    this.sessionOptions = this.session = void 0;
    this._usage = this.files = this.file = this.mountPath = this.router = this.params = this._matchedRouteName = this._matchedRoute = this.compress = null;
  }
  neoluddite(a, b, c = {}) {
    this._usage && this._usage.push({"package":a, item:b, timestamp:(new Date).getTime(), ...c});
  }
}
;const lh = a => {
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
const mh = async(a = {}, b = {}) => {
  const c = new Vg({Context:kh});
  a = await Ve(a, c);
  "production" == c.env && (c.proxy = !0);
  return {app:c, middleware:a, router:new ih(b)};
};
function nh(a, b, c = "0.0.0.0") {
  const d = M(!0);
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
;module.exports = {_createApp:mh, _compose:aa, _startApp:async function(a = {}, b = {}) {
  const {port:c = 5000, host:d = "0.0.0.0", router:e} = b, f = () => {
    g.destroy().then(() => {
      process.kill(process.pid, "SIGUSR2");
    });
  };
  process.once("SIGUSR2", f);
  b = await mh(a, e);
  const g = b.app;
  a = b.middleware;
  b = b.router;
  const h = await nh(g, c, d);
  lh(h);
  g.destroy = async() => {
    await h.destroy();
    process.removeListener("SIGUSR2", f);
  };
  const {port:k} = h.address();
  return {app:g, middleware:a, url:`http://localhost:${k}`, server:h, router:b};
}, _httpErrors:A, _mount:Ha, _Keygrip:Na, _Router:ih};


//# sourceMappingURL=idio.js.map