/* ==========================================================================
   林灶辉 · 简历网站  main.js
   渲染（从 window.RESUME） + 主题/语言切换（无刷新、持久化、URL 参数） + 克制交互
   纯原生，无 import/fetch，file:// 下可直接运行。
   ========================================================================== */
(function () {
  "use strict";

  var doc = document;
  var root = doc.documentElement;

  var R = window.RESUME;
  if (!R) {
    try { console.error("[简历] 数据未加载：window.RESUME 不存在，请检查 assets/js/data.js。"); } catch (e) {}
    try {
      var warn = doc.createElement("div");
      warn.setAttribute("role", "alert");
      warn.setAttribute("style", "max-width:680px;margin:80px auto;padding:0 24px;font-family:system-ui,-apple-system,sans-serif;line-height:1.7;color:#1b1f23;");
      var l1 = doc.createElement("p");
      l1.textContent = "页面数据未能加载（assets/js/data.js）。请刷新页面，或下载 PDF 简历查看。";
      var l2 = doc.createElement("p");
      l2.setAttribute("lang", "en");
      l2.textContent = "The page data failed to load (assets/js/data.js). Please reload, or view the PDF résumé instead.";
      var a = doc.createElement("a");
      a.setAttribute("href", "./resume.pdf");
      a.textContent = "resume.pdf";
      l2.appendChild(doc.createTextNode(" → "));
      l2.appendChild(a);
      warn.appendChild(l1);
      warn.appendChild(l2);
      (doc.body || root).appendChild(warn);
    } catch (e2) {}
    return;
  }

  /* ---------- 小工具：安全地建 DOM ---------- */
  function h(tag, attrs, kids) {
    var n = doc.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        if (!Object.prototype.hasOwnProperty.call(attrs, k)) { continue; }
        var v = attrs[k];
        if (v == null) { continue; }
        if (k === "class") { n.className = v; }
        else if (k === "text") { n.textContent = v; }
        else { n.setAttribute(k, v); }
      }
    }
    if (kids != null) {
      var arr = Array.isArray(kids) ? kids : [kids];
      for (var i = 0; i < arr.length; i++) {
        var c = arr[i];
        if (c == null) { continue; }
        n.appendChild(typeof c === "string" ? doc.createTextNode(c) : c);
      }
    }
    return n;
  }
  function $(id) { return doc.getElementById(id); }
  function clear(node) { while (node.firstChild) { node.removeChild(node.firstChild); } }

  /* ---------- 初始状态：URL > localStorage > 系统/浏览器 ---------- */
  var params = new URLSearchParams(location.search);

  function readStore(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function writeStore(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }

  // 把当前选择同步进 URL 的查询参数（便于分享/刷新后保持）。
  // file:// 下个别浏览器会拒绝 replaceState，包 try/catch 静默降级，不影响功能。
  function syncUrlParam(key, val) {
    try {
      var u = new URL(location.href);
      u.searchParams.set(key, val);
      history.replaceState(null, "", u.toString());
    } catch (e) {}
  }

  function initialTheme() {
    var attr = root.getAttribute("data-theme"); // 已由 head 内联脚本按同样优先级设好
    if (attr === "light" || attr === "dark") { return attr; }
    var t = params.get("theme");
    if (t === "light" || t === "dark") { return t; }
    t = readStore("theme");
    if (t === "light" || t === "dark") { return t; }
    return (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
  }

  function initialLang() {
    var l = params.get("lang");
    if (l === "zh" || l === "en") { return l; }
    l = readStore("lang");
    if (l === "zh" || l === "en") { return l; }
    var nav = (navigator.language || "zh").toLowerCase();
    return nav.indexOf("en") === 0 ? "en" : "zh"; // 默认 zh
  }

  var state = {
    theme: initialTheme(),
    lang: initialLang(),
    filter: "__all__"
  };

  // 用 ?theme / ?lang 打开时，把该值也写入 localStorage，
  // 避免之后去掉参数刷新又回退到系统默认（首次按 URL 定主题/语言时持久化一次）。
  (function persistUrlParams() {
    var ut = params.get("theme");
    if (ut === "light" || ut === "dark") { writeStore("theme", ut); }
    var ul = params.get("lang");
    if (ul === "zh" || ul === "en") { writeStore("lang", ul); }
  })();

  /* ---------- 主题 ---------- */
  var metaTheme = $("meta-theme-color");
  function applyTheme(theme) {
    state.theme = theme;
    root.setAttribute("data-theme", theme);
    var btn = $("theme-toggle");
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    var t = R[state.lang].ui.themeLabel;
    btn.setAttribute("aria-label", t);
    btn.setAttribute("title", t);
    if (metaTheme) { metaTheme.setAttribute("content", theme === "dark" ? "#0c1215" : "#ffffff"); }
  }
  function toggleTheme() {
    var next = state.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    writeStore("theme", next);
    syncUrlParam("theme", next);
  }

  /* ========================================================================
     渲染
     ===================================================================== */
  function render() {
    var d = R[state.lang];
    root.setAttribute("lang", state.lang === "zh" ? "zh-CN" : "en");
    doc.title = d.profile.name + " · " + d.profile.title;
    renderStatic(d);

    renderNav(d);
    renderHero(d);
    renderHighlights(d);
    renderExperience(d);
    renderProjects(d);
    renderSkills(d);
    renderContact(d);
    renderFooter(d);

    applyTheme(state.theme); // 同步 aria-label 文案到当前语言
    setupReveal();
  }

  // 切换语言时同步刷新静态标签 / 无障碍名称（aria-label、skip-link、meta 描述）。
  function renderStatic(d) {
    var ui = d.ui;
    var skip = $("skip-link");
    if (skip) { skip.textContent = ui.skipLink; }
    var brand = doc.querySelector(".brand");
    if (brand) { brand.setAttribute("aria-label", ui.brandLabel); }
    var navMenu = $("nav-menu");
    if (navMenu) { navMenu.setAttribute("aria-label", ui.navLabel); }
    var menuToggle = $("menu-toggle");
    if (menuToggle) { menuToggle.setAttribute("aria-label", ui.menuLabel); }
    var meta = $("meta-description");
    if (meta) { meta.setAttribute("content", ui.metaDescription); }
  }

  function renderNav(d) {
    $("brand-name").textContent = d.profile.name;

    var links = [
      ["summary", d.nav.summary],
      ["experience", d.nav.experience],
      ["projects", d.nav.projects],
      ["skills", d.nav.skills],
      ["contact", d.nav.contact]
    ];
    var ul = $("nav-links");
    clear(ul);
    links.forEach(function (pair) {
      ul.appendChild(h("li", null, h("a", { href: "#" + pair[0], "data-target": pair[0], text: pair[1] })));
    });

    // 语言按钮状态
    var langBtns = doc.querySelectorAll(".lang-btn");
    for (var i = 0; i < langBtns.length; i++) {
      var b = langBtns[i];
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === state.lang ? "true" : "false");
    }
    $("lang-toggle").setAttribute("aria-label", d.ui.langLabel);
  }

  function renderHero(d) {
    $("hero-title").textContent = d.profile.title;
    $("hero-name").textContent = d.profile.name;
    $("hero-sub").textContent = d.profile.subtitle;
    $("scroll-hint-text").textContent = d.ui.scrollHint;

    var stats = $("hero-stats");
    clear(stats);
    d.profile.stats.forEach(function (s) {
      stats.appendChild(h("li", null, [
        h("span", { class: "stat-value", text: s.value }),
        h("span", { class: "stat-label", text: s.label })
      ]));
    });
  }

  function renderHighlights(d) {
    $("t-summary").textContent = d.nav.summary;
    var list = $("highlights-list");
    clear(list);
    d.summary.forEach(function (text, i) {
      var num = ("0" + (i + 1)).slice(-2);
      list.appendChild(h("li", { class: "reveal" }, [
        h("span", { class: "h-num", text: num }),
        h("span", { text: text })
      ]));
    });
  }

  function bulletList(cls, items) {
    var ul = h("ul", { class: cls });
    items.forEach(function (t) { ul.appendChild(h("li", { text: t })); });
    return ul;
  }

  // 把正文里的 http(s) 链接变成可点击 <a>（其余文本原样保留为文本节点，无 innerHTML）。
  var URL_RE = /https?:\/\/[^\s，。、；）)\]】]+/g;
  function linkify(text) {
    var out = [];
    var last = 0;
    var m;
    URL_RE.lastIndex = 0;
    while ((m = URL_RE.exec(text)) !== null) {
      if (m.index > last) { out.push(doc.createTextNode(text.slice(last, m.index))); }
      out.push(h("a", { href: m[0], target: "_blank", rel: "noopener noreferrer", text: m[0] }));
      last = m.index + m[0].length;
    }
    if (last < text.length) { out.push(doc.createTextNode(text.slice(last))); }
    return out.length ? out : [doc.createTextNode(text)];
  }

  function renderExperience(d) {
    $("t-experience").textContent = d.nav.experience;
    var tl = $("timeline");
    clear(tl);

    d.experience.forEach(function (job, idx) {
      var head = h("div", { class: "tl-head" }, [
        h("div", null, [
          h("h3", { class: "tl-company", text: job.company }),
          job.dept ? h("span", { class: "tl-dept", text: "　" + job.dept }) : null,
          idx === 0 ? h("span", { class: "badge-current", text: state.lang === "zh" ? "在职" : "Current" }) : null
        ]),
        h("span", { class: "tl-period", text: job.period })
      ]);

      var card = h("div", { class: "tl-card" }, [
        head,
        h("div", { class: "tl-role", text: job.role }),
        bulletList("bullet-list", job.duties)
      ]);

      if (job.results && job.results.length) {
        card.appendChild(h("div", { class: "result-block" }, [
          h("div", { class: "result-label", text: d.ui.resultsLabel }),
          (function () {
            var ul = h("ul", { class: "result-list" });
            job.results.forEach(function (t) { ul.appendChild(h("li", { text: t })); });
            return ul;
          })()
        ]));
      }

      var li = h("li", { class: "tl-item reveal" + (idx === 0 ? " current" : "") }, card);
      tl.appendChild(li);
    });
  }

  function renderProjects(d) {
    $("t-projects").textContent = d.nav.projects;
    $("project-filters").setAttribute("aria-label", d.ui.filterGroupLabel);

    // 分类（保留出现顺序，前置「全部」）
    var cats = [];
    d.projects.forEach(function (p) { if (cats.indexOf(p.category) === -1) { cats.push(p.category); } });

    var filters = $("project-filters");
    clear(filters);
    if (state.filter !== "__all__" && cats.indexOf(state.filter) === -1) { state.filter = "__all__"; }

    var defs = [["__all__", d.ui.filterAll]].concat(cats.map(function (c) { return [c, c]; }));
    defs.forEach(function (pair) {
      var btn = h("button", {
        type: "button",
        class: "filter-btn",
        "data-cat": pair[0],
        text: pair[1]
      });
      btn.setAttribute("aria-pressed", pair[0] === state.filter ? "true" : "false");
      btn.addEventListener("click", function () { setFilter(pair[0]); });
      filters.appendChild(btn);
    });

    var grid = $("projects-grid");
    clear(grid);
    d.projects.forEach(function (p) {
      var hidden = state.filter !== "__all__" && p.category !== state.filter;

      var card = h("article", { class: "proj-card reveal" + (hidden ? " is-hidden" : ""), "data-cat": p.category }, [
        h("div", { class: "proj-top" }, [
          h("h3", { class: "proj-name", text: p.name }),
          h("span", { class: "proj-tag", text: p.category })
        ]),
        p.subtitle ? h("p", { class: "proj-subtitle", text: p.subtitle }) : null,
        h("div", { class: "proj-meta" }, [
          h("span", { class: "role", text: p.role }),
          h("span", { class: "period", text: p.period })
        ]),
        h("p", { class: "proj-bg" }, linkify(p.background))
      ]);

      if (p.duties && p.duties.length) {
        var dwrap = h("div", { class: "proj-duties" }, [
          h("div", { class: "proj-section-label", text: d.ui.dutiesLabel })
        ]);
        dwrap.appendChild(bulletList("bullet-list", p.duties));
        card.appendChild(dwrap);
      }

      if (p.results && p.results.length) {
        var rwrap = h("div", { class: "proj-results" }, [
          h("div", { class: "proj-section-label", text: d.ui.resultsLabel })
        ]);
        rwrap.appendChild(bulletList("result-list", p.results));
        card.appendChild(rwrap);
      }

      grid.appendChild(card);
    });
  }

  function setFilter(cat) {
    state.filter = cat;
    var btns = doc.querySelectorAll(".filter-btn");
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute("aria-pressed", btns[i].getAttribute("data-cat") === cat ? "true" : "false");
    }
    var cards = doc.querySelectorAll(".proj-card");
    for (var j = 0; j < cards.length; j++) {
      var show = cat === "__all__" || cards[j].getAttribute("data-cat") === cat;
      cards[j].classList.toggle("is-hidden", !show);
      // 被筛选顶进视口的卡片若还没渐入过，直接补上 .in，避免出现一帧空白卡。
      if (show) { cards[j].classList.add("in"); }
    }
  }

  function renderSkills(d) {
    $("t-skills").textContent = d.nav.skills;
    var wrap = $("skills-groups");
    clear(wrap);
    d.skills.forEach(function (g) {
      var chips = h("div", { class: "chips" });
      g.items.forEach(function (it) { chips.appendChild(h("span", { class: "chip", text: it })); });
      wrap.appendChild(h("div", { class: "skill-group reveal" }, [
        h("h3", { text: g.group }),
        chips
      ]));
    });
  }

  function renderContact(d) {
    $("t-contact").textContent = d.nav.contact;
    var p = d.profile;
    var ui = d.ui;

    var items = [
      [ui.phoneLabel, p.phone, "tel:" + p.phone],
      [ui.emailLabel, p.email, "mailto:" + p.email],
      [ui.locationLabel, p.location, null],
      [ui.educationLabel, p.education, null],
      [ui.yearsLabel, p.years, null],
      [ui.salaryLabel, p.salary, null]
    ];
    var dl = $("contact-list");
    clear(dl);
    items.forEach(function (it) {
      var dd = h("dd", null, it[2] ? h("a", { href: it[2], text: it[1] }) : it[1]);
      dl.appendChild(h("div", { class: "contact-item" }, [
        h("dt", { text: it[0] }),
        dd
      ]));
    });

    var status = $("contact-status");
    clear(status);
    var sep = state.lang === "zh" ? "：" : ": ";
    status.appendChild(doc.createTextNode(ui.statusLabel + sep));
    status.appendChild(h("strong", { text: p.status }));

    $("download-pdf-label").textContent = ui.downloadPdf;
    $("download-pdf").setAttribute("aria-label", ui.downloadPdf);
  }

  function renderFooter(d) {
    var p = d.profile;
    $("foot-name").textContent = p.name + " · " + p.title;
    $("foot-meta").textContent = p.location + " · " + p.email;
  }

  /* ========================================================================
     交互
     ===================================================================== */

  // 渐入（一次性）
  var revealObserver = null;
  function setupReveal() {
    var els = doc.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      for (var i = 0; i < els.length; i++) { els[i].classList.add("in"); }
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            revealObserver.unobserve(e.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    }
    for (var j = 0; j < els.length; j++) { revealObserver.observe(els[j]); }
  }

  // 滚动进度条
  var progressBar = $("progress-bar");
  var ticking = false;
  function onScroll() {
    if (ticking) { return; }
    ticking = true;
    requestAnimationFrame(function () {
      var st = window.pageYOffset || doc.documentElement.scrollTop;
      var max = doc.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? Math.min(1, st / max) : 0;
      progressBar.style.width = (pct * 100).toFixed(2) + "%";
      ticking = false;
    });
  }

  // 导航激活高亮
  function setupNavSpy() {
    if (!("IntersectionObserver" in window)) { return; }
    var sections = ["summary", "experience", "projects", "skills", "contact"];
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) { return; }
        var id = e.target.id;
        var links = doc.querySelectorAll(".nav-links a");
        for (var i = 0; i < links.length; i++) {
          links[i].classList.toggle("active", links[i].getAttribute("data-target") === id);
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (id) {
      var s = $(id);
      if (s) { spy.observe(s); }
    });
  }

  // 移动端菜单
  function setupMenu() {
    var nav = $("nav");
    var toggle = $("menu-toggle");
    var menu = $("nav-menu");

    function isOpen() { return nav.classList.contains("menu-open"); }
    function closeMenu(focusToggle) {
      if (!isOpen()) { return; }
      nav.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      if (focusToggle) { try { toggle.focus(); } catch (e) {} }
    }
    function openMenu() {
      nav.classList.add("menu-open");
      toggle.setAttribute("aria-expanded", "true");
      var first = menu.querySelector("a");
      if (first) { try { first.focus(); } catch (e) {} }
    }

    toggle.addEventListener("click", function () {
      if (isOpen()) { closeMenu(false); } else { openMenu(); }
    });
    // 点击导航项后收起
    $("nav-links").addEventListener("click", function (e) {
      if (e.target.closest("a")) { closeMenu(false); }
    });
    // Esc 关闭并把焦点还给汉堡按钮
    doc.addEventListener("keydown", function (e) {
      if ((e.key === "Escape" || e.key === "Esc") && isOpen()) { closeMenu(true); }
    });
    // 点击菜单外部收起
    doc.addEventListener("click", function (e) {
      if (isOpen() && !e.target.closest("#nav")) { closeMenu(false); }
    });
  }

  /* ---------- 事件绑定 ---------- */
  $("theme-toggle").addEventListener("click", toggleTheme);

  doc.querySelectorAll(".lang-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var lang = b.getAttribute("data-lang");
      if (lang === state.lang) { return; }
      state.lang = lang;
      writeStore("lang", lang);
      syncUrlParam("lang", lang);
      state.filter = "__all__";
      render();
    });
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  /* ---------- 启动 ---------- */
  render();
  setupMenu();
  setupNavSpy();
  onScroll();
})();
