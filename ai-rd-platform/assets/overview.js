/* 能力全景：hero + 分组卡片 + 文档阅读抽屉（App.openDoc 供全站复用） */
(function () {
  const GROUPS = [
    { key: "rules", title: "行为规则", desc: "AI 的行为宪法：思考路径、交互底线", cats: ["rules"] },
    { key: "commands", title: "工作流命令", desc: "gm-prd / gm-dev / gm-ship 与 speckit 套件", cats: ["commands"] },
    { key: "specs-dev", title: "开发规范", desc: "分层、视图、模型、代码风格等强制标准", cats: ["specs-developer", "specs-common", "specs-product"] },
    { key: "specs-biz", title: "业务领域", desc: "订单、商品、供应链等六大领域知识", cats: ["specs-business"] },
    { key: "skills", title: "技能模板", desc: "代码生成、需求分析、测试用例的可复用模板", cats: ["skills-developer", "skills-product", "skills-tester", "skills-common"] },
    { key: "agents", title: "角色", desc: "产品经理 / 开发 / 审查 / 测试四个 AI 角色", cats: ["agents"] },
    { key: "overview", title: "系统总览", desc: "整个平台的架构与业务地图", cats: ["overview"] },
  ];

  function docsIn(cats) {
    if (!window.KNOWLEDGE) return [];
    return KNOWLEDGE.docs.filter((d) => cats.includes(d.category));
  }

  function excerpt(doc) {
    for (const sec of doc.sections) {
      const text = sec.content.replace(/^#\s+.+$/m, "").replace(/[#>*`|\-\[\]]/g, "").replace(/\s+/g, " ").trim();
      if (text.length > 20) return text.slice(0, 72) + (text.length > 72 ? "…" : "");
    }
    return "";
  }

  function render() {
    const root = document.getElementById("view-overview");
    if (root.dataset.rendered) return;
    root.dataset.rendered = "1";

    if (!window.KNOWLEDGE) {
      root.innerHTML =
        '<div class="empty-state"><span class="es-mark">空</span>知识库未构建。请先在终端运行：<code>python3 scripts/build_knowledge.py</code></div>';
      return;
    }

    const isReadme = (d) => /README\.md$/i.test(d.path);
    const count = (pred) => KNOWLEDGE.docs.filter((d) => !isReadme(d) && pred(d)).length;
    const specsCount = count((d) => d.category.startsWith("specs"));
    const skillsCount = count((d) => d.category.startsWith("skills"));
    const agentsCount = count((d) => d.category === "agents");
    const cmdCount = count((d) => d.category === "commands");

    const hero = `
      <div class="hero">
        <p class="hero-kicker">演示公司 · 生鲜供应链系统</p>
        <h1 class="hero-title">把整套 AI 研发能力，<br>开放给每一个人</h1>
        <p class="hero-desc">这里是系统内置 AI 辅助开发框架的全景。不写代码的你，也可以在这里读懂系统、问清细节、提出需求。</p>
        <div class="hero-stats">
          <div class="stat"><b>${specsCount}</b><span>份规范</span></div>
          <div class="stat"><b>${skillsCount}</b><span>个技能模板</span></div>
          <div class="stat"><b>${agentsCount}</b><span>个 AI 角色</span></div>
          <div class="stat"><b>${cmdCount}</b><span>条工作流命令</span></div>
        </div>
        <div class="hero-actions">
          <button class="btn btn-primary" data-goto="chat">开始提问</button>
          <button class="btn btn-ghost" data-goto="workflow">看工作流怎么转</button>
        </div>
      </div>`;

    const groups = GROUPS.map((g) => {
      const docs = docsIn(g.cats);
      if (!docs.length) return "";
      return `
        <div class="doc-group">
          <div class="group-head">
            <h2>${g.title}</h2>
            <span class="group-desc">${g.desc} · ${docs.length} 篇</span>
          </div>
          <div class="doc-grid">
            ${docs
              .map(
                (d) => `
              <div class="card clickable doc-card" data-doc="${d.id}" role="button" tabindex="0">
                <h3>${d.title}</h3>
                <p class="doc-excerpt">${excerpt(d)}</p>
                <span class="doc-path">${d.path}</span>
              </div>`
              )
              .join("")}
          </div>
        </div>`;
    }).join("");

    root.innerHTML = hero + groups;

    root.querySelectorAll("[data-goto]").forEach((b) =>
      b.addEventListener("click", () => App.show(b.dataset.goto))
    );
    root.querySelectorAll(".doc-card").forEach((c) => {
      c.addEventListener("click", () => App.openDoc(c.dataset.doc));
      c.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); App.openDoc(c.dataset.doc); }
      });
    });
  }

  /* ---------- 文档阅读抽屉（全站复用） ---------- */
  function ensureDrawer() {
    let el = document.getElementById("doc-drawer");
    if (el) return el;
    const rootEl = document.getElementById("doc-drawer-root");
    rootEl.innerHTML = `
      <div class="drawer-mask" id="doc-drawer-mask"></div>
      <aside class="drawer" id="doc-drawer" role="dialog" aria-modal="true" aria-label="文档阅读">
        <div class="drawer-head">
          <div>
            <h2 id="doc-drawer-title"></h2>
            <span class="doc-path" id="doc-drawer-path"></span>
          </div>
          <button class="drawer-close" id="doc-drawer-close" aria-label="关闭">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>
        <div class="drawer-body md-body" id="doc-drawer-body"></div>
      </aside>`;
    const close = () => rootEl.classList.remove("open");
    document.getElementById("doc-drawer-mask").addEventListener("click", close);
    document.getElementById("doc-drawer-close").addEventListener("click", close);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    return document.getElementById("doc-drawer");
  }

  App.openDoc = function (docId) {
    if (!window.KNOWLEDGE) return;
    const doc = KNOWLEDGE.docs.find((d) => d.id === docId);
    if (!doc) return;
    ensureDrawer();
    document.getElementById("doc-drawer-title").textContent = doc.title;
    document.getElementById("doc-drawer-path").textContent = doc.path;
    const full = doc.sections
      .map((s) => (s.heading === "开篇" ? s.content : `## ${s.heading}\n\n${s.content}`))
      .join("\n\n");
    document.getElementById("doc-drawer-body").innerHTML = MD.render(full);
    const rootEl = document.getElementById("doc-drawer-root");
    rootEl.classList.add("open");
    document.getElementById("doc-drawer-body").scrollTop = 0;
    document.getElementById("doc-drawer-close").focus();
  };

  App.onShow.overview = render;
  window.addEventListener("DOMContentLoaded", render);
})();
