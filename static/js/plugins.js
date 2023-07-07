// Avoid `console` errors in browsers that lack a console.
(function () {
  var method;
  var noop = function () {};
  var methods = [
    "assert",
    "clear",
    "count",
    "debug",
    "dir",
    "dirxml",
    "error",
    "exception",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "markTimeline",
    "profile",
    "profileEnd",
    "table",
    "time",
    "timeEnd",
    "timeline",
    "timelineEnd",
    "timeStamp",
    "trace",
    "warn",
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
})();

/*!
 *
 *   typed.js - A JavaScript Typing Animation Library
 *   Author: Matt Boldt <me@mattboldt.com>
 *   Version: v2.0.12
 *   Url: https://github.com/mattboldt/typed.js
 *   License(s): MIT
 *
 */
!(function (t) {
  "use strict";
  var s = function (s, e) {
    (this.el = t(s)),
      (this.options = t.extend({}, t.fn.typed.defaults, e)),
      (this.isInput = this.el.is("input")),
      (this.attr = this.options.attr),
      (this.showCursor = this.isInput ? !1 : this.options.showCursor),
      (this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text()),
      (this.contentType = this.options.contentType),
      (this.typeSpeed = this.options.typeSpeed),
      (this.startDelay = this.options.startDelay),
      (this.backSpeed = this.options.backSpeed),
      (this.backDelay = this.options.backDelay),
      (this.stringsElement = this.options.stringsElement),
      (this.strings = this.options.strings),
      (this.strPos = 0),
      (this.arrayPos = 0),
      (this.stopNum = 0),
      (this.loop = this.options.loop),
      (this.loopCount = this.options.loopCount),
      (this.curLoop = 0),
      (this.stop = !1),
      (this.cursorChar = this.options.cursorChar),
      (this.shuffle = this.options.shuffle),
      (this.sequence = []),
      this.build();
  };
  (s.prototype = {
    constructor: s,
    init: function () {
      var t = this;
      t.timeout = setTimeout(function () {
        for (var s = 0; s < t.strings.length; ++s) t.sequence[s] = s;
        t.shuffle && (t.sequence = t.shuffleArray(t.sequence)),
          t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos);
      }, t.startDelay);
    },
    build: function () {
      var s = this;
      if (
        (this.showCursor === !0 &&
          ((this.cursor = t(
            '<span class="typed-cursor">' + this.cursorChar + "</span>"
          )),
          this.el.after(this.cursor)),
        this.stringsElement)
      ) {
        (this.strings = []),
          this.stringsElement.hide(),
          console.log(this.stringsElement.children());
        var e = this.stringsElement.children();
        t.each(e, function (e, i) {
          s.strings.push(t(i).html());
        });
      }
      this.init();
    },
    typewrite: function (t, s) {
      if (this.stop !== !0) {
        var e = Math.round(70 * Math.random()) + this.typeSpeed,
          i = this;
        i.timeout = setTimeout(function () {
          var e = 0,
            r = t.substr(s);
          if ("^" === r.charAt(0)) {
            var o = 1;
            /^\^\d+/.test(r) &&
              ((r = /\d+/.exec(r)[0]), (o += r.length), (e = parseInt(r))),
              (t = t.substring(0, s) + t.substring(s + o));
          }
          if ("html" === i.contentType) {
            var n = t.substr(s).charAt(0);
            if ("<" === n || "&" === n) {
              var a = "",
                h = "";
              for (h = "<" === n ? ">" : ";"; t.substr(s + 1).charAt(0) !== h; )
                (a += t.substr(s).charAt(0)), s++;
              s++, (a += h);
            }
          }
          i.timeout = setTimeout(function () {
            if (s === t.length) {
              if (
                (i.options.onStringTyped(i.arrayPos),
                i.arrayPos === i.strings.length - 1 &&
                  (i.options.callback(),
                  i.curLoop++,
                  i.loop === !1 || i.curLoop === i.loopCount))
              )
                return;
              i.timeout = setTimeout(function () {
                i.backspace(t, s);
              }, i.backDelay);
            } else {
              0 === s && i.options.preStringTyped(i.arrayPos);
              var e = t.substr(0, s + 1);
              i.attr
                ? i.el.attr(i.attr, e)
                : i.isInput
                ? i.el.val(e)
                : "html" === i.contentType
                ? i.el.html(e)
                : i.el.text(e),
                s++,
                i.typewrite(t, s);
            }
          }, e);
        }, e);
      }
    },
    backspace: function (t, s) {
      if (this.stop !== !0) {
        var e = Math.round(70 * Math.random()) + this.backSpeed,
          i = this;
        i.timeout = setTimeout(function () {
          if ("html" === i.contentType && ">" === t.substr(s).charAt(0)) {
            for (var e = ""; "<" !== t.substr(s - 1).charAt(0); )
              (e -= t.substr(s).charAt(0)), s--;
            s--, (e += "<");
          }
          var r = t.substr(0, s);
          i.attr
            ? i.el.attr(i.attr, r)
            : i.isInput
            ? i.el.val(r)
            : "html" === i.contentType
            ? i.el.html(r)
            : i.el.text(r),
            s > i.stopNum
              ? (s--, i.backspace(t, s))
              : s <= i.stopNum &&
                (i.arrayPos++,
                i.arrayPos === i.strings.length
                  ? ((i.arrayPos = 0),
                    i.shuffle && (i.sequence = i.shuffleArray(i.sequence)),
                    i.init())
                  : i.typewrite(i.strings[i.sequence[i.arrayPos]], s));
        }, e);
      }
    },
    shuffleArray: function (t) {
      var s,
        e,
        i = t.length;
      if (i)
        for (; --i; )
          (e = Math.floor(Math.random() * (i + 1))),
            (s = t[e]),
            (t[e] = t[i]),
            (t[i] = s);
      return t;
    },
    reset: function () {
      var t = this;
      clearInterval(t.timeout);
      this.el.attr("id");
      this.el.empty(),
        "undefined" != typeof this.cursor && this.cursor.remove(),
        (this.strPos = 0),
        (this.arrayPos = 0),
        (this.curLoop = 0),
        this.options.resetCallback();
    },
  }),
    (t.fn.typed = function (e) {
      return this.each(function () {
        var i = t(this),
          r = i.data("typed"),
          o = "object" == typeof e && e;
        r && r.reset(),
          i.data("typed", (r = new s(this, o))),
          "string" == typeof e && r[e]();
      });
    }),
    (t.fn.typed.defaults = {
      strings: [
        "These are the default values...",
        "You know what you should do?",
        "Use your own!",
        "Have a great day!",
      ],
      stringsElement: null,
      typeSpeed: 0,
      startDelay: 0,
      backSpeed: 0,
      shuffle: !1,
      backDelay: 500,
      loop: !1,
      loopCount: !1,
      showCursor: !0,
      cursorChar: "|",
      attr: null,
      contentType: "html",
      callback: function () {},
      preStringTyped: function () {},
      onStringTyped: function () {},
      resetCallback: function () {},
    });
})(window.jQuery);

