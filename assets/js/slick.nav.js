/*!
 * SlickNav Responsive Mobile Menu v1.0.10
 * (c) 2016 Josh Cope
 * licensed under MIT
 */
!(function (e, t, n) {
  function a(t, n) {
    (this.element = t),
      (this.settings = e.extend({}, i, n)),
      this.settings.duplicate ||
        n.hasOwnProperty("removeIds") ||
        (this.settings.removeIds = !1),
      (this._defaults = i),
      (this._name = s),
      this.init();
  }
  var i = {
      label: "MENU",
      duplicate: !0,
      duration: 200,
      easingOpen: "swing",
      easingClose: "swing",
      closedSymbol: "&#9658;",
      openedSymbol: "&#9660;",
      prependTo: "body",
      appendTo: "",
      parentTag: "a",
      closeOnClick: !1,
      allowParentLinks: !1,
      nestedParentLinks: !0,
      showChildren: !1,
      removeIds: !0,
      removeClasses: !1,
      removeStyles: !1,
      brand: "",
      animations: "jquery",
      init: function () {},
      beforeOpen: function () {},
      beforeClose: function () {},
      afterOpen: function () {},
      afterClose: function () {},
    },
    s = "slicknav",
    o = "slicknav",
    l = {
      DOWN: 40,
      ENTER: 13,
      ESCAPE: 27,
      LEFT: 37,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38,
    };
  (a.prototype.init = function () {
    var n,
      a,
      i = this,
      s = e(this.element),
      r = this.settings;
    if (
      (r.duplicate ? (i.mobileNav = s.clone()) : (i.mobileNav = s),
      r.removeIds &&
        (i.mobileNav.removeAttr("id"),
        i.mobileNav.find("*").each(function (t, n) {
          e(n).removeAttr("id");
        })),
      r.removeClasses &&
        (i.mobileNav.removeAttr("class"),
        i.mobileNav.find("*").each(function (t, n) {
          e(n).removeAttr("class");
        })),
      r.removeStyles &&
        (i.mobileNav.removeAttr("style"),
        i.mobileNav.find("*").each(function (t, n) {
          e(n).removeAttr("style");
        })),
      (n = o + "_icon"),
      "" === r.label && (n += " " + o + "_no-text"),
      "a" == r.parentTag && (r.parentTag = 'a href="#"'),
      i.mobileNav.attr("class", o + "_nav"),
      (a = e('<div class="' + o + '_menu"></div>')),
      "" !== r.brand)
    ) {
      var c = e('<div class="' + o + '_brand">' + r.brand + "</div>");
      e(a).append(c);
    }
    (i.btn = e(
      [
        "<" +
          r.parentTag +
          ' aria-haspopup="true" role="button" tabindex="0" class="' +
          o +
          "_btn " +
          o +
          '_collapsed">',
        '<span class="' + o + '_menutxt">' + r.label + "</span>",
        '<span class="' + n + '">',
        '<span class="' + o + '_icon-bar"></span>',
        '<span class="' + o + '_icon-bar"></span>',
        '<span class="' + o + '_icon-bar"></span>',
        "</span>",
        "</" + r.parentTag + ">",
      ].join("")
    )),
      e(a).append(i.btn),
      "" !== r.appendTo ? e(r.appendTo).append(a) : e(r.prependTo).prepend(a),
      a.append(i.mobileNav);
    var p = i.mobileNav.find("li");
    e(p).each(function () {
      var t = e(this),
        n = {};
      if (
        ((n.children = t.children("ul").attr("role", "menu")),
        t.data("menu", n),
        n.children.length > 0)
      ) {
        var a = t.contents(),
          s = !1,
          l = [];
        e(a).each(function () {
          return e(this).is("ul")
            ? !1
            : (l.push(this), void (e(this).is("a") && (s = !0)));
        });
        var c = e(
          "<" +
            r.parentTag +
            ' role="menuitem" aria-haspopup="true" tabindex="-1" class="' +
            o +
            '_item"/>'
        );
        if (r.allowParentLinks && !r.nestedParentLinks && s)
          e(l)
            .wrapAll('<span class="' + o + "_parent-link " + o + '_row"/>')
            .parent();
        else {
          var p = e(l).wrapAll(c).parent();
          p.addClass(o + "_row");
        }
        r.showChildren ? t.addClass(o + "_open") : t.addClass(o + "_collapsed"),
          t.addClass(o + "_parent");
        var d = e(
          '<span class="' +
            o +
            '_arrow">' +
            (r.showChildren ? r.openedSymbol : r.closedSymbol) +
            "</span>"
        );
        r.allowParentLinks &&
          !r.nestedParentLinks &&
          s &&
          (d = d.wrap(c).parent()),
          e(l).last().after(d);
      } else 0 === t.children().length && t.addClass(o + "_txtnode");
      t
        .children("a")
        .attr("role", "menuitem")
        .click(function (t) {
          r.closeOnClick &&
            !e(t.target)
              .parent()
              .closest("li")
              .hasClass(o + "_parent") &&
            e(i.btn).click();
        }),
        r.closeOnClick &&
          r.allowParentLinks &&
          (t
            .children("a")
            .children("a")
            .click(function (t) {
              e(i.btn).click();
            }),
          t
            .find("." + o + "_parent-link a:not(." + o + "_item)")
            .click(function (t) {
              e(i.btn).click();
            }));
    }),
      e(p).each(function () {
        var t = e(this).data("menu");
        r.showChildren || i._visibilityToggle(t.children, null, !1, null, !0);
      }),
      i._visibilityToggle(i.mobileNav, null, !1, "init", !0),
      i.mobileNav.attr("role", "menu"),
      e(t).mousedown(function () {
        i._outlines(!1);
      }),
      e(t).keyup(function () {
        i._outlines(!0);
      }),
      e(i.btn).click(function (e) {
        e.preventDefault(), i._menuToggle();
      }),
      i.mobileNav.on("click", "." + o + "_item", function (t) {
        t.preventDefault(), i._itemClick(e(this));
      }),
      e(i.btn).keydown(function (t) {
        var n = t || event;
        switch (n.keyCode) {
          case l.ENTER:
          case l.SPACE:
          case l.DOWN:
            t.preventDefault(),
              (n.keyCode === l.DOWN && e(i.btn).hasClass(o + "_open")) ||
                i._menuToggle(),
              e(i.btn).next().find('[role="menuitem"]').first().focus();
        }
      }),
      i.mobileNav.on("keydown", "." + o + "_item", function (t) {
        var n = t || event;
        switch (n.keyCode) {
          case l.ENTER:
            t.preventDefault(), i._itemClick(e(t.target));
            break;
          case l.RIGHT:
            t.preventDefault(),
              e(t.target)
                .parent()
                .hasClass(o + "_collapsed") && i._itemClick(e(t.target)),
              e(t.target).next().find('[role="menuitem"]').first().focus();
        }
      }),
      i.mobileNav.on("keydown", '[role="menuitem"]', function (t) {
        var n = t || event;
        switch (n.keyCode) {
          case l.DOWN:
            t.preventDefault();
            var a = e(t.target)
                .parent()
                .parent()
                .children()
                .children('[role="menuitem"]:visible'),
              s = a.index(t.target),
              r = s + 1;
            a.length <= r && (r = 0);
            var c = a.eq(r);
            c.focus();
            break;
          case l.UP:
            t.preventDefault();
            var a = e(t.target)
                .parent()
                .parent()
                .children()
                .children('[role="menuitem"]:visible'),
              s = a.index(t.target),
              c = a.eq(s - 1);
            c.focus();
            break;
          case l.LEFT:
            if (
              (t.preventDefault(),
              e(t.target)
                .parent()
                .parent()
                .parent()
                .hasClass(o + "_open"))
            ) {
              var p = e(t.target).parent().parent().prev();
              p.focus(), i._itemClick(p);
            } else
              e(t.target)
                .parent()
                .parent()
                .hasClass(o + "_nav") && (i._menuToggle(), e(i.btn).focus());
            break;
          case l.ESCAPE:
            t.preventDefault(), i._menuToggle(), e(i.btn).focus();
        }
      }),
      r.allowParentLinks &&
        r.nestedParentLinks &&
        e("." + o + "_item a").click(function (e) {
          e.stopImmediatePropagation();
        });
  }),
    (a.prototype._menuToggle = function (e) {
      var t = this,
        n = t.btn,
        a = t.mobileNav;
      n.hasClass(o + "_collapsed")
        ? (n.removeClass(o + "_collapsed"), n.addClass(o + "_open"))
        : (n.removeClass(o + "_open"), n.addClass(o + "_collapsed")),
        n.addClass(o + "_animating"),
        t._visibilityToggle(a, n.parent(), !0, n);
    }),
    (a.prototype._itemClick = function (e) {
      var t = this,
        n = t.settings,
        a = e.data("menu");
      a ||
        ((a = {}),
        (a.arrow = e.children("." + o + "_arrow")),
        (a.ul = e.next("ul")),
        (a.parent = e.parent()),
        a.parent.hasClass(o + "_parent-link") &&
          ((a.parent = e.parent().parent()), (a.ul = e.parent().next("ul"))),
        e.data("menu", a)),
        a.parent.hasClass(o + "_collapsed")
          ? (a.arrow.html(n.openedSymbol),
            a.parent.removeClass(o + "_collapsed"),
            a.parent.addClass(o + "_open"),
            a.parent.addClass(o + "_animating"),
            t._visibilityToggle(a.ul, a.parent, !0, e))
          : (a.arrow.html(n.closedSymbol),
            a.parent.addClass(o + "_collapsed"),
            a.parent.removeClass(o + "_open"),
            a.parent.addClass(o + "_animating"),
            t._visibilityToggle(a.ul, a.parent, !0, e));
    }),
    (a.prototype._visibilityToggle = function (t, n, a, i, s) {
      function l(t, n) {
        e(t).removeClass(o + "_animating"),
          e(n).removeClass(o + "_animating"),
          s || p.afterOpen(t);
      }
      function r(n, a) {
        t.attr("aria-hidden", "true"),
          d.attr("tabindex", "-1"),
          c._setVisAttr(t, !0),
          t.hide(),
          e(n).removeClass(o + "_animating"),
          e(a).removeClass(o + "_animating"),
          s ? "init" == n && p.init() : p.afterClose(n);
      }
      var c = this,
        p = c.settings,
        d = c._getActionItems(t),
        u = 0;
      a && (u = p.duration),
        t.hasClass(o + "_hidden")
          ? (t.removeClass(o + "_hidden"),
            s || p.beforeOpen(i),
            "jquery" === p.animations
              ? t.stop(!0, !0).slideDown(u, p.easingOpen, function () {
                  l(i, n);
                })
              : "velocity" === p.animations &&
                t.velocity("finish").velocity("slideDown", {
                  duration: u,
                  easing: p.easingOpen,
                  complete: function () {
                    l(i, n);
                  },
                }),
            t.attr("aria-hidden", "false"),
            d.attr("tabindex", "0"),
            c._setVisAttr(t, !1))
          : (t.addClass(o + "_hidden"),
            s || p.beforeClose(i),
            "jquery" === p.animations
              ? t
                  .stop(!0, !0)
                  .slideUp(u, this.settings.easingClose, function () {
                    r(i, n);
                  })
              : "velocity" === p.animations &&
                t.velocity("finish").velocity("slideUp", {
                  duration: u,
                  easing: p.easingClose,
                  complete: function () {
                    r(i, n);
                  },
                }));
    }),
    (a.prototype._setVisAttr = function (t, n) {
      var a = this,
        i = t
          .children("li")
          .children("ul")
          .not("." + o + "_hidden");
      n
        ? i.each(function () {
            var t = e(this);
            t.attr("aria-hidden", "true");
            var i = a._getActionItems(t);
            i.attr("tabindex", "-1"), a._setVisAttr(t, n);
          })
        : i.each(function () {
            var t = e(this);
            t.attr("aria-hidden", "false");
            var i = a._getActionItems(t);
            i.attr("tabindex", "0"), a._setVisAttr(t, n);
          });
    }),
    (a.prototype._getActionItems = function (e) {
      var t = e.data("menu");
      if (!t) {
        t = {};
        var n = e.children("li"),
          a = n.find("a");
        (t.links = a.add(n.find("." + o + "_item"))), e.data("menu", t);
      }
      return t.links;
    }),
    (a.prototype._outlines = function (t) {
      t
        ? e("." + o + "_item, ." + o + "_btn").css("outline", "")
        : e("." + o + "_item, ." + o + "_btn").css("outline", "none");
    }),
    (a.prototype.toggle = function () {
      var e = this;
      e._menuToggle();
    }),
    (a.prototype.open = function () {
      var e = this;
      e.btn.hasClass(o + "_collapsed") && e._menuToggle();
    }),
    (a.prototype.close = function () {
      var e = this;
      e.btn.hasClass(o + "_open") && e._menuToggle();
    }),
    (e.fn[s] = function (t) {
      var n = arguments;
      if (void 0 === t || "object" == typeof t)
        return this.each(function () {
          e.data(this, "plugin_" + s) ||
            e.data(this, "plugin_" + s, new a(this, t));
        });
      if ("string" == typeof t && "_" !== t[0] && "init" !== t) {
        var i;
        return (
          this.each(function () {
            var o = e.data(this, "plugin_" + s);
            o instanceof a &&
              "function" == typeof o[t] &&
              (i = o[t].apply(o, Array.prototype.slice.call(n, 1)));
          }),
          void 0 !== i ? i : this
        );
      }
    });
})(jQuery, document, window);
