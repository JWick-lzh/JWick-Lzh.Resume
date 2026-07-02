# 作品集整合 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在现有 React 简历站上整合作品集，让「能力」与「项目」两个入口单点跳转到对应作品（内嵌原型 / 截图 / 架构图 / 方案）。

**Architecture:** 增量改造现有 Vite+React+Tailwind SPA。新增统一数据层 `portfolio.ts`，把 Skills 改成能力矩阵、Works 改成分档卡片 + 筛选高亮 + 抽屉详情，用轻量 hash 深链（`#work/*`、`#cap/*`）串起双向跳转。真实原型 HTML 与截图/架构图作为静态资源放入 `public/`，抽屉内用 iframe/img 引用。

**Tech Stack:** React 18 + TypeScript + Vite + Tailwind + shadcn/ui + GSAP（沿用现有栈，不新增路由/状态库）。

## Global Constraints

- 成果指标（A 类）只用 `GuanMai/code/20260630-AI产品-林灶辉-cc.md` 可核实数字；超级麦吉注册量统一写「2 万+」。不新增不夸大。
- 演示数据（B 类）可 mock，但整套要自洽闭环，且在作品内标注「演示数据」。
- 不重做超级麦吉界面；观麦平台不做在线 demo。
- 不引入 router / 状态管理库；hash + 局部 state / context 即可。
- 原型 iframe、截图、架构图一律用站内相对路径（`/prototypes/*`、`/portfolio/*`），保证静态托管与本地预览都可用。
- 现有视觉骨架（暗色 + lime 强调、GSAP 动效）保留，只做增量。
- 本期以中文为主；英文留 TODO，不阻塞。

---

### Task 1: 统一数据层 portfolio.ts

**Files:**
- Create: `src/data/portfolio.ts`
- Reference: `GuanMai/code/20260630-AI产品-林灶辉-cc.md`（数据源）、`GuanMai/code/作品集-设计稿/index.html`（结构参考）

**Interfaces:**
- Produces:
  - `export type CapId = 'agent'|'orch'|'rag'|'mm'|'arch'|'p01'|'scene'|'viz'|'industry'|'fullstack'|'delivery'`
  - `export interface Cap { id: CapId; cn: string; group: 1|2|3 }`
  - `export type Tier = 'A'|'B'|'C'`
  - `export type MediaType = 'iframe'|'shot'|'arch'|'plan'|'run'`
  - `export interface WorkMedia { type: MediaType; src?: string; url?: string; mobile?: boolean; cmd?: string; arch?: string }`
  - `export interface WorkLink { label: string; href: string; primary?: boolean }`
  - `export interface Work { id: string; tier: Tier; statusLabel: string; title: string; subtitle: string; tags: CapId[]; desc: string; metrics: [string,string][]; achievements: string[]; media: WorkMedia; links: WorkLink[]; note?: string }`
  - `export const CAPS: Cap[]`（11 条，见下）
  - `export const WORKS: Work[]`（10 个：Tier A 4 个、B 2 个、C 4 个）
  - `export const CAP_CN: Record<CapId,string>`

- [ ] **Step 1: 创建数据文件，定义类型与 CAPS**

写入 11 条能力（分组见 spec §2）：
```ts
export const CAPS: Cap[] = [
  { id:'agent', cn:'Agent设计与拟人化交互', group:1 },
  { id:'orch',  cn:'流程 / 状态机编排', group:1 },
  { id:'rag',   cn:'RAG / 知识库', group:1 },
  { id:'mm',    cn:'多模态 / OCR', group:1 },
  { id:'arch',  cn:'系统架构与工程化', group:1 },
  { id:'p01',   cn:'产品 0→1 与商业化', group:2 },
  { id:'scene', cn:'业务场景识别与产品化', group:2 },
  { id:'viz',   cn:'数据可视化与经营分析', group:2 },
  { id:'industry', cn:'B端行业深度', group:2 },
  { id:'fullstack', cn:'全栈落地（会写代码的PM）', group:3 },
  { id:'delivery', cn:'团队与商业化交付', group:3 },
];
export const CAP_CN = Object.fromEntries(CAPS.map(c=>[c.id,c.cn])) as Record<CapId,string>;
```