/* Tiny Slider */
var tns = (function () {
  Object.keys ||
    (Object.keys = function (t) {
      var e = [];
      for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.push(n);
      return e;
    }),
    "remove" in Element.prototype ||
      (Element.prototype.remove = function () {
        this.parentNode && this.parentNode.removeChild(this);
      });
  var t = window,
    Oi =
      t.requestAnimationFrame ||
      t.webkitRequestAnimationFrame ||
      t.mozRequestAnimationFrame ||
      t.msRequestAnimationFrame ||
      function (t) {
        return setTimeout(t, 16);
      },
    e = window,
    Di =
      e.cancelAnimationFrame ||
      e.mozCancelAnimationFrame ||
      function (t) {
        clearTimeout(t);
      };
  function Hi() {
    for (
      var t, e, n, i = arguments[0] || {}, a = 1, r = arguments.length;
      a < r;
      a++
    )
      if (null !== (t = arguments[a]))
        for (e in t) i !== (n = t[e]) && void 0 !== n && (i[e] = n);
    return i;
  }
  function ki(t) {
    return 0 <= ["true", "false"].indexOf(t) ? JSON.parse(t) : t;
  }
  function Ri(t, e, n, i) {
    if (i)
      try {
        t.setItem(e, n);
      } catch (t) {}
    return n;
  }
  function Ii() {
    var t = document,
      e = t.body;
    return e || ((e = t.createElement("body")).fake = !0), e;
  }
  var n = document.documentElement;
  function Pi(t) {
    var e = "";
    return (
      t.fake &&
        ((e = n.style.overflow),
        (t.style.background = ""),
        (t.style.overflow = n.style.overflow = "hidden"),
        n.appendChild(t)),
      e
    );
  }
  function zi(t, e) {
    t.fake && (t.remove(), (n.style.overflow = e), n.offsetHeight);
  }
  function Wi(t, e, n, i) {
    "insertRule" in t ? t.insertRule(e + "{" + n + "}", i) : t.addRule(e, n, i);
  }
  function Fi(t) {
    return ("insertRule" in t ? t.cssRules : t.rules).length;
  }
  function qi(t, e, n) {
    for (var i = 0, a = t.length; i < a; i++) e.call(n, t[i], i);
  }
  var i = "classList" in document.createElement("_"),
    ji = i
      ? function (t, e) {
          return t.classList.contains(e);
        }
      : function (t, e) {
          return 0 <= t.className.indexOf(e);
        },
    Vi = i
      ? function (t, e) {
          ji(t, e) || t.classList.add(e);
        }
      : function (t, e) {
          ji(t, e) || (t.className += " " + e);
        },
    Gi = i
      ? function (t, e) {
          ji(t, e) && t.classList.remove(e);
        }
      : function (t, e) {
          ji(t, e) && (t.className = t.className.replace(e, ""));
        };
  function Qi(t, e) {
    return t.hasAttribute(e);
  }
  function Xi(t, e) {
    return t.getAttribute(e);
  }
  function r(t) {
    return void 0 !== t.item;
  }
  function Yi(t, e) {
    if (
      ((t = r(t) || t instanceof Array ? t : [t]),
      "[object Object]" === Object.prototype.toString.call(e))
    )
      for (var n = t.length; n--; ) for (var i in e) t[n].setAttribute(i, e[i]);
  }
  function Ki(t, e) {
    t = r(t) || t instanceof Array ? t : [t];
    for (var n = (e = e instanceof Array ? e : [e]).length, i = t.length; i--; )
      for (var a = n; a--; ) t[i].removeAttribute(e[a]);
  }
  function Ji(t) {
    for (var e = [], n = 0, i = t.length; n < i; n++) e.push(t[n]);
    return e;
  }
  function Ui(t, e) {
    "none" !== t.style.display && (t.style.display = "none");
  }
  function _i(t, e) {
    "none" === t.style.display && (t.style.display = "");
  }
  function Zi(t) {
    return "none" !== window.getComputedStyle(t).display;
  }
  function $i(e) {
    if ("string" == typeof e) {
      var n = [e],
        i = e.charAt(0).toUpperCase() + e.substr(1);
      ["Webkit", "Moz", "ms", "O"].forEach(function (t) {
        ("ms" === t && "transform" !== e) || n.push(t + i);
      }),
        (e = n);
    }
    for (
      var t = document.createElement("fakeelement"), a = (e.length, 0);
      a < e.length;
      a++
    ) {
      var r = e[a];
      if (void 0 !== t.style[r]) return r;
    }
    return !1;
  }
  function ta(t, e) {
    var n = !1;
    return (
      /^Webkit/.test(t)
        ? (n = "webkit" + e + "End")
        : /^O/.test(t)
        ? (n = "o" + e + "End")
        : t && (n = e.toLowerCase() + "end"),
      n
    );
  }
  var a = !1;
  try {
    var o = Object.defineProperty({}, "passive", {
      get: function () {
        a = !0;
      },
    });
    window.addEventListener("test", null, o);
  } catch (t) {}
  var u = !!a && { passive: !0 };
  function ea(t, e, n) {
    for (var i in e) {
      var a = 0 <= ["touchstart", "touchmove"].indexOf(i) && !n && u;
      t.addEventListener(i, e[i], a);
    }
  }
  function na(t, e) {
    for (var n in e) {
      var i = 0 <= ["touchstart", "touchmove"].indexOf(n) && u;
      t.removeEventListener(n, e[n], i);
    }
  }
  function ia() {
    return {
      topics: {},
      on: function (t, e) {
        (this.topics[t] = this.topics[t] || []), this.topics[t].push(e);
      },
      off: function (t, e) {
        if (this.topics[t])
          for (var n = 0; n < this.topics[t].length; n++)
            if (this.topics[t][n] === e) {
              this.topics[t].splice(n, 1);
              break;
            }
      },
      emit: function (e, n) {
        (n.type = e),
          this.topics[e] &&
            this.topics[e].forEach(function (t) {
              t(n, e);
            });
      },
    };
  }
  var aa = function (O) {
    O = Hi(
      {
        container: ".slider",
        mode: "carousel",
        axis: "horizontal",
        items: 1,
        gutter: 0,
        edgePadding: 0,
        fixedWidth: !1,
        autoWidth: !1,
        viewportMax: !1,
        slideBy: 1,
        center: !1,
        controls: !0,
        controlsPosition: "top",
        controlsText: ["prev", "next"],
        controlsContainer: !1,
        prevButton: !1,
        nextButton: !1,
        nav: !0,
        navPosition: "top",
        navContainer: !1,
        navAsThumbnails: !1,
        arrowKeys: !1,
        speed: 300,
        autoplay: !1,
        autoplayPosition: "top",
        autoplayTimeout: 5e3,
        autoplayDirection: "forward",
        autoplayText: ["start", "stop"],
        autoplayHoverPause: !1,
        autoplayButton: !1,
        autoplayButtonOutput: !0,
        autoplayResetOnVisibility: !0,
        animateIn: "tns-fadeIn",
        animateOut: "tns-fadeOut",
        animateNormal: "tns-normal",
        animateDelay: !1,
        loop: !0,
        rewind: !1,
        autoHeight: !1,
        responsive: !1,
        lazyload: !1,
        lazyloadSelector: ".tns-lazy-img",
        touch: !0,
        mouseDrag: !1,
        swipeAngle: 15,
        nested: !1,
        preventActionWhenRunning: !1,
        preventScrollOnTouch: !1,
        freezable: !0,
        onInit: !1,
        useLocalStorage: !0,
      },
      O || {}
    );
    var D = document,
      h = window,
      a = { ENTER: 13, SPACE: 32, LEFT: 37, RIGHT: 39 },
      e = {},
      n = O.useLocalStorage;
    if (n) {
      var t = navigator.userAgent,
        i = new Date();
      try {
        (e = h.localStorage)
          ? (e.setItem(i, i), (n = e.getItem(i) == i), e.removeItem(i))
          : (n = !1),
          n || (e = {});
      } catch (t) {
        n = !1;
      }
      n &&
        (e.tnsApp &&
          e.tnsApp !== t &&
          [
            "tC",
            "tPL",
            "tMQ",
            "tTf",
            "t3D",
            "tTDu",
            "tTDe",
            "tADu",
            "tADe",
            "tTE",
            "tAE",
          ].forEach(function (t) {
            e.removeItem(t);
          }),
        (localStorage.tnsApp = t));
    }
    var r,
      o,
      u,
      l,
      s,
      c,
      f,
      y = e.tC
        ? ki(e.tC)
        : Ri(
            e,
            "tC",
            (function () {
              var t = document,
                e = Ii(),
                n = Pi(e),
                i = t.createElement("div"),
                a = !1;
              e.appendChild(i);
              try {
                for (
                  var r,
                    o = "(10px * 10)",
                    u = ["calc" + o, "-moz-calc" + o, "-webkit-calc" + o],
                    l = 0;
                  l < 3;
                  l++
                )
                  if (
                    ((r = u[l]), (i.style.width = r), 100 === i.offsetWidth)
                  ) {
                    a = r.replace(o, "");
                    break;
                  }
              } catch (t) {}
              return e.fake ? zi(e, n) : i.remove(), a;
            })(),
            n
          ),
      g = e.tPL
        ? ki(e.tPL)
        : Ri(
            e,
            "tPL",
            (function () {
              var t,
                e = document,
                n = Ii(),
                i = Pi(n),
                a = e.createElement("div"),
                r = e.createElement("div"),
                o = "";
              (a.className = "tns-t-subp2"), (r.className = "tns-t-ct");
              for (var u = 0; u < 70; u++) o += "<div></div>";
              return (
                (r.innerHTML = o),
                a.appendChild(r),
                n.appendChild(a),
                (t =
                  Math.abs(
                    a.getBoundingClientRect().left -
                      r.children[67].getBoundingClientRect().left
                  ) < 2),
                n.fake ? zi(n, i) : a.remove(),
                t
              );
            })(),
            n
          ),
      H = e.tMQ
        ? ki(e.tMQ)
        : Ri(
            e,
            "tMQ",
            ((o = document),
            (u = Ii()),
            (l = Pi(u)),
            (s = o.createElement("div")),
            (c = o.createElement("style")),
            (f =
              "@media all and (min-width:1px){.tns-mq-test{position:absolute}}"),
            (c.type = "text/css"),
            (s.className = "tns-mq-test"),
            u.appendChild(c),
            u.appendChild(s),
            c.styleSheet
              ? (c.styleSheet.cssText = f)
              : c.appendChild(o.createTextNode(f)),
            (r = window.getComputedStyle
              ? window.getComputedStyle(s).position
              : s.currentStyle.position),
            u.fake ? zi(u, l) : s.remove(),
            "absolute" === r),
            n
          ),
      d = e.tTf ? ki(e.tTf) : Ri(e, "tTf", $i("transform"), n),
      v = e.t3D
        ? ki(e.t3D)
        : Ri(
            e,
            "t3D",
            (function (t) {
              if (!t) return !1;
              if (!window.getComputedStyle) return !1;
              var e,
                n = document,
                i = Ii(),
                a = Pi(i),
                r = n.createElement("p"),
                o =
                  9 < t.length ? "-" + t.slice(0, -9).toLowerCase() + "-" : "";
              return (
                (o += "transform"),
                i.insertBefore(r, null),
                (r.style[t] = "translate3d(1px,1px,1px)"),
                (e = window.getComputedStyle(r).getPropertyValue(o)),
                i.fake ? zi(i, a) : r.remove(),
                void 0 !== e && 0 < e.length && "none" !== e
              );
            })(d),
            n
          ),
      x = e.tTDu ? ki(e.tTDu) : Ri(e, "tTDu", $i("transitionDuration"), n),
      p = e.tTDe ? ki(e.tTDe) : Ri(e, "tTDe", $i("transitionDelay"), n),
      b = e.tADu ? ki(e.tADu) : Ri(e, "tADu", $i("animationDuration"), n),
      m = e.tADe ? ki(e.tADe) : Ri(e, "tADe", $i("animationDelay"), n),
      C = e.tTE ? ki(e.tTE) : Ri(e, "tTE", ta(x, "Transition"), n),
      w = e.tAE ? ki(e.tAE) : Ri(e, "tAE", ta(b, "Animation"), n),
      M = h.console && "function" == typeof h.console.warn,
      T = [
        "container",
        "controlsContainer",
        "prevButton",
        "nextButton",
        "navContainer",
        "autoplayButton",
      ],
      E = {};
    if (
      (T.forEach(function (t) {
        if ("string" == typeof O[t]) {
          var e = O[t],
            n = D.querySelector(e);
          if (((E[t] = e), !n || !n.nodeName))
            return void (M && console.warn("Can't find", O[t]));
          O[t] = n;
        }
      }),
      !(O.container.children.length < 1))
    ) {
      var k = O.responsive,
        R = O.nested,
        I = "carousel" === O.mode;
      if (k) {
        0 in k && ((O = Hi(O, k[0])), delete k[0]);
        var A = {};
        for (var N in k) {
          var L = k[N];
          (L = "number" == typeof L ? { items: L } : L), (A[N] = L);
        }
        (k = A), (A = null);
      }
      if (
        (I ||
          (function t(e) {
            for (var n in e)
              I ||
                ("slideBy" === n && (e[n] = "page"),
                "edgePadding" === n && (e[n] = !1),
                "autoHeight" === n && (e[n] = !1)),
                "responsive" === n && t(e[n]);
          })(O),
        !I)
      ) {
        (O.axis = "horizontal"), (O.slideBy = "page"), (O.edgePadding = !1);
        var P = O.animateIn,
          z = O.animateOut,
          B = O.animateDelay,
          W = O.animateNormal;
      }
      var S,
        F,
        q = "horizontal" === O.axis,
        j = D.createElement("div"),
        V = D.createElement("div"),
        G = O.container,
        Q = G.parentNode,
        X = G.outerHTML,
        Y = G.children,
        K = Y.length,
        J = sn(),
        U = !1;
      k && Bn(), I && (G.className += " tns-vpfix");
      var _,
        Z,
        $,
        tt,
        et,
        nt,
        it,
        at,
        rt = O.autoWidth,
        ot = vn("fixedWidth"),
        ut = vn("edgePadding"),
        lt = vn("gutter"),
        st = fn(),
        ct = vn("center"),
        ft = rt ? 1 : Math.floor(vn("items")),
        dt = vn("slideBy"),
        vt = O.viewportMax || O.fixedWidthViewportWidth,
        pt = vn("arrowKeys"),
        mt = vn("speed"),
        ht = O.rewind,
        yt = !ht && O.loop,
        gt = vn("autoHeight"),
        xt = vn("controls"),
        bt = vn("controlsText"),
        Ct = vn("nav"),
        wt = vn("touch"),
        Mt = vn("mouseDrag"),
        Tt = vn("autoplay"),
        Et = vn("autoplayTimeout"),
        At = vn("autoplayText"),
        Nt = vn("autoplayHoverPause"),
        Lt = vn("autoplayResetOnVisibility"),
        Bt =
          ((at = document.createElement("style")),
          it && at.setAttribute("media", it),
          document.querySelector("head").appendChild(at),
          at.sheet ? at.sheet : at.styleSheet),
        St = O.lazyload,
        Ot = (O.lazyloadSelector, []),
        Dt = yt
          ? ((et = (function () {
              {
                if (rt || (ot && !vt)) return K - 1;
                var t = ot ? "fixedWidth" : "items",
                  e = [];
                if (((ot || O[t] < K) && e.push(O[t]), k))
                  for (var n in k) {
                    var i = k[n][t];
                    i && (ot || i < K) && e.push(i);
                  }
                return (
                  e.length || e.push(0),
                  Math.ceil(
                    ot ? vt / Math.min.apply(null, e) : Math.max.apply(null, e)
                  )
                );
              }
            })()),
            (nt = I ? Math.ceil((5 * et - K) / 2) : 4 * et - K),
            (nt = Math.max(et, nt)),
            dn("edgePadding") ? nt + 1 : nt)
          : 0,
        Ht = I ? K + 2 * Dt : K + Dt,
        kt = !((!ot && !rt) || yt),
        Rt = ot ? ni() : null,
        It = !I || !yt,
        Pt = q ? "left" : "top",
        zt = "",
        Wt = "",
        Ft = ot
          ? function () {
              return ct && !yt ? K - 1 : Math.ceil(-Rt / (ot + lt));
            }
          : rt
          ? function () {
              for (var t = Ht; t--; ) if (_[t] >= -Rt) return t;
            }
          : function () {
              return ct && I && !yt
                ? K - 1
                : yt || I
                ? Math.max(0, Ht - Math.ceil(ft))
                : Ht - 1;
            },
        qt = on(vn("startIndex")),
        jt = qt,
        Vt = (rn(), 0),
        Gt = rt ? null : Ft(),
        Qt = O.preventActionWhenRunning,
        Xt = O.swipeAngle,
        Yt = !Xt || "?",
        Kt = !1,
        Jt = O.onInit,
        Ut = new ia(),
        _t = " tns-slider tns-" + O.mode,
        Zt =
          G.id ||
          ((tt = window.tnsId),
          (window.tnsId = tt ? tt + 1 : 1),
          "tns" + window.tnsId),
        $t = vn("disable"),
        te = !1,
        ee = O.freezable,
        ne = !(!ee || rt) && Ln(),
        ie = !1,
        ae = {
          click: fi,
          keydown: function (t) {
            t = xi(t);
            var e = [a.LEFT, a.RIGHT].indexOf(t.keyCode);
            0 <= e &&
              (0 === e ? Ee.disabled || fi(t, -1) : Ae.disabled || fi(t, 1));
          },
        },
        re = {
          click: function (t) {
            if (Kt) {
              if (Qt) return;
              si();
            }
            var e = bi((t = xi(t)));
            for (; e !== Se && !Qi(e, "data-nav"); ) e = e.parentNode;
            if (Qi(e, "data-nav")) {
              var n = (ke = Number(Xi(e, "data-nav"))),
                i = ot || rt ? (n * K) / De : n * ft,
                a = ve ? n : Math.min(Math.ceil(i), K - 1);
              ci(a, t), Re === n && (qe && hi(), (ke = -1));
            }
          },
          keydown: function (t) {
            t = xi(t);
            var e = D.activeElement;
            if (!Qi(e, "data-nav")) return;
            var n = [a.LEFT, a.RIGHT, a.ENTER, a.SPACE].indexOf(t.keyCode),
              i = Number(Xi(e, "data-nav"));
            0 <= n &&
              (0 === n
                ? 0 < i && gi(Be[i - 1])
                : 1 === n
                ? i < De - 1 && gi(Be[i + 1])
                : ci((ke = i), t));
          },
        },
        oe = {
          mouseover: function () {
            qe && (vi(), (je = !0));
          },
          mouseout: function () {
            je && (di(), (je = !1));
          },
        },
        ue = {
          visibilitychange: function () {
            D.hidden ? qe && (vi(), (Ge = !0)) : Ge && (di(), (Ge = !1));
          },
        },
        le = {
          keydown: function (t) {
            t = xi(t);
            var e = [a.LEFT, a.RIGHT].indexOf(t.keyCode);
            0 <= e && fi(t, 0 === e ? -1 : 1);
          },
        },
        se = { touchstart: Ti, touchmove: Ei, touchend: Ai, touchcancel: Ai },
        ce = { mousedown: Ti, mousemove: Ei, mouseup: Ai, mouseleave: Ai },
        fe = dn("controls"),
        de = dn("nav"),
        ve = !!rt || O.navAsThumbnails,
        pe = dn("autoplay"),
        me = dn("touch"),
        he = dn("mouseDrag"),
        ye = "tns-slide-active",
        ge = "tns-complete",
        xe = {
          load: function (t) {
            zn(bi(t));
          },
          error: function (t) {
            (e = bi(t)), Vi(e, "failed"), Wn(e);
            var e;
          },
        },
        be = "force" === O.preventScrollOnTouch;
      if (fe)
        var Ce,
          we,
          Me = O.controlsContainer,
          Te = O.controlsContainer ? O.controlsContainer.outerHTML : "",
          Ee = O.prevButton,
          Ae = O.nextButton,
          Ne = O.prevButton ? O.prevButton.outerHTML : "",
          Le = O.nextButton ? O.nextButton.outerHTML : "";
      if (de)
        var Be,
          Se = O.navContainer,
          Oe = O.navContainer ? O.navContainer.outerHTML : "",
          De = rt ? K : Li(),
          He = 0,
          ke = -1,
          Re = ln(),
          Ie = Re,
          Pe = "tns-nav-active",
          ze = "Carousel Page ",
          We = " (Current Slide)";
      if (pe)
        var Fe,
          qe,
          je,
          Ve,
          Ge,
          Qe = "forward" === O.autoplayDirection ? 1 : -1,
          Xe = O.autoplayButton,
          Ye = O.autoplayButton ? O.autoplayButton.outerHTML : "",
          Ke = ["<span class='tns-visually-hidden'>", " animation</span>"];
      if (me || he)
        var Je,
          Ue,
          _e = {},
          Ze = {},
          $e = !1,
          tn = q
            ? function (t, e) {
                return t.x - e.x;
              }
            : function (t, e) {
                return t.y - e.y;
              };
      rt || an($t || ne),
        d &&
          ((Pt = d),
          (zt = "translate"),
          v
            ? ((zt += q ? "3d(" : "3d(0px, "),
              (Wt = q ? ", 0px, 0px)" : ", 0px)"))
            : ((zt += q ? "X(" : "Y("), (Wt = ")"))),
        I && (G.className = G.className.replace("tns-vpfix", "")),
        (function () {
          dn("gutter");
          (j.className = "tns-outer"),
            (V.className = "tns-inner"),
            (j.id = Zt + "-ow"),
            (V.id = Zt + "-iw"),
            "" === G.id && (G.id = Zt);
          (_t += g || rt ? " tns-subpixel" : " tns-no-subpixel"),
            (_t += y ? " tns-calc" : " tns-no-calc"),
            rt && (_t += " tns-autowidth");
          (_t += " tns-" + O.axis),
            (G.className += _t),
            I
              ? (((S = D.createElement("div")).id = Zt + "-mw"),
                (S.className = "tns-ovh"),
                j.appendChild(S),
                S.appendChild(V))
              : j.appendChild(V);
          if (gt) {
            var t = S || V;
            t.className += " tns-ah";
          }
          if (
            (Q.insertBefore(j, G),
            V.appendChild(G),
            qi(Y, function (t, e) {
              Vi(t, "tns-item"),
                t.id || (t.id = Zt + "-item" + e),
                !I && W && Vi(t, W),
                Yi(t, { "aria-hidden": "true", tabindex: "-1" });
            }),
            Dt)
          ) {
            for (
              var e = D.createDocumentFragment(),
                n = D.createDocumentFragment(),
                i = Dt;
              i--;

            ) {
              var a = i % K,
                r = Y[a].cloneNode(!0);
              if ((Ki(r, "id"), n.insertBefore(r, n.firstChild), I)) {
                var o = Y[K - 1 - a].cloneNode(!0);
                Ki(o, "id"), e.appendChild(o);
              }
            }
            G.insertBefore(e, G.firstChild), G.appendChild(n), (Y = G.children);
          }
        })(),
        (function () {
          if (!I)
            for (var t = qt, e = qt + Math.min(K, ft); t < e; t++) {
              var n = Y[t];
              (n.style.left = (100 * (t - qt)) / ft + "%"), Vi(n, P), Gi(n, W);
            }
          q &&
            (g || rt
              ? (Wi(
                  Bt,
                  "#" + Zt + " > .tns-item",
                  "font-size:" + h.getComputedStyle(Y[0]).fontSize + ";",
                  Fi(Bt)
                ),
                Wi(Bt, "#" + Zt, "font-size:0;", Fi(Bt)))
              : I &&
                qi(Y, function (t, e) {
                  var n;
                  t.style.marginLeft =
                    ((n = e),
                    y
                      ? y + "(" + 100 * n + "% / " + Ht + ")"
                      : (100 * n) / Ht + "%");
                }));
          if (H) {
            if (x) {
              var i = S && O.autoHeight ? xn(O.speed) : "";
              Wi(Bt, "#" + Zt + "-mw", i, Fi(Bt));
            }
            (i = pn(
              O.edgePadding,
              O.gutter,
              O.fixedWidth,
              O.speed,
              O.autoHeight
            )),
              Wi(Bt, "#" + Zt + "-iw", i, Fi(Bt)),
              I &&
                ((i =
                  q && !rt
                    ? "width:" + mn(O.fixedWidth, O.gutter, O.items) + ";"
                    : ""),
                x && (i += xn(mt)),
                Wi(Bt, "#" + Zt, i, Fi(Bt))),
              (i = q && !rt ? hn(O.fixedWidth, O.gutter, O.items) : ""),
              O.gutter && (i += yn(O.gutter)),
              I || (x && (i += xn(mt)), b && (i += bn(mt))),
              i && Wi(Bt, "#" + Zt + " > .tns-item", i, Fi(Bt));
          } else {
            Gn(),
              (V.style.cssText = pn(ut, lt, ot, gt)),
              I && q && !rt && (G.style.width = mn(ot, lt, ft));
            var i = q && !rt ? hn(ot, lt, ft) : "";
            lt && (i += yn(lt)),
              i && Wi(Bt, "#" + Zt + " > .tns-item", i, Fi(Bt));
          }
          if (k && H)
            for (var a in k) {
              a = parseInt(a);
              var r = k[a],
                i = "",
                o = "",
                u = "",
                l = "",
                s = "",
                c = rt ? null : vn("items", a),
                f = vn("fixedWidth", a),
                d = vn("speed", a),
                v = vn("edgePadding", a),
                p = vn("autoHeight", a),
                m = vn("gutter", a);
              x &&
                S &&
                vn("autoHeight", a) &&
                "speed" in r &&
                (o = "#" + Zt + "-mw{" + xn(d) + "}"),
                ("edgePadding" in r || "gutter" in r) &&
                  (u = "#" + Zt + "-iw{" + pn(v, m, f, d, p) + "}"),
                I &&
                  q &&
                  !rt &&
                  ("fixedWidth" in r ||
                    "items" in r ||
                    (ot && "gutter" in r)) &&
                  (l = "width:" + mn(f, m, c) + ";"),
                x && "speed" in r && (l += xn(d)),
                l && (l = "#" + Zt + "{" + l + "}"),
                ("fixedWidth" in r ||
                  (ot && "gutter" in r) ||
                  (!I && "items" in r)) &&
                  (s += hn(f, m, c)),
                "gutter" in r && (s += yn(m)),
                !I && "speed" in r && (x && (s += xn(d)), b && (s += bn(d))),
                s && (s = "#" + Zt + " > .tns-item{" + s + "}"),
                (i = o + u + l + s) &&
                  Bt.insertRule(
                    "@media (min-width: " + a / 16 + "em) {" + i + "}",
                    Bt.cssRules.length
                  );
            }
        })(),
        Cn();
      var en = yt
          ? I
            ? function () {
                var t = Vt,
                  e = Gt;
                (t += dt),
                  (e -= dt),
                  ut
                    ? ((t += 1), (e -= 1))
                    : ot && (st + lt) % (ot + lt) && (e -= 1),
                  Dt && (e < qt ? (qt -= K) : qt < t && (qt += K));
              }
            : function () {
                if (Gt < qt) for (; Vt + K <= qt; ) qt -= K;
                else if (qt < Vt) for (; qt <= Gt - K; ) qt += K;
              }
          : function () {
              qt = Math.max(Vt, Math.min(Gt, qt));
            },
        nn = I
          ? function () {
              var e, n, i, a, t, r, o, u, l, s, c;
              ti(G, ""),
                x || !mt
                  ? (ri(), (mt && Zi(G)) || si())
                  : ((e = G),
                    (n = Pt),
                    (i = zt),
                    (a = Wt),
                    (t = ii()),
                    (r = mt),
                    (o = si),
                    (u = Math.min(r, 10)),
                    (l = 0 <= t.indexOf("%") ? "%" : "px"),
                    (t = t.replace(l, "")),
                    (s = Number(
                      e.style[n].replace(i, "").replace(a, "").replace(l, "")
                    )),
                    (c = ((t - s) / r) * u),
                    setTimeout(function t() {
                      (r -= u),
                        (s += c),
                        (e.style[n] = i + s + l + a),
                        0 < r ? setTimeout(t, u) : o();
                    }, u)),
                q || Ni();
            }
          : function () {
              Ot = [];
              var t = {};
              (t[C] = t[w] = si),
                na(Y[jt], t),
                ea(Y[qt], t),
                oi(jt, P, z, !0),
                oi(qt, W, P),
                (C && w && mt && Zi(G)) || si();
            };
      return {
        version: "2.9.2",
        getInfo: Si,
        events: Ut,
        goTo: ci,
        play: function () {
          Tt && !qe && (mi(), (Ve = !1));
        },
        pause: function () {
          qe && (hi(), (Ve = !0));
        },
        isOn: U,
        updateSliderHeight: Xn,
        refresh: Cn,
        destroy: function () {
          if (
            ((Bt.disabled = !0),
            Bt.ownerNode && Bt.ownerNode.remove(),
            na(h, { resize: An }),
            pt && na(D, le),
            Me && na(Me, ae),
            Se && na(Se, re),
            na(G, oe),
            na(G, ue),
            Xe && na(Xe, { click: yi }),
            Tt && clearInterval(Fe),
            I && C)
          ) {
            var t = {};
            (t[C] = si), na(G, t);
          }
          wt && na(G, se), Mt && na(G, ce);
          var r = [X, Te, Ne, Le, Oe, Ye];
          for (var e in (T.forEach(function (t, e) {
            var n = "container" === t ? j : O[t];
            if ("object" == typeof n) {
              var i = !!n.previousElementSibling && n.previousElementSibling,
                a = n.parentNode;
              (n.outerHTML = r[e]),
                (O[t] = i ? i.nextElementSibling : a.firstElementChild);
            }
          }),
          (T =
            P =
            z =
            B =
            W =
            q =
            j =
            V =
            G =
            Q =
            X =
            Y =
            K =
            F =
            J =
            rt =
            ot =
            ut =
            lt =
            st =
            ft =
            dt =
            vt =
            pt =
            mt =
            ht =
            yt =
            gt =
            Bt =
            St =
            _ =
            Ot =
            Dt =
            Ht =
            kt =
            Rt =
            It =
            Pt =
            zt =
            Wt =
            Ft =
            qt =
            jt =
            Vt =
            Gt =
            Xt =
            Yt =
            Kt =
            Jt =
            Ut =
            _t =
            Zt =
            $t =
            te =
            ee =
            ne =
            ie =
            ae =
            re =
            oe =
            ue =
            le =
            se =
            ce =
            fe =
            de =
            ve =
            pe =
            me =
            he =
            ye =
            ge =
            xe =
            Z =
            xt =
            bt =
            Me =
            Te =
            Ee =
            Ae =
            Ce =
            we =
            Ct =
            Se =
            Oe =
            Be =
            De =
            He =
            ke =
            Re =
            Ie =
            Pe =
            ze =
            We =
            Tt =
            Et =
            Qe =
            At =
            Nt =
            Xe =
            Ye =
            Lt =
            Ke =
            Fe =
            qe =
            je =
            Ve =
            Ge =
            _e =
            Ze =
            Je =
            $e =
            Ue =
            tn =
            wt =
            Mt =
              null),
          this))
            "rebuild" !== e && (this[e] = null);
          U = !1;
        },
        rebuild: function () {
          return aa(Hi(O, E));
        },
      };
    }
    function an(t) {
      t && (xt = Ct = wt = Mt = pt = Tt = Nt = Lt = !1);
    }
    function rn() {
      for (var t = I ? qt - Dt : qt; t < 0; ) t += K;
      return (t % K) + 1;
    }
    function on(t) {
      return (
        (t = t ? Math.max(0, Math.min(yt ? K - 1 : K - ft, t)) : 0),
        I ? t + Dt : t
      );
    }
    function un(t) {
      for (null == t && (t = qt), I && (t -= Dt); t < 0; ) t += K;
      return Math.floor(t % K);
    }
    function ln() {
      var t,
        e = un();
      return (
        (t = ve
          ? e
          : ot || rt
          ? Math.ceil(((e + 1) * De) / K - 1)
          : Math.floor(e / ft)),
        !yt && I && qt === Gt && (t = De - 1),
        t
      );
    }
    function sn() {
      return (
        h.innerWidth || D.documentElement.clientWidth || D.body.clientWidth
      );
    }
    function cn(t) {
      return "top" === t ? "afterbegin" : "beforeend";
    }
    function fn() {
      var t = ut ? 2 * ut - lt : 0;
      return (
        (function t(e) {
          var n,
            i,
            a = D.createElement("div");
          return (
            e.appendChild(a),
            (i = (n = a.getBoundingClientRect()).right - n.left),
            a.remove(),
            i || t(e.parentNode)
          );
        })(Q) - t
      );
    }
    function dn(t) {
      if (O[t]) return !0;
      if (k) for (var e in k) if (k[e][t]) return !0;
      return !1;
    }
    function vn(t, e) {
      if ((null == e && (e = J), "items" === t && ot))
        return Math.floor((st + lt) / (ot + lt)) || 1;
      var n = O[t];
      if (k) for (var i in k) e >= parseInt(i) && t in k[i] && (n = k[i][t]);
      return (
        "slideBy" === t && "page" === n && (n = vn("items")),
        I || ("slideBy" !== t && "items" !== t) || (n = Math.floor(n)),
        n
      );
    }
    function pn(t, e, n, i, a) {
      var r = "";
      if (void 0 !== t) {
        var o = t;
        e && (o -= e),
          (r = q
            ? "margin: 0 " + o + "px 0 " + t + "px;"
            : "margin: " + t + "px 0 " + o + "px 0;");
      } else if (e && !n) {
        var u = "-" + e + "px";
        r = "margin: 0 " + (q ? u + " 0 0" : "0 " + u + " 0") + ";";
      }
      return !I && a && x && i && (r += xn(i)), r;
    }
    function mn(t, e, n) {
      return t
        ? (t + e) * Ht + "px"
        : y
        ? y + "(" + 100 * Ht + "% / " + n + ")"
        : (100 * Ht) / n + "%";
    }
    function hn(t, e, n) {
      var i;
      if (t) i = t + e + "px";
      else {
        I || (n = Math.floor(n));
        var a = I ? Ht : n;
        i = y ? y + "(100% / " + a + ")" : 100 / a + "%";
      }
      return (i = "width:" + i), "inner" !== R ? i + ";" : i + " !important;";
    }
    function yn(t) {
      var e = "";
      !1 !== t &&
        (e =
          (q ? "padding-" : "margin-") +
          (q ? "right" : "bottom") +
          ": " +
          t +
          "px;");
      return e;
    }
    function gn(t, e) {
      var n = t.substring(0, t.length - e).toLowerCase();
      return n && (n = "-" + n + "-"), n;
    }
    function xn(t) {
      return gn(x, 18) + "transition-duration:" + t / 1e3 + "s;";
    }
    function bn(t) {
      return gn(b, 17) + "animation-duration:" + t / 1e3 + "s;";
    }
    function Cn() {
      if (dn("autoHeight") || rt || !q) {
        var t = G.querySelectorAll("img");
        qi(t, function (t) {
          var e = t.src;
          e && e.indexOf("data:image") < 0
            ? (ea(t, xe), (t.src = ""), (t.src = e), Vi(t, "loading"))
            : St || zn(t);
        }),
          Oi(function () {
            jn(Ji(t), function () {
              Z = !0;
            });
          }),
          !rt && q && (t = Fn(qt, Math.min(qt + ft - 1, Ht - 1))),
          St
            ? wn()
            : Oi(function () {
                jn(Ji(t), wn);
              });
      } else I && ai(), Tn(), En();
    }
    function wn() {
      if (rt) {
        var e = yt ? qt : K - 1;
        !(function t() {
          Y[e - 1].getBoundingClientRect().right.toFixed(2) ===
          Y[e].getBoundingClientRect().left.toFixed(2)
            ? Mn()
            : setTimeout(function () {
                t();
              }, 16);
        })();
      } else Mn();
    }
    function Mn() {
      (q && !rt) ||
        (Yn(),
        rt
          ? ((Rt = ni()), ee && (ne = Ln()), (Gt = Ft()), an($t || ne))
          : Ni()),
        I && ai(),
        Tn(),
        En();
    }
    function Tn() {
      if (
        (Kn(),
        j.insertAdjacentHTML(
          "afterbegin",
          '<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' +
            Rn() +
            "</span>  of " +
            K +
            "</div>"
        ),
        ($ = j.querySelector(".tns-liveregion .current")),
        pe)
      ) {
        var t = Tt ? "stop" : "start";
        Xe
          ? Yi(Xe, { "data-action": t })
          : O.autoplayButtonOutput &&
            (j.insertAdjacentHTML(
              cn(O.autoplayPosition),
              '<button data-action="' +
                t +
                '">' +
                Ke[0] +
                t +
                Ke[1] +
                At[0] +
                "</button>"
            ),
            (Xe = j.querySelector("[data-action]"))),
          Xe && ea(Xe, { click: yi }),
          Tt && (mi(), Nt && ea(G, oe), Lt && ea(G, ue));
      }
      if (de) {
        if (Se)
          Yi(Se, { "aria-label": "Carousel Pagination" }),
            qi((Be = Se.children), function (t, e) {
              Yi(t, {
                "data-nav": e,
                tabindex: "-1",
                "aria-label": ze + (e + 1),
                "aria-controls": Zt,
              });
            });
        else {
          for (
            var e = "", n = ve ? "" : 'style="display:none"', i = 0;
            i < K;
            i++
          )
            e +=
              '<button data-nav="' +
              i +
              '" tabindex="-1" aria-controls="' +
              Zt +
              '" ' +
              n +
              ' aria-label="' +
              ze +
              (i + 1) +
              '"></button>';
          (e =
            '<div class="tns-nav" aria-label="Carousel Pagination">' +
            e +
            "</div>"),
            j.insertAdjacentHTML(cn(O.navPosition), e),
            (Se = j.querySelector(".tns-nav")),
            (Be = Se.children);
        }
        if ((Bi(), x)) {
          var a = x.substring(0, x.length - 18).toLowerCase(),
            r = "transition: all " + mt / 1e3 + "s";
          a && (r = "-" + a + "-" + r),
            Wi(Bt, "[aria-controls^=" + Zt + "-item]", r, Fi(Bt));
        }
        Yi(Be[Re], { "aria-label": ze + (Re + 1) + We }),
          Ki(Be[Re], "tabindex"),
          Vi(Be[Re], Pe),
          ea(Se, re);
      }
      fe &&
        (Me ||
          (Ee && Ae) ||
          (j.insertAdjacentHTML(
            cn(O.controlsPosition),
            '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button data-controls="prev" tabindex="-1" aria-controls="' +
              Zt +
              '">' +
              bt[0] +
              '</button><button data-controls="next" tabindex="-1" aria-controls="' +
              Zt +
              '">' +
              bt[1] +
              "</button></div>"
          ),
          (Me = j.querySelector(".tns-controls"))),
        (Ee && Ae) || ((Ee = Me.children[0]), (Ae = Me.children[1])),
        O.controlsContainer &&
          Yi(Me, { "aria-label": "Carousel Navigation", tabindex: "0" }),
        (O.controlsContainer || (O.prevButton && O.nextButton)) &&
          Yi([Ee, Ae], { "aria-controls": Zt, tabindex: "-1" }),
        (O.controlsContainer || (O.prevButton && O.nextButton)) &&
          (Yi(Ee, { "data-controls": "prev" }),
          Yi(Ae, { "data-controls": "next" })),
        (Ce = Un(Ee)),
        (we = Un(Ae)),
        $n(),
        Me ? ea(Me, ae) : (ea(Ee, ae), ea(Ae, ae))),
        Sn();
    }
    function En() {
      if (I && C) {
        var t = {};
        (t[C] = si), ea(G, t);
      }
      wt && ea(G, se, O.preventScrollOnTouch),
        Mt && ea(G, ce),
        pt && ea(D, le),
        "inner" === R
          ? Ut.on("outerResized", function () {
              Nn(), Ut.emit("innerLoaded", Si());
            })
          : (k || ot || rt || gt || !q) && ea(h, { resize: An }),
        gt && ("outer" === R ? Ut.on("innerLoaded", qn) : $t || qn()),
        Pn(),
        $t ? Hn() : ne && Dn(),
        Ut.on("indexChanged", Vn),
        "inner" === R && Ut.emit("innerLoaded", Si()),
        "function" == typeof Jt && Jt(Si()),
        (U = !0);
    }
    function An(t) {
      Oi(function () {
        Nn(xi(t));
      });
    }
    function Nn(t) {
      if (U) {
        "outer" === R && Ut.emit("outerResized", Si(t)), (J = sn());
        var e,
          n = F,
          i = !1;
        k && (Bn(), (e = n !== F) && Ut.emit("newBreakpointStart", Si(t)));
        var a,
          r,
          o,
          u,
          l = ft,
          s = $t,
          c = ne,
          f = pt,
          d = xt,
          v = Ct,
          p = wt,
          m = Mt,
          h = Tt,
          y = Nt,
          g = Lt,
          x = qt;
        if (e) {
          var b = ot,
            C = gt,
            w = bt,
            M = ct,
            T = At;
          if (!H)
            var E = lt,
              A = ut;
        }
        if (
          ((pt = vn("arrowKeys")),
          (xt = vn("controls")),
          (Ct = vn("nav")),
          (wt = vn("touch")),
          (ct = vn("center")),
          (Mt = vn("mouseDrag")),
          (Tt = vn("autoplay")),
          (Nt = vn("autoplayHoverPause")),
          (Lt = vn("autoplayResetOnVisibility")),
          e &&
            (($t = vn("disable")),
            (ot = vn("fixedWidth")),
            (mt = vn("speed")),
            (gt = vn("autoHeight")),
            (bt = vn("controlsText")),
            (At = vn("autoplayText")),
            (Et = vn("autoplayTimeout")),
            H || ((ut = vn("edgePadding")), (lt = vn("gutter")))),
          an($t),
          (st = fn()),
          (q && !rt) || $t || (Yn(), q || (Ni(), (i = !0))),
          (ot || rt) && ((Rt = ni()), (Gt = Ft())),
          (e || ot) &&
            ((ft = vn("items")),
            (dt = vn("slideBy")),
            (r = ft !== l) && (ot || rt || (Gt = Ft()), en())),
          e &&
            $t !== s &&
            ($t
              ? Hn()
              : (function () {
                  if (!te) return;
                  if (((Bt.disabled = !1), (G.className += _t), ai(), yt))
                    for (var t = Dt; t--; ) I && _i(Y[t]), _i(Y[Ht - t - 1]);
                  if (!I)
                    for (var e = qt, n = qt + K; e < n; e++) {
                      var i = Y[e],
                        a = e < qt + ft ? P : W;
                      (i.style.left = (100 * (e - qt)) / ft + "%"), Vi(i, a);
                    }
                  On(), (te = !1);
                })()),
          ee &&
            (e || ot || rt) &&
            (ne = Ln()) !== c &&
            (ne
              ? (ri(ii(on(0))), Dn())
              : (!(function () {
                  if (!ie) return;
                  ut && H && (V.style.margin = "");
                  if (Dt)
                    for (var t = "tns-transparent", e = Dt; e--; )
                      I && Gi(Y[e], t), Gi(Y[Ht - e - 1], t);
                  On(), (ie = !1);
                })(),
                (i = !0))),
          an($t || ne),
          Tt || (Nt = Lt = !1),
          pt !== f && (pt ? ea(D, le) : na(D, le)),
          xt !== d &&
            (xt
              ? Me
                ? _i(Me)
                : (Ee && _i(Ee), Ae && _i(Ae))
              : Me
              ? Ui(Me)
              : (Ee && Ui(Ee), Ae && Ui(Ae))),
          Ct !== v && (Ct ? _i(Se) : Ui(Se)),
          wt !== p && (wt ? ea(G, se, O.preventScrollOnTouch) : na(G, se)),
          Mt !== m && (Mt ? ea(G, ce) : na(G, ce)),
          Tt !== h &&
            (Tt
              ? (Xe && _i(Xe), qe || Ve || mi())
              : (Xe && Ui(Xe), qe && hi())),
          Nt !== y && (Nt ? ea(G, oe) : na(G, oe)),
          Lt !== g && (Lt ? ea(D, ue) : na(D, ue)),
          e)
        ) {
          if (
            ((ot === b && ct === M) || (i = !0),
            gt !== C && (gt || (V.style.height = "")),
            xt && bt !== w && ((Ee.innerHTML = bt[0]), (Ae.innerHTML = bt[1])),
            Xe && At !== T)
          ) {
            var N = Tt ? 1 : 0,
              L = Xe.innerHTML,
              B = L.length - T[N].length;
            L.substring(B) === T[N] &&
              (Xe.innerHTML = L.substring(0, B) + At[N]);
          }
        } else ct && (ot || rt) && (i = !0);
        if (
          ((r || (ot && !rt)) && ((De = Li()), Bi()),
          (a = qt !== x)
            ? (Ut.emit("indexChanged", Si()), (i = !0))
            : r
            ? a || Vn()
            : (ot || rt) && (Pn(), Kn(), kn()),
          r &&
            !I &&
            (function () {
              for (var t = qt + Math.min(K, ft), e = Ht; e--; ) {
                var n = Y[e];
                qt <= e && e < t
                  ? (Vi(n, "tns-moving"),
                    (n.style.left = (100 * (e - qt)) / ft + "%"),
                    Vi(n, P),
                    Gi(n, W))
                  : n.style.left && ((n.style.left = ""), Vi(n, W), Gi(n, P)),
                  Gi(n, z);
              }
              setTimeout(function () {
                qi(Y, function (t) {
                  Gi(t, "tns-moving");
                });
              }, 300);
            })(),
          !$t && !ne)
        ) {
          if (
            e &&
            !H &&
            ((gt === autoheightTem && mt === speedTem) || Gn(),
            (ut === A && lt === E) ||
              (V.style.cssText = pn(ut, lt, ot, mt, gt)),
            q)
          ) {
            I && (G.style.width = mn(ot, lt, ft));
            var S = hn(ot, lt, ft) + yn(lt);
            (u = Fi((o = Bt)) - 1),
              "deleteRule" in o ? o.deleteRule(u) : o.removeRule(u),
              Wi(Bt, "#" + Zt + " > .tns-item", S, Fi(Bt));
          }
          gt && qn(), i && (ai(), (jt = qt));
        }
        e && Ut.emit("newBreakpointEnd", Si(t));
      }
    }
    function Ln() {
      if (!ot && !rt) return K <= (ct ? ft - (ft - 1) / 2 : ft);
      var t = ot ? (ot + lt) * K : _[K],
        e = ut ? st + 2 * ut : st + lt;
      return (
        ct && (e -= ot ? (st - ot) / 2 : (st - (_[qt + 1] - _[qt] - lt)) / 2),
        t <= e
      );
    }
    function Bn() {
      for (var t in ((F = 0), k)) (t = parseInt(t)) <= J && (F = t);
    }
    function Sn() {
      !Tt && Xe && Ui(Xe),
        !Ct && Se && Ui(Se),
        xt || (Me ? Ui(Me) : (Ee && Ui(Ee), Ae && Ui(Ae)));
    }
    function On() {
      Tt && Xe && _i(Xe),
        Ct && Se && _i(Se),
        xt && (Me ? _i(Me) : (Ee && _i(Ee), Ae && _i(Ae)));
    }
    function Dn() {
      if (!ie) {
        if ((ut && (V.style.margin = "0px"), Dt))
          for (var t = "tns-transparent", e = Dt; e--; )
            I && Vi(Y[e], t), Vi(Y[Ht - e - 1], t);
        Sn(), (ie = !0);
      }
    }
    function Hn() {
      if (!te) {
        if (
          ((Bt.disabled = !0),
          (G.className = G.className.replace(_t.substring(1), "")),
          Ki(G, ["style"]),
          yt)
        )
          for (var t = Dt; t--; ) I && Ui(Y[t]), Ui(Y[Ht - t - 1]);
        if (((q && I) || Ki(V, ["style"]), !I))
          for (var e = qt, n = qt + K; e < n; e++) {
            var i = Y[e];
            Ki(i, ["style"]), Gi(i, P), Gi(i, W);
          }
        Sn(), (te = !0);
      }
    }
    function kn() {
      var t = Rn();
      $.innerHTML !== t && ($.innerHTML = t);
    }
    function Rn() {
      var t = In(),
        e = t[0] + 1,
        n = t[1] + 1;
      return e === n ? e + "" : e + " to " + n;
    }
    function In(t) {
      null == t && (t = ii());
      var n,
        i,
        a,
        r = qt;
      if (
        (ct || ut
          ? (rt || ot) && ((i = -(parseFloat(t) + ut)), (a = i + st + 2 * ut))
          : rt && ((i = _[qt]), (a = i + st)),
        rt)
      )
        _.forEach(function (t, e) {
          e < Ht &&
            ((ct || ut) && t <= i + 0.5 && (r = e), 0.5 <= a - t && (n = e));
        });
      else {
        if (ot) {
          var e = ot + lt;
          ct || ut
            ? ((r = Math.floor(i / e)), (n = Math.ceil(a / e - 1)))
            : (n = r + Math.ceil(st / e) - 1);
        } else if (ct || ut) {
          var o = ft - 1;
          if ((ct ? ((r -= o / 2), (n = qt + o / 2)) : (n = qt + o), ut)) {
            var u = (ut * ft) / st;
            (r -= u), (n += u);
          }
          (r = Math.floor(r)), (n = Math.ceil(n));
        } else n = r + ft - 1;
        (r = Math.max(r, 0)), (n = Math.min(n, Ht - 1));
      }
      return [r, n];
    }
    function Pn() {
      St &&
        !$t &&
        Fn.apply(null, In()).forEach(function (t) {
          if (!ji(t, ge)) {
            var e = {};
            (e[C] = function (t) {
              t.stopPropagation();
            }),
              ea(t, e),
              ea(t, xe),
              (t.src = Xi(t, "data-src"));
            var n = Xi(t, "data-srcset");
            n && (t.srcset = n), Vi(t, "loading");
          }
        });
    }
    function zn(t) {
      Vi(t, "loaded"), Wn(t);
    }
    function Wn(t) {
      Vi(t, "tns-complete"), Gi(t, "loading"), na(t, xe);
    }
    function Fn(t, e) {
      for (var n = []; t <= e; )
        qi(Y[t].querySelectorAll("img"), function (t) {
          n.push(t);
        }),
          t++;
      return n;
    }
    function qn() {
      var t = Fn.apply(null, In());
      Oi(function () {
        jn(t, Xn);
      });
    }
    function jn(n, t) {
      return Z
        ? t()
        : (n.forEach(function (t, e) {
            ji(t, ge) && n.splice(e, 1);
          }),
          n.length
            ? void Oi(function () {
                jn(n, t);
              })
            : t());
    }
    function Vn() {
      Pn(),
        Kn(),
        kn(),
        $n(),
        (function () {
          if (Ct && ((Re = 0 <= ke ? ke : ln()), (ke = -1), Re !== Ie)) {
            var t = Be[Ie],
              e = Be[Re];
            Yi(t, { tabindex: "-1", "aria-label": ze + (Ie + 1) }),
              Gi(t, Pe),
              Yi(e, { "aria-label": ze + (Re + 1) + We }),
              Ki(e, "tabindex"),
              Vi(e, Pe),
              (Ie = Re);
          }
        })();
    }
    function Gn() {
      I && gt && (S.style[x] = mt / 1e3 + "s");
    }
    function Qn(t, e) {
      for (var n = [], i = t, a = Math.min(t + e, Ht); i < a; i++)
        n.push(Y[i].offsetHeight);
      return Math.max.apply(null, n);
    }
    function Xn() {
      var t = gt ? Qn(qt, ft) : Qn(Dt, K),
        e = S || V;
      e.style.height !== t && (e.style.height = t + "px");
    }
    function Yn() {
      _ = [0];
      var n = q ? "left" : "top",
        i = q ? "right" : "bottom",
        a = Y[0].getBoundingClientRect()[n];
      qi(Y, function (t, e) {
        e && _.push(t.getBoundingClientRect()[n] - a),
          e === Ht - 1 && _.push(t.getBoundingClientRect()[i] - a);
      });
    }
    function Kn() {
      var t = In(),
        n = t[0],
        i = t[1];
      qi(Y, function (t, e) {
        n <= e && e <= i
          ? Qi(t, "aria-hidden") &&
            (Ki(t, ["aria-hidden", "tabindex"]), Vi(t, ye))
          : Qi(t, "aria-hidden") ||
            (Yi(t, { "aria-hidden": "true", tabindex: "-1" }), Gi(t, ye));
      });
    }
    function Jn(t) {
      return t.nodeName.toLowerCase();
    }
    function Un(t) {
      return "button" === Jn(t);
    }
    function _n(t) {
      return "true" === t.getAttribute("aria-disabled");
    }
    function Zn(t, e, n) {
      t ? (e.disabled = n) : e.setAttribute("aria-disabled", n.toString());
    }
    function $n() {
      if (xt && !ht && !yt) {
        var t = Ce ? Ee.disabled : _n(Ee),
          e = we ? Ae.disabled : _n(Ae),
          n = qt <= Vt,
          i = !ht && Gt <= qt;
        n && !t && Zn(Ce, Ee, !0),
          !n && t && Zn(Ce, Ee, !1),
          i && !e && Zn(we, Ae, !0),
          !i && e && Zn(we, Ae, !1);
      }
    }
    function ti(t, e) {
      x && (t.style[x] = e);
    }
    function ei(t) {
      return (
        null == t && (t = qt),
        rt
          ? (st - (ut ? lt : 0) - (_[t + 1] - _[t] - lt)) / 2
          : ot
          ? (st - ot) / 2
          : (ft - 1) / 2
      );
    }
    function ni() {
      var t = st + (ut ? lt : 0) - (ot ? (ot + lt) * Ht : _[Ht]);
      return (
        ct &&
          !yt &&
          (t = ot ? -(ot + lt) * (Ht - 1) - ei() : ei(Ht - 1) - _[Ht - 1]),
        0 < t && (t = 0),
        t
      );
    }
    function ii(t) {
      var e;
      if ((null == t && (t = qt), q && !rt))
        if (ot) (e = -(ot + lt) * t), ct && (e += ei());
        else {
          var n = d ? Ht : ft;
          ct && (t -= ei()), (e = (100 * -t) / n);
        }
      else (e = -_[t]), ct && rt && (e += ei());
      return kt && (e = Math.max(e, Rt)), (e += !q || rt || ot ? "px" : "%");
    }
    function ai(t) {
      ti(G, "0s"), ri(t);
    }
    function ri(t) {
      null == t && (t = ii()), (G.style[Pt] = zt + t + Wt);
    }
    function oi(t, e, n, i) {
      var a = t + ft;
      yt || (a = Math.min(a, Ht));
      for (var r = t; r < a; r++) {
        var o = Y[r];
        i || (o.style.left = (100 * (r - qt)) / ft + "%"),
          B && p && (o.style[p] = o.style[m] = (B * (r - t)) / 1e3 + "s"),
          Gi(o, e),
          Vi(o, n),
          i && Ot.push(o);
      }
    }
    function ui(t, e) {
      It && en(),
        (qt !== jt || e) &&
          (Ut.emit("indexChanged", Si()),
          Ut.emit("transitionStart", Si()),
          gt && qn(),
          qe && t && 0 <= ["click", "keydown"].indexOf(t.type) && hi(),
          (Kt = !0),
          nn());
    }
    function li(t) {
      return t.toLowerCase().replace(/-/g, "");
    }
    function si(t) {
      if (I || Kt) {
        if ((Ut.emit("transitionEnd", Si(t)), !I && 0 < Ot.length))
          for (var e = 0; e < Ot.length; e++) {
            var n = Ot[e];
            (n.style.left = ""),
              m && p && ((n.style[m] = ""), (n.style[p] = "")),
              Gi(n, z),
              Vi(n, W);
          }
        if (
          !t ||
          (!I && t.target.parentNode === G) ||
          (t.target === G && li(t.propertyName) === li(Pt))
        ) {
          if (!It) {
            var i = qt;
            en(), qt !== i && (Ut.emit("indexChanged", Si()), ai());
          }
          "inner" === R && Ut.emit("innerLoaded", Si()), (Kt = !1), (jt = qt);
        }
      }
    }
    function ci(t, e) {
      if (!ne)
        if ("prev" === t) fi(e, -1);
        else if ("next" === t) fi(e, 1);
        else {
          if (Kt) {
            if (Qt) return;
            si();
          }
          var n = un(),
            i = 0;
          if (
            ("first" === t
              ? (i = -n)
              : "last" === t
              ? (i = I ? K - ft - n : K - 1 - n)
              : ("number" != typeof t && (t = parseInt(t)),
                isNaN(t) ||
                  (e || (t = Math.max(0, Math.min(K - 1, t))), (i = t - n))),
            !I && i && Math.abs(i) < ft)
          ) {
            var a = 0 < i ? 1 : -1;
            i += Vt <= qt + i - K ? K * a : 2 * K * a * -1;
          }
          (qt += i),
            I && yt && (qt < Vt && (qt += K), Gt < qt && (qt -= K)),
            un(qt) !== un(jt) && ui(e);
        }
    }
    function fi(t, e) {
      if (Kt) {
        if (Qt) return;
        si();
      }
      var n;
      if (!e) {
        for (var i = bi((t = xi(t))); i !== Me && [Ee, Ae].indexOf(i) < 0; )
          i = i.parentNode;
        var a = [Ee, Ae].indexOf(i);
        0 <= a && ((n = !0), (e = 0 === a ? -1 : 1));
      }
      if (ht) {
        if (qt === Vt && -1 === e) return void ci("last", t);
        if (qt === Gt && 1 === e) return void ci("first", t);
      }
      e &&
        ((qt += dt * e),
        rt && (qt = Math.floor(qt)),
        ui(n || (t && "keydown" === t.type) ? t : null));
    }
    function di() {
      (Fe = setInterval(function () {
        fi(null, Qe);
      }, Et)),
        (qe = !0);
    }
    function vi() {
      clearInterval(Fe), (qe = !1);
    }
    function pi(t, e) {
      Yi(Xe, { "data-action": t }), (Xe.innerHTML = Ke[0] + t + Ke[1] + e);
    }
    function mi() {
      di(), Xe && pi("stop", At[1]);
    }
    function hi() {
      vi(), Xe && pi("start", At[0]);
    }
    function yi() {
      qe ? (hi(), (Ve = !0)) : (mi(), (Ve = !1));
    }
    function gi(t) {
      t.focus();
    }
    function xi(t) {
      return Ci((t = t || h.event)) ? t.changedTouches[0] : t;
    }
    function bi(t) {
      return t.target || h.event.srcElement;
    }
    function Ci(t) {
      return 0 <= t.type.indexOf("touch");
    }
    function wi(t) {
      t.preventDefault ? t.preventDefault() : (t.returnValue = !1);
    }
    function Mi() {
      return (
        (a = Ze.y - _e.y),
        (r = Ze.x - _e.x),
        (t = Math.atan2(a, r) * (180 / Math.PI)),
        (e = Xt),
        (n = !1),
        (i = Math.abs(90 - Math.abs(t))),
        90 - e <= i ? (n = "horizontal") : i <= e && (n = "vertical"),
        n === O.axis
      );
      var t, e, n, i, a, r;
    }
    function Ti(t) {
      if (Kt) {
        if (Qt) return;
        si();
      }
      Tt && qe && vi(), ($e = !0), Ue && (Di(Ue), (Ue = null));
      var e = xi(t);
      Ut.emit(Ci(t) ? "touchStart" : "dragStart", Si(t)),
        !Ci(t) && 0 <= ["img", "a"].indexOf(Jn(bi(t))) && wi(t),
        (Ze.x = _e.x = e.clientX),
        (Ze.y = _e.y = e.clientY),
        I && ((Je = parseFloat(G.style[Pt].replace(zt, ""))), ti(G, "0s"));
    }
    function Ei(t) {
      if ($e) {
        var e = xi(t);
        (Ze.x = e.clientX),
          (Ze.y = e.clientY),
          I
            ? Ue ||
              (Ue = Oi(function () {
                !(function t(e) {
                  if (!Yt) return void ($e = !1);
                  Di(Ue);
                  $e &&
                    (Ue = Oi(function () {
                      t(e);
                    }));
                  "?" === Yt && (Yt = Mi());
                  if (Yt) {
                    !be && Ci(e) && (be = !0);
                    try {
                      e.type &&
                        Ut.emit(Ci(e) ? "touchMove" : "dragMove", Si(e));
                    } catch (t) {}
                    var n = Je,
                      i = tn(Ze, _e);
                    if (!q || ot || rt) (n += i), (n += "px");
                    else {
                      var a = d
                        ? (i * ft * 100) / ((st + lt) * Ht)
                        : (100 * i) / (st + lt);
                      (n += a), (n += "%");
                    }
                    G.style[Pt] = zt + n + Wt;
                  }
                })(t);
              }))
            : ("?" === Yt && (Yt = Mi()), Yt && (be = !0)),
          be && t.preventDefault();
      }
    }
    function Ai(i) {
      if ($e) {
        Ue && (Di(Ue), (Ue = null)), I && ti(G, ""), ($e = !1);
        var t = xi(i);
        (Ze.x = t.clientX), (Ze.y = t.clientY);
        var a = tn(Ze, _e);
        if (Math.abs(a)) {
          if (!Ci(i)) {
            var n = bi(i);
            ea(n, {
              click: function t(e) {
                wi(e), na(n, { click: t });
              },
            });
          }
          I
            ? (Ue = Oi(function () {
                if (q && !rt) {
                  var t = (-a * ft) / (st + lt);
                  (t = 0 < a ? Math.floor(t) : Math.ceil(t)), (qt += t);
                } else {
                  var e = -(Je + a);
                  if (e <= 0) qt = Vt;
                  else if (e >= _[Ht - 1]) qt = Gt;
                  else
                    for (var n = 0; n < Ht && e >= _[n]; )
                      e > _[(qt = n)] && a < 0 && (qt += 1), n++;
                }
                ui(i, a), Ut.emit(Ci(i) ? "touchEnd" : "dragEnd", Si(i));
              }))
            : Yt && fi(i, 0 < a ? -1 : 1);
        }
      }
      "auto" === O.preventScrollOnTouch && (be = !1),
        Xt && (Yt = "?"),
        Tt && !qe && di();
    }
    function Ni() {
      (S || V).style.height = _[qt + ft] - _[qt] + "px";
    }
    function Li() {
      var t = ot ? ((ot + lt) * K) / st : K / ft;
      return Math.min(Math.ceil(t), K);
    }
    function Bi() {
      if (Ct && !ve && De !== He) {
        var t = He,
          e = De,
          n = _i;
        for (De < He && ((t = De), (e = He), (n = Ui)); t < e; ) n(Be[t]), t++;
        He = De;
      }
    }
    function Si(t) {
      return {
        container: G,
        slideItems: Y,
        navContainer: Se,
        navItems: Be,
        controlsContainer: Me,
        hasControls: fe,
        prevButton: Ee,
        nextButton: Ae,
        items: ft,
        slideBy: dt,
        cloneCount: Dt,
        slideCount: K,
        slideCountNew: Ht,
        index: qt,
        indexCached: jt,
        displayIndex: rn(),
        navCurrentIndex: Re,
        navCurrentIndexCached: Ie,
        pages: De,
        pagesCached: He,
        sheet: Bt,
        isOn: U,
        event: t || {},
      };
    }
    M && console.warn("No slides found in", O.container);
  };
  return aa;
})();

