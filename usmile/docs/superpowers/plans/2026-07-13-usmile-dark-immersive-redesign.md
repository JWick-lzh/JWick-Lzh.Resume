# usmile 暗色沉浸式改版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 usmile 产品页从暖白版块吸附式重造为暗色沉浸式连续镜头旅程（Active Theory 风格），文案全部沿用。

**Architecture:** 零构建三层结构：固定 WebGL 舞台（Three.js 重建写实牙刷）+ 巨型描边字底层 + DOM 信息层；GSAP ScrollTrigger 一条全局 scrub 时间轴驱动相机/模型/文字，snap 保证静止时永远停在章节驻留点。

**Tech Stack:** Three.js（已有 three.min.js）、GSAP 3 + ScrollTrigger（本地引入）、原生 HTML/CSS/JS，无构建。

**Spec:** `../specs/2026-07-13-usmile-dark-immersive-redesign.md`（触发表、屏内红线、章节脚本以 spec 为准）

## Global Constraints

- 零构建：只有 `index.html` / `app.js` / `three.min.js` / `gsap.min.js` / `ScrollTrigger.min.js` 五个文件，GitHub Pages 直接部署
- 文案一字不改：7 章内容全部取自旧 `index.html`（git HEAD 版本）对应版块
- 巨字字号公式：`min(20vw, 88vw / 字数)`；任何元素不得引发横向滚动
- 视口单位用 `dvh`；内容框 `max-width 88vw / max-height 84dvh`；视差振幅 ≤ ±4vw/±3vh
- 滚动总长 7 章 × 200vh；每章 进场 0–25% / 驻留 25–75% / 退场 75–100%；snap 到驻留段中心
- 交互触发表、兜底策略（reduced-motion / no-WebGL / <760px / vh<600）严格按 spec
- 京东链接沿用 `https://mall.jd.com/index-1000104683.html?from=pc`
- 每个任务结束 `node --check app.js`（若改了 app.js）并 git commit

---

### Task 1: 本地化 GSAP 依赖

**Files:**
- Create: `usmile/gsap.min.js`
- Create: `usmile/ScrollTrigger.min.js`

**Interfaces:**
- Produces: 全局 `gsap`、`ScrollTrigger`（UMD，`<script>` 直接引入）

- [ ] **Step 1: 下载两个文件**

```bash
cd "/Users/uicron/Desktop/AI-person/Code/林灶辉-简历网站/usmile"
curl -sL -o gsap.min.js https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js
curl -sL -o ScrollTrigger.min.js https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js
```

- [ ] **Step 2: 验证文件有效（非 404 页、含版本号）**

```bash
node --check gsap.min.js && node --check ScrollTrigger.min.js
grep -o 'gsap' gsap.min.js | head -1 && wc -c gsap.min.js ScrollTrigger.min.js
```
Expected: 两个文件语法合法，gsap.min.js ≈ 70KB、ScrollTrigger.min.js ≈ 40KB。

- [ ] **Step 3: Commit**

```bash
git add gsap.min.js ScrollTrigger.min.js && git commit -m "chore: 本地引入 GSAP 3.12.5 + ScrollTrigger"
```

---

### Task 2: index.html 重写（暗色骨架 + 全部文案就位）

**Files:**
- Modify: `usmile/index.html`（整文件重写；旧文案先从 `git show HEAD:usmile/index.html` 取）

**Interfaces:**
- Produces（app.js 依赖的 DOM 契约）:
  - `#stage`（WebGL canvas，fixed 全屏）、`#dust`（粒子 canvas）
  - `.chapter[data-ch="0..6"]`：7 个 200vh 滚动占位节；每节内 `.pin-content` 装信息层
  - `.giant[data-fit]`：巨型描边字，JS 按 `min(20vw, 88vw/字数)` 定字号
  - `.line-mask > .line`：逐行入场遮罩结构（标题每行包一层）
  - `#rail`（章节轨，7 个 `.rail-item[data-ch]`）、`#progress`（右下百分比）
  - `#loader`（`.loader-num` 百分比 + `.loader-bar`）
  - `#cursor`（`.cur-dot` + `.cur-ring`）；可磁吸元素标 `[data-magnet]`
  - 03 章 `.swatch[data-c="gray|pink"]`；05 章 `.mode[data-mode="ortho|perio|implant|caries"]`
  - 06 章 `[data-count][data-suffix]` 数字；04 章 `#callouts` 标注容器（4 个 `.callout`）
  - `body.no-webgl` 降级、`.fallback` 暗色降级页

