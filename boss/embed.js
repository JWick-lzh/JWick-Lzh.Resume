// ============ 小达嵌入脚本:任何网页加一行 <script src=".../embed.js" defer></script> ============
// 在页面右下角创建一个 iframe 挂件(悬浮球),面板开合时自动调整 iframe 大小。
// 零依赖、不污染宿主样式;资源地址从本脚本 src 自动推导,无需配置。
(function () {
  if (window.__bossAgentEmbedded) return; // 防重复注入
  window.__bossAgentEmbedded = true;

  var s = document.currentScript;
  var base = s && s.src ? s.src.replace(/embed\.js.*$/, '') : './';

  var CLOSED = { w: 96, h: 96 };
  var OPEN = { w: 440, h: 660 };

  var f = document.createElement('iframe');
  f.src = base + 'widget.html';
  f.title = '经营助手小达';
  f.allow = 'microphone; autoplay';
  f.setAttribute('allowtransparency', 'true');
  f.style.cssText =
    'position:fixed;right:12px;bottom:12px;border:0;background:transparent;' +
    'z-index:2147483000;color-scheme:light;transition:width .2s ease,height .2s ease;';

  function size(open) {
    var w = open ? Math.min(OPEN.w, window.innerWidth - 16) : CLOSED.w;
    var h = open ? Math.min(OPEN.h, window.innerHeight - 16) : CLOSED.h;
    f.style.width = w + 'px';
    f.style.height = h + 'px';
  }
  size(false);

  window.addEventListener('message', function (e) {
    var d = e.data;
    if (d && d.type === 'boss-agent:size') size(!!d.open);
  });

  (document.body || document.documentElement).appendChild(f);
})();