/* Shuffle JS */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t = "undefined" != typeof globalThis ? globalThis : t || self).Shuffle =
        e());
})(this, function () {
  "use strict";
  var t = { exports: {} };
  function e() {}
  (e.prototype = {
    on: function (t, e, i) {
      var s = this.e || (this.e = {});
      return (s[t] || (s[t] = [])).push({ fn: e, ctx: i }), this;
    },
    once: function (t, e, i) {
      var s = this;
      function n() {
        s.off(t, n), e.apply(i, arguments);
      }
      return (n._ = e), this.on(t, n, i);
    },
    emit: function (t) {
      for (
        var e = [].slice.call(arguments, 1),
          i = ((this.e || (this.e = {}))[t] || []).slice(),
          s = 0,
          n = i.length;
        s < n;
        s++
      )
        i[s].fn.apply(i[s].ctx, e);
      return this;
    },
    off: function (t, e) {
      var i = this.e || (this.e = {}),
        s = i[t],
        n = [];
      if (s && e)
        for (var o = 0, r = s.length; o < r; o++)
          s[o].fn !== e && s[o].fn._ !== e && n.push(s[o]);
      return n.length ? (i[t] = n) : delete i[t], this;
    },
  }),
    (t.exports = e),
    (t.exports.TinyEmitter = e);
  function i() {}
  function s(t) {
    return parseFloat(t) || 0;
  }
  class n {
    constructor(t, e) {
      (this.x = s(t)), (this.y = s(e));
    }
    static equals(t, e) {
      return t.x === e.x && t.y === e.y;
    }
  }
  class o {
    constructor(t, e, i, s, n) {
      (this.id = n),
        (this.left = t),
        (this.top = e),
        (this.width = i),
        (this.height = s);
    }
    static intersects(t, e) {
      return (
        t.left < e.left + e.width &&
        e.left < t.left + t.width &&
        t.top < e.top + e.height &&
        e.top < t.top + t.height
      );
    }
  }
  var r = {
    BASE: "shuffle",
    SHUFFLE_ITEM: "shuffle-item",
    VISIBLE: "shuffle-item--visible",
    HIDDEN: "shuffle-item--hidden",
  };
  let h = 0;
  class l {
    constructor(t, e) {
      (h += 1),
        (this.id = h),
        (this.element = t),
        (this.isRTL = e),
        (this.isVisible = !0),
        (this.isHidden = !1);
    }
    show() {
      (this.isVisible = !0),
        this.element.classList.remove(r.HIDDEN),
        this.element.classList.add(r.VISIBLE),
        this.element.removeAttribute("aria-hidden");
    }
    hide() {
      (this.isVisible = !1),
        this.element.classList.remove(r.VISIBLE),
        this.element.classList.add(r.HIDDEN),
        this.element.setAttribute("aria-hidden", !0);
    }
    init() {
      this.addClasses([r.SHUFFLE_ITEM, r.VISIBLE]),
        this.applyCss(l.Css.INITIAL),
        this.applyCss(this.isRTL ? l.Css.DIRECTION.rtl : l.Css.DIRECTION.ltr),
        (this.scale = l.Scale.VISIBLE),
        (this.point = new n());
    }
    addClasses(t) {
      t.forEach((t) => {
        this.element.classList.add(t);
      });
    }
    removeClasses(t) {
      t.forEach((t) => {
        this.element.classList.remove(t);
      });
    }
    applyCss(t) {
      Object.keys(t).forEach((e) => {
        this.element.style[e] = t[e];
      });
    }
    dispose() {
      this.removeClasses([r.HIDDEN, r.VISIBLE, r.SHUFFLE_ITEM]),
        this.element.removeAttribute("style"),
        (this.element = null);
    }
  }
  (l.Css = {
    INITIAL: {
      position: "absolute",
      top: 0,
      visibility: "visible",
      willChange: "transform",
    },
    DIRECTION: { ltr: { left: 0 }, rtl: { right: 0 } },
    VISIBLE: {
      before: { opacity: 1, visibility: "visible" },
      after: { transitionDelay: "" },
    },
    HIDDEN: {
      before: { opacity: 0 },
      after: { visibility: "hidden", transitionDelay: "" },
    },
  }),
    (l.Scale = { VISIBLE: 1, HIDDEN: 0.001 });
  let a = null;
  var d = () => {
    if (null !== a) return a;
    const t = document.body || document.documentElement,
      e = document.createElement("div");
    (e.style.cssText = "width:10px;padding:2px;box-sizing:border-box;"),
      t.appendChild(e);
    const { width: i } = window.getComputedStyle(e, null);
    return (a = 10 === Math.round(s(i))), t.removeChild(e), a;
  };
  function u(t, e) {
    let i =
        arguments.length > 2 && void 0 !== arguments[2]
          ? arguments[2]
          : window.getComputedStyle(t, null),
      n = s(i[e]);
    return (
      d() || "width" !== e
        ? d() ||
          "height" !== e ||
          (n +=
            s(i.paddingTop) +
            s(i.paddingBottom) +
            s(i.borderTopWidth) +
            s(i.borderBottomWidth))
        : (n +=
            s(i.paddingLeft) +
            s(i.paddingRight) +
            s(i.borderLeftWidth) +
            s(i.borderRightWidth)),
      n
    );
  }
  const m = {
    reverse: !1,
    by: null,
    compare: null,
    randomize: !1,
    key: "element",
  };
  function c(t, e) {
    const i = { ...m, ...e },
      s = Array.from(t);
    let n = !1;
    return t.length
      ? i.randomize
        ? (function (t) {
            let e = t.length;
            for (; e; ) {
              e -= 1;
              const i = Math.floor(Math.random() * (e + 1)),
                s = t[i];
              (t[i] = t[e]), (t[e] = s);
            }
            return t;
          })(t)
        : ("function" == typeof i.by
            ? t.sort((t, e) => {
                if (n) return 0;
                const s = i.by(t[i.key]),
                  o = i.by(e[i.key]);
                return void 0 === s && void 0 === o
                  ? ((n = !0), 0)
                  : s < o || "sortFirst" === s || "sortLast" === o
                  ? -1
                  : s > o || "sortLast" === s || "sortFirst" === o
                  ? 1
                  : 0;
              })
            : "function" == typeof i.compare && t.sort(i.compare),
          n ? s : (i.reverse && t.reverse(), t))
      : [];
  }
  const p = {},
    f = "transitionend";
  let g = 0;
  function _(t) {
    return (
      !!p[t] &&
      (p[t].element.removeEventListener(f, p[t].listener), (p[t] = null), !0)
    );
  }
  function y(t, e) {
    const i = ((g += 1), f + g),
      s = (t) => {
        t.currentTarget === t.target && (_(i), e(t));
      };
    return t.addEventListener(f, s), (p[i] = { element: t, listener: s }), i;
  }
  function I(t) {
    return Math.max(...t);
  }
  function E(t, e, i, s) {
    let n = t / e;
    return (
      Math.abs(Math.round(n) - n) < s && (n = Math.round(n)),
      Math.min(Math.ceil(n), i)
    );
  }
  function v(t, e, i) {
    if (1 === e) return t;
    const s = [];
    for (let n = 0; n <= i - e; n++) s.push(I(t.slice(n, n + e)));
    return s;
  }
  function b(t, e) {
    const i = ((s = t), Math.min(...s));
    var s;
    for (let s = 0, n = t.length; s < n; s++)
      if (t[s] >= i - e && t[s] <= i + e) return s;
    return 0;
  }
  function T(t, e) {
    const i = {};
    t.forEach((t) => {
      i[t.top] ? i[t.top].push(t) : (i[t.top] = [t]);
    });
    let s = [];
    const r = [],
      h = [];
    return (
      Object.keys(i).forEach((t) => {
        const n = i[t];
        r.push(n);
        const l = n[n.length - 1],
          a = l.left + l.width,
          d = Math.round((e - a) / 2);
        let u = n,
          m = !1;
        if (d > 0) {
          const t = [];
          (m = n.every((e) => {
            const i = new o(e.left + d, e.top, e.width, e.height, e.id),
              n = !s.some((t) => o.intersects(i, t));
            return t.push(i), n;
          })),
            m && (u = t);
        }
        if (!m) {
          let t;
          if (
            n.some((e) =>
              s.some((i) => {
                const s = o.intersects(e, i);
                return s && (t = i), s;
              })
            )
          ) {
            const e = h.findIndex((e) => e.includes(t));
            h.splice(e, 1, r[e]);
          }
        }
        (s = s.concat(u)), h.push(u);
      }),
      h
        .flat()
        .sort((t, e) => t.id - e.id)
        .map((t) => new n(t.left, t.top))
    );
  }
  function S(t) {
    return Array.from(new Set(t));
  }
  let C = 0;
  class L extends t.exports {
    constructor(t) {
      let e =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      super(),
        (this.options = { ...L.options, ...e }),
        (this.lastSort = {}),
        (this.group = L.ALL_ITEMS),
        (this.lastFilter = L.ALL_ITEMS),
        (this.isEnabled = !0),
        (this.isDestroyed = !1),
        (this.isInitialized = !1),
        (this._transitions = []),
        (this.isTransitioning = !1),
        (this._queue = []);
      const i = this._getElementOption(t);
      if (!i)
        throw new TypeError("Shuffle needs to be initialized with an element.");
      (this.element = i),
        (this.id = `shuffle_${C}`),
        (C += 1),
        this._init(),
        (this.isInitialized = !0);
    }
    _init() {
      if (
        ((this.items = this._getItems()),
        (this.sortedItems = this.items),
        (this.options.sizer = this._getElementOption(this.options.sizer)),
        this.element.classList.add(L.Classes.BASE),
        this._initItems(this.items),
        "complete" !== document.readyState)
      ) {
        const t = this.layout.bind(this);
        window.addEventListener("load", function e() {
          window.removeEventListener("load", e), t();
        });
      }
      const t = window.getComputedStyle(this.element, null),
        e = L.getSize(this.element).width;
      this._validateStyles(t),
        this._setColumns(e),
        this.filter(this.options.group, this.options.initialSort),
        (this._rafId = null),
        "ResizeObserver" in window &&
          ((this._resizeObserver = new ResizeObserver(
            this._handleResizeCallback.bind(this)
          )),
          this._resizeObserver.observe(this.element)),
        this.element.offsetWidth,
        this.setItemTransitions(this.items),
        (this.element.style.transition = `height ${this.options.speed}ms ${this.options.easing}`);
    }
    _getElementOption(t) {
      return "string" == typeof t
        ? this.element.querySelector(t)
        : t && t.nodeType && 1 === t.nodeType
        ? t
        : t && t.jquery
        ? t[0]
        : null;
    }
    _validateStyles(t) {
      "static" === t.position && (this.element.style.position = "relative"),
        "hidden" !== t.overflow && (this.element.style.overflow = "hidden");
    }
    _filter() {
      let t =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : this.lastFilter,
        e =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : this.items;
      const i = this._getFilteredSets(t, e);
      return (
        this._toggleFilterClasses(i),
        (this.lastFilter = t),
        "string" == typeof t && (this.group = t),
        i
      );
    }
    _getFilteredSets(t, e) {
      let i = [];
      const s = [];
      return (
        t === L.ALL_ITEMS
          ? (i = e)
          : e.forEach((e) => {
              this._doesPassFilter(t, e.element) ? i.push(e) : s.push(e);
            }),
        { visible: i, hidden: s }
      );
    }
    _doesPassFilter(t, e) {
      if ("function" == typeof t) return t.call(e, e, this);
      const i = e.dataset[L.FILTER_ATTRIBUTE_KEY],
        s = this.options.delimiter
          ? i.split(this.options.delimiter)
          : JSON.parse(i);
      function n(t) {
        return s.includes(t);
      }
      return Array.isArray(t)
        ? this.options.filterMode === L.FilterMode.ANY
          ? t.some(n)
          : t.every(n)
        : s.includes(t);
    }
    _toggleFilterClasses(t) {
      let { visible: e, hidden: i } = t;
      e.forEach((t) => {
        t.show();
      }),
        i.forEach((t) => {
          t.hide();
        });
    }
    _initItems(t) {
      t.forEach((t) => {
        t.init();
      });
    }
    _disposeItems(t) {
      t.forEach((t) => {
        t.dispose();
      });
    }
    _updateItemCount() {
      this.visibleItems = this._getFilteredItems().length;
    }
    setItemTransitions(t) {
      const { speed: e, easing: i } = this.options,
        s = this.options.useTransforms ? ["transform"] : ["top", "left"],
        n = Object.keys(l.Css.HIDDEN.before).map((t) =>
          t.replace(/([A-Z])/g, (t, e) => `-${e.toLowerCase()}`)
        ),
        o = s.concat(n).join();
      t.forEach((t) => {
        (t.element.style.transitionDuration = `${e}ms`),
          (t.element.style.transitionTimingFunction = i),
          (t.element.style.transitionProperty = o);
      });
    }
    _getItems() {
      return Array.from(this.element.children)
        .filter((t) => t.matches(this.options.itemSelector))
        .map((t) => new l(t, this.options.isRTL));
    }
    _mergeNewItems(t) {
      const e = Array.from(this.element.children);
      return c(this.items.concat(t), { by: (t) => e.indexOf(t) });
    }
    _getFilteredItems() {
      return this.items.filter((t) => t.isVisible);
    }
    _getConcealedItems() {
      return this.items.filter((t) => !t.isVisible);
    }
    _getColumnSize(t, e) {
      let i;
      return (
        (i =
          "function" == typeof this.options.columnWidth
            ? this.options.columnWidth(t)
            : this.options.sizer
            ? L.getSize(this.options.sizer).width
            : this.options.columnWidth
            ? this.options.columnWidth
            : this.items.length > 0
            ? L.getSize(this.items[0].element, !0).width
            : t),
        0 === i && (i = t),
        i + e
      );
    }
    _getGutterSize(t) {
      let e;
      return (
        (e =
          "function" == typeof this.options.gutterWidth
            ? this.options.gutterWidth(t)
            : this.options.sizer
            ? u(this.options.sizer, "marginLeft")
            : this.options.gutterWidth),
        e
      );
    }
    _setColumns() {
      let t =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : L.getSize(this.element).width;
      const e = this._getGutterSize(t),
        i = this._getColumnSize(t, e);
      let s = (t + e) / i;
      Math.abs(Math.round(s) - s) < this.options.columnThreshold &&
        (s = Math.round(s)),
        (this.cols = Math.max(Math.floor(s || 0), 1)),
        (this.containerWidth = t),
        (this.colWidth = i);
    }
    _setContainerSize() {
      this.element.style.height = `${this._getContainerSize()}px`;
    }
    _getContainerSize() {
      return I(this.positions);
    }
    _getStaggerAmount(t) {
      return Math.min(
        t * this.options.staggerAmount,
        this.options.staggerAmountMax
      );
    }
    _dispatch(t) {
      let e =
        arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      this.isDestroyed || ((e.shuffle = this), this.emit(t, e));
    }
    _resetCols() {
      let t = this.cols;
      for (this.positions = []; t; ) (t -= 1), this.positions.push(0);
    }
    _layout(t) {
      const e = this._getNextPositions(t);
      let i = 0;
      t.forEach((t, s) => {
        function o() {
          t.applyCss(l.Css.VISIBLE.after);
        }
        if (n.equals(t.point, e[s]) && !t.isHidden)
          return t.applyCss(l.Css.VISIBLE.before), void o();
        (t.point = e[s]), (t.scale = l.Scale.VISIBLE), (t.isHidden = !1);
        const r = this.getStylesForTransition(t, l.Css.VISIBLE.before);
        (r.transitionDelay = `${this._getStaggerAmount(i)}ms`),
          this._queue.push({ item: t, styles: r, callback: o }),
          (i += 1);
      });
    }
    _getNextPositions(t) {
      if (this.options.isCentered) {
        const e = t.map((t, e) => {
          const i = L.getSize(t.element, !0),
            s = this._getItemPosition(i);
          return new o(s.x, s.y, i.width, i.height, e);
        });
        return this.getTransformedPositions(e, this.containerWidth);
      }
      return t.map((t) => this._getItemPosition(L.getSize(t.element, !0)));
    }
    _getItemPosition(t) {
      return (function (t) {
        let {
          itemSize: e,
          positions: i,
          gridSize: s,
          total: o,
          threshold: r,
          buffer: h,
        } = t;
        const l = E(e.width, s, o, r),
          a = v(i, l, o),
          d = b(a, h),
          u = new n(s * d, a[d]),
          m = a[d] + e.height;
        for (let t = 0; t < l; t++) i[d + t] = m;
        return u;
      })({
        itemSize: t,
        positions: this.positions,
        gridSize: this.colWidth,
        total: this.cols,
        threshold: this.options.columnThreshold,
        buffer: this.options.buffer,
      });
    }
    getTransformedPositions(t, e) {
      return T(t, e);
    }
    _shrink() {
      let t =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : this._getConcealedItems(),
        e = 0;
      t.forEach((t) => {
        function i() {
          t.applyCss(l.Css.HIDDEN.after);
        }
        if (t.isHidden) return t.applyCss(l.Css.HIDDEN.before), void i();
        (t.scale = l.Scale.HIDDEN), (t.isHidden = !0);
        const s = this.getStylesForTransition(t, l.Css.HIDDEN.before);
        (s.transitionDelay = `${this._getStaggerAmount(e)}ms`),
          this._queue.push({ item: t, styles: s, callback: i }),
          (e += 1);
      });
    }
    _handleResizeCallback(t) {
      if (this.isEnabled && !this.isDestroyed)
        for (const e of t)
          Math.round(e.contentRect.width) !== Math.round(this.containerWidth) &&
            (cancelAnimationFrame(this._rafId),
            (this._rafId = requestAnimationFrame(this.update.bind(this))));
    }
    getStylesForTransition(t, e) {
      const i = { ...e };
      if (this.options.useTransforms) {
        const e = this.options.isRTL ? "-" : "",
          s = this.options.roundTransforms ? Math.round(t.point.x) : t.point.x,
          n = this.options.roundTransforms ? Math.round(t.point.y) : t.point.y;
        i.transform = `translate(${e}${s}px, ${n}px) scale(${t.scale})`;
      } else this.options.isRTL ? (i.right = `${t.point.x}px`) : (i.left = `${t.point.x}px`), (i.top = `${t.point.y}px`);
      return i;
    }
    _whenTransitionDone(t, e, i) {
      const s = y(t, (t) => {
        e(), i(null, t);
      });
      this._transitions.push(s);
    }
    _getTransitionFunction(t) {
      return (e) => {
        t.item.applyCss(t.styles),
          this._whenTransitionDone(t.item.element, t.callback, e);
      };
    }
    _processQueue() {
      this.isTransitioning && this._cancelMovement();
      const t = this.options.speed > 0,
        e = this._queue.length > 0;
      e && t && this.isInitialized
        ? this._startTransitions(this._queue)
        : e
        ? (this._styleImmediately(this._queue),
          this._dispatch(L.EventType.LAYOUT))
        : this._dispatch(L.EventType.LAYOUT),
        (this._queue.length = 0);
    }
    _startTransitions(t) {
      this.isTransitioning = !0;
      !(function (t, e, s) {
        s || ("function" == typeof e ? ((s = e), (e = null)) : (s = i));
        var n = t && t.length;
        if (!n) return s(null, []);
        var o = !1,
          r = new Array(n);
        function h(t) {
          return function (e, i) {
            if (!o) {
              if (e) return s(e, r), void (o = !0);
              (r[t] = i), --n || s(null, r);
            }
          };
        }
        t.forEach(
          e
            ? function (t, i) {
                t.call(e, h(i));
              }
            : function (t, e) {
                t(h(e));
              }
        );
      })(
        t.map((t) => this._getTransitionFunction(t)),
        this._movementFinished.bind(this)
      );
    }
    _cancelMovement() {
      this._transitions.forEach(_),
        (this._transitions.length = 0),
        (this.isTransitioning = !1);
    }
    _styleImmediately(t) {
      if (t.length) {
        const e = t.map((t) => t.item.element);
        L._skipTransitions(e, () => {
          t.forEach((t) => {
            t.item.applyCss(t.styles), t.callback();
          });
        });
      }
    }
    _movementFinished() {
      (this._transitions.length = 0),
        (this.isTransitioning = !1),
        this._dispatch(L.EventType.LAYOUT);
    }
    filter(t, e) {
      this.isEnabled &&
        ((!t || (t && 0 === t.length)) && (t = L.ALL_ITEMS),
        this._filter(t),
        this._shrink(),
        this._updateItemCount(),
        this.sort(e));
    }
    sort() {
      let t =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : this.lastSort;
      if (!this.isEnabled) return;
      this._resetCols();
      const e = c(this._getFilteredItems(), t);
      (this.sortedItems = e),
        this._layout(e),
        this._processQueue(),
        this._setContainerSize(),
        (this.lastSort = t);
    }
    update() {
      let { recalculateSizes: t = !0, force: e = !1 } =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      (this.isEnabled || e) && (t && this._setColumns(), this.sort());
    }
    layout() {
      this.update({ recalculateSizes: !0 });
    }
    add(t) {
      const e = S(t).map((t) => new l(t, this.options.isRTL));
      this._initItems(e), this._resetCols();
      const i = c(this._mergeNewItems(e), this.lastSort),
        s = this._filter(this.lastFilter, i),
        n = (t) => e.includes(t),
        o = (t) => {
          (t.scale = l.Scale.HIDDEN),
            (t.isHidden = !0),
            t.applyCss(l.Css.HIDDEN.before),
            t.applyCss(l.Css.HIDDEN.after);
        },
        r = this._getNextPositions(s.visible);
      s.visible.forEach((t, e) => {
        n(t) &&
          ((t.point = r[e]),
          o(t),
          t.applyCss(this.getStylesForTransition(t, {})));
      }),
        s.hidden.forEach((t) => {
          n(t) && o(t);
        }),
        this.element.offsetWidth,
        this.setItemTransitions(e),
        (this.items = this._mergeNewItems(e)),
        this.filter(this.lastFilter);
    }
    disable() {
      this.isEnabled = !1;
    }
    enable() {
      let t =
        !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
      (this.isEnabled = !0), t && this.update();
    }
    remove(t) {
      if (!t.length) return;
      const e = S(t),
        i = e.map((t) => this.getItemByElement(t)).filter((t) => !!t);
      this._toggleFilterClasses({ visible: [], hidden: i }),
        this._shrink(i),
        this.sort(),
        (this.items = this.items.filter((t) => !i.includes(t))),
        this._updateItemCount(),
        this.once(L.EventType.LAYOUT, () => {
          this._disposeItems(i),
            e.forEach((t) => {
              t.parentNode.removeChild(t);
            }),
            this._dispatch(L.EventType.REMOVED, { collection: e });
        });
    }
    getItemByElement(t) {
      return this.items.find((e) => e.element === t);
    }
    resetItems() {
      this._disposeItems(this.items),
        (this.isInitialized = !1),
        (this.items = this._getItems()),
        this._initItems(this.items),
        this.once(L.EventType.LAYOUT, () => {
          this.setItemTransitions(this.items), (this.isInitialized = !0);
        }),
        this.filter(this.lastFilter);
    }
    destroy() {
      this._cancelMovement(),
        this._resizeObserver &&
          (this._resizeObserver.unobserve(this.element),
          (this._resizeObserver = null)),
        this.element.classList.remove("shuffle"),
        this.element.removeAttribute("style"),
        this._disposeItems(this.items),
        (this.items.length = 0),
        (this.sortedItems.length = 0),
        (this._transitions.length = 0),
        (this.options.sizer = null),
        (this.element = null),
        (this.isDestroyed = !0),
        (this.isEnabled = !1);
    }
    static getSize(t) {
      let e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
      const i = window.getComputedStyle(t, null);
      let s = u(t, "width", i),
        n = u(t, "height", i);
      if (e) {
        (s += u(t, "marginLeft", i) + u(t, "marginRight", i)),
          (n += u(t, "marginTop", i) + u(t, "marginBottom", i));
      }
      return { width: s, height: n };
    }
    static _skipTransitions(t, e) {
      const i = t.map((t) => {
        const { style: e } = t,
          i = e.transitionDuration,
          s = e.transitionDelay;
        return (
          (e.transitionDuration = "0ms"),
          (e.transitionDelay = "0ms"),
          { duration: i, delay: s }
        );
      });
      e(),
        t[0].offsetWidth,
        t.forEach((t, e) => {
          (t.style.transitionDuration = i[e].duration),
            (t.style.transitionDelay = i[e].delay);
        });
    }
  }
  return (
    (L.ShuffleItem = l),
    (L.ALL_ITEMS = "all"),
    (L.FILTER_ATTRIBUTE_KEY = "groups"),
    (L.EventType = { LAYOUT: "shuffle:layout", REMOVED: "shuffle:removed" }),
    (L.Classes = r),
    (L.FilterMode = { ANY: "any", ALL: "all" }),
    (L.options = {
      group: L.ALL_ITEMS,
      speed: 250,
      easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
      itemSelector: "*",
      sizer: null,
      gutterWidth: 0,
      columnWidth: 0,
      delimiter: null,
      buffer: 0,
      columnThreshold: 0.01,
      initialSort: null,
      staggerAmount: 15,
      staggerAmountMax: 150,
      useTransforms: !0,
      filterMode: L.FilterMode.ANY,
      isCentered: !1,
      isRTL: !1,
      roundTransforms: !0,
    }),
    (L.Point = n),
    (L.Rect = o),
    (L.__sorter = c),
    (L.__getColumnSpan = E),
    (L.__getAvailablePositions = v),
    (L.__getShortColumn = b),
    (L.__getCenteredPositions = T),
    L
  );
});

