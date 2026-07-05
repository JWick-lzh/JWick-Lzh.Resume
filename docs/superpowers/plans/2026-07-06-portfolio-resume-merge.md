# 作品集 + 简历网站合并 · 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 Code 目录合并成一个网站文件夹：简历站入驻 3 个可玩 Demo、预留 3 个固定地址、设计稿归档、整站按设计稿重做双主题视觉。

**Architecture:** 简历站保持纯静态（零构建、file:// 可开）。Demo 是源项目的构建产物，拷进简历仓库子目录（相对路径、自带 mock/演示模式）。视觉重设计只动 HTML/CSS，数据层（data.js / portfolio-data.js）结构不变。

**Tech Stack:** 原生 HTML/CSS/JS（简历站）· Vite 构建产物（boss/wenda）· 单文件 HTML（ai-order-demo）· Playwright + node:http（测试）

**Spec:** `docs/superpowers/specs/2026-07-06-portfolio-resume-merge-design.md`

## Global Constraints

- 简历站自身代码禁用 `fetch` / ES `import`，数据经 `<script src>` 全局变量注入（file:// 双击可开）。
- 文案铁律：只用 `20260630-AI产品-林灶辉-cc.md` 已有口径，不新增/夸大任何数字；开发中项目只写状态，不编成果。
- 公开仓库零真实 API key。特别注意：`AI录单-Agent/docs/index.html` 第 1300 行有硬编码智谱 key（`ae1fe9464e2d...`），拷入时必须清空。
- 固定地址表（定死不改）：`./wenda/` `./ai-order-demo/` `./boss/` `./caigou/` `./product-agent/` `./lobster/`。
- 简历仓库路径：`/Users/uicron/Desktop/GuanMai/Code/林灶辉-简历网站`（下称 `$SITE`）。所有提交到 main，**不 push**。
- 提交信息中文，结尾加 `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`。
- pnpm 位置：`~/.local/bin/pnpm`（corepack 装的）。

---

### Task 1: 设计稿归档 + 删除外部文件夹

**Files:**
- Create: `$SITE/docs/design-draft/`（index.html + shots/ ×5 + 观麦 OS 5.0.png）
- Delete: `/Users/uicron/Desktop/GuanMai/Code/作品集-设计稿/`

**Interfaces:**
- Produces: `docs/design-draft/index.html` —— Task 7/8 视觉重设计的蓝本文件。

- [ ] **Step 1: 拷贝归档**

```bash
cd "/Users/uicron/Desktop/GuanMai/Code"
mkdir -p "林灶辉-简历网站/docs/design-draft"
cp -R "作品集-设计稿/index.html" "作品集-设计稿/shots" "作品集-设计稿/观麦 OS 5.0.png" "林灶辉-简历网站/docs/design-draft/"
ls -R "林灶辉-简历网站/docs/design-draft"
```

Expected: `index.html`、`观麦 OS 5.0.png`、`shots/` 下 5 张 png（aiorder-sample / dtyq-home / guanmai-arch / supermagic-full / supermagic-home）。

- [ ] **Step 2: 提交**

