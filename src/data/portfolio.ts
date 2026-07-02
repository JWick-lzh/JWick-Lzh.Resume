// 作品集统一数据层
// 权威内容源：GuanMai/code/20260630-AI产品-林灶辉-cc.md（成果指标以此为准，只用真实可核实数字）
// 演示数据（原型内的报价/看板等）可 mock，但保证自洽闭环，并在作品内标注「演示数据」。

export type CapId =
  | 'agent' | 'orch' | 'rag' | 'mm' | 'arch'
  | 'p01' | 'scene' | 'viz' | 'industry'
  | 'fullstack' | 'delivery';

export interface Cap {
  id: CapId;
  cn: string;
  group: 1 | 2 | 3; // 1=AI/Agent工程 2=产品/商业 3=差异化
}

export type Tier = 'A' | 'B' | 'C';
export type MediaType = 'iframe' | 'shot' | 'arch' | 'plan' | 'run';

export interface WorkMedia {
  type: MediaType;
  src?: string;    // iframe/shot/arch 的资源路径（站内相对路径）
  url?: string;    // iframe chrome 条显示的地址标签
  mobile?: boolean;// iframe 是否用手机框
  cmd?: string;    // run 的启动命令
  arch?: string;   // run/plan 的 ASCII 架构（可选）
  caption?: string;// 媒体下方说明
}

export interface WorkLink {
  label: string;
  href: string;
  primary?: boolean;
}

export interface Work {
  id: string;
  tier: Tier;
  statusLabel: string;
  title: string;
  subtitle: string;
  tags: CapId[];
  desc: string;
  metrics: [string, string][];
  achievements: string[];
  media: WorkMedia;
  links: WorkLink[];
  note?: string;
}

export const GROUP_NAMES: Record<1 | 2 | 3, string> = {
  1: 'AI / Agent 工程',
  2: '产品 / 商业',
  3: '差异化',
};

export const CAPS: Cap[] = [
  { id: 'agent', cn: 'Agent设计与拟人化交互', group: 1 },
  { id: 'orch', cn: '流程 / 状态机编排', group: 1 },
  { id: 'rag', cn: 'RAG / 知识库', group: 1 },
  { id: 'mm', cn: '多模态 / OCR', group: 1 },
  { id: 'arch', cn: '系统架构与工程化', group: 1 },
  { id: 'p01', cn: '产品 0→1 与商业化', group: 2 },
  { id: 'scene', cn: '业务场景识别与产品化', group: 2 },
  { id: 'viz', cn: '数据可视化与经营分析', group: 2 },
  { id: 'industry', cn: 'B端行业深度', group: 2 },
  { id: 'fullstack', cn: '全栈落地（会写代码的PM）', group: 3 },
  { id: 'delivery', cn: '团队与商业化交付', group: 3 },
];

export const CAP_CN = Object.fromEntries(CAPS.map((c) => [c.id, c.cn])) as Record<CapId, string>;

// TIER 元信息（分档标题与说明）
export const TIERS: { tier: Tier; name: string; desc: string }[] = [
  { tier: 'A', name: '① 线上 / 可运行的真产品', desc: '真截图 · 可跑 · 架构 / 方案 · 线上 & GitHub 链接' },
  { tier: 'B', name: '② 高保真交互原型', desc: '内嵌真实原型，点开直接玩（演示数据）' },
  { tier: 'C', name: '③ 往期 B 端代表作', desc: '关键成果 + 外链，体现十年 toB 与商业化厚度' },
];

