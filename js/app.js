(() => {
  "use strict";
  function e(e) {
    this.type = e;
  }
  (e.prototype.init = function () {
    const e = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let e = 0; e < this.nodes.length; e++) {
      const t = this.nodes[e],
        s = t.dataset.da.trim().split(","),
        i = {};
      (i.element = t),
        (i.parent = t.parentNode),
        (i.destination = document.querySelector(s[0].trim())),
        (i.breakpoint = s[1] ? s[1].trim() : "767"),
        (i.place = s[2] ? s[2].trim() : "last"),
        (i.index = this.indexInParent(i.parent, i.element)),
        this.оbjects.push(i);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (e) {
          return (
            "(" + this.type + "-width: " + e.breakpoint + "px)," + e.breakpoint
          );
        },
        this,
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (e, t, s) {
          return Array.prototype.indexOf.call(s, e) === t;
        },
      ));
    for (let t = 0; t < this.mediaQueries.length; t++) {
      const s = this.mediaQueries[t],
        i = String.prototype.split.call(s, ","),
        a = window.matchMedia(i[0]),
        r = i[1],
        n = Array.prototype.filter.call(this.оbjects, function (e) {
          return e.breakpoint === r;
        });
      a.addListener(function () {
        e.mediaHandler(a, n);
      }),
        this.mediaHandler(a, n);
    }
  }),
    (e.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const s = t[e];
          (s.index = this.indexInParent(s.parent, s.element)),
            this.moveTo(s.place, s.element, s.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const s = t[e];
          s.element.classList.contains(this.daClassname) &&
            this.moveBack(s.parent, s.element, s.index);
        }
    }),
    (e.prototype.moveTo = function (e, t, s) {
      t.classList.add(this.daClassname),
        "last" === e || e >= s.children.length
          ? s.insertAdjacentElement("beforeend", t)
          : "first" !== e
            ? s.children[e].insertAdjacentElement("beforebegin", t)
            : s.insertAdjacentElement("afterbegin", t);
    }),
    (e.prototype.moveBack = function (e, t, s) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[s]
          ? e.children[s].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (e.prototype.indexInParent = function (e, t) {
      const s = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(s, t);
    }),
    (e.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                  ? -1
                  : "last" === e.place || "first" === t.place
                    ? 1
                    : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                  ? 1
                  : "last" === e.place || "first" === t.place
                    ? -1
                    : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new e("max").init();
  let t = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        t.Android() || t.BlackBerry() || t.iOS() || t.Opera() || t.Windows()
      );
    },
  };
  let s = !0,
    i = (e = 500) => {
      let t = document.querySelector("body");
      if (s) {
        let i = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < i.length; e++) {
            i[e].style.paddingRight = "0px";
          }
          (t.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (s = !1),
          setTimeout(function () {
            s = !0;
          }, e);
      }
    },
    a = (e = 500) => {
      let t = document.querySelector("body");
      if (s) {
        let i = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < i.length; e++) {
          i[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (t.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (s = !1),
          setTimeout(function () {
            s = !0;
          }, e);
      }
    };
  function r(e) {
    return (
      null !== e &&
      "object" == typeof e &&
      "constructor" in e &&
      e.constructor === Object
    );
  }
  function n(e, t) {
    void 0 === e && (e = {}),
      void 0 === t && (t = {}),
      Object.keys(t).forEach((s) => {
        void 0 === e[s]
          ? (e[s] = t[s])
          : r(t[s]) && r(e[s]) && Object.keys(t[s]).length > 0 && n(e[s], t[s]);
      });
  }
  const l = {
    body: {},
    addEventListener() {},
    removeEventListener() {},
    activeElement: { blur() {}, nodeName: "" },
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    createEvent: () => ({ initEvent() {} }),
    createElement: () => ({
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName: () => [],
    }),
    createElementNS: () => ({}),
    importNode: () => null,
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
  };
  function o() {
    const e = "undefined" != typeof document ? document : {};
    return n(e, l), e;
  }
  const d = {
    document: l,
    navigator: { userAgent: "" },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: "",
    },
    history: { replaceState() {}, pushState() {}, go() {}, back() {} },
    CustomEvent: function () {
      return this;
    },
    addEventListener() {},
    removeEventListener() {},
    getComputedStyle: () => ({ getPropertyValue: () => "" }),
    Image() {},
    Date() {},
    screen: {},
    setTimeout() {},
    clearTimeout() {},
    matchMedia: () => ({}),
    requestAnimationFrame: (e) =>
      "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
    cancelAnimationFrame(e) {
      "undefined" != typeof setTimeout && clearTimeout(e);
    },
  };
  function c() {
    const e = "undefined" != typeof window ? window : {};
    return n(e, d), e;
  }
  function p(e, t) {
    return void 0 === t && (t = 0), setTimeout(e, t);
  }
  function u() {
    return Date.now();
  }
  function m(e, t) {
    void 0 === t && (t = "x");
    const s = c();
    let i, a, r;
    const n = (function (e) {
      const t = c();
      let s;
      return (
        t.getComputedStyle && (s = t.getComputedStyle(e, null)),
        !s && e.currentStyle && (s = e.currentStyle),
        s || (s = e.style),
        s
      );
    })(e);
    return (
      s.WebKitCSSMatrix
        ? ((a = n.transform || n.webkitTransform),
          a.split(",").length > 6 &&
            (a = a
              .split(", ")
              .map((e) => e.replace(",", "."))
              .join(", ")),
          (r = new s.WebKitCSSMatrix("none" === a ? "" : a)))
        : ((r =
            n.MozTransform ||
            n.OTransform ||
            n.MsTransform ||
            n.msTransform ||
            n.transform ||
            n
              .getPropertyValue("transform")
              .replace("translate(", "matrix(1, 0, 0, 1,")),
          (i = r.toString().split(","))),
      "x" === t &&
        (a = s.WebKitCSSMatrix
          ? r.m41
          : 16 === i.length
            ? parseFloat(i[12])
            : parseFloat(i[4])),
      "y" === t &&
        (a = s.WebKitCSSMatrix
          ? r.m42
          : 16 === i.length
            ? parseFloat(i[13])
            : parseFloat(i[5])),
      a || 0
    );
  }
  function f(e) {
    return (
      "object" == typeof e &&
      null !== e &&
      e.constructor &&
      "Object" === Object.prototype.toString.call(e).slice(8, -1)
    );
  }
  function h() {
    const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
      t = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < arguments.length; i += 1) {
      const a = i < 0 || arguments.length <= i ? void 0 : arguments[i];
      if (
        null != a &&
        ((s = a),
        !("undefined" != typeof window && void 0 !== window.HTMLElement
          ? s instanceof HTMLElement
          : s && (1 === s.nodeType || 11 === s.nodeType)))
      ) {
        const s = Object.keys(Object(a)).filter((e) => t.indexOf(e) < 0);
        for (let t = 0, i = s.length; t < i; t += 1) {
          const i = s[t],
            r = Object.getOwnPropertyDescriptor(a, i);
          void 0 !== r &&
            r.enumerable &&
            (f(e[i]) && f(a[i])
              ? a[i].__swiper__
                ? (e[i] = a[i])
                : h(e[i], a[i])
              : !f(e[i]) && f(a[i])
                ? ((e[i] = {}), a[i].__swiper__ ? (e[i] = a[i]) : h(e[i], a[i]))
                : (e[i] = a[i]));
        }
      }
    }
    var s;
    return e;
  }
  function g(e, t, s) {
    e.style.setProperty(t, s);
  }
  function v(e) {
    let { swiper: t, targetPosition: s, side: i } = e;
    const a = c(),
      r = -t.translate;
    let n,
      l = null;
    const o = t.params.speed;
    (t.wrapperEl.style.scrollSnapType = "none"),
      a.cancelAnimationFrame(t.cssModeFrameID);
    const d = s > r ? "next" : "prev",
      p = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
      u = () => {
        (n = new Date().getTime()), null === l && (l = n);
        const e = Math.max(Math.min((n - l) / o, 1), 0),
          d = 0.5 - Math.cos(e * Math.PI) / 2;
        let c = r + d * (s - r);
        if ((p(c, s) && (c = s), t.wrapperEl.scrollTo({ [i]: c }), p(c, s)))
          return (
            (t.wrapperEl.style.overflow = "hidden"),
            (t.wrapperEl.style.scrollSnapType = ""),
            setTimeout(() => {
              (t.wrapperEl.style.overflow = ""),
                t.wrapperEl.scrollTo({ [i]: c });
            }),
            void a.cancelAnimationFrame(t.cssModeFrameID)
          );
        t.cssModeFrameID = a.requestAnimationFrame(u);
      };
    u();
  }
  function w(e) {
    return (
      e.querySelector(".swiper-slide-transform") ||
      (e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform")) ||
      e
    );
  }
  function y(e, t) {
    return (
      void 0 === t && (t = ""), [...e.children].filter((e) => e.matches(t))
    );
  }
  function b(e) {
    try {
      return void console.warn(e);
    } catch (e) {}
  }
  function S(e, t) {
    void 0 === t && (t = []);
    const s = document.createElement(e);
    return (
      s.classList.add(
        ...(Array.isArray(t)
          ? t
          : (function (e) {
              return (
                void 0 === e && (e = ""),
                e
                  .trim()
                  .split(" ")
                  .filter((e) => !!e.trim())
              );
            })(t)),
      ),
      s
    );
  }
  function T(e, t) {
    return c().getComputedStyle(e, null).getPropertyValue(t);
  }
  function E(e) {
    let t,
      s = e;
    if (s) {
      for (t = 0; null !== (s = s.previousSibling); )
        1 === s.nodeType && (t += 1);
      return t;
    }
  }
  function x(e, t) {
    const s = [];
    let i = e.parentElement;
    for (; i; )
      t ? i.matches(t) && s.push(i) : s.push(i), (i = i.parentElement);
    return s;
  }
  function C(e, t, s) {
    const i = c();
    return s
      ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue("width" === t ? "margin-right" : "margin-top"),
          ) +
          parseFloat(
            i
              .getComputedStyle(e, null)
              .getPropertyValue(
                "width" === t ? "margin-left" : "margin-bottom",
              ),
          )
      : e.offsetWidth;
  }
  function L(e) {
    return (Array.isArray(e) ? e : [e]).filter((e) => !!e);
  }
  let M, _, P;
  function A() {
    return (
      M ||
        (M = (function () {
          const e = c(),
            t = o();
          return {
            smoothScroll:
              t.documentElement &&
              t.documentElement.style &&
              "scrollBehavior" in t.documentElement.style,
            touch: !!(
              "ontouchstart" in e ||
              (e.DocumentTouch && t instanceof e.DocumentTouch)
            ),
          };
        })()),
      M
    );
  }
  function k(e) {
    return (
      void 0 === e && (e = {}),
      _ ||
        (_ = (function (e) {
          let { userAgent: t } = void 0 === e ? {} : e;
          const s = A(),
            i = c(),
            a = i.navigator.platform,
            r = t || i.navigator.userAgent,
            n = { ios: !1, android: !1 },
            l = i.screen.width,
            o = i.screen.height,
            d = r.match(/(Android);?[\s\/]+([\d.]+)?/);
          let p = r.match(/(iPad).*OS\s([\d_]+)/);
          const u = r.match(/(iPod)(.*OS\s([\d_]+))?/),
            m = !p && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
            f = "Win32" === a;
          let h = "MacIntel" === a;
          return (
            !p &&
              h &&
              s.touch &&
              [
                "1024x1366",
                "1366x1024",
                "834x1194",
                "1194x834",
                "834x1112",
                "1112x834",
                "768x1024",
                "1024x768",
                "820x1180",
                "1180x820",
                "810x1080",
                "1080x810",
              ].indexOf(`${l}x${o}`) >= 0 &&
              ((p = r.match(/(Version)\/([\d.]+)/)),
              p || (p = [0, 1, "13_0_0"]),
              (h = !1)),
            d && !f && ((n.os = "android"), (n.android = !0)),
            (p || m || u) && ((n.os = "ios"), (n.ios = !0)),
            n
          );
        })(e)),
      _
    );
  }
  function I() {
    return (
      P ||
        (P = (function () {
          const e = c(),
            t = k();
          let s = !1;
          function i() {
            const t = e.navigator.userAgent.toLowerCase();
            return (
              t.indexOf("safari") >= 0 &&
              t.indexOf("chrome") < 0 &&
              t.indexOf("android") < 0
            );
          }
          if (i()) {
            const t = String(e.navigator.userAgent);
            if (t.includes("Version/")) {
              const [e, i] = t
                .split("Version/")[1]
                .split(" ")[0]
                .split(".")
                .map((e) => Number(e));
              s = e < 16 || (16 === e && i < 2);
            }
          }
          const a = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
              e.navigator.userAgent,
            ),
            r = i();
          return {
            isSafari: s || r,
            needPerspectiveFix: s,
            need3dFix: r || (a && t.ios),
            isWebView: a,
          };
        })()),
      P
    );
  }
  var O = {
    on(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      const a = s ? "unshift" : "push";
      return (
        e.split(" ").forEach((e) => {
          i.eventsListeners[e] || (i.eventsListeners[e] = []),
            i.eventsListeners[e][a](t);
        }),
        i
      );
    },
    once(e, t, s) {
      const i = this;
      if (!i.eventsListeners || i.destroyed) return i;
      if ("function" != typeof t) return i;
      function a() {
        i.off(e, a), a.__emitterProxy && delete a.__emitterProxy;
        for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++)
          r[n] = arguments[n];
        t.apply(i, r);
      }
      return (a.__emitterProxy = t), i.on(e, a, s);
    },
    onAny(e, t) {
      const s = this;
      if (!s.eventsListeners || s.destroyed) return s;
      if ("function" != typeof e) return s;
      const i = t ? "unshift" : "push";
      return (
        s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
      );
    },
    offAny(e) {
      const t = this;
      if (!t.eventsListeners || t.destroyed) return t;
      if (!t.eventsAnyListeners) return t;
      const s = t.eventsAnyListeners.indexOf(e);
      return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
    },
    off(e, t) {
      const s = this;
      return !s.eventsListeners || s.destroyed
        ? s
        : s.eventsListeners
          ? (e.split(" ").forEach((e) => {
              void 0 === t
                ? (s.eventsListeners[e] = [])
                : s.eventsListeners[e] &&
                  s.eventsListeners[e].forEach((i, a) => {
                    (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                      s.eventsListeners[e].splice(a, 1);
                  });
            }),
            s)
          : s;
    },
    emit() {
      const e = this;
      if (!e.eventsListeners || e.destroyed) return e;
      if (!e.eventsListeners) return e;
      let t, s, i;
      for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
        r[n] = arguments[n];
      "string" == typeof r[0] || Array.isArray(r[0])
        ? ((t = r[0]), (s = r.slice(1, r.length)), (i = e))
        : ((t = r[0].events), (s = r[0].data), (i = r[0].context || e)),
        s.unshift(i);
      return (
        (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
          e.eventsAnyListeners &&
            e.eventsAnyListeners.length &&
            e.eventsAnyListeners.forEach((e) => {
              e.apply(i, [t, ...s]);
            }),
            e.eventsListeners &&
              e.eventsListeners[t] &&
              e.eventsListeners[t].forEach((e) => {
                e.apply(i, s);
              });
        }),
        e
      );
    },
  };
  const z = (e, t) => {
      if (!e || e.destroyed || !e.params) return;
      const s = t.closest(
        e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
      );
      if (s) {
        let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
        !t &&
          e.isElement &&
          (s.shadowRoot
            ? (t = s.shadowRoot.querySelector(
                `.${e.params.lazyPreloaderClass}`,
              ))
            : requestAnimationFrame(() => {
                s.shadowRoot &&
                  ((t = s.shadowRoot.querySelector(
                    `.${e.params.lazyPreloaderClass}`,
                  )),
                  t && t.remove());
              })),
          t && t.remove();
      }
    },
    D = (e, t) => {
      if (!e.slides[t]) return;
      const s = e.slides[t].querySelector('[loading="lazy"]');
      s && s.removeAttribute("loading");
    },
    G = (e) => {
      if (!e || e.destroyed || !e.params) return;
      let t = e.params.lazyPreloadPrevNext;
      const s = e.slides.length;
      if (!s || !t || t < 0) return;
      t = Math.min(t, s);
      const i =
          "auto" === e.params.slidesPerView
            ? e.slidesPerViewDynamic()
            : Math.ceil(e.params.slidesPerView),
        a = e.activeIndex;
      if (e.params.grid && e.params.grid.rows > 1) {
        const s = a,
          r = [s - t];
        return (
          r.push(...Array.from({ length: t }).map((e, t) => s + i + t)),
          void e.slides.forEach((t, s) => {
            r.includes(t.column) && D(e, s);
          })
        );
      }
      const r = a + i - 1;
      if (e.params.rewind || e.params.loop)
        for (let i = a - t; i <= r + t; i += 1) {
          const t = ((i % s) + s) % s;
          (t < a || t > r) && D(e, t);
        }
      else
        for (let i = Math.max(a - t, 0); i <= Math.min(r + t, s - 1); i += 1)
          i !== a && (i > r || i < a) && D(e, i);
    };
  var B = {
    updateSize: function () {
      const e = this;
      let t, s;
      const i = e.el;
      (t =
        void 0 !== e.params.width && null !== e.params.width
          ? e.params.width
          : i.clientWidth),
        (s =
          void 0 !== e.params.height && null !== e.params.height
            ? e.params.height
            : i.clientHeight),
        (0 === t && e.isHorizontal()) ||
          (0 === s && e.isVertical()) ||
          ((t =
            t -
            parseInt(T(i, "padding-left") || 0, 10) -
            parseInt(T(i, "padding-right") || 0, 10)),
          (s =
            s -
            parseInt(T(i, "padding-top") || 0, 10) -
            parseInt(T(i, "padding-bottom") || 0, 10)),
          Number.isNaN(t) && (t = 0),
          Number.isNaN(s) && (s = 0),
          Object.assign(e, {
            width: t,
            height: s,
            size: e.isHorizontal() ? t : s,
          }));
    },
    updateSlides: function () {
      const e = this;
      function t(t, s) {
        return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0);
      }
      const s = e.params,
        {
          wrapperEl: i,
          slidesEl: a,
          size: r,
          rtlTranslate: n,
          wrongRTL: l,
        } = e,
        o = e.virtual && s.virtual.enabled,
        d = o ? e.virtual.slides.length : e.slides.length,
        c = y(a, `.${e.params.slideClass}, swiper-slide`),
        p = o ? e.virtual.slides.length : c.length;
      let u = [];
      const m = [],
        f = [];
      let h = s.slidesOffsetBefore;
      "function" == typeof h && (h = s.slidesOffsetBefore.call(e));
      let v = s.slidesOffsetAfter;
      "function" == typeof v && (v = s.slidesOffsetAfter.call(e));
      const w = e.snapGrid.length,
        b = e.slidesGrid.length;
      let S = s.spaceBetween,
        E = -h,
        x = 0,
        L = 0;
      if (void 0 === r) return;
      "string" == typeof S && S.indexOf("%") >= 0
        ? (S = (parseFloat(S.replace("%", "")) / 100) * r)
        : "string" == typeof S && (S = parseFloat(S)),
        (e.virtualSize = -S),
        c.forEach((e) => {
          n ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
            (e.style.marginBottom = ""),
            (e.style.marginTop = "");
        }),
        s.centeredSlides &&
          s.cssMode &&
          (g(i, "--swiper-centered-offset-before", ""),
          g(i, "--swiper-centered-offset-after", ""));
      const M = s.grid && s.grid.rows > 1 && e.grid;
      let _;
      M ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
      const P =
        "auto" === s.slidesPerView &&
        s.breakpoints &&
        Object.keys(s.breakpoints).filter(
          (e) => void 0 !== s.breakpoints[e].slidesPerView,
        ).length > 0;
      for (let i = 0; i < p; i += 1) {
        let a;
        if (
          ((_ = 0),
          c[i] && (a = c[i]),
          M && e.grid.updateSlide(i, a, c),
          !c[i] || "none" !== T(a, "display"))
        ) {
          if ("auto" === s.slidesPerView) {
            P && (c[i].style[e.getDirectionLabel("width")] = "");
            const r = getComputedStyle(a),
              n = a.style.transform,
              l = a.style.webkitTransform;
            if (
              (n && (a.style.transform = "none"),
              l && (a.style.webkitTransform = "none"),
              s.roundLengths)
            )
              _ = e.isHorizontal() ? C(a, "width", !0) : C(a, "height", !0);
            else {
              const e = t(r, "width"),
                s = t(r, "padding-left"),
                i = t(r, "padding-right"),
                n = t(r, "margin-left"),
                l = t(r, "margin-right"),
                o = r.getPropertyValue("box-sizing");
              if (o && "border-box" === o) _ = e + n + l;
              else {
                const { clientWidth: t, offsetWidth: r } = a;
                _ = e + s + i + n + l + (r - t);
              }
            }
            n && (a.style.transform = n),
              l && (a.style.webkitTransform = l),
              s.roundLengths && (_ = Math.floor(_));
          } else
            (_ = (r - (s.slidesPerView - 1) * S) / s.slidesPerView),
              s.roundLengths && (_ = Math.floor(_)),
              c[i] && (c[i].style[e.getDirectionLabel("width")] = `${_}px`);
          c[i] && (c[i].swiperSlideSize = _),
            f.push(_),
            s.centeredSlides
              ? ((E = E + _ / 2 + x / 2 + S),
                0 === x && 0 !== i && (E = E - r / 2 - S),
                0 === i && (E = E - r / 2 - S),
                Math.abs(E) < 0.001 && (E = 0),
                s.roundLengths && (E = Math.floor(E)),
                L % s.slidesPerGroup == 0 && u.push(E),
                m.push(E))
              : (s.roundLengths && (E = Math.floor(E)),
                (L - Math.min(e.params.slidesPerGroupSkip, L)) %
                  e.params.slidesPerGroup ==
                  0 && u.push(E),
                m.push(E),
                (E = E + _ + S)),
            (e.virtualSize += _ + S),
            (x = _),
            (L += 1);
        }
      }
      if (
        ((e.virtualSize = Math.max(e.virtualSize, r) + v),
        n &&
          l &&
          ("slide" === s.effect || "coverflow" === s.effect) &&
          (i.style.width = `${e.virtualSize + S}px`),
        s.setWrapperSize &&
          (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + S}px`),
        M && e.grid.updateWrapperSize(_, u),
        !s.centeredSlides)
      ) {
        const t = [];
        for (let i = 0; i < u.length; i += 1) {
          let a = u[i];
          s.roundLengths && (a = Math.floor(a)),
            u[i] <= e.virtualSize - r && t.push(a);
        }
        (u = t),
          Math.floor(e.virtualSize - r) - Math.floor(u[u.length - 1]) > 1 &&
            u.push(e.virtualSize - r);
      }
      if (o && s.loop) {
        const t = f[0] + S;
        if (s.slidesPerGroup > 1) {
          const i = Math.ceil(
              (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                s.slidesPerGroup,
            ),
            a = t * s.slidesPerGroup;
          for (let e = 0; e < i; e += 1) u.push(u[u.length - 1] + a);
        }
        for (
          let i = 0;
          i < e.virtual.slidesBefore + e.virtual.slidesAfter;
          i += 1
        )
          1 === s.slidesPerGroup && u.push(u[u.length - 1] + t),
            m.push(m[m.length - 1] + t),
            (e.virtualSize += t);
      }
      if ((0 === u.length && (u = [0]), 0 !== S)) {
        const t =
          e.isHorizontal() && n
            ? "marginLeft"
            : e.getDirectionLabel("marginRight");
        c.filter(
          (e, t) => !(s.cssMode && !s.loop) || t !== c.length - 1,
        ).forEach((e) => {
          e.style[t] = `${S}px`;
        });
      }
      if (s.centeredSlides && s.centeredSlidesBounds) {
        let e = 0;
        f.forEach((t) => {
          e += t + (S || 0);
        }),
          (e -= S);
        const t = e - r;
        u = u.map((e) => (e <= 0 ? -h : e > t ? t + v : e));
      }
      if (s.centerInsufficientSlides) {
        let e = 0;
        if (
          (f.forEach((t) => {
            e += t + (S || 0);
          }),
          (e -= S),
          e < r)
        ) {
          const t = (r - e) / 2;
          u.forEach((e, s) => {
            u[s] = e - t;
          }),
            m.forEach((e, s) => {
              m[s] = e + t;
            });
        }
      }
      if (
        (Object.assign(e, {
          slides: c,
          snapGrid: u,
          slidesGrid: m,
          slidesSizesGrid: f,
        }),
        s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
      ) {
        g(i, "--swiper-centered-offset-before", -u[0] + "px"),
          g(
            i,
            "--swiper-centered-offset-after",
            e.size / 2 - f[f.length - 1] / 2 + "px",
          );
        const t = -e.snapGrid[0],
          s = -e.slidesGrid[0];
        (e.snapGrid = e.snapGrid.map((e) => e + t)),
          (e.slidesGrid = e.slidesGrid.map((e) => e + s));
      }
      if (
        (p !== d && e.emit("slidesLengthChange"),
        u.length !== w &&
          (e.params.watchOverflow && e.checkOverflow(),
          e.emit("snapGridLengthChange")),
        m.length !== b && e.emit("slidesGridLengthChange"),
        s.watchSlidesProgress && e.updateSlidesOffset(),
        e.emit("slidesUpdated"),
        !(o || s.cssMode || ("slide" !== s.effect && "fade" !== s.effect)))
      ) {
        const t = `${s.containerModifierClass}backface-hidden`,
          i = e.el.classList.contains(t);
        p <= s.maxBackfaceHiddenSlides
          ? i || e.el.classList.add(t)
          : i && e.el.classList.remove(t);
      }
    },
    updateAutoHeight: function (e) {
      const t = this,
        s = [],
        i = t.virtual && t.params.virtual.enabled;
      let a,
        r = 0;
      "number" == typeof e
        ? t.setTransition(e)
        : !0 === e && t.setTransition(t.params.speed);
      const n = (e) => (i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
      if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
        if (t.params.centeredSlides)
          (t.visibleSlides || []).forEach((e) => {
            s.push(e);
          });
        else
          for (a = 0; a < Math.ceil(t.params.slidesPerView); a += 1) {
            const e = t.activeIndex + a;
            if (e > t.slides.length && !i) break;
            s.push(n(e));
          }
      else s.push(n(t.activeIndex));
      for (a = 0; a < s.length; a += 1)
        if (void 0 !== s[a]) {
          const e = s[a].offsetHeight;
          r = e > r ? e : r;
        }
      (r || 0 === r) && (t.wrapperEl.style.height = `${r}px`);
    },
    updateSlidesOffset: function () {
      const e = this,
        t = e.slides,
        s = e.isElement
          ? e.isHorizontal()
            ? e.wrapperEl.offsetLeft
            : e.wrapperEl.offsetTop
          : 0;
      for (let i = 0; i < t.length; i += 1)
        t[i].swiperSlideOffset =
          (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
          s -
          e.cssOverflowAdjustment();
    },
    updateSlidesProgress: function (e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this,
        s = t.params,
        { slides: i, rtlTranslate: a, snapGrid: r } = t;
      if (0 === i.length) return;
      void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
      let n = -e;
      a && (n = e),
        i.forEach((e) => {
          e.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass);
        }),
        (t.visibleSlidesIndexes = []),
        (t.visibleSlides = []);
      let l = s.spaceBetween;
      "string" == typeof l && l.indexOf("%") >= 0
        ? (l = (parseFloat(l.replace("%", "")) / 100) * t.size)
        : "string" == typeof l && (l = parseFloat(l));
      for (let e = 0; e < i.length; e += 1) {
        const o = i[e];
        let d = o.swiperSlideOffset;
        s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset);
        const c =
            (n + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (o.swiperSlideSize + l),
          p =
            (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) /
            (o.swiperSlideSize + l),
          u = -(n - d),
          m = u + t.slidesSizesGrid[e],
          f = u >= 0 && u <= t.size - t.slidesSizesGrid[e];
        ((u >= 0 && u < t.size - 1) ||
          (m > 1 && m <= t.size) ||
          (u <= 0 && m >= t.size)) &&
          (t.visibleSlides.push(o),
          t.visibleSlidesIndexes.push(e),
          i[e].classList.add(s.slideVisibleClass)),
          f && i[e].classList.add(s.slideFullyVisibleClass),
          (o.progress = a ? -c : c),
          (o.originalProgress = a ? -p : p);
      }
    },
    updateProgress: function (e) {
      const t = this;
      if (void 0 === e) {
        const s = t.rtlTranslate ? -1 : 1;
        e = (t && t.translate && t.translate * s) || 0;
      }
      const s = t.params,
        i = t.maxTranslate() - t.minTranslate();
      let { progress: a, isBeginning: r, isEnd: n, progressLoop: l } = t;
      const o = r,
        d = n;
      if (0 === i) (a = 0), (r = !0), (n = !0);
      else {
        a = (e - t.minTranslate()) / i;
        const s = Math.abs(e - t.minTranslate()) < 1,
          l = Math.abs(e - t.maxTranslate()) < 1;
        (r = s || a <= 0), (n = l || a >= 1), s && (a = 0), l && (a = 1);
      }
      if (s.loop) {
        const s = t.getSlideIndexByData(0),
          i = t.getSlideIndexByData(t.slides.length - 1),
          a = t.slidesGrid[s],
          r = t.slidesGrid[i],
          n = t.slidesGrid[t.slidesGrid.length - 1],
          o = Math.abs(e);
        (l = o >= a ? (o - a) / n : (o + n - r) / n), l > 1 && (l -= 1);
      }
      Object.assign(t, {
        progress: a,
        progressLoop: l,
        isBeginning: r,
        isEnd: n,
      }),
        (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
          t.updateSlidesProgress(e),
        r && !o && t.emit("reachBeginning toEdge"),
        n && !d && t.emit("reachEnd toEdge"),
        ((o && !r) || (d && !n)) && t.emit("fromEdge"),
        t.emit("progress", a);
    },
    updateSlidesClasses: function () {
      const e = this,
        { slides: t, params: s, slidesEl: i, activeIndex: a } = e,
        r = e.virtual && s.virtual.enabled,
        n = e.grid && s.grid && s.grid.rows > 1,
        l = (e) => y(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
      let o, d, c;
      if (
        (t.forEach((e) => {
          e.classList.remove(
            s.slideActiveClass,
            s.slideNextClass,
            s.slidePrevClass,
          );
        }),
        r)
      )
        if (s.loop) {
          let t = a - e.virtual.slidesBefore;
          t < 0 && (t = e.virtual.slides.length + t),
            t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
            (o = l(`[data-swiper-slide-index="${t}"]`));
        } else o = l(`[data-swiper-slide-index="${a}"]`);
      else
        n
          ? ((o = t.filter((e) => e.column === a)[0]),
            (c = t.filter((e) => e.column === a + 1)[0]),
            (d = t.filter((e) => e.column === a - 1)[0]))
          : (o = t[a]);
      o &&
        (o.classList.add(s.slideActiveClass),
        n
          ? (c && c.classList.add(s.slideNextClass),
            d && d.classList.add(s.slidePrevClass))
          : ((c = (function (e, t) {
              const s = [];
              for (; e.nextElementSibling; ) {
                const i = e.nextElementSibling;
                t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
              }
              return s;
            })(o, `.${s.slideClass}, swiper-slide`)[0]),
            s.loop && !c && (c = t[0]),
            c && c.classList.add(s.slideNextClass),
            (d = (function (e, t) {
              const s = [];
              for (; e.previousElementSibling; ) {
                const i = e.previousElementSibling;
                t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
              }
              return s;
            })(o, `.${s.slideClass}, swiper-slide`)[0]),
            s.loop && 0 === !d && (d = t[t.length - 1]),
            d && d.classList.add(s.slidePrevClass))),
        e.emitSlidesClasses();
    },
    updateActiveIndex: function (e) {
      const t = this,
        s = t.rtlTranslate ? t.translate : -t.translate,
        {
          snapGrid: i,
          params: a,
          activeIndex: r,
          realIndex: n,
          snapIndex: l,
        } = t;
      let o,
        d = e;
      const c = (e) => {
        let s = e - t.virtual.slidesBefore;
        return (
          s < 0 && (s = t.virtual.slides.length + s),
          s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
          s
        );
      };
      if (
        (void 0 === d &&
          (d = (function (e) {
            const { slidesGrid: t, params: s } = e,
              i = e.rtlTranslate ? e.translate : -e.translate;
            let a;
            for (let e = 0; e < t.length; e += 1)
              void 0 !== t[e + 1]
                ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2
                  ? (a = e)
                  : i >= t[e] && i < t[e + 1] && (a = e + 1)
                : i >= t[e] && (a = e);
            return (
              s.normalizeSlideIndex && (a < 0 || void 0 === a) && (a = 0), a
            );
          })(t)),
        i.indexOf(s) >= 0)
      )
        o = i.indexOf(s);
      else {
        const e = Math.min(a.slidesPerGroupSkip, d);
        o = e + Math.floor((d - e) / a.slidesPerGroup);
      }
      if ((o >= i.length && (o = i.length - 1), d === r && !t.params.loop))
        return void (o !== l && ((t.snapIndex = o), t.emit("snapIndexChange")));
      if (d === r && t.params.loop && t.virtual && t.params.virtual.enabled)
        return void (t.realIndex = c(d));
      const p = t.grid && a.grid && a.grid.rows > 1;
      let u;
      if (t.virtual && a.virtual.enabled && a.loop) u = c(d);
      else if (p) {
        const e = t.slides.filter((e) => e.column === d)[0];
        let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
        Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
          (u = Math.floor(s / a.grid.rows));
      } else if (t.slides[d]) {
        const e = t.slides[d].getAttribute("data-swiper-slide-index");
        u = e ? parseInt(e, 10) : d;
      } else u = d;
      Object.assign(t, {
        previousSnapIndex: l,
        snapIndex: o,
        previousRealIndex: n,
        realIndex: u,
        previousIndex: r,
        activeIndex: d,
      }),
        t.initialized && G(t),
        t.emit("activeIndexChange"),
        t.emit("snapIndexChange"),
        (t.initialized || t.params.runCallbacksOnInit) &&
          (n !== u && t.emit("realIndexChange"), t.emit("slideChange"));
    },
    updateClickedSlide: function (e, t) {
      const s = this,
        i = s.params;
      let a = e.closest(`.${i.slideClass}, swiper-slide`);
      !a &&
        s.isElement &&
        t &&
        t.length > 1 &&
        t.includes(e) &&
        [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
          !a &&
            e.matches &&
            e.matches(`.${i.slideClass}, swiper-slide`) &&
            (a = e);
        });
      let r,
        n = !1;
      if (a)
        for (let e = 0; e < s.slides.length; e += 1)
          if (s.slides[e] === a) {
            (n = !0), (r = e);
            break;
          }
      if (!a || !n)
        return (s.clickedSlide = void 0), void (s.clickedIndex = void 0);
      (s.clickedSlide = a),
        s.virtual && s.params.virtual.enabled
          ? (s.clickedIndex = parseInt(
              a.getAttribute("data-swiper-slide-index"),
              10,
            ))
          : (s.clickedIndex = r),
        i.slideToClickedSlide &&
          void 0 !== s.clickedIndex &&
          s.clickedIndex !== s.activeIndex &&
          s.slideToClickedSlide();
    },
  };
  var $ = {
    getTranslate: function (e) {
      void 0 === e && (e = this.isHorizontal() ? "x" : "y");
      const { params: t, rtlTranslate: s, translate: i, wrapperEl: a } = this;
      if (t.virtualTranslate) return s ? -i : i;
      if (t.cssMode) return i;
      let r = m(a, e);
      return (r += this.cssOverflowAdjustment()), s && (r = -r), r || 0;
    },
    setTranslate: function (e, t) {
      const s = this,
        { rtlTranslate: i, params: a, wrapperEl: r, progress: n } = s;
      let l,
        o = 0,
        d = 0;
      s.isHorizontal() ? (o = i ? -e : e) : (d = e),
        a.roundLengths && ((o = Math.floor(o)), (d = Math.floor(d))),
        (s.previousTranslate = s.translate),
        (s.translate = s.isHorizontal() ? o : d),
        a.cssMode
          ? (r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal()
              ? -o
              : -d)
          : a.virtualTranslate ||
            (s.isHorizontal()
              ? (o -= s.cssOverflowAdjustment())
              : (d -= s.cssOverflowAdjustment()),
            (r.style.transform = `translate3d(${o}px, ${d}px, 0px)`));
      const c = s.maxTranslate() - s.minTranslate();
      (l = 0 === c ? 0 : (e - s.minTranslate()) / c),
        l !== n && s.updateProgress(e),
        s.emit("setTranslate", s.translate, t);
    },
    minTranslate: function () {
      return -this.snapGrid[0];
    },
    maxTranslate: function () {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
    translateTo: function (e, t, s, i, a) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        void 0 === i && (i = !0);
      const r = this,
        { params: n, wrapperEl: l } = r;
      if (r.animating && n.preventInteractionOnTransition) return !1;
      const o = r.minTranslate(),
        d = r.maxTranslate();
      let c;
      if (
        ((c = i && e > o ? o : i && e < d ? d : e),
        r.updateProgress(c),
        n.cssMode)
      ) {
        const e = r.isHorizontal();
        if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
        else {
          if (!r.support.smoothScroll)
            return (
              v({ swiper: r, targetPosition: -c, side: e ? "left" : "top" }), !0
            );
          l.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
        }
        return !0;
      }
      return (
        0 === t
          ? (r.setTransition(0),
            r.setTranslate(c),
            s &&
              (r.emit("beforeTransitionStart", t, a), r.emit("transitionEnd")))
          : (r.setTransition(t),
            r.setTranslate(c),
            s &&
              (r.emit("beforeTransitionStart", t, a),
              r.emit("transitionStart")),
            r.animating ||
              ((r.animating = !0),
              r.onTranslateToWrapperTransitionEnd ||
                (r.onTranslateToWrapperTransitionEnd = function (e) {
                  r &&
                    !r.destroyed &&
                    e.target === this &&
                    (r.wrapperEl.removeEventListener(
                      "transitionend",
                      r.onTranslateToWrapperTransitionEnd,
                    ),
                    (r.onTranslateToWrapperTransitionEnd = null),
                    delete r.onTranslateToWrapperTransitionEnd,
                    s && r.emit("transitionEnd"));
                }),
              r.wrapperEl.addEventListener(
                "transitionend",
                r.onTranslateToWrapperTransitionEnd,
              ))),
        !0
      );
    },
  };
  function q(e) {
    let { swiper: t, runCallbacks: s, direction: i, step: a } = e;
    const { activeIndex: r, previousIndex: n } = t;
    let l = i;
    if (
      (l || (l = r > n ? "next" : r < n ? "prev" : "reset"),
      t.emit(`transition${a}`),
      s && r !== n)
    ) {
      if ("reset" === l) return void t.emit(`slideResetTransition${a}`);
      t.emit(`slideChangeTransition${a}`),
        "next" === l
          ? t.emit(`slideNextTransition${a}`)
          : t.emit(`slidePrevTransition${a}`);
    }
  }
  var F = {
    slideTo: function (e, t, s, i, a) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e && (e = parseInt(e, 10));
      const r = this;
      let n = e;
      n < 0 && (n = 0);
      const {
        params: l,
        snapGrid: o,
        slidesGrid: d,
        previousIndex: c,
        activeIndex: p,
        rtlTranslate: u,
        wrapperEl: m,
        enabled: f,
      } = r;
      if (
        (r.animating && l.preventInteractionOnTransition) ||
        (!f && !i && !a) ||
        r.destroyed
      )
        return !1;
      const h = Math.min(r.params.slidesPerGroupSkip, n);
      let g = h + Math.floor((n - h) / r.params.slidesPerGroup);
      g >= o.length && (g = o.length - 1);
      const w = -o[g];
      if (l.normalizeSlideIndex)
        for (let e = 0; e < d.length; e += 1) {
          const t = -Math.floor(100 * w),
            s = Math.floor(100 * d[e]),
            i = Math.floor(100 * d[e + 1]);
          void 0 !== d[e + 1]
            ? t >= s && t < i - (i - s) / 2
              ? (n = e)
              : t >= s && t < i && (n = e + 1)
            : t >= s && (n = e);
        }
      if (r.initialized && n !== p) {
        if (
          !r.allowSlideNext &&
          (u
            ? w > r.translate && w > r.minTranslate()
            : w < r.translate && w < r.minTranslate())
        )
          return !1;
        if (
          !r.allowSlidePrev &&
          w > r.translate &&
          w > r.maxTranslate() &&
          (p || 0) !== n
        )
          return !1;
      }
      let y;
      if (
        (n !== (c || 0) && s && r.emit("beforeSlideChangeStart"),
        r.updateProgress(w),
        (y = n > p ? "next" : n < p ? "prev" : "reset"),
        (u && -w === r.translate) || (!u && w === r.translate))
      )
        return (
          r.updateActiveIndex(n),
          l.autoHeight && r.updateAutoHeight(),
          r.updateSlidesClasses(),
          "slide" !== l.effect && r.setTranslate(w),
          "reset" !== y && (r.transitionStart(s, y), r.transitionEnd(s, y)),
          !1
        );
      if (l.cssMode) {
        const e = r.isHorizontal(),
          s = u ? w : -w;
        if (0 === t) {
          const t = r.virtual && r.params.virtual.enabled;
          t &&
            ((r.wrapperEl.style.scrollSnapType = "none"),
            (r._immediateVirtual = !0)),
            t && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
              ? ((r._cssModeVirtualInitialSet = !0),
                requestAnimationFrame(() => {
                  m[e ? "scrollLeft" : "scrollTop"] = s;
                }))
              : (m[e ? "scrollLeft" : "scrollTop"] = s),
            t &&
              requestAnimationFrame(() => {
                (r.wrapperEl.style.scrollSnapType = ""),
                  (r._immediateVirtual = !1);
              });
        } else {
          if (!r.support.smoothScroll)
            return (
              v({ swiper: r, targetPosition: s, side: e ? "left" : "top" }), !0
            );
          m.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
        }
        return !0;
      }
      return (
        r.setTransition(t),
        r.setTranslate(w),
        r.updateActiveIndex(n),
        r.updateSlidesClasses(),
        r.emit("beforeTransitionStart", t, i),
        r.transitionStart(s, y),
        0 === t
          ? r.transitionEnd(s, y)
          : r.animating ||
            ((r.animating = !0),
            r.onSlideToWrapperTransitionEnd ||
              (r.onSlideToWrapperTransitionEnd = function (e) {
                r &&
                  !r.destroyed &&
                  e.target === this &&
                  (r.wrapperEl.removeEventListener(
                    "transitionend",
                    r.onSlideToWrapperTransitionEnd,
                  ),
                  (r.onSlideToWrapperTransitionEnd = null),
                  delete r.onSlideToWrapperTransitionEnd,
                  r.transitionEnd(s, y));
              }),
            r.wrapperEl.addEventListener(
              "transitionend",
              r.onSlideToWrapperTransitionEnd,
            )),
        !0
      );
    },
    slideToLoop: function (e, t, s, i) {
      if (
        (void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === s && (s = !0),
        "string" == typeof e)
      ) {
        e = parseInt(e, 10);
      }
      const a = this;
      if (a.destroyed) return;
      const r = a.grid && a.params.grid && a.params.grid.rows > 1;
      let n = e;
      if (a.params.loop)
        if (a.virtual && a.params.virtual.enabled) n += a.virtual.slidesBefore;
        else {
          let e;
          if (r) {
            const t = n * a.params.grid.rows;
            e = a.slides.filter(
              (e) => 1 * e.getAttribute("data-swiper-slide-index") === t,
            )[0].column;
          } else e = a.getSlideIndexByData(n);
          const t = r
              ? Math.ceil(a.slides.length / a.params.grid.rows)
              : a.slides.length,
            { centeredSlides: s } = a.params;
          let i = a.params.slidesPerView;
          "auto" === i
            ? (i = a.slidesPerViewDynamic())
            : ((i = Math.ceil(parseFloat(a.params.slidesPerView, 10))),
              s && i % 2 == 0 && (i += 1));
          let l = t - e < i;
          if ((s && (l = l || e < Math.ceil(i / 2)), l)) {
            const i = s
              ? e < a.activeIndex
                ? "prev"
                : "next"
              : e - a.activeIndex - 1 < a.params.slidesPerView
                ? "next"
                : "prev";
            a.loopFix({
              direction: i,
              slideTo: !0,
              activeSlideIndex: "next" === i ? e + 1 : e - t + 1,
              slideRealIndex: "next" === i ? a.realIndex : void 0,
            });
          }
          if (r) {
            const e = n * a.params.grid.rows;
            n = a.slides.filter(
              (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
            )[0].column;
          } else n = a.getSlideIndexByData(n);
        }
      return (
        requestAnimationFrame(() => {
          a.slideTo(n, t, s, i);
        }),
        a
      );
    },
    slideNext: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        { enabled: a, params: r, animating: n } = i;
      if (!a || i.destroyed) return i;
      let l = r.slidesPerGroup;
      "auto" === r.slidesPerView &&
        1 === r.slidesPerGroup &&
        r.slidesPerGroupAuto &&
        (l = Math.max(i.slidesPerViewDynamic("current", !0), 1));
      const o = i.activeIndex < r.slidesPerGroupSkip ? 1 : l,
        d = i.virtual && r.virtual.enabled;
      if (r.loop) {
        if (n && !d && r.loopPreventsSliding) return !1;
        if (
          (i.loopFix({ direction: "next" }),
          (i._clientLeft = i.wrapperEl.clientLeft),
          i.activeIndex === i.slides.length - 1 && r.cssMode)
        )
          return (
            requestAnimationFrame(() => {
              i.slideTo(i.activeIndex + o, e, t, s);
            }),
            !0
          );
      }
      return r.rewind && i.isEnd
        ? i.slideTo(0, e, t, s)
        : i.slideTo(i.activeIndex + o, e, t, s);
    },
    slidePrev: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this,
        {
          params: a,
          snapGrid: r,
          slidesGrid: n,
          rtlTranslate: l,
          enabled: o,
          animating: d,
        } = i;
      if (!o || i.destroyed) return i;
      const c = i.virtual && a.virtual.enabled;
      if (a.loop) {
        if (d && !c && a.loopPreventsSliding) return !1;
        i.loopFix({ direction: "prev" }),
          (i._clientLeft = i.wrapperEl.clientLeft);
      }
      function p(e) {
        return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
      }
      const u = p(l ? i.translate : -i.translate),
        m = r.map((e) => p(e));
      let f = r[m.indexOf(u) - 1];
      if (void 0 === f && a.cssMode) {
        let e;
        r.forEach((t, s) => {
          u >= t && (e = s);
        }),
          void 0 !== e && (f = r[e > 0 ? e - 1 : e]);
      }
      let h = 0;
      if (
        (void 0 !== f &&
          ((h = n.indexOf(f)),
          h < 0 && (h = i.activeIndex - 1),
          "auto" === a.slidesPerView &&
            1 === a.slidesPerGroup &&
            a.slidesPerGroupAuto &&
            ((h = h - i.slidesPerViewDynamic("previous", !0) + 1),
            (h = Math.max(h, 0)))),
        a.rewind && i.isBeginning)
      ) {
        const a =
          i.params.virtual && i.params.virtual.enabled && i.virtual
            ? i.virtual.slides.length - 1
            : i.slides.length - 1;
        return i.slideTo(a, e, t, s);
      }
      return a.loop && 0 === i.activeIndex && a.cssMode
        ? (requestAnimationFrame(() => {
            i.slideTo(h, e, t, s);
          }),
          !0)
        : i.slideTo(h, e, t, s);
    },
    slideReset: function (e, t, s) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this;
      if (!i.destroyed) return i.slideTo(i.activeIndex, e, t, s);
    },
    slideToClosest: function (e, t, s, i) {
      void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        void 0 === i && (i = 0.5);
      const a = this;
      if (a.destroyed) return;
      let r = a.activeIndex;
      const n = Math.min(a.params.slidesPerGroupSkip, r),
        l = n + Math.floor((r - n) / a.params.slidesPerGroup),
        o = a.rtlTranslate ? a.translate : -a.translate;
      if (o >= a.snapGrid[l]) {
        const e = a.snapGrid[l];
        o - e > (a.snapGrid[l + 1] - e) * i && (r += a.params.slidesPerGroup);
      } else {
        const e = a.snapGrid[l - 1];
        o - e <= (a.snapGrid[l] - e) * i && (r -= a.params.slidesPerGroup);
      }
      return (
        (r = Math.max(r, 0)),
        (r = Math.min(r, a.slidesGrid.length - 1)),
        a.slideTo(r, e, t, s)
      );
    },
    slideToClickedSlide: function () {
      const e = this;
      if (e.destroyed) return;
      const { params: t, slidesEl: s } = e,
        i =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
      let a,
        r = e.clickedIndex;
      const n = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
      if (t.loop) {
        if (e.animating) return;
        (a = parseInt(
          e.clickedSlide.getAttribute("data-swiper-slide-index"),
          10,
        )),
          t.centeredSlides
            ? r < e.loopedSlides - i / 2 ||
              r > e.slides.length - e.loopedSlides + i / 2
              ? (e.loopFix(),
                (r = e.getSlideIndex(
                  y(s, `${n}[data-swiper-slide-index="${a}"]`)[0],
                )),
                p(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r)
            : r > e.slides.length - i
              ? (e.loopFix(),
                (r = e.getSlideIndex(
                  y(s, `${n}[data-swiper-slide-index="${a}"]`)[0],
                )),
                p(() => {
                  e.slideTo(r);
                }))
              : e.slideTo(r);
      } else e.slideTo(r);
    },
  };
  var N = {
    loopCreate: function (e) {
      const t = this,
        { params: s, slidesEl: i } = t;
      if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
      const a = () => {
          y(i, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
            e.setAttribute("data-swiper-slide-index", t);
          });
        },
        r = t.grid && s.grid && s.grid.rows > 1,
        n = s.slidesPerGroup * (r ? s.grid.rows : 1),
        l = t.slides.length % n != 0,
        o = r && t.slides.length % s.grid.rows != 0,
        d = (e) => {
          for (let i = 0; i < e; i += 1) {
            const e = t.isElement
              ? S("swiper-slide", [s.slideBlankClass])
              : S("div", [s.slideClass, s.slideBlankClass]);
            t.slidesEl.append(e);
          }
        };
      if (l) {
        if (s.loopAddBlankSlides) {
          d(n - (t.slides.length % n)), t.recalcSlides(), t.updateSlides();
        } else
          b(
            "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
          );
        a();
      } else if (o) {
        if (s.loopAddBlankSlides) {
          d(s.grid.rows - (t.slides.length % s.grid.rows)),
            t.recalcSlides(),
            t.updateSlides();
        } else
          b(
            "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
          );
        a();
      } else a();
      t.loopFix({
        slideRealIndex: e,
        direction: s.centeredSlides ? void 0 : "next",
      });
    },
    loopFix: function (e) {
      let {
        slideRealIndex: t,
        slideTo: s = !0,
        direction: i,
        setTranslate: a,
        activeSlideIndex: r,
        byController: n,
        byMousewheel: l,
      } = void 0 === e ? {} : e;
      const o = this;
      if (!o.params.loop) return;
      o.emit("beforeLoopFix");
      const {
          slides: d,
          allowSlidePrev: c,
          allowSlideNext: p,
          slidesEl: u,
          params: m,
        } = o,
        { centeredSlides: f } = m;
      if (
        ((o.allowSlidePrev = !0),
        (o.allowSlideNext = !0),
        o.virtual && m.virtual.enabled)
      )
        return (
          s &&
            (m.centeredSlides || 0 !== o.snapIndex
              ? m.centeredSlides && o.snapIndex < m.slidesPerView
                ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0)
                : o.snapIndex === o.snapGrid.length - 1 &&
                  o.slideTo(o.virtual.slidesBefore, 0, !1, !0)
              : o.slideTo(o.virtual.slides.length, 0, !1, !0)),
          (o.allowSlidePrev = c),
          (o.allowSlideNext = p),
          void o.emit("loopFix")
        );
      let h = m.slidesPerView;
      "auto" === h
        ? (h = o.slidesPerViewDynamic())
        : ((h = Math.ceil(parseFloat(m.slidesPerView, 10))),
          f && h % 2 == 0 && (h += 1));
      const g = m.slidesPerGroupAuto ? h : m.slidesPerGroup;
      let v = g;
      v % g != 0 && (v += g - (v % g)),
        (v += m.loopAdditionalSlides),
        (o.loopedSlides = v);
      const w = o.grid && m.grid && m.grid.rows > 1;
      d.length < h + v
        ? b(
            "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters",
          )
        : w &&
          "row" === m.grid.fill &&
          b(
            "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`",
          );
      const y = [],
        S = [];
      let T = o.activeIndex;
      void 0 === r
        ? (r = o.getSlideIndex(
            d.filter((e) => e.classList.contains(m.slideActiveClass))[0],
          ))
        : (T = r);
      const E = "next" === i || !i,
        x = "prev" === i || !i;
      let C = 0,
        L = 0;
      const M = w ? Math.ceil(d.length / m.grid.rows) : d.length,
        _ = (w ? d[r].column : r) + (f && void 0 === a ? -h / 2 + 0.5 : 0);
      if (_ < v) {
        C = Math.max(v - _, g);
        for (let e = 0; e < v - _; e += 1) {
          const t = e - Math.floor(e / M) * M;
          if (w) {
            const e = M - t - 1;
            for (let t = d.length - 1; t >= 0; t -= 1)
              d[t].column === e && y.push(t);
          } else y.push(M - t - 1);
        }
      } else if (_ + h > M - v) {
        L = Math.max(_ - (M - 2 * v), g);
        for (let e = 0; e < L; e += 1) {
          const t = e - Math.floor(e / M) * M;
          w
            ? d.forEach((e, s) => {
                e.column === t && S.push(s);
              })
            : S.push(t);
        }
      }
      if (
        ((o.__preventObserver__ = !0),
        requestAnimationFrame(() => {
          o.__preventObserver__ = !1;
        }),
        x &&
          y.forEach((e) => {
            (d[e].swiperLoopMoveDOM = !0),
              u.prepend(d[e]),
              (d[e].swiperLoopMoveDOM = !1);
          }),
        E &&
          S.forEach((e) => {
            (d[e].swiperLoopMoveDOM = !0),
              u.append(d[e]),
              (d[e].swiperLoopMoveDOM = !1);
          }),
        o.recalcSlides(),
        "auto" === m.slidesPerView
          ? o.updateSlides()
          : w &&
            ((y.length > 0 && x) || (S.length > 0 && E)) &&
            o.slides.forEach((e, t) => {
              o.grid.updateSlide(t, e, o.slides);
            }),
        m.watchSlidesProgress && o.updateSlidesOffset(),
        s)
      )
        if (y.length > 0 && x) {
          if (void 0 === t) {
            const e = o.slidesGrid[T],
              t = o.slidesGrid[T + C] - e;
            l
              ? o.setTranslate(o.translate - t)
              : (o.slideTo(T + Math.ceil(C), 0, !1, !0),
                a &&
                  ((o.touchEventsData.startTranslate =
                    o.touchEventsData.startTranslate - t),
                  (o.touchEventsData.currentTranslate =
                    o.touchEventsData.currentTranslate - t)));
          } else if (a) {
            const e = w ? y.length / m.grid.rows : y.length;
            o.slideTo(o.activeIndex + e, 0, !1, !0),
              (o.touchEventsData.currentTranslate = o.translate);
          }
        } else if (S.length > 0 && E)
          if (void 0 === t) {
            const e = o.slidesGrid[T],
              t = o.slidesGrid[T - L] - e;
            l
              ? o.setTranslate(o.translate - t)
              : (o.slideTo(T - L, 0, !1, !0),
                a &&
                  ((o.touchEventsData.startTranslate =
                    o.touchEventsData.startTranslate - t),
                  (o.touchEventsData.currentTranslate =
                    o.touchEventsData.currentTranslate - t)));
          } else {
            const e = w ? S.length / m.grid.rows : S.length;
            o.slideTo(o.activeIndex - e, 0, !1, !0);
          }
      if (
        ((o.allowSlidePrev = c),
        (o.allowSlideNext = p),
        o.controller && o.controller.control && !n)
      ) {
        const e = {
          slideRealIndex: t,
          direction: i,
          setTranslate: a,
          activeSlideIndex: r,
          byController: !0,
        };
        Array.isArray(o.controller.control)
          ? o.controller.control.forEach((t) => {
              !t.destroyed &&
                t.params.loop &&
                t.loopFix({
                  ...e,
                  slideTo: t.params.slidesPerView === m.slidesPerView && s,
                });
            })
          : o.controller.control instanceof o.constructor &&
            o.controller.control.params.loop &&
            o.controller.control.loopFix({
              ...e,
              slideTo:
                o.controller.control.params.slidesPerView === m.slidesPerView &&
                s,
            });
      }
      o.emit("loopFix");
    },
    loopDestroy: function () {
      const e = this,
        { params: t, slidesEl: s } = e;
      if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
      e.recalcSlides();
      const i = [];
      e.slides.forEach((e) => {
        const t =
          void 0 === e.swiperSlideIndex
            ? 1 * e.getAttribute("data-swiper-slide-index")
            : e.swiperSlideIndex;
        i[t] = e;
      }),
        e.slides.forEach((e) => {
          e.removeAttribute("data-swiper-slide-index");
        }),
        i.forEach((e) => {
          s.append(e);
        }),
        e.recalcSlides(),
        e.slideTo(e.realIndex, 0);
    },
  };
  function V(e, t, s) {
    const i = c(),
      { params: a } = e,
      r = a.edgeSwipeDetection,
      n = a.edgeSwipeThreshold;
    return (
      !r ||
      !(s <= n || s >= i.innerWidth - n) ||
      ("prevent" === r && (t.preventDefault(), !0))
    );
  }
  function H(e) {
    const t = this,
      s = o();
    let i = e;
    i.originalEvent && (i = i.originalEvent);
    const a = t.touchEventsData;
    if ("pointerdown" === i.type) {
      if (null !== a.pointerId && a.pointerId !== i.pointerId) return;
      a.pointerId = i.pointerId;
    } else
      "touchstart" === i.type &&
        1 === i.targetTouches.length &&
        (a.touchId = i.targetTouches[0].identifier);
    if ("touchstart" === i.type) return void V(t, i, i.targetTouches[0].pageX);
    const { params: r, touches: n, enabled: l } = t;
    if (!l) return;
    if (!r.simulateTouch && "mouse" === i.pointerType) return;
    if (t.animating && r.preventInteractionOnTransition) return;
    !t.animating && r.cssMode && r.loop && t.loopFix();
    let d = i.target;
    if ("wrapper" === r.touchEventsTarget && !t.wrapperEl.contains(d)) return;
    if ("which" in i && 3 === i.which) return;
    if ("button" in i && i.button > 0) return;
    if (a.isTouched && a.isMoved) return;
    const p = !!r.noSwipingClass && "" !== r.noSwipingClass,
      m = i.composedPath ? i.composedPath() : i.path;
    p && i.target && i.target.shadowRoot && m && (d = m[0]);
    const f = r.noSwipingSelector
        ? r.noSwipingSelector
        : `.${r.noSwipingClass}`,
      h = !(!i.target || !i.target.shadowRoot);
    if (
      r.noSwiping &&
      (h
        ? (function (e, t) {
            return (
              void 0 === t && (t = this),
              (function t(s) {
                if (!s || s === o() || s === c()) return null;
                s.assignedSlot && (s = s.assignedSlot);
                const i = s.closest(e);
                return i || s.getRootNode ? i || t(s.getRootNode().host) : null;
              })(t)
            );
          })(f, d)
        : d.closest(f))
    )
      return void (t.allowClick = !0);
    if (r.swipeHandler && !d.closest(r.swipeHandler)) return;
    (n.currentX = i.pageX), (n.currentY = i.pageY);
    const g = n.currentX,
      v = n.currentY;
    if (!V(t, i, g)) return;
    Object.assign(a, {
      isTouched: !0,
      isMoved: !1,
      allowTouchCallbacks: !0,
      isScrolling: void 0,
      startMoving: void 0,
    }),
      (n.startX = g),
      (n.startY = v),
      (a.touchStartTime = u()),
      (t.allowClick = !0),
      t.updateSize(),
      (t.swipeDirection = void 0),
      r.threshold > 0 && (a.allowThresholdMove = !1);
    let w = !0;
    d.matches(a.focusableElements) &&
      ((w = !1), "SELECT" === d.nodeName && (a.isTouched = !1)),
      s.activeElement &&
        s.activeElement.matches(a.focusableElements) &&
        s.activeElement !== d &&
        s.activeElement.blur();
    const y = w && t.allowTouchMove && r.touchStartPreventDefault;
    (!r.touchStartForcePreventDefault && !y) ||
      d.isContentEditable ||
      i.preventDefault(),
      r.freeMode &&
        r.freeMode.enabled &&
        t.freeMode &&
        t.animating &&
        !r.cssMode &&
        t.freeMode.onTouchStart(),
      t.emit("touchStart", i);
  }
  function j(e) {
    const t = o(),
      s = this,
      i = s.touchEventsData,
      { params: a, touches: r, rtlTranslate: n, enabled: l } = s;
    if (!l) return;
    if (!a.simulateTouch && "mouse" === e.pointerType) return;
    let d,
      c = e;
    if ((c.originalEvent && (c = c.originalEvent), "pointermove" === c.type)) {
      if (null !== i.touchId) return;
      if (c.pointerId !== i.pointerId) return;
    }
    if ("touchmove" === c.type) {
      if (
        ((d = [...c.changedTouches].filter(
          (e) => e.identifier === i.touchId,
        )[0]),
        !d || d.identifier !== i.touchId)
      )
        return;
    } else d = c;
    if (!i.isTouched)
      return void (
        i.startMoving &&
        i.isScrolling &&
        s.emit("touchMoveOpposite", c)
      );
    const p = d.pageX,
      m = d.pageY;
    if (c.preventedByNestedSwiper) return (r.startX = p), void (r.startY = m);
    if (!s.allowTouchMove)
      return (
        c.target.matches(i.focusableElements) || (s.allowClick = !1),
        void (
          i.isTouched &&
          (Object.assign(r, { startX: p, startY: m, currentX: p, currentY: m }),
          (i.touchStartTime = u()))
        )
      );
    if (a.touchReleaseOnEdges && !a.loop)
      if (s.isVertical()) {
        if (
          (m < r.startY && s.translate <= s.maxTranslate()) ||
          (m > r.startY && s.translate >= s.minTranslate())
        )
          return (i.isTouched = !1), void (i.isMoved = !1);
      } else if (
        (p < r.startX && s.translate <= s.maxTranslate()) ||
        (p > r.startX && s.translate >= s.minTranslate())
      )
        return;
    if (
      t.activeElement &&
      c.target === t.activeElement &&
      c.target.matches(i.focusableElements)
    )
      return (i.isMoved = !0), void (s.allowClick = !1);
    i.allowTouchCallbacks && s.emit("touchMove", c),
      (r.previousX = r.currentX),
      (r.previousY = r.currentY),
      (r.currentX = p),
      (r.currentY = m);
    const f = r.currentX - r.startX,
      h = r.currentY - r.startY;
    if (s.params.threshold && Math.sqrt(f ** 2 + h ** 2) < s.params.threshold)
      return;
    if (void 0 === i.isScrolling) {
      let e;
      (s.isHorizontal() && r.currentY === r.startY) ||
      (s.isVertical() && r.currentX === r.startX)
        ? (i.isScrolling = !1)
        : f * f + h * h >= 25 &&
          ((e = (180 * Math.atan2(Math.abs(h), Math.abs(f))) / Math.PI),
          (i.isScrolling = s.isHorizontal()
            ? e > a.touchAngle
            : 90 - e > a.touchAngle));
    }
    if (
      (i.isScrolling && s.emit("touchMoveOpposite", c),
      void 0 === i.startMoving &&
        ((r.currentX === r.startX && r.currentY === r.startY) ||
          (i.startMoving = !0)),
      i.isScrolling)
    )
      return void (i.isTouched = !1);
    if (!i.startMoving) return;
    (s.allowClick = !1),
      !a.cssMode && c.cancelable && c.preventDefault(),
      a.touchMoveStopPropagation && !a.nested && c.stopPropagation();
    let g = s.isHorizontal() ? f : h,
      v = s.isHorizontal()
        ? r.currentX - r.previousX
        : r.currentY - r.previousY;
    a.oneWayMovement &&
      ((g = Math.abs(g) * (n ? 1 : -1)), (v = Math.abs(v) * (n ? 1 : -1))),
      (r.diff = g),
      (g *= a.touchRatio),
      n && ((g = -g), (v = -v));
    const w = s.touchesDirection;
    (s.swipeDirection = g > 0 ? "prev" : "next"),
      (s.touchesDirection = v > 0 ? "prev" : "next");
    const y = s.params.loop && !a.cssMode,
      b =
        ("next" === s.touchesDirection && s.allowSlideNext) ||
        ("prev" === s.touchesDirection && s.allowSlidePrev);
    if (!i.isMoved) {
      if (
        (y && b && s.loopFix({ direction: s.swipeDirection }),
        (i.startTranslate = s.getTranslate()),
        s.setTransition(0),
        s.animating)
      ) {
        const e = new window.CustomEvent("transitionend", {
          bubbles: !0,
          cancelable: !0,
        });
        s.wrapperEl.dispatchEvent(e);
      }
      (i.allowMomentumBounce = !1),
        !a.grabCursor ||
          (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
          s.setGrabCursor(!0),
        s.emit("sliderFirstMove", c);
    }
    if (
      (new Date().getTime(),
      i.isMoved &&
        i.allowThresholdMove &&
        w !== s.touchesDirection &&
        y &&
        b &&
        Math.abs(g) >= 1)
    )
      return (
        Object.assign(r, {
          startX: p,
          startY: m,
          currentX: p,
          currentY: m,
          startTranslate: i.currentTranslate,
        }),
        (i.loopSwapReset = !0),
        void (i.startTranslate = i.currentTranslate)
      );
    s.emit("sliderMove", c),
      (i.isMoved = !0),
      (i.currentTranslate = g + i.startTranslate);
    let S = !0,
      T = a.resistanceRatio;
    if (
      (a.touchReleaseOnEdges && (T = 0),
      g > 0
        ? (y &&
            b &&
            i.allowThresholdMove &&
            i.currentTranslate >
              (a.centeredSlides
                ? s.minTranslate() - s.slidesSizesGrid[s.activeIndex + 1]
                : s.minTranslate()) &&
            s.loopFix({
              direction: "prev",
              setTranslate: !0,
              activeSlideIndex: 0,
            }),
          i.currentTranslate > s.minTranslate() &&
            ((S = !1),
            a.resistance &&
              (i.currentTranslate =
                s.minTranslate() -
                1 +
                (-s.minTranslate() + i.startTranslate + g) ** T)))
        : g < 0 &&
          (y &&
            b &&
            i.allowThresholdMove &&
            i.currentTranslate <
              (a.centeredSlides
                ? s.maxTranslate() +
                  s.slidesSizesGrid[s.slidesSizesGrid.length - 1]
                : s.maxTranslate()) &&
            s.loopFix({
              direction: "next",
              setTranslate: !0,
              activeSlideIndex:
                s.slides.length -
                ("auto" === a.slidesPerView
                  ? s.slidesPerViewDynamic()
                  : Math.ceil(parseFloat(a.slidesPerView, 10))),
            }),
          i.currentTranslate < s.maxTranslate() &&
            ((S = !1),
            a.resistance &&
              (i.currentTranslate =
                s.maxTranslate() +
                1 -
                (s.maxTranslate() - i.startTranslate - g) ** T))),
      S && (c.preventedByNestedSwiper = !0),
      !s.allowSlideNext &&
        "next" === s.swipeDirection &&
        i.currentTranslate < i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      !s.allowSlidePrev &&
        "prev" === s.swipeDirection &&
        i.currentTranslate > i.startTranslate &&
        (i.currentTranslate = i.startTranslate),
      s.allowSlidePrev ||
        s.allowSlideNext ||
        (i.currentTranslate = i.startTranslate),
      a.threshold > 0)
    ) {
      if (!(Math.abs(g) > a.threshold || i.allowThresholdMove))
        return void (i.currentTranslate = i.startTranslate);
      if (!i.allowThresholdMove)
        return (
          (i.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (i.currentTranslate = i.startTranslate),
          void (r.diff = s.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY)
        );
    }
    a.followFinger &&
      !a.cssMode &&
      (((a.freeMode && a.freeMode.enabled && s.freeMode) ||
        a.watchSlidesProgress) &&
        (s.updateActiveIndex(), s.updateSlidesClasses()),
      a.freeMode &&
        a.freeMode.enabled &&
        s.freeMode &&
        s.freeMode.onTouchMove(),
      s.updateProgress(i.currentTranslate),
      s.setTranslate(i.currentTranslate));
  }
  function R(e) {
    const t = this,
      s = t.touchEventsData;
    let i,
      a = e;
    a.originalEvent && (a = a.originalEvent);
    if ("touchend" === a.type || "touchcancel" === a.type) {
      if (
        ((i = [...a.changedTouches].filter(
          (e) => e.identifier === s.touchId,
        )[0]),
        !i || i.identifier !== s.touchId)
      )
        return;
    } else {
      if (null !== s.touchId) return;
      if (a.pointerId !== s.pointerId) return;
      i = a;
    }
    if (
      ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
        a.type,
      )
    ) {
      if (
        !(
          ["pointercancel", "contextmenu"].includes(a.type) &&
          (t.browser.isSafari || t.browser.isWebView)
        )
      )
        return;
    }
    (s.pointerId = null), (s.touchId = null);
    const {
      params: r,
      touches: n,
      rtlTranslate: l,
      slidesGrid: o,
      enabled: d,
    } = t;
    if (!d) return;
    if (!r.simulateTouch && "mouse" === a.pointerType) return;
    if (
      (s.allowTouchCallbacks && t.emit("touchEnd", a),
      (s.allowTouchCallbacks = !1),
      !s.isTouched)
    )
      return (
        s.isMoved && r.grabCursor && t.setGrabCursor(!1),
        (s.isMoved = !1),
        void (s.startMoving = !1)
      );
    r.grabCursor &&
      s.isMoved &&
      s.isTouched &&
      (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
      t.setGrabCursor(!1);
    const c = u(),
      m = c - s.touchStartTime;
    if (t.allowClick) {
      const e = a.path || (a.composedPath && a.composedPath());
      t.updateClickedSlide((e && e[0]) || a.target, e),
        t.emit("tap click", a),
        m < 300 &&
          c - s.lastClickTime < 300 &&
          t.emit("doubleTap doubleClick", a);
    }
    if (
      ((s.lastClickTime = u()),
      p(() => {
        t.destroyed || (t.allowClick = !0);
      }),
      !s.isTouched ||
        !s.isMoved ||
        !t.swipeDirection ||
        (0 === n.diff && !s.loopSwapReset) ||
        (s.currentTranslate === s.startTranslate && !s.loopSwapReset))
    )
      return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
    let f;
    if (
      ((s.isTouched = !1),
      (s.isMoved = !1),
      (s.startMoving = !1),
      (f = r.followFinger
        ? l
          ? t.translate
          : -t.translate
        : -s.currentTranslate),
      r.cssMode)
    )
      return;
    if (r.freeMode && r.freeMode.enabled)
      return void t.freeMode.onTouchEnd({ currentPos: f });
    const h = f >= -t.maxTranslate() && !t.params.loop;
    let g = 0,
      v = t.slidesSizesGrid[0];
    for (
      let e = 0;
      e < o.length;
      e += e < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup
    ) {
      const t = e < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
      void 0 !== o[e + t]
        ? (h || (f >= o[e] && f < o[e + t])) && ((g = e), (v = o[e + t] - o[e]))
        : (h || f >= o[e]) &&
          ((g = e), (v = o[o.length - 1] - o[o.length - 2]));
    }
    let w = null,
      y = null;
    r.rewind &&
      (t.isBeginning
        ? (y =
            r.virtual && r.virtual.enabled && t.virtual
              ? t.virtual.slides.length - 1
              : t.slides.length - 1)
        : t.isEnd && (w = 0));
    const b = (f - o[g]) / v,
      S = g < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
    if (m > r.longSwipesMs) {
      if (!r.longSwipes) return void t.slideTo(t.activeIndex);
      "next" === t.swipeDirection &&
        (b >= r.longSwipesRatio
          ? t.slideTo(r.rewind && t.isEnd ? w : g + S)
          : t.slideTo(g)),
        "prev" === t.swipeDirection &&
          (b > 1 - r.longSwipesRatio
            ? t.slideTo(g + S)
            : null !== y && b < 0 && Math.abs(b) > r.longSwipesRatio
              ? t.slideTo(y)
              : t.slideTo(g));
    } else {
      if (!r.shortSwipes) return void t.slideTo(t.activeIndex);
      t.navigation &&
      (a.target === t.navigation.nextEl || a.target === t.navigation.prevEl)
        ? a.target === t.navigation.nextEl
          ? t.slideTo(g + S)
          : t.slideTo(g)
        : ("next" === t.swipeDirection && t.slideTo(null !== w ? w : g + S),
          "prev" === t.swipeDirection && t.slideTo(null !== y ? y : g));
    }
  }
  function W() {
    const e = this,
      { params: t, el: s } = e;
    if (s && 0 === s.offsetWidth) return;
    t.breakpoints && e.setBreakpoint();
    const { allowSlideNext: i, allowSlidePrev: a, snapGrid: r } = e,
      n = e.virtual && e.params.virtual.enabled;
    (e.allowSlideNext = !0),
      (e.allowSlidePrev = !0),
      e.updateSize(),
      e.updateSlides(),
      e.updateSlidesClasses();
    const l = n && t.loop;
    !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
    !e.isEnd ||
    e.isBeginning ||
    e.params.centeredSlides ||
    l
      ? e.params.loop && !n
        ? e.slideToLoop(e.realIndex, 0, !1, !0)
        : e.slideTo(e.activeIndex, 0, !1, !0)
      : e.slideTo(e.slides.length - 1, 0, !1, !0),
      e.autoplay &&
        e.autoplay.running &&
        e.autoplay.paused &&
        (clearTimeout(e.autoplay.resizeTimeout),
        (e.autoplay.resizeTimeout = setTimeout(() => {
          e.autoplay &&
            e.autoplay.running &&
            e.autoplay.paused &&
            e.autoplay.resume();
        }, 500))),
      (e.allowSlidePrev = a),
      (e.allowSlideNext = i),
      e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
  }
  function Y(e) {
    const t = this;
    t.enabled &&
      (t.allowClick ||
        (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation &&
          t.animating &&
          (e.stopPropagation(), e.stopImmediatePropagation())));
  }
  function X() {
    const e = this,
      { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
    if (!i) return;
    let a;
    (e.previousTranslate = e.translate),
      e.isHorizontal()
        ? (e.translate = -t.scrollLeft)
        : (e.translate = -t.scrollTop),
      0 === e.translate && (e.translate = 0),
      e.updateActiveIndex(),
      e.updateSlidesClasses();
    const r = e.maxTranslate() - e.minTranslate();
    (a = 0 === r ? 0 : (e.translate - e.minTranslate()) / r),
      a !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
      e.emit("setTranslate", e.translate, !1);
  }
  function U(e) {
    const t = this;
    z(t, e.target),
      t.params.cssMode ||
        ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
        t.update();
  }
  function Q() {
    const e = this;
    e.documentTouchHandlerProceeded ||
      ((e.documentTouchHandlerProceeded = !0),
      e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
  }
  const K = (e, t) => {
    const s = o(),
      { params: i, el: a, wrapperEl: r, device: n } = e,
      l = !!i.nested,
      d = "on" === t ? "addEventListener" : "removeEventListener",
      c = t;
    s[d]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: l }),
      a[d]("touchstart", e.onTouchStart, { passive: !1 }),
      a[d]("pointerdown", e.onTouchStart, { passive: !1 }),
      s[d]("touchmove", e.onTouchMove, { passive: !1, capture: l }),
      s[d]("pointermove", e.onTouchMove, { passive: !1, capture: l }),
      s[d]("touchend", e.onTouchEnd, { passive: !0 }),
      s[d]("pointerup", e.onTouchEnd, { passive: !0 }),
      s[d]("pointercancel", e.onTouchEnd, { passive: !0 }),
      s[d]("touchcancel", e.onTouchEnd, { passive: !0 }),
      s[d]("pointerout", e.onTouchEnd, { passive: !0 }),
      s[d]("pointerleave", e.onTouchEnd, { passive: !0 }),
      s[d]("contextmenu", e.onTouchEnd, { passive: !0 }),
      (i.preventClicks || i.preventClicksPropagation) &&
        a[d]("click", e.onClick, !0),
      i.cssMode && r[d]("scroll", e.onScroll),
      i.updateOnWindowResize
        ? e[c](
            n.ios || n.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
            W,
            !0,
          )
        : e[c]("observerUpdate", W, !0),
      a[d]("load", e.onLoad, { capture: !0 });
  };
  const J = (e, t) => e.grid && t.grid && t.grid.rows > 1;
  var Z = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    swiperElementNodeName: "SWIPER-CONTAINER",
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
  function ee(e, t) {
    return function (s) {
      void 0 === s && (s = {});
      const i = Object.keys(s)[0],
        a = s[i];
      "object" == typeof a && null !== a
        ? (!0 === e[i] && (e[i] = { enabled: !0 }),
          "navigation" === i &&
            e[i] &&
            e[i].enabled &&
            !e[i].prevEl &&
            !e[i].nextEl &&
            (e[i].auto = !0),
          ["pagination", "scrollbar"].indexOf(i) >= 0 &&
            e[i] &&
            e[i].enabled &&
            !e[i].el &&
            (e[i].auto = !0),
          i in e && "enabled" in a
            ? ("object" != typeof e[i] ||
                "enabled" in e[i] ||
                (e[i].enabled = !0),
              e[i] || (e[i] = { enabled: !1 }),
              h(t, s))
            : h(t, s))
        : h(t, s);
    };
  }
  const te = {
      eventsEmitter: O,
      update: B,
      translate: $,
      transition: {
        setTransition: function (e, t) {
          const s = this;
          s.params.cssMode ||
            ((s.wrapperEl.style.transitionDuration = `${e}ms`),
            (s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
            s.emit("setTransition", e, t);
        },
        transitionStart: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          i.cssMode ||
            (i.autoHeight && s.updateAutoHeight(),
            q({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
        },
        transitionEnd: function (e, t) {
          void 0 === e && (e = !0);
          const s = this,
            { params: i } = s;
          (s.animating = !1),
            i.cssMode ||
              (s.setTransition(0),
              q({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
        },
      },
      slide: F,
      loop: N,
      grabCursor: {
        setGrabCursor: function (e) {
          const t = this;
          if (
            !t.params.simulateTouch ||
            (t.params.watchOverflow && t.isLocked) ||
            t.params.cssMode
          )
            return;
          const s =
            "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
          t.isElement && (t.__preventObserver__ = !0),
            (s.style.cursor = "move"),
            (s.style.cursor = e ? "grabbing" : "grab"),
            t.isElement &&
              requestAnimationFrame(() => {
                t.__preventObserver__ = !1;
              });
        },
        unsetGrabCursor: function () {
          const e = this;
          (e.params.watchOverflow && e.isLocked) ||
            e.params.cssMode ||
            (e.isElement && (e.__preventObserver__ = !0),
            (e[
              "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
            ].style.cursor = ""),
            e.isElement &&
              requestAnimationFrame(() => {
                e.__preventObserver__ = !1;
              }));
        },
      },
      events: {
        attachEvents: function () {
          const e = this,
            { params: t } = e;
          (e.onTouchStart = H.bind(e)),
            (e.onTouchMove = j.bind(e)),
            (e.onTouchEnd = R.bind(e)),
            (e.onDocumentTouchStart = Q.bind(e)),
            t.cssMode && (e.onScroll = X.bind(e)),
            (e.onClick = Y.bind(e)),
            (e.onLoad = U.bind(e)),
            K(e, "on");
        },
        detachEvents: function () {
          K(this, "off");
        },
      },
      breakpoints: {
        setBreakpoint: function () {
          const e = this,
            { realIndex: t, initialized: s, params: i, el: a } = e,
            r = i.breakpoints;
          if (!r || (r && 0 === Object.keys(r).length)) return;
          const n = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
          if (!n || e.currentBreakpoint === n) return;
          const l = (n in r ? r[n] : void 0) || e.originalParams,
            o = J(e, i),
            d = J(e, l),
            c = i.enabled;
          o && !d
            ? (a.classList.remove(
                `${i.containerModifierClass}grid`,
                `${i.containerModifierClass}grid-column`,
              ),
              e.emitContainerClasses())
            : !o &&
              d &&
              (a.classList.add(`${i.containerModifierClass}grid`),
              ((l.grid.fill && "column" === l.grid.fill) ||
                (!l.grid.fill && "column" === i.grid.fill)) &&
                a.classList.add(`${i.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            ["navigation", "pagination", "scrollbar"].forEach((t) => {
              if (void 0 === l[t]) return;
              const s = i[t] && i[t].enabled,
                a = l[t] && l[t].enabled;
              s && !a && e[t].disable(), !s && a && e[t].enable();
            });
          const p = l.direction && l.direction !== i.direction,
            u = i.loop && (l.slidesPerView !== i.slidesPerView || p),
            m = i.loop;
          p && s && e.changeDirection(), h(e.params, l);
          const f = e.params.enabled,
            g = e.params.loop;
          Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            c && !f ? e.disable() : !c && f && e.enable(),
            (e.currentBreakpoint = n),
            e.emit("_beforeBreakpoint", l),
            s &&
              (u
                ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                : !m && g
                  ? (e.loopCreate(t), e.updateSlides())
                  : m && !g && e.loopDestroy()),
            e.emit("breakpoint", l);
        },
        getBreakpoint: function (e, t, s) {
          if ((void 0 === t && (t = "window"), !e || ("container" === t && !s)))
            return;
          let i = !1;
          const a = c(),
            r = "window" === t ? a.innerHeight : s.clientHeight,
            n = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: r * t, point: e };
              }
              return { value: e, point: e };
            });
          n.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
          for (let e = 0; e < n.length; e += 1) {
            const { point: r, value: l } = n[e];
            "window" === t
              ? a.matchMedia(`(min-width: ${l}px)`).matches && (i = r)
              : l <= s.clientWidth && (i = r);
          }
          return i || "max";
        },
      },
      checkOverflow: {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: i } = s;
          if (i) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
        },
      },
      classes: {
        addClasses: function () {
          const e = this,
            { classNames: t, params: s, rtl: i, el: a, device: r } = e,
            n = (function (e, t) {
              const s = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((i) => {
                        e[i] && s.push(t + i);
                      })
                    : "string" == typeof e && s.push(t + e);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "free-mode": e.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: i },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: r.android },
                { ios: r.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
                { "watch-progress": s.watchSlidesProgress },
              ],
              s.containerModifierClass,
            );
          t.push(...n), a.classList.add(...t), e.emitContainerClasses();
        },
        removeClasses: function () {
          const { el: e, classNames: t } = this;
          e.classList.remove(...t), this.emitContainerClasses();
        },
      },
    },
    se = {};
  class ie {
    constructor() {
      let e, t;
      for (var s = arguments.length, i = new Array(s), a = 0; a < s; a++)
        i[a] = arguments[a];
      1 === i.length &&
      i[0].constructor &&
      "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
        ? (t = i[0])
        : ([e, t] = i),
        t || (t = {}),
        (t = h({}, t)),
        e && !t.el && (t.el = e);
      const r = o();
      if (
        t.el &&
        "string" == typeof t.el &&
        r.querySelectorAll(t.el).length > 1
      ) {
        const e = [];
        return (
          r.querySelectorAll(t.el).forEach((s) => {
            const i = h({}, t, { el: s });
            e.push(new ie(i));
          }),
          e
        );
      }
      const n = this;
      (n.__swiper__ = !0),
        (n.support = A()),
        (n.device = k({ userAgent: t.userAgent })),
        (n.browser = I()),
        (n.eventsListeners = {}),
        (n.eventsAnyListeners = []),
        (n.modules = [...n.__modules__]),
        t.modules && Array.isArray(t.modules) && n.modules.push(...t.modules);
      const l = {};
      n.modules.forEach((e) => {
        e({
          params: t,
          swiper: n,
          extendParams: ee(t, l),
          on: n.on.bind(n),
          once: n.once.bind(n),
          off: n.off.bind(n),
          emit: n.emit.bind(n),
        });
      });
      const d = h({}, Z, l);
      return (
        (n.params = h({}, d, se, t)),
        (n.originalParams = h({}, n.params)),
        (n.passedParams = h({}, t)),
        n.params &&
          n.params.on &&
          Object.keys(n.params.on).forEach((e) => {
            n.on(e, n.params.on[e]);
          }),
        n.params && n.params.onAny && n.onAny(n.params.onAny),
        Object.assign(n, {
          enabled: n.params.enabled,
          el: e,
          classNames: [],
          slides: [],
          slidesGrid: [],
          snapGrid: [],
          slidesSizesGrid: [],
          isHorizontal: () => "horizontal" === n.params.direction,
          isVertical: () => "vertical" === n.params.direction,
          activeIndex: 0,
          realIndex: 0,
          isBeginning: !0,
          isEnd: !1,
          translate: 0,
          previousTranslate: 0,
          progress: 0,
          velocity: 0,
          animating: !1,
          cssOverflowAdjustment() {
            return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
          },
          allowSlideNext: n.params.allowSlideNext,
          allowSlidePrev: n.params.allowSlidePrev,
          touchEventsData: {
            isTouched: void 0,
            isMoved: void 0,
            allowTouchCallbacks: void 0,
            touchStartTime: void 0,
            isScrolling: void 0,
            currentTranslate: void 0,
            startTranslate: void 0,
            allowThresholdMove: void 0,
            focusableElements: n.params.focusableElements,
            lastClickTime: 0,
            clickTimeout: void 0,
            velocities: [],
            allowMomentumBounce: void 0,
            startMoving: void 0,
            pointerId: null,
            touchId: null,
          },
          allowClick: !0,
          allowTouchMove: n.params.allowTouchMove,
          touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
          imagesToLoad: [],
          imagesLoaded: 0,
        }),
        n.emit("_swiper"),
        n.params.init && n.init(),
        n
      );
    }
    getDirectionLabel(e) {
      return this.isHorizontal()
        ? e
        : {
            width: "height",
            "margin-top": "margin-left",
            "margin-bottom ": "margin-right",
            "margin-left": "margin-top",
            "margin-right": "margin-bottom",
            "padding-left": "padding-top",
            "padding-right": "padding-bottom",
            marginRight: "marginBottom",
          }[e];
    }
    getSlideIndex(e) {
      const { slidesEl: t, params: s } = this,
        i = E(y(t, `.${s.slideClass}, swiper-slide`)[0]);
      return E(e) - i;
    }
    getSlideIndexByData(e) {
      return this.getSlideIndex(
        this.slides.filter(
          (t) => 1 * t.getAttribute("data-swiper-slide-index") === e,
        )[0],
      );
    }
    recalcSlides() {
      const { slidesEl: e, params: t } = this;
      this.slides = y(e, `.${t.slideClass}, swiper-slide`);
    }
    enable() {
      const e = this;
      e.enabled ||
        ((e.enabled = !0),
        e.params.grabCursor && e.setGrabCursor(),
        e.emit("enable"));
    }
    disable() {
      const e = this;
      e.enabled &&
        ((e.enabled = !1),
        e.params.grabCursor && e.unsetGrabCursor(),
        e.emit("disable"));
    }
    setProgress(e, t) {
      const s = this;
      e = Math.min(Math.max(e, 0), 1);
      const i = s.minTranslate(),
        a = (s.maxTranslate() - i) * e + i;
      s.translateTo(a, void 0 === t ? 0 : t),
        s.updateActiveIndex(),
        s.updateSlidesClasses();
    }
    emitContainerClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = e.el.className
        .split(" ")
        .filter(
          (t) =>
            0 === t.indexOf("swiper") ||
            0 === t.indexOf(e.params.containerModifierClass),
        );
      e.emit("_containerClasses", t.join(" "));
    }
    getSlideClasses(e) {
      const t = this;
      return t.destroyed
        ? ""
        : e.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper-slide") ||
                0 === e.indexOf(t.params.slideClass),
            )
            .join(" ");
    }
    emitSlidesClasses() {
      const e = this;
      if (!e.params._emitClasses || !e.el) return;
      const t = [];
      e.slides.forEach((s) => {
        const i = e.getSlideClasses(s);
        t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
      }),
        e.emit("_slideClasses", t);
    }
    slidesPerViewDynamic(e, t) {
      void 0 === e && (e = "current"), void 0 === t && (t = !1);
      const {
        params: s,
        slides: i,
        slidesGrid: a,
        slidesSizesGrid: r,
        size: n,
        activeIndex: l,
      } = this;
      let o = 1;
      if ("number" == typeof s.slidesPerView) return s.slidesPerView;
      if (s.centeredSlides) {
        let e,
          t = i[l] ? Math.ceil(i[l].swiperSlideSize) : 0;
        for (let s = l + 1; s < i.length; s += 1)
          i[s] &&
            !e &&
            ((t += Math.ceil(i[s].swiperSlideSize)),
            (o += 1),
            t > n && (e = !0));
        for (let s = l - 1; s >= 0; s -= 1)
          i[s] &&
            !e &&
            ((t += i[s].swiperSlideSize), (o += 1), t > n && (e = !0));
      } else if ("current" === e)
        for (let e = l + 1; e < i.length; e += 1) {
          (t ? a[e] + r[e] - a[l] < n : a[e] - a[l] < n) && (o += 1);
        }
      else
        for (let e = l - 1; e >= 0; e -= 1) {
          a[l] - a[e] < n && (o += 1);
        }
      return o;
    }
    update() {
      const e = this;
      if (!e || e.destroyed) return;
      const { snapGrid: t, params: s } = e;
      function i() {
        const t = e.rtlTranslate ? -1 * e.translate : e.translate,
          s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
        e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
      }
      let a;
      if (
        (s.breakpoints && e.setBreakpoint(),
        [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
          t.complete && z(e, t);
        }),
        e.updateSize(),
        e.updateSlides(),
        e.updateProgress(),
        e.updateSlidesClasses(),
        s.freeMode && s.freeMode.enabled && !s.cssMode)
      )
        i(), s.autoHeight && e.updateAutoHeight();
      else {
        if (
          ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
          e.isEnd &&
          !s.centeredSlides
        ) {
          const t =
            e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
          a = e.slideTo(t.length - 1, 0, !1, !0);
        } else a = e.slideTo(e.activeIndex, 0, !1, !0);
        a || i();
      }
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
        e.emit("update");
    }
    changeDirection(e, t) {
      void 0 === t && (t = !0);
      const s = this,
        i = s.params.direction;
      return (
        e || (e = "horizontal" === i ? "vertical" : "horizontal"),
        e === i ||
          ("horizontal" !== e && "vertical" !== e) ||
          (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
          s.el.classList.add(`${s.params.containerModifierClass}${e}`),
          s.emitContainerClasses(),
          (s.params.direction = e),
          s.slides.forEach((t) => {
            "vertical" === e ? (t.style.width = "") : (t.style.height = "");
          }),
          s.emit("changeDirection"),
          t && s.update()),
        s
      );
    }
    changeLanguageDirection(e) {
      const t = this;
      (t.rtl && "rtl" === e) ||
        (!t.rtl && "ltr" === e) ||
        ((t.rtl = "rtl" === e),
        (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
        t.rtl
          ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "rtl"))
          : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
            (t.el.dir = "ltr")),
        t.update());
    }
    mount(e) {
      const t = this;
      if (t.mounted) return !0;
      let s = e || t.params.el;
      if (("string" == typeof s && (s = document.querySelector(s)), !s))
        return !1;
      (s.swiper = t),
        s.parentNode &&
          s.parentNode.host &&
          s.parentNode.host.nodeName ===
            t.params.swiperElementNodeName.toUpperCase() &&
          (t.isElement = !0);
      const i = () =>
        `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
      let a = (() => {
        if (s && s.shadowRoot && s.shadowRoot.querySelector) {
          return s.shadowRoot.querySelector(i());
        }
        return y(s, i())[0];
      })();
      return (
        !a &&
          t.params.createElements &&
          ((a = S("div", t.params.wrapperClass)),
          s.append(a),
          y(s, `.${t.params.slideClass}`).forEach((e) => {
            a.append(e);
          })),
        Object.assign(t, {
          el: s,
          wrapperEl: a,
          slidesEl:
            t.isElement && !s.parentNode.host.slideSlots
              ? s.parentNode.host
              : a,
          hostEl: t.isElement ? s.parentNode.host : s,
          mounted: !0,
          rtl: "rtl" === s.dir.toLowerCase() || "rtl" === T(s, "direction"),
          rtlTranslate:
            "horizontal" === t.params.direction &&
            ("rtl" === s.dir.toLowerCase() || "rtl" === T(s, "direction")),
          wrongRTL: "-webkit-box" === T(a, "display"),
        }),
        !0
      );
    }
    init(e) {
      const t = this;
      if (t.initialized) return t;
      if (!1 === t.mount(e)) return t;
      t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.loop && t.virtual && t.params.virtual.enabled
          ? t.slideTo(
              t.params.initialSlide + t.virtual.slidesBefore,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            )
          : t.slideTo(
              t.params.initialSlide,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0,
            ),
        t.params.loop && t.loopCreate(),
        t.attachEvents();
      const s = [...t.el.querySelectorAll('[loading="lazy"]')];
      return (
        t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
        s.forEach((e) => {
          e.complete
            ? z(t, e)
            : e.addEventListener("load", (e) => {
                z(t, e.target);
              });
        }),
        G(t),
        (t.initialized = !0),
        G(t),
        t.emit("init"),
        t.emit("afterInit"),
        t
      );
    }
    destroy(e, t) {
      void 0 === e && (e = !0), void 0 === t && (t = !0);
      const s = this,
        { params: i, el: a, wrapperEl: r, slides: n } = s;
      return (
        void 0 === s.params ||
          s.destroyed ||
          (s.emit("beforeDestroy"),
          (s.initialized = !1),
          s.detachEvents(),
          i.loop && s.loopDestroy(),
          t &&
            (s.removeClasses(),
            a.removeAttribute("style"),
            r.removeAttribute("style"),
            n &&
              n.length &&
              n.forEach((e) => {
                e.classList.remove(
                  i.slideVisibleClass,
                  i.slideFullyVisibleClass,
                  i.slideActiveClass,
                  i.slideNextClass,
                  i.slidePrevClass,
                ),
                  e.removeAttribute("style"),
                  e.removeAttribute("data-swiper-slide-index");
              })),
          s.emit("destroy"),
          Object.keys(s.eventsListeners).forEach((e) => {
            s.off(e);
          }),
          !1 !== e &&
            ((s.el.swiper = null),
            (function (e) {
              const t = e;
              Object.keys(t).forEach((e) => {
                try {
                  t[e] = null;
                } catch (e) {}
                try {
                  delete t[e];
                } catch (e) {}
              });
            })(s)),
          (s.destroyed = !0)),
        null
      );
    }
    static extendDefaults(e) {
      h(se, e);
    }
    static get extendedDefaults() {
      return se;
    }
    static get defaults() {
      return Z;
    }
    static installModule(e) {
      ie.prototype.__modules__ || (ie.prototype.__modules__ = []);
      const t = ie.prototype.__modules__;
      "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
    }
    static use(e) {
      return Array.isArray(e)
        ? (e.forEach((e) => ie.installModule(e)), ie)
        : (ie.installModule(e), ie);
    }
  }
  function ae(e, t, s, i) {
    return (
      e.params.createElements &&
        Object.keys(i).forEach((a) => {
          if (!s[a] && !0 === s.auto) {
            let r = y(e.el, `.${i[a]}`)[0];
            r || ((r = S("div", i[a])), (r.className = i[a]), e.el.append(r)),
              (s[a] = r),
              (t[a] = r);
          }
        }),
      s
    );
  }
  function re(e) {
    let { swiper: t, extendParams: s, on: i, emit: a } = e;
    function r(e) {
      let s;
      return e &&
        "string" == typeof e &&
        t.isElement &&
        ((s = t.el.querySelector(e)), s)
        ? s
        : (e &&
            ("string" == typeof e && (s = [...document.querySelectorAll(e)]),
            t.params.uniqueNavElements &&
              "string" == typeof e &&
              s.length > 1 &&
              1 === t.el.querySelectorAll(e).length &&
              (s = t.el.querySelector(e))),
          e && !s ? e : s);
    }
    function n(e, s) {
      const i = t.params.navigation;
      (e = L(e)).forEach((e) => {
        e &&
          (e.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")),
          "BUTTON" === e.tagName && (e.disabled = s),
          t.params.watchOverflow &&
            t.enabled &&
            e.classList[t.isLocked ? "add" : "remove"](i.lockClass));
      });
    }
    function l() {
      const { nextEl: e, prevEl: s } = t.navigation;
      if (t.params.loop) return n(s, !1), void n(e, !1);
      n(s, t.isBeginning && !t.params.rewind),
        n(e, t.isEnd && !t.params.rewind);
    }
    function o(e) {
      e.preventDefault(),
        (!t.isBeginning || t.params.loop || t.params.rewind) &&
          (t.slidePrev(), a("navigationPrev"));
    }
    function d(e) {
      e.preventDefault(),
        (!t.isEnd || t.params.loop || t.params.rewind) &&
          (t.slideNext(), a("navigationNext"));
    }
    function c() {
      const e = t.params.navigation;
      if (
        ((t.params.navigation = ae(
          t,
          t.originalParams.navigation,
          t.params.navigation,
          { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" },
        )),
        !e.nextEl && !e.prevEl)
      )
        return;
      let s = r(e.nextEl),
        i = r(e.prevEl);
      Object.assign(t.navigation, { nextEl: s, prevEl: i }),
        (s = L(s)),
        (i = L(i));
      const a = (s, i) => {
        s && s.addEventListener("click", "next" === i ? d : o),
          !t.enabled && s && s.classList.add(...e.lockClass.split(" "));
      };
      s.forEach((e) => a(e, "next")), i.forEach((e) => a(e, "prev"));
    }
    function p() {
      let { nextEl: e, prevEl: s } = t.navigation;
      (e = L(e)), (s = L(s));
      const i = (e, s) => {
        e.removeEventListener("click", "next" === s ? d : o),
          e.classList.remove(...t.params.navigation.disabledClass.split(" "));
      };
      e.forEach((e) => i(e, "next")), s.forEach((e) => i(e, "prev"));
    }
    s({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: !1,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled",
      },
    }),
      (t.navigation = { nextEl: null, prevEl: null }),
      i("init", () => {
        !1 === t.params.navigation.enabled ? u() : (c(), l());
      }),
      i("toEdge fromEdge lock unlock", () => {
        l();
      }),
      i("destroy", () => {
        p();
      }),
      i("enable disable", () => {
        let { nextEl: e, prevEl: s } = t.navigation;
        (e = L(e)),
          (s = L(s)),
          t.enabled
            ? l()
            : [...e, ...s]
                .filter((e) => !!e)
                .forEach((e) => e.classList.add(t.params.navigation.lockClass));
      }),
      i("click", (e, s) => {
        let { nextEl: i, prevEl: r } = t.navigation;
        (i = L(i)), (r = L(r));
        const n = s.target;
        if (
          t.params.navigation.hideOnClick &&
          !r.includes(n) &&
          !i.includes(n)
        ) {
          if (
            t.pagination &&
            t.params.pagination &&
            t.params.pagination.clickable &&
            (t.pagination.el === n || t.pagination.el.contains(n))
          )
            return;
          let e;
          i.length
            ? (e = i[0].classList.contains(t.params.navigation.hiddenClass))
            : r.length &&
              (e = r[0].classList.contains(t.params.navigation.hiddenClass)),
            a(!0 === e ? "navigationShow" : "navigationHide"),
            [...i, ...r]
              .filter((e) => !!e)
              .forEach((e) =>
                e.classList.toggle(t.params.navigation.hiddenClass),
              );
        }
      });
    const u = () => {
      t.el.classList.add(
        ...t.params.navigation.navigationDisabledClass.split(" "),
      ),
        p();
    };
    Object.assign(t.navigation, {
      enable: () => {
        t.el.classList.remove(
          ...t.params.navigation.navigationDisabledClass.split(" "),
        ),
          c(),
          l();
      },
      disable: u,
      update: l,
      init: c,
      destroy: p,
    });
  }
  function ne(e) {
    return (
      void 0 === e && (e = ""),
      `.${e
        .trim()
        .replace(/([\.:!+\/])/g, "\\$1")
        .replace(/ /g, ".")}`
    );
  }
  function le(e) {
    let { swiper: t, extendParams: s, on: i, emit: a } = e;
    const r = "swiper-pagination";
    let n;
    s({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: !1,
        hideOnClick: !1,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: !1,
        type: "bullets",
        dynamicBullets: !1,
        dynamicMainBullets: 1,
        formatFractionCurrent: (e) => e,
        formatFractionTotal: (e) => e,
        bulletClass: `${r}-bullet`,
        bulletActiveClass: `${r}-bullet-active`,
        modifierClass: `${r}-`,
        currentClass: `${r}-current`,
        totalClass: `${r}-total`,
        hiddenClass: `${r}-hidden`,
        progressbarFillClass: `${r}-progressbar-fill`,
        progressbarOppositeClass: `${r}-progressbar-opposite`,
        clickableClass: `${r}-clickable`,
        lockClass: `${r}-lock`,
        horizontalClass: `${r}-horizontal`,
        verticalClass: `${r}-vertical`,
        paginationDisabledClass: `${r}-disabled`,
      },
    }),
      (t.pagination = { el: null, bullets: [] });
    let l = 0;
    function o() {
      return (
        !t.params.pagination.el ||
        !t.pagination.el ||
        (Array.isArray(t.pagination.el) && 0 === t.pagination.el.length)
      );
    }
    function d(e, s) {
      const { bulletActiveClass: i } = t.params.pagination;
      e &&
        (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
        (e.classList.add(`${i}-${s}`),
        (e = e[("prev" === s ? "previous" : "next") + "ElementSibling"]) &&
          e.classList.add(`${i}-${s}-${s}`));
    }
    function c(e) {
      const s = e.target.closest(ne(t.params.pagination.bulletClass));
      if (!s) return;
      e.preventDefault();
      const i = E(s) * t.params.slidesPerGroup;
      if (t.params.loop) {
        if (t.realIndex === i) return;
        t.slideToLoop(i);
      } else t.slideTo(i);
    }
    function p() {
      const e = t.rtl,
        s = t.params.pagination;
      if (o()) return;
      let i,
        r,
        c = t.pagination.el;
      c = L(c);
      const p =
          t.virtual && t.params.virtual.enabled
            ? t.virtual.slides.length
            : t.slides.length,
        u = t.params.loop
          ? Math.ceil(p / t.params.slidesPerGroup)
          : t.snapGrid.length;
      if (
        (t.params.loop
          ? ((r = t.previousRealIndex || 0),
            (i =
              t.params.slidesPerGroup > 1
                ? Math.floor(t.realIndex / t.params.slidesPerGroup)
                : t.realIndex))
          : void 0 !== t.snapIndex
            ? ((i = t.snapIndex), (r = t.previousSnapIndex))
            : ((r = t.previousIndex || 0), (i = t.activeIndex || 0)),
        "bullets" === s.type &&
          t.pagination.bullets &&
          t.pagination.bullets.length > 0)
      ) {
        const a = t.pagination.bullets;
        let o, p, u;
        if (
          (s.dynamicBullets &&
            ((n = C(a[0], t.isHorizontal() ? "width" : "height", !0)),
            c.forEach((e) => {
              e.style[t.isHorizontal() ? "width" : "height"] =
                n * (s.dynamicMainBullets + 4) + "px";
            }),
            s.dynamicMainBullets > 1 &&
              void 0 !== r &&
              ((l += i - (r || 0)),
              l > s.dynamicMainBullets - 1
                ? (l = s.dynamicMainBullets - 1)
                : l < 0 && (l = 0)),
            (o = Math.max(i - l, 0)),
            (p = o + (Math.min(a.length, s.dynamicMainBullets) - 1)),
            (u = (p + o) / 2)),
          a.forEach((e) => {
            const t = [
              ...[
                "",
                "-next",
                "-next-next",
                "-prev",
                "-prev-prev",
                "-main",
              ].map((e) => `${s.bulletActiveClass}${e}`),
            ]
              .map((e) =>
                "string" == typeof e && e.includes(" ") ? e.split(" ") : e,
              )
              .flat();
            e.classList.remove(...t);
          }),
          c.length > 1)
        )
          a.forEach((e) => {
            const a = E(e);
            a === i
              ? e.classList.add(...s.bulletActiveClass.split(" "))
              : t.isElement && e.setAttribute("part", "bullet"),
              s.dynamicBullets &&
                (a >= o &&
                  a <= p &&
                  e.classList.add(...`${s.bulletActiveClass}-main`.split(" ")),
                a === o && d(e, "prev"),
                a === p && d(e, "next"));
          });
        else {
          const e = a[i];
          if (
            (e && e.classList.add(...s.bulletActiveClass.split(" ")),
            t.isElement &&
              a.forEach((e, t) => {
                e.setAttribute("part", t === i ? "bullet-active" : "bullet");
              }),
            s.dynamicBullets)
          ) {
            const e = a[o],
              t = a[p];
            for (let e = o; e <= p; e += 1)
              a[e] &&
                a[e].classList.add(...`${s.bulletActiveClass}-main`.split(" "));
            d(e, "prev"), d(t, "next");
          }
        }
        if (s.dynamicBullets) {
          const i = Math.min(a.length, s.dynamicMainBullets + 4),
            r = (n * i - n) / 2 - u * n,
            l = e ? "right" : "left";
          a.forEach((e) => {
            e.style[t.isHorizontal() ? l : "top"] = `${r}px`;
          });
        }
      }
      c.forEach((e, r) => {
        if (
          ("fraction" === s.type &&
            (e.querySelectorAll(ne(s.currentClass)).forEach((e) => {
              e.textContent = s.formatFractionCurrent(i + 1);
            }),
            e.querySelectorAll(ne(s.totalClass)).forEach((e) => {
              e.textContent = s.formatFractionTotal(u);
            })),
          "progressbar" === s.type)
        ) {
          let a;
          a = s.progressbarOpposite
            ? t.isHorizontal()
              ? "vertical"
              : "horizontal"
            : t.isHorizontal()
              ? "horizontal"
              : "vertical";
          const r = (i + 1) / u;
          let n = 1,
            l = 1;
          "horizontal" === a ? (n = r) : (l = r),
            e.querySelectorAll(ne(s.progressbarFillClass)).forEach((e) => {
              (e.style.transform = `translate3d(0,0,0) scaleX(${n}) scaleY(${l})`),
                (e.style.transitionDuration = `${t.params.speed}ms`);
            });
        }
        "custom" === s.type && s.renderCustom
          ? ((e.innerHTML = s.renderCustom(t, i + 1, u)),
            0 === r && a("paginationRender", e))
          : (0 === r && a("paginationRender", e), a("paginationUpdate", e)),
          t.params.watchOverflow &&
            t.enabled &&
            e.classList[t.isLocked ? "add" : "remove"](s.lockClass);
      });
    }
    function u() {
      const e = t.params.pagination;
      if (o()) return;
      const s =
        t.virtual && t.params.virtual.enabled
          ? t.virtual.slides.length
          : t.grid && t.params.grid.rows > 1
            ? t.slides.length / Math.ceil(t.params.grid.rows)
            : t.slides.length;
      let i = t.pagination.el;
      i = L(i);
      let r = "";
      if ("bullets" === e.type) {
        let i = t.params.loop
          ? Math.ceil(s / t.params.slidesPerGroup)
          : t.snapGrid.length;
        t.params.freeMode && t.params.freeMode.enabled && i > s && (i = s);
        for (let s = 0; s < i; s += 1)
          e.renderBullet
            ? (r += e.renderBullet.call(t, s, e.bulletClass))
            : (r += `<${e.bulletElement} ${t.isElement ? 'part="bullet"' : ""} class="${e.bulletClass}"></${e.bulletElement}>`);
      }
      "fraction" === e.type &&
        (r = e.renderFraction
          ? e.renderFraction.call(t, e.currentClass, e.totalClass)
          : `<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),
        "progressbar" === e.type &&
          (r = e.renderProgressbar
            ? e.renderProgressbar.call(t, e.progressbarFillClass)
            : `<span class="${e.progressbarFillClass}"></span>`),
        (t.pagination.bullets = []),
        i.forEach((s) => {
          "custom" !== e.type && (s.innerHTML = r || ""),
            "bullets" === e.type &&
              t.pagination.bullets.push(
                ...s.querySelectorAll(ne(e.bulletClass)),
              );
        }),
        "custom" !== e.type && a("paginationRender", i[0]);
    }
    function m() {
      t.params.pagination = ae(
        t,
        t.originalParams.pagination,
        t.params.pagination,
        { el: "swiper-pagination" },
      );
      const e = t.params.pagination;
      if (!e.el) return;
      let s;
      "string" == typeof e.el && t.isElement && (s = t.el.querySelector(e.el)),
        s ||
          "string" != typeof e.el ||
          (s = [...document.querySelectorAll(e.el)]),
        s || (s = e.el),
        s &&
          0 !== s.length &&
          (t.params.uniqueNavElements &&
            "string" == typeof e.el &&
            Array.isArray(s) &&
            s.length > 1 &&
            ((s = [...t.el.querySelectorAll(e.el)]),
            s.length > 1 &&
              (s = s.filter((e) => x(e, ".swiper")[0] === t.el)[0])),
          Array.isArray(s) && 1 === s.length && (s = s[0]),
          Object.assign(t.pagination, { el: s }),
          (s = L(s)),
          s.forEach((s) => {
            "bullets" === e.type &&
              e.clickable &&
              s.classList.add(...(e.clickableClass || "").split(" ")),
              s.classList.add(e.modifierClass + e.type),
              s.classList.add(
                t.isHorizontal() ? e.horizontalClass : e.verticalClass,
              ),
              "bullets" === e.type &&
                e.dynamicBullets &&
                (s.classList.add(`${e.modifierClass}${e.type}-dynamic`),
                (l = 0),
                e.dynamicMainBullets < 1 && (e.dynamicMainBullets = 1)),
              "progressbar" === e.type &&
                e.progressbarOpposite &&
                s.classList.add(e.progressbarOppositeClass),
              e.clickable && s.addEventListener("click", c),
              t.enabled || s.classList.add(e.lockClass);
          }));
    }
    function f() {
      const e = t.params.pagination;
      if (o()) return;
      let s = t.pagination.el;
      s &&
        ((s = L(s)),
        s.forEach((s) => {
          s.classList.remove(e.hiddenClass),
            s.classList.remove(e.modifierClass + e.type),
            s.classList.remove(
              t.isHorizontal() ? e.horizontalClass : e.verticalClass,
            ),
            e.clickable &&
              (s.classList.remove(...(e.clickableClass || "").split(" ")),
              s.removeEventListener("click", c));
        })),
        t.pagination.bullets &&
          t.pagination.bullets.forEach((t) =>
            t.classList.remove(...e.bulletActiveClass.split(" ")),
          );
    }
    i("changeDirection", () => {
      if (!t.pagination || !t.pagination.el) return;
      const e = t.params.pagination;
      let { el: s } = t.pagination;
      (s = L(s)),
        s.forEach((s) => {
          s.classList.remove(e.horizontalClass, e.verticalClass),
            s.classList.add(
              t.isHorizontal() ? e.horizontalClass : e.verticalClass,
            );
        });
    }),
      i("init", () => {
        !1 === t.params.pagination.enabled ? h() : (m(), u(), p());
      }),
      i("activeIndexChange", () => {
        void 0 === t.snapIndex && p();
      }),
      i("snapIndexChange", () => {
        p();
      }),
      i("snapGridLengthChange", () => {
        u(), p();
      }),
      i("destroy", () => {
        f();
      }),
      i("enable disable", () => {
        let { el: e } = t.pagination;
        e &&
          ((e = L(e)),
          e.forEach((e) =>
            e.classList[t.enabled ? "remove" : "add"](
              t.params.pagination.lockClass,
            ),
          ));
      }),
      i("lock unlock", () => {
        p();
      }),
      i("click", (e, s) => {
        const i = s.target,
          r = L(t.pagination.el);
        if (
          t.params.pagination.el &&
          t.params.pagination.hideOnClick &&
          r &&
          r.length > 0 &&
          !i.classList.contains(t.params.pagination.bulletClass)
        ) {
          if (
            t.navigation &&
            ((t.navigation.nextEl && i === t.navigation.nextEl) ||
              (t.navigation.prevEl && i === t.navigation.prevEl))
          )
            return;
          const e = r[0].classList.contains(t.params.pagination.hiddenClass);
          a(!0 === e ? "paginationShow" : "paginationHide"),
            r.forEach((e) =>
              e.classList.toggle(t.params.pagination.hiddenClass),
            );
        }
      });
    const h = () => {
      t.el.classList.add(t.params.pagination.paginationDisabledClass);
      let { el: e } = t.pagination;
      e &&
        ((e = L(e)),
        e.forEach((e) =>
          e.classList.add(t.params.pagination.paginationDisabledClass),
        )),
        f();
    };
    Object.assign(t.pagination, {
      enable: () => {
        t.el.classList.remove(t.params.pagination.paginationDisabledClass);
        let { el: e } = t.pagination;
        e &&
          ((e = L(e)),
          e.forEach((e) =>
            e.classList.remove(t.params.pagination.paginationDisabledClass),
          )),
          m(),
          u(),
          p();
      },
      disable: h,
      render: u,
      update: p,
      init: m,
      destroy: f,
    });
  }
  function oe(e) {
    let t,
      s,
      { swiper: i, extendParams: a, on: r, emit: n, params: l } = e;
    (i.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
      a({
        autoplay: {
          enabled: !1,
          delay: 3e3,
          waitForTransition: !0,
          disableOnInteraction: !1,
          stopOnLastSlide: !1,
          reverseDirection: !1,
          pauseOnMouseEnter: !1,
        },
      });
    let d,
      c,
      p,
      u,
      m,
      f,
      h,
      g,
      v = l && l.autoplay ? l.autoplay.delay : 3e3,
      w = l && l.autoplay ? l.autoplay.delay : 3e3,
      y = new Date().getTime();
    function b(e) {
      i &&
        !i.destroyed &&
        i.wrapperEl &&
        e.target === i.wrapperEl &&
        (i.wrapperEl.removeEventListener("transitionend", b), g || L());
    }
    const S = () => {
        if (i.destroyed || !i.autoplay.running) return;
        i.autoplay.paused ? (c = !0) : c && ((w = d), (c = !1));
        const e = i.autoplay.paused ? d : y + w - new Date().getTime();
        (i.autoplay.timeLeft = e),
          n("autoplayTimeLeft", e, e / v),
          (s = requestAnimationFrame(() => {
            S();
          }));
      },
      T = (e) => {
        if (i.destroyed || !i.autoplay.running) return;
        cancelAnimationFrame(s), S();
        let a = void 0 === e ? i.params.autoplay.delay : e;
        (v = i.params.autoplay.delay), (w = i.params.autoplay.delay);
        const r = (() => {
          let e;
          if (
            ((e =
              i.virtual && i.params.virtual.enabled
                ? i.slides.filter((e) =>
                    e.classList.contains("swiper-slide-active"),
                  )[0]
                : i.slides[i.activeIndex]),
            !e)
          )
            return;
          return parseInt(e.getAttribute("data-swiper-autoplay"), 10);
        })();
        !Number.isNaN(r) &&
          r > 0 &&
          void 0 === e &&
          ((a = r), (v = r), (w = r)),
          (d = a);
        const l = i.params.speed,
          o = () => {
            i &&
              !i.destroyed &&
              (i.params.autoplay.reverseDirection
                ? !i.isBeginning || i.params.loop || i.params.rewind
                  ? (i.slidePrev(l, !0, !0), n("autoplay"))
                  : i.params.autoplay.stopOnLastSlide ||
                    (i.slideTo(i.slides.length - 1, l, !0, !0), n("autoplay"))
                : !i.isEnd || i.params.loop || i.params.rewind
                  ? (i.slideNext(l, !0, !0), n("autoplay"))
                  : i.params.autoplay.stopOnLastSlide ||
                    (i.slideTo(0, l, !0, !0), n("autoplay")),
              i.params.cssMode &&
                ((y = new Date().getTime()),
                requestAnimationFrame(() => {
                  T();
                })));
          };
        return (
          a > 0
            ? (clearTimeout(t),
              (t = setTimeout(() => {
                o();
              }, a)))
            : requestAnimationFrame(() => {
                o();
              }),
          a
        );
      },
      E = () => {
        (y = new Date().getTime()),
          (i.autoplay.running = !0),
          T(),
          n("autoplayStart");
      },
      x = () => {
        (i.autoplay.running = !1),
          clearTimeout(t),
          cancelAnimationFrame(s),
          n("autoplayStop");
      },
      C = (e, s) => {
        if (i.destroyed || !i.autoplay.running) return;
        clearTimeout(t), e || (h = !0);
        const a = () => {
          n("autoplayPause"),
            i.params.autoplay.waitForTransition
              ? i.wrapperEl.addEventListener("transitionend", b)
              : L();
        };
        if (((i.autoplay.paused = !0), s))
          return f && (d = i.params.autoplay.delay), (f = !1), void a();
        const r = d || i.params.autoplay.delay;
        (d = r - (new Date().getTime() - y)),
          (i.isEnd && d < 0 && !i.params.loop) || (d < 0 && (d = 0), a());
      },
      L = () => {
        (i.isEnd && d < 0 && !i.params.loop) ||
          i.destroyed ||
          !i.autoplay.running ||
          ((y = new Date().getTime()),
          h ? ((h = !1), T(d)) : T(),
          (i.autoplay.paused = !1),
          n("autoplayResume"));
      },
      M = () => {
        if (i.destroyed || !i.autoplay.running) return;
        const e = o();
        "hidden" === e.visibilityState && ((h = !0), C(!0)),
          "visible" === e.visibilityState && L();
      },
      _ = (e) => {
        "mouse" === e.pointerType &&
          ((h = !0), (g = !0), i.animating || i.autoplay.paused || C(!0));
      },
      P = (e) => {
        "mouse" === e.pointerType && ((g = !1), i.autoplay.paused && L());
      };
    r("init", () => {
      i.params.autoplay.enabled &&
        (i.params.autoplay.pauseOnMouseEnter &&
          (i.el.addEventListener("pointerenter", _),
          i.el.addEventListener("pointerleave", P)),
        o().addEventListener("visibilitychange", M),
        E());
    }),
      r("destroy", () => {
        i.el.removeEventListener("pointerenter", _),
          i.el.removeEventListener("pointerleave", P),
          o().removeEventListener("visibilitychange", M),
          i.autoplay.running && x();
      }),
      r("_freeModeStaticRelease", () => {
        (u || h) && L();
      }),
      r("_freeModeNoMomentumRelease", () => {
        i.params.autoplay.disableOnInteraction ? x() : C(!0, !0);
      }),
      r("beforeTransitionStart", (e, t, s) => {
        !i.destroyed &&
          i.autoplay.running &&
          (s || !i.params.autoplay.disableOnInteraction ? C(!0, !0) : x());
      }),
      r("sliderFirstMove", () => {
        !i.destroyed &&
          i.autoplay.running &&
          (i.params.autoplay.disableOnInteraction
            ? x()
            : ((p = !0),
              (u = !1),
              (h = !1),
              (m = setTimeout(() => {
                (h = !0), (u = !0), C(!0);
              }, 200))));
      }),
      r("touchEnd", () => {
        if (!i.destroyed && i.autoplay.running && p) {
          if (
            (clearTimeout(m),
            clearTimeout(t),
            i.params.autoplay.disableOnInteraction)
          )
            return (u = !1), void (p = !1);
          u && i.params.cssMode && L(), (u = !1), (p = !1);
        }
      }),
      r("slideChange", () => {
        !i.destroyed && i.autoplay.running && (f = !0);
      }),
      Object.assign(i.autoplay, { start: E, stop: x, pause: C, resume: L });
  }
  function de(e, t) {
    const s = w(t);
    return (
      s !== t &&
        ((s.style.backfaceVisibility = "hidden"),
        (s.style["-webkit-backface-visibility"] = "hidden")),
      s
    );
  }
  function ce(e) {
    let { swiper: t, duration: s, transformElements: i, allSlides: a } = e;
    const { activeIndex: r } = t;
    if (t.params.virtualTranslate && 0 !== s) {
      let e,
        s = !1;
      (e = a
        ? i
        : i.filter((e) => {
            const s = e.classList.contains("swiper-slide-transform")
              ? ((e) => {
                  if (!e.parentElement)
                    return t.slides.filter(
                      (t) => t.shadowRoot && t.shadowRoot === e.parentNode,
                    )[0];
                  return e.parentElement;
                })(e)
              : e;
            return t.getSlideIndex(s) === r;
          })),
        e.forEach((e) => {
          !(function (e, t) {
            t &&
              e.addEventListener("transitionend", function s(i) {
                i.target === e &&
                  (t.call(e, i), e.removeEventListener("transitionend", s));
              });
          })(e, () => {
            if (s) return;
            if (!t || t.destroyed) return;
            (s = !0), (t.animating = !1);
            const e = new window.CustomEvent("transitionend", {
              bubbles: !0,
              cancelable: !0,
            });
            t.wrapperEl.dispatchEvent(e);
          });
        });
    }
  }
  function pe(e) {
    let { swiper: t, extendParams: s, on: i } = e;
    s({ fadeEffect: { crossFade: !1 } });
    !(function (e) {
      const {
        effect: t,
        swiper: s,
        on: i,
        setTranslate: a,
        setTransition: r,
        overwriteParams: n,
        perspective: l,
        recreateShadows: o,
        getEffectParams: d,
      } = e;
      let c;
      i("beforeInit", () => {
        if (s.params.effect !== t) return;
        s.classNames.push(`${s.params.containerModifierClass}${t}`),
          l && l() && s.classNames.push(`${s.params.containerModifierClass}3d`);
        const e = n ? n() : {};
        Object.assign(s.params, e), Object.assign(s.originalParams, e);
      }),
        i("setTranslate", () => {
          s.params.effect === t && a();
        }),
        i("setTransition", (e, i) => {
          s.params.effect === t && r(i);
        }),
        i("transitionEnd", () => {
          if (s.params.effect === t && o) {
            if (!d || !d().slideShadows) return;
            s.slides.forEach((e) => {
              e.querySelectorAll(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left",
              ).forEach((e) => e.remove());
            }),
              o();
          }
        }),
        i("virtualUpdate", () => {
          s.params.effect === t &&
            (s.slides.length || (c = !0),
            requestAnimationFrame(() => {
              c && s.slides && s.slides.length && (a(), (c = !1));
            }));
        });
    })({
      effect: "fade",
      swiper: t,
      on: i,
      setTranslate: () => {
        const { slides: e } = t;
        t.params.fadeEffect;
        for (let s = 0; s < e.length; s += 1) {
          const e = t.slides[s];
          let i = -e.swiperSlideOffset;
          t.params.virtualTranslate || (i -= t.translate);
          let a = 0;
          t.isHorizontal() || ((a = i), (i = 0));
          const r = t.params.fadeEffect.crossFade
              ? Math.max(1 - Math.abs(e.progress), 0)
              : 1 + Math.min(Math.max(e.progress, -1), 0),
            n = de(0, e);
          (n.style.opacity = r),
            (n.style.transform = `translate3d(${i}px, ${a}px, 0px)`);
        }
      },
      setTransition: (e) => {
        const s = t.slides.map((e) => w(e));
        s.forEach((t) => {
          t.style.transitionDuration = `${e}ms`;
        }),
          ce({ swiper: t, duration: e, transformElements: s, allSlides: !0 });
      },
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: !0,
        spaceBetween: 0,
        virtualTranslate: !t.params.cssMode,
      }),
    });
  }
  function ue() {
    let e = document.querySelectorAll(
      '[class*="__swiper"]:not(.swiper-wrapper)',
    );
    e &&
      e.forEach((e) => {
        e.parentElement.classList.add("swiper"),
          e.classList.add("swiper-wrapper");
        for (const t of e.children) t.classList.add("swiper-slide");
      });
  }
  Object.keys(te).forEach((e) => {
    Object.keys(te[e]).forEach((t) => {
      ie.prototype[t] = te[e][t];
    });
  }),
    ie.use([
      function (e) {
        let { swiper: t, on: s, emit: i } = e;
        const a = c();
        let r = null,
          n = null;
        const l = () => {
            t &&
              !t.destroyed &&
              t.initialized &&
              (i("beforeResize"), i("resize"));
          },
          o = () => {
            t && !t.destroyed && t.initialized && i("orientationchange");
          };
        s("init", () => {
          t.params.resizeObserver && void 0 !== a.ResizeObserver
            ? t &&
              !t.destroyed &&
              t.initialized &&
              ((r = new ResizeObserver((e) => {
                n = a.requestAnimationFrame(() => {
                  const { width: s, height: i } = t;
                  let a = s,
                    r = i;
                  e.forEach((e) => {
                    let { contentBoxSize: s, contentRect: i, target: n } = e;
                    (n && n !== t.el) ||
                      ((a = i ? i.width : (s[0] || s).inlineSize),
                      (r = i ? i.height : (s[0] || s).blockSize));
                  }),
                    (a === s && r === i) || l();
                });
              })),
              r.observe(t.el))
            : (a.addEventListener("resize", l),
              a.addEventListener("orientationchange", o));
        }),
          s("destroy", () => {
            n && a.cancelAnimationFrame(n),
              r && r.unobserve && t.el && (r.unobserve(t.el), (r = null)),
              a.removeEventListener("resize", l),
              a.removeEventListener("orientationchange", o);
          });
      },
      function (e) {
        let { swiper: t, extendParams: s, on: i, emit: a } = e;
        const r = [],
          n = c(),
          l = function (e, s) {
            void 0 === s && (s = {});
            const i = new (n.MutationObserver || n.WebkitMutationObserver)(
              (e) => {
                if (t.__preventObserver__) return;
                if (1 === e.length) return void a("observerUpdate", e[0]);
                const s = function () {
                  a("observerUpdate", e[0]);
                };
                n.requestAnimationFrame
                  ? n.requestAnimationFrame(s)
                  : n.setTimeout(s, 0);
              },
            );
            i.observe(e, {
              attributes: void 0 === s.attributes || s.attributes,
              childList: void 0 === s.childList || s.childList,
              characterData: void 0 === s.characterData || s.characterData,
            }),
              r.push(i);
          };
        s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
          i("init", () => {
            if (t.params.observer) {
              if (t.params.observeParents) {
                const e = x(t.hostEl);
                for (let t = 0; t < e.length; t += 1) l(e[t]);
              }
              l(t.hostEl, { childList: t.params.observeSlideChildren }),
                l(t.wrapperEl, { attributes: !1 });
            }
          }),
          i("destroy", () => {
            r.forEach((e) => {
              e.disconnect();
            }),
              r.splice(0, r.length);
          });
      },
    ]),
    window.addEventListener("load", function (e) {
      ue(),
        document.querySelector(".about__slider") &&
          new ie(".about__slider", {
            modules: [pe, le, oe],
            effect: "fade",
            autoplay: { delay: 3e3, disableOnInteraction: !1 },
            observer: !0,
            observeParents: !0,
            slidesPerView: 1,
            spaceBetween: 0,
            autoHeight: !1,
            speed: 2e3,
            loop: !0,
            pagination: { el: ".about__dotts", clickable: !0 },
            on: {},
          }),
        document.querySelector(".reviews__slider") &&
          new ie(".reviews__slider", {
            modules: [re, le],
            observer: !0,
            observeParents: !0,
            slidesPerView: "auto",
            spaceBetween: 40,
            autoHeight: !1,
            speed: 1e3,
            pagination: { el: ".reviews__dotts", clickable: !0 },
            navigation: {
              nextEl: ".footer-reviews__more .footer-reviews__item--next",
              prevEl: ".footer-reviews__more .footer-reviews__item--prev",
            },
            breakpoints: {
              320: { slidesPerView: 1, spaceBetween: 20 },
              480: { slidesPerView: "auto" },
              768: { spaceBetween: 40 },
              1268: {},
            },
            on: {},
          });
    });
  let me = !1;
  setTimeout(() => {
    if (me) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0);
  const fe = document.querySelectorAll(".battary__column"),
    he = document.querySelectorAll(".safety__column"),
    ge =
      (document.querySelector(".battary__column--1"),
      document.querySelector(".battary__column--2"),
      document.querySelector(".battary__column--3"),
      document.querySelectorAll(".big-image-ibg__item")),
    ve = document.querySelectorAll(".small-image-ibg__item"),
    we = document.querySelectorAll(".big-image-safety__item"),
    ye = document.querySelectorAll(".small-image-safety__item");
  (window.onload = function () {
    document.addEventListener("click", function (e) {
      const t = e.target;
      t.closest(".switcher") &&
        document.querySelector(["html"]).classList.toggle("_black");
      window.innerWidth > 991.98 &&
        (t.classList.contains("battary__column")
          ? (fe.forEach((e) => {
              e.classList.remove("_active");
            }),
            t.classList.add("_active"))
          : t.closest(".battary__column") &&
            (fe.forEach((e) => {
              e.classList.remove("_active");
            }),
            t.parentNode.classList.add("_active")),
        t.classList.contains("safety__column")
          ? (he.forEach((e) => {
              e.classList.remove("_active");
            }),
            t.classList.add("_active"))
          : t.closest(".safety__column") &&
            (he.forEach((e) => {
              e.classList.remove("_active");
            }),
            t.parentNode.classList.add("_active")));
      window.innerWidth > 991.98 &&
        (t.closest(".battary__column--1") &&
          (ge.forEach((e) => {
            e.classList.remove("_show");
          }),
          document
            .querySelector(".big-image-ibg__item--1")
            .classList.add("_show"),
          ve.forEach((e) => {
            e.classList.remove("_show");
          }),
          document
            .querySelector(".small-image-ibg__item--1")
            .classList.add("_show")),
        t.closest(".battary__column--2") &&
          (ge.forEach((e) => {
            e.classList.remove("_show");
          }),
          document
            .querySelector(".big-image-ibg__item--2")
            .classList.add("_show"),
          ve.forEach((e) => {
            e.classList.remove("_show");
          }),
          document
            .querySelector(".small-image-ibg__item--2")
            .classList.add("_show")),
        t.closest(".battary__column--3") &&
          (ge.forEach((e) => {
            e.classList.remove("_show");
          }),
          document
            .querySelector(".big-image-ibg__item--3")
            .classList.add("_show"),
          ve.forEach((e) => {
            e.classList.remove("_show");
          }),
          document
            .querySelector(".small-image-ibg__item--3")
            .classList.add("_show")),
        t.closest(".safety__column--1") &&
          (we.forEach((e) => {
            e.classList.remove("_show");
          }),
          document
            .querySelector(".big-image-safety__item--1")
            .classList.add("_show"),
          ye.forEach((e) => {
            e.classList.remove("_show");
          }),
          document
            .querySelector(".small-image-safety__item--1")
            .classList.add("_show")),
        t.closest(".safety__column--2") &&
          (we.forEach((e) => {
            e.classList.remove("_show");
          }),
          document
            .querySelector(".big-image-safety__item--2")
            .classList.add("_show"),
          ye.forEach((e) => {
            e.classList.remove("_show");
          }),
          document
            .querySelector(".small-image-safety__item--2")
            .classList.add("_show")),
        t.closest(".safety__column--3") &&
          (we.forEach((e) => {
            e.classList.remove("_show");
          }),
          document
            .querySelector(".big-image-safety__item--3")
            .classList.add("_show"),
          ye.forEach((e) => {
            e.classList.remove("_show");
          }),
          document
            .querySelector(".small-image-safety__item--3")
            .classList.add("_show")),
        t.closest(".safety__column--4") &&
          (we.forEach((e) => {
            e.classList.remove("_show");
          }),
          document
            .querySelector(".big-image-safety__item--4")
            .classList.add("_show"),
          ye.forEach((e) => {
            e.classList.remove("_show");
          }),
          document
            .querySelector(".small-image-safety__item--4")
            .classList.add("_show")));
    });
  }),
    (window.FLS = !0),
    (function (e) {
      let t = new Image();
      (t.onload = t.onerror =
        function () {
          e(2 == t.height);
        }),
        (t.src =
          "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
    })(function (e) {
      let t = !0 === e ? "webp" : "no-webp";
      document.documentElement.classList.add(t);
    }),
    t.any() && document.documentElement.classList.add("touch"),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          s &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? i(e) : a(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })(),
    (function () {
      me = !0;
      const e = document.querySelector("header.header"),
        t = e.hasAttribute("data-scroll-show"),
        s = e.dataset.scrollShow ? e.dataset.scrollShow : 500,
        i = e.dataset.scroll ? e.dataset.scroll : 1;
      let a,
        r = 0;
      document.addEventListener("windowScroll", function (n) {
        const l = window.scrollY;
        clearTimeout(a),
          l >= i
            ? (!e.classList.contains("_header-scroll") &&
                e.classList.add("_header-scroll"),
              t &&
                (l > r
                  ? e.classList.contains("_header-show") &&
                    e.classList.remove("_header-show")
                  : !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show"),
                (a = setTimeout(() => {
                  !e.classList.contains("_header-show") &&
                    e.classList.add("_header-show");
                }, s))))
            : (e.classList.contains("_header-scroll") &&
                e.classList.remove("_header-scroll"),
              t &&
                e.classList.contains("_header-show") &&
                e.classList.remove("_header-show")),
          (r = l <= 0 ? 0 : l);
      });
    })();
})();