```bash
cd "/Users/uicron/Desktop/GuanMai/Code/林灶辉-简历网站"
git add docs/design-draft && git commit -m "docs: 作品集设计稿归档进仓库（合并两文件夹为一）

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

- [ ] **Step 3: 确认已提交后删除外部文件夹**

```bash
git -C "/Users/uicron/Desktop/GuanMai/Code/林灶辉-简历网站" log --oneline -1   # 确认上一步 commit 存在
diff -r "/Users/uicron/Desktop/GuanMai/Code/作品集-设计稿/shots" "/Users/uicron/Desktop/GuanMai/Code/林灶辉-简历网站/docs/design-draft/shots" && rm -rf "/Users/uicron/Desktop/GuanMai/Code/作品集-设计稿"
ls "/Users/uicron/Desktop/GuanMai/Code"
```

Expected: diff 无输出（完全一致）才执行 rm；最终 Code 目录下不再有 `作品集-设计稿`。

---

### Task 2: 占位页 ×2 + Demo 检查脚本

**Files:**
- Create: `$SITE/product-agent/index.html`
- Create: `$SITE/lobster/index.html`
- Create: `$SITE/tests/check-demo.mjs`

**Interfaces:**
- Produces: `node tests/check-demo.mjs <子目录>` —— 起本地静态服务，真 Chrome 打开 `/<子目录>/`，断言：body 有可见内容、零 console error、零 localhost/外网请求。Task 3/4/5 复用。

- [ ] **Step 1: 写占位页模板（product-agent）**

写入 `$SITE/product-agent/index.html`：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>商品 Agent（GM Service）· Demo 打磨中</title>
<style>
  :root{--bg:#f7faf5;--surface:#ffffff;--text:#18211a;--muted:#54655a;--accent:#3e7d1f;--border:#dde7d9}
  :root[data-theme=dark]{--bg:#0b0f0e;--surface:#121917;--text:#e9f0ec;--muted:#9fb0aa;--accent:#b6f36b;--border:#1e2a27}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:system-ui,-apple-system,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif;
    background:var(--bg);color:var(--text);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
  .card{max-width:520px;text-align:center;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:48px 36px}
  .badge{display:inline-block;font-size:12px;color:var(--accent);border:1px solid var(--border);border-radius:999px;padding:4px 12px;margin-bottom:20px}
  h1{font-size:24px;margin-bottom:12px}
  p{color:var(--muted);line-height:1.8;font-size:14px}
  a{display:inline-block;margin-top:24px;color:var(--accent);text-decoration:none;font-size:14px}
</style>
<script>
(function(){try{
  var p=new URLSearchParams(location.search),t=p.get('theme')||localStorage.getItem('theme');
  if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}
  document.documentElement.setAttribute('data-theme',t);
}catch(e){}})();
</script>
</head>
<body>
<main class="card">
  <span class="badge">Demo 打磨中</span>
  <h1>商品 Agent（GM Service）</h1>
  <p>这个项目正在开发中。地址已经固定，Demo 做完会在这里原地上线，敬请期待。</p>
  <a href="../index.html#portfolio">← 返回作品集</a>
</main>
</body>
</html>
```

- [ ] **Step 2: 写 lobster 占位页**

写入 `$SITE/lobster/index.html`：同上模板，只改三处 —— `<title>龙虾 经营 Agent · 完整版打磨中</title>`、`<h1>龙虾 经营 Agent · 完整版</h1>`、正文段落改为：

```html
  <p>完整版应用正在打磨中，地址已固定，做完原地上线。现阶段可在作品集卡片里体验 5 页可交互原型（任务中心 / 资料上传 / 用户与角色 / RBAC / 渠道设置）。</p>
```

- [ ] **Step 3: 写 check-demo 脚本**

写入 `$SITE/tests/check-demo.mjs`：

