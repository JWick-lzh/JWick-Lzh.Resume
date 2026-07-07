/* 应用外壳：Tab 路由与模块注册 */
const App = {
  show(viewId) {
    document.querySelectorAll(".view").forEach((v) =>
      v.classList.toggle("active", v.id === "view-" + viewId)
    );
    document.querySelectorAll(".nav-item").forEach((n) =>
      n.classList.toggle("current", n.dataset.view === viewId)
    );
    if (location.hash !== "#" + viewId) location.hash = viewId;
    (App.onShow[viewId] || (() => {}))();
  },
  onShow: {}, // 各模块注册进入回调：App.onShow.chat = fn
};

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".nav-item").forEach((n) =>
    n.addEventListener("click", () => App.show(n.dataset.view))
  );
  const initial = location.hash.replace("#", "") || "overview";
  App.show(document.getElementById("view-" + initial) ? initial : "overview");
});

window.addEventListener("hashchange", () => {
  const id = location.hash.replace("#", "");
  if (document.getElementById("view-" + id)) App.show(id);
});

window.App = App;
