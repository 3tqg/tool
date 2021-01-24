/*!

 * HTMLMinifier v0.7.2 (http://kangax.github.io/html-minifier/)

 * Copyright 2010-2015 Juriy "kangax" Zaytsev

 * Licensed under the MIT license

 */

! function(a) {

	"use strict";

	function b(a) {

		var b, c = new RegExp("(?:\\s*[\\w:\\.-]+(?:\\s*(?:" + d(a) + ")\\s*(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>\\s]+))?)*");

		if(a.customAttrSurround) {

			for(var e = [], f = a.customAttrSurround.length - 1; f >= 0; f--) e[f] = "(?:\\s*" + a.customAttrSurround[f][0].source + c.source + a.customAttrSurround[f][1].source + ")";

			e.unshift(c.source), b = new RegExp("((?:" + e.join("|") + ")*)")

		} else b = new RegExp("(" + c.source + ")");

		return new RegExp(j.source + b.source + k.source)

	}

	function c(a) {

		var b = new RegExp(f.source + "(?:\\s*(" + d(a) + ")\\s*(?:" + i.join("|") + "))?");

		if(a.customAttrSurround) {

			for(var c = [], e = a.customAttrSurround.length - 1; e >= 0; e--) c[e] = "(?:(" + a.customAttrSurround[e][0].source + ")" + b.source + "(" + a.customAttrSurround[e][1].source + "))";

			return c.unshift("(?:" + b.source + ")"), new RegExp(c.join("|"), "g")

		}

		return new RegExp(b.source, "g")

	}

	function d(a) {

		return h.concat(a.customAttrAssign || []).map(function(a) {

			return "(?:" + a.source + ")"

		}).join("|")

	}

	function e(a) {

		for(var b = {}, c = a.split(","), d = 0; d < c.length; d++) b[c[d]] = !0, b[c[d].toUpperCase()] = !0;

		return b

	}

	var f = /([\w:\.-]+)/,

		g = /=/,

		h = [g],

		i = [/"((?:\\.|[^"])*)"/.source, /'((?:\\.|[^'])*)'/.source, /([^>\s]+)/.source],

		j = /^<([\w:-]+)/,

		k = /\s*(\/?)>/,

		l = /^<\/([\w:-]+)[^>]*>/,

		m = /\/>$/,

		n = /^<!DOCTYPE [^>]+>/i,

		o = !1;

	"x".replace(/x(.)?/g, function(a, b) {

		o = "" === b

	});

	var p, q, r, s = e("area,base,basefont,br,col,frame,hr,img,input,isindex,link,meta,param,embed,wbr"),

		t = e("a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,code,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,noscript,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,svg,textarea,tt,u,var"),

		u = e("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),

		v = e("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"),

		w = e("script,style,noscript"),

		x = {},

		y = a.HTMLParser = function(a, d) {

			function e(a, b, c, e) {

				for(var g = !1; !d.html5 && y.last() && t[y.last()];) f("", y.last());

				u[b] && y.last() === b && f("", b), e = s[b] || !!e;

				var h = [];

				c.replace(B, function() {

					var a, b, c, e, f, g, i, j = 7;

					if(o && -1 === arguments[0].indexOf('""') && ("" === arguments[3] && (arguments[3] = void 0), "" === arguments[4] && (arguments[4] = void 0), "" === arguments[5] && (arguments[5] = void 0)), a = arguments[1]) g = arguments[2], c = arguments[3], b = c || arguments[4] || arguments[5], g && (i = arguments[0].charAt(a.length + g.length), i = "'" === i || '"' === i ? i : "");

					else if(d.customAttrSurround)

						for(var k = d.customAttrSurround.length - 1; k >= 0; k--)

							if(a = arguments[k * j + 7], g = arguments[k * j + 8], a) {

								c = arguments[k * j + 9], b = c || arguments[k * j + 10] || arguments[k * j + 11], e = arguments[k * j + 6], f = arguments[k * j + 12];

								break

							}

					void 0 === b && (b = v[a] ? a : c), h.push({

						name: a,

						value: b,

						escaped: b && b.replace(/(^|.)("+)/g, function(a) {

							return a.replace(/"/g, "&quot;")

						}),

						customAssign: g || "=",

						customOpen: e || "",

						customClose: f || "",

						quote: i || ""

					})

				}), e ? g = a.match(m) : y.push({

					tag: b,

					attrs: h

				}), d.start && d.start(b, h, e, g)

			}

			function f(a, b) {

				var c;

				if(b) {

					var e = b.toLowerCase();

					for(c = y.length - 1; c >= 0 && y[c].tag.toLowerCase() !== e; c--);

				} else c = 0;

				if(c >= 0) {

					for(var f = y.length - 1; f >= c; f--) d.end && d.end(y[f].tag, y[f].attrs);

					y.length = c

				}

			}

			var g, h, i, j, k, y = [],

				z = a;

			y.last = function() {

				var a = this[this.length - 1];

				return a && a.tag

			};

			for(var A = b(d), B = c(d); a;) {

				if(h = !0, y.last() && w[y.last()]) p = y.last().toLowerCase(), q = x[p] || (x[p] = new RegExp("([\\s\\S]*?)</" + p + "[^>]*>", "i")), a = a.replace(q, function(a, b) {

					return "script" !== p && "style" !== p && "noscript" !== p && (b = b.replace(/<!--([\s\S]*?)-->/g, "$1").replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")), d.chars && d.chars(b), ""

				}), f("", p);

				else if(/^<!--/.test(a) && (g = a.indexOf("-->"), g >= 0 && (d.comment && d.comment(a.substring(4, g)), a = a.substring(g + 3), h = !1)), /^<!\[/.test(a) ? (g = a.indexOf("]>"), g >= 0 && (d.comment && d.comment(a.substring(2, g + 1), !0), a = a.substring(g + 2), h = !1)) : /^<\?/.test(a) ? (g = a.indexOf("?>", 2), g >= 0 && (d.chars && d.chars(a.substring(0, g + 2)), a = a.substring(g + 2))) : /^<%/.test(a) ? (g = a.indexOf("%>", 2), g >= 0 && (d.chars && d.chars(a.substring(0, g + 2)), a = a.substring(g + 2))) : (i = n.exec(a)) ? (d.doctype && d.doctype(i[0]), a = a.substring(i[0].length), h = !1) : /^<\//.test(a) ? (i = a.match(l), i && (a = a.substring(i[0].length), i[0].replace(l, f), j = "/" + i[1].toLowerCase(), h = !1)) : /^</.test(a) && (i = a.match(A), i && (a = a.substring(i[0].length), i[0].replace(A, e), j = i[1].toLowerCase(), h = !1)), h) {

					g = a.indexOf("<");

					var C = 0 > g ? a : a.substring(0, g);

					a = 0 > g ? "" : a.substring(g), r = a.match(A), r ? k = r[1] : (r = a.match(l), k = r ? "/" + r[1] : ""), d.chars && d.chars(C, j, k)

				}

				if(a === z) throw "Parse Error: " + a;

				z = a

			}

			f()

		};

	a.HTMLtoXML = function(a) {

		var b = "";

		return new y(a, {

			start: function(a, c, d) {

				b += "<" + a;

				for(var e = 0; e < c.length; e++) b += " " + c[e].name + '="' + c[e].escaped + '"';

				b += (d ? "/" : "") + ">"

			},

			end: function(a) {

				b += "</" + a + ">"

			},

			chars: function(a) {

				b += a

			},

			comment: function(a) {

				b += "<!--" + a + "-->"

			},

			ignore: function(a) {

				b += a

			}

		}), b

	}, a.HTMLtoDOM = function(a, b) {

		var c = e("html,head,body,title"),

			d = {

				link: "head",

				base: "head"

			};

		b ? b = b.ownerDocument || b.getOwnerDocument && b.getOwnerDocument() || b : "undefined" != typeof DOMDocument ? b = new DOMDocument : "undefined" != typeof document && document.implementation && document.implementation.createDocument ? b = document.implementation.createDocument("", "", null) : "undefined" != typeof ActiveX && (b = new ActiveXObject("Msxml.DOMDocument"));

		var f = [],

			g = b.documentElement || b.getDocumentElement && b.getDocumentElement();

		if(!g && b.createElement && ! function() {

				var a = b.createElement("html"),

					c = b.createElement("head");

				c.appendChild(b.createElement("title")), a.appendChild(c), a.appendChild(b.createElement("body")), b.appendChild(a)

			}(), b.getElementsByTagName)

			for(var h in c) c[h] = b.getElementsByTagName(h)[0];

		var i = c.body;

		return new y(a, {

			start: function(a, e, g) {

				if(c[a]) return void(i = c[a]);

				var h = b.createElement(a);

				for(var j in e) h.setAttribute(e[j].name, e[j].value);

				d[a] && "boolean" != typeof c[d[a]] ? c[d[a]].appendChild(h) : i && i.appendChild && i.appendChild(h), g || (f.push(h), i = h)

			},

			end: function() {

				f.length -= 1, i = f[f.length - 1]

			},

			chars: function(a) {

				i.appendChild(b.createTextNode(a))

			},

			comment: function() {},

			ignore: function() {}

		}), b

	}

}("undefined" == typeof exports ? this : exports),

function(a) {

	"use strict";

	function b(a) {

		return a ? a.replace(/[\t\n\r ]+/g, " ") : a

	}

	function c(a, b, c, d) {

		var e = ["a", "abbr", "acronym", "b", "bdi", "bdo", "big", "button", "cite", "code", "del", "dfn", "em", "font", "i", "ins", "kbd", "mark", "q", "rt", "rp", "s", "samp", "small", "span", "strike", "strong", "sub", "sup", "svg", "time", "tt", "u", "var"],

			f = /^[\t ]*[\n\r]+[\t\n\r ]*/,

			g = /[\t\n\r ]*[\n\r]+[\t ]*$/,

			h = f.test(a) ? "\n" : " ",

			i = g.test(a) ? "\n" : " ",

			j = "htmlmincollapsedlinebreak";

		return b && "img" !== b && "input" !== b && ("/" !== b.substr(0, 1) || "/" === b.substr(0, 1) && -1 === e.indexOf(b.substr(1))) && (a = a.replace(/^\s+/, d.conservativeCollapse ? " " : d.preserveLineBreaks ? h : "")), c && "img" !== c && "input" !== c && ("/" === c.substr(0, 1) || "/" !== c.substr(0, 1) && -1 === e.indexOf(c)) && (a = a.replace(/\s+$/, d.conservativeCollapse ? " " : d.preserveLineBreaks ? i : "")), b && c ? (d.preserveLineBreaks && (a = a.replace(f, j).replace(g, j)), a.replace(/[\t\n\r]+/g, " ").replace(/[ ]+/g, " ").replace(new RegExp(j, "g"), "\n")) : a

	}

	function d(a) {

		return /\[if[^\]]+\]/.test(a) || /\s*((?:<!)?\[endif\])$/.test(a)

	}

	function e(a, b) {

		if(/^!/.test(a)) return !0;

		if(b.ignoreCustomComments)

			for(var c = 0, d = b.ignoreCustomComments.length; d > c; c++)

				if(b.ignoreCustomComments[c].test(a)) return !0;

		return !1

	}

	function f(a) {

		return /^on[a-z]+/.test(a)

	}

	function g(a) {

		return /^[^\x20\t\n\f\r"'`=<>]+$/.test(a) && !/\/$/.test(a) && !/\/$/.test(a)

	}

	function h(a, b) {

		for(var c = a.length; c--;)

			if(a[c].name.toLowerCase() === b) return !0;

		return !1

	}

	function i(a, b, c, d) {

		return c = c ? M(c.toLowerCase()) : "", "script" === a && "language" === b && "javascript" === c || "form" === a && "method" === b && "get" === c || "input" === a && "type" === b && "text" === c || "script" === a && "charset" === b && !h(d, "src") || "a" === a && "name" === b && h(d, "id") || "area" === a && "shape" === b && "rect" === c

	}

	function j(a, b, c) {

		return "script" === a && "type" === b && "text/javascript" === M(c.toLowerCase())

	}

	function k(a, b) {

		if("script" !== a) return !1;

		for(var c = 0, d = b.length; d > c; c++) {

			var e = b[c].name.toLowerCase();

			if("type" === e) return "" === b[c].value || 1 === N[b[c].value]

		}

		return !0

	}

	function l(a, b, c) {

		return("style" === a || "link" === a) && "type" === b && "text/css" === M(c.toLowerCase())

	}

	function m(a, b) {

		var c = /^(?:allowfullscreen|async|autofocus|autoplay|checked|compact|controls|declare|default|defaultchecked|defaultmuted|defaultselected|defer|disabled|enabled|formnovalidate|hidden|indeterminate|inert|ismap|itemscope|loop|multiple|muted|nohref|noresize|noshade|novalidate|nowrap|open|pauseonexit|readonly|required|reversed|scoped|seamless|selected|sortable|spellcheck|truespeed|typemustmatch|visible)$/i.test(a);

		if(c) return !0;

		var d = O[a.toLowerCase()];

		return d ? -1 === d.indexOf(b.toLowerCase()) : !1

	}

	function n(a, b) {

		return /^(?:a|area|link|base)$/.test(b) && "href" === a || "img" === b && /^(?:src|longdesc|usemap)$/.test(a) || "object" === b && /^(?:classid|codebase|data|usemap)$/.test(a) || "q" === b && "cite" === a || "blockquote" === b && "cite" === a || ("ins" === b || "del" === b) && "cite" === a || "form" === b && "action" === a || "input" === b && ("src" === a || "usemap" === a) || "head" === b && "profile" === a || "script" === b && ("src" === a || "for" === a)

	}

	function o(a, b) {

		return /^(?:a|area|object|button)$/.test(b) && "tabindex" === a || "input" === b && ("maxlength" === a || "tabindex" === a) || "select" === b && ("size" === a || "tabindex" === a) || "textarea" === b && /^(?:rows|cols|tabindex)$/.test(a) || "colgroup" === b && "span" === a || "col" === b && "span" === a || ("th" === b || "td" === b) && ("rowspan" === a || "colspan" === a)

	}

	function p(a, c, d, e, g) {

		if(d && f(c)) {

			if(d = M(d).replace(/^javascript:\s*/i, "").replace(/\s*;$/, ""), e.minifyJS) {

				var h = "(function(){" + d + "})()",

					i = G(h, e.minifyJS);

				return i.slice(12, i.length - 4).replace(/"/g, "&quot;")

			}

			return d

		}

		return "class" === c ? b(M(d)) : n(c, a) ? (d = M(d), e.minifyURLs ? F(d, e.minifyURLs) : d) : o(c, a) ? M(d) : "style" === c ? (d = M(d), d && (d = d.replace(/\s*;\s*$/, "")), e.minifyCSS ? H(d, e.minifyCSS, !0) : d) : (q(a, g) && "content" === c ? d = d.replace(/1\.0/g, "1").replace(/\s+/g, "") : d && e.customAttrCollapse && e.customAttrCollapse.test(c) && (d = d.replace(/\n+/g, "")), d)

	}

	function q(a, b) {

		if("meta" !== a) return !1;

		for(var c = 0, d = b.length; d > c; c++)

			if("name" === b[c].name && "viewport" === b[c].value) return !0

	}

	function r(a) {

		return "*{" + a + "}"

	}

	function s(a) {

		var b = a.match(/^\*\{([\s\S]*)\}$/m);

		return b && b[1] ? b[1] : a

	}

	function t(a) {

		return a.replace(/^(\[[^\]]+\]>)\s*/, "$1").replace(/\s*(<!\[endif\])$/, "$1")

	}

	function u(a) {

		return a.replace(/^(?:\s*\/\*\s*<!\[CDATA\[\s*\*\/|\s*\/\/\s*<!\[CDATA\[.*)/, "").replace(/(?:\/\*\s*\]\]>\s*\*\/|\/\/\s*\]\]>)\s*$/, "")

	}

	function v(a, b, c) {

		for(var d = 0, e = c.length; e > d; d++)

			if("type" === c[d].name.toLowerCase() && b.processScripts.indexOf(c[d].value) > -1) return I(a, b);

		return a

	}

	function w(a, b) {

		return a.replace(P[b], "").replace(Q[b], "")

	}

	function x(a) {

		return /^(?:html|t?body|t?head|tfoot|tr|td|th|dt|dd|option|colgroup|source)$/.test(a)

	}

	function y(a, b, c) {

		var d = !c || /^\s*$/.test(c);

		return d ? "input" === a && "value" === b || R.test(b) : !1

	}

	function z(a, b) {

		if("textarea" === a) return !1;

		if("script" === a)

			for(var c = b.length - 1; c >= 0; c--)

				if("src" === b[c].name) return !1;

		return !0

	}

	function A(a) {

		return !/^(?:script|style|pre|textarea)$/.test(a)

	}

	function B(a) {

		return !/^(?:pre|textarea)$/.test(a)

	}

	function C(a) {

		for(var b = "", c = 0, d = a.length; d > c; c++) b += " " + a[c].name + (m(a[c].value) ? "" : '="' + a[c].value + '"');

		return b

	}

	function D(a, b, c, d, e, f) {

		var h, k, n = f.caseSensitive ? a.name : a.name.toLowerCase(),

			o = f.preventAttributesEscaping ? a.value : a.escaped,

			q = f.preventAttributesEscaping ? a.quote : '"',

			r = d && e === b.length - 1;

		return f.removeRedundantAttributes && i(c, n, o, b) || f.removeScriptTypeAttributes && j(c, n, o) || f.removeStyleLinkTypeAttributes && l(c, n, o) ? "" : (o = p(c, n, o, f, b), k = void 0 !== o && !f.removeAttributeQuotes || !g(o) || r ? q + o + q : o, f.removeEmptyAttributes && y(c, n, o) ? "" : (h = void 0 === o || f.collapseBooleanAttributes && m(n, o) ? n : n + a.customAssign + k, " " + a.customOpen + h + a.customClose))

	}

	function E(a) {

		for(var b = ["canCollapseWhitespace", "canTrimWhitespace"], c = 0, d = b.length; d > c; c++) a[b[c]] || (a[b[c]] = function() {

			return !1

		})

	}

	function F(b, c) {

		"object" != typeof c && (c = {});

		try {

			var d = a.RelateUrl;

			return "undefined" == typeof d && "function" == typeof require && (d = require("relateurl")), d && d.relate ? d.relate(b, c) : b

		} catch(e) {

			K(e)

		}

		return b

	}

	function G(b, c) {

		"object" != typeof c && (c = {}), c.fromString = !0;

		var d = c.output || {};

		d.inline_script = !0, c.output = d;

		try {

			var e = a.UglifyJS;

			if("undefined" == typeof e && "function" == typeof require && (e = require("uglify-js")), !e) return b;

			if(e.minify) return e.minify(b, c).code;

			if(e.parse) {

				var f = e.parse(b);

				f.figure_out_scope();

				var g = e.Compressor(),

					h = f.transform(g);

				h.figure_out_scope(), h.compute_char_frequency(), c.mangle !== !1 && h.mangle_names();

				var i = e.OutputStream(c.output);

				return h.print(i), i.toString()

			}

			return b

		} catch(j) {

			K(j)

		}

		return b

	}

	function H(a, b, c) {

		"object" != typeof b && (b = {}), "undefined" == typeof b.advanced && (b.advanced = !1);

		try {

			var d;

			if("undefined" != typeof CleanCSS) d = new CleanCSS(b);

			else if("function" == typeof require) {

				var e = require("clean-css");

				d = new e(b)

			}

			return c ? s(d.minify(r(a)).styles) : d.minify(a).styles

		} catch(f) {

			K(f)

		}

		return a

	}

	function I(a, f) {

		function g(a, b) {

			return A(a) || f.canCollapseWhitespace(a, b)

		}

		function h(a, b) {

			return B(a) || f.canTrimWhitespace(a, b)

		}

		f = f || {};

		var i = [];

		a = M(a), E(f);

		var j = [],

			l = [],

			m = "",

			n = "",

			o = [],

			p = [],

			q = [],

			r = f.lint,

			s = !1,

			y = new Date;

		f.removeIgnored && (a = a.replace(/<\?[^\?]+\?>/g, "").replace(/<%[^%]+%>/g, "")), new L(a, {

			html5: "undefined" != typeof f.html5 ? f.html5 : !0,

			start: function(a, b, c, d) {

				if(s) return void l.push("<" + a, C(b), d ? "/" : "", ">");

				var e = a.toLowerCase();

				if("svg" === e) {

					i.push(f);

					var j = {};

					for(var k in f) j[k] = f[k];

					j.keepClosingSlash = !0, j.caseSensitive = !0, f = j

				}

				a = f.caseSensitive ? a : e, n = a, m = "", o = b, f.collapseWhitespace && (h(a, b) || p.push(a), g(a, b) || q.push(a));

				var t = "<" + a,

					u = (d && f.keepClosingSlash ? "/" : "") + ">";

				0 === b.length && (t += u), l.push(t), r && r.testElement(a);

				for(var v, w = 0, x = b.length; x > w; w++) r && r.testAttribute(a, b[w].name.toLowerCase(), b[w].escaped), v = D(b[w], b, a, d, w, f), w === x - 1 && (v += u), l.push(v)

			},

			end: function(a, b) {

				if(s) return void l.push("</" + a + ">");

				var c = a.toLowerCase();

				"svg" === c && (f = i.pop()), f.collapseWhitespace && (p.length && a === p[p.length - 1] && p.pop(), q.length && a === q[q.length - 1] && q.pop());

				var d = "" === m && a === n;

				if(f.removeEmptyElements && d && z(a, b)) {

					for(var e = l.length - 1; e >= 0; e--)

						if(/^<[^\/!]/.test(l[e])) {

							l.splice(e);

							break

						}

				} else f.removeOptionalTags && x(a) || (l.push("</" + (f.caseSensitive ? a : c) + ">"), j.push.apply(j, l), l.length = 0, m = "")

			},

			chars: function(a, d, e) {

				return d = "" === d ? "comment" : d, e = "" === e ? "comment" : e, s ? void l.push(a) : (("script" === n || "style" === n) && (f.removeCommentsFromCDATA && (a = w(a, n)), f.removeCDATASectionsFromCDATA && (a = u(a)), f.processScripts && (a = v(a, f, o))), f.minifyJS && k(n, o) && (a = G(a, f.minifyJS)), "style" === n && f.minifyCSS && (a = H(a, f.minifyCSS)), f.collapseWhitespace && (p.length || (a = d && "comment" !== d || e && "comment" !== e ? c(a, d, e, f) : M(a)), q.length || (a = d && e || "html" === e ? a : b(a))), m = a, r && r.testChars(a), void l.push(a))

			},

			comment: function(a, b) {

				var c = b ? "<!" : "<!--",

					g = b ? ">" : "-->";

				return /^\s*htmlmin:ignore/.test(a) ? (s = !s, void(f.removeComments || l.push("<!--" + a + "-->"))) : (a = f.removeComments ? d(a) ? c + t(a) + g : e(a, f) ? "<!--" + a + "-->" : "" : c + a + g, void l.push(a))

			},

			doctype: function(a) {

				l.push(f.useShortDoctype ? "<!DOCTYPE html>" : b(a))

			},

			customAttrAssign: f.customAttrAssign,

			customAttrSurround: f.customAttrSurround

		}), j.push.apply(j, l);

		var F = J(j, f);

		return K("minified in: " + (new Date - y) + "ms"), F

	}

	function J(a, b) {

		var c, d = b.maxLineLength;

		if(d) {

			for(var e, f = [], g = "", h = 0, i = a.length; i > h; h++) e = a[h], g.length + e.length < d ? g += e : (f.push(g.replace(/^\n/, "")), g = e);

			f.push(g), c = f.join("\n")

		} else c = a.join("");

		return c

	}

	var K, L;

	K = a.console && a.console.log ? function(b) {

		a.console.log(b)

	} : function() {}, a.HTMLParser ? L = a.HTMLParser : "function" == typeof require && (L = require("./htmlparser").HTMLParser);

	var M = function(a) {

		return "string" != typeof a ? a : a.replace(/^\s+/, "").replace(/\s+$/, "")

	};

	String.prototype.trim && (M = function(a) {

		return "string" != typeof a ? a : a.trim()

	});

	var N = {

			"text/javascript": 1,

			"text/ecmascript": 1,

			"text/jscript": 1,

			"application/javascript": 1,

			"application/x-javascript": 1,

			"application/ecmascript": 1

		},

		O = {

			draggable: ["true", "false"]

		},

		P = {

			script: /^\s*(?:\/\/)?\s*<!--.*\n?/,

			style: /^\s*<!--\s*/

		},

		Q = {

			script: /\s*(?:\/\/)?\s*-->\s*$/,

			style: /\s*-->\s*$/

		},

		R = new RegExp("^(?:class|id|style|title|lang|dir|on(?:focus|blur|change|click|dblclick|mouse(?:down|up|over|move|out)|key(?:press|down|up)))$");

	"undefined" != typeof exports ? exports.minify = I : a.minify = I

}("undefined" == typeof exports ? this : exports),

function(a) {

	"use strict";

	function b(a) {

		return /^(?:big|small|hr|blink|marquee)$/.test(a)

	}

	function c(a) {

		return /^(?:applet|basefont|center|dir|font|isindex|strike)$/.test(a)

	}

	function d(a) {

		return /^on[a-z]+/.test(a)

	}

	function e(a) {

		return "style" === a.toLowerCase()

	}

	function f(a, b) {

		return "align" === b && /^(?:caption|applet|iframe|img|imput|object|legend|table|hr|div|h[1-6]|p)$/.test(a) || "alink" === b && "body" === a || "alt" === b && "applet" === a || "archive" === b && "applet" === a || "background" === b && "body" === a || "bgcolor" === b && /^(?:table|t[rdh]|body)$/.test(a) || "border" === b && /^(?:img|object)$/.test(a) || "clear" === b && "br" === a || "code" === b && "applet" === a || "codebase" === b && "applet" === a || "color" === b && /^(?:base(?:font)?)$/.test(a) || "compact" === b && /^(?:dir|[dou]l|menu)$/.test(a) || "face" === b && /^base(?:font)?$/.test(a) || "height" === b && /^(?:t[dh]|applet)$/.test(a) || "hspace" === b && /^(?:applet|img|object)$/.test(a) || "language" === b && "script" === a || "link" === b && "body" === a || "name" === b && "applet" === a || "noshade" === b && "hr" === a || "nowrap" === b && /^t[dh]$/.test(a) || "object" === b && "applet" === a || "prompt" === b && "isindex" === a || "size" === b && /^(?:hr|font|basefont)$/.test(a) || "start" === b && "ol" === a || "text" === b && "body" === a || "type" === b && /^(?:li|ol|ul)$/.test(a) || "value" === b && "li" === a || "version" === b && "html" === a || "vlink" === b && "body" === a || "vspace" === b && /^(?:applet|img|object)$/.test(a) || "width" === b && /^(?:hr|td|th|applet|pre)$/.test(a)

	}

	function g(a, b) {

		return "href" === a && /^\s*javascript\s*:\s*void\s*(\s+0|\(\s*0\s*\))\s*$/i.test(b)

	}

	function h() {

		this.log = [], this._lastElement = null, this._isElementRepeated = !1

	}

	h.prototype.testElement = function(a) {

		c(a) ? this.log.push('Found <span class="deprecated-element">deprecated</span> <strong><code>&lt;' + a + "&gt;</code></strong> element") : b(a) ? this.log.push('Found <span class="presentational-element">presentational</span> <strong><code>&lt;' + a + "&gt;</code></strong> element") : this.checkRepeatingElement(a)

	}, h.prototype.checkRepeatingElement = function(a) {

		"br" === a && "br" === this._lastElement ? this._isElementRepeated = !0 : this._isElementRepeated && (this._reportRepeatingElement(), this._isElementRepeated = !1), this._lastElement = a

	}, h.prototype._reportRepeatingElement = function() {

		this.log.push("Found <code>&lt;br></code> sequence. Try replacing it with styling.")

	}, h.prototype.testAttribute = function(a, b, c) {

		d(b) ? this.log.push('Found <span class="event-attribute">event attribute</span> (<strong>' + b + "</strong>) on <strong><code>&lt;" + a + "&gt;</code></strong> element.") : f(a, b) ? this.log.push('Found <span class="deprecated-attribute">deprecated</span> <strong>' + b + "</strong> attribute on <strong><code>&lt;" + a + "&gt;</code></strong> element.") : e(b) ? this.log.push('Found <span class="style-attribute">style attribute</span> on <strong><code>&lt;' + a + "&gt;</code></strong> element.") : g(b, c) && this.log.push('Found <span class="inaccessible-attribute">inaccessible attribute</span> (on <strong><code>&lt;' + a + "&gt;</code></strong> element).")

	}, h.prototype.testChars = function(a) {

		this._lastElement = "", /(&nbsp;\s*){2,}/.test(a) && this.log.push("Found repeating <strong><code>&amp;nbsp;</code></strong> sequence. Try replacing it with styling.")

	}, h.prototype.test = function(a, b, c) {

		this.testElement(a), this.testAttribute(a, b, c)

	}, h.prototype.populate = function(a) {

		if(this._isElementRepeated && this._reportRepeatingElement(), this.log.length)

			if(a) a.innerHTML = "<ol><li>" + this.log.join("<li>") + "</ol>";

			else {

				var b = " - " + this.log.join("\n - ").replace(/(<([^>]+)>)/gi, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

				console.log(b)

			}

	}, a.HTMLLint = h

}("undefined" == typeof exports ? this : exports);
