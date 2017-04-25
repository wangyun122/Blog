webpackJsonp([1], [, , , , , , , function(e, t, n) {
  n(29);
  var r = n(5)(n(9), n(34), null, null);
  e.exports = r.exports
}, , function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = n(32),
    a = n.n(r);
  t.default = {
    name: "app",
    components: {
      iTextarea: a.a
    },
    data: function() {
      return {
        value: ""
      }
    }
  }
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = n(13),
    a = n.n(r),
    i = n(11);
  t.default = {
    name: "iTextarea",
    props: {
      placeholder: {
        type: String,
        default: ""
      },
      value: {
        type: [String, Number],
        default: ""
      },
      autosize: {
        type: [Boolean, Object],
        default: !0
      },
      rows: {
        type: Number,
        default: 2
      },
      max: Number
    },
    data: function() {
      return {
        currentValue: this.value,
        textareaStyles: {}
      }
    },
    methods: {
      setCurrentValue: function(e) {
        var t = this;
        e !== this.currentValue && (this.$nextTick(function() {
          t.resizeTextarea()
        }), this.currentValue = e)
      },
      handleInput: function(e) {
        var t = e.target.value;
        this.number && (t = a()(Number(t)) ? t : Number(t)), this.setCurrentValue(t)
      },
      resizeTextarea: function() {
        var e = this.autosize;
        if (!e) return !1;
        var t = e.minRows,
          r = e.maxRows;
        this.textareaStyles = n.i(i.a)(this.$refs.textarea, t, r)
      }
    },
    watch: {
      value: function(e) {
        this.setCurrentValue(e)
      }
    },
    mounted: function() {
      this.resizeTextarea()
    }
  }
}, function(e, t, n) {
  "use strict";

  function r(e) {
    var t = window.getComputedStyle(e),
      n = t.getPropertyValue("box-sizing"),
      r = parseFloat(t.getPropertyValue("padding-bottom")) + parseFloat(t.getPropertyValue("padding-top")),
      a = parseFloat(t.getPropertyValue("border-bottom-width")) + parseFloat(t.getPropertyValue("border-top-width"));
    return {
      contextStyle: u.map(function(e) {
        return e + ":" + t.getPropertyValue(e)
      }).join(";"),
      paddingSize: r,
      borderSize: a,
      boxSizing: n
    }
  }

  function a(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
      n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
    i || (i = document.createElement("textarea"), document.body.appendChild(i));
    var a = r(e),
      u = a.paddingSize,
      l = a.borderSize,
      s = a.boxSizing,
      p = a.contextStyle;
    i.setAttribute("style", p + ";" + o), i.value = e.value || e.placeholder || "";
    var d = i.scrollHeight,
      c = -1 / 0,
      h = 1 / 0;
    "border-box" === s ? d += l : "content-box" === s && (d -= u), i.value = "";
    var m = i.scrollHeight - u;
    return null !== t && (c = m * t, "border-box" === s && (c = c + u + l), d = Math.max(c, d)), null !== n && (h = m * n, "border-box" === s && (h = h + u + l), d = Math.min(h, d)), {
      height: d + "px",
      minHeight: c + "px",
      maxHeight: h + "px"
    }
  }
  t.a = a;
  var i = void 0,
    o = "\n    height:0 !important;\n    min-height:0 !important;\n    max-height:none !important;\n    visibility:hidden !important;\n    overflow:hidden !important;\n    position:absolute !important;\n    z-index:-1000 !important;\n    top:0 !important;\n    right:0 !important\n",
    u = ["letter-spacing", "line-height", "padding-top", "padding-bottom", "font-family", "font-weight", "font-size", "text-rendering", "text-transform", "width", "text-indent", "padding-left", "padding-right", "border-width", "box-sizing"]
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = n(8),
    a = n(7),
    i = n.n(a);
  r.a.config.productionTip = !1, new r.a({
    el: "#app",
    template: "<app>",
    components: {
      App: i.a
    }
  })
}, , , , , , , , , , , , , , , , function(e, t) {}, function(e, t) {}, , , function(e, t, n) {
  n(28);
  var r = n(5)(n(10), n(33), null, null);
  e.exports = r.exports
}, function(e, t) {
  e.exports = {
    render: function() {
      var e = this,
        t = e.$createElement,
        n = e._self._c || t;
      return n("div", {
        staticClass: "wrapper"
      }, [n("textarea", {
        ref: "textarea",
        staticClass: "i-input",
        style: e.textareaStyles,
        attrs: {
          rows: e.rows,
          placeholder: e.placeholder,
          max: e.max
        },
        domProps: {
          value: e.currentValue
        },
        on: {
          input: e.handleInput
        }
      })])
    },
    staticRenderFns: []
  }
}, function(e, t) {
  e.exports = {
    render: function() {
      var e = this,
        t = e.$createElement,
        n = e._self._c || t;
      return n("div", {
        staticStyle: {},
        attrs: {
          id: "app"
        }
      }, [n("i-textarea", {
        attrs: {
          rows: 4,
          placeholder: "请输入..."
        },
        model: {
          value: e.value,
          callback: function(t) {
            e.value = t
          },
          expression: "value"
        }
      })], 1)
    },
    staticRenderFns: []
  }
}], [12]);
//# sourceMappingURL=app.62d70b60d2d2710dc574.js.map</app>