/* AI 问答：多会话（新建/历史/切换/删除，localStorage 持久化）+ 检索增强 + GLM 流式回答 + 依据文档溯源 */
(function () {
  const SYSTEM_PROMPT =
    '你是"演示公司"生鲜供应链 SaaS 平台的产品知识助手，服务对象是产品、运营、销售同学。' +
    "只依据用户消息里提供的资料回答；资料里没有的，明确说“资料里没有提到”，不要编造。" +
    "回答用大白话、短句、分点，能给例子就给例子。不要输出资料编号以外的引用格式。";

  const PRESETS = [
    { role: "产品", questions: ["系统支持哪些营销玩法？", "订单状态有哪些流转？", "提一个新需求要走什么流程？"] },
    { role: "销售", questions: ["能不能给不同客户报不同的价格？", "系统支持秒杀活动吗？", "客户下单后怎么对账结算？"] },
    { role: "运营", questions: ["系统里有哪些报表？", "分拣员的绩效是怎么算的？", "商品和库存是怎么管理的？"] },
  ];

  /* ---------- 会话存储 ---------- */
  const KEY = "pt.chats";
  const ChatStore = {
    list() {
      try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (_) { return []; }
    },
    saveAll(list) { localStorage.setItem(KEY, JSON.stringify(list)); },
    get(id) { return this.list().find((s) => s.id === id) || null; },
    upsert(session) {
      const list = this.list();
      session.updatedAt = new Date().toISOString();
      const i = list.findIndex((s) => s.id === session.id);
      if (i >= 0) list[i] = session; else list.unshift(session);
      this.saveAll(list);
    },
    remove(id) { this.saveAll(this.list().filter((s) => s.id !== id)); },
    create() {
      return {
        id: "chat-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        title: "",
        messages: [], // {role:'user'|'assistant', content, refs?:[{docId,title}]}
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    },
  };

  let current = null;   // 当前会话对象（未提问前可能是未落库的空会话）
  let aborter = null;

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function escapeHtml(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /* ---------- 渲染 ---------- */
  function render() {
    const root = document.getElementById("view-chat");
    if (root.dataset.rendered) { renderSessions(); return; }
    root.dataset.rendered = "1";
    root.innerHTML = `
      <h1 class="view-title">AI 问答</h1>
      <p class="view-sub">直接问系统能做什么、业务细节、开发流程。回答只依据项目里的规范文档，并给出出处。会话记录保存在你的浏览器里。</p>
      <div id="chat-notice"></div>
      <div class="chat-layout">
        <aside class="chat-side card">
          <button class="btn btn-primary chat-new" id="chat-new">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>
            新会话
          </button>
          <div class="chat-sessions" id="chat-sessions" aria-label="历史会话"></div>
        </aside>
        <div class="chat-box card">
          <div class="chat-stream" id="chat-stream"></div>
          <div class="chat-input-row">
            <textarea id="chat-input" rows="1" placeholder="问点什么…（Enter 发送，Shift+Enter 换行）" aria-label="提问输入框"></textarea>
            <button class="btn btn-primary" id="chat-send">发送</button>
            <button class="btn btn-ghost" id="chat-stop" hidden>停止</button>
          </div>
        </div>
      </div>`;

    const input = document.getElementById("chat-input");
    document.getElementById("chat-new").addEventListener("click", newSession);
    document.getElementById("chat-send").addEventListener("click", () => send());
    document.getElementById("chat-stop").addEventListener("click", () => aborter && aborter.abort());
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
    });
    input.addEventListener("input", () => {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 160) + "px";
    });

    // 初始：续上最近一次会话，没有就开新会话
    const latest = ChatStore.list()[0];
    current = latest || ChatStore.create();
    renderSessions();
    renderMessages();
  }

  function newSession() {
    if (aborter) aborter.abort();
    if (current && !current.messages.length) { renderMessages(); return; } // 已经是空会话
    current = ChatStore.create();
    renderSessions();
    renderMessages();
    document.getElementById("chat-input").focus();
  }

  function switchSession(id) {
    if (aborter) aborter.abort();
    const s = ChatStore.get(id);
    if (!s) return;
    current = s;
    renderSessions();
    renderMessages();
  }

  function deleteSession(id, ev) {
    ev.stopPropagation();
    if (!confirm("删除这个会话？记录不可恢复。")) return;
    ChatStore.remove(id);
    if (current && current.id === id) {
      current = ChatStore.list()[0] || ChatStore.create();
      renderMessages();
    }
    renderSessions();
  }

  function sessionTitle(s) {
    if (s.title) return s.title;
    const firstQ = (s.messages.find((m) => m.role === "user") || {}).content || "";
    return firstQ.slice(0, 18) + (firstQ.length > 18 ? "…" : "") || "新会话";
  }

  function renderSessions() {
    const box = document.getElementById("chat-sessions");
    if (!box) return;
    const list = ChatStore.list();
    if (!list.length && (!current || !current.messages.length)) {
      box.innerHTML = '<p class="chat-side-empty">还没有历史会话</p>';
      return;
    }
    box.innerHTML = list
      .map((s) => `
        <div class="chat-session ${current && s.id === current.id ? "on" : ""}" data-id="${s.id}" role="button" tabindex="0">
          <div class="cs-main">
            <span class="cs-title">${escapeHtml(sessionTitle(s))}</span>
            <span class="cs-meta">${(s.updatedAt || "").slice(5, 16).replace("T", " ")} · ${Math.ceil(s.messages.length / 2)} 问</span>
          </div>
          <button class="cs-del" data-del="${s.id}" aria-label="删除会话" title="删除会话">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>`)
      .join("");
    box.querySelectorAll(".chat-session").forEach((n) => {
      n.addEventListener("click", () => switchSession(n.dataset.id));
      n.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); switchSession(n.dataset.id); }
      });
    });
    box.querySelectorAll("[data-del]").forEach((b) =>
      b.addEventListener("click", (e) => deleteSession(b.dataset.del, e))
    );
  }

  function renderMessages() {
    const stream = document.getElementById("chat-stream");
    stream.innerHTML = "";
    if (!current || !current.messages.length) {
      stream.innerHTML = `
        <div class="chat-presets" id="chat-presets">
          ${PRESETS.map((p) => `
            <div class="preset-group">
              <span class="preset-role">${p.role}常问</span>
              ${p.questions.map((q) => `<button class="chip preset-q">${q}</button>`).join("")}
            </div>`).join("")}
        </div>`;
      stream.querySelectorAll(".preset-q").forEach((b) =>
        b.addEventListener("click", () => send(b.textContent))
      );
      return;
    }
    for (const m of current.messages) {
      const b = bubble(m.role, m.role === "user" ? MD.render(m.content) : MD.render(m.content) + renderRefs(m.refs || []));
      bindRefClicks(b);
    }
    stream.scrollTop = stream.scrollHeight;
  }

  function bubble(role, html) {
    const stream = document.getElementById("chat-stream");
    const b = el("div", "msg msg-" + role, html);
    stream.appendChild(b);
    stream.scrollTop = stream.scrollHeight;
    return b;
  }

  function renderRefs(refs) {
    if (!refs || !refs.length) return "";
    return `<div class="msg-refs">依据文档：${refs
      .map((r) => `<button class="chip" data-ref="${r.docId}">${escapeHtml(r.title)}</button>`)
      .join("")}</div>`;
  }

  function bindRefClicks(node) {
    node.querySelectorAll("[data-ref]").forEach((c) =>
      c.addEventListener("click", () => App.openDoc(c.dataset.ref))
    );
  }

  function showKeyNotice() {
    const n = document.getElementById("chat-notice");
    n.innerHTML = `<div class="notice">还没有配置 GLM Key，AI 无法回答。<button class="btn btn-ghost" data-goto-settings>去设置</button></div>`;
    n.querySelector("[data-goto-settings]").addEventListener("click", () => App.show("settings"));
  }

  /* ---------- 发送 ---------- */
  async function send(presetText) {
    const input = document.getElementById("chat-input");
    const q = String(typeof presetText === "string" ? presetText : input.value).trim();
    if (!q || aborter) return;
    if (!GLM.ready()) { showKeyNotice(); return; }
    document.getElementById("chat-notice").innerHTML = "";

    const presets = document.getElementById("chat-presets");
    if (presets) presets.remove();
    if (typeof presetText !== "string") { input.value = ""; input.style.height = "auto"; }

    const sessionIsNew = !current.messages.length;
    bubble("user", MD.render(q));
    current.messages.push({ role: "user", content: q });
    if (sessionIsNew) current.title = q.slice(0, 18) + (q.length > 18 ? "…" : "");
    ChatStore.upsert(current);
    renderSessions();

    const hits = Retrieval.search(q, 6);
    const context = Retrieval.buildContext(hits);
    const refs = [...new Map(hits.map((h) => [h.docId, { docId: h.docId, title: h.docTitle }])).values()];

    const b = bubble("assistant", '<span class="thinking"><i></i><i></i><i></i></span>');
    const sendBtn = document.getElementById("chat-send");
    const stopBtn = document.getElementById("chat-stop");
    sendBtn.disabled = true;
    stopBtn.hidden = false;
    aborter = new AbortController();
    const session = current; // 生成期间可能切会话，锁定引用

    // 带本会话最近 3 轮上下文（不含刚推入的这条用户消息）
    const past = session.messages.slice(-7, -1).map((m) => ({ role: m.role, content: m.content }));
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...past,
      { role: "user", content: (context ? `资料：\n${context}\n\n` : "（本次没有检索到相关资料）\n\n") + `问题：${q}` },
    ];

    try {
      const full = await GLM.chat(messages, {
        signal: aborter.signal,
        onDelta(_, sofar) {
          b.innerHTML = MD.render(sofar) + '<span class="cursor-breathe"></span>';
          const stream = document.getElementById("chat-stream");
          stream.scrollTop = stream.scrollHeight;
        },
      });
      session.messages.push({ role: "assistant", content: full, refs });
      ChatStore.upsert(session);
      renderSessions();
      if (current === session) {
        b.innerHTML = MD.render(full) + renderRefs(refs);
        bindRefClicks(b);
      }
    } catch (e) {
      if (e.name === "AbortError") {
        if (current === session) b.innerHTML += '<p class="msg-meta">已停止生成</p>';
      } else {
        session.messages.pop(); // 失败的问题移出会话，重试时重新加入
        ChatStore.upsert(session);
        if (current === session) {
          b.innerHTML = `<p class="msg-err">出错了：${GLM.humanError(e)}</p>`;
          const retry = el("button", "btn btn-ghost msg-retry", "重试");
          retry.addEventListener("click", () => { b.remove(); const prev = b.previousElementSibling; if (prev && prev.classList.contains("msg-user")) prev.remove(); send(q); });
          b.appendChild(retry);
        }
      }
    } finally {
      aborter = null;
      sendBtn.disabled = false;
      stopBtn.hidden = true;
    }
  }

  App.onShow.chat = render;
})();