/*! Magnific Popup - v1.1.0 - 2016-02-20
 * http://dimsemenov.com/plugins/magnific-popup/
 * Copyright (c) 2016 Dmitry Semenov; */
!(function (a) {
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a(
        "object" == typeof exports
          ? require("jquery")
          : window.jQuery || window.Zepto
      );
})(function (a) {
  var b,
    c,
    d,
    e,
    f,
    g,
    h = "Close",
    i = "BeforeClose",
    j = "AfterClose",
    k = "BeforeAppend",
    l = "MarkupParse",
    m = "Open",
    n = "Change",
    o = "mfp",
    p = "." + o,
    q = "mfp-ready",
    r = "mfp-removing",
    s = "mfp-prevent-close",
    t = function () {},
    u = !!window.jQuery,
    v = a(window),
    w = function (a, c) {
      b.ev.on(o + a + p, c);
    },
    x = function (b, c, d, e) {
      var f = document.createElement("div");
      return (
        (f.className = "mfp-" + b),
        d && (f.innerHTML = d),
        e ? c && c.appendChild(f) : ((f = a(f)), c && f.appendTo(c)),
        f
      );
    },
    y = function (c, d) {
      b.ev.triggerHandler(o + c, d),
        b.st.callbacks &&
          ((c = c.charAt(0).toLowerCase() + c.slice(1)),
          b.st.callbacks[c] &&
            b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]));
    },
    z = function (c) {
      return (
        (c === g && b.currTemplate.closeBtn) ||
          ((b.currTemplate.closeBtn = a(
            b.st.closeMarkup.replace("%title%", b.st.tClose)
          )),
          (g = c)),
        b.currTemplate.closeBtn
      );
    },
    A = function () {
      a.magnificPopup.instance ||
        ((b = new t()), b.init(), (a.magnificPopup.instance = b));
    },
    B = function () {
      var a = document.createElement("p").style,
        b = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== a.transition) return !0;
      for (; b.length; ) if (b.pop() + "Transition" in a) return !0;
      return !1;
    };
  (t.prototype = {
    constructor: t,
    init: function () {
      var c = navigator.appVersion;
      (b.isLowIE = b.isIE8 = document.all && !document.addEventListener),
        (b.isAndroid = /android/gi.test(c)),
        (b.isIOS = /iphone|ipad|ipod/gi.test(c)),
        (b.supportsTransition = B()),
        (b.probablyMobile =
          b.isAndroid ||
          b.isIOS ||
          /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(
            navigator.userAgent
          )),
        (d = a(document)),
        (b.popupsCache = {});
    },
    open: function (c) {
      var e;
      if (c.isObj === !1) {
        (b.items = c.items.toArray()), (b.index = 0);
        var g,
          h = c.items;
        for (e = 0; e < h.length; e++)
          if (((g = h[e]), g.parsed && (g = g.el[0]), g === c.el[0])) {
            b.index = e;
            break;
          }
      } else
        (b.items = a.isArray(c.items) ? c.items : [c.items]),
          (b.index = c.index || 0);
      if (b.isOpen) return void b.updateItemHTML();
      (b.types = []),
        (f = ""),
        c.mainEl && c.mainEl.length ? (b.ev = c.mainEl.eq(0)) : (b.ev = d),
        c.key
          ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}),
            (b.currTemplate = b.popupsCache[c.key]))
          : (b.currTemplate = {}),
        (b.st = a.extend(!0, {}, a.magnificPopup.defaults, c)),
        (b.fixedContentPos =
          "auto" === b.st.fixedContentPos
            ? !b.probablyMobile
            : b.st.fixedContentPos),
        b.st.modal &&
          ((b.st.closeOnContentClick = !1),
          (b.st.closeOnBgClick = !1),
          (b.st.showCloseBtn = !1),
          (b.st.enableEscapeKey = !1)),
        b.bgOverlay ||
          ((b.bgOverlay = x("bg").on("click" + p, function () {
            b.close();
          })),
          (b.wrap = x("wrap")
            .attr("tabindex", -1)
            .on("click" + p, function (a) {
              b._checkIfClose(a.target) && b.close();
            })),
          (b.container = x("container", b.wrap))),
        (b.contentContainer = x("content")),
        b.st.preloader &&
          (b.preloader = x("preloader", b.container, b.st.tLoading));
      var i = a.magnificPopup.modules;
      for (e = 0; e < i.length; e++) {
        var j = i[e];
        (j = j.charAt(0).toUpperCase() + j.slice(1)), b["init" + j].call(b);
      }
      y("BeforeOpen"),
        b.st.showCloseBtn &&
          (b.st.closeBtnInside
            ? (w(l, function (a, b, c, d) {
                c.close_replaceWith = z(d.type);
              }),
              (f += " mfp-close-btn-in"))
            : b.wrap.append(z())),
        b.st.alignTop && (f += " mfp-align-top"),
        b.fixedContentPos
          ? b.wrap.css({
              overflow: b.st.overflowY,
              overflowX: "hidden",
              overflowY: b.st.overflowY,
            })
          : b.wrap.css({ top: v.scrollTop(), position: "absolute" }),
        (b.st.fixedBgPos === !1 ||
          ("auto" === b.st.fixedBgPos && !b.fixedContentPos)) &&
          b.bgOverlay.css({ height: d.height(), position: "absolute" }),
        b.st.enableEscapeKey &&
          d.on("keyup" + p, function (a) {
            27 === a.keyCode && b.close();
          }),
        v.on("resize" + p, function () {
          b.updateSize();
        }),
        b.st.closeOnContentClick || (f += " mfp-auto-cursor"),
        f && b.wrap.addClass(f);
      var k = (b.wH = v.height()),
        n = {};
      if (b.fixedContentPos && b._hasScrollBar(k)) {
        var o = b._getScrollbarSize();
        o && (n.marginRight = o);
      }
      b.fixedContentPos &&
        (b.isIE7
          ? a("body, html").css("overflow", "hidden")
          : (n.overflow = "hidden"));
      var r = b.st.mainClass;
      return (
        b.isIE7 && (r += " mfp-ie7"),
        r && b._addClassToMFP(r),
        b.updateItemHTML(),
        y("BuildControls"),
        a("html").css(n),
        b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)),
        (b._lastFocusedEl = document.activeElement),
        setTimeout(function () {
          b.content
            ? (b._addClassToMFP(q), b._setFocus())
            : b.bgOverlay.addClass(q),
            d.on("focusin" + p, b._onFocusIn);
        }, 16),
        (b.isOpen = !0),
        b.updateSize(k),
        y(m),
        c
      );
    },
    close: function () {
      b.isOpen &&
        (y(i),
        (b.isOpen = !1),
        b.st.removalDelay && !b.isLowIE && b.supportsTransition
          ? (b._addClassToMFP(r),
            setTimeout(function () {
              b._close();
            }, b.st.removalDelay))
          : b._close());
    },
    _close: function () {
      y(h);
      var c = r + " " + q + " ";
      if (
        (b.bgOverlay.detach(),
        b.wrap.detach(),
        b.container.empty(),
        b.st.mainClass && (c += b.st.mainClass + " "),
        b._removeClassFromMFP(c),
        b.fixedContentPos)
      ) {
        var e = { marginRight: "" };
        b.isIE7 ? a("body, html").css("overflow", "") : (e.overflow = ""),
          a("html").css(e);
      }
      d.off("keyup" + p + " focusin" + p),
        b.ev.off(p),
        b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
        b.bgOverlay.attr("class", "mfp-bg"),
        b.container.attr("class", "mfp-container"),
        !b.st.showCloseBtn ||
          (b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0) ||
          (b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach()),
        b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(),
        (b.currItem = null),
        (b.content = null),
        (b.currTemplate = null),
        (b.prevHeight = 0),
        y(j);
    },
    updateSize: function (a) {
      if (b.isIOS) {
        var c = document.documentElement.clientWidth / window.innerWidth,
          d = window.innerHeight * c;
        b.wrap.css("height", d), (b.wH = d);
      } else b.wH = a || v.height();
      b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize");
    },
    updateItemHTML: function () {
      var c = b.items[b.index];
      b.contentContainer.detach(),
        b.content && b.content.detach(),
        c.parsed || (c = b.parseEl(b.index));
      var d = c.type;
      if (
        (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]),
        (b.currItem = c),
        !b.currTemplate[d])
      ) {
        var f = b.st[d] ? b.st[d].markup : !1;
        y("FirstMarkupParse", f),
          f ? (b.currTemplate[d] = a(f)) : (b.currTemplate[d] = !0);
      }
      e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
      var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](
        c,
        b.currTemplate[d]
      );
      b.appendContent(g, d),
        (c.preloaded = !0),
        y(n, c),
        (e = c.type),
        b.container.prepend(b.contentContainer),
        y("AfterChange");
    },
    appendContent: function (a, c) {
      (b.content = a),
        a
          ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0
            ? b.content.find(".mfp-close").length || b.content.append(z())
            : (b.content = a)
          : (b.content = ""),
        y(k),
        b.container.addClass("mfp-" + c + "-holder"),
        b.contentContainer.append(b.content);
    },
    parseEl: function (c) {
      var d,
        e = b.items[c];
      if (
        (e.tagName
          ? (e = { el: a(e) })
          : ((d = e.type), (e = { data: e, src: e.src })),
        e.el)
      ) {
        for (var f = b.types, g = 0; g < f.length; g++)
          if (e.el.hasClass("mfp-" + f[g])) {
            d = f[g];
            break;
          }
        (e.src = e.el.attr("data-mfp-src")),
          e.src || (e.src = e.el.attr("href"));
      }
      return (
        (e.type = d || b.st.type || "inline"),
        (e.index = c),
        (e.parsed = !0),
        (b.items[c] = e),
        y("ElementParse", e),
        b.items[c]
      );
    },
    addGroup: function (a, c) {
      var d = function (d) {
        (d.mfpEl = this), b._openClick(d, a, c);
      };
      c || (c = {});
      var e = "click.magnificPopup";
      (c.mainEl = a),
        c.items
          ? ((c.isObj = !0), a.off(e).on(e, d))
          : ((c.isObj = !1),
            c.delegate
              ? a.off(e).on(e, c.delegate, d)
              : ((c.items = a), a.off(e).on(e, d)));
    },
    _openClick: function (c, d, e) {
      var f =
        void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
      if (
        f ||
        !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)
      ) {
        var g =
          void 0 !== e.disableOn
            ? e.disableOn
            : a.magnificPopup.defaults.disableOn;
        if (g)
          if (a.isFunction(g)) {
            if (!g.call(b)) return !0;
          } else if (v.width() < g) return !0;
        c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()),
          (e.el = a(c.mfpEl)),
          e.delegate && (e.items = d.find(e.delegate)),
          b.open(e);
      }
    },
    updateStatus: function (a, d) {
      if (b.preloader) {
        c !== a && b.container.removeClass("mfp-s-" + c),
          d || "loading" !== a || (d = b.st.tLoading);
        var e = { status: a, text: d };
        y("UpdateStatus", e),
          (a = e.status),
          (d = e.text),
          b.preloader.html(d),
          b.preloader.find("a").on("click", function (a) {
            a.stopImmediatePropagation();
          }),
          b.container.addClass("mfp-s-" + a),
          (c = a);
      }
    },
    _checkIfClose: function (c) {
      if (!a(c).hasClass(s)) {
        var d = b.st.closeOnContentClick,
          e = b.st.closeOnBgClick;
        if (d && e) return !0;
        if (
          !b.content ||
          a(c).hasClass("mfp-close") ||
          (b.preloader && c === b.preloader[0])
        )
          return !0;
        if (c === b.content[0] || a.contains(b.content[0], c)) {
          if (d) return !0;
        } else if (e && a.contains(document, c)) return !0;
        return !1;
      }
    },
    _addClassToMFP: function (a) {
      b.bgOverlay.addClass(a), b.wrap.addClass(a);
    },
    _removeClassFromMFP: function (a) {
      this.bgOverlay.removeClass(a), b.wrap.removeClass(a);
    },
    _hasScrollBar: function (a) {
      return (
        (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
      );
    },
    _setFocus: function () {
      (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus();
    },
    _onFocusIn: function (c) {
      return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target)
        ? void 0
        : (b._setFocus(), !1);
    },
    _parseMarkup: function (b, c, d) {
      var e;
      d.data && (c = a.extend(d.data, c)),
        y(l, [b, c, d]),
        a.each(c, function (c, d) {
          if (void 0 === d || d === !1) return !0;
          if (((e = c.split("_")), e.length > 1)) {
            var f = b.find(p + "-" + e[0]);
            if (f.length > 0) {
              var g = e[1];
              "replaceWith" === g
                ? f[0] !== d[0] && f.replaceWith(d)
                : "img" === g
                ? f.is("img")
                  ? f.attr("src", d)
                  : f.replaceWith(
                      a("<img>").attr("src", d).attr("class", f.attr("class"))
                    )
                : f.attr(e[1], d);
            }
          } else b.find(p + "-" + c).html(d);
        });
    },
    _getScrollbarSize: function () {
      if (void 0 === b.scrollbarSize) {
        var a = document.createElement("div");
        (a.style.cssText =
          "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;"),
          document.body.appendChild(a),
          (b.scrollbarSize = a.offsetWidth - a.clientWidth),
          document.body.removeChild(a);
      }
      return b.scrollbarSize;
    },
  }),
    (a.magnificPopup = {
      instance: null,
      proto: t.prototype,
      modules: [],
      open: function (b, c) {
        return (
          A(),
          (b = b ? a.extend(!0, {}, b) : {}),
          (b.isObj = !0),
          (b.index = c || 0),
          this.instance.open(b)
        );
      },
      close: function () {
        return a.magnificPopup.instance && a.magnificPopup.instance.close();
      },
      registerModule: function (b, c) {
        c.options && (a.magnificPopup.defaults[b] = c.options),
          a.extend(this.proto, c.proto),
          this.modules.push(b);
      },
      defaults: {
        disableOn: 0,
        key: null,
        midClick: !1,
        mainClass: "",
        preloader: !0,
        focus: "",
        closeOnContentClick: !1,
        closeOnBgClick: !0,
        closeBtnInside: !0,
        showCloseBtn: !0,
        enableEscapeKey: !0,
        modal: !1,
        alignTop: !1,
        removalDelay: 0,
        prependTo: null,
        fixedContentPos: "auto",
        fixedBgPos: "auto",
        overflowY: "auto",
        closeMarkup:
          '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
        tClose: "Close (Esc)",
        tLoading: "Loading...",
        autoFocusLast: !0,
      },
    }),
    (a.fn.magnificPopup = function (c) {
      A();
      var d = a(this);
      if ("string" == typeof c)
        if ("open" === c) {
          var e,
            f = u ? d.data("magnificPopup") : d[0].magnificPopup,
            g = parseInt(arguments[1], 10) || 0;
          f.items
            ? (e = f.items[g])
            : ((e = d), f.delegate && (e = e.find(f.delegate)), (e = e.eq(g))),
            b._openClick({ mfpEl: e }, d, f);
        } else
          b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
      else
        (c = a.extend(!0, {}, c)),
          u ? d.data("magnificPopup", c) : (d[0].magnificPopup = c),
          b.addGroup(d, c);
      return d;
    });
  var C,
    D,
    E,
    F = "inline",
    G = function () {
      E && (D.after(E.addClass(C)).detach(), (E = null));
    };
  a.magnificPopup.registerModule(F, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found",
    },
    proto: {
      initInline: function () {
        b.types.push(F),
          w(h + "." + F, function () {
            G();
          });
      },
      getInline: function (c, d) {
        if ((G(), c.src)) {
          var e = b.st.inline,
            f = a(c.src);
          if (f.length) {
            var g = f[0].parentNode;
            g &&
              g.tagName &&
              (D || ((C = e.hiddenClass), (D = x(C)), (C = "mfp-" + C)),
              (E = f.after(D).detach().removeClass(C))),
              b.updateStatus("ready");
          } else b.updateStatus("error", e.tNotFound), (f = a("<div>"));
          return (c.inlineElement = f), f;
        }
        return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d;
      },
    },
  });
  var H,
    I = "ajax",
    J = function () {
      H && a(document.body).removeClass(H);
    },
    K = function () {
      J(), b.req && b.req.abort();
    };
  a.magnificPopup.registerModule(I, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.',
    },
    proto: {
      initAjax: function () {
        b.types.push(I),
          (H = b.st.ajax.cursor),
          w(h + "." + I, K),
          w("BeforeChange." + I, K);
      },
      getAjax: function (c) {
        H && a(document.body).addClass(H), b.updateStatus("loading");
        var d = a.extend(
          {
            url: c.src,
            success: function (d, e, f) {
              var g = { data: d, xhr: f };
              y("ParseAjax", g),
                b.appendContent(a(g.data), I),
                (c.finished = !0),
                J(),
                b._setFocus(),
                setTimeout(function () {
                  b.wrap.addClass(q);
                }, 16),
                b.updateStatus("ready"),
                y("AjaxContentAdded");
            },
            error: function () {
              J(),
                (c.finished = c.loadError = !0),
                b.updateStatus(
                  "error",
                  b.st.ajax.tError.replace("%url%", c.src)
                );
            },
          },
          b.st.ajax.settings
        );
        return (b.req = a.ajax(d)), "";
      },
    },
  });
  var L,
    M = function (c) {
      if (c.data && void 0 !== c.data.title) return c.data.title;
      var d = b.st.image.titleSrc;
      if (d) {
        if (a.isFunction(d)) return d.call(b, c);
        if (c.el) return c.el.attr(d) || "";
      }
      return "";
    };
  a.magnificPopup.registerModule("image", {
    options: {
      markup:
        '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.',
    },
    proto: {
      initImage: function () {
        var c = b.st.image,
          d = ".image";
        b.types.push("image"),
          w(m + d, function () {
            "image" === b.currItem.type &&
              c.cursor &&
              a(document.body).addClass(c.cursor);
          }),
          w(h + d, function () {
            c.cursor && a(document.body).removeClass(c.cursor),
              v.off("resize" + p);
          }),
          w("Resize" + d, b.resizeImage),
          b.isLowIE && w("AfterChange", b.resizeImage);
      },
      resizeImage: function () {
        var a = b.currItem;
        if (a && a.img && b.st.image.verticalFit) {
          var c = 0;
          b.isLowIE &&
            (c =
              parseInt(a.img.css("padding-top"), 10) +
              parseInt(a.img.css("padding-bottom"), 10)),
            a.img.css("max-height", b.wH - c);
        }
      },
      _onImageHasSize: function (a) {
        a.img &&
          ((a.hasSize = !0),
          L && clearInterval(L),
          (a.isCheckingImgSize = !1),
          y("ImageHasSize", a),
          a.imgHidden &&
            (b.content && b.content.removeClass("mfp-loading"),
            (a.imgHidden = !1)));
      },
      findImageSize: function (a) {
        var c = 0,
          d = a.img[0],
          e = function (f) {
            L && clearInterval(L),
              (L = setInterval(function () {
                return d.naturalWidth > 0
                  ? void b._onImageHasSize(a)
                  : (c > 200 && clearInterval(L),
                    c++,
                    void (3 === c
                      ? e(10)
                      : 40 === c
                      ? e(50)
                      : 100 === c && e(500)));
              }, f));
          };
        e(1);
      },
      getImage: function (c, d) {
        var e = 0,
          f = function () {
            c &&
              (c.img[0].complete
                ? (c.img.off(".mfploader"),
                  c === b.currItem &&
                    (b._onImageHasSize(c), b.updateStatus("ready")),
                  (c.hasSize = !0),
                  (c.loaded = !0),
                  y("ImageLoadComplete"))
                : (e++, 200 > e ? setTimeout(f, 100) : g()));
          },
          g = function () {
            c &&
              (c.img.off(".mfploader"),
              c === b.currItem &&
                (b._onImageHasSize(c),
                b.updateStatus("error", h.tError.replace("%url%", c.src))),
              (c.hasSize = !0),
              (c.loaded = !0),
              (c.loadError = !0));
          },
          h = b.st.image,
          i = d.find(".mfp-img");
        if (i.length) {
          var j = document.createElement("img");
          (j.className = "mfp-img"),
            c.el &&
              c.el.find("img").length &&
              (j.alt = c.el.find("img").attr("alt")),
            (c.img = a(j).on("load.mfploader", f).on("error.mfploader", g)),
            (j.src = c.src),
            i.is("img") && (c.img = c.img.clone()),
            (j = c.img[0]),
            j.naturalWidth > 0 ? (c.hasSize = !0) : j.width || (c.hasSize = !1);
        }
        return (
          b._parseMarkup(d, { title: M(c), img_replaceWith: c.img }, c),
          b.resizeImage(),
          c.hasSize
            ? (L && clearInterval(L),
              c.loadError
                ? (d.addClass("mfp-loading"),
                  b.updateStatus("error", h.tError.replace("%url%", c.src)))
                : (d.removeClass("mfp-loading"), b.updateStatus("ready")),
              d)
            : (b.updateStatus("loading"),
              (c.loading = !0),
              c.hasSize ||
                ((c.imgHidden = !0),
                d.addClass("mfp-loading"),
                b.findImageSize(c)),
              d)
        );
      },
    },
  });
  var N,
    O = function () {
      return (
        void 0 === N &&
          (N = void 0 !== document.createElement("p").style.MozTransform),
        N
      );
    };
  a.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function (a) {
        return a.is("img") ? a : a.find("img");
      },
    },
    proto: {
      initZoom: function () {
        var a,
          c = b.st.zoom,
          d = ".zoom";
        if (c.enabled && b.supportsTransition) {
          var e,
            f,
            g = c.duration,
            j = function (a) {
              var b = a
                  .clone()
                  .removeAttr("style")
                  .removeAttr("class")
                  .addClass("mfp-animated-image"),
                d = "all " + c.duration / 1e3 + "s " + c.easing,
                e = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden",
                },
                f = "transition";
              return (
                (e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d),
                b.css(e),
                b
              );
            },
            k = function () {
              b.content.css("visibility", "visible");
            };
          w("BuildControls" + d, function () {
            if (b._allowZoom()) {
              if (
                (clearTimeout(e),
                b.content.css("visibility", "hidden"),
                (a = b._getItemToZoom()),
                !a)
              )
                return void k();
              (f = j(a)),
                f.css(b._getOffset()),
                b.wrap.append(f),
                (e = setTimeout(function () {
                  f.css(b._getOffset(!0)),
                    (e = setTimeout(function () {
                      k(),
                        setTimeout(function () {
                          f.remove(), (a = f = null), y("ZoomAnimationEnded");
                        }, 16);
                    }, g));
                }, 16));
            }
          }),
            w(i + d, function () {
              if (b._allowZoom()) {
                if ((clearTimeout(e), (b.st.removalDelay = g), !a)) {
                  if (((a = b._getItemToZoom()), !a)) return;
                  f = j(a);
                }
                f.css(b._getOffset(!0)),
                  b.wrap.append(f),
                  b.content.css("visibility", "hidden"),
                  setTimeout(function () {
                    f.css(b._getOffset());
                  }, 16);
              }
            }),
            w(h + d, function () {
              b._allowZoom() && (k(), f && f.remove(), (a = null));
            });
        }
      },
      _allowZoom: function () {
        return "image" === b.currItem.type;
      },
      _getItemToZoom: function () {
        return b.currItem.hasSize ? b.currItem.img : !1;
      },
      _getOffset: function (c) {
        var d;
        d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
        var e = d.offset(),
          f = parseInt(d.css("padding-top"), 10),
          g = parseInt(d.css("padding-bottom"), 10);
        e.top -= a(window).scrollTop() - f;
        var h = {
          width: d.width(),
          height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f,
        };
        return (
          O()
            ? (h["-moz-transform"] = h.transform =
                "translate(" + e.left + "px," + e.top + "px)")
            : ((h.left = e.left), (h.top = e.top)),
          h
        );
      },
    },
  });
  var P = "iframe",
    Q = "//about:blank",
    R = function (a) {
      if (b.currTemplate[P]) {
        var c = b.currTemplate[P].find("iframe");
        c.length &&
          (a || (c[0].src = Q),
          b.isIE8 && c.css("display", a ? "block" : "none"));
      }
    };
  a.magnificPopup.registerModule(P, {
    options: {
      markup:
        '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1",
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1",
        },
        gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
      },
    },
    proto: {
      initIframe: function () {
        b.types.push(P),
          w("BeforeChange", function (a, b, c) {
            b !== c && (b === P ? R() : c === P && R(!0));
          }),
          w(h + "." + P, function () {
            R();
          });
      },
      getIframe: function (c, d) {
        var e = c.src,
          f = b.st.iframe;
        a.each(f.patterns, function () {
          return e.indexOf(this.index) > -1
            ? (this.id &&
                (e =
                  "string" == typeof this.id
                    ? e.substr(
                        e.lastIndexOf(this.id) + this.id.length,
                        e.length
                      )
                    : this.id.call(this, e)),
              (e = this.src.replace("%id%", e)),
              !1)
            : void 0;
        });
        var g = {};
        return (
          f.srcAction && (g[f.srcAction] = e),
          b._parseMarkup(d, g, c),
          b.updateStatus("ready"),
          d
        );
      },
    },
  });
  var S = function (a) {
      var c = b.items.length;
      return a > c - 1 ? a - c : 0 > a ? c + a : a;
    },
    T = function (a, b, c) {
      return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c);
    };
  a.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup:
        '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%",
    },
    proto: {
      initGallery: function () {
        var c = b.st.gallery,
          e = ".mfp-gallery";
        return (
          (b.direction = !0),
          c && c.enabled
            ? ((f += " mfp-gallery"),
              w(m + e, function () {
                c.navigateByImgClick &&
                  b.wrap.on("click" + e, ".mfp-img", function () {
                    return b.items.length > 1 ? (b.next(), !1) : void 0;
                  }),
                  d.on("keydown" + e, function (a) {
                    37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next();
                  });
              }),
              w("UpdateStatus" + e, function (a, c) {
                c.text &&
                  (c.text = T(c.text, b.currItem.index, b.items.length));
              }),
              w(l + e, function (a, d, e, f) {
                var g = b.items.length;
                e.counter = g > 1 ? T(c.tCounter, f.index, g) : "";
              }),
              w("BuildControls" + e, function () {
                if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                  var d = c.arrowMarkup,
                    e = (b.arrowLeft = a(
                      d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")
                    ).addClass(s)),
                    f = (b.arrowRight = a(
                      d
                        .replace(/%title%/gi, c.tNext)
                        .replace(/%dir%/gi, "right")
                    ).addClass(s));
                  e.click(function () {
                    b.prev();
                  }),
                    f.click(function () {
                      b.next();
                    }),
                    b.container.append(e.add(f));
                }
              }),
              w(n + e, function () {
                b._preloadTimeout && clearTimeout(b._preloadTimeout),
                  (b._preloadTimeout = setTimeout(function () {
                    b.preloadNearbyImages(), (b._preloadTimeout = null);
                  }, 16));
              }),
              void w(h + e, function () {
                d.off(e),
                  b.wrap.off("click" + e),
                  (b.arrowRight = b.arrowLeft = null);
              }))
            : !1
        );
      },
      next: function () {
        (b.direction = !0), (b.index = S(b.index + 1)), b.updateItemHTML();
      },
      prev: function () {
        (b.direction = !1), (b.index = S(b.index - 1)), b.updateItemHTML();
      },
      goTo: function (a) {
        (b.direction = a >= b.index), (b.index = a), b.updateItemHTML();
      },
      preloadNearbyImages: function () {
        var a,
          c = b.st.gallery.preload,
          d = Math.min(c[0], b.items.length),
          e = Math.min(c[1], b.items.length);
        for (a = 1; a <= (b.direction ? e : d); a++)
          b._preloadItem(b.index + a);
        for (a = 1; a <= (b.direction ? d : e); a++)
          b._preloadItem(b.index - a);
      },
      _preloadItem: function (c) {
        if (((c = S(c)), !b.items[c].preloaded)) {
          var d = b.items[c];
          d.parsed || (d = b.parseEl(c)),
            y("LazyLoad", d),
            "image" === d.type &&
              (d.img = a('<img class="mfp-img" />')
                .on("load.mfploader", function () {
                  d.hasSize = !0;
                })
                .on("error.mfploader", function () {
                  (d.hasSize = !0), (d.loadError = !0), y("LazyLoadError", d);
                })
                .attr("src", d.src)),
            (d.preloaded = !0);
        }
      },
    },
  });
  var U = "retina";
  a.magnificPopup.registerModule(U, {
    options: {
      replaceSrc: function (a) {
        return a.src.replace(/\.\w+$/, function (a) {
          return "@2x" + a;
        });
      },
      ratio: 1,
    },
    proto: {
      initRetina: function () {
        if (window.devicePixelRatio > 1) {
          var a = b.st.retina,
            c = a.ratio;
          (c = isNaN(c) ? c() : c),
            c > 1 &&
              (w("ImageHasSize." + U, function (a, b) {
                b.img.css({
                  "max-width": b.img[0].naturalWidth / c,
                  width: "100%",
                });
              }),
              w("ElementParse." + U, function (b, d) {
                d.src = a.replaceSrc(d, c);
              }));
        }
      },
    },
  }),
    A();
});

