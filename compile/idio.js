#!/usr/bin/env node
             
const assert = require('assert');
const tty = require('tty');
const util = require('util');
const zlib = require('zlib');
const _crypto = require('crypto');
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
const ca = ba(), da = {[300]:!0, [301]:!0, [302]:!0, [303]:!0, [305]:!0, [307]:!0, [308]:!0}, p = {[204]:!0, [205]:!0, [304]:!0};
function ba() {
  var a = q;
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
function q(a) {
  if ("number" == typeof a) {
    if (!q[a]) {
      throw Error("invalid status code: " + a);
    }
    return a;
  }
  if ("string" != typeof a) {
    throw new TypeError("code must be a number or string");
  }
  var b = parseInt(a, 10);
  if (!isNaN(b)) {
    if (!q[b]) {
      throw Error("invalid status code: " + b);
    }
    return b;
  }
  b = q[a.toLowerCase()];
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
function t(...a) {
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
  if ("number" != typeof b || !q[b] && (400 > b || 600 <= b)) {
    b = 500;
  }
  a = t[b] || t[Number(String(b).charAt(0) + "00")];
  f || (f = a ? new a(g) : Error(g || q[b]), Error.captureStackTrace(f, t));
  a && f instanceof a && f.status === b || (f.expose = 500 > b, f.status = f.statusCode = b);
  for (let h in c) {
    "status" != h && "statusCode" != h && (f[h] = c[h]);
  }
  return f;
}
class ea extends Error {
  constructor(a) {
    super();
    this.message = a;
    this.statusCode = this.status = null;
  }
  set code(a) {
    this.statusCode = this.status = a;
    this.message || (this.message = q[a]);
  }
}
ca.forEach(a => {
  let b;
  const c = fa(q[a]), d = c.match(/Error$/) ? c : c + "Error";
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
  b && (t[a] = b, t[c] = b);
}, {});
function fa(a) {
  return a.split(" ").map(function(b) {
    return b.charAt(0).toUpperCase() + b.slice(1);
  }).join("").replace(/[^ _0-9a-z]/gi, "");
}
;var v = assert;
const {equal:ha} = assert;
var ia = tty;
const {format:w, inspect:y} = util;
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
    return b.N ? (b = Math.abs(a), a = 864E5 <= b ? z(a, b, 864E5, "day") : 36E5 <= b ? z(a, b, 36E5, "hour") : 6E4 <= b ? z(a, b, 6E4, "minute") : 1000 <= b ? z(a, b, 1000, "second") : a + " ms") : (b = Math.abs(a), a = 864E5 <= b ? Math.round(a / 864E5) + "d" : 36E5 <= b ? Math.round(a / 36E5) + "h" : 6E4 <= b ? Math.round(a / 6E4) + "m" : 1000 <= b ? Math.round(a / 1000) + "s" : a + "ms"), a;
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
function z(a, b, c, d) {
  return Math.round(a / c) + " " + d + (b >= 1.5 * c ? "s" : "");
}
;/*
 bytes
 Copyright(c) 2012-2014 TJ Holowaychuk
 Copyright(c) 2015 Jed Watson
 MIT Licensed
*/
const la = /\B(?=(\d{3})+(?!\d))/g, ma = /(?:\.0*|(\.[^0]+)0+)$/, A = {b:1, kb:1024, mb:1048576, gb:1073741824, tb:Math.pow(1024, 4), pb:Math.pow(1024, 5)};
function B(a, b) {
  if (!Number.isFinite(a)) {
    return null;
  }
  const c = Math.abs(a), d = b && b.R || "", e = b && b.T || "", f = b && void 0 !== b.A ? b.A : 2, g = !(!b || !b.M);
  (b = b && b.S || "") && A[b.toLowerCase()] || (b = c >= A.pb ? "PB" : c >= A.tb ? "TB" : c >= A.gb ? "GB" : c >= A.mb ? "MB" : c >= A.kb ? "KB" : "B");
  a = (a / A[b.toLowerCase()]).toFixed(f);
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
function C(a, b) {
  return (b = na[b]) ? `\x1b[${b}m${a}\x1b[0m` : a;
}
;var oa = {f:B, ["fy"](a) {
  return C(B(a) || "", "yellow");
}, ["fr"](a) {
  return C(B(a) || "", "red");
}, ["fb"](a) {
  return C(B(a) || "", "blue");
}, ["fg"](a) {
  return C(B(a) || "", "green");
}, ["fc"](a) {
  return C(B(a) || "", "cyan");
}, ["fm"](a) {
  return C(B(a) || "", "magenta");
}};
const D = Object.keys(process.env).filter(a => /^debug_/i.test(a)).reduce((a, b) => {
  const c = b.substring(6).toLowerCase().replace(/_([a-z])/g, (d, e) => e.toUpperCase());
  b = process.env[b];
  /^(yes|on|true|enabled)$/i.test(b) ? b = !0 : /^(no|off|false|disabled)$/i.test(b) ? b = !1 : "null" === b ? b = null : b = Number(b);
  a[c] = b;
  return a;
}, {}), pa = Object.assign({}, {o:function(a) {
  const b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return y(a, b).replace(/\s*\n\s*/g, " ");
}, O:function(a) {
  const b = Object.assign({}, this.inspectOpts, {colors:this.useColors});
  return y(a, b);
}}, oa), E = {init:function(a) {
  a.inspectOpts = Object.assign({}, D);
}, log:function(...a) {
  return process.stderr.write(w(...a) + "\n");
}, formatArgs:function(a) {
  const {namespace:b, useColors:c, color:d, diff:e} = this;
  if (c) {
    const f = "\u001b[3" + (8 > d ? d : "8;5;" + d), g = `  ${f};1m${b} \u001B[0m`;
    a[0] = g + a[0].split("\n").join("\n" + g);
    a.push(f + "m+" + ja(e) + "\u001b[0m");
  } else {
    a[0] = (D.hideDate ? "" : (new Date).toISOString() + " ") + b + " " + a[0];
  }
}, save:function(a) {
  a ? process.env.DEBUG = a : delete process.env.DEBUG;
}, load:function() {
  return process.env.DEBUG;
}, useColors:function() {
  return "colors" in D ? !!D.colors : ia.isatty(process.stderr.fd);
}, colors:[6, 2, 3, 4, 5, 1], inspectOpts:D, formatters:pa};
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
  var b = E.load();
  a.save(b);
  a.j = [];
  a.m = [];
  let c;
  const d = ("string" == typeof b ? b : "").split(/[\s,]+/), e = d.length;
  for (c = 0; c < e; c++) {
    d[c] && (b = d[c].replace(/\*/g, ".*?"), "-" == b[0] ? a.m.push(new RegExp("^" + b.substr(1) + "$")) : a.j.push(new RegExp("^" + b + "$")));
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
    this.j = [];
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
    for (c = this.j.length; b < c; b++) {
      if (this.j[b].test(a)) {
        return !0;
      }
    }
    return !1;
  }
}
function wa() {
  const a = new va(E);
  return function(b) {
    const c = sa(a);
    c.namespace = b;
    c.useColors = E.useColors();
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
;const H = F("koa-mount");
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
  const d = b.middleware ? n(b.middleware) : b;
  if ("/" == a) {
    return d;
  }
  const e = "/" == a.slice(-1), f = b.name || "unnamed";
  H("mount %s %s", a, f);
  return async function(g, h) {
    const k = g.path, l = c(k);
    H("mount %s %s -> %s", a, f, l);
    if (!l) {
      return await h();
    }
    g.mountPath = a;
    g.path = l;
    H("enter %s -> %s", k, g.path);
    await d(g, async() => {
      g.path = k;
      await h();
      g.path = l;
    });
    H("leave %s -> %s", k, g.path);
    g.path = k;
  };
}
;const {createHmac:ya, randomBytes:za} = _crypto;
function Aa() {
  return za(16);
}
;for (var I = [], J = 0; 256 > J; ++J) {
  I[J] = (J + 256).toString(16).substr(1);
}
;function Ba(a = {}, b = null, c = 0) {
  c = b && c;
  "string" == typeof a && (b = "binary" == a ? Array(16) : null, a = null);
  const {random:d, rng:e = Aa} = a;
  a = d || e();
  a[6] = a[6] & 15 | 64;
  a[8] = a[8] & 63 | 128;
  if (b) {
    for (var f = 0; 16 > f; ++f) {
      b[c + f] = a[f];
    }
  }
  b || (b = 0, b = [I[a[b++]], I[a[b++]], I[a[b++]], I[a[b++]], "-", I[a[b++]], I[a[b++]], "-", I[a[b++]], I[a[b++]], "-", I[a[b++]], I[a[b++]], "-", I[a[b++]], I[a[b++]], I[a[b++]], I[a[b++]], I[a[b++]], I[a[b++]]].join(""));
  return b;
}
;class Ca {
  constructor(a, b) {
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
    this.w = !0;
  }
  save() {
    this.w = !0;
  }
  async manuallyCommit() {
    await this._sessCtx.commit();
  }
}
;/*
 MIT https://github.com/alexgorbatchev
*/
let K = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 
2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 
2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 
2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 
3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 
414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918E3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117];
"undefined" !== typeof Int32Array && (K = new Int32Array(K));
const L = function(a, b) {
  const c = (d, e) => b(d, e) >>> 0;
  c.signed = b;
  c.a = c;
  c.model = a;
  return c;
}("crc-32", (a, b) => {
  Buffer.isBuffer(a) || (a = Buffer.from(a));
  b = 0 === b ? 0 : ~~b ^ -1;
  for (let c = 0; c < a.length; c++) {
    b = K[(b ^ a[c]) & 255] ^ b >>> 8;
  }
  return b ^ -1;
});
function Da(a) {
  a = Buffer.from(a, "base64").toString("utf8");
  return JSON.parse(a);
}
function Ea(a) {
  a = JSON.stringify(a);
  return Buffer.from(a).toString("base64");
}
;const M = F("koa-session:context");
async function Fa(a) {
  M("init from external");
  const {ctx:b, i:c} = a;
  let d;
  c.externalKey ? (d = c.externalKey.get(b), M("get external key from custom %s", d)) : (d = b.cookies.get(c.key, c), M("get external key from cookie %s", d));
  if (d) {
    var e = await a.store.get(d, c.maxAge, {rolling:c.rolling});
    a.valid(e, d) ? (a.create(e, d), a.a = L(JSON.stringify(a.session.toJSON()))) : a.create();
  } else {
    a.create();
  }
}
function Ga(a) {
  const {a:b, session:c} = a;
  if (c.w) {
    return "force";
  }
  var d = c.toJSON();
  return b || Object.keys(d).length ? b !== L(JSON.stringify(d)) ? "changed" : a.i.rolling ? "rolling" : a.i.renew && (a = c._expire, d = c.maxAge, a && d && a - Date.now() < d / 2) ? "renew" : "" : "";
}
class Ha {
  constructor(a, b = {}) {
    this.ctx = a;
    this.app = a.app;
    this.i = b;
    this.store = this.i.ContextStore ? new this.i.ContextStore(a) : this.i.store;
    this.a = this.externalKey = this.session = void 0;
  }
  get() {
    const {session:a, store:b} = this;
    if (a) {
      return a;
    }
    if (!1 === a) {
      return null;
    }
    if (!b) {
      a: {
        M("init from cookie");
        const {ctx:d, i:e} = this, f = d.cookies.get(e.key, e);
        if (f) {
          M("parse %s", f);
          try {
            var c = e.decode(f);
          } catch (g) {
            M("decode %j error: %s", f, g);
            if (!(g instanceof SyntaxError)) {
              throw d.cookies.set(e.key, "", e), g.headers = {"set-cookie":d.response.get("set-cookie")}, g;
            }
            this.create();
            break a;
          }
          M("parsed %j", c);
          this.valid(c) ? (this.create(c), this.a = L(JSON.stringify(this.session.toJSON()))) : this.create();
        } else {
          this.create();
        }
      }
    }
    return this.session;
  }
  set(a) {
    if (null === a) {
      this.session = !1;
    } else {
      if ("object" === typeof a) {
        this.create(a, this.externalKey);
      } else {
        throw Error("this.session can only be set as null or an object.");
      }
    }
  }
  valid(a, b) {
    const {ctx:c} = this;
    if (!a) {
      return this.emit("missed", {key:b, value:a, ctx:c}), !1;
    }
    if (a._expire && a._expire < Date.now()) {
      return M("expired session"), this.emit("expired", {key:b, value:a, ctx:c}), !1;
    }
    const d = this.i.valid;
    return "function" !== typeof d || d(c, a) ? !0 : (M("invalid session"), this.emit("invalid", {key:b, value:a, ctx:c}), !1);
  }
  emit(a, b) {
    setImmediate(() => {
      this.app.emit(`session:${a}`, b);
    });
  }
  create(a, b) {
    M("create session with val: %j externalKey: %s", a, b);
    this.store && (this.externalKey = b || this.i.genid && this.i.genid(this.ctx));
    this.session = new Ca(this, a);
  }
  async commit() {
    const {session:a, i:{beforeSave:b}, ctx:c} = this;
    if (void 0 !== a) {
      if (!1 === a) {
        await this.remove();
      } else {
        var d = Ga(this);
        M("should save session: %s", d);
        d && ("function" == typeof b && (M("before save"), b(c, a)), await this.save("changed" == d));
      }
    }
  }
  async remove() {
    const {i:{key:a}, ctx:b, externalKey:c, store:d} = this;
    c && await d.destroy(c);
    b.cookies.set(a, "", this.i);
  }
  async save(a) {
    const {i:{key:b, rolling:c, encode:d, externalKey:e}, externalKey:f} = this;
    let {i:{maxAge:g = 864E5}} = this, h = this.session.toJSON();
    "session" === g ? (this.i.maxAge = void 0, h._session = !0) : (h._expire = g + Date.now(), h._maxAge = g);
    f ? (M("save %j to external key %s", h, f), "number" === typeof g && (g += 10000), await this.store.set(f, h, g, {changed:a, rolling:c}), e ? e.set(this.ctx, f) : this.ctx.cookies.set(b, f, this.i)) : (M("save %j to cookie", h), h = d(h), M("save %s", h), this.ctx.cookies.set(b, h, this.i));
  }
}
;/*

 MIT https://github.com/miguelmota/is-class
*/
const Ia = F("koa-session");
function Ja(a, b = {}) {
  if (!a || "function" != typeof a.use) {
    throw new TypeError("app instance required: `session(app, opts)`");
  }
  b = Ka(b);
  La(a.context, b);
  return async function(c, d) {
    c = c.CONTEXT_SESSION;
    c.store && await Fa(c);
    try {
      await d();
    } catch (e) {
      throw e;
    } finally {
      b.autoCommit && await c.commit();
    }
  };
}
function Ka(a = {}) {
  a.key = a.key || "koa:sess";
  a.maxAge = a.maxAge || 864E5;
  null == a.overwrite && (a.overwrite = !0);
  null == a.httpOnly && (a.httpOnly = !0);
  null == a.signed && (a.signed = !0);
  null == a.autoCommit && (a.autoCommit = !0);
  Ia("session options %j", a);
  "function" != typeof a.encode && (a.encode = Ea);
  "function" != typeof a.decode && (a.decode = Da);
  var b = a.store;
  b && (v("function" == typeof b.get, "store.get must be function"), v("function" == typeof b.set, "store.set must be function"), v("function" == typeof b.destroy, "store.destroy must be function"));
  if (b = a.externalKey) {
    v("function" == typeof b.get, "externalKey.get must be function"), v("function" == typeof b.set, "externalKey.set must be function");
  }
  if (b = a.ContextStore) {
    v("function" == typeof b && (/^class[\s{]/.test(b.toString()) || /classCallCheck\(/.test(b.toString().replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, ""))), "ContextStore must be a class"), v("function" == typeof b.prototype.get, "ContextStore.prototype.get must be function"), v("function" == typeof b.prototype.set, "ContextStore.prototype.set must be function"), v("function" == typeof b.prototype.destroy, "ContextStore.prototype.destroy must be function");
  }
  a.genid || (a.prefix ? a.genid = () => `${a.prefix}${Ba()}` : a.genid = Ba);
  return a;
}
function La(a, b) {
  a.hasOwnProperty("CONTEXT_SESSION") || Object.defineProperties(a, {CONTEXT_SESSION:{get() {
    return this._CONTEXT_SESSION ? this._CONTEXT_SESSION : this._CONTEXT_SESSION = new Ha(this, b);
  }}, session:{get() {
    return this.CONTEXT_SESSION.get();
  }, set(c) {
    this.CONTEXT_SESSION.set(c);
  }, configurable:!0}, sessionOptions:{get() {
    return this.CONTEXT_SESSION.i;
  }}});
}
;/*
 keygrip
 Copyright(c) 2011-2014 Jed Schmidt
 MIT Licensed
*/
class N {
  constructor(a, b = "sha1", c = "base64") {
    if (!(a && 0 in a)) {
      throw Error("Keys must be provided.");
    }
    this.a = b;
    this.encoding = c;
    this.keys = a;
  }
  sign(a) {
    return Ma(a, this.a, this.keys[0], this.encoding);
  }
  verify(a, b) {
    return -1 < this.index(a, b);
  }
  index(a, b) {
    for (let c = 0, d = this.keys.length; c < d; c++) {
      const e = Ma(a, this.a, this.keys[c], this.encoding);
      if (Na(b, e)) {
        return c;
      }
    }
    return -1;
  }
}
function Ma(a, b, c, d) {
  return ya(b, c).update(a).digest(d).replace(/\/|\+|=/g, e => ({"/":"_", "+":"-", "=":""})[e]);
}
function Na(a, b) {
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
;const {basename:Oa, extname:O, isAbsolute:Pa, join:Qa, normalize:Ra, parse:Sa, resolve:Ta, sep:Ua} = path;
const {ReadStream:Va, createReadStream:Wa, exists:Xa, stat:Ya} = fs;
const Za = (a, b = 0, c = !1) => {
  if (0 === b && !c) {
    return a;
  }
  a = a.split("\n", c ? b + 1 : void 0);
  return c ? a[a.length - 1] : a.slice(b).join("\n");
}, $a = (a, b = !1) => Za(a, 2 + (b ? 1 : 0)), ab = a => {
  ({callee:{caller:a}} = a);
  return a;
};
const {homedir:bb} = os;
const cb = /\s+at.*(?:\(|\s)(.*)\)?/, db = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:IGNORED_MODULES)\/.*)?\w+)\.js:\d+:\d+)|native)/, eb = bb(), fb = a => {
  const {pretty:b = !1, ignoredModules:c = ["pirates"]} = {}, d = c.join("|"), e = new RegExp(db.source.replace("IGNORED_MODULES", d));
  return a.replace(/\\/g, "/").split("\n").filter(f => {
    f = f.match(cb);
    if (null === f || !f[1]) {
      return !0;
    }
    f = f[1];
    return f.includes(".app/Contents/Resources/electron.asar") || f.includes(".app/Contents/Resources/default_app.asar") ? !1 : !e.test(f);
  }).filter(f => f.trim()).map(f => b ? f.replace(cb, (g, h) => g.replace(h, h.replace(eb, "~"))) : f).join("\n");
};
function gb(a, b, c = !1) {
  return function(d) {
    var e = ab(arguments), {stack:f} = Error();
    const g = Za(f, 2, !0), h = (f = d instanceof Error) ? d.message : d;
    e = [`Error: ${h}`, ...null !== e && a === e || c ? [b] : [g, b]].join("\n");
    e = fb(e);
    return Object.assign(f ? d : Error(), {message:h, stack:e});
  };
}
;function hb(a) {
  var {stack:b} = Error();
  const c = ab(arguments);
  b = $a(b, a);
  return gb(c, b, a);
}
;function ib(a, b) {
  if (b > a - 2) {
    throw Error("Function does not accept that many arguments.");
  }
}
async function jb(a, b, c) {
  const d = hb(!0);
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
      ib(e, m);
    }), k = [...b, h]) : 1 < Array.from(arguments).length && (ib(e, 0), k = [b, h]);
    a(...k);
  });
}
;/*
 resolve-path
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2015-2018 Douglas Christopher Wilson
 MIT Licensed
*/
const kb = /(?:^|[\\/])\.\.(?:[\\/]|$)/;
function lb(a, b) {
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
    throw t(400, "Malicious Path");
  }
  if (Pa(c)) {
    throw t(400, "Malicious Path");
  }
  if (kb.test(Ra("." + Ua + c))) {
    throw t(403);
  }
  return Ra(Qa(Ta(d), c));
}
;const mb = async(...a) => await jb(Xa, ...a), nb = async(...a) => await jb(Ya, ...a), ob = F("koa-send");
async function pb(a, b, c = {}) {
  v(a, "koa context required");
  v(b, "pathname required");
  ob('send "%s" %j', b, c);
  var d = c.root ? Ra(Ta(c.root)) : "", e = "/" == b[b.length - 1];
  b = b.substr(Sa(b).root.length);
  var f = c.index;
  const g = c.maxage || c.maxAge || 0;
  var h = c.immutable || !1;
  const k = c.hidden || !1, l = !1 !== c.format;
  var m = Array.isArray(c.extensions) ? c.extensions : !1, u = !1 !== c.brotli, r = !1 !== c.gzip;
  if ((c = c.setHeaders) && "function" !== typeof c) {
    throw new TypeError("option setHeaders must be function");
  }
  try {
    b = decodeURIComponent(b);
  } catch (G) {
    b = -1;
  }
  if (-1 == b) {
    return a.throw(400, "failed to decode");
  }
  f && e && (b += f);
  b = lb(d, b);
  if (!(e = k)) {
    a: {
      d = b.substr(d.length).split(Ua);
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
    "br" == a.acceptsEncodings("br", "identity") && u && await mb(b + ".br") ? (b += ".br", a.set("Content-Encoding", "br"), a.res.removeHeader("Content-Length"), d = ".br") : "gzip" == a.acceptsEncodings("gzip", "identity") && r && await mb(b + ".gz") && (b += ".gz", a.set("Content-Encoding", "gzip"), a.res.removeHeader("Content-Length"), d = ".gz");
    if (m && !/\.[^/]*$/.exec(b)) {
      for (m = [].concat(m), u = 0; u < m.length; u++) {
        r = m[u];
        if ("string" !== typeof r) {
          throw new TypeError("option extensions must be array of strings or false");
        }
        /^\./.exec(r) || (r = "." + r);
        if (await mb(b + r)) {
          b += r;
          break;
        }
      }
    }
    try {
      var x = await nb(b);
      if (x.isDirectory()) {
        if (l && f) {
          b += "/" + f, x = await nb(b);
        } else {
          return;
        }
      }
    } catch (G) {
      if (["ENOENT", "ENAMETOOLONG", "ENOTDIR"].includes(G.code)) {
        throw t(404, G);
      }
      G.status = 500;
      throw G;
    }
    c && c(a.res, b, x);
    a.set("Content-Length", x.size);
    a.response.get("Last-Modified") || a.set("Last-Modified", x.mtime.toUTCString());
    a.response.get("Cache-Control") || (f = ["max-age=" + (g / 1000 | 0)], h && f.push("immutable"), a.set("Cache-Control", f.join(",")));
    a.type || (h = b, h = "" !== d ? O(Oa(h, d)) : O(h), a.type = h);
    a.body = Wa(b);
    return b;
  }
}
;const qb = F("koa-static");
var rb = (a, b = {}) => {
  v(a, "root directory is required to serve files");
  qb('static "%s" %j', a, b);
  b.root = Ta(a);
  !1 !== b.index && (b.index = b.index || "index.html");
  return b.defer ? async function(c, d) {
    await d();
    if (("HEAD" == c.method || "GET" == c.method) && null == c.body && 404 == c.status) {
      try {
        await pb(c, c.path, b);
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
        e = await pb(c, c.path, b);
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
const sb = require("mime-db"), tb = /^text\/|\+(?:json|text|xml)$/i, ub = /^\s*([^;\s]*)(?:;|\s|$)/;
function vb(a) {
  if (!a || "string" != typeof a) {
    return !1;
  }
  a = (a = ub.exec(a)) && a[1].toLowerCase();
  const b = sb[a];
  return b && void 0 !== b.compressible ? b.compressible : tb.test(a) || null;
}
;/*
 MIT
 Jonathan Ong
 https://npmjs.org/koa-is-json
*/
function wb(a) {
  return !a || "string" == typeof a || "function" == typeof a.pipe || Buffer.isBuffer(a) ? !1 : !0;
}
;var P = stream;
const {Z_SYNC_FLUSH:xb, createDeflate:yb, createGzip:zb} = zlib;
const Ab = /(?:\.0*|(\.[^0]+)0+)$/, Q = {L:1, G:1024, H:1048576, D:1073741824, J:Math.pow(1024, 4), I:Math.pow(1024, 5)};
var Bb = /^((-|\+)?(\d+(?:\.\d+)?)) *(kb|mb|gb|tb|pb)$/i;
function Cb(a) {
  if ("string" == typeof a) {
    if ("number" !== typeof a || isNaN(a)) {
      if ("string" !== typeof a) {
        a = null;
      } else {
        var b = Bb.exec(a);
        b ? (a = parseFloat(b[1]), b = b[4].toLowerCase()) : (a = parseInt(a, 10), b = "b");
        a = Math.floor(Q[b] * a);
      }
    }
  } else {
    if ("number" == typeof a) {
      if (Number.isFinite(a)) {
        var c = Math.abs(a);
        b = "", b = c >= Q.I ? "PB" : c >= Q.J ? "TB" : c >= Q.D ? "GB" : c >= Q.H ? "MB" : c >= Q.G ? "KB" : "B";
        a = (a / Q[b.toLowerCase()]).toFixed(2);
        a = a.replace(Ab, "$1");
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
;const Db = {gzip:zb, deflate:yb};
var Eb = (a = {}) => {
  let {filter:b = vb, threshold:c = 1024} = a;
  "string" == typeof c && (c = Cb(c));
  return async(d, e) => {
    d.vary("Accept-Encoding");
    await e();
    ({body:e} = d);
    if (e && !d.res.headersSent && d.writable && !1 !== d.compress && "HEAD" !== d.request.method && !p[d.response.status] && !d.response.get("Content-Encoding") && (!0 === d.compress || b(d.response.type))) {
      var f = d.acceptsEncodings("gzip", "deflate", "identity");
      f || d.throw(406, "supported encodings: gzip, deflate, identity");
      "identity" != f && (wb(e) && (e = d.body = JSON.stringify(e)), c && d.response.length < c || (d.set("Content-Encoding", f), d.res.removeHeader("Content-Length"), d = d.body = Db[f](a), e instanceof P ? e.pipe(d) : d.end(e)));
    }
  };
};
const Fb = {["static"](a, b, c) {
  var {root:d = [], maxage:e, mount:f} = c;
  a = (Array.isArray(d) ? d : [d]).map(g => rb(g, Object.assign({}, {maxage:e}, b)));
  a = n(a);
  return f ? xa(f, a) : a;
}, ["compress"](a, b, c) {
  ({threshold:a = 1024} = c);
  return Eb(Object.assign({}, {threshold:a, flush:xb}, b));
}, ["session"](a, b, c) {
  ({keys:c} = c);
  if (!(c instanceof N || Array.isArray(c))) {
    throw Error("Keys must be an array or an instance of Keygrip / child classes.");
  }
  a.keys = c;
  return Ja(a, b);
}};
async function Gb(a, b, c) {
  if ("function" == typeof b) {
    return c.use(b), b;
  }
  if (a in Fb) {
    var d = Fb[a];
  } else {
    if (b.middlewareConstructor) {
      if ("function" != typeof b.middlewareConstructor) {
        throw Error(`Expecting a function in the "middlewareConstructor" of the ${a} middleware.`);
      }
      d = b.middlewareConstructor;
    } else {
      throw Error(`Either the "middleware" or "middlewareConstructor" properties must be passed for middleware "${a}".`);
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
async function Hb(a, b) {
  return await Object.keys(a).reduce(async(c, d) => {
    c = await c;
    var e = a[d];
    Array.isArray(e) ? (e = e.map(async f => {
      await Gb(d, f, b);
    }), e = await Promise.all(e)) : e = await Gb(d, e, b);
    return Object.assign({}, c, {[d]:e});
  }, {});
}
;const Ib = Object.prototype.toString, Jb = Function.prototype.toString, Kb = /^\s*(?:function)?\*/, Lb = "function" == typeof Symbol && "symbol" == typeof Symbol.toStringTag, Mb = Object.getPrototypeOf;
var R;
a: {
  if (Lb) {
    try {
      R = Function("return function*() {}")();
      break a;
    } catch (a) {
    }
    R = void 0;
  } else {
    R = !1;
  }
}
const Nb = R, Ob = Nb ? Mb(Nb) : {};
const {OutgoingMessage:Pb, createServer:Qb} = http;
var Rb = events;
/*
 ee-first
 Copyright(c) 2014 Jonathan Ong
 MIT Licensed
*/
function Sb(a, b) {
  function c() {
    d();
    b.apply(null, arguments);
  }
  function d() {
    for (var r, x = 0; x < f.length; x++) {
      r = f[x], r.B.removeListener(r.event, r.C);
    }
  }
  function e(r) {
    b = r;
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
      var m = h[l], u = Tb(m, c);
      k.on(m, u);
      f.push({B:k, event:m, C:u});
    }
  }
  e.cancel = d;
  return e;
}
function Tb(a, b) {
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
function Ub(a, b) {
  var c = a.socket;
  c = "boolean" == typeof a.finished ? !!(a.finished || c && !c.writable) : "boolean" == typeof a.complete ? !(!a.upgrade && c && c.readable && (!a.complete || a.readable)) : void 0;
  !1 !== c ? setImmediate(b, null, a) : (c = a.__onFinished, c && c.u || (c = a.__onFinished = Vb(a), Wb(a, c)), c.u.push(b));
}
function Wb(a, b) {
  function c(h) {
    g.cancel();
    e.cancel();
    f = !0;
    b(h);
  }
  function d(h) {
    a.removeListener("socket", d);
    f || g === e && (e = Sb([[h, "error", "close"]], c));
  }
  var e, f = !1;
  var g = e = Sb([[a, "end", "finish"]], c);
  if (a.socket) {
    d(a.socket);
  } else {
    a.on("socket", d);
  }
}
function Vb(a) {
  function b(c) {
    a.__onFinished === b && (a.__onFinished = null);
    if (b.u) {
      var d = b.u;
      b.u = null;
      for (var e = 0; e < d.length; e++) {
        d[e](c, a);
      }
    }
  }
  b.u = [];
  return b;
}
;/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 https://npmjs.org/destroy
*/
function Xb(a) {
  if (a instanceof Va) {
    a.destroy();
    if ("function" == typeof a.close) {
      a.on("open", Yb);
    }
    return a;
  }
  if (!(a instanceof P)) {
    return a;
  }
  "function" == typeof a.destroy && a.destroy();
  return a;
}
function Yb() {
  "number" == typeof this.fd && this.close();
}
;/*
 vary
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
const Zb = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;
function $b(a) {
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
const S = require("mime-db"), ac = /^\s*([^;\s]*)(?:;|\s|$)/, bc = /^text\//i, cc = Object.create(null), T = Object.create(null);
dc();
function ec(a) {
  return a && "string" == typeof a ? (a = O("x." + a).toLowerCase().substr(1)) ? T[a] || !1 : !1 : !1;
}
function dc() {
  const a = ["nginx", "apache", void 0, "iana"];
  Object.keys(S).forEach(b => {
    const c = S[b], d = c.extensions;
    if (d && d.length) {
      cc[b] = d;
      for (let e = 0; e < d.length; e++) {
        const f = d[e];
        if (T[f]) {
          const g = a.indexOf(S[T[f]].source), h = a.indexOf(c.source);
          if ("application/octet-stream" != T[f] && (g > h || g == h && "application/" == T[f].substr(0, 12))) {
            continue;
          }
        }
        T[f] = b;
      }
    }
  });
}
;/*
 MIT content-type
 2015 Douglas Christopher Wilson
*/
const fc = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g, gc = /\\([\u000b\u0020-\u00ff])/g, hc = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
function ic(a) {
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
  if (!hc.test(c)) {
    throw new TypeError("invalid media type");
  }
  c = new jc(c.toLowerCase());
  if (-1 != b) {
    let e;
    var d;
    for (fc.lastIndex = b; d = fc.exec(a);) {
      if (d.index !== b) {
        throw new TypeError("invalid parameter format");
      }
      b += d[0].length;
      e = d[1].toLowerCase();
      d = d[2];
      '"' == d[0] && (d = d.substr(1, d.length - 2).replace(gc, "$1"));
      c.parameters[e] = d;
    }
    if (b != a.length) {
      throw new TypeError("invalid parameter format");
    }
  }
  return c;
}
class jc {
  constructor(a) {
    this.parameters = {};
    this.type = a;
  }
}
;/*
 MIT media-typer
 2014-2017 Douglas Christopher Wilson
*/
const kc = /^ *([A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126})\/([A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}) *$/;
/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2015 Douglas Christopher Wilson
 https://npmjs.org/type-is
*/
function lc(a, b) {
  var c = [];
  if ("string" != typeof a) {
    var d = null;
  } else {
    try {
      var {type:e} = ic(a);
      if (!e) {
        throw new TypeError("argument string is required");
      }
      if ("string" != typeof e) {
        throw new TypeError("argument string is required to be a string");
      }
      d = kc.test(e.toLowerCase()) ? e : null;
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
    var f = mc(d = b[c]);
    !1 === f ? e = !1 : (e = a.split("/"), f = f.split("/"), e = 2 != e.length || 2 != f.length || "*" != f[0] && f[0] != e[0] ? !1 : "*+" == f[1].substr(0, 2) ? f[1].length <= e[1].length + 1 && f[1].substr(1) == e[1].substr(1 - f[1].length) : "*" != f[1] && f[1] != e[1] ? !1 : !0);
    if (e) {
      return "+" == d[0] || -1 !== d.indexOf("*") ? a : d;
    }
  }
  return !1;
}
function nc(a, b, ...c) {
  var d = a.headers;
  d = void 0 !== d["transfer-encoding"] || !isNaN(d["content-length"]);
  if (!d) {
    return null;
  }
  2 < arguments.length && (b = [b, ...c]);
  return lc(a.headers["content-type"], b);
}
function mc(a) {
  if ("string" != typeof a) {
    return !1;
  }
  switch(a) {
    case "urlencoded":
      return "application/x-www-form-urlencoded";
    case "multipart":
      return "multipart/*";
  }
  return "+" == a[0] ? "*/*" + a : -1 == a.indexOf("/") ? ec(a) : a;
}
;/*
 content-disposition
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
var oc = /[\x00-\x20"'()*,/:;<=>?@[\\\]{}\x7f]/g, pc = /%[0-9A-Fa-f]{2}/, qc = /[^\x20-\x7e\xa0-\xff]/g, rc = /([\\"])/g, sc = /^[\x20-\x7e\x80-\xff]+$/, tc = /^[!#$%&'*+.0-9A-Z^_`a-z|~-]+$/;
function uc(a, b) {
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
    if ("string" === typeof d && qc.test(d)) {
      throw new TypeError("fallback must be ISO-8859-1 string");
    }
    a = Oa(a);
    var e = sc.test(a);
    d = "string" !== typeof d ? d && String(a).replace(qc, "?") : Oa(d);
    var f = "string" === typeof d && d !== a;
    if (f || !e || pc.test(a)) {
      c["filename*"] = a;
    }
    if (e || f) {
      c.filename = f ? d : a;
    }
  } else {
    c = void 0;
  }
  c = new vc(b, c);
  b = c.parameters;
  c = c.type;
  if (!c || "string" !== typeof c || !tc.test(c)) {
    throw new TypeError("invalid type");
  }
  c = String(c).toLowerCase();
  if (b && "object" === typeof b) {
    for (e = Object.keys(b).sort(), d = 0; d < e.length; d++) {
      a = e[d], f = "*" === a.substr(-1) ? "UTF-8''" + encodeURIComponent(String(b[a])).replace(oc, wc) : '"' + String(b[a]).replace(rc, "\\$1") + '"', c += "; " + a + "=" + f;
    }
  }
  return c;
}
function wc(a) {
  return "%" + String(a).charCodeAt(0).toString(16).toUpperCase();
}
function vc(a, b) {
  this.type = a;
  this.parameters = b;
}
;/*
 MIT
 Author dead_horse <dead_horse@qq.com>
 https://github.com/node-modules/error-inject
*/
function xc(a, b) {
  if (a instanceof P && !a.listeners("error").includes(b)) {
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
function yc(a, b, c) {
  a.cache.set(b, c);
  a.size++;
  a.size >= a.max && (a.size = 0, a.a = a.cache, a.cache = new Map);
}
class zc {
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
      return d.l && c() > d.l ? (d.l = 0, d.value = void 0) : void 0 !== b && (a = b ? c() + b : 0, d.l = a), d.value;
    }
    if (d = this.a.get(a)) {
      return d.l && c() > d.l ? (d.l = 0, d.value = void 0) : (yc(this, a, d), void 0 !== b && (a = b ? c() + b : 0, d.l = a)), d.value;
    }
  }
  set(a, b, c = {}) {
    ({maxAge:c} = c);
    c = c ? Date.now() + c : 0;
    let d = this.cache.get(a);
    d ? (d.l = c, d.value = b) : (d = {value:b, l:c}, yc(this, a, d));
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
const Ac = new zc(100);
/*
 escape-html
 Copyright(c) 2012-2013 TJ Holowaychuk
 Copyright(c) 2015 Andreas Lubbe
 Copyright(c) 2015 Tiancheng "Timothy" Gu
 MIT Licensed
*/
var Bc = /["'&<>]/;
const U = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/, Cc = /^(?:lax|strict)$/i;
function Dc(a) {
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
class Ec {
  constructor(a, b, c) {
    this.path = "/";
    this.maxAge = this.domain = this.expires = void 0;
    this.httpOnly = !0;
    this.overwrite = this.secure = this.sameSite = !1;
    if (!U.test(a)) {
      throw new TypeError("argument name is invalid");
    }
    if (b && !U.test(b)) {
      throw new TypeError("argument value is invalid");
    }
    b || (this.expires = new Date(0));
    this.name = a;
    this.value = b || "";
    for (let d in c) {
      this[d] = c[d];
    }
    if (this.path && !U.test(this.path)) {
      throw new TypeError("option path is invalid");
    }
    if (this.domain && !U.test(this.domain)) {
      throw new TypeError("option domain is invalid");
    }
    if (this.sameSite && !0 !== this.sameSite && !Cc.test(this.sameSite)) {
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
const Fc = {};
class Gc {
  constructor(a, b, c) {
    this.secure = void 0;
    this.request = a;
    this.response = b;
    c && (this.keys = Array.isArray(c.keys) ? new N(c.keys) : c.keys, this.secure = c.secure);
  }
  get(a, b) {
    var c = a + ".sig", d, e = b && void 0 !== b.signed ? b.signed : !!this.keys;
    if (d = this.request.headers.cookie) {
      if (d = d.match(Fc[a] ? Fc[a] : Fc[a] = new RegExp("(?:^|;) *" + a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "=([^;]*)"))) {
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
    a = new Ec(a, b, c);
    b = c && void 0 !== c.signed ? c.signed : !!this.keys;
    if (!g && c && c.secure) {
      throw Error("Cannot send secure cookie over unencrypted connection");
    }
    a.secure = g;
    c && "secure" in c && (a.secure = c.secure);
    Hc(f, a);
    if (c && b) {
      if (!this.keys) {
        throw Error(".keys required for signed cookies");
      }
      a.value = this.keys.sign(a.toString());
      a.name += ".sig";
      Hc(f, a);
    }
    (d.set ? Pb.prototype.setHeader : d.setHeader).call(d, "Set-Cookie", f);
    return this;
  }
}
function Hc(a, b) {
  if (b.overwrite) {
    for (var c = a.length - 1; 0 <= c; c--) {
      0 === a[c].indexOf(b.name + "=") && a.splice(c, 1);
    }
  }
  a.push(Dc(b));
}
;const Ic = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function Jc(a) {
  return a.split(",").map((b, c) => {
    var d = Ic.exec(b.trim());
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
function Kc(a, b) {
  const c = Jc(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(Lc).sort(Mc).map(Nc);
  }
  const d = b.map((e, f) => {
    {
      let h = {c:-1, q:0, g:0};
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
          g = {h:f, g:l, c:g.h, q:g.q};
        }
        g && 0 > (h.g - g.g || h.q - g.q || h.c - g.c) && (h = g);
      }
      e = h;
    }
    return e;
  });
  return d.filter(Lc).sort(Mc).map(e => b[d.indexOf(e)]);
}
function Mc(a, b) {
  return b.q - a.q || b.g - a.g || a.c - b.c || a.h - b.h || 0;
}
function Nc(a) {
  return a.charset;
}
function Lc(a) {
  return 0 < a.q;
}
;const Oc = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
function Pc(a) {
  a = a.split(",");
  for (var b = !1, c = 1, d = 0, e = 0; d < a.length; d++) {
    var f = d;
    var g = Oc.exec(a[d].trim());
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
      f = {encoding:h, q:k, h:f};
    } else {
      f = null;
    }
    f && (a[e++] = f, b = b || Qc("identity", f, void 0), c = Math.min(c, f.q || 1));
  }
  b || (a[e++] = {encoding:"identity", q:c, h:d});
  a.length = e;
  return a;
}
function Qc(a, b, c) {
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
function Rc(a, b) {
  var c = Pc(a || "");
  if (!b) {
    return c.filter(Sc).sort(Tc).map(Uc);
  }
  var d = b.map(function(e, f) {
    for (var g = {c:-1, q:0, g:0}, h = 0; h < c.length; h++) {
      var k = Qc(e, c[h], f);
      k && 0 > (g.g - k.g || g.q - k.q || g.c - k.c) && (g = k);
    }
    return g;
  });
  return d.filter(Sc).sort(Tc).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function Tc(a, b) {
  return b.q - a.q || b.g - a.g || a.c - b.c || a.h - b.h || 0;
}
function Uc(a) {
  return a.encoding;
}
function Sc(a) {
  return 0 < a.q;
}
;const Vc = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
function Wc(a) {
  a = a.split(",");
  for (var b = 0, c = 0; b < a.length; b++) {
    var d = Xc(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function Xc(a, b) {
  var c = Vc.exec(a);
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
  return {prefix:a, P:d, q:f, h:b, s:e};
}
function Yc(a, b) {
  var c = Wc(void 0 === a ? "*" : a || "");
  if (!b) {
    return c.filter(Zc).sort($c).map(ad);
  }
  var d = b.map(function(e, f) {
    for (var g = {c:-1, q:0, g:0}, h = 0; h < c.length; h++) {
      a: {
        var k = c[h];
        var l = f, m = Xc(e, void 0);
        if (m) {
          var u = 0;
          if (k.s.toLowerCase() === m.s.toLowerCase()) {
            u |= 4;
          } else {
            if (k.prefix.toLowerCase() === m.s.toLowerCase()) {
              u |= 2;
            } else {
              if (k.s.toLowerCase() === m.prefix.toLowerCase()) {
                u |= 1;
              } else {
                if ("*" !== k.s) {
                  k = null;
                  break a;
                }
              }
            }
          }
          k = {h:l, c:k.h, q:k.q, g:u};
        } else {
          k = null;
        }
      }
      k && 0 > (g.g - k.g || g.q - k.q || g.c - k.c) && (g = k);
    }
    return g;
  });
  return d.filter(Zc).sort($c).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function $c(a, b) {
  return b.q - a.q || b.g - a.g || a.c - b.c || a.h - b.h || 0;
}
function ad(a) {
  return a.s;
}
function Zc(a) {
  return 0 < a.q;
}
;const bd = /^\s*([^s/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
function cd(a) {
  a = a.split(",");
  for (var b = 1, c = 0; b < a.length; b++) {
    0 == dd(a[c]) % 2 ? a[++c] = a[b] : a[c] += "," + a[b];
  }
  a.length = c + 1;
  for (c = b = 0; b < a.length; b++) {
    var d = ed(a[b].trim(), b);
    d && (a[c++] = d);
  }
  a.length = c;
  return a;
}
function ed(a, b) {
  var c = bd.exec(a);
  if (!c) {
    return null;
  }
  a = Object.create(null);
  var d = 1, e = c[2], f = c[1];
  if (c[3]) {
    c = c[3].split(";");
    for (var g = 1, h = 0; g < c.length; g++) {
      0 == dd(c[h]) % 2 ? c[++h] = c[g] : c[h] += ";" + c[g];
    }
    c.length = h + 1;
    for (g = 0; g < c.length; g++) {
      c[g] = c[g].trim();
    }
    c = c.map(fd);
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
  return {type:f, v:e, params:a, q:d, h:b};
}
function gd(a, b, c) {
  var d = ed(a, void 0);
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
  if (b.v.toLowerCase() == d.v.toLowerCase()) {
    a |= 2;
  } else {
    if ("*" != b.v) {
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
function hd(a, b) {
  var c = cd(void 0 === a ? "*/*" : a || "");
  if (!b) {
    return c.filter(id).sort(jd).map(kd);
  }
  var d = b.map(function(e, f) {
    for (var g = {c:-1, q:0, g:0}, h = 0; h < c.length; h++) {
      var k = gd(e, c[h], f);
      k && 0 > (g.g - k.g || g.q - k.q || g.c - k.c) && (g = k);
    }
    return g;
  });
  return d.filter(id).sort(jd).map(function(e) {
    return b[d.indexOf(e)];
  });
}
function jd(a, b) {
  return b.q - a.q || b.g - a.g || a.c - b.c || a.h - b.h || 0;
}
function kd(a) {
  return a.type + "/" + a.v;
}
function id(a) {
  return 0 < a.q;
}
function dd(a) {
  for (var b = 0, c = 0; -1 !== (c = a.indexOf('"', c));) {
    b++, c++;
  }
  return b;
}
function fd(a) {
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
class ld {
  constructor(a) {
    this.request = a;
    this.headers = this.request.headers;
  }
  charset(a) {
    return (a = this.charsets(a)) && a[0];
  }
  charsets(a) {
    return Kc(this.headers["accept-charset"], a);
  }
  encoding(a) {
    return (a = this.encodings(a)) && a[0];
  }
  encodings(a) {
    return Rc(this.headers["accept-encoding"], a);
  }
  language(a) {
    return (a = this.languages(a)) && a[0];
  }
  languages(a) {
    return Yc(this.headers["accept-language"], a);
  }
  mediaType(a) {
    return (a = this.mediaTypes(a)) && a[0];
  }
  mediaTypes(a) {
    return hd(this.headers.accept, a);
  }
}
;/*
 MIT
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2015 Douglas Christopher Wilson
 https://npmjs.org/accepts
*/
class md {
  constructor(a) {
    this.headers = a.headers;
    this.a = new ld(a);
  }
  types(a, ...b) {
    a && !Array.isArray(a) && (a = [a, ...b]);
    if (!a || 0 == a.length) {
      return this.a.mediaTypes();
    }
    if (!this.headers.accept) {
      return a[0];
    }
    b = a.map(nd);
    var c = this.a.mediaTypes(b.filter(od));
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
function nd(a) {
  return -1 == a.indexOf("/") ? ec(a) : a;
}
function od(a) {
  return "string" == typeof a;
}
;/*
 MIT Copyright (c) 2015 TJ Holowaychuk <tj@vision-media.ca>
 https://npmjs.org/delegates
*/
function V(a, b) {
  const c = a.a, d = a.target;
  a.m.push(b);
  c.__defineGetter__(b, function() {
    return this[d][b];
  });
  return a;
}
function pd(a, b) {
  var c = a.a, d = a.target;
  a.F.push(b);
  c.__defineSetter__(b, function(e) {
    return this[d][b] = e;
  });
  return a;
}
class qd {
  constructor(a, b) {
    this.a = a;
    this.target = b;
    this.j = [];
    this.m = [];
    this.F = [];
  }
  method(a) {
    const b = this.a, c = this.target;
    this.j.push(a);
    b[a] = function() {
      return this[c][a].apply(this[c], arguments);
    };
    return this;
  }
  access(a) {
    return pd(V(this, a), a);
  }
}
;/*
 MIT jshttp/http-assert
*/
function rd(a, b, c, d) {
  if (!a) {
    throw t(b, c, d);
  }
}
;const {URL:sd, Url:W, format:td, parse:ud} = url;
const {isIP:vd} = net;
const {parse:wd, stringify:xd} = querystring;
/*
 parseurl
 Copyright(c) 2014 Jonathan Ong
 Copyright(c) 2014-2017 Douglas Christopher Wilson
 MIT Licensed
*/
function X(a) {
  var b = a.url;
  if (void 0 !== b) {
    var c = a._parsedUrl;
    if ("object" === typeof c && null !== c && (void 0 === W || c instanceof W) && c._raw === b) {
      return c;
    }
    a: {
      if ("string" !== typeof b || 47 !== b.charCodeAt(0)) {
        c = ud(b);
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
              c = ud(b);
              break a;
          }
        }
        f = void 0 !== W ? new W : {};
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
var yd = /(?:^|,)\s*?no-cache\s*?(?:,|$)/;
function zd(a, b) {
  var c = a["if-modified-since"], d = a["if-none-match"];
  if (!c && !d || (a = a["cache-control"]) && yd.test(a)) {
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
  return !c || (b = b["last-modified"], b && Ad(b) <= Ad(c)) ? !0 : !1;
}
function Ad(a) {
  a = a && Date.parse(a);
  return "number" === typeof a ? a : NaN;
}
;const Y = Symbol("context#ip");
class Bd {
  constructor() {
    this.res = this.req = this.response = this.ctx = this.app = null;
    this.originalUrl = "";
    this.m = {};
    this.j = this.a = null;
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
    return X(this.req).pathname;
  }
  set path(a) {
    const b = X(this.req);
    b.pathname !== a && (b.pathname = a, b.path = null, this.url = td(b));
  }
  get query() {
    const a = this.querystring, b = this.m = this.m || {};
    return b[a] || (b[a] = wd(a));
  }
  set query(a) {
    this.querystring = xd(a);
  }
  get querystring() {
    return this.req ? X(this.req).query || "" : "";
  }
  set querystring(a) {
    const b = X(this.req);
    b.search !== `?${a}` && (b.search = a, b.path = null, this.url = td(b));
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
        this.a = new sd(`${a}://${b}${c}`);
      } catch (d) {
        this.a = Object.create(null);
      }
    }
    return this.a;
  }
  get fresh() {
    const a = this.method, b = this.ctx.status;
    return "GET" != a && "HEAD" != a ? !1 : 200 <= b && 300 > b || 304 == b ? zd(this.header, this.response.header) : !1;
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
      const {parameters:a} = ic(this.req);
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
    this[Y] || (this[Y] = this.ips[0] || this.socket.remoteAddress || "");
    return this[Y];
  }
  set ip(a) {
    this[Y] = a;
  }
  get subdomains() {
    const a = this.app.subdomainOffset, b = this.hostname;
    return vd(b) ? [] : b.split(".").reverse().slice(a);
  }
  get accept() {
    return this.j || (this.j = new md(this.req));
  }
  set accept(a) {
    this.j = a;
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
      return nc(this.req);
    }
    Array.isArray(a) || (a = [a, ...b]);
    return nc(this.req, a);
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
  [y.custom]() {
    return this.inspect();
  }
}
;const Z = Symbol("context#cookies");
class Cd {
  constructor() {
    this.state = this.originalUrl = this.res = this.req = this.response = this.request = this.app = null;
    this[Z] = null;
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
    return rd;
  }
  throw(...a) {
    throw t(...a);
  }
  onerror(a) {
    if (null != a) {
      a instanceof Error || (a = Error(w("non-error thrown: %j", a)));
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
        "number" == typeof a.status && q[a.status] || (a.status = 500);
        b = q[a.status];
        b = a.expose ? a.message : b;
        this.status = a.status;
        this.length = Buffer.byteLength(b);
        c.end(b);
      }
    }
  }
  get cookies() {
    this[Z] || (this[Z] = new Gc(this.req, this.res, {keys:this.app.keys, secure:this.request.secure}));
    return this[Z];
  }
  set cookies(a) {
    this[Z] = a;
  }
  [y.custom]() {
    return this.inspect();
  }
}
V(V((new qd(Cd.prototype, "response")).method("attachment").method("redirect").method("remove").method("vary").method("set").method("append").method("flushHeaders").access("status").access("message").access("body").access("length").access("type").access("lastModified").access("etag"), "headerSent"), "writable");
V(V(V(V(V(V(V(V(V(V(V(V(V(V((new qd(Cd.prototype, "request")).method("acceptsLanguages").method("acceptsEncodings").method("acceptsCharsets").method("accepts").method("get").method("is").access("querystring").access("idempotent").access("socket").access("search").access("method").access("query").access("path").access("url").access("accept"), "origin"), "href"), "subdomains"), "protocol"), "host"), "hostname"), "URL"), "header"), "headers"), "secure"), "stale"), "fresh"), "ips"), "ip");
class Dd {
  constructor() {
    this.j = this.res = this.req = this.request = this.ctx = this.app = null;
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
    this.headerSent || (v(Number.isInteger(a), "status code must be a number"), v(100 <= a && 999 >= a, `invalid status code: ${a}`), this.j = !0, this.res.statusCode = a, 2 > this.req.httpVersionMajor && (this.res.statusMessage = q[a]), this.body && p[a] && (this.body = null));
  }
  get message() {
    return this.res.statusMessage || q[this.status];
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
      p[this.status] || (this.status = 204), this.remove("Content-Type"), this.remove("Content-Length"), this.remove("Transfer-Encoding");
    } else {
      this.j || (this.status = 200);
      var c = !this.header["content-type"];
      "string" == typeof a ? (c && (this.type = /^\s*</.test(a) ? "html" : "text"), this.length = Buffer.byteLength(a)) : Buffer.isBuffer(a) ? (c && (this.type = "bin"), this.length = a.length) : "function" == typeof a.pipe ? (Ub(this.res, Xb.bind(null, a)), xc(a, d => this.ctx.onerror(d)), null != b && b != a && this.remove("Content-Length"), c && (this.type = "bin")) : (this.remove("Content-Length"), this.type = "json");
    }
  }
  set length(a) {
    this.set("Content-Length", a);
  }
  get length() {
    const a = this.header["content-length"], b = this.body;
    return null == a ? b ? "string" == typeof b ? Buffer.byteLength(b) : Buffer.isBuffer(b) ? b.length : wb(b) ? Buffer.byteLength(JSON.stringify(b)) : null : null : Math.trunc(parseInt(a, 10)) || 0;
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
        a = Array.isArray(a) ? a : $b(`${a}`);
        for (var d = 0; d < a.length; d++) {
          if (!Zb.test(a[d])) {
            throw new TypeError("field argument contains an invalid header name");
          }
        }
        if ("*" == c) {
          a = c;
        } else {
          if (d = c, c = $b(c.toLowerCase()), a.includes("*") || c.includes("*")) {
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
    da[this.status] || (this.status = 302);
    if (this.ctx.accepts("html")) {
      var c = Bc.exec(a);
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
    a && (this.type = O(a));
    this.set("Content-Disposition", uc(a, b));
  }
  set type(a) {
    var b = Ac.get(a);
    if (!b) {
      if (a && "string" == typeof a) {
        if (b = -1 == a.indexOf("/") ? ec(a) : a) {
          if (!b.includes("charset")) {
            var c;
            if (b && "string" == typeof b) {
              var d = (c = ac.exec(b)) && S[c[1].toLowerCase()];
              c = d && d.charset ? d.charset : c && bc.test(c[1]) ? "UTF-8" : !1;
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
      Ac.set(a, b);
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
    return lc(c, a);
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
  [y.custom]() {
    return this.inspect();
  }
}
;const Ed = F("@goa/koa:application");
async function Fd(a, b) {
  const c = a.res;
  c.statusCode = 404;
  Ub(c, d => a.onerror(d));
  try {
    return await b(a), await Gd(a);
  } catch (d) {
    a.onerror(d);
  }
}
class Hd extends Rb {
  constructor() {
    super();
    this.silent = this.proxy = !1;
    this.middleware = [];
    this.subdomainOffset = 2;
    this.env = process.env.NODE_ENV || "development";
    this.context = Object.create(Cd.prototype);
    this.request = Object.create(Bd.prototype);
    this.response = Object.create(Dd.prototype);
    this.keys = void 0;
  }
  [y.custom]() {
    return this.inspect();
  }
  listen(...a) {
    Ed("listen");
    return Qb(this.callback()).listen(...a);
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
    if ("function" != typeof a ? 0 : Kb.test(Jb.call(a)) || (Lb ? Mb(a) == Ob : "[object GeneratorFunction]" == Ib.call(a))) {
      throw Error("Generator functions are not supported by @goa/koa. Use koa-convert on them first.");
    }
    Ed("use %s", a.K || a.name || "-");
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
      return Fd(b, a);
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
      throw new TypeError(w("non-error thrown: %j", a));
    }
    404 == a.status || a.expose || this.silent || (a = a.stack || a.toString(), console.error(), console.error(a.replace(/^/gm, "  ")), console.error());
  }
}
function Gd(a) {
  if (0 != a.respond && a.writable) {
    var b = a.res, c = a.body, d = a.status;
    if (p[d]) {
      return a.body = null, b.end();
    }
    if ("HEAD" == a.method) {
      return !b.headersSent && wb(c) && (a.length = Buffer.byteLength(JSON.stringify(c))), b.end();
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
    if (c instanceof P) {
      return c.pipe(b);
    }
    c = JSON.stringify(c);
    b.headersSent || (a.length = Buffer.byteLength(c));
    b.end(c);
  }
}
;const Id = async a => {
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
}, Jd = async a => {
  const b = new Hd;
  a = await Hb(a, b);
  "production" == b.env && (b.proxy = !0);
  return {app:b, middleware:a};
};
function Kd(a, b, c) {
  c = void 0 === c ? "0.0.0.0" : c;
  const d = hb(!0);
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
;module.exports = {_createApp:Jd, _compose:n, _startApp:async function(a, b) {
  a = void 0 === a ? {} : a;
  b = void 0 === b ? {} : b;
  const {port:c = 5000, host:d = "0.0.0.0"} = b, e = () => {
    f.destroy().then(() => {
      process.kill(process.pid, "SIGUSR2");
    });
  };
  process.once("SIGUSR2", e);
  a = await Jd(a);
  const {app:f} = a, g = await Kd(f, c, d);
  Id(g);
  f.destroy = async() => {
    await g.destroy();
    process.removeListener("SIGUSR2", e);
  };
  ({port:b} = g.address());
  return Object.assign({}, a, {url:`http://localhost:${b}`, server:g});
}, _httpErrors:t, _mount:xa, _Keygrip:N};


//# sourceMappingURL=idio.js.map