- [ ] **Step 2: 写入 WORKS 数组（10 个作品）**

以 `作品集-设计稿/index.html` 的 WORKS 为蓝本，按最终决策调整：数据对齐 cc 简历（超级麦吉 2 万+ 注册、近千万年化、Agentlang GitHub Trending 全球前四）；media 类型按 spec §3（超级麦吉=shot、观麦平台=arch、AI-Order=plan、采购Cloud=run、龙虾/老板助手=iframe、连锁SaaS=shot、智慧客服6.0/供应链中台/氚云=plan 文案卡）。资源路径用 `/prototypes/*`、`/portfolio/*`。每个 Work 至少 3 条 achievements、正确的 tags。Tier C 卡 media 用简短文案（`type:'plan'` 无 cmd，仅 achievements + links）。

- [ ] **Step 3: 类型检查通过**

Run: `cd 林灶辉-简历网站 && npx tsc --noEmit`
Expected: 无 error（portfolio.ts 相关）

- [ ] **Step 4: Commit**

```bash
git add src/data/portfolio.ts
git commit -m "feat: 作品集统一数据层（能力 + 作品，数据对齐 cc 简历）"
```

---

### Task 2: 静态资源就位（原型 + 截图 + 架构图）

**Files:**
- Create: `public/prototypes/`（拷入龙虾 5 个原型、老板助手、采宝早期原型）
- Create: `public/portfolio/`（拷入 supermagic-home.png、guanmai-arch.png、dtyq-home.png、aiorder-sample.png）
- Source: `作品集-设计稿/shots/*`、`lobster-agent/prototypes/*`、`prototype/老板助手原型_v1.0.html`、`caigou-agent/prototypes/*`

**Interfaces:**
- Produces: 站内可访问的 `/prototypes/lobster-task-center.html` 等、`/portfolio/*.png`；供 Task 5/6 的 iframe/img 引用。

- [ ] **Step 1: 拷贝原型 HTML**

```bash
cd 林灶辉-简历网站
mkdir -p public/prototypes public/portfolio
cp ../lobster-agent/prototypes/list-task-center-prototype/list-task-center-prototype.html public/prototypes/lobster-task-center.html
cp ../lobster-agent/prototypes/list-data-upload-prototype/list-data-upload-prototype.html public/prototypes/lobster-data-upload.html
cp ../lobster-agent/prototypes/management-users-roles-prototype/management-users-roles-prototype.html public/prototypes/lobster-users-roles.html
cp ../lobster-agent/prototypes/rbac-management-prototype/rbac-management-prototype.html public/prototypes/lobster-rbac.html
cp ../lobster-agent/prototypes/settings-channels-prototype/settings-channels-prototype.html public/prototypes/lobster-channels.html
cp "../prototype/老板助手原型_v1.0.html" public/prototypes/boss-assistant.html
cp ../caigou-agent/prototypes/dashboard-workbench-prototype/dashboard-workbench-prototype.html public/prototypes/caibao-workbench.html
cp ../caigou-agent/prototypes/negotiation-center-prototype/negotiation-center-prototype.html public/prototypes/caibao-negotiation.html
cp ../caigou-agent/prototypes/supplier-profile-prototype/supplier-profile-prototype.html public/prototypes/caibao-supplier.html
cp ../caigou-agent/prototypes/config-center-prototype/config-center-prototype.html public/prototypes/caibao-config.html
```

- [ ] **Step 2: 拷贝截图/架构图**

```bash
cp ../作品集-设计稿/shots/supermagic-home.png public/portfolio/supermagic-home.png
cp ../作品集-设计稿/shots/guanmai-arch.png public/portfolio/guanmai-arch.png
cp ../作品集-设计稿/shots/dtyq-home.png public/portfolio/dtyq-home.png
cp ../作品集-设计稿/shots/aiorder-sample.png public/portfolio/aiorder-sample.png
```

- [ ] **Step 3: 验证 dev server 能访问**

Run: `npm run dev`，浏览器开 `http://localhost:5173/prototypes/lobster-task-center.html` 与 `/portfolio/guanmai-arch.png`
Expected: 原型可交互、图片可见。（用无头浏览器截图核对）