**要点（防溢出红线在这个任务落地）:**

```css
html,body{overflow-x:hidden}
.pin-content{position:fixed;inset:0;pointer-events:none} /* 信息层随章节由 GSAP 控制显隐 */
.panel{max-width:88vw;max-height:84dvh}
.line-mask{overflow:hidden} .line-mask .line{transform:translateY(110%)}
@media (max-width:760px){ #rail{display:none} .progress-slim{display:block} .modes{grid-template-columns:1fr 1fr} }
@media (max-height:600px){ .pin-content{transform:scale(.85);transform-origin:center} }
```

- [ ] **Step 1: 取回旧文案**

```bash
cd "/Users/uicron/Desktop/AI-person/Code/林灶辉-简历网站/usmile"
git show HEAD:index.html > /tmp/old-usmile.html  # 仅作文案比对参考
```

- [ ] **Step 2: 重写 index.html**：暗色规范（`#06070a→#0c0e14`、`#f2f3f5`、冰蓝 `#6ee7ff`、香槟金辅助）、上述 DOM 契约、7 章文案逐字搬运（首屏卖点三行/工艺 lede+IPX8+智能屏/双色/拆解 4 优点/四模式卡/6 组数据+3 徽章/收尾+配置清单）、grain 反色、loader、光标、fallback。`<script>` 顺序：three → gsap → ScrollTrigger → app.js。

- [ ] **Step 3: 文案一致性验证**

```bash
for t in "四大护理方案，7 天 1 改善" "30+ 道精工" "太空灰" "冰莓粉" "小雷达刷头" "正畸护理" "99.1" "认真刷牙这件事" "110 天超长续航"; do grep -q "$t" index.html && echo "OK $t" || echo "MISS $t"; done
```
Expected: 全部 OK。

- [ ] **Step 4: Commit**

```bash
git add index.html && git commit -m "feat: 暗色沉浸式骨架 + 7 章文案迁移"
```

---

### Task 3: app.js — 写实牙刷重建（模型/材质/布光）

**Files:**
- Create: `usmile/app.js`（整文件重写，本任务完成 3D 部分）

**Interfaces:**
- Produces（后续任务调用）:
  - `App.brush`（THREE.Group）、`App.parts`（`{head,neck,body,motor,battery,board}` 各含 `home` 与 `exploded` 位姿）
  - `App.setColor('gray'|'pink')`：材质过渡换色 + 返回 Promise
  - `App.setScreenMode('ortho'|'perio'|'implant'|'caries'|'clock')`：重绘屏幕纹理
  - `App.setExplode(t)`：0–1 爆炸插值；`App.partScreenPos(key)`：零件的屏幕坐标（供标注线）
  - `App.camera` / `App.scene` / `App.renderTick(dt)`；`App.pointerParallax(x,y)`（±6°）
  - `App.ready`：Promise（环境贴图/植毛完成后 resolve，loader 用）

**建模要点:**
- 手柄：LatheGeometry 生成后对 X 轴 `scale(1, 1, 0.82)` 得椭圆截面；正面凹槽内嵌屏幕平面 + 电源键（圆柱微凸 + 环形高光圈）
- 植毛：`InstancedMesh`（~360 簇细圆柱），毛尖高度 ±12% 随机，外圈 8 簇冰蓝色指示毛；刷头颈部 12° 前倾
- 材质：机身 MeshPhysicalMaterial（metalness .85 / roughness .34 / clearcoat .55），暗场程序环境贴图（深灰底 + 两条竖向柔光条 + 顶部冷光）
- 布光：key 冷白 / rim 冰蓝 / fill 暖弱；底部接触阴影（径向渐变纹理平面）
- 细节：镀铬驱动轴、Type-C 口（底部椭圆凹槽）、底部防滑圈（哑光深灰环）

