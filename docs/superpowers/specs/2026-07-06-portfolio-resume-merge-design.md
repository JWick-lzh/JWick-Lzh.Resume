# 作品集 + 简历网站合并 · 设计 spec

日期：2026-07-06
状态：待用户确认

## 1. 背景与目标

GitHub 号上只放一个项目：简历 + 作品集一体站（仓库 `JWick-lzh/JWick-lzh.github.io`，GitHub Pages，push main 即上线）。

现状问题：
- Code 目录下「作品集-设计稿」和「林灶辉-简历网站」是两个文件夹，要合成一份。
- 作品集卡片大多是截图/静态原型，只有采购 Agent 是可玩 Demo。做完的项目应该点开即玩。
- 现有站点视觉偏素雅，用户希望按设计稿重新设计一版更好看的，支持明亮/暗黑双主题。

目标：合并后，`林灶辉-简历网站` 一个文件夹 = 一个仓库 = 一个完整站点（简历 + 作品集 + 可玩 Demo），用户只需要 push 这一个仓库。

## 2. 范围

本次做三件事：

1. **文件夹合并**：「作品集-设计稿」归档进简历仓库，删掉外面的独立文件夹。
2. **Demo 并入 + 预留位**：三个做完的 Demo 入驻固定地址；没做完的项目预留固定地址，做完后原地替换、数据层零改动。
3. **视觉重设计**：以设计稿为蓝本重做站点视觉，明亮/暗黑双主题切换。

不做的事：
- 不改简历文案内容（文案铁律见 §7）。
- 不把源项目（Boss-Agent、AI录单-Agent 等）的源码搬进简历仓库，只搬构建产物。
- Lobster 完整 React 版这次不做浏览器内 mock（现有静态原型继续用，地址先预留）。

## 3. 文件夹合并

- `作品集-设计稿/` 整体移入简历仓库 `docs/design-draft/`：
  - `index.html`（暗色 mockup，重设计的蓝本）
  - `shots/` 全部截图（含简历站 portfolio/ 里缺的 `supermagic-full.png`）
  - `观麦 OS 5.0.png`
- 移完删除 Code 目录下的 `作品集-设计稿/` 文件夹。
- 站点引用的截图仍在 `portfolio/` 目录，不动；`docs/design-draft/` 只是存档。

## 4. Demo 并入与预留位

### 4.1 固定地址表（一次定死，永久不变）

| 作品集卡片 | 固定地址 | 本次状态 |
|---|---|---|
| 问答 Agent 平台（GM鲜达） | `./wenda/` | ✅ 入驻：`问答Agent Platform/apps/demo` 构建产物 |
| AI 录单 | `./ai-order-demo/` | ✅ 入驻：`AI录单-Agent/docs/index.html` 静态演示版 |
| 老板助手（语音版） | `./boss/` | ✅ 入驻：`Boss-Agent` 构建产物 |
| 采购 Agent | `./caigou/` | ⏳ 预留：现有可跑版继续在线，项目做完后原地替换 |
| Product Agent GM Service | `./product-agent/` | ⏳ 预留：占位页 |
| Lobster（完整版） | `./lobster/` | ⏳ 预留：占位页；卡片 iframe 暂用现有静态原型 |

### 4.2 入驻做法（复用 /caigou 成熟路子）

- 源项目里构建（`base: './'`，相对路径），产物拷进简历仓库对应目录，整目录提交。
- 问答 Agent：`pnpm --filter demo build` → 拷 `apps/demo/dist/` → `./wenda/`。
- Boss-Agent：`npm run build` → 拷 `dist/` → `./boss/`。已确认 `base:'./'` 已配好、无 key 走演示兜底模式。
- AI 录单：单文件 `docs/index.html` 直接拷入 `./ai-order-demo/index.html`。
- 源项目如需加/改构建配置，在各自仓库单独 commit，不动简历仓库以外的部署方式。

### 4.3 预留位机制