- [ ] **Step 4: Commit**

```bash
git add public/prototypes public/portfolio
git commit -m "chore: 作品集静态资源（原型 HTML + 截图 + 架构图）"
```

---

### Task 3: 筛选上下文 + 能力矩阵（重写 Skills.tsx）

**Files:**
- Create: `src/context/PortfolioContext.tsx`
- Modify: `src/sections/Skills.tsx`（整体重写为能力矩阵）
- Modify: `src/App.tsx`（用 Provider 包裹 main）

**Interfaces:**
- Consumes: `CAPS`, `CapId`, `CAP_CN` (Task 1)
- Produces:
  - `export function PortfolioProvider({children}): JSX.Element`
  - `export function usePortfolio(): { activeCap: CapId|null; setActiveCap:(c:CapId|null)=>void; openWork:(id:string|null)=>void; openWorkId:string|null }`

- [ ] **Step 1: 写 Context**

`activeCap`/`openWorkId` 用 useState；`setActiveCap` toggle 语义（同值再点置 null）。`openWork` 设 openWorkId。导出 hook。

- [ ] **Step 2: App.tsx 用 Provider 包裹**

在 `<div className="min-h-screen...">` 内层包 `<PortfolioProvider>`，保持 Navigation/main/Footer 结构不变。

- [ ] **Step 3: 重写 Skills.tsx 为能力矩阵**

删除百分比 skillCategories。按 3 组渲染 CAPS，每条能力显示：中文名 + 「N 个作品」（N = WORKS 中 tags 含该 id 的数量）。点击调用 `setActiveCap(id)`；active 态高亮（lime 边框/发光）。保留 GSAP 入场动画风格。加一行提示：「点击能力 → 下方作品高亮匹配」。

- [ ] **Step 4: 类型检查 + 视觉核对**

Run: `npx tsc --noEmit` → 无 error；`npm run dev` 无头截图 #skills 区，确认 11 条能力分 3 组渲染、点击有 active 态。

- [ ] **Step 5: Commit**

```bash
git add src/context/PortfolioContext.tsx src/sections/Skills.tsx src/App.tsx
git commit -m "feat: 能力矩阵 + 作品集筛选上下文（替换百分比技能条）"
```

---

### Task 4: 作品分档卡片 + 筛选高亮（重写 Works.tsx）

**Files:**
- Modify: `src/sections/Works.tsx`（整体重写）

**Interfaces:**
- Consumes: `WORKS`, `CAP_CN` (Task 1), `usePortfolio` (Task 3)
- Produces: 渲染分档作品网格；卡片点击 `openWork(id)`；能力筛选驱动 `match`/`dim` 样式。

- [ ] **Step 1: 按 Tier 分组渲染**

Tier A「线上/可运行真产品」、Tier B「高保真交互原型」、Tier C「往期 B 端产品」，各一条分隔条 + 卡片网格（桌面 2 列/移动 1 列）。卡片显示 statusLabel pill、标题、subtitle、desc、metrics、能力 tag、「查看详情 →」。

- [ ] **Step 2: 接入筛选高亮**

读 `activeCap`：作品 tags 含 activeCap → 加 match（lime 边框发光）；否则 dim（降透明度）。activeCap 为 null 时全部正常。卡片内匹配的 tag 高亮。

- [ ] **Step 3: 卡片点击开抽屉**

`onClick={()=>openWork(w.id)}`。

- [ ] **Step 4: 类型检查 + 视觉核对**

Run: `npx tsc --noEmit`；`npm run dev` 无头截图，点能力后确认高亮/淡化正确、三档齐全（含 4 个往期 B 端卡）。

- [ ] **Step 5: Commit**

```bash
git add src/sections/Works.tsx
git commit -m "feat: 作品分档卡片 + 能力筛选高亮"
```

---

### Task 5: 作品详情抽屉 WorkDrawer.tsx

**Files:**
- Create: `src/sections/WorkDrawer.tsx`
- Modify: `src/App.tsx`（挂载 `<WorkDrawer/>`）

**Interfaces:**
- Consumes: `WORKS`, `CAP_CN`, `usePortfolio`
- Produces: `export default function WorkDrawer(): JSX.Element` — 右侧滑出抽屉，按 `openWorkId` 显示对应 Work。