/* Convert Number To Words */
function numberToWords($) {
  var e = [];
  (e[0] = ""),
    (e[1] = "One"),
    (e[2] = "Two"),
    (e[3] = "Three"),
    (e[4] = "Four"),
    (e[5] = "Five"),
    (e[6] = "Six"),
    (e[7] = "Seven"),
    (e[8] = "Eight"),
    (e[9] = "Nine"),
    (e[10] = "Ten"),
    (e[11] = "Eleven"),
    (e[12] = "Twelve"),
    (e[13] = "Thirteen"),
    (e[14] = "Fourteen"),
    (e[15] = "Fifteen"),
    (e[16] = "Sixteen"),
    (e[17] = "Seventeen"),
    (e[18] = "Eighteen"),
    (e[19] = "Nineteen"),
    (e[20] = "Twenty"),
    (e[30] = "Thirty"),
    (e[40] = "Forty"),
    (e[50] = "Fifty"),
    (e[60] = "Sixty"),
    (e[70] = "Seventy"),
    (e[80] = "Eighty"),
    (e[90] = "Ninety");
  var n = ($ = $.toString()).split(".")[0].split(",").join(""),
    r = n.length,
    t = "";
  if (r <= 9) {
    for (var i = [0, 0, 0, 0, 0, 0, 0, 0, 0], _ = [], o = 0; o < r; o++)
      _[o] = n.substr(o, 1);
    for (var o = 9 - r, v = 0; o < 9; o++, v++) i[o] = _[v];
    for (var o = 0, v = 1; o < 9; o++, v++)
      (0 == o || 2 == o || 4 == o || 7 == o) &&
        1 == i[o] &&
        ((i[v] = 10 + parseInt(i[v])), (i[o] = 0));
    value = "";
    for (var o = 0; o < 9; o++)
      0 != (value = 0 == o || 2 == o || 4 == o || 7 == o ? 10 * i[o] : i[o]) &&
        (t += e[value] + " "),
        ((1 == o && 0 != value) || (0 == o && 0 != value && 0 == i[o + 1])) &&
          (t += "Crores "),
        ((3 == o && 0 != value) || (2 == o && 0 != value && 0 == i[o + 1])) &&
          (t += "Lakhs "),
        ((5 == o && 0 != value) || (4 == o && 0 != value && 0 == i[o + 1])) &&
          (t += "Thousand "),
        6 == o && 0 != value && 0 != i[o + 1] && 0 != i[o + 2]
          ? (t += "Hundred and ")
          : 6 == o && 0 != value && (t += "Hundred ");
    t = t.split("  ").join(" ");
  }
  return t;
}