```js
// 用法: node tests/check-demo.mjs <子目录>   例: node tests/check-demo.mjs boss
// 起本地静态服务 + 真 Chrome 打开 /<子目录>/，断言:
//  1) body 有可见文本  2) 零 console error  3) 除本服务外零网络请求(不许打 localhost 后端/外网)
import { chromium } from 'playwright';
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = normalize(join(fileURLToPath(import.meta.url), '..', '..'));
const PORT = 8124;
const dir = process.argv[2];
if (!dir) { console.error('用法: node tests/check-demo.mjs <子目录>'); process.exit(2); }
const MIME = { '.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json','.ico':'image/x-icon','.woff2':'font/woff2' };

const server = http.createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(req.url.split('?')[0]);
    if (p.endsWith('/')) p += 'index.html';
    let fp = join(ROOT, p);
    if (existsSync(fp) && statSync(fp).isDirectory()) fp = join(fp, 'index.html');
    if (!existsSync(fp)) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[extname(fp)] || 'application/octet-stream' });
    res.end(await readFile(fp));
  } catch (e) { res.writeHead(500); res.end(String(e)); }
});
await new Promise(r => server.listen(PORT, r));

const errors = [];
const badRequests = [];
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('request', r => {
  const u = r.url();
  if (!u.startsWith(`http://localhost:${PORT}/`) && !u.startsWith('data:') && !u.startsWith('blob:')) badRequests.push(u);
});
await page.goto(`http://localhost:${PORT}/${encodeURIComponent(dir)}/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
const text = (await page.locator('body').innerText()).trim();

let ok = true;
const check = (name, cond, detail='') => { console.log(`${cond ? '✅' : '❌'} ${name}${detail ? ' — ' + detail : ''}`); if (!cond) ok = false; };
check(`${dir}: 页面有可见内容`, text.length > 10, `文本 ${text.length} 字`);
check(`${dir}: 零 console error`, errors.length === 0, errors.slice(0,3).join(' | '));
check(`${dir}: 零外部/localhost 后端请求`, badRequests.length === 0, badRequests.slice(0,3).join(' | '));
await browser.close();
server.close();
process.exit(ok ? 0 : 1);
```

- [ ] **Step 4: 跑脚本验证两个占位页**

```bash
cd "/Users/uicron/Desktop/GuanMai/Code/林灶辉-简历网站"
node tests/check-demo.mjs product-agent && node tests/check-demo.mjs lobster
```

Expected: 各 3 项全 ✅，exit 0。

- [ ] **Step 5: 提交**

```bash
git add product-agent lobster tests/check-demo.mjs
git commit -m "feat: 预留位占位页(product-agent/lobster) + Demo 检查脚本

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Boss-Agent 构建入驻 + boss 卡升级

**Files:**
- Create: `$SITE/boss/`（构建产物）
- Modify: `$SITE/assets/js/portfolio-data.js`（`id:"boss"` 条目，约 152-168 行）

**Interfaces:**
- Consumes: `tests/check-demo.mjs`（Task 2）
- Produces: `./boss/` 可玩 Demo；boss 卡变 Tier A iframe 卡。

- [ ] **Step 1: 源项目构建并确认无密钥**

```bash
cd "/Users/uicron/Desktop/GuanMai/Code/Boss-Agent"
npm run build
grep -RInE "AIza[0-9A-Za-z_-]{30,}|api[_-]?key\s*[:=]\s*['\"][A-Za-z0-9]{16,}" dist/ && echo "发现疑似 key，停!" || echo "无密钥 OK"
ls dist/
```

Expected: 构建成功；grep 无匹配（`GEMINI_API_KEY = ''` 是空的）；dist 有 `index.html` + `assets/`。

- [ ] **Step 2: 拷入简历站**

```bash
rm -rf "/Users/uicron/Desktop/GuanMai/Code/林灶辉-简历网站/boss"
cp -R dist "/Users/uicron/Desktop/GuanMai/Code/林灶辉-简历网站/boss"
```

- [ ] **Step 3: 跑检查脚本**

```bash
cd "/Users/uicron/Desktop/GuanMai/Code/林灶辉-简历网站" && node tests/check-demo.mjs boss
```

Expected: 3 项全 ✅（无 key 时 app 走演示兜底模式，纯客户端零请求）。

- [ ] **Step 4: 升级 boss 卡**

在 `assets/js/portfolio-data.js` 中，把 `id: "boss"` 整个对象替换为（从 Tier B 区块移到 Tier A 区块、`caigou-cloud` 之后）：

```js
    {
      id: "boss", tier: "A", statusLabel: "浏览器可跑 · 语音版",
      title: "老板助手 · 语音版经营助手",
      subtitle: "移动端优先双模式 · Agent 对话 + 语音播报 · 2026",
      tags: ["viz", "scene", "industry", "agent", "fullstack"],
      desc: "给生鲜老板的经营助手：数据面板、趋势图、客户/商品排行、四类异常预警、周报、参数化阈值。内置助手「小达」，能查历史经营、解读异常给建议、语音播报当日情况。",
      metrics: [["形态", "手机/桌面双模式"], ["助手", "查数/解读/播报"], ["语音", "Web Speech 中文"], ["测试", "26 单测 + 50 E2E"]],
      achievements: [
        "5 tab 一级导航 + 二级详情，<768px 全屏 App + 底部 tabbar，≥768px 侧边导航 + 宽屏两列",
        "多维趋势图、排行表、KPI 卡片可交互（手写 SVG 图表，tooltip / 段控切换）",
        "异常预警：未下单客户 / 滞销商品 / 采购成本波动 / 利润率波动，分类 + 优先级",
        "助手「小达」只做三件事：查历史经营、解读异常给建议、语音播报当日；无 Key 走演示兜底模式，点开即用",
        "演示数据种子生成（刷新不变），2024.01–2026.06 共 30 个月日粒度，自洽可复现"
      ],
      media: { type: "iframe", mobile: true, src: "./boss/", url: "老板助手 · 浏览器可跑 Demo", caption: "完整应用浏览器直跑（演示数据 · 无 Key 走演示兜底模式，助手可正常对话）。" },
      links: [
        { label: "全屏打开可跑 Demo →", href: "./boss/", primary: true },
        { label: "早期静态原型", href: "./prototypes/boss-assistant.html" }
      ]
    },
```

文案核对：以上数字（26 单测/50 E2E/30 个月/三件事）均来自 Boss-Agent 仓库 README 与测试，不来自简历外的想象；如与 Boss-Agent/README.md 不符，以 README 为准修正。

- [ ] **Step 5: 首页回归**

```bash
node tests/e2e-portfolio.mjs
```

Expected: 全部通过（若有断言依赖 boss 卡在 Tier B/原型 src，同步更新测试断言到 `./boss/`）。

- [ ] **Step 6: 提交**

```bash
git add boss assets/js/portfolio-data.js tests/
git commit -m "feat: 老板助手完整版入驻 ./boss/（卡片升级为可玩 Demo）

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: 问答平台 Demo 入驻 + guanmai-platform 卡升级

**Files:**
- Create: `$SITE/wenda/`（构建产物）
- Modify: `$SITE/assets/js/portfolio-data.js`（`id:"guanmai-platform"` 条目）
- Modify: `$SITE/docs/superpowers/specs/2026-07-06-portfolio-resume-merge-design.md`（§4.4 一行）

**Interfaces:**
- Consumes: `tests/check-demo.mjs`
- Produces: `./wenda/` 可玩 Demo；guanmai-platform 卡变 iframe 卡。

- [ ] **Step 1: 构建 demo**

```bash
cd "/Users/uicron/Desktop/GuanMai/Code/问答Agent Platform"
~/.local/bin/pnpm --filter demo build
grep -RInE "api[_-]?key\s*[:=]\s*['\"][A-Za-z0-9]{16,}|Bearer [A-Za-z0-9]" apps/demo/dist/ && echo "发现疑似 key，停!" || echo "无密钥 OK"
ls apps/demo/dist/
```

Expected: 构建成功、无密钥、dist 有 index.html + assets。

- [ ] **Step 2: 拷入 + 检查**

```bash
rm -rf "/Users/uicron/Desktop/GuanMai/Code/林灶辉-简历网站/wenda"
cp -R apps/demo/dist "/Users/uicron/Desktop/GuanMai/Code/林灶辉-简历网站/wenda"
cd "/Users/uicron/Desktop/GuanMai/Code/林灶辉-简历网站" && node tests/check-demo.mjs wenda
```

Expected: 3 项全 ✅。注意：demo 用 react-router，若非 hash 路由导致直开子路径 404，只影响深链，首页 `./wenda/` 必须能开（脚本即验此项）。

- [ ] **Step 3: 升级 guanmai-platform 卡**

`assets/js/portfolio-data.js` 中 `id: "guanmai-platform"` 条目只改四个字段（desc/metrics/achievements 不动）：

```js
      statusLabel: "浏览器可跑 · 平台 Demo",
      media: { type: "iframe", src: "./wenda/", url: "GM鲜达 · Agent 平台纯前端演示", caption: "平台租户侧演示（品牌 GM鲜达 · 演示数据）：知识卡建卡 → 审核 → 驳回批注 → 修改再提 → 上架 → 对话引用的全生命周期闭环。纯前端、零后端。" },
      links: [
        { label: "全屏打开平台 Demo →", href: "./wenda/", primary: true },
        { label: "整体架构图", href: "./portfolio/guanmai-arch.png" }
      ],
      note: "生产版是多租户全栈平台（Next.js + tRPC + pgvector），规模大、依赖多；此处为专门制作的纯前端演示版，信息架构与生产版一致。"
```

- [ ] **Step 4: 同步修订 spec §4.4**

spec 文件中「新增『问答 Agent 平台』条目：iframe `./wenda/`，文案严格按简历口径（§7）」改为「升级现有 `guanmai-platform` 条目为 iframe `./wenda/`（问答 Agent Platform 与观麦 AI Agent 平台是同一项目，不另立卡避免重复）」。

- [ ] **Step 5: 回归 + 提交**

```bash
node tests/e2e-portfolio.mjs
git add wenda assets/js/portfolio-data.js docs/superpowers/specs/2026-07-06-portfolio-resume-merge-design.md
git commit -m "feat: 观麦 Agent 平台 Demo(GM鲜达)入驻 ./wenda/（卡片升级为可玩 Demo）

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: AI 录单入驻（去 key）+ ai-order 卡升级

**Files:**
- Create: `$SITE/ai-order-demo/index.html`
- Modify: `$SITE/assets/js/portfolio-data.js`（`id:"ai-order"` 条目）

- [ ] **Step 1: 拷入并清空硬编码 key**

```bash
mkdir -p "/Users/uicron/Desktop/GuanMai/Code/林灶辉-简历网站/ai-order-demo"
cp "/Users/uicron/Desktop/GuanMai/Code/AI录单-Agent/docs/index.html" "/Users/uicron/Desktop/GuanMai/Code/林灶辉-简历网站/ai-order-demo/index.html"
```

然后用 Edit 工具把 `ai-order-demo/index.html` 中（原第 1300 行附近）：

```js
const GLM={key:'AE1FE946-REDACTED',base:'https://open.bigmodel.cn/api/paas/v4'};
```

改为：

```js
const GLM={key:'',base:'https://open.bigmodel.cn/api/paas/v4'};
```

- [ ] **Step 2: 全仓库密钥扫描**

```bash
cd "/Users/uicron/Desktop/GuanMai/Code/林灶辉-简历网站"
grep -RIn "ae1fe9464e2d" . --exclude-dir=node_modules --exclude-dir=.git && echo "还有残留 key，停!" || echo "干净 OK"
```

Expected: 干净 OK。

- [ ] **Step 3: 浏览器验证降级行为**

```bash
node tests/check-demo.mjs ai-order-demo
```

Expected: 3 项全 ✅。再手动（或临时 playwright 脚本）确认：页面各 tab 可切换；在录单输入框提交一段文本，应出现错误 toast（key 为空 → GLM 401 → 走既有 catch/toast 链路），页面不白屏不卡死。注意：识别请求会发往 `open.bigmodel.cn`，check-demo 的「零外部请求」只针对**加载时**；若加载时就有外部请求则为 bug，需要查。

- [ ] **Step 4: 升级 ai-order 卡**

`assets/js/portfolio-data.js` 中 `id: "ai-order"` 条目只改三个字段：

```js
      statusLabel: "浏览器可跑 · 演示模式",
      media: { type: "iframe", src: "./ai-order-demo/", url: "AI 录单 · 静态演示", caption: "完整界面浏览器直跑（演示模式）：录单 / 审核 / 客户 / 报价单等模块可点可看。在线版未配置模型 Key，提交识别会提示失败；本地全栈版可完整跑通文字/图片/Excel 识别。" },
      links: [
        { label: "全屏打开演示 →", href: "./ai-order-demo/", primary: true },
        { label: "产品方案图解", href: "./demos/ai-order.html" }
      ]
```

- [ ] **Step 5: 回归 + 提交**

```bash
node tests/e2e-portfolio.mjs
git add ai-order-demo assets/js/portfolio-data.js
git commit -m "feat: AI 录单静态演示入驻 ./ai-order-demo/（去除硬编码 key，演示模式降级）

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: 预留位接线（caigou 说明 / lobster 链接 / product-agent 卡）

**Files:**
- Modify: `$SITE/assets/js/portfolio-data.js`
- Modify: `$SITE/assets/js/main.js`（如需空数组守卫）

- [ ] **Step 1: caigou 卡追加说明**

`id: "caigou-cloud"` 条目的 `note` 字段末尾追加一句：

```
项目持续迭代中，Demo 会随源项目更新在本地址原地升级。
```

- [ ] **Step 2: lobster 卡追加预留链接**

`id: "lobster"` 条目 `links` 数组追加一项：

```js
        { label: "完整版 Demo（打磨中）", href: "./lobster/" }
```

- [ ] **Step 3: 新增 product-agent 卡（Tier A 末尾、Tier B 之前）**

```js
    {
      id: "product-agent", tier: "A", statusLabel: "开发中 · Demo 打磨中",
      title: "商品 Agent（GM Service）",
      subtitle: "观麦 ERP 商品 / 采购域服务的 Agent 化 · 开发中",
      tags: ["scene", "industry", "arch"],
      desc: "基于观麦生鲜供应链 ERP 服务（商品、订单、采购规格等域）的 Agent 化改造，正在开发中。Demo 地址已预留，做完原地上线。",
      metrics: [],
      achievements: [],
      media: { type: "plan", caption: "开发中 · Demo 即将上线" },
      links: [{ label: "Demo 预留地址（打磨中）", href: "./product-agent/", primary: true }]
    },
```

铁律说明：此卡只陈述状态，不写任何成果/数字（项目未完成）。

- [ ] **Step 4: 检查渲染器对空 metrics/achievements 的容错**

打开 `assets/js/main.js`，找到作品抽屉渲染函数（渲染 `metrics`/`achievements` 的循环处）。若对空数组会渲染出空标题或报错，加守卫（模式如下，具体以现有代码风格为准）：

```js
if (w.metrics && w.metrics.length) { /* 原渲染逻辑 */ }
if (w.achievements && w.achievements.length) { /* 原渲染逻辑 */ }
```

- [ ] **Step 5: 回归 + 提交**

```bash
node tests/e2e-portfolio.mjs
git add assets/js/portfolio-data.js assets/js/main.js
git commit -m "feat: 预留位接线（caigou 迭代说明 / lobster 完整版链接 / 商品 Agent 占位卡）

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: 双主题 token 层重设计

**Files:**
- Modify: `$SITE/assets/css/styles.css`（`:root` / `[data-theme]` 变量区，文件开头）

**Interfaces:**
- Produces: 新增变量 `--surface-2` `--border-strong` `--tier1` `--tier2` `--tier3`，Task 8 组件层使用。既有变量名（`--bg` `--bg-soft` `--surface` `--text` `--text-muted` `--text-faint` `--accent` `--accent-2` `--accent-soft` `--border` `--shadow` `--glow`）保持不变，只换值。

- [ ] **Step 1: 替换两套主题变量值**

暗色（照抄设计稿 `docs/design-draft/index.html` 的 `:root`）：

```css
[data-theme="dark"] {
  --bg:#0b0f0e; --bg-soft:#0f1513; --surface:#121917; --surface-2:#172321;
  --text:#e9f0ec; --text-muted:#9fb0aa; --text-faint:#6b7d77;
  --accent:#b6f36b; --accent-2:#7fe0c4; --accent-soft:rgba(182,243,107,.12);
  --border:#1e2a27; --border-strong:#2a3a36;
  --shadow:0 12px 40px rgba(0,0,0,.45);
  --glow:0 0 26px rgba(182,243,107,.18);
  --tier1:#b6f36b; --tier2:#7fbfff; --tier3:#c9a0ff;
}
```

明亮（同一设计人格派生，起始值如下，实施中可微调但对比度不得低于 AA）：

```css
[data-theme="light"] {
  --bg:#f7faf5; --bg-soft:#eef4ea; --surface:#ffffff; --surface-2:#f2f7ee;
  --text:#18211a; --text-muted:#54655a; --text-faint:#7e8f84;
  --accent:#3e7d1f; --accent-2:#0f7a63; --accent-soft:rgba(62,125,31,.10);
  --border:#dde7d9; --border-strong:#c4d4bd;
  --shadow:0 8px 28px rgba(30,50,35,.10);
  --glow:0 0 0 3px rgba(62,125,31,.12);
  --tier1:#3e7d1f; --tier2:#1d63c8; --tier3:#7a3fd6;
}
```

暗色 body 加设计稿的氛围渐变（light 不加）：

```css
[data-theme="dark"] body {
  background-image:
    radial-gradient(900px 500px at 82% -8%, rgba(127,224,196,.08), transparent 60%),
    radial-gradient(760px 420px at 8% 4%, rgba(182,243,107,.07), transparent 55%);
}
```

- [ ] **Step 2: 对比度自查**

关键组合（用任一 WCAG 对比度公式/工具核对，达不到 4.5:1 就加深）：
- light：`#18211a` on `#f7faf5`（正文）；`#3e7d1f` on `#ffffff`（accent 文字/链接）；`#54655a` on `#ffffff`（muted）。
- dark：`#e9f0ec` on `#0b0f0e`；`#b6f36b` on `#121917`；`#9fb0aa` on `#121917`。

- [ ] **Step 3: 浏览器双主题走查**

```bash
node tests/e2e-portfolio.mjs
```

再起本地服务人工/脚本截图 `?theme=light` 与 `?theme=dark` 首页，确认：两主题都不花、☀/☾ 切换即时生效、无变量缺失导致的白块。

- [ ] **Step 4: 提交**

```bash
git add assets/css/styles.css
git commit -m "design: 双主题 token 层重设计（暗色=设计稿荧光绿系，明亮同人格派生）

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 8: 组件层重设计（按设计稿移植）

**Files:**
- Modify: `$SITE/assets/css/styles.css`（组件区）
- Modify: `$SITE/index.html`（如个别区块需调结构，尽量少动）
- Modify: `$SITE/assets/js/main.js`（仅当 class 名变更需要同步时）

**蓝本：`docs/design-draft/index.html`。先通读它的 `<style>` 全文再动手。**

- [ ] **Step 1: 移植设计稿组件语言**

逐区块把设计稿的组件样式移植到 styles.css（保持现有 class 名与 DOM 结构，改样式不改结构；用 Task 7 的变量）：

- 导航：sticky + `backdrop-filter:blur(12px)`，半透明底（暗色 `rgba(11,15,14,.72)`，明亮 `rgba(247,250,245,.8)`），品牌点 `box-shadow:var(--glow)`。
- Hero：`kicker`（12px 字距 2px 大写 accent 色眉题）+ 大标题 `clamp(34px,5.4vw,60px)` 800 字重，关键词 accent 高亮；stats 胶囊 chip（`border:1px solid var(--border-strong); border-radius:999px`）。
- 能力矩阵（作品集）：cap 胶囊卡 —— `border-radius:14px; min-width:150px`，hover `border-color:var(--accent); translateY(-2px)`，active 加 `background:var(--accent-soft); box-shadow:var(--glow)`。
- 作品分档条 tierbar：`色点(9px 圆角3px, 背景 var(--tier1/2/3)) + 档名 + 说明 + 1px 分隔线延展`。
- 作品卡：`border-radius:16px; padding:22px`，hover `translateY(-3px) + var(--shadow)`；能力筛选命中 `.match{border-color:var(--accent); box-shadow:var(--glow)}`，未命中 `.dim{opacity:.32; filter:saturate(.5)}`（如现有 main.js 用别的 class 名做高亮/淡化，样式跟着现有名走）。
- 抽屉：宽版侧滑 + scrim 遮罩，标题区含 statusLabel 徽章。
- 时间轴 / 技能 / 联系：不改结构，只按新 token 调色、圆角统一 14-16px、过渡 180-240ms。

- [ ] **Step 2: 双语双主题四态走查**

本地服务 + Playwright 截图四态（zh/en × light/dark）+ 移动端 375px，逐屏检查：无溢出、无对比度问题、筛选高亮/淡化动效正常。

- [ ] **Step 3: 回归**

```bash
node tests/e2e-portfolio.mjs
```

Expected: 全过（有 class 名变更就同步更新测试选择器）。

- [ ] **Step 4: 提交**

```bash
git add assets/css/styles.css index.html assets/js/main.js tests/
git commit -m "design: 整站组件层按设计稿重做（能力矩阵/分档/卡片/抽屉/导航/Hero）

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 9: 整站回归 + file:// 检查

**Files:**
- Modify: `$SITE/tests/e2e-portfolio.mjs`（追加 Demo 断言）

- [ ] **Step 1: e2e 追加三个新 Demo 的断言**

在 `tests/e2e-portfolio.mjs` 末尾（关浏览器之前）追加：

```js
// 新增 Demo 冒烟：iframe 地址直开有内容
for (const d of ['boss', 'wenda', 'ai-order-demo', 'product-agent', 'lobster']) {
  const p2 = await browser.newPage();
  const errs = [];
  p2.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p2.goto(`http://localhost:${PORT}/${d}/`, { waitUntil: 'networkidle' });
  await p2.waitForTimeout(800);
  const t = (await p2.locator('body').innerText()).trim();
  check(`demo:${d} 可开有内容`, t.length > 10);
  check(`demo:${d} 零 console error`, errs.length === 0, errs.slice(0,2).join('|'));
  await p2.close();
}
```

（变量名 `browser`/`PORT`/`check` 与该文件现有定义一致；如不一致按现有代码适配。）

- [ ] **Step 2: 全量跑**

```bash
node tests/e2e-portfolio.mjs
```

Expected: 原 25 项 + 新增 10 项全 ✅。

- [ ] **Step 3: file:// 双击检查**

```bash
open "/Users/uicron/Desktop/GuanMai/Code/林灶辉-简历网站/index.html"
```

人工确认：首页正常渲染、主题/语言切换可用、作品集抽屉可开（iframe 里的 Vite Demo 在 file:// 下可能受限——只要求首页自身功能不坏，Demo 以 http 部署为准）。

- [ ] **Step 4: 提交**

```bash
git add tests/e2e-portfolio.mjs
git commit -m "test: e2e 追加 5 个 Demo/占位地址冒烟断言

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 10: README 更新 + 密钥终扫 + 收尾