- [ ] **Step 1: 写 3D 部分**（临时 render 循环直接跑，先不接滚动；`window.App` 挂全局）
- [ ] **Step 2: 语法验证** `node --check app.js` → Expected: 无输出
- [ ] **Step 3: 浏览器烟测**：`python3 -m http.server 8787` 后开 `http://localhost:8787`，牙刷可见、屏幕亮、无控制台报错
- [ ] **Step 4: Commit** `git add app.js && git commit -m "feat: 写实牙刷 3D 重建（椭圆机身/植毛/暗场布光）"`

---

### Task 4: app.js — ScrollTrigger 连续运镜 + snap + 章节轨

**Files:**
- Modify: `usmile/app.js`（追加滚动系统）

**Interfaces:**
- Consumes: Task 3 的 `App.*`；Task 2 的 `.chapter/#rail/#progress/.giant/.line-mask`
- Produces: `Journey.goto(ch)`（章节轨点击用）；`Journey.progress`（0–1）

**关键结构（相机关键帧数据驱动，驻留段为平台期）:**

```js
// 每章两个关键帧：enter(0%) 与 dwell(25%)，dwell 持续到 75%，退场即下一章 enter 的插值起点
var KEY = [ // [camX,camY,camZ, lookY, brushRotY, explode, giantParallax]
  {cam:[0,0.2,9.4],  rot:[0, 0.0],   ex:0},   // 01 英雄
  {cam:[0.9,0.6,4.6],rot:[0, 1.2],   ex:0},   // 02 工艺微距
  {cam:[0,0,7.8],    rot:[0, 0],     ex:0},   // 03 双色正面
  {cam:[1.4,0,8.8],  rot:[-0.35,0.8],ex:1},   // 04 拆解（ex 由本章前 60% scrub）
  {cam:[0,0.9,3.8],  rot:[0.25,0.15],ex:0},   // 05 屏幕特写
  {cam:[3.2,0,11.5], rot:[0,2.4],    ex:0},   // 06 拉远剪影
  {cam:[0,0.2,9.0],  rot:[0,0],      ex:0}    // 07 收尾
];
ScrollTrigger.create({
  trigger:'main', start:'top top', end:'bottom bottom', scrub:0.8,
  snap:{ snapTo:(v)=>{ var n=7, seg=1/n; var ch=Math.round((v-seg*0.5)/seg); return seg*ch+seg*0.5; }, duration:0.6, ease:'power2.inOut' },
  onUpdate:(st)=>Journey.apply(st.progress)
});
```

- 章内三段（进场/驻留/退场）在 `Journey.apply` 里按局部进度插值：文字层 opacity/translateY、巨字视差（≤±4vw）、相机 lerp、灯光强度
- 每章 `.pin-content` 只在本章进度 >0 且 <1 时 `visibility:visible`（其余隐藏且 `pointer-events:none`，保证"其他章不可触发"）
- 巨字 fit：`fitGiant()` 遍历 `.giant`，`fontSize = Math.min(vw*0.20, vw*0.88/字数)`，resize 时重算
- 章节轨：`Journey.apply` 高亮当前 `.rail-item`；点击 `gsap.to(window,{scrollTo:…})`——不引 ScrollTo 插件，用原生 `window.scrollTo({behavior:'smooth'})` 到 `(ch+0.5)/7 * (docHeight-innerHeight)`
- `#progress` 显示 `Math.round(progress*100)+'%'`

- [ ] **Step 1: 实现 Journey + snap + 轨/进度/巨字 fit**
- [ ] **Step 2:** `node --check app.js`
- [ ] **Step 3: 浏览器验证**：滚动全程无跳变；停手 0.6s 内吸附；轨点击可达任意章；`document.documentElement.scrollWidth === innerWidth`（控制台执行，无横向溢出）
- [ ] **Step 4: Commit** `git commit -am "feat: ScrollTrigger 连续运镜 + snap + 章节轨"`

---

### Task 5: 交互层全集（触发表逐项落地）

**Files:**
- Modify: `usmile/app.js`

