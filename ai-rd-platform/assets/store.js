/* 需求存储：localStorage CRUD（Node 环境用内存兜底，便于测试） */
(function () {
  const KEY = "pt.requirements";

  const mem = { data: "[]" };
  const storage =
    typeof localStorage !== "undefined"
      ? localStorage
      : { getItem: () => mem.data, setItem: (_, v) => { mem.data = v; } };

  function readAll() {
    try { return JSON.parse(storage.getItem(KEY) || "[]"); } catch (_) { return []; }
  }
  function writeAll(list) { storage.setItem(KEY, JSON.stringify(list)); }

  const Store = {
    list() { return readAll().sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || "")); },
    get(id) { return readAll().find((r) => r.id === id) || null; },
    save(req) {
      const list = readAll();
      const now = new Date().toISOString();
      if (!req.id) {
        req.id = "req-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
        req.createdAt = now;
      }
      req.updatedAt = now;
      req.status = req.status || "draft";
      const i = list.findIndex((r) => r.id === req.id);
      if (i >= 0) list[i] = req; else list.push(req);
      writeAll(list);
      return req;
    },
    remove(id) { writeAll(readAll().filter((r) => r.id !== id)); },
  };

  if (typeof window !== "undefined") window.Store = Store;
  if (typeof module !== "undefined") module.exports = Store;
})();