**Files:**
- Modify: `$SITE/README.md`

- [ ] **Step 1: README 补「一个仓库=整站」说明**

在 README「文件结构」节更新，加入：

```markdown
  boss/            老板助手 · 浏览器可跑 Demo（Boss-Agent 构建产物）
  wenda/           观麦 Agent 平台 Demo · GM鲜达（问答Agent Platform apps/demo 构建产物）
  ai-order-demo/   AI 录单 · 静态演示（演示模式，无模型 Key）
  caigou/          采宝 采购 Agent · 浏览器可跑 Demo（持续迭代，原地升级）
  product-agent/   预留位：商品 Agent（GM Service），占位页
  lobster/         预留位：龙虾经营 Agent 完整版，占位页
  docs/design-draft/  作品集设计稿归档（重设计蓝本）

## Demo 更新流程

源项目改完 → 源项目里构建 → 构建产物拷进本仓库对应目录覆盖 → commit + push 本仓库。
地址永远不变，作品集数据层（assets/js/portfolio-data.js）不用改。
```

- [ ] **Step 2: 密钥终扫 + 工作区干净检查**

```bash
cd "/Users/uicron/Desktop/GuanMai/Code/林灶辉-简历网站"
grep -RInE "['\"][a-f0-9]{32}\.[A-Za-z0-9]{16}['\"]|AIza[0-9A-Za-z_-]{30,}" . --exclude-dir=node_modules --exclude-dir=.git && echo "疑似 key，停!" || echo "干净 OK"
git status --short
```

Expected: 干净 OK；git status 只剩 README 待提交。

- [ ] **Step 3: 提交**

```bash
git add README.md
git commit -m "docs: README 更新为一体站说明（Demo 目录表 + 原地升级流程）

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

- [ ] **Step 4: 汇报**

向用户汇报：commit 列表、验证结果截图/输出、遗留事项（push 由用户执行；提醒 AI录单-Agent 源仓库 docs/index.html 仍含真实 key，若源仓库要推公网需先换掉）。