**Interfaces:**
- Consumes: `App.setColor/setScreenMode/setExplode/partScreenPos`、`Journey`

按 spec 触发表实现，全部要点：

1. **03 换色**：`.swatch` 点击 → `App.setColor` + 一道光泽扫描（临时加强 rim 光从上到下扫 0.8s）；仅 03 章 `.pin-content` 可见时可点
2. **05 模式卡**：hover（`pointerenter`）与 click 双通道 → `App.setScreenMode(mode)`；进入 05 章默认激活第一张
3. **06 数字滚动**：进入 06 章触发一次（flag 防重复），rAF 缓动 1.3s，「99.1%」主数字容器宽 ≤80vw
4. **04 标注线**：4 个 `.callout` 按爆炸进度阈值 `0.25/0.45/0.65/0.85` 依次 `class="lit"`；每帧 `partScreenPos` 更新线起点，文字端 clamp 进 6vw 安全区
5. **鼠标视差**：`pointermove` → `App.pointerParallax`，触屏（`matchMedia('(hover:none)')`）关闭
6. **自定义光标**：dot 即时、ring lerp 0.15 跟随；`[data-magnet]` hover 时 ring 放大 2.2x 并磁吸（元素中心 ±14px）；触屏隐藏
7. **粒子**：`#dust` 2D canvas ~60 粒，垂直漂浮 + 滚动速度加成拖尾 + 鼠标 80px 斥力；reduced-motion 关闭
8. **Loader**：`App.ready` + window load 双信号驱动进度（模拟 0→90 真实 →100），4s `setTimeout` 强制放行；完成后 `body.scene-ready` 揭幕

- [ ] **Step 1: 实现以上 8 项**
- [ ] **Step 2:** `node --check app.js`
- [ ] **Step 3: 浏览器逐项验证**（对照 spec 触发表打勾）
- [ ] **Step 4: Commit** `git commit -am "feat: 交互层——换色/模式卡/数字/标注线/光标/粒子/loader"`

---

### Task 6: 降级与响应式

**Files:**
- Modify: `usmile/app.js`、`usmile/index.html`（补媒体查询）

要点：
- `prefers-reduced-motion`：`gsap.globalTimeline` 不动运镜（scrub trigger 不创建），改每章 IntersectionObserver 淡入；snap 由原生 `scroll-snap` 兜底；粒子不启动
- no-WebGL：`body.no-webgl` + 暗色 fallback（Task 2 已有样式，这里确保 JS 早退不报错）
- 移动端：DPR ≤2、光标/磁吸/视差关闭、`#rail` 隐藏换右侧细进度条
- resize/转屏：`ScrollTrigger.refresh()` + `fitGiant()` + 相机 aspect 更新（debounce 200ms）

- [ ] **Step 1: 实现**
- [ ] **Step 2:** `node --check app.js`
- [ ] **Step 3: 验证**：DevTools 模拟 375×667（无横向溢出、四卡 2×2）、系统开启减弱动态（章节淡入可读）、禁用 WebGL（fallback 显示）
- [ ] **Step 4: Commit** `git commit -am "feat: reduced-motion/no-WebGL/移动端降级"`

---

### Task 7: 端到端验收 + 收尾

- [ ] **Step 1: 对照 spec 验收标准 5 条逐项过**（横向溢出/snap 驻留/交互触发/loader 超时/reduced-motion）
- [ ] **Step 2: 性能抽查**：DevTools Performance 滚动录制，主线程无长任务红块，桌面 ≈60fps
- [ ] **Step 3: 清理**：删除调试代码与 console.log
- [ ] **Step 4: Commit** `git commit -am "polish: 验收修整"`

## Self-Review 记录

- Spec 覆盖：视觉规范/巨字公式→T2+T4；3D 重建→T3；滚动+snap+轨→T4；触发表 6 项+粒子+loader→T5；兜底 4 项→T6；验收→T7 ✓
- 类型一致：`App.setColor/setScreenMode/setExplode/partScreenPos/pointerParallax/ready`、`Journey.goto/apply/progress` 前后引用一致 ✓
- 无占位符 ✓