- [ ] **Step 1: 抽屉骨架 + 关闭逻辑**

scrim + 右滑 aside；`openWorkId` 非空则 open。关闭：点 scrim、✕、Esc → `openWork(null)`。

- [ ] **Step 2: 按 media.type 渲染主体**

- `iframe`：浏览器 chrome 条 + `<iframe src={media.src}>`（mobile 时 390px 手机框、height 640）+ 「真实原型，内嵌可交互」说明。
- `shot`：`<img src={media.src}>` + 说明（线上产品真实截图 / 官网截图）。
- `arch`：`<img src={media.src}>`（架构图）+ 「思路」说明段。
- `plan`：产品方案文案块（背景/流程/技术栈/价值，用 achievements 渲染）；Tier C 卡同样走此分支（仅成果 + links）。
- `run`：启动命令代码块 + 可选 arch ASCII + 「本地可运行，建议补录屏」说明。

再渲染 metrics、关键成果（achievements）、体现的能力（tags→CAP_CN）、note、入口（links，http/.html 用 target=_blank）。

- [ ] **Step 3: App.tsx 挂载抽屉**

Provider 内、Footer 后加 `<WorkDrawer/>`。

- [ ] **Step 4: 类型检查 + 逐类型截图核对**

Run: `npx tsc --noEmit`；无头截图核对：龙虾(iframe 可交互)、超级麦吉(截图)、观麦平台(架构图清晰)、AI-Order(方案)、采购Cloud(run)、连锁SaaS(截图)、氚云(Tier C 文案卡)。

- [ ] **Step 5: Commit**

```bash
git add src/sections/WorkDrawer.tsx src/App.tsx
git commit -m "feat: 作品详情抽屉（iframe/截图/架构/方案/运行 多形态）"
```

---

### Task 6: Hash 深链（能力/项目双向可分享跳转）

**Files:**
- Modify: `src/context/PortfolioContext.tsx`（读写 hash）
- Modify: `src/sections/Navigation.tsx`（新增「作品集」锚点，可选）

**Interfaces:**
- Consumes: `usePortfolio` 内部 state
- Produces: `#work/<id>` 打开对应抽屉；`#cap/<id>` 激活对应能力；反向操作写入 hash。

- [ ] **Step 1: Provider 内解析 hash**

useEffect：DOMContentLoaded/mount + `hashchange` → 解析 `#work/<id>`（存在则 openWork）、`#cap/<id>`（存在则 setActiveCap）。

- [ ] **Step 2: 状态变化写回 hash**

openWork(id) → `location.hash='work/'+id`；close 且当前是 work hash → 还原为 `#works`。setActiveCap(id) → `#cap/<id>`；置 null → 清 cap hash。避免死循环（写 hash 时加 guard）。

- [ ] **Step 3: 验证深链**

Run: `npm run dev`；直接访问 `http://localhost:5173/#work/supermagic`（应自动开抽屉）、`/#cap/mm`（应高亮 AI-Order/采购Cloud）。无头截图核对。

- [ ] **Step 4: Commit**

```bash
git add src/context/PortfolioContext.tsx src/sections/Navigation.tsx
git commit -m "feat: 作品集 hash 深链（#work/#cap 双向可分享跳转）"
```

---

### Task 7: Hero / About 叙事对齐

**Files:**
- Modify: `src/sections/Hero.tsx`
- Modify: `src/sections/About.tsx`

**Interfaces:**
- Consumes: cc 简历数据。
- Produces: 更新后的首屏文案与 stat 芯片。

- [ ] **Step 1: Hero 文案 + stat 芯片**

主叙事：「观麦 AI 一号位，从 0 搭起经营分析+智能采购+智能录单三条产品线+Agent 平台底座；线上还有 4.9k★ 的超级麦吉」。stat 用 A 类真实指标：10 年+ toB、4 条 AI 产品线、超级麦吉 2 万+ 注册·近千万年化、GitHub 4.9k★。删任何编造数字。

- [ ] **Step 2: About 四主打**

会写代码的 AI PM · Agent 设计与编排 · 产品 0→1 与商业化 · 生鲜供应链行业深度。文案忠实 cc 简历个人优势。

