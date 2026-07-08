# 林灶辉 · 个人简历

一个素雅打底、暗色出彩、克制交互的纯静态简历网站。零依赖、零构建、可离线，双击即可打开。

## 打开方式

直接双击 `index.html`，浏览器会以 `file://` 方式打开，无需起服务器、无需联网。

> 数据通过 `<script src>` 注入全局 `window.RESUME`，不使用 `fetch` / ES `import`，所以本地双击不会有 CORS 报错。

如果你想用本地服务器预览（可选）：

```bash
cd 林灶辉-简历
python3 -m http.server 8080
# 浏览器访问 http://localhost:8080
```

## 切换主题 / 语言

- 右上角 `☀ / ☾` 按钮：浅色 / 深色一键切换，**无刷新即时生效**。
- 右上角 `中 / EN` 按钮：中英双语一键切换，**无刷新即时重渲染**。
- 两项选择都会写入 `localStorage`，下次打开自动记住。

**初始优先级**

- 主题：URL `?theme` > `localStorage.theme` > 系统 `prefers-color-scheme`。
- 语言：URL `?lang` > `localStorage.lang` > 浏览器 `navigator.language`（默认中文）。

## URL 参数（便于分享与截图）

可用 `?theme` 与 `?lang` 直接指定要展示的状态：

- `index.html?theme=dark&lang=en` —— 暗色 + 英文
- `index.html?theme=light&lang=zh` —— 浅色 + 中文

参数取值：`theme=light|dark`，`lang=zh|en`。

## 文件结构

```
林灶辉-简历网站/
  index.html              语义化骨架，文本由 main.js 从 RESUME 渲染
  assets/css/styles.css   CSS 变量实现 light/dark 两套主题；响应式；克制动效
  assets/js/data.js       window.RESUME = { zh:{...}, en:{...} } 唯一文案源
  assets/js/main.js       渲染 + 主题/语言切换 + 滚动交互
  assets/favicon.svg      青色字标
  resume.pdf              PDF 简历（联系区「下载 PDF 简历」指向它）
                          注：本地 file:// 下多数浏览器会「在新标签打开」而非直接下载，可右键另存；部署到 http(s) 后 download 才完全生效。
  boss/            老板助手 · 浏览器可跑 Demo（Boss-Agent 构建产物）
  wenda/           观麦 Agent 平台 Demo · GM鲜达（问答Agent Platform apps/demo 构建产物）
  ai-order-demo/   AI 录单 · 静态演示（演示模式，无模型 Key）
  caigou/          采宝 采购 Agent · 浏览器可跑 Demo（持续迭代，原地升级）
  product-agent/   预留位：商品 Agent（GM Service），占位页
  lobster/         预留位：龙虾经营 Agent 完整版，占位页
  docs/design-draft/  作品集设计稿归档（重设计蓝本）
  README.md               本说明
```

## 修改内容

所有文案集中在 `assets/js/data.js`，`zh` 与 `en` 结构一致，改文字只动这一个文件即可，页面会自动渲染。请保持中英文信息量一致、忠实于简历，不夸大数字。

## 区块

顶部导航（含滚动进度条）· Hero · 个人优势 · 工作经历（时间轴）· 项目经历（可按分类筛选）· 技能 · 联系（含下载 PDF）。

## 交互（克制）

平滑滚动、顶部进度条、导航激活高亮、区块/卡片进入渐入、卡片悬停上浮、主题/语言切换。无视差、无粒子、无光标特效；`prefers-reduced-motion` 下自动关闭位移动画。

## 无障碍

语义化标签、跳转链接、可见焦点态、切换按钮 `aria-label` / `aria-pressed`、对比度面向 AA、尊重「减少动态效果」系统偏好。

## 部署

纯静态，把整个目录上传到任意静态托管（GitHub Pages / Vercel / Netlify / 对象存储）即可，无需构建步骤。

## Demo 更新流程

源项目改完 → 源项目里构建 → 构建产物拷进本仓库对应目录覆盖 → commit + push 本仓库。
地址永远不变，作品集数据层（assets/js/portfolio-data.js）不用改。

## 作品集（Portfolio）

首页「作品集」区提供两个入口，都能单点跳转到对应作品：

- **能力矩阵**：11 条能力分 3 组（AI/Agent 工程 · 产品/商业 · 差异化）。点击任一能力 → 下方作品自动高亮匹配、淡化无关；再点取消。
- **作品卡（分三档）**：① 线上/可运行真产品 ② 高保真交互原型 ③ 往期 B 端代表作。点卡片 → 右侧抽屉详情。
  - 浏览器可跑 Demo（老板助手 boss / 问答 Agent wenda / AI 录单 ai-order-demo / 采购 Agent caigou）在抽屉内 **iframe 内嵌真实 Demo**，可直接操作；
  - 线上产品（超级麦吉）用真实官网截图 + 线上/GitHub 链接；
  - 产品化平台（product-agent）/ 龙虾平台（lobster）为预留占位，暂未接入可运行 Demo。

### 可分享深链

- `#work/<id>`：直达某作品详情，如 `#work/supermagic`、`#work/lobster`
- `#cap/<id>`：直达并按某能力筛选，如 `#cap/mm`（多模态/OCR）、`#cap/fullstack`

### 相关文件

- `assets/js/portfolio-data.js`：作品集数据（能力 + 作品，`window.PORTFOLIO`）
- `assets/js/main.js`：`renderPortfolio()` 能力矩阵/分档卡片/筛选/抽屉/深链
- `portfolio/`：截图与架构图　`prototypes/`：内嵌的原型 HTML
- 数据口径：成果指标以简历为准、不夸大；原型内为「演示数据」并已标注。

## 端到端自测

```bash
npm install            # 安装 playwright（使用系统 Chrome）
node tests/e2e-portfolio.mjs   # 起本地静态服务 + 真实浏览器，跑 45 项断言
```
覆盖：能力矩阵渲染/筛选高亮、作品抽屉（截图/内嵌原型/移动端框）、hash 深链、首屏与深链页面可见性、图片与原型资源可访问、双语切换、各 Demo 目录（boss/wenda/ai-order-demo/product-agent/lobster）可打开且零 console error。
