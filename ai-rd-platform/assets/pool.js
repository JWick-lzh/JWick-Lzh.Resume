/* 需求池：列表 / 查看 / 删除 / 导出 Markdown + 写文档（模板 AI 生成） */
(function () {
  const STATUS = {
    draft: { label: "草稿", cls: "badge-draft" },
    checked: { label: "已评审", cls: "badge-accent" },
    exported: { label: "已导出", cls: "badge-ok" },
  };

  const DOC_TEMPLATES = [
    {
      key: "prd", name: "PRD",
      hint: "完整产品需求文档：背景、目标、方案、验收",
      specHint: ["需求文档规范", "prd-gen"],
    },
    {
      key: "card", name: "需求卡片",
      hint: "一页纸需求速写：给评审会用",
      specHint: ["requirement-card"],
    },
    {
      key: "handoff", name: "交接单",
      hint: "产品交给开发的交接说明",
      specHint: ["product-handoff"],
    },
  ];

  function tplContext(t) {
    if (!window.KNOWLEDGE) return "";
    const blocks = [];
    for (const doc of KNOWLEDGE.docs) {
      if (t.specHint.some((h) => doc.path.includes(h))) {
        blocks.push(`【${doc.title}】\n` + doc.sections.map((s) => `## ${s.heading}\n${s.content}`).join("\n").slice(0, 4000));
      }
    }
    return blocks.join("\n\n").slice(0, 8000);
  }

  function render() {
    const root = document.getElementById("view-pool");
    root.innerHTML = `
      <h1 class="view-title">需求池</h1>
      <p class="view-sub">这里的需求只存在你的浏览器里。重要的需求记得导出 Markdown 发给产品或开发同学。</p>
      <div class="card write-doc">
        <div class="write-doc-head">
          <h3>写文档</h3>
          <span class="group-desc">选个模板，AI 按项目规范生成初稿</span>
        </div>
        <div class="write-doc-row">
          <select id="wd-tpl" aria-label="文档模板">
            ${DOC_TEMPLATES.map((t) => `<option value="${t.key}">${t.name} — ${t.hint}</option>`).join("")}
          </select>
          <input type="text" id="wd-topic" placeholder="一句话主题，如：司机端签收拍照">
          <button class="btn btn-primary" id="wd-gen">生成</button>
        </div>
        <div id="wd-out"></div>
      </div>
      <div id="pool-list"></div>`;

    document.getElementById("wd-gen").addEventListener("click", genDoc);
    renderList();
  }

  function renderList() {
    const listEl = document.getElementById("pool-list");
    const list = Store.list();
    if (!list.length) {
      listEl.innerHTML = `<div class="empty-state"><span class="es-mark">空</span>还没有需求。去「提需求」提交第一个，AI 会帮你评审。</div>`;
      return;
    }
    const highlight = sessionStorage.getItem("pt.highlight");
    sessionStorage.removeItem("pt.highlight");
    listEl.innerHTML = list
      .map((r) => {
        const st = STATUS[r.status] || STATUS.draft;
        return `
        <div class="card pool-item ${r.id === highlight ? "pool-new" : ""}" data-id="${r.id}">
          <div class="pool-item-main">
            <div class="pool-item-head">
              <h3>${escapeHtml(r.title)}</h3>
              <span class="badge ${st.cls}">${st.label}</span>
              ${r.check ? `<span class="badge ${r.check.passed ? "badge-ok" : "badge-warn"}">${r.check.passed ? "评审通过" : "待完善"}</span>` : ""}
              ${r.prd ? '<span class="badge badge-accent">含 PRD</span>' : ""}
            </div>
            <p class="pool-item-meta">${(r.modules || []).join(" · ") || "未选模块"} · ${(r.updatedAt || "").slice(0, 16).replace("T", " ")}</p>
          </div>
          <div class="pool-item-actions">
            <button class="btn btn-ghost" data-act="view">查看</button>
            <button class="btn btn-ghost" data-act="export">导出</button>
            <button class="btn btn-danger" data-act="del">删除</button>
          </div>
        </div>`;
      })
      .join("");

    listEl.querySelectorAll(".pool-item").forEach((item) => {
      const id = item.dataset.id;
      item.querySelector('[data-act="view"]').addEventListener("click", () => viewReq(id));
      item.querySelector('[data-act="export"]').addEventListener("click", () => { exportMd(Store.get(id)); renderList(); });
      item.querySelector('[data-act="del"]').addEventListener("click", () => {
        if (confirm("确定删除这条需求吗？删除后不可恢复。")) { Store.remove(id); renderList(); }
      });
    });
  }

  function escapeHtml(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function viewReq(id) {
    const r = Store.get(id);
    if (!r) return;
    const li = (arr) => (arr && arr.length ? arr.map((x) => `- ${x}`).join("\n") : "- 无");
    const md = [
      `# ${r.title}`,
      "",
      "## 背景", r.background || "（未填写）",
      "", "## 期望效果", r.expectation || "（未填写）",
      "", "## 涉及模块", (r.modules || []).join("、") || "（未选择）",
      r.check
        ? `\n## AI 评审\n**结论：${r.check.passed ? "通过" : "需要完善"}**\n\n### 需求问题\n${li(r.check.issues)}\n\n### 影响面\n${li(r.check.impacts)}\n\n### 建议补充\n${li(r.check.suggestions)}`
        : "",
      r.prd ? `\n---\n\n${r.prd}` : "",
    ].join("\n");
    openTextDrawer(r.title, md);
  }

  /* 复用文档抽屉展示任意 Markdown */
  function openTextDrawer(title, md) {
    if (!window.KNOWLEDGE) return;
    // 借用 App.openDoc 的抽屉结构：手动填充
    App.openDoc(KNOWLEDGE.docs[0].id); // 先确保抽屉存在
    document.getElementById("doc-drawer-title").textContent = title;
    document.getElementById("doc-drawer-path").textContent = "需求池 · 本地数据";
    document.getElementById("doc-drawer-body").innerHTML = MD.render(md);
    document.getElementById("doc-drawer-body").scrollTop = 0;
  }

  function download(name, text) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/markdown;charset=utf-8" }));
    a.download = name.replace(/[\\/:*?"<>|]/g, "_") + ".md";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
  }

  function exportMd(r) {
    if (!r) return;
    const li = (arr) => (arr && arr.length ? arr.map((x) => `- ${x}`).join("\n") : "- 无");
    const md = [
      `# ${r.title}`,
      "",
      "## 背景", r.background || "（未填写）",
      "", "## 期望效果", r.expectation || "（未填写）",
      "", "## 涉及模块", (r.modules || []).join("、") || "（未选择）",
      r.check
        ? `\n## AI 评审\n结论：${r.check.passed ? "通过" : "需要完善"}\n\n### 需求问题\n${li(r.check.issues)}\n\n### 影响面\n${li(r.check.impacts)}\n\n### 建议补充\n${li(r.check.suggestions)}`
        : "",
      r.prd ? `\n---\n\n## PRD 草稿\n\n${r.prd}` : "",
      "",
      `> 由 演示公司 AI 研发能力平台 导出 · ${new Date().toLocaleString()}`,
    ].join("\n");
    download(r.title, md);
    r.status = "exported";
    Store.save(r);
  }

  /* ---------- 写文档 ---------- */
  let writing = false;
  async function genDoc() {
    if (writing) return;
    const topic = document.getElementById("wd-topic").value.trim();
    const out = document.getElementById("wd-out");
    if (!topic) { out.innerHTML = '<p class="err">先写一句话主题</p>'; return; }
    if (!GLM.ready()) {
      out.innerHTML = `<div class="notice">还没有配置 GLM Key。<button class="btn btn-ghost" data-s>去设置</button></div>`;
      out.querySelector("[data-s]").addEventListener("click", () => App.show("settings"));
      return;
    }
    const t = DOC_TEMPLATES.find((x) => x.key === document.getElementById("wd-tpl").value);
    writing = true;
    document.getElementById("wd-gen").disabled = true;
    out.innerHTML = `
      <div class="wd-editor">
        <div class="md-body wd-preview"><span class="thinking"><i></i><i></i><i></i></span></div>
        <textarea id="wd-edit" aria-label="文档编辑" hidden></textarea>
        <div class="check-actions" id="wd-actions" hidden>
          <button class="btn btn-ghost" id="wd-toggle">编辑原文</button>
          <button class="btn btn-primary" id="wd-export">导出 Markdown</button>
        </div>
      </div>`;
    const preview = out.querySelector(".wd-preview");
    try {
      const hits = Retrieval.search(topic, 4);
      const full = await GLM.chat(
        [{
          role: "user",
          content:
            `你是"演示公司"生鲜供应链平台的产品文档助手。请按下面模板规范的结构，为主题「${topic}」写一份${t.name}，Markdown 输出，大白话短句，不确定的地方标注“待确认”。\n\n模板规范：\n${tplContext(t)}\n\n相关业务资料：\n${Retrieval.buildContext(hits, 3000)}`,
        }],
        { onDelta: (_, sofar) => { preview.innerHTML = MD.render(sofar) + '<span class="cursor-breathe"></span>'; } }
      );
      preview.innerHTML = MD.render(full);
      const edit = document.getElementById("wd-edit");
      const actions = document.getElementById("wd-actions");
      edit.value = full;
      actions.hidden = false;
      document.getElementById("wd-toggle").addEventListener("click", () => {
        const showingEdit = !edit.hidden;
        if (showingEdit) { preview.innerHTML = MD.render(edit.value); }
        edit.hidden = showingEdit;
        preview.hidden = !showingEdit;
        document.getElementById("wd-toggle").textContent = showingEdit ? "编辑原文" : "看预览";
      });
      document.getElementById("wd-export").addEventListener("click", () => download(`${t.name}-${topic}`, edit.value));
    } catch (e) {
      preview.innerHTML = `<p class="msg-err">生成失败：${GLM.humanError(e)}</p>`;
      const retry = document.createElement("button");
      retry.className = "btn btn-ghost";
      retry.textContent = "重试";
      retry.addEventListener("click", genDoc);
      preview.appendChild(retry);
    } finally {
      writing = false;
      document.getElementById("wd-gen").disabled = false;
    }
  }

  App.onShow.pool = render;
})();