- 占位页是一个统一模板（站内设计语言，双主题跟随），内容：项目名 + 一句话简介 +「Demo 打磨中，即将上线」+ 返回作品集链接。
- `portfolio-data.js` 里卡片的直达链接现在就指向固定地址。以后 Demo 做完，构建产物拷进对应目录覆盖占位页即可，**数据层一行不用改**。
- 采购 Agent 特殊：`./caigou/` 已有能跑的静态版，继续在线不下线，等新版做完原地覆盖。

### 4.4 卡片升级（`assets/js/portfolio-data.js`）

- `boss` 条目：iframe 从 `./prototypes/boss-assistant.html` 升级为 `./boss/`（手机壳内嵌），直达链接同步。
- `ai-order` 条目：从文字方案图升级为 iframe `./ai-order-demo/`，旧方案页 `./demos/ai-order.html` 保留作附链。
- 升级现有 `guanmai-platform` 条目为 iframe `./wenda/`（问答 Agent Platform 与观麦 AI Agent 平台是同一项目，不另立卡避免重复）。
- 新增/调整「Product Agent GM Service」呈现：架构/方案卡 + 直达链接指向 `./product-agent/` 占位页。
- `lobster` 条目：直达链接加 `./lobster/` 占位地址，iframe 暂不动。

## 5. 视觉重设计（明亮/暗黑双主题）

- 蓝本：`docs/design-draft/index.html` 的设计语言——深底、荧光绿 accent（#b6f36b）+ 青绿辅助（#7fe0c4）、能力矩阵筛选、作品分档（tier 色：绿/蓝/紫）、卡片 hover 浮起 + glow。
- **暗黑主题**：直接采用设计稿配色体系。
- **明亮主题**：同一设计人格派生一套浅色变量（同色相、加深饱和以保证对比度，文本对比达到 WCAG AA），不是简单反色。
- 架构不变：仍是纯静态、零依赖、零构建、file:// 双击可开（沿用 `_brief.md` 铁律）；CSS 变量双主题；☀/☾ 切换 + `?theme` 参数 + localStorage 记忆全部保留。
- 重设计覆盖整站：导航、Hero、优势、经历时间轴、作品集（能力矩阵 + 分档 + 抽屉）、技能、联系。作品集区块按设计稿的「能力筛选 → 作品高亮/淡化」交互重做。
- 现有功能回归底线：中英双语、hash 深链开合抽屉、前进后退、移动端响应式，一个不能坏。

## 6. 交付物与部署

- 简历仓库（main）：demo 目录 ×3、占位目录 ×3、`docs/design-draft/` 存档、重设计后的 HTML/CSS/JS、更新的 `portfolio-data.js`、README 更新。本地 commit，**不 push，用户自己推**。
- 源项目仓库：构建配置改动各自 commit。
- Code 目录：删除 `作品集-设计稿/`（内容已归档进简历仓库后才删）。

## 7. 文案铁律（沿用 `_brief.md`）

- 所有文案只来自简历源文件（`20260630-AI产品-林灶辉-cc.md`），不新增/夸大任何客户、营收、效率数字。
- 英文是中文的忠实翻译，信息量一致。
- 新增的问答 Agent、Product Agent 卡片文案同样只用简历里已有的口径。

## 8. 安全

- 公开站点不嵌任何真实 API key。Boss-Agent 无 key 走演示兜底（已验证可对话）；AI 录单静态版识别功能如需 key 则优雅降级，其余流程照常可点（实施时验证其无 key 行为）。
- 检查拷入的构建产物里没有 `.env`、密钥字符串。

## 9. 验证

- 本地起 http 服务模拟 Pages + Playwright 真浏览器走查：
  - 三个新 Demo：iframe 内嵌可见可交互、直达链接可开、零控制台错误、零对 localhost/内网的网络请求。
  - 三个占位页：可开、双主题正常。
  - 重设计后整站：双主题切换、中英切换、作品集能力筛选/分档/抽屉/hash 深链、移动端 375px 布局，全部回归。
- file:// 双击 index.html 直接打开仍可用（不引入 fetch/ES import）。
- 首页现有端到端自测（tests/ 下 25 项）跑通或同步更新。
