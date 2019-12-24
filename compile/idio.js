#!/usr/bin/env node
             
const assert = require('assert');
const tty = require('tty');
const util = require('util');
const _crypto = require('crypto');
const zlib = require('zlib');
const stream = require('stream');
const events = require('events');
const os = require('os');
const path = require('path');
const fs = require('fs');
const http = require('http');
const url = require('url');
const net = require('net');
const querystring = require('querystring');             
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
  var a = w;
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
function w(a) {
  if ("number" == typeof a) {
    if (!w[a]) {
      throw Error("invalid status code: " + a);
    }
    return a;
  }
  if ("string" != typeof a) {
    throw new TypeError("code must be a number or string");
  }
  var b = parseInt(a, 10);
  if (!isNaN(b)) {
    if (!w[b]) {
      throw Error("invalid status code: " + b);
    }
    return b;
  }
  b = w[a.toLowerCase()];
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
function y(...a) {
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
  if ("number" != typeof d || !w[d] && (400 > d || 600 <= d)) {
    d = 500;
  }
  a = y[d] || y[Number(String(d).charAt(0) + "00")];
  b || (b = a ? new a(c) : Error(c || w[d]), Error.captureStackTrace(b, y));
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
    this.message || (this.message = w[a]);
  }
}
ea.forEach(a => {
  let b;
  const c = ja(w[a]), d = c.match(/Error$/) ? c : c + "Error";
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
  b && (y[a] = b, y[c] = b);
}, {});
function ja(a) {
  return a.split(" ").map(function(b) {
    return b.charAt(0).toUpperCase() + b.slice(1);
  }).join("").replace(/[^ _0-9a-z]/gi, "");
}
;var z = assert;
const ka = assert.equal;
var la = tty;
const ma = util.format, A = util.inspect;
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
    return b.pa ? (b = Math.abs(a), a = 864E5 <= b ? qa(a, b, 864E5, "day") : 36E5 <= b ? qa(a, b, 36E5, "hour") : 6E4 <= b ? qa(a, b, 6E4, "minute") : 1000 <= b ? qa(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
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
const ra = /\B(?=(\d{3})+(?!\d))/g, sa = /(?:\.0*|(\.[^0]+)0+)$/, B = {b:1, kb:1024, mb:1048576, gb:1073741824, tb:Math.pow(1024, 4), pb:Math.pow(1024, 5)};
function D(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), d = b && b.ra || "", e = b && b.ta || "", f = b && void 0 !== b.Z ? b.Z : 2, g = !(!b || !b.oa);
  (b = b && b.sa || "") && B[b.toLowerCase()] || (b = c >= B.pb ? "PB" : c >= B.tb ? "TB" : c >= B.gb ? "GB" : c >= B.mb ? "MB" : c >= B.kb ? "KB" : "B");
  a = (a / B[b.toLowerCase()]).toFixed(f);
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
function I(a, b) {
  return (b = ta[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var ua = {f:D, ["fy"](a) {
  return I(D(a) || "", "yellow");
}, ["fr"](a) {
  return I(D(a) || "", "red");
}, ["fb"](a) {
  return I(D(a) || "", "blue");
}, ["fg"](a) {
  return I(D(a) || "", "green");
}, ["fc"](a) {
  return I(D(a) || "", "cyan");
}, ["fm"](a) {
  return I(D(a) || "", "magenta");
}};
const va = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, e) => e.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), wa = {init:function(a) {
  a.inspectOpts = {...va};
}, log:function(...a) {
  return process.stderr.write(ma(...a) + "\n");
}, formatArgs:function(a) {
  var b = this.namespace, c = this.color;
  const d = this.diff;
  this.useColors ? (c = "\u001b[3" + (8 > c ? c : "8;5;" + c), b = `  ${c};1m${b} \u001B[0m`, a[0] = b + a[0].split("\n").join("\n" + b), a.push(c + "m+" + oa(d) + "\u001b[0m")) : a[0] = (va.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in va ? !!va.colors : la.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:va, formatters:{o:function(a) {
  return A(a, {...this.inspectOpts, colors:this.useColors}).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  return A(a, {...this.inspectOpts, colors:this.useColors});
}, ...ua}};
function xa(a) {
  function b(...g) {
    if (b.enabled) {
      var h = Number(new Date);
      b.diff = h - (f || h);
      b.prev = f;
      f = b.curr = h;
      g[0] = ya(g[0]);
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
function za(a) {
  const b = xa(a);
  "function" == typeof a.init && a.init(b);
  a.a.push(b);
  return b;
}
function Aa(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function Ba(a) {
  var b = wa.load();
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
class Ca {
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
function Da() {
  const a = new Ca(wa);
  return function(b) {
    const c = za(a);
    c.namespace = b;
    c.useColors = wa.useColors();
    c.enabled = a.enabled(b);
    c.color = Aa(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, e) {
      d = this.namespace + (void 0 === e ? ":" : e) + d;
      d.log = this.log;
      return d;
    };
    Ba(a);
    return c;
  };
}
function ya(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;function L(a) {
  if (!a) {
    throw Error("To use debug, pass the namespace.");
  }
  return Da()(a);
}
;const Ea = L("koa-mount");
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
  Ea("mount %s %s", a, f);
  return async function(g, h) {
    const k = g.path, l = c(k);
    Ea("mount %s %s -> %s", a, f, l);
    if (!l) {
      return await h();
    }
    g.mountPath = a;
    g.path = l;
    Ea("enter %s -> %s", k, g.path);
    await d(g, async() => {
      g.path = k;
      await h();
      g.path = l;
    });
    Ea("leave %s -> %s", k, g.path);
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
    this.a = b;
    this.encoding = c;
    this.keys = a;
  }
  sign(a) {
    return La(a, this.a, this.keys[0], this.encoding);
  }
  verify(a, b) {
    return -1 < this.index(a, b);
  }
  index(a, b) {
    for (let c = 0, d = this.keys.length; c < d; c++) {
      const e = La(a, this.a, this.keys[c], this.encoding);
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
;for (var N = [], Pa = 0; 256 > Pa; ++Pa) {
  N[Pa] = (Pa + 256).toString(16).substr(1);
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
  b || (b = 0, b = [N[a[b++]], N[a[b++]], N[a[b++]], N[a[b++]], "-", N[a[b++]], N[a[b++]], "-", N[a[b++]], N[a[b++]], "-", N[a[b++]], N[a[b++]], "-", N[a[b++]], N[a[b++]], N[a[b++]], N[a[b++]], N[a[b++]], N[a[b++]]].join(""));
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
;const O = L("koa-session:context");
async function Ua(a) {
  O("init from external");
  var b = a.ctx, c = a.a;
  c.externalKey ? (b = c.externalKey.get(b), O("get external key from custom %s", b)) : (b = b.cookies.get(c.key, c), O("get external key from cookie %s", b));
  b ? (c = await a.store.get(b, c.maxAge, {rolling:c.rolling || !1}), a.valid(c, b) ? (a.create(c, b), a.c = JSON.stringify(a.session.toJSON())) : a.create()) : a.create();
}
function Va(a) {
  const b = a.c;
  var c = a.session;
  if (c._requireSave) {
    return "force";
  }
  const d = c.toJSON();
  return b || Object.keys(d).length ? b !== JSON.stringify(d) ? "changed" : a.a.rolling ? "rolling" : a.a.renew && (a = c._expire, c = c.maxAge, a && c && a - Date.now() < c / 2) ? "renew" : "" : "";
}
class Wa {
  constructor(a, b = {}) {
    this.ctx = a;
    this.app = a.app;
    this.a = {...b};
    this.store = b.ContextStore ? new b.ContextStore(a) : b.store;
    this.c = this.externalKey = this.session = void 0;
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
        O("init from cookie");
        a = this.ctx;
        const c = this.a, d = a.cookies.get(c.key, c);
        if (d) {
          O("parse %s", d);
          try {
            var b = c.decode(d);
          } catch (e) {
            O("decode %j error: %s", d, e);
            if (!(e instanceof SyntaxError)) {
              throw a.cookies.set(c.key, "", c), e.headers = {"set-cookie":a.response.get("set-cookie")}, e;
            }
            this.create();
            break a;
          }
          O("parsed %j", b);
          this.valid(b) ? (this.create(b), this.c = JSON.stringify(this.session.toJSON())) : this.create();
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
      return O("expired session"), this.emit("expired", {key:b, value:a, ctx:c}), !1;
    }
    const d = this.a.valid;
    return "function" != typeof d || d(c, a) ? !0 : (O("invalid session"), this.emit("invalid", {key:b, value:a, ctx:c}), !1);
  }
  emit(a, b) {
    setImmediate(() => {
      this.app.emit(`session:${a}`, b);
    });
  }
  create(a, b) {
    O("create session with val: %j externalKey: %s", a, b);
    this.store && (this.externalKey = b || this.a.genid && this.a.genid(this.ctx));
    this.session = new Ra(this, a);
  }
  async commit() {
    const {session:a, a:{beforeSave:b}, ctx:c} = this;
    if (void 0 !== a) {
      if (null === a) {
        await this.remove();
      } else {
        var d = Va(this);
        O("should save session: %s", d);
        d && ("function" == typeof b && (O("before save"), b(c, a)), await this.save("changed" == d));
      }
    }
  }
  async remove() {
    const {a:{key:a}, ctx:b, externalKey:c, store:d} = this;
    c && await d.destroy(c);
    b.cookies.set(a, "", this.a);
  }
  async save(a) {
    const {a:{key:b, rolling:c = !1, encode:d, externalKey:e}, externalKey:f} = this;
    let {a:{maxAge:g = 864E5}} = this, h = this.session.toJSON();
    "session" == g ? (this.a.maxAge = void 0, h._session = !0) : (h._expire = g + Date.now(), h._maxAge = g);
    f ? (O("save %j to external key %s", h, f), "number" == typeof g && (g += 10000), await this.store.set(f, h, g, {changed:a, rolling:c}), e ? e.set(this.ctx, f) : this.ctx.cookies.set(b, f, this.a)) : (O("save %j to cookie", h), h = d(h), O("save %s", h), this.ctx.cookies.set(b, h, this.a));
  }
}
;/*

 MIT https://github.com/miguelmota/is-class
*/
const Xa = L("koa-session"), Ya = Symbol("context#contextSession");
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
  b && (z("function" == typeof b.get, "store.get must be function"), z("function" == typeof b.set, "store.set must be function"), z("function" == typeof b.destroy, "store.destroy must be function"));
  if (b = a.externalKey) {
    z("function" == typeof b.get, "externalKey.get must be function"), z("function" == typeof b.set, "externalKey.set must be function");
  }
  if (b = a.ContextStore) {
    z("function" == typeof b && (/^class[\s{]/.test(b.toString()) || /classCallCheck\(/.test(b.toString().replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, ""))), "ContextStore must be a class"), z("function" == typeof b.prototype.get, "ContextStore.prototype.get must be function"), z("function" == typeof b.prototype.set, "ContextStore.prototype.set must be function"), z("function" == typeof b.prototype.destroy, "ContextStore.prototype.destroy must be function");
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
      return c.a;
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
    if ("function" === typeof h) {
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
      if (!g) {
        return await l();
      }
      try {
        return await l();
      } catch (n) {
        throw k = n.headers || {}, l = cb(k.vary || k.Vary || "", "Origin"), delete k.la, n.headers = Object.assign({}, k, m, {vary:l}), n;
      }
    } else {
      if (!k.get("Access-Control-Request-Method")) {
        return await l();
      }
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
;var fb = stream;
const gb = stream.Readable, hb = stream.Writable;
var ib = events;
const jb = events.EventEmitter;
/*
 MIT streamsearch by Brian White
 https://github.com/mscdex/streamsearch
*/
function kb(a, b, c, d, e) {
  for (var f = 0; f < e; ++f, ++b, ++d) {
    if (a[b] !== c[d]) {
      return !1;
    }
  }
  return !0;
}
function lb(a, b) {
  var c = b.length, d = a.j, e = d.length, f = -a.a, g = d[e - 1], h = a.i, k = a.h;
  if (0 > f) {
    for (; 0 > f && f <= c - e;) {
      var l = f + e - 1;
      l = 0 > l ? a.h[a.a + l] : b[l];
      if (l === g && mb(a, b, f, e - 1)) {
        return a.a = 0, ++a.g, f > -a.a ? a.emit("info", !0, k, 0, a.a + f) : a.emit("info", !0), a.c = f + e;
      }
      f += h[l];
    }
    if (0 > f) {
      for (; 0 > f && !mb(a, b, f, c - f);) {
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
    if (l === g && b[f] === d[0] && kb(d, 0, b, f, e - 1)) {
      return ++a.g, 0 < f ? a.emit("info", !0, b, a.c, f) : a.emit("info", !0), a.c = f + e;
    }
    f += h[l];
  }
  if (f < c) {
    for (; f < c && (b[f] !== d[0] || !kb(b, f, d, 0, c - f));) {
      ++f;
    }
    f < c && (b.copy(k, 0, f, f + (c - f)), a.a = c - f);
  }
  0 < f && a.emit("info", !1, b, a.c, f < c ? f : c);
  return a.c = c;
}
function mb(a, b, c, d) {
  for (var e = 0; e < d;) {
    var f = c + e;
    if ((0 > f ? a.h[a.a + f] : b[f]) === a.j[e]) {
      ++e;
    } else {
      return !1;
    }
  }
  return !0;
}
class nb extends jb {
  constructor(a) {
    super();
    "string" === typeof a && (a = new Buffer(a));
    var b, c = a.length;
    this.u = Infinity;
    this.g = 0;
    this.i = Array(256);
    this.a = 0;
    this.j = a;
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
      var d = lb(this, a);
    }
    return d;
  }
}
;class ob extends gb {
  constructor(a) {
    super(a);
  }
  _read() {
  }
}
;const pb = Buffer.from("\r\n\r\n"), qb = /\r\n/g, rb = /^([^:]+):[ \t]?([\x00-\xFF]+)?$/;
class sb extends jb {
  constructor(a = {}) {
    super();
    ({maxHeaderPairs:a = 2000} = a);
    this.c = 0;
    this.i = !1;
    this.j = 0;
    this.maxHeaderPairs = a;
    this.buffer = "";
    this.a = {};
    this.h = !1;
    this.g = new nb(pb);
    this.g.on("info", (b, c, d, e) => {
      c && !this.i && (81920 < this.c + (e - d) ? (e = 81920 - this.c, this.c = 81920) : this.c += e - d, 81920 === this.c && (this.i = !0), this.buffer += c.toString("binary", d, e));
      if (b) {
        if (this.buffer && this.j !== this.maxHeaderPairs) {
          b = this.buffer.split(qb);
          c = b.length;
          e = !1;
          for (let g = 0; g < c; ++g) {
            if (0 !== b[g].length) {
              if ("\t" == b[g][0] || " " == b[g][0]) {
                this.a[f][this.a[f].length - 1] += b[g];
              } else {
                if (d = rb.exec(b[g])) {
                  var f = d[1].toLowerCase();
                  d[2] ? void 0 === this.a[f] ? this.a[f] = [d[2]] : this.a[f].push(d[2]) : this.a[f] = [""];
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
        this.g.g = this.g.u;
        f = this.a;
        this.a = {};
        this.buffer = "";
        this.h = !0;
        this.c = this.j = 0;
        this.i = !1;
        this.emit("header", f);
      }
    });
  }
  push(a) {
    a = this.g.push(a);
    if (this.h) {
      return a;
    }
  }
  reset() {
    this.h = !1;
    this.buffer = "";
    this.a = {};
    this.g.reset();
  }
}
;/*
 MIT dicer by Brian White
 https://github.com/mscdex/dicer
*/
const tb = Buffer.from("-"), ub = Buffer.from("\r\n"), vb = () => {
};
function wb(a, b, c, d, e) {
  var f, g = 0, h = !0;
  if (!a.a && a.D && c) {
    for (; 2 > a.h && d + g < e;) {
      if (45 === c[d + g]) {
        ++g, ++a.h;
      } else {
        a.h && (f = tb);
        a.h = 0;
        break;
      }
    }
    2 === a.h && (d + g < e && a._events.trailer && a.emit("trailer", c.slice(d + g, e)), a.reset(), a.F = !0, 0 === a.N && (a.c = !0, a.emit("finish"), a.c = !1));
    if (a.h) {
      return;
    }
  }
  a.D && (a.D = !1);
  a.a || (a.a = new ob(a.U), a.a._read = () => {
    xb(a);
  }, g = a.g ? "preamble" : "part", a._events[g] ? a.emit(g, a.a) : a._ignore(), a.g || (a.u = !0));
  c && d < e && !a.v && (a.g || !a.u ? (f && (h = a.a.push(f)), h = a.a.push(c.slice(d, e)), h || (a.C = !0)) : !a.g && a.u && (f && a.i.push(f), f = a.i.push(c.slice(d, e)), !a.u && void 0 !== f && f < e && wb(a, !1, c, d + f, e)));
  b && (a.i.reset(), a.g ? a.g = !1 : (++a.N, a.a.on("end", () => {
    0 === --a.N && (a.F ? (a.c = !0, a.emit("finish"), a.c = !1) : xb(a));
  })), a.a.push(null), a.a = void 0, a.v = !1, a.D = !0, a.h = 0);
}
function xb(a) {
  if (a.C && (a.C = !1, a.B)) {
    const b = a.B;
    a.B = void 0;
    b();
  }
}
class yb extends hb {
  constructor(a) {
    super(a);
    if (!a || !a.headerFirst && "string" != typeof a.boundary) {
      throw new TypeError("Boundary required");
    }
    "string" == typeof a.boundary ? this.setBoundary(a.boundary) : this.j = void 0;
    this.X = a.headerFirst;
    this.N = this.h = 0;
    this.c = this.F = !1;
    this.g = !0;
    this.D = !1;
    this.u = this.T = !0;
    this.B = this.a = void 0;
    this.v = !1;
    this.U = "number" == typeof a.partHwm ? {highWaterMark:a.partHwm} : {};
    this.C = !1;
    this.i = new sb(a);
    this.i.on("header", b => {
      this.u = !1;
      this.a.emit("header", b);
    });
  }
  emit(a) {
    "finish" != a || this.c ? hb.prototype.emit.apply(this, arguments) : this.F || process.nextTick(() => {
      this.emit("error", Error("Unexpected end of multipart data"));
      this.a && !this.v ? (this.a.emit("error", Error((this.g ? "Preamble" : "Part") + " terminated early due to unexpected end of multipart data")), this.a.push(null), process.nextTick(() => {
        this.c = !0;
        this.emit("finish");
        this.c = !1;
      })) : (this.c = !0, this.emit("finish"), this.c = !1);
    });
    return !1;
  }
  _write(a, b, c) {
    if (!this.i && !this.j) {
      return c();
    }
    if (this.X && this.g) {
      if (this.a || (this.a = new ob(this.U), this._events.preamble ? this.emit("preamble", this.a) : this._ignore()), b = this.i.push(a), !this.u && void 0 !== b && b < a.length) {
        a = a.slice(b);
      } else {
        return c();
      }
    }
    this.T && (this.j.push(ub), this.T = !1);
    this.j.push(a);
    this.C ? this.B = c : c();
  }
  reset() {
    this.i = this.j = this.a = void 0;
  }
  setBoundary(a) {
    this.j = new nb("\r\n--" + a);
    this.j.on("info", (b, c, d, e) => {
      wb(this, b, c, d, e);
    });
  }
  _ignore() {
    this.a && !this.v && (this.v = !0, this.a.on("error", vb), this.a.resume());
  }
}
;const {TextDecoder:zb} = require("text-decoding"), Ab = /%([a-fA-F0-9]{2})/g;
function Bb(a, b) {
  return String.fromCharCode(parseInt(b, 16));
}
function Cb(a) {
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
              d ? (h.length && (h = P(h.replace(Ab, Bb), d)), d = "") : h.length && (h = P(h, "utf8"));
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
  d && h.length ? h = P(h.replace(Ab, Bb), d) : h && (h = P(h, "utf8"));
  void 0 === b[g] ? h && (b[g] = h) : b[g][1] = h;
  return b;
}
function P(a, b) {
  let c;
  if (a) {
    try {
      c = (new zb(b)).decode(Buffer.from(a, "binary"));
    } catch (d) {
    }
  }
  return "string" == typeof c ? c : a;
}
const Db = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], Eb = /\+/g;
class Fb {
  constructor() {
    this.buffer = void 0;
  }
  write(a) {
    a = a.replace(Eb, " ");
    for (var b = "", c = 0, d = 0, e = a.length; c < e; ++c) {
      void 0 !== this.buffer ? Db[a.charCodeAt(c)] ? (this.buffer += a[c], ++d, 2 === this.buffer.length && (b += String.fromCharCode(parseInt(this.buffer, 16)), this.buffer = void 0)) : (b += "%" + this.buffer, this.buffer = void 0, --c) : "%" == a[c] && (c > d && (b += a.substring(d, c), d = c), this.buffer = "", ++d);
    }
    d < e && void 0 === this.buffer && (b += a.substring(d));
    return b;
  }
  reset() {
    this.buffer = void 0;
  }
}
function Gb(a) {
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
const Hb = a => {
  const {fieldSize:b = 1048576, fieldNameSize:c = 100, fileSize:d = Infinity, files:e = Infinity, fields:f = Infinity, parts:g = Infinity} = a;
  return {G:b, ba:d, da:e, H:f, ia:g, L:c};
};
class Ib extends hb {
  constructor(a = {}) {
    super({...a.highWaterMark ? {highWaterMark:a.highWaterMark} : {}});
    this.a = !1;
    this.c = void 0;
    this.v = this.u = this.h = this.j = !1;
    this.g = a;
    if (a.headers && "string" == typeof a.headers["content-type"]) {
      a: {
        a = a.headers;
        this.c = void 0;
        if (a["content-type"]) {
          const b = Cb(a["content-type"]);
          let c, d;
          for (let e = 0; e < this.i.length && (d = this.i[e], "function" == typeof d.detect ? c = d.detect(b) : c = d.detect.test(b[0]), !c); ++e) {
          }
          if (c) {
            this.c = new d(this, {limits:this.g.limits, headers:a, parsedConType:b, highWaterMark:this.g.highWaterMark, fileHwm:this.g.fileHwm, defCharset:this.g.defCharset, preservePath:this.g.preservePath});
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
;const Jb = /^boundary$/i, Kb = /^form-data$/i, Lb = /^charset$/i, Mb = /^filename$/i, Nb = /^name$/i;
class Ob {
  static get detect() {
    return /^multipart\/form-data/i;
  }
  constructor(a, {limits:b = {}, preservePath:c, fileHwm:d, parsedConType:e = [], highWaterMark:f}) {
    function g() {
      0 === E && ca && !a.a && (ca = !1, process.nextTick(() => {
        a.a = !0;
        a.emit("finish");
      }));
    }
    let h, k;
    [, e] = e.find(r => Array.isArray(r) && Jb.test(r[0])) || [];
    if ("string" != typeof e) {
      throw Error("Multipart: Boundary not found");
    }
    const {ia:l, da:m, ba:p, H:n, G:q} = Hb(b);
    let u, v = 0, t = 0, E = 0, C, ca = !1;
    this.g = this.h = !1;
    this.a = void 0;
    this.j = 0;
    this.i = a;
    this.c = new yb({boundary:e, maxHeaderPairs:b.headerPairs, highWaterMark:f, fileHwm:d});
    this.c.on("drain", () => {
      this.h = !1;
      if (this.a && !this.g) {
        const r = this.a;
        this.a = void 0;
        r();
      }
    }).on("error", r => {
      a.emit("error", r);
    }).on("finish", () => {
      ca = !0;
      g();
    });
    const M = r => {
      if (++this.j > l) {
        return this.c.removeListener("part", M), this.c.on("part", Q), a.v = !0, a.emit("partsLimit"), Q(r);
      }
      if (C) {
        const x = C;
        x.emit("end");
        x.removeAllListeners("end");
      }
      r.on("header", x => {
        let W = "text/plain", J = "7bit", Fa;
        let na = 0;
        if (x["content-type"]) {
          var G = Cb(x["content-type"][0]);
          if (G[0]) {
            for (W = G[0].toLowerCase(), h = 0, k = G.length; h < k && !Lb.test(G[h][0]); ++h) {
            }
          }
        }
        if (x["content-disposition"]) {
          G = Cb(x["content-disposition"][0]);
          if (!Kb.test(G[0])) {
            return Q(r);
          }
          h = 0;
          for (k = G.length; h < k; ++h) {
            if (Nb.test(G[h][0])) {
              Fa = G[h][1];
            } else {
              if (Mb.test(G[h][0])) {
                var S = G[h][1];
                c || (S = Gb(S));
              }
            }
          }
        } else {
          return Q(r);
        }
        x["content-transfer-encoding"] && (J = x["content-transfer-encoding"][0].toLowerCase());
        if ("application/octet-stream" == W || void 0 !== S) {
          if (v == m) {
            return a.u || (a.u = !0, a.emit("filesLimit")), Q(r);
          }
          ++v;
          if (!a._events.file) {
            this.c._ignore();
            return;
          }
          ++E;
          const F = new Pb({highWaterMark:d});
          u = F;
          F.on("end", () => {
            --E;
            this.g = !1;
            g();
            if (this.a && !this.h) {
              const H = this.a;
              this.a = void 0;
              H();
            }
          });
          F._read = () => {
            if (this.g && (this.g = !1, this.a && !this.h)) {
              const H = this.a;
              this.a = void 0;
              H();
            }
          };
          a.emit("file", Fa, F, S, J, W, r);
          x = H => {
            if ((na += H.length) > p) {
              const K = p - (na - H.length);
              0 < K && F.push(H.slice(0, K));
              F.emit("limit");
              F.truncated = !0;
              r.removeAllListeners("data");
            } else {
              F.push(H) || (this.g = !0);
            }
          };
          S = () => {
            u = void 0;
            F.push(null);
          };
        } else {
          if (t == n) {
            return a.h || (a.h = !0, a.emit("fieldsLimit")), Q(r);
          }
          ++t;
          ++E;
          const F = [];
          let H = !1;
          C = r;
          x = K => {
            let Ga = K;
            na += K.length;
            na > q && (Ga = Buffer.from(K, 0, q).slice(0, q), H = !0, r.removeAllListeners("data"));
            F.push(Ga);
          };
          S = () => {
            C = void 0;
            var K = Buffer.concat(F);
            try {
              K = (new zb(void 0)).decode(K);
            } catch (Ga) {
            }
            a.emit("field", Fa, K, !1, H, J, W);
            --E;
            g();
          };
        }
        r._readableState.sync = !1;
        r.on("data", x);
        r.on("end", S);
      }).on("error", x => {
        u && u.emit("error", x);
      });
    };
    this.c.on("part", M);
  }
  end() {
    0 !== this.j || this.i.a ? this.c.writable && this.c.end() : process.nextTick(() => {
      this.i.a = !0;
      this.i.emit("finish");
    });
  }
  write(a, b) {
    (a = this.c.write(a)) && !this.g ? b() : (this.h = !a, this.a = b);
  }
}
function Q(a) {
  a.resume();
}
class Pb extends gb {
  constructor(a) {
    super(a);
    this.truncated = !1;
  }
  _read() {
  }
}
;const Qb = /^charset$/i;
class Rb {
  static get detect() {
    return /^application\/x-www-form-urlencoded/i;
  }
  constructor(a, {limits:b = {}, parsedConType:c, defCharset:d = "utf8"}) {
    this.h = a;
    this.j = void 0;
    const {G:e, L:f, H:g} = Hb(b);
    this.G = e;
    this.L = f;
    this.H = g;
    a = d;
    for (let h = 0, k = c.length; h < k; ++h) {
      if (Array.isArray(c[h]) && Qb.test(c[h][0])) {
        a = c[h][1].toLowerCase();
        break;
      }
    }
    this.i = new Fb;
    this.charset = a;
    this.B = 0;
    this.C = "key";
    this.c = !0;
    this.D = this.v = 0;
    this.g = this.a = "";
    this.F = this.u = !1;
  }
  write(a, b) {
    if (this.B === this.H) {
      return this.h.h || (this.h.h = !0, this.h.emit("fieldsLimit")), b();
    }
    for (var c, d, e, f = 0, g = a.length; f < g;) {
      if ("key" == this.C) {
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
          if (this.c && this.v === this.L) {
            this.j = !0;
            break;
          } else {
            this.c && ++this.v;
          }
        }
        if (void 0 !== c) {
          c > f && (this.a += this.i.write(a.toString("binary", f, c))), this.C = "val", this.j = !1, this.c = !0, this.g = "", this.D = 0, this.F = !1, this.i.reset(), f = c + 1;
        } else {
          if (void 0 !== d) {
            if (++this.B, c = this.u, f = d > f ? this.a += this.i.write(a.toString("binary", f, d)) : this.a, this.j = !1, this.c = !0, this.a = "", this.v = 0, this.u = !1, this.i.reset(), f.length && this.h.emit("field", P(f, this.charset), "", c, !1), f = d + 1, this.B === this.H) {
              return b();
            }
          } else {
            this.j ? (e > f && (this.a += this.i.write(a.toString("binary", f, e))), f = e, (this.v = this.a.length) === this.L && (this.c = !1, this.u = !0)) : (f < g && (this.a += this.i.write(a.toString("binary", f))), f = g);
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
          if (this.c && this.D === this.G) {
            this.j = !0;
            break;
          } else {
            this.c && ++this.D;
          }
        }
        if (void 0 !== d) {
          if (++this.B, d > f && (this.g += this.i.write(a.toString("binary", f, d))), this.h.emit("field", P(this.a, this.charset), P(this.g, this.charset), this.u, this.F), this.C = "key", this.j = !1, this.c = !0, this.a = "", this.v = 0, this.u = !1, this.i.reset(), f = d + 1, this.B === this.H) {
            return b();
          }
        } else {
          if (this.j) {
            if (e > f && (this.g += this.i.write(a.toString("binary", f, e))), f = e, "" === this.g && 0 === this.G || (this.D = this.g.length) === this.G) {
              this.c = !1, this.F = !0;
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
    this.h.a || ("key" == this.C && 0 < this.a.length ? this.h.emit("field", P(this.a, this.charset), "", this.u, !1) : "val" == this.C && this.h.emit("field", P(this.a, this.charset), P(this.g, this.charset), this.u, this.F), this.h.a = !0, this.h.emit("finish"));
  }
}
;class Sb extends Ib {
  constructor(a) {
    super(a);
  }
  get i() {
    return [Ob, Rb];
  }
}
;const Tb = /^[^[]*/, Ub = /^\[(\d+)\]/, Vb = /^\[([^\]]+)\]/;
function Wb(a) {
  function b() {
    return [{type:"object", key:a, R:!0}];
  }
  var c = Tb.exec(a)[0];
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
      if (g = Ub.exec(a.substring(e)), null !== g) {
        e += g[0].length, c.S = "array", c = {type:"array", key:parseInt(g[1], 10)}, f.push(c);
      } else {
        if (g = Vb.exec(a.substring(e)), null !== g) {
          e += g[0].length, c.S = "object", c = {type:"object", key:g[1]}, f.push(c);
        } else {
          return b();
        }
      }
    }
  }
  c.R = !0;
  return f;
}
;function Xb(a) {
  return void 0 === a ? "undefined" : Array.isArray(a) ? "array" : "object" == typeof a ? "object" : "scalar";
}
function Yb(a, b, c, d) {
  switch(Xb(c)) {
    case "undefined":
      a[b.key] = b.append ? [d] : d;
      break;
    case "array":
      a[b.key].push(d);
      break;
    case "object":
      return Yb(c, {type:"object", key:"", R:!0}, c[""], d);
    case "scalar":
      a[b.key] = [a[b.key], d];
  }
  return a;
}
function Zb(a, b, c, d) {
  if (b.R) {
    return Yb(a, b, c, d);
  }
  let e;
  switch(Xb(c)) {
    case "undefined":
      return a[b.key] = "array" == b.S ? [] : {}, a[b.key];
    case "object":
      return a[b.key];
    case "array":
      if ("array" == b.S) {
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
;function $b(a, b, c) {
  Wb(b).reduce(function(d, e) {
    return Zb(d, e, d[e.key], c);
  }, a);
}
;function ac(a, {fieldname:b}) {
  const c = {fieldname:b};
  switch(a.strategy) {
    case "ARRAY":
      a.a.files.push(c);
      break;
    case "OBJECT":
      a.a.files[b] ? a.a.files[b].push(c) : a.a.files[b] = [c];
  }
  return c;
}
function bc(a, b) {
  switch(a.strategy) {
    case "ARRAY":
      a = a.a.files;
      b = a.indexOf(b);
      ~b && a.splice(b, 1);
      break;
    case "OBJECT":
      1 == a.a.files[b.fieldname].length ? delete a.a.files[b.fieldname] : (a = a.a.files[b.fieldname], b = a.indexOf(b), ~b && a.splice(b, 1));
  }
}
function cc(a, b, c) {
  "VALUE" == a.strategy ? a.a.file = c : (delete b.fieldname, Object.assign(b, c));
}
class dc {
  constructor(a, b) {
    this.strategy = a;
    this.a = b;
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
;const ec = {LIMIT_PART_COUNT:"Too many parts", LIMIT_FILE_SIZE:"File too large", LIMIT_FILE_COUNT:"Too many files", LIMIT_FIELD_KEY:"Field name too long", LIMIT_FIELD_VALUE:"Field value too long", LIMIT_FIELD_COUNT:"Too many fields", LIMIT_UNEXPECTED_FILE:"Unexpected field"};
function R(a, b) {
  const c = new fc(ec[a]);
  c.code = a;
  b && (c.field = b);
  return c;
}
class fc extends Error {
  constructor(a) {
    super(a);
    this.code = "";
    this.field = void 0;
  }
}
;function gc(a) {
  0 === --a.value && a.emit("zero");
}
async function hc(a) {
  await new Promise((b, c) => {
    if (0 === a.value) {
      b();
    } else {
      a.once("zero", b);
    }
    a.once("error", c);
  });
}
class ic extends jb {
  constructor() {
    super();
    this.value = 0;
  }
}
;const jc = a => (a = a["content-type"]) ? a.toLowerCase().startsWith("multipart/form-data") : !1;
function kc(a) {
  return async function(b, c) {
    const d = b.req;
    if (!jc(d.headers)) {
      return c();
    }
    const {limits:e = {}, storage:f, fileFilter:g, V:h, preservePath:k} = a, l = {};
    d.body = l;
    const m = new Sb({limits:e, preservePath:k, headers:d.headers}), p = new dc(h, d), n = new ic, q = [];
    let u = !1;
    m.on("field", (v, t, E, C) => {
      if (C) {
        return m.emit("error", R("LIMIT_FIELD_VALUE", v));
      }
      if (e.fieldNameSize && v.length > e.fieldNameSize) {
        return m.emit("error", R("LIMIT_FIELD_KEY"));
      }
      $b(l, v, t);
    });
    m.on("file", async(v, t, E, C, ca) => {
      if (!E) {
        return t.resume();
      }
      if (e.fieldNameSize && v.length > e.fieldNameSize) {
        return m.emit("error", R("LIMIT_FIELD_KEY"));
      }
      C = {fieldname:v, originalname:E, encoding:C, mimetype:ca, stream:t};
      const M = ac(p, C);
      let r = !1;
      E = () => {
        if (r) {
          return bc(p, M), r;
        }
      };
      t.on("error", J => {
        gc(n);
        m.emit("error", J);
      }).on("limit", () => {
        r = !0;
        m.emit("error", R("LIMIT_FILE_SIZE", v));
      });
      let x;
      try {
        x = await g(d, C);
      } catch (J) {
        bc(p, M);
        m.emit("error", J);
        return;
      }
      if (x) {
        n.value++;
        try {
          if (!E()) {
            var W = await f._handleFile(d, C);
            t = {...C, ...W};
            if (E()) {
              return q.push(t);
            }
            cc(p, M, t);
            q.push(t);
          }
        } catch (J) {
          bc(p, M), u ? n.emit("error", J) : m.emit("error", J);
        } finally {
          gc(n);
        }
      } else {
        bc(p, M), t.resume();
      }
    });
    d.pipe(m);
    b = v => f._removeFile(d, v);
    try {
      await new Promise((v, t) => {
        m.on("error", t).on("partsLimit", () => {
          t(R("LIMIT_PART_COUNT"));
        }).on("filesLimit", () => {
          t(R("LIMIT_FILE_COUNT"));
        }).on("fieldsLimit", () => {
          t(R("LIMIT_FIELD_COUNT"));
        }).on("finish", v);
      });
    } catch (v) {
      await hc(n);
      const t = await lc(q, b);
      v.storageErrors = t;
      throw v;
    } finally {
      u = !0, d.unpipe(m), m.removeAllListeners();
    }
    await hc(n);
    await c();
  };
}
async function lc(a, b) {
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
;const mc = os.homedir, nc = os.tmpdir;
const oc = path.basename, pc = path.dirname, qc = path.extname, rc = path.isAbsolute, T = path.join, sc = path.normalize, tc = path.parse, uc = path.relative, vc = path.resolve, wc = path.sep;
const xc = fs.ReadStream, yc = fs.createReadStream, zc = fs.createWriteStream, Ac = fs.exists, Bc = fs.lstat, Cc = fs.mkdirSync, Dc = fs.readdir, Ec = fs.rmdir, Fc = fs.stat, Gc = fs.unlink;
const Hc = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, Ic = (a, b = !1) => Hc(a, 2 + (b ? 1 : 0)), Jc = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const Kc = /\s+at.*(?:\(|\s)(.*)\)?/, Lc = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, Mc = mc(), Nc = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(Lc.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(Kc);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(Kc, (g, h) => g.replace(h, h.replace(Mc, "~"))) : f).join("\n");
};
function Oc(a, b, c = !1) {
  return function(d) {
    var e = Jc(arguments), {stack:f} = Error();
    const g = Hc(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = Nc(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function Pc(a) {
  var {stack:b} = Error();
  const c = Jc(arguments);
  b = Ic(b, a);
  return Oc(c, b, a);
}
;function Qc(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function U(a, b, c) {
  const d = Pc(!0);
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
      Qc(e, m);
    }), k = [...b, h]) : 1 < Array.from(arguments).length && (Qc(e, 0), k = [b, h]);
    a(...k);
  });
}
;async function Rc(a, b) {
  b = b.map(async c => {
    const d = T(a, c);
    return {lstat:await U(Bc, d), path:d, relativePath:c};
  });
  return await Promise.all(b);
}
const Sc = a => a.lstat.isDirectory(), Tc = a => !a.lstat.isDirectory();
async function Uc(a) {
  if (!a) {
    throw Error("Please specify a path to the directory");
  }
  const {ignore:b = []} = {};
  if (!(await U(Bc, a)).isDirectory()) {
    var c = Error("Path is not a directory");
    c.code = "ENOTDIR";
    throw c;
  }
  c = await U(Dc, a);
  var d = await Rc(a, c);
  c = d.filter(Sc);
  d = d.filter(Tc).reduce((e, f) => {
    var g = f.lstat.isDirectory() ? "Directory" : f.lstat.isFile() ? "File" : f.lstat.isSymbolicLink() ? "SymbolicLink" : void 0;
    return {...e, [f.relativePath]:{type:g}};
  }, {});
  c = await c.reduce(async(e, {path:f, relativePath:g}) => {
    const h = uc(a, f);
    if (b.includes(h)) {
      return e;
    }
    e = await e;
    f = await Uc(f);
    return {...e, [g]:f};
  }, {});
  return {content:{...d, ...c}, type:"Directory"};
}
;const Vc = async a => {
  await U(Gc, a);
}, Wc = async a => {
  const {content:b} = await Uc(a);
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
  await Promise.all(c.map(Vc));
  d = d.map(e => T(a, e));
  await Promise.all(d.map(Wc));
  await U(Ec, a);
}, Xc = async a => {
  (await U(Bc, a)).isDirectory() ? await Wc(a) : await Vc(a);
};
function Yc(a) {
  a = pc(a);
  try {
    Zc(a);
  } catch (b) {
    if (!/EEXIST/.test(b.message) || -1 == b.message.indexOf(a)) {
      throw b;
    }
  }
}
function Zc(a) {
  try {
    Cc(a);
  } catch (b) {
    if ("ENOENT" == b.code) {
      const c = pc(a);
      Zc(c);
      Zc(a);
    } else {
      if ("EEXIST" != b.code) {
        throw b;
      }
    }
  }
}
;async function $c() {
  return await new Promise((a, b) => {
    Ja(16, (c, d) => {
      if (c) {
        return b(c);
      }
      a(d.toString("hex"));
    });
  });
}
class ad {
  constructor(a = {}) {
    const {filename:b = $c, destination:c = nc} = a;
    this.c = b;
    "string" == typeof c ? (Yc(T(c, "file.dat")), this.a = () => c) : this.a = c;
  }
  async _handleFile(a, b) {
    const c = await this.a(a, b);
    a = await this.c(a, b);
    const d = T(c, a), e = zc(d);
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
    await Xc(a);
  }
}
;const bd = (a, b) => {
  b.once("error", c => {
    a.emit("error", c);
  });
  return b;
};
class cd extends hb {
  constructor(a) {
    const {binary:b = !1, rs:c = null, ...d} = a || {}, {aa:e = Pc(!0), proxyError:f} = a || {}, g = (h, k) => e(k);
    super(d);
    this.a = [];
    this.Y = new Promise((h, k) => {
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
          const m = Nc(l.stack);
          l.stack = m;
          f && g`${l}`;
        }
        k(l);
      });
      c && bd(this, c).pipe(this);
    });
  }
  _write(a, b, c) {
    this.a.push(a);
    c();
  }
  get c() {
    return this.Y;
  }
}
const dd = async a => {
  ({c:a} = new cd({rs:a, binary:!0, aa:Pc(!0)}));
  return await a;
};
class ed {
  async _handleFile(a, b) {
    a = await dd(b.stream);
    return {buffer:a, size:a.length};
  }
  async _removeFile(a, b) {
    delete b.buffer;
    return null;
  }
}
;function fd() {
  return !0;
}
function gd(a, b, c) {
  const d = a.fileFilter, e = {};
  b.forEach(({maxCount:f = Infinity, name:g}) => {
    e[g] = f;
  });
  return {limits:a.limits, preservePath:a.preservePath, storage:a.storage, fileFilter:function(f, g) {
    if (0 >= (e[g.fieldname] || 0)) {
      throw R("LIMIT_UNEXPECTED_FILE", g.fieldname);
    }
    --e[g.fieldname];
    return d(f, g);
  }, V:c};
}
class hd {
  constructor(a = {}) {
    const {storage:b, dest:c, limits:d = {}, preservePath:e = !1, fileFilter:f = fd} = a;
    b ? this.storage = b : c ? this.storage = new ad({destination:c}) : this.storage = new ed;
    this.limits = d;
    this.preservePath = e;
    this.fileFilter = f;
  }
  single(a) {
    a = gd(this, [{name:a, maxCount:1}], "VALUE");
    return kc(a);
  }
  array(a, b) {
    a = gd(this, [{name:a, maxCount:b}], "ARRAY");
    return kc(a);
  }
  fields(a) {
    a = gd(this, a, "OBJECT");
    return kc(a);
  }
  none() {
    const a = gd(this, [], "NONE");
    return kc(a);
  }
  any() {
    return kc({limits:this.limits, preservePath:this.preservePath, storage:this.storage, fileFilter:this.fileFilter, V:"ARRAY"});
  }
}
;/*
 resolve-path
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2015-2018 Douglas Christopher Wilson
 MIT Licensed
*/
const id = /(?:^|[\\/])\.\.(?:[\\/]|$)/;
function jd(a, b) {
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
    throw y(400, "Malicious Path");
  }
  if (rc(c)) {
    throw y(400, "Malicious Path");
  }
  if (id.test(sc("." + wc + c))) {
    throw y(403);
  }
  return sc(T(vc(d), c));
}
;const kd = async(...a) => await U(Ac, ...a), ld = async(...a) => await U(Fc, ...a), md = L("koa-send");
async function nd(a, b, c = {}) {
  z(a, "koa context required");
  z(b, "pathname required");
  md('send "%s" %j', b, c);
  var d = c.root ? sc(vc(c.root)) : "", e = "/" == b[b.length - 1];
  b = b.substr(tc(b).root.length);
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
  } catch (u) {
    b = -1;
  }
  if (-1 == b) {
    return a.throw(400, "failed to decode");
  }
  f && e && (b += f);
  b = jd(d, b);
  if (!(e = k)) {
    a: {
      d = b.substr(d.length).split(wc);
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
    "br" == a.acceptsEncodings("br", "identity") && p && await kd(b + ".br") ? (b += ".br", a.set("Content-Encoding", "br"), a.res.removeHeader("Content-Length"), d = ".br") : "gzip" == a.acceptsEncodings("gzip", "identity") && n && await kd(b + ".gz") && (b += ".gz", a.set("Content-Encoding", "gzip"), a.res.removeHeader("Content-Length"), d = ".gz");
    if (m && !/\.[^/]*$/.exec(b)) {
      for (m = [].concat(m), p = 0; p < m.length; p++) {
        n = m[p];
        if ("string" !== typeof n) {
          throw new TypeError("option extensions must be array of strings or false");
        }
        /^\./.exec(n) || (n = "." + n);
        if (await kd(b + n)) {
          b += n;
          break;
        }
      }
    }
    try {
      var q = await ld(b);
      if (q.isDirectory()) {
        if (l && f) {
          b += "/" + f, q = await ld(b);
        } else {
          return;
        }
      }
    } catch (u) {
      if (["ENOENT", "ENAMETOOLONG", "ENOTDIR"].includes(u.code)) {
        throw y(404, u);
      }
      u.status = 500;
      throw u;
    }
    c && c(a.res, b, q);
    a.set("Content-Length", q.size);
    a.response.get("Last-Modified") || a.set("Last-Modified", q.mtime.toUTCString());
    a.response.get("Cache-Control") || (f = ["max-age=" + (g / 1000 | 0)], h && f.push("immutable"), a.set("Cache-Control", f.join(",")));
    a.type || (h = b, h = "" !== d ? qc(oc(h, d)) : qc(h), a.type = h);
    a.body = yc(b);
    return b;
  }
}
;const od = L("koa-static");
var pd = (a, b = {}) => {
  z(a, "root directory is required to serve files");
  od('static "%s" %j', a, b);
  b.root = vc(a);
  !1 !== b.index && (b.index = b.index || "index.html");
  return b.defer ? async(c, d) => {
    await d();
    if (("HEAD" == c.method || "GET" == c.method) && null == c.body && 404 == c.status) {
      try {
        await nd(c, c.path, b);
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
        e = await nd(c, c.path, b);
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
const qd = require("mime-db"), rd = /^text\/|\+(?:json|text|xml)$/i, sd = /^\s*([^;\s]*)(?:;|\s|$)/;
function td(a) {
  if (!a || "string" != typeof a) {
    return !1;
  }
  a = (a = sd.exec(a)) && a[1].toLowerCase();
  const b = qd[a];
  return b && void 0 !== b.compressible ? b.compressible : rd.test(a) || null;
}
;/*
 MIT
 Jonathan Ong
 https://npmjs.org/koa-is-json
*/
function ud(a) {
  return !a || "string" == typeof a || "function" == typeof a.pipe || Buffer.isBuffer(a) ? !1 : !0;
}
;const vd = zlib.Z_SYNC_FLUSH;
const wd = /(?:\.0*|(\.[^0]+)0+)$/, V = {na:1, ga:1024, ha:1048576, fa:1073741824, ka:Math.pow(1024, 4), ja:Math.pow(1024, 5)};
var xd = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
function yd(a) {
  if ("string" == typeof a) {
    if ("number" !== typeof a || isNaN(a)) {
      if ("string" !== typeof a) {
        a = null;
      } else {
        var b = xd.exec(a);
        b ? (a = parseFloat(b[1]), b = b[4].toLowerCase()) : (a = parseInt(a, 10), b = "b");
        a = Math.floor(V[b] * a);
      }
    }
  } else {
    if ("number" == typeof a) {
      if (Number.isFinite(a)) {
        var c = Math.abs(a);
        b = "", b = c >= V.ja ? "PB" : c >= V.ka ? "TB" : c >= V.fa ? "GB" : c >= V.ha ? "MB" : c >= V.ga ? "KB" : "B";
        a = (a / V[b.toLowerCase()]).toFixed(2);
        a = a.replace(wd, "$1");
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
;const zd = {gzip:zlib.createGzip, deflate:zlib.createDeflate};
function Ad(a = {}) {
  let {filter:b = td, threshold:c = 1024} = a;
  "string" == typeof c && (c = yd(c));
  return async function(d, e) {
    d.vary("Accept-Encoding");
    await e();
    ({body:e} = d);
    if (e && !d.res.headersSent && d.writable && !1 !== d.compress && "HEAD" != d.request.method && !ha[d.response.status] && !d.response.get("Content-Encoding") && (!0 === d.compress || b(d.response.type))) {
      var f = d.acceptsEncodings("gzip", "deflate", "identity");
      f || d.throw(406, "supported encodings: gzip, deflate, identity");
      "identity" != f && (ud(e) && (e = d.body = JSON.stringify(e)), c && d.response.length < c || (d.set("Content-Encoding", f), d.res.removeHeader("Content-Length"), d = d.body = zd[f](a), e instanceof fb ? e.pipe(d) : d.end(e)));
    }
  };
}
;const Bd = {["static"](a, b, {root:c = [], maxage:d, mount:e}) {
  a = (Array.isArray(c) ? c : [c]).map(f => pd(f, {maxage:d, ...b}));
  a = aa(a);
  return e ? Ha(e, a) : a;
}, ["compress"](a, b, {threshold:c = 1024}) {
  return Ad({threshold:c, flush:vd, ...b});
}, ["session"](a, b, {keys:c}) {
  if (!(c instanceof Na || Array.isArray(c))) {
    throw Error("Keys must be an array or an instance of Keygrip / child classes.");
  }
  a.keys = c;
  return Za(b);
}, ["cors"](a, b, {origin:c}) {
  a = Array.isArray(c) ? d => {
    const e = d.get("Origin");
    return c.find(f => f == e);
  } : c;
  return eb({origin:a, ...b});
}, ["form"](a, b) {
  return new hd(b);
}};
async function Cd(a, b, c) {
  if ("function" == typeof b) {
    return c.use(b), b;
  }
  const {use:d, config:e = {}, middlewareConstructor:f, ...g} = b;
  if (a in Bd) {
    b = Bd[a];
  } else {
    if (f) {
      if (b = f, "function" != typeof b) {
        throw Error(`Expecting a function in the "middlewareConstructor" of the ${a} middleware.`);
      }
    } else {
      throw Error(`Unknown middleware config item "${a}". Either specify one from the idio bundle, or pass the "middlewareConstructor" property.`);
    }
  }
  a = await b(c, e, g);
  d && c.use(a);
  return a;
}
async function Dd(a, b) {
  return await Object.keys(a).reduce(async(c, d) => {
    c = await c;
    var e = a[d];
    Array.isArray(e) ? (e = e.map(async f => {
      await Cd(d, f, b);
    }), e = await Promise.all(e)) : e = await Cd(d, e, b);
    return {...c, [d]:e};
  }, {});
}
;/*
 MIT 2014 Jordan Harband
 https://github.com/ljharb/is-generator-function
*/
const Ed = Object.prototype.toString, Fd = Function.prototype.toString, Gd = /^\s*(?:function)?\*/, Hd = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, Id = Object.getPrototypeOf;
var Jd;
a: {
  if (Hd) {
    try {
      Jd = Function("return function*() {}")();
      break a;
    } catch (a) {
    }
    Jd = void 0;
  } else {
    Jd = !1;
  }
}
const Kd = Jd, Ld = Kd ? Id(Kd) : {};
const Md = http.METHODS, Nd = http.OutgoingMessage, Od = http.createServer;
/*
 ee-first
 Copyright(c) 2014 Jonathan Ong
 MIT Licensed
*/
function Pd(a, b) {
  function c() {
    d();
    b.apply(null, arguments);
  }
  function d() {
    for (var n, q = 0; q < f.length; q++) {
      n = f[q], n.$.removeListener(n.event, n.ea);
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
      var m = h[l], p = Qd(m, c);
      k.on(m, p);
      f.push({$:k, event:m, ea:p});
    }
  }
  e.cancel = d;
  return e;
}
function Qd(a, b) {
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
function Rd(a, b) {
  var c = a.socket;
  c = "boolean" == typeof a.finished ? !!(a.finished || c && !c.writable) : "boolean" == typeof a.complete ? !(!a.upgrade && c && c.readable && (!a.complete || a.readable)) : void 0;
  !1 !== c ? setImmediate(b, null, a) : (c = a.__onFinished, c && c.K || (c = a.__onFinished = Sd(a), Td(a, c)), c.K.push(b));
}
function Td(a, b) {
  function c(h) {
    g.cancel();
    e.cancel();
    f = !0;
    b(h);
  }
  function d(h) {
    a.removeListener("socket", d);
    f || g === e && (e = Pd([[h, "error", "close"]], c));
  }
  var e, f = !1;
  var g = e = Pd([[a, "end", "finish"]], c);
  if (a.socket) {
    d(a.socket);
  } else {
    a.on("socket", d);
  }
}
function Sd(a) {
  function b(c) {
    a.__onFinished === b && (a.__onFinished = null);
    if (b.K) {
      var d = b.K;
      b.K = null;
      for (var e = 0; e < d.length; e++) {
        d[e](c, a);
      }
    }
  }
  b.K = [];
  return b;
}
;/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 https://npmjs.org/destroy
*/
function Ud(a) {
  if (a instanceof xc) {
    a.destroy();
    if ("function" == typeof a.close) {
      a.on("open", Vd);
    }
    return a;
  }
  if (!(a instanceof fb)) {
    return a;
  }
  "function" == typeof a.destroy && a.destroy();
  return a;
}
function Vd() {
  "number" == typeof this.fd && this.close();
}
;/*
 MIT
 Copyright (c) 2014 Jonathan Ong <me@jongleberry.com>
 Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com>
 https://npmjs.com/package/mime-types
*/
const Wd = require("mime-db"), Xd = /^\s*([^;\s]*)(?:;|\s|$)/, Yd = /^text\//i, Zd = Object.create(null), X = Object.create(null);
$d();
function ae(a) {
  return a && "string" == typeof a ? (a = qc("x." + a).toLowerCase().substr(1)) ? X[a] || !1 : !1 : !1;
}
function $d() {
  const a = ["nginx", "apache", void 0, "iana"];
  Object.keys(Wd).forEach(b => {
    const c = Wd[b], d = c.extensions;
    if (d && d.length) {
      Zd[b] = d;
      for (let e = 0; e < d.length; e++) {
        const f = d[e];
        if (X[f]) {
          const g = a.indexOf(Wd[X[f]].source), h = a.indexOf(c.source);
          if ("application/octet-stream" != X[f] && (g > h || g == h && "application/" == X[f].substr(0, 12))) {
            continue;
          }
        }
        X[f] = b;
      }
    }
  });
}
;/*
 MIT content-type
 2015 Douglas Christopher Wilson
*/
const be = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g, ce = /\\([\u000b\u0020-\u00ff])/g, de = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
function ee(a) {
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
  if (!de.test(c)) {
    throw new TypeError("invalid media type");
  }
  c = new fe(c.toLowerCase());
  if (-1 != b) {
    let e;
    var d;
    for (be.lastIndex = b; d = be.exec(a);) {
      if (d.index !== b) {
        throw new TypeError("invalid parameter format");
      }
      b += d[0].length;
      e = d[1].toLowerCase();
      d = d[2];
      '"' == d[0] && (d = d.substr(1, d.length - 2).replace(ce, "$1"));
      c.parameters[e] = d;
    }
    if (b != a.length) {
      throw new TypeError("invalid parameter format");
    }
  }
  return c;
}
class fe {
  constructor(a) {
    this.parameters = {};
    this.type = a;
  }
}
;/*
 MIT media-typer
 2014-2017 Douglas Christopher Wilson
*/
const ge = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;
/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2015 Douglas Christopher Wilson
 https://npmjs.org/type-is
*/
function he(a, b) {
  var c = [];
  if ("string" != typeof a) {
    var d = null;
  } else {
    try {
      var {type:e} = ee(a);
      if (!e) {
        throw new TypeError("argument string is required");
      }
      if ("string" != typeof e) {
        throw new TypeError("argument string is required to be a string");
      }
      d = ge.test(e.toLowerCase()) ? e : null;
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
    var f = ie(d = b[c]);
    !1 === f ? e = !1 : (e = a.split("/"), f = f.split("/"), e = 2 != e.length || 2 != f.length || "*" != f[0] && f[0] != e[0] ? !1 : "*+" == f[1].substr(0, 2) ? f[1].length <= e[1].length + 1 && f[1].substr(1) == e[1].substr(1 - f[1].length) : "*" != f[1] && f[1] != e[1] ? !1 : !0);
    if (e) {
      return "+" == d[0] || -1 !== d.indexOf("*") ? a : d;
    }
  }
  return !1;
}
function je(a, b, ...c) {
  var d = a.headers;
  d = void 0 !== d["transfer-encoding"] || !isNaN(d["content-length"]);
  if (!d) {
    return null;
  }
  2 < arguments.length && (b = [b, ...c]);
  return he(a.headers["content-type"], b);
}
function ie(a) {
  if ("string" != typeof a) {
    return !1;
  }
  switch(a) {
    case "urlencoded":
      return "application/x-www-form-urlencoded";
    case "multipart":
      return "multipart/*";
  }
  return "+" == a[0] ? "*/*" + a : -1 == a.indexOf("/") ? ae(a) : a;
}
;/*
 content-disposition
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
var ke = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g, le = /%[0-9A-Fa-f]{2}/, me = /[^\x20-\x7e\xa0-\xff]/g, ne = /([\\"])/g, oe = /^[\x20-\x7e\x80-\xff]+$/, pe = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/;
function qe(a, b = {}) {
  const {type:c = "attachment", fallback:d = !0} = b;
  a = re(a, d);
  return se(new te(c, a));
}
function re(a, b = !0) {
  if (void 0 !== a) {
    var c = {};
    if ("string" != typeof a) {
      throw new TypeError("filename must be a string");
    }
    if ("string" != typeof b && "boolean" != typeof b) {
      throw new TypeError("fallback must be a string or boolean");
    }
    if ("string" == typeof b && me.test(b)) {
      throw new TypeError("fallback must be ISO-8859-1 string");
    }
    a = oc(a);
    var d = oe.test(a);
    b = "string" != typeof b ? b && String(a).replace(me, "?") : oc(b);
    var e = "string" == typeof b && b != a;
    if (e || !d || le.test(a)) {
      c["filename*"] = a;
    }
    if (d || e) {
      c.filename = e ? b : a;
    }
    return c;
  }
}
function se({parameters:a, type:b}) {
  if ("string" != typeof b || !pe.test(b)) {
    throw new TypeError("invalid type");
  }
  b = `${b}`.toLowerCase();
  if (a && "object" == typeof a) {
    let c;
    const d = Object.keys(a).sort();
    for (let e = 0; e < d.length; e++) {
      c = d[e];
      const f = "*" == c.substr(-1) ? "UTF-8''" + encodeURIComponent(String(a[c])).replace(ke, ue) : '"' + String(a[c]).replace(ne, "\\$1") + '"';
      b += "; " + c + "=" + f;
    }
  }
  return b;
}
function ue(a) {
  return "%" + String(a).charCodeAt(0).toString(16).toUpperCase();
}
class te {
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
function ve(a, b) {
  if (a instanceof fb && !a.listeners("error").includes(b)) {
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
function we(a, b, c) {
  a.cache.set(b, c);
  a.size++;
  a.size >= a.max && (a.size = 0, a.a = a.cache, a.cache = new Map);
}
class xe {
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
      return d.A && c() > d.A ? (d.A = 0, d.value = void 0) : void 0 !== b && (a = b ? c() + b : 0, d.A = a), d.value;
    }
    if (d = this.a.get(a)) {
      return d.A && c() > d.A ? (d.A = 0, d.value = void 0) : (we(this, a, d), void 0 !== b && (a = b ? c() + b : 0, d.A = a)), d.value;
    }
  }
  set(a, b, c = {}) {
    c = (c = c.maxAge) ? Date.now() + c : 0;
    let d = this.cache.get(a);
    d ? (d.A = c, d.value = b) : (d = {value:b, A:c}, we(this, a, d));
  }
  keys() {
    function a(d) {
      const e = d[0], f = d[1];
      (d[1].value && !d[1].A || f.A >= c) && b.add(e);
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
const ye = new xe(100);
/*
 escape-html
 Copyright(c) 2012-2013 TJ Holowaychuk
 Copyright(c) 2015 Andreas Lubbe
 Copyright(c) 2015 Tiancheng "Timothy" Gu
 MIT Licensed
*/
var ze = /["'&<>]/;
const Ae = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, Be = /^(?:lax|strict)$/i;
function Ce(a) {
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
class De {
  constructor(a, b, c) {
    this.path = "/";
    this.maxAge = this.domain = this.expires = void 0;
    this.httpOnly = !0;
    this.overwrite = this.secure = this.sameSite = !1;
    if (!Ae.test(a)) {
      throw new TypeError("argument name is invalid");
    }
    if (b && !Ae.test(b)) {
      throw new TypeError("argument value is invalid");
    }
    b || (this.expires = new Date(0));
    this.name = a;
    this.value = b || "";
    for (let d in c) {
      this[d] = c[d];
    }
    if (this.path && !Ae.test(this.path)) {
      throw new TypeError("option path is invalid");
    }
    if (this.domain && !Ae.test(this.domain)) {
      throw new TypeError("option domain is invalid");
    }
    if (this.sameSite && !0 !== this.sameSite && !Be.test(this.sameSite)) {
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
const Ee = {};
class Fe {
  constructor(a, b, c) {
    this.secure = void 0;
    this.request = a;
    this.a = b;
    c && (this.keys = Array.isArray(c.keys) ? new Na(c.keys) : c.keys, this.secure = c.secure);
  }
  get(a, b) {
    const c = `${a}.sig`;
    var d;
    const e = b && void 0 !== b.signed ? b.signed : !!this.keys;
    if (d = this.request.headers.cookie) {
      if (d = d.match(Ee[a] ? Ee[a] : Ee[a] = new RegExp("(?:^|;) *" + a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "=([^;]*)"))) {
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
    const d = this.a;
    var e = this.request;
    let f = d.getHeader("Set-Cookie") || [];
    "string" == typeof f && (f = [f]);
    var g = e.protocol;
    e = e.connection.encrypted;
    g = void 0 !== this.secure ? !!this.secure : "https" == g || e;
    const {signed:h = !!this.keys, ...k} = c;
    a = new De(a, b, k);
    if (!g && c.secure) {
      throw Error("Cannot send secure cookie over unencrypted connection");
    }
    a.secure = g;
    "secure" in c || (a.secure = g);
    Ge(f, a);
    if (c && h) {
      if (!this.keys) {
        throw Error(".keys required for signed cookies");
      }
      a.value = this.keys.sign(a.toString());
      a.name += ".sig";
      Ge(f, a);
    }
    (d.set ? Nd.prototype.setHeader : d.setHeader).call(d, "Set-Cookie", f);
    return this;
  }
}
function Ge(a, b) {
  if (b.overwrite) {
    for (var c = a.length - 1; 0 <= c; c--) {
      0 === a[c].indexOf(b.name + "=") && a.splice(c, 1);
    }
  }
  a.push(Ce(b));
}
;const He = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function Ie(a) {
  return a.split(",").map((b, c) => {
    var d = He.exec(b.trim());
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
      c = {charset:b, q:e, s:c};
    } else {
      c = null;
    }
    if (c) {
      return c;
    }
  }).filter(Boolean);
}
function Je(a, b) {
  const c = Ie(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(Ke).sort(Le).map(Me);
  }
  const d = b.map((e, f) => {
    {
      let h = {l:-1, q:0, m:0};
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
          g = {s:f, m:l, l:g.s, q:g.q};
        }
        g && 0 > (h.m - g.m || h.q - g.q || h.l - g.l) && (h = g);
      }
      e = h;
    }
    return e;
  });
  return d.filter(Ke).sort(Le).map(e => b[d.indexOf(e)]);
}
function Le(a, b) {
  return b.q - a.q || b.m - a.m || a.l - b.l || a.s - b.s || 0;
}
function Me(a) {
  return a.charset;
}
function Ke(a) {
  return 0 < a.q;
}
;const Ne = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function Oe(a) {
  a = a.split(",");
  for (var b = !1, c = 1, d = 0, e = 0; d < a.length; d++) {
    var f = d;
    var g = Ne.exec(a[d].trim());
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
      f = {encoding:h, q:k, s:f};
    } else {
      f = null;
    }
    f && (a[e++] = f, b = b || Pe("identity", f, void 0), c = Math.min(c, f.q || 1));
  }
  b || (a[e++] = {encoding:"identity", q:c, s:d});
  a.length = e;
  return a;
}
function Pe(a, b, c) {
  var d = 0;
  if (b.encoding.toLowerCase() === a.toLowerCase()) {
    d |= 1;
  } else {
    if ("*" !== b.encoding) {
      return null;
    }
  }
  return {s:c, l:b.s, q:b.q, m:d};
}
function Qe(a, b) {
  var c = Oe(a || "");
  if (!b) {
    return c.filter(Re).sort(Se).map(Te);
  }
  var d = b.map(function(e, f) {
    for (var g = {l:-1, q:0, m:0}, h = 0; h < c.length; h++) {
      var k = Pe(e, c[h], f);
      k && 0 > (g.m - k.m || g.q - k.q || g.l - k.l) && (g = k);
    }
    return g;
  });
  return d.filter(Re).sort(Se).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function Se(a, b) {
  return b.q - a.q || b.m - a.m || a.l - b.l || a.s - b.s || 0;
}
function Te(a) {
  return a.encoding;
}
function Re(a) {
  return 0 < a.q;
}
;const Ue = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
function Ve(a) {
  a = a.split(",");
  for (var b = 0, c = 0; b < a.length; b++) {
    var d = We(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function We(a, b) {
  var c = Ue.exec(a);
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
  return {prefix:a, J:d, q:f, s:b, I:e};
}
function Xe(a, b) {
  var c = Ve(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(Ye).sort(Ze).map($e);
  }
  var d = b.map(function(e, f) {
    for (var g = {l:-1, q:0, m:0}, h = 0; h < c.length; h++) {
      a: {
        var k = c[h];
        var l = f, m = We(e, void 0);
        if (m) {
          var p = 0;
          if (k.I.toLowerCase() === m.I.toLowerCase()) {
            p |= 4;
          } else {
            if (k.prefix.toLowerCase() === m.I.toLowerCase()) {
              p |= 2;
            } else {
              if (k.I.toLowerCase() === m.prefix.toLowerCase()) {
                p |= 1;
              } else {
                if ("*" !== k.I) {
                  k = null;
                  break a;
                }
              }
            }
          }
          k = {s:l, l:k.s, q:k.q, m:p};
        } else {
          k = null;
        }
      }
      k && 0 > (g.m - k.m || g.q - k.q || g.l - k.l) && (g = k);
    }
    return g;
  });
  return d.filter(Ye).sort(Ze).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function Ze(a, b) {
  return b.q - a.q || b.m - a.m || a.l - b.l || a.s - b.s || 0;
}
function $e(a) {
  return a.I;
}
function Ye(a) {
  return 0 < a.q;
}
;const af = /^\s*([^s/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
function bf(a) {
  a = a.split(",");
  for (var b = 1, c = 0; b < a.length; b++) {
    0 == cf(a[c]) % 2 ? a[++c] = a[b] : a[c] += "," + a[b];
  }
  a.length = c + 1;
  for (c = b = 0; b < a.length; b++) {
    var d = df(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function df(a, b) {
  var c = af.exec(a);
  if (!c) {
    return null;
  }
  a = Object.create(null);
  var d = 1, e = c[2], f = c[1];
  if (c[3]) {
    c = c[3].split(";");
    for (var g = 1, h = 0; g < c.length; g++) {
      0 == cf(c[h]) % 2 ? c[++h] = c[g] : c[h] += ";" + c[g];
    }
    c.length = h + 1;
    for (g = 0; g < c.length; g++) {
      c[g] = c[g].trim();
    }
    c = c.map(ef);
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
  return {type:f, M:e, params:a, q:d, s:b};
}
function ff(a, b, c) {
  var d = df(a, void 0);
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
  if (b.M.toLowerCase() == d.M.toLowerCase()) {
    a |= 2;
  } else {
    if ("*" != b.M) {
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
  return {s:c, l:b.s, q:b.q, m:a};
}
function gf(a, b) {
  var c = bf(void 0 === a ? "*/*" : a || "");
  if (!b) {
    return c.filter(hf).sort(jf).map(kf);
  }
  var d = b.map(function(e, f) {
    for (var g = {l:-1, q:0, m:0}, h = 0; h < c.length; h++) {
      var k = ff(e, c[h], f);
      k && 0 > (g.m - k.m || g.q - k.q || g.l - k.l) && (g = k);
    }
    return g;
  });
  return d.filter(hf).sort(jf).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function jf(a, b) {
  return b.q - a.q || b.m - a.m || a.l - b.l || a.s - b.s || 0;
}
function kf(a) {
  return a.type + "/" + a.M;
}
function hf(a) {
  return 0 < a.q;
}
function cf(a) {
  for (var b = 0, c = 0; -1 !== (c = a.indexOf('"', c));) {
    b++, c++;
  }
  return b;
}
function ef(a) {
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
class lf {
  constructor(a) {
    this.request = a;
    this.headers = this.request.headers;
  }
  charset(a) {
    return (a = this.charsets(a)) && a[0];
  }
  charsets(a) {
    return Je(this.headers["accept-charset"], a);
  }
  encoding(a) {
    return (a = this.encodings(a)) && a[0];
  }
  encodings(a) {
    return Qe(this.headers["accept-encoding"], a);
  }
  language(a) {
    return (a = this.languages(a)) && a[0];
  }
  languages(a) {
    return Xe(this.headers["accept-language"], a);
  }
  mediaType(a) {
    return (a = this.mediaTypes(a)) && a[0];
  }
  mediaTypes(a) {
    return gf(this.headers.accept, a);
  }
}
;/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2015 Douglas Christopher Wilson
 https://npmjs.org/accepts
*/
class mf {
  constructor(a) {
    this.headers = a.headers;
    this.a = new lf(a);
  }
  types(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    if (!a || 0 == a.length) {
      return this.a.mediaTypes();
    }
    if (!this.headers.accept) {
      return a[0];
    }
    b = a.map(nf);
    var c = this.a.mediaTypes(b.filter(of));
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
function nf(a) {
  return -1 == a.indexOf("/") ? ae(a) : a;
}
function of(a) {
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
function pf(a, b) {
  var c = a.a, d = a.target;
  a.g.push(b);
  c.__defineSetter__(b, function(e) {
    return this[d][b] = e;
  });
  return a;
}
class qf {
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
    return pf(Y(this, a), a);
  }
}
;/*
 MIT jshttp/http-assert
*/
function rf(a, b, c, d) {
  if (!a) {
    throw y(b, c, d);
  }
}
;const sf = url.URL, tf = url.Url, uf = url.format, vf = url.parse;
const wf = net.isIP;
const xf = querystring.parse, yf = querystring.stringify;
/*
 parseurl
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
function zf(a) {
  var b = a.url;
  if (void 0 !== b) {
    var c = a._parsedUrl;
    if ("object" === typeof c && null !== c && (void 0 === tf || c instanceof tf) && c._raw === b) {
      return c;
    }
    a: {
      if ("string" !== typeof b || 47 !== b.charCodeAt(0)) {
        c = vf(b);
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
              c = vf(b);
              break a;
          }
        }
        f = void 0 !== tf ? new tf : {};
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
var Af = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;
function Bf(a, b) {
  var c = a["if-modified-since"], d = a["if-none-match"];
  if (!c && !d || (a = a["cache-control"]) && Af.test(a)) {
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
  return !c || (b = b["last-modified"], b && Cf(b) <= Cf(c)) ? !0 : !1;
}
function Cf(a) {
  a = a && Date.parse(a);
  return "number" === typeof a ? a : NaN;
}
;const Df = Symbol("context#ip");
class Ef {
  constructor() {
    this.res = this.req = this.response = this.ctx = this.app = null;
    this.originalUrl = "";
    this.g = {};
    this.c = this.a = null;
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
    return zf(this.req).pathname;
  }
  set path(a) {
    const b = zf(this.req);
    b.pathname !== a && (b.pathname = a, b.path = null, this.url = uf(b));
  }
  get query() {
    const a = this.querystring, b = this.g = this.g || {};
    return b[a] || (b[a] = xf(a));
  }
  set query(a) {
    this.querystring = yf(a);
  }
  get querystring() {
    return this.req ? zf(this.req).query || "" : "";
  }
  set querystring(a) {
    const b = zf(this.req);
    b.search !== `?${a}` && (b.search = a, b.path = null, this.url = uf(b));
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
    if (!this.a) {
      const a = this.originalUrl || "";
      try {
        this.a = new sf(`${this.origin}${a}`);
      } catch (b) {
        this.a = Object.create(null);
      }
    }
    return this.a;
  }
  get fresh() {
    const a = this.method, b = this.ctx.status;
    return "GET" != a && "HEAD" != a ? !1 : 200 <= b && 300 > b || 304 == b ? Bf(this.header, this.response.header) : !1;
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
      const {parameters:a} = ee(this.req);
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
    this[Df] || (this[Df] = this.ips[0] || this.socket.remoteAddress || "");
    return this[Df];
  }
  set ip(a) {
    this[Df] = a;
  }
  get subdomains() {
    const a = this.app.subdomainOffset, b = this.hostname;
    return wf(b) ? [] : b.split(".").reverse().slice(a);
  }
  get accept() {
    return this.c || (this.c = new mf(this.req));
  }
  set accept(a) {
    this.c = a;
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
      return je(this.req);
    }
    Array.isArray(a) || (a = [a, ...b]);
    return je(this.req, a);
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
  [A.custom]() {
    return this.inspect();
  }
}
;const Ff = Symbol("context#cookies");
class Gf {
  constructor() {
    this.state = this.originalUrl = this.res = this.req = this.response = this.request = this.app = null;
    this[Ff] = null;
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
    return rf;
  }
  throw(...a) {
    throw y(...a);
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
        "number" == typeof a.status && w[a.status] || (a.status = 500);
        b = w[a.status];
        b = a.expose ? a.message : b;
        this.status = a.status;
        this.length = Buffer.byteLength(b);
        c.end(b);
      }
    }
  }
  get cookies() {
    this[Ff] || (this[Ff] = new Fe(this.req, this.res, {keys:this.app.keys, secure:this.request.secure}));
    return this[Ff];
  }
  set cookies(a) {
    this[Ff] = a;
  }
  [A.custom]() {
    return this.inspect();
  }
}
Y(Y((new qf(Gf.prototype, "response")).method("attachment").method("redirect").method("remove").method("vary").method("set").method("append").method("flushHeaders").access("status").access("message").access("body").access("length").access("type").access("lastModified").access("etag"), "headerSent"), "writable");
Y(Y(Y(Y(Y(Y(Y(Y(Y(Y(Y(Y(Y(Y((new qf(Gf.prototype, "request")).method("acceptsLanguages").method("acceptsEncodings").method("acceptsCharsets").method("accepts").method("get").method("is").access("querystring").access("idempotent").access("socket").access("search").access("method").access("query").access("path").access("url").access("accept"), "origin"), "href"), "subdomains"), "protocol"), "host"), "hostname"), "URL"), "header"), "headers"), "secure"), "stale"), "fresh"), "ips"), "ip");
class Hf {
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
    this.headerSent || (z(Number.isInteger(a), "status code must be a number"), z(100 <= a && 999 >= a, `invalid status code: ${a}`), this.c = !0, this.res.statusCode = a, 2 > this.req.httpVersionMajor && (this.res.statusMessage = w[a]), this.body && ha[a] && (this.body = null));
  }
  get message() {
    return this.res.statusMessage || w[this.status];
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
      "string" == typeof a ? (c && (this.type = /^\s*</.test(a) ? "html" : "text"), this.length = Buffer.byteLength(a)) : Buffer.isBuffer(a) ? (c && (this.type = "bin"), this.length = a.length) : "function" == typeof a.pipe ? (Rd(this.res, Ud.bind(null, a)), ve(a, d => this.ctx.onerror(d)), null != b && b != a && this.remove("Content-Length"), c && (this.type = "bin")) : (this.remove("Content-Length"), this.type = "json");
    }
  }
  set length(a) {
    this.set("Content-Length", a);
  }
  get length() {
    const a = this.header["content-length"], b = this.body;
    return null == a ? b ? "string" == typeof b ? Buffer.byteLength(b) : Buffer.isBuffer(b) ? b.length : ud(b) ? Buffer.byteLength(JSON.stringify(b)) : null : null : Math.trunc(parseInt(a, 10)) || 0;
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
      var c = ze.exec(a);
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
    a && (this.type = qc(a));
    this.set("Content-Disposition", qe(a, b));
  }
  set type(a) {
    var b = ye.get(a);
    if (!b) {
      if (a && "string" == typeof a) {
        if (b = -1 == a.indexOf("/") ? ae(a) : a) {
          if (!b.includes("charset")) {
            var c;
            if (b && "string" == typeof b) {
              var d = (c = Xd.exec(b)) && Wd[c[1].toLowerCase()];
              c = d && d.charset ? d.charset : c && Yd.test(c[1]) ? "UTF-8" : !1;
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
      ye.set(a, b);
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
    return he(c, a);
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
  [A.custom]() {
    return this.inspect();
  }
}
;const If = L("@goa/koa:application");
async function Jf(a, b) {
  const c = a.res;
  c.statusCode = 404;
  Rd(c, d => a.onerror(d));
  try {
    return await b(a), Kf(a);
  } catch (d) {
    a.onerror(d);
  }
}
class Lf extends ib {
  constructor(a = {}) {
    const {proxy:b = !1, subdomainOffset:c = 2, env:d = process.env.NODE_ENV || "development", keys:e, Context:f = Gf} = a;
    super();
    this.proxy = b;
    this.silent = !1;
    this.middleware = [];
    this.subdomainOffset = c;
    this.env = d;
    this.context = Object.create(f.prototype);
    this.request = Object.create(Ef.prototype);
    this.response = Object.create(Hf.prototype);
    this.keys = e;
  }
  [A.custom]() {
    return this.inspect();
  }
  listen(...a) {
    If("listen");
    return Od(this.callback()).listen(...a);
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
    if ("function" != typeof a ? 0 : Gd.test(Fd.call(a)) || (Hd ? Id(a) == Ld : "[object GeneratorFunction]" == Ed.call(a))) {
      throw Error("Generator functions are not supported by @goa/koa. Use koa-convert on them first.");
    }
    If("use %s", a.ma || a.name || "-");
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
      return Jf(b, a);
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
function Kf(a) {
  if (0 != a.respond && a.writable) {
    var b = a.res, c = a.status, d = a.body;
    if (ha[c]) {
      return a.body = null, b.end();
    }
    if ("HEAD" == a.method) {
      return !b.headersSent && ud(d) && (a.length = Buffer.byteLength(JSON.stringify(d))), b.end();
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
    if (d instanceof fb) {
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
function Mf(a) {
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
function Nf(a, b = {}) {
  const c = Mf(a);
  ({qa:a = "./"} = b);
  b = `[^${Z(b.delimiter || "/#?")}]+?`;
  const d = [];
  let e = 0, f = 0, g = "";
  const h = q => {
    if (f < c.length && c[f].type === q) {
      return c[f++].value;
    }
  }, k = q => {
    const u = h(q);
    if (void 0 !== u) {
      return u;
    }
    const {type:v, index:t} = c[f];
    throw new TypeError(`Unexpected ${v} at ${t}, expected ${q}`);
  }, l = () => {
    let q = "", u;
    for (; u = h("CHAR") || h("ESCAPED_CHAR");) {
      q += u;
    }
    return q;
  };
  for (; f < c.length;) {
    var m = h("CHAR"), p = h("NAME"), n = h("PATTERN");
    if (p || n) {
      m = m || "", -1 === a.indexOf(m) && (g += m, m = ""), g && (d.push(g), g = ""), d.push({name:p || e++, prefix:m, J:"", pattern:n || b, w:h("MODIFIER") || ""});
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
          d.push({name:n || (m ? e++ : ""), pattern:n && !m ? b : m, prefix:p, J:q, w:h("MODIFIER") || ""});
        } else {
          k("END");
        }
      }
    }
  }
  return d;
}
function Of(a) {
  var b = {encode:encodeURIComponent};
  return Pf(Nf(a, b), b);
}
function Pf(a, b = {}) {
  const c = Qf(b), {encode:d = g => g, ua:e = !0} = b, f = a.map(g => {
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
            h += n.prefix + m + n.J;
          }
        } else {
          if ("string" === typeof k || "number" === typeof k) {
            k = d(String(k), n);
            if (e && !f[p].test(k)) {
              throw new TypeError(`Expected '${n.name}' to match '${n.pattern}', but got '${k}'`);
            }
            h += n.prefix + k + n.J;
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
function Z(a) {
  return a.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function Qf(a = {}) {
  return a.sensitive ? "" : "i";
}
function Rf(a, b, c) {
  a = a.map(d => Sf(d, b, c).source);
  return new RegExp(`(?:${a.join("|")})`, Qf(c));
}
function Tf(a, b, c = {}) {
  const {strict:d = !1, start:e = !0, end:f = !0, encode:g = m => m} = c, h = `[${Z(c.endsWith || "")}]|$`, k = `[${Z(c.delimiter || "/#?")}]`;
  let l = e ? "^" : "";
  for (const m of a) {
    if ("string" == typeof m) {
      l += Z(g(m));
    } else {
      const p = Z(g(m.prefix)), n = Z(g(m.J));
      m.pattern ? (b && b.push(m), l = p || n ? "+" == m.w || "*" == m.w ? l + `(?:${p}((?:${m.pattern})(?:${n}${p}(?:${m.pattern}))*)${n})${"*" == m.w ? "?" : ""}` : l + `(?:${p}(${m.pattern})${n})${m.w}` : l + `(${m.pattern})${m.w}`) : l += `(?:${p}${n})${m.w}`;
    }
  }
  f ? (d || (l += `${k}?`), l += c.endsWith ? `(?=${h})` : "$") : (a = a[a.length - 1], a = "string" === typeof a ? -1 < k.indexOf(a[a.length - 1]) : void 0 === a, d || (l += `(?:${k}(?=${h}))?`), a || (l += `(?=${k}|${h})`));
  return new RegExp(l, Qf(c));
}
function Sf(a, b, c) {
  if (a instanceof RegExp) {
    if (b && (c = a.source.match(/\((?!\?)/g))) {
      for (var d = 0; d < c.length; d++) {
        b.push({name:d, prefix:"", J:"", w:"", pattern:""});
      }
    }
  } else {
    Array.isArray(a) ? d = Rf(a, b, c) : d = Tf(Nf(a, c), b, c), a = d;
  }
  return a;
}
;const Uf = L("koa-router");
function Vf(a, b) {
  a.path && (a.path = b + a.path, a.paramNames = [], b = a.path, a.regexp = Sf("string" == typeof b ? b.replace(/\/$/, "") : b, a.paramNames, a.a));
}
class Wf {
  constructor(a, b, c, d = {}) {
    const {name:e = null} = d;
    this.a = d;
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
    this.regexp = Sf("string" == typeof a ? a.replace(/\/$/, "") : a, this.paramNames, this.a);
    Uf("defined route %s %s", this.methods, this.a.prefix + this.path);
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
  P(a) {
    return this.a.ignoreCaptures ? [] : a.match(this.regexp).slice(1);
  }
  url(a, b) {
    var c = a, d = this.path.replace(/\(\.\*\)/g, ""), e = Of(d);
    "object" != typeof a && (c = [...arguments], "object" == typeof c[c.length - 1] && (b = c[c.length - 1], c = c.slice(0, c.length - 1)));
    d = Nf(d);
    let f = {};
    if (Array.isArray(c)) {
      for (let g = d.length, h = 0, k = 0; h < g; h++) {
        d[h].name && (f[d[h].name] = c[k++]);
      }
    } else {
      d.some(g => g.name) ? f = a : b = a;
    }
    c = e(f);
    return b && b.query ? (e = b.query, e = "string" == typeof e ? e : yf(e), `${c}?${e}`) : c;
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
const Xf = L("@goa/router");
class Yf {
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
            "function" == typeof c ? h = c() : h = new y.NotImplemented;
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
                  "function" == typeof d ? h = d() : h = new y.MethodNotAllowed;
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
    const m = new Wf(a, b, c, {end:h, name:k, sensitive:l, strict:g, prefix:f, ignoreCaptures:e});
    this.opts.prefix && Vf(m, this.opts.prefix);
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
    const e = {path:[], W:[], route:!1};
    for (let f = c.length, g = 0; g < f; g++) {
      if (d = c[g], Xf("test %s %s", d.path, d.regexp), d.match(a) && (e.path.push(d), 0 == d.methods.length || d.methods.includes(b))) {
        e.W.push(d), d.methods.length && (e.route = !0);
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
      Vf(b, a);
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
        a && Vf(f, a);
        this.opts.prefix && Vf(f, this.opts.prefix);
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
      Xf("%s %s", b.method, b.path);
      const d = this.opts.routerPath || b.routerPath || b.path;
      var e = this.match(d, b.method);
      b.a ? b.a.push(e.path) : b.a = e.path;
      b.router = this;
      if (!e.route) {
        return c();
      }
      e = e.W;
      const f = e[e.length - 1];
      b._matchedRoute = f.path;
      f.name && (b._matchedRouteName = f.name);
      e = e.reduce((g, h) => {
        g.push((k, l) => {
          k.P = h.P(d);
          k.params = h.params(d, k.P, k.params);
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
Yf.url = function(a, ...b) {
  return Wf.prototype.url.apply({path:a}, b);
};
const Zf = Md.map(a => a.toLowerCase());
[...Zf, "all"].forEach(a => {
  function b(c, d, ...e) {
    "string" == typeof d || d instanceof RegExp || (e = [d, ...e], d = c, c = null);
    this.register(d, "all" == a ? Zf : [a], e, {name:c});
    return this;
  }
  Yf.prototype[a] = b;
  "delete" == a && (Yf.prototype.del = b);
});
class $f extends Gf {
  constructor() {
    super();
    this.sessionOptions = this.session = void 0;
    this.router = this.params = this._matchedRouteName = this._matchedRoute = this.compress = null;
  }
}
;const ag = a => {
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
const bg = async(a = {}, b = {}) => {
  const c = new Lf({Context:$f});
  a = await Dd(a, c);
  "production" == c.env && (c.proxy = !0);
  return {app:c, middleware:a, router:new Yf(b)};
};
function cg(a, b, c = "0.0.0.0") {
  const d = Pc(!0);
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
;module.exports = {_createApp:bg, _compose:aa, _startApp:async function(a = {}, b = {}) {
  const {port:c = 5000, host:d = "0.0.0.0", router:e} = b, f = () => {
    g.destroy().then(() => {
      process.kill(process.pid, "SIGUSR2");
    });
  };
  process.once("SIGUSR2", f);
  b = await bg(a, e);
  const g = b.app;
  a = b.middleware;
  b = b.router;
  const h = await cg(g, c, d);
  ag(h);
  g.destroy = async() => {
    await h.destroy();
    process.removeListener("SIGUSR2", f);
  };
  const {port:k} = h.address();
  return {app:g, middleware:a, url:`http://localhost:${k}`, server:h, router:b};
}, _httpErrors:y, _mount:Ha, _Keygrip:Na, _Router:Yf};


//# sourceMappingURL=idio.js.map