﻿! function(t) {
	if("object" == typeof exports && "undefined" != typeof module) module.exports = t();
	else if("function" == typeof define && define.amd) define([], t);
	else {
		var e;
		"undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.RelateUrl = t()
	}
}(function() {
	var t;
	return function e(t, r, n) {
		function o(s, i) {
			if(!r[s]) {
				if(!t[s]) {
					var u = "function" == typeof require && require;
					if(!i && u) return u(s, !0);
					if(a) return a(s, !0);
					var h = new Error("Cannot find module '" + s + "'");
					throw h.code = "MODULE_NOT_FOUND", h
				}
				var l = r[s] = {
					exports: {}
				};
				t[s][0].call(l.exports, function(e) {
					var r = t[s][1][e];
					return o(r ? r : e)
				}, l, l.exports, e, t, r, n)
			}
			return r[s].exports
		}
		for(var a = "function" == typeof require && require, s = 0; s < n.length; s++) o(n[s]);
		return o
	}({
		1: [function(t, e, r) {
			"use strict";
			e.exports = {
				ABSOLUTE: "absolute",
				PATH_RELATIVE: "pathRelative",
				ROOT_RELATIVE: "rootRelative",
				SHORTEST: "shortest"
			}
		}, {}],
		2: [function(t, e, r) {
			"use strict";

			function n(t, e) {
				return !t.auth || e.removeAuth || !t.extra.relation.maximumHost && e.output !== v.ABSOLUTE ? "" : t.auth + "@"
			}

			function o(t, e) {
				return t.hash ? t.hash : ""
			}

			function a(t, e) {
				return t.host.full && (t.extra.relation.maximumAuth || e.output === v.ABSOLUTE) ? t.host.full : ""
			}

			function s(t, e) {
				var r = "",
					n = t.path.absolute.string,
					o = t.path.relative.string,
					a = p(t, e);
				if(t.extra.relation.maximumHost || e.output === v.ABSOLUTE || e.output === v.ROOT_RELATIVE) r = n;
				else if(o.length <= n.length && e.output === v.SHORTEST || e.output === v.PATH_RELATIVE) {
					if(r = o, "" === r) {
						var s = m(t, e) && !!f(t, e);
						t.extra.relation.maximumPath && !a ? r = "./" : !t.extra.relation.overridesQuery || a || s || (r = "./")
					}
				} else r = n;
				return "/" !== r || a || !e.removeRootTrailingSlash || t.extra.relation.minimumPort && e.output !== v.ABSOLUTE || (r = ""), r
			}

			function i(t, e) {
				return t.port && !t.extra.portIsDefault && t.extra.relation.maximumHost ? ":" + t.port : ""
			}

			function u(t, e) {
				return m(t, e) ? f(t, e) : ""
			}

			function h(t, e) {
				return p(t, e) ? t.resource : ""
			}

			function l(t, e) {
				var r = "";
				return(t.extra.relation.maximumHost || e.output === v.ABSOLUTE) && (r += t.extra.relation.minimumScheme && e.schemeRelative && e.output !== v.ABSOLUTE ? "//" : t.scheme + "://"), r
			}

			function c(t, e) {
				var r = "";
				return r += l(t, e), r += n(t, e), r += a(t, e), r += i(t, e), r += s(t, e), r += h(t, e), r += u(t, e), r += o(t, e)
			}

			function f(t, e) {
				var r = e.removeEmptyQueries && t.extra.relation.minimumPort;
				return t.query.string[r ? "stripped" : "full"]
			}

			function m(t, e) {
				return !t.extra.relation.minimumQuery || e.output === v.ABSOLUTE || e.output === v.ROOT_RELATIVE
			}

			function p(t, e) {
				var r = e.removeDirectoryIndexes && t.extra.resourceIsIndex,
					n = t.extra.relation.minimumResource && e.output !== v.ABSOLUTE && e.output !== v.ROOT_RELATIVE;
				return !!t.resource && !n && !r
			}
			var v = t("./constants");
			e.exports = c
		}, {
			"./constants": 1
		}],
		3: [function(t, e, r) {
			"use strict";

			function n(t, e) {
				if(a.isPlainObject(t)) {
					var r = {};
					for(var n in e) e.hasOwnProperty(n) && (void 0 !== t[n] ? r[n] = o(t[n], e[n]) : r[n] = e[n]);
					return r
				}
				return e
			}

			function o(t, e) {
				return e instanceof Object && t instanceof Object ? e instanceof Array && t instanceof Array ? e.concat(t) : a.shallowMerge(t, e) : t
			}
			var a = t("./util/object");
			e.exports = n
		}, {
			"./util/object": 15
		}],
		4: [function(t, e, r) {
			"use strict";

			function n(t, e) {
				if(e.ignore_www) {
					var r = t.host.full;
					if(r) {
						var n = r;
						0 === r.indexOf("www.") && (n = r.substr(4)), t.host.stripped = n
					}
				}
			}
			e.exports = n
		}, {}],
		5: [function(t, e, r) {
			"use strict";

			function n(t) {
				var e = !(t.scheme || t.auth || t.host.full || t.port),
					r = e && !t.path.absolute.string,
					n = r && !t.resource,
					o = n && !t.query.string.full.length,
					a = o && !t.hash;
				t.extra.hrefInfo.minimumPathOnly = e, t.extra.hrefInfo.minimumResourceOnly = r, t.extra.hrefInfo.minimumQueryOnly = n, t.extra.hrefInfo.minimumHashOnly = o, t.extra.hrefInfo.empty = a
			}
			e.exports = n
		}, {}],
		6: [function(t, e, r) {
			"use strict";

			function n(t, e, r) {
				if(t) {
					var n = o(t, e),
						a = c.resolveDotSegments(n.path.absolute.array);
					return n.path.absolute.array = a, n.path.absolute.string = "/" + c.join(a), n
				}
				return r
			}

			function o(t, e) {
				var r = l(t, e);
				return r.valid === !1 ? r : (s(r, e), u(r, e), i(r, e), h(r, e), a(r), r)
			}
			var a = t("./hrefInfo"),
				s = t("./host"),
				i = t("./path"),
				u = t("./port"),
				h = t("./query"),
				l = t("./urlstring"),
				c = t("../util/path");
			e.exports = {
				from: n,
				to: o
			}
		}, {
			"../util/path": 16,
			"./host": 4,
			"./hrefInfo": 5,
			"./path": 7,
			"./port": 8,
			"./query": 9,
			"./urlstring": 10
		}],
		7: [function(t, e, r) {
			"use strict";

			function n(t, e) {
				var r = !1;
				return e.directoryIndexes.every(function(e) {
					return e === t ? (r = !0, !1) : !0
				}), r
			}

			function o(t, e) {
				var r = t.path.absolute.string;
				if(r) {
					var o = r.lastIndexOf("/");
					if(o > -1) {
						if(++o < r.length) {
							var s = r.substr(o);
							"." !== s && ".." !== s ? (t.resource = s, r = r.substr(0, o)) : r += "/"
						}
						t.path.absolute.string = r, t.path.absolute.array = a(r)
					} else "." === r || ".." === r ? (r += "/", t.path.absolute.string = r, t.path.absolute.array = a(r)) : (t.resource = r, t.path.absolute.string = null);
					t.extra.resourceIsIndex = n(t.resource, e)
				}
			}

			function a(t) {
				if("/" !== t) {
					var e = [];
					return t.split("/").forEach(function(t) {
						"" !== t && e.push(t)
					}), e
				}
				return []
			}
			e.exports = o
		}, {}],
		8: [function(t, e, r) {
			"use strict";

			function n(t, e) {
				var r = -1;
				for(var n in e.defaultPorts)
					if(n === t.scheme && e.defaultPorts.hasOwnProperty(n)) {
						r = e.defaultPorts[n];
						break
					}
				r > -1 && (r = r.toString(), null === t.port && (t.port = r), t.extra.portIsDefault = t.port === r)
			}
			e.exports = n
		}, {}],
		9: [function(t, e, r) {
			"use strict";

			function n(t, e) {
				t.query.string.full = o(t.query.object, !1), e.removeEmptyQueries && (t.query.string.stripped = o(t.query.object, !0))
			}

			function o(t, e) {
				var r = 0,
					n = "";
				for(var o in t)
					if("" !== o && t.hasOwnProperty(o)) {
						var a = t[o];
						"" === a && e || (n += 1 === ++r ? "?" : "&", o = encodeURIComponent(o), n += "" !== a ? o + "=" + encodeURIComponent(a).replace(/%20/g, "+") : o)
					}
				return n
			}
			e.exports = n
		}, {}],
		10: [function(t, e, r) {
			"use strict";

			function n(t) {
				var e = t.protocol;
				return e && e.indexOf(":") === e.length - 1 && (e = e.substr(0, e.length - 1)), t.host = {
					full: t.hostname,
					stripped: null
				}, t.path = {
					absolute: {
						array: null,
						string: t.pathname
					},
					relative: {
						array: null,
						string: null
					}
				}, t.query = {
					object: t.query,
					string: {
						full: null,
						stripped: null
					}
				}, t.extra = {
					hrefInfo: {
						minimumPathOnly: null,
						minimumResourceOnly: null,
						minimumQueryOnly: null,
						minimumHashOnly: null,
						empty: null,
						separatorOnlyQuery: "?" === t.search
					},
					portIsDefault: null,
					relation: {
						maximumScheme: null,
						maximumAuth: null,
						maximumHost: null,
						maximumPort: null,
						maximumPath: null,
						maximumResource: null,
						maximumQuery: null,
						maximumHash: null,
						minimumScheme: null,
						minimumAuth: null,
						minimumHost: null,
						minimumPort: null,
						minimumPath: null,
						minimumResource: null,
						minimumQuery: null,
						minimumHash: null,
						overridesQuery: null
					},
					resourceIsIndex: null,
					slashes: t.slashes
				}, t.resource = null, t.scheme = e, delete t.hostname, delete t.pathname, delete t.protocol, delete t.search, delete t.slashes, t
			}

			function o(t, e) {
				var r = !0;
				return e.rejectedSchemes.every(function(e) {
					return r = !(0 === t.indexOf(e + ":"))
				}), r
			}

			function a(t, e) {
				return o(t, e) ? n(s(t, !0, e.slashesDenoteHost)) : {
					href: t,
					valid: !1
				}
			}
			var s = t("url").parse;
			e.exports = a
		}, {
			url: 22
		}],
		11: [function(t, e, r) {
			"use strict";

			function n(t, e, r) {
				i.upToPath(t, e, r), t.extra.relation.minimumScheme && (t.scheme = e.scheme), t.extra.relation.minimumAuth && (t.auth = e.auth), t.extra.relation.minimumHost && (t.host = u.clone(e.host)), t.extra.relation.minimumPort && a(t, e), t.extra.relation.minimumScheme && o(t, e), i.pathOn(t, e, r), t.extra.relation.minimumResource && s(t, e), t.extra.relation.minimumQuery && (t.query = u.clone(e.query)), t.extra.relation.minimumHash && (t.hash = e.hash)
			}

			function o(t, e) {
				if(t.extra.relation.maximumHost || !t.extra.hrefInfo.minimumResourceOnly) {
					var r = t.path.absolute.array,
						n = "/";
					r ? (t.extra.hrefInfo.minimumPathOnly && 0 !== t.path.absolute.string.indexOf("/") && (r = e.path.absolute.array.concat(r)), r = h.resolveDotSegments(r), n += h.join(r)) : r = [], t.path.absolute.array = r, t.path.absolute.string = n
				} else t.path = u.clone(e.path)
			}

			function a(t, e) {
				t.port = e.port, t.extra.portIsDefault = e.extra.portIsDefault
			}

			function s(t, e) {
				t.resource = e.resource, t.extra.resourceIsIndex = e.extra.resourceIsIndex
			}
			var i = t("./findRelation"),
				u = t("../util/object"),
				h = t("../util/path");
			e.exports = n
		}, {
			"../util/object": 15,
			"../util/path": 16,
			"./findRelation": 12
		}],
		12: [function(t, e, r) {
			"use strict";

			function n(t, e, r) {
				var n = t.extra.hrefInfo.minimumPathOnly,
					o = t.scheme === e.scheme || !t.scheme,
					a = o && (t.auth === e.auth || r.removeAuth || n),
					s = r.ignore_www ? "stripped" : "full",
					i = a && (t.host[s] === e.host[s] || n),
					u = i && (t.port === e.port || n);
				t.extra.relation.minimumScheme = o, t.extra.relation.minimumAuth = a, t.extra.relation.minimumHost = i, t.extra.relation.minimumPort = u, t.extra.relation.maximumScheme = !o || o && !a, t.extra.relation.maximumAuth = !o || o && !i, t.extra.relation.maximumHost = !o || o && !u
			}

			function o(t, e, r) {
				var n = t.extra.hrefInfo.minimumQueryOnly,
					o = t.extra.hrefInfo.minimumHashOnly,
					a = t.extra.hrefInfo.empty,
					s = t.extra.relation.minimumPort,
					i = t.extra.relation.minimumScheme,
					u = s && t.path.absolute.string === e.path.absolute.string,
					h = t.resource === e.resource || !t.resource && e.extra.resourceIsIndex || r.removeDirectoryIndexes && t.extra.resourceIsIndex && !e.resource,
					l = u && (h || n || o || a),
					c = r.removeEmptyQueries ? "stripped" : "full",
					f = t.query.string[c],
					m = e.query.string[c],
					p = l && !!f && f === m || (o || a) && !t.extra.hrefInfo.separatorOnlyQuery,
					v = p && t.hash === e.hash;
				t.extra.relation.minimumPath = u, t.extra.relation.minimumResource = l, t.extra.relation.minimumQuery = p, t.extra.relation.minimumHash = v, t.extra.relation.maximumPort = !i || i && !u, t.extra.relation.maximumPath = !i || i && !l, t.extra.relation.maximumResource = !i || i && !p, t.extra.relation.maximumQuery = !i || i && !v, t.extra.relation.maximumHash = !i || i && !v, t.extra.relation.overridesQuery = u && t.extra.relation.maximumResource && !p && !!m
			}
			e.exports = {
				pathOn: o,
				upToPath: n
			}
		}, {}],
		13: [function(t, e, r) {
			"use strict";

			function n(t, e, r) {
				return o(e, t, r), a(e, t, r), e
			}
			var o = t("./absolutize"),
				a = t("./relativize");
			e.exports = n
		}, {
			"./absolutize": 11,
			"./relativize": 14
		}],
		14: [function(t, e, r) {
			"use strict";

			function n(t, e) {
				var r = [],
					n = !0,
					o = -1;
				return e.forEach(function(e, a) {
					n && (t[a] !== e ? n = !1 : o = a), n || r.push("..")
				}), t.forEach(function(t, e) {
					e > o && r.push(t)
				}), r
			}

			function o(t, e, r) {
				if(t.extra.relation.minimumScheme) {
					var o = n(t.path.absolute.array, e.path.absolute.array);
					t.path.relative.array = o, t.path.relative.string = a.join(o)
				}
			}
			var a = t("../util/path");
			e.exports = o
		}, {
			"../util/path": 16
		}],
		15: [function(t, e, r) {
			"use strict";

			function n(t) {
				if(t instanceof Object) {
					var e = t instanceof Array ? [] : {};
					for(var r in t) t.hasOwnProperty(r) && (e[r] = n(t[r]));
					return e
				}
				return t
			}

			function o(t) {
				return !!t && "object" == typeof t && t.constructor === Object
			}

			function a(t, e) {
				if(t instanceof Object && e instanceof Object)
					for(var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
				return t
			}
			e.exports = {
				clone: n,
				isPlainObject: o,
				shallowMerge: a
			}
		}, {}],
		16: [function(t, e, r) {
			"use strict";

			function n(t) {
				return t.length ? t.join("/") + "/" : ""
			}

			function o(t) {
				var e = [];
				return t.forEach(function(t) {
					".." !== t ? "." !== t && e.push(t) : e.length && e.splice(e.length - 1, 1)
				}), e
			}
			e.exports = {
				join: n,
				resolveDotSegments: o
			}
		}, {}],
		17: [function(t, e, r) {
			"use strict";

			function n(t, e) {
				this.options = s(e, {
					defaultPorts: {
						ftp: 21,
						http: 80,
						https: 443
					},
					directoryIndexes: ["index.html"],
					ignore_www: !1,
					output: n.SHORTEST,
					rejectedSchemes: ["data", "javascript", "mailto"],
					removeAuth: !1,
					removeDirectoryIndexes: !0,
					removeEmptyQueries: !1,
					removeRootTrailingSlash: !0,
					schemeRelative: !0,
					site: void 0,
					slashesDenoteHost: !0
				}), this.from = u.from(t, this.options, null)
			}
			var o = t("./constants"),
				a = t("./format"),
				s = t("./options"),
				i = t("./util/object"),
				u = t("./parse"),
				h = t("./relate");
			n.prototype.relate = function(t, e, r) {
				if(i.isPlainObject(e) ? (r = e, e = t, t = null) : e || (e = t, t = null), r = s(r, this.options), t = t || r.site, t = u.from(t, r, this.from), !t || !t.href) throw new Error("from value not defined.");
				if(t.extra.hrefInfo.minimumPathOnly) throw new Error("from value supplied is not absolute: " + t.href);
				return e = u.to(e, r), e.valid === !1 ? e.href : (e = h(t, e, r), e = a(e, r))
			}, n.relate = function(t, e, r) {
				return(new n).relate(t, e, r)
			}, i.shallowMerge(n, o), e.exports = n
		}, {
			"./constants": 1,
			"./format": 2,
			"./options": 3,
			"./parse": 6,
			"./relate": 13,
			"./util/object": 15
		}],
		18: [function(e, r, n) {
			(function(e) {
				! function(o) {
					function a(t) {
						throw RangeError(C[t])
					}

					function s(t, e) {
						for(var r = t.length; r--;) t[r] = e(t[r]);
						return t
					}

					function i(t, e) {
						return s(t.split(U), e).join(".")
					}

					function u(t) {
						for(var e, r, n = [], o = 0, a = t.length; a > o;) e = t.charCodeAt(o++), e >= 55296 && 56319 >= e && a > o ? (r = t.charCodeAt(o++), 56320 == (64512 & r) ? n.push(((1023 & e) << 10) + (1023 & r) + 65536) : (n.push(e), o--)) : n.push(e);
						return n
					}

					function h(t) {
						return s(t, function(t) {
							var e = "";
							return t > 65535 && (t -= 65536, e += D(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += D(t)
						}).join("")
					}

					function l(t) {
						return 10 > t - 48 ? t - 22 : 26 > t - 65 ? t - 65 : 26 > t - 97 ? t - 97 : j
					}

					function c(t, e) {
						return t + 22 + 75 * (26 > t) - ((0 != e) << 5)
					}

					function f(t, e, r) {
						var n = 0;
						for(t = r ? Q(t / E) : t >> 1, t += Q(t / e); t > L * A >> 1; n += j) t = Q(t / L);
						return Q(n + (L + 1) * t / (t + R))
					}

					function m(t) {
						var e, r, n, o, s, i, u, c, m, p, v = [],
							x = t.length,
							y = 0,
							d = q,
							g = P;
						for(r = t.lastIndexOf(S), 0 > r && (r = 0), n = 0; r > n; ++n) t.charCodeAt(n) >= 128 && a("not-basic"), v.push(t.charCodeAt(n));
						for(o = r > 0 ? r + 1 : 0; x > o;) {
							for(s = y, i = 1, u = j; o >= x && a("invalid-input"), c = l(t.charCodeAt(o++)), (c >= j || c > Q((I - y) / i)) && a("overflow"), y += c * i, m = g >= u ? w : u >= g + A ? A : u - g, !(m > c); u += j) p = j - m, i > Q(I / p) && a("overflow"), i *= p;
							e = v.length + 1, g = f(y - s, e, 0 == s), Q(y / e) > I - d && a("overflow"), d += Q(y / e), y %= e, v.splice(y++, 0, d)
						}
						return h(v)
					}

					function p(t) {
						var e, r, n, o, s, i, h, l, m, p, v, x, y, d, g, b = [];
						for(t = u(t), x = t.length, e = q, r = 0, s = P, i = 0; x > i; ++i) v = t[i], 128 > v && b.push(D(v));
						for(n = o = b.length, o && b.push(S); x > n;) {
							for(h = I, i = 0; x > i; ++i) v = t[i], v >= e && h > v && (h = v);
							for(y = n + 1, h - e > Q((I - r) / y) && a("overflow"), r += (h - e) * y, e = h, i = 0; x > i; ++i)
								if(v = t[i], e > v && ++r > I && a("overflow"), v == e) {
									for(l = r, m = j; p = s >= m ? w : m >= s + A ? A : m - s, !(p > l); m += j) g = l - p, d = j - p, b.push(D(c(p + g % d, 0))), l = Q(g / d);
									b.push(D(c(l, 0))), s = f(r, y, n == o), r = 0, ++n
								}++r, ++e
						}
						return b.join("")
					}

					function v(t) {
						return i(t, function(t) {
							return T.test(t) ? m(t.slice(4).toLowerCase()) : t
						})
					}

					function x(t) {
						return i(t, function(t) {
							return H.test(t) ? "xn--" + p(t) : t
						})
					}
					var y = "object" == typeof n && n,
						d = "object" == typeof r && r && r.exports == y && r,
						g = "object" == typeof e && e;
					(g.global === g || g.window === g) && (o = g);
					var b, O, I = 2147483647,
						j = 36,
						w = 1,
						A = 26,
						R = 38,
						E = 700,
						P = 72,
						q = 128,
						S = "-",
						T = /^xn--/,
						H = /[^ -~]/,
						U = /\x2E|\u3002|\uFF0E|\uFF61/g,
						C = {
							overflow: "Overflow: input needs wider integers to process",
							"not-basic": "Illegal input >= 0x80 (not a basic code point)",
							"invalid-input": "Invalid input"
						},
						L = j - w,
						Q = Math.floor,
						D = String.fromCharCode;
					if(b = {
							version: "1.2.4",
							ucs2: {
								decode: u,
								encode: h
							},
							decode: m,
							encode: p,
							toASCII: x,
							toUnicode: v
						}, "function" == typeof t && "object" == typeof t.amd && t.amd) t("punycode", function() {
						return b
					});
					else if(y && !y.nodeType)
						if(d) d.exports = b;
						else
							for(O in b) b.hasOwnProperty(O) && (y[O] = b[O]);
					else o.punycode = b
				}(this)
			}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
		}, {}],
		19: [function(t, e, r) {
			"use strict";

			function n(t, e) {
				return Object.prototype.hasOwnProperty.call(t, e)
			}
			e.exports = function(t, e, r, a) {
				e = e || "&", r = r || "=";
				var s = {};
				if("string" != typeof t || 0 === t.length) return s;
				var i = /\+/g;
				t = t.split(e);
				var u = 1e3;
				a && "number" == typeof a.maxKeys && (u = a.maxKeys);
				var h = t.length;
				u > 0 && h > u && (h = u);
				for(var l = 0; h > l; ++l) {
					var c, f, m, p, v = t[l].replace(i, "%20"),
						x = v.indexOf(r);
					x >= 0 ? (c = v.substr(0, x), f = v.substr(x + 1)) : (c = v, f = ""), m = decodeURIComponent(c), p = decodeURIComponent(f), n(s, m) ? o(s[m]) ? s[m].push(p) : s[m] = [s[m], p] : s[m] = p
				}
				return s
			};
			var o = Array.isArray || function(t) {
				return "[object Array]" === Object.prototype.toString.call(t)
			}
		}, {}],
		20: [function(t, e, r) {
			"use strict";

			function n(t, e) {
				if(t.map) return t.map(e);
				for(var r = [], n = 0; n < t.length; n++) r.push(e(t[n], n));
				return r
			}
			var o = function(t) {
				switch(typeof t) {
					case "string":
						return t;
					case "boolean":
						return t ? "true" : "false";
					case "number":
						return isFinite(t) ? t : "";
					default:
						return ""
				}
			};
			e.exports = function(t, e, r, i) {
				return e = e || "&", r = r || "=", null === t && (t = void 0), "object" == typeof t ? n(s(t), function(s) {
					var i = encodeURIComponent(o(s)) + r;
					return a(t[s]) ? n(t[s], function(t) {
						return i + encodeURIComponent(o(t))
					}).join(e) : i + encodeURIComponent(o(t[s]))
				}).join(e) : i ? encodeURIComponent(o(i)) + r + encodeURIComponent(o(t)) : ""
			};
			var a = Array.isArray || function(t) {
					return "[object Array]" === Object.prototype.toString.call(t)
				},
				s = Object.keys || function(t) {
					var e = [];
					for(var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.push(r);
					return e
				}
		}, {}],
		21: [function(t, e, r) {
			"use strict";
			r.decode = r.parse = t("./decode"), r.encode = r.stringify = t("./encode")
		}, {
			"./decode": 19,
			"./encode": 20
		}],
		22: [function(t, e, r) {
			function n() {
				this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
			}

			function o(t, e, r) {
				if(t && h(t) && t instanceof n) return t;
				var o = new n;
				return o.parse(t, e, r), o
			}

			function a(t) {
				return u(t) && (t = o(t)), t instanceof n ? t.format() : n.prototype.format.call(t)
			}

			function s(t, e) {
				return o(t, !1, !0).resolve(e)
			}

			function i(t, e) {
				return t ? o(t, !1, !0).resolveObject(e) : e
			}

			function u(t) {
				return "string" == typeof t
			}

			function h(t) {
				return "object" == typeof t && null !== t
			}

			function l(t) {
				return null === t
			}

			function c(t) {
				return null == t
			}
			var f = t("punycode");
			r.parse = o, r.resolve = s, r.resolveObject = i, r.format = a, r.Url = n;
			var m = /^([a-z0-9.+-]+:)/i,
				p = /:[0-9]*$/,
				v = ["<", ">", '"', "`", " ", "\r", "\n", "	"],
				x = ["{", "}", "|", "\\", "^", "`"].concat(v),
				y = ["'"].concat(x),
				d = ["%", "/", "?", ";", "#"].concat(y),
				g = ["/", "?", "#"],
				b = 255,
				O = /^[a-z0-9A-Z_-]{0,63}$/,
				I = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
				j = {
					javascript: !0,
					"javascript:": !0
				},
				w = {
					javascript: !0,
					"javascript:": !0
				},
				A = {
					http: !0,
					https: !0,
					ftp: !0,
					gopher: !0,
					file: !0,
					"http:": !0,
					"https:": !0,
					"ftp:": !0,
					"gopher:": !0,
					"file:": !0
				},
				R = t("querystring");
			n.prototype.parse = function(t, e, r) {
				if(!u(t)) throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
				var n = t;
				n = n.trim();
				var o = m.exec(n);
				if(o) {
					o = o[0];
					var a = o.toLowerCase();
					this.protocol = a, n = n.substr(o.length)
				}
				if(r || o || n.match(/^\/\/[^@\/]+@[^@\/]+/)) {
					var s = "//" === n.substr(0, 2);
					!s || o && w[o] || (n = n.substr(2), this.slashes = !0)
				}
				if(!w[o] && (s || o && !A[o])) {
					for(var i = -1, h = 0; h < g.length; h++) {
						var l = n.indexOf(g[h]); - 1 !== l && (-1 === i || i > l) && (i = l)
					}
					var c, p;
					p = -1 === i ? n.lastIndexOf("@") : n.lastIndexOf("@", i), -1 !== p && (c = n.slice(0, p), n = n.slice(p + 1), this.auth = decodeURIComponent(c)), i = -1;
					for(var h = 0; h < d.length; h++) {
						var l = n.indexOf(d[h]); - 1 !== l && (-1 === i || i > l) && (i = l)
					} - 1 === i && (i = n.length), this.host = n.slice(0, i), n = n.slice(i), this.parseHost(), this.hostname = this.hostname || "";
					var v = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
					if(!v)
						for(var x = this.hostname.split(/\./), h = 0, E = x.length; E > h; h++) {
							var P = x[h];
							if(P && !P.match(O)) {
								for(var q = "", S = 0, T = P.length; T > S; S++) q += P.charCodeAt(S) > 127 ? "x" : P[S];
								if(!q.match(O)) {
									var H = x.slice(0, h),
										U = x.slice(h + 1),
										C = P.match(I);
									C && (H.push(C[1]), U.unshift(C[2])), U.length && (n = "/" + U.join(".") + n), this.hostname = H.join(".");
									break
								}
							}
						}
					if(this.hostname.length > b ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), !v) {
						for(var L = this.hostname.split("."), Q = [], h = 0; h < L.length; ++h) {
							var D = L[h];
							Q.push(D.match(/[^A-Za-z0-9_-]/) ? "xn--" + f.encode(D) : D)
						}
						this.hostname = Q.join(".")
					}
					var _ = this.port ? ":" + this.port : "",
						B = this.hostname || "";
					this.host = B + _, this.href += this.host, v && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== n[0] && (n = "/" + n))
				}
				if(!j[a])
					for(var h = 0, E = y.length; E > h; h++) {
						var z = y[h],
							k = encodeURIComponent(z);
						k === z && (k = escape(z)), n = n.split(z).join(k)
					}
				var F = n.indexOf("#"); - 1 !== F && (this.hash = n.substr(F), n = n.slice(0, F));
				var V = n.indexOf("?");
				if(-1 !== V ? (this.search = n.substr(V), this.query = n.substr(V + 1), e && (this.query = R.parse(this.query)), n = n.slice(0, V)) : e && (this.search = "", this.query = {}), n && (this.pathname = n), A[a] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
					var _ = this.pathname || "",
						D = this.search || "";
					this.path = _ + D
				}
				return this.href = this.format(), this
			}, n.prototype.format = function() {
				var t = this.auth || "";
				t && (t = encodeURIComponent(t), t = t.replace(/%3A/i, ":"), t += "@");
				var e = this.protocol || "",
					r = this.pathname || "",
					n = this.hash || "",
					o = !1,
					a = "";
				this.host ? o = t + this.host : this.hostname && (o = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (o += ":" + this.port)), this.query && h(this.query) && Object.keys(this.query).length && (a = R.stringify(this.query));
				var s = this.search || a && "?" + a || "";
				return e && ":" !== e.substr(-1) && (e += ":"), this.slashes || (!e || A[e]) && o !== !1 ? (o = "//" + (o || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : o || (o = ""), n && "#" !== n.charAt(0) && (n = "#" + n), s && "?" !== s.charAt(0) && (s = "?" + s), r = r.replace(/[?#]/g, function(t) {
					return encodeURIComponent(t)
				}), s = s.replace("#", "%23"), e + o + r + s + n
			}, n.prototype.resolve = function(t) {
				return this.resolveObject(o(t, !1, !0)).format()
			}, n.prototype.resolveObject = function(t) {
				if(u(t)) {
					var e = new n;
					e.parse(t, !1, !0), t = e
				}
				var r = new n;
				if(Object.keys(this).forEach(function(t) {
						r[t] = this[t]
					}, this), r.hash = t.hash, "" === t.href) return r.href = r.format(), r;
				if(t.slashes && !t.protocol) return Object.keys(t).forEach(function(e) {
					"protocol" !== e && (r[e] = t[e])
				}), A[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r;
				if(t.protocol && t.protocol !== r.protocol) {
					if(!A[t.protocol]) return Object.keys(t).forEach(function(e) {
						r[e] = t[e]
					}), r.href = r.format(), r;
					if(r.protocol = t.protocol, t.host || w[t.protocol]) r.pathname = t.pathname;
					else {
						for(var o = (t.pathname || "").split("/"); o.length && !(t.host = o.shift()););
						t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== o[0] && o.unshift(""), o.length < 2 && o.unshift(""), r.pathname = o.join("/")
					}
					if(r.search = t.search, r.query = t.query, r.host = t.host || "", r.auth = t.auth, r.hostname = t.hostname || t.host, r.port = t.port, r.pathname || r.search) {
						var a = r.pathname || "",
							s = r.search || "";
						r.path = a + s
					}
					return r.slashes = r.slashes || t.slashes, r.href = r.format(), r
				}
				var i = r.pathname && "/" === r.pathname.charAt(0),
					h = t.host || t.pathname && "/" === t.pathname.charAt(0),
					f = h || i || r.host && t.pathname,
					m = f,
					p = r.pathname && r.pathname.split("/") || [],
					o = t.pathname && t.pathname.split("/") || [],
					v = r.protocol && !A[r.protocol];
				if(v && (r.hostname = "", r.port = null, r.host && ("" === p[0] ? p[0] = r.host : p.unshift(r.host)), r.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === o[0] ? o[0] = t.host : o.unshift(t.host)), t.host = null), f = f && ("" === o[0] || "" === p[0])), h) r.host = t.host || "" === t.host ? t.host : r.host, r.hostname = t.hostname || "" === t.hostname ? t.hostname : r.hostname, r.search = t.search, r.query = t.query, p = o;
				else if(o.length) p || (p = []), p.pop(), p = p.concat(o), r.search = t.search, r.query = t.query;
				else if(!c(t.search)) {
					if(v) {
						r.hostname = r.host = p.shift();
						var x = r.host && r.host.indexOf("@") > 0 ? r.host.split("@") : !1;
						x && (r.auth = x.shift(), r.host = r.hostname = x.shift())
					}
					return r.search = t.search, r.query = t.query, l(r.pathname) && l(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r
				}
				if(!p.length) return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(), r;
				for(var y = p.slice(-1)[0], d = (r.host || t.host) && ("." === y || ".." === y) || "" === y, g = 0, b = p.length; b >= 0; b--) y = p[b], "." == y ? p.splice(b, 1) : ".." === y ? (p.splice(b, 1), g++) : g && (p.splice(b, 1), g--);
				if(!f && !m)
					for(; g--; g) p.unshift("..");
				!f || "" === p[0] || p[0] && "/" === p[0].charAt(0) || p.unshift(""), d && "/" !== p.join("/").substr(-1) && p.push("");
				var O = "" === p[0] || p[0] && "/" === p[0].charAt(0);
				if(v) {
					r.hostname = r.host = O ? "" : p.length ? p.shift() : "";
					var x = r.host && r.host.indexOf("@") > 0 ? r.host.split("@") : !1;
					x && (r.auth = x.shift(), r.host = r.hostname = x.shift())
				}
				return f = f || r.host && p.length, f && !O && p.unshift(""), p.length ? r.pathname = p.join("/") : (r.pathname = null, r.path = null), l(r.pathname) && l(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = t.auth || r.auth, r.slashes = r.slashes || t.slashes, r.href = r.format(), r
			}, n.prototype.parseHost = function() {
				var t = this.host,
					e = p.exec(t);
				e && (e = e[0], ":" !== e && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t)
			}
		}, {
			punycode: 18,
			querystring: 21
		}]
	}, {}, [17])(17)
});