/* 智谱 GLM 客户端：配置管理 + 流式对话（浏览器直连，key 只存本地） */
(function () {
  const GLM_ENDPOINT = "https://open.bigmodel.cn/api/paas/v4/chat/completions";

  const GLM = {
    endpoint: GLM_ENDPOINT,

    config() {
      let saved = {};
      try { saved = JSON.parse(localStorage.getItem("pt.glm") || "{}"); } catch (_) {}
      const local = (typeof window !== "undefined" && window.LOCAL_CONFIG) || {};
      return {
        apiKey: saved.apiKey || local.apiKey || "",
        model: saved.model || local.model || "glm-4-flash",
        source: saved.apiKey ? "browser" : local.apiKey ? "file" : "none",
      };
    },

    save(cfg) {
      localStorage.setItem("pt.glm", JSON.stringify({ apiKey: cfg.apiKey || "", model: cfg.model || "glm-4-flash" }));
    },

    ready() { return !!this.config().apiKey; },

    async chat(messages, { onDelta, signal } = {}) {
      const { apiKey, model } = this.config();
      if (!apiKey) throw new Error("NO_KEY");
      const resp = await fetch(GLM_ENDPOINT, {
        method: "POST",
        signal,
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + apiKey },
        body: JSON.stringify({ model, messages, stream: true, temperature: 0.3 }),
      });
      if (!resp.ok) {
        const body = (await resp.text()).slice(0, 200);
        throw new Error(`GLM ${resp.status}: ${body}`);
      }
      const reader = resp.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      let full = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop();
        for (const line of lines) {
          const s = line.trim();
          if (!s.startsWith("data:")) continue;
          const data = s.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const delta = JSON.parse(data).choices?.[0]?.delta?.content || "";
            if (delta) {
              full += delta;
              if (onDelta) onDelta(delta, full);
            }
          } catch (_) { /* 跨块 JSON，等下一轮拼接 */ }
        }
      }
      return full;
    },

    async test() {
      try {
        const t = await this.chat([{ role: "user", content: "只回复四个字：连接成功" }]);
        return { ok: true, message: t.slice(0, 40) || "连接成功" };
      } catch (e) {
        return { ok: false, message: humanError(e) };
      }
    },
  };

  function humanError(e) {
    const m = String(e && e.message || e);
    if (m === "NO_KEY") return "还没有配置 API Key";
    if (m.includes("401") || m.includes("invalid")) return "Key 无效或已过期，请检查后重试";
    if (m.includes("429")) return "请求太频繁或余额不足，稍后再试";
    if (m.includes("Failed to fetch") || m.includes("NetworkError") || m.includes("Load failed")) return "网络不通：请检查网络（需要能访问 open.bigmodel.cn）";
    return m;
  }

  GLM.humanError = humanError;
  if (typeof window !== "undefined") window.GLM = GLM;
  if (typeof module !== "undefined") module.exports = GLM;
})();
