/* פרוג ושות' — תפריט דיגיטלי. הנתונים מגיעים מ-menu-data.js */
(function () {
  "use strict";

  var data = window.FRUG_MENU;
  if (!data) return;
  var venue = data.venue || {};
  var root = document.documentElement;

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var allowVideo = !reduceMotion && !saveData;

  /* ---------- Language ----------
     Hebrew is the base text in menu-data.js; English sits next to it in an `en: { ... }` field.
     Anything without an English version falls back to the Hebrew. */
  var lang = root.getAttribute("lang") === "en" ? "en" : "he";
  var UI = {
    he: {
      title: "פרוג ושות' · התפריט", skip: "דילוג לתפריט", notices: "מבצעים", tabs: "קטגוריות התפריט",
      vibe: "האווירה", close: "סגירה", theme: "החלפת ערכת צבעים", bigPhoto: "תמונה גדולה: ", shekels: " שקלים",
      booking: "הזמנת שולחן", instagram: "אינסטגרם", maps: "ניווט אלינו", wolt: "משלוח בוולט",
      langBtn: "EN", langLabel: "English"
    },
    en: {
      title: "Frug & Co. · Menu", skip: "Skip to menu", notices: "Deals", tabs: "Menu categories",
      vibe: "The Vibe", close: "Close", theme: "Switch color theme", bigPhoto: "Large photo: ", shekels: " shekels",
      booking: "Book a table", instagram: "Instagram", maps: "Directions", wolt: "Order on Wolt",
      langBtn: "עב", langLabel: "עברית"
    }
  };
  var TAGS_EN = { "טבעוני": "Vegan", "כשר": "Kosher", "חלבי": "Dairy" };
  var LABELS_EN = { "כוס": "Glass", "בקבוק": "Bottle", "פיינט": "Pint", "ליטר": "Liter", "שליש": "330 ml", "קנקן": "Pitcher" };
  function ui(key) { return UI[lang][key]; }
  // The English value of a field when English is on and it exists, otherwise the Hebrew one.
  function tr(obj, key) {
    if (!obj) return undefined;
    if (lang === "en" && obj.en && obj.en[key] != null && obj.en[key] !== "") return obj.en[key];
    return obj[key];
  }
  function trTag(t) { return lang === "en" && TAGS_EN[t] ? TAGS_EN[t] : t; }
  function trLabel(l) { return lang === "en" && LABELS_EN[l] ? LABELS_EN[l] : l; }

  /* ---------- Visit counter (GoatCounter: no cookies, no personal data) ----------
     Page views are counted as /qr, /nfc or /direct by the ?src= the QR / NFC tag carries.
     Events: dish/<name> when a dish is opened, click/<link> for the footer buttons. */
  var gcCode = (data.analytics || {}).goatcounter;
  var gcQueue = [];
  function track(path, title, isEvent) {
    if (!gcCode) return;
    var hit = { path: path, title: title || path, event: !!isEvent };
    if (window.goatcounter && window.goatcounter.count) window.goatcounter.count(hit);
    else gcQueue.push(hit);
  }
  var src = null;
  try { src = new URLSearchParams(location.search).get("src"); } catch (e) {}
  if (src && !/^[a-z0-9-]{1,20}$/.test(src)) src = "other";
  // Drop ?src from the address bar so a link shared onward isn't counted as another scan.
  if (src && history.replaceState) {
    var keepLang = new URLSearchParams(location.search).get("lang") === "en" ? "?lang=en" : "";
    try { history.replaceState(null, "", location.pathname + keepLang + location.hash); } catch (e) {}
  }
  if (gcCode) {
    window.goatcounter = window.goatcounter || {};
    window.goatcounter.no_onload = true;
    var gcs = document.createElement("script");
    gcs.async = true;
    gcs.src = "https://gc.zgo.at/count.js";
    gcs.setAttribute("data-goatcounter", "https://" + gcCode + ".goatcounter.com/count");
    gcs.onload = function () {
      gcQueue.splice(0).forEach(function (h) { window.goatcounter.count(h); });
    };
    document.head.appendChild(gcs);
    track("/" + (src || "direct"), src ? "כניסה דרך " + src.toUpperCase() : "כניסה ישירה", false);
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function priceEl(value) {
    var p = el("span", "price");
    p.appendChild(el("span", "price__num", String(value)));
    p.appendChild(el("span", "price__cur", "₪"));
    p.setAttribute("aria-label", value + ui("shekels"));
    return p;
  }

  // One price, several unlabelled sizes ([32, 69] -> "32/69"), or labelled ones ([{l:"כוס", v:36}, ...]).
  function priceBlock(item) {
    if (item.prices && item.prices.length) {
      if (typeof item.prices[0] !== "object") {
        var p = el("span", "price");
        var num = el("span", "price__num", item.prices.join("/"));
        num.dir = "ltr";
        p.appendChild(num);
        p.appendChild(el("span", "price__cur", "₪"));
        return p;
      }
      var list = el("span", "price-list");
      item.prices.forEach(function (pr) {
        var line = el("span", "price-list__row");
        line.appendChild(el("span", "price__label", trLabel(pr.l)));
        line.appendChild(priceEl(pr.v));
        list.appendChild(line);
      });
      return list;
    }
    return item.price != null ? priceEl(item.price) : null;
  }

  function tagEl(text) {
    return el("span", "tag" + (text === "טבעוני" ? " tag--veg" : ""), trTag(text));
  }

  function metaRow(item, cls) {
    var meta = el("div", cls);
    var price = priceBlock(item);
    if (price) meta.appendChild(price);
    (item.tags || []).forEach(function (t) { meta.appendChild(tagEl(t)); });
    return meta;
  }

  var PLAY_ICON = '<svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true"><path d="M7 4.5v15l12.500-7.500z" fill="currentColor"/></svg>';

  /* ---------- Venue details ---------- */
  var addr = document.getElementById("venue-address");
  var noticesBox = document.getElementById("notices");
  var notices = venue.notices || (venue.notice ? [venue.notice] : []);

  function renderVenue() {
    if (addr) {
      var address = tr(venue, "address");
      if (address) addr.querySelector("span").textContent = address;
      if (venue.mapsUrl) addr.href = venue.mapsUrl; else addr.removeAttribute("href");
    }
    if (noticesBox) {
      noticesBox.textContent = "";
      noticesBox.setAttribute("aria-label", ui("notices"));
      notices.forEach(function (n) {
        if (!n || !(n.title || n.text)) return;
        var box = el(n.href ? "a" : "div", "notice");
        if (n.href) box.href = n.href;
        box.appendChild(el("strong", "notice__title", tr(n, "title") || ""));
        box.appendChild(el("span", "notice__text", tr(n, "text") || ""));
        noticesBox.appendChild(box);
      });
      noticesBox.hidden = !noticesBox.children.length;
    }
  }

  /* ---------- Menu ---------- */
  var main = document.getElementById("menu");
  var tabsBox = document.getElementById("tabs");
  var tabById = {};

  function buildBanner(sec, title) {
    var b = sec.banner;
    var wrap = el("div", "sec__banner");
    if (b.video && allowVideo) {
      var v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true;
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      v.preload = "none";
      if (b.poster) v.poster = b.poster;
      v.dataset.src = b.video;
      v.setAttribute("aria-hidden", "true");
      v.tabIndex = -1;
      wrap.appendChild(v);
    } else {
      var img = document.createElement("img");
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      img.src = b.image || b.poster;
      wrap.appendChild(img);
    }
    if (b.ratio) wrap.style.aspectRatio = b.ratio;
    var text = el("div", "sec__banner-text");
    text.appendChild(title);
    var caption = tr(b, "caption");
    if (caption) text.appendChild(el("p", "sec__caption", caption));
    wrap.appendChild(text);
    return wrap;
  }

  function buildItem(item, opts) {
    opts = opts || {};
    var compact = !!opts.compact && !item.img;
    var li = document.createElement("li");
    var row = el("div", "item" + (item.img ? " item--media" : "") + (compact ? " item--compact" : ""));

    var text = el("div", "item__text");
    var name = tr(item, "name"), desc = tr(item, "desc"), note = tr(item, "note");
    text.appendChild(el(opts.level || "h3", "item__name", name));
    if (desc) text.appendChild(el("p", "item__desc", desc));
    if (note) text.appendChild(el("p", "item__note", note));
    if (compact) {
      // drinks-style row: name on one side, price(s) on the other
      if (item.tags && item.tags.length) {
        var tags = el("div", "item__tags");
        item.tags.forEach(function (t) { tags.appendChild(tagEl(t)); });
        text.appendChild(tags);
      }
      row.appendChild(text);
      var side = el("div", "item__side");
      var price = priceBlock(item);
      if (price) side.appendChild(price);
      row.appendChild(side);
    } else {
      text.appendChild(metaRow(item, "item__meta"));
      row.appendChild(text);
    }

    if (item.img) {
      // The photo is the real button (keyboard / screen readers); tapping anywhere on the row works too.
      var fig = el("button", "item__figure");
      fig.type = "button";
      fig.setAttribute("aria-haspopup", "dialog");
      fig.setAttribute("aria-label", ui("bigPhoto") + name);
      var img = document.createElement("img");
      img.className = "item__img";
      img.alt = "";
      img.width = 440; img.height = 330;
      img.loading = "lazy";
      img.decoding = "async";
      img.src = "assets/dishes/" + item.img + "-thumb.jpg";
      fig.appendChild(img);
      if (item.video && allowVideo) {
        var play = el("span", "item__play");
        play.innerHTML = PLAY_ICON;
        fig.appendChild(play);
      }
      row.appendChild(fig);
      row.addEventListener("click", function () { openSheet(item, fig); });
    }

    li.appendChild(row);
    return li;
  }

  function renderMenu() {
  main.textContent = "";
  tabsBox.textContent = "";
  tabById = {};
  (data.sections || []).forEach(function (sec) {
    var section = el("section", "sec");
    section.id = sec.id;
    var titleId = "t-" + sec.id;
    section.setAttribute("aria-labelledby", titleId);

    var title = el("h2", "sec__title", tr(sec, "title"));
    title.id = titleId;
    var body = section;
    if (sec.deals) {
      section.classList.add("sec--deals");
      body = el("div", "deals");
      section.appendChild(body);
    }
    body.appendChild(sec.banner ? buildBanner(sec, title) : title);
    var sub = tr(sec, "sub");
    if (sub) body.appendChild(el("p", "sec__sub", sub));

    function buildList(items, level) {
      var list = el("ul", "items");
      (items || []).forEach(function (item) {
        list.appendChild(buildItem(item, { compact: sec.compact, level: level }));
      });
      return list;
    }
    if (sec.groups) {
      sec.groups.forEach(function (g) {
        var group = el("div", "group");
        group.appendChild(el("h3", "group__title", tr(g, "title")));
        group.appendChild(buildList(g.items, "h4"));
        body.appendChild(group);
      });
    } else {
      body.appendChild(buildList(sec.items, "h3"));
    }
    main.appendChild(section);

    var tab = el("a", "tab", tr(sec, "short") || tr(sec, "title"));
    tab.href = "#" + sec.id;
    tabsBox.appendChild(tab);
    tabById[sec.id] = tab;
  });
  sections = Array.prototype.slice.call(document.querySelectorAll(".sec"));
  }

  /* ---------- Tabs: highlight the section in view ---------- */
  function setActive(id) {
    Object.keys(tabById).forEach(function (key) {
      var on = key === id;
      var tab = tabById[key];
      if (on === (tab.getAttribute("aria-current") === "true")) return;
      if (on) {
        tab.setAttribute("aria-current", "true");
        var box = tabsBox.getBoundingClientRect();
        var r = tab.getBoundingClientRect();
        var delta = (r.left + r.width / 2) - (box.left + box.width / 2);
        tabsBox.scrollBy({ left: delta, behavior: reduceMotion ? "auto" : "smooth" });
      } else {
        tab.removeAttribute("aria-current");
      }
    });
  }

  var sections = [];
  var spyQueued = false;
  function updateActive() {
    spyQueued = false;
    if (!sections.length) return;
    var line = window.innerHeight * 0.35;
    var current = sections[0];
    sections.forEach(function (s) { if (s.getBoundingClientRect().top <= line) current = s; });
    setActive(current.id);
  }
  function queueSpy() {
    if (spyQueued) return;
    spyQueued = true;
    window.setTimeout(updateActive, 60);
  }
  window.addEventListener("scroll", queueSpy, { passive: true });
  window.addEventListener("resize", queueSpy);

  renderVenue();
  renderMenu();

  // A link straight to a category (…/#pizza): the sections are built here, so jump once they exist.
  if (location.hash.length > 1) {
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target && target.classList.contains("sec")) target.scrollIntoView();
  }
  updateActive();

  /* ---------- Gallery ---------- */
  var vibe = document.getElementById("vibe");
  var strip = document.getElementById("vibe-strip");
  var vibeTitle = document.getElementById("vibe-title");
  function renderGallery() {
  if (vibe && strip && data.gallery && data.gallery.length) {
    strip.textContent = "";
    if (vibeTitle) vibeTitle.textContent = ui("vibe");
    data.gallery.forEach(function (g) {
      var node;
      if (g.video && allowVideo) {
        node = document.createElement("video");
        node.muted = true; node.loop = true; node.playsInline = true;
        node.setAttribute("muted", ""); node.setAttribute("playsinline", "");
        node.preload = "none";
        node.poster = g.src;
        node.dataset.src = g.video;
        node.setAttribute("aria-label", tr(g, "alt") || "");
        node.tabIndex = -1;
      } else {
        node = document.createElement("img");
        node.alt = tr(g, "alt") || "";
        node.loading = "lazy"; node.decoding = "async";
        node.src = g.src;
      }
      strip.appendChild(node);
    });
    vibe.hidden = false;
  }
  }
  renderGallery();

  /* ---------- Videos: load when near, play only while visible ---------- */
  function loadVideo(v) {
    if (v.dataset.src && !v.getAttribute("src")) v.src = v.dataset.src;
  }
  function safePlay(v) {
    var p = v.play();
    if (p && p.catch) p.catch(function () {});
  }

  var vio = allowVideo && "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) { loadVideo(v); safePlay(v); } else if (!v.paused) { v.pause(); }
    });
  }, { rootMargin: "120px 0px", threshold: 0.2 }) : null;
  // Called after every build of the page (first load and each language switch).
  function watchVideos() {
    if (!allowVideo) return; /* poster only */
    var videos = Array.prototype.slice.call(document.querySelectorAll("video[data-src]"));
    if (vio) {
      vio.disconnect();
      videos.forEach(function (v) { vio.observe(v); });
    } else {
      videos.forEach(function (v) { if (v.hasAttribute("data-eager")) { loadVideo(v); safePlay(v); } });
    }
  }
  watchVideos();

  /* ---------- Dish sheet ---------- */
  var sheet = document.getElementById("sheet");
  var sheetMedia = document.getElementById("sheet-media");
  var sheetTitle = document.getElementById("sheet-title");
  var sheetDesc = document.getElementById("sheet-desc");
  var sheetNote = document.getElementById("sheet-note");
  var sheetMeta = document.getElementById("sheet-meta");
  var lastTrigger = null;

  function openSheet(item, trigger) {
    lastTrigger = trigger || null;
    track("dish/" + item.name, item.name, true);
    sheetMedia.textContent = "";
    sheetMedia.className = "sheet__media";

    if (item.video && allowVideo) {
      var v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true; v.autoplay = true;
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      v.poster = "assets/dishes/" + item.img + ".jpg";
      v.src = item.video;
      v.setAttribute("aria-label", tr(item, "name"));
      sheetMedia.classList.add("sheet__media--tall");
      sheetMedia.appendChild(v);
      safePlay(v);
    } else if (item.img) {
      var img = document.createElement("img");
      img.src = "assets/dishes/" + item.img + ".jpg";
      img.alt = tr(item, "name");
      img.decoding = "async";
      if (item.tall) sheetMedia.classList.add("sheet__media--tall");
      sheetMedia.appendChild(img);
    }

    sheet.classList.toggle("sheet--text", !item.img);
    sheetTitle.textContent = tr(item, "name");
    sheetDesc.textContent = tr(item, "desc") || "";
    sheetNote.textContent = tr(item, "note") || "";
    sheetMeta.textContent = "";
    if (item.price != null) sheetMeta.appendChild(priceEl(item.price));
    (item.tags || []).forEach(function (t) { sheetMeta.appendChild(tagEl(t)); });

    if (typeof sheet.showModal === "function") sheet.showModal(); else sheet.setAttribute("open", "");
    sheet.scrollTop = 0;
    root.style.overflow = "hidden";
  }

  // Runs on every way of closing (button, backdrop, Esc); safe to call twice.
  function afterClose() {
    root.style.overflow = "";
    var v = sheetMedia.querySelector("video");
    if (v) v.pause();
    sheetMedia.textContent = "";
    if (lastTrigger && lastTrigger.focus) lastTrigger.focus({ preventScroll: true });
    lastTrigger = null;
  }

  function closeSheet() {
    if (typeof sheet.close === "function" && sheet.open) sheet.close(); else sheet.removeAttribute("open");
    afterClose();
  }

  // The browser's own close event (Esc) can arrive late; ignore it if another dish was opened meanwhile.
  sheet.addEventListener("close", function () { if (!sheet.open) afterClose(); });
  sheet.querySelector(".sheet__close").addEventListener("click", closeSheet);
  sheet.addEventListener("click", function (e) { if (e.target === sheet) closeSheet(); });

  /* ---------- Footer ---------- */
  var footAddr = document.getElementById("foot-address");
  var links = document.getElementById("foot-links");
  var fine = document.getElementById("foot-fine");
  function addLink(label, href, primary, external, key) {
    if (!href) return;
    var a = el("a", "btn" + (primary ? " btn--primary" : ""), label);
    a.href = href;
    if (key) a.addEventListener("click", function () { track("click/" + key, label, true); });
    if (external) { a.target = "_blank"; a.rel = "noopener"; }
    links.appendChild(a);
  }
  function renderFooter() {
    if (footAddr) footAddr.textContent = [tr(venue, "name"), tr(venue, "address")].filter(Boolean).join(" · ");
    if (links) {
      links.textContent = "";
      addLink(ui("booking"), venue.booking, true, true, "booking");
      addLink(ui("instagram"), venue.instagram, false, true, "instagram");
      addLink(ui("maps"), venue.mapsUrl, false, true, "maps");
      addLink(ui("wolt"), venue.wolt, false, true, "wolt");
      if (venue.phone) {
        addLink(venue.phoneDisplay || venue.phone, "tel:" + venue.phone, false, false, "phone");
        links.lastElementChild.dir = "ltr";
      }
      var last = links.lastElementChild;
      if (last && links.children.length % 2 === 1) last.style.gridColumn = "1 / -1";
    }
    if (fine) {
      fine.textContent = "";
      [].concat(tr(venue, "finePrint") || []).forEach(function (line) { fine.appendChild(el("span", "foot__fine-line", line)); });
    }
  }
  renderFooter();

  /* ---------- Theme ---------- */
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    if (themeMeta) themeMeta.setAttribute("content", t === "light" ? "#eeece1" : "#131110");
    document.querySelectorAll("img[data-logo]").forEach(function (img) {
      img.src = "assets/brand/logo-" + (t === "light" ? "black" : "white") + ".png";
    });
  }
  applyTheme(root.getAttribute("data-theme") === "light" ? "light" : "dark");

  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      try { localStorage.setItem("frug-theme", next); } catch (e) {}
    });
  }

  /* ---------- Language switch ---------- */
  var langBtn = document.querySelector(".lang-toggle");
  var page = document.querySelector(".page");
  var skip = document.querySelector(".skip");

  // Texts that live in index.html rather than in the menu data.
  function renderChrome() {
    document.title = ui("title");
    if (skip) skip.textContent = ui("skip");
    var logo = document.querySelector(".hero__logo");
    if (logo) logo.alt = tr(venue, "name") || "";
    if (tabsBox && tabsBox.parentNode) tabsBox.parentNode.setAttribute("aria-label", ui("tabs"));
    if (toggle) toggle.setAttribute("aria-label", ui("theme"));
    var close = sheet.querySelector(".sheet__close");
    if (close) close.setAttribute("aria-label", ui("close"));
    if (langBtn) {
      langBtn.textContent = ui("langBtn");
      langBtn.lang = lang === "en" ? "he" : "en";
      langBtn.setAttribute("aria-label", ui("langLabel"));
    }
  }
  renderChrome();

  function setLang(next) {
    if (next === lang) return;
    // Keep the reader at the same category after the page is rebuilt.
    var anchor = null, offset = 0;
    for (var i = sections.length - 1; i >= 0; i--) {
      var top = sections[i].getBoundingClientRect().top;
      if (top <= 80) { anchor = sections[i].id; offset = top; break; }
    }
    lang = next;
    root.lang = next;
    root.dir = next === "en" ? "ltr" : "rtl";
    try { localStorage.setItem("frug-lang", next); } catch (e) {}
    if (/[?&]lang=/.test(location.search) && history.replaceState) {
      try { history.replaceState(null, "", location.pathname + location.hash); } catch (e) {}
    }
    track("click/lang-" + next, next === "en" ? "English" : "עברית", true);
    if (sheet.open) closeSheet();
    renderChrome();
    renderVenue();
    renderMenu();
    renderGallery();
    renderFooter();
    watchVideos();
    if (anchor) {
      var target = document.getElementById(anchor);
      if (target) {
        var y = window.scrollY + target.getBoundingClientRect().top - offset;
        try { window.scrollTo({ top: y, behavior: "instant" }); } catch (e) { window.scrollTo(0, y); }
      }
    }
    updateActive();
  }

  if (langBtn) {
    langBtn.addEventListener("click", function () {
      var next = lang === "en" ? "he" : "en";
      if (reduceMotion || !page) { setLang(next); return; }
      page.classList.add("is-switching");
      window.setTimeout(function () {
        try { setLang(next); } finally { page.classList.remove("is-switching"); }
      }, 180);
    });
  }
})();