- [ ] **Step 3: 类型检查 + 截图核对**

Run: `npx tsc --noEmit`；无头截图首屏，确认文案/指标正确、无编造。

- [ ] **Step 4: Commit**

```bash
git add src/sections/Hero.tsx src/sections/About.tsx
git commit -m "feat: Hero/About 叙事与真实指标对齐 cc 简历"
```

---

### Task 8: 原型完善（并行，不阻塞主站）

**Files:**
- Modify: `public/prototypes/caibao-*.html`（修占位死链）
- Modify: `public/prototypes/lobster-rbac.html`、`lobster-channels.html`（增强）
- Verify: `caigou-agent-claude`（可跑）、`AI-Order`（可跑）

**Interfaces:**
- Produces: 可闭环运行、无死链的原型；采购Cloud/AI-Order 确认启动路径。

- [ ] **Step 1: 采宝原型修死链**

把 `href="#"` 的「查看详情」「施压」「约谈」等改成有反馈（弹层/toast/无动作但不跳顶），保证点击体验闭环。演示数据处补「演示数据」标注。

- [ ] **Step 2: 龙虾弱项原型增强**

lobster-rbac / lobster-channels：补齐交互（权限矩阵勾选反馈、渠道开关状态），对齐其余 3 个原型的完成度。

- [ ] **Step 3: 验证采购Cloud / AI-Order 可跑**

采购Cloud：`cd caigou-agent-claude/backend && pip install -r requirements.txt && python main.py` + 前端 `npm run dev`，确认可启动（记录命令到 AI-Order/采购Cloud 详情）。AI-Order：`docker compose up` 或 Streamlit 直启，截 UI 图放 `public/portfolio/`。

- [ ] **Step 4: Commit（分多次）**

```bash
git add public/prototypes/caibao-*.html
git commit -m "fix: 采宝原型修占位死链 + 演示数据标注"
git add public/prototypes/lobster-rbac.html public/prototypes/lobster-channels.html
git commit -m "feat: 龙虾 rbac/channels 原型增强至同档完成度"
```

---

### Task 9: 全站验收 + 部署

**Files:**
- Verify: 整站
- Modify: `README.md`（补作品集说明）

- [ ] **Step 1: 构建**

Run: `npm run build`
Expected: 构建成功，无 type error。

- [ ] **Step 2: 验收清单核对（对照 spec §6）**

无头浏览器逐条截图核对：能力点击高亮/淡化、`#cap/*` 深链、每个作品抽屉正确渲染、`#work/*` 深链、10 个作品齐全、指标与 cc 一致、演示数据有标注、原型可交互、响应式 390/768/1440。

- [ ] **Step 3: 更新 README + 部署**

README 补作品集结构与本地预览说明。部署：`npm run build` 后 dist 推静态托管（GitHub Pages / Vercel），确认线上 iframe/图片相对路径正常。

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: README 补作品集说明"
```

---

## Self-Review

**Spec coverage:**
- §0 双轨数据 → Global Constraints + Task 1/7/8（标注）✓
- §1 叙事主线 → Task 7 ✓
- §2 能力矩阵 → Task 1(数据)+Task 3(渲染) ✓
- §3 作品呈现分档 → Task 1(数据)+Task 4(卡片)+Task 5(抽屉多形态) ✓
- §4 双向跳转 → Task 3/4(能力→作品) + Task 5/6(项目→作品 + 深链) ✓
- §5 技术方案 → Task 1-7 覆盖数据层/Skills/Works/Drawer/路由/资源/Hero ✓
- §6 验收 → Task 9 ✓
- §7 原型完善 → Task 8 ✓
- §8 非目标 → Global Constraints ✓

**Placeholder scan:** 无 TBD；每个 Task 有明确文件、命令、产出。可运行项目的 UI 截图依赖本地环境，已在 Task 8 显式说明获取方式，非占位。

**Type consistency:** CapId/Work/WorkMedia 在 Task 1 定义，Task 3/4/5 消费；usePortfolio 签名在 Task 3 定义，Task 4/5/6 一致消费；资源路径 `/prototypes/*`、`/portfolio/*` 全程一致。
