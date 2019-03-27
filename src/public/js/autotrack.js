(function() {
  var f,
    aa =
      'function' == typeof Object.defineProperties
        ? Object.defineProperty
        : function(a, b, c) {
            if (c.get || c.set)
              throw new TypeError('ES3 does not support getters and setters.');
            a != Array.prototype && a != Object.prototype && (a[b] = c.value);
          },
    k =
      'undefined' != typeof window && window === this
        ? this
        : 'undefined' != typeof global && null != global
        ? global
        : this;
  function ba() {
    ba = function() {};
    k.Symbol || (k.Symbol = ca);
  }
  var da = 0;
  function ca(a) {
    return 'jscomp_symbol_' + (a || '') + da++;
  }
  function l() {
    ba();
    var a = k.Symbol.iterator;
    a || (a = k.Symbol.iterator = k.Symbol('iterator'));
    'function' != typeof Array.prototype[a] &&
      aa(Array.prototype, a, {
        configurable: !0,
        writable: !0,
        value: function() {
          return ea(this);
        },
      });
    l = function() {};
  }
  function ea(a) {
    var b = 0;
    return fa(function() {
      return b < a.length ? { done: !1, value: a[b++] } : { done: !0 };
    });
  }
  function fa(a) {
    l();
    a = { next: a };
    a[k.Symbol.iterator] = function() {
      return this;
    };
    return a;
  }
  function m(a) {
    if (!(a instanceof Array)) {
      l();
      var b = a[Symbol.iterator];
      a = b ? b.call(a) : ea(a);
      for (var c = []; !(b = a.next()).done; ) c.push(b.value);
      a = c;
    }
    return a;
  }
  function ha(a, b) {
    function c() {}
    c.prototype = b.prototype;
    a.prototype = new c();
    a.prototype.constructor = a;
    for (var d in b)
      if (Object.defineProperties) {
        var e = Object.getOwnPropertyDescriptor(b, d);
        e && Object.defineProperty(a, d, e);
      } else a[d] = b[d];
  }
  var n = window.Element.prototype,
    ia =
      n.matches ||
      n.matchesSelector ||
      n.webkitMatchesSelector ||
      n.mozMatchesSelector ||
      n.msMatchesSelector ||
      n.oMatchesSelector;
  function ja(a, b) {
    if (a && 1 == a.nodeType && b) {
      if ('string' == typeof b || 1 == b.nodeType) return a == b || ka(a, b);
      if ('length' in b)
        for (var c = 0, d; (d = b[c]); c++) if (a == d || ka(a, d)) return !0;
    }
    return !1;
  }
  function ka(a, b) {
    if ('string' != typeof b) return !1;
    if (ia) return ia.call(a, b);
    b = a.parentNode.querySelectorAll(b);
    for (var c = 0, d; (d = b[c]); c++) if (d == a) return !0;
    return !1;
  }
  function la(a) {
    for (var b = []; a && a.parentNode && 1 == a.parentNode.nodeType; )
      (a = a.parentNode), b.push(a);
    return b;
  }
  function p(a, b, c) {
    function d(a) {
      var d;
      if (h.composed && 'function' == typeof a.composedPath)
        for (var e = a.composedPath(), g = 0, F; (F = e[g]); g++)
          1 == F.nodeType && ja(F, b) && (d = F);
      else
        a: {
          if ((d = a.target) && 1 == d.nodeType && b)
            for (d = [d].concat(la(d)), e = 0; (g = d[e]); e++)
              if (ja(g, b)) {
                d = g;
                break a;
              }
          d = void 0;
        }
      d && c.call(d, a, d);
    }
    var e = document,
      h = { composed: !0, R: !0 },
      h = void 0 === h ? {} : h;
    e.addEventListener(a, d, h.R);
    return {
      j: function() {
        e.removeEventListener(a, d, h.R);
      },
    };
  }
  function ma(a) {
    var b = {};
    if (!a || 1 != a.nodeType) return b;
    a = a.attributes;
    if (!a.length) return {};
    for (var c = 0, d; (d = a[c]); c++) b[d.name] = d.value;
    return b;
  }
  var na = /:(80|443)$/,
    q = document.createElement('a'),
    r = {};
  function t(a) {
    a = a && '.' != a ? a : location.href;
    if (r[a]) return r[a];
    q.href = a;
    if ('.' == a.charAt(0) || '/' == a.charAt(0)) return t(q.href);
    var b = '80' == q.port || '443' == q.port ? '' : q.port,
      b = '0' == b ? '' : b,
      c = q.host.replace(na, '');
    return (r[a] = {
      hash: q.hash,
      host: c,
      hostname: q.hostname,
      href: q.href,
      origin: q.origin ? q.origin : q.protocol + '//' + c,
      pathname: '/' == q.pathname.charAt(0) ? q.pathname : '/' + q.pathname,
      port: b,
      protocol: q.protocol,
      search: q.search,
    });
  }
  var u = [];
  function oa(a, b) {
    var c = this;
    this.context = a;
    this.O = b;
    this.f = (this.c = /Task$/.test(b)) ? a.get(b) : a[b];
    this.b = [];
    this.a = [];
    this.i = function(a) {
      for (var b = [], d = 0; d < arguments.length; ++d)
        b[d - 0] = arguments[d];
      return c.a[c.a.length - 1].apply(null, [].concat(m(b)));
    };
    this.c ? a.set(b, this.i) : (a[b] = this.i);
  }
  function v(a, b) {
    a.b.push(b);
    pa(a);
  }
  function w(a, b) {
    b = a.b.indexOf(b);
    -1 < b && (a.b.splice(b, 1), 0 < a.b.length ? pa(a) : a.j());
  }
  function pa(a) {
    a.a = [];
    for (var b, c = 0; (b = a.b[c]); c++) {
      var d = a.a[c - 1] || a.f.bind(a.context);
      a.a.push(b(d));
    }
  }
  oa.prototype.j = function() {
    var a = u.indexOf(this);
    -1 < a &&
      (u.splice(a, 1),
      this.c
        ? this.context.set(this.O, this.f)
        : (this.context[this.O] = this.f));
  };
  function x(a, b) {
    var c = u.filter(function(c) {
      return c.context == a && c.O == b;
    })[0];
    c || ((c = new oa(a, b)), u.push(c));
    return c;
  }
  function y(a, b, c, d, e) {
    if ('function' == typeof d) {
      var h = c.get('buildHitTask');
      return {
        buildHitTask: function(c) {
          c.set(a, null, !0);
          c.set(b, null, !0);
          d(c, e);
          h(c);
        },
      };
    }
    return z({}, a, b);
  }
  function A(a, b) {
    var c = ma(a),
      d = {};
    Object.keys(c).forEach(function(a) {
      if (!a.indexOf(b) && a != b + 'on') {
        var e = c[a];
        'true' == e && (e = !0);
        'false' == e && (e = !1);
        a = qa(a.slice(b.length));
        d[a] = e;
      }
    });
    return d;
  }
  function ra(a) {
    'loading' == document.readyState
      ? document.addEventListener('DOMContentLoaded', function c() {
          document.removeEventListener('DOMContentLoaded', c);
          a();
        })
      : a();
  }
  function sa(a, b) {
    var c;
    return function(d) {
      for (var e = [], h = 0; h < arguments.length; ++h)
        e[h - 0] = arguments[h];
      clearTimeout(c);
      c = setTimeout(function() {
        return a.apply(null, [].concat(m(e)));
      }, b);
    };
  }
  function ta(a) {
    function b() {
      c || ((c = !0), a());
    }
    var c = !1;
    setTimeout(b, 2e3);
    return b;
  }
  var z =
    Object.assign ||
    function(a, b) {
      for (var c = [], d = 1; d < arguments.length; ++d)
        c[d - 1] = arguments[d];
      for (var d = 0, e = c.length; d < e; d++) {
        var h = Object(c[d]),
          g;
        for (g in h)
          Object.prototype.hasOwnProperty.call(h, g) && (a[g] = h[g]);
      }
      return a;
    };
  function qa(a) {
    return a.replace(/[\-\_]+(\w?)/g, function(a, c) {
      return c.toUpperCase();
    });
  }
  function B(a) {
    return 'object' == typeof a && null !== a;
  }
  function C(a, b) {
    var c = window.GoogleAnalyticsObject || 'ga';
    window[c] =
      window[c] ||
      function(a) {
        for (var b = [], d = 0; d < arguments.length; ++d)
          b[d - 0] = arguments[d];
        (window[c].q = window[c].q || []).push(b);
      };
    window.gaDevIds = window.gaDevIds || [];
    0 > window.gaDevIds.indexOf('i5iSjo') && window.gaDevIds.push('i5iSjo');
    window[c]('provide', a, b);
    window.gaplugins = window.gaplugins || {};
    window.gaplugins[a.charAt(0).toUpperCase() + a.slice(1)] = b;
  }
  var D = { S: 1, T: 2, U: 3, W: 4, X: 5, Y: 6, Z: 7, $: 8, aa: 9, V: 10 },
    G = Object.keys(D).length;
  function H(a, b) {
    a.set('\x26_av', '2.1.1');
    var c = a.get('\x26_au'),
      c = parseInt(c || '0', 16).toString(2);
    if (c.length < G) for (var d = G - c.length; d; ) (c = '0' + c), d--;
    b = G - b;
    c = c.substr(0, b) + 1 + c.substr(b + 1);
    a.set('\x26_au', parseInt(c || '0', 2).toString(16));
  }
  function I(a, b) {
    H(a, D.S);
    this.a = z({}, b);
    this.i = a;
    this.b =
      this.a.stripQuery && this.a.queryDimensionIndex
        ? 'dimension' + this.a.queryDimensionIndex
        : null;
    this.f = this.f.bind(this);
    this.c = this.c.bind(this);
    b = this.f;
    v(x(a, 'get'), b);
    b = this.c;
    v(x(a, 'buildHitTask'), b);
  }
  I.prototype.f = function(a) {
    var b = this;
    return function(c) {
      if ('page' == c || c == b.b) {
        var d = { location: a('location'), page: a('page') };
        return ua(b, d)[c];
      }
      return a(c);
    };
  };
  I.prototype.c = function(a) {
    var b = this;
    return function(c) {
      var d = ua(b, { location: c.get('location'), page: c.get('page') });
      c.set(d, null, !0);
      a(c);
    };
  };
  function ua(a, b) {
    var c = t(b.page || b.location),
      d = c.pathname;
    if (a.a.indexFilename) {
      var e = d.split('/');
      a.a.indexFilename == e[e.length - 1] &&
        ((e[e.length - 1] = ''), (d = e.join('/')));
    }
    'remove' == a.a.trailingSlash
      ? (d = d.replace(/\/+$/, ''))
      : 'add' == a.a.trailingSlash &&
        (/\.\w+$/.test(d) || '/' == d.substr(-1) || (d += '/'));
    d = { page: d + (a.a.stripQuery ? '' : c.search) };
    b.location && (d.location = b.location);
    a.b && (d[a.b] = c.search.slice(1) || '(not set)');
    return 'function' == typeof a.a.urlFieldsFilter
      ? ((b = a.a.urlFieldsFilter(d, t)),
        (c = {}),
        (c.page = b.page),
        (c.location = b.location),
        (c[a.b] = b[a.b]),
        c)
      : d;
  }
  I.prototype.remove = function() {
    var a = this.f;
    w(x(this.i, 'get'), a);
    a = this.c;
    w(x(this.i, 'buildHitTask'), a);
  };
  C('cleanUrlTracker', I);
  function J(a, b) {
    var c = this;
    H(a, D.T);
    if (window.addEventListener) {
      this.a = z(
        { events: ['click'], fieldsObj: {}, attributePrefix: 'ga-' },
        b,
      );
      this.f = a;
      this.c = this.c.bind(this);
      var d = '[' + this.a.attributePrefix + 'on]';
      this.b = {};
      this.a.events.forEach(function(a) {
        c.b[a] = p(a, d, c.c);
      });
    }
  }
  J.prototype.c = function(a, b) {
    var c = this.a.attributePrefix;
    a.type == b.getAttribute(c + 'on') &&
      ((a = A(b, c)),
      (c = z({}, this.a.fieldsObj, a)),
      this.f.send(
        a.hitType || 'event',
        y({ transport: 'beacon' }, c, this.f, this.a.hitFilter, b),
      ));
  };
  J.prototype.remove = function() {
    var a = this;
    Object.keys(this.b).forEach(function(b) {
      a.b[b].j();
    });
  };
  C('eventTracker', J);
  function va(a, b) {
    var c = this;
    H(a, D.U);
    window.IntersectionObserver &&
      window.MutationObserver &&
      ((this.a = z(
        { rootMargin: '0px', fieldsObj: {}, attributePrefix: 'ga-' },
        b,
      )),
      (this.c = a),
      (this.L = this.L.bind(this)),
      (this.N = this.N.bind(this)),
      (this.J = this.J.bind(this)),
      (this.K = this.K.bind(this)),
      (this.b = null),
      (this.items = []),
      (this.h = {}),
      (this.g = {}),
      ra(function() {
        return c.observeElements(c.a.elements);
      }));
  }
  f = va.prototype;
  f.observeElements = function(a) {
    var b = this;
    a = K(this, a);
    this.items = this.items.concat(a.items);
    this.h = z({}, a.h, this.h);
    this.g = z({}, a.g, this.g);
    a.items.forEach(function(a) {
      var c = (b.g[a.threshold] =
        b.g[a.threshold] ||
        new IntersectionObserver(b.N, {
          rootMargin: b.a.rootMargin,
          threshold: [+a.threshold],
        }));
      (a = b.h[a.id] || (b.h[a.id] = document.getElementById(a.id))) &&
        c.observe(a);
    });
    this.b ||
      ((this.b = new MutationObserver(this.L)),
      this.b.observe(document.body, { childList: !0, subtree: !0 }));
    requestAnimationFrame(function() {});
  };
  f.unobserveElements = function(a) {
    var b = [],
      c = [];
    this.items.forEach(function(d) {
      a.some(function(a) {
        a = wa(a);
        return (
          a.id === d.id &&
          a.threshold === d.threshold &&
          a.trackFirstImpressionOnly === d.trackFirstImpressionOnly
        );
      })
        ? c.push(d)
        : b.push(d);
    });
    if (b.length) {
      var d = K(this, b),
        e = K(this, c);
      this.items = d.items;
      this.h = d.h;
      this.g = d.g;
      c.forEach(function(a) {
        if (!d.h[a.id]) {
          var b = e.g[a.threshold],
            c = e.h[a.id];
          c && b.unobserve(c);
          d.g[a.threshold] || e.g[a.threshold].disconnect();
        }
      });
    } else this.unobserveAllElements();
  };
  f.unobserveAllElements = function() {
    var a = this;
    Object.keys(this.g).forEach(function(b) {
      a.g[b].disconnect();
    });
    this.b.disconnect();
    this.b = null;
    this.items = [];
    this.h = {};
    this.g = {};
  };
  function K(a, b) {
    var c = [],
      d = {},
      e = {};
    b.length &&
      b.forEach(function(b) {
        b = wa(b);
        c.push(b);
        e[b.id] = a.h[b.id] || null;
        d[b.threshold] = a.g[b.threshold] || null;
      });
    return { items: c, h: e, g: d };
  }
  f.L = function(a) {
    for (var b = 0, c; (c = a[b]); b++) {
      for (var d = 0, e; (e = c.removedNodes[d]); d++) L(this, e, this.K);
      for (d = 0; (e = c.addedNodes[d]); d++) L(this, e, this.J);
    }
  };
  function L(a, b, c) {
    1 == b.nodeType && b.id in a.h && c(b.id);
    for (var d = 0, e; (e = b.childNodes[d]); d++) L(a, e, c);
  }
  f.N = function(a) {
    for (var b = [], c = 0, d; (d = a[c]); c++)
      for (var e = 0, h; (h = this.items[e]); e++) {
        var g;
        if ((g = d.target.id === h.id))
          (g = h.threshold)
            ? (g = d.intersectionRatio >= g)
            : ((g = d.intersectionRect),
              (g = 0 < g.top || 0 < g.bottom || 0 < g.left || 0 < g.right));
        if (g) {
          var E = h.id;
          g = document.getElementById(E);
          var E = {
              transport: 'beacon',
              eventCategory: 'Viewport',
              eventAction: 'impression',
              eventLabel: E,
              nonInteraction: !0,
            },
            Ga = z({}, this.a.fieldsObj, A(g, this.a.attributePrefix));
          this.c.send('event', y(E, Ga, this.c, this.a.hitFilter, g));
          h.trackFirstImpressionOnly && b.push(h);
        }
      }
    b.length && this.unobserveElements(b);
  };
  f.J = function(a) {
    var b = this,
      c = (this.h[a] = document.getElementById(a));
    this.items.forEach(function(d) {
      a == d.id && b.g[d.threshold].observe(c);
    });
  };
  f.K = function(a) {
    var b = this,
      c = this.h[a];
    this.items.forEach(function(d) {
      a == d.id && b.g[d.threshold].unobserve(c);
    });
    this.h[a] = null;
  };
  f.remove = function() {
    this.unobserveAllElements();
  };
  C('impressionTracker', va);
  function wa(a) {
    'string' == typeof a && (a = { id: a });
    return z({ threshold: 0, trackFirstImpressionOnly: !0 }, a);
  }
  function xa() {
    this.a = {};
  }
  xa.prototype.ba = function(a, b) {
    for (var c = [], d = 1; d < arguments.length; ++d) c[d - 1] = arguments[d];
    (this.a[a] = this.a[a] || []).forEach(function(a) {
      return a.apply(null, [].concat(m(c)));
    });
  };
  var M = {},
    N = !1,
    O;
  function P(a, b) {
    b = void 0 === b ? {} : b;
    this.a = {};
    this.b = a;
    this.v = b;
    this.l = null;
  }
  ha(P, xa);
  function Q(a, b, c) {
    a = ['autotrack', a, b].join(':');
    M[a] ||
      ((M[a] = new P(a, c)),
      N || (window.addEventListener('storage', ya), (N = !0)));
    return M[a];
  }
  function R() {
    if (null != O) return O;
    try {
      window.localStorage.setItem('autotrack', 'autotrack'),
        window.localStorage.removeItem('autotrack'),
        (O = !0);
    } catch (a) {
      O = !1;
    }
    return O;
  }
  P.prototype.get = function() {
    if (this.l) return this.l;
    if (R())
      try {
        this.l = S(window.localStorage.getItem(this.b));
      } catch (a) {}
    return (this.l = z({}, this.v, this.l));
  };
  P.prototype.set = function(a) {
    this.l = z({}, this.v, this.l, a);
    if (R())
      try {
        var b = JSON.stringify(this.l);
        window.localStorage.setItem(this.b, b);
      } catch (c) {}
  };
  function za(a) {
    a.l = {};
    if (R())
      try {
        window.localStorage.removeItem(a.b);
      } catch (b) {}
  }
  P.prototype.j = function() {
    delete M[this.b];
    Object.keys(M).length ||
      (window.removeEventListener('storage', ya), (N = !1));
  };
  function ya(a) {
    var b = M[a.key];
    if (b) {
      var c = z({}, b.v, S(a.oldValue));
      a = z({}, b.v, S(a.newValue));
      b.l = a;
      b.ba('externalSet', a, c);
    }
  }
  function S(a) {
    var b = {};
    if (a)
      try {
        b = JSON.parse(a);
      } catch (c) {}
    return b;
  }
  var Aa = {};
  function T(a, b, c) {
    this.f = a;
    this.timeout = b || U;
    this.timeZone = c;
    b = this.b = this.b.bind(this);
    v(x(a, 'sendHitTask'), b);
    try {
      this.c = new Intl.DateTimeFormat('en-US', { timeZone: this.timeZone });
    } catch (d) {}
    this.a = Q(a.get('trackingId'), 'session', { hitTime: 0, isExpired: !1 });
  }
  T.prototype.isExpired = function(a) {
    a = a ? a : this.a.get();
    if (a.isExpired) return !0;
    var b = new Date(),
      c = (a = a.hitTime) && new Date(a);
    return a &&
      (b - c > 6e4 * this.timeout ||
        (this.c && this.c.format(b) != this.c.format(c)))
      ? !0
      : !1;
  };
  T.prototype.b = function(a) {
    var b = this;
    return function(c) {
      a(c);
      var d = b.a.get(),
        e = b.isExpired(d);
      c = c.get('sessionControl');
      d.hitTime = +new Date();
      if ('start' == c || e) d.isExpired = !1;
      'end' == c && (d.isExpired = !0);
      b.a.set(d);
    };
  };
  T.prototype.j = function() {
    var a = this.b;
    w(x(this.f, 'sendHitTask'), a);
    this.a.j();
    delete Aa[this.f.get('trackingId')];
  };
  var U = 30;
  function V(a, b) {
    H(a, D.V);
    window.addEventListener &&
      ((this.a = z(
        { increaseThreshold: 20, sessionTimeout: U, fieldsObj: {} },
        b,
      )),
      (this.c = a),
      (this.b = Ba(this)),
      (this.f = sa(this.f.bind(this), 500)),
      (this.m = this.m.bind(this)),
      (this.i = Q(a.get('trackingId'), 'plugins/max-scroll-tracker')),
      (this.P = new T(a, this.a.sessionTimeout, this.a.timeZone)),
      (b = this.m),
      v(x(a, 'set'), b),
      Ca(this));
  }
  function Ca(a) {
    100 > (a.i.get()[a.b] || 0) && window.addEventListener('scroll', a.f);
  }
  V.prototype.f = function() {
    var a = document.documentElement,
      b = document.body,
      a = Math.min(
        100,
        Math.max(
          0,
          Math.round(
            (window.pageYOffset /
              (Math.max(
                a.offsetHeight,
                a.scrollHeight,
                b.offsetHeight,
                b.scrollHeight,
              ) -
                window.innerHeight)) *
              100,
          ),
        ),
      );
    if (this.P.isExpired()) za(this.i);
    else if (
      ((b = this.i.get()[this.b] || 0),
      a > b &&
        ((100 != a && 100 != b) || window.removeEventListener('scroll', this.f),
        (b = a - b),
        100 == a || b >= this.a.increaseThreshold))
    ) {
      var c = {};
      this.i.set(((c[this.b] = a), c));
      a = {
        transport: 'beacon',
        eventCategory: 'Max Scroll',
        eventAction: 'increase',
        eventValue: b,
        eventLabel: String(a),
        nonInteraction: !0,
      };
      this.a.maxScrollMetricIndex &&
        (a['metric' + this.a.maxScrollMetricIndex] = b);
      this.c.send('event', y(a, this.a.fieldsObj, this.c, this.a.hitFilter));
    }
  };
  V.prototype.m = function(a) {
    var b = this;
    return function(c, d) {
      a(c, d);
      var e = {};
      (B(c) ? c : ((e[c] = d), e)).page &&
        ((c = b.b), (b.b = Ba(b)), b.b != c && Ca(b));
    };
  };
  function Ba(a) {
    a = t(a.c.get('page') || a.c.get('location'));
    return a.pathname + a.search;
  }
  V.prototype.remove = function() {
    this.P.j();
    window.removeEventListener('scroll', this.f);
    var a = this.m;
    w(x(this.c, 'set'), a);
  };
  C('maxScrollTracker', V);
  var Da = {};
  function W(a, b) {
    H(a, D.W);
    window.matchMedia &&
      ((this.a = z(
        {
          changeTemplate: this.changeTemplate,
          changeTimeout: 1e3,
          fieldsObj: {},
        },
        b,
      )),
      B(this.a.definitions) &&
        ((b = this.a.definitions),
        (this.a.definitions = Array.isArray(b) ? b : [b]),
        (this.b = a),
        (this.c = []),
        Ea(this)));
  }
  function Ea(a) {
    a.a.definitions.forEach(function(b) {
      if (b.name && b.dimensionIndex) {
        var c = Fa(b);
        a.b.set('dimension' + b.dimensionIndex, c);
        Ha(a, b);
      }
    });
  }
  function Fa(a) {
    var b;
    a.items.forEach(function(a) {
      Ia(a.media).matches && (b = a);
    });
    return b ? b.name : '(not set)';
  }
  function Ha(a, b) {
    b.items.forEach(function(c) {
      c = Ia(c.media);
      var d = sa(function() {
        var c = Fa(b),
          d = a.b.get('dimension' + b.dimensionIndex);
        c !== d &&
          (a.b.set('dimension' + b.dimensionIndex, c),
          (c = {
            transport: 'beacon',
            eventCategory: b.name,
            eventAction: 'change',
            eventLabel: a.a.changeTemplate(d, c),
            nonInteraction: !0,
          }),
          a.b.send('event', y(c, a.a.fieldsObj, a.b, a.a.hitFilter)));
      }, a.a.changeTimeout);
      c.addListener(d);
      a.c.push({ da: c, ca: d });
    });
  }
  W.prototype.remove = function() {
    for (var a = 0, b; (b = this.c[a]); a++) b.da.removeListener(b.ca);
  };
  W.prototype.changeTemplate = function(a, b) {
    return a + ' \x3d\x3e ' + b;
  };
  C('mediaQueryTracker', W);
  function Ia(a) {
    return Da[a] || (Da[a] = window.matchMedia(a));
  }
  function X(a, b) {
    H(a, D.X);
    window.addEventListener &&
      ((this.a = z(
        {
          formSelector: 'form',
          shouldTrackOutboundForm: this.shouldTrackOutboundForm,
          fieldsObj: {},
          attributePrefix: 'ga-',
        },
        b,
      )),
      (this.b = a),
      (this.c = p('submit', this.a.formSelector, this.f.bind(this))));
  }
  X.prototype.f = function(a, b) {
    var c = {
      transport: 'beacon',
      eventCategory: 'Outbound Form',
      eventAction: 'submit',
      eventLabel: t(b.action).href,
    };
    this.a.shouldTrackOutboundForm(b, t) &&
      (navigator.sendBeacon ||
        (a.preventDefault(),
        (c.hitCallback = ta(function() {
          b.submit();
        }))),
      (a = z({}, this.a.fieldsObj, A(b, this.a.attributePrefix))),
      this.b.send('event', y(c, a, this.b, this.a.hitFilter, b)));
  };
  X.prototype.shouldTrackOutboundForm = function(a, b) {
    a = b(a.action);
    return a.hostname != location.hostname && 'http' == a.protocol.slice(0, 4);
  };
  X.prototype.remove = function() {
    this.c.j();
  };
  C('outboundFormTracker', X);
  function Y(a, b) {
    var c = this;
    H(a, D.Y);
    window.addEventListener &&
      ((this.a = z(
        {
          events: ['click'],
          linkSelector: 'a, area',
          shouldTrackOutboundLink: this.shouldTrackOutboundLink,
          fieldsObj: {},
          attributePrefix: 'ga-',
        },
        b,
      )),
      (this.f = a),
      (this.c = this.c.bind(this)),
      (this.b = {}),
      this.a.events.forEach(function(a) {
        c.b[a] = p(a, c.a.linkSelector, c.c);
      }));
  }
  Y.prototype.c = function(a, b) {
    if (this.a.shouldTrackOutboundLink(b, t)) {
      var c = b.getAttribute('href') || b.getAttribute('xlink:href'),
        d = t(c),
        e = {
          transport: 'beacon',
          eventCategory: 'Outbound Link',
          eventAction: a.type,
          eventLabel: d.href,
        };
      navigator.sendBeacon ||
        'click' != a.type ||
        '_blank' == b.target ||
        a.metaKey ||
        a.ctrlKey ||
        a.shiftKey ||
        a.altKey ||
        1 < a.which ||
        window.addEventListener('click', function(a) {
          a.defaultPrevented ||
            (a.preventDefault(),
            (e.hitCallback = ta(function() {
              location.href = c;
            })));
        });
      a = z({}, this.a.fieldsObj, A(b, this.a.attributePrefix));
      this.f.send('event', y(e, a, this.f, this.a.hitFilter, b));
    }
  };
  Y.prototype.shouldTrackOutboundLink = function(a, b) {
    a = a.getAttribute('href') || a.getAttribute('xlink:href');
    b = b(a);
    return b.hostname != location.hostname && 'http' == b.protocol.slice(0, 4);
  };
  Y.prototype.remove = function() {
    var a = this;
    Object.keys(this.b).forEach(function(b) {
      a.b[b].j();
    });
  };
  C('outboundLinkTracker', Y);
  var Z = (function Ja(b) {
    return b
      ? (b ^ ((16 * Math.random()) >> (b / 4))).toString(16)
      : '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, Ja);
  })();
  function Ka(a, b) {
    H(a, D.Z);
    if (document.visibilityState) {
      this.a = z(
        { sessionTimeout: U, visibleThreshold: 5e3, fieldsObj: {} },
        b,
      );
      this.c = a;
      this.i = this.f = null;
      this.u = this.u.bind(this);
      this.o = this.o.bind(this);
      this.F = this.F.bind(this);
      this.M = this.M.bind(this);
      this.b = Q(a.get('trackingId'), 'plugins/page-visibility-tracker');
      b = this.M;
      var c = this.b;
      (c.a.externalSet = c.a.externalSet || []).push(b);
      this.m = new T(a, this.a.sessionTimeout, this.a.timeZone);
      b = this.u;
      v(x(a, 'set'), b);
      window.addEventListener('unload', this.F);
      document.addEventListener('visibilitychange', this.o);
      'visible' == document.visibilityState && this.o();
    }
  }
  f = Ka.prototype;
  f.o = function() {
    var a = this;
    if (
      'visible' == document.visibilityState ||
      'hidden' == document.visibilityState
    ) {
      var b = La(this, this.b.get()),
        c = { time: +new Date(), state: document.visibilityState, pageId: Z };
      this.i && 'hidden' == document.visibilityState && clearTimeout(this.i);
      this.m.isExpired()
        ? 'hidden' == this.f && 'visible' == document.visibilityState
          ? (clearTimeout(this.i),
            (this.i = setTimeout(function() {
              a.c.send(
                'pageview',
                y(
                  { transport: 'beacon', queueTime: +new Date() - c.time },
                  a.a.fieldsObj,
                  a.c,
                  a.a.hitFilter,
                ),
              );
              a.b.set(c);
            }, this.a.visibleThreshold)))
          : 'hidden' == document.visibilityState && za(this.b)
        : (b.pageId == Z && 'visible' == b.state && Ma(this, b), this.b.set(c));
      this.f = document.visibilityState;
    }
  };
  function La(a, b) {
    'visible' == a.f &&
      'hidden' == b.state &&
      b.pageId != Z &&
      ((b.state = 'visible'), (b.pageId = Z), a.b.set(b));
    return b;
  }
  function Ma(a, b, c) {
    var d = c,
      d = void 0 === d ? +new Date() : d,
      e = !a.m.isExpired();
    b = b.time && d - b.time;
    (e = e && 0 < b ? b : 0) &&
      e >= a.a.visibleThreshold &&
      ((e = Math.round(e / 1e3)),
      (b = {
        transport: 'beacon',
        nonInteraction: !0,
        eventCategory: 'Page Visibility',
        eventAction: 'track',
        eventValue: e,
        eventLabel: '(not set)',
      }),
      c && (b.queueTime = +new Date() - c),
      a.a.visibleMetricIndex && (b['metric' + a.a.visibleMetricIndex] = e),
      a.c.send('event', y(b, a.a.fieldsObj, a.c, a.a.hitFilter)));
  }
  f.u = function(a) {
    var b = this;
    return function(c, d) {
      var e = {},
        e = B(c) ? c : ((e[c] = d), e);
      e.page && e.page !== b.c.get('page') && 'visible' == b.f && b.o();
      a(c, d);
    };
  };
  f.M = function(a, b) {
    a.time != b.time &&
      b.pageId == Z &&
      'visible' == b.state &&
      Ma(this, b, a.time);
  };
  f.F = function() {
    'hidden' != this.f && this.o();
  };
  f.remove = function() {
    this.b.j();
    this.m.j();
    var a = this.u;
    w(x(this.c, 'set'), a);
    window.removeEventListener('unload', this.F);
    document.removeEventListener('visibilitychange', this.o);
  };
  C('pageVisibilityTracker', Ka);
  function Na(a, b) {
    H(a, D.$);
    window.addEventListener &&
      ((this.a = z({ fieldsObj: {}, hitFilter: null }, b)),
      (this.b = a),
      (this.s = this.s.bind(this)),
      (this.I = this.I.bind(this)),
      (this.C = this.C.bind(this)),
      (this.w = this.w.bind(this)),
      (this.A = this.A.bind(this)),
      (this.D = this.D.bind(this)),
      'complete' != document.readyState
        ? window.addEventListener('load', this.s)
        : this.s());
  }
  f = Na.prototype;
  f.s = function() {
    if (window.FB)
      try {
        window.FB.Event.subscribe('edge.create', this.A),
          window.FB.Event.subscribe('edge.remove', this.D);
      } catch (a) {}
    window.twttr && this.I();
  };
  f.I = function() {
    var a = this;
    try {
      window.twttr.ready(function() {
        window.twttr.events.bind('tweet', a.C);
        window.twttr.events.bind('follow', a.w);
      });
    } catch (b) {}
  };
  function Oa(a) {
    try {
      window.twttr.ready(function() {
        window.twttr.events.unbind('tweet', a.C);
        window.twttr.events.unbind('follow', a.w);
      });
    } catch (b) {}
  }
  f.C = function(a) {
    'tweet' == a.region &&
      ((a = {
        transport: 'beacon',
        socialNetwork: 'Twitter',
        socialAction: 'tweet',
        socialTarget:
          a.data.url || a.target.getAttribute('data-url') || location.href,
      }),
      this.b.send('social', y(a, this.a.fieldsObj, this.b, this.a.hitFilter)));
  };
  f.w = function(a) {
    'follow' == a.region &&
      ((a = {
        transport: 'beacon',
        socialNetwork: 'Twitter',
        socialAction: 'follow',
        socialTarget:
          a.data.screen_name || a.target.getAttribute('data-screen-name'),
      }),
      this.b.send('social', y(a, this.a.fieldsObj, this.b, this.a.hitFilter)));
  };
  f.A = function(a) {
    this.b.send(
      'social',
      y(
        {
          transport: 'beacon',
          socialNetwork: 'Facebook',
          socialAction: 'like',
          socialTarget: a,
        },
        this.a.fieldsObj,
        this.b,
        this.a.hitFilter,
      ),
    );
  };
  f.D = function(a) {
    this.b.send(
      'social',
      y(
        {
          transport: 'beacon',
          socialNetwork: 'Facebook',
          socialAction: 'unlike',
          socialTarget: a,
        },
        this.a.fieldsObj,
        this.b,
        this.a.hitFilter,
      ),
    );
  };
  f.remove = function() {
    window.removeEventListener('load', this.s);
    try {
      window.FB.Event.unsubscribe('edge.create', this.A),
        window.FB.Event.unsubscribe('edge.remove', this.D);
    } catch (a) {}
    Oa(this);
  };
  C('socialWidgetTracker', Na);
  function Pa(a, b) {
    H(a, D.aa);
    history.pushState &&
      window.addEventListener &&
      ((this.a = z(
        {
          shouldTrackUrlChange: this.shouldTrackUrlChange,
          trackReplaceState: !1,
          fieldsObj: {},
          hitFilter: null,
        },
        b,
      )),
      (this.b = a),
      (this.c = location.pathname + location.search),
      (this.G = this.G.bind(this)),
      (this.H = this.H.bind(this)),
      (this.B = this.B.bind(this)),
      (a = this.G),
      v(x(history, 'pushState'), a),
      (a = this.H),
      v(x(history, 'replaceState'), a),
      window.addEventListener('popstate', this.B));
  }
  f = Pa.prototype;
  f.G = function(a) {
    var b = this;
    return function(c) {
      for (var d = [], e = 0; e < arguments.length; ++e)
        d[e - 0] = arguments[e];
      a.apply(null, [].concat(m(d)));
      Qa(b, !0);
    };
  };
  f.H = function(a) {
    var b = this;
    return function(c) {
      for (var d = [], e = 0; e < arguments.length; ++e)
        d[e - 0] = arguments[e];
      a.apply(null, [].concat(m(d)));
      Qa(b, !1);
    };
  };
  f.B = function() {
    Qa(this, !0);
  };
  function Qa(a, b) {
    setTimeout(function() {
      var c = a.c,
        d = location.pathname + location.search;
      c != d &&
        a.a.shouldTrackUrlChange.call(a, d, c) &&
        ((a.c = d),
        a.b.set({ page: d, title: document.title }),
        (b || a.a.trackReplaceState) &&
          a.b.send(
            'pageview',
            y({ transport: 'beacon' }, a.a.fieldsObj, a.b, a.a.hitFilter),
          ));
    }, 0);
  }
  f.shouldTrackUrlChange = function(a, b) {
    return !(!a || !b);
  };
  f.remove = function() {
    var a = this.G;
    w(x(history, 'pushState'), a);
    a = this.H;
    w(x(history, 'replaceState'), a);
    window.removeEventListener('popstate', this.B);
  };
  C('urlChangeTracker', Pa);
})();
//# sourceMappingURL=autotrack.js.map