export const WORKS: Work[] = [
  /* ============ Tier A · 线上 / 可运行真产品 ============ */
  {
    id: 'supermagic',
    tier: 'A',
    statusLabel: '线上产品 · 开源',
    title: '超级麦吉 Super Magic',
    subtitle: '企业级开源 AI Agent 平台 · 产品负责人 · 2024.01–2026.03',
    tags: ['agent', 'orch', 'p01', 'arch', 'delivery'],
    desc: '“让每个人都拥有属于自己的 AI 军团。” 从「企业级 AI 自动化协同」切入，带团队以两周一 Sprint 从 0 到 1 完成商业化，打造 Agent + 流程编排 + IM + 协同 OS 四层生态。',
    metrics: [
      ['注册用户', '2 万+'],
      ['年化收入', '近千万'],
      ['GitHub', '★4.9k'],
      ['商业化', 'SaaS/社区/私有化'],
    ],
    achievements: [
      '从 0 到 1 完成企业级 AI Agent 平台建设并商业化上线，快速积累数万注册用户',
      '建立 C 端获客、B 端转化的商业模式，支撑近千万级年化收入',
      '客户实测：投资分析报告 2 天→数十分钟，会议纪要效率提升 5 倍，内部审批 1 天→1 小时',
      'Agentlang 框架开源，首月登上 GitHub Trending 全球趋势榜前四，全网数百万用户关注',
      '定义四层架构（Agent + 流程编排 + IM + 协同 OS），做出 20+ 工具能力',
    ],
    media: {
      type: 'shot',
      src: '/portfolio/supermagic-home.png',
      caption: '超级麦吉官网真实截图（letsmagic.cn）· 线上可访问',
    },
    links: [
      { label: '体验国内版 letsmagic.cn', href: 'https://www.letsmagic.cn/', primary: true },
      { label: '国际版 magicrew.ai', href: 'https://www.magicrew.ai/' },
    ],
  },
  {
    id: 'guanmai-platform',
    tier: 'A',
    statusLabel: '生产级 · 架构案例',
    title: '观麦 AI Agent 平台',
    subtitle: '企业级多租户 Agent 底座 · AI 产品负责人 · 2026.04–至今',
    tags: ['arch', 'rag', 'orch', 'agent', 'industry'],
    desc: '公司 AI 助手越做越多（经营、采购、录单…），每个都重复造轮子。做一个统一的多租户平台，把模型接入、知识库、记忆、对话通道这些公共能力沉下去，让上层助手专心做业务。',
    metrics: [
      ['架构演进', '前后 15 版'],
      ['模型网关', '3 档路由'],
      ['通道', 'Web + 微信'],
      ['隔离', '多租户'],
    ],
    achievements: [
      '从 0 规划整个平台，架构方案前后改了 15 版，定下整体思路与工程骨架',
      '多模型网关：按「便宜快 / 均衡 / 高智能」分档路由，换底层模型只改配置',
      '知识库方案：系统知识库与租户知识库自动融合，配生鲜行业知识词表',
      '记忆系统：从对话记忆到长期画像分层管理，靠降频与缓存把 Token 成本控住',
      '多租户隔离 + Web/微信双通道，每个用户一个 1:1 私人助手；落地首个预设助手「经营顾问」',
    ],
    media: {
      type: 'arch',
      src: '/portfolio/guanmai-arch.png',
      caption: '龙虾 Agent 产品整体架构图（MVP）· 分层架构 / Agent 运行流程 / 多 Agent 协同 / 用户旅程',
    },
    links: [],
    note: '规模大、依赖多，不适合在线点点看；以架构 + 工程规范 + 平台方法论呈现最能体现真实水平。',
  },
  {
    id: 'ai-order',
    tier: 'A',
    statusLabel: '可运行 · 全栈',
    title: 'AI-Order 智能录单',
    subtitle: 'LLM + OCR 多模态订单识别 · LangGraph · 2026',
    tags: ['mm', 'orch', 'scene', 'fullstack', 'arch'],
    desc: '生鲜录单常是微信里的文字、截图、Excel，格式乱、强度大。上传订单图片/PDF/Excel/文本 → 自动识别商品、数量、价格、备注，结构化输出。规则引擎处理方言别名（“番茄→西红柿”）。',
    metrics: [
      ['编排', 'LangGraph 5 节点'],
      ['OCR', 'PaddleOCR'],
      ['LLM', 'Qwen'],
      ['部署', 'Docker Compose'],
    ],
    achievements: [
      'LangGraph 5 节点工作流：路由 → 文本/图片/PDF/Excel → 规则检索 → LLM 识别 → 结构化输出',
      'PaddleOCR 中文识别 + 启动预热；规则引擎处理方言别名与历史修正',
      'FastAPI REST（图片/PDF/Excel/文本 四端点）+ Streamlit 交互界面 + 健康检查',
      'Docker 双容器（API + UI），开发 / 生产模式切换',
    ],
    media: {
      type: 'plan',
      arch:
        '输入（文本 / 图片 / PDF / Excel）\n' +
        '        │  路由节点\n' +
        '   ┌────┼──────┬────────┐\n' +
        ' 文本  图片OCR  PDF     Excel\n' +
        '   └────┴──────┴────────┘\n' +
        '        │ 规则检索（别名 / 历史修正）\n' +
        '        ▼\n' +
        '   LLM 识别（Qwen）→ 结构化 JSON 输出',
      caption: '产品方案 · 观麦「智能录单」产品线',
    },
    links: [
      { label: '启动：docker compose up → API:8000 / UI:8501', href: '#', primary: true },
    ],
    note: '演示输入示例：食堂肉菜配送采购清单（演示数据）。',
  },
  {
    id: 'caigou-cloud',
    tier: 'A',
    statusLabel: '可运行 · 全栈',
    title: '采宝 智能采购 Agent（Cloud）',
    subtitle: '对话式全链路智能采购 · React + FastAPI · 2026.05–至今',
    tags: ['agent', 'orch', 'mm', 'scene', 'fullstack', 'industry'],
    desc: '采购员一句话或一个文件触发 → 生成询价单 → 发供应商 → 识别报价（文字/截图/Excel）→ 多轮议价 → 定价 → 生成采购单 → 回写 ERP。重复操作交给机器。',
    metrics: [
      ['前端', 'React 18 + Vite'],
      ['后端', 'FastAPI'],
      ['识别', 'GLM-4v 多模态'],
      ['质量', '90+ 提交 · TDD'],
    ],
    achievements: [
      '对话式全链路：一句话/文件触发，跑通询价 → 报价识别 → 议价 → 定价 → 采购单闭环',
      '划清边界：流程流转 / 计时催办 / 议价达标交给状态机，模型只做理解与话术，保证可控可复现',
      '多模态报价识别：文字 + 截图 + Excel（GLM-4v）；供应商六维评分、损耗补采等业务规则',
      '抽象 IM 通道与 ERP 网关，先用供应商模拟器跑通可演示闭环，真实微信集成留好替换点',
      '端到端可现场重演；后端主链路测试通过（24 测试文件 · TDD · code-review）',
    ],
    media: {
      type: 'run',
      cmd: '后端: cd backend && python main.py\n前端: cd frontend && npm run dev  →  localhost',
      arch:
        '用户一句话 / 一个文件\n' +
        '   │\n' +
        '   ▼\n' +
        '[询价构建] → [发送网关(可插拔)] → [报价识别 GLM-4v]\n' +
        '   │                                    │\n' +
        '   ▼                                    ▼\n' +
        '[状态机议价引擎] ←──────────────── [定价] → [采购单] → 回写 ERP\n' +
        '   │  APScheduler 计时 · SSE/WS 实时推送',
      caption: '本地可运行，启动即演示（演示数据全 mock、自洽闭环）',
    },
    links: [
      { label: '本地可跑（启动即演示）', href: '#', primary: true },
    ],
    note: '早期采宝 HTML 原型（工作台/议价中心/供应商画像/配置中心）可作为「从原型到产品」的演进佐证。',
  },

  /* ============ Tier B · 高保真交互原型 ============ */
  {
    id: 'lobster',
    tier: 'B',
    statusLabel: '可点开原型',
    title: '龙虾 经营 Agent',
    subtitle: '面向老板的生鲜经营助手 · Linear 暗色设计系统 · 2026.04–至今',
    tags: ['agent', 'rag', 'viz', 'scene', 'industry', 'arch'],
    desc: '老板想看经营情况往往得让人导数据做表，又慢又滞后。做一个「会看数、会分析、会提建议」的助手，用大白话就能问出经营洞察：单轮问答 → 多步诊断 → 自动经营日报三层分析。',
    metrics: [
      ['原型页', '5 页'],
      ['设计系统', 'Linear 暗色'],
      ['后端', 'FastAPI'],
      ['前端', 'React 18'],
    ],
    achievements: [
      '从 0 设计，输出 PRD 与交互规范，定清产品定位、用户角色、助手认领与配置形态',
      '三层分析：单轮问答、多步诊断（拉数据、找异动、给建议）、自动生成经营日报',
      '知识库全生命周期闭环：切片 → 向量化 → 提炼结构化知识 → 人工审核上线，冲突自动拦下',
      '引导式记忆：对话间隙按缺什么问什么（门店数、主营品类），回答越来越个性化',
      '统一 Linear 暗色设计系统；多租户 RBAC、按钮级权限；对比度达标、无障碍考虑',
    ],
    media: {
      type: 'iframe',
      src: '/prototypes/lobster-task-center.html',
      url: 'lobster-agent · 任务中心原型',
      caption: '真实原型文件，内嵌可交互（演示数据）。落地后同样方式内嵌到简历站。',
    },
    links: [
      { label: '全屏：任务中心', href: '/prototypes/lobster-task-center.html', primary: true },
      { label: '资料上传', href: '/prototypes/lobster-data-upload.html' },
      { label: '用户与角色', href: '/prototypes/lobster-users-roles.html' },
      { label: 'RBAC 权限', href: '/prototypes/lobster-rbac.html' },
      { label: '渠道设置', href: '/prototypes/lobster-channels.html' },
    ],
  },
  {
    id: 'boss',
    tier: 'B',
    statusLabel: '可点开原型 · 移动端',
    title: '老板助手 经营驾驶舱',
    subtitle: '移动端数据驾驶舱 + 异常预警 · 2026',
    tags: ['viz', 'scene', 'industry'],
    desc: '给生鲜老板看的移动端应用：经营数据面板、趋势图、客户/商品排行、四类异常预警、周报、参数化阈值设置。让老板随手掌握经营全貌。',
    metrics: [
      ['形态', '移动端 H5'],
      ['完成度', '完整可交互'],
      ['图表', '趋势/排行/KPI'],
      ['预警', '4 类'],
    ],
    achievements: [
      '5 tab 一级导航 + 二级详情模态，移动端信息架构清晰',
      '多维趋势图、排行表、KPI 卡片可交互（tooltip / 段控切换）',
      '异常预警：未下单客户 / 滞销商品 / 采购成本波动 / 利润率波动，分类 + 优先级 + 可分享',
      '参数化运营配置：动态阈值、口径切换',
    ],
    media: {
      type: 'iframe',
      mobile: true,
      src: '/prototypes/boss-assistant.html',
      url: '老板助手原型 v1.0',
      caption: '真实移动端原型，内嵌可交互（演示数据）。',
    },
    links: [
      { label: '全屏打开原型', href: '/prototypes/boss-assistant.html', primary: true },
    ],
  },

  /* ============ Tier C · 往期 B 端代表作 ============ */
  {
    id: 'chain-saas',
    tier: 'C',
    statusLabel: '往期代表作 · 线上',
    title: '连锁经营 SaaS 数字化解决方案',
    subtitle: '连锁零售数字化转型平台 · 商业化一号位 · 2022.11–2024.06',
    tags: ['scene', 'industry', 'p01', 'delivery', 'viz'],
    desc: '集团旗下多个潮流零售品牌门店遍布全国 300+ 城市。自建灯塔引擎连锁经营 SaaS 平台，从信息化到标准化再到智能化三代升级。',
    metrics: [
      ['覆盖', '300+ 城市'],
      ['品牌', '10+'],
      ['单店效率', '+40%'],
      ['补货准确率', '85%+'],
    ],
    achievements: [
      '以一体化办公为入口，整合 BI、低代码、可视化陈列、智慧零售大脑、供应链协同、POS、WMS 等 10+ 产品',
      '定「总部标准化、区域灵活配、门店轻量化」思路；上线智能补货，50+ 门店试点跑通闭环',
      '打造「1+4」标准方案（1 数据底座 + 4 业务套件），新品牌 2 周内接入，向 10+ 连锁客户输出',
      '服务 300+ 城市门店、支撑百亿零售业务数字化；缺货损失降低约 30%',
    ],
    media: {
      type: 'shot',
      src: '/portfolio/dtyq-home.png',
      caption: '灯塔引擎官网真实截图（dtyq.com）',
    },
    links: [
      { label: '了解详情 dtyq.com', href: 'https://www.dtyq.com/', primary: true },
    ],
  },
  {
    id: 'property-crm',
    tier: 'C',
    statusLabel: '往期代表作',
    title: '智慧物业客服 6.0',
    subtitle: '地产物业 SaaS · 事业部产品负责人 · 2020.08–2022.06',
    tags: ['scene', 'industry', 'delivery', 'p01'],
    desc: '地产物业普遍有业主不满意、客服响应慢、私域难运营的问题。通过服务自动化、客户信息数据化与私域连接器，把物业客服从被动接单转成主动经营。',
    metrics: [
      ['首年业绩', '4000 万+'],
      ['工单响应', '-60%'],
      ['团队', '产品15 + 交付8'],
      ['标杆', '越秀 / 龙光'],
    ],
    achievements: [
      '统筹客服 CRM、满意度管理、服务自动化、企微客服通、客户数据中台、营销自动化六条产品线',
      '智能工单 + 自动派单：报修→派单→处理→回访全流程自动化，工单平均响应缩短 60%',
      '基于企业微信搭私域连接器，打通业主沟通、满意度调研、活动推送',
      '首年 4000 万+ 业绩，做出越秀地产、龙光集团标杆；输出《智慧客服新规划 6.0》白皮书',
    ],
    media: {
      type: 'plan',
      caption: '往期 B 端代表作 · 关键成果',
    },
    links: [],
  },
  {
    id: 'supply-midend',
    tier: 'C',
    statusLabel: '往期代表作',
    title: '供应链中台',
    subtitle: '地产行业首个供应链中台 · 2019.11–2020.08',
    tags: ['scene', 'arch', 'industry', 'delivery'],
    desc: '地产供应链长期靠线下纸质流程，供应商准入、招投标、合同、商品管理分散。做行业首个供应链中台，把采购与供应商管理搬到线上。',
    metrics: [
      ['业绩', '5000 万'],
      ['签约', '4 家头部地产'],
      ['四大中心', '供应商/招采/商品/合同'],
      ['复用', '集团级底座'],
    ],
    achievements: [
      '从零规划中台架构，设计供应商、招采、商品、合同四大中心，整合电子签章、舆情监控、企业风控',
      '抽象招投标、供应商评级等通用能力，孵化「星图」「数见」「数芯」「流程中心」等集团级底座',
      '做出地产行业首个供应链中台，落地越秀地产成标杆；推动越秀、华远等 4 家头部签约、5000 万业绩',
      '孵化的产品底座被集团多条业务线复用，成集团级基础设施',
    ],
    media: {
      type: 'plan',
      caption: '往期 B 端代表作 · 关键成果',
    },
    links: [],
  },
  {
    id: 'chuanyun',
    tier: 'C',
    statusLabel: '往期代表作 · 低代码',
    title: '氚云 低代码平台',
    subtitle: '奥哲网络 · 低代码产品经理 · 2018.05–2019.11',
    tags: ['scene', 'p01', 'industry', 'delivery'],
    desc: '负责低代码产品「氚云」的规划：做市场分析、MVP 定义与需求落地，把行业场景抽象成产品方案，推动落地并提升市场占有率。',
    metrics: [
      ['产品', '氚云低代码'],
      ['方向', '市场分析→MVP'],
      ['抽象', '模板中心'],
      ['结果', '市占率提升'],
    ],
    achievements: [
      '负责低代码产品「氚云」规划：市场分析、MVP 定义、需求落地，带团队持续迭代',
      '把行业场景抽象成产品方案（如模板中心），推动落地并提升市场占有率',
      '体现「业务场景识别 → 产品化 → 商业化」的完整能力',
    ],
    media: {
      type: 'plan',
      caption: '往期 B 端代表作 · 低代码商业化',
    },
    links: [],
  },
];
