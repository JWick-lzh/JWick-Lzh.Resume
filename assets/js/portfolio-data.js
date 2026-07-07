/* 作品集数据 — window.PORTFOLIO
 * 纯 JS 对象字面量，<script src> 直接加载，file:// 可用，无 import/export/fetch。
 * 诚实铁律：成果指标（A类）只用 20260630-AI产品-林灶辉-cc.md 可核实数字；
 *          演示数据（B类，原型内报价/看板）可 mock 但自洽闭环，并标注「演示数据」。
 * 中文优先；英文文案后续补（en 字段缺省时回退中文）。
 */
window.PORTFOLIO = {
  // 能力矩阵：3 组 11 条
  groupNames: { 1: "AI / Agent 工程", 2: "产品 / 商业", 3: "差异化" },
  caps: [
    { id: "agent", cn: "Agent设计与拟人化交互", group: 1 },
    { id: "orch", cn: "流程 / 状态机编排", group: 1 },
    { id: "rag", cn: "RAG / 知识库", group: 1 },
    { id: "mm", cn: "多模态 / OCR", group: 1 },
    { id: "arch", cn: "系统架构与工程化", group: 1 },
    { id: "p01", cn: "产品 0→1 与商业化", group: 2 },
    { id: "scene", cn: "业务场景识别与产品化", group: 2 },
    { id: "viz", cn: "数据可视化与经营分析", group: 2 },
    { id: "industry", cn: "B端行业深度", group: 2 },
    { id: "fullstack", cn: "全栈落地（会写代码的PM）", group: 3 },
    { id: "delivery", cn: "团队与商业化交付", group: 3 }
  ],
  tiers: [
    { tier: "A", name: "① 线上 / 可运行的真产品", desc: "真截图 · 可跑 · 架构 / 方案 · 线上 & GitHub 链接" },
    { tier: "B", name: "② 高保真交互原型", desc: "内嵌真实原型，点开直接玩（演示数据）" },
    { tier: "C", name: "③ 往期 B 端代表作", desc: "关键成果 + 外链，体现十年 toB 与商业化厚度" }
  ],
  works: [
    /* ===== Tier A ===== */
    {
      id: "supermagic", tier: "A", statusLabel: "线上产品 · 开源",
      title: "超级麦吉 Super Magic",
      subtitle: "企业级开源 AI Agent 平台 · 产品负责人 · 2024.01–2026.03",
      tags: ["agent", "orch", "p01", "arch", "delivery"],
      desc: "2024 年初，AI Agent 产品两头分化，要么是给开发者的技术框架，要么是给普通人的聊天工具，中间缺一个能接住企业业务流程的。公司决定从「企业级 AI 自动化协同」切入，从 0 到 1 开始商业化。",
      metrics: [["注册用户", "2 万+"], ["年化收入", "近千万"], ["GitHub", "★4.9k"], ["商业化", "SaaS/社区/私有化"]],
      achievements: [
        "对标 Manus、Dify、Coze 等多个 AI 产品完成竞品分析，深入调研零售、电商、制造等多个行业企业，总结企业 AI 落地的共性需求：既希望 AI 提升生产效率，又希望数据自主可控、避免 SaaS 锁定，据此确立「开源全栈 + 企业办公整合」的产品方向",
        "定义四层产品架构（Agent + 流程编排 + IM + 协同 OS），带团队以两周一 Sprint 推进，做出任务理解、联网检索、文件操作、代码执行等 20 多个工具能力",
        "组织多轮种子用户测试与企业客户共创，累计收集数千条用户反馈，围绕产品易用性、长上下文、多轮协同及企业数据安全等核心问题持续迭代，完成产品首轮体验闭环",
        "推动 SaaS、社区版及私有化三条商业化路径同步落地，配合销售完成多轮客户方案演示及 PoC 验证，沉淀企业级 AI 产品标准化交付方案",
        "完成企业级 AI Agent 平台从 0 到 1 建设，实现产品商业化上线，快速积累数万注册用户，建立 C 端获客、B 端转化的商业模式，通过持续沉淀销售线索推动企业客户转化，支撑产品实现近千万级年化收入",
        "客户实测中，投资分析报告生成时间由 2 天缩短至数十分钟，会议纪要整理效率提升至原来的 5 倍，内部审批时长由 1 天缩短至 1 小时",
        "推动 Agentlang 框架开源，首月登上 GitHub Trending 全球趋势榜前四，全网获得数百万用户关注"
      ],
      media: { type: "shot", src: "./portfolio/supermagic-home.png", caption: "超级麦吉官网真实截图（letsmagic.cn）· 线上可访问" },
      links: [
        { label: "体验国内版 letsmagic.cn", href: "https://www.letsmagic.cn/", primary: true },
        { label: "国际版 magicrew.ai", href: "https://www.magicrew.ai/" }
      ]
    },
    {
      id: "guanmai-platform", tier: "A", statusLabel: "浏览器可跑 · 平台 Demo",
      title: "观麦 AI Agent 平台",
      subtitle: "企业级多租户 Agent 底座 · AI 产品负责人 · 2026.04–至今",
      tags: ["arch", "rag", "orch", "agent", "industry"],
      desc: "公司 AI 助手越做越多（经营、采购、录单…），每个都重复造轮子。做一个统一的多租户平台，把模型接入、知识库、记忆、对话通道这些公共能力沉下去，让上层助手专心做业务。",
      metrics: [["架构演进", "前后 15 版"], ["模型网关", "3 档路由"], ["通道", "Web + 微信"], ["隔离", "多租户"]],
      achievements: [
        "从 0 规划整个平台，架构方案前后改了 15 版，定下整体思路与工程骨架",
        "多模型网关：按「便宜快 / 均衡 / 高智能」分档路由，换底层模型只改配置",
        "知识库方案：系统知识库与租户知识库自动融合，配生鲜行业知识词表",
        "记忆系统：从对话记忆到长期画像分层管理，靠降频与缓存把 Token 成本控住",
        "多租户隔离 + Web/微信双通道，每个用户一个 1:1 私人助手；落地首个预设助手「经营顾问」"
      ],
      media: { type: "iframe", src: "./wenda/", url: "GM鲜达 · Agent 平台纯前端演示", caption: "平台租户侧演示（品牌 GM鲜达 · 演示数据）：知识卡建卡 → 审核 → 驳回批注 → 修改再提 → 上架 → 对话引用的全生命周期闭环。纯前端、零后端。" },
      links: [
        { label: "全屏打开平台 Demo →", href: "./wenda/", primary: true },
        { label: "在线独立版", href: "https://jwick-lzh.github.io/agent-platform-demo/" },
        { label: "GitHub 源码", href: "https://github.com/JWick-lzh/agent-platform-demo" },
        { label: "整体架构图", href: "./portfolio/guanmai-arch.png" }
      ],
      note: "生产版是多租户全栈平台（Next.js + tRPC + pgvector），规模大、依赖多；此处为专门制作的纯前端演示版，信息架构与生产版一致。"
    },
    {
      id: "ai-order", tier: "A", statusLabel: "浏览器可跑 · 全模块",
      title: "AI-Order 智能录单",
      subtitle: "LLM + OCR 多模态订单识别 · LangGraph · 2026",
      tags: ["mm", "orch", "scene", "fullstack", "arch"],
      desc: "生鲜录单常是微信里的文字、截图、Excel，格式乱、强度大。上传订单图片/PDF/Excel/文本 → 自动识别商品、数量、价格、备注，结构化输出。规则引擎处理方言别名（“番茄→西红柿”）。",
      metrics: [["编排", "LangGraph 5 节点"], ["OCR", "PaddleOCR"], ["LLM", "Qwen"], ["部署", "Docker Compose"]],
      achievements: [
        "LangGraph 5 节点工作流：路由 → 文本/图片/PDF/Excel → 规则检索 → LLM 识别 → 结构化输出",
        "PaddleOCR 中文识别 + 启动预热；规则引擎处理方言别名与历史修正",
        "FastAPI REST（图片/PDF/Excel/文本 四端点）+ Streamlit 交互界面 + 健康检查",
        "Docker 双容器（API + UI），开发 / 生产模式切换"
      ],
      media: { type: "iframe", src: "./ai-order-demo/", url: "鲜达 AI 智能录单 · 演示版", caption: "完整界面浏览器直跑（演示模式）：录单 / 审核 / 客户 / 报价单等全模块可点可看，数据自洽。识别需模型 Key，未配置时会提示失败；线上完整版见右侧链接。" },
      links: [
        { label: "全屏打开演示 →", href: "./ai-order-demo/", primary: true },
        { label: "在线版（GitHub Pages）", href: "https://jwick-lzh.github.io/xianda-ai-order-agent/" },
        { label: "GitHub 源码", href: "https://github.com/JWick-lzh/xianda-ai-order-agent" },
        { label: "产品方案图解", href: "./demos/ai-order.html" }
      ]
    },
    {
      id: "caigou-cloud", tier: "A", statusLabel: "浏览器可跑 · 全栈",
      title: "采宝 智能采购 Agent（Cloud）",
      subtitle: "对话式全链路智能采购 · React + FastAPI · 2026.05–至今",
      tags: ["agent", "orch", "mm", "scene", "fullstack", "industry"],
      desc: "为什么做采购：它是供应链上成本的总闸门，省下的钱、避开的损耗都是隐形的——价值最难被直接看见，恰恰最该优先 AI 化；也是最容易滋生腐败的环节。采宝让一个采购员并行盘住 N 个供应商，同时把谈价黑箱打开：全程留痕、分单防串通、人工确认发单，过程可控合规，老板更有安全感。链路：一句话/文件 → 询价单 → 发供应商 → 识别报价（文字/截图/Excel）→ 多轮议价 → 定价 → 采购单 → 回写 ERP。",
      metrics: [["前端", "React 18 + Vite"], ["后端", "FastAPI"], ["识别", "GLM-4v 多模态"], ["质量", "90+ 提交 · TDD"]],
      achievements: [
        "产品价值三层：战略（最核心又最难显性化的环节优先 AI 化）· 效率（1 个采购员扛 N 个供应商）· 合规（目标价不外泄 / 全程留痕 / 分单防串通 / 人工拍板）",
        "对话式全链路：一句话/文件触发，跑通询价 → 报价识别 → 议价 → 定价 → 采购单闭环",
        "划清边界：流程流转 / 计时催办 / 议价达标交给状态机，模型只做理解与话术，保证可控可复现",
        "多模态报价识别：文字 + 截图 + Excel（GLM-4v）；供应商六维评分、损耗补采等业务规则",
        "抽象 IM 通道与 ERP 网关，先用供应商模拟器跑通可演示闭环，真实微信集成留好替换点",
        "端到端可现场重演；后端主链路测试通过（24 测试文件 · TDD · code-review）"
      ],
      media: {
        type: "iframe",
        src: "./caigou/",
        url: "采宝 采购 Agent · 浏览器可跑 Demo",
        caption: "真实全栈应用的浏览器可跑版：登录后一句话→询价→报价→议价→定价→采购单全链路闭环，另含供应商画像/议价中心/工作台/配置中心。数据全 mock、自洽可复现（无需后端）。"
      },
      links: [
        { label: "全屏打开可跑 Demo →", href: "./caigou/", primary: true },
        { label: "源码仓库 GitHub", href: "https://github.com/JWick-lzh/caigou-agent" },
        { label: "工作台", href: "./caigou/#/workbench" },
        { label: "供应商画像", href: "./caigou/#/suppliers" },
        { label: "议价中心", href: "./caigou/#/negotiation" }
      ],
      note: "真实 React + FastAPI 全栈应用；此处为浏览器直跑的静态 Demo（后端逻辑用确定性 mock 复刻，界面与交互与全栈版一致）。下方早期 HTML 原型可作为「从原型到产品」的演进佐证。项目持续迭代中，Demo 会随源项目更新在本地址原地升级。",
      protoLinks: [
        { label: "工作台原型", href: "./prototypes/caibao-workbench.html" },
        { label: "议价中心原型", href: "./prototypes/caibao-negotiation.html" },
        { label: "供应商画像原型", href: "./prototypes/caibao-supplier.html" },
        { label: "配置中心原型", href: "./prototypes/caibao-config.html" }
      ]
    },
    {
      id: "boss", tier: "A", statusLabel: "浏览器可跑 · 语音版 · 可嵌入",
      title: "老板助手 · 语音版经营助手",
      subtitle: "双模式驾驶舱 · 小达主动汇报 + 可嵌入挂件 · 2026",
      tags: ["viz", "scene", "industry", "agent", "fullstack"],
      desc: "给生鲜老板的经营助手：数据呈现 → 异常预警 → 语音问答三层闭环。助手「小达」会主动汇报——一键播报今日晨会、进入后主动提醒异常、预警一键解读；还能以一行代码嵌入任何现有系统（ERP/商城/后台）。首次打开自带 30 秒导览，每个指标的含义/公式/意图都可点查。",
      metrics: [["形态", "手机/桌面双模式"], ["助手", "晨会播报/解读/问答"], ["嵌入", "一行代码 iframe 挂件"], ["测试", "29 单测 + 66 E2E"]],
      achievements: [
        "小达主动汇报闭环：一键播报今日晨会（数据+预警+建议）、进入几秒后主动冒泡提醒、预警卡「让小达解读」；无 Key 全部本地闭环",
        "可嵌入挂件：embed.js 一行接入任何网页系统，iframe 隔离零样式污染，面板开合自动调整大小（附仿真 ERP 演示页）",
        "活的驾驶舱：金额滚动入场、今日订单回放 toast（种子派生不改口径）、平滑曲线 + hover 十字线明细",
        "指标全可追溯：每页右下角「指标说明」，含义/计算公式/设计意图与数据层口径一致；首访 30 秒聚光灯导览",
        "异常预警四类（未下单/滞销/成本波动/利润波动）+ 企业周报 + 参数化阈值；演示数据种子生成，2 年半日粒度，刷新不变可复现"
      ],
      media: { type: "iframe", mobile: true, src: "./boss/", url: "老板助手 · 浏览器可跑 Demo", caption: "完整应用浏览器直跑（演示数据 · 无 Key 走演示兜底模式，晨会播报/预警解读/问答全可用）。" },
      links: [
        { label: "全屏打开可跑 Demo →", href: "./boss/", primary: true },
        { label: "嵌入演示（仿真 ERP）", href: "./boss/demo-embed.html" },
        { label: "GitHub 源码", href: "https://github.com/JWick-lzh/boss-agent" },
        { label: "早期静态原型", href: "./prototypes/boss-assistant.html" }
      ]
    },
    {
      id: "ai-rd-platform", tier: "A", statusLabel: "在线可跑 · 纯静态",
      title: "AI 研发能力平台（产品化）",
      subtitle: "把 AI 辅助研发框架开放给产品 / 运营 / 销售 · 纯前端 · 2026",
      tags: ["rag", "scene", "fullstack", "arch", "p01"],
      desc: "研发侧沉淀了一套 AI 辅助开发框架（角色、命令、规范、技能），但只有工程能用。把它产品化成一个纯静态网页平台：非技术同学打开网页就能看懂系统能力、用 AI 问答了解业务细节、看懂 AI 开发工作流、提交需求（AI 自动做合规检查 + 生成 PRD 草稿）、写文档并导出。",
      metrics: [["形态", "纯静态零后端"], ["知识库", "51 篇 · 检索溯源"], ["模型", "GLM 浏览器直连"], ["能力", "问答/工作流/提需求"]],
      achievements: [
        "六大模块：能力全景 · AI 问答（GLM 直连 + 知识库检索溯源）· 工作流步进演示 · 提需求（AI 合规检查 + PRD 草稿）· 需求池写文档 · 设置",
        "知识库从研发框架文档自动构建（51 篇），一条命令重建；全部脱敏为「演示公司」口径可对外",
        "AI 问答支持多会话（新建 / 历史 / 切换 / 删除，本地持久化），回答带依据文档溯源",
        "零后端：GLM 浏览器直连（支持 file:// 与 Pages），Key 只存访客本地浏览器、不上传、不预置",
        "一键发布流程：从主工程抽出静态目录 → 自动脱敏 → 自检 → 推 GitHub Pages，发布副本永不含密钥"
      ],
      media: { type: "iframe", src: "./ai-rd-platform/", url: "AI 研发能力平台 · 在线可跑", caption: "纯静态平台浏览器直跑：能力全景 / 工作流演示开箱即看；AI 问答 / 提需求 / 写文档需在「设置」填入自己的智谱 Key（仅存本地）。" },
      links: [
        { label: "全屏打开 →", href: "./ai-rd-platform/", primary: true },
        { label: "在线独立版", href: "https://jwick-lzh.github.io/ai-rd-platform/" },
        { label: "GitHub 源码", href: "https://github.com/JWick-lzh/ai-rd-platform" }
      ]
    },
    /* ===== Tier B ===== */
    {
      id: "lobster", tier: "B", statusLabel: "可点开原型",
      title: "龙虾 经营 Agent",
      subtitle: "面向老板的生鲜经营助手 · Linear 暗色设计系统 · 2026.04–至今",
      tags: ["agent", "rag", "viz", "scene", "industry", "arch"],
      desc: "老板想看经营情况往往得让人导数据做表，又慢又滞后。做一个「会看数、会分析、会提建议」的助手，用大白话就能问出经营洞察：单轮问答 → 多步诊断 → 自动经营日报三层分析。",
      metrics: [["原型页", "5 页"], ["设计系统", "Linear 暗色"], ["后端", "FastAPI"], ["前端", "React 18"]],
      achievements: [
        "从 0 设计，输出 PRD 与交互规范，定清产品定位、用户角色、助手认领与配置形态",
        "三层分析：单轮问答、多步诊断（拉数据、找异动、给建议）、自动生成经营日报",
        "知识库全生命周期闭环：切片 → 向量化 → 提炼结构化知识 → 人工审核上线，冲突自动拦下",
        "引导式记忆：对话间隙按缺什么问什么（门店数、主营品类），回答越来越个性化",
        "统一 Linear 暗色设计系统；多租户 RBAC、按钮级权限；对比度达标、无障碍考虑"
      ],
      media: { type: "iframe", src: "./prototypes/lobster-task-center.html", url: "lobster-agent · 任务中心原型", caption: "真实原型文件，内嵌可交互（演示数据）。" },
      links: [
        { label: "全屏：任务中心", href: "./prototypes/lobster-task-center.html", primary: true },
        { label: "资料上传", href: "./prototypes/lobster-data-upload.html" },
        { label: "用户与角色", href: "./prototypes/lobster-users-roles.html" },
        { label: "RBAC 权限", href: "./prototypes/lobster-rbac.html" },
        { label: "渠道设置", href: "./prototypes/lobster-channels.html" },
        { label: "完整版 Demo（打磨中）", href: "./lobster/" }
      ]
    },
    /* ===== Tier C ===== */
    {
      id: "chain-saas", tier: "C", statusLabel: "往期代表作 · 线上",
      title: "连锁经营 SaaS 数字化解决方案",
      subtitle: "连锁零售数字化转型平台 · 商业化一号位 · 2022.11–2024.06",
      tags: ["scene", "industry", "p01", "delivery", "viz"],
      desc: "集团旗下多个潮流零售品牌门店遍布全国 300+ 城市。自建灯塔引擎连锁经营 SaaS 平台，从信息化到标准化再到智能化三代升级。",
      metrics: [["覆盖", "300+ 城市"], ["品牌", "10+"], ["单店效率", "+40%"], ["补货准确率", "85%+"]],
      achievements: [
        "以一体化办公为入口，整合 BI、低代码、可视化陈列、智慧零售大脑、供应链协同、POS、WMS 等 10+ 产品",
        "定「总部标准化、区域灵活配、门店轻量化」思路；上线智能补货，50+ 门店试点跑通闭环",
        "打造「1+4」标准方案（1 数据底座 + 4 业务套件），新品牌 2 周内接入，向 10+ 连锁客户输出",
        "服务 300+ 城市门店、支撑百亿零售业务数字化；缺货损失降低约 30%"
      ],
      media: { type: "shot", src: "./portfolio/dtyq-home.png", caption: "灯塔引擎官网真实截图（dtyq.com）" },
      links: [{ label: "了解详情 dtyq.com", href: "https://www.dtyq.com/", primary: true }]
    },
    {
      id: "property-crm", tier: "C", statusLabel: "往期代表作",
      title: "智慧物业客服 6.0",
      subtitle: "地产物业 SaaS · 事业部产品负责人 · 2020.08–2022.06",
      tags: ["scene", "industry", "delivery", "p01"],
      desc: "地产物业普遍有业主不满意、客服响应慢、私域难运营的问题。通过服务自动化、客户信息数据化与私域连接器，把物业客服从被动接单转成主动经营。",
      metrics: [["首年业绩", "4000 万+"], ["工单响应", "-60%"], ["团队", "产品15 + 交付8"], ["标杆", "越秀 / 龙光"]],
      achievements: [
        "统筹客服 CRM、满意度管理、服务自动化、企微客服通、客户数据中台、营销自动化六条产品线",
        "智能工单 + 自动派单：报修→派单→处理→回访全流程自动化，工单平均响应缩短 60%",
        "基于企业微信搭私域连接器，打通业主沟通、满意度调研、活动推送",
        "首年 4000 万+ 业绩，做出越秀地产、龙光集团标杆；输出《智慧客服新规划 6.0》白皮书"
      ],
      media: { type: "plan", caption: "往期 B 端代表作 · 关键成果" },
      links: []
    },
    {
      id: "supply-midend", tier: "C", statusLabel: "往期代表作",
      title: "供应链中台",
      subtitle: "地产行业首个供应链中台 · 2019.11–2020.08",
      tags: ["scene", "arch", "industry", "delivery"],
      desc: "地产供应链长期靠线下纸质流程，供应商准入、招投标、合同、商品管理分散。做行业首个供应链中台，把采购与供应商管理搬到线上。",
      metrics: [["业绩", "5000 万"], ["签约", "4 家头部地产"], ["四大中心", "供应商/招采/商品/合同"], ["复用", "集团级底座"]],
      achievements: [
        "从零规划中台架构，设计供应商、招采、商品、合同四大中心，整合电子签章、舆情监控、企业风控",
        "抽象招投标、供应商评级等通用能力，孵化「星图」「数见」「数芯」「流程中心」等集团级底座",
        "做出地产行业首个供应链中台，落地越秀地产成标杆；推动越秀、华远等 4 家头部签约、5000 万业绩",
        "孵化的产品底座被集团多条业务线复用，成集团级基础设施"
      ],
      media: { type: "plan", caption: "往期 B 端代表作 · 关键成果（附公开报道）" },
      links: [
        { label: "媒体报道：房产业首个供应链中台（搜狐）", href: "https://www.sohu.com/a/352269688_115035", primary: true },
        { label: "越秀地产数字招采平台发布（官网新闻）", href: "https://www.yuexiuproperty.com/xwzx/gsyw/1ervqervf6hrc.shtml" }
      ],
      note: "公开报道佐证：弘阳集团与明源云链共建房产业首个供应链中台，供应商由 1.3 万家规整至约 3500 家，预计上线后节约成本 2%–3%（搜狐，2019.11）；越秀地产数字招采平台被称为「房地产行业首个国企供应链中台」，与 17 套业务系统集成联动（越秀地产官网，2020.11）。"
    },
    {
      id: "chuanyun", tier: "C", statusLabel: "往期代表作 · 低代码",
      title: "氚云 低代码平台",
      subtitle: "奥哲网络 · 低代码产品经理 · 2018.05–2019.11",
      tags: ["scene", "p01", "industry", "delivery"],
      desc: "负责低代码产品「氚云」的规划：做市场分析、MVP 定义与需求落地，把行业场景抽象成产品方案，推动落地并提升市场占有率。",
      metrics: [["产品", "氚云低代码"], ["方向", "市场分析→MVP"], ["抽象", "模板中心"], ["结果", "市占率提升"]],
      achievements: [
        "负责低代码产品「氚云」规划：市场分析、MVP 定义、需求落地，带团队持续迭代",
        "把行业场景抽象成产品方案（如模板中心），推动落地并提升市场占有率",
        "体现「业务场景识别 → 产品化 → 商业化」的完整能力"
      ],
      media: { type: "plan", caption: "往期 B 端代表作 · 低代码商业化" },
      links: [{ label: "氚云官网 h3yun.com →", href: "https://www.h3yun.com/site/home", primary: true }]
    }
  ]
};
