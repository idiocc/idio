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
function I(...a) {
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
  a = I[d] || I[Number(String(d).charAt(0) + "00")];
  b || (b = a ? new a(c) : Error(c || G[d]), Error.captureStackTrace(b, I));
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
  b && (I[a] = b, I[c] = b);
}, {});
function ja(a) {
  return a.split(" ").map(function(b) {
    return b.charAt(0).toUpperCase() + b.slice(1);
  }).join("").replace(/[^ _0-9a-z]/gi, "");
}
;var J = assert;
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
    return b.hb ? (b = Math.abs(a), a = 864E5 <= b ? ra(a, b, 864E5, "day") : 36E5 <= b ? ra(a, b, 36E5, "hour") : 6E4 <= b ? ra(a, b, 6E4, "minute") : 1000 <= b ? ra(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
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
const sa = /\B(?=(\d{3})+(?!\d))/g, ta = /(?:\.0*|(\.[^0]+)0+)$/, K = {b:1, kb:1024, mb:1048576, gb:1073741824, tb:Math.pow(1024, 4), pb:Math.pow(1024, 5)};
function L(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), d = b && b.jb || "", e = b && b.nb || "", f = b && void 0 !== b.za ? b.za : 2, g = !(!b || !b.fb);
  (b = b && b.lb || "") && K[b.toLowerCase()] || (b = c >= K.pb ? "PB" : c >= K.tb ? "TB" : c >= K.gb ? "GB" : c >= K.mb ? "MB" : c >= K.kb ? "KB" : "B");
  a = (a / K[b.toLowerCase()]).toFixed(f);
  g || (a = a.replace(ta, "$1"));
  d && (a = a.replace(sa, d));
  return a + e + b;
}
;/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const ua = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function va(a, b) {
  return (b = ua[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var wa = {f:L, ["fy"](a) {
  return va(L(a) || "", "yellow");
}, ["fr"](a) {
  return va(L(a) || "", "red");
}, ["fb"](a) {
  return va(L(a) || "", "blue");
}, ["fg"](a) {
  return va(L(a) || "", "green");
}, ["fc"](a) {
  return va(L(a) || "", "cyan");
}, ["fm"](a) {
  return va(L(a) || "", "magenta");
}};
const xa = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, e) => e.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), ya = {init:function(a) {
  a.inspectOpts = {...xa};
}, log:function(...a) {
  return process.stderr.write(na(...a) + "\n");
}, formatArgs:function(a) {
  var b = this.namespace, c = this.color;
  const d = this.diff;
  this.useColors ? (c = "\u001b[3" + (8 > c ? c : "8;5;" + c), b = `  ${c};1m${b} \u001B[0m`, a[0] = b + a[0].split("\n").join("\n" + b), a.push(c + "m+" + pa(d) + "\u001b[0m")) : a[0] = (xa.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in xa ? !!xa.colors : la.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:xa, formatters:{o:function(a) {
  return oa(a, {...this.inspectOpts, colors:this.useColors}).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  return oa(a, {...this.inspectOpts, colors:this.useColors});
}, ...wa}};
function za(a) {
  function b(...g) {
    if (b.enabled) {
      var h = Number(new Date);
      b.diff = h - (f || h);
      b.prev = f;
      f = b.curr = h;
      g[0] = Aa(g[0]);
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
  const b = za(a);
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
  var b = ya.load();
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
  const a = new Ea(ya);
  return function(b) {
    const c = Ba(a);
    c.namespace = b;
    c.useColors = ya.useColors();
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
function Aa(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;function M(a) {
  if (!a) {
    throw Error("To use debug, pass the namespace.");
  }
  return Fa()(a);
}
;const Ga = M("koa-mount");
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
  ka(a[0], "/", 'mount path must begin with "/"');
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
;for (var P = [], Pa = 0; 256 > Pa; ++Pa) {
  P[Pa] = (Pa + 256).toString(16).substr(1);
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
  b || (b = 0, b = [P[a[b++]], P[a[b++]], P[a[b++]], P[a[b++]], "-", P[a[b++]], P[a[b++]], "-", P[a[b++]], P[a[b++]], "-", P[a[b++]], P[a[b++]], "-", P[a[b++]], P[a[b++]], P[a[b++]], P[a[b++]], P[a[b++]], P[a[b++]]].join(""));
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
;const Q = M("koa-session:context");
async function Ua(a) {
  Q("init from external");
  var b = a.ctx, c = a.opts;
  c.externalKey ? (b = c.externalKey.get(b), Q("get external key from custom %s", b)) : (b = b.cookies.get(c.key, c), Q("get external key from cookie %s", b));
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
        Q("init from cookie");
        a = this.ctx;
        const c = this.opts, d = a.cookies.get(c.key, c);
        if (d) {
          Q("parse %s", d);
          try {
            var b = c.decode(d);
          } catch (e) {
            Q("decode %j error: %s", d, e);
            if (!(e instanceof SyntaxError)) {
              throw a.cookies.set(c.key, "", c), e.headers = {"set-cookie":a.response.get("set-cookie")}, e;
            }
            this.create();
            break a;
          }
          Q("parsed %j", b);
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
      return Q("expired session"), this.emit("expired", {key:b, value:a, ctx:c}), !1;
    }
    const d = this.opts.valid;
    return "function" != typeof d || d(c, a) ? !0 : (Q("invalid session"), this.emit("invalid", {key:b, value:a, ctx:c}), !1);
  }
  emit(a, b) {
    setImmediate(() => {
      this.app.emit(`session:${a}`, b);
    });
  }
  create(a, b) {
    Q("create session with val: %j externalKey: %s", a, b);
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
        Q("should save session: %s", d);
        d && ("function" == typeof b && (Q("before save"), b(c, a)), await this.save("changed" == d));
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
    f ? (Q("save %j to external key %s", h, f), "number" == typeof g && (g += 10000), await this.store.set(f, h, g, {changed:a, rolling:c}), this.use("save-external"), e ? e.set(this.ctx, f) : this.ctx.cookies.set(b, f, this.opts)) : (Q("save %j to cookie", h), h = d(h), Q("save %s", h), this.use("save"), this.ctx.cookies.set(b, h, this.opts));
  }
  use(a) {
    this.ctx.neoluddite && this.ctx.neoluddite("@goa/session", a);
  }
}
;/*

 MIT https://github.com/miguelmota/is-class
*/
const Xa = M("koa-session"), Ya = Symbol("context#contextSession");
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
  b && (J("function" == typeof b.get, "store.get must be function"), J("function" == typeof b.set, "store.set must be function"), J("function" == typeof b.destroy, "store.destroy must be function"));
  if (b = a.externalKey) {
    J("function" == typeof b.get, "externalKey.get must be function"), J("function" == typeof b.set, "externalKey.set must be function");
  }
  if (b = a.ContextStore) {
    J("function" == typeof b && (/^class[\s{]/.test(b.toString()) || /classCallCheck\(/.test(b.toString().replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, ""))), "ContextStore must be a class"), J("function" == typeof b.prototype.get, "ContextStore.prototype.get must be function"), J("function" == typeof b.prototype.set, "ContextStore.prototype.set must be function"), J("function" == typeof b.prototype.destroy, "ContextStore.prototype.destroy must be function");
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
        throw k = n.headers || {}, l = cb(k.vary || k.Vary || "", "Origin"), delete k.Za, n.headers = Object.assign({}, k, m, {vary:l}), n;
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
;const fb = fs.ReadStream, gb = fs.createReadStream, hb = fs.createWriteStream, ib = fs.exists, jb = fs.existsSync, kb = fs.lstat, lb = fs.mkdirSync, mb = fs.readdir, nb = fs.rmdir, ob = fs.stat, pb = fs.unlink;
var qb = stream;
const rb = stream.Readable, sb = stream.Transform, tb = stream.Writable;
const ub = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, vb = (a, b = !1) => ub(a, 2 + (b ? 1 : 0)), wb = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const xb = os.homedir, yb = os.tmpdir;
const zb = /\s+at.*(?:\(|\s)(.*)\)?/, Ab = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Bb = xb(), Cb = (a, b) => {
  const {pretty:c = !1, ignoredModules:d = ["pirates"]} = b || {};
  b = d.join("|");
  const e = new RegExp(Ab.source.replace("IGNORED_MODULES", b));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(zb);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => c ? f.replace(zb, (g, h) => g.replace(h, h.replace(Bb, "~"))) : f).join("\n");
};
function Db(a, b, c = !1) {
  return function(d) {
    var e = wb(arguments), {stack:f} = Error();
    const g = ub(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = Cb(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function R(a) {
  var {stack:b} = Error();
  const c = wb(arguments);
  b = vb(b, a);
  return Db(c, b, a);
}
;const Eb = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class Fb extends tb {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {R:e = R(!0), proxyError:f} = a || {}, g = (h, k) => e(k);
    super(d);
    this.a = [];
    this.wa = new Promise((h, k) => {
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
          const m = Cb(l.stack);
          l.stack = m;
          f && g`${l}`;
        }
        k(l);
      });
      c && Eb(this, c).pipe(this);
    });
  }
  _write(a, b, c) {
    this.a.push(a);
    c();
  }
  get fa() {
    return this.wa;
  }
}
const Gb = async(a, b = {}) => {
  ({fa:a} = new Fb({rs:a, ...b, R:R(!0)}));
  return await a;
};
async function Hb(a) {
  a = gb(a);
  return await Gb(a);
}
;const Ib = vm.Script;
const Jb = (a, b) => {
  const [c, , d] = a.split("\n");
  a = parseInt(c.replace(/.+?(\d+)$/, (f, g) => g)) - 1;
  const e = d.indexOf("^");
  ({length:b} = b.split("\n").slice(0, a).join("\n"));
  return b + e + (a ? 1 : 0);
};
const Kb = a => {
  try {
    new Ib(a);
  } catch (b) {
    const c = b.stack;
    if (!/Unexpected token '?</.test(b.message)) {
      throw b;
    }
    return Jb(c, a);
  }
  return null;
};
function Lb(a) {
  if ("object" != typeof a) {
    return !1;
  }
  const b = a.re instanceof RegExp;
  a = -1 != ["string", "function"].indexOf(typeof a.replacement);
  return b && a;
}
const Mb = (a, b) => {
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
function Nb(a, b) {
  function c() {
    return b.filter(Lb).reduce((d, {re:e, replacement:f}) => {
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
            Mb(g, l);
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
;const Ob = a => new RegExp(`%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_(\\d+)_%%`, "g"), Pb = (a, b) => `%%_RESTREAM_${a.toUpperCase()}_REPLACEMENT_${b}_%%`, Qb = (a, b) => Object.keys(a).reduce((c, d) => {
  {
    var e = a[d];
    const {getReplacement:f = Pb, getRegex:g = Ob} = b || {}, h = g(d);
    e = {name:d, re:e, regExp:h, getReplacement:f, map:{}, lastIndex:0};
  }
  return {...c, [d]:e};
}, {}), Rb = a => {
  var b = [];
  const c = a.map;
  return {re:a.regExp, replacement(d, e) {
    d = c[e];
    delete c[e];
    e = Array.isArray(b) ? b : [b];
    return Nb(d, e);
  }};
}, Sb = a => {
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
class Vb extends sb {
  constructor(a, b) {
    super(b);
    this.a = (Array.isArray(a) ? a : [a]).filter(Lb);
    this.I = !1;
    this.c = b;
  }
  async replace(a, b) {
    const c = new Vb(this.a, this.c);
    b && Object.assign(c, b);
    a = await Tb(c, a);
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
            Mb(f, l);
          }
        });
        if (e.length) {
          try {
            const h = await Promise.all(e);
            b = b.replace(c, () => h.shift());
          } catch (h) {
            Mb(f, h);
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
      a = Cb(d.stack), d.stack = a, c(d);
    }
  }
}
async function Ub(a, b) {
  b instanceof qb ? b.pipe(a) : a.end(b);
  return await Gb(a);
}
;const Wb = a => {
  [, a] = /<\s*(.+?)(?:\s+[\s\S]+)?\s*\/?\s*>/.exec(a) || [];
  return a;
}, Yb = a => {
  let b = 0;
  const c = [];
  let d;
  Nb(a, [{re:/[{}]/g, replacement(k, l) {
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
    const [, p, n, q, t] = /(\s*)(\S+)(\s*)=(\s*)$/.exec(k) || [];
    l = a.slice(l + 1, m);
    if (!n && !/\s*\.\.\./.test(l)) {
      throw Error("Could not detect prop name");
    }
    n ? e[n] = l : f.push(l);
    g[n] = {before:p, ma:q, la:t};
    l = k || "";
    l = l.slice(0, l.length - (n || "").length - 1);
    const {ea:u, T:r} = Xb(l);
    Object.assign(e, u);
    Object.assign(g, r);
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
    c[f] = {before:e, ma:g, la:h};
    b.push({j:m, name:f, ua:`${k}${l}${k}`});
    return "%".repeat(d.length);
  }).replace(/(\s*)([^\s%]+)/g, (d, e, f, g) => {
    c[f] = {before:e};
    b.push({j:g, name:f, ua:"true"});
  });
  return {ea:[...b.reduce((d, {j:e, name:f, ua:g}) => {
    d[e] = [f, g];
    return d;
  }, [])].filter(Boolean).reduce((d, [e, f]) => {
    d[e] = f;
    return d;
  }, {}), T:c};
}, Zb = (a, b = [], c = !1, d = {}, e = "") => {
  const f = Object.keys(a);
  return f.length || b.length ? `{${f.reduce((g, h) => {
    const k = a[h], l = c || -1 != h.indexOf("-") ? `'${h}'` : h, {before:m = "", ma:p = "", la:n = ""} = d[h] || {};
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
  a = Nb(a, [...b, {re:/[<>]/g, replacement(e, f) {
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
  return {Va:a, na:d};
}, dc = a => {
  const b = Wb(a);
  let c;
  const {xa:d} = Qb({xa:/=>/g});
  try {
    ({Va:k, na:c} = bc(a, [Sb(d)]));
  } catch (l) {
    if (1 === l) {
      throw Error(`Could not find the matching closing > for ${b}.`);
    }
  }
  const e = k.slice(0, c + 1);
  var f = e.replace(/<\s*[^\s/>]+/, "");
  if (/\/\s*>$/.test(f)) {
    return a = f.replace(/\/\s*>$/, ""), f = "", new cc({N:e.replace(d.regExp, "=>"), G:a.replace(d.regExp, "=>"), content:"", tagName:b});
  }
  a = f.replace(/>$/, "");
  f = c + 1;
  c = !1;
  let g = 1, h;
  Nb(k, [{re:new RegExp(`[\\s\\S](?:<\\s*${b}(\\s+|>)|/\\s*${b}\\s*>)`, "g"), replacement(l, m, p, n) {
    if (c) {
      return l;
    }
    m = !m && l.endsWith(">");
    const q = !m;
    if (q) {
      n = n.slice(p);
      const {na:t} = bc(n.replace(/^[\s\S]/, " "));
      n = n.slice(0, t + 1);
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
  return new cc({N:k, G:a.replace(d.regExp, "=>"), content:f.replace(d.regExp, "=>"), tagName:b});
};
class cc {
  constructor(a) {
    this.N = a.N;
    this.G = a.G;
    this.content = a.content;
    this.tagName = a.tagName;
  }
}
;const ec = a => {
  let b = "", c = "";
  a = a.replace(/^(\r?\n\s*)([\s\S]+)?/, (d, e, f = "") => {
    b = e;
    return f;
  }).replace(/([\s\S]+?)?(\r?\n\s*)$/, (d, e = "", f = "") => {
    c = f;
    return e;
  });
  return `${b}${a ? `\`${a}\`` : ""}${c}`;
}, gc = a => {
  const b = [];
  let c = {}, d = 0, e = 0;
  Nb(a, [{re:/[<{}]/g, replacement(f, g) {
    if (!(g < e)) {
      if (/[{}]/.test(f)) {
        d += "{" == f ? 1 : -1, 1 == d && void 0 == c.from ? c.from = g : 0 == d && (c.sa = g + 1, c.Da = a.slice(c.from + 1, g), b.push(c), c = {});
      } else {
        if (d) {
          return f;
        }
        f = dc(a.slice(g));
        e = g + f.N.length;
        c.Ea = f;
        c.sa = e;
        c.from = g;
        b.push(c);
        c = {};
      }
    }
  }}, {}]);
  return b.length ? fc(a, b) : [ec(a)];
}, fc = (a, b) => {
  let c = 0;
  b = b.reduce((d, {from:e, sa:f, Da:g, Ea:h}) => {
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
  var c = b.quoteProps, d = b.warn, e = Kb(a);
  if (null === e) {
    return a;
  }
  var f = a.slice(e);
  const {G:g = "", content:h, tagName:k, N:{length:l}} = dc(f);
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
    const {G:h = "", content:k, tagName:l} = e, {da:m, $:p} = Yb(h);
    e = hc(k, b, c);
    e = ac(l, m, e, p, b, c);
    return [...d, e];
  }
  const f = Kb(e);
  if (f) {
    var g = e.slice(f);
    const {N:{length:h}, G:k = "", content:l, tagName:m} = dc(g), {da:p, $:n} = Yb(k);
    g = hc(l, b, c);
    g = ac(m, p, g, n, b, c);
    const q = e.slice(0, f);
    e = e.slice(f + h);
    return [...d, `${q}${g}${e}`];
  }
  return [...d, e];
}, []) : [];
const jc = a => {
  const {e:b, Aa:c, Ca:d, j:e, Ma:f, Na:g} = Qb({Aa:/^ *export\s+default\s+{[\s\S]+?}/mg, e:/^ *export\s+(?:default\s+)?/mg, Ca:/^ *export\s+{[^}]+}\s+from\s+(['"])(?:.+?)\1/mg, j:/^ *import(\s+([^\s,]+)\s*,?)?(\s*{(?:[^}]+)})?\s+from\s+['"].+['"]/gm, Ma:/^ *import\s+(?:(.+?)\s*,\s*)?\*\s+as\s+.+?\s+from\s+['"].+['"]/gm, Na:/^ *import\s+['"].+['"]/gm}, {getReplacement(h, k) {
    return `/*%%_RESTREAM_${h.toUpperCase()}_REPLACEMENT_${k}_%%*/`;
  }, getRegex(h) {
    return new RegExp(`/\\*%%_RESTREAM_${h.toUpperCase()}_REPLACEMENT_(\\d+)_%%\\*/`, "g");
  }});
  a = Nb(a, [Sb(d), Sb(c), Sb(b), Sb(e), Sb(f), Sb(g)]);
  a = ic(a, {});
  return Nb(a, [Rb(d), Rb(c), Rb(b), Rb(e), Rb(f), Rb(g)]);
};
async function S(a, b, c) {
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
;const kc = async a => {
  try {
    return await S(kb, a);
  } catch (b) {
    return null;
  }
};
const lc = path.basename, mc = path.dirname, nc = path.extname, oc = path.isAbsolute, U = path.join, pc = path.normalize, qc = path.parse, V = path.relative, rc = path.resolve, sc = path.sep;
const uc = async a => {
  var b = await kc(a);
  let c = a, d = !1;
  if (!b) {
    if (c = await tc(a), !c) {
      throw Error(`${a}.js or ${a}.jsx is not found.`);
    }
  } else {
    if (b.isDirectory()) {
      b = !1;
      let e;
      a.endsWith("/") || (e = c = await tc(a), b = !0);
      if (!e) {
        c = await tc(U(a, "index"));
        if (!c) {
          throw Error(`${b ? `${a}.jsx? does not exist, and ` : ""}index.jsx? file is not found in ${a}`);
        }
        d = !0;
      }
    }
  }
  return {path:a.startsWith(".") ? V("", c) : c, Oa:d};
}, tc = async a => {
  a = `${a}.js`;
  let b = await kc(a);
  b || (a = `${a}x`);
  if (b = await kc(a)) {
    return a;
  }
};
let vc;
const xc = async(a, b, c = {}) => {
  vc || ({root:vc} = qc(process.cwd()));
  const {fields:d, soft:e = !1} = c;
  var f = U(a, "node_modules", b);
  f = U(f, "package.json");
  const g = await kc(f);
  if (g) {
    a = await wc(f, d);
    if (void 0 === a) {
      throw Error(`The package ${V("", f)} does export the module.`);
    }
    if (!a.entryExists && !e) {
      throw Error(`The exported module ${a.main} in package ${b} does not exist.`);
    }
    const {entry:h, version:k, packageName:l, main:m, entryExists:p, ...n} = a;
    return {entry:V("", h), packageJson:V("", f), ...k ? {version:k} : {}, packageName:l, ...m ? {hasMain:!0} : {}, ...p ? {} : {entryExists:!1}, ...n};
  }
  if (a == vc && !g) {
    throw Error(`Package.json for module ${b} not found.`);
  }
  return xc(U(rc(a), ".."), b, c);
}, wc = async(a, b = []) => {
  const c = await Hb(a);
  let d, e, f, g, h;
  try {
    ({module:d, version:e, name:f, main:g, ...h} = JSON.parse(c)), h = b.reduce((l, m) => {
      l[m] = h[m];
      return l;
    }, {});
  } catch (l) {
    throw Error(`Could not parse ${a}.`);
  }
  a = mc(a);
  b = d || g;
  if (!b) {
    if (!await kc(U(a, "index.js"))) {
      return;
    }
    b = g = "index.js";
  }
  a = U(a, b);
  let k;
  try {
    ({path:k} = await uc(a)), a = k;
  } catch (l) {
  }
  return {entry:a, version:e, packageName:f, main:!d && g, entryExists:!!k, ...h};
};
const zc = async(a, b, {mount:c, override:d = {}}) => {
  var e = async(f, g, h) => {
    var k = mc(a);
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
    f = rc(k);
    k = mc(f);
    if (m) {
      return yc(k, m, g, c);
    }
    ({module:f} = require(f));
    return f ? yc(k, f, g, c) : (console.warn("[\u219b] Package %s does not specify module in package.json, trying src", k), yc(k, "src", g));
  };
  e = new Vb([{re:/^( *import(?:\s+[^\s,]+\s*,?)?(?:\s*{(?:[^}]+)})?\s+from\s+)['"](.+)['"]/gm, replacement:e}, {re:/^( *import\s+)['"](.+)['"]/gm, replacement:e}]);
  e.end(b);
  return await Gb(e);
}, yc = (a, b, c, d) => {
  a = U(a, b);
  b = V("", a);
  d && (b = V(d, b));
  return `${c}'/${b}${a.endsWith("/") ? "/" : ""}'`;
};
function Ac(a = {}) {
  const {directory:b = "frontend", pragma:c = "import { h } from 'preact'", mount:d = ".", override:e = {}} = a;
  let {log:f} = a;
  !0 === f && (f = console.log);
  const g = Array.isArray(b) ? b : [b];
  g.forEach(h => {
    const k = U(d, h);
    if (!jb(k)) {
      throw Error(`Frontend directory ${h} does not exist.`);
    }
  });
  return async(h, k) => {
    let l = h.path.replace("/", "");
    if (!(g.includes(l) || g.some(t => l.startsWith(`${t}/`)) || h.path.startsWith("/node_modules/"))) {
      return await k();
    }
    l = U(d, l);
    const {path:m, Oa:p} = await uc(l);
    if (p && !l.endsWith("/")) {
      k = d ? V(d, m) : m, h.redirect(`/${k}`);
    } else {
      try {
        var n = await S(kb, m);
      } catch (t) {
        h.status = 404;
        return;
      }
      h.status = 200;
      h.etag = `${n.mtime.getTime()}`;
      if (h.fresh) {
        return h.status = 304, await k();
      }
      k = await Hb(m);
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
;class Ic extends rb {
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
    2 === a.h && (d + g < e && a._events.trailer && a.emit("trailer", c.slice(d + g, e)), a.reset(), a.H = !0, 0 === a.X && (a.c = !0, a.emit("finish"), a.c = !1));
    if (a.h) {
      return;
    }
  }
  a.F && (a.F = !1);
  a.a || (a.a = new Ic(a.ja), a.a._read = () => {
    Rc(a);
  }, g = a.g ? "preamble" : "part", a._events[g] ? a.emit(g, a.a) : a._ignore(), a.g || (a.u = !0));
  c && d < e && !a.A && (a.g || !a.u ? (f && (h = a.a.push(f)), h = a.a.push(c.slice(d, e)), h || (a.D = !0)) : !a.g && a.u && (f && a.i.push(f), f = a.i.push(c.slice(d, e)), !a.u && void 0 !== f && f < e && Qc(a, !1, c, d + f, e)));
  b && (a.i.reset(), a.g ? a.g = !1 : (++a.X, a.a.on("end", () => {
    0 === --a.X && (a.H ? (a.c = !0, a.emit("finish"), a.c = !1) : Rc(a));
  })), a.a.push(null), a.a = void 0, a.A = !1, a.F = !0, a.h = 0);
}
function Rc(a) {
  if (a.D && (a.D = !1, a.B)) {
    const b = a.B;
    a.B = void 0;
    b();
  }
}
class Sc extends tb {
  constructor(a) {
    super(a);
    if (!a || !a.headerFirst && "string" != typeof a.boundary) {
      throw new TypeError("Boundary required");
    }
    "string" == typeof a.boundary ? this.setBoundary(a.boundary) : this.l = void 0;
    this.va = a.headerFirst;
    this.X = this.h = 0;
    this.c = this.H = !1;
    this.g = !0;
    this.F = !1;
    this.u = this.ia = !0;
    this.B = this.a = void 0;
    this.A = !1;
    this.ja = "number" == typeof a.partHwm ? {highWaterMark:a.partHwm} : {};
    this.D = !1;
    this.i = new Mc(a);
    this.i.on("header", b => {
      this.u = !1;
      this.a.emit("header", b);
    });
  }
  emit(a) {
    "finish" != a || this.c ? tb.prototype.emit.apply(this, arguments) : this.H || process.nextTick(() => {
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
    if (this.va && this.g) {
      if (this.a || (this.a = new Ic(this.ja), this._events.preamble ? this.emit("preamble", this.a) : this._ignore()), b = this.i.push(a), !this.u && void 0 !== b && b < a.length) {
        a = a.slice(b);
      } else {
        return c();
      }
    }
    this.ia && (this.l.push(Oc), this.ia = !1);
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
              d ? (h.length && (h = W(h.replace(Uc, Vc), d)), d = "") : h.length && (h = W(h, "utf8"));
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
  d && h.length ? h = W(h.replace(Uc, Vc), d) : h && (h = W(h, "utf8"));
  void 0 === b[g] ? h && (b[g] = h) : b[g][1] = h;
  return b;
}
function W(a, b) {
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
  return {J:b, Fa:d, Ga:e, K:f, Ta:g, U:c};
};
class bd extends tb {
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
      0 === w && O && !a.a && (O = !1, process.nextTick(() => {
        a.a = !0;
        a.emit("finish");
      }));
    }
    let h, k;
    [, e] = e.find(v => Array.isArray(v) && cd.test(v[0])) || [];
    if ("string" != typeof e) {
      throw Error("Multipart: Boundary not found");
    }
    const {Ta:l, Ga:m, Fa:p, K:n, J:q} = ad(b);
    let t, u = 0, r = 0, w = 0, x, O = !1;
    this.g = this.h = !1;
    this.a = void 0;
    this.l = 0;
    this.i = a;
    this.c = new Sc({boundary:e, maxHeaderPairs:b.headerPairs, highWaterMark:f, fileHwm:d});
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
      O = !0;
      g();
    });
    const B = v => {
      if (++this.l > l) {
        return this.c.removeListener("part", B), this.c.on("part", id), a.u = !0, a.emit("partsLimit"), id(v);
      }
      if (x) {
        const z = x;
        z.emit("end");
        z.removeAllListeners("end");
      }
      v.on("header", z => {
        let H = "text/plain", D = "7bit", T;
        let C = 0;
        if (z["content-type"]) {
          var A = Wc(z["content-type"][0]);
          if (A[0]) {
            for (H = A[0].toLowerCase(), h = 0, k = A.length; h < k && !ed.test(A[h][0]); ++h) {
            }
          }
        }
        if (z["content-disposition"]) {
          A = Wc(z["content-disposition"][0]);
          if (!dd.test(A[0])) {
            return id(v);
          }
          h = 0;
          for (k = A.length; h < k; ++h) {
            if (gd.test(A[h][0])) {
              T = A[h][1];
            } else {
              if (fd.test(A[h][0])) {
                var E = A[h][1];
                c || (E = $c(E));
              }
            }
          }
        } else {
          return id(v);
        }
        z["content-transfer-encoding"] && (D = z["content-transfer-encoding"][0].toLowerCase());
        if ("application/octet-stream" == H || void 0 !== E) {
          if (u == m) {
            return a.l || (a.l = !0, a.emit("filesLimit")), id(v);
          }
          ++u;
          if (!a._events.file) {
            this.c._ignore();
            return;
          }
          ++w;
          const y = new jd({highWaterMark:d});
          t = y;
          y.on("end", () => {
            --w;
            this.g = !1;
            g();
            if (this.a && !this.h) {
              const F = this.a;
              this.a = void 0;
              F();
            }
          });
          y._read = () => {
            if (this.g && (this.g = !1, this.a && !this.h)) {
              const F = this.a;
              this.a = void 0;
              F();
            }
          };
          a.emit("file", T, y, E, D, H, v);
          z = F => {
            if ((C += F.length) > p) {
              const N = p - (C - F.length);
              0 < N && y.push(F.slice(0, N));
              y.emit("limit");
              y.truncated = !0;
              v.removeAllListeners("data");
            } else {
              y.push(F) || (this.g = !0);
            }
          };
          E = () => {
            t = void 0;
            y.push(null);
          };
        } else {
          if (r == n) {
            return a.g || (a.g = !0, a.emit("fieldsLimit")), id(v);
          }
          ++r;
          ++w;
          const y = [];
          let F = !1;
          x = v;
          z = N => {
            let ca = N;
            C += N.length;
            C > q && (ca = Buffer.from(N, 0, q).slice(0, q), F = !0, v.removeAllListeners("data"));
            y.push(ca);
          };
          E = () => {
            x = void 0;
            var N = Buffer.concat(y);
            try {
              N = (new Tc(void 0)).decode(N);
            } catch (ca) {
            }
            a.emit("field", T, N, !1, F, D, H);
            --w;
            g();
          };
        }
        v._readableState.sync = !1;
        v.on("data", z);
        v.on("end", E);
      }).on("error", z => {
        t && t.emit("error", z);
      });
    };
    this.c.on("part", B);
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
class jd extends rb {
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
    const {J:e, U:f, K:g} = ad(b);
    this.J = e;
    this.U = f;
    this.K = g;
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
            if (++this.B, c = this.u, f = d > f ? this.a += this.i.write(a.toString("binary", f, d)) : this.a, this.l = !1, this.c = !0, this.a = "", this.A = 0, this.u = !1, this.i.reset(), f.length && this.h.emit("field", W(f, this.charset), "", c, !1), f = d + 1, this.B === this.K) {
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
          if (++this.B, d > f && (this.g += this.i.write(a.toString("binary", f, d))), this.h.emit("field", W(this.a, this.charset), W(this.g, this.charset), this.u, this.H), this.D = "key", this.l = !1, this.c = !0, this.a = "", this.A = 0, this.u = !1, this.i.reset(), f = d + 1, this.B === this.K) {
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
    this.h.a || ("key" == this.D && 0 < this.a.length ? this.h.emit("field", W(this.a, this.charset), "", this.u, !1) : "val" == this.D && this.h.emit("field", W(this.a, this.charset), W(this.g, this.charset), this.u, this.H), this.h.a = !0, this.h.emit("finish"));
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
function X(a, b) {
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
    const {limits:e = {}, storage:f, fileFilter:g, oa:h, preservePath:k} = a, l = {};
    d.body = l;
    const m = new md({limits:e, preservePath:k, headers:d.headers}), p = new yd(h, d), n = new Dd, q = [];
    let t = !1;
    m.on("field", (u, r, w, x) => {
      if (x) {
        return m.emit("error", X("LIMIT_FIELD_VALUE", u));
      }
      if (e.fieldNameSize && u.length > e.fieldNameSize) {
        return m.emit("error", X("LIMIT_FIELD_KEY"));
      }
      ud(l, u, r);
    });
    m.on("file", async(u, r, w, x, O) => {
      if (!w) {
        return r.resume();
      }
      if (e.fieldNameSize && u.length > e.fieldNameSize) {
        return m.emit("error", X("LIMIT_FIELD_KEY"));
      }
      x = {fieldname:u, originalname:w, encoding:x, mimetype:O, stream:r};
      const B = vd(p, x);
      let v = !1;
      w = () => {
        if (v) {
          return wd(p, B), v;
        }
      };
      r.on("error", D => {
        Bd(n);
        m.emit("error", D);
      }).on("limit", () => {
        v = !0;
        m.emit("error", X("LIMIT_FILE_SIZE", u));
      });
      let z;
      try {
        z = await g(d, x);
      } catch (D) {
        wd(p, B);
        m.emit("error", D);
        return;
      }
      if (z) {
        n.value++;
        try {
          if (!w()) {
            var H = await f._handleFile(d, x);
            r = {...x, ...H};
            if (w()) {
              return q.push(r);
            }
            xd(p, B, r);
            q.push(r);
          }
        } catch (D) {
          wd(p, B), t ? n.emit("error", D) : m.emit("error", D);
        } finally {
          Bd(n);
        }
      } else {
        wd(p, B), r.resume();
      }
    });
    d.pipe(m);
    b = u => f._removeFile(d, u);
    try {
      await new Promise((u, r) => {
        m.on("error", r).on("partsLimit", () => {
          r(X("LIMIT_PART_COUNT"));
        }).on("filesLimit", () => {
          r(X("LIMIT_FILE_COUNT"));
        }).on("fieldsLimit", () => {
          r(X("LIMIT_FIELD_COUNT"));
        }).on("finish", u);
      });
    } catch (u) {
      await Cd(n);
      const r = await Gd(q, b);
      u.storageErrors = r;
      throw u;
    } finally {
      t = !0, d.unpipe(m), m.removeAllListeners();
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
    const d = U(a, c);
    return {lstat:await S(kb, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const Id = a => a.lstat.isDirectory(), Jd = a => !a.lstat.isDirectory();
async function Kd(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  const {ignore:b = []} = {};
  if (!(await S(kb, a)).isDirectory()) {
    var c = Error("Path is not a directory");
    c.code = "ENOTDIR";
    throw c;
  }
  c = await S(mb, a);
  var d = await Hd(a, c);
  c = d.filter(Id);
  d = d.filter(Jd).reduce((e, f) => {
    var g = f.lstat.isDirectory() ? "Directory" : f.lstat.isFile() ? "File" : f.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return {...e, [f.relativePath]:{type:g}};
  }, {});
  c = await c.reduce(async(e, {path:f, relativePath:g}) => {
    const h = V(a, f);
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
  await S(pb, a);
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
  c = c.map(e => U(a, e));
  await Promise.all(c.map(Ld));
  d = d.map(e => U(a, e));
  await Promise.all(d.map(Md));
  await S(nb, a);
}, Nd = async a => {
  (await S(kb, a)).isDirectory() ? await Md(a) : await Ld(a);
};
function Od(a) {
  a = mc(a);
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
    lb(a);
  } catch (b) {
    if ("ENOENT" == b.code) {
      const c = mc(a);
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
    const {filename:b = Qd, destination:c = yb} = a;
    this.c = b;
    "string" == typeof c ? (Od(U(c, "file.dat")), this.a = () => c) : this.a = c;
  }
  async _handleFile(a, b) {
    const c = await this.a(a, b);
    a = await this.c(a, b);
    const d = U(c, a), e = hb(d);
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
    await Nd(a);
  }
}
;class Sd {
  async _handleFile(a, b) {
    a = await Gb(b.stream, {binary:!0});
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
      throw X("LIMIT_UNEXPECTED_FILE", g.fieldname);
    }
    --e[g.fieldname];
    return d(f, g);
  }, oa:c};
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
    return Fd({limits:this.limits, preservePath:this.preservePath, storage:this.storage, fileFilter:this.fileFilter, oa:"ARRAY"});
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
    throw I(400, "Malicious Path");
  }
  if (oc(c)) {
    throw I(400, "Malicious Path");
  }
  if (Wd.test(pc("." + sc + c))) {
    throw I(403);
  }
  return pc(U(rc(d), c));
}
;const Yd = async(...a) => await S(ib, ...a), Zd = async(...a) => await S(ob, ...a), $d = M("koa-send");
async function ae(a, b, c = {}) {
  J(a, "koa context required");
  J(b, "pathname required");
  $d('send "%s" %j', b, c);
  var d = c.root ? pc(rc(c.root)) : "", e = "/" == b[b.length - 1];
  b = b.substr(qc(b).root.length);
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
  } catch (t) {
    b = -1;
  }
  if (-1 == b) {
    return a.throw(400, "failed to decode");
  }
  f && e && (b += f);
  b = Xd(d, b);
  if (!(e = k)) {
    a: {
      d = b.substr(d.length).split(sc);
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
    } catch (t) {
      if (["ENOENT", "ENAMETOOLONG", "ENOTDIR"].includes(t.code)) {
        throw I(404, t);
      }
      t.status = 500;
      throw t;
    }
    c && c(a.res, b, q);
    a.set("Content-Length", q.size);
    a.response.get("Last-Modified") || a.set("Last-Modified", q.mtime.toUTCString());
    a.response.get("Cache-Control") || (f = ["max-age=" + (g / 1000 | 0)], h && f.push("immutable"), a.set("Cache-Control", f.join(",")));
    a.type || (h = b, h = "" !== d ? nc(lc(h, d)) : nc(h), a.type = h);
    a.neoluddite && a.neoluddite("koa-send", "stream");
    a.body = gb(b);
    return b;
  }
}
;const be = M("koa-static");
var ce = (a, b = {}) => {
  J(a, "root directory is required to serve files");
  be('static "%s" %j', a, b);
  b.root = rc(a);
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
const ke = /(?:\.0*|(\.[^0]+)0+)$/, Y = {cb:1, Qa:1024, Sa:1048576, Ia:1073741824, Ya:Math.pow(1024, 4), Ua:Math.pow(1024, 5)};
var le = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
function me(a) {
  if ("string" == typeof a) {
    if ("number" !== typeof a || isNaN(a)) {
      if ("string" !== typeof a) {
        a = null;
      } else {
        var b = le.exec(a);
        b ? (a = parseFloat(b[1]), b = b[4].toLowerCase()) : (a = parseInt(a, 10), b = "b");
        a = Math.floor(Y[b] * a);
      }
    }
  } else {
    if ("number" == typeof a) {
      if (Number.isFinite(a)) {
        var c = Math.abs(a);
        b = "", b = c >= Y.Ua ? "PB" : c >= Y.Ya ? "TB" : c >= Y.Ia ? "GB" : c >= Y.Sa ? "MB" : c >= Y.Qa ? "KB" : "B";
        a = (a / Y[b.toLowerCase()]).toFixed(2);
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
    if (e && !d.res.headersSent && d.writable && !1 !== d.compress && "HEAD" != d.request.method && !ha[d.response.status] && !d.response.get("Content-Encoding") && (!0 === d.compress || b(d.response.type))) {
      var f = d.acceptsEncodings("gzip", "deflate", "identity");
      f || d.throw(406, "supported encodings: gzip, deflate, identity");
      if ("identity" != f) {
        he(e) && (e = d.body = JSON.stringify(e));
        if (c) {
          if (d.body instanceof rb) {
            const g = d.body;
            let h = 0, k = !1, l;
            const {pa:m, callback:p} = await new Promise((n, q) => {
              const t = new sb({transform(u, r, w) {
                this.push(u);
                k ? w() : (h += u.length, h > c ? (k = !0, n({pa:this, callback:w})) : w());
              }});
              t.once("finish", () => n({pa:t}));
              g.once("error", u => {
                l = u;
                n({});
              });
              t.once("error", q);
              g.pipe(t);
              t.pause();
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
        e instanceof qb ? (d.neoluddite && d.neoluddite("@goa/compress", "stream"), e.pipe(f)) : (d.neoluddite && d.neoluddite("@goa/compress", "data"), f.end(e));
      }
    }
  };
}
;const pe = https.request;
const qe = http.METHODS, re = http.OutgoingMessage, se = http.createServer, te = http.request;
const ue = url.URL, ve = url.Url, we = url.format, xe = url.parse;
const ye = (a, b, c = {}) => {
  const {justHeaders:d, binary:e, R:f = R(!0)} = c;
  let g, h, k, l, m = 0, p = 0;
  c = (new Promise((n, q) => {
    g = a(b, async t => {
      ({headers:h} = t);
      k = {statusMessage:t.statusMessage, statusCode:t.statusCode};
      if (d) {
        t.destroy();
      } else {
        var u = "gzip" == t.headers["content-encoding"];
        t.on("data", r => m += r.byteLength);
        t = u ? t.pipe(je()) : t;
        l = await Gb(t, {binary:e});
        p = l.length;
      }
      n();
    }).on("error", t => {
      t = f(t);
      q(t);
    }).on("timeout", () => {
      g.abort();
    });
  })).then(() => ({body:l, headers:h, ...k, Wa:m, byteLength:p, qa:null}));
  return {req:g, fa:c};
};
const ze = (a = {}) => Object.keys(a).reduce((b, c) => {
  const d = a[c];
  c = `${encodeURIComponent(c)}=${encodeURIComponent(d)}`;
  return [...b, c];
}, []).join("&").replace(/%20/g, "+"), Ae = async(a, b, {data:c, justHeaders:d, binary:e, R:f = R(!0)}) => {
  const {req:g, fa:h} = ye(a, b, {justHeaders:d, binary:e, R:f});
  g.end(c);
  a = await h;
  if ((a.headers["content-type"] || "").startsWith("application/json") && a.body) {
    try {
      a.qa = JSON.parse(a.body);
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
const Ce = ma("aqt"), De = async(a, b = {}) => {
  const {data:c, type:d = "json", headers:e = {"User-Agent":`Mozilla/5.0 (Node.JS) ${Be}`}, compress:f = !0, binary:g = !1, justHeaders:h = !1, method:k, timeout:l} = b;
  b = R(!0);
  const {hostname:m, protocol:p, port:n, path:q} = xe(a), t = "https:" === p ? pe : te, u = {hostname:m, port:n, path:q, headers:{...e}, timeout:l, method:k};
  if (c) {
    var r = d;
    var w = c;
    switch(r) {
      case "json":
        w = JSON.stringify(w);
        r = "application/json";
        break;
      case "form":
        w = ze(w), r = "application/x-www-form-urlencoded";
    }
    w = {data:w, contentType:r};
    ({data:r} = w);
    w = w.contentType;
    u.method = k || "POST";
    "Content-Type" in u.headers || (u.headers["Content-Type"] = w);
    "Content-Length" in u.headers || (u.headers["Content-Length"] = Buffer.byteLength(r));
  }
  !f || "Accept-Encoding" in u.headers || (u.headers["Accept-Encoding"] = "gzip, deflate");
  const {body:x, headers:O, byteLength:B, statusCode:v, statusMessage:z, Wa:H, qa:D} = await Ae(t, u, {data:r, justHeaders:h, binary:g, R:b});
  Ce("%s %s B%s", a, B, `${B != H ? ` (raw ${H} B)` : ""}`);
  return {body:D ? D : x, headers:O, statusCode:v, statusMessage:z};
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
  const {client_id:c = "", client_secret:d = "", path:e = "/auth/github", redirectPath:f = `${e}/redirect`, scope:g = "", error:h = (n, q, t) => {
    throw Error(t);
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
    const t = Ke(n, f);
    q = Le({ga:t, client_id:c, scope:g, state:q});
    n.redirect(q);
  }, p = async(n, q) => {
    var t = Ke(n, f);
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
      var r = n.query.code;
      if (!r) {
        throw Error("Code Not Found.");
      }
      var {access_token:w, scope:x} = await Me({client_id:c, client_secret:d, ga:t, code:r, state:u});
      t = [Ne(w), .../user:email/.test(x) ? [Oe(w)] : []];
      var [O, B] = await Promise.all(t);
      B && (O.emails = B);
      await k(n, w, x, O, q);
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
const Ne = async a => await Pe({ta:a, path:"user"}), Oe = async a => await Pe({ta:a, path:"user/emails"}), Pe = async a => {
  var b = a.ta;
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
const Se = M("idio"), Re = a => aa([a, async function(b, c) {
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
}, ["jsonErrors"](a, b, c) {
  const {logClientErrors:d = !0, exposeStack:e = !1, clearIdio:f = !0} = c;
  return async function(g, h) {
    try {
      await h();
    } catch (k) {
      k.statusCode && 400 <= k.statusCode && 500 > k.statusCode && (k.message = k.message.replace(/^([^!])/, "!$1")), k.stack = Cb(k.stack, f ? {ignoredModules:["@idio/idio"]} : void 0), k.message.startsWith("!") ? (g.body = {error:k.message.replace("!", ""), stack:e ? k.stack : void 0}, d && console.log(k.message)) : (g.body = {error:"internal server error", stack:e ? k.stack : void 0}, a.emit("error", k));
    }
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
    Je(a, {path:l, scope:m, redirectPath:g, ...k, session:d.session});
  });
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
const Ve = (a, b, c, d) => async(e, f) => {
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
      await Ee(`${c}/use?key=${d}`, {data:e});
    } catch (g) {
      a.emit("error", g);
    }
  }
};
async function We(a, b) {
  const {neoluddite:c, ...d} = a;
  if (c) {
    const {app:e, env:f, key:g, host:h = "https://neoluddite.dev"} = c;
    if (!g) {
      throw Error("key is expected for neoluddite integration.");
    }
    b.use(Ve(e, f, h, g));
  }
  return await Object.keys(d).reduce(async(e, f) => {
    e = await e;
    var g = a[f];
    Array.isArray(g) ? (g = g.map(async h => await Ue(f, h, b, e)), g = await Promise.all(g)) : g = await Ue(f, g, b, e);
    return {...e, [f]:g};
  }, {});
}
;/*
 MIT 2014 Jordan Harband
 https://github.com/ljharb/is-generator-function
*/
const Xe = Object.prototype.toString, Ye = Function.prototype.toString, Ze = /^\s*(?:function)?\*/, $e = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, af = Object.getPrototypeOf;
var bf;
a: {
  if ($e) {
    try {
      bf = Function("return function*() {}")();
      break a;
    } catch (a) {
    }
    bf = void 0;
  } else {
    bf = !1;
  }
}
const cf = bf, df = cf ? af(cf) : {};
/*
 ee-first
 Copyright(c) 2014 Jonathan Ong
 MIT Licensed
*/
function ef(a, b) {
  function c() {
    d();
    b.apply(null, arguments);
  }
  function d() {
    for (var n, q = 0; q < f.length; q++) {
      n = f[q], n.Ba.removeListener(n.event, n.Ha);
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
      var m = h[l], p = ff(m, c);
      k.on(m, p);
      f.push({Ba:k, event:m, Ha:p});
    }
  }
  e.cancel = d;
  return e;
}
function ff(a, b) {
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
function gf(a, b) {
  var c = a.socket;
  c = "boolean" == typeof a.finished ? !!(a.finished || c && !c.writable) : "boolean" == typeof a.complete ? !(!a.upgrade && c && c.readable && (!a.complete || a.readable)) : void 0;
  !1 !== c ? setImmediate(b, null, a) : (c = a.__onFinished, c && c.S || (c = a.__onFinished = hf(a), jf(a, c)), c.S.push(b));
}
function jf(a, b) {
  function c(h) {
    g.cancel();
    e.cancel();
    f = !0;
    b(h);
  }
  function d(h) {
    a.removeListener("socket", d);
    f || g === e && (e = ef([[h, "error", "close"]], c));
  }
  var e, f = !1;
  var g = e = ef([[a, "end", "finish"]], c);
  if (a.socket) {
    d(a.socket);
  } else {
    a.on("socket", d);
  }
}
function hf(a) {
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
function kf(a) {
  if (a instanceof fb) {
    a.destroy();
    if ("function" == typeof a.close) {
      a.on("open", lf);
    }
    return a;
  }
  if (!(a instanceof qb)) {
    return a;
  }
  "function" == typeof a.destroy && a.destroy();
  return a;
}
function lf() {
  "number" == typeof this.fd && this.close();
}
;/*
 MIT
 Copyright (c) 2014 Jonathan Ong <me@jongleberry.com>
 Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com>
 https://npmjs.com/package/mime-types
*/
const mf = require("mime-db"), nf = /^\s*([^;\s]*)(?:;|\s|$)/, of = /^text\//i, pf = Object.create(null), qf = Object.create(null);
rf();
function sf(a) {
  return a && "string" == typeof a ? (a = nc("x." + a).toLowerCase().substr(1)) ? qf[a] || !1 : !1 : !1;
}
function rf() {
  const a = ["nginx", "apache", void 0, "iana"];
  Object.keys(mf).forEach(b => {
    const c = mf[b], d = c.extensions;
    if (d && d.length) {
      pf[b] = d;
      for (let e = 0; e < d.length; e++) {
        const f = d[e];
        if (qf[f]) {
          const g = a.indexOf(mf[qf[f]].source), h = a.indexOf(c.source);
          if ("application/octet-stream" != qf[f] && (g > h || g == h && "application/" == qf[f].substr(0, 12))) {
            continue;
          }
        }
        qf[f] = b;
      }
    }
  });
}
;/*
 MIT content-type
 2015 Douglas Christopher Wilson
*/
const tf = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g, uf = /\\([\u000b\u0020-\u00ff])/g, vf = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
function wf(a) {
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
  if (!vf.test(c)) {
    throw new TypeError("invalid media type");
  }
  c = new xf(c.toLowerCase());
  if (-1 != b) {
    let e;
    var d;
    for (tf.lastIndex = b; d = tf.exec(a);) {
      if (d.index !== b) {
        throw new TypeError("invalid parameter format");
      }
      b += d[0].length;
      e = d[1].toLowerCase();
      d = d[2];
      '"' == d[0] && (d = d.substr(1, d.length - 2).replace(uf, "$1"));
      c.parameters[e] = d;
    }
    if (b != a.length) {
      throw new TypeError("invalid parameter format");
    }
  }
  return c;
}
class xf {
  constructor(a) {
    this.parameters = {};
    this.type = a;
  }
}
;/*
 MIT media-typer
 2014-2017 Douglas Christopher Wilson
*/
const yf = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;
/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2015 Douglas Christopher Wilson
 https://npmjs.org/type-is
*/
function zf(a, b) {
  var c = [];
  if ("string" != typeof a) {
    var d = null;
  } else {
    try {
      var {type:e} = wf(a);
      if (!e) {
        throw new TypeError("argument string is required");
      }
      if ("string" != typeof e) {
        throw new TypeError("argument string is required to be a string");
      }
      d = yf.test(e.toLowerCase()) ? e : null;
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
    var f = Af(d = b[c]);
    !1 === f ? e = !1 : (e = a.split("/"), f = f.split("/"), e = 2 != e.length || 2 != f.length || "*" != f[0] && f[0] != e[0] ? !1 : "*+" == f[1].substr(0, 2) ? f[1].length <= e[1].length + 1 && f[1].substr(1) == e[1].substr(1 - f[1].length) : "*" != f[1] && f[1] != e[1] ? !1 : !0);
    if (e) {
      return "+" == d[0] || -1 !== d.indexOf("*") ? a : d;
    }
  }
  return !1;
}
function Bf(a, b, ...c) {
  var d = a.headers;
  d = void 0 !== d["transfer-encoding"] || !isNaN(d["content-length"]);
  if (!d) {
    return null;
  }
  2 < arguments.length && (b = [b, ...c]);
  return zf(a.headers["content-type"], b);
}
function Af(a) {
  if ("string" != typeof a) {
    return !1;
  }
  switch(a) {
    case "urlencoded":
      return "application/x-www-form-urlencoded";
    case "multipart":
      return "multipart/*";
  }
  return "+" == a[0] ? "*/*" + a : -1 == a.indexOf("/") ? sf(a) : a;
}
;/*
 content-disposition
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
var Cf = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g, Df = /%[0-9A-Fa-f]{2}/, Ef = /[^\x20-\x7e\xa0-\xff]/g, Ff = /([\\"])/g, Gf = /^[\x20-\x7e\x80-\xff]+$/, Hf = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/;
function If(a, b = {}) {
  const {type:c = "attachment", fallback:d = !0} = b;
  a = Jf(a, d);
  return Kf(new Lf(c, a));
}
function Jf(a, b = !0) {
  if (void 0 !== a) {
    var c = {};
    if ("string" != typeof a) {
      throw new TypeError("filename must be a string");
    }
    if ("string" != typeof b && "boolean" != typeof b) {
      throw new TypeError("fallback must be a string or boolean");
    }
    if ("string" == typeof b && Ef.test(b)) {
      throw new TypeError("fallback must be ISO-8859-1 string");
    }
    a = lc(a);
    var d = Gf.test(a);
    b = "string" != typeof b ? b && String(a).replace(Ef, "?") : lc(b);
    var e = "string" == typeof b && b != a;
    if (e || !d || Df.test(a)) {
      c["filename*"] = a;
    }
    if (d || e) {
      c.filename = e ? b : a;
    }
    return c;
  }
}
function Kf({parameters:a, type:b}) {
  if ("string" != typeof b || !Hf.test(b)) {
    throw new TypeError("invalid type");
  }
  b = `${b}`.toLowerCase();
  if (a && "object" == typeof a) {
    let c;
    const d = Object.keys(a).sort();
    for (let e = 0; e < d.length; e++) {
      c = d[e];
      const f = "*" == c.substr(-1) ? "UTF-8''" + encodeURIComponent(String(a[c])).replace(Cf, Mf) : '"' + String(a[c]).replace(Ff, "\\$1") + '"';
      b += "; " + c + "=" + f;
    }
  }
  return b;
}
function Mf(a) {
  return "%" + String(a).charCodeAt(0).toString(16).toUpperCase();
}
class Lf {
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
function Nf(a, b) {
  if (a instanceof qb && !a.listeners("error").includes(b)) {
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
function Of(a, b, c) {
  a.cache.set(b, c);
  a.size++;
  a.size >= a.max && (a.size = 0, a.a = a.cache, a.cache = new Map);
}
class Pf {
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
      return d.w && c() > d.w ? (d.w = 0, d.value = void 0) : (Of(this, a, d), void 0 !== b && (a = b ? c() + b : 0, d.w = a)), d.value;
    }
  }
  set(a, b, c = {}) {
    c = (c = c.maxAge) ? Date.now() + c : 0;
    let d = this.cache.get(a);
    d ? (d.w = c, d.value = b) : (d = {value:b, w:c}, Of(this, a, d));
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
const Qf = new Pf(100);
/*
 escape-html
 Copyright(c) 2012-2013 TJ Holowaychuk
 Copyright(c) 2015 Andreas Lubbe
 Copyright(c) 2015 Tiancheng "Timothy" Gu
 MIT Licensed
*/
var Rf = /["'&<>]/;
const Sf = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, Tf = /^(?:lax|strict)$/i;
function Uf(a) {
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
class Vf {
  constructor(a, b, c) {
    this.path = "/";
    this.maxAge = this.domain = this.expires = void 0;
    this.httpOnly = !0;
    this.overwrite = this.secure = this.sameSite = !1;
    if (!Sf.test(a)) {
      throw new TypeError("argument name is invalid");
    }
    if (b && !Sf.test(b)) {
      throw new TypeError("argument value is invalid");
    }
    b || (this.expires = new Date(0));
    this.name = a;
    this.value = b || "";
    for (let d in c) {
      this[d] = c[d];
    }
    if (this.path && !Sf.test(this.path)) {
      throw new TypeError("option path is invalid");
    }
    if (this.domain && !Sf.test(this.domain)) {
      throw new TypeError("option domain is invalid");
    }
    if (this.sameSite && !0 !== this.sameSite && !Tf.test(this.sameSite)) {
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
const Wf = {};
class Xf {
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
      if (d = d.match(Wf[a] ? Wf[a] : Wf[a] = new RegExp("(?:^|;) *" + a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "=([^;]*)"))) {
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
    a = new Vf(a, b, k);
    if (!g && c.secure) {
      throw Error("Cannot send secure cookie over unencrypted connection");
    }
    a.secure = g;
    "secure" in c || (a.secure = g);
    Yf(f, a);
    if (c && h) {
      if (!this.keys) {
        throw Error(".keys required for signed cookies");
      }
      a.value = this.keys.sign(a.toString());
      a.name += ".sig";
      Yf(f, a);
    }
    (d.set ? re.prototype.setHeader : d.setHeader).call(d, "Set-Cookie", f);
    return this;
  }
}
function Yf(a, b) {
  if (b.overwrite) {
    for (var c = a.length - 1; 0 <= c; c--) {
      0 === a[c].indexOf(b.name + "=") && a.splice(c, 1);
    }
  }
  a.push(Uf(b));
}
;const Zf = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function $f(a) {
  return a.split(",").map((b, c) => {
    var d = Zf.exec(b.trim());
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
function ag(a, b) {
  const c = $f(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(bg).sort(cg).map(dg);
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
  return d.filter(bg).sort(cg).map(e => b[d.indexOf(e)]);
}
function cg(a, b) {
  return b.q - a.q || b.s - a.s || a.m - b.m || a.j - b.j || 0;
}
function dg(a) {
  return a.charset;
}
function bg(a) {
  return 0 < a.q;
}
;const eg = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function fg(a) {
  a = a.split(",");
  for (var b = !1, c = 1, d = 0, e = 0; d < a.length; d++) {
    var f = d;
    var g = eg.exec(a[d].trim());
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
    f && (a[e++] = f, b = b || gg("identity", f, void 0), c = Math.min(c, f.q || 1));
  }
  b || (a[e++] = {encoding:"identity", q:c, j:d});
  a.length = e;
  return a;
}
function gg(a, b, c) {
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
function hg(a, b) {
  var c = fg(a || "");
  if (!b) {
    return c.filter(ig).sort(jg).map(kg);
  }
  var d = b.map(function(e, f) {
    for (var g = {m:-1, q:0, s:0}, h = 0; h < c.length; h++) {
      var k = gg(e, c[h], f);
      k && 0 > (g.s - k.s || g.q - k.q || g.m - k.m) && (g = k);
    }
    return g;
  });
  return d.filter(ig).sort(jg).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function jg(a, b) {
  return b.q - a.q || b.s - a.s || a.m - b.m || a.j - b.j || 0;
}
function kg(a) {
  return a.encoding;
}
function ig(a) {
  return 0 < a.q;
}
;const lg = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
function mg(a) {
  a = a.split(",");
  for (var b = 0, c = 0; b < a.length; b++) {
    var d = ng(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function ng(a, b) {
  var c = lg.exec(a);
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
function og(a, b) {
  var c = mg(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(pg).sort(qg).map(rg);
  }
  var d = b.map(function(e, f) {
    for (var g = {m:-1, q:0, s:0}, h = 0; h < c.length; h++) {
      a: {
        var k = c[h];
        var l = f, m = ng(e, void 0);
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
  return d.filter(pg).sort(qg).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function qg(a, b) {
  return b.q - a.q || b.s - a.s || a.m - b.m || a.j - b.j || 0;
}
function rg(a) {
  return a.M;
}
function pg(a) {
  return 0 < a.q;
}
;const sg = /^\s*([^s/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
function tg(a) {
  a = a.split(",");
  for (var b = 1, c = 0; b < a.length; b++) {
    0 == ug(a[c]) % 2 ? a[++c] = a[b] : a[c] += "," + a[b];
  }
  a.length = c + 1;
  for (c = b = 0; b < a.length; b++) {
    var d = vg(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function vg(a, b) {
  var c = sg.exec(a);
  if (!c) {
    return null;
  }
  a = Object.create(null);
  var d = 1, e = c[2], f = c[1];
  if (c[3]) {
    c = c[3].split(";");
    for (var g = 1, h = 0; g < c.length; g++) {
      0 == ug(c[h]) % 2 ? c[++h] = c[g] : c[h] += ";" + c[g];
    }
    c.length = h + 1;
    for (g = 0; g < c.length; g++) {
      c[g] = c[g].trim();
    }
    c = c.map(wg);
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
function xg(a, b, c) {
  var d = vg(a, void 0);
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
function yg(a, b) {
  var c = tg(void 0 === a ? "*/*" : a || "");
  if (!b) {
    return c.filter(zg).sort(Ag).map(Bg);
  }
  var d = b.map(function(e, f) {
    for (var g = {m:-1, q:0, s:0}, h = 0; h < c.length; h++) {
      var k = xg(e, c[h], f);
      k && 0 > (g.s - k.s || g.q - k.q || g.m - k.m) && (g = k);
    }
    return g;
  });
  return d.filter(zg).sort(Ag).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function Ag(a, b) {
  return b.q - a.q || b.s - a.s || a.m - b.m || a.j - b.j || 0;
}
function Bg(a) {
  return a.type + "/" + a.W;
}
function zg(a) {
  return 0 < a.q;
}
function ug(a) {
  for (var b = 0, c = 0; -1 !== (c = a.indexOf('"', c));) {
    b++, c++;
  }
  return b;
}
function wg(a) {
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
class Cg {
  constructor(a) {
    this.request = a;
    this.headers = this.request.headers;
  }
  charset(a) {
    return (a = this.charsets(a)) && a[0];
  }
  charsets(a) {
    return ag(this.headers["accept-charset"], a);
  }
  encoding(a) {
    return (a = this.encodings(a)) && a[0];
  }
  encodings(a) {
    return hg(this.headers["accept-encoding"], a);
  }
  language(a) {
    return (a = this.languages(a)) && a[0];
  }
  languages(a) {
    return og(this.headers["accept-language"], a);
  }
  mediaType(a) {
    return (a = this.mediaTypes(a)) && a[0];
  }
  mediaTypes(a) {
    return yg(this.headers.accept, a);
  }
}
;/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2015 Douglas Christopher Wilson
 https://npmjs.org/accepts
*/
class Dg {
  constructor(a) {
    this.headers = a.headers;
    this.a = new Cg(a);
  }
  types(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    if (!a || 0 == a.length) {
      return this.a.mediaTypes();
    }
    if (!this.headers.accept) {
      return a[0];
    }
    b = a.map(Eg);
    var c = this.a.mediaTypes(b.filter(Fg));
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
function Eg(a) {
  return -1 == a.indexOf("/") ? sf(a) : a;
}
function Fg(a) {
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
function Gg(a, b) {
  var c = a.a, d = a.target;
  a.g.push(b);
  c.__defineSetter__(b, function(e) {
    return this[d][b] = e;
  });
  return a;
}
class Hg {
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
    return Gg(Z(this, a), a);
  }
}
;/*
 MIT jshttp/http-assert
*/
function Ig(a, b, c, d) {
  if (!a) {
    throw I(b, c, d);
  }
}
;const Jg = net.isIP;
/*
 parseurl
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
function Kg(a) {
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
var Lg = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;
function Mg(a, b) {
  var c = a["if-modified-since"], d = a["if-none-match"];
  if (!c && !d || (a = a["cache-control"]) && Lg.test(a)) {
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
  return !c || (b = b["last-modified"], b && Ng(b) <= Ng(c)) ? !0 : !1;
}
function Ng(a) {
  a = a && Date.parse(a);
  return "number" === typeof a ? a : NaN;
}
;const Og = Symbol("context#ip");
class Pg {
  constructor() {
    this.res = this.req = this.response = this.ctx = this.app = null;
    this.originalUrl = "";
    this.ka = {};
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
    return Kg(this.req).pathname;
  }
  set path(a) {
    const b = Kg(this.req);
    b.pathname !== a && (b.pathname = a, b.path = null, this.url = we(b));
  }
  get query() {
    const a = this.querystring, b = this.ka = this.ka || {};
    return b[a] || (b[a] = Ge(a));
  }
  set query(a) {
    this.querystring = He(a);
  }
  get querystring() {
    return this.req ? Kg(this.req).query || "" : "";
  }
  set querystring(a) {
    const b = Kg(this.req);
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
    return "GET" != a && "HEAD" != a ? !1 : 200 <= b && 300 > b || 304 == b ? Mg(this.header, this.response.header) : !1;
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
      const {parameters:a} = wf(this.req);
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
    this[Og] || (this[Og] = this.ips[0] || this.socket.remoteAddress || "");
    return this[Og];
  }
  set ip(a) {
    this[Og] = a;
  }
  get subdomains() {
    const a = this.app.subdomainOffset, b = this.hostname;
    return Jg(b) ? [] : b.split(".").reverse().slice(a);
  }
  get accept() {
    return this.Y || (this.Y = new Dg(this.req));
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
      return Bf(this.req);
    }
    Array.isArray(a) || (a = [a, ...b]);
    return Bf(this.req, a);
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
;const Qg = Symbol("context#cookies");
class Rg {
  constructor() {
    this.state = this.originalUrl = this.res = this.req = this.response = this.request = this.app = null;
    this[Qg] = null;
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
    return Ig;
  }
  throw(...a) {
    throw I(...a);
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
    this[Qg] || (this[Qg] = new Xf(this.req, this.res, {keys:this.app.keys, secure:this.request.secure}));
    return this[Qg];
  }
  set cookies(a) {
    this[Qg] = a;
  }
  [oa.custom]() {
    return this.inspect();
  }
}
Z(Z((new Hg(Rg.prototype, "response")).method("attachment").method("redirect").method("remove").method("vary").method("set").method("append").method("flushHeaders").access("status").access("message").access("body").access("length").access("type").access("lastModified").access("etag"), "headerSent"), "writable");
Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z((new Hg(Rg.prototype, "request")).method("acceptsLanguages").method("acceptsEncodings").method("acceptsCharsets").method("accepts").method("get").method("is").access("querystring").access("idempotent").access("socket").access("search").access("method").access("query").access("path").access("url").access("accept"), "origin"), "href"), "subdomains"), "protocol"), "host"), "hostname"), "URL"), "header"), "headers"), "secure"), "stale"), "fresh"), "ips"), "ip");
class Sg {
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
    this.headerSent || (J(Number.isInteger(a), "status code must be a number"), J(100 <= a && 999 >= a, `invalid status code: ${a}`), this.c = !0, this.res.statusCode = a, 2 > this.req.httpVersionMajor && (this.res.statusMessage = G[a]), this.body && ha[a] && (this.body = null));
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
      "string" == typeof a ? (c && (this.type = /^\s*</.test(a) ? "html" : "text"), this.length = Buffer.byteLength(a)) : Buffer.isBuffer(a) ? (c && (this.type = "bin"), this.length = a.length) : "function" == typeof a.pipe ? (gf(this.res, kf.bind(null, a)), Nf(a, d => this.ctx.onerror(d)), null != b && b != a && this.remove("Content-Length"), c && (this.type = "bin")) : (this.remove("Content-Length"), this.type = "json");
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
    fa[this.status] || (this.status = 302);
    if (this.ctx.accepts("html")) {
      var c = Rf.exec(a);
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
    a && (this.type = nc(a));
    this.set("Content-Disposition", If(a, b));
  }
  set type(a) {
    var b = Qf.get(a);
    if (!b) {
      if (a && "string" == typeof a) {
        if (b = -1 == a.indexOf("/") ? sf(a) : a) {
          if (!b.includes("charset")) {
            var c;
            if (b && "string" == typeof b) {
              var d = (c = nf.exec(b)) && mf[c[1].toLowerCase()];
              c = d && d.charset ? d.charset : c && of.test(c[1]) ? "UTF-8" : !1;
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
      Qf.set(a, b);
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
    return zf(c, a);
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
;const Tg = M("@goa/koa:application");
async function Ug(a, b) {
  const c = a.res;
  c.statusCode = 404;
  gf(c, d => a.onerror(d));
  try {
    return await b(a), Vg(a);
  } catch (d) {
    a.onerror(d);
  }
}
class Wg extends Cc {
  constructor(a = {}) {
    const {proxy:b = !1, subdomainOffset:c = 2, env:d = process.env.NODE_ENV || "development", keys:e, Context:f = Rg} = a;
    super();
    this.proxy = b;
    this.silent = !1;
    this.middleware = [];
    this.subdomainOffset = c;
    this.env = d;
    this.context = Object.create(f.prototype);
    this.request = Object.create(Pg.prototype);
    this.response = Object.create(Sg.prototype);
    this.keys = e;
  }
  [oa.custom]() {
    return this.inspect();
  }
  listen(...a) {
    Tg("listen");
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
    if ("function" != typeof a ? 0 : Ze.test(Ye.call(a)) || ($e ? af(a) == df : "[object GeneratorFunction]" == Xe.call(a))) {
      throw Error("Generator functions are not supported by @goa/koa. Use koa-convert on them first.");
    }
    Tg("use %s", a.bb || a.name || "-");
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
      return Ug(b, a);
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
function Vg(a) {
  if (0 != a.respond && a.writable) {
    var b = a.res, c = a.status, d = a.body;
    if (ha[c]) {
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
    if (d instanceof qb) {
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
function Xg(a) {
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
function Yg(a, b = {}) {
  const c = Xg(a);
  ({ib:a = "./"} = b);
  b = `[^${Zg(b.delimiter || "/#?")}]+?`;
  const d = [];
  let e = 0, f = 0, g = "";
  const h = q => {
    if (f < c.length && c[f].type === q) {
      return c[f++].value;
    }
  }, k = q => {
    const t = h(q);
    if (void 0 !== t) {
      return t;
    }
    const {type:u, index:r} = c[f];
    throw new TypeError(`Unexpected ${u} at ${r}, expected ${q}`);
  }, l = () => {
    let q = "", t;
    for (; t = h("CHAR") || h("ESCAPED_CHAR");) {
      q += t;
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
function $g(a) {
  var b = {encode:encodeURIComponent};
  return ah(Yg(a, b), b);
}
function ah(a, b = {}) {
  const c = bh(b), {encode:d = g => g, ob:e = !0} = b, f = a.map(g => {
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
function Zg(a) {
  return a.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function bh(a = {}) {
  return a.sensitive ? "" : "i";
}
function ch(a, b, c) {
  a = a.map(d => dh(d, b, c).source);
  return new RegExp(`(?:${a.join("|")})`, bh(c));
}
function eh(a, b, c = {}) {
  const {strict:d = !1, start:e = !0, end:f = !0, encode:g = m => m} = c, h = `[${Zg(c.endsWith || "")}]|$`, k = `[${Zg(c.delimiter || "/#?")}]`;
  let l = e ? "^" : "";
  for (const m of a) {
    if ("string" == typeof m) {
      l += Zg(g(m));
    } else {
      const p = Zg(g(m.prefix)), n = Zg(g(m.P));
      m.pattern ? (b && b.push(m), l = p || n ? "+" == m.v || "*" == m.v ? l + `(?:${p}((?:${m.pattern})(?:${n}${p}(?:${m.pattern}))*)${n})${"*" == m.v ? "?" : ""}` : l + `(?:${p}(${m.pattern})${n})${m.v}` : l + `(${m.pattern})${m.v}`) : l += `(?:${p}${n})${m.v}`;
    }
  }
  f ? (d || (l += `${k}?`), l += c.endsWith ? `(?=${h})` : "$") : (a = a[a.length - 1], a = "string" === typeof a ? -1 < k.indexOf(a[a.length - 1]) : void 0 === a, d || (l += `(?:${k}(?=${h}))?`), a || (l += `(?=${k}|${h})`));
  return new RegExp(l, bh(c));
}
function dh(a, b, c) {
  if (a instanceof RegExp) {
    if (b && (c = a.source.match(/\((?!\?)/g))) {
      for (var d = 0; d < c.length; d++) {
        b.push({name:d, prefix:"", P:"", v:"", pattern:""});
      }
    }
  } else {
    Array.isArray(a) ? d = ch(a, b, c) : d = eh(Yg(a, c), b, c), a = d;
  }
  return a;
}
;const fh = M("koa-router");
function gh(a, b) {
  a.path && (a.path = b + a.path, a.paramNames = [], b = a.path, a.regexp = dh("string" == typeof b ? b.replace(/\/$/, "") : b, a.paramNames, a.opts));
}
class hh {
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
    this.regexp = dh("string" == typeof a ? a.replace(/\/$/, "") : a, this.paramNames, this.opts);
    fh("defined route %s %s", this.methods, this.opts.prefix + this.path);
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
    var c = a, d = this.path.replace(/\(\.\*\)/g, ""), e = $g(d);
    "object" != typeof a && (c = [...arguments], "object" == typeof c[c.length - 1] && (b = c[c.length - 1], c = c.slice(0, c.length - 1)));
    d = Yg(d);
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
const ih = M("@goa/router");
class jh {
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
            "function" == typeof c ? h = c() : h = new I.NotImplemented;
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
                  "function" == typeof d ? h = d() : h = new I.MethodNotAllowed;
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
    const m = new hh(a, b, c, {end:h, name:k, sensitive:l, strict:g, prefix:f, ignoreCaptures:e});
    this.opts.prefix && gh(m, this.opts.prefix);
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
    const e = {path:[], ra:[], route:!1};
    for (let f = c.length, g = 0; g < f; g++) {
      if (d = c[g], ih("test %s %s", d.path, d.regexp), d.match(a) && (e.path.push(d), 0 == d.methods.length || d.methods.includes(b))) {
        e.ra.push(d), d.methods.length && (e.route = !0);
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
      gh(b, a);
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
        a && gh(f, a);
        this.opts.prefix && gh(f, this.opts.prefix);
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
      ih("%s %s", b.method, b.path);
      const d = this.opts.routerPath || b.routerPath || b.path;
      var e = this.match(d, b.method);
      b.a ? b.a.push(e.path) : b.a = e.path;
      b.router = this;
      if (!e.route) {
        return c();
      }
      e = e.ra;
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
jh.url = function(a, ...b) {
  return hh.prototype.url.apply({path:a}, b);
};
const kh = qe.map(a => a.toLowerCase());
[...kh, "all"].forEach(a => {
  function b(c, d, ...e) {
    "string" == typeof d || d instanceof RegExp || (e = [d, ...e], d = c, c = null);
    this.register(d, "all" == a ? kh : [a], e, {name:c});
    return this;
  }
  jh.prototype[a] = b;
  "delete" == a && (jh.prototype.del = b);
});
class lh extends Rg {
  constructor() {
    super();
    this.sessionOptions = this.session = void 0;
    this._usage = this.files = this.file = this.mountPath = this.router = this.params = this._matchedRouteName = this._matchedRoute = this.compress = null;
  }
  neoluddite(a, b, c = {}) {
    this._usage && this._usage.push({"package":a, item:b, timestamp:(new Date).getTime(), ...c});
  }
}
;const mh = a => {
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
const nh = async(a = {}, b = {}) => {
  const c = new Wg({Context:lh});
  a = await We(a, c);
  "production" == c.env && (c.proxy = !0);
  return {app:c, middleware:a, router:new jh(b)};
};
function oh(a, b, c = "0.0.0.0") {
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
;const ph = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;
let qh = a => `${a}`.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"), rh = a => 40 < `${a}`.length || -1 != `${a}`.indexOf("\n") || -1 !== `${a}`.indexOf("<");
const sh = {};
function th(a) {
  const b = {...a.attributes, children:a.children};
  a = a.nodeName.eb;
  if (void 0 !== a) {
    for (let c in a) {
      void 0 === b[c] && (b[c] = a[c]);
    }
  }
  return b;
}
;const uh = (a, b, {allAttributes:c, xml:d, Pa:e, sort:f, ha:g} = {}) => {
  let h;
  const k = Object.keys(a);
  f && k.sort();
  return {Ra:k.map(l => {
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
            null != q && (n && (n += " "), n += sh[p] || (sh[p] = p.replace(/([A-Z])/g, "-$1").toLowerCase()), n += ": ", n += q, "number" == typeof q && !1 === ph.test(p) && (n += "px"), n += ";");
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
          return `${p}${l}="${qh(m)}"`;
        }
      }
    }
  }).filter(Boolean), La:h, ha:g};
};
const vh = [], wh = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, xh = /^(a|abbr|acronym|audio|b|bdi|bdo|big|br|button|canvas|cite|code|data|datalist|del|dfn|em|embed|i|iframe|img|input|ins|kbd|label|map|mark|meter|noscript|object|output|picture|progress|q|ruby|s|samp|slot|small|span|strong|sub|sup|svg|template|textarea|time|u|tt|var|video|wbr)$/;
function yh(a, b = {}, c = {}, d = !1, e = !1, f) {
  if (null == a || "boolean" == typeof a) {
    return "";
  }
  const {pretty:g = !1, shallow:h = !1, renderRootComponent:k = !1, shallowHighOrder:l = !1, sortAttributes:m, allAttributes:p, xml:n, initialPadding:q = 0, closeVoidTags:t = !1} = b;
  let {lineLength:u = 40} = b;
  u -= q;
  let {nodeName:r, attributes:w = {}} = a;
  var x = ["textarea", "pre"].includes(r);
  const O = " ".repeat(q), B = "string" == typeof g ? g : `  ${O}`;
  if ("object" != typeof a && !r) {
    return qh(a);
  }
  if ("function" == typeof r) {
    if (!h || !d && k) {
      return x = th(a), r.prototype && "function" == typeof r.prototype.Xa ? (a = new r(x, c), a.ab = a.$a = !0, a.G = x, a.context = c, r.Ka ? a.state = {...a.state, ...r.Ka(a.G, a.state)} : a.ya && a.ya(), x = a.Xa(a.G, a.state, a.context), a.Ja && (c = {...c, ...a.Ja()})) : x = r(x, c), yh(x, b, c, l, e, f);
    }
    r = r.displayName || r !== Function && r.name || zh(r);
  }
  let v = "";
  ({Ra:z, La:d, ha:f} = uh(w, r, {allAttributes:p, xml:n, Pa:e, sort:m, ha:f}));
  if (g) {
    let D = `<${r}`.length;
    v = z.reduce((T, C) => {
      const A = D + 1 + C.length;
      if (A > u) {
        return D = B.length, `${T}\n${B}${C}`;
      }
      D = A;
      return `${T} ${C}`;
    }, "");
  } else {
    v = z.length ? " " + z.join(" ") : "";
  }
  v = `<${r}${v}>`;
  if (`${r}`.match(/[\s\n\\/='"\0<>]/)) {
    throw v;
  }
  var z = `${r}`.match(wh);
  t && z && (v = v.replace(/>$/, " />"));
  let H = [];
  if (d) {
    !x && g && (rh(d) || d.length + Ah(v) > u) && (d = "\n" + B + `${d}`.replace(/(\n+)/g, "$1" + (B || "\t"))), v += d;
  } else {
    if (a.children) {
      let D = g && v.includes("\n");
      const T = [];
      H = a.children.map((C, A) => {
        if (null != C && !1 !== C) {
          var E = yh(C, b, c, !0, "svg" == r ? !0 : "foreignObject" == r ? !1 : e, f);
          if (E) {
            g && E.length + Ah(v) > u && (D = !0);
            if ("string" == typeof C.nodeName) {
              const y = E.replace(new RegExp(`</${C.nodeName}>$`), "");
              Bh(C.nodeName, y) && (T[A] = E.length);
            }
            return E;
          }
        }
      }).filter(Boolean);
      g && D && !x && (H = H.reduce((C, A, E) => {
        var y = (E = T[E - 1]) && /^<([\s\S]+?)>/.exec(A);
        y && ([, y] = y, y = !xh.test(y));
        if (E && !y) {
          y = /[^<]*?(\s)/y;
          var F;
          let N = !0, ca;
          for (; null !== (F = y.exec(A));) {
            const [Ch] = F;
            [, ca] = F;
            y.lastIndex + Ch.length - 1 > u - (N ? E : 0) && (F = A.slice(0, y.lastIndex - 1), A = A.slice(y.lastIndex), N ? (C.push(F), N = !1) : C.push("\n" + B + `${F}`.replace(/(\n+)/g, "$1" + (B || "\t"))), y.lastIndex = 0);
          }
          ca && C.push(ca);
          C.push(A);
        } else {
          C.push("\n" + B + `${A}`.replace(/(\n+)/g, "$1" + (B || "\t")));
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
  z || (!Bh(r, H[H.length - 1]) && !x && g && v.includes("\n") && (v += `\n${O}`), v += `</${r}>`);
  return v;
}
const Bh = (a, b) => `${a}`.match(xh) && (b ? !/>$/.test(b) : !0);
function zh(a) {
  var b = (Function.prototype.toString.call(a).match(/^\s*function\s+([^( ]+)/) || "")[1];
  if (!b) {
    b = -1;
    for (let c = vh.length; c--;) {
      if (vh[c] === a) {
        b = c;
        break;
      }
    }
    0 > b && (b = vh.push(a) - 1);
    b = `UnnamedComponent${b}`;
  }
  return b;
}
const Ah = a => {
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
module.exports = {_createApp:nh, _compose:aa, _startApp:async function(a = {}, b = {}) {
  const {port:c = 5000, host:d = "0.0.0.0", router:e} = b, f = () => {
    g.destroy().then(() => {
      process.kill(process.pid, "SIGUSR2");
    });
  };
  process.once("SIGUSR2", f);
  b = await nh(a, e);
  const g = b.app;
  a = b.middleware;
  b = b.router;
  const h = await oh(g, c, d);
  mh(h);
  g.destroy = async() => {
    await h.destroy();
    process.removeListener("SIGUSR2", f);
  };
  const {port:k} = h.address();
  return {app:g, middleware:a, url:`http://localhost:${k}`, server:h, router:b};
}, _httpErrors:I, _mount:Ha, _Keygrip:Na, _Router:jh, _render:(a, b = {}, c = {}) => {
  const d = b.addDoctype, e = b.pretty;
  a = yh(a, b, c);
  return d ? `<!doctype html>${e ? "\n" : ""}${a}` : a;
}};


//# sourceMappingURL=idio.js.map