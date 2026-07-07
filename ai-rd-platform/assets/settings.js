/* 设置：GLM Key / 模型 / 连通性测试 */
(function () {
  const SOURCE_LABEL = {
    browser: "浏览器保存的 Key",
    file: "本地配置文件 data/config.local.js",
    none: "未配置",
  };

  function render() {
    const root = document.getElementById("view-settings");
    const cfg = GLM.config();
    root.innerHTML = `
      <h1 class="view-title">设置</h1>
      <p class="view-sub">AI 问答、需求检查、写文档需要一个智谱 GLM 的 API Key。Key 只保存在你自己的浏览器里，不会上传到任何服务器。</p>
      <div class="card settings-card">
        <div class="field">
          <label for="set-key">智谱 API Key<span class="req">*</span></label>
          <div class="key-row">
            <input type="password" id="set-key" value="${cfg.source === "browser" ? cfg.apiKey : ""}"
              placeholder="${cfg.source === "file" ? "已从本地配置文件读取，此处留空即可" : "粘贴你的 API Key"}"
              autocomplete="off">
            <button class="btn btn-ghost" id="set-key-toggle" aria-label="显示或隐藏 Key">显示</button>
          </div>
          <p class="hint">当前来源：<b id="set-source">${SOURCE_LABEL[cfg.source]}</b> · 没有 Key？去 <a href="https://open.bigmodel.cn" target="_blank" rel="noopener">智谱开放平台</a> 免费申请</p>
        </div>
        <div class="field">
          <label for="set-model">模型</label>
          <select id="set-model">
            ${["glm-4-flash", "glm-4-air", "glm-4-plus"].map((m) => `<option value="${m}" ${cfg.model === m ? "selected" : ""}>${m}${m === "glm-4-flash" ? "（推荐，免费/便宜）" : ""}</option>`).join("")}
          </select>
        </div>
        <div class="settings-actions">
          <button class="btn btn-primary" id="set-save">保存</button>
          <button class="btn btn-ghost" id="set-test">测试连通</button>
          <span id="set-result" role="status" aria-live="polite"></span>
        </div>
      </div>`;

    const keyInput = document.getElementById("set-key");
    const toggle = document.getElementById("set-key-toggle");
    toggle.addEventListener("click", () => {
      const show = keyInput.type === "password";
      keyInput.type = show ? "text" : "password";
      toggle.textContent = show ? "隐藏" : "显示";
    });

    const result = document.getElementById("set-result");
    document.getElementById("set-save").addEventListener("click", () => {
      GLM.save({ apiKey: keyInput.value.trim(), model: document.getElementById("set-model").value });
      document.getElementById("set-source").textContent = SOURCE_LABEL[GLM.config().source];
      result.className = "set-ok";
      result.textContent = "已保存";
      setTimeout(() => { if (result.textContent === "已保存") result.textContent = ""; }, 3000);
    });

    document.getElementById("set-test").addEventListener("click", async () => {
      // 未保存的输入也参与测试：先临时保存
      if (keyInput.value.trim()) GLM.save({ apiKey: keyInput.value.trim(), model: document.getElementById("set-model").value });
      result.className = "";
      result.innerHTML = '<span class="thinking"><i></i><i></i><i></i></span> 测试中…';
      const r = await GLM.test();
      result.className = r.ok ? "set-ok" : "set-err";
      result.textContent = r.ok ? "✓ " + r.message : "✕ " + r.message;
    });
  }

  App.onShow.settings = render;
})();
