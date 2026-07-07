/* 提交需求：表单 → AI 合规检查 → PRD 草稿 → 存入需求池 */
(function () {
  const MODULES = ["商品", "报价单", "订单", "采购", "供应商", "仓配", "营销", "报表", "客户", "开放平台"];

  const CHECK_PROMPT_HEAD =
    '你是"演示公司"生鲜供应链平台的需求评审助手。请依据下面的项目规范资料，检查用户提交的需求。' +
    "只输出一个 JSON 对象，不要输出任何其他文字。JSON 结构：" +
    '{"passed": true或false, "issues": ["需求本身的缺陷，如描述不完整、目标不明确"], "impacts": ["会影响到的系统模块或业务领域，说明为什么"], "suggestions": ["建议补充或明确的内容"]}' +
    "。判定标准：需求描述完整、目标明确、不与现有能力重复冲突则 passed 为 true；issues 为空数组也要输出。";

  function prdPrompt(req, checkResult) {
    return (
      '你是"演示公司"生鲜供应链平台的产品经理助手。请按照下面提供的《需求文档规范》的章节结构，' +
      "为这个需求写一份 PRD 草稿，用 Markdown 输出。要求：大白话、短句、只写有把握的内容，不确定的地方明确标注“待确认”。\n\n" +
      `需求标题：${req.title}\n业务背景：${req.background}\n期望效果：${req.expectation}\n涉及模块：${req.modules.join("、")}\n` +
      (checkResult ? `\n评审要点（写 PRD 时要覆盖）：${JSON.stringify(checkResult)}\n` : "") +
      `\n《需求文档规范》参考：\n${specContext()}`
    );
  }

  function specContext() {
    // 固定拉取需求文档规范 + 项目开发宪法的核心章节
    const fixed = [];
    if (window.KNOWLEDGE) {
      for (const doc of KNOWLEDGE.docs) {
        if (doc.path.includes("需求文档规范") || doc.path.includes("项目开发宪法")) {
          fixed.push(`【${doc.title}】\n` + doc.sections.map((s) => `## ${s.heading}\n${s.content}`).join("\n").slice(0, 4000));
        }
      }
    }
    return fixed.join("\n\n").slice(0, 8000);
  }

  function parseJson(text) {
    const m = text.match(/\{[\s\S]*\}/);
    if (!m) return null;
    try { return JSON.parse(m[0]); } catch (_) { return null; }
  }

  function render() {
    const root = document.getElementById("view-submit");
    if (root.dataset.rendered) return;
    root.dataset.rendered = "1";
    root.innerHTML = `
      <h1 class="view-title">提交需求</h1>
      <p class="view-sub">把想法写下来，AI 会拿着项目规范帮你做一轮评审：需求完整吗？影响哪些模块？要补什么？通过后还能直接生成 PRD 草稿。</p>
      <div id="submit-notice"></div>
      <div class="submit-grid">
        <div class="card" id="submit-form">
          <div class="field">
            <label for="rq-title">需求标题<span class="req">*</span></label>
            <input type="text" id="rq-title" placeholder="一句话说清要什么，如：给大客户做阶梯价">
            <p class="err" id="rq-title-err" hidden>标题不能为空</p>
          </div>
          <div class="field">
            <label for="rq-bg">业务背景</label>
            <textarea id="rq-bg" rows="3" placeholder="为什么要做？现在的痛点是什么？"></textarea>
          </div>
          <div class="field">
            <label for="rq-expect">期望效果</label>
            <textarea id="rq-expect" rows="3" placeholder="做完之后，希望达到什么效果？"></textarea>
          </div>
          <div class="field">
            <label>涉及模块（可多选）</label>
            <div class="module-chips" id="rq-modules">
              ${MODULES.map((m) => `<button class="chip" data-m="${m}">${m}</button>`).join("")}
            </div>
          </div>
          <button class="btn btn-primary" id="rq-submit">提交并让 AI 评审</button>
        </div>
        <div id="submit-result"></div>
      </div>`;

    root.querySelectorAll("#rq-modules .chip").forEach((c) =>
      c.addEventListener("click", () => c.classList.toggle("on"))
    );
    document.getElementById("rq-submit").addEventListener("click", submit);
  }

  function collect() {
    return {
      title: document.getElementById("rq-title").value.trim(),
      background: document.getElementById("rq-bg").value.trim(),
      expectation: document.getElementById("rq-expect").value.trim(),
      modules: [...document.querySelectorAll("#rq-modules .chip.on")].map((c) => c.dataset.m),
    };
  }

  async function submit() {
    const titleErr = document.getElementById("rq-title-err");
    const data = collect();
    titleErr.hidden = !!data.title;
    if (!data.title) { document.getElementById("rq-title").focus(); return; }

    if (!GLM.ready()) {
      const n = document.getElementById("submit-notice");
      n.innerHTML = `<div class="notice">还没有配置 GLM Key，无法评审。<button class="btn btn-ghost" data-s>去设置</button></div>`;
      n.querySelector("[data-s]").addEventListener("click", () => App.show("settings"));
      return;
    }
    document.getElementById("submit-notice").innerHTML = "";

    const result = document.getElementById("submit-result");
    result.innerHTML = `
      <div class="card check-progress">
        <div class="check-step on" id="ck-step1"><span class="thinking"><i></i><i></i><i></i></span> 第一步：对照规范做合规检查…</div>
        <div class="check-step" id="ck-step2">第二步：生成 PRD 草稿（检查后可选）</div>
      </div>`;

    const btn = document.getElementById("rq-submit");
    btn.disabled = true;
    try {
      const hits = Retrieval.search(data.title + " " + data.background + " " + data.modules.join(" "), 4);
      const context = Retrieval.buildContext(hits, 4000) + "\n" + specContext();
      const raw = await GLM.chat([
        { role: "system", content: CHECK_PROMPT_HEAD },
        { role: "user", content: `项目规范资料：\n${context}\n\n用户需求：\n标题：${data.title}\n背景：${data.background || "（未填写）"}\n期望：${data.expectation || "（未填写）"}\n涉及模块：${data.modules.join("、") || "（未选择）"}` },
      ]);
      const check = parseJson(raw);
      if (!check) {
        renderCheckError(result, "AI 返回的格式不对，可以重试。原始返回：" + raw.slice(0, 300), data);
        return;
      }
      const req = Store.save({ ...data, status: "checked", check, prd: null });
      renderCheck(result, req);
    } catch (e) {
      renderCheckError(result, GLM.humanError(e), data);
    } finally {
      btn.disabled = false;
    }
  }

  function renderCheckError(result, msg, data) {
    result.innerHTML = `<div class="notice error"><span>评审失败：${msg}</span><button class="btn btn-ghost" id="ck-retry">重试</button></div>`;
    document.getElementById("ck-retry").addEventListener("click", submit);
  }

  function renderCheck(result, req) {
    const c = req.check;
    const li = (arr) => (arr && arr.length ? arr.map((x) => `<li>${x}</li>`).join("") : "<li>无</li>");
    result.innerHTML = `
      <div class="card check-result">
        <div class="check-head">
          <h3>AI 评审结果</h3>
          <span class="badge ${c.passed ? "badge-ok" : "badge-warn"}">${c.passed ? "通过" : "需要完善"}</span>
        </div>
        <div class="check-section"><h4>需求问题</h4><ul>${li(c.issues)}</ul></div>
        <div class="check-section"><h4>影响面</h4><ul>${li(c.impacts)}</ul></div>
        <div class="check-section"><h4>建议补充</h4><ul>${li(c.suggestions)}</ul></div>
        <div class="check-actions">
          <button class="btn btn-primary" id="ck-prd">生成 PRD 草稿</button>
          <button class="btn btn-ghost" id="ck-pool">存入需求池，稍后再说</button>
          ${c.passed ? "" : '<p class="hint">评审没通过也可以生成 PRD，但建议先按"建议补充"完善需求。</p>'}
        </div>
        <div id="ck-prd-out"></div>
      </div>`;

    document.getElementById("ck-pool").addEventListener("click", () => {
      App.show("pool");
      sessionStorage.setItem("pt.highlight", req.id);
    });
    document.getElementById("ck-prd").addEventListener("click", () => genPrd(req));
  }

  async function genPrd(req) {
    const out = document.getElementById("ck-prd-out");
    const btn = document.getElementById("ck-prd");
    btn.disabled = true;
    out.innerHTML = '<div class="md-body prd-stream"><span class="thinking"><i></i><i></i><i></i></span></div>';
    const box = out.firstElementChild;
    try {
      const full = await GLM.chat(
        [{ role: "user", content: prdPrompt(req, req.check) }],
        { onDelta: (_, sofar) => { box.innerHTML = MD.render(sofar) + '<span class="cursor-breathe"></span>'; } }
      );
      box.innerHTML = MD.render(full);
      req.prd = full;
      Store.save(req);
      out.insertAdjacentHTML(
        "beforeend",
        '<div class="check-actions"><button class="btn btn-primary" id="ck-goto-pool">已存入需求池，去查看</button></div>'
      );
      document.getElementById("ck-goto-pool").addEventListener("click", () => {
        sessionStorage.setItem("pt.highlight", req.id);
        App.show("pool");
      });
    } catch (e) {
      box.innerHTML = `<p class="msg-err">PRD 生成失败：${GLM.humanError(e)}</p>`;
      const retry = document.createElement("button");
      retry.className = "btn btn-ghost";
      retry.textContent = "重试";
      retry.addEventListener("click", () => genPrd(req));
      box.appendChild(retry);
    } finally {
      btn.disabled = false;
    }
  }

  App.onShow.submit = render;
})();
