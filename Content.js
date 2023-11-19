
var element = document.querySelector(".navLinks.desktop");

var OgvCtrl = {
        ogv: null,
        cnt: null,
        ctrl: {},
        seeking: !1,
        visible: !1,
        tick: null,
        attach: function (e) {
            this.detach(), e.parentNode.appendChild(this.cnt), $.on(e, "mouseup", this.toggleCtrl), (this.ogv = e);
        },
        detach: function () {
            this.ogv &&
                (this.ogv.stop(),
                $.off(this.ogv, "mouseup", this.toggleCtrl),
                this.ctrl.play.classList.remove("ogv-toggled"),
                this.ctrl.mute.classList.remove("ogv-toggled"),
                this.hideCtrl(),
                (this.ogv = null),
                (this.seeking = !1),
                this.cnt.remove());
        },
        init: function () {
            if (this.cnt) return;
            let e = $.el("div");
            e.className = "ogv-ctrl";
            let t = $.el("div");
            (t.className = "ogv-btn"),
                (t.innerHTML =
                    '<svg width="28" height="28" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/></svg><svg width="28" height="28" fill="currentColor" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>'),
                $.on(t, "click", this.togglePlay, !1),
                (this.ctrl.play = t),
                e.appendChild(t),
                ((t = $.el("input")).className = "ogv-seek"),
                (t.type = "range"),
                (t.min = 0),
                (t.value = 0),
                (t.max = 100),
                (t.step = 0.1),
                $.on(t, "change", this.onSeek, !1),
                $.on(t, "mousedown", this.toggleSeek, !1),
                $.on(t, "mouseup", this.toggleSeek, !1),
                (this.ctrl.seek = t),
                e.appendChild(t),
                ((t = $.el("div")).className = "ogv-ts"),
                (t.textContent = "0:00 / 0:00"),
                (this.ctrl.ts = t),
                e.appendChild(t),
                ((t = $.el("div")).className = "ogv-btn"),
                (t.innerHTML =
                    '<svg width="28" height="28" fill="currentColor" viewBox="0 0 16 16"><path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/><path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/><path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/></svg><svg width="28" height="28" fill="currentColor" viewBox="0 0 16 16"><path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/></svg>'),
                $.on(t, "click", this.toggleMute, !1),
                (this.ctrl.mute = t),
                e.appendChild(t),
                ((t = $.el("input")).className = "ogv-vol"),
                (t.type = "range"),
                (t.min = 0),
                (t.value = 50),
                (t.step = 0.1),
                (t.max = 100),
                $.on(t, "input", this.onVolInput, !1),
                (this.ctrl.vol = t),
                e.appendChild(t),
                ((t = $.el("div")).className = "ogv-btn"),
                (t.innerHTML =
                    '<svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344 0a.5.5 0 0 1 .707 0l4.096 4.096V11.5a.5.5 0 1 1 1 0v3.975a.5.5 0 0 1-.5.5H11.5a.5.5 0 0 1 0-1h2.768l-4.096-4.096a.5.5 0 0 1 0-.707zm0-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707zm-4.344 0a.5.5 0 0 1-.707 0L1.025 1.732V4.5a.5.5 0 0 1-1 0V.525a.5.5 0 0 1 .5-.5H4.5a.5.5 0 0 1 0 1H1.732l4.096 4.096a.5.5 0 0 1 0 .707z"/></svg><svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/></svg>'),
                $.on(t, "click", this.toggleFullscreen, !1),
                (this.ctrl.fs = t),
                e.appendChild(t),
                (this.cnt = e);
        },
        onPlayEnd: function () {
            OgvCtrl.ogv.seekable.length ? (OgvCtrl.ogv.currentTime = 0) : OgvCtrl.ogv.stop(), OgvCtrl.ogv.play();
        },
        toggleCtrl: function () {
            OgvCtrl.visible ? OgvCtrl.hideCtrl() : ((OgvCtrl.cnt.style.display = "flex"), OgvCtrl.setTickTimeout(), OgvCtrl.updateTimes(), (OgvCtrl.visible = !0));
        },
        hideCtrl: function () {
            (OgvCtrl.cnt.style.display = "none"), OgvCtrl.clearTickTimeout(), (OgvCtrl.visible = !1);
        },
        toggleSeek: function () {
            OgvCtrl.seeking = !OgvCtrl.seeking;
        },
        seekTick: function () {
            OgvCtrl.setTickTimeout(), OgvCtrl.updateTimes();
        },
        setTickTimeout: function () {
            OgvCtrl.tick = setTimeout(OgvCtrl.seekTick, 500);
        },
        clearTickTimeout: function () {
            clearTimeout(OgvCtrl.tick), (OgvCtrl.tick = null);
        },
        updateTimes: function () {
            if (!OgvCtrl.ogv.duration) return;
            OgvCtrl.seeking || (OgvCtrl.ctrl.seek.value = ((OgvCtrl.ogv.currentTime / OgvCtrl.ogv.duration) * 100).toFixed(2));
            let e = Math.floor(OgvCtrl.ogv.duration / 60),
                t = Math.floor(OgvCtrl.ogv.duration - 60 * e),
                n = Math.floor(OgvCtrl.ogv.currentTime / 60),
                i = Math.floor(OgvCtrl.ogv.currentTime - 60 * n);
            OgvCtrl.ctrl.ts.textContent = `${n}:${i.toString().padStart(2, "0")} / ${e}:${t.toString().padStart(2, "0")}`;
        },
        togglePlay: function () {
            OgvCtrl.ogv.paused ? OgvCtrl.ogv.play() : OgvCtrl.ogv.pause(), OgvCtrl.ctrl.play.classList.toggle("ogv-toggled");
        },
        onSeek: function () {
            OgvCtrl.ogv.currentTime = (this.value / 100) * OgvCtrl.ogv.duration;
        },
        toggleMute: function () {
            (OgvCtrl.ogv.muted = !OgvCtrl.ogv.muted), OgvCtrl.ctrl.mute.classList.toggle("ogv-toggled");
        },
        onVolInput: function () {
            OgvCtrl.ogv.volume = this.value / 100;
        },
        toggleFullscreen: function () {
            document.fullscreenElement ? document.exitFullscreen() : OgvCtrl.ogv.parentNode.requestFullscreen(), OgvCtrl.ctrl.fs.classList.toggle("ogv-toggled");
        },
    },
    ImageExpansion = {
        activeVideos: [],
        timeout: null,
        pendingTarget: null,
        loadOgv: function (e) {
            if (((ImageExpansion.pendingTarget = e), $.id("js-ogv-scr"))) return;
            let t = $.el("script");
            (t.id = "js-ogv-scr"), (t.onload = ImageExpansion.onOgvLoaded), (t.src = "https://s.4cdn.org/js/ogv/ogv.js"), document.body.appendChild(t);
        },
        onOgvLoaded: function () {
            let e = ImageExpansion;
            e.pendingTarget && e.expandWebm(e.pendingTarget);
        },
        expand: function (e) {
            var t, n, i, o;
            return (
                Config.imageHover && ImageHover.hide(),
                (i = (n = (o = e.parentNode).getAttribute("href")).match(/\.(?:webm|pdf)$/))
                    ? ".webm" == i[0] && ImageExpansion.expandWebm(e)
                    : (Main.hasMobileLayout && o.hasAttribute("data-m") && (n = ImageExpansion.setMobileSrc(o)),
                      e.setAttribute("data-expanding", "1"),
                      ((t = document.createElement("img")).alt = "Image"),
                      t.setAttribute("src", n),
                      (t.className = "expanded-thumb"),
                      (t.style.display = "none"),
                      (t.onerror = this.onError),
                      e.parentNode.insertBefore(t, e.nextElementSibling),
                      UA.hasCORS ? ((e.style.opacity = "0.75"), (this.timeout = this.checkLoadStart(t, e))) : this.onLoadStart(t, e),
                      !0)
            );
        },
        contract: function (e) {
            var t, n;
            clearTimeout(this.timeout),
                (t = (n = e.parentNode).parentNode.parentNode),
                $.removeClass(n.parentNode, "image-expanded"),
                Config.centeredThreads && ($.removeClass(t.parentNode, "centre-exp"), (t.parentNode.style.marginLeft = "")),
                !Main.tid && Config.threadHiding && $.removeClass(n, "image-expanded-anti"),
                (n.firstChild.style.display = ""),
                n.removeChild(e),
                t.offsetTop < window.pageYOffset && t.scrollIntoView();
        },
        toggle: function (e) {
            if (e.hasAttribute("data-md5")) {
                if (!e.hasAttribute("data-expanding")) return ImageExpansion.expand(e);
            } else ImageExpansion.contract(e);
            return !0;
        },
        setMobileSrc: function (e) {
            var t;
            return e.removeAttribute("data-m"), (t = (t = e.getAttribute("href")).replace(/\/([0-9]+).+$/, "/$1m.jpg")), e.setAttribute("href", t), t;
        },
        expandWebm: function (e) {
            var t, n, i, o, a, l;
            if (
                ((a = ImageExpansion),
                (t = document.getElementById("image-hover")) && document.body.removeChild(t),
                (o = (n = e.parentNode).getAttribute("href")),
                n.getBoundingClientRect().left,
                document.documentElement.clientWidth,
                (n.style.display = "none"),
                /iPhone|iPad/.test(navigator.userAgent))
            ) {
                if (!window.OGVPlayer) return OgvCtrl.init(), a.loadOgv(e), !0;
                OgvCtrl.ogv && a.detachOgv(OgvCtrl.ogv),
                    ((l = document.createElement("div")).className = "ogv-cnt expandedWebm"),
                    ((t = new OGVPlayer({ wasm: !0, threading: !1, simd: !1 })).onloadedmetadata = a.fitWebm),
                    (t.onvolumechange = Main.getWebmVolumeChangeCb()),
                    $.on(t, "ended", OgvCtrl.onPlayEnd),
                    l.appendChild(t),
                    n.parentNode.appendChild(l),
                    (t.src = o.replace(/\/\/.+\.4chan\.org\//, "//i.4cdn.org/")),
                    OgvCtrl.attach(t),
                    Config.unmuteWebm || OgvCtrl.toggleMute(),
                    OgvCtrl.togglePlay();
            } else
                ((t = document.createElement("video")).muted = !Config.unmuteWebm),
                    (t.controls = !0),
                    (t.loop = !0),
                    (t.autoplay = !0),
                    (t.className = "expandedWebm"),
                    (t.onloadedmetadata = a.fitWebm),
                    (t.onvolumechange = Main.getWebmVolumeChangeCb()),
                    (t.onplay = a.onWebmPlay),
                    n.parentNode.appendChild(t),
                    (t.src = o);
            return (
                Config.unmuteWebm && (t.volume = Main.getWebmVolume()),
                Main.hasMobileLayout
                    ? (((t = document.createElement("div")).className = "collapseWebm"), (t.innerHTML = '<span class="button">Close</span>'), n.parentNode.appendChild(t))
                    : ((i = e.parentNode.previousElementSibling), ((t = document.createElement("span")).className = "collapseWebm"), (t.innerHTML = '-[<a href="#">Close</a>]'), i.appendChild(t)),
                t.firstElementChild.addEventListener("click", a.collapseWebm, !1),
                !0
            );
        },
        fitWebm: function () {
            var e, t, n, i, o, a, l, r, s, d, c;
            (d = this),
                OgvCtrl.ogv ? ((c = d.parentNode), $.addClass(c, "ogv-loaded")) : (c = d),
                Config.centeredThreads && ((r = $.cls("opContainer")[0].offsetWidth), (l = c.parentNode.parentNode.parentNode), $.addClass(l, "centre-exp")),
                (a = d.getBoundingClientRect().left),
                (n = document.documentElement.clientWidth - a - 25),
                (i = document.documentElement.clientHeight),
                (e = d.videoWidth),
                (t = d.videoHeight),
                e > n && ((o = n / e), (e = n), (t *= o)),
                Config.fitToScreenExpansion && t > i && ((o = i / t), (t = i), (e *= o)),
                (c.style.width = (0 | e) + "px"),
                (c.style.height = (0 | t) + "px"),
                d !== c && ((d.style.width = c.style.width), (d.style.height = c.style.height)),
                Config.centeredThreads && ((a = c.getBoundingClientRect().left), (s = c.offsetWidth + 2 * a) > r ? (a = Math.floor(($.docEl.clientWidth - s) / 2)) > 0 && (l.style.marginLeft = a + "px") : $.removeClass(l, "centre-exp"));
        },
        onWebmPlay: function () {
            var e = ImageExpansion;
            e.activeVideos.length || document.addEventListener("scroll", e.onScroll, !1), e.activeVideos.push(this);
        },
        collapseWebm: function (e) {
            var t, n, i;
            e.preventDefault(),
                this.removeEventListener("click", ImageExpansion.collapseWebm, !1),
                (t = this.parentNode),
                (n = Main.hasMobileLayout ? t.previousElementSibling : t.parentNode.parentNode.getElementsByClassName("expandedWebm")[0]).classList.contains("ogv-cnt")
                    ? n.classList.contains("ogv-detached") || (n.firstElementChild.stop(), OgvCtrl.detach())
                    : n.pause(),
                Config.centeredThreads && ((i = n.parentNode.parentNode.parentNode), $.removeClass(i, "centre-exp"), (i.style.marginLeft = "")),
                (n.previousElementSibling.style.display = ""),
                n.parentNode.removeChild(n),
                t.parentNode.removeChild(t);
        },
        detachOgv: function (e) {
            let t = e.parentNode;
            (t.style.width = e.style.width), (t.style.height = e.style.height), t.classList.add("ogv-detached"), e.remove();
        },
        onScroll: function () {
            clearTimeout(ImageExpansion.timeout), (ImageExpansion.timeout = setTimeout(ImageExpansion.pauseVideos, 500));
        },
        pauseVideos: function () {
            var e, t, n, i, o, a, l;
            for (e = ImageExpansion, l = [], o = window.pageYOffset, a = window.pageYOffset + $.docEl.clientHeight, t = 0; (n = e.activeVideos[t]); ++t)
                (i = n.getBoundingClientRect()).top + window.pageYOffset > a || i.bottom + window.pageYOffset < o ? n.pause() : n.paused || l.push(n);
            l.length || document.removeEventListener("scroll", e.onScroll, !1), (e.activeVideos = l);
        },
        onError: function (e) {
            var t, n;
            Feedback.error("File no longer exists (404).", 2e3), (n = e.target), (t = $.qs("img[data-expanding]", n.parentNode)), n.parentNode.removeChild(n), (t.style.opacity = ""), t.removeAttribute("data-expanding");
        },
        onLoadStart: function (e, t) {
            var n, i, o, a, l, r, s, d, c, u, m;
            t.removeAttribute("data-expanding"),
                (s = t.parentNode.parentNode),
                Config.centeredThreads && ((d = s.parentNode.parentNode), (c = $.cls("opContainer")[0].offsetWidth), $.addClass(d, "centre-exp")),
                (r = t.getBoundingClientRect().left),
                (o = $.docEl.clientWidth - r - 25),
                (a = $.docEl.clientHeight),
                (n = e.naturalWidth),
                (i = e.naturalHeight),
                n > o && ((l = o / n), (n = o), (i *= l)),
                Config.fitToScreenExpansion && i > a && ((l = a / i), (i = a), (n *= l)),
                (e.style.maxWidth = n + "px"),
                (e.style.maxHeight = i + "px"),
                $.addClass(s, "image-expanded"),
                !Main.tid && Config.threadHiding && $.addClass(t.parentNode, "image-expanded-anti"),
                (e.style.display = ""),
                (t.style.display = "none"),
                Config.centeredThreads
                    ? ((r = e.getBoundingClientRect().left), (u = e.offsetWidth + 2 * r) > c ? (r = Math.floor(($.docEl.clientWidth - u) / 2)) > 0 && (d.style.marginLeft = r + "px") : $.removeClass(d, "centre-exp"))
                    : Main.hasMobileLayout &&
                      ((d = t.parentNode.lastElementChild).firstElementChild ||
                          (((s = document.createElement("div")).className = "mFileName"),
                          (m = t.parentNode.parentNode.getElementsByClassName("fileText")[0]) && ((m = m.firstElementChild), (s.innerHTML = m.getAttribute("title") || m.innerHTML)),
                          d.insertBefore(s, d.firstChild)));
        },
        checkLoadStart: function (e, t) {
            if (!e.naturalWidth) return setTimeout(ImageExpansion.checkLoadStart, 15, e, t);
            ImageExpansion.onLoadStart(e, t), (t.style.opacity = "");
        },
    },
    $ = {
        minmax: function (value, min, max) {
            return (value < min ? min : value > max ? max : value);
        },
        id: function (e) {
            return document.getElementById(e);
        },
        cls: function (e, t) {
            return (t || document).getElementsByClassName(e);
        },
        byName: function (e) {
            return document.getElementsByName(e);
        },
        tag: function (e, t) {
            return (t || document).getElementsByTagName(e);
        },
        el: function (e) {
            return document.createElement(e);
        },
        qs: function (e, t) {
            return (t || document).querySelector(e);
        },
        qsa: function (e, t) {
            return (t || document).querySelectorAll(e);
        },
        extend: function (e, t) {
            for (var n in t) e[n] = t[n];
        },
        on: function (e, t, n) {
            e.addEventListener(t, n, !1);
        },
        off: function (e, t, n) {
            e.removeEventListener(t, n, !1);
        },
    };
document.documentElement.classList
    ? (($.hasClass = function (e, t) {
          return e.classList.contains(t);
      }),
      ($.addClass = function (e, t) {
          e.classList.add(t);
      }),
      ($.removeClass = function (e, t) {
          e.classList.remove(t);
      }))
    : (($.hasClass = function (e, t) {
          return -1 != (" " + e.className + " ").indexOf(" " + t + " ");
      }),
      ($.addClass = function (e, t) {
          e.className = "" === e.className ? t : e.className + " " + t;
      }),
      ($.removeClass = function (e, t) {
          e.className = (" " + e.className + " ").replace(" " + t + " ", "");
      })),
    ($.get = function (e, t, n) {
        var i, o;
        if (((o = new XMLHttpRequest()).open("GET", e, !0), t)) for (i in t) o[i] = t[i];
        if (n) for (i in n) o.setRequestHeader(i, n[i]);
        return o.send(null), o;
    }),
    ($.xhr = function (e, t, n, i) {
        var o, a, l;
        if (((a = new XMLHttpRequest()).open(e, t, !0), n)) for (o in n) a[o] = n[o];
        if (i) {
            for (o in ((l = new FormData()), i)) l.append(o, i[o]);
            i = l;
        } else i = null;
        return a.send(i), a;
    }),
    ($.fit = function (e, t, n, i) {
        var o, a, l;
        return (o = e / t), e > n ? ((a = n), (l = Math.round(a / o)) > i && ((l = i), (a = Math.round(l * o)))) : t > i ? ((l = i), (a = Math.round(l * o)) > n && ((a = n), (l = Math.round(a / o)))) : ((a = e), (l = t)), [a, l];
    }),
    ($.ago = function (e) {
        var t, n, i, o;
        return (t = Date.now() / 1e3 - e) < 1
            ? "moments ago"
            : t < 60
            ? (0 | t) + " seconds ago"
            : t < 3600
            ? (n = 0 | (t / 60)) > 1
                ? n + " minutes ago"
                : "one minute ago"
            : t < 86400
            ? ((i = (n = 0 | (t / 3600)) > 1 ? n + " hours" : "one hour"), (o = 0 | (t / 60 - 60 * n)) > 1 && (i += " and " + o + " minutes"), i + " ago")
            : ((i = (n = 0 | (t / 86400)) > 1 ? n + " days" : "one day"), (o = 0 | (t / 3600 - 24 * n)) > 1 && (i += " and " + o + " hours"), i + " ago");
    }),
    ($.hash = function (e) {
        var t,
            n,
            i = 0;
        for (t = 0, n = e.length; t < n; ++t) i = (i << 5) - i + e.charCodeAt(t);
        return i;
    }),
    ($.prettySeconds = function (e) {
        var t;
        return [(t = Math.floor(e / 60)), Math.round(e - 60 * t)];
    }),
    ($.docEl = document.documentElement),
    ($.cache = {});
var UA = { hasCORS: !0},
    Main = {
		
        hasMobileLayout: !1,
        isMobileDevice: !1,
        getWebmVolume: function () {
            let e = parseFloat(localStorage.getItem("4chan-volume"));
            return isNaN(e) ? 0.5 : e;
        },
        getWebmVolumeChangeCb: function () {
            let e;
            return (t) => {
                clearTimeout(e),
                    (e = setTimeout(() => {
                        localStorage.setItem("4chan-volume", t.target.volume);
                    }, 200));
            };
        },
    },
    Config = {
        threadHiding: !0,
        fitToScreenExpansion: !1,
        imageHover: !1,
        centeredThreads: !1,
        unmuteWebm: !1,
    },
	
    settingsmenu =
	`\n\t<!DOCTYPE html>\n\t
	<html lang="en">
		\n\t
		<head>
			\n\t
			<meta charset="UTF-8" />
			\n\t
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			\n\t
			<title>Settings Menu</title>
			\n\t
			<style>
				\n\t\tbody {\n\t\t  font-size: 16px;\n\t\t  margin: 25px;\n\t\t}\n  \n\t\t.setting-label input {\n\t\t  width: 100px;\n\t\t  font-size: 14px;\n\t\t}\n  \n\t\tlabel {\n\t\t  display: block;\n\t\t  margin-bottom: 10px;\n\t\t}\n  \n\t\t#settings-form {\n\t\t  padding-left: 20px;\n\t\t}\n  \n\t\th1 {\n\t\t  text-align: center;\n\t\t  text-decoration: underline;\n\t\t}\n  \n\t\tlabel {\n\t\t  padding: 5px;\n\t\t}\n  \n\t\t#submitbutton {\n\t\t  margin: 0;\n\t\t  padding: 15px;\n\t\t}\n  \n\t\t#keybind-container {\n\t\t  display: flex;\n\t\t  align-items: center;\n\t\t  margin-top: 10px;\n\t\t}\n  \n\t\t#keybind-label {\n\t\t  margin-right: 10px;\n\t\t}\n  \n\t\t#keybind-input {\n\t\t  width: 30px;\n\t\t  font-size: 14px;\n\t\t  text-align: center;\n\t\t}\n\t
			</style>
			\n\t
		</head>
		\n\t
		<body>
			\n\t
			<h1>Settings</h1>
			\n\t
			<form id="settings-form">
				\n\t\t<label>\n\t\t <input type="checkbox" id="hover-image" /> Activate Image Hover Preview\n\t\t</label>\n \n\t\t<label>\n\t\t <input type="checkbox" id="gotothread" /> Click Image Go To Thread Post\n\t\t</label>\n \n\t\t
				<label>\n\t\t Show SLideshow images for <input style="width: 100px;" type="number" min="1" max="9999" step="1" id="userinterval" /> second(s)\n\t\t</label>\n \n\t\t
				<label>\n\t\t Show <input style="width: 100px;" type="number" min="1" max="10" step="1" id="imagesperrow" /> Images Per Row (image grid)\n\t\t</label>\n\n\t\t
				<label>\n\t\t Download Folder Name <input style="width: 150px;" type="text" id="foldername"  /> \n\t\t</label>\n\t\t
				<label>\n\t\t Replace Thread (default = ctrl + shift + l) <input style="width: 150px;" type="text" id="replacekeybind" maxlength="1" /> \n\t\t</label>\n\n\t\t
				<label>\n\t\t Fullscreen (default = ctrl + shift + f) <input style="width: 150px;" type="text" id="fullscreenkeybind" maxlength="1" /> \n\t\t</label>\n\t\t
				<label>\n\t\t Fullscreen (default = ctrl + shift + z) <input style="width: 150px;" type="text" id="topkeybind" maxlength="1" /> \n\t\t</label>\n\t\t
				<label>\n\t\t Expand Images (default ctrl + shift + e) <input style="width: 150px;" type="text" id="expandkeybind" maxlength="1" /> \n\t\t</label>\n\t\t<button type="submit" id="submitbutton">Save</button>\n\t
			</form>
			\n\t
		</body>
		\n\t
	</html>
	\n `;
	
const settingsContainer = document.createElement("div");
(settingsContainer.id = "settings-container"),
    (settingsContainer.style.display = "none"),
    (settingsContainer.style.position = "fixed"),
    (settingsContainer.style.top = "50%"),
    (settingsContainer.style.left = "50%"),
    (settingsContainer.style.width = "85vh"),
    (settingsContainer.style.height = "100vh"),
    (settingsContainer.style.backgroundColor = "#d6daf0"),
    (settingsContainer.style.color = "black"),
    (settingsContainer.style.transform = "translate(-50%, -50%)"),
    (settingsContainer.style.zIndex = "999"),
    (settingsContainer.innerHTML = settingsmenu);
const modalBackdrop = document.createElement("div");
(modalBackdrop.id = "modal-backdrop"),
    (modalBackdrop.style.position = "fixed"),
    (modalBackdrop.style.top = "0"),
    (modalBackdrop.style.left = "0"),
    (modalBackdrop.style.width = "100%"),
    (modalBackdrop.style.height = "100%"),
    (modalBackdrop.style.display = "none"),
    (modalBackdrop.style.backgroundColor = "rgba(0, 0, 0, 0.5)"),
    (modalBackdrop.style.zIndex = "998"),
    modalBackdrop.addEventListener("click", function () {
        (settingsContainer.style.display = "none"), (modalBackdrop.style.display = "none");
    }),
    document.body.appendChild(modalBackdrop);
	// Create a button to open the settings menu
	const openSettingsButton = document.createElement('a');
	openSettingsButton.textContent = '  Open Settings  ] '  ;
	openSettingsButton.id = 'open-settings-button'; // Assign an ID to the button
	
	// Append the settings container to the document body
	document.body.appendChild(settingsContainer);
	
	// Append the button to the document body
	element.prepend(openSettingsButton);
	
	// Add an event listener to open the settings menu when the button is clicked
	openSettingsButton.addEventListener('click', function () {
	  // Find the settings container element by its ID
	  const settingsContainer = document.getElementById('settings-container');
		
	  // Toggle the visibility of the settings menu
	  if (settingsContainer.style.display === 'none') {
		settingsContainer.style.display = 'block';
		modalBackdrop.style.display = 'block';
	  } else {
		settingsContainer.style.display = 'none';

	  }
	});
	



console.log(document.getElementById('userinterval').value)

function applySettings(settings) {
	// Example: Update the behavior based on the hover image setting
	if (settings.hoverImage) {
	  // Enable hover image preview
	  setupImageAndVideoPreview()
	} else {
	  // Disable hover image preview
	  setupImageAndVideoPreview()
	}
  
	 
}

// Retrieve the saved settings from local storage
const savedSettings = JSON.parse(localStorage.getItem('userSettings')) || {};

// Set the initial state of the settings menu based on the saved settings
document.getElementById('hover-image').checked = savedSettings.hoverImage || false;
document.getElementById('gotothread').checked = savedSettings.gotothread || false;
document.getElementById('userinterval').value = savedSettings.userinterval || 5
document.getElementById('imagesperrow').value = savedSettings.imagesperrow || 3
document.getElementById('expandkeybind').value = savedSettings.expandkeybind || 'e'
document.getElementById('fullscreenkeybind').value = savedSettings.fullscreenkeybind || 'f'
document.getElementById('replacekeybind').value = savedSettings.replacekeybind || 'l'
document.getElementById('topkeybind').value = savedSettings.topkeybind || 'z'
document.getElementById('foldername').value = savedSettings.foldername || '4chan downloads'

// Add an event listener to the form for saving settings
document.getElementById('settings-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const modalContent = document.getElementById('modal-backdrop')
  const settings = document.getElementById('settings-container')
	modalContent.style.display = 'none '
	settings.style.display = 'none '
  // Get the values of the checkboxes
  const hoverImage = document.getElementById('hover-image').checked;
  const gotothread = document.getElementById('gotothread').checked;
  const userinterval = document.getElementById('userinterval').value
  const imagesperrow =document.getElementById('imagesperrow').value 
  const expandkeybind =document.getElementById('expandkeybind').value 
  const fullscreenkeybind = document.getElementById('fullscreenkeybind').value
  const replacekeybind = document.getElementById('replacekeybind').value 
  const foldername = document.getElementById('foldername').value
  const topkeybind = document.getElementById('topkeybind').value
  // Save the settings to local storage
  const userSettings = {
    hoverImage,
	userinterval,
	gotothread,
	imagesperrow, 
	expandkeybind, 
	fullscreenkeybind,
	replacekeybind,
	foldername,
	topkeybind
  };

  localStorage.setItem('userSettings', JSON.stringify(userSettings));

  // Apply the settings to the application
  applySettings(userSettings);
});


class ThreadManipulation {
	constructor() {
	  this.originalThreadContent = new Map();
	  this.originalThreadContent2 = new Map();
	  this.mediaurls = [];
	  this.posthrefs = [];
	  this.filenames = {};
	  this.srcs = [];
	  this.expanded = false
	}
	
    getridofdeleted(){
        const deletedFileElements = document.querySelectorAll(".fileDeletedRes");
    
        // Loop through the selected elements and remove the "span.fileThumb" parent element
        if (!deletedFileElements) return;
        for (var i = 0; i < deletedFileElements.length; i++) {
            const fileElement = deletedFileElements[i];
            const parentfileThumb = fileElement.parentNode; // Get the parent of the .fileDeletedRes element
        
            if (parentfileThumb.classList.contains("fileThumb")) {
                // Check if the parent has the "fileThumb" class
                parentfileThumb.parentNode.removeChild(parentfileThumb); // Remove the parent element
            }
        }
}


	grabThreadHtml() {
		const threadElements = document.querySelectorAll('.thread');
		threadElements.forEach((threadElement) => {
		  if (!this.originalThreadContent2.has(threadElement)) {
			this.originalThreadContent2.set(threadElement, threadElement.innerHTML);
		  }
		});
	  }
	
	  threadkeybind() {
		var expandKeybindInput = document.getElementById('expandkeybind');
		var fullscreenkeybind = document.getElementById('fullscreenkeybind')
		var replacekeybind = document.getElementById('replacekeybind')
		var topkeybind = document.getElementById('topkeybind')

			
			// Set up a listener for the specified key
			document.addEventListener('keydown', function keyListener(e) {
				if (e.key.toLowerCase() === expandKeybindInput.value.toLowerCase() && e.ctrlKey && e.shiftKey)
				{
					// Perform the desired action (e.g., call expandImages())
					threadManipulation.expandImages();
				}
			});
		

			document.addEventListener('keydown', function keyListener(e) {
				if (e.key.toLowerCase() === replacekeybind.value.toLowerCase() && e.ctrlKey && e.shiftKey)
				{
					// Perform the desired action (e.g., call expandImages())
					threadManipulation.replaceThreadContent();
				}
			});

			
			document.addEventListener('keydown', function keyListener(e) {
				if (e.key.toLowerCase() === fullscreenkeybind.value.toLowerCase() && e.ctrlKey && e.shiftKey)
				{
					// Perform the desired action (e.g., call expandImages())
					mediaContainer.requestFullscreen()
					fullscreenFunctionality.updateMedia();
					
				}
			});

		document.addEventListener('keydown', function keyListener(e) {
			if ( e.key.toLowerCase() === topkeybind.value && e.ctrlKey &&  e.shiftKey)  {
				// Perform the action for the '#' key (e.g., scroll to the top)
				// You need to implement the specific action you want for this key
				window.scrollTo(0, 0);  // Example: Scroll to the top
			}
		});
	}

	getImageLinks() {
		let filename
	  const imageLinks = document.querySelectorAll('.fileThumb');
	//   const spoilerImageLinks = document.querySelectorAll('.fileThumb.imgspoiler');
		const x = document.querySelectorAll('.fileThumb img');
	  for (let i = 0; i < imageLinks.length; i++) {
		const src = x[i].src
		if(src==='https://s.4cdn.org/image/spoiler-vg1.png'){
			ImageExpansion.expand(x[i])
		}
		const filetext = imageLinks[i].parentNode.querySelector('.fileText')
		const file1 = filetext.querySelector('a').textContent.replace(/\s/g,'').split('.')[0];
		const file2 = filetext.querySelector('a').title.replace(/\s/g,'').split('.')[0]
		if(file2){
			filename = file2
		}else{
			filename = file1
		}
		console.log(filename)
		const link = imageLinks[i].href;
		const postcontainer = imageLinks[i].closest('.postContainer')
		const dateTime = postcontainer.querySelector('.dateTime.postNum');
		const postLink = dateTime.querySelector('a');
        const postHref = postLink.getAttribute('href');
        
	
		if (link !== undefined) {
		  this.srcs.push(src)
		  this.filenames[link]=filename
		  this.mediaurls.push(link);
		  this.posthrefs.push(postHref)
		}
	  }
  
	}


	 expandImages() {
		const expandlink =document.querySelector('.expandlink')
		var thumbs = document.getElementsByClassName("fileThumb");
            if(!this.expanded) {
                expandlink.textContent = ' Collapse Images | '
                this.expanded = true;
                for(var i = 0; i < thumbs.length; i++) {
                    var img = thumbs[i].getElementsByTagName('img')[0];
                    if (img.alt != "File deleted.") {
                                        ImageExpansion.expand(img);
                                }
                }
                
            }else{
                expandlink.textContent = ' Expand Images | '
                this.expanded = false;
                var collapseWebm = document.getElementsByClassName("collapseWebm");
                var expandedWebm = document.getElementsByClassName("expandedWebm");
                while(collapseWebm.length > 0){
                    collapseWebm[0].remove();
                }
                while(expandedWebm.length > 0){
                    expandedWebm[0].remove();
                }
                for(var i = 0; i < thumbs.length; i++) {
                    if(thumbs[i].style.display=="none"){
                        thumbs[i].style.display = null;
                    }
                    var img = thumbs[i].getElementsByTagName('img')[1];
                    if (img !== undefined) {
                            ImageExpansion.contract(img);
                    }
                    
                }
                setupImageAndVideoPreview()
	}
	  }
	  
	 
	
	redirectDeadLinks() {
		//get the text of the url that changes which is /*Board*/*Thread*/*Thread Number*/
	  const pathname = window.location.pathname;
	  //split it on the slashes
	  const pathParts = pathname.split('/');
	  //this is where the boards codename is located
	  const board = pathParts[1];
	  // check if there are deadlinks to grab
	  const deadLinks = document.querySelectorAll('.deadlink');
	//return early if no deadlinks
	  if(!deadLinks)return 
	//if there are dead links go through and replace them with the archive link
	  deadLinks.forEach((deadLink) => {
		let threadNumber = deadLink.textContent.replace(/>/g, '');
		const archiveLink = document.createElement('a');
		archiveLink.href = `https://desuarchive.org/${board}/thread/${threadNumber}`;
		archiveLink.textContent = threadNumber;
		deadLink.parentNode.replaceChild(archiveLink, deadLink);
	  });
	}
  

	//function for replacing thread html with images
	replaceThreadContent() {
		const imagesperrow =document.getElementById('imagesperrow').value 
		const checkb = document.getElementById('gotothread')
		console.log(checkb.checked)
	//grab the thread and loop through to clear the thread html
	document.querySelectorAll('.thread').forEach(threadElement => {
		const threadContent = threadElement.innerHTML;
		if (!this.originalThreadContent.has(threadElement)) {
		  this.originalThreadContent.set(threadElement, threadContent);
		  const galleryContainer = document.createElement('div');
			galleryContainer.classList.add('image-gallery');
			galleryContainer.style.display = 'flex';
			galleryContainer.style.flexWrap = 'wrap';

		
		  const selectAllButton = document.createElement('button');
		  selectAllButton.textContent = 'Select All';
		  selectAllButton.addEventListener('click', (e) => {
			e.preventDefault();
			this.selectAllCheckboxes();
		  });
		  
		  const downloadSelectedButton = document.createElement('button');
		  downloadSelectedButton.textContent = 'Download Selected Images';
		  downloadSelectedButton.addEventListener('click', (event) => {
			event.preventDefault();
			downloader();
		  });
		
		 threadElement.innerHTML = ''
  
		 for (let i = 0; i < this.mediaurls.length; i++) {
			const link = this.mediaurls[i];
			const isVideo = link.endsWith('.webm') || link.endsWith('.mp4');
			const checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.classList.add('image-checkbox');
			checkbox.value = link;
		  
			const item = document.createElement('div');
			item.style.flexGrow = '1';
			item.style.flexBasis = 100/imagesperrow+'%'; // Adjust the initial size as needed
			item.style.padding = '5px';
			item.style.boxSizing = 'border-box';
		  
			if (isVideo) {
			  const video = document.createElement('video');
			  video.setAttribute('data-src', link)
			  video.src = this.srcs[i]
			  video.autoplay = false;
			  video.controls = true;
			  video.loop = false;
			  video.muted = false;
			  video.classList.add('lazyload');
			  video.style.width = '100%';
			  video.style.height = 'auto';
		  
			  if (checkb.checked) {
				const videoLink = document.createElement('a');
				videoLink.href = this.posthrefs[i];
				videoLink.appendChild(video);
		  
				videoLink.addEventListener('click', (event) => {
				  event.preventDefault();
				  this.restoreThreadContent()
				  window.location.href = this.posthrefs[i]; // Navigate to the specified URL
				});
		  
				item.appendChild(videoLink);
			  } else {
				item.appendChild(video);
			  }
		  
			  item.appendChild(checkbox);
			} else {
			  const img = document.createElement('img');
			//   img.setAttribute('data-src', link)
			  img.src = link
			  img.alt = 'Image';
			//   img.classList.add('lazyload');
			  img.style.width = '100%';
			  img.style.height = 'auto';
		  
			  if (checkb.checked) {
				const imgLink = document.createElement('a');
				imgLink.href = this.posthrefs[i];
				imgLink.appendChild(img);
		  
				imgLink.addEventListener('click', (event) => {
				  event.preventDefault();
				  this.restoreThreadContent()
				  window.location.href = this.posthrefs[i]; // Navigate to the specified URL
				});
				
				item.appendChild(imgLink);
			  } else {
				img.addEventListener('click', () => {
					mediaContainer.requestFullscreen();
					fullscreenFunctionality.index = this.mediaurls.indexOf(img.src);
					fullscreenFunctionality.updateMedia();
				  });
				item.appendChild(img);
			  }
		  
			  item.appendChild(checkbox);
			}
		  
			galleryContainer.appendChild(item);
		  }
		  
  
		  threadElement.appendChild(downloadSelectedButton);
		  threadElement.appendChild(selectAllButton);
		  threadElement.appendChild(galleryContainer);
		}
	  });

	
	  document.querySelector('.expandlink').style.display = 'none';
	  document.querySelector('.replaceLink').style.display = 'none';
	  document.querySelector('.reverseLink').style.display = 'inline';
	  document.querySelector('.restorelink').style.display = 'inline';
  
	}
  

	 reverse() {
		const gallery = document.querySelector('.image-gallery');
		const fragment = document.createDocumentFragment();
	  
		while (gallery.firstChild) {
		  fragment.appendChild(gallery.lastChild);
		}
	  
		gallery.appendChild(fragment);
	  }
	  
  
	  restoreThreadContent() {
		document.querySelectorAll('.thread').forEach((threadElement) => {
		  if (this.originalThreadContent2.has(threadElement)) {
			const originalContent = this.originalThreadContent2.get(threadElement);
			
			// Clear the existing content
			while (threadElement.firstChild) {
			  threadElement.removeChild(threadElement.firstChild);
			}
	  
			// Append the original content directly
			threadElement.appendChild(document.createRange().createContextualFragment(originalContent));
		  }
		});
	  
		// Update the display styles of certain elements
		document.querySelector('.expandlink').style.display = 'inline';
		document.querySelector('.replaceLink').style.display = 'inline';
		document.querySelector('.reverseLink').style.display = 'none';
		document.querySelector('.restorelink').style.display = 'none';
	  
		// Clear the original content maps
		this.originalThreadContent2.clear();
		this.originalThreadContent.clear();
	  
		// Reapply event listeners and update the thread HTML
		setupfileThumbClick();
		this.grabThreadHtml();
		setupImageAndVideoPreview();
	  }
	  
  
	selectAllCheckboxes() {
	  const checkboxes = document.querySelectorAll('.image-checkbox');
  
	  checkboxes.forEach((checkbox) => {
		checkbox.checked = true;
	  });
	}
  
	addZoomFunctionality(img) {
	  let isFullscreen = false;
	  let zoomLevel = 1;
  
	  function zoomIn() {
		zoomLevel += 0.3;
		updateZoom();
	  }
  
	  function zoomOut() {
		zoomLevel -= 0.3;
		updateZoom();
	  }
  
	  function resetZoom() {
		zoomLevel = 1;
		updateZoom();
	  }
  
	  function updateZoom() {
		img.style.height = `${zoomLevel * 100}%`;
	  }
  
	  document.addEventListener('keydown', (e) => {
		if (document.fullscreenElement) {
		  e.preventDefault();
		  if (e.key === '=') {
			zoomIn();
		  }
		  if (e.key === '-') {
			zoomOut();
		  }
		}
	  });
  
	  document.addEventListener('fullscreenchange', () => {
		isFullscreen = !!document.fullscreenElement;
		if (!isFullscreen) {
		  resetZoom();
		}
	  });
	}
  }
  
  const threadManipulation = new ThreadManipulation();
  threadManipulation.getImageLinks()
  threadManipulation.grabThreadHtml()
  threadManipulation.redirectDeadLinks()
  threadManipulation.getridofdeleted()
  threadManipulation.threadkeybind()
  console.log(threadManipulation.srcs)
  console.log(threadManipulation.mediaurls.length, threadManipulation.posthrefs.length)

  class FullscreenFunctionality {
	constructor(checkboxState, videoplaying) {
	  this.checkboxState = checkboxState;
	  this.index = 0;
	  this.videoplaying = videoplaying;
	  this.intervalId  = null;
	}
  
	createCheckbox() {
	  console.log('createCheckbox called');
	  const mediaContainer = document.querySelector('.media-container');
	  if (!mediaContainer) {
		console.log('Media container not found.');
		return;
	  }
  
	  const checkboxContainer = document.createElement('div');
	  checkboxContainer.id = 'custom-checkbox-container';
	  checkboxContainer.style.position = 'fixed';
	  checkboxContainer.style.right = '10px';
	  checkboxContainer.style.bottom = '10px';
	  checkboxContainer.style.zIndex = '9999';
	  checkboxContainer.style.display = 'none';
  
	  const checkbox = document.createElement('input');
	  checkbox.type = 'checkbox';
	  checkbox.id = 'FullscreenCheckbox';
	  checkbox.checked = this.checkboxState;
  
	  const label = document.createElement('label');
	  label.id = 'FullscreenLabel';
	  label.textContent = 'Slideshow';
	  label.style.color = 'white';
	  label.style.right = '20px';
	  label.style.bottom = '20px';
	  const user= document.getElementById('userinterval').value
	  console.log(user)
  
	  checkbox.addEventListener('change', () => {
		if (checkbox.checked) {
		  this.checkboxState = true;
		  console.log('Checkbox is checked');
		  this.startInter()
		  if (this.videoplaying) {
			this.endinter();
		  }
		} else {
		  this.checkboxState = false;
		  this.endinter();
		}
	  });
  
	  checkboxContainer.appendChild(checkbox);
	  checkboxContainer.appendChild(label);
	  mediaContainer.appendChild(checkboxContainer);
	}
  
	showCheckbox() {
	  this.createCheckbox();
	  const checkboxContainer = document.getElementById('custom-checkbox-container');
	  if (checkboxContainer) {
		checkboxContainer.style.display = 'block';
	  }
	}
  
	hideCheckbox() {
	  const checkboxContainer = document.getElementById('custom-checkbox-container');
	  if (checkboxContainer) {
		checkboxContainer.style.display = 'none';
	  }
	}
  
	removeFullscreenKeyBinds() {
		document.removeEventListener('keydown', this.handleKeydown);
	  }


	fullscreenKeyBinds() {
		this.handleKeydown = (event) => {
		  if (event.keyCode === 39) {
			if (document.activeElement === document.body) {
			  console.log('fullscreenkeybind did this');
			  this.index += 1;
	  
			  if (this.index > threadManipulation.mediaurls.length - 1) {
				this.index = 0;
			  }
			  this.updateMedia();
			}
		  } else if (event.keyCode === 37) {
			if (document.activeElement === document.body) {
			  console.log('fullscreenkeybind did this');
			  this.index -= 1;
	  
			  if (this.index < 0) {
				this.index = threadManipulation.mediaurls.length - 1;
			  }
			  this.updateMedia();
			}
		  }
		};
		document.addEventListener('keydown', this.handleKeydown);
	}
  
	
	 
	// function responsible for displaying the media when fullscreen is triggered
	 updateMedia = () =>   {
		console.log('index' , this.index,'checkbox' , this.checkboxState,'vid playin' , this.videoplaying);
	
		// Setup the listener to observe videos for the slideshow functionality
		// How we can change and keep track of the current image
		const mediaUrl = threadManipulation.mediaurls[this.index];
	
		// Getting the media container element so we can change the displayed media
		const mediaContainer = document.querySelector('.media-container');
	
		// Remove any existing media (both images and videos)
		const currentMedia = mediaContainer.querySelectorAll('img, video');
		if (currentMedia.length > 0) {
			currentMedia.forEach(element => {
				element.remove();
			});
		}
	
		// For video formats (`.webm` and `.mp4`), create a video element
		if (mediaUrl.endsWith('.webm') || mediaUrl.endsWith('.mp4')) {
			const videoElement = document.createElement('video');
			this.videoplaying = true
			if(this.videoplaying && this.checkboxState){
				this.endinter()
			}
			videoElement.src = mediaUrl;
			videoElement.autoplay = true;
			videoElement.loop = false;
			videoElement.muted = false;
			videoElement.style.maxWidth = '100%';
			videoElement.style.maxHeight = '100%';
			videoElement.style.width = 'auto';
			videoElement.style.height = '100vh';
			videoElement.style.display = 'block';
			videoElement.style.margin = '0 auto';
			videoElement.addEventListener('ended', () => {
				if (this.checkboxState) {
				  this.index += 1;
				  this.updateMedia();
				}
			  });
			// Add it to the media container
			mediaContainer.appendChild(videoElement);
		} else {
			// For image files
			// Image styling
			const imageElement = document.createElement('img');
			imageElement.src = mediaUrl;
			this.videoplaying = false
			imageElement.style.width = 'auto';
			imageElement.style.height = '100vh';
			imageElement.style.display = 'block';
			imageElement.style.margin = '0 auto';
			imageElement.style.overflow = 'auto';
	
			// For restarting the interval if the previous was a video element
			if (this.checkboxState && this.intervalId === null) {
				this.startInter();
			}
	
			// Add the image to the container to be displayed
			mediaContainer.appendChild(imageElement);
	
			// Adding zooming functionality to the fullscreen container
			threadManipulation.addZoomFunctionality(mediaContainer.querySelector('img'));
		}
	}
	


	  
	 startInter() {
		const checkbox = document.getElementById('FullscreenCheckbox');
		const interval = parseInt(checkbox.dataset.interval);
		const user = document.getElementById('userinterval').value
		if (checkbox.checked && !interval) {
		  this.intervalId = setInterval(() => {
			this.index += 1;
			this.updateMedia();
			console.log('startinter did this:', this.index);
		  }, (user * 1000));
		  checkbox.dataset.interval = this.intervalId;
		}
	  }
	  
	   endinter() {
		const checkbox = document.getElementById('FullscreenCheckbox');
		const interval = parseInt(checkbox.dataset.interval);
		if (interval) {
		  clearInterval(interval);
		  delete checkbox.dataset.interval;
		}
		this.intervalId = null
	  }

	  
  }

//initialize it will the variables
  const fullscreenFunctionality = new FullscreenFunctionality(false, false)



// class for handling the image preview functionality
class ImagePreview {
	constructor() {
		// initalize preview variable
	  this.currentPreview = null;
	
	}
  // get clients screen dimensions for sizing logic later
	getWindowDimensions() {
	  return {
		width:
		  window.innerWidth ||
		  document.documentElement.clientWidth ||
		  document.body.clientWidth,
		height:
		  window.innerHeight ||
		  document.documentElement.clientHeight ||
		  document.body.clientHeight,
	  };
	}

    //logic for positioning the hover preview
    updatePreviewPosition(e) {
        const preview = document.querySelector('.imgPreview, .vidPreview');
        // if theres not a preview stop the function early
        if (!preview) return;
        //get window dimensions for cursor logic
        const windowDimensions = this.getWindowDimensions();
        // get preview width for out of bounds logic
        let elementWidth = preview.getBoundingClientRect().width
        // the  distance between cursor and preview
        const CursorPadding = 45;

        // the maximum amount the previews allowed to move 
        const maxX = windowDimensions.width + CursorPadding - elementWidth;
        
        let left;
        // if cursor on left side of screen display to the right of it
        if (e.clientX < windowDimensions.width / 2) {
          left = e.clientX + CursorPadding;
          //else display to left of cursor
        } else {
          left = e.clientX - elementWidth - CursorPadding;
        }
      // if image off left side of screen make it 0 so it stays in view
        if (left < 0) {
          left = 0;
        }
      // if image off right side of screen make it maxX so it stays in view
        if (left > maxX) {
          left = maxX;
        }
      
        console.log('Element Width:', elementWidth);
        console.log('MaxX:', maxX);
        // finally update the style to move it
        this.currentPreview.style.left = left + 'px';
      }
      
      
      
      
  //function for finding video links via regex
	isVideoLink(link) {
	  const isVideo = link.match(/\.(jpg|png|jpeg|webp|gif)$/i) ? false : true;
	  return isVideo;
	}
  
	// function for creating preview when hovered and checkbox checked
   createNewPreview(link, isVideo) {
	const windowDimensions = this.getWindowDimensions();
	const padding = 5;
	const height = windowDimensions.height - (padding / 100) * windowDimensions.height;
  
	this.currentPreview = isVideo ? document.createElement('video') : document.createElement('img');
	//set source to the href of the thumbnail which is a higher res image/the video from thumbnail
	this.currentPreview.src = link;
	// put it fixed so it stays in the same spot
	this.currentPreview.style.position = 'fixed';
	// setting the height to the height formula
	this.currentPreview.style.height = height + 'px';
	//bottom -22  sets it to the top
	// this.$currentPreview.style.top = '0px'
	this.currentPreview.style.bottom = '-25px'
	//set maxwidth to 80% so it doesnt look compressed but also doesnt take up the entire screen
	this.currentPreview.style.maxWidth = '80%';
	//add the padding
	this.currentPreview.style.padding = padding + '%';
	//add the preview class to grab later
	this.currentPreview.classList.add(isVideo ? 'vidPreview' : 'imgPreview');
	// this is logic to  fix a flickering glitch that occurs if a cursor would enter the preview created and would recreate it hundreds of times 
	this.currentPreview.style.pointerEvents = 'none';
  //add video logic incase previews a video
	if (isVideo) {
	  this.currentPreview.autoplay = true;
	  this.currentPreview.muted = false;
	  this.currentPreview.play();
	}
   //add the preview after styling
	document.body.appendChild(this.currentPreview);
     } 
	 
  //function for grabbing link and passing it to create preview
	  handleMouseEnter(imageElement) {
		const link = imageElement.parentNode.getAttribute('href');
		const isVideo = this.isVideoLink(link);

		if (this.currentPreview) {
		  this.currentPreview.src = link;
		} else {
		  // Continue with creating a new preview if the checkbox is checked
		  this.createNewPreview(link, isVideo);
		}
	  }
	  
  //function for removing preview
	handleMouseLeave() {

	  if (this.currentPreview) {
		this.currentPreview.remove();
		this.currentPreview = null;
	  }
	}
  }
  
  const imagePreview = new ImagePreview();
  //initalize the class to be able to call it later


// function to setup the hover image preview
   function setupImageAndVideoPreview() {

	const checkbox = document.getElementById('hover-image')
	// Get all images within elements having class "fileThumb"
	const fileThumbImages = document.querySelectorAll(".fileThumb img");
	
	// Handle mouse enter event for image elements
	fileThumbImages.forEach(function(image) {
		 // Declare a variable to store the checkbox state
		
	
		
	  image.addEventListener('mouseenter', function() {
		if (!checkbox.checked) return;

		// If the image doesn't have the class 'imgexpanded', trigger mouse enter behavior
		if (!image.classList.contains('imgexpanded') && !image.classList.contains('expanded-thumb')) {
														
		  imagePreview.handleMouseEnter(image);
		 
		}
  
		// Attach a click event to the image that triggers the mouse leave behavior
		image.addEventListener('click', function() {
			
		  imagePreview.handleMouseLeave();
		  
		});
	  });
  
	  image.addEventListener('mouseleave', function() {
		// Trigger mouse leave behavior when the mouse leaves the image
		imagePreview.cursorInPreview = false
		imagePreview.handleMouseLeave();
	  });
	});
  
	// Update the preview position on mouse movement
	document.addEventListener('mousemove', function(e) {
	  imagePreview.updatePreviewPosition(e);
	});
  }
  
  setupImageAndVideoPreview()
  
	// Function to setup and initialize listeners on images and videos with the class 'fileThumb'
	// This will only work if the checkbox in the extension is checked
	  function setupfileThumbClick() {
		var fileThumbs = document.querySelectorAll('.fileThumb');
	
		fileThumbs.forEach(function (fileThumb) {
			var container = fileThumb;
			var link = container.getAttribute('href');
			var originalContent = container.innerHTML; // Store the original content
			var isMedia = false;
	
			// Remove target attribute from anchor elements within .fileThumb
			var anchorElements = container.querySelectorAll('a');
			anchorElements.forEach(function (anchorElement) {
				anchorElement.removeAttribute('target');
			});
	
			container.addEventListener('click', function (event) {
				event.preventDefault();
				if (isMedia || fileThumb.querySelector('.expanded-thumb')) {
					// If it's media, revert to the original content
					container.innerHTML = originalContent;
					setupImageAndVideoPreview();
				} else {
					// If it's the thumbnail, replace it with the media
					if (link.endsWith('.webm') || link.endsWith('.mp4')) {
						container.innerHTML = ''; // Remove previous content
						var videoElement = document.createElement('video');
						videoElement.className = 'expanded-webm';
						videoElement.src = link;
						videoElement.autoplay = false;
						videoElement.controls = true;
						videoElement.loop = false;
						videoElement.muted = false;
						videoElement.style.maxWidth = '40%';
						videoElement.style.maxHeight = '50%'; // Set maximum dimensions
						container.appendChild(videoElement);
					} else {
						container.innerHTML = ''; // Remove previous content
						var imgElement = document.createElement('img');
						imgElement.src = link;
						imgElement.alt = 'Image';
						imgElement.className = 'expanded-thumb';
						imgElement.style.maxWidth = '40%';
						imgElement.style.maxHeight = '50%'; // Set maximum dimensions
						container.appendChild(imgElement);
					}
				}
	
				// Toggle the state
				isMedia = !isMedia;
			});
		});
	

	  }	

// Call the setupfileThumbClick function
setupfileThumbClick();



/**
 * 
 * @param {String} tag 
 * @param {String} text 
 * @param {String} className 
 * @param {String} style 
 * @param {Boolean} hidden 
 * @param {String} href 
 * @returns 
 */

	//function to create element so i didnt have to do it repeatedly
	function createElement(tag, text, className, style, hidden, href = null) {
		const element = document.createElement(tag);
		element.textContent = text;
	  
		if (className) {
		  element.className = className;
		}
	  
		if (style) {
		  element.style.cssText = style;
		}
	  
		if (hidden) {
		  element.style.display = 'none';
		}
	  
		if (tag === 'a' && href) {
		  element.href = href;
		}
	  
		return element;
	  }
	  
	
		//creating the buttons that match the functions
		const replaceLink = createElement('a', '[  Image Grid | ', 'replaceLink', null, false, '#');
		const settings = createElement('a', 'settings  ', 'settingslink', null, false, '#');
		const restoreLink = createElement('a', '[  Restore Thread | ', 'restorelink', null, true, '#');
		const reverseLink = createElement('a', '  ↻ | ', 'reverseLink', null, true, '#');
		const fullscreenLink = createElement('a', '   Fullscreen | ', 'fullscreenlink', 'display: inline;', false, '#');
		const expandLink = createElement('a', '  Expand Images | ', 'expandlink', 'display: inline', false, '#');

		// create the container for fullscreen functionality
		const mediaContainer = createElement('div', null, 'media-container', 'display: none; overflow: hidden');


// Apply styles to hide the scrollbar
mediaContainer.style.msOverflowStyle = 'none'; // For Internet Explorer
mediaContainer.style.scrollbarWidth = 'none'; // For Firefox


// For WebKit browsers (e.g., Safari, Chrome)
mediaContainer.style.overflow = 'auto';

const webkitScrollbarStyles = `
  ::-webkit-scrollbar {
    display: none;
  }
`;
const styleElement = document.createElement('style');
styleElement.appendChild(document.createTextNode(webkitScrollbarStyles));


	// Append the media container to the document body
	document.body.append(mediaContainer);
	

	// setup a click listener to the replace link to prevent page navigation and call the replacethread function
	// Replace Link
replaceLink.addEventListener('click', function (event) {
	event.preventDefault(); // Prevent the link from navigating
	threadManipulation.replaceThreadContent();
  });
  
settings.addEventListener('click', function (event){
	event.preventDefault
	addSettingsModal()
})

  // Restore Link
  restoreLink.addEventListener('click', function (event) {
	event.preventDefault(); // Prevent the link from navigating
	threadManipulation.restoreThreadContent();
  });
  
  // Fullscreen Link
  fullscreenLink.addEventListener('click', function (event) {
	event.preventDefault(); // Prevent the link from navigating
	fullscreenFunctionality.updateMedia();
	if (mediaContainer.requestFullscreen) {
	  mediaContainer.requestFullscreen().catch((err) => {
		console.error('Error attempting to enable fullscreen:', err);
	  });
  
	  // Call update media so that the correct image is displayed when in fullscreen
	  
	} else {
	  console.error('Fullscreen API is not supported.');
	}
  });
  
  // Reverse Link
  reverseLink.addEventListener('click', function (event) {
	event.preventDefault(); // Prevent the link from navigating
	threadManipulation.reverse();
  });

  
  // Expand Link
  expandLink.addEventListener('click', function (event) {
	
	event.preventDefault();
	threadManipulation.expandImages()
  });
  
  // Add the links to the document

	element.prepend(expandLink);
	element.prepend(fullscreenLink);
  	element.prepend(replaceLink);
	element.prepend(reverseLink);
	element.prepend(restoreLink);

	
  // Fullscreen change event listener
document.addEventListener('fullscreenchange', function (e) {
	
    //get the checkbox
	const checkbox = document.getElementById('FullscreenCheckbox')
    // get the mediacontainer for fullscreen images
	const mediaContainer = document.querySelector('.media-container');
    //if fullscreen display the mediacontainer and setup the checkbox for slideshow plus keybinds for going through images
	if (document.fullscreenElement) {
		document.head.appendChild(styleElement);
	    mediaContainer.style.display = 'block';
	    fullscreenFunctionality.fullscreenKeyBinds();
	    fullscreenFunctionality.showCheckbox();
	    console.log('Entered fullscreen mode');
	} else {
		fullscreenFunctionality.removeFullscreenKeyBinds();
		document.head.removeChild(styleElement);
        // if its not fullscreen set checkbox to false so that interval stops and doesnt increase in the background
		fullscreenFunctionality.checkboxState = false;
		checkbox.checked = fullscreenFunctionality.checkboxState
        //hide mediacontainer
	    mediaContainer.style.display = 'none';
	    fullscreenFunctionality.endinter();
        //hide the checkbox until they go fullscreen again
	    fullscreenFunctionality.hideCheckbox();
	    console.log('checkbox checked =', checkbox.checked)
	    console.log('Exited fullscreen mode');
	}
});
  
console.log(threadManipulation.filenames)
// function to send message with the necessary options to the background downloader script
	 function downloader() {
		// grab the folder name from the input box
		const foldername = document.getElementById('foldername').value
		// obtain the images to download from the user selected checkboxes
		const imagesToDownload = document.querySelectorAll('input.image-checkbox:checked');

		//turn it to an array of urls from the checkbox values
		const imagesToDownloadUrls = Array.from(imagesToDownload).map((checkbox) => checkbox.value);
		const filenames = imagesToDownloadUrls.map((url) => threadManipulation.filenames[url]);
		console.log(filenames)
		//specify the foldername and media name for the background downloader script
		const options = {
			folder_name: foldername,
			fileNames: filenames
		};
		//send the message to the background script to start the download with the folder name, media name, and the array of images to download
		const message = {
			type: 'downloadImages',
			imagesToDownload: imagesToDownloadUrls,
			options,
		};

		// Send the message to the background script
		chrome.runtime.sendMessage(message, (response) => {
		});
	}
