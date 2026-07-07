/* 简历数据 — 唯一文案源：20260228-AI产品-林灶辉.md
 * 纯 JS 对象字面量，<script src> 直接加载，file:// 下可用，无 import/export/fetch。
 * 诚实铁律：所有内容忠实于简历源，不新增/夸大任何客户、营收、效率数字。
 * en 为 zh 的忠实英文翻译，信息量一致。
 */
window.RESUME = {
  zh: {
    nav: {
      summary: "个人优势",
      experience: "工作经历",
      projects: "项目经历",
      skills: "技能",
      portfolio: "作品集",
      contact: "联系"
    },
    ui: {
      langLabel: "切换语言",
      themeLabel: "切换主题",
      menuLabel: "菜单",
      navLabel: "主导航",
      skipLink: "跳到主要内容",
      brandLabel: "回到顶部",
      filterGroupLabel: "项目分类筛选",
      metaDescription: "林灶辉个人简历 · 10 年+ toB/SaaS 产品老兵，AI Agent 产品负责人。",
      downloadPdf: "下载 PDF 简历",
      scrollHint: "向下滚动",
      filterAll: "全部",
      dutiesLabel: "核心职责",
      resultsLabel: "关键成果",
      educationLabel: "学历",
      phoneLabel: "手机",
      emailLabel: "邮箱",
      locationLabel: "城市",
      statusLabel: "状态",
      yearsLabel: "工作经验",
      salaryLabel: "期望薪资"
    },
    profile: {
      name: "林灶辉",
      title: "产品负责人 / AI 产品经理",
      subtitle: "10 年+ toB/SaaS 产品老兵，正推动生鲜供应链 SaaS 向「AI Agent 赋能经营」转型，从 0 搭起经营分析 · 智能采购 · 智能录单 · Agent 平台底座的 AI 产品矩阵。",
      location: "深圳",
      education: "本科",
      phone: "15219477743",
      email: "851329609@qq.com",
      status: "在职 - 考虑机会",
      years: "10 年+",
      salary: "面议",
      stats: [
        { value: "10 年+", label: "toB/SaaS 产品经验" },
        { value: "4 条", label: "从 0 搭起的 AI 产品线" },
        { value: "★4.9k", label: "超级麦吉开源 · GitHub" },
        { value: "20+ 人", label: "AI Agent 团队交付" }
      ]
    },
    summary: [
      "**10 年+ toB/SaaS 产品经验**，做过供应链中台、智能客服、企业级 AI Agent 平台等产品，推动企业供应链 SaaS 企业向「AI Agent 赋能经营」持续转型，从 0 搭起覆盖经营分析、智能采购、智能录单与**多租户 Agent 平台**底座的 AI 产品矩阵；并带 20 人团队交付企业级 AI Agent 平台，**上线第一个月签下付费客户**。",
      "完整跑通过**商业闭环**：从售前方案到产品交付再到客户续签，带队完成过**全年数千万业绩目标**，累计做了 **10+ 次企业级客户方案演示和签约**。",
      "有从 0 拉团队经验，带过 20+ 人团队（产品 + 前后端 + 算法 + 设计），用 **2 周 Sprint 敏捷节奏**推进，**4 个月内从概念验证做到商业化版本上线**。",
      "对 AI 技术有实际落地经验，熟悉**大模型、Agent、MCP** 等技术；负责过自然语言任务流交互、MCP 插件机制、**多 Agent 协作体系**的产品设计；推动框架开源吸引 **4000+ 开发者**。"
    ],
    experience: [
      {
        company: "观麦科技",
        dept: "产品研发中心",
        role: "高级产品总监（AI 产品一号位）",
        period: "2026.04 — 至今（在职）",
        duties: [
          "作为公司 **AI 产品一号位**，统筹**约 80 人产品研发中心**，负责观麦 AI 产品线整体规划与落地，推动公司从生鲜供应链 SaaS（Ceres）向「AI Agent 赋能经营」升级，从 0 搭起覆盖「经营分析 + 智能采购 + 智能录单 + Agent 平台底座」的 AI 产品矩阵；",
          "主导企业级多租户 AI Agent 平台的产品与架构规划，定下 Agent 编排运行时、**多模型网关**、**知识库 RAG**、**分层记忆**、多信道（Web / 微信）等底层能力，**架构方案迭代到第 15 版**；",
          "主导「龙虾」经营分析 Agent，面向生鲜流通企业老板，设计 L1 / L2 / L3 分层智能分析（单轮问答 → 多步诊断 → 自动顾问日报），搭出知识库「切片 → 向量化 → LLM 提炼 → 人工审核」全生命周期闭环；",
          "主导「采宝」智能采购 Agent，把采购员一句话变成「自动询价 → 多轮议价 → 生成采购单」的对话式全链路，明确「**状态机管流程、LLM 管理解生成**」的职责边界；",
          "推动**多模态智能录单**能力落地，打通文本 / 图片 / PDF / Excel 多渠道订单到结构化订单的自动转换，沉淀商品名称归一化规则库；",
          "推动 AI 工程化与降本：多模型分层网关（按成本-性能路由）、MCP 协议对接核心 ERP / WMS、记忆分层与提示词缓存控住 token 成本、TDD + 规范驱动的 AI 协作开发模式；",
          "把 AI 能力沉淀成可复用资产：生鲜行业知识词表、多模态信息抽取、知识库审核闭环、**分层记忆系统**等，支撑上层多个业务 Agent 快速孵化。"
        ],
        results: [
          "入职几个月内带队从 0 跑通经营分析、智能采购、智能录单三条 AI 产品线，并搭出**多租户 Agent 平台**底座，完成端到端可演示的 MVP；",
          "确立观麦「AI Agent 赋能生鲜供应链经营」的产品方向与技术路线，沉淀一套可跨 Agent 复用的平台能力与工程规范。"
        ]
      },
      {
        company: "KK 集团 / 灯塔引擎",
        dept: "产品中心",
        role: "产品负责人",
        period: "2022.11 — 2026.03",
        duties: [
          "主导集团连锁经营 SaaS 平台的产品搭建和迭代，推动平台经历 v1.0（信息化）→ v2.0（数据化）→ v3.0（智能化）三代升级，覆盖门店运营、供应链协同、智能陈列、数据决策等能力，服务覆盖**全国 300+ 城市连锁门店**；",
          "统筹 **10+ 款核心产品**规划与交付：Teamshare OS 一体化办公平台、司南 BI 数据分析平台、低代码平台、VCM 可视化陈列系统、开天智慧零售大脑、POS 门店收银、WMS 仓储管理、供应链协同、建店管理等；",
          "推动「企业智能大脑」中台建设：以低代码平台为底座，结合规则引擎与连接器（IFTTT）串联 SOP/非 SOP 业务，实现「系统执行规则、人制定规则」，用数据驱动业务增长；",
          "负责企业级 AI Agent 平台产品方向与规划，确定「开源全栈 + 企业 OA 整合」定位；将产品从单一 Agent 工具升级为涵盖「AI Agent + 工作流编排 + 即时通讯 + 协同办公」的生产力平台，打造**国内第一个企业级开源 AI 生产力平台**；",
          "组建并带领 **20+ 人跨职能团队**，引入敏捷开发流程，4 个月完成从概念验证到商业化版本上线；设计自然语言驱动任务流交互，推动 MCP 插件机制上线，打通企业微信/钉钉/飞书集成；推动 Agentlang 框架开源吸引 **4000+ 开发者**；",
          "设计 SaaS 云服务 / Docker 社区版 / 企业私有化部署三条商业化路径；负责对外方案输出，配合售前完成企业客户需求沟通与方案演示，沉淀可复制的「1+4」行业标准解决方案，推动**商业闭环**落地；",
          "持续跟踪 AI Agent、多模态大模型、MCP 协议等技术趋势，发现市场机会并推动产品迭代。"
        ],
        results: [
          "**上线当月签约 2 家付费企业客户**，获得 **5000+ 海内外注册用户**；",
          "推动**多 Agent 协作体系**与多条产品线打通，客户实测效率明显提升（如投资分析报告从 2 天缩短到半天出初稿）；",
          "推动 Agentlang 开源，成为 GitHub 增速较快的国产 AI Agent 框架之一；",
          "落地内部智能审批项目：审批流程全自动化，原本 1 天流程缩短至 **1 小时内完成**。"
        ]
      },
      {
        company: "深圳豆沙包科技",
        dept: "金融 PT 事业部",
        role: "供应链金融 SaaS 产品负责人",
        period: "2022.06 — 2022.11（因业务方向调整离职）",
        duties: [
          "根据集团供应链金融业务方向，负责产品规划与方案设计，输出产品规划报告与市场分析报告，对产品从架构到上线运营全程负责；",
          "规划落地金融云 SaaS 系统 v1.0、供应链金融平台 v1.0，搭建用户中心、供应链金融能力开放平台、权限中心、风控中心等基础模块；",
          "协调内外部资源，推动跨部门协作，带领 **6 人产品团队**；",
          "配合市场推广与用户试点落地，优化产品运营，持续关注行业动态。"
        ],
        results: [
          "完成金融云 SaaS 1.0 版本落地，在试点客户（PF 银行、YS 保理等）上线；",
          "带团队完成供应链金融 1.0 版本落地，成功完成核心企业首笔放款，跑通资产端融资全流程。"
        ]
      },
      {
        company: "深圳明源云集团",
        dept: "智慧客服事业部",
        role: "智慧客服事业部 产品负责人",
        period: "2019.11 — 2022.06",
        duties: [
          "负责产品线规划与落地，覆盖智能物业客服 CRM、物业满意度管理、物业服务自动化、企微客服通、客户 CDP 数据中台、营销自动化等产品线；",
          "搭建供应链中台：建立**供应商中心、招采中心、商品中心、合同中心四大中心**，抽象出招投标引擎、营销自动化引擎等中台能力；",
          "搭建产品团队（产品 15 人 + 大客户交付 8 人），协调资源推动跨部门协作；",
          "协助售前输出产品解决方案，搭建上线后运营体系。"
        ],
        results: [
          "**全年业绩达到数千万**，荣获公司最佳团队奖及个人优秀员工称号。"
        ]
      },
      {
        company: "深圳奥哲网络科技",
        dept: "产品研发部",
        role: "氚云产品经理",
        period: "2018.05 — 2019.11",
        duties: [
          "对用户需求、市场需求和业务需求做调研分析，持续优化产品体验；",
          "负责**低代码商业产品「氚云」**的规划，完成市场分析、MVP 定义、需求落地，带团队持续迭代；",
          "分析行业场景与需求并抽象为产品方案（如「氚云模板中心」），推动落地并提升市场占有率。"
        ],
        results: []
      },
      {
        company: "年年卡网络科技",
        dept: "产品研发部",
        role: "产品经理",
        period: "2015.06 — 2018.03",
        duties: [
          "负责移动端、后台的功能流程图、原型设计、交互设计评审、项目开发管理与上线；",
          "负责公司运营活动的产品输出与管理；",
          "与开发团队协作，确保实现效果与边界情况处理到位。"
        ],
        results: []
      }
    ],
    projects: [
      {
        name: "观麦 AI Agent 平台",
        subtitle: "企业级多租户 Agent 基础设施",
        role: "AI 产品负责人",
        period: "2026.04 — 至今",
        category: "AI",
        background: "观麦的 AI 助手越做越多（经营、采购、录单…），但每个都各搭一套底层、重复造轮子。需要一个统一的**多租户 Agent 平台**，把模型接入、知识库、记忆、对话信道这些公共能力沉下去，让上层 Agent 专注业务。",
        duties: [
          "作为产品负责人主导平台从 0 规划，**架构方案迭代 15 版**，定下整体架构思路和工程骨架；",
          "设计**多模型网关**，按「便宜快 / 均衡 / 高智能」三档路由不同模型，换底层模型只改配置、上层 Agent 零改动；",
          "定知识库方案：用 **RAGFlow** 做检索底座，设计 27 类生鲜行业知识词表 + 多字段元数据的双轨检索，系统知识库与租户知识库自动融合；",
          "设计**分层记忆系统**（对话工作记忆 → 中期压缩 → 长期画像），用降频与提示词缓存控住 token 成本；",
          "主导多租户隔离策略，用应用层强制隔离（而非数据库 RLS）兼顾安全与迭代效率；打通 Web 与微信信道，做到 1:1 私人 AI 助手。"
        ],
        results: [
          "完成平台底座搭建（多租户、多信道、知识库、记忆系统全部就位），落地第一个预设 Agent「经营顾问」；",
          "形成一套可复用的 Agent 平台方法论与工程规范，支撑上层多个业务 Agent 快速孵化。"
        ]
      },
      {
        name: "「龙虾」经营分析 Agent",
        subtitle: "面向老板的生鲜经营智能分析助手",
        role: "AI 产品负责人",
        period: "2026.04 — 至今",
        category: "AI",
        background: "生鲜流通企业（餐配、农贸、连锁）的老板想看经营情况，往往得让下面人导数据、做表，慢且滞后；采购成本、销售异动、库存预警这些事靠人盯根本盯不过来。我们想做一个「会看数、会分析、会提建议」的经营分析 Agent，让老板用大白话就能问出经营洞察。",
        duties: [
          "作为产品负责人主导从 0 设计，输出 PRD 与交互规范，定义产品定位、用户角色、Agent 市场与认领、深度配置等完整产品形态；",
          "设计 **L1 / L2 / L3 三层智能分析**：L1 单轮问答（指标查询）、L2 多步诊断（拉多份数据、找异动、给建议）、L3 自动顾问（定时生成经营日报）；",
          "设计**知识库全生命周期闭环**：附件「切片 → 向量化 → LLM 提炼成结构化知识条目 → 人工审核 → 上线」，低置信度或业务冲突自动拦截走审核工单；",
          "设计引导式记忆系统，Agent 在对话间隙按用户档案缺失度主动追问（门店数、主营品类等），逐步把回答个性化；",
          "通过 MCP 协议对接观麦 ERP / WMS 数据源，支持 BYOM（企业自带模型 Key）与定时报告推送到 Web / 企微等多渠道。"
        ],
        results: [
          "完成 MVP 原型与完整 PRD、知识建模规范，跑通「问 → 取数 → 分析 → 给建议」主链路与知识审核闭环；",
          "定义了一套面向生鲜经营场景的 Agent 产品范式（分层分析 + 知识闭环 + 引导记忆），成为观麦 AI 经营分析方向的基础。"
        ]
      },
      {
        name: "「采宝」智能采购 Agent",
        subtitle: "对话式生鲜采购助手",
        role: "AI 产品负责人",
        period: "2026.05 — 至今",
        category: "AI",
        background: "生鲜采购员每天要发询价、收报价、来回议价、再定价开采购单，报价还经常是微信里发的文字、截图、Excel，格式乱、强度大。我们想让采购员一句话或一个文件就触发整条采购流程，把重复操作交给 AI。",
        duties: [
          "作为产品负责人主导产品设计，输出需求文档 V2.0，定义采购三阶段、SKU 核心字段、损耗补采、供应商六维评分等业务规则；",
          "设计对话式采购全链路：自然语言 / 文件触发 → 自动生成询价单 → 发供应商 → **多模态识别报价**（文字 / 截图 / Excel）→ 多轮议价 → 定价 → 生成采购单 → 回写 ERP；",
          "明确「**确定性状态机 + LLM**」的边界：流程流转、计时催办、议价达标由状态机和调度控制，LLM 只做理解和话术生成，保证流程可控可复现；",
          "设计 IM 通道与 ERP 对接的网关抽象，预留真实微信 / MCP 集成的替换点，先用供应商模拟器跑通可演示闭环；",
          "推动选用**智谱 GLM 多模态**（文本 + 图片报价识别），并对齐采宝与龙虾的技术栈（FastAPI + React）。"
        ],
        results: [
          "完成可现场重演的端到端采购 demo（一句话 → 询价 → 识别报价 → 议价 → 采购单），后端主链路测试通过；",
          "沉淀「状态机管流程、LLM 管理解」的对话式业务 Agent 设计方法，可复用到其他强流程业务场景；",
          "上线验证直接在生产环境跑，无需额外配置。"
        ]
      },
      {
        name: "超级麦吉（Super Magic）AI 生产力平台",
        subtitle: "企业级通用型 AI Agent 平台",
        role: "产品负责人",
        period: "2024.01 — 2026.03",
        category: "AI",
        background: "2024 年初，AI Agent 产品两头分化，要么是给开发者的技术框架，要么是给普通人的聊天工具，中间缺一个能接住企业业务流程的。公司决定从「企业级 AI 自动化协同」切入，从 0 到 1 开始商业化。（体验地址：国内 https://www.letsmagic.cn/ ，国际版 https://www.magicrew.ai/ ）",
        duties: [
          "对标 Manus、Dify、Coze 等多个 AI 产品完成竞品分析，深入调研零售、电商、制造等多个行业企业，总结企业 AI 落地的共性需求：既希望 AI 提升生产效率，又希望数据自主可控、避免 SaaS 锁定，据此确立「开源全栈 + 企业办公整合」的产品方向；",
          "定义**四层产品架构**（Agent + 流程编排 + IM + 协同 OS），带团队以两周一 Sprint 推进，做出任务理解、联网检索、文件操作、代码执行等 **20 多个工具能力**；",
          "组织多轮种子用户测试与企业客户共创，累计收集数千条用户反馈，围绕产品易用性、长上下文、多轮协同及企业数据安全等核心问题持续迭代，完成产品首轮体验闭环；",
          "推动 SaaS、社区版及私有化三条商业化路径同步落地，配合销售完成多轮客户方案演示及 PoC 验证，沉淀企业级 AI 产品标准化交付方案。"
        ],
        results: [
          "完成企业级 AI Agent 平台从 0 到 1 建设，实现产品商业化上线，快速积累数万注册用户，建立 C 端获客、B 端转化的商业模式，通过持续沉淀销售线索推动企业客户转化，支撑产品实现**近千万级年化收入**；",
          "客户实测中，投资分析报告生成时间由 2 天缩短至数十分钟，会议纪要整理效率提升至原来的 5 倍，内部审批时长由 1 天缩短至 1 小时；",
          "推动 Agentlang 框架开源，**首月登上 GitHub Trending 全球趋势榜前四**，全网获得数百万用户关注。"
        ]
      },
      {
        name: "连锁经营 SaaS 数字化解决方案",
        subtitle: "连锁零售企业数字化转型平台",
        role: "项目经理",
        period: "2022.11 — 2024.06",
        category: "SaaS",
        background: "集团旗下多个潮流零售品牌门店遍布全国 300+ 城市。随着规模扩张，原有分散系统无法支撑：数据割裂、流程不连贯、场景难以灵活应对。公司决定自建灯塔引擎连锁经营 SaaS 平台，从 v1.0 信息化 → v2.0 标准化 → v3.0 智能化三代升级。我作为商业化 1 号位负责产品体系搭建和落地，并开始对外输出数字化解决方案。（了解详情：https://www.dtyq.com/）",
        duties: [
          "核心系统矩阵：以 Teamshare OS 为统一入口，整合司南 BI、低代码平台、VCM 可视化陈列、开天智慧零售大脑、供应链协同、POS 收银、WMS 仓储、任务应用、建店管理等 10+ 核心产品，覆盖门店运营、供应链、智能陈列到数据决策全链路；",
          "阶段一（业务摸底与架构设计）：走访 30+ 家门店调研，梳理门店运营、库存周转、三级管控等核心问题，确定「总部标准化、区域灵活配置、门店轻量化」设计思路；完成「企业智能大脑」产品架构规划与微服务多租户平台技术选型；",
          "阶段二（核心模块落地与试点推广）：主导门店运营（任务应用）、VCM 智能陈列（千店千面）、供应链协同（采购-仓储-配送全链路）、会员营销中台（RFM 分层运营）四大核心模块落地；上线智能补货算法，选 3 个区域 50+ 门店试点跑通业务闭环；",
          "阶段三（规模化推广与方案标准化）：推动平台 v1.0 → v3.0 三代迭代，搭建司南 BI 实时数据看板体系；打造**「1+4」标准解决方案**（1 个数据底座 + 4 大业务套件），新品牌 2 周内接入上线，向 10+ 家连锁客户输出 SaaS 服务。"
        ],
        results: [
          "平台覆盖**全国 300+ 城市连锁门店**，服务 10+ 连锁品牌客户，平台年营收 200 万+；",
          "落地 **10+ 款核心产品**，覆盖办公协同、门店管理、供应链、智能陈列、数据决策全链路数字化；",
          "**单店日常运营效率提升 40%**；开天智慧零售大脑驱动的**智能补货准确率达 85%+**，**缺货损失降低约 30%**；",
          "新品牌接入周期从月级压缩到 2 周，沉淀「信息化 → 数据化 → 自动化 → 智能化」完整方法论。"
        ]
      },
      {
        name: "供应链金融 1.0",
        subtitle: "SaaS 产品 · Dow+ 供应链金融平台",
        role: "产品负责人",
        period: "2022.06 — 2022.11",
        category: "供应链",
        background: "跨境电商、直播电商等新兴行业企业往往不满足传统银行对「核心企业」的认定标准，融资难、授信门槛高。公司联合银行与保理机构共建 Dow+ 供应链金融平台，打通应收账款融资、订单融资等金融服务。",
        duties: [
          "作为产品负责人从 0 到 1 搭建供应链金融产品，完成市场调研、业务流程梳理与产品架构设计，以 MVP 方式快速验证迭代；",
          "设计资产端全流程（企业入驻 → 资产登记 → 风控审核 → 资金匹配 → 放款 → 还款），打通「订单数据化」「财务自动化」「开户线上化」三大关键环节；",
          "协调银行、保理公司等外部合作方，推动风控模型与系统对接；带领 **6 人产品团队**完成交付。"
        ],
        results: [
          "**5 个月内完成 v1.0 全流程落地**，接入首批核心企业（PF 银行、YS 保理），完成首笔放款并跑通资产端融资闭环，成为公司战略级产品线。"
        ]
      },
      {
        name: "智慧物业客服 6.0",
        subtitle: "SaaS 产品",
        role: "事业部产品负责人",
        period: "2020.08 — 2022.06",
        category: "SaaS",
        background: "地产物业行业面临业主不满意、客服响应慢、私域流量难运营等问题。通过「智能服务自动化」「客户信息数据化」「私域连接器」升级，将物业客服从被动接单转为主动经营。",
        duties: [
          "作为事业部产品负责人，统筹智能物业客服 CRM、满意度管理、服务自动化、企微客服通、客户 CDP 数据中台、营销自动化六条产品线规划与迭代；",
          "主导智能工单引擎与自动派单系统设计，实现报修 → 派单 → 处理 → 回访全流程自动化，**平均工单响应时间缩短 60%**；",
          "搭建基于企业微信的私域连接器，打通业主沟通、满意度调研、活动推送等触达链路；",
          "带领产品团队 15 人 + 大客户交付团队 8 人，负责重点客户方案、交付与上线运营。"
        ],
        results: [
          "**首年达成 4000 万+ 业绩目标**，打造越秀地产、龙光集团等行业标杆客户；",
          "输出《智慧客服新规划 6.0》产品白皮书，推动产品线从单一客服工具升级为客户经营平台；荣获年度最佳团队奖及个人优秀员工称号。"
        ]
      },
      {
        name: "供应链中台",
        subtitle: "SaaS 产品",
        role: "产品负责人",
        period: "2019.11 — 2020.08",
        category: "供应链",
        background: "地产行业供应链管理长期依赖线下纸质流程，供应商准入、招投标、合同签署、商品管理分散在多个系统，协同效率低、数据不通。公司决定打造行业首个供应链中台，实现采购与供应商管理线上化。",
        duties: [
          "从零规划供应链中台产品架构，设计供应商中心、招采中心、商品中心、合同中心四大核心模块，整合电子签章、舆情监控、企业风控等增值能力；",
          "抽象招投标引擎、供应商评级引擎等通用中台能力，推动模块解耦与服务化改造，孵化「星图」「数见」「数芯」「流程中心」等集团级技术底座；",
          "配合售前输出解决方案与客户演示，建立从签约 → 交付 → 持续运营的标准化流程。"
        ],
        results: [
          "打造**地产行业首个供应链中台**，落地越秀地产成为行业标杆；",
          "推动越秀、华远等 4 家头部地产企业签约，达成 **5000 万业绩目标**，荣获集团优秀员工称号；",
          "孵化的产品底座被集团多条业务线复用，成为集团级基础设施。"
        ]
      },
      {
        name: "氚云模板中心",
        subtitle: "低代码 SaaS 产品",
        role: "产品经理",
        period: "2019.01 — 2019.11",
        category: "低代码",
        background: "氚云作为低代码平台，用户常见问题是「不知道怎么用、能做什么」，导致 DAU 偏低、渠道转化不足。通过建设行业模板中心，为不同行业提供开箱即用模板，降低上手门槛、提升转化。",
        duties: [
          "负责模板中心产品规划与落地，设计模板分类体系、模板市场交互流程与一键部署机制；",
          "深入制造、教育、零售等行业做客户调研，提炼共性需求并沉淀行业模板方案与方法论；",
          "陪同全国服务商客户拜访与方案演示，提升渠道与直销转化效率。"
        ],
        results: [
          "模板中心落地后，产品 **DAU 从 10% 提升至 45%**；",
          "所负责行业转化率从 5% 提升至 15%；渠道综合转化率达 30%；直销转化率从 20% 提升至 32%；",
          "个人陪同拜访客户的商机转化率达 50%，沉淀可复制的行业拓展打法。"
        ]
      },
      {
        name: "年年卡缴费平台",
        subtitle: "移动端产品",
        role: "产品经理",
        period: "2015.11 — 2016.06",
        category: "移动",
        background: "核心业务依赖线下代理商分发缴费服务，流程繁琐、到账慢、对账难。需要搭建互联网缴费平台，通过移动端打通个人用户与代理商的交易链路。",
        duties: [
          "负责缴费平台 App 产品规划与功能设计，完成用户端/代理商端核心流程（充值、缴费、提现、对账）设计与交互定义；",
          "协调运营、技术、财务等多部门资源，推动项目按期交付上线；",
          "基于用户反馈持续优化支付流程体验与异常处理机制。"
        ],
        results: [
          "按期完成全功能上线，实现用户与代理商无缝交易，**缴费到账时间从 T+3 缩短至实时到账**。"
        ]
      }
    ],
    skills: [
      {
        group: "AI 与大模型",
        items: ["大模型应用", "AI Agent", "多 Agent 协作", "MCP 协议", "知识库 RAG", "多模型网关", "分层记忆系统", "多模态信息抽取", "提示词缓存与降本", "自然语言任务流", "Agent 编排运行时"]
      },
      {
        group: "产品与商业化",
        items: ["toB/SaaS 产品规划", "0→1 产品孵化", "PRD 与需求设计", "竞品分析", "商业化路径设计", "售前方案与客户演示", "商业闭环（签约-交付-续签）", "低代码平台", "BI 数据分析"]
      },
      {
        group: "行业领域",
        items: ["生鲜供应链", "连锁零售", "智慧物业客服", "供应链金融", "供应链中台", "企业协同办公（OA）"]
      },
      {
        group: "团队与协作",
        items: ["跨职能团队搭建（产品+前后端+算法+设计）", "20+ 人团队管理", "敏捷 Sprint", "TDD 与规范驱动开发", "开源社区运营", "跨部门协同"]
      }
    ]
  },
  en: {
    nav: {
      summary: "Highlights",
      experience: "Experience",
      projects: "Projects",
      skills: "Skills",
      portfolio: "Portfolio",
      contact: "Contact"
    },
    ui: {
      langLabel: "Switch language",
      themeLabel: "Switch theme",
      menuLabel: "Menu",
      navLabel: "Main navigation",
      skipLink: "Skip to main content",
      brandLabel: "Back to top",
      filterGroupLabel: "Filter projects by category",
      metaDescription: "Résumé of Lin Zaohui · a toB/SaaS product veteran with 10+ years, AI Agent product lead.",
      downloadPdf: "Download PDF résumé",
      scrollHint: "Scroll",
      filterAll: "All",
      dutiesLabel: "Key responsibilities",
      resultsLabel: "Outcomes",
      educationLabel: "Education",
      phoneLabel: "Phone",
      emailLabel: "Email",
      locationLabel: "City",
      statusLabel: "Status",
      yearsLabel: "Experience",
      salaryLabel: "Expected salary"
    },
    profile: {
      name: "Lin Zaohui",
      title: "Product Lead / AI Product Manager",
      subtitle: "A toB/SaaS product veteran with 10+ years; driving a fresh-supply-chain SaaS toward 'AI Agent–powered operations,' building from scratch an AI product matrix spanning operations analytics, smart procurement, smart order intake, and an Agent-platform foundation.",
      location: "Shenzhen",
      education: "Bachelor's",
      phone: "15219477743",
      email: "851329609@qq.com",
      status: "Employed — open to opportunities",
      years: "10+ years",
      salary: "Negotiable",
      stats: [
        { value: "10+ yrs", label: "toB/SaaS product" },
        { value: "4", label: "AI product lines built 0→1" },
        { value: "★4.9k", label: "Super Magic open-source · GitHub" },
        { value: "20+", label: "AI Agent team delivered" }
      ]
    },
    summary: [
      "**10+ years of toB/SaaS product experience** across products like supply-chain mid-platforms, smart customer service, and enterprise-grade AI Agent platforms; drove enterprise supply-chain SaaS companies to keep transforming toward 'AI Agent–powered operations,' building from scratch an AI product matrix covering operations analytics, smart procurement, smart order intake, and a multi-tenant Agent-platform foundation; led a 20-person team to deliver an enterprise-grade AI Agent platform and **signed a paying client in the first month after launch**.",
      "Has run the **full business loop** end to end: from pre-sales solutions to product delivery to client renewals, led teams to hit **annual targets of tens of millions**, and completed **10+ enterprise-client solution demos and signings** in total.",
      "Experienced in building teams from zero — has led 20+ person teams (product + front/back-end + algorithm + design) on a **2-week agile Sprint cadence**, going **from proof of concept to a commercial release within 4 months**.",
      "Has hands-on experience landing AI; familiar with **LLMs, Agents, MCP**, and more; owned the product design of natural-language task-flow interaction, the MCP plugin mechanism, and a **multi-agent collaboration system**; drove a framework open-source that attracted **4,000+ developers**."
    ],
    experience: [
      {
        company: "Guanmai Technology",
        dept: "Product & R&D Center",
        role: "Senior Product Director (AI Product Lead)",
        period: "2026.04 — Present (current)",
        duties: [
          "As the company's **AI product lead**, oversaw a **~80-person product & R&D center** and owned the overall planning and delivery of Guanmai's AI product line; drove the company's upgrade from fresh-supply-chain SaaS (Ceres) toward 'AI Agent–powered operations,' building from scratch an AI product matrix spanning 'operations analytics + smart procurement + smart order intake + Agent-platform foundation';",
          "Led the product and architecture planning of an enterprise-grade multi-tenant AI Agent platform, defining core capabilities such as the Agent orchestration runtime, **multi-model gateway**, **knowledge-base RAG**, **tiered memory**, and multi-channel (Web / WeChat), with the architecture **iterated to its 15th version**;",
          "Led 'Lobster,' an operations-analytics Agent for bosses of fresh-produce distribution businesses; designed L1 / L2 / L3 tiered intelligent analysis (single-turn Q&A → multi-step diagnosis → automated advisory daily report) and built a **full-lifecycle knowledge-base loop** of 'chunking → vectorization → LLM distillation → human review';",
          "Led 'Caibao,' a smart-procurement Agent that turns a buyer's single sentence into a conversational end-to-end chain of 'auto inquiry → multi-round bargaining → purchase order,' with a clear boundary that '**the state machine governs the process while the LLM handles understanding and generation**';",
          "Drove the delivery of **multimodal smart order intake**, connecting automatic conversion of multi-channel orders (text / image / PDF / Excel) into structured orders, and accumulated a rule base for normalizing product names;",
          "Advanced AI engineering and cost reduction: a tiered **multi-model gateway** (cost–performance routing), MCP-protocol integration with core ERP / WMS, memory tiering and prompt caching to control token cost, and a TDD + spec-driven AI collaborative development model;",
          "Distilled AI capabilities into reusable assets — fresh-industry knowledge vocabulary, multimodal information extraction, knowledge-base review loop, **tiered memory system**, and more — to support rapid incubation of multiple upper-layer business Agents."
        ],
        results: [
          "Within a few months of joining, led the team to take three AI product lines — operations analytics, smart procurement, and smart order intake — from zero to working, and built the multi-tenant Agent-platform foundation, completing an end-to-end demonstrable MVP;",
          "Established Guanmai's product direction and technical roadmap of 'AI Agent–powered fresh-supply-chain operations,' accumulating a set of platform capabilities and engineering standards reusable across Agents."
        ]
      },
      {
        company: "KK Group / Lighthouse Engine",
        dept: "Product Center",
        role: "Product Lead",
        period: "2022.11 — 2026.03",
        duties: [
          "Led the building and iteration of the group's chain-operations SaaS platform, driving it through three generations — v1.0 (informatization) → v2.0 (datafication) → v3.0 (intelligence) — covering store operations, supply-chain collaboration, smart merchandising, and data-driven decisions, serving chain stores across **300+ cities** nationwide;",
          "Orchestrated the planning and delivery of **10+ core products**: Teamshare OS unified office platform, Sinan BI analytics platform, low-code platform, VCM visual merchandising system, Kaitian smart-retail brain, POS, WMS, supply-chain collaboration, store-construction management, and more;",
          "Drove the 'enterprise smart brain' mid-platform: with the low-code platform as the foundation, combined a rules engine and connectors (IFTTT) to link SOP/non-SOP business, realizing 'the system executes rules, people set the rules,' using data to drive business growth;",
          "Owned the product direction and planning of an enterprise-grade AI Agent platform, setting an 'open-source full-stack + enterprise OA integration' positioning; upgraded the product from a single Agent tool into a productivity platform spanning 'AI Agent + workflow orchestration + instant messaging + collaborative office,' building **China's first enterprise-grade open-source AI productivity platform**;",
          "Built and led a **20+ person cross-functional team**, introduced agile processes, and went from proof of concept to a commercial release in 4 months; designed natural-language-driven task-flow interaction, shipped the MCP plugin mechanism, and integrated WeCom/DingTalk/Feishu; drove the Agentlang framework open-source, attracting **4,000+ developers**;",
          "Designed three commercialization paths — SaaS cloud service / Docker community edition / enterprise on-premise deployment; owned external solution delivery, supported pre-sales in client requirement discussions and demos, and distilled a replicable '1+4' industry-standard solution to close the business loop;",
          "Continuously tracked tech trends such as AI Agents, multimodal LLMs, and the MCP protocol, spotting market opportunities and driving product iteration."
        ],
        results: [
          "**Signed 2 paying enterprise clients in the launch month** and gained **5,000+ registered users** at home and abroad;",
          "Connected a **multi-agent collaboration system** with multiple product lines; clients measured clear efficiency gains (e.g., an investment-analysis report's first draft cut from 2 days to half a day);",
          "Drove Agentlang open-source, making it one of the faster-growing homegrown AI Agent frameworks on GitHub;",
          "Delivered an internal smart-approval project: the approval process was fully automated, shrinking a once 1-day process to **under 1 hour**."
        ]
      },
      {
        company: "Shenzhen Dousha Bao Technology",
        dept: "Fintech PT Division",
        role: "Supply Chain Finance SaaS Product Lead",
        period: "2022.06 — 2022.11 (left due to business pivot)",
        duties: [
          "Per the group's supply-chain-finance direction, owned product planning and solution design, produced product-planning and market-analysis reports, and was responsible end to end from architecture to launch and operations;",
          "Planned and delivered the Financial Cloud SaaS system v1.0 and the supply-chain-finance platform v1.0, building foundational modules such as the user center, supply-chain-finance capability open platform, permission center, and risk-control center;",
          "Coordinated internal and external resources, drove cross-department collaboration, and led a **6-person product team**;",
          "Supported market promotion and pilot rollout, optimized product operations, and continuously tracked industry trends."
        ],
        results: [
          "Landed the Financial Cloud SaaS 1.0 release, going live at pilot clients (PF Bank, YS Factoring, etc.);",
          "Led the team to deliver supply-chain-finance 1.0, completing the first loan disbursement for a core enterprise and running through the full asset-side financing flow."
        ]
      },
      {
        company: "Shenzhen Mingyuan Cloud Group",
        dept: "Smart Customer Service Division",
        role: "Product Lead, Smart Customer Service Division",
        period: "2019.11 — 2022.06",
        duties: [
          "Owned product-line planning and delivery across smart property-service CRM, property satisfaction management, property-service automation, WeCom customer service, customer CDP data mid-platform, and marketing automation;",
          "Built a supply-chain mid-platform: established four centers — **supplier center, procurement/bidding center, product center, and contract center** — and abstracted mid-platform capabilities such as a bidding engine and a marketing-automation engine;",
          "Built the product team (15 product + 8 key-account delivery), coordinating resources and driving cross-department collaboration;",
          "Supported pre-sales in delivering product solutions and built the post-launch operations system."
        ],
        results: [
          "Achieved **tens of millions in annual revenue** and won the company's Best Team award and Outstanding Employee recognition."
        ]
      },
      {
        company: "Shenzhen Authine Network Technology",
        dept: "Product R&D Department",
        role: "Product Manager (Chuanyun Low-Code Platform)",
        period: "2018.05 — 2019.11",
        duties: [
          "Researched and analyzed user, market, and business needs, continuously improving the product experience;",
          "Owned planning of the commercial low-code product 'Chuanyun,' completing market analysis, MVP definition, and requirement delivery, and led the team through continuous iteration;",
          "Analyzed industry scenarios and needs and abstracted them into product solutions (e.g., the 'Chuanyun Template Center'), driving delivery and increasing market share."
        ],
        results: []
      },
      {
        company: "Niannianka Network Technology",
        dept: "Product R&D Department",
        role: "Product Manager",
        period: "2015.06 — 2018.03",
        duties: [
          "Owned flowcharts, prototyping, interaction-design reviews, development management, and launch for both mobile and back-office;",
          "Owned the product output and management of the company's operational campaigns;",
          "Collaborated with the development team to ensure delivered results and proper handling of edge cases."
        ],
        results: []
      }
    ],
    projects: [
      {
        name: "Guanmai AI Agent Platform",
        subtitle: "Enterprise multi-tenant Agent infrastructure",
        role: "AI Product Lead",
        period: "2026.04 — Present",
        category: "AI",
        background: "Guanmai kept building more AI assistants (operations, procurement, order intake…), but each rebuilt its own foundation and reinvented the wheel. A unified **multi-tenant Agent platform** was needed to push common capabilities — model access, knowledge base, memory, and conversation channels — down to a shared layer, letting upper-layer Agents focus on the business.",
        duties: [
          "As product lead, drove the platform's planning from zero, **iterating the architecture through 15 versions** and setting the overall architectural approach and engineering skeleton;",
          "Designed a **multi-model gateway** that routes different models across three tiers — 'cheap & fast / balanced / high-intelligence' — so switching the underlying model needs only a config change, with zero changes to upper-layer Agents;",
          "Set the knowledge-base approach: using **RAGFlow** as the retrieval foundation, designed dual-track retrieval with a 27-category fresh-industry knowledge vocabulary plus multi-field metadata, with system and tenant knowledge bases automatically merged;",
          "Designed a **tiered memory system** (conversational working memory → mid-term compression → long-term profile), using downsampling and prompt caching to control token cost;",
          "Led the multi-tenant isolation strategy, using application-layer enforced isolation (rather than database RLS) to balance security and iteration speed; connected Web and WeChat channels to deliver a 1:1 personal AI assistant."
        ],
        results: [
          "Completed the platform foundation (multi-tenant, multi-channel, knowledge base, and memory system all in place) and shipped the first preset Agent, 'Operations Advisor';",
          "Formed a reusable Agent-platform methodology and engineering standards to support rapid incubation of multiple upper-layer business Agents."
        ]
      },
      {
        name: "'Lobster' Operations-Analytics Agent",
        subtitle: "Smart fresh-operations analytics assistant for bosses",
        role: "AI Product Lead",
        period: "2026.04 — Present",
        category: "AI",
        background: "Bosses of fresh-produce distribution businesses (catering supply, wet markets, chains) want to see how operations are doing, but usually have to ask staff to export data and build spreadsheets — slow and lagging; procurement cost, sales anomalies, and inventory alerts are simply impossible to watch manually. We wanted an operations-analytics Agent that 'reads the numbers, analyzes, and gives advice,' so bosses can surface operational insights in plain language.",
        duties: [
          "As product lead, drove the design from zero, producing the PRD and interaction spec and defining the full product form — positioning, user roles, Agent marketplace and claiming, deep configuration, and more;",
          "Designed **three-tier intelligent analysis L1 / L2 / L3**: L1 single-turn Q&A (metric queries), L2 multi-step diagnosis (pull multiple datasets, find anomalies, give advice), L3 auto-advisor (scheduled operational daily reports);",
          "Designed a **full-lifecycle knowledge-base loop**: attachments go through 'chunking → vectorization → LLM distillation into structured knowledge entries → human review → publish,' with low-confidence or business-conflicting items auto-intercepted into review tickets;",
          "Designed a guided memory system in which the Agent proactively asks follow-ups between turns based on profile gaps (store count, main categories, etc.), gradually personalizing its answers;",
          "Connected Guanmai ERP / WMS data sources via the MCP protocol, supporting BYOM (the enterprise's own model key) and scheduled report push to multiple channels such as Web and WeCom."
        ],
        results: [
          "Completed the MVP prototype, full PRD, and knowledge-modeling spec, running through the main 'ask → fetch data → analyze → advise' chain and the knowledge-review loop;",
          "Defined an Agent product paradigm for fresh-operations scenarios (tiered analysis + knowledge loop + guided memory), which became the foundation of Guanmai's AI operations-analytics direction."
        ]
      },
      {
        name: "'Caibao' Smart-Procurement Agent",
        subtitle: "Conversational fresh-produce procurement assistant",
        role: "AI Product Lead",
        period: "2026.05 — Present",
        category: "AI",
        background: "Fresh-produce buyers spend all day sending inquiries, collecting quotes, bargaining back and forth, then pricing and creating purchase orders — and quotes often arrive as WeChat text, screenshots, or Excel, in messy formats and at high intensity. We wanted a single sentence or one file from the buyer to trigger the entire procurement flow, handing repetitive operations to AI.",
        duties: [
          "As product lead, drove the product design, producing requirements document V2.0 and defining business rules — the three procurement stages, SKU core fields, loss-replenishment purchasing, and a six-dimension supplier scoring;",
          "Designed the conversational end-to-end procurement chain: natural-language / file trigger → auto-generate inquiry → send to suppliers → **multimodal quote recognition** (text / screenshot / Excel) → multi-round bargaining → pricing → generate purchase order → write back to ERP;",
          "Clarified the boundary of '**deterministic state machine + LLM**': process transitions, timed reminders, and bargaining thresholds are controlled by the state machine and scheduler, while the LLM only handles understanding and phrasing, ensuring the flow is controllable and reproducible;",
          "Designed a gateway abstraction for the IM channel and ERP integration, reserving swap points for real WeChat / MCP integration, first running a demonstrable loop with a supplier simulator;",
          "Drove the adoption of **Zhipu GLM multimodal** (text + image quote recognition) and aligned Caibao's and Lobster's tech stacks (FastAPI + React)."
        ],
        results: [
          "Completed a re-playable end-to-end procurement demo (one sentence → inquiry → quote recognition → bargaining → purchase order), with the backend main chain passing tests;",
          "Distilled a conversational business-Agent design method of 'state machine governs the process, LLM handles understanding,' reusable for other process-heavy business scenarios;",
          "Validated directly in the production environment with no extra configuration needed."
        ]
      },
      {
        name: "Super Magic AI Productivity Platform",
        subtitle: "Enterprise-grade general AI Agent platform",
        role: "Product Lead",
        period: "2024.01 — 2026.03",
        category: "AI",
        background: "In early 2024, AI Agent products were split into two camps — developer-facing technical frameworks or consumer-facing chat tools — with nothing in between to carry enterprise business processes. The company decided to enter via 'enterprise-grade AI automation collaboration' and commercialize from zero to one. (Live demo: letsmagic.cn in China / magicrew.ai internationally)",
        duties: [
          "Completed competitive analysis benchmarking multiple AI products such as Manus, Dify, and Coze, and researched enterprises across retail, e-commerce, manufacturing and more, distilling the common need for enterprise AI: to boost productivity while keeping data self-controlled and avoiding SaaS lock-in — accordingly setting the 'open-source full-stack + enterprise office integration' product direction;",
          "Defined a **four-layer product architecture** (Agent + flow orchestration + IM + collaboration OS), drove the team on 2-week Sprints, and built **20+ tool capabilities** including task understanding, web search, file operations, and code execution;",
          "Organized multiple rounds of seed-user testing and enterprise-client co-creation, collecting thousands of feedback items, and iterated continuously around usability, long context, multi-turn collaboration, and enterprise data security to close the first product experience loop;",
          "Drove three commercialization paths — SaaS, community edition, and on-premise — in parallel, supported sales in multiple client solution demos and PoC validations, and distilled a standardized enterprise AI delivery playbook."
        ],
        results: [
          "Built the enterprise-grade AI Agent platform from zero to one and launched commercially, rapidly accumulating tens of thousands of registered users; established a C-end acquisition, B-end conversion business model, and drove enterprise-client conversion via continuously accumulated sales leads, supporting **nearly ten-million-level annualized revenue**;",
          "Client-measured: investment-analysis report generation cut from 2 days to tens of minutes, meeting-minutes efficiency improved 5×, and internal approval time cut from 1 day to 1 hour;",
          "Drove the Agentlang framework open-source, reaching the **global GitHub Trending top 4 in its first month** and gaining millions of views across the web."
        ]
      },
      {
        name: "Chain-Operations SaaS Digitalization Solution",
        subtitle: "Digital-transformation platform for chain retail",
        role: "Project Manager",
        period: "2022.11 — 2024.06",
        category: "SaaS",
        background: "The group's portfolio of trendy retail brands had stores across **300+ cities** nationwide. As scale grew, the old fragmented systems couldn't keep up: siloed data, disjointed processes, and rigid handling of scenarios. The company decided to build the Lighthouse Engine chain-operations SaaS platform in-house, upgrading across three generations: v1.0 informatization → v2.0 standardization → v3.0 intelligence. As commercialization lead, I owned building and landing the product system and began delivering digitalization solutions externally. (More: dtyq.com)",
        duties: [
          "Core system matrix: with Teamshare OS as the unified entry point, integrated **10+ core products** — Sinan BI, low-code platform, VCM visual merchandising, Kaitian smart-retail brain, supply-chain collaboration, POS, WMS, task apps, and store-construction management — covering the full chain from store operations and supply chain to smart merchandising and data-driven decisions;",
          "Phase 1 (business survey & architecture design): surveyed 30+ stores, mapped core issues such as store operations, inventory turnover, and three-level control, and set the design approach of 'HQ standardization, regional flexible configuration, lightweight stores'; completed the 'enterprise smart brain' product architecture and the microservice multi-tenant platform tech selection;",
          "Phase 2 (core-module landing & pilot rollout): led the landing of four core modules — store operations (task apps), VCM smart merchandising (a tailored look per store), supply-chain collaboration (full procurement–warehouse–delivery chain), and a member-marketing mid-platform (RFM-tiered operations); shipped a smart-replenishment algorithm and piloted in 50+ stores across 3 regions to run through the business loop;",
          "Phase 3 (scale rollout & solution standardization): drove the platform's v1.0 → v3.0 three-generation iteration and built Sinan BI's real-time dashboard system; created the **'1+4' standard solution** (1 data foundation + 4 business suites), onboarding a new brand within 2 weeks and delivering SaaS to 10+ chain clients."
        ],
        results: [
          "The platform covered chain stores across **300+ cities** nationwide, served 10+ chain-brand clients, and reached 2M+ RMB in annual platform revenue;",
          "Landed **10+ core products**, digitalizing the full chain across office collaboration, store management, supply chain, smart merchandising, and data decisions;",
          "**Per-store daily operating efficiency up 40%**; the Kaitian smart-retail brain drove smart replenishment to **85%+ accuracy**, **cutting stockout losses by about 30%**;",
          "New-brand onboarding compressed from months to 2 weeks, distilling a complete 'informatization → datafication → automation → intelligence' methodology."
        ]
      },
      {
        name: "Supply Chain Finance 1.0",
        subtitle: "SaaS product · Dow+ supply-chain-finance platform",
        role: "Product Lead",
        period: "2022.06 — 2022.11",
        category: "Supply Chain",
        background: "Emerging-industry firms such as cross-border e-commerce and live-streaming commerce often don't meet traditional banks' 'core enterprise' criteria, facing hard financing and high credit thresholds. The company partnered with banks and factoring institutions to co-build the Dow+ supply-chain-finance platform, connecting services such as accounts-receivable financing and order financing.",
        duties: [
          "As product lead, built the supply-chain-finance product from zero to one — market research, business-process mapping, and product architecture design — validating and iterating rapidly via MVP;",
          "Designed the full asset-side flow (enterprise onboarding → asset registration → risk review → fund matching → disbursement → repayment), connecting the three key links of 'order datafication,' 'finance automation,' and 'online account opening';",
          "Coordinated external partners such as banks and factoring firms, drove risk-model and system integration, and led a **6-person product team** to delivery."
        ],
        results: [
          "**Completed the full v1.0 flow in 5 months**, onboarded the first batch of core enterprises (PF Bank, YS Factoring), completed the first disbursement, ran through the asset-side financing loop, and became a strategic product line for the company."
        ]
      },
      {
        name: "Smart Property Customer Service 6.0",
        subtitle: "SaaS product",
        role: "Division Product Lead",
        period: "2020.08 — 2022.06",
        category: "SaaS",
        background: "The real-estate property industry faced owner dissatisfaction, slow customer-service response, and hard-to-run private-domain traffic. Through upgrades in 'smart service automation,' 'customer-data datafication,' and a 'private-domain connector,' property customer service shifted from passively taking tickets to proactively running the business.",
        duties: [
          "As division product lead, orchestrated planning and iteration across six product lines: smart property-service CRM, satisfaction management, service automation, WeCom customer service, customer CDP data mid-platform, and marketing automation;",
          "Led the design of a smart ticketing engine and auto-dispatch system, automating the full repair → dispatch → handle → follow-up flow and **cutting average ticket response time by 60%**;",
          "Built a WeCom-based private-domain connector, connecting reach channels such as owner communication, satisfaction surveys, and campaign pushes;",
          "Led a product team of 15 plus an 8-person key-account delivery team, owning key-client solutions, delivery, and post-launch operations."
        ],
        results: [
          "Hit a **40M+ RMB performance target** in the first year and built benchmark clients such as Yuexiu Property and Logan Group;",
          "Produced the 'Smart Customer Service Plan 6.0' product white paper, upgrading the product line from a single customer-service tool into a customer-operations platform; won the annual Best Team award and Outstanding Employee recognition."
        ]
      },
      {
        name: "Supply Chain Mid-Platform",
        subtitle: "SaaS product",
        role: "Product Lead",
        period: "2019.11 — 2020.08",
        category: "Supply Chain",
        background: "The real-estate industry's supply-chain management long relied on offline paper processes, with supplier admission, bidding, contract signing, and product management scattered across systems — low collaboration efficiency and disconnected data. The company decided to build the **industry's first supply-chain mid-platform**, taking procurement and supplier management online.",
        duties: [
          "Planned the supply-chain mid-platform architecture from scratch, designing four core modules — **supplier center, procurement/bidding center, product center, and contract center** — and integrating value-added capabilities such as e-signature, public-opinion monitoring, and enterprise risk control;",
          "Abstracted general mid-platform capabilities such as a bidding engine and a supplier-rating engine, drove module decoupling and service-oriented refactoring, and incubated group-level tech foundations such as 'Xingtu,' 'Shujian,' 'Shuxin,' and a process center;",
          "Supported pre-sales with solutions and client demos, and established a standardized process from signing → delivery → ongoing operations."
        ],
        results: [
          "Built the real-estate **industry's first supply-chain mid-platform**, landing at Yuexiu Property as an industry benchmark;",
          "Drove 4 leading real-estate enterprises including Yuexiu and Huayuan to sign, hit a **50M RMB performance target**, and won the group's Outstanding Employee recognition;",
          "The incubated product foundation was reused across multiple group business lines, becoming group-level infrastructure."
        ]
      },
      {
        name: "Chuanyun Template Center",
        subtitle: "Low-code SaaS product",
        role: "Product Manager",
        period: "2019.01 — 2019.11",
        category: "Low-Code",
        background: "As a low-code platform, Chuanyun's common user problem was 'not knowing how to use it or what it can do,' leading to low DAU and weak channel conversion. By building an industry template center offering ready-to-use templates per industry, it lowered the onboarding barrier and improved conversion.",
        duties: [
          "Owned the template center's planning and delivery, designing the template classification system, the template-marketplace interaction flow, and a one-click deployment mechanism;",
          "Conducted in-depth customer research across manufacturing, education, retail, and other industries, distilling common needs into industry template solutions and methodology;",
          "Accompanied nationwide service-provider client visits and demos, improving channel and direct-sales conversion efficiency."
        ],
        results: [
          "After the template center launched, product **DAU rose from 10% to 45%**;",
          "Conversion in my industries rose from 5% to 15%; combined channel conversion reached 30%; direct-sales conversion rose from 20% to 32%;",
          "Personal client-visit lead conversion reached 50%, distilling a replicable industry-expansion playbook."
        ]
      },
      {
        name: "Niannianka Payment Platform",
        subtitle: "Mobile product",
        role: "Product Manager",
        period: "2015.11 — 2016.06",
        category: "Mobile",
        background: "The core business relied on offline agents distributing payment services — cumbersome processes, slow settlement, and hard reconciliation. An internet payment platform was needed to connect individual users and agents through mobile.",
        duties: [
          "Owned the payment-platform app's planning and feature design, completing the core flows (top-up, payment, withdrawal, reconciliation) and interaction definitions for both the user and agent sides;",
          "Coordinated resources across operations, tech, and finance to deliver and launch the project on schedule;",
          "Continuously optimized the payment-flow experience and exception-handling mechanism based on user feedback."
        ],
        results: [
          "Delivered all features on schedule, enabling seamless transactions between users and agents, with **payment settlement time cut from T+3 to real-time**."
        ]
      }
    ],
    skills: [
      {
        group: "AI & LLM",
        items: ["LLM applications", "AI Agents", "Multi-agent collaboration", "MCP protocol", "Knowledge-base RAG", "Multi-model gateway", "Tiered memory system", "Multimodal extraction", "Prompt caching & cost control", "Natural-language task flows", "Agent orchestration runtime"]
      },
      {
        group: "Product & Commercialization",
        items: ["toB/SaaS product strategy", "0→1 product incubation", "PRD & requirements", "Competitive analysis", "Commercialization-path design", "Pre-sales & client demos", "Closed business loop (sign–deliver–renew)", "Low-code platforms", "BI analytics"]
      },
      {
        group: "Domains",
        items: ["Fresh supply chain", "Chain retail", "Smart property customer service", "Supply chain finance", "Supply chain mid-platform", "Enterprise collaboration (OA)"]
      },
      {
        group: "Team & Collaboration",
        items: ["Cross-functional team building (product + front/back-end + algorithm + design)", "20+ person team management", "Agile Sprints", "TDD & spec-driven development", "Open-source community ops", "Cross-department coordination"]
      }
    ]
  }
};