/* Visible JS */
!(function (t) {
  var i = t(window);
  t.fn.visible = function (t, e, o) {
    if (!(this.length < 1)) {
      var r = this.length > 1 ? this.eq(0) : this,
        n = r.get(0),
        f = i.width(),
        h = i.height(),
        o = o ? o : "both",
        l = e === !0 ? n.offsetWidth * n.offsetHeight : !0;
      if ("function" == typeof n.getBoundingClientRect) {
        var g = n.getBoundingClientRect(),
          u = g.top >= 0 && g.top < h,
          s = g.bottom > 0 && g.bottom <= h,
          c = g.left >= 0 && g.left < f,
          a = g.right > 0 && g.right <= f,
          v = t ? u || s : u && s,
          b = t ? c || a : c && a;
        if ("both" === o) return l && v && b;
        if ("vertical" === o) return l && v;
        if ("horizontal" === o) return l && b;
      } else {
        var d = i.scrollTop(),
          p = d + h,
          w = i.scrollLeft(),
          m = w + f,
          y = r.offset(),
          z = y.top,
          B = z + r.height(),
          C = y.left,
          R = C + r.width(),
          j = t === !0 ? B : z,
          q = t === !0 ? z : B,
          H = t === !0 ? R : C,
          L = t === !0 ? C : R;
        if ("both" === o) return !!l && p >= q && j >= d && m >= L && H >= w;
        if ("vertical" === o) return !!l && p >= q && j >= d;
        if ("horizontal" === o) return !!l && m >= L && H >= w;
      }
    }
  };
})(jQuery);
