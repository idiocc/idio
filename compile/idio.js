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
const http = require('http');
const events = require('events');
const url = require('url');
const net = require('net');
const querystring = require('querystring');             
/*
 MIT
 (c) dead-horse
 https://npmjs.org/koa-compose
*/
function r(a) {
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
;var aa = {[100]:"Continue", [101]:"Switching Protocols", [102]:"Processing", [103]:"Early Hints", [200]:"OK", [201]:"Created", [202]:"Accepted", [203]:"Non-Authoritative Information", [204]:"No Content", [205]:"Reset Content", [206]:"Partial Content", [207]:"Multi-Status", [208]:"Already Reported", [226]:"IM Used", [300]:"Multiple Choices", [301]:"Moved Permanently", [302]:"Found", [303]:"See Other", [304]:"Not Modified", [305]:"Use Proxy", [306]:"(Unused)", [307]:"Temporary Redirect", [308]:"Permanent Redirect", 
[400]:"Bad Request", [401]:"Unauthorized", [402]:"Payment Required", [403]:"Forbidden", [404]:"Not Found", [405]:"Method Not Allowed", [406]:"Not Acceptable", [407]:"Proxy Authentication Required", [408]:"Request Timeout", [409]:"Conflict", [410]:"Gone", [411]:"Length Required", [412]:"Precondition Failed", [413]:"Payload Too Large", [414]:"URI Too Long", [415]:"Unsupported Media Type", [416]:"Range Not Satisfiable", [417]:"Expectation Failed", [418]:"I'm a teapot", [421]:"Misdirected Request", [422]:"Unprocessable Entity", 
[423]:"Locked", [424]:"Failed Dependency", [425]:"Unordered Collection", [426]:"Upgrade Required", [428]:"Precondition Required", [429]:"Too Many Requests", [431]:"Request Header Fields Too Large", [451]:"Unavailable For Legal Reasons", [500]:"Internal Server Error", [501]:"Not Implemented", [502]:"Bad Gateway", [503]:"Service Unavailable", [504]:"Gateway Timeout", [505]:"HTTP Version Not Supported", [506]:"Variant Also Negotiates", [507]:"Insufficient Storage", [508]:"Loop Detected", [509]:"Bandwidth Limit Exceeded", 
[510]:"Not Extended", [511]:"Network Authentication Required"};
/*
 statuses
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2016 Douglas Christopher Wilson
 MIT Licensed
*/
const ca = ba(), da = {[300]:!0, [301]:!0, [302]:!0, [303]:!0, [305]:!0, [307]:!0, [308]:!0}, t = {[204]:!0, [205]:!0, [304]:!0};
function ba() {
  var a = u;
  const b = [];
  Object.keys(aa).forEach(c => {
    const d = aa[c];
    c = Number(c);
    a[c] = d;
    a[d] = c;
    a[d.toLowerCase()] = c;
    b.push(c);
  });
  return b;
}
function u(a) {
  if ("number" == typeof a) {
    if (!u[a]) {
      throw Error("invalid status code: " + a);
    }
    return a;
  }
  if ("string" != typeof a) {
    throw new TypeError("code must be a number or string");
  }
  var b = parseInt(a, 10);
  if (!isNaN(b)) {
    if (!u[b]) {
      throw Error("invalid status code: " + b);
    }
    return b;
  }
  b = u[a.toLowerCase()];
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
function v(...a) {
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
  if ("number" != typeof d || !u[d] && (400 > d || 600 <= d)) {
    d = 500;
  }
  a = v[d] || v[Number(String(d).charAt(0) + "00")];
  b || (b = a ? new a(c) : Error(c || u[d]), Error.captureStackTrace(b, v));
  a && b instanceof a && b.status === d || (b.expose = 500 > d, b.status = b.statusCode = d);
  for (let f in e) {
    "status" != f && "statusCode" != f && (b[f] = e[f]);
  }
  return b;
}
class ea extends Error {
  constructor(a) {
    super();
    this.message = a;
    this.statusCode = this.status = null;
    this.expose = !1;
    this.headers = null;
  }
  set code(a) {
    this.statusCode = this.status = a;
    this.message || (this.message = u[a]);
  }
}
ca.forEach(a => {
  let b;
  const c = fa(u[a]), d = c.match(/Error$/) ? c : c + "Error";
  switch(Number(String(a).charAt(0) + "00")) {
    case 400:
      b = class extends ea {
        constructor(e) {
          super(e);
          this.code = a;
          this.name = d;
          this.expose = !0;
        }
      };
      break;
    case 500:
      b = class extends ea {
        constructor(e) {
          super(e);
          this.code = a;
          this.name = d;
          this.expose = !1;
        }
      };
  }
  b && (v[a] = b, v[c] = b);
}, {});
function fa(a) {
  return a.split(" ").map(function(b) {
    return b.charAt(0).toUpperCase() + b.slice(1);
  }).join("").replace(/[^ _0-9a-z]/gi, "");
}
;var w = assert;
const ha = assert.equal;
var ia = tty;
const x = util.format, z = util.inspect;
/*

 Copyright (c) 2016 Zeit, Inc.
 https://npmjs.org/ms
*/
function ja(a) {
  var b = {}, c = typeof a;
  if ("string" == c && 0 < a.length) {
    return ka(a);
  }
  if ("number" == c && isFinite(a)) {
    return b.R ? (b = Math.abs(a), a = 864E5 <= b ? A(a, b, 864E5, "day") : 36E5 <= b ? A(a, b, 36E5, "hour") : 6E4 <= b ? A(a, b, 6E4, "minute") : 1000 <= b ? A(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
  }
  throw Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(a));
}
function ka(a) {
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
function A(a, b, c, d) {
  return Math.round(a / c) + " " + d + (b >= 1.5 * c ? "s" : "");
}
;/*
 bytes
 Copyright(c) 2012-2014 TJ Holowaychuk
 Copyright(c) 2015 Jed Watson
 MIT Licensed
*/
const la = /\B(?=(\d{3})+(?!\d))/g, ma = /(?:\.0*|(\.[^0]+)0+)$/, B = {b:1, kb:1024, mb:1048576, gb:1073741824, tb:Math.pow(1024, 4), pb:Math.pow(1024, 5)};
function C(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), d = b && b.T || "", e = b && b.V || "", f = b && void 0 !== b.C ? b.C : 2, g = !(!b || !b.P);
  (b = b && b.U || "") && B[b.toLowerCase()] || (b = c >= B.pb ? "PB" : c >= B.tb ? "TB" : c >= B.gb ? "GB" : c >= B.mb ? "MB" : c >= B.kb ? "KB" : "B");
  a = (a / B[b.toLowerCase()]).toFixed(f);
  g || (a = a.replace(ma, "$1"));
  d && (a = a.replace(la, d));
  return a + e + b;
}
;/*
 diff package https://github.com/kpdecker/jsdiff
 BSD License
 Copyright (c) 2009-2015, Kevin Decker <kpdecker@gmail.com>
*/
const na = {black:30, red:31, green:32, yellow:33, blue:34, magenta:35, cyan:36, white:37, grey:90};
function D(a, b) {
  return (b = na[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var oa = {f:C, ["fy"](a) {
  return D(C(a) || "", "yellow");
}, ["fr"](a) {
  return D(C(a) || "", "red");
}, ["fb"](a) {
  return D(C(a) || "", "blue");
}, ["fg"](a) {
  return D(C(a) || "", "green");
}, ["fc"](a) {
  return D(C(a) || "", "cyan");
}, ["fm"](a) {
  return D(C(a) || "", "magenta");
}};
const E = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, e) => e.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), pa = {init:function(a) {
  a.inspectOpts = {...E};
}, log:function(...a) {
  return process.stderr.write(x(...a) + "\n");
}, formatArgs:function(a) {
  var b = this.namespace, c = this.color;
  const d = this.diff;
  this.useColors ? (c = "\u001b[3" + (8 > c ? c : "8;5;" + c), b = `  ${c};1m${b} \u001B[0m`, a[0] = b + a[0].split("\n").join("\n" + b), a.push(c + "m+" + ja(d) + "\u001b[0m")) : a[0] = (E.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in E ? !!E.colors : ia.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:E, formatters:{o:function(a) {
  return z(a, {...this.inspectOpts, colors:this.useColors}).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  return z(a, {...this.inspectOpts, colors:this.useColors});
}, ...oa}};
function qa(a) {
  function b(...g) {
    if (b.enabled) {
      var h = Number(new Date);
      b.diff = h - (f || h);
      b.prev = f;
      f = b.curr = h;
      g[0] = ra(g[0]);
      "string" != typeof g[0] && g.unshift("%O");
      var k = 0;
      g[0] = g[0].replace(/%([a-zA-Z%]+)/g, (m, l) => {
        if ("%%" == m) {
          return m;
        }
        k++;
        if (l = c[l]) {
          m = l.call(b, g[k]), g.splice(k, 1), k--;
        }
        return m;
      });
      d.call(b, g);
      (b.log || e).apply(b, g);
    }
  }
  const c = a.formatters, d = a.formatArgs, e = a.log;
  let f;
  return b;
}
function sa(a) {
  const b = qa(a);
  "function" == typeof a.init && a.init(b);
  a.a.push(b);
  return b;
}
function ta(a, b) {
  let c = 0;
  for (let d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d), c |= 0;
  }
  return a.colors[Math.abs(c) % a.colors.length];
}
function ua(a) {
  var b = pa.load();
  a.save(b);
  a.i = [];
  a.m = [];
  let c;
  const d = ("string" == typeof b ? b : "").split(/[\s,]+/), e = d.length;
  for (c = 0; c < e; c++) {
    d[c] && (b = d[c].replace(/\*/g, ".*?"), "-" == b[0] ? a.m.push(new RegExp("^" + b.substr(1) + "$")) : a.i.push(new RegExp("^" + b + "$")));
  }
  for (c = 0; c < a.a.length; c++) {
    b = a.a[c], b.enabled = a.enabled(b.namespace);
  }
}
class va {
  constructor(a) {
    this.colors = a.colors;
    this.formatArgs = a.formatArgs;
    this.inspectOpts = a.inspectOpts;
    this.log = a.log;
    this.save = a.save;
    this.init = a.init;
    this.formatters = a.formatters || {};
    this.a = [];
    this.i = [];
    this.m = [];
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
    for (c = this.m.length; b < c; b++) {
      if (this.m[b].test(a)) {
        return !1;
      }
    }
    b = 0;
    for (c = this.i.length; b < c; b++) {
      if (this.i[b].test(a)) {
        return !0;
      }
    }
    return !1;
  }
}
function wa() {
  const a = new va(pa);
  return function(b) {
    const c = sa(a);
    c.namespace = b;
    c.useColors = pa.useColors();
    c.enabled = a.enabled(b);
    c.color = ta(a, b);
    c.destroy = function() {
      a.destroy(this);
    };
    c.extend = function(d, e) {
      d = this.namespace + (void 0 === e ? ":" : e) + d;
      d.log = this.log;
      return d;
    };
    ua(a);
    return c;
  };
}
function ra(a) {
  return a instanceof Error ? a.stack || a.message : a;
}
;function F(a) {
  if (!a) {
    throw Error("To use debug, pass the namespace.");
  }
  return wa()(a);
}
;const G = F("koa-mount");
function xa(a, b) {
  function c(g) {
    const h = a;
    if (0 != g.indexOf(h)) {
      return !1;
    }
    g = g.replace(h, "") || "/";
    return e ? g : "/" != g[0] ? !1 : g;
  }
  "string" != typeof a && (b = a, a = "/");
  ha(a[0], "/", 'mount path must begin with "/"');
  const d = b.middleware ? r(b.middleware) : b;
  if ("/" == a) {
    return d;
  }
  const e = "/" == a.slice(-1), f = b.name || "unnamed";
  G("mount %s %s", a, f);
  return async function(g, h) {
    const k = g.path, m = c(k);
    G("mount %s %s -> %s", a, f, m);
    if (!m) {
      return await h();
    }
    g.mountPath = a;
    g.path = m;
    G("enter %s -> %s", k, g.path);
    await d(g, async() => {
      g.path = k;
      await h();
      g.path = m;
    });
    G("leave %s -> %s", k, g.path);
    g.path = k;
  };
}
;const ya = _crypto.createHmac, za = _crypto.randomBytes;
function Aa(a, b, c, d) {
  return ya(b, c).update(a).digest(d).replace(/\/|\+|=/g, e => ({"/":"_", "+":"-", "=":""})[e]);
}
;function Ba(a, b) {
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
class Ca {
  constructor(a, b = "sha1", c = "base64") {
    if (!(a && 0 in a)) {
      throw Error("Keys must be provided.");
    }
    this.a = b;
    this.encoding = c;
    this.keys = a;
  }
  sign(a) {
    return Aa(a, this.a, this.keys[0], this.encoding);
  }
  verify(a, b) {
    return -1 < this.index(a, b);
  }
  index(a, b) {
    for (let c = 0, d = this.keys.length; c < d; c++) {
      const e = Aa(a, this.a, this.keys[c], this.encoding);
      if (Ba(b, e)) {
        return c;
      }
    }
    return -1;
  }
}
;function Da() {
  return za(16);
}
;for (var H = [], I = 0; 256 > I; ++I) {
  H[I] = (I + 256).toString(16).substr(1);
}
;function Ea(a = {}, b = null, c = 0) {
  c = b && c;
  "string" == typeof a && (b = "binary" == a ? Array(16) : null, a = null);
  const {random:d, rng:e = Da} = a;
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
;class Fa {
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
;function Ga(a) {
  a = Buffer.from(a, "base64").toString("utf8");
  return JSON.parse(a);
}
function Ha(a) {
  a = JSON.stringify(a);
  return Buffer.from(a).toString("base64");
}
;const J = F("koa-session:context");
async function Ia(a) {
  J("init from external");
  var b = a.ctx, c = a.a;
  c.externalKey ? (b = c.externalKey.get(b), J("get external key from custom %s", b)) : (b = b.cookies.get(c.key, c), J("get external key from cookie %s", b));
  b ? (c = await a.store.get(b, c.maxAge, {rolling:c.rolling || !1}), a.valid(c, b) ? (a.create(c, b), a.i = JSON.stringify(a.session.toJSON())) : a.create()) : a.create();
}
function Ja(a) {
  const b = a.i;
  var c = a.session;
  if (c._requireSave) {
    return "force";
  }
  const d = c.toJSON();
  return b || Object.keys(d).length ? b !== JSON.stringify(d) ? "changed" : a.a.rolling ? "rolling" : a.a.renew && (a = c._expire, c = c.maxAge, a && c && a - Date.now() < c / 2) ? "renew" : "" : "";
}
class Ka {
  constructor(a, b = {}) {
    this.ctx = a;
    this.app = a.app;
    this.a = {...b};
    this.store = b.ContextStore ? new b.ContextStore(a) : b.store;
    this.i = this.externalKey = this.session = void 0;
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
        J("init from cookie");
        a = this.ctx;
        const c = this.a, d = a.cookies.get(c.key, c);
        if (d) {
          J("parse %s", d);
          try {
            var b = c.decode(d);
          } catch (e) {
            J("decode %j error: %s", d, e);
            if (!(e instanceof SyntaxError)) {
              throw a.cookies.set(c.key, "", c), e.headers = {"set-cookie":a.response.get("set-cookie")}, e;
            }
            this.create();
            break a;
          }
          J("parsed %j", b);
          this.valid(b) ? (this.create(b), this.i = JSON.stringify(this.session.toJSON())) : this.create();
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
      return J("expired session"), this.emit("expired", {key:b, value:a, ctx:c}), !1;
    }
    const d = this.a.valid;
    return "function" != typeof d || d(c, a) ? !0 : (J("invalid session"), this.emit("invalid", {key:b, value:a, ctx:c}), !1);
  }
  emit(a, b) {
    setImmediate(() => {
      this.app.emit(`session:${a}`, b);
    });
  }
  create(a, b) {
    J("create session with val: %j externalKey: %s", a, b);
    this.store && (this.externalKey = b || this.a.genid && this.a.genid(this.ctx));
    this.session = new Fa(this, a);
  }
  async commit() {
    const {session:a, a:{beforeSave:b}, ctx:c} = this;
    if (void 0 !== a) {
      if (null === a) {
        await this.remove();
      } else {
        var d = Ja(this);
        J("should save session: %s", d);
        d && ("function" == typeof b && (J("before save"), b(c, a)), await this.save("changed" == d));
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
    f ? (J("save %j to external key %s", h, f), "number" == typeof g && (g += 10000), await this.store.set(f, h, g, {changed:a, rolling:c}), e ? e.set(this.ctx, f) : this.ctx.cookies.set(b, f, this.a)) : (J("save %j to cookie", h), h = d(h), J("save %s", h), this.ctx.cookies.set(b, h, this.a));
  }
}
;/*

 MIT https://github.com/miguelmota/is-class
*/
const La = F("koa-session"), Ma = Symbol("context#contextSession");
Symbol("context#_contextSession");
function Na(a = {}) {
  Oa(a);
  return async function(b, c) {
    b = Pa(b, a);
    b.store && await Ia(b);
    try {
      await c();
    } finally {
      a.autoCommit && await b.commit();
    }
  };
}
function Oa(a = {}) {
  a.key = a.key || "koa:sess";
  a.maxAge = a.maxAge || 864E5;
  null == a.overwrite && (a.overwrite = !0);
  null == a.httpOnly && (a.httpOnly = !0);
  null == a.signed && (a.signed = !0);
  null == a.autoCommit && (a.autoCommit = !0);
  La("session options %j", a);
  "function" != typeof a.encode && (a.encode = Ha);
  "function" != typeof a.decode && (a.decode = Ga);
  var b = a.store;
  b && (w("function" == typeof b.get, "store.get must be function"), w("function" == typeof b.set, "store.set must be function"), w("function" == typeof b.destroy, "store.destroy must be function"));
  if (b = a.externalKey) {
    w("function" == typeof b.get, "externalKey.get must be function"), w("function" == typeof b.set, "externalKey.set must be function");
  }
  if (b = a.ContextStore) {
    w("function" == typeof b && (/^class[\s{]/.test(b.toString()) || /classCallCheck\(/.test(b.toString().replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, ""))), "ContextStore must be a class"), w("function" == typeof b.prototype.get, "ContextStore.prototype.get must be function"), w("function" == typeof b.prototype.set, "ContextStore.prototype.set must be function"), w("function" == typeof b.prototype.destroy, "ContextStore.prototype.destroy must be function");
  }
  a.genid || (a.prefix ? a.genid = () => `${a.prefix}${Ea()}` : a.genid = Ea);
}
function Pa(a, b) {
  if (!a.hasOwnProperty(Ma)) {
    Object.defineProperties(a, {session:{get() {
      return c.get();
    }, set(d) {
      c.set(d);
    }, configurable:!0}, sessionOptions:{get() {
      return c.a;
    }}});
    var c = new Ka(a, b);
    return c;
  }
}
;/*
 vary
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
const Qa = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function Ra(a, b) {
  if ("string" != typeof a) {
    throw new TypeError("header argument is required");
  }
  if (!b) {
    throw new TypeError("field argument is required");
  }
  b = Array.isArray(b) ? b : Sa(`${b}`);
  for (var c = 0; c < b.length; c++) {
    if (!Qa.test(b[c])) {
      throw new TypeError("field argument contains an invalid header name");
    }
  }
  if ("*" == a) {
    return a;
  }
  c = a;
  a = Sa(a.toLowerCase());
  if (b.includes("*") || a.includes("*")) {
    return "*";
  }
  for (let d = 0; d < b.length; d++) {
    const e = b[d].toLowerCase();
    a.includes(e) || (a.push(e), c = c ? c + ", " + b[d] : b[d]);
  }
  return c;
}
function Sa(a) {
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
;function Ta(a = {}) {
  let {allowMethods:b = "GET,HEAD,PUT,POST,DELETE,PATCH", exposeHeaders:c, allowHeaders:d, maxAge:e, credentials:f = !1, keepHeadersOnError:g = !0, origin:h} = a;
  Array.isArray(b) && (b = b.join(","));
  Array.isArray(c) && (c = c.join(","));
  Array.isArray(d) && (d = d.join(","));
  e && (e = `${e}`);
  return async function(k, m) {
    var l = k.get("Origin");
    k.vary("Origin");
    if (!l) {
      return await m();
    }
    if ("function" === typeof h) {
      var p = h(k);
      p instanceof Promise && (p = await p);
      if (!p) {
        return await m();
      }
    } else {
      p = h || l;
    }
    l = {};
    if ("OPTIONS" != k.method) {
      k.set("Access-Control-Allow-Origin", p);
      l["Access-Control-Allow-Origin"] = p;
      f && (k.set("Access-Control-Allow-Credentials", "true"), l["Access-Control-Allow-Credentials"] = "true");
      c && (p = c, k.set("Access-Control-Expose-Headers", p), l["Access-Control-Expose-Headers"] = p);
      if (!g) {
        return await m();
      }
      try {
        return await m();
      } catch (n) {
        throw k = n.headers || {}, m = Ra(k.vary || k.Vary || "", "Origin"), delete k.L, n.headers = Object.assign({}, k, l, {vary:m}), n;
      }
    } else {
      if (!k.get("Access-Control-Request-Method")) {
        return await m();
      }
      k.set("Access-Control-Allow-Origin", p);
      f && k.set("Access-Control-Allow-Credentials", !0);
      e && k.set("Access-Control-Max-Age", e);
      b && k.set("Access-Control-Allow-Methods", b);
      d || (d = k.get("Access-Control-Request-Headers"));
      d && k.set("Access-Control-Allow-Headers", d);
      k.status = 204;
    }
  };
}
;const Ua = path.basename, K = path.extname, Va = path.isAbsolute, Wa = path.join, Xa = path.normalize, Ya = path.parse, Za = path.resolve, $a = path.sep;
const ab = fs.ReadStream, bb = fs.createReadStream, cb = fs.exists, db = fs.stat;
const eb = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, fb = (a, b = !1) => eb(a, 2 + (b ? 1 : 0)), gb = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const hb = os.homedir;
const ib = /\s+at.*(?:\(|\s)(.*)\)?/, jb = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, kb = hb(), lb = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(jb.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(ib);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(ib, (g, h) => g.replace(h, h.replace(kb, "~"))) : f).join("\n");
};
function mb(a, b, c = !1) {
  return function(d) {
    var e = gb(arguments), {stack:f} = Error();
    const g = eb(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = lb(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function nb(a) {
  var {stack:b} = Error();
  const c = gb(arguments);
  b = fb(b, a);
  return mb(c, b, a);
}
;function ob(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function pb(a, b, c) {
  const d = nb(!0);
  if ("function" !== typeof a) {
    throw Error("Function must be passed.");
  }
  const e = a.length;
  if (!e) {
    throw Error("Function does not accept any arguments.");
  }
  return await new Promise((f, g) => {
    const h = (m, l) => m ? (m = d(m), g(m)) : f(c || l);
    let k = [h];
    Array.isArray(b) ? (b.forEach((m, l) => {
      ob(e, l);
    }), k = [...b, h]) : 1 < Array.from(arguments).length && (ob(e, 0), k = [b, h]);
    a(...k);
  });
}
;/*
 resolve-path
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2015-2018 Douglas Christopher Wilson
 MIT Licensed
*/
const qb = /(?:^|[\\/])\.\.(?:[\\/]|$)/;
function rb(a, b) {
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
    throw v(400, "Malicious Path");
  }
  if (Va(c)) {
    throw v(400, "Malicious Path");
  }
  if (qb.test(Xa("." + $a + c))) {
    throw v(403);
  }
  return Xa(Wa(Za(d), c));
}
;const sb = async(...a) => await pb(cb, ...a), tb = async(...a) => await pb(db, ...a), ub = F("koa-send");
async function vb(a, b, c = {}) {
  w(a, "koa context required");
  w(b, "pathname required");
  ub('send "%s" %j', b, c);
  var d = c.root ? Xa(Za(c.root)) : "", e = "/" == b[b.length - 1];
  b = b.substr(Ya(b).root.length);
  var f = c.index;
  const g = c.maxage || c.maxAge || 0;
  var h = c.immutable || !1;
  const k = c.hidden || !1, m = !1 !== c.format;
  var l = Array.isArray(c.extensions) ? c.extensions : !1, p = !1 !== c.brotli, n = !1 !== c.gzip;
  if ((c = c.setHeaders) && "function" !== typeof c) {
    throw new TypeError("option setHeaders must be function");
  }
  try {
    b = decodeURIComponent(b);
  } catch (y) {
    b = -1;
  }
  if (-1 == b) {
    return a.throw(400, "failed to decode");
  }
  f && e && (b += f);
  b = rb(d, b);
  if (!(e = k)) {
    a: {
      d = b.substr(d.length).split($a);
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
    "br" == a.acceptsEncodings("br", "identity") && p && await sb(b + ".br") ? (b += ".br", a.set("Content-Encoding", "br"), a.res.removeHeader("Content-Length"), d = ".br") : "gzip" == a.acceptsEncodings("gzip", "identity") && n && await sb(b + ".gz") && (b += ".gz", a.set("Content-Encoding", "gzip"), a.res.removeHeader("Content-Length"), d = ".gz");
    if (l && !/\.[^/]*$/.exec(b)) {
      for (l = [].concat(l), p = 0; p < l.length; p++) {
        n = l[p];
        if ("string" !== typeof n) {
          throw new TypeError("option extensions must be array of strings or false");
        }
        /^\./.exec(n) || (n = "." + n);
        if (await sb(b + n)) {
          b += n;
          break;
        }
      }
    }
    try {
      var q = await tb(b);
      if (q.isDirectory()) {
        if (m && f) {
          b += "/" + f, q = await tb(b);
        } else {
          return;
        }
      }
    } catch (y) {
      if (["ENOENT", "ENAMETOOLONG", "ENOTDIR"].includes(y.code)) {
        throw v(404, y);
      }
      y.status = 500;
      throw y;
    }
    c && c(a.res, b, q);
    a.set("Content-Length", q.size);
    a.response.get("Last-Modified") || a.set("Last-Modified", q.mtime.toUTCString());
    a.response.get("Cache-Control") || (f = ["max-age=" + (g / 1000 | 0)], h && f.push("immutable"), a.set("Cache-Control", f.join(",")));
    a.type || (h = b, h = "" !== d ? K(Ua(h, d)) : K(h), a.type = h);
    a.body = bb(b);
    return b;
  }
}
;const wb = F("koa-static");
var xb = (a, b = {}) => {
  w(a, "root directory is required to serve files");
  wb('static "%s" %j', a, b);
  b.root = Za(a);
  !1 !== b.index && (b.index = b.index || "index.html");
  return b.defer ? async(c, d) => {
    await d();
    if (("HEAD" == c.method || "GET" == c.method) && null == c.body && 404 == c.status) {
      try {
        await vb(c, c.path, b);
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
        e = await vb(c, c.path, b);
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
const yb = require("mime-db"), zb = /^text\/|\+(?:json|text|xml)$/i, Ab = /^\s*([^;\s]*)(?:;|\s|$)/;
function Bb(a) {
  if (!a || "string" != typeof a) {
    return !1;
  }
  a = (a = Ab.exec(a)) && a[1].toLowerCase();
  const b = yb[a];
  return b && void 0 !== b.compressible ? b.compressible : zb.test(a) || null;
}
;/*
 MIT
 Jonathan Ong
 https://npmjs.org/koa-is-json
*/
function Cb(a) {
  return !a || "string" == typeof a || "function" == typeof a.pipe || Buffer.isBuffer(a) ? !1 : !0;
}
;var L = stream;
const Db = zlib.Z_SYNC_FLUSH;
const Eb = /(?:\.0*|(\.[^0]+)0+)$/, M = {N:1, H:1024, I:1048576, G:1073741824, K:Math.pow(1024, 4), J:Math.pow(1024, 5)};
var Fb = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
function Gb(a) {
  if ("string" == typeof a) {
    if ("number" !== typeof a || isNaN(a)) {
      if ("string" !== typeof a) {
        a = null;
      } else {
        var b = Fb.exec(a);
        b ? (a = parseFloat(b[1]), b = b[4].toLowerCase()) : (a = parseInt(a, 10), b = "b");
        a = Math.floor(M[b] * a);
      }
    }
  } else {
    if ("number" == typeof a) {
      if (Number.isFinite(a)) {
        var c = Math.abs(a);
        b = "", b = c >= M.J ? "PB" : c >= M.K ? "TB" : c >= M.G ? "GB" : c >= M.I ? "MB" : c >= M.H ? "KB" : "B";
        a = (a / M[b.toLowerCase()]).toFixed(2);
        a = a.replace(Eb, "$1");
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
;const Hb = {gzip:zlib.createGzip, deflate:zlib.createDeflate};
var Ib = (a = {}) => {
  let {filter:b = Bb, threshold:c = 1024} = a;
  "string" == typeof c && (c = Gb(c));
  return async function(d, e) {
    d.vary("Accept-Encoding");
    await e();
    ({body:e} = d);
    if (e && !d.res.headersSent && d.writable && !1 !== d.compress && "HEAD" !== d.request.method && !t[d.response.status] && !d.response.get("Content-Encoding") && (!0 === d.compress || b(d.response.type))) {
      var f = d.acceptsEncodings("gzip", "deflate", "identity");
      f || d.throw(406, "supported encodings: gzip, deflate, identity");
      "identity" != f && (Cb(e) && (e = d.body = JSON.stringify(e)), c && d.response.length < c || (d.set("Content-Encoding", f), d.res.removeHeader("Content-Length"), d = d.body = Hb[f](a), e instanceof L ? e.pipe(d) : d.end(e)));
    }
  };
};
const Jb = {["static"](a, b, {root:c = [], maxage:d, mount:e}) {
  a = (Array.isArray(c) ? c : [c]).map(f => xb(f, {maxage:d, ...b}));
  a = r(a);
  return e ? xa(e, a) : a;
}, ["compress"](a, b, {threshold:c = 1024}) {
  return Ib({threshold:c, flush:Db, ...b});
}, ["session"](a, b, {keys:c}) {
  if (!(c instanceof Ca || Array.isArray(c))) {
    throw Error("Keys must be an array or an instance of Keygrip / child classes.");
  }
  a.keys = c;
  return Na(b);
}, ["cors"](a, b, {origin:c}) {
  a = Array.isArray(c) ? d => {
    const e = d.get("Origin");
    return c.find(f => f == e);
  } : c;
  return Ta({origin:a, ...b});
}};
async function Kb(a, b, c) {
  if ("function" == typeof b) {
    return c.use(b), b;
  }
  const {use:d, config:e = {}, middlewareConstructor:f, ...g} = b;
  if (a in Jb) {
    b = Jb[a];
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
async function Lb(a, b) {
  return await Object.keys(a).reduce(async(c, d) => {
    c = await c;
    var e = a[d];
    Array.isArray(e) ? (e = e.map(async f => {
      await Kb(d, f, b);
    }), e = await Promise.all(e)) : e = await Kb(d, e, b);
    return {...c, [d]:e};
  }, {});
}
;/*
 MIT 2014 Jordan Harband
 https://github.com/ljharb/is-generator-function
*/
const Mb = Object.prototype.toString, Nb = Function.prototype.toString, Ob = /^\s*(?:function)?\*/, Pb = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, Qb = Object.getPrototypeOf;
var N;
a: {
  if (Pb) {
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
const Rb = N, Sb = Rb ? Qb(Rb) : {};
const Tb = http.METHODS, Ub = http.OutgoingMessage, Vb = http.createServer;
var Wb = events;
/*
 ee-first
 Copyright(c) 2014 Jonathan Ong
 MIT Licensed
*/
function Xb(a, b) {
  function c() {
    d();
    b.apply(null, arguments);
  }
  function d() {
    for (var n, q = 0; q < f.length; q++) {
      n = f[q], n.D.removeListener(n.event, n.F);
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
    for (var k = h[0], m = 1; m < h.length; m++) {
      var l = h[m], p = Yb(l, c);
      k.on(l, p);
      f.push({D:k, event:l, F:p});
    }
  }
  e.cancel = d;
  return e;
}
function Yb(a, b) {
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
function Zb(a, b) {
  var c = a.socket;
  c = "boolean" == typeof a.finished ? !!(a.finished || c && !c.writable) : "boolean" == typeof a.complete ? !(!a.upgrade && c && c.readable && (!a.complete || a.readable)) : void 0;
  !1 !== c ? setImmediate(b, null, a) : (c = a.__onFinished, c && c.v || (c = a.__onFinished = $b(a), ac(a, c)), c.v.push(b));
}
function ac(a, b) {
  function c(h) {
    g.cancel();
    e.cancel();
    f = !0;
    b(h);
  }
  function d(h) {
    a.removeListener("socket", d);
    f || g === e && (e = Xb([[h, "error", "close"]], c));
  }
  var e, f = !1;
  var g = e = Xb([[a, "end", "finish"]], c);
  if (a.socket) {
    d(a.socket);
  } else {
    a.on("socket", d);
  }
}
function $b(a) {
  function b(c) {
    a.__onFinished === b && (a.__onFinished = null);
    if (b.v) {
      var d = b.v;
      b.v = null;
      for (var e = 0; e < d.length; e++) {
        d[e](c, a);
      }
    }
  }
  b.v = [];
  return b;
}
;/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 https://npmjs.org/destroy
*/
function bc(a) {
  if (a instanceof ab) {
    a.destroy();
    if ("function" == typeof a.close) {
      a.on("open", cc);
    }
    return a;
  }
  if (!(a instanceof L)) {
    return a;
  }
  "function" == typeof a.destroy && a.destroy();
  return a;
}
function cc() {
  "number" == typeof this.fd && this.close();
}
;/*
 MIT
 Copyright (c) 2014 Jonathan Ong <me@jongleberry.com>
 Copyright (c) 2015 Douglas Christopher Wilson <doug@somethingdoug.com>
 https://npmjs.com/package/mime-types
*/
const O = require("mime-db"), dc = /^\s*([^;\s]*)(?:;|\s|$)/, ec = /^text\//i, fc = Object.create(null), P = Object.create(null);
gc();
function hc(a) {
  return a && "string" == typeof a ? (a = K("x." + a).toLowerCase().substr(1)) ? P[a] || !1 : !1 : !1;
}
function gc() {
  const a = ["nginx", "apache", void 0, "iana"];
  Object.keys(O).forEach(b => {
    const c = O[b], d = c.extensions;
    if (d && d.length) {
      fc[b] = d;
      for (let e = 0; e < d.length; e++) {
        const f = d[e];
        if (P[f]) {
          const g = a.indexOf(O[P[f]].source), h = a.indexOf(c.source);
          if ("application/octet-stream" != P[f] && (g > h || g == h && "application/" == P[f].substr(0, 12))) {
            continue;
          }
        }
        P[f] = b;
      }
    }
  });
}
;/*
 MIT content-type
 2015 Douglas Christopher Wilson
*/
const ic = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g, jc = /\\([\u000b\u0020-\u00ff])/g, kc = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
function lc(a) {
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
  if (!kc.test(c)) {
    throw new TypeError("invalid media type");
  }
  c = new mc(c.toLowerCase());
  if (-1 != b) {
    let e;
    var d;
    for (ic.lastIndex = b; d = ic.exec(a);) {
      if (d.index !== b) {
        throw new TypeError("invalid parameter format");
      }
      b += d[0].length;
      e = d[1].toLowerCase();
      d = d[2];
      '"' == d[0] && (d = d.substr(1, d.length - 2).replace(jc, "$1"));
      c.parameters[e] = d;
    }
    if (b != a.length) {
      throw new TypeError("invalid parameter format");
    }
  }
  return c;
}
class mc {
  constructor(a) {
    this.parameters = {};
    this.type = a;
  }
}
;/*
 MIT media-typer
 2014-2017 Douglas Christopher Wilson
*/
const nc = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;
/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2015 Douglas Christopher Wilson
 https://npmjs.org/type-is
*/
function oc(a, b) {
  var c = [];
  if ("string" != typeof a) {
    var d = null;
  } else {
    try {
      var {type:e} = lc(a);
      if (!e) {
        throw new TypeError("argument string is required");
      }
      if ("string" != typeof e) {
        throw new TypeError("argument string is required to be a string");
      }
      d = nc.test(e.toLowerCase()) ? e : null;
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
    var f = pc(d = b[c]);
    !1 === f ? e = !1 : (e = a.split("/"), f = f.split("/"), e = 2 != e.length || 2 != f.length || "*" != f[0] && f[0] != e[0] ? !1 : "*+" == f[1].substr(0, 2) ? f[1].length <= e[1].length + 1 && f[1].substr(1) == e[1].substr(1 - f[1].length) : "*" != f[1] && f[1] != e[1] ? !1 : !0);
    if (e) {
      return "+" == d[0] || -1 !== d.indexOf("*") ? a : d;
    }
  }
  return !1;
}
function qc(a, b, ...c) {
  var d = a.headers;
  d = void 0 !== d["transfer-encoding"] || !isNaN(d["content-length"]);
  if (!d) {
    return null;
  }
  2 < arguments.length && (b = [b, ...c]);
  return oc(a.headers["content-type"], b);
}
function pc(a) {
  if ("string" != typeof a) {
    return !1;
  }
  switch(a) {
    case "urlencoded":
      return "application/x-www-form-urlencoded";
    case "multipart":
      return "multipart/*";
  }
  return "+" == a[0] ? "*/*" + a : -1 == a.indexOf("/") ? hc(a) : a;
}
;/*
 content-disposition
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
var rc = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g, sc = /%[0-9A-Fa-f]{2}/, tc = /[^\x20-\x7e\xa0-\xff]/g, uc = /([\\"])/g, vc = /^[\x20-\x7e\x80-\xff]+$/, wc = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/;
function xc(a, b = {}) {
  const {type:c = "attachment", fallback:d = !0} = b;
  a = yc(a, d);
  return zc(new Ac(c, a));
}
function yc(a, b = !0) {
  if (void 0 !== a) {
    var c = {};
    if ("string" != typeof a) {
      throw new TypeError("filename must be a string");
    }
    if ("string" != typeof b && "boolean" != typeof b) {
      throw new TypeError("fallback must be a string or boolean");
    }
    if ("string" == typeof b && tc.test(b)) {
      throw new TypeError("fallback must be ISO-8859-1 string");
    }
    a = Ua(a);
    var d = vc.test(a);
    b = "string" != typeof b ? b && String(a).replace(tc, "?") : Ua(b);
    var e = "string" == typeof b && b != a;
    if (e || !d || sc.test(a)) {
      c["filename*"] = a;
    }
    if (d || e) {
      c.filename = e ? b : a;
    }
    return c;
  }
}
function zc({parameters:a, type:b}) {
  if ("string" != typeof b || !wc.test(b)) {
    throw new TypeError("invalid type");
  }
  b = `${b}`.toLowerCase();
  if (a && "object" == typeof a) {
    let c;
    const d = Object.keys(a).sort();
    for (let e = 0; e < d.length; e++) {
      c = d[e];
      const f = "*" == c.substr(-1) ? "UTF-8''" + encodeURIComponent(String(a[c])).replace(rc, Bc) : '"' + String(a[c]).replace(uc, "\\$1") + '"';
      b += "; " + c + "=" + f;
    }
  }
  return b;
}
function Bc(a) {
  return "%" + String(a).charCodeAt(0).toString(16).toUpperCase();
}
class Ac {
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
function Cc(a, b) {
  if (a instanceof L && !a.listeners("error").includes(b)) {
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
function Dc(a, b, c) {
  a.cache.set(b, c);
  a.size++;
  a.size >= a.max && (a.size = 0, a.a = a.cache, a.cache = new Map);
}
class Ec {
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
      return d.l && c() > d.l ? (d.l = 0, d.value = void 0) : void 0 !== b && (a = b ? c() + b : 0, d.l = a), d.value;
    }
    if (d = this.a.get(a)) {
      return d.l && c() > d.l ? (d.l = 0, d.value = void 0) : (Dc(this, a, d), void 0 !== b && (a = b ? c() + b : 0, d.l = a)), d.value;
    }
  }
  set(a, b, c = {}) {
    c = (c = c.maxAge) ? Date.now() + c : 0;
    let d = this.cache.get(a);
    d ? (d.l = c, d.value = b) : (d = {value:b, l:c}, Dc(this, a, d));
  }
  keys() {
    function a(d) {
      const e = d[0], f = d[1];
      (d[1].value && !d[1].l || f.l >= c) && b.add(e);
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
const Fc = new Ec(100);
/*
 escape-html
 Copyright(c) 2012-2013 TJ Holowaychuk
 Copyright(c) 2015 Andreas Lubbe
 Copyright(c) 2015 Tiancheng "Timothy" Gu
 MIT Licensed
*/
var Gc = /["'&<>]/;
const Q = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, Hc = /^(?:lax|strict)$/i;
function Ic(a) {
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
class Jc {
  constructor(a, b, c) {
    this.path = "/";
    this.maxAge = this.domain = this.expires = void 0;
    this.httpOnly = !0;
    this.overwrite = this.secure = this.sameSite = !1;
    if (!Q.test(a)) {
      throw new TypeError("argument name is invalid");
    }
    if (b && !Q.test(b)) {
      throw new TypeError("argument value is invalid");
    }
    b || (this.expires = new Date(0));
    this.name = a;
    this.value = b || "";
    for (let d in c) {
      this[d] = c[d];
    }
    if (this.path && !Q.test(this.path)) {
      throw new TypeError("option path is invalid");
    }
    if (this.domain && !Q.test(this.domain)) {
      throw new TypeError("option domain is invalid");
    }
    if (this.sameSite && !0 !== this.sameSite && !Hc.test(this.sameSite)) {
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
const Kc = {};
class Lc {
  constructor(a, b, c) {
    this.secure = void 0;
    this.request = a;
    this.a = b;
    c && (this.keys = Array.isArray(c.keys) ? new Ca(c.keys) : c.keys, this.secure = c.secure);
  }
  get(a, b) {
    const c = `${a}.sig`;
    var d;
    const e = b && void 0 !== b.signed ? b.signed : !!this.keys;
    if (d = this.request.headers.cookie) {
      if (d = d.match(Kc[a] ? Kc[a] : Kc[a] = new RegExp("(?:^|;) *" + a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "=([^;]*)"))) {
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
    a = new Jc(a, b, k);
    if (!g && c.secure) {
      throw Error("Cannot send secure cookie over unencrypted connection");
    }
    a.secure = g;
    "secure" in c || (a.secure = g);
    Mc(f, a);
    if (c && h) {
      if (!this.keys) {
        throw Error(".keys required for signed cookies");
      }
      a.value = this.keys.sign(a.toString());
      a.name += ".sig";
      Mc(f, a);
    }
    (d.set ? Ub.prototype.setHeader : d.setHeader).call(d, "Set-Cookie", f);
    return this;
  }
}
function Mc(a, b) {
  if (b.overwrite) {
    for (var c = a.length - 1; 0 <= c; c--) {
      0 === a[c].indexOf(b.name + "=") && a.splice(c, 1);
    }
  }
  a.push(Ic(b));
}
;const Nc = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function Oc(a) {
  return a.split(",").map((b, c) => {
    var d = Nc.exec(b.trim());
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
      c = {charset:b, q:e, h:c};
    } else {
      c = null;
    }
    if (c) {
      return c;
    }
  }).filter(Boolean);
}
function Pc(a, b) {
  const c = Oc(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(Qc).sort(Rc).map(Sc);
  }
  const d = b.map((e, f) => {
    {
      let h = {c:-1, q:0, g:0};
      for (let k = 0; k < c.length; k++) {
        a: {
          var g = c[k];
          let m = 0;
          if (g.charset.toLowerCase() === e.toLowerCase()) {
            m |= 1;
          } else {
            if ("*" != g.charset) {
              g = null;
              break a;
            }
          }
          g = {h:f, g:m, c:g.h, q:g.q};
        }
        g && 0 > (h.g - g.g || h.q - g.q || h.c - g.c) && (h = g);
      }
      e = h;
    }
    return e;
  });
  return d.filter(Qc).sort(Rc).map(e => b[d.indexOf(e)]);
}
function Rc(a, b) {
  return b.q - a.q || b.g - a.g || a.c - b.c || a.h - b.h || 0;
}
function Sc(a) {
  return a.charset;
}
function Qc(a) {
  return 0 < a.q;
}
;const Tc = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function Uc(a) {
  a = a.split(",");
  for (var b = !1, c = 1, d = 0, e = 0; d < a.length; d++) {
    var f = d;
    var g = Tc.exec(a[d].trim());
    if (g) {
      var h = g[1], k = 1;
      if (g[2]) {
        g = g[2].split(";");
        for (var m = 0; m < g.length; m++) {
          var l = g[m].trim().split("=");
          if ("q" == l[0]) {
            k = parseFloat(l[1]);
            break;
          }
        }
      }
      f = {encoding:h, q:k, h:f};
    } else {
      f = null;
    }
    f && (a[e++] = f, b = b || Vc("identity", f, void 0), c = Math.min(c, f.q || 1));
  }
  b || (a[e++] = {encoding:"identity", q:c, h:d});
  a.length = e;
  return a;
}
function Vc(a, b, c) {
  var d = 0;
  if (b.encoding.toLowerCase() === a.toLowerCase()) {
    d |= 1;
  } else {
    if ("*" !== b.encoding) {
      return null;
    }
  }
  return {h:c, c:b.h, q:b.q, g:d};
}
function Wc(a, b) {
  var c = Uc(a || "");
  if (!b) {
    return c.filter(Xc).sort(Yc).map(Zc);
  }
  var d = b.map(function(e, f) {
    for (var g = {c:-1, q:0, g:0}, h = 0; h < c.length; h++) {
      var k = Vc(e, c[h], f);
      k && 0 > (g.g - k.g || g.q - k.q || g.c - k.c) && (g = k);
    }
    return g;
  });
  return d.filter(Xc).sort(Yc).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function Yc(a, b) {
  return b.q - a.q || b.g - a.g || a.c - b.c || a.h - b.h || 0;
}
function Zc(a) {
  return a.encoding;
}
function Xc(a) {
  return 0 < a.q;
}
;const $c = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
function ad(a) {
  a = a.split(",");
  for (var b = 0, c = 0; b < a.length; b++) {
    var d = bd(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function bd(a, b) {
  var c = $c.exec(a);
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
  return {prefix:a, u:d, q:f, h:b, s:e};
}
function cd(a, b) {
  var c = ad(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(dd).sort(ed).map(fd);
  }
  var d = b.map(function(e, f) {
    for (var g = {c:-1, q:0, g:0}, h = 0; h < c.length; h++) {
      a: {
        var k = c[h];
        var m = f, l = bd(e, void 0);
        if (l) {
          var p = 0;
          if (k.s.toLowerCase() === l.s.toLowerCase()) {
            p |= 4;
          } else {
            if (k.prefix.toLowerCase() === l.s.toLowerCase()) {
              p |= 2;
            } else {
              if (k.s.toLowerCase() === l.prefix.toLowerCase()) {
                p |= 1;
              } else {
                if ("*" !== k.s) {
                  k = null;
                  break a;
                }
              }
            }
          }
          k = {h:m, c:k.h, q:k.q, g:p};
        } else {
          k = null;
        }
      }
      k && 0 > (g.g - k.g || g.q - k.q || g.c - k.c) && (g = k);
    }
    return g;
  });
  return d.filter(dd).sort(ed).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function ed(a, b) {
  return b.q - a.q || b.g - a.g || a.c - b.c || a.h - b.h || 0;
}
function fd(a) {
  return a.s;
}
function dd(a) {
  return 0 < a.q;
}
;const gd = /^\s*([^s/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
function hd(a) {
  a = a.split(",");
  for (var b = 1, c = 0; b < a.length; b++) {
    0 == id(a[c]) % 2 ? a[++c] = a[b] : a[c] += "," + a[b];
  }
  a.length = c + 1;
  for (c = b = 0; b < a.length; b++) {
    var d = jd(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function jd(a, b) {
  var c = gd.exec(a);
  if (!c) {
    return null;
  }
  a = Object.create(null);
  var d = 1, e = c[2], f = c[1];
  if (c[3]) {
    c = c[3].split(";");
    for (var g = 1, h = 0; g < c.length; g++) {
      0 == id(c[h]) % 2 ? c[++h] = c[g] : c[h] += ";" + c[g];
    }
    c.length = h + 1;
    for (g = 0; g < c.length; g++) {
      c[g] = c[g].trim();
    }
    c = c.map(kd);
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
  return {type:f, w:e, params:a, q:d, h:b};
}
function ld(a, b, c) {
  var d = jd(a, void 0);
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
  if (b.w.toLowerCase() == d.w.toLowerCase()) {
    a |= 2;
  } else {
    if ("*" != b.w) {
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
  return {h:c, c:b.h, q:b.q, g:a};
}
function md(a, b) {
  var c = hd(void 0 === a ? "*/*" : a || "");
  if (!b) {
    return c.filter(nd).sort(od).map(pd);
  }
  var d = b.map(function(e, f) {
    for (var g = {c:-1, q:0, g:0}, h = 0; h < c.length; h++) {
      var k = ld(e, c[h], f);
      k && 0 > (g.g - k.g || g.q - k.q || g.c - k.c) && (g = k);
    }
    return g;
  });
  return d.filter(nd).sort(od).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function od(a, b) {
  return b.q - a.q || b.g - a.g || a.c - b.c || a.h - b.h || 0;
}
function pd(a) {
  return a.type + "/" + a.w;
}
function nd(a) {
  return 0 < a.q;
}
function id(a) {
  for (var b = 0, c = 0; -1 !== (c = a.indexOf('"', c));) {
    b++, c++;
  }
  return b;
}
function kd(a) {
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
class qd {
  constructor(a) {
    this.request = a;
    this.headers = this.request.headers;
  }
  charset(a) {
    return (a = this.charsets(a)) && a[0];
  }
  charsets(a) {
    return Pc(this.headers["accept-charset"], a);
  }
  encoding(a) {
    return (a = this.encodings(a)) && a[0];
  }
  encodings(a) {
    return Wc(this.headers["accept-encoding"], a);
  }
  language(a) {
    return (a = this.languages(a)) && a[0];
  }
  languages(a) {
    return cd(this.headers["accept-language"], a);
  }
  mediaType(a) {
    return (a = this.mediaTypes(a)) && a[0];
  }
  mediaTypes(a) {
    return md(this.headers.accept, a);
  }
}
;/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2015 Douglas Christopher Wilson
 https://npmjs.org/accepts
*/
class rd {
  constructor(a) {
    this.headers = a.headers;
    this.a = new qd(a);
  }
  types(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    if (!a || 0 == a.length) {
      return this.a.mediaTypes();
    }
    if (!this.headers.accept) {
      return a[0];
    }
    b = a.map(sd);
    var c = this.a.mediaTypes(b.filter(td));
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
function sd(a) {
  return -1 == a.indexOf("/") ? hc(a) : a;
}
function td(a) {
  return "string" == typeof a;
}
;/*
 MIT Copyright (c) 2015 TJ Holowaychuk <tj@vision-media.ca>
 https://npmjs.org/delegates
*/
function R(a, b) {
  const c = a.a, d = a.target;
  a.i.push(b);
  c.__defineGetter__(b, function() {
    return this[d][b];
  });
  return a;
}
function ud(a, b) {
  var c = a.a, d = a.target;
  a.m.push(b);
  c.__defineSetter__(b, function(e) {
    return this[d][b] = e;
  });
  return a;
}
class vd {
  constructor(a, b) {
    this.a = a;
    this.target = b;
    this.methods = [];
    this.i = [];
    this.m = [];
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
    return ud(R(this, a), a);
  }
}
;/*
 MIT jshttp/http-assert
*/
function wd(a, b, c, d) {
  if (!a) {
    throw v(b, c, d);
  }
}
;const xd = url.URL, S = url.Url, yd = url.format, zd = url.parse;
const Ad = net.isIP;
const Bd = querystring.parse, Cd = querystring.stringify;
/*
 parseurl
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
function T(a) {
  var b = a.url;
  if (void 0 !== b) {
    var c = a._parsedUrl;
    if ("object" === typeof c && null !== c && (void 0 === S || c instanceof S) && c._raw === b) {
      return c;
    }
    a: {
      if ("string" !== typeof b || 47 !== b.charCodeAt(0)) {
        c = zd(b);
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
              c = zd(b);
              break a;
          }
        }
        f = void 0 !== S ? new S : {};
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
var Dd = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;
function Ed(a, b) {
  var c = a["if-modified-since"], d = a["if-none-match"];
  if (!c && !d || (a = a["cache-control"]) && Dd.test(a)) {
    return !1;
  }
  if (d && "*" !== d) {
    a = b.etag;
    if (!a) {
      return !1;
    }
    for (var e = !0, f = 0, g = [], h = 0, k = 0, m = d.length; k < m; k++) {
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
  return !c || (b = b["last-modified"], b && Fd(b) <= Fd(c)) ? !0 : !1;
}
function Fd(a) {
  a = a && Date.parse(a);
  return "number" === typeof a ? a : NaN;
}
;const U = Symbol("context#ip");
class Gd {
  constructor() {
    this.res = this.req = this.response = this.ctx = this.app = null;
    this.originalUrl = "";
    this.m = {};
    this.i = this.a = null;
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
    return T(this.req).pathname;
  }
  set path(a) {
    const b = T(this.req);
    b.pathname !== a && (b.pathname = a, b.path = null, this.url = yd(b));
  }
  get query() {
    const a = this.querystring, b = this.m = this.m || {};
    return b[a] || (b[a] = Bd(a));
  }
  set query(a) {
    this.querystring = Cd(a);
  }
  get querystring() {
    return this.req ? T(this.req).query || "" : "";
  }
  set querystring(a) {
    const b = T(this.req);
    b.search !== `?${a}` && (b.search = a, b.path = null, this.url = yd(b));
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
        this.a = new xd(`${this.origin}${a}`);
      } catch (b) {
        this.a = Object.create(null);
      }
    }
    return this.a;
  }
  get fresh() {
    const a = this.method, b = this.ctx.status;
    return "GET" != a && "HEAD" != a ? !1 : 200 <= b && 300 > b || 304 == b ? Ed(this.header, this.response.header) : !1;
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
      const {parameters:a} = lc(this.req);
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
    this[U] || (this[U] = this.ips[0] || this.socket.remoteAddress || "");
    return this[U];
  }
  set ip(a) {
    this[U] = a;
  }
  get subdomains() {
    const a = this.app.subdomainOffset, b = this.hostname;
    return Ad(b) ? [] : b.split(".").reverse().slice(a);
  }
  get accept() {
    return this.i || (this.i = new rd(this.req));
  }
  set accept(a) {
    this.i = a;
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
      return qc(this.req);
    }
    Array.isArray(a) || (a = [a, ...b]);
    return qc(this.req, a);
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
  [z.custom]() {
    return this.inspect();
  }
}
;const V = Symbol("context#cookies");
class W {
  constructor() {
    this.state = this.originalUrl = this.res = this.req = this.response = this.request = this.app = null;
    this[V] = null;
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
    return wd;
  }
  throw(...a) {
    throw v(...a);
  }
  onerror(a) {
    if (null != a) {
      a instanceof Error || (a = Error(x("non-error thrown: %j", a)));
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
        "number" == typeof a.status && u[a.status] || (a.status = 500);
        b = u[a.status];
        b = a.expose ? a.message : b;
        this.status = a.status;
        this.length = Buffer.byteLength(b);
        c.end(b);
      }
    }
  }
  get cookies() {
    this[V] || (this[V] = new Lc(this.req, this.res, {keys:this.app.keys, secure:this.request.secure}));
    return this[V];
  }
  set cookies(a) {
    this[V] = a;
  }
  [z.custom]() {
    return this.inspect();
  }
}
R(R((new vd(W.prototype, "response")).method("attachment").method("redirect").method("remove").method("vary").method("set").method("append").method("flushHeaders").access("status").access("message").access("body").access("length").access("type").access("lastModified").access("etag"), "headerSent"), "writable");
R(R(R(R(R(R(R(R(R(R(R(R(R(R((new vd(W.prototype, "request")).method("acceptsLanguages").method("acceptsEncodings").method("acceptsCharsets").method("accepts").method("get").method("is").access("querystring").access("idempotent").access("socket").access("search").access("method").access("query").access("path").access("url").access("accept"), "origin"), "href"), "subdomains"), "protocol"), "host"), "hostname"), "URL"), "header"), "headers"), "secure"), "stale"), "fresh"), "ips"), "ip");
class Hd {
  constructor() {
    this.i = this.res = this.req = this.request = this.ctx = this.app = null;
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
    this.headerSent || (w(Number.isInteger(a), "status code must be a number"), w(100 <= a && 999 >= a, `invalid status code: ${a}`), this.i = !0, this.res.statusCode = a, 2 > this.req.httpVersionMajor && (this.res.statusMessage = u[a]), this.body && t[a] && (this.body = null));
  }
  get message() {
    return this.res.statusMessage || u[this.status];
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
      t[this.status] || (this.status = 204), this.remove("Content-Type"), this.remove("Content-Length"), this.remove("Transfer-Encoding");
    } else {
      this.i || (this.status = 200);
      var c = !this.header["content-type"];
      "string" == typeof a ? (c && (this.type = /^\s*</.test(a) ? "html" : "text"), this.length = Buffer.byteLength(a)) : Buffer.isBuffer(a) ? (c && (this.type = "bin"), this.length = a.length) : "function" == typeof a.pipe ? (Zb(this.res, bc.bind(null, a)), Cc(a, d => this.ctx.onerror(d)), null != b && b != a && this.remove("Content-Length"), c && (this.type = "bin")) : (this.remove("Content-Length"), this.type = "json");
    }
  }
  set length(a) {
    this.set("Content-Length", a);
  }
  get length() {
    const a = this.header["content-length"], b = this.body;
    return null == a ? b ? "string" == typeof b ? Buffer.byteLength(b) : Buffer.isBuffer(b) ? b.length : Cb(b) ? Buffer.byteLength(JSON.stringify(b)) : null : null : Math.trunc(parseInt(a, 10)) || 0;
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
        (c = Ra(d, a)) && b.setHeader("Vary", c);
      }
    }
  }
  redirect(a, b) {
    "back" == a && (a = this.ctx.get("Referrer") || b || "/");
    this.set("Location", a);
    da[this.status] || (this.status = 302);
    if (this.ctx.accepts("html")) {
      var c = Gc.exec(a);
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
    a && (this.type = K(a));
    this.set("Content-Disposition", xc(a, b));
  }
  set type(a) {
    var b = Fc.get(a);
    if (!b) {
      if (a && "string" == typeof a) {
        if (b = -1 == a.indexOf("/") ? hc(a) : a) {
          if (!b.includes("charset")) {
            var c;
            if (b && "string" == typeof b) {
              var d = (c = dc.exec(b)) && O[c[1].toLowerCase()];
              c = d && d.charset ? d.charset : c && ec.test(c[1]) ? "UTF-8" : !1;
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
      Fc.set(a, b);
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
    return oc(c, a);
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
  [z.custom]() {
    return this.inspect();
  }
}
;const Id = F("@goa/koa:application");
async function Jd(a, b) {
  const c = a.res;
  c.statusCode = 404;
  Zb(c, d => a.onerror(d));
  try {
    return await b(a), Kd(a);
  } catch (d) {
    a.onerror(d);
  }
}
class Ld extends Wb {
  constructor(a = {}) {
    const {proxy:b = !1, subdomainOffset:c = 2, env:d = process.env.NODE_ENV || "development", keys:e, Context:f = W} = a;
    super();
    this.proxy = b;
    this.silent = !1;
    this.middleware = [];
    this.subdomainOffset = c;
    this.env = d;
    this.context = Object.create(f.prototype);
    this.request = Object.create(Gd.prototype);
    this.response = Object.create(Hd.prototype);
    this.keys = e;
  }
  [z.custom]() {
    return this.inspect();
  }
  listen(...a) {
    Id("listen");
    return Vb(this.callback()).listen(...a);
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
    if ("function" != typeof a ? 0 : Ob.test(Nb.call(a)) || (Pb ? Qb(a) == Sb : "[object GeneratorFunction]" == Mb.call(a))) {
      throw Error("Generator functions are not supported by @goa/koa. Use koa-convert on them first.");
    }
    Id("use %s", a.M || a.name || "-");
    this.middleware.push(a);
    return this;
  }
  callback() {
    const a = r(this.middleware);
    if (!this.listenerCount("error")) {
      this.on("error", this.onerror);
    }
    return (b, c) => {
      b = this.createContext(b, c);
      return Jd(b, a);
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
      throw new TypeError(x("non-error thrown: %j", a));
    }
    404 == a.status || a.expose || this.silent || (a = a.stack || a.toString(), console.error(), console.error(a.replace(/^/gm, "  ")), console.error());
  }
}
function Kd(a) {
  if (0 != a.respond && a.writable) {
    var b = a.res, c = a.status, d = a.body;
    if (t[c]) {
      return a.body = null, b.end();
    }
    if ("HEAD" == a.method) {
      return !b.headersSent && Cb(d) && (a.length = Buffer.byteLength(JSON.stringify(d))), b.end();
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
    if (d instanceof L) {
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
function Md(a) {
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
function Nd(a, b = {}) {
  const c = Md(a);
  ({S:a = "./"} = b);
  b = `[^${X(b.delimiter || "/#?")}]+?`;
  const d = [];
  let e = 0, f = 0, g = "";
  const h = q => {
    if (f < c.length && c[f].type === q) {
      return c[f++].value;
    }
  }, k = q => {
    const y = h(q);
    if (void 0 !== y) {
      return y;
    }
    const {type:Ud, index:Vd} = c[f];
    throw new TypeError(`Unexpected ${Ud} at ${Vd}, expected ${q}`);
  }, m = () => {
    let q = "", y;
    for (; y = h("CHAR") || h("ESCAPED_CHAR");) {
      q += y;
    }
    return q;
  };
  for (; f < c.length;) {
    var l = h("CHAR"), p = h("NAME"), n = h("PATTERN");
    if (p || n) {
      l = l || "", -1 === a.indexOf(l) && (g += l, l = ""), g && (d.push(g), g = ""), d.push({name:p || e++, prefix:l, u:"", pattern:n || b, j:h("MODIFIER") || ""});
    } else {
      if (p = l || h("ESCAPED_CHAR")) {
        g += p;
      } else {
        if (g && (d.push(g), g = ""), h("OPEN")) {
          p = m();
          n = h("NAME") || "";
          l = h("PATTERN") || "";
          const q = m();
          k("CLOSE");
          d.push({name:n || (l ? e++ : ""), pattern:n && !l ? b : l, prefix:p, u:q, j:h("MODIFIER") || ""});
        } else {
          k("END");
        }
      }
    }
  }
  return d;
}
function Od(a) {
  var b = {encode:encodeURIComponent};
  return Pd(Nd(a, b), b);
}
function Pd(a, b = {}) {
  const c = Qd(b), {encode:d = g => g, W:e = !0} = b, f = a.map(g => {
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
        var k = g ? g[n.name] : void 0, m = "?" === n.j || "*" === n.j, l = "*" === n.j || "+" === n.j;
        if (Array.isArray(k)) {
          if (!l) {
            throw new TypeError(`Expected '${n.name}' to not repeat, but got an array`);
          }
          if (0 === k.length) {
            if (m) {
              continue;
            }
            throw new TypeError(`Expected '${n.name}' to not be empty`);
          }
          for (m = 0; m < k.length; m++) {
            l = d(k[m], n);
            if (e && !f[p].test(l)) {
              throw new TypeError(`Expected all '${n.name}' to match '${n.pattern}', but got '${l}'`);
            }
            h += n.prefix + l + n.u;
          }
        } else {
          if ("string" === typeof k || "number" === typeof k) {
            k = d(String(k), n);
            if (e && !f[p].test(k)) {
              throw new TypeError(`Expected '${n.name}' to match '${n.pattern}', but got '${k}'`);
            }
            h += n.prefix + k + n.u;
          } else {
            if (!m) {
              throw new TypeError(`Expected '${n.name}' to be ${l ? "an array" : "a string"}`);
            }
          }
        }
      }
    }
    return h;
  };
}
function X(a) {
  return a.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function Qd(a = {}) {
  return a.sensitive ? "" : "i";
}
function Rd(a, b, c) {
  a = a.map(d => Sd(d, b, c).source);
  return new RegExp(`(?:${a.join("|")})`, Qd(c));
}
function Td(a, b, c = {}) {
  const {strict:d = !1, start:e = !0, end:f = !0, encode:g = l => l} = c, h = `[${X(c.endsWith || "")}]|$`, k = `[${X(c.delimiter || "/#?")}]`;
  let m = e ? "^" : "";
  for (const l of a) {
    if ("string" == typeof l) {
      m += X(g(l));
    } else {
      const p = X(g(l.prefix)), n = X(g(l.u));
      l.pattern ? (b && b.push(l), m = p || n ? "+" == l.j || "*" == l.j ? m + `(?:${p}((?:${l.pattern})(?:${n}${p}(?:${l.pattern}))*)${n})${"*" == l.j ? "?" : ""}` : m + `(?:${p}(${l.pattern})${n})${l.j}` : m + `(${l.pattern})${l.j}`) : m += `(?:${p}${n})${l.j}`;
    }
  }
  f ? (d || (m += `${k}?`), m += c.endsWith ? `(?=${h})` : "$") : (a = a[a.length - 1], a = "string" === typeof a ? -1 < k.indexOf(a[a.length - 1]) : void 0 === a, d || (m += `(?:${k}(?=${h}))?`), a || (m += `(?=${k}|${h})`));
  return new RegExp(m, Qd(c));
}
function Sd(a, b, c) {
  if (a instanceof RegExp) {
    if (b && (c = a.source.match(/\((?!\?)/g))) {
      for (var d = 0; d < c.length; d++) {
        b.push({name:d, prefix:"", u:"", j:"", pattern:""});
      }
    }
  } else {
    Array.isArray(a) ? d = Rd(a, b, c) : d = Td(Nd(a, c), b, c), a = d;
  }
  return a;
}
;const Wd = F("koa-router");
function Y(a, b) {
  a.path && (a.path = b + a.path, a.paramNames = [], b = a.path, a.regexp = Sd("string" == typeof b ? b.replace(/\/$/, "") : b, a.paramNames, a.a));
}
class Xd {
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
    this.regexp = Sd("string" == typeof a ? a.replace(/\/$/, "") : a, this.paramNames, this.a);
    Wd("defined route %s %s", this.methods, this.a.prefix + this.path);
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
  A(a) {
    return this.a.ignoreCaptures ? [] : a.match(this.regexp).slice(1);
  }
  url(a, b) {
    var c = a, d = this.path.replace(/\(\.\*\)/g, ""), e = Od(d);
    "object" != typeof a && (c = [...arguments], "object" == typeof c[c.length - 1] && (b = c[c.length - 1], c = c.slice(0, c.length - 1)));
    d = Nd(d);
    let f = {};
    if (Array.isArray(c)) {
      for (let g = d.length, h = 0, k = 0; h < g; h++) {
        d[h].name && (f[d[h].name] = c[k++]);
      }
    } else {
      d.some(g => g.name) ? f = a : b = a;
    }
    c = e(f);
    return b && b.query ? (e = b.query, e = "string" == typeof e ? e : Cd(e), `${c}?${e}`) : c;
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
const Yd = F("@goa/router");
class Z {
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
            "function" == typeof c ? h = c() : h = new v.NotImplemented;
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
                  "function" == typeof d ? h = d() : h = new v.MethodNotAllowed;
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
    const {ignoreCaptures:e, prefix:f = this.opts.prefix || "", strict:g = this.opts.strict || !1, end:h = !0, name:k, sensitive:m = this.opts.sensitive || !1} = d;
    if (Array.isArray(a)) {
      return a.forEach(p => {
        this.register(p, b, c, d);
      }), this;
    }
    const l = new Xd(a, b, c, {end:h, name:k, sensitive:m, strict:g, prefix:f, ignoreCaptures:e});
    this.opts.prefix && Y(l, this.opts.prefix);
    Object.keys(this.params).forEach(p => {
      l.param(p, this.params[p]);
    });
    this.stack.push(l);
    return l;
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
    const e = {path:[], B:[], route:!1};
    for (let f = c.length, g = 0; g < f; g++) {
      if (d = c[g], Yd("test %s %s", d.path, d.regexp), d.match(a) && (e.path.push(d), 0 == d.methods.length || d.methods.includes(b))) {
        e.B.push(d), d.methods.length && (e.route = !0);
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
      Y(b, a);
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
        a && Y(f, a);
        this.opts.prefix && Y(f, this.opts.prefix);
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
      Yd("%s %s", b.method, b.path);
      const d = this.opts.routerPath || b.routerPath || b.path;
      var e = this.match(d, b.method);
      b.a ? b.a.push(e.path) : b.a = e.path;
      b.router = this;
      if (!e.route) {
        return c();
      }
      e = e.B;
      const f = e[e.length - 1];
      b._matchedRoute = f.path;
      f.name && (b._matchedRouteName = f.name);
      e = e.reduce((g, h) => {
        g.push((k, m) => {
          k.A = h.A(d);
          k.params = h.params(d, k.A, k.params);
          k.i = h.name;
          return m();
        });
        return g.concat(h.stack);
      }, []);
      return r(e)(b, c);
    };
    a.router = this;
    return a;
  }
}
Z.url = function(a, ...b) {
  return Xd.prototype.url.apply({path:a}, b);
};
const Zd = Tb.map(a => a.toLowerCase());
[...Zd, "all"].forEach(a => {
  function b(c, d, ...e) {
    "string" == typeof d || d instanceof RegExp || (e = [d, ...e], d = c, c = null);
    this.register(d, "all" == a ? Zd : [a], e, {name:c});
    return this;
  }
  Z.prototype[a] = b;
  "delete" == a && (Z.prototype.del = b);
});
class $d extends W {
  constructor() {
    super();
    this.sessionOptions = this.session = void 0;
    this.router = this.params = this._matchedRouteName = this._matchedRoute = this.compress = null;
  }
}
;const ae = a => {
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
const be = async(a = {}, b = {}) => {
  const c = new Ld({Context:$d});
  a = await Lb(a, c);
  "production" == c.env && (c.proxy = !0);
  return {app:c, middleware:a, router:new Z(b)};
};
function ce(a, b, c = "0.0.0.0") {
  const d = nb(!0);
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
;module.exports = {_createApp:be, _compose:r, _startApp:async function(a = {}, b = {}) {
  const {port:c = 5000, host:d = "0.0.0.0", router:e} = b, f = () => {
    g.destroy().then(() => {
      process.kill(process.pid, "SIGUSR2");
    });
  };
  process.once("SIGUSR2", f);
  b = await be(a, e);
  const g = b.app;
  a = b.middleware;
  b = b.router;
  const h = await ce(g, c, d);
  ae(h);
  g.destroy = async() => {
    await h.destroy();
    process.removeListener("SIGUSR2", f);
  };
  const {port:k} = h.address();
  return {app:g, middleware:a, url:`http://localhost:${k}`, server:h, router:b};
}, _httpErrors:v, _mount:xa, _Keygrip:Ca};


//# sourceMappingURL=idio.js.map