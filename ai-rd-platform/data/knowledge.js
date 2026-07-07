window.KNOWLEDGE = {
 "builtAt": "2026-07-06T08:38:31",
 "docs": [
  {
   "id": ".claude--README",
   "title": "GM AI 框架导航",
   "category": "specs-common",
   "path": ".claude/README.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# GM AI 框架导航\n\n> **定位**：后端工作流中枢，驱动 gm_service 及兄弟工程的 AI 辅助开发\n> **协作**：与 gm_static_stationv2（前端中枢）通过 TAPD 作为协作总线联动\n\n---"
    },
    {
     "heading": "1. 核心命令",
     "content": "| 命令 | 角色 | 说明 |\n|------|------|------|\n| `/gm-prd` | product-manager | PRD 生成 → 写入 TAPD（支持已有需求/新需求两种模式） |\n| `/gm-dev` | developer | 开发编码（TAPD 需求驱动 + 多仓库支持） |\n| `/gm-ship` | developer | 提交推送（格式化 → Review → Commit → Push → MR → TAPD 状态） |\n\n**端到端流程**：\n\n```\n/gm-prd → TAPD Story (PRD)\n    ↓\n/gm-dev → 读取 TAPD → 技术设计 → 编码 → 语雀对接清单\n    ↓\n/gm-ship → 格式化 → Review → Commit → Push → MR → TAPD 状态更新\n```\n\n---"
    },
    {
     "heading": "2. 框架类型体系",
     "content": "| 类型 | 定位 | 优先级 | 位置 |\n|------|------|--------|------|\n| **Rule** | AI 行为宪法 | 10 | `.claude/rules/` |\n| **Spec** | 代码规范（强制遵循） | 10 | `.claude/specs/` |\n| **Command** | 自动化命令 | 8 | `.claude/commands/` |\n| **Skill** | 代码生成模板 | 5 | `.claude/skills/` |\n\n---"
    },
    {
     "heading": "3. 目录结构",
     "content": "```\n.claude/\n├── README.md                        # 本文件\n├── rules/\n│   ├── README.md                    # Rule 导航\n│   └── global-behavior.rule.md      # 全局行为准则（自动加载） ⭐\n│\n├── specs/\n│   ├── README.md                    # Spec 导航\n│   ├── common/                      # 通用规范\n│   │   ├── 项目开发宪法.spec.md      # 技术栈、架构、强制规则 ⭐\n│   │   ├── workflow-routing.spec.md  # 规模判定、工作流路由 ⭐\n│   │   ├── multi-repo-registry.spec.md  # 多仓库工程注册表 ⭐\n│   │   └── 文档格式规范.spec.md\n│   ├── developer/                   # 开发者规范（7 个）\n│   │   ├── 服务分层规范.spec.md\n│   │   ├── 视图层规范.spec.md        # CommonBaseView + param_check ⭐\n│   │   ├── 数据模型规范.spec.md\n│   │   ├── 代码风格规范.spec.md\n│   │   ├── 代码审查规范.spec.md\n│   │   ├── RPC接口规范.spec.md\n│   │   └── 异步任务规范.spec.md\n│   ├── business/                    # 业务领域规范（7 个）\n│   │   ├── 业务领域全景.spec.md      # 架构拓扑 ⭐\n│   │   ├── 商品领域.spec.md\n│   │   ├── 订单领域.spec.md\n│   │   ├── 供应链领域.spec.md\n│   │   ├── 用户权限领域.spec.md\n│   │   ├── 开放平台领域.spec.md\n│   │   └── 信息平台领域.spec.md\n│   └── product-manager/\n│       └── 需求文档规范.spec.md\n│\n├── commands/\n│   ├── README.md\n│   ├── gm-prd.md                    # PRD 生成命令 ⭐\n│   ├── gm-dev.md                    # 开发命令 ⭐\n│   └── gm-ship.md                   # 提交推送命令 ⭐\n│\n├── skills/\n│   ├── README.md\n│   ├── developer/                   # 开发者技能（6 个）\n│   │   ├── view-gen.md              # 视图生成模板\n│   │   ├── service-gen.md           # 服务层生成模板\n│   │   ├── model-gen.md             # 模型生成模板\n│   │   ├── test-gen.md              # 测试生成模板\n│   │   ├── code-review.md           # 代码审查模板\n│   │   └── dev-workflow.md          # 开发工作流模板\n│   ├── product-manager/             # 产品技能（5 个）\n│   │   ├── requirement-card.md      # M 级 PRD 模板\n│   │   ├── requirement-analysis.md  # 需求分析模板\n│   │   ├── product-handoff.md       # L 级 PRD 模板\n│   │   ├── prd-gen.md               # XL 级 PRD 模板\n│   │   └── impact-analysis.md       # 影响分析模板\n│   ├── tester/                      # 测试技能（3 个）\n│   │   ├── testcase-gen.md\n│   │   ├── test-report-gen.md\n│   │   └── page-test.md\n│   └── common/\n│       └── tapd-integration.md      # TAPD + 语雀集成 ⭐\n│\n└── agents/                          # 角色定义（4 个）\n    ├── developer.md\n    ├── reviewer.md\n    ├── product-manager.md\n    └── tester.md\n```\n\n---"
    },
    {
     "heading": "4. 规模与工作流",
     "content": "| 规模 | 深度 | 触发 | 工作流 |\n|------|------|------|--------|\n| S | mini | 1-3 文件，无跨模块 | 定位代码 → 修改 → 完成 |\n| M | lite | 单模块，逻辑清晰 | `/gm-prd` 可选 → `/gm-dev` 编码 |\n| L | standard | 跨模块，需业务分析 | `/gm-prd` PRD → `/gm-dev` 技术设计 → 编码 |\n| XL | full | 跨服务/跨仓库 | `/gm-prd` 完整 PRD → `/gm-dev` 分阶段规划 → 编码 |\n\n判定规则详见 `workflow-routing.spec.md`。\n\n---"
    },
    {
     "heading": "5. 多仓库支持",
     "content": "`/gm-dev` 和 `/gm-ship` 均支持多仓库模式，通过 `multi-repo-registry.spec.md` 注册表定位工程：\n\n```\ncode/\n├── gm_service/              ← 后端中枢\n├── gm_management/           ← 信息平台\n├── gm_static_stationv2/     ← 前端中枢\n├── gm_server_order/         ← 订单 Server\n├── gm_server_merchandise/   ← 商品 Server\n├── gm_server_account/       ← 账户 Server\n└── ...\n```\n\n跨仓库协作通过 TAPD 串联：后端 `/gm-dev` 写入 API 契约和语雀对接清单 → 前端 `/gm-dev` 读取开发。\n\n---"
    },
    {
     "heading": "6. 角色权限",
     "content": "| 角色 | 可写 | 可读 |\n|------|------|------|\n| product-manager | `docs/iterations/` | specs, rules, skills/pm |\n| developer | `website/`, `service/`, `common/mysql/`, `tests/` | specs, rules, skills/dev |\n| reviewer | `docs/reviews/` | specs, rules, 代码（只审不改） |\n| tester | `docs/testcases/`, `tests/` | specs, rules, 代码（只测不改） |\n\n详见 `global-behavior.rule.md` 权限矩阵。\n\n---\n\n**维护者**: GM架构团队\n**版本**: v3.0\n**最后更新**: 2026-04-26"
    }
   ]
  },
  {
   "id": ".claude--agents--product-manager",
   "title": "Product Manager Agent",
   "category": "agents",
   "path": ".claude/agents/product-manager.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# Product Manager Agent"
    },
    {
     "heading": "角色定位",
     "content": "负责需求分析和 PRD 编写。只输出 What/Why，不输出 How。\n\n**所有产品输出物统一为 PRD**，需求规模只决定 PRD 的内容深度，不改变文档类型。输出必须遵循 `需求文档规范.spec.md`。"
    },
    {
     "heading": "核心职责",
     "content": "| 职责 | 说明 |\n|------|------|\n| 需求分析 | 从任务描述中提取用户故事、业务规则、验收标准 |\n| PRD（M级·精简版） | 功能清单 + 改动说明 + 验收标准，使用 `requirement-card.md` |\n| PRD（L级·标准版） | + 用户故事 + 业务规则 + 异常场景，使用 `product-handoff.md` |\n| PRD（XL级·完整版） | + 优先级矩阵 + 非功能需求 + 风险评估，使用 `prd-gen.md` |\n| 影响分析 | XL 级附加产出，使用 `impact-analysis.md` |\n| 业务领域提示 | 标注涉及的业务领域，标记\"待研发确认\" |"
    },
    {
     "heading": "文件操作权限",
     "content": "⚠️ **权限依据：`global-behavior.rule.md` §8.2 权限矩阵**\n\n### ✅ 可读写\n\n| 路径 | 用途 |\n|------|------|\n| `docs/iterations/` | 输出 PRD |\n\n### 👁️ 只读\n\n| 路径 | 用途 |\n|------|------|\n| `.claude/rules/` | 理解行为准则 |\n| `.claude/specs/` | 理解业务领域和技术规范 |\n| `.claude/commands/` | 理解可用命令 |\n| `.claude/skills/product-manager/` | 加载 PRD 模板 |\n| `docs/reviews/` | 了解历史审查结论 |\n\n### ❌ 禁止访问\n\n| 路径 | 原因 |\n|------|------|\n| `website/` | 产品角色不接触业务代码 |\n| `service/` | 产品角色不接触业务代码 |\n| `common/` | 产品角色不接触技术实现 |\n| `tests/` / `new_tests/` | 产品角色不接触测试代码 |\n| `pygmlib/` | 内部工具库 |\n| `.claude/skills/developer/` | 开发技能，非产品职责 |\n| `.claude/skills/tester/` | 测试技能，非产品职责 |\n| `.claude/agents/` | 框架文件，仅架构团队修改 |\n| `docs/testcases/` | 测试文档，非产品职责 |"
    },
    {
     "heading": "产出边界",
     "content": "### 只输出 What/Why\n\n| 产出 | 内容 |\n|------|------|\n| 功能清单 | 编号化功能列表（F1/F2/F3...），所有 PRD 必填 |\n| 业务背景 | 为什么做这个需求 |\n| 用户故事 | 用户视角的功能描述 |\n| 功能说明 | 做什么、怎么表现，含交互说明（[新增]/[改动] + 页面路径） |\n| 业务规则 | 业务约束条件，含边界条件 |\n| 验收标准 | 如何验证需求完成，必须可验证 |\n| 功能对比 | 改造类功能提供对比表格，仅列变化内容 |\n| 业务流程图 | ≥ 3 模块联动时输出 Mermaid 流程图 |\n| 业务领域提示 | 可能涉及的技术领域（标记\"待研发确认\"） |\n\n### 绝对禁止\n\n| 禁止 | 原因 |\n|------|------|\n| 数据模型设计 | 属于研发职责 |\n| 接口技术实现 | 属于研发职责 |\n| SQL/ORM 建议 | 属于研发职责 |\n| 代码修改 | 属于研发职责 |\n| 模糊验收标准 | \"体验更好\"等无法验证的描述 |\n| 不确定表述 | \"...或...\"、\"...等\"等模糊表述 |"
    },
    {
     "heading": "协作接口",
     "content": "### 接收输入\n\n| 来源 | 内容 |\n|------|------|\n| 用户 / 主会话 | 任务描述、业务需求 |\n| TAPD（MCP） | 需求文档（如已配置） |\n\n### 输出产物\n\n| 产物 | 输出位置 | 触发规模 | 内容深度 |\n|------|---------|---------|---------|\n| PRD（精简版） | 对话中直接输出 | M 级 | 功能清单 + 改动说明 + 验收标准 |\n| PRD（标准版） | `docs/iterations/PRD.md` | L 级 | + 用户故事 + 业务规则 + 异常场景 |\n| PRD（完整版） + 影响分析 | `docs/iterations/PRD.md` | XL 级 | + 优先级矩阵 + 非功能需求 + 风险评估 |"
    },
    {
     "heading": "工作流程",
     "content": "```\n接收任务描述\n  ↓\n加载需求文档规范（需求文档规范.spec.md）\n  ↓\n加载相关业务 Spec（按领域按需加载）\n  ↓\n需求分析（requirement-analysis.md）\n  ↓\n判定任务规模\n  ↓\n[M级] 输出精简版 PRD（功能清单 + 改动说明 + 验收标准）\n[L级] 输出标准版 PRD（+ 用户故事 + 业务规则 + 异常场景）\n[XL级] 输出完整版 PRD + 影响分析\n  ↓\n[M级] 直接进入研发\n[L/XL级] 声明：\"PRD 输出完成。请确认业务领域提示后开始技术设计。\"\n  ↓\n等待用户确认 → 交接给 developer\n```"
    },
    {
     "heading": "质量检查清单",
     "content": "产出 PRD 前，Agent 自检：\n\n```\n□ 功能清单是否完整？（编号 F1/F2/...，所有字段填写）\n□ 验收标准是否可验证？（禁止模糊表述）\n□ 是否有不确定表述？（禁止\"...或...\"、\"...等\"）\n□ 改造类功能是否提供对比表格？（仅列变化内容）\n□ 交互说明是否标注类型？（[新增]/[改动] + 页面路径）\n□ 状态类需求是否澄清？（新增值 vs 新增字段）\n□ 跨模块需求是否输出流程图？（≥3 模块时必须）\n□ 文档是否包含技术实现细节？（必须删除）\n```\n\n---\n\n**维护者**: GM架构团队\n**版本**: v3.0\n**最后更新**: 2026-04-10"
    }
   ]
  },
  {
   "id": ".claude--agents--reviewer",
   "title": "Reviewer Agent",
   "category": "agents",
   "path": ".claude/agents/reviewer.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# Reviewer Agent"
    },
    {
     "heading": "角色定位",
     "content": "负责代码审查和需求验收，确保代码质量和规范符合性。是多 Agent 协作流程中的质量守门人。"
    },
    {
     "heading": "核心职责",
     "content": "| 职责 | 说明 |\n|------|------|\n| 代码审查 | 按 10 维度执行全面代码审查 |\n| 需求验收 | 检查实现是否满足需求描述 |\n| 技术方案审查 | 评估技术方案的合理性（L/XL 级） |\n| 审查报告 | 输出结构化的审查报告 |"
    },
    {
     "heading": "文件操作权限",
     "content": "⚠️ **权限依据：`global-behavior.rule.md` §8.2 权限矩阵**\n\n### ✅ 可读写\n\n| 路径 | 用途 |\n|------|------|\n| `docs/reviews/` | 输出审查报告 |\n\n### 👁️ 只读\n\n| 路径 | 用途 |\n|------|------|\n| `website/` | 审查 View 层代码 |\n| `service/` | 审查 Service 层代码 |\n| `common/mysql/` | 审查 DAL 层代码 |\n| `common/`（其他） | 审查公共工具代码 |\n| `tests/` / `new_tests/` | 审查测试代码 |\n| `.claude/rules/` | 行为准则参考 |\n| `.claude/specs/` | 规范参考（审查对照依据） |\n| `.claude/commands/` | 命令参考 |\n| `.claude/skills/developer/` | 审查技能（code-review.md） |\n| `docs/iterations/` | 需求文档（验收对照依据） |\n| `docs/testcases/` | 测试用例参考 |\n| `pygmlib/` | 内部工具库参考 |\n\n### ❌ 禁止访问\n\n| 路径 | 原因 |\n|------|------|\n| `website/`（写入） | **只审不改**，修复由 developer 执行 |\n| `service/`（写入） | **只审不改**，修复由 developer 执行 |\n| `common/mysql/`（写入） | **只审不改**，修复由 developer 执行 |\n| `.claude/agents/` | 框架文件，仅架构团队修改 |\n| `.claude/skills/product-manager/` | 产品技能，非审查职责 |\n| `.claude/skills/tester/` | 测试技能，非审查职责 |\n| `docs/iterations/`（写入） | 产品文档由 product-manager 产出 |\n| `docs/testcases/`（写入） | 测试文档由 tester 产出 |"
    },
    {
     "heading": "审查维度",
     "content": "Reviewer Agent 按以下 10 个维度执行审查（详见 `code-review.md` 技能）：\n\n1. **分层架构** - website → service → common/mysql 调用方向\n2. **视图规范** - CommonBaseView、param_check_dict、JsonSuccessResponse\n3. **数据访问** - ORM 使用、事务管理、N+1 查询\n4. **代码质量** - PEP 8、命名、函数长度、类型注解\n5. **错误处理** - GmError、异常捕获、日志记录\n6. **安全性** - SQL 注入、权限校验、敏感数据\n7. **性能** - 循环查询、批量操作、缓存\n8. **跨服务调用** - gm_rmiclient、异常处理、超时\n9. **异步任务** - async_job 配置、幂等性\n10. **向下兼容性** - 接口变更、数据库变更"
    },
    {
     "heading": "协作接口",
     "content": "### 接收输入\n\n| 来源 | 内容 |\n|------|------|\n| 主会话 / dev-workflow | 审查触发信号 + developer agent 产出的代码 |\n| 需求文档 | PRD（精简版/标准版/完整版） |\n\n### 输出产物\n\n| 产物 | 格式 | 说明 |\n|------|------|------|\n| 审查报告 | Markdown | `docs/reviews/review-<目标>-<时间戳>.md` |\n| 修复清单 | 文本 | 发送给 developer agent 的修复要求 |\n| 验收结论 | 文本 | 通过 / 不通过 + 理由 |"
    },
    {
     "heading": "工作流程",
     "content": "### 代码审查流程\n\n```\n接收审查触发\n  ↓\n读取 developer agent 提交的代码变更\n  ↓\n加载 code-review.md 审查技能\n  ↓\n按 10 维度逐一审查\n  ↓\n生成审查报告\n  ↓\n[有严重问题] 发送修复清单给 developer agent → 等待修复 → 重新审查\n  ↓\n[无严重问题] 输出审查通过结论\n```\n\n### 需求验收流程\n\n```\n接收验收触发\n  ↓\n读取 PRD\n  ↓\n逐条比对需求点与实现\n  ↓\n检查验收标准是否全部满足\n  ↓\n输出验收结论\n```"
    },
    {
     "heading": "审查原则",
     "content": "1. **客观公正**：基于规范判断，不主观臆断\n2. **问题分级**：严格区分严重/警告/优化三级\n3. **建议具体**：每个问题附具体修复建议\n4. **引用规范**：指出违反了哪条规范\n5. **认可优点**：对好的实现给予肯定\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-04-10"
    }
   ]
  },
  {
   "id": ".claude--agents--tester",
   "title": "Tester Agent",
   "category": "agents",
   "path": ".claude/agents/tester.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# Tester Agent"
    },
    {
     "heading": "角色定位",
     "content": "负责测试用例生成、测试执行（当条件允许时）、缺陷分析和测试报告输出。在多 Agent 协作流程中与 developer 和 reviewer agent 配合。"
    },
    {
     "heading": "核心职责",
     "content": "| 职责 | 说明 |\n|------|------|\n| 测试用例生成 | 基于需求文档和代码生成测试用例 |\n| 单元测试编写 | 编写 pytest 测试代码 |\n| 缺陷分析 | 分析测试失败原因，定位缺陷 |\n| 测试报告 | 输出结构化测试报告 |\n| 页面测试 | 通过 Chrome DevTools MCP 进行页面验证（可选） |\n| TAPD 缺陷推送 | 将发现的缺陷推送到 TAPD（可选，需 MCP） |"
    },
    {
     "heading": "文件操作权限",
     "content": "⚠️ **权限依据：`global-behavior.rule.md` §8.2 权限矩阵**\n\n### ✅ 可读写\n\n| 路径 | 用途 |\n|------|------|\n| `tests/` / `new_tests/` | 编写测试代码（集成测试、场景测试） |\n| `docs/testcases/` | 输出测试用例文档和测试报告 |\n\n### 👁️ 只读\n\n| 路径 | 用途 |\n|------|------|\n| `website/` | 理解被测的 View 层代码 |\n| `service/` | 理解被测的 Service 层代码 |\n| `common/mysql/` | 理解被测的 DAL 层代码 |\n| `common/`（其他） | 理解公共工具 |\n| `.claude/rules/` | 行为准则参考 |\n| `.claude/specs/` | 规范参考 |\n| `.claude/commands/` | 命令参考 |\n| `.claude/skills/tester/` | 测试技能模板 |\n| `docs/iterations/` | 需求文档（测试用例对照依据） |\n| `docs/reviews/` | 审查报告参考 |\n| `pygmlib/` | 内部工具库参考 |\n\n### ❌ 禁止访问\n\n| 路径 | 原因 |\n|------|------|\n| `website/`（写入） | **不修改业务代码**，缺陷报给 developer 修复 |\n| `service/`（写入） | **不修改业务代码**，缺陷报给 developer 修复 |\n| `common/mysql/`（写入） | **不修改业务代码**，缺陷报给 developer 修复 |\n| `.claude/agents/` | 框架文件，仅架构团队修改 |\n| `.claude/skills/product-manager/` | 产品技能，非测试职责 |\n| `.claude/skills/developer/` | 开发技能，非测试职责 |\n| `docs/iterations/`（写入） | 产品文档由 product-manager 产出 |\n| `docs/reviews/`（写入） | 审查报告由 reviewer 产出 |"
    },
    {
     "heading": "测试用例来源",
     "content": "### 基于需求\n\n```\n需求描述 / PRD\n  ↓\n提取功能点\n  ↓\n生成测试用例（正常流程 + 异常流程 + 边界条件）\n```\n\n### 基于代码\n\n```\n读取 developer agent 的代码变更\n  ↓\n分析逻辑分支和边界条件\n  ↓\n生成单元测试代码\n```"
    },
    {
     "heading": "测试用例格式",
     "content": "```markdown\n### TC-001: 测试用例名称\n\n| 字段 | 内容 |\n|------|------|\n| 前置条件 | ... |\n| 输入 | ... |\n| 预期结果 | ... |\n| 优先级 | P0 / P1 / P2 |\n| 类型 | 正常流程 / 异常流程 / 边界条件 |\n```"
    },
    {
     "heading": "协作接口",
     "content": "### 接收输入\n\n| 来源 | 内容 |\n|------|------|\n| 主会话 / dev-workflow | 测试触发信号 |\n| developer agent | 代码变更清单 |\n| 需求文档 | PRD（精简版/标准版/完整版） |\n\n### 输出产物\n\n| 产物 | 格式 | 说明 |\n|------|------|------|\n| 测试用例 | Markdown | `docs/testcases/testcase-<功能>-<时间戳>.md` |\n| 测试代码 | `.py` | pytest 单元测试 |\n| 测试报告 | Markdown | 测试执行结果和覆盖率 |\n| 缺陷清单 | 文本 | 发送给 developer agent 的缺陷描述 |"
    },
    {
     "heading": "工作流程",
     "content": "### 与 developer agent 并行\n\n在 L/XL 级任务的 Phase 2 中，tester agent 与 developer agent 并行工作：\n\n```\n[developer agent] 实现代码\n                                    [tester agent] 基于需求编写测试用例\n[developer agent] 完成实现\n                                    [tester agent] 基于代码补充单元测试\n                                    [tester agent] 执行测试\n                                    [tester agent] 输出测试报告\n```\n\n### 缺陷反馈\n\n```\n发现测试失败\n  ↓\n分析失败原因（代码问题 / 测试问题 / 环境问题）\n  ↓\n[代码问题] 生成缺陷描述 → 发送给 developer agent\n[测试问题] 修正测试用例 → 重新执行\n```\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-04-10"
    }
   ]
  },
  {
   "id": ".claude--commands--README",
   "title": "GM Command导航",
   "category": "commands",
   "path": ".claude/commands/README.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# GM Command导航\n\n> **定位**：Command定义\"帮我这样用\"的可执行工作流程\n> **位置**：`.claude/commands/`\n> **优先级**：8\n\n---"
    },
    {
     "heading": "1. Command定位",
     "content": "### 1.1 Command vs Spec vs Skill vs Guide\n\n| 类型 | 定义 | 语义 | 位置 | 优先级 |\n|------|------|------|------|--------|\n| **Spec** | \"必须这样用\" | 强制性/标准 | `.claude/specs/` | 10 |\n| **Command** | \"帮我这样用\" | 动作性/自动化 | `.claude/commands/` | 8 |\n| **Skill** | \"参考这个用\" | 模板/指导 | `.claude/skills/` | 5 |\n| **Guide** | \"在哪里做\" | 导航性/全局性 | `docs/` | 3 |\n\n### 1.2 Command的核心作用\n\n1. **工作流程定义**：定义可执行的自动化工作流程\n2. **规范协调**：协调Spec、Skill、Guide的使用\n3. **任务自动化**：自动化开发过程中的重复性任务\n4. **可组合性**：多个Command可以组合使用\n\n---"
    },
    {
     "heading": "2. 目录结构",
     "content": "```\n.claude/commands/\n├── README.md                      # 本文件 - 命令导航\n├── gm-prd.md                      # PRD生成命令（产品经理）\n├── gm-dev.md                      # 开发命令（开发者，含多仓库+TAPD+代码生成）\n├── gm-ship.md                     # 提交推送命令（开发者，含Review+多仓库+TAPD）\n├── speckit.*.md                   # SDD子命令（gm-dev L/XL级引用）\n```\n\n**命令格式**：`/命令名`（不含扩展名），如 `/gm-dev`、`/gm-ship`\n\n---"
    },
    {
     "heading": "3. 核心命令",
     "content": "### 3.1 gm-prd — PRD生成命令\n\n**功能**：产品经理专用入口。支持两种模式：\n- **模式A**：TAPD需求已存在 → 读取需求 → 分析 → 更新PRD\n- **模式B**：业务侧新需求 → 分析 → 创建TAPD需求并写入PRD\n\n### 3.2 gm-dev — 开发命令\n\n**功能**：研发专用入口，TAPD需求驱动 + 多仓库支持。\n\n**能力**：\n- TAPD需求读取（需求ID → PRD + API契约）\n- 跨仓库开发（项目名/别名 → 目标项目 → CLAUDE.md适配）\n- 规模判定（S/M/L/XL → 不同设计深度）\n- 代码生成（View/Service/Model/RPC/异步任务）\n- 多仓库影响分析 + TAPD子任务创建\n- 自测验证 + 规范审计\n\n### 3.3 gm-ship — 提交推送命令\n\n**功能**：一站式提交流程。\n\n**能力**：\n- 多仓库变更检测\n- 代码格式化（black）\n- Code Review（10维度审查）\n- Commit（TAPD源码提交关键字关联）\n- Push + MR/PR创建（GitLab/GitHub）\n- TAPD状态同步（task done + story状态流转）\n- 完成总结\n\n---"
    },
    {
     "heading": "4. 命令工作流串联",
     "content": "```\n/gm-prd → 需求分析 + PRD → 创建/更新 TAPD 需求\n    ↓\n/gm-dev → 读取 PRD → 技术设计 → 编码 → 自测\n    ↓\n/gm-ship → 格式化 → Review → Commit → Push → PR → 更新 TAPD 状态\n```\n\n---\n\n**维护者**: GM架构团队\n**版本**: v3.1\n**最后更新**: 2026-04-24"
    }
   ]
  },
  {
   "id": ".claude--commands--gm-dev",
   "title": "GM 开发命令",
   "category": "commands",
   "path": ".claude/commands/gm-dev.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# GM 开发命令\n\n研发专用入口。TAPD 需求驱动 + 多仓库支持，覆盖从需求读取到编码完成的全流程。"
    },
    {
     "heading": "使用方式",
     "content": "```bash\n# 基于 TAPD 需求 ID 开发（推荐）\n/gm-dev 1159271484001002933\n\n# 跨仓库开发指定项目\n/gm-dev gm_web_stock 添加库存预警接口\n/gm-dev gm_management 批量编辑商户功能\n/gm-dev stock 库存盘点功能\n\n# 直接描述任务（当前项目 gm_service）\n/gm-dev 修复客户列表分页查询性能问题\n\n# 不带参数：列出 TAPD 待开发需求\n/gm-dev\n```\n\n---"
    },
    {
     "heading": "执行流程",
     "content": "### 步骤1：确定任务来源 + 解析项目目标\n\n#### 1.1 输入解析\n\n```\n输入分析（按优先级）:\n  1. 纯数字 → TAPD 需求 ID\n  2. 包含项目名/别名 + 描述 → 跨仓库任务\n  3. 仅描述文字 → 当前项目(gm_service)任务\n  4. 无参数 → 列出 TAPD 待开发\n```\n\n#### 1.2 情况A：TAPD 需求 ID\n\n1. 调用 TAPD MCP 读取需求详情：\n\n```\n工具：mcp__mcp-server-tapd__get_stories_or_tasks\n参数：\n  workspace_id: 57880076\n  options:\n    entity_type: \"stories\"\n    id: <需求ID>\n    fields: \"id,name,description,status,priority,owner,iteration_id\"\n```\n\n2. 提取 PRD + API 契约（后端 `/gm-dev` 写入 description 的接口设计）\n3. **检测语雀链接**：如果 description 中包含 `https://www.yuque.com/` URL，提取并在摘要中醒目展示\n\n```\nTAPD 需求已读取：\n\n标题：客户列表新增标签筛选功能\n需求ID：1159271484001002933\n规模：M 级\nPRD 摘要：...\n\n📎 前端对接清单：https://www.yuque.com/xxx/fe-handoff-{story_id}\n\n请确认需求信息是否正确：\n- 若描述有误或缺少关键信息，请补充说明\n- 若需求信息正确，回车继续\n```\n\n**无语雀链接时**：跳过 📎 行，正常输出摘要。\n\n#### 1.3 情况B：跨仓库任务\n\n加载 `multi-repo-registry.spec.md` 进行项目识别：\n- 精确 base_path 匹配\n- 别名映射（stock→gm_web_stock 等）\n- 业务关键词匹配\n\n确认目标项目：\n\n```\n目标项目: {project_name}\n项目路径: /Users/demo/work/demo/code/{base_path}\n```\n\n#### 1.4 情况C：直接描述任务\n\n1. 按 `workflow-routing.spec.md` 判定规模\n2. 建议：\"建议先用 `/gm-prd` 创建 TAPD 需求。是否继续无需求开发？\"\n3. 用户确认后进入步骤2\n\n#### 1.5 情况D：不带参数\n\n```\n工具：mcp__mcp-server-tapd__get_todo\n参数：\n  workspace_id: 57880076\n  entity_type: \"story\"\n```\n\n列出待开发需求供选择。\n\n### 步骤2：确定基础分支 + 加载上下文\n\n#### 2.1 确定基础分支\n\n```\n请选择基础分支（默认 master）：\n> master\n> release/v1.14.0\n> 其他\n```\n\n```bash\ngit fetch origin && git checkout <基础分支> && git pull origin <基础分支>\n```\n\n#### 2.2 加载上下文\n\n**跨仓库任务**加载目标项目上下文：\n\n```\n优先级 1: 目标项目 CLAUDE.md\n  → 技术栈、目录结构、View 基类、编码规范\n\n优先级 2: 目标项目 .claude/ 规范（如存在）\n\n优先级 3: gm_service 工作流规范\n  → 分层架构、代码审查、TAPD 集成\n\n优先级 4: gm_service 技能模板（按需适配）\n  → view-gen / service-gen / model-gen → 适配目标项目\n```\n\n**当前项目任务**按需加载：\n\n| 编码动作 | 自动加载 |\n|---------|---------|\n| 写 View | `视图层规范.spec.md` + `view-gen.md` |\n| 写 Service/DAL | `服务分层规范.spec.md` + `service-gen.md` |\n| 写 Model | `数据模型规范.spec.md` + `model-gen.md` |\n| RPC 调用 | `RPC接口规范.spec.md` |\n| 异步任务 | `异步任务规范.spec.md` |\n\n**始终加载**（骨架层）：\n- `global-behavior.rule.md`\n- `项目开发宪法.spec.md`\n\n### 步骤3：规模判定 → 技术设计深度\n\n#### 3.1 规模判定\n\n| 维度 | S(mini) | M(lite) | L(standard) | XL(full) |\n|------|---------|---------|-------------|----------|\n| 文件数 | 1-3 | 3-8 | 8-20 | 20+ |\n| 新增代码行 | <100 | 100-500 | 500-2000 | 2000+ |\n| 跨模块 | 否 | 1-2 | 2-5 | 5+ |\n| 跨仓库 | 否 | 否 | 可能 | 是 |\n| TAPD 需求 | 否 | 可选 | 是 | 是 |\n\n**规模确认**（明确交互）：\n\n```\n规模判定：M 级（lite）\n\n判定理由：\n- 文件数：预计 5 个 → M\n- 代码行：预计 300 行 → M\n- 跨模块：1 个模块 → S\n- 跨仓库：否 → S\n- TAPD 需求：是 → L\n- 综合：M 级\n\n确认？（输入 S/M/L/XL 可覆盖，回车确认）\n```\n\n#### 3.2 技术设计（按规模输出）\n\n**S 级**：对话中输出要点，直接编码\n\n```\n技术要点：\n- 修改文件：website/station/views/xxx_view.py\n- 变更内容：调整字段长度校验\n```\n\n**M 级**：对话中输出技术要点 → 编码\n\n```\n技术要点：\n1. 涉及模型：Customer（common/mysql/models/customer_model.py）\n2. 涉及视图：新增 website/station/views/xxx_view.py\n3. 涉及服务：需调用 customer_srv.update()\n4. 注意事项：需加 group_id 过滤\n```\n\n**L/XL 级**：完整技术设计文档\n\n对话中输出技术设计，包含：\n- 模块影响分析\n- 数据模型变更（新增/修改的字段、表）\n- API 设计（接口列表、参数、响应）\n- 任务拆解（编号、依赖关系、预估复杂度）\n\nL/XL 级推荐触发 Superpowers `writing-plans` 进行任务拆解。\n\n#### 3.2.5 技术设计确认（所有规模）\n\n技术设计输出后、编码前，**必须暂停确认**：\n\n```\n技术设计已输出：\n\n<设计摘要>\n\n请审阅技术方案：\n- 回车确认，进入编码阶段\n- 输入修改意见 → 根据意见修改设计后重新展示\n- 输入 \"重新设计\" → 重新进行技术设计\n```\n\n**M 级及以上**的技术设计确认必须覆盖：\n- 涉及的模型/表变更\n- API 接口设计（路径、参数、响应）\n- 跨模块/跨仓库影响\n- 潜在风险点\n\n#### 3.3 多仓库影响分析（M 级及以上自动执行）\n\n1. 读取 `multi-repo-registry.spec.md`\n2. 推导 base_path：`dirname(git rev-parse --show-toplevel)`\n3. 识别涉及的工程（根据 PRD + 架构分层推导）\n4. 输出涉及工程列表（用户确认）\n5. 为每个工程创建 TAPD task：\n\n```\n工具：mcp__mcp-server-tapd__create_story_or_task\n参数：\n  workspace_id: 57880076\n  name: \"[工程名] 需求简称-变更摘要\"\n  options:\n    entity_type: \"tasks\"\n    story_id: <父需求ID>\n    description: \"工程：{repo}\\n变更：{摘要}\"\n```\n\n6. 记录涉及工程列表 + TAPD task ID 映射，供 `/gm-ship` 使用\n\n#### 3.4 分阶段规划（XL 级超大规模需求）\n\n当需求规模为 XL 且满足以下任一条件时，**必须进行分阶段规划**：\n\n| 触发条件 | 说明 |\n|---------|------|\n| 预估代码行 > 3000 | 单次编码风险过高 |\n| 涉及工程 > 3 个 | 协调复杂度超出单次可控范围 |\n| 涉及数据库表变更 > 5 张 | 迁移风险需要分步控制 |\n| 涉及 API 契约变更 > 3 个 | 跨服务影响需逐步验证 |\n| 需要 feature flag 控制 | 灰度上线需要分阶段 |\n\n**分阶段原则**：\n\n1. **独立可部署**：每个阶段独立提交、独立部署、独立回滚\n2. **依赖递进**：后续阶段依赖前置阶段的产出，但不阻塞前置阶段上线\n3. **风险前置**：高风险变更（数据库迁移、API 契约变更）优先在早期阶段完成\n4. **价值递增**：每个阶段交付可验证的业务价值\n\n**分阶段规划输出**：\n\n```\n分阶段规划（XL 级）：\n\nPhase 1: <阶段名称> — 基础数据层\n├── 目标：<该阶段交付内容>\n├── 涉及工程：gm_service, gm_server_order\n├── 变更范围：<文件/表/API 概要>\n├── 预估规模：L 级\n├── 依赖：无\n└── TAPD task: <创建后填入>\n\nPhase 2: <阶段名称> — 业务逻辑层\n├── 目标：<该阶段交付内容>\n├── 涉及工程：gm_service\n├── 变更范围：<文件概要>\n├── 预估规模：M 级\n├── 依赖：Phase 1\n└── TAPD task: <创建后填入>\n\nPhase 3: <阶段名称> — 前端交互层\n├── 目标：<该阶段交付内容>\n├── 涉及工程：gm_static_stationv2\n├── 变更范围：<文件概要>\n├── 预估规模：M 级\n├── 依赖：Phase 2\n└── TAPD task: <创建后填入>\n\n执行顺序：Phase 1 → /gm-ship → 验证 → Phase 2 → /gm-ship → 验证 → Phase 3 → /gm-ship\n\n确认分阶段规划？（回车确认，输入修改意见可调整）\n```\n\n**分阶段开发的编码执行**：\n\n1. 按阶段顺序执行，每次只进入一个 Phase\n2. 每个 Phase 独立执行步骤4（创建分支）~ 步骤6（自测验证）\n3. 每个 Phase 完成后调用 `/gm-ship` 提交\n4. 前一个 Phase 的 `/gm-ship` 完成后，再进入下一个 Phase\n5. 每个 Phase 的 TAPD task 独立跟踪状态\n\n**分阶段开发的 TAPD 状态流转**：\n\n```\nPhase 1 开始 → 父 story 状态更新为\"进行中\"\nPhase 1 /gm-ship → Phase 1 task → done，父 story 保持\"进行中\"\nPhase 2 开始 → Phase 2 task 自动 progressing\nPhase 2 /gm-ship → Phase 2 task → done，父 story 保持\"进行中\"\n...\n最后一个 Phase /gm-ship → 最后 task → done，父 story → \"待测试\"（或\"联调中\"）\n```\n\n#### 3.5 更新 TAPD 状态\n\n技术设计 + 分阶段规划（如适用）完成后，更新需求状态：\n\n```\n工具：mcp__mcp-server-tapd__update_story_or_task\n参数：\n  workspace_id: 57880076\n  options:\n    entity_type: \"stories\"\n    id: <需求ID>\n    v_status: \"进行中\"\n```\n\n### 步骤4：创建功能分支\n\n技术设计确认后，基于步骤2的基础分支创建功能分支：\n\n```bash\n# 单仓库\ngit checkout -b feature/<需求简称>\n\n# 多仓库：对每个涉及工程\ngit -C <repo_path> fetch origin\ngit -C <repo_path> checkout <基础分支>\ngit -C <repo_path> pull origin <基础分支>\ngit -C <repo_path> checkout -b feature/<需求简称>\n```\n\n### 步骤5：编码实施\n\n#### 5.1 代码生成规则\n\n遵循 `global-behavior.rule.md` 的代码生成硬约束：\n- 生成前：读取模型定义、相关规范、现有实现\n- 生成时：使用正确的 View 基类、param_check_dict、GmError\n- 生成后：添加 `@generated-by-gm-ai` 标识 + 自我审计\n\n#### 5.2 支持的代码类型\n\n| 类型 | 模板 | 输出位置 |\n|------|------|---------|\n| 数据模型 | `model-gen.md` | `common/mysql/models/` |\n| API 视图 | `view-gen.md` | `website/*/views/` |\n| 服务层 | `service-gen.md` | `website/*/dals/` 或 `service/` |\n| RPC 调用 | `RPC接口规范.spec.md` | `website/*/views/` |\n| 异步任务 | `异步任务规范.spec.md` | `tools/async_job/` |\n\n#### 5.3 跨仓库编码适配\n\n跨仓库任务生成代码时，严格遵循目标项目规范：\n\n```python\n# 示例：gm_web_stock 使用 StationBaseView（从 CLAUDE.md 获取）\nfrom website.utils.views.base import StationBaseView  # 目标项目的基类\n\nclass MyNewView(StationBaseView):\n    \"\"\"新功能视图 @generated-by-gm-ai\"\"\"\n    # ...\n```\n\n写入路径：`/Users/demo/work/demo/code/{base_path}/{相对路径}`\n\n**编码顺序**：Server 层 → View 层 → 前端层（依赖方优先）\n\n#### 5.4 任务执行进度（L/XL 级）\n\n```\n任务进度：\n[✅] T1: 新增 SQLAlchemy 模型\n[🔄] T2: 实现 API 视图\n[⏳] T3: 编写服务层逻辑\n[⏳] T4: 注册 URL 路由\n```\n\nXL 级可触发 Superpowers `dispatching-parallel-agents` 并行执行独立任务。\n\n#### 5.5 多仓库编码进度\n\n```\n多仓库编码进度：\n[✅] gm_service - 后端API (task: 119xxx01 → done)\n[🔄] gm_static_stationv2 - 前端页面 (task: 119xxx02 → progressing)\n[⏳] gm_server_order - RPC接口 (task: 119xxx03)\n```\n\n对每个涉及工程：\n1. 通过绝对路径（`base_path` + 工程名）读写文件\n2. 加载工程规范（Python: CLAUDE.md，前端: package.json）\n3. 编码完成后更新 TAPD task 状态\n\n#### 5.6 Bug 修复场景\n\n如果任务为 Bug 修复：\n- 自动触发 Superpowers `systematic-debugging`\n- 遵循 4 阶段：定位根因 → 模式分析 → 假设验证 → 修复\n\n### 步骤6：自测验证\n\n1. 语法检查：确认无 Python 语法错误\n2. 导入检查：确认所有 import 路径正确\n3. 规范审计：按 `global-behavior.rule.md` 审计清单\n4. 验收标准：逐条核对 PRD 验收标准\n\n```\n自测验证：\n✅ 语法检查通过\n✅ 导入路径正确\n✅ 规范审计通过（6/6）\n✅ 验收标准覆盖（4/4）\n\nTAPD 需求：1159271484001002933\n下一步：/gm-ship --story=1159271484001002933\n```\n\n### 步骤6.5：生成前端对接清单（涉及前端时）\n\n当需求涉及前端工作时（步骤3.3 多仓库分析中包含前端工程），**必须在后端开发完成后、/gm-ship 之前**生成前端对接清单。\n\n#### 6.5.1 判断是否需要生成\n\n| 条件 | 是否生成 |\n|------|---------|\n| 步骤3.3 分析涉及前端工程 | ✅ 生成 |\n| 用户手动指定需要前端配合 | ✅ 生成 |\n| 仅后端 API 内部优化，前端无感知 | ❌ 不生成 |\n| 仅数据层/定时任务变更 | ❌ 不生成 |\n\n#### 6.5.2 清单内容\n\n基于已实现的后端代码，自动提取以下信息：\n\n```markdown\n# 前端对接清单：{需求标题}"
    },
    {
     "heading": "基本信息",
     "content": "- TAPD 需求：{story_id}\n- 后端开发：{完成状态}\n- 生成时间：{timestamp}"
    },
    {
     "heading": "API 变更",
     "content": "### 新增接口\n| 方法 | 路径 | 说明 | 请求参数 | 响应结构 |\n|------|------|------|---------|---------|\n| POST | /order_status/batch_edit_address/ | 批量编辑配送地址 | customer_ids, address_fields | {code, data: {success_count, fail_list}} |\n\n### 修改接口\n| 方法 | 路径 | 变更说明 | 变更字段 |\n|------|------|---------|---------|\n| POST | /order_status/list/ | 响应新增标签字段 | response: +tag_names |\n\n### 废弃接口\n| 方法 | 路径 | 废弃原因 | 替代方案 |\n|------|------|---------|---------|"
    },
    {
     "heading": "RPC 调用变更（如有）",
     "content": "| 服务 | 方法 | 变更说明 |\n|------|------|---------|\n| order_srv | batch_update | 新增 address_fields 参数 |"
    },
    {
     "heading": "数据模型变更（如有）",
     "content": "| 模型 | 变更类型 | 字段 |\n|------|---------|------|\n| Customer | 新增字段 | delivery_address_json |"
    },
    {
     "heading": "权限变更（如有）",
     "content": "| 权限标识 | 类型 | 说明 |\n|---------|------|------|\n| EDIT_DELIVERY_ADDRESS | 新增 | 批量编辑配送地址权限 |"
    },
    {
     "heading": "前端开发要点",
     "content": "1. {基于 PRD 和 API 设计总结的前端关键开发点}\n2. {...}"
    },
    {
     "heading": "注意事项",
     "content": "- {向下兼容性说明}\n- {数据迁移影响}\n- {灰度/feature flag 相关}\n```\n\n#### 6.5.3 推送到语雀\n\n**前提条件**：环境变量 `YUQUE_TOKEN` 和 `YUQUE_REPO_ID` 已配置。\n\n**使用 jq 构建请求体**（避免 shell 转义和 Markdown 特殊字符问题）：\n\n```bash\n# 将清单 Markdown 写入临时文件\ncat > /tmp/fe-handoff-${STORY_ID}.md << 'HANDOFF_EOF'\n{步骤6.5.2 生成的清单内容}\nHANDOFF_EOF\n\n# 用 jq 构建 JSON 请求体\njq -n \\\n  --arg title \"前端对接清单：${REQUIREMENT_TITLE}\" \\\n  --arg slug \"fe-handoff-${STORY_ID}\" \\\n  --rawfile body /tmp/fe-handoff-${STORY_ID}.md \\\n  '{\n    \"doc\": {\n      \"title\": $title,\n      \"slug\": $slug,\n      \"body\": $body,\n      \"format\": \"markdown\"\n    }\n  }' > /tmp/fe-handoff-${STORY_ID}-payload.json\n\n# 调用语雀 API\ncurl -s -X POST \"https://www.yuque.com/api/v2/repos/${YUQUE_REPO_ID}/docs\" \\\n  -H \"X-Auth-Token: ${YUQUE_TOKEN}\" \\\n  -H \"Content-Type: application/json\" \\\n  -d @/tmp/fe-handoff-${STORY_ID}-payload.json\n\n# 清理临时文件\nrm -f /tmp/fe-handoff-${STORY_ID}.md /tmp/fe-handoff-${STORY_ID}-payload.json\n```\n\n**从响应中提取文档 URL**：\n```json\n{\n  \"data\": {\n    \"slug\": \"fe-handoff-1159271484001002933\",\n    \"id\": 123456\n  }\n}\n```\n\n文档链接格式：`https://www.yuque.com/{group}/{repo}/fe-handoff-{story_id}`\n\n**环境变量未配置时的降级方案**：\n1. 将清单内容写入 `docs/iterations/fe-handoff-{story_id}.md`\n2. 提示用户手动推送到语雀\n3. 输出语雀链接待后续更新\n\n#### 6.5.4 更新 TAPD 需求描述\n\n将语雀文档链接追加到 TAPD 需求的描述中：\n\n```\n工具：mcp__mcp-server-tapd__get_stories_or_tasks\n参数：\n  workspace_id: 57880076\n  options:\n    entity_type: \"stories\"\n    id: <需求ID>\n    fields: \"description\"\n```\n\n读取当前描述后，追加前端对接清单链接：\n\n```\n工具：mcp__mcp-server-tapd__update_story_or_task\n参数：\n  workspace_id: 57880076\n  options:\n    entity_type: \"stories\"\n    id: <需求ID>\n    description: \"<原有描述>\\n\\n---\\n## 前端对接清单\\n📎 语雀文档：{yuque_url}\\n\\n生成时间：{timestamp}\"\n```\n\n#### 6.5.5 输出确认\n\n```\n前端对接清单已生成：\n- 清单内容：{API 变更数量} 个接口，{数据模型变更数量} 个模型\n- 语雀文档：https://www.yuque.com/xxx/fe-handoff-{story_id}\n- TAPD 描述：已更新（追加前端对接清单链接）\n\n下一步：/gm-ship --story={story_id}\n```\n\n---"
    },
    {
     "heading": "TAPD 状态同步规则",
     "content": "| 时机 | TAPD 操作 |\n|------|----------|\n| 技术设计完成（步骤3） | 更新需求状态为\"进行中\" |\n| 后端完成，有前端工作 | 由 `/gm-ship` 更新为\"联调中\" |\n| 后端完成，无前端工作 | 由 `/gm-ship` 更新为\"待测试\" |\n| 前端完成，后端已完成（\"联调中\"） | 由 `/gm-ship` 更新为\"待测试\" |\n| 仅前端完成（\"进行中\"） | 由 `/gm-ship` 更新为\"待测试\" |\n\n---"
    },
    {
     "heading": "上下文切换机制",
     "content": "跨仓库任务遵循以下优先级：\n\n```\n┌─────────────────────────────────────────┐\n│ 目标项目上下文（最高优先级）              │\n│ - CLAUDE.md 定义的技术栈和规范            │\n│ - 项目特有的 View 基类、Session 模式       │\n├─────────────────────────────────────────┤\n│ gm_service 工作流（中间层）              │\n│ - 分层架构、代码审查、TAPD 集成           │\n├─────────────────────────────────────────┤\n│ gm_service 技能模板（按需适配）           │\n│ - view-gen / service-gen / model-gen     │\n└─────────────────────────────────────────┘\n```\n\n**原则**：目标项目的具体规范覆盖 gm_service 的通用模板。\n\n---"
    },
    {
     "heading": "特殊场景",
     "content": "### 目标项目无 CLAUDE.md\n\n```\n降级策略:\n1. 扫描目标项目现有代码推断技术栈\n2. 搜索 View 基类 import 路径\n3. 搜索 Session 使用模式\n4. 搜索类似功能的现有实现作为参考\n5. 完成后建议创建 CLAUDE.md\n```\n\n### 需求涉及多个项目\n\n```\n1. 识别涉及的项目列表\n2. 按依赖关系排序（数据层 → 服务层 → 视图层）\n3. 逐个项目执行编码\n4. 每个项目完成后提交到对应仓库\n```\n\n### 前后端联合开发\n\n```\n后端视角:\n1. 后端: 在 gm_service 执行 /gm-dev\n2. 后端编码完成 → 步骤6.5 自动生成前端对接清单\n3. 对接清单推送至语雀 → 语雀链接更新到 TAPD 需求描述\n4. 后端 /gm-ship → story 状态变为\"联调中\"\n5. 前端: 在 stationv2 读取 TAPD 需求中的语雀链接 → 获取 API 设计\n6. 前端完成后 → story 状态变为\"待测试\"\n```\n\n---"
    },
    {
     "heading": "注意事项",
     "content": "1. **代码写入位置**：跨仓库任务代码写入目标项目，不写入 gm_service\n2. **规范适配**：View 基类、Session 模式以目标项目为准\n3. **不修改目标框架**：不修改目标项目的 CLAUDE.md 或 .claude/ 目录\n4. **分支管理**：在目标项目切出功能分支，不共用 gm_service 的分支\n\n---"
    },
    {
     "heading": "Superpowers 集成",
     "content": "按规模分级触发 Superpowers 技能：\n\n| 规模 | 触发的 Superpowers | 触发时机 |\n|------|-------------------|---------|\n| S (mini) | 无 | — |\n| M (lite) | `verification-before-completion` | 步骤6 自测验证时 |\n| L (standard) | `writing-plans`（强制） + `verification-before-completion` | 步骤3.2 技术设计 / 步骤6 自测验证 |\n| XL (full) | `brainstorming` + `writing-plans` + `verification-before-completion` + `dispatching-parallel-agents` | 步骤3.2 方案探索 / 步骤3.2 / 步骤5.4 / 步骤6 |\n\n**Bug 修复场景**：任何规模均触发 `systematic-debugging`（4阶段排查）。\n\n**`verification-before-completion` 替代规则**：\n- 触发后，步骤6 自测验证不再仅做静态扫描\n- 要求运行实际验证命令（如 `python -m py_compile`、`black --check`）\n- 确认输出通过后才标记开发完成\n\n---\n\n**维护者**: GM架构团队\n**版本**: v5.0\n**最后更新**: 2026-04-24"
    }
   ]
  },
  {
   "id": ".claude--commands--gm-prd",
   "title": "GM PRD生成命令",
   "category": "commands",
   "path": ".claude/commands/gm-prd.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# GM PRD生成命令"
    },
    {
     "heading": "命令功能",
     "content": "产品经理专用入口。两种工作模式：\n\n- **模式A：TAPD 需求已存在** → 给出 TAPD 需求链接/ID → 读取需求 → 需求分析 → 产品设计 → **更新 PRD 到 TAPD 需求详情**\n- **模式B：业务侧新需求** → 描述需求内容 → 需求分析 → 产品设计 → **创建 TAPD 需求并写入 PRD**\n\n所有规模（S/M/L/XL）均产出 PRD，深度随规模递增。"
    },
    {
     "heading": "使用方式",
     "content": "```bash\n# 模式A：基于已有 TAPD 需求（推荐，需求已录入 TAPD）\n/gm-prd 1159271484001002933\n/gm-prd https://www.tapd.cn/12345678/prong/stories/view/1159271484001002933\n\n# 模式B：业务侧新需求（需求尚未录入 TAPD）\n/gm-prd 客户列表新增标签筛选功能\n\n# 指定深度\n/gm-prd --depth=lite 修改客户备注字段长度限制\n/gm-prd --depth=standard 1159271484001002933\n\n# 不带参数时提示输入\n/gm-prd\n```\n\n---"
    },
    {
     "heading": "执行流程",
     "content": "### 步骤1：识别工作模式\n\n**判断规则**：\n- 参数为纯数字（19位）或包含 `tapd.cn` 的 URL → **模式A（TAPD 需求已存在）**\n- 参数为中文/英文描述 → **模式B（业务侧新需求）**\n- 无参数 → 提示选择\n\n**模式A：读取 TAPD 需求**\n\n1. 从参数中提取需求 ID（纯数字或从 URL 中解析）\n2. 调用 TAPD MCP 读取需求详情：\n\n```\n工具：mcp__mcp-server-tapd__get_stories_or_tasks\n参数：\n  workspace_id: 57880076\n  options:\n    entity_type: \"stories\"\n    id: <需求ID>\n    fields: \"id,name,description,status,priority,owner,iteration_id\"\n```\n\n3. 提取需求信息作为分析输入：\n   - 标题作为需求概述\n   - description 中已有内容作为需求背景（如有）\n   - 输出摘要供用户确认\n\n4. **需求确认**（明确交互）：\n\n```\n已读取 TAPD 需求：\n\n标题：客户列表新增标签筛选功能\n需求ID：1159271484001002933\n当前状态：已规划\n已有描述：<简要摘要>\n\n请确认需求信息是否正确：\n- 若描述有误或缺少关键信息，请补充说明\n- 若需求信息正确，回车继续\n```\n\n**模式B：接收需求描述**\n\n- 如果用户已提供需求描述 → 进入步骤2\n- 如果未提供 → 提示：\n\n```\n请选择工作模式：\n1. 输入 TAPD 需求 ID 或链接（需求已录入 TAPD）\n2. 描述需求内容（业务侧新需求）\n\n示例：\n- \"1159271484001002933\"\n- \"https://www.tapd.cn/12345678/prong/stories/view/1159271484001002933\"\n- \"客户列表新增标签筛选功能\"\n```\n\n### 步骤2：判定深度\n\n如果用户通过 `--depth` 指定了深度，直接使用。否则按 `workflow-routing.spec.md` 的 5 维度评分自动判定：\n\n| 总分 | 深度 | 对应规模 | PRD 内容深度 |\n|------|------|---------|-------------|\n| 0-1 | mini | S级 | 最精简（标题+描述+验收标准） |\n| 2-4 | lite | M级 | 精简版（≤1页） |\n| 5-7 | standard | L级 | 标准版（1-3页） |\n| 8+ | full | XL级 | 完整版（含影响分析） |\n\n**输出判定结果**：\n\n```\n深度判定：lite（M级）\n\n判定理由：\n- 涉及业务领域：1个（用户权限）→ 1分\n- 数据模型变更：可能有（客户标签）→ 1分\n- 跨服务影响：否 → 0分\n- 业务规则复杂度：简单 → 1分\n- 用户交互变更：小调整（筛选项）→ 1分\n- 总分：4分 → lite\n\n确认？（输入 mini/lite/standard/full 可覆盖，回车确认）\n```\n\n### 步骤3：加载规范与模板\n\n**始终加载**：\n- `.claude/rules/global-behavior.rule.md`\n- `.claude/specs/common/项目开发宪法.spec.md`\n- `.claude/specs/product-manager/需求文档规范.spec.md`\n\n**按需加载业务 Spec**（根据需求关键词）：\n- 涉及商品 → `.claude/specs/business/商品领域.spec.md`\n- 涉及订单 → `.claude/specs/business/订单领域.spec.md`\n- 涉及供应链 → `.claude/specs/business/供应链领域.spec.md`\n- 涉及用户/权限 → `.claude/specs/business/用户权限领域.spec.md`\n- 涉及开放平台 → `.claude/specs/business/开放平台领域.spec.md`\n\n**加载对应 Skill 模板**：\n\n| 深度 | 加载模板 |\n|------|---------|\n| mini | 不加载模板，直接生成精简 PRD |\n| lite | requirement-card.md |\n| standard | requirement-analysis.md + product-handoff.md |\n| full | prd-gen.md + impact-analysis.md |\n\n### 步骤3.5：方案探索（standard/full 深度）\n\n当深度为 standard 或 full 时，在生成 PRD 前执行方案探索：\n\n1. 调用 `superpowers:brainstorming` 进行需求方案讨论\n2. 基于业务 Spec 分析可行的设计方案（至少2个）\n3. 对比各方案优劣（用户体验、技术复杂度、影响范围）\n4. 与用户确认最终方案方向\n\n```\n方案探索（standard/full 深度）：\n\n基于需求分析，提出以下方案：\n\n方案A：<方案描述>\n- 优势：...\n- 劣势：...\n- 影响范围：...\n\n方案B：<方案描述>\n- 优势：...\n- 劣势：...\n- 影响范围：...\n\n推荐方案：<A/B>，理由：...\n\n请选择方案（输入 A/B，或描述你的想法）：\n```\n\n**mini/lite 深度跳过此步骤**，直接进入步骤4。\n\n### 步骤4：生成 PRD 内容\n\n#### 4.1 PRD 统一格式（Markdown，写入 TAPD 需求详情）\n\n**所有深度的 PRD 均包含以下结构**（深度决定各节的详细程度）：\n\n```markdown\n# PRD: <需求标题>\n\n> 深度: mini | lite | standard | full\n> 生成时间: 2026-04-16\n> 业务领域: 订单"
    },
    {
     "heading": "需求背景",
     "content": "<1-3句话说明为什么做>"
    },
    {
     "heading": "功能描述",
     "content": "<功能点列表>"
    },
    {
     "heading": "业务规则",
     "content": "<mini深度可省略此节>"
    },
    {
     "heading": "验收标准",
     "content": "- [ ] 标准1\n- [ ] 标准2"
    },
    {
     "heading": "影响范围",
     "content": "<mini/lite深度为简要说明，standard/full深度为详细分析>"
    },
    {
     "heading": "交接备注",
     "content": "<给研发的补充说明，mini深度可省略>\n```\n\n#### 4.2 各深度内容规则\n\n**mini（S级）**：\n- 需求背景：1句话\n- 功能描述：1-3个功能点\n- 验收标准：2-4条\n- 影响范围：1句话\n\n**lite（M级）**：按 requirement-card.md 模板，≤1页\n\n**standard（L级）**：按 requirement-analysis.md + product-handoff.md 模板，1-3页\n\n**full（XL级）**：按 prd-gen.md + impact-analysis.md 模板，完整 PRD + 业务影响分析\n\n### 步骤4.5：PRD 草稿审阅\n\n生成 PRD 内容后，**写入 TAPD 前**，必须先输出草稿供用户审阅：\n\n```\nPRD 草稿已生成（深度：lite）：\n\n---\n<PRD 完整内容>\n---\n\n请审阅 PRD 内容：\n- 回车确认写入 TAPD\n- 输入修改意见 → 根据意见修改后重新展示\n- 输入 \"重写\" → 重新生成整个 PRD\n```\n\n**审阅交互规则**：\n\n| 用户输入 | 处理 |\n|---------|------|\n| 回车（空） | 确认，进入步骤5写入 TAPD |\n| 具体修改意见 | 修改 PRD → 重新展示草稿（循环直到确认） |\n| \"重写\" | 回到步骤4，基于相同上下文重新生成 |\n\n### 步骤5：写入 TAPD\n\n#### 5.1 TAPD 项目空间\n\n固定使用项目空间 ID：**57880076**（参见 `tapd-integration.md`）。\n\n#### 5.2 模式A：更新已有需求\n\n将 PRD 内容写入已有 TAPD 需求的详情：\n\n```\n工具：mcp__mcp-server-tapd__update_story_or_task\n参数：\n  workspace_id: 57880076\n  options:\n    entity_type: \"stories\"\n    id: <需求ID>\n    description: <生成的 PRD Markdown 内容>\n```\n\n#### 5.3 模式B：创建新需求\n\n**5.3.1 选择迭代**\n\n创建需求前，获取当前项目的开启中迭代，让产品经理选择：\n\n```\n工具：mcp__mcp-server-tapd__get_iterations\n参数：\n  workspace_id: 57880076\n  options:\n    status: \"open\"\n```\n\n列出迭代供选择：\n\n```\n请选择需求所属迭代：\n1. [1159271484001001001] v1.14.0（2026-04-14 ~ 2026-04-28）\n2. [1159271484001001002] v1.15.0（2026-04-28 ~ 2026-05-12）\n3. 不关联迭代\n\n请输入序号：\n```\n\n**5.3.2 创建需求**\n\n创建 TAPD 需求并写入 PRD 内容：\n\n```\n工具：mcp__mcp-server-tapd__create_story_or_task\n参数：\n  workspace_id: 57880076\n  name: <需求标题>\n  options:\n    entity_type: \"stories\"\n    description: <生成的 PRD Markdown 内容>\n    priority_label: <根据深度映射：mini→低, lite→中, standard→高, full→高>\n    iteration_id: <用户选择的迭代ID，不关联则不传>\n```\n\n### 步骤6：输出完成声明\n\n**模式A（更新已有需求）**：\n\n```\nPRD 已生成并更新到 TAPD：\n\n需求标题：客户列表新增标签筛选功能\n需求ID：1159271484001002933\nTAPD链接：https://www.tapd.cn/57880076/prong/stories/view/1159271484001002933\n深度：lite（M级）\n\n下一步：\n1. 在 TAPD 上确认 PRD 内容无误\n2. 研发可通过以下命令开始开发：\n   /gm-dev 1159271484001002933\n```\n\n**模式B（创建新需求）**：\n\n```\nPRD 已生成并创建 TAPD 需求：\n\n需求标题：客户列表新增标签筛选功能\n需求ID：1159271484001002933\nTAPD链接：https://www.tapd.cn/57880076/prong/stories/view/1159271484001002933\n深度：lite（M级）\n\n下一步：\n1. 在 TAPD 上确认 PRD 内容无误\n2. 研发可通过以下命令开始开发：\n   /gm-dev 1159271484001002933\n```\n\n---"
    },
    {
     "heading": "角色边界",
     "content": "本命令以 **product-manager** 角色执行：\n- ✅ 可读取：`.claude/specs/`、`.claude/rules/`、`.claude/skills/product-manager/`\n- ✅ 可操作：TAPD 需求（创建/更新需求，写入 PRD 内容）\n- ❌ 禁止访问：业务代码（`website/`、`service/`、`common/mysql/`）\n- ❌ 禁止涉及：技术实现细节（数据模型、API设计、代码结构）\n- 只定义 **What/Why**，不涉及 **How**\n\n---\n\n**维护者**: GM架构团队\n**版本**: v3.0\n**最后更新**: 2026-04-24"
    }
   ]
  },
  {
   "id": ".claude--commands--gm-ship",
   "title": "GM提交推送命令",
   "category": "commands",
   "path": ".claude/commands/gm-ship.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# GM提交推送命令"
    },
    {
     "heading": "命令功能",
     "content": "开发完成后的一站式提交流程：**代码格式化 → Code Review ��� Commit → Push → 创建 PR → 更新 TAPD 状态 → 完成总结**。"
    },
    {
     "heading": "使用方式",
     "content": "```bash\n# 标准流程（关联 TAPD 需求）\n/gm-ship --story=1159271484001002933\n\n# 标准流程（无 TAPD 需求）\n/gm-ship\n\n# 跳过 review（仅小修改时使用）\n/gm-ship --skip-review\n\n# 指定基准分支（默认 master）\n/gm-ship --base=release/v1.14.0\n\n# 指定 TAPD 项目（非默认空间时）\n/gm-ship --workspace=67890123 --story=1159271484001002933\n```\n\n---"
    },
    {
     "heading": "执行流程",
     "content": "### 步骤0：识别变更工程（多仓库模式）\n\n如果 `/gm-dev` 阶段记录了涉及工程列表，自动进入多仓库模式。\n\n1. **推导 base_path**：\n\n```bash\ncurrent_repo_root=$(git rev-parse --show-toplevel)\nbase_path=$(dirname \"$current_repo_root\")\n```\n\n2. **对列表中每个工程检测变更**：\n\n```bash\ngit -C <base_path>/<repo_name> status --porcelain\ngit -C <base_path>/<repo_name> branch --show-current\n```\n\n3. **输出变更工程表**：\n\n```\n变更工程检测：\n| 工程 | 变更文件数 | 当前分支 |\n|------|-----------|---------|\n| gm_service | 6 | feature/xxx |\n| gm_static_stationv2 | 3 | feature/xxx |\n```\n\n4. **无涉及工程列表时**（仅当前工程），跳过此步骤，按单仓库流程执行。\n\n**后续步骤1-6 在多仓库模式下逐工程循环执行。**\n\n### 步骤1：环境检查\n\n**多仓库模式**：对每个变更工程执行以下检查（`git -C <repo_path>`）。\n**单仓库模式**：仅对当前工程执行。\n\n```bash\n# 检查当前分支\ngit branch --show-current\n\n# 检查是否有未提交的变更\ngit status\n\n# 检查远程分支状态\ngit fetch origin\n```\n\n**前置校验**：\n\n| 检查项 | 不通过时处理 |\n|--------|------------|\n| 当前在 master/main 分支 | 拒绝执行，提示创建功能分支 |\n| 没有任何变更 | 提示\"无变更需要提交\" |\n| 有未暂存的变更 | 列出变更文件，确认是否全部提交 |\n\n**输出**：\n\n```\n环境检查：\n- 当前分支：feature/batch-edit-address\n- 基准分支：master\n- 变更文件：8 个（6 新增，2 修改）\n- 未暂存文件：0 个\n- TAPD 需求：1159271484001002933（客户列表新增标签筛选功能）\n\n继续执行...\n```\n\n### 步骤2：代码格式化\n\n**多仓库模式**：对每个变更工程分别执行格式化。\n- Python 工程：`black --config pyproject.toml`（在工程目录下执行）\n- 前端工程：使用项目自有格式化命令（读 `package.json` scripts）\n\n**收集所有需要格式化的 Python 文件**：\n\n```bash\n# 1. 相对于基准分支的已提交变更（已跟踪文件）\ngit diff --name-only --diff-filter=ACMR origin/master...HEAD -- '*.py'\n\n# 2. 工作区未提交的变更（已跟踪文件）\ngit diff --name-only --diff-filter=ACMR -- '*.py'\ngit diff --name-only --cached --diff-filter=ACMR -- '*.py'\n\n# 3. 新增文件（untracked）\ngit ls-files --others --exclude-standard -- '*.py'\n```\n\n**合并去重后执行格式化**：\n\n```bash\n# 使用项目配置的 Black 格式化\nblack <变更文件列表> --config pyproject.toml\n```\n\n**输出**：\n\n```\n代码格式化：\n- 扫描文件：8 个 .py 文件\n- 格式化：3 个文件被修改\n  - website/order/views/batch_edit_view.py\n  - website/order/service/batch_edit_service.py\n  - common/mysql/models/batch_edit_log_model.py\n- 未变更：5 个文件已符合格式\n\n格式化完成，变更已暂存。\n```\n\n**格式化后自动暂存**：\n\n```bash\ngit add <被格式化的文件>\n```\n\n### 步骤3：Code Review（可跳过）\n\n如果未指定 `--skip-review`，执行分支比对审查：\n\n1. 加载 `.claude/skills/developer/code-review.md`\n2. 执行 `git diff origin/<base>...HEAD` 获取完整变更\n\n**自动过滤**（不审查）：\n| 类型 | 路径 |\n|------|------|\n| Proto 生成 | `*_pb2*.py` |\n| 内部工具库 | `pygmlib/` |\n| 编译缓存 | `*.pyc`, `__pycache__/` |\n| 迁移文件 | `*/migrations/*.py` |\n\n3. 按 10 个维度审查（分层架构、视图规范、数据访问、代码质量、错误处理、安全性、性能、跨服务调用、异步任务、向下兼容性）\n4. 产出精简审查结果（对话中输出）\n\n**审查输出格式**：\n\n```\nCode Review 结果：\n\n| 维度 | 评分 | 备注 |\n|------|------|------|\n| 分层架构 | ✅ | - |\n| 视图规范 | ✅ | - |\n| 数据访问 | ✅ | - |\n| 代码质量 | ✅ | - |\n| 错误处理 | ⚠️ | 2处缺少异常捕获 |\n| 安全性 | ✅ | - |\n| 性能 | ✅ | - |\n| 跨服务调用 | ✅ | - |\n| 异步任务 | N/A | - |\n| 向下兼容性 | ✅ | - |\n\n严重问题：0 | 警告：2 | 优化建议：1\n```\n\n**根据审查结果决策**：\n\n| 严重问题数 | 处理 |\n|-----------|------|\n| 0 | 继续提交 |\n| > 0 | 列出问题，询问：\"发现 N 个严重问题，建议先修复。继续提交？(y/n)\" |\n\n### 步骤4：Commit\n\n#### 4.1 获取 TAPD 源码提交关键字（如关联了需求）\n\n**多仓库模式**：每个工程的 commit 使用其对应 TAPD task 的源码提交关键字。\n\n```\n工具：mcp__mcp-server-tapd__get_commit_msg\n参数：\n  workspace_id: 57880076\n  options:\n    object_id: <task_id>   # 多仓库模式用 task_id\n    type: \"task\"           # 多仓库模式用 task 类型\n```\n\n**单仓库模式**：使用 story 的源码提交关键字。\n\n```\n工具：mcp__mcp-server-tapd__get_commit_msg\n参数：\n  workspace_id: 57880076\n  options:\n    object_id: <需求ID>\n    type: \"story\"\n```\n\n#### 4.2 生成 Commit Message\n\n```\n<type>(<scope>): <简短描述>\n\n<详细说明>\n\n<TAPD源码提交关键字>（如有）\n```\n\n**type 规则**：\n\n| 变更类型 | type |\n|---------|------|\n| 新功能 | feat |\n| Bug 修复 | fix |\n| 重构 | refactor |\n| 文档 | docs |\n| 代码风格 | style |\n| 性能优化 | perf |\n\n**scope**：从变更文件路径推断（如 `order`、`merchandise`、`customer`）。\n\n**示例**：\n\n```\nfeat(order): 支持订单批量修改配送地址\n\n- 新增 BatchEditAddressView 视图\n- 新增 batch_edit_address_service.py 服务层\n- 新增 batch_edit_log SQLAlchemy 模型\n- 注册 URL 路由 /order_status/batch_edit_address/\n\n--story=1159271484001002933 --user=xxx\n```\n\n#### 4.3 用户确认\n\n```\nCommit Message：\n---\nfeat(order): 支持订单批量修改配送地址\n...\n---\n\n确认提交？（回车确认，输入内容则替换 message）\n```\n\n#### 4.4 执行 Commit\n\n```bash\ngit add <相关文件>\ngit commit -m \"<确认后的message>\"\n```\n\n### 步骤5：Push\n\n**多仓库模式**：逐工程推送。\n\n```bash\n# 对每个变更工程\ngit -C <repo_path> push -u origin <当前分支>\n```\n\n**单仓库模式**：\n\n```bash\ngit push -u origin <当前分支>\n```\n\n**推送失败处理**：\n\n| 失败原因 | 处理 |\n|---------|------|\n| 远程有新提交 | 提示 `git pull --rebase origin <分支>` 后重试 |\n| 权限不足 | 提示检查 Git 权限配置 |\n| 网络错误 | 提示重试 |\n\n### 步骤6：创建 MR/PR（可选）\n\n```\n是否创建 Merge Request / Pull Request？(y/n，默认 y)\n```\n\n#### 6.1 平台检测\n\n根据 Git remote URL 自动判断代码托管平台：\n\n```bash\nremote_url=$(git remote get-url origin)\n# 包含 gitlab / code.example.com → GitLab\n# 包含 github.com → GitHub\n```\n\n#### 6.2 GitLab（默认）\n\n**多仓库模式**：逐工程创建 MR。\n\n```bash\n# cd 到每个工程目录\ncd <repo_path> && glab mr create \\\n  --title \"<type>(<scope>): <简短描述>\" \\\n  --description \"<MR描述，含 TAPD 父需求链接 + task 链接>\" \\\n  --target-branch <基准分支>\n```\n\n**单仓库模式**：\n\n```bash\nglab mr create \\\n  --title \"<type>(<scope>): <简短描述>\" \\\n  --description \"<MR描述>\" \\\n  --target-branch <基准分支>\n```\n\n**`glab` 不可用时的降级方案**：输出 push 后 Git 远程返回的 MR 创建链接，提示用户手动创建。\n\n#### 6.3 GitHub\n\n```bash\ngh pr create \\\n  --title \"<type>(<scope>): <简短描述>\" \\\n  --body \"<PR描述>\" \\\n  --base <基准分支>\n```\n\n#### 6.4 MR/PR 描述自动生成\n\n```markdown"
    },
    {
     "heading": "Summary",
     "content": "- <基于 commit 和 PRD 生成的变更摘要>"
    },
    {
     "heading": "TAPD",
     "content": "- 需求：https://www.tapd.cn/<workspace>/prong/stories/view/<story_id>"
    },
    {
     "heading": "Changes",
     "content": "- <变更文件列表和说明>"
    },
    {
     "heading": "Test plan",
     "content": "- [ ] <基于 PRD 验收标准生成的测试项>\n\n🤖 Generated with [Claude Code](https://claude.com/claude-code)\n```\n\n### 步骤7：更新 TAPD 状态\n\nTAPD 需求状态根据**当前推送的工程类型**和**是否涉及其他端工作**决定目标状态。\n\n#### 7.1 多仓库模式\n\n**更新各 task 状态为 done**：\n\n```\n工具：mcp__mcp-server-tapd__update_story_or_task\n参数：\n  workspace_id: 57880076\n  options:\n    entity_type: \"tasks\"\n    id: <task_id>\n    status: \"done\"\n```\n\n**更新父 story 状态**（根据完成情况判断）：\n\n| 当前推送端 | 是否还有其他端未完成 | 父 story 目标状态 |\n|-----------|--------------------|--------------------|\n| 后端 | 有前端工作待完成 | \"联调中\" |\n| 后端 | 无前端工作 | \"待测试\" |\n| 前端 | 父 story 当前为\"联调中\"（后端已完成） | \"待测试\" |\n| 前端 | 父 story 当前为\"进行中\"（仅前端工作） | \"待测试\" |\n\n**判断\"是否有前端工作\"的方法**：\n- **多仓库模式**：检查 `/gm-dev` 步骤3.4 记录的涉及工程列表中是否包含 frontend 类型工程\n- **单仓库模式**：询问用户\"本需求是否涉及前端工作？\"\n\n```\n工具：mcp__mcp-server-tapd__update_story_or_task\n参数：\n  workspace_id: 57880076\n  options:\n    entity_type: \"stories\"\n    id: <需求ID>\n    v_status: <根据上表判断的目标状态>\n```\n\n#### 7.2 单仓库模式\n\n如果关联了 TAPD 需求，根据是否涉及其他端工作决定目标状态：\n\n| 场景 | 目标状态 |\n|------|---------|\n| 仅后端，无前端工作 | \"待测试\" |\n| 仅后端，有前端工作待完成 | \"联调中\" |\n| 仅前端，当前状态为\"联调中\" | \"待测试\" |\n| 仅前端，当前状态为\"进行中\" | \"待测试\" |\n\n```\n工具：mcp__mcp-server-tapd__update_story_or_task\n参数：\n  workspace_id: 57880076\n  options:\n    entity_type: \"stories\"\n    id: <需求ID>\n    v_status: <根据上表判断的目标状态>\n```\n\n#### 7.3 状态更新失败处理\n\n如果 TAPD 返回 422 错误（状态流转不允许）：\n\n1. 调用 `get_stories_or_tasks` 查询当前 story 状态\n2. 输出当前状态和目标状态，提示用户手动操作\n3. 给出 TAPD 链接：`https://www.tapd.cn/<workspace>/prong/stories/view/<story_id>`\n\n### 步骤8：完成总结\n\n**多仓库模式总结**：\n\n```\n========================================\n  /gm-ship 完成总结（多仓库）\n========================================\n\n| 工程 | 分支 | Commit | PR |\n|------|------|--------|-----|\n| gm_service | feature/xxx | abc123 | #123 |\n| gm_static_stationv2 | feature/xxx | def456 | #45 |\n\nTAPD：\n- Task [gm_service] xxx → done\n- Task [gm_static_stationv2] xxx → done\n- 父需求 1159271484001002933 状态已更新为\"联调中\"（有前端工作待完成）\n========================================\n```\n\n**单仓库模式总结**：\n\n```\n========================================\n  /gm-ship 完成总结\n========================================\n\n分支：feature/batch-edit-address → master\n提交：abc123d feat(order): 支持订单批量修改配送地址\n\n变更统计：\n- 新增文件：6\n- 修改文件：2\n- 代码行数：+450 / -12\n\n代码质量：\n- 格式化：3 个文件已格式化（black）\n- Review：通过（0 严重 / 2 警告 / 1 优化建议）\n- 规范符合度：✅ 全部通过\n\nPR：https://github.com/xxx/gm_service/pull/123\n\nTAPD：\n- 需求 1159271484001002933 状态已更新为\"待测试\"\n- 链接：https://www.tapd.cn/<workspace>/prong/stories/view/1159271484001002933\n========================================\n```\n\n---"
    },
    {
     "heading": "完整流程图",
     "content": "```\n/gm-ship [--story=<TAPD需求ID>]\n    │\n    ├─ 步骤0：识别变更工程（多仓库模式）\n    │   ├─ 推导 base_path\n    │   ├─ 检测各工程变更状态\n    │   └─ 输出变更工程表\n    │\n    ├─ FOR EACH 变更工程（单仓库则只有当前工程）：\n    │   │\n    │   ├─ 步骤1：环境检查\n    │   │   ├─ 分支检查（禁止 master 直接提交）\n    │   │   ├─ 变更检查（无变更则退出）\n    │   │   └─ 远程状态同步\n    │   │\n    │   ├─ 步骤2：代码格式化 ⭐\n    │   │   ├─ Python：black --config pyproject.toml\n    │   │   ├─ 前端：项目自有格式化命令\n    │   │   └─ 自动暂存格式化结果\n    │   │\n    │   ├─ 步骤3：Code Review（可跳过）\n    │   │   ├─ 10维度审查\n    │   │   └─ 输出精简审查报告\n    │   │\n    │   ├─ 步骤4：Commit\n    │   │   ├─ 获取 TAPD 源码提交关键字（task/story）\n    │   │   ├─ 生成 commit message\n    │   │   └─ git commit\n    │   │\n    │   ├─ 步骤5：Push\n    │   │   └─ git push -u origin <branch>\n    │   │\n    │   └─ 步骤6：创建 MR/PR（可选）\n    │       ├─ 检测平台（GitLab/GitHub）\n    │       └─ glab mr create / gh pr create（含 TAPD 链接）\n    │\n    ├─ 步骤7：更新 TAPD 状态\n    │   ├─ 各 task → done（多仓库模式）\n    │   └─ 父 story → \"联调中\"/\"待测试\"（按完成情况判断）\n    │\n    └─ 步骤8：完成总结\n        ├─ 多仓库汇总表格\n        └─ TAPD 状态确认\n        │\n    └─ 步骤9：保存发布清单（多仓库模式）\n        ├─ 生成 shipment manifest\n        └─ 写入 docs/shipments/\n```\n\n---"
    },
    {
     "heading": "发布清单",
     "content": "### 步骤9：保存发布清单\n\n`/gm-ship` 完成后，自动生成本次发布的清单文件。**单仓库和多仓库模式均保存**。\n\n#### 9.1 清单内容\n\n```yaml\n# 文件：docs/shipments/<YYYYMMDD>_<需求简称>.yml\n# XL 级分阶段时：docs/shipments/<YYYYMMDD>_<需求简称>-p<N>.yml\nshipment_id: \"20260424_batch-edit-address\"\ndate: \"2026-04-24T14:30:00\"\ntapd_story_id: \"1159271484001002933\"\ntapd_story_url: \"https://www.tapd.cn/57880076/prong/stories/view/1159271484001002933\"\n\nrepos:\n  - repo: \"gm_service\"\n    branch: \"feature/batch-edit-address\"\n    base_branch: \"master\"\n    commit_sha: \"abc123d\"\n    commit_message: \"feat(order): 支持订单批量修改配送地址\"\n    files_changed: 6\n\n  - repo: \"gm_static_stationv2\"\n    branch: \"feature/batch-edit-address\"\n    base_branch: \"master\"\n    commit_sha: \"def456e\"\n    commit_message: \"feat(order): 配送地址批量编辑页面\"\n    files_changed: 3\n\nmr_urls:\n  - \"https://code.example.com/gm_service/-/merge_requests/123\"\n  - \"https://code.example.com/gm_static_stationv2/-/merge_requests/45\"\n```\n\n#### 9.2 保存路径\n\n```bash\nmkdir -p docs/shipments\n```\n\n使用 Write 工具写入 `docs/shipments/<YYYYMMDD>_<需求简称>.yml`。\n\n**命名规则**：\n- 普通需求：`20260424_batch-edit-address.yml`\n- XL 分阶段：`20260424_supplier-rating-p1.yml`、`-p2.yml`、`-p3.yml`\n- 单仓库：`repos` 中只有一条记录\n\n---"
    },
    {
     "heading": "角色边界",
     "content": "本命令以 **developer** 角色执行：\n- ✅ 可执行：git 操作、black 格式化、glab CLI / gh CLI\n- ✅ 可读取：所有代码文件（用于 review）\n- ✅ 可操作：TAPD 需求状态更新、获取源码提交关键字\n- ❌ 禁止：force push、删除远程分支、修改 master 分支\n\n---\n\n**维护者**: GM架构团队\n**版本**: v4.0\n**最后更新**: 2026-04-24"
    }
   ]
  },
  {
   "id": ".claude--commands--speckit.analyze",
   "title": "speckit.analyze",
   "category": "commands",
   "path": ".claude/commands/speckit.analyze.md",
   "sections": [
    {
     "heading": "User Input",
     "content": "```text\n$ARGUMENTS\n```\n\nYou **MUST** consider the user input before proceeding (if not empty)."
    },
    {
     "heading": "Goal",
     "content": "Identify inconsistencies, duplications, ambiguities, and underspecified items across the three core artifacts (`spec.md`, `plan.md`, `tasks.md`) before implementation. This command MUST run only after `/speckit.tasks` has successfully produced a complete `tasks.md`."
    },
    {
     "heading": "Operating Constraints",
     "content": "**STRICTLY READ-ONLY**: Do **not** modify any files. Output a structured analysis report. Offer an optional remediation plan (user must explicitly approve before any follow-up editing commands would be invoked manually).\n\n**Constitution Authority**: The project constitution (`.specify/memory/constitution.md`) is **non-negotiable** within this analysis scope. Constitution conflicts are automatically CRITICAL and require adjustment of the spec, plan, or tasks—not dilution, reinterpretation, or silent ignoring of the principle. If a principle itself needs to change, that must occur in a separate, explicit constitution update outside `/speckit.analyze`."
    },
    {
     "heading": "Execution Steps",
     "content": "### 1. Initialize Analysis Context\n\nRun `.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks` once from repo root and parse JSON for FEATURE_DIR and AVAILABLE_DOCS. Derive absolute paths:\n\n- SPEC = FEATURE_DIR/spec.md\n- PLAN = FEATURE_DIR/plan.md\n- TASKS = FEATURE_DIR/tasks.md\n\nAbort with an error message if any required file is missing (instruct the user to run missing prerequisite command).\nFor single quotes in args like \"I'm Groot\", use escape syntax: e.g 'I'\\''m Groot' (or double-quote if possible: \"I'm Groot\").\n\n### 2. Load Artifacts (Progressive Disclosure)\n\nLoad only the minimal necessary context from each artifact:\n\n**From spec.md:**\n\n- Overview/Context\n- Functional Requirements\n- Non-Functional Requirements\n- User Stories\n- Edge Cases (if present)\n\n**From plan.md:**\n\n- Architecture/stack choices\n- Data Model references\n- Phases\n- Technical constraints\n\n**From tasks.md:**\n\n- Task IDs\n- Descriptions\n- Phase grouping\n- Parallel markers [P]\n- Referenced file paths\n\n**From constitution:**\n\n- Load `.specify/memory/constitution.md` for principle validation\n\n### 3. Build Semantic Models\n\nCreate internal representations (do not include raw artifacts in output):\n\n- **Requirements inventory**: Each functional + non-functional requirement with a stable key (derive slug based on imperative phrase; e.g., \"User can upload file\" → `user-can-upload-file`)\n- **User story/action inventory**: Discrete user actions with acceptance criteria\n- **Task coverage mapping**: Map each task to one or more requirements or stories (inference by keyword / explicit reference patterns like IDs or key phrases)\n- **Constitution rule set**: Extract principle names and MUST/SHOULD normative statements\n\n### 4. Detection Passes (Token-Efficient Analysis)\n\nFocus on high-signal findings. Limit to 50 findings total; aggregate remainder in overflow summary.\n\n#### A. Duplication Detection\n\n- Identify near-duplicate requirements\n- Mark lower-quality phrasing for consolidation\n\n#### B. Ambiguity Detection\n\n- Flag vague adjectives (fast, scalable, secure, intuitive, robust) lacking measurable criteria\n- Flag unresolved placeholders (TODO, TKTK, ???, `<placeholder>`, etc.)\n\n#### C. Underspecification\n\n- Requirements with verbs but missing object or measurable outcome\n- User stories missing acceptance criteria alignment\n- Tasks referencing files or components not defined in spec/plan\n\n#### D. Constitution Alignment\n\n- Any requirement or plan element conflicting with a MUST principle\n- Missing mandated sections or quality gates from constitution\n\n#### E. Coverage Gaps\n\n- Requirements with zero associated tasks\n- Tasks with no mapped requirement/story\n- Non-functional requirements not reflected in tasks (e.g., performance, security)\n\n#### F. Inconsistency\n\n- Terminology drift (same concept named differently across files)\n- Data entities referenced in plan but absent in spec (or vice versa)\n- Task ordering contradictions (e.g., integration tasks before foundational setup tasks without dependency note)\n- Conflicting requirements (e.g., one requires Next.js while other specifies Vue)\n\n### 5. Severity Assignment\n\nUse this heuristic to prioritize findings:\n\n- **CRITICAL**: Violates constitution MUST, missing core spec artifact, or requirement with zero coverage that blocks baseline functionality\n- **HIGH**: Duplicate or conflicting requirement, ambiguous security/performance attribute, untestable acceptance criterion\n- **MEDIUM**: Terminology drift, missing non-functional task coverage, underspecified edge case\n- **LOW**: Style/wording improvements, minor redundancy not affecting execution order\n\n### 6. Produce Compact Analysis Report\n\nOutput a Markdown report (no file writes) with the following structure:"
    },
    {
     "heading": "Specification Analysis Report",
     "content": "| ID | Category | Severity | Location(s) | Summary | Recommendation |\n|----|----------|----------|-------------|---------|----------------|\n| A1 | Duplication | HIGH | spec.md:L120-134 | Two similar requirements ... | Merge phrasing; keep clearer version |\n\n(Add one row per finding; generate stable IDs prefixed by category initial.)\n\n**Coverage Summary Table:**\n\n| Requirement Key | Has Task? | Task IDs | Notes |\n|-----------------|-----------|----------|-------|\n\n**Constitution Alignment Issues:** (if any)\n\n**Unmapped Tasks:** (if any)\n\n**Metrics:**\n\n- Total Requirements\n- Total Tasks\n- Coverage % (requirements with >=1 task)\n- Ambiguity Count\n- Duplication Count\n- Critical Issues Count\n\n### 7. Provide Next Actions\n\nAt end of report, output a concise Next Actions block:\n\n- If CRITICAL issues exist: Recommend resolving before `/speckit.implement`\n- If only LOW/MEDIUM: User may proceed, but provide improvement suggestions\n- Provide explicit command suggestions: e.g., \"Run /speckit.specify with refinement\", \"Run /speckit.plan to adjust architecture\", \"Manually edit tasks.md to add coverage for 'performance-metrics'\"\n\n### 8. Offer Remediation\n\nAsk the user: \"Would you like me to suggest concrete remediation edits for the top N issues?\" (Do NOT apply them automatically.)"
    },
    {
     "heading": "Operating Principles",
     "content": "### Context Efficiency\n\n- **Minimal high-signal tokens**: Focus on actionable findings, not exhaustive documentation\n- **Progressive disclosure**: Load artifacts incrementally; don't dump all content into analysis\n- **Token-efficient output**: Limit findings table to 50 rows; summarize overflow\n- **Deterministic results**: Rerunning without changes should produce consistent IDs and counts\n\n### Analysis Guidelines\n\n- **NEVER modify files** (this is read-only analysis)\n- **NEVER hallucinate missing sections** (if absent, report them accurately)\n- **Prioritize constitution violations** (these are always CRITICAL)\n- **Use examples over exhaustive rules** (cite specific instances, not generic patterns)\n- **Report zero issues gracefully** (emit success report with coverage statistics)"
    },
    {
     "heading": "Context",
     "content": "$ARGUMENTS"
    }
   ]
  },
  {
   "id": ".claude--commands--speckit.checklist",
   "title": "speckit.checklist",
   "category": "commands",
   "path": ".claude/commands/speckit.checklist.md",
   "sections": [
    {
     "heading": "Checklist Purpose: \"Unit Tests for English\"",
     "content": "**CRITICAL CONCEPT**: Checklists are **UNIT TESTS FOR REQUIREMENTS WRITING** - they validate the quality, clarity, and completeness of requirements in a given domain.\n\n**NOT for verification/testing**:\n\n- ❌ NOT \"Verify the button clicks correctly\"\n- ❌ NOT \"Test error handling works\"\n- ❌ NOT \"Confirm the API returns 200\"\n- ❌ NOT checking if code/implementation matches the spec\n\n**FOR requirements quality validation**:\n\n- ✅ \"Are visual hierarchy requirements defined for all card types?\" (completeness)\n- ✅ \"Is 'prominent display' quantified with specific sizing/positioning?\" (clarity)\n- ✅ \"Are hover state requirements consistent across all interactive elements?\" (consistency)\n- ✅ \"Are accessibility requirements defined for keyboard navigation?\" (coverage)\n- ✅ \"Does the spec define what happens when logo image fails to load?\" (edge cases)\n\n**Metaphor**: If your spec is code written in English, the checklist is its unit test suite. You're testing whether the requirements are well-written, complete, unambiguous, and ready for implementation - NOT whether the implementation works."
    },
    {
     "heading": "User Input",
     "content": "```text\n$ARGUMENTS\n```\n\nYou **MUST** consider the user input before proceeding (if not empty)."
    },
    {
     "heading": "Execution Steps",
     "content": "1. **Setup**: Run `.specify/scripts/bash/check-prerequisites.sh --json` from repo root and parse JSON for FEATURE_DIR and AVAILABLE_DOCS list.\n   - All file paths must be absolute.\n   - For single quotes in args like \"I'm Groot\", use escape syntax: e.g 'I'\\''m Groot' (or double-quote if possible: \"I'm Groot\").\n\n2. **Clarify intent (dynamic)**: Derive up to THREE initial contextual clarifying questions (no pre-baked catalog). They MUST:\n   - Be generated from the user's phrasing + extracted signals from spec/plan/tasks\n   - Only ask about information that materially changes checklist content\n   - Be skipped individually if already unambiguous in `$ARGUMENTS`\n   - Prefer precision over breadth\n\n   Generation algorithm:\n   1. Extract signals: feature domain keywords (e.g., auth, latency, UX, API), risk indicators (\"critical\", \"must\", \"compliance\"), stakeholder hints (\"QA\", \"review\", \"security team\"), and explicit deliverables (\"a11y\", \"rollback\", \"contracts\").\n   2. Cluster signals into candidate focus areas (max 4) ranked by relevance.\n   3. Identify probable audience & timing (author, reviewer, QA, release) if not explicit.\n   4. Detect missing dimensions: scope breadth, depth/rigor, risk emphasis, exclusion boundaries, measurable acceptance criteria.\n   5. Formulate questions chosen from these archetypes:\n      - Scope refinement (e.g., \"Should this include integration touchpoints with X and Y or stay limited to local module correctness?\")\n      - Risk prioritization (e.g., \"Which of these potential risk areas should receive mandatory gating checks?\")\n      - Depth calibration (e.g., \"Is this a lightweight pre-commit sanity list or a formal release gate?\")\n      - Audience framing (e.g., \"Will this be used by the author only or peers during PR review?\")\n      - Boundary exclusion (e.g., \"Should we explicitly exclude performance tuning items this round?\")\n      - Scenario class gap (e.g., \"No recovery flows detected—are rollback / partial failure paths in scope?\")\n\n   Question formatting rules:\n   - If presenting options, generate a compact table with columns: Option | Candidate | Why It Matters\n   - Limit to A–E options maximum; omit table if a free-form answer is clearer\n   - Never ask the user to restate what they already said\n   - Avoid speculative categories (no hallucination). If uncertain, ask explicitly: \"Confirm whether X belongs in scope.\"\n\n   Defaults when interaction impossible:\n   - Depth: Standard\n   - Audience: Reviewer (PR) if code-related; Author otherwise\n   - Focus: Top 2 relevance clusters\n\n   Output the questions (label Q1/Q2/Q3). After answers: if ≥2 scenario classes (Alternate / Exception / Recovery / Non-Functional domain) remain unclear, you MAY ask up to TWO more targeted follow‑ups (Q4/Q5) with a one-line justification each (e.g., \"Unresolved recovery path risk\"). Do not exceed five total questions. Skip escalation if user explicitly declines more.\n\n3. **Understand user request**: Combine `$ARGUMENTS` + clarifying answers:\n   - Derive checklist theme (e.g., security, review, deploy, ux)\n   - Consolidate explicit must-have items mentioned by user\n   - Map focus selections to category scaffolding\n   - Infer any missing context from spec/plan/tasks (do NOT hallucinate)\n\n4. **Load feature context**: Read from FEATURE_DIR:\n   - spec.md: Feature requirements and scope\n   - plan.md (if exists): Technical details, dependencies\n   - tasks.md (if exists): Implementation tasks\n\n   **Context Loading Strategy**:\n   - Load only necessary portions relevant to active focus areas (avoid full-file dumping)\n   - Prefer summarizing long sections into concise scenario/requirement bullets\n   - Use progressive disclosure: add follow-on retrieval only if gaps detected\n   - If source docs are large, generate interim summary items instead of embedding raw text\n\n5. **Generate checklist** - Create \"Unit Tests for Requirements\":\n   - Create `FEATURE_DIR/checklists/` directory if it doesn't exist\n   - Generate unique checklist filename:\n     - Use short, descriptive name based on domain (e.g., `ux.md`, `api.md`, `security.md`)\n     - Format: `[domain].md`\n     - If file exists, append to existing file\n   - Number items sequentially starting from CHK001\n   - Each `/speckit.checklist` run creates a NEW file (never overwrites existing checklists)\n\n   **CORE PRINCIPLE - Test the Requirements, Not the Implementation**:\n   Every checklist item MUST evaluate the REQUIREMENTS THEMSELVES for:\n   - **Completeness**: Are all necessary requirements present?\n   - **Clarity**: Are requirements unambiguous and specific?\n   - **Consistency**: Do requirements align with each other?\n   - **Measurability**: Can requirements be objectively verified?\n   - **Coverage**: Are all scenarios/edge cases addressed?\n\n   **Category Structure** - Group items by requirement quality dimensions:\n   - **Requirement Completeness** (Are all necessary requirements documented?)\n   - **Requirement Clarity** (Are requirements specific and unambiguous?)\n   - **Requirement Consistency** (Do requirements align without conflicts?)\n   - **Acceptance Criteria Quality** (Are success criteria measurable?)\n   - **Scenario Coverage** (Are all flows/cases addressed?)\n   - **Edge Case Coverage** (Are boundary conditions defined?)\n   - **Non-Functional Requirements** (Performance, Security, Accessibility, etc. - are they specified?)\n   - **Dependencies & Assumptions** (Are they documented and validated?)\n   - **Ambiguities & Conflicts** (What needs clarification?)\n\n   **HOW TO WRITE CHECKLIST ITEMS - \"Unit Tests for English\"**:\n\n   ❌ **WRONG** (Testing implementation):\n   - \"Verify landing page displays 3 episode cards\"\n   - \"Test hover states work on desktop\"\n   - \"Confirm logo click navigates home\"\n\n   ✅ **CORRECT** (Testing requirements quality):\n   - \"Are the exact number and layout of featured episodes specified?\" [Completeness]\n   - \"Is 'prominent display' quantified with specific sizing/positioning?\" [Clarity]\n   - \"Are hover state requirements consistent across all interactive elements?\" [Consistency]\n   - \"Are keyboard navigation requirements defined for all interactive UI?\" [Coverage]\n   - \"Is the fallback behavior specified when logo image fails to load?\" [Edge Cases]\n   - \"Are loading states defined for asynchronous episode data?\" [Completeness]\n   - \"Does the spec define visual hierarchy for competing UI elements?\" [Clarity]\n\n   **ITEM STRUCTURE**:\n   Each item should follow this pattern:\n   - Question format asking about requirement quality\n   - Focus on what's WRITTEN (or not written) in the spec/plan\n   - Include quality dimension in brackets [Completeness/Clarity/Consistency/etc.]\n   - Reference spec section `[Spec §X.Y]` when checking existing requirements\n   - Use `[Gap]` marker when checking for missing requirements\n\n   **EXAMPLES BY QUALITY DIMENSION**:\n\n   Completeness:\n   - \"Are error handling requirements defined for all API failure modes? [Gap]\"\n   - \"Are accessibility requirements specified for all interactive elements? [Completeness]\"\n   - \"Are mobile breakpoint requirements defined for responsive layouts? [Gap]\"\n\n   Clarity:\n   - \"Is 'fast loading' quantified with specific timing thresholds? [Clarity, Spec §NFR-2]\"\n   - \"Are 'related episodes' selection criteria explicitly defined? [Clarity, Spec §FR-5]\"\n   - \"Is 'prominent' defined with measurable visual properties? [Ambiguity, Spec §FR-4]\"\n\n   Consistency:\n   - \"Do navigation requirements align across all pages? [Consistency, Spec §FR-10]\"\n   - \"Are card component requirements consistent between landing and detail pages? [Consistency]\"\n\n   Coverage:\n   - \"Are requirements defined for zero-state scenarios (no episodes)? [Coverage, Edge Case]\"\n   - \"Are concurrent user interaction scenarios addressed? [Coverage, Gap]\"\n   - \"Are requirements specified for partial data loading failures? [Coverage, Exception Flow]\"\n\n   Measurability:\n   - \"Are visual hierarchy requirements measurable/testable? [Acceptance Criteria, Spec §FR-1]\"\n   - \"Can 'balanced visual weight' be objectively verified? [Measurability, Spec §FR-2]\"\n\n   **Scenario Classification & Coverage** (Requirements Quality Focus):\n   - Check if requirements exist for: Primary, Alternate, Exception/Error, Recovery, Non-Functional scenarios\n   - For each scenario class, ask: \"Are [scenario type] requirements complete, clear, and consistent?\"\n   - If scenario class missing: \"Are [scenario type] requirements intentionally excluded or missing? [Gap]\"\n   - Include resilience/rollback when state mutation occurs: \"Are rollback requirements defined for migration failures? [Gap]\"\n\n   **Traceability Requirements**:\n   - MINIMUM: ≥80% of items MUST include at least one traceability reference\n   - Each item should reference: spec section `[Spec §X.Y]`, or use markers: `[Gap]`, `[Ambiguity]`, `[Conflict]`, `[Assumption]`\n   - If no ID system exists: \"Is a requirement & acceptance criteria ID scheme established? [Traceability]\"\n\n   **Surface & Resolve Issues** (Requirements Quality Problems):\n   Ask questions about the requirements themselves:\n   - Ambiguities: \"Is the term 'fast' quantified with specific metrics? [Ambiguity, Spec §NFR-1]\"\n   - Conflicts: \"Do navigation requirements conflict between §FR-10 and §FR-10a? [Conflict]\"\n   - Assumptions: \"Is the assumption of 'always available podcast API' validated? [Assumption]\"\n   - Dependencies: \"Are external podcast API requirements documented? [Dependency, Gap]\"\n   - Missing definitions: \"Is 'visual hierarchy' defined with measurable criteria? [Gap]\"\n\n   **Content Consolidation**:\n   - Soft cap: If raw candidate items > 40, prioritize by risk/impact\n   - Merge near-duplicates checking the same requirement aspect\n   - If >5 low-impact edge cases, create one item: \"Are edge cases X, Y, Z addressed in requirements? [Coverage]\"\n\n   **🚫 ABSOLUTELY PROHIBITED** - These make it an implementation test, not a requirements test:\n   - ❌ Any item starting with \"Verify\", \"Test\", \"Confirm\", \"Check\" + implementation behavior\n   - ❌ References to code execution, user actions, system behavior\n   - ❌ \"Displays correctly\", \"works properly\", \"functions as expected\"\n   - ❌ \"Click\", \"navigate\", \"render\", \"load\", \"execute\"\n   - ❌ Test cases, test plans, QA procedures\n   - ❌ Implementation details (frameworks, APIs, algorithms)\n\n   **✅ REQUIRED PATTERNS** - These test requirements quality:\n   - ✅ \"Are [requirement type] defined/specified/documented for [scenario]?\"\n   - ✅ \"Is [vague term] quantified/clarified with specific criteria?\"\n   - ✅ \"Are requirements consistent between [section A] and [section B]?\"\n   - ✅ \"Can [requirement] be objectively measured/verified?\"\n   - ✅ \"Are [edge cases/scenarios] addressed in requirements?\"\n   - ✅ \"Does the spec define [missing aspect]?\"\n\n6. **Structure Reference**: Generate the checklist following the canonical template in `.specify/templates/checklist-template.md` for title, meta section, category headings, and ID formatting. If template is unavailable, use: H1 title, purpose/created meta lines, `##` category sections containing `- [ ] CHK### <requirement item>` lines with globally incrementing IDs starting at CHK001.\n\n7. **Report**: Output full path to created checklist, item count, and remind user that each run creates a new file. Summarize:\n   - Focus areas selected\n   - Depth level\n   - Actor/timing\n   - Any explicit user-specified must-have items incorporated\n\n**Important**: Each `/speckit.checklist` command invocation creates a checklist file using short, descriptive names unless file already exists. This allows:\n\n- Multiple checklists of different types (e.g., `ux.md`, `test.md`, `security.md`)\n- Simple, memorable filenames that indicate checklist purpose\n- Easy identification and navigation in the `checklists/` folder\n\nTo avoid clutter, use descriptive types and clean up obsolete checklists when done."
    },
    {
     "heading": "Example Checklist Types & Sample Items",
     "content": "**UX Requirements Quality:** `ux.md`\n\nSample items (testing the requirements, NOT the implementation):\n\n- \"Are visual hierarchy requirements defined with measurable criteria? [Clarity, Spec §FR-1]\"\n- \"Is the number and positioning of UI elements explicitly specified? [Completeness, Spec §FR-1]\"\n- \"Are interaction state requirements (hover, focus, active) consistently defined? [Consistency]\"\n- \"Are accessibility requirements specified for all interactive elements? [Coverage, Gap]\"\n- \"Is fallback behavior defined when images fail to load? [Edge Case, Gap]\"\n- \"Can 'prominent display' be objectively measured? [Measurability, Spec §FR-4]\"\n\n**API Requirements Quality:** `api.md`\n\nSample items:\n\n- \"Are error response formats specified for all failure scenarios? [Completeness]\"\n- \"Are rate limiting requirements quantified with specific thresholds? [Clarity]\"\n- \"Are authentication requirements consistent across all endpoints? [Consistency]\"\n- \"Are retry/timeout requirements defined for external dependencies? [Coverage, Gap]\"\n- \"Is versioning strategy documented in requirements? [Gap]\"\n\n**Performance Requirements Quality:** `performance.md`\n\nSample items:\n\n- \"Are performance requirements quantified with specific metrics? [Clarity]\"\n- \"Are performance targets defined for all critical user journeys? [Coverage]\"\n- \"Are performance requirements under different load conditions specified? [Completeness]\"\n- \"Can performance requirements be objectively measured? [Measurability]\"\n- \"Are degradation requirements defined for high-load scenarios? [Edge Case, Gap]\"\n\n**Security Requirements Quality:** `security.md`\n\nSample items:\n\n- \"Are authentication requirements specified for all protected resources? [Coverage]\"\n- \"Are data protection requirements defined for sensitive information? [Completeness]\"\n- \"Is the threat model documented and requirements aligned to it? [Traceability]\"\n- \"Are security requirements consistent with compliance obligations? [Consistency]\"\n- \"Are security failure/breach response requirements defined? [Gap, Exception Flow]\""
    },
    {
     "heading": "Anti-Examples: What NOT To Do",
     "content": "**❌ WRONG - These test implementation, not requirements:**\n\n```markdown\n- [ ] CHK001 - Verify landing page displays 3 episode cards [Spec §FR-001]\n- [ ] CHK002 - Test hover states work correctly on desktop [Spec §FR-003]\n- [ ] CHK003 - Confirm logo click navigates to home page [Spec §FR-010]\n- [ ] CHK004 - Check that related episodes section shows 3-5 items [Spec §FR-005]\n```\n\n**✅ CORRECT - These test requirements quality:**\n\n```markdown\n- [ ] CHK001 - Are the number and layout of featured episodes explicitly specified? [Completeness, Spec §FR-001]\n- [ ] CHK002 - Are hover state requirements consistently defined for all interactive elements? [Consistency, Spec §FR-003]\n- [ ] CHK003 - Are navigation requirements clear for all clickable brand elements? [Clarity, Spec §FR-010]\n- [ ] CHK004 - Is the selection criteria for related episodes documented? [Gap, Spec §FR-005]\n- [ ] CHK005 - Are loading state requirements defined for asynchronous episode data? [Gap]\n- [ ] CHK006 - Can \"visual hierarchy\" requirements be objectively measured? [Measurability, Spec §FR-001]\n```\n\n**Key Differences:**\n\n- Wrong: Tests if the system works correctly\n- Correct: Tests if the requirements are written correctly\n- Wrong: Verification of behavior\n- Correct: Validation of requirement quality\n- Wrong: \"Does it do X?\"\n- Correct: \"Is X clearly specified?\""
    }
   ]
  },
  {
   "id": ".claude--commands--speckit.clarify",
   "title": "speckit.clarify",
   "category": "commands",
   "path": ".claude/commands/speckit.clarify.md",
   "sections": [
    {
     "heading": "User Input",
     "content": "```text\n$ARGUMENTS\n```\n\nYou **MUST** consider the user input before proceeding (if not empty)."
    },
    {
     "heading": "Outline",
     "content": "Goal: Detect and reduce ambiguity or missing decision points in the active feature specification and record the clarifications directly in the spec file.\n\nNote: This clarification workflow is expected to run (and be completed) BEFORE invoking `/speckit.plan`. If the user explicitly states they are skipping clarification (e.g., exploratory spike), you may proceed, but must warn that downstream rework risk increases.\n\nExecution steps:\n\n1. Run `.specify/scripts/bash/check-prerequisites.sh --json --paths-only` from repo root **once** (combined `--json --paths-only` mode / `-Json -PathsOnly`). Parse minimal JSON payload fields:\n   - `FEATURE_DIR`\n   - `FEATURE_SPEC`\n   - (Optionally capture `IMPL_PLAN`, `TASKS` for future chained flows.)\n   - If JSON parsing fails, abort and instruct user to re-run `/speckit.specify` or verify feature branch environment.\n   - For single quotes in args like \"I'm Groot\", use escape syntax: e.g 'I'\\''m Groot' (or double-quote if possible: \"I'm Groot\").\n\n2. Load the current spec file. Perform a structured ambiguity & coverage scan using this taxonomy. For each category, mark status: Clear / Partial / Missing. Produce an internal coverage map used for prioritization (do not output raw map unless no questions will be asked).\n\n   Functional Scope & Behavior:\n   - Core user goals & success criteria\n   - Explicit out-of-scope declarations\n   - User roles / personas differentiation\n\n   Domain & Data Model:\n   - Entities, attributes, relationships\n   - Identity & uniqueness rules\n   - Lifecycle/state transitions\n   - Data volume / scale assumptions\n\n   Interaction & UX Flow:\n   - Critical user journeys / sequences\n   - Error/empty/loading states\n   - Accessibility or localization notes\n\n   Non-Functional Quality Attributes:\n   - Performance (latency, throughput targets)\n   - Scalability (horizontal/vertical, limits)\n   - Reliability & availability (uptime, recovery expectations)\n   - Observability (logging, metrics, tracing signals)\n   - Security & privacy (authN/Z, data protection, threat assumptions)\n   - Compliance / regulatory constraints (if any)\n\n   Integration & External Dependencies:\n   - External services/APIs and failure modes\n   - Data import/export formats\n   - Protocol/versioning assumptions\n\n   Edge Cases & Failure Handling:\n   - Negative scenarios\n   - Rate limiting / throttling\n   - Conflict resolution (e.g., concurrent edits)\n\n   Constraints & Tradeoffs:\n   - Technical constraints (language, storage, hosting)\n   - Explicit tradeoffs or rejected alternatives\n\n   Terminology & Consistency:\n   - Canonical glossary terms\n   - Avoided synonyms / deprecated terms\n\n   Completion Signals:\n   - Acceptance criteria testability\n   - Measurable Definition of Done style indicators\n\n   Misc / Placeholders:\n   - TODO markers / unresolved decisions\n   - Ambiguous adjectives (\"robust\", \"intuitive\") lacking quantification\n\n   For each category with Partial or Missing status, add a candidate question opportunity unless:\n   - Clarification would not materially change implementation or validation strategy\n   - Information is better deferred to planning phase (note internally)\n\n3. Generate (internally) a prioritized queue of candidate clarification questions (maximum 5). Do NOT output them all at once. Apply these constraints:\n    - Maximum of 10 total questions across the whole session.\n    - Each question must be answerable with EITHER:\n       - A short multiple‑choice selection (2–5 distinct, mutually exclusive options), OR\n       - A one-word / short‑phrase answer (explicitly constrain: \"Answer in <=5 words\").\n    - Only include questions whose answers materially impact architecture, data modeling, task decomposition, test design, UX behavior, operational readiness, or compliance validation.\n    - Ensure category coverage balance: attempt to cover the highest impact unresolved categories first; avoid asking two low-impact questions when a single high-impact area (e.g., security posture) is unresolved.\n    - Exclude questions already answered, trivial stylistic preferences, or plan-level execution details (unless blocking correctness).\n    - Favor clarifications that reduce downstream rework risk or prevent misaligned acceptance tests.\n    - If more than 5 categories remain unresolved, select the top 5 by (Impact * Uncertainty) heuristic.\n\n4. Sequential questioning loop (interactive):\n    - Present EXACTLY ONE question at a time.\n    - For multiple‑choice questions:\n       - **Analyze all options** and determine the **most suitable option** based on:\n          - Best practices for the project type\n          - Common patterns in similar implementations\n          - Risk reduction (security, performance, maintainability)\n          - Alignment with any explicit project goals or constraints visible in the spec\n       - Present your **recommended option prominently** at the top with clear reasoning (1-2 sentences explaining why this is the best choice).\n       - Format as: `**Recommended:** Option [X] - <reasoning>`\n       - Then render all options as a Markdown table:\n\n       | Option | Description |\n       |--------|-------------|\n       | A | <Option A description> |\n       | B | <Option B description> |\n       | C | <Option C description> (add D/E as needed up to 5) |\n       | Short | Provide a different short answer (<=5 words) (Include only if free-form alternative is appropriate) |\n\n       - After the table, add: `You can reply with the option letter (e.g., \"A\"), accept the recommendation by saying \"yes\" or \"recommended\", or provide your own short answer.`\n    - For short‑answer style (no meaningful discrete options):\n       - Provide your **suggested answer** based on best practices and context.\n       - Format as: `**Suggested:** <your proposed answer> - <brief reasoning>`\n       - Then output: `Format: Short answer (<=5 words). You can accept the suggestion by saying \"yes\" or \"suggested\", or provide your own answer.`\n    - After the user answers:\n       - If the user replies with \"yes\", \"recommended\", or \"suggested\", use your previously stated recommendation/suggestion as the answer.\n       - Otherwise, validate the answer maps to one option or fits the <=5 word constraint.\n       - If ambiguous, ask for a quick disambiguation (count still belongs to same question; do not advance).\n       - Once satisfactory, record it in working memory (do not yet write to disk) and move to the next queued question.\n    - Stop asking further questions when:\n       - All critical ambiguities resolved early (remaining queued items become unnecessary), OR\n       - User signals completion (\"done\", \"good\", \"no more\"), OR\n       - You reach 5 asked questions.\n    - Never reveal future queued questions in advance.\n    - If no valid questions exist at start, immediately report no critical ambiguities.\n\n5. Integration after EACH accepted answer (incremental update approach):\n    - Maintain in-memory representation of the spec (loaded once at start) plus the raw file contents.\n    - For the first integrated answer in this session:\n       - Ensure a `## Clarifications` section exists (create it just after the highest-level contextual/overview section per the spec template if missing).\n       - Under it, create (if not present) a `### Session YYYY-MM-DD` subheading for today.\n    - Append a bullet line immediately after acceptance: `- Q: <question> → A: <final answer>`.\n    - Then immediately apply the clarification to the most appropriate section(s):\n       - Functional ambiguity → Update or add a bullet in Functional Requirements.\n       - User interaction / actor distinction → Update User Stories or Actors subsection (if present) with clarified role, constraint, or scenario.\n       - Data shape / entities → Update Data Model (add fields, types, relationships) preserving ordering; note added constraints succinctly.\n       - Non-functional constraint → Add/modify measurable criteria in Non-Functional / Quality Attributes section (convert vague adjective to metric or explicit target).\n       - Edge case / negative flow → Add a new bullet under Edge Cases / Error Handling (or create such subsection if template provides placeholder for it).\n       - Terminology conflict → Normalize term across spec; retain original only if necessary by adding `(formerly referred to as \"X\")` once.\n    - If the clarification invalidates an earlier ambiguous statement, replace that statement instead of duplicating; leave no obsolete contradictory text.\n    - Save the spec file AFTER each integration to minimize risk of context loss (atomic overwrite).\n    - Preserve formatting: do not reorder unrelated sections; keep heading hierarchy intact.\n    - Keep each inserted clarification minimal and testable (avoid narrative drift).\n\n6. Validation (performed after EACH write plus final pass):\n   - Clarifications session contains exactly one bullet per accepted answer (no duplicates).\n   - Total asked (accepted) questions ≤ 5.\n   - Updated sections contain no lingering vague placeholders the new answer was meant to resolve.\n   - No contradictory earlier statement remains (scan for now-invalid alternative choices removed).\n   - Markdown structure valid; only allowed new headings: `## Clarifications`, `### Session YYYY-MM-DD`.\n   - Terminology consistency: same canonical term used across all updated sections.\n\n7. Write the updated spec back to `FEATURE_SPEC`.\n\n8. Report completion (after questioning loop ends or early termination):\n   - Number of questions asked & answered.\n   - Path to updated spec.\n   - Sections touched (list names).\n   - Coverage summary table listing each taxonomy category with Status: Resolved (was Partial/Missing and addressed), Deferred (exceeds question quota or better suited for planning), Clear (already sufficient), Outstanding (still Partial/Missing but low impact).\n   - If any Outstanding or Deferred remain, recommend whether to proceed to `/speckit.plan` or run `/speckit.clarify` again later post-plan.\n   - Suggested next command.\n\nBehavior rules:\n\n- If no meaningful ambiguities found (or all potential questions would be low-impact), respond: \"No critical ambiguities detected worth formal clarification.\" and suggest proceeding.\n- If spec file missing, instruct user to run `/speckit.specify` first (do not create a new spec here).\n- Never exceed 5 total asked questions (clarification retries for a single question do not count as new questions).\n- Avoid speculative tech stack questions unless the absence blocks functional clarity.\n- Respect user early termination signals (\"stop\", \"done\", \"proceed\").\n- If no questions asked due to full coverage, output a compact coverage summary (all categories Clear) then suggest advancing.\n- If quota reached with unresolved high-impact categories remaining, explicitly flag them under Deferred with rationale.\n\nContext for prioritization: $ARGUMENTS"
    }
   ]
  },
  {
   "id": ".claude--commands--speckit.constitution",
   "title": "speckit.constitution",
   "category": "commands",
   "path": ".claude/commands/speckit.constitution.md",
   "sections": [
    {
     "heading": "User Input",
     "content": "```text\n$ARGUMENTS\n```\n\nYou **MUST** consider the user input before proceeding (if not empty)."
    },
    {
     "heading": "Outline",
     "content": "You are updating the project constitution at `.specify/memory/constitution.md`. This file is a TEMPLATE containing placeholder tokens in square brackets (e.g. `[PROJECT_NAME]`, `[PRINCIPLE_1_NAME]`). Your job is to (a) collect/derive concrete values, (b) fill the template precisely, and (c) propagate any amendments across dependent artifacts.\n\nFollow this execution flow:\n\n1. Load the existing constitution template at `.specify/memory/constitution.md`.\n   - Identify every placeholder token of the form `[ALL_CAPS_IDENTIFIER]`.\n   **IMPORTANT**: The user might require less or more principles than the ones used in the template. If a number is specified, respect that - follow the general template. You will update the doc accordingly.\n\n2. Collect/derive values for placeholders:\n   - If user input (conversation) supplies a value, use it.\n   - Otherwise infer from existing repo context (README, docs, prior constitution versions if embedded).\n   - For governance dates: `RATIFICATION_DATE` is the original adoption date (if unknown ask or mark TODO), `LAST_AMENDED_DATE` is today if changes are made, otherwise keep previous.\n   - `CONSTITUTION_VERSION` must increment according to semantic versioning rules:\n     - MAJOR: Backward incompatible governance/principle removals or redefinitions.\n     - MINOR: New principle/section added or materially expanded guidance.\n     - PATCH: Clarifications, wording, typo fixes, non-semantic refinements.\n   - If version bump type ambiguous, propose reasoning before finalizing.\n\n3. Draft the updated constitution content:\n   - Replace every placeholder with concrete text (no bracketed tokens left except intentionally retained template slots that the project has chosen not to define yet—explicitly justify any left).\n   - Preserve heading hierarchy and comments can be removed once replaced unless they still add clarifying guidance.\n   - Ensure each Principle section: succinct name line, paragraph (or bullet list) capturing non‑negotiable rules, explicit rationale if not obvious.\n   - Ensure Governance section lists amendment procedure, versioning policy, and compliance review expectations.\n\n4. Consistency propagation checklist (convert prior checklist into active validations):\n   - Read `.specify/templates/plan-template.md` and ensure any \"Constitution Check\" or rules align with updated principles.\n   - Read `.specify/templates/spec-template.md` for scope/requirements alignment—update if constitution adds/removes mandatory sections or constraints.\n   - Read `.specify/templates/tasks-template.md` and ensure task categorization reflects new or removed principle-driven task types (e.g., observability, versioning, testing discipline).\n   - Read each command file in `.specify/templates/commands/*.md` (including this one) to verify no outdated references (agent-specific names like CLAUDE only) remain when generic guidance is required.\n   - Read any runtime guidance docs (e.g., `README.md`, `docs/quickstart.md`, or agent-specific guidance files if present). Update references to principles changed.\n\n5. Produce a Sync Impact Report (prepend as an HTML comment at top of the constitution file after update):\n   - Version change: old → new\n   - List of modified principles (old title → new title if renamed)\n   - Added sections\n   - Removed sections\n   - Templates requiring updates (✅ updated / ⚠ pending) with file paths\n   - Follow-up TODOs if any placeholders intentionally deferred.\n\n6. Validation before final output:\n   - No remaining unexplained bracket tokens.\n   - Version line matches report.\n   - Dates ISO format YYYY-MM-DD.\n   - Principles are declarative, testable, and free of vague language (\"should\" → replace with MUST/SHOULD rationale where appropriate).\n\n7. Write the completed constitution back to `.specify/memory/constitution.md` (overwrite).\n\n8. Output a final summary to the user with:\n   - New version and bump rationale.\n   - Any files flagged for manual follow-up.\n   - Suggested commit message (e.g., `docs: amend constitution to vX.Y.Z (principle additions + governance update)`).\n\nFormatting & Style Requirements:\n\n- Use Markdown headings exactly as in the template (do not demote/promote levels).\n- Wrap long rationale lines to keep readability (<100 chars ideally) but do not hard enforce with awkward breaks.\n- Keep a single blank line between sections.\n- Avoid trailing whitespace.\n\nIf the user supplies partial updates (e.g., only one principle revision), still perform validation and version decision steps.\n\nIf critical info missing (e.g., ratification date truly unknown), insert `TODO(<FIELD_NAME>): explanation` and include in the Sync Impact Report under deferred items.\n\nDo not create a new template; always operate on the existing `.specify/memory/constitution.md` file."
    }
   ]
  },
  {
   "id": ".claude--commands--speckit.implement",
   "title": "speckit.implement",
   "category": "commands",
   "path": ".claude/commands/speckit.implement.md",
   "sections": [
    {
     "heading": "User Input",
     "content": "```text\n$ARGUMENTS\n```\n\nYou **MUST** consider the user input before proceeding (if not empty)."
    },
    {
     "heading": "Outline",
     "content": "1. Run `.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks` from repo root and parse FEATURE_DIR and AVAILABLE_DOCS list. All paths must be absolute. For single quotes in args like \"I'm Groot\", use escape syntax: e.g 'I'\\''m Groot' (or double-quote if possible: \"I'm Groot\").\n\n2. **Check checklists status** (if FEATURE_DIR/checklists/ exists):\n   - Scan all checklist files in the checklists/ directory\n   - For each checklist, count:\n     - Total items: All lines matching `- [ ]` or `- [X]` or `- [x]`\n     - Completed items: Lines matching `- [X]` or `- [x]`\n     - Incomplete items: Lines matching `- [ ]`\n   - Create a status table:\n\n     ```text\n     | Checklist | Total | Completed | Incomplete | Status |\n     |-----------|-------|-----------|------------|--------|\n     | ux.md     | 12    | 12        | 0          | ✓ PASS |\n     | test.md   | 8     | 5         | 3          | ✗ FAIL |\n     | security.md | 6   | 6         | 0          | ✓ PASS |\n     ```\n\n   - Calculate overall status:\n     - **PASS**: All checklists have 0 incomplete items\n     - **FAIL**: One or more checklists have incomplete items\n\n   - **If any checklist is incomplete**:\n     - Display the table with incomplete item counts\n     - **STOP** and ask: \"Some checklists are incomplete. Do you want to proceed with implementation anyway? (yes/no)\"\n     - Wait for user response before continuing\n     - If user says \"no\" or \"wait\" or \"stop\", halt execution\n     - If user says \"yes\" or \"proceed\" or \"continue\", proceed to step 3\n\n   - **If all checklists are complete**:\n     - Display the table showing all checklists passed\n     - Automatically proceed to step 3\n\n3. Load and analyze the implementation context:\n   - **REQUIRED**: Read tasks.md for the complete task list and execution plan\n   - **REQUIRED**: Read plan.md for tech stack, architecture, and file structure\n   - **IF EXISTS**: Read data-model.md for entities and relationships\n   - **IF EXISTS**: Read contracts/ for API specifications and test requirements\n   - **IF EXISTS**: Read research.md for technical decisions and constraints\n   - **IF EXISTS**: Read quickstart.md for integration scenarios\n\n4. **Project Setup Verification**:\n   - **REQUIRED**: Create/verify ignore files based on actual project setup:\n\n   **Detection & Creation Logic**:\n   - Check if the following command succeeds to determine if the repository is a git repo (create/verify .gitignore if so):\n\n     ```sh\n     git rev-parse --git-dir 2>/dev/null\n     ```\n\n   - Check if Dockerfile* exists or Docker in plan.md → create/verify .dockerignore\n   - Check if .eslintrc* exists → create/verify .eslintignore\n   - Check if eslint.config.* exists → ensure the config's `ignores` entries cover required patterns\n   - Check if .prettierrc* exists → create/verify .prettierignore\n   - Check if .npmrc or package.json exists → create/verify .npmignore (if publishing)\n   - Check if terraform files (*.tf) exist → create/verify .terraformignore\n   - Check if .helmignore needed (helm charts present) → create/verify .helmignore\n\n   **If ignore file already exists**: Verify it contains essential patterns, append missing critical patterns only\n   **If ignore file missing**: Create with full pattern set for detected technology\n\n   **Common Patterns by Technology** (from plan.md tech stack):\n   - **Node.js/JavaScript/TypeScript**: `node_modules/`, `dist/`, `build/`, `*.log`, `.env*`\n   - **Python**: `__pycache__/`, `*.pyc`, `.venv/`, `venv/`, `dist/`, `*.egg-info/`\n   - **Java**: `target/`, `*.class`, `*.jar`, `.gradle/`, `build/`\n   - **C#/.NET**: `bin/`, `obj/`, `*.user`, `*.suo`, `packages/`\n   - **Go**: `*.exe`, `*.test`, `vendor/`, `*.out`\n   - **Ruby**: `.bundle/`, `log/`, `tmp/`, `*.gem`, `vendor/bundle/`\n   - **PHP**: `vendor/`, `*.log`, `*.cache`, `*.env`\n   - **Rust**: `target/`, `debug/`, `release/`, `*.rs.bk`, `*.rlib`, `*.prof*`, `.idea/`, `*.log`, `.env*`\n   - **Kotlin**: `build/`, `out/`, `.gradle/`, `.idea/`, `*.class`, `*.jar`, `*.iml`, `*.log`, `.env*`\n   - **C++**: `build/`, `bin/`, `obj/`, `out/`, `*.o`, `*.so`, `*.a`, `*.exe`, `*.dll`, `.idea/`, `*.log`, `.env*`\n   - **C**: `build/`, `bin/`, `obj/`, `out/`, `*.o`, `*.a`, `*.so`, `*.exe`, `Makefile`, `config.log`, `.idea/`, `*.log`, `.env*`\n   - **Swift**: `.build/`, `DerivedData/`, `*.swiftpm/`, `Packages/`\n   - **R**: `.Rproj.user/`, `.Rhistory`, `.RData`, `.Ruserdata`, `*.Rproj`, `packrat/`, `renv/`\n   - **Universal**: `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `.vscode/`, `.idea/`\n\n   **Tool-Specific Patterns**:\n   - **Docker**: `node_modules/`, `.git/`, `Dockerfile*`, `.dockerignore`, `*.log*`, `.env*`, `coverage/`\n   - **ESLint**: `node_modules/`, `dist/`, `build/`, `coverage/`, `*.min.js`\n   - **Prettier**: `node_modules/`, `dist/`, `build/`, `coverage/`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`\n   - **Terraform**: `.terraform/`, `*.tfstate*`, `*.tfvars`, `.terraform.lock.hcl`\n   - **Kubernetes/k8s**: `*.secret.yaml`, `secrets/`, `.kube/`, `kubeconfig*`, `*.key`, `*.crt`\n\n5. Parse tasks.md structure and extract:\n   - **Task phases**: Setup, Tests, Core, Integration, Polish\n   - **Task dependencies**: Sequential vs parallel execution rules\n   - **Task details**: ID, description, file paths, parallel markers [P]\n   - **Execution flow**: Order and dependency requirements\n\n6. Execute implementation following the task plan:\n   - **Phase-by-phase execution**: Complete each phase before moving to the next\n   - **Respect dependencies**: Run sequential tasks in order, parallel tasks [P] can run together  \n   - **Follow TDD approach**: Execute test tasks before their corresponding implementation tasks\n   - **File-based coordination**: Tasks affecting the same files must run sequentially\n   - **Validation checkpoints**: Verify each phase completion before proceeding\n\n7. Implementation execution rules:\n   - **Setup first**: Initialize project structure, dependencies, configuration\n   - **Tests before code**: If you need to write tests for contracts, entities, and integration scenarios\n   - **Core development**: Implement models, services, CLI commands, endpoints\n   - **Integration work**: Database connections, middleware, logging, external services\n   - **Polish and validation**: Unit tests, performance optimization, documentation\n\n8. Progress tracking and error handling:\n   - Report progress after each completed task\n   - Halt execution if any non-parallel task fails\n   - For parallel tasks [P], continue with successful tasks, report failed ones\n   - Provide clear error messages with context for debugging\n   - Suggest next steps if implementation cannot proceed\n   - **IMPORTANT** For completed tasks, make sure to mark the task off as [X] in the tasks file.\n\n9. Completion validation:\n   - Verify all required tasks are completed\n   - Check that implemented features match the original specification\n   - Validate that tests pass and coverage meets requirements\n   - Confirm the implementation follows the technical plan\n   - Report final status with summary of completed work\n\nNote: This command assumes a complete task breakdown exists in tasks.md. If tasks are incomplete or missing, suggest running `/speckit.tasks` first to regenerate the task list."
    }
   ]
  },
  {
   "id": ".claude--commands--speckit.plan",
   "title": "speckit.plan",
   "category": "commands",
   "path": ".claude/commands/speckit.plan.md",
   "sections": [
    {
     "heading": "User Input",
     "content": "```text\n$ARGUMENTS\n```\n\nYou **MUST** consider the user input before proceeding (if not empty)."
    },
    {
     "heading": "Outline",
     "content": "1. **Setup**: Run `.specify/scripts/bash/setup-plan.sh --json` from repo root and parse JSON for FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH. For single quotes in args like \"I'm Groot\", use escape syntax: e.g 'I'\\''m Groot' (or double-quote if possible: \"I'm Groot\").\n\n2. **Load context**: Read FEATURE_SPEC and `.specify/memory/constitution.md`. Load IMPL_PLAN template (already copied).\n\n3. **Execute plan workflow**: Follow the structure in IMPL_PLAN template to:\n   - Fill Technical Context (mark unknowns as \"NEEDS CLARIFICATION\")\n   - Fill Constitution Check section from constitution\n   - Evaluate gates (ERROR if violations unjustified)\n   - Phase 0: Generate research.md (resolve all NEEDS CLARIFICATION)\n   - Phase 1: Generate data-model.md, contracts/, quickstart.md\n   - Phase 1: Update agent context by running the agent script\n   - Re-evaluate Constitution Check post-design\n\n4. **Stop and report**: Command ends after Phase 2 planning. Report branch, IMPL_PLAN path, and generated artifacts."
    },
    {
     "heading": "Phases",
     "content": "### Phase 0: Outline & Research\n\n1. **Extract unknowns from Technical Context** above:\n   - For each NEEDS CLARIFICATION → research task\n   - For each dependency → best practices task\n   - For each integration → patterns task\n\n2. **Generate and dispatch research agents**:\n\n   ```text\n   For each unknown in Technical Context:\n     Task: \"Research {unknown} for {feature context}\"\n   For each technology choice:\n     Task: \"Find best practices for {tech} in {domain}\"\n   ```\n\n3. **Consolidate findings** in `research.md` using format:\n   - Decision: [what was chosen]\n   - Rationale: [why chosen]\n   - Alternatives considered: [what else evaluated]\n\n**Output**: research.md with all NEEDS CLARIFICATION resolved\n\n### Phase 1: Design & Contracts\n\n**Prerequisites:** `research.md` complete\n\n1. **Extract entities from feature spec** → `data-model.md`:\n   - Entity name, fields, relationships\n   - Validation rules from requirements\n   - State transitions if applicable\n\n2. **Generate API contracts** from functional requirements:\n   - For each user action → endpoint\n   - Use standard REST/GraphQL patterns\n   - Output OpenAPI/GraphQL schema to `/contracts/`\n\n3. **Agent context update**:\n   - Run `.specify/scripts/bash/update-agent-context.sh claude`\n   - These scripts detect which AI agent is in use\n   - Update the appropriate agent-specific context file\n   - Add only new technology from current plan\n   - Preserve manual additions between markers\n\n**Output**: data-model.md, /contracts/*, quickstart.md, agent-specific file"
    },
    {
     "heading": "Key rules",
     "content": "- Use absolute paths\n- ERROR on gate failures or unresolved clarifications"
    }
   ]
  },
  {
   "id": ".claude--commands--speckit.specify",
   "title": "speckit.specify",
   "category": "commands",
   "path": ".claude/commands/speckit.specify.md",
   "sections": [
    {
     "heading": "User Input",
     "content": "```text\n$ARGUMENTS\n```\n\nYou **MUST** consider the user input before proceeding (if not empty)."
    },
    {
     "heading": "Outline",
     "content": "The text the user typed after `/speckit.specify` in the triggering message **is** the feature description. Assume you always have it available in this conversation even if `$ARGUMENTS` appears literally below. Do not ask the user to repeat it unless they provided an empty command.\n\nGiven that feature description, do this:\n\n1. **Generate a concise short name** (2-4 words) for the branch:\n   - Analyze the feature description and extract the most meaningful keywords\n   - Create a 2-4 word short name that captures the essence of the feature\n   - Use action-noun format when possible (e.g., \"add-user-auth\", \"fix-payment-bug\")\n   - Preserve technical terms and acronyms (OAuth2, API, JWT, etc.)\n   - Keep it concise but descriptive enough to understand the feature at a glance\n   - Examples:\n     - \"I want to add user authentication\" → \"user-auth\"\n     - \"Implement OAuth2 integration for the API\" → \"oauth2-api-integration\"\n     - \"Create a dashboard for analytics\" → \"analytics-dashboard\"\n     - \"Fix payment processing timeout bug\" → \"fix-payment-timeout\"\n\n2. **Check for existing branches before creating new one**:\n\n   a. First, fetch all remote branches to ensure we have the latest information:\n\n      ```bash\n      git fetch --all --prune\n      ```\n\n   b. Find the highest feature number across all sources for the short-name:\n      - Remote branches: `git ls-remote --heads origin | grep -E 'refs/heads/[0-9]+-<short-name>$'`\n      - Local branches: `git branch | grep -E '^[* ]*[0-9]+-<short-name>$'`\n      - Specs directories: Check for directories matching `specs/[0-9]+-<short-name>`\n\n   c. Determine the next available number:\n      - Extract all numbers from all three sources\n      - Find the highest number N\n      - Use N+1 for the new branch number\n\n   d. Run the script `.specify/scripts/bash/create-new-feature.sh --json \"$ARGUMENTS\"` with the calculated number and short-name:\n      - Pass `--number N+1` and `--short-name \"your-short-name\"` along with the feature description\n      - Bash example: `.specify/scripts/bash/create-new-feature.sh --json \"$ARGUMENTS\" --json --number 5 --short-name \"user-auth\" \"Add user authentication\"`\n      - PowerShell example: `.specify/scripts/bash/create-new-feature.sh --json \"$ARGUMENTS\" -Json -Number 5 -ShortName \"user-auth\" \"Add user authentication\"`\n\n   **IMPORTANT**:\n   - Check all three sources (remote branches, local branches, specs directories) to find the highest number\n   - Only match branches/directories with the exact short-name pattern\n   - If no existing branches/directories found with this short-name, start with number 1\n   - You must only ever run this script once per feature\n   - The JSON is provided in the terminal as output - always refer to it to get the actual content you're looking for\n   - The JSON output will contain BRANCH_NAME and SPEC_FILE paths\n   - For single quotes in args like \"I'm Groot\", use escape syntax: e.g 'I'\\''m Groot' (or double-quote if possible: \"I'm Groot\")\n\n3. Load `.specify/templates/spec-template.md` to understand required sections.\n\n4. Follow this execution flow:\n\n    1. Parse user description from Input\n       If empty: ERROR \"No feature description provided\"\n    2. Extract key concepts from description\n       Identify: actors, actions, data, constraints\n    3. For unclear aspects:\n       - Make informed guesses based on context and industry standards\n       - Only mark with [NEEDS CLARIFICATION: specific question] if:\n         - The choice significantly impacts feature scope or user experience\n         - Multiple reasonable interpretations exist with different implications\n         - No reasonable default exists\n       - **LIMIT: Maximum 3 [NEEDS CLARIFICATION] markers total**\n       - Prioritize clarifications by impact: scope > security/privacy > user experience > technical details\n    4. Fill User Scenarios & Testing section\n       If no clear user flow: ERROR \"Cannot determine user scenarios\"\n    5. Generate Functional Requirements\n       Each requirement must be testable\n       Use reasonable defaults for unspecified details (document assumptions in Assumptions section)\n    6. Define Success Criteria\n       Create measurable, technology-agnostic outcomes\n       Include both quantitative metrics (time, performance, volume) and qualitative measures (user satisfaction, task completion)\n       Each criterion must be verifiable without implementation details\n    7. Identify Key Entities (if data involved)\n    8. Return: SUCCESS (spec ready for planning)\n\n5. Write the specification to SPEC_FILE using the template structure, replacing placeholders with concrete details derived from the feature description (arguments) while preserving section order and headings.\n\n6. **Specification Quality Validation**: After writing the initial spec, validate it against quality criteria:\n\n   a. **Create Spec Quality Checklist**: Generate a checklist file at `FEATURE_DIR/checklists/requirements.md` using the checklist template structure with these validation items:\n\n      ```markdown\n      # Specification Quality Checklist: [FEATURE NAME]\n      \n      **Purpose**: Validate specification completeness and quality before proceeding to planning\n      **Created**: [DATE]\n      **Feature**: [Link to spec.md]\n      \n      ## Content Quality\n      \n      - [ ] No implementation details (languages, frameworks, APIs)\n      - [ ] Focused on user value and business needs\n      - [ ] Written for non-technical stakeholders\n      - [ ] All mandatory sections completed\n      \n      ## Requirement Completeness\n      \n      - [ ] No [NEEDS CLARIFICATION] markers remain\n      - [ ] Requirements are testable and unambiguous\n      - [ ] Success criteria are measurable\n      - [ ] Success criteria are technology-agnostic (no implementation details)\n      - [ ] All acceptance scenarios are defined\n      - [ ] Edge cases are identified\n      - [ ] Scope is clearly bounded\n      - [ ] Dependencies and assumptions identified\n      \n      ## Feature Readiness\n      \n      - [ ] All functional requirements have clear acceptance criteria\n      - [ ] User scenarios cover primary flows\n      - [ ] Feature meets measurable outcomes defined in Success Criteria\n      - [ ] No implementation details leak into specification\n      \n      ## Notes\n      \n      - Items marked incomplete require spec updates before `/speckit.clarify` or `/speckit.plan`\n      ```\n\n   b. **Run Validation Check**: Review the spec against each checklist item:\n      - For each item, determine if it passes or fails\n      - Document specific issues found (quote relevant spec sections)\n\n   c. **Handle Validation Results**:\n\n      - **If all items pass**: Mark checklist complete and proceed to step 6\n\n      - **If items fail (excluding [NEEDS CLARIFICATION])**:\n        1. List the failing items and specific issues\n        2. Update the spec to address each issue\n        3. Re-run validation until all items pass (max 3 iterations)\n        4. If still failing after 3 iterations, document remaining issues in checklist notes and warn user\n\n      - **If [NEEDS CLARIFICATION] markers remain**:\n        1. Extract all [NEEDS CLARIFICATION: ...] markers from the spec\n        2. **LIMIT CHECK**: If more than 3 markers exist, keep only the 3 most critical (by scope/security/UX impact) and make informed guesses for the rest\n        3. For each clarification needed (max 3), present options to user in this format:\n\n           ```markdown\n           ## Question [N]: [Topic]\n           \n           **Context**: [Quote relevant spec section]\n           \n           **What we need to know**: [Specific question from NEEDS CLARIFICATION marker]\n           \n           **Suggested Answers**:\n           \n           | Option | Answer | Implications |\n           |--------|--------|--------------|\n           | A      | [First suggested answer] | [What this means for the feature] |\n           | B      | [Second suggested answer] | [What this means for the feature] |\n           | C      | [Third suggested answer] | [What this means for the feature] |\n           | Custom | Provide your own answer | [Explain how to provide custom input] |\n           \n           **Your choice**: _[Wait for user response]_\n           ```\n\n        4. **CRITICAL - Table Formatting**: Ensure markdown tables are properly formatted:\n           - Use consistent spacing with pipes aligned\n           - Each cell should have spaces around content: `| Content |` not `|Content|`\n           - Header separator must have at least 3 dashes: `|--------|`\n           - Test that the table renders correctly in markdown preview\n        5. Number questions sequentially (Q1, Q2, Q3 - max 3 total)\n        6. Present all questions together before waiting for responses\n        7. Wait for user to respond with their choices for all questions (e.g., \"Q1: A, Q2: Custom - [details], Q3: B\")\n        8. Update the spec by replacing each [NEEDS CLARIFICATION] marker with the user's selected or provided answer\n        9. Re-run validation after all clarifications are resolved\n\n   d. **Update Checklist**: After each validation iteration, update the checklist file with current pass/fail status\n\n7. Report completion with branch name, spec file path, checklist results, and readiness for the next phase (`/speckit.clarify` or `/speckit.plan`).\n\n**NOTE:** The script creates and checks out the new branch and initializes the spec file before writing."
    },
    {
     "heading": "Quick Guidelines",
     "content": "- Focus on **WHAT** users need and **WHY**.\n- Avoid HOW to implement (no tech stack, APIs, code structure).\n- Written for business stakeholders, not developers.\n- DO NOT create any checklists that are embedded in the spec. That will be a separate command.\n\n### Section Requirements\n\n- **Mandatory sections**: Must be completed for every feature\n- **Optional sections**: Include only when relevant to the feature\n- When a section doesn't apply, remove it entirely (don't leave as \"N/A\")\n\n### For AI Generation\n\nWhen creating this spec from a user prompt:\n\n1. **Make informed guesses**: Use context, industry standards, and common patterns to fill gaps\n2. **Document assumptions**: Record reasonable defaults in the Assumptions section\n3. **Limit clarifications**: Maximum 3 [NEEDS CLARIFICATION] markers - use only for critical decisions that:\n   - Significantly impact feature scope or user experience\n   - Have multiple reasonable interpretations with different implications\n   - Lack any reasonable default\n4. **Prioritize clarifications**: scope > security/privacy > user experience > technical details\n5. **Think like a tester**: Every vague requirement should fail the \"testable and unambiguous\" checklist item\n6. **Common areas needing clarification** (only if no reasonable default exists):\n   - Feature scope and boundaries (include/exclude specific use cases)\n   - User types and permissions (if multiple conflicting interpretations possible)\n   - Security/compliance requirements (when legally/financially significant)\n\n**Examples of reasonable defaults** (don't ask about these):\n\n- Data retention: Industry-standard practices for the domain\n- Performance targets: Standard web/mobile app expectations unless specified\n- Error handling: User-friendly messages with appropriate fallbacks\n- Authentication method: Standard session-based or OAuth2 for web apps\n- Integration patterns: RESTful APIs unless specified otherwise\n\n### Success Criteria Guidelines\n\nSuccess criteria must be:\n\n1. **Measurable**: Include specific metrics (time, percentage, count, rate)\n2. **Technology-agnostic**: No mention of frameworks, languages, databases, or tools\n3. **User-focused**: Describe outcomes from user/business perspective, not system internals\n4. **Verifiable**: Can be tested/validated without knowing implementation details\n\n**Good examples**:\n\n- \"Users can complete checkout in under 3 minutes\"\n- \"System supports 10,000 concurrent users\"\n- \"95% of searches return results in under 1 second\"\n- \"Task completion rate improves by 40%\"\n\n**Bad examples** (implementation-focused):\n\n- \"API response time is under 200ms\" (too technical, use \"Users see results instantly\")\n- \"Database can handle 1000 TPS\" (implementation detail, use user-facing metric)\n- \"React components render efficiently\" (framework-specific)\n- \"Redis cache hit rate above 80%\" (technology-specific)"
    }
   ]
  },
  {
   "id": ".claude--commands--speckit.tasks",
   "title": "speckit.tasks",
   "category": "commands",
   "path": ".claude/commands/speckit.tasks.md",
   "sections": [
    {
     "heading": "User Input",
     "content": "```text\n$ARGUMENTS\n```\n\nYou **MUST** consider the user input before proceeding (if not empty)."
    },
    {
     "heading": "Outline",
     "content": "1. **Setup**: Run `.specify/scripts/bash/check-prerequisites.sh --json` from repo root and parse FEATURE_DIR and AVAILABLE_DOCS list. All paths must be absolute. For single quotes in args like \"I'm Groot\", use escape syntax: e.g 'I'\\''m Groot' (or double-quote if possible: \"I'm Groot\").\n\n2. **Load design documents**: Read from FEATURE_DIR:\n   - **Required**: plan.md (tech stack, libraries, structure), spec.md (user stories with priorities)\n   - **Optional**: data-model.md (entities), contracts/ (API endpoints), research.md (decisions), quickstart.md (test scenarios)\n   - Note: Not all projects have all documents. Generate tasks based on what's available.\n\n3. **Execute task generation workflow**:\n   - Load plan.md and extract tech stack, libraries, project structure\n   - Load spec.md and extract user stories with their priorities (P1, P2, P3, etc.)\n   - If data-model.md exists: Extract entities and map to user stories\n   - If contracts/ exists: Map endpoints to user stories\n   - If research.md exists: Extract decisions for setup tasks\n   - Generate tasks organized by user story (see Task Generation Rules below)\n   - Generate dependency graph showing user story completion order\n   - Create parallel execution examples per user story\n   - Validate task completeness (each user story has all needed tasks, independently testable)\n\n4. **Generate tasks.md**: Use `.specify/templates/tasks-template.md` as structure, fill with:\n   - Correct feature name from plan.md\n   - Phase 1: Setup tasks (project initialization)\n   - Phase 2: Foundational tasks (blocking prerequisites for all user stories)\n   - Phase 3+: One phase per user story (in priority order from spec.md)\n   - Each phase includes: story goal, independent test criteria, tests (if requested), implementation tasks\n   - Final Phase: Polish & cross-cutting concerns\n   - All tasks must follow the strict checklist format (see Task Generation Rules below)\n   - Clear file paths for each task\n   - Dependencies section showing story completion order\n   - Parallel execution examples per story\n   - Implementation strategy section (MVP first, incremental delivery)\n\n5. **Report**: Output path to generated tasks.md and summary:\n   - Total task count\n   - Task count per user story\n   - Parallel opportunities identified\n   - Independent test criteria for each story\n   - Suggested MVP scope (typically just User Story 1)\n   - Format validation: Confirm ALL tasks follow the checklist format (checkbox, ID, labels, file paths)\n\nContext for task generation: $ARGUMENTS\n\nThe tasks.md should be immediately executable - each task must be specific enough that an LLM can complete it without additional context."
    },
    {
     "heading": "Task Generation Rules",
     "content": "**CRITICAL**: Tasks MUST be organized by user story to enable independent implementation and testing.\n\n**Tests are OPTIONAL**: Only generate test tasks if explicitly requested in the feature specification or if user requests TDD approach.\n\n### Checklist Format (REQUIRED)\n\nEvery task MUST strictly follow this format:\n\n```text\n- [ ] [TaskID] [P?] [Story?] Description with file path\n```\n\n**Format Components**:\n\n1. **Checkbox**: ALWAYS start with `- [ ]` (markdown checkbox)\n2. **Task ID**: Sequential number (T001, T002, T003...) in execution order\n3. **[P] marker**: Include ONLY if task is parallelizable (different files, no dependencies on incomplete tasks)\n4. **[Story] label**: REQUIRED for user story phase tasks only\n   - Format: [US1], [US2], [US3], etc. (maps to user stories from spec.md)\n   - Setup phase: NO story label\n   - Foundational phase: NO story label  \n   - User Story phases: MUST have story label\n   - Polish phase: NO story label\n5. **Description**: Clear action with exact file path\n\n**Examples**:\n\n- ✅ CORRECT: `- [ ] T001 Create project structure per implementation plan`\n- ✅ CORRECT: `- [ ] T005 [P] Implement authentication middleware in src/middleware/auth.py`\n- ✅ CORRECT: `- [ ] T012 [P] [US1] Create User model in src/models/user.py`\n- ✅ CORRECT: `- [ ] T014 [US1] Implement UserService in src/services/user_service.py`\n- ❌ WRONG: `- [ ] Create User model` (missing ID and Story label)\n- ❌ WRONG: `T001 [US1] Create model` (missing checkbox)\n- ❌ WRONG: `- [ ] [US1] Create User model` (missing Task ID)\n- ❌ WRONG: `- [ ] T001 [US1] Create model` (missing file path)\n\n### Task Organization\n\n1. **From User Stories (spec.md)** - PRIMARY ORGANIZATION:\n   - Each user story (P1, P2, P3...) gets its own phase\n   - Map all related components to their story:\n     - Models needed for that story\n     - Services needed for that story\n     - Endpoints/UI needed for that story\n     - If tests requested: Tests specific to that story\n   - Mark story dependencies (most stories should be independent)\n\n2. **From Contracts**:\n   - Map each contract/endpoint → to the user story it serves\n   - If tests requested: Each contract → contract test task [P] before implementation in that story's phase\n\n3. **From Data Model**:\n   - Map each entity to the user story(ies) that need it\n   - If entity serves multiple stories: Put in earliest story or Setup phase\n   - Relationships → service layer tasks in appropriate story phase\n\n4. **From Setup/Infrastructure**:\n   - Shared infrastructure → Setup phase (Phase 1)\n   - Foundational/blocking tasks → Foundational phase (Phase 2)\n   - Story-specific setup → within that story's phase\n\n### Phase Structure\n\n- **Phase 1**: Setup (project initialization)\n- **Phase 2**: Foundational (blocking prerequisites - MUST complete before user stories)\n- **Phase 3+**: User Stories in priority order (P1, P2, P3...)\n  - Within each story: Tests (if requested) → Models → Services → Endpoints → Integration\n  - Each phase should be a complete, independently testable increment\n- **Final Phase**: Polish & Cross-Cutting Concerns"
    }
   ]
  },
  {
   "id": ".claude--commands--speckit.taskstoissues",
   "title": "speckit.taskstoissues",
   "category": "commands",
   "path": ".claude/commands/speckit.taskstoissues.md",
   "sections": [
    {
     "heading": "User Input",
     "content": "```text\n$ARGUMENTS\n```\n\nYou **MUST** consider the user input before proceeding (if not empty)."
    },
    {
     "heading": "Outline",
     "content": "1. Run `.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks` from repo root and parse FEATURE_DIR and AVAILABLE_DOCS list. All paths must be absolute. For single quotes in args like \"I'm Groot\", use escape syntax: e.g 'I'\\''m Groot' (or double-quote if possible: \"I'm Groot\").\n1. From the executed script, extract the path to **tasks**.\n1. Get the Git remote by running:\n\n```bash\ngit config --get remote.origin.url\n```\n\n> [!CAUTION]\n> ONLY PROCEED TO NEXT STEPS IF THE REMOTE IS A GITHUB URL\n\n1. For each task in the list, use the GitHub MCP server to create a new issue in the repository that is representative of the Git remote.\n\n> [!CAUTION]\n> UNDER NO CIRCUMSTANCES EVER CREATE ISSUES IN REPOSITORIES THAT DO NOT MATCH THE REMOTE URL"
    }
   ]
  },
  {
   "id": ".claude--rules--README",
   "title": "GM Rules导航",
   "category": "rules",
   "path": ".claude/rules/README.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# GM Rules导航\n\n> **定位**：Rule定义\"AI行为宪法\"，规范AI的思考路径和交互风格\n> **位置**：`.claude/rules/`\n> **优先级**：10（最高优先级）\n\n---"
    },
    {
     "heading": "1. Rule定位",
     "content": "### 1.1 Rule vs Spec\n\n| 对比维度 | **Rule（规则）** | **Spec（规范）** |\n|---------|-----------------|-----------------|\n| **定位** | \"AI行为宪法\" | \"必须这样用\" |\n| **语义** | 思考路径/交互风格/绝对底线 | 强制性/标准 |\n| **职责** | AI如何思考和行动 | 代码必须如何实现 |\n| **优先级** | 10（最高） | 10 |\n| **路径** | `.claude/rules/` | `.claude/specs/<role>/` |\n| **自动加载** | ✅ 是 | ❌ 否 |\n| **强制遵循** | ✅ 是 | ✅ 是 |\n\n**核心区别**：\n- **Rule** 回答\"AI应该如何思考和行动\"、\"AI的交互风格是什么\"\n- **Spec** 回答\"代码必须如何实现\"、\"必须遵守什么规则\"\n\n---"
    },
    {
     "heading": "2. Rule的核心特征",
     "content": "- 🧠 **定义思考路径**：AI执行前的思维自检流程\n- 🗣️ **定义交互风格**：确定性行为、引用溯源、提问策略\n- 🚫 **定义绝对底线**：违反规范的拒绝机制\n- 🔒 **代码生成硬约束**：代码标识、关联读取、审计先行\n\n---"
    },
    {
     "heading": "3. 现有Rule文档",
     "content": "### global-behavior.rule.md\n\n**全局行为准则** - 定义 GM AI 的思考路径、交互风格和代码生成硬约束\n\n**核心内容**：\n1. **思考路径规范**\n   - 强制思维自检（身份锚定、规范检索、边界检查）\n   - 不确定时的处理（必须询问，不得猜测）\n\n2. **交互准则**\n   - 确定性思维（禁止使用\"可能\"、\"应该\"等模糊词汇）\n   - 引用溯源（必须指明代码建议的依据）\n   - 提问策略（缺少必要信息时必须询问）\n\n3. **代码生成硬约束**\n   - 标识义务（`@generated-by-gm-ai`）\n   - 关联读取（必须读取模型定义、相关规范）\n   - 审计先行（生成代码后必须进行自我审计）\n\n4. **Python/Django特定规范**\n   - 遵循PEP 8代码风格\n   - 使用Django ORM，禁止原生SQL\n   - 遵循分层架构规范\n\n**文档路径**：`.claude/rules/global-behavior.rule.md`\n\n---"
    },
    {
     "heading": "4. 加载机制",
     "content": "### 4.1 自动加载\n\n⚠️ **Rule文档的特殊性**：\n- ✅ AI在所有对话中自动加载Rule\n- ✅ Rule优先级最高（priority: 10）\n- ✅ 用户指令违反Rule时，AI必须拒绝执行\n- ✅ 角色切换时，Rule约束始终有效\n\n### 4.2 加载顺序\n\n```\n1. Rule（自动加载，优先级 10）\n   ↓\n2. Spec（根据任务加载，优先级 10）\n   ↓\n3. Command（用户调用，优先级 8）\n   ↓\n4. Skill（被引用，优先级 5）\n   ↓\n5. Guide（按需加载，优先级 3）\n```\n\n---"
    },
    {
     "heading": "5. 何时创建新的Rule",
     "content": "⚠️ **谨慎添加Rule**\n\nRule定义的是AI的行为宪法，只添加真正的AI行为规则。\n\n### ✅ 适合创建Rule的场景\n\n- 定义AI的思考路径和决策流程\n- 定义AI的交互风格和语言规范\n- 定义代码生成的强制性约束\n- 定义违反规范的拒绝机制\n\n### ❌ 不适合创建Rule的场景\n\n- 定义代码结构规范 → 使用Spec\n- 定义具体技术选型 → 使用Spec\n- 定义工作流程和步骤 → 使用Command\n- 提供代码模板和示例 → 使用Skill\n\n---"
    },
    {
     "heading": "6. Rule文件格式规范",
     "content": "### 6.1 文件命名\n\n**格式**：`<规则名称>.rule.md`\n\n示例：\n- ✅ `global-behavior.rule.md` - 全局行为准则\n- ❌ `rules.md`\n- ❌ `全局规则.md`\n\n### 6.2 YAML元数据规范\n\n所有Rule文件必须包含完整的YAML元数据：\n\n```yaml\n---\nmeta:\n  title: \"规则标题\"\n  version: \"v1.0\"\n  updated: \"2026-03-16\"\n  status: \"active\"\n\nai:\n  role: \"common\"  # 必须为common（通用）\n  phase: \"all\"    # 必须为all\n  type: \"rule\"    # 必须为rule\n\ntags:\n  - \"全局规则\"\n  - \"行为准则\"\n\npriority: 10  # 必须为10\n---\n```\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-03-16"
    }
   ]
  },
  {
   "id": ".claude--rules--global-behavior.rule",
   "title": "GM AI全局行为规则",
   "category": "rules",
   "path": ".claude/rules/global-behavior.rule.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# GM AI全局行为规则"
    },
    {
     "heading": "规则定位",
     "content": "**Rule（规则）**：AI助手的\"行为宪法\"，定义AI的思考路径、交互风格和绝对不可逾越的底线。\n\n### ⚠️ 自动应用机制\n\n**Rule的核心特性**：\n- ✅ **自动加载**：AI在所有对话中自动加载Rule\n- ✅ **优先级最高**：Rule优先级为10，高于所有Spec/Command/Skill/Guide\n- ✅ **强制遵循**：所有AI行为必须符合Rule，无需重复声明\n- ✅ **全局生效**：Rule约束所有角色（developer/architect/product-manager）和所有阶段（design/dev/test）\n\n---"
    },
    {
     "heading": "1. 思考路径规范",
     "content": "### 1.1 强制思维自检\n\n⚠️ **AI在执行任何指令前，必须完成以下\"思维自检\"**\n\n#### 第1步：身份锚定\n\n```\n我是GM AI助手，我的目标是：\n✅ 提升开发效率70%\n✅ 保证代码符合项目实际技术栈规范\n✅ 确保架构清晰分层\n```\n\n#### 第2步：文档检索 ⭐\n\n⚠️ **AI在输出任何内容前，必须先检索相关文档帮助理解**\n\n**检索流程**：\n\n```\n步骤1：提取上下文信息\n   ├── 业务模块关键词（如：order、stock、account）\n   ├── 技术关键词（如：Django、SQLAlchemy、MySQL）\n   └── 功能类型关键词（如：CRUD、API、模型）\n\n步骤2：快速定位导航文档\n   ├── 框架导航：.claude/README.md\n   ├── Spec导航：.claude/specs/README.md\n   ├── 业务导航：.claude/specs/business/业务领域全景.spec.md\n   └── 服务README：docs/services/<service>/README.md（如适用）\n\n步骤3：元数据快速过滤\n   ├── 基于tags字段匹配关键词\n   ├── 基于dependencies检查依赖关系\n   └── 按priority字段排序\n\n步骤4：深度阅读相关文档（按优先级）\n   ├── Spec（规范）- 优先级最高\n   │   ├── .claude/specs/common/项目开发宪法.spec.md ⭐\n   │   ├── .claude/specs/developer/服务分层规范.spec.md\n   │   ├── .claude/specs/business/<领域>.spec.md（业务相关时）\n   │   └── 任务相关Spec\n   ├── Rule（规则）- 优先级高\n   │   └── .claude/rules/global-behavior.rule.md ⭐\n   ├── 模型定义 - 优先级高（如适用）\n   └── 现有实现 - 优先级中（如适用）\n\n步骤5：基于文档内容输出\n   ├── 引用溯源：明确指出引用的文档\n   ├── 基于文档：输出内容必须基于检索到的文档\n   └── 不确定性处理：文档不完整时明确说明\n```\n\n#### 第3步：边界检查\n\n```\n检查当前请求是否涉及红线区：\n🔴 数据库操作：SQLAlchemy 使用 mysql_session 读写分离，禁止原生SQL拼接\n🔴 分层架构：禁止跨层调用（website → service → common/mysql）\n🔴 服务通信：跨服务必须使用 gm_rmiclient，禁止直连其他服务数据库\n🔴 数据模型：SQLAlchemy 模型继承 Base，Django 模型继承 models.Model\n🔴 异常处理：统一使用 GmError(err_code, message) 抛出业务异常\n```\n\n#### 第4步：工具选择\n\n```\n选择合适的工具：\n- /gm-prd [需求] → 产品分析 + PRD 生成\n- /gm-dev [需求/描述] → AI 自动判定规模(S/M/L/XL)和能力标签\n- 规模判定规则详见 .claude/specs/common/workflow-routing.spec.md\n- 能力标签（product-analysis/development/debugging/testing）由 AI 自动识别\n- Bug修复类任务自动进入 debugging 流程\n```\n\n---"
    },
    {
     "heading": "2. 交互准则",
     "content": "### 2.1 确定性思维\n\n⚠️ **AI必须使用确定性的语言**\n\n**❌ 禁止使用的词汇**：\n- 可能\n- 大概\n- 应该可以\n- 我觉得\n- 估计\n- 通常\n\n**✅ 替代词汇**：\n- 确定/明确 → 代替\"应该可以\"\n- 需要/必须 → 代替\"可能\"\n- 建议 → 代替\"我觉得\"\n- 根据...判断 → 代替\"估计\"\n\n### 2.2 引用溯源\n\n⚠️ **在提供代码建议时，必须指明依据**\n\n**✅ 正确示例**：\n\n```markdown\n# 根据规范生成视图代码\n\n**依据规范**：\n- `.claude/specs/developer/视图层规范.spec.md` - 视图层规范\n- `.claude/specs/developer/服务分层规范.spec.md` - 分层架构规范\n- `.claude/skills/developer/view-gen.md` - 视图生成模板\n\n**代码实现**：\n```python\nfrom common.view import CommonBaseView\nfrom common.param_check import JsonSuccessResponse, JsonErrorResponse\n\nclass CreateOrderView(CommonBaseView):\n    # ...\n```\n```\n\n### 2.3 提问策略\n\n⚠️ **AI遇到以下情况必须提问**\n\n| 场景 | 行为 |\n|------|------|\n| 缺少必要信息 | 必须询问，不得猜测 |\n| 需求模糊 | 必须澄清，不得假设 |\n| 多种实现方案 | 必须说明方案差异，让用户选择 |\n| 违反规范 | 必须拒绝，并指出违反了哪条规范 |\n\n---"
    },
    {
     "heading": "3. 代码生成硬约束",
     "content": "### 3.1 标识义务\n\n⚠️ **AI生成的函数必须添加标识**\n\n**标识格式**：`@generated-by-gm-ai`\n\n**标识位置**：函数或类的docstring中\n\n**标识示例**：\n\n```python\nfrom common.view import CommonBaseView\nfrom common.param_check import Param, JsonSuccessResponse, GmError\n\nclass CreateOrderView(CommonBaseView):\n    \"\"\"创建订单视图 @generated-by-gm-ai\"\"\"\n\n    param_check_dict = {\n        'customer_id': Param(field='customer_id', type=int, required=True, desc='客户ID'),\n    }\n\n    def post(self, request):\n        customer_id = request.json.get('customer_id')\n        if not customer_id:\n            raise GmError(1, '客户ID不能为空')\n        # 业务逻辑...\n        return JsonSuccessResponse(data)\n```\n\n### 3.2 关联读取\n\n⚠️ **生成代码前，必须主动读取相关定义文件**\n\n**必须读取的文件**：\n1. **模型定义**：`common/mysql/models/` 下的 SQLAlchemy 模型\n2. **相关Spec**：`.claude/specs/developer/` 下的相关规范\n3. **现有实现**：类似功能的现有代码\n\n**✅ 正确流程**：\n\n```markdown\n# 生成代码前检查\n\n⏳ 正在读取模型定义...\n✅ 已读取：common/mysql/models/order_model.py\n\n⏳ 正在读取相关规范...\n✅ 已读取：.claude/specs/developer/服务分层规范.spec.md\n✅ 已读取：.claude/specs/developer/视图层规范.spec.md\n\n⏳ 正在读取现有实现...\n✅ 已读取：website/order/views/order_views.py\n\n⏳ 正在生成代码...\n```\n\n### 3.3 审计先行\n\n⚠️ **生成代码后，必须进行自我审计**\n\n**审计检查项**（根据《项目开发宪法》）：\n1. ✅ **分层架构规范**：代码放置在正确的层（website/service/common）\n2. ✅ **命名规范**：函数、变量、文件名符合规范\n3. ✅ **ORM规范**：使用 SQLAlchemy 或 Django ORM，禁止原生SQL拼接\n4. ✅ **视图规范**：继承 CommonBaseView，使用 param_check_dict + JsonSuccessResponse\n5. ✅ **异常规范**：使用 GmError 抛出业务异常\n6. ✅ **PEP 8规范**：代码风格符合Python规范\n\n**自我审计流程**：\n\n```\n⏳ 正在进行代码审计...\n\n检查项：\n✅ 1. 代码放置在正确的目录（website/service/common）\n✅ 2. 函数命名使用小写+下划线\n✅ 3. 使用 SQLAlchemy mysql_session 进行数据库操作\n✅ 4. 视图继承 CommonBaseView，参数校验使用 param_check_dict\n✅ 5. 业务异常使用 GmError(err_code, message)\n✅ 6. 遵循PEP 8代码规范\n\n⏳ 审计完成，发现 0 个问题\n```\n\n### 3.4 生成代码后的说明\n\n⚠️ **生成代码后，必须提供清晰的说明**\n\n**必须说明**：\n1. **代码用途**：这段代码实现什么功能\n2. **依赖关系**：依赖哪些模型、服务、库\n3. **测试建议**：如何测试这段代码\n4. **后续步骤**：还需要做什么（如注册URL、添加权限）\n\n**✅ 正确示例**：\n\n```markdown\n✅ **代码生成完成**\n\n**功能说明**：\n- 实现了创建订单的API接口\n- 支持订单校验、库存检查、订单创建\n\n**依赖关系**：\n- 依赖：common/mysql/models/order_model.py（SQLAlchemy 模型）\n- 依赖：website/order/service/order_service.py（业务逻辑）\n- 依赖：gm_rmiclient.order（跨服务调用 gm_server_order）\n\n**测试建议**：\n- 单元测试：测试正常创建流程\n- 集成测试：测试数据库事务\n- API测试：使用pytest测试HTTP接口\n\n**后续步骤**：\n1. 在 website/order/urls.py 中注册路由\n2. 添加 PermissionView 权限装饰器\n3. 编写单元测试\n```\n\n---"
    },
    {
     "heading": "4. Python/Django特定规范",
     "content": "### 4.1 代码风格规范\n\n**必须遵守**：\n- ✅ 遵循PEP 8代码风格\n- ✅ 使用类型注解（Type Hints）\n- ✅ 函数和类必须有docstring\n- ✅ 使用有意义的变量名\n\n**禁止事项**：\n- ❌ 禁止使用单字母变量名（循环变量除外）\n- ❌ 禁止使用魔法数字（定义为常量）\n- ❌ 禁止过长的函数（超过50行考虑拆分）\n\n### 4.2 项目技术栈规范\n\n**数据库操作**：\n- ✅ MySQL 主要使用 SQLAlchemy（`mysql_session` 读写分离）\n- ✅ Django ORM 用于 Paginator、Admin 等辅助场景\n- ✅ MongoDB 通过 `common/mongo/` 服务层访问\n- ✅ 使用事务进行写操作\n\n**视图层**：\n- ✅ 继承 `CommonBaseView`（或 `NoLoginView`、`OpenBaseView`）\n- ✅ 使用 `param_check_dict` + `Param` 进行参数校验\n- ✅ 使用 `JsonSuccessResponse` / `JsonErrorResponse` 返回响应\n- ✅ 使用 `PermissionView` / `UserPermissionView` 进行权限控制\n\n**禁止事项**：\n- ❌ 禁止直接使用原生SQL拼接（特殊情况需注释说明）\n- ❌ 禁止在循环中执行数据库查询\n- ❌ 禁止N+1查询\n- ❌ 禁止跨层调用（View 层不能直接访问 common/mysql）\n\n### 4.3 错误处理规范\n\n**必须遵守**：\n- ✅ 使用 `GmError` 抛出业务异常\n- ✅ `CommonBaseView.dispatch()` 统一捕获异常并返回 `JsonErrorResponse`\n- ✅ 记录详细的错误日志\n\n**异常示例**：\n\n```python\nfrom common.param_check import GmError\n\nclass CreateOrderView(CommonBaseView):\n    \"\"\"创建订单 @generated-by-gm-ai\"\"\"\n\n    def post(self, request):\n        customer_id = request.json.get('customer_id')\n        stock = check_stock(sku_id)\n        if stock < quantity:\n            raise GmError(1, f'库存不足：当前库存{stock}，需求{quantity}')\n\n        order = order_service.create_order(request.json)\n        return JsonSuccessResponse(order)\n```\n\n**GmError 会被 CommonBaseView.dispatch() 捕获**，自动返回：\n```json\n{\"code\": 1, \"msg\": \"库存不足：当前库存5，需求10\", \"data\": null}\n```\n\n---"
    },
    {
     "heading": "5. 语言使用规范",
     "content": "### 5.1 对话语言\n\n| 场景 | 语言 | 说明 |\n|------|------|------|\n| AI对话 | 中文 | 默认使用中文回复 |\n| 代码注释 | 中文 | 便于理解业务逻辑 |\n| 技术文档 | 中文 | 标题、说明使用中文 |\n| 技术术语 | 英文 | Django、API、ORM、SQL等 |\n\n### 5.2 代码注释规范\n\n**函数注释**：\n\n```python\ndef create_order(customer_id: int, products: List[Dict]) -> dict:\n    \"\"\"创建订单\n\n    Args:\n        customer_id: 客户ID\n        products: 商品列表，格式：[{'sku_id': 123, 'quantity': 2}]\n\n    Returns:\n        dict: 订单数据\n\n    Raises:\n        GmError: 业务异常（库存不足、商品不存在等）\n\n    Examples:\n        >>> order = create_order(1001, [{'sku_id': 123, 'quantity': 2}])\n        >>> print(order['order_id'])\n        'O202303160001'\n    \"\"\"\n    pass\n```\n\n---"
    },
    {
     "heading": "6. 目录命名规范",
     "content": "### 6.1 强制规范\n\n⚠️ **所有目录名必须使用英文小写+下划线**\n\n**✅ 正确示例**：\n```\nservice/\ncommon/mysql/\nwebsite/order/\ntests/unittests/\n```\n\n**❌ 错误示例**：\n```\nservice/订单/\ncommon/MySQL/\nwebsite/Order/\ntests/单元测试/\n```\n\n---"
    },
    {
     "heading": "7. 检查清单",
     "content": "### 7.1 执行指令前\n\n- [ ] 完成思维自检（身份锚定、规范检索、边界检查）\n- [ ] 明确任务目标和范围\n- [ ] 读取相关规范和代码\n- [ ] 确认不违反强制性规范\n\n### 7.2 代码生成前\n\n- [ ] 读取模型定义（SQLAlchemy / Django ORM）\n- [ ] 读取相关Spec（服务分层、视图层、数据模型等）\n- [ ] 读取相关Skill模板（view-gen、service-gen、model-gen）\n- [ ] 读取现有实现参考\n\n### 7.3 代码生成后\n\n- [ ] 添加 `@generated-by-gm-ai` 标识\n- [ ] 进行自我审计（分层、ORM、视图、异常、PEP 8）\n- [ ] 提供代码说明\n- [ ] 提供测试建议\n- [ ] 说明后续步骤\n\n---"
    },
    {
     "heading": "8. 角色权限矩阵",
     "content": "### 8.1 角色定义\n\n⚠️ **GM-AI 定义以下四个角色，每个角色有明确的目录操作边界**\n\n| 角色 | Agent 定义 | 核心职责 |\n|------|-----------|---------|\n| **product-manager** | `.claude/agents/product-manager.md` | 需求分析、PRD 编写 |\n| **developer** | `.claude/agents/developer.md` | 代码实现、单元测试、问题修复 |\n| **reviewer** | `.claude/agents/reviewer.md` | 代码审查、需求验收 |\n| **tester** | `.claude/agents/tester.md` | 测试用例、缺陷分析、测试报告 |\n\n### 8.2 目录权限矩阵\n\n⚠️ **本矩阵是所有角色权限的单一权威来源。各 Agent 定义中的\"工作边界\"必须与本矩阵一致。**\n\n**权限说明**：✅ = 读写，👁️ = 只读，❌ = 禁止访问\n\n| 路径 | product-manager | developer | reviewer | tester |\n|------|:-:|:-:|:-:|:-:|\n| `.claude/rules/` | 👁️ | 👁️ | 👁️ | 👁️ |\n| `.claude/specs/` | 👁️ | 👁️ | 👁️ | 👁️ |\n| `.claude/commands/` | 👁️ | 👁️ | 👁️ | 👁️ |\n| `.claude/skills/product-manager/` | 👁️ | ❌ | ❌ | ❌ |\n| `.claude/skills/developer/` | ❌ | 👁️ | 👁️ | ❌ |\n| `.claude/skills/tester/` | ❌ | ❌ | ❌ | 👁️ |\n| `.claude/agents/` | ❌ | ❌ | ❌ | ❌ |\n| `website/` | ❌ | ✅ | 👁️ | 👁️ |\n| `service/` | ❌ | ✅ | 👁️ | 👁️ |\n| `common/mysql/` | ❌ | ✅ | 👁️ | 👁️ |\n| `common/`（其他） | ❌ | 👁️ | 👁️ | 👁️ |\n| `tests/` / `new_tests/` | ❌ | ✅ | 👁️ | ✅ |\n| `docs/iterations/` | ✅ | 👁️ | 👁️ | 👁️ |\n| `docs/reviews/` | 👁️ | 👁️ | ✅ | 👁️ |\n| `docs/testcases/` | ❌ | 👁️ | 👁️ | ✅ |\n| `pygmlib/` | ❌ | 👁️ | 👁️ | 👁️ |\n\n### 8.3 权限规则\n\n⚠️ **以下权限规则必须强制遵循**\n\n**规则 1：`.claude/` 目录保护**\n- `.claude/rules/`、`.claude/specs/`、`.claude/agents/` 所有角色**禁止修改**\n- 仅架构团队（人工）或 ai-architect 角色可修改\n- 所有角色可**读取**规范和规则作为行为参考\n\n**规则 2：业务代码隔离**\n- 只有 **developer** 角色可修改业务代码（`website/`、`service/`、`common/mysql/`）\n- **reviewer** 和 **tester** 只读审查，**禁止直接修改**业务代码\n- **product-manager** **禁止访问**业务代码\n\n**规则 3：文档产出隔离**\n- **product-manager** 的产出写入 `docs/iterations/`（PRD、交接单）\n- **reviewer** 的产出写入 `docs/reviews/`（审查报告）\n- **tester** 的产出写入 `docs/testcases/`（测试用例）\n- 各角色**禁止写入**其他角色的文档目录\n\n**规则 4：测试代码共享**\n- **developer** 和 **tester** 均可写入 `tests/`、`new_tests/`\n- developer 负责编写核心单元测试\n- tester 负责编写集成测试和场景测试\n\n**规则 5：Skill 隔离**\n- 每个角色只读取自己对应的 Skill 目录\n- **禁止**跨角色读取 Skill（避免职责混淆）\n\n**规则 6：`pygmlib/` 绝对只读**\n- 所有角色对 `pygmlib/` 仅有读取权限\n- **禁止任何角色修改** `pygmlib/` 下的文件\n\n### 8.4 违权处理\n\n当 Agent 操作的文件超出其权限范围时：\n\n| 场景 | 处理方式 |\n|------|---------|\n| Agent 尝试写入只读目录 | 必须拒绝操作，并说明权限不足 |\n| Agent 尝试访问禁止目录 | 必须拒绝操作，并建议通过正确角色完成 |\n| 跨角色协作需要 | 通过主会话中转，由有权限的 Agent 执行 |\n\n---"
    },
    {
     "heading": "9. 违反规范的后果",
     "content": "### 9.1 AI行为违规\n\n**违规类型**：\n- ❌ 使用模糊语言（\"可能\"、\"应该\"）\n- ❌ 不读取规范就生成代码\n- ❌ 违反强制性规范生成代码\n- ❌ 生成代码后不进行审计\n\n**后果**：\n- ⚠️ 降低开发效率\n- ⚠️ 破坏架构整洁\n- ⚠️ 生成不符合规范的代码\n- ⚠️ 需要人工返工\n\n### 9.2 代码违规\n\n**违规类型**：\n- ❌ 使用中文目录名\n- ❌ 代码缺少注释\n- ❌ 没有代码标识\n- ❌ 违反架构规范\n\n**后果**：\n- ⚠️ 代码审查不通过\n- ⚠️ 架构混乱\n- ⚠️ 维护困难\n\n---\n\n**维护者**: GM架构团队\n**版本**: v2.0\n**最后更新**: 2026-04-10"
    }
   ]
  },
  {
   "id": ".claude--skills--README",
   "title": "GM Skill导航",
   "category": "skills-common",
   "path": ".claude/skills/README.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# GM Skill导航\n\n> **定位**：Skill定义\"参考这个用\"的代码模板和最佳实践\n> **位置**：`.claude/skills/`\n> **优先级**：5\n\n---"
    },
    {
     "heading": "1. Skill定位",
     "content": "### 1.1 Skill vs Spec vs Command vs Guide\n\n| 类型 | 定义 | 语义 | 位置 | 优先级 |\n|------|------|------|------|--------|\n| **Spec** | \"必须这样用\" | 强制性/标准 | `.claude/specs/` | 10 |\n| **Command** | \"帮我这样用\" | 动作性/自动化 | `.claude/commands/` | 8 |\n| **Skill** | \"参考这个用\" | 模板/指导 | `.claude/skills/` | 5 |\n| **Guide** | \"在哪里做\" | 导航性/全局性 | `docs/` | 3 |\n\n### 1.2 Skill的核心作用\n\n1. **代码模板**：提供可复用的代码片段和模板\n2. **最佳实践**：提供开发经验和最佳实践指导\n3. **规范引用**：关联相关Spec，确保代码符合规范\n4. **知识沉淀**：沉淀开发经验和技巧\n\n---"
    },
    {
     "heading": "2. 目录结构",
     "content": "```\n.claude/skills/\n├── README.md                      # 本文件 - 技能导航\n├── developer/                     # 开发者技能\n│   ├── view-gen.md                # 视图代码生成模板 ⭐\n│   ├── service-gen.md             # 服务层代码生成模板 ⭐\n│   ├── model-gen.md               # 数据模型生成模板 ⭐\n│   └── test-gen.md                # 测试指导模板 ⭐\n├── product-manager/               # 产品经理技能\n│   ├── requirement-analysis.md    # 需求分析模板（通用）⭐\n│   ├── requirement-card.md        # PRD模板（M级·精简版）⭐\n│   ├── product-handoff.md         # PRD模板（L级·标准版）⭐\n│   ├── prd-gen.md                 # PRD模板（XL级·完整版）⭐\n│   └── impact-analysis.md         # 业务影响分析模板（XL级）⭐\n└── tester/                        # 测试工程师技能\n    ├── testcase-gen.md            # 测试用例生成模板 ⭐\n    └── test-report-gen.md         # 测试报告生成模板 ⭐\n```\n\n---"
    },
    {
     "heading": "3. 核心技能",
     "content": "### 3.1 service-gen - 服务生成\n\n**文件**：`developer/service-gen.md`\n\n**职责**：提供Django service层代码生成模板\n\n**包含模板**：\n- 服务类模板\n- CRUD方法模板\n- 业务校验模板\n\n**使用场景**：\n- 新建Service类\n- 添加Service方法\n\n### 3.2 model-gen - 模型生成\n\n**文件**：`developer/model-gen.md`\n\n**职责**：提供Django数据模型代码生成模板\n\n**包含模板**：\n- Django ORM模型模板\n- SQLAlchemy模型模板\n- MongoDB文档模板\n- 字段类型映射表\n\n**使用场景**：\n- 新建数据模型\n- 添加模型字段\n- 定义模型关系\n\n### 3.3 test-gen - 测试指导\n\n**文件**：`developer/test-gen.md`\n\n**职责**：提供测试相关指导和模板\n\n**包含内容**：\n- 手动测试指南\n- Django Shell测试脚本\n- 测试用例设计模板\n- 未来自动化测试结构规划\n\n**使用场景**：\n- 接口测试\n- 业务逻辑测试\n- 测试用例设计\n- 未来自动化测试实施\n\n### 3.4 testcase-gen - 测试用例生成\n\n**文件**：`tester/testcase-gen.md`\n\n**职责**：基于PRD自动生成结构化的功能测试用例集\n\n**包含模板**：\n- 功能测试用例\n- 接口测试矩阵（5维：正常/参数缺失/参数越界/权限/业务异常）\n- 业务规则验证矩阵\n- 流程测试用例\n- 覆盖度统计\n\n**使用场景**：\n- PRD评审通过后生成测试用例\n- 需求变更后更新测试用例\n- 回归测试用例补充\n\n### 3.5 test-report-gen - 测试报告生成\n\n**文件**：`tester/test-report-gen.md`\n\n**职责**：基于测试执行结果生成结构化的测试报告\n\n**包含模板**：\n- 测试结论（上线建议）\n- 执行概况统计\n- 缺陷分析\n- 覆盖率分析\n- 风险与遗留问题\n\n**使用场景**：\n- 测试执行完成后生成报告\n- 上线决策依据\n- 版本质量评估\n\n### 3.6 requirement-analysis - 需求分析\n\n**文件**：`product-manager/requirement-analysis.md`\n\n**职责**：帮助产品经理进行结构化需求分析，明确需求范围和涉及的业务领域。产品分析不涉及技术设计，技术影响面由研发独立评估。\n\n**使用场景**：\n- 所有规模的需求分析入口\n- 需求范围评估\n- 领域定位与影响面识别\n\n### 3.7 requirement-card - PRD（M级·精简版）\n\n**文件**：`product-manager/requirement-card.md`\n\n**职责**：M级任务的精简版 PRD，约1页，聚焦单一功能点\n\n**包含内容**：\n- 功能清单（F1 编号）\n- 改动说明（改造类附对比表格）\n- 验收标准\n- 业务领域提示（待研发确认）\n\n**使用场景**：\n- M级单功能需求\n\n### 3.8 product-handoff - PRD（L级·标准版）\n\n**文件**：`product-manager/product-handoff.md`\n\n**职责**：L级任务的标准版 PRD，1-2页，覆盖多功能点\n\n**包含内容**：\n- 功能清单（F1/F2/... 编号）\n- 业务背景与用户故事\n- 功能详细说明（前置条件、操作流程、业务规则、异常场景、交互说明）\n- 验收标准（关联功能编号）\n- 业务流程图（≥3 模块时必须）\n- 业务领域提示（待研发确认）\n\n**使用场景**：\n- L级多功能/跨模块需求\n\n### 3.9 prd-gen - PRD生成（XL级）\n\n**文件**：`product-manager/prd-gen.md`\n\n**职责**：XL级需求的完整产品需求文档。产品只输出 What/Why，技术设计由研发独立完成。\n\n**包含内容**：\n- 需求背景与用户故事\n- 功能说明与优先级矩阵\n- 验收标准\n- 非功能需求（业务视角）\n- 业务领域提示（待研发确认）\n- 里程碑建议\n\n**使用场景**：\n- XL级跨服务/跨领域需求\n\n### 3.10 impact-analysis - 业务影响分析（XL级）\n\n**文件**：`product-manager/impact-analysis.md`\n\n**职责**：从业务视角评估需求变更的影响范围，识别受影响的业务流程、用户角色和关联功能\n\n**包含内容**：\n- 业务流程影响\n- 用户角色影响\n- 关联功能影响\n- 兼容性风险\n- 数据影响提示（待研发确认）\n\n**使用场景**：\n- XL级需求的业务影响评估（与 PRD 一起产出）\n\n---"
    },
    {
     "heading": "4. 使用方式",
     "content": "### 4.1 在/gm.code命令中调用\n\n当执行代码生成任务时，引用Skills模板：\n\n```markdown\n# 任务1：实现OrderService\n\n⏳ 正在执行服务生成...\n\n**调用Service生成Skill**:\n- 模型名：Order\n- 实体名：order\n\n✅ 服务生成完成:\n  - 文件：service/order/order_service.py\n  - 类名：OrderService\n  - 方法：create_order, get_order_by_id, update_order, delete_order\n```\n\n### 4.2 模板替换流程\n\n1. **读取Skill文件**：选择对应的Skill模板\n2. **替换变量**：将`<ModelName>`等替换为实际值\n3. **生成代码**：按照模板生成代码文件\n4. **验证规范**：检查是否符合Spec规范\n\n---"
    },
    {
     "heading": "5. 模板变量规范",
     "content": "使用`<变量名>`格式表示变量：\n\n```python\nclass <ModelName>Service:\n    \"\"\"<ModelDesc>服务\"\"\"\n\n    def create_<entity>(self, data: Dict[str, Any]) -> <ModelName>:\n        # 代码实现\n        pass\n```\n\n**常用变量**：\n- `<ModelName>`：模型类名（如Order、User）\n- `<entity>`：实体名（小写，如order、user）\n- `<EntityDesc>`：实体描述（如\"订单\"、\"用户\"）\n\n---"
    },
    {
     "heading": "6. Skill与Spec、Command的关系",
     "content": "```\nSkill（技能）                        依赖Spec/Skill\n├── developer/\n│   ├── view-gen.md                → developer/视图层规范.spec.md\n│   ├── service-gen.md             → developer/服务分层规范.spec.md\n│   │                              → developer/RPC接口规范.spec.md\n│   ├── model-gen.md               → developer/数据模型规范.spec.md\n│   └── test-gen.md                → common/项目开发宪法.spec.md\n│\n├── product-manager/\n│   ├── requirement-analysis.md    → business/业务领域全景.spec.md\n│   ├── requirement-card.md        → requirement-analysis.md (前置)\n│   │                              → common/workflow-routing.spec.md\n│   ├── product-handoff.md         → requirement-analysis.md (前置)\n│   │                              → common/workflow-routing.spec.md\n│   ├── prd-gen.md                 → requirement-analysis.md (前置)\n│   │                              → product-handoff.md (前置)\n│   │                              → business/业务领域全景.spec.md\n│   └── impact-analysis.md         → requirement-analysis.md (前置)\n│                                  → business/业务领域全景.spec.md\n│\n└── tester/\n    ├── testcase-gen.md            → prd-gen.md (前置输入)\n    │                              → business/业务领域全景.spec.md\n    │                              → common/项目开发宪法.spec.md\n    └── test-report-gen.md         → testcase-gen.md (前置输入)\n```\n\n---\n\n**维护者**: GM架构团队\n**版本**: v3.0\n**最后更新**: 2026-04-07"
    }
   ]
  },
  {
   "id": ".claude--skills--common--tapd-integration",
   "title": "TAPD 集成技能",
   "category": "skills-common",
   "path": ".claude/skills/common/tapd-integration.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# TAPD 集成技能"
    },
    {
     "heading": "技能定位",
     "content": "通过 TAPD MCP Server 实现与 TAPD 项目管理系统的集成，支持需求拉取、缺陷推送和状态同步。\n\n---"
    },
    {
     "heading": "1. 前置条件",
     "content": "### 1.1 固定项目空间\n\n⚠️ **本项目固定使用 TAPD 项目空间 ID：`57880076`**\n\n所有 TAPD MCP 调用的 `workspace_id` 统一使用 `57880076`，无需从参数或环境变量获取。\n\n### 1.2 MCP 配置检查\n\n使用前，确认 `.claude/settings.local.json` 中 TAPD MCP Server 已启用：\n\n```json\n{\n  \"mcpServers\": {\n    \"tapd\": {\n      \"disabled\": false,\n      \"env\": {\n        \"TAPD_API_USER\": \"已配置\",\n        \"TAPD_API_PASSWORD\": \"已配置\",\n        \"TAPD_WORKSPACE_ID\": \"已配置\"\n      }\n    }\n  }\n}\n```\n\n### 1.2 API 凭证\n\n| 环境变量 | 说明 | 获取方式 |\n|---------|------|---------|\n| `TAPD_API_USER` | TAPD API 用户名 | TAPD → 公司管理 → API 账号 |\n| `TAPD_API_PASSWORD` | TAPD API 密码 | TAPD → 公司管理 → API 密码 |\n| `TAPD_WORKSPACE_ID` | TAPD 项目空间 ID | TAPD 项目 URL 中的数字 |\n\n---"
    },
    {
     "heading": "2. 需求拉取",
     "content": "### 2.1 触发方式\n\n```bash\n/gm-prd 1159271484001002933     # 基于 TAPD 需求生成 PRD\n/gm-dev 1159271484001002933     # 基于 TAPD 需求开始开发\n```\n\n### 2.2 执行流程\n\nTAPD 需求拉取已集成到 `/gm-prd` 和 `/gm-dev` 命令中：\n\n```\n/gm-prd 或 /gm-dev 步骤1：\n  ├── 解析需求 ID（从参数提取）\n  ├── 调用 TAPD MCP 获取需求详情\n  ├── 提取：标题、描述、优先级、验收标准\n  ├── 提取：关联需求、子任务\n  └── 输出需求摘要供用户确认\n```\n\n### 2.3 输出格式\n\n```markdown"
    },
    {
     "heading": "来自 TAPD 的需求",
     "content": "**需求ID**: TAPD-12345\n**标题**: 客户列表新增标签筛选功能\n**优先级**: P1\n**描述**: ...\n\n**验收标准**:\n1. ...\n2. ...\n\n**关联需求**: TAPD-12340, TAPD-12341\n```\n\n---"
    },
    {
     "heading": "3. 缺陷推送",
     "content": "### 3.1 触发方式\n\n```bash\n# 缺陷推送已集成到测试工作流中，或手动调用 TAPD MCP：\n# mcp__mcp-server-tapd__create_bug\n```\n\n### 3.2 执行流程\n\n```\n步骤1：收集缺陷信息\n  ├── 关联需求 ID\n  ├── 缺陷描述\n  ├── 重现步骤（从测试上下文提取）\n  └── 严重程度（从代码审查报告提取）\n\n步骤2：构建缺陷数据\n  {\n    \"title\": \"缺陷标题\",\n    \"description\": \"详细描述\",\n    \"severity\": \"normal\",\n    \"priority\": \"high\",\n    \"iteration_id\": \"当前迭代\",\n    \"story_id\": \"关联需求ID\",\n    \"reporter\": \"GM-AI\",\n    \"steps\": \"重现步骤\"\n  }\n\n步骤3：调用 TAPD API\n  └── POST /bugs - 创建缺陷\n\n步骤4：输出确认\n  └── 显示缺陷 ID 和 TAPD 链接\n```\n\n---"
    },
    {
     "heading": "4. 状态同步",
     "content": "### 4.1 自动同步场景\n\n| 场景 | 同步动作 |\n|------|---------|\n| 技术设计完成（`/gm-dev` 步骤3） | 更新需求状态为\"进行中\" |\n| 后端完成推送，有前端工作 | 更新需求状态为\"联调中\" |\n| 后端完成推送，无前端工作 | 更新需求状态为\"待测试\" |\n| 前端完成推送，后端已完成（\"联调中\"） | 更新需求状态为\"待测试\" |\n| 仅前端完成推送（\"进行中\"） | 更新需求状态为\"待测试\" |\n| 发现缺陷 | 创建 Bug 并关联需求 |\n\n### 4.2 同步 API\n\n```\nPUT /stories/{id} - 更新需求状态\n  body: { \"status\": \"developing\" | \"resolved\" }\n```\n\n---"
    },
    {
     "heading": "5. 项目空间映射",
     "content": "### 5.1 GM 项目与 TAPD 空间对应\n\n| GM 项目 | TAPD 空间 ID | 说明 |\n|---------|-------------|------|\n| gm_service | 57880076 | 主服务（固定） |\n\n### 5.2 多空间切换\n\n如需切换 TAPD 空间，在命令中指定：\n\n```bash\n# 在 /gm-prd 或 /gm-dev 中指定非默认项目空间：\n/gm-ship --workspace=67890123 --story=1159271484001002933\n```\n\n---"
    },
    {
     "heading": "6. 错误处理",
     "content": "| 错误 | 处理方式 |\n|------|---------|\n| MCP 未配置 | 提示用户配置 TAPD MCP Server |\n| API 认证失败 | 提示检查 API 凭证 |\n| 需求不存在 | 提示检查需求 ID |\n| 网络超时 | 重试一次，失败后提示手动操作 |\n\n---"
    },
    {
     "heading": "7. TAPD 状态映射表",
     "content": "### 7.1 需求（Story）状态映射\n\n| TAPD 界面中文名 | v_status 参数值 | 说明 |\n|----------------|----------------|------|\n| 待开发 | \"待开发\" | PRD 已评审，等待开发 |\n| 进行中 | \"进行中\" | 技术设计/编码中 |\n| 联调中 | \"联调中\" | 后端完成，等待前端联调 |\n| 待测试 | \"待测试\" | 前后端均完成，等待测试 |\n| 测试中 | \"测试中\" | 测试进行中 |\n| 已完成 | \"已完成\" | 测试通过，已上线 |\n\n### 7.2 任务（Task）状态映射\n\n| TAPD 界面中文名 | status 参数值 | 说明 |\n|----------------|-------------|------|\n| 未开始 | \"open\" | 默认创建状态 |\n| 进行中 | \"progressing\" | 编码中 |\n| 已完成 | \"done\" | 编码+推送完成 |\n\n### 7.3 缺陷（Bug）状态映射\n\n| TAPD 界面中文名 | v_status 参数值 | 说明 |\n|----------------|----------------|------|\n| 新建 | \"新建\" | 缺陷刚创建 |\n| 处理中 | \"处理中\" | 开发正在修复 |\n| 已解决 | \"已解决\" | 修复完成，等待验证 |\n| 已关闭 | \"已关闭\" | 验证通过 |\n| 重新打开 | \"重新打开\" | 验证不通过 |\n\n---"
    },
    {
     "heading": "8. 语雀集成",
     "content": "### 8.1 环境变量配置\n\n后端 `/gm-dev` 步骤6.5 生成前端对接清单并推送到语雀，需要配置以下环境变量：\n\n| 环境变量 | 说明 | 获取方式 |\n|---------|------|---------|\n| `YUQUE_TOKEN` | 语雀 API 个人访问令牌 | 语雀 → 设置 → 个人令牌 → 创建令牌（勾选 `doc:write` 权限） |\n| `YUQUE_REPO_ID` | 目标知识库的数字 ID | 打开知识库 → URL 中 `/repos/数字ID/docs/` 部分，或通过 API `GET /api/v2/users/{login}/repos` 查询 |\n\n**配置方式**（二选一）：\n\n```bash\n# 方式1：写入 shell profile（~/.zshrc 或 ~/.bashrc）\nexport YUQUE_TOKEN=\"你的语雀个人令牌\"\nexport YUQUE_REPO_ID=\"知识库数字ID\"\n```\n\n```bash\n# 方式2：在项目 .env 文件中配置（不提交到 Git）\necho 'YUQUE_TOKEN=你的语雀个人令牌' >> ~/.env.gm-ai\necho 'YUQUE_REPO_ID=知识库数字ID' >> ~/.env.gm-ai\n```\n\n### 8.2 语雀文档命名规则\n\n| 字段 | 格式 | 示例 |\n|------|------|------|\n| title | `前端对接清单：{需求标题}` | `前端对接清单：客户标签筛选` |\n| slug | `fe-handoff-{story_id}` | `fe-handoff-1159271484001002933` |\n\n### 8.3 文档链接格式\n\n```\nhttps://www.yuque.com/{团队}/{知识库}/fe-handoff-{story_id}\n```\n\n### 8.4 未配置时的降级方案\n\n当 `YUQUE_TOKEN` 或 `YUQUE_REPO_ID` 未配置时：\n1. 将清单内容写入 `docs/iterations/fe-handoff-{story_id}.md`\n2. 提示用户手动推送到语雀\n3. 输出语雀链接待后续更新\n\n---"
    },
    {
     "heading": "9. 前后端协作协议",
     "content": "### 8.1 TAPD 需求状态全生命周期\n\n```\n/gm-prd 创建需求 → [待开发]\n                    │\n/gm-dev 开始开发 → [进行中]\n                    │\n        ┌───────────┴───────────┐\n        │                       │\n  仅后端工作               有前后端工作\n        │                       │\n/gm-ship 后端完成         /gm-ship 后端完成\n        │                       │\n   [待测试]              [联调中] ← 后端 task done\n                                │\n                         /gm-ship 前端完成（从前端中枢）\n                                │\n                           [待测试] ← 前端 task done\n                                │\n                           [测试中] ← 测试开始\n                                │\n                           [已完成] ← 测试通过\n```\n\n### 8.2 前后端协作规则\n\n**规则 1：后端先行**\n- 后端 API 设计在 `/gm-dev` 步骤3（技术设计）中输出\n- API 设计作为接口契约写入 TAPD 需求描述\n- 前端从 TAPD 读取接口契约进行开发\n\n**规则 2：后端完成通知**\n- 后端 `/gm-ship` 将父 story 更新为\"联调中\"\n- 前端开发者通过 TAPD 看到状态变更\n- 前端 `/gm-dev` 检查父 story 状态为\"联调中\"时，确认后端 API 已就绪\n\n**规则 3：前端完成通知**\n- 前端 `/gm-ship` 将父 story 从\"联调中\"更新为\"待测试\"\n- 如仅前端工作（无后端），直接从\"进行中\"更新为\"待测试\"\n\n**规则 4：多端协调**\n- 多个前端工程各自创建 TAPD task\n- 所有前端 task 完成后，由最后一个完成的 `/gm-ship` 更新父 story 状态\n- 如果无法判断是否为最后一个，保持\"联调中\"，由人工最终确认\n\n### 8.3 跨中枢协作（后端 ↔ 前端）\n\n| 协作动作 | 执行方 | TAPD 操作 |\n|---------|--------|----------|\n| API 契约写入 | 后端 `/gm-dev` | 更新 story description |\n| 后端开发完成 | 后端 `/gm-ship` | story → \"联调中\" |\n| 前端读取 API 契约 | 前端 `/gm-dev` | 读取 story description |\n| 前端开发完成 | 前端 `/gm-ship` | story → \"待测试\" |\n| 发现缺陷 | 任一端 | 创建 Bug 关联 story |\n\n---"
    },
    {
     "heading": "9. 多仓库子任务管理",
     "content": "### 7.1 TAPD 结构映射\n\n```\nTAPD Story（/gm-prd 创建的父需求）\n  ├── Task: [gm_service] 标签筛选-后端API        ← /gm-dev 创建\n  ├── Task: [gm_static_stationv2] 标签筛选-前端   ← /gm-dev 创建\n  └── Task: [gm_server_order] 标签筛选-RPC        ← /gm-dev 创建（如涉及）\n```\n\n### 7.2 创建工程子任务\n\n在 `/gm-dev` 技术设计阶段（步骤3.4），为每个涉及工程创建 TAPD task：\n\n```\n工具：mcp__mcp-server-tapd__create_story_or_task\n参数：\n  workspace_id: 57880076\n  name: \"[工程名] 需求简称-变更摘要\"\n  options:\n    entity_type: \"tasks\"\n    story_id: <父需求ID>\n    description: \"工程：{repo}\\n变更：{摘要}\\n文件：{关键��件列表}\"\n```\n\n**命名规则**：`[工程名] 需求简称-变更摘要`\n\n**示例**：\n- `[gm_service] 客户筛选-新增按下单时间排序API`\n- `[gm_static_stationv2] 客户筛选-新增下单时间筛选组件`\n\n### 7.3 状态同步\n\n| 时机 | 操作 | 工具 |\n|------|------|------|\n| 工程编码开始 | task → progressing | `update_story_or_task(status: \"progressing\")` |\n| 工程编码完成 | task → done | `update_story_or_task(status: \"done\")` |\n| `/gm-ship` 后端完成，有前端 | 父 story → \"联调中\" | `update_story_or_task(v_status: \"联调中\")` |\n| `/gm-ship` 后端完成，无前端 | 父 story → \"待测试\" | `update_story_or_task(v_status: \"待测试\")` |\n| `/gm-ship` 前端完成，后端已完成 | 父 story → \"待测试\" | `update_story_or_task(v_status: \"待测试\")` |\n| `/gm-ship` 仅前端完成 | 父 story → \"待测试\" | `update_story_or_task(v_status: \"待测试\")` |\n\n### 7.4 源码提交关键字\n\n`/gm-ship` 的 commit 中使用 task 对应的源码提交关键字：\n\n```\n工具：mcp__mcp-server-tapd__get_commit_msg\n参数：\n  workspace_id: 57880076\n  options:\n    object_id: <task_id>\n    type: \"task\"\n```\n\n每个工程的 commit message 末尾附加其对应 task 的源码提交关键字，实现 TAPD 自动关联。\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.2\n**最后更新**: 2026-04-17"
    }
   ]
  },
  {
   "id": ".claude--skills--developer--dev-workflow",
   "title": "多 Agent 协作工作流",
   "category": "skills-developer",
   "path": ".claude/skills/developer/dev-workflow.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 多 Agent 协作工作流"
    },
    {
     "heading": "技能定位",
     "content": "定义 L/XL 级任务中，developer、reviewer、tester 三个 Agent 的协作流程、阶段划分和通信协议。\n\n---"
    },
    {
     "heading": "1. 协作触发规则",
     "content": "| 规模 | Agent 协作 | 说明 |\n|------|-----------|------|\n| S | 不触发 | 单人直接完成 |\n| M | 可选 | 复杂 M 级任务可手动触发 |\n| L | 推荐 | developer + reviewer |\n| XL | 强制 | developer + reviewer + tester |\n\n### 手动触发\n\n```bash\n# 在 /gm-dev 中显式请求 Agent 协作（L/XL 级自动触发）\n/gm-dev 1159271484001002933\n```\n\n---"
    },
    {
     "heading": "2. Agent 角色分工",
     "content": "| Agent | 角色 | 核心职责 |\n|-------|------|---------|\n| **developer** | 开发者 | 代码实现、单元测试编写、问题修复 |\n| **reviewer** | 审查者 | 代码审查、需求验收、技术方案评审 |\n| **tester** | 测试者 | 测试用例生成、缺陷分析、测试报告（XL 级） |\n\n---"
    },
    {
     "heading": "3. 协作阶段定义",
     "content": "### 3.1 L 级任务：三阶段流程\n\n```\nPhase 1：需求确认 + 技术设计\n  ├── [主会话] 产品分析 → PRD\n  ├── [主会话] 技术要点梳理\n  └── [主会话] 任务拆解（TodoWrite）\n\nPhase 2：代码实现 + 代码审查\n  ├── [developer agent] 按任务列表分步实现\n  ├── [developer agent] 自审\n  └── [reviewer agent] 代码审查 → 审查报告\n\nPhase 3：修复 + 验收\n  ├── [developer agent] 修复审查问题（如有）\n  └── [reviewer agent] 需求验收 → 验收结论\n```\n\n### 3.2 XL 级任务：四阶段流程\n\n```\nPhase 1：需求分析 + 技术方案\n  ├── [主会话] 产品分析 → PRD + 影响分析\n  ├── [reviewer agent] 技术方案评审（可选）\n  └── [主会话] 计划拆解（TodoWrite）\n\nPhase 2：代码实现（developer + tester 并行）\n  ├── [developer agent] 分步实现代码\n  ├── [tester agent] 基于需求编写测试用例（并行）\n  └── [tester agent] 基于代码补充单元测试\n\nPhase 3：代码审查 + 测试验证\n  ├── [reviewer agent] 全面代码审查 → 审查报告\n  ├── [tester agent] 执行测试 → 测试报告\n  └── [developer agent] 修复审查问题和测试缺陷\n\nPhase 4：验收\n  ├── [reviewer agent] 需求验收\n  └── [主会话] 最终确认\n```\n\n---"
    },
    {
     "heading": "4. 阶段门禁",
     "content": "### 4.1 Phase 1 → Phase 2 门禁\n\n| 检查项 | 通过标准 |\n|--------|---------|\n| PRD | 已输出且用户确认 |\n| 技术要点/技术方案 | 已梳理 |\n| 任务拆解 | TodoWrite 已创建任务列表 |\n\n### 4.2 Phase 2 → Phase 3 门禁\n\n| 检查项 | 通过标准 |\n|--------|---------|\n| 代码实现 | 所有 TodoWrite 任务标记为 completed |\n| developer 自审 | 已完成自审，无严重问题 |\n| 测试用例 | XL 级：tester agent 已完成测试用例 |\n\n### 4.3 Phase 3 → Phase 4 门禁\n\n| 检查项 | 通过标准 |\n|--------|---------|\n| 审查报告 | reviewer agent 已输出审查报告 |\n| 严重问题 | 全部修复 |\n| 测试报告 | XL 级：tester agent 已输出测试报告 |\n\n---"
    },
    {
     "heading": "5. Agent 调度协议",
     "content": "### 5.1 使用 Task 工具创建 Agent\n\n主会话通过 Cursor 的 Task 工具创建 Agent：\n\n```\n# 创建 developer agent\nTask(subagent_type=\"generalPurpose\", prompt=\"...\", description=\"developer agent\")\n\n# 创建 reviewer agent\nTask(subagent_type=\"generalPurpose\", prompt=\"...\", description=\"reviewer agent\")\n\n# 创建 tester agent（XL 级）\nTask(subagent_type=\"generalPurpose\", prompt=\"...\", description=\"tester agent\")\n```\n\n### 5.2 Agent Prompt 要点\n\n各 Agent 创建时需包含以下上下文：\n\n| Agent | 必须上下文 | 加载规范 | 产出 |\n|-------|-----------|---------|------|\n| developer | task_description, tech_plan, todo_list | `.claude/agents/developer.md` + 相关开发 Spec | 修改文件清单 + 自审结果 |\n| reviewer | task_description, requirement_doc, changed_files | `.claude/agents/reviewer.md` + `code-review.md` | 审查报告（docs/reviews/） |\n| tester | task_description, requirement_doc, changed_files | `.claude/agents/tester.md` + 测试 Skill | 测试用例 + 测试报告 |\n\n### 5.3 并行与串行策略\n\n```\nPhase 2 并行策略（XL 级）：\n\n┌─────────────────────────────┐    ┌─────────────────────────────┐\n│   developer agent           │    │   tester agent              │\n│                             │    │                             │\n│   ├── 读取技术方案           │    │   ├── 读取需求文档           │\n│   ├── 逐步实现代码           │    │   ├── 生成测试用例           │\n│   ├── 编写单元测试           │    │   └── 输出测试用例文档       │\n│   ├── 自审                  │    │                             │\n│   └── 输出完成报告           │    │                             │\n└─────────────────────────────┘    └─────────────────────────────┘\n              ↓                                  ↓\n         [Phase 3 开始]\n\nPhase 3 串行策略：\n\n[reviewer agent] 代码审查\n       ↓\n[developer agent] 修复问题（如有）\n       ↓\n[reviewer agent] 复审\n```\n\n---"
    },
    {
     "heading": "6. 产出物检查",
     "content": "### 6.1 主会话检查义务\n\n主会话在每个阶段结束后，必须检查 Agent 的产出：\n\n| 阶段 | 检查内容 |\n|------|---------|\n| Phase 2 结束 | developer agent 的代码是否覆盖所有 Todo 任务 |\n| Phase 3 结束 | reviewer agent 审查报告是否完整、严重问题是否已修复 |\n| Phase 4 结束 | 验收结论是否明确、测试报告是否覆盖关键场景 |\n\n### 6.2 异常处理\n\n| 异常 | 处理方式 |\n|------|---------|\n| Agent 超时 | 主会话中断并重新创建 Agent |\n| Agent 产出不完整 | 主会话补充缺失部分或要求 Agent 重做 |\n| 审查陷入循环 | 超过 2 轮审查-修复循环后，主会话介入决策 |\n\n---"
    },
    {
     "heading": "7. 完整示例：L 级任务协作",
     "content": "```\n用户输入：/gm-dev 1159271484001002933（L 级需求）\n\nPhase 1（主会话）：\n├── 产品分析：输出 PRD\n├── 技术要点：确认涉及 customer 模块、标签模型、筛选接口\n└── TodoWrite：创建 5 个实现任务\n\nPhase 2（developer agent）：\n├── Task 1: 新增客户标签 Model（common/mysql/models/）\n├── Task 2: 新增标签 Service（service/customer/）\n├── Task 3: 修改客户列表 View 增加筛选参数\n├── Task 4: 新增标签管理 View\n├── Task 5: 编写单元测试\n└── 自审通过\n\nPhase 3（reviewer agent）：\n├── 代码审查：10 维度审查\n├── 审查报告：2 个警告，0 个严重问题\n└── 验收：实现覆盖 PRD 所有功能点，通过\n\n主会话：确认完成，总结产出物\n```\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-04-10"
    }
   ]
  },
  {
   "id": ".claude--skills--developer--model-gen",
   "title": "数据模型生成技能",
   "category": "skills-developer",
   "path": ".claude/skills/developer/model-gen.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 数据模型生成技能"
    },
    {
     "heading": "职责",
     "content": "提供数据模型代码生成模板和指导。SQLAlchemy 为主模板，Django ORM 为辅。"
    },
    {
     "heading": "SQLAlchemy 模型模板（主要）",
     "content": "### 基础模型\n\n```python\n# common/mysql/models/<entity>.py\n\"\"\"<实体中文名>模型\n\n本模块定义<实体>相关的 SQLAlchemy 数据模型。\n\"\"\"\n\nfrom datetime import datetime\nfrom sqlalchemy import Column, String, Numeric\nfrom sqlalchemy.dialects.mysql import INTEGER, TINYINT, DATETIME\nfrom common.mysql_session import Base\n\n\nclass <ModelName>(Base):\n    \"\"\"<实体中文名>\"\"\"\n\n    __tablename__ = \"tbl_<module>_<entity>\"\n\n    # 主键\n    id = Column(INTEGER(11, unsigned=True), primary_key=True, autoincrement=True, doc=\"主键ID\")\n\n    # 业务字段\n    <entity>_id = Column(String(32), doc=\"<实体>ID\")\n    station_id = Column(String(12), nullable=False, doc=\"站点ID\")\n    group_id = Column(INTEGER(11, unsigned=True), nullable=False, doc=\"租户ID\")\n\n    # 金额字段\n    amount = Column(Numeric(10, 2), doc=\"金额\")\n\n    # 数量字段\n    quantity = Column(INTEGER(11), doc=\"数量\")\n\n    # 状态字段\n    status = Column(TINYINT(1), default=0, doc=\"状态，0:默认 1:启用 2:禁用\")\n\n    # 公共字段\n    pstatus = Column(TINYINT(1, unsigned=True), default=0, doc=\"逻辑删除，0:正常 1:已删\")\n    create_time = Column(DATETIME, default=datetime.now, doc=\"创建时间\")\n    modify_time = Column(DATETIME, default=datetime.now, onupdate=datetime.now, doc=\"修改时间\")\n```\n\n### 继承 PublicModelMixin 的模型\n\n```python\n# common/mysql/models/<entity>.py\nfrom common.mysql.models.base_model import PublicModelMixin\nfrom sqlalchemy import Column, String, Numeric\nfrom sqlalchemy.dialects.mysql import INTEGER, TINYINT\n\n\nclass <ModelName>(PublicModelMixin):\n    \"\"\"<实体中文名>\n\n    继承 PublicModelMixin 自动获得 id, pstatus, create_time, modify_time, group_id 字段。\n    \"\"\"\n\n    __tablename__ = \"tbl_<module>_<entity>\"\n\n    # 业务字段（无需再定义公共字段）\n    station_id = Column(String(12), nullable=False, doc=\"站点ID\")\n    <field_name> = Column(<FieldType>, doc=\"<字段说明>\")\n```"
    },
    {
     "heading": "Django ORM 模型模板（辅助）",
     "content": "```python\n# common/mysql/models/<entity>.py\n\"\"\"<实体中文名>模型\"\"\"\n\nfrom django.db import models\nfrom common.mysql.models.base_model import BaseModel\n\n\nclass <ModelName>(BaseModel):\n    \"\"\"<实体中文名>\n\n    注意：BaseModel 只提供 id 和 paginator，不含 created_at/updated_at 等字段。\n    \"\"\"\n\n    <field_name> = models.<FieldType>(\n        verbose_name='<字段中文名>',\n        help_text='<字段说明>'\n    )\n\n    class Meta:\n        db_table = 'tb_<module>_<entity>'\n        verbose_name = '<实体中文名>'\n```"
    },
    {
     "heading": "MongoDB 文档模板",
     "content": "```python\n# common/mongo/<entity>.py\n\"\"\"<实体中文名> MongoDB 服务\"\"\"\n\nfrom common.collections import <Entity>Conn\nfrom common.mongo.base_srv import MongoBaseSrv\n\n\nclass <Entity>Service(MongoBaseSrv):\n    \"\"\"<实体中文名>文档服务\"\"\"\n    conn = <Entity>Conn()\n\n    def find_by_station(self, station_id, cols=None):\n        \"\"\"查询站点下的<实体>\"\"\"\n        query = {\"station_id\": station_id}\n        return list(self.conn.find(query, cols))\n\n    def get_by_id(self, entity_id):\n        \"\"\"根据ID获取<实体>\"\"\"\n        return self.conn.find_one({\"_id\": entity_id})\n\n    def update_status(self, entity_id, status):\n        \"\"\"更新<实体>状态\"\"\"\n        return self.conn.update_one(\n            {\"_id\": entity_id},\n            {\"$set\": {\"status\": status}}\n        )\n```\n\n如需新增 Collection 连接函数，在 `common/collections.py` 中添加：\n\n```python\ndef <Entity>Conn():\n    conn_db = DefaultMongoDB()\n    return conn_db[\"<collection_name>\"]\n```"
    },
    {
     "heading": "字段类型映射表",
     "content": "### SQLAlchemy 字段类型\n\n| 数据库类型 | SQLAlchemy 类型 | 说明 |\n|-----------|----------------|------|\n| INT | `INTEGER(11, unsigned=True)` | 整数 |\n| TINYINT | `TINYINT(1, unsigned=True)` | 小整数/布尔/状态 |\n| VARCHAR | `String(N)` | 变长字符串 |\n| DECIMAL | `Numeric(10, 2)` | 金额 |\n| DATETIME | `DATETIME` | 日期时间 |\n| TEXT | `Text` | 长文本 |\n\n### Django 字段类型\n\n| 数据库类型 | Django 类型 | 说明 |\n|-----------|-----------|------|\n| 自增主键 | `AutoField` | BaseModel 已有 |\n| 外键(整数) | `IntegerField` | 整数外键 |\n| 金额 | `DecimalField(max_digits=10, decimal_places=2)` | 金额 |\n| 时间 | `DateTimeField` | 日期时间 |\n| 状态 | `SmallIntegerField(choices=...)` | 带选项 |"
    },
    {
     "heading": "提示词指导",
     "content": "1. **优先使用 SQLAlchemy**：新模型默认使用 SQLAlchemy + `common/mysql_session/`\n2. **选择正确的 Session**：根据数据所在数据库选择对应的 ReadSession/WriteSession\n3. **公共字段**：新增表建议继承 `PublicModelMixin`，或手动添加 `pstatus`, `create_time`, `modify_time`, `group_id`\n4. **字段注释**：SQLAlchemy 用 `doc=`，Django 用 `verbose_name`"
    },
    {
     "heading": "依赖的Spec",
     "content": "- `.claude/specs/developer/数据模型规范.spec.md` - 数据模型定义规范\n- `.claude/specs/developer/代码风格规范.spec.md` - 代码风格规范\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-03-19"
    }
   ]
  },
  {
   "id": ".claude--skills--developer--service-gen",
   "title": "服务层生成技能",
   "category": "skills-developer",
   "path": ".claude/skills/developer/service-gen.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 服务层生成技能"
    },
    {
     "heading": "职责",
     "content": "提供 DAL/Service 层代码生成模板和指导，包括模块内 DAL 和 common/mysql/service 两种模式。"
    },
    {
     "heading": "模块内 DAL 模板（主要模式）",
     "content": "大多数业务模块的数据访问逻辑在 `website/<module>/dals/` 中：\n\n```python\n# website/<module>/dals/<entity>.py\n\"\"\"<实体中文名>数据访问层\n\n本模块提供<实体>相关的数据访问操作。\n\"\"\"\n\nimport logging\nfrom common.mysql_session import StationDbReadSession, StationDbWriteSession\nfrom common.mysql.models.<entity> import <ModelName>\nfrom common.param_check import GmError, ErrCode\n\nlogger = logging.getLogger(\"<module>.dals.<entity>\")\n\n\ndef get_<entity>_list(station_id, group_id, offset=0, limit=20, **filters):\n    \"\"\"查询<实体>列表\n\n    Args:\n        station_id: 站点ID\n        group_id: 租户ID\n        offset: 偏移量\n        limit: 每页数量\n        **filters: 过滤条件\n\n    Returns:\n        dict: {\"data\": list, \"pagination\": dict}\n    \"\"\"\n    session = StationDbReadSession()\n    query = session.query(<ModelName>).filter(\n        <ModelName>.station_id == station_id,\n        <ModelName>.pstatus == 0,\n    )\n\n    # 应用过滤条件\n    if filters.get(\"status\") is not None:\n        query = query.filter(<ModelName>.status == filters[\"status\"])\n\n    total = query.count()\n    items = query.order_by(<ModelName>.create_time.desc()).offset(offset).limit(limit).all()\n\n    return {\n        \"data\": [_to_dict(item) for item in items],\n        \"pagination\": {\"count\": total, \"offset\": offset, \"limit\": limit},\n    }\n\n\ndef get_<entity>_by_id(<entity>_id, station_id):\n    \"\"\"根据ID获取<实体>\n\n    Args:\n        <entity>_id: <实体>ID\n        station_id: 站点ID\n\n    Returns:\n        <ModelName>: <实体>对象\n\n    Raises:\n        GmError: <实体>不存在时抛出\n    \"\"\"\n    session = StationDbReadSession()\n    item = session.query(<ModelName>).filter(\n        <ModelName>.id == <entity>_id,\n        <ModelName>.station_id == station_id,\n        <ModelName>.pstatus == 0,\n    ).first()\n\n    if not item:\n        raise GmError(ErrCode.business_err, \"<实体中文名>不存在\")\n\n    return item\n\n\ndef create_<entity>(station_id, group_id, data):\n    \"\"\"创建<实体>\n\n    Args:\n        station_id: 站点ID\n        group_id: 租户ID\n        data: 创建数据\n\n    Returns:\n        dict: 创建的<实体>数据\n    \"\"\"\n    session = StationDbWriteSession()\n    try:\n        item = <ModelName>(\n            station_id=station_id,\n            group_id=group_id,\n            **data,\n        )\n        session.add(item)\n        session.commit()\n        return _to_dict(item)\n    except Exception:\n        session.rollback()\n        raise\n\n\ndef update_<entity>(<entity>_id, station_id, data):\n    \"\"\"更新<实体>\n\n    Args:\n        <entity>_id: <实体>ID\n        station_id: 站点ID\n        data: 更新数据\n    \"\"\"\n    session = StationDbWriteSession()\n    try:\n        item = session.query(<ModelName>).filter(\n            <ModelName>.id == <entity>_id,\n            <ModelName>.station_id == station_id,\n            <ModelName>.pstatus == 0,\n        ).first()\n\n        if not item:\n            raise GmError(ErrCode.business_err, \"<实体中文名>不存在\")\n\n        for key, value in data.items():\n            setattr(item, key, value)\n\n        session.commit()\n    except Exception:\n        session.rollback()\n        raise\n\n\ndef delete_<entity>(<entity>_id, station_id):\n    \"\"\"删除<实体>（逻辑删除）\"\"\"\n    update_<entity>(<entity>_id, station_id, {\"pstatus\": 1})\n\n\ndef _to_dict(item):\n    \"\"\"模型转字典\"\"\"\n    return {\n        \"id\": item.id,\n        \"station_id\": item.station_id,\n        # ... 其他字段\n    }\n```"
    },
    {
     "heading": "common/mysql/service 模板",
     "content": "用于需要被多个模块共享的数据访问服务：\n\n```python\n# common/mysql/service/<entity>_service.py\n\"\"\"<实体中文名>公共服务\"\"\"\n\nfrom common.mysql_session import StationDbReadSession, StationDbWriteSession\nfrom common.mysql.models.<entity> import <ModelName>\n\n\nclass <Entity>Service:\n    \"\"\"<实体中文名>服务（公共层）\"\"\"\n\n    @staticmethod\n    def find_by_station(station_id, pstatus=0):\n        session = StationDbReadSession()\n        return session.query(<ModelName>).filter(\n            <ModelName>.station_id == station_id,\n            <ModelName>.pstatus == pstatus,\n        ).all()\n\n    @staticmethod\n    def find_by_ids(ids, station_id=None):\n        session = StationDbReadSession()\n        query = session.query(<ModelName>).filter(\n            <ModelName>.id.in_(ids),\n            <ModelName>.pstatus == 0,\n        )\n        if station_id:\n            query = query.filter(<ModelName>.station_id == station_id)\n        return query.all()\n```"
    },
    {
     "heading": "SrvBase 服务模板",
     "content": "基于 `common/mysql/new_base.py` 的 `SrvBase` 封装：\n\n```python\n# common/mysql/<entity>.py\nfrom common.mysql.new_base import SrvBase\nfrom common.mysql.models.<entity> import <ModelName>\nfrom common.mysql_session import StationDbReadSession\n\n\nclass <Entity>Srv(SrvBase):\n    \"\"\"<实体中文名>服务（SrvBase模式）\"\"\"\n    _model = <ModelName>\n    _sess = StationDbReadSession\n\n    def find_active(self, station_id):\n        return self._sess().query(self._model).filter(\n            self._model.station_id == station_id,\n            self._model.pstatus == 0,\n        ).all()\n```"
    },
    {
     "heading": "提示词指导",
     "content": "1. **选择正确的模式**：\n   - 模块私有逻辑 → `website/<module>/dals/`\n   - 多模块共享 → `common/mysql/service/`\n   - 简单CRUD封装 → `SrvBase` 模式\n\n2. **选择正确的 Session**：\n   - 读操作：`XXXDbReadSession()`\n   - 写操作：`XXXDbWriteSession()`，必须 try/commit/except/rollback\n\n3. **异常处理**：业务异常使用 `GmError(ErrCode.business_err, \"消息\")`\n\n4. **逻辑删除**：使用 `pstatus=0` 过滤未删除记录，删除时设 `pstatus=1`"
    },
    {
     "heading": "依赖的Spec",
     "content": "- `.claude/specs/developer/服务分层规范.spec.md` - 分层架构规范\n- `.claude/specs/developer/数据模型规范.spec.md` - 数据模型规范\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-03-19"
    }
   ]
  },
  {
   "id": ".claude--skills--developer--test-gen",
   "title": "测试指导技能",
   "category": "skills-developer",
   "path": ".claude/skills/developer/test-gen.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 测试指导技能"
    },
    {
     "heading": "职责",
     "content": "提供测试相关的指导和模板，当前专注于手动测试指导，未来将支持自动化测试生成。"
    },
    {
     "heading": "当前状态",
     "content": "⚠️ **重要说明**：目前项目**没有自动化测试**。\n\n本技能提供：\n1. 手动测试指导\n2. Django shell测试模板\n3. 测试用例设计模板\n4. 未来自动化测试结构规划\n\n---"
    },
    {
     "heading": "1. 手动测试指南",
     "content": "### 1.1 接口测试\n\n**使用Postman或curl测试HTTP接口**：\n\n```bash\n# POST请求示例\ncurl -X POST http://localhost:8000/api/order/create \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\n    \"customer_id\": 1001,\n    \"station_id\": \"ST001\",\n    \"products\": [\n      {\"sku_id\": 123, \"quantity\": 2}\n    ],\n    \"total_amount\": 100.50\n  }'\n\n# GET请求示例\ncurl -X GET \"http://localhost:8000/api/order/list?customer_id=1001\" \\\n  -H \"Content-Type: application/json\"\n```\n\n**Postman测试清单**：\n\n```markdown"
    },
    {
     "heading": "接口测试清单",
     "content": "### 创建订单接口\n- [ ] 正常创建订单\n- [ ] 缺少必填参数（customer_id）\n- [ ] 客户不存在\n- [ ] 库存不足\n- [ ] 金额为0\n- [ ] 商品列表为空\n\n### 查询订单接口\n- [ ] 查询存在的订单\n- [ ] 查询不存在的订单\n- [ ] 订单ID格式错误\n```\n\n### 1.2 Django Shell测试\n\n**使用Django shell测试业务逻辑**：\n\n```bash\n# 启动Django shell\npython manage.py shell\n\n# 测试脚本\nfrom service.order.order_service import OrderService\nfrom common.mysql.models.order_model import Order\n\n# 测试1：创建订单\nservice = OrderService()\norder = service.create_order({\n    'customer_id': 1001,\n    'station_id': 'ST001',\n    'total_amount': 100.50\n})\nprint(f\"订单创建成功: {order.order_id}\")\n\n# 测试2：查询订单\norder = Order.objects.get(order_id='O202303160001')\nprint(f\"订单状态: {order.status}\")\n\n# 测试3：异常测试\ntry:\n    order = service.create_order({\n        'customer_id': 9999,  # 不存在的客户\n        'station_id': 'ST001',\n        'total_amount': 100.50\n    })\nexcept Exception as e:\n    print(f\"异常捕获成功: {str(e)}\")\n```\n\n---"
    },
    {
     "heading": "2. 测试用例设计模板",
     "content": "### 2.1 接口测试用例\n\n```markdown"
    },
    {
     "heading": "<接口名称>测试用例",
     "content": "### 接口信息\n- **接口路径**：/api/<path>\n- **请求方法**：POST/GET/PUT/DELETE\n- **功能描述**：<功能描述>\n\n### 测试用例\n\n#### 用例1：正常场景\n- **描述**：<正常场景描述>\n- **请求参数**：\n  ```json\n  {\n    \"param1\": \"value1\",\n    \"param2\": \"value2\"\n  }\n  ```\n- **预期结果**：\n  ```json\n  {\n    \"code\": 0,\n    \"message\": \"成功\",\n    \"data\": {...}\n  }\n  ```\n- **测试结果**：☐ 通过 ☐ 失败\n\n#### 用例2：参数缺失\n- **描述**：缺少必填参数\n- **请求参数**：\n  ```json\n  {\n    \"param1\": \"value1\"\n  }\n  ```\n- **预期结果**：\n  ```json\n  {\n    \"code\": -1,\n    \"message\": \"参数缺失\"\n  }\n  ```\n- **测试结果**：☐ 通过 ☐ 失败\n\n#### 用例3：业务规则校验\n- **描述**：<业务规则描述>\n- **请求参数**：\n  ```json\n  {...}\n  ```\n- **预期结果**：\n  ```json\n  {\n    \"code\": -1,\n    \"message\": \"<错误信息>\"\n  }\n  ```\n- **测试结果**：☐ 通过 ☐ 失败\n```\n\n### 2.2 服务层测试用例\n\n```markdown"
    },
    {
     "heading": "<服务名称>测试用例",
     "content": "### 测试环境\n- Django Shell\n- 数据库：<数据库环境>\n\n### 测试用例\n\n#### 用例1：创建<实体>\n```python\nfrom service.<module>.<service>_service import <Service>\n\nservice = <Service>()\nentity = service.create_<entity>({\n    'field1': 'value1',\n    'field2': 'value2'\n})\nprint(f\"创建成功: {entity.<entity>_id}\")\n```\n- **预期结果**：成功创建，返回实体对象\n- **测试结果**：☐ 通过 ☐ 失败\n\n#### 用例2：查询<实体>\n```python\nentity = service.get_<entity>_by_id(<entity>_id)\nprint(f\"查询结果: {entity}\")\n```\n- **预期结果**：返回正确的实体对象\n- **测试结果**：☐ 通过 ☐ 失败\n\n#### 用例3：异常场景\n```python\ntry:\n    # 触发异常的操作\n    entity = service.create_<entity>({...})\nexcept <ExceptionType> as e:\n    print(f\"异常捕获: {str(e)}\")\n```\n- **预期结果**：抛出预期的异常\n- **测试结果**：☐ 通过 ☐ 失败\n```\n\n---"
    },
    {
     "heading": "3. 未来自动化测试结构",
     "content": "### 3.1 测试目录结构（规划）\n\n```\ntests/\n├── __init__.py\n├── conftest.py                      # pytest配置\n├── unittests/                       # 单元测试\n│   ├── service/                    # service层测试\n│   │   ├── __init__.py\n│   │   ├── test_order_service.py\n│   │   └── test_user_service.py\n│   ├── common/                     # common层测试\n│   │   ├── __init__.py\n│   │   ├── test_order_model.py\n│   │   └── test_user_model.py\n│   └── utils/                      # 工具测试\n│       ├── __init__.py\n│       └── test_date_utils.py\n├── integration/                    # 集成测试\n│   ├── __init__.py\n│   ├── test_order_flow.py         # 订单流程测试\n│   └── test_stock_flow.py         # 库存流程测试\n├── api/                           # API测试\n│   ├── __init__.py\n│   ├── test_order_api.py         # 订单API测试\n│   └── test_user_api.py          # 用户API测试\n└── fixtures/                      # 测试数据\n    ├── order_data.py\n    └── user_data.py\n```\n\n### 3.2 单元测试模板（规划）\n\n```python\n# tests/unittests/service/test_order_service.py\n\"\"\"订单服务单元测试\"\"\"\n\nimport pytest\nfrom service.order.order_service import OrderService\nfrom common.exceptions import BusinessException\n\n\nclass TestOrderService:\n    \"\"\"订单服务测试类\"\"\"\n\n    def setup_method(self):\n        \"\"\"每个测试方法前执行\"\"\"\n        self.service = OrderService()\n\n    def test_create_order_success(self):\n        \"\"\"测试成功创建订单\"\"\"\n        # 准备测试数据\n        order_data = {\n            'customer_id': 1001,\n            'station_id': 'ST001',\n            'total_amount': 100.50\n        }\n\n        # 执行测试\n        order = self.service.create_order(order_data)\n\n        # 断言\n        assert order.order_id is not None\n        assert order.customer_id == 1001\n        assert order.station_id == 'ST001'\n\n    def test_create_order_customer_not_found(self):\n        \"\"\"测试客户不存在时创建订单\"\"\"\n        # 准备测试数据\n        order_data = {\n            'customer_id': 9999,  # 不存在的客户\n            'station_id': 'ST001',\n            'total_amount': 100.50\n        }\n\n        # 执行测试并断言异常\n        with pytest.raises(BusinessException) as exc_info:\n            self.service.create_order(order_data)\n\n        assert '客户不存在' in str(exc_info.value)\n\n    def test_get_order_by_id_success(self):\n        \"\"\"测试根据ID获取订单\"\"\"\n        # 先创建订单\n        order = self.service.create_order({\n            'customer_id': 1001,\n            'station_id': 'ST001',\n            'total_amount': 100.50\n        })\n\n        # 查询订单\n        found_order = self.service.get_order_by_id(order.order_id)\n\n        # 断言\n        assert found_order.order_id == order.order_id\n```\n\n### 3.3 API测试模板（规划）\n\n```python\n# tests/api/test_order_api.py\n\"\"\"订单API测试\"\"\"\n\nimport pytest\nfrom django.test import APIClient\nfrom rest_framework import status\n\n\nclass TestOrderAPI:\n    \"\"\"订单API测试类\"\"\"\n\n    def setup_method(self):\n        \"\"\"每个测试方法前执行\"\"\"\n        self.client = APIClient()\n\n    def test_create_order_success(self):\n        \"\"\"测试成功创建订单API\"\"\"\n        # 准备请求数据\n        request_data = {\n            'customer_id': 1001,\n            'station_id': 'ST001',\n            'products': [{'sku_id': 123, 'quantity': 2}],\n            'total_amount': 100.50\n        }\n\n        # 发送请求\n        response = self.client.post('/api/order/create', request_data, format='json')\n\n        # 断言\n        assert response.status_code == status.HTTP_200_OK\n        assert response.data['code'] == 0\n        assert 'order_id' in response.data['data']\n\n    def test_create_order_missing_param(self):\n        \"\"\"测试缺少必填参数\"\"\"\n        # 准备请求数据（缺少customer_id）\n        request_data = {\n            'station_id': 'ST001',\n            'products': [{'sku_id': 123, 'quantity': 2}],\n            'total_amount': 100.50\n        }\n\n        # 发送请求\n        response = self.client.post('/api/order/create', request_data, format='json')\n\n        # 断言\n        assert response.status_code == status.HTTP_400_BAD_REQUEST\n        assert '客户ID' in response.data['message']\n```\n\n---"
    },
    {
     "heading": "4. pytest配置（规划）",
     "content": "```python\n# tests/conftest.py\n\"\"\"pytest配置文件\"\"\"\n\nimport pytest\nfrom django.test.utils import setup_test_environment\n\n\n@pytest.fixture(scope='session')\ndef django_db_setup():\n    \"\"\"设置测试数据库\"\"\"\n    setup_test_environment()\n\n\n@pytest.fixture\ndef order_data():\n    \"\"\"订单测试数据\"\"\"\n    return {\n        'customer_id': 1001,\n        'station_id': 'ST001',\n        'products': [{'sku_id': 123, 'quantity': 2}],\n        'total_amount': 100.50\n    }\n```\n\n---"
    },
    {
     "heading": "5. 测试命令（规划）",
     "content": "```bash\n# 运行所有测试\npytest -vv ./tests\n\n# 运行特定测试文件\npytest -vv ./tests/unittests/service/test_order_service.py\n\n# 运行特定测试方法\npytest -vv ./tests/unittests/service/test_order_service.py::TestOrderService::test_create_order_success\n\n# 生成覆盖率报告\npytest --cov=service --cov=common --cov-report=html\n\n# 查看覆盖率报告\nopen htmlcov/index.html\n```\n\n---"
    },
    {
     "heading": "6. 测试数据管理",
     "content": "### 6.1 测试数据准备\n\n```python\n# tests/fixtures/order_data.py\n\"\"\"订单测试数据\"\"\"\n\nORDER_DATA_VALID = {\n    'customer_id': 1001,\n    'station_id': 'ST001',\n    'products': [\n        {'sku_id': 123, 'quantity': 2},\n        {'sku_id': 124, 'quantity': 1}\n    ],\n    'total_amount': 100.50\n}\n\nORDER_DATA_MISSING_CUSTOMER = {\n    'station_id': 'ST001',\n    'products': [{'sku_id': 123, 'quantity': 2}],\n    'total_amount': 100.50\n}\n\nORDER_DATA_INVALID_AMOUNT = {\n    'customer_id': 1001,\n    'station_id': 'ST001',\n    'products': [{'sku_id': 123, 'quantity': 2}],\n    'total_amount': -100.50\n}\n```\n\n---"
    },
    {
     "heading": "7. 提示词指导",
     "content": "当使用本技能时：\n\n1. **当前阶段**：专注于手动测试指导\n2. **测试用例设计**：基于业务场景设计测试用例\n3. **Django Shell测试**：提供shell测试脚本\n4. **未来规划**：了解自动化测试结构，为后续实施做准备"
    },
    {
     "heading": "依赖的Spec",
     "content": "- `.claude/specs/common/项目开发宪法.spec.md` - 项目开发规范（第9节测试规范）\n\n---"
    },
    {
     "heading": "8. 开发→测试 交接机制",
     "content": "开发工程师完成功能开发和自测后，需要向测试工程师提供以下交接物，以确保测试工作顺利衔接。\n\n### 8.1 开发交接清单\n\n```markdown\n# [需求名称] 开发交接清单"
    },
    {
     "heading": "交接信息",
     "content": "| 项目 | 内容 |\n|------|------|\n| 需求/PRD | [PRD名称及版本] |\n| 开发分支 | [分支名] |\n| 开发人员 | [姓名] |\n| 交接日期 | [日期] |"
    },
    {
     "heading": "功能完成情况",
     "content": "| 功能编号 | 功能名称 | 开发状态 | 自测结果 | 备注 |\n|---------|---------|---------|---------|------|\n| F001 | [功能名] | 已完成/进行中 | 通过/未通过 | [说明] |"
    },
    {
     "heading": "接口变更清单",
     "content": "| 接口路径 | 变更类型 | 说明 | 自测结果 |\n|---------|---------|------|---------|\n| [METHOD /path/] | 新增/修改 | [说明] | 通过/未通过 |"
    },
    {
     "heading": "数据库变更",
     "content": "| 数据库 | 表/Collection | 变更内容 | 是否需要迁移 |\n|--------|-------------|---------|-------------|\n| [库名] | [表名] | [DDL/数据变更] | 是/否 |"
    },
    {
     "heading": "已知问题",
     "content": "| 编号 | 描述 | 影响范围 | 状态 |\n|------|------|---------|------|\n| 1 | [描述] | [范围] | 待修复/已规避 |"
    },
    {
     "heading": "测试建议",
     "content": "- [建议重点测试的场景]\n- [需要注意的边界条件]\n- [特殊的测试数据要求]"
    },
    {
     "heading": "交接确认",
     "content": "| 检查项 | 状态 |\n|--------|------|\n| 所有功能已自测通过 | ☐ |\n| 接口文档已更新 | ☐ |\n| 数据库变更已同步到测试环境 | ☐ |\n| 已知问题已记录 | ☐ |\n| 测试环境可正常访问 | ☐ |\n```\n\n### 8.2 衔接流程\n\n```\n开发工程师                          测试工程师\n    │                                  │\n    │ 1. 功能开发完成                    │\n    │ 2. 执行自测（本技能 §1-§2）       │\n    │ 3. 填写开发交接清单（§8.1）        │\n    │                                  │\n    │ ─── 交接清单 + 代码分支 ───────→  │\n    │                                  │\n    │                    4. 基于 PRD 生成测试用例\n    │                       (tester/testcase-gen.md)\n    │                    5. 执行功能测试\n    │                    6. 生成测试报告\n    │                       (tester/test-report-gen.md)\n    │                                  │\n    │ ←── 缺陷清单 ───────────────────  │\n    │                                  │\n    │ 7. 修复缺陷                       │\n    │ 8. 更新交接清单                    │\n    │                                  │\n    │ ─── 修复确认 ──────────────────→  │\n    │                                  │\n    │                    9. 回归验证\n    │                   10. 更新测试报告\n    │                                  │\n    └──────────────────────────────────┘\n```\n\n### 8.3 与 tester 技能的关系\n\n| 本技能（developer/test-gen） | tester 技能 | 关系 |\n|----------------------------|------------|------|\n| 手动自测指南（§1） | testcase-gen.md | 开发自测通过 → 测试工程师执行完整测试 |\n| 测试用例设计模板（§2） | testcase-gen.md | 本技能为轻量模板，tester版为完整结构化用例 |\n| 开发交接清单（§8.1） | test-report-gen.md | 交接清单为测试输入，测试报告为最终输出 |\n\n---\n\n**维护者**: GM架构团队\n**版本**: v2.0\n**最后更新**: 2026-03-23"
    }
   ]
  },
  {
   "id": ".claude--skills--developer--view-gen",
   "title": "视图生成技能",
   "category": "skills-developer",
   "path": ".claude/skills/developer/view-gen.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 视图生成技能"
    },
    {
     "heading": "职责",
     "content": "提供基于 CommonBaseView 的视图代码生成模板和指导。"
    },
    {
     "heading": "标准业务视图模板",
     "content": "### 列表 + 创建 视图\n\n```python\n# website/<module>/views/<entity>.py\n\"\"\"<实体中文名>视图模块\"\"\"\n\nimport logging\nfrom common.param_check import Param, GmError, ErrCode\nfrom website.station.views.common import CommonBaseView\nfrom website.station.views.permissions import UserPermissionView\nfrom website.<module>.dals.<entity> import (\n    get_<entity>_list,\n    get_<entity>_by_id,\n    create_<entity>,\n    update_<entity>,\n    delete_<entity>,\n)\n\nlogger = logging.getLogger(\"<module>.views.<entity>\")\n\n\nclass <Entity>ListView(CommonBaseView):\n    \"\"\"<实体中文名>列表\"\"\"\n\n    param_check_dict = {\n        \"status\": Param(int, optional=True),\n        \"q\": Param(str, optional=True, default=\"\"),\n        \"offset\": Param(int, optional=True, default=0),\n        \"limit\": Param(int, optional=True, default=20, min_=1, max_=100),\n    }\n\n    @UserPermissionView.get(\"<permission_module>\")\n    def get(self, request):\n        result = get_<entity>_list(\n            station_id=self.station_id,\n            group_id=self.group_id,\n            offset=self.params[\"offset\"],\n            limit=self.params[\"limit\"],\n            status=self.params.get(\"status\"),\n            q=self.params.get(\"q\"),\n        )\n        return self.JsonSuccessResponse(\n            data_dict=result[\"data\"],\n            pagination=result[\"pagination\"],\n        )\n\n\nclass <Entity>DetailView(CommonBaseView):\n    \"\"\"<实体中文名>详情\"\"\"\n\n    param_check_dict = {\n        \"id\": Param(int),\n    }\n\n    @UserPermissionView.get(\"<permission_module>\")\n    def get(self, request):\n        item = get_<entity>_by_id(\n            <entity>_id=self.params[\"id\"],\n            station_id=self.station_id,\n        )\n        return self.JsonSuccessResponse(data_dict=item)\n\n\nclass <Entity>CreateView(CommonBaseView):\n    \"\"\"创建<实体中文名>\"\"\"\n\n    param_check_dict = {\n        # 根据实体定义必要参数\n        \"name\": Param(str),\n        \"description\": Param(str, optional=True, default=\"\"),\n    }\n\n    @UserPermissionView.add(\"<permission_module>\")\n    def post(self, request):\n        result = create_<entity>(\n            station_id=self.station_id,\n            group_id=self.group_id,\n            data=self.params,\n        )\n        return self.JsonSuccessResponse(data_dict=result)\n\n\nclass <Entity>UpdateView(CommonBaseView):\n    \"\"\"编辑<实体中文名>\"\"\"\n\n    param_check_dict = {\n        \"id\": Param(int),\n        \"name\": Param(str, optional=True),\n        \"description\": Param(str, optional=True),\n    }\n\n    @UserPermissionView.edit(\"<permission_module>\")\n    def post(self, request):\n        <entity>_id = self.params.pop(\"id\")\n        update_data = {k: v for k, v in self.params.items() if v is not None}\n\n        update_<entity>(\n            <entity>_id=<entity>_id,\n            station_id=self.station_id,\n            data=update_data,\n        )\n        return self.JsonSuccessResponse()\n\n\nclass <Entity>DeleteView(CommonBaseView):\n    \"\"\"删除<实体中文名>\"\"\"\n\n    param_check_dict = {\n        \"id\": Param(int),\n    }\n\n    @UserPermissionView.delete(\"<permission_module>\")\n    def post(self, request):\n        delete_<entity>(\n            <entity>_id=self.params[\"id\"],\n            station_id=self.station_id,\n        )\n        return self.JsonSuccessResponse()\n```\n\n### URL 路由模板\n\n```python\n# website/<module>/urls.py\nfrom django.conf.urls import re_path\nfrom website.<module>.views.<entity> import (\n    <Entity>ListView,\n    <Entity>DetailView,\n    <Entity>CreateView,\n    <Entity>UpdateView,\n    <Entity>DeleteView,\n)\n\nurlpatterns = [\n    re_path(r'^<entity>/list$', <Entity>ListView.as_view(), name='<entity>_list'),\n    re_path(r'^<entity>/detail$', <Entity>DetailView.as_view(), name='<entity>_detail'),\n    re_path(r'^<entity>/create$', <Entity>CreateView.as_view(), name='<entity>_create'),\n    re_path(r'^<entity>/update$', <Entity>UpdateView.as_view(), name='<entity>_update'),\n    re_path(r'^<entity>/delete$', <Entity>DeleteView.as_view(), name='<entity>_delete'),\n]\n```"
    },
    {
     "heading": "无需登录视图模板",
     "content": "```python\nfrom website.station.views.common import NoLoginView\n\nclass CallbackView(NoLoginView):\n    \"\"\"回调接口（无需登录）\"\"\"\n\n    param_check_dict = {\n        \"sign\": Param(str),\n        \"data\": Param(dict),\n    }\n\n    def post(self, request):\n        # 验证签名\n        if not verify_sign(self.params[\"sign\"]):\n            return self.JsonErrorResponse(msg=\"签名验证失败\")\n\n        # 处理回调\n        process_callback(self.params[\"data\"])\n        return self.JsonSuccessResponse()\n```"
    },
    {
     "heading": "OpenAPI 视图模板",
     "content": "```python\nfrom website.openapi.views.common import OpenBaseView\nfrom common.param_check import Param\n\nclass OpenOrderListView(OpenBaseView):\n    \"\"\"开放API - 订单列表\"\"\"\n\n    param_check_dict = {\n        \"begin_time\": Param(str),\n        \"end_time\": Param(str),\n        \"offset\": Param(int, optional=True, default=0),\n        \"limit\": Param(int, optional=True, default=50, min_=1, max_=200),\n    }\n\n    def get(self, request):\n        # OpenBaseView 自动通过 access_token 校验\n        orders = get_open_order_list(\n            station_id=self.station_id,\n            begin_time=self.params[\"begin_time\"],\n            end_time=self.params[\"end_time\"],\n            offset=self.params[\"offset\"],\n            limit=self.params[\"limit\"],\n        )\n        return self.JsonSuccessResponse(data_dict=orders)\n```"
    },
    {
     "heading": "提示词指导",
     "content": "1. **选择基类**：\n   - 标准业务 → `CommonBaseView`\n   - 无需登录 → `NoLoginView`\n   - 开放API → `OpenBaseView`\n\n2. **参数校验**：\n   - 必填参数：`Param(type)`\n   - 可选参数：`Param(type, optional=True, default=...)`\n   - 范围限制：`Param(int, min_=0, max_=100)`\n\n3. **权限**：\n   - 查看：`@UserPermissionView.get(\"module\")`\n   - 新增：`@UserPermissionView.add(\"module\")`\n   - 编辑：`@UserPermissionView.edit(\"module\")`\n   - 删除：`@UserPermissionView.delete(\"module\")`\n\n4. **响应**：\n   - 成功：`self.JsonSuccessResponse(data_dict=...)`\n   - 带分页：`self.JsonSuccessResponse(data_dict=..., pagination=...)`\n   - 失败：`self.JsonErrorResponse(msg=\"...\")`\n\n5. **异常**：DAL层抛出 `GmError`，视图层的 `dispatch` 自动捕获并转为 `JsonErrorResponse`"
    },
    {
     "heading": "依赖的Spec",
     "content": "- `.claude/specs/developer/视图层规范.spec.md` - 视图层规范\n- `.claude/specs/developer/代码风格规范.spec.md` - 代码风格规范\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-03-19"
    }
   ]
  },
  {
   "id": ".claude--skills--product-manager--impact-analysis",
   "title": "业务影响分析技能",
   "category": "skills-product",
   "path": ".claude/skills/product-manager/impact-analysis.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 业务影响分析技能"
    },
    {
     "heading": "1. 技能定位",
     "content": "从业务视角评估需求变更的影响范围，识别受影响的业务流程、用户角色和关联功能。\n\n**与 v1.0 的关键差异**：\n- 删除：服务影响扫描、数据影响评估、接口影响评估（这些是研发职责）\n- 保留：业务流程影响、用户角色影响、关联功能影响\n- 新增：数据影响提示（业务层面，标注\"待研发确认\"）\n\n**核心原则**：业务影响分析回答\"这个改动对业务有什么连锁影响\"，技术影响分析由研发独立完成。\n\n---"
    },
    {
     "heading": "2. 使用条件",
     "content": "- 任务规模为 **XL级**\n- 需求分析完成后，与 PRD 一起产出\n\n---"
    },
    {
     "heading": "3. 分析流程",
     "content": "### 步骤1：业务流程影响\n\n```\n识别受影响的业务流程：\n├── 哪些业务操作会发生变化？\n├── 操作流程是否需要调整？\n├── 用户的操作习惯是否受影响？\n└── 是否有上下游流程的连锁影响？\n```\n\n### 步骤2：用户角色影响\n\n```\n识别受影响的用户角色：\n├── 哪些角色的操作会发生变化？\n├── 是否需要培训或通知？\n├── 权限是否需要调整？\n└── 是否影响已有的权限配置？\n```\n\n### 步骤3：关联功能影响\n\n```\n识别受影响的关联功能：\n├── 改动A功能会不会影响B功能的行为？\n├── 报表/统计数据是否受影响？\n├── 导出/导入功能是否受影响？\n└── 消息通知是否需要调整？\n```\n\n### 步骤4：兼容性风险\n\n```\n评估兼容性影响：\n├── OpenAPI 调用方是否受影响？\n├── 已有的数据是否需要处理？\n├── 是否有过渡期需求？\n└── 是否需要灰度发布？\n```\n\n---"
    },
    {
     "heading": "4. 输出模板",
     "content": "```markdown\n# [需求名称] 业务影响分析"
    },
    {
     "heading": "影响范围总览",
     "content": "| 维度 | 影响程度 | 说明 |\n|------|---------|------|\n| 业务流程 | 高/中/低 | [说明] |\n| 用户角色 | 高/中/低 | 涉及 N 个角色 |\n| 关联功能 | 高/中/低 | 涉及 N 个功能 |\n| 兼容性 | 高/中/低 | [说明] |"
    },
    {
     "heading": "受影响的业务流程",
     "content": "| 流程 | 影响方式 | 影响程度 |\n|------|---------|---------|"
    },
    {
     "heading": "受影响的用户角色",
     "content": "| 角色 | 影响点 | 是否需要通知/培训 |\n|------|--------|-----------------|"
    },
    {
     "heading": "关联功能影响",
     "content": "[描述改动对其他功能的连锁影响]"
    },
    {
     "heading": "数据影响提示（待研发确认）",
     "content": "[业务层面的数据问题，如\"历史订单的配送地址是否需要更新\"]"
    },
    {
     "heading": "兼容性风险",
     "content": "[OpenAPI 调用方影响、过渡期需求等]"
    },
    {
     "heading": "风险与建议",
     "content": "| 风险 | 概率 | 影响 | 建议 |\n|------|------|------|------|\n```\n\n---"
    },
    {
     "heading": "5. 影响程度判定标准",
     "content": "| 程度 | 标准 |\n|------|------|\n| **高** | 影响核心业务流程 / 影响多个用户角色 / 不兼容变更 |\n| **中** | 影响辅助功能 / 影响单一角色 / 需要过渡期 |\n| **低** | 仅影响展示/提示 / 无用户感知变化 |\n\n---\n\n**维护者**: GM架构团队\n**版本**: v2.0\n**最后更新**: 2026-04-07"
    }
   ]
  },
  {
   "id": ".claude--skills--product-manager--prd-gen",
   "title": "PRD 模板（XL级 · 完整版）",
   "category": "skills-product",
   "path": ".claude/skills/product-manager/prd-gen.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# PRD 模板（XL级 · 完整版）"
    },
    {
     "heading": "1. 技能定位",
     "content": "XL级需求的 PRD 模板。内容完整，覆盖全量章节。适用于跨服务/跨领域、架构级变更、需要评审的场景。\n\n**核心原则**：产品只输出 What/Why，技术设计由研发独立完成。PRD 中不包含数据模型设计、接口设计、服务拆分、技术方案。\n\n**内容遵循**：`需求文档规范.spec.md` §6.3 XL级 PRD。\n\n**与 L级的增量**：功能优先级矩阵 + 非功能需求 + 风险评估 + 里程碑建议 + 状态类需求澄清\n\n---"
    },
    {
     "heading": "2. 使用条件",
     "content": "- 任务规模经 `workflow-routing.spec.md` 判定为 **XL级**\n- 需求分析（requirement-analysis.md）完成后使用本模板\n- PRD 完成后有明确的产品→研发交接点\n\n---"
    },
    {
     "heading": "3. 生成流程",
     "content": "### 步骤1：确认需求分析完成\n\n```\n前置条件：\n□ 需求分析报告已完成（参见 requirement-analysis.md）\n□ 涉及领域已明确\n□ 功能拆解已完成\n```\n\n### 步骤2：填写功能清单\n\n⚠️ **功能清单是 PRD 的核心入口，必须最先完成。**\n\n```\n为每个功能点分配编号 F1/F2/F3...：\n├── 功能名称\n├── 所属模块（order/stock/account/merchandise...）\n├── 功能类型（新增 / 改造）\n├── 涉及页面（新增页面用 [新增] 前缀）\n├── 优先级（P0/P1/P2/P3）\n└── 功能说明\n```\n\n### 步骤3：编写用户故事\n\n为每个功能点编写用户故事：\n格式：作为[角色]，我想要[功能]，以便[价值]\n\n### 步骤4：详细功能说明\n\n使用功能清单编号引用（F1/F2...），覆盖所有功能点。\n\n```\n每个功能编写：\n├── 交互说明（[新增]/[改动] + 页面路径）\n├── 前置条件\n├── 操作流程（用户操作 + 系统响应）\n├── 业务规则（含边界条件）\n├── 异常场景（异常条件 + 系统行为）\n\n功能类型为\"改造\"时，附加对比表格（仅列变化内容）\n状态类需求必须澄清实现方式（新增值 vs 新增字段）\n```\n\n### 步骤5：功能优先级矩阵\n\n明确功能间的优先级和依赖关系。\n\n### 步骤6：非功能需求\n\n从业务视角描述性能、安全、兼容性期望（不涉及技术实现）。\n\n### 步骤7：跨模块业务流程图\n\n⚠️ **涉及 ≥ 3 个模块联动时，必须输出 Mermaid 流程图**\n\n要求：\n- 用 subgraph 标注模块归属\n- 标注模块间的调用关系和数据流向\n- 标注判断分支和异常流程\n- 覆盖从触发到结束的全链路\n\n---"
    },
    {
     "heading": "4. PRD 模板（XL级）",
     "content": "```markdown\n# [需求名称] PRD"
    },
    {
     "heading": "文档信息",
     "content": "| 项目 | 内容 |\n|------|------|\n| 文档版本 | v1.0 |\n| 创建日期 | [日期] |\n| 规模 | XL |\n| 状态 | 草稿/评审中/已确认 |\n\n---"
    },
    {
     "heading": "1. 功能清单",
     "content": "| 编号 | 功能名称 | 所属模块 | 功能类型 | 涉及页面 | 优先级 | 功能说明 |\n|------|---------|---------|---------|---------|--------|---------|\n| F1   | [功能名] | [模块名] | 新增/改造 | [页面路径] | P0/P1 | [简述] |\n| F2   | [功能名] | [模块名] | 新增/改造 | [页面路径] | P1/P2 | [简述] |\n\n---"
    },
    {
     "heading": "2. 需求背景",
     "content": "### 2.1 业务背景\n\n[描述业务场景和当前痛点]\n\n### 2.2 需求目标\n\n[一句话描述期望达成的目标]\n\n### 2.3 目标用户\n\n| 用户角色 | 使用场景 | 核心诉求 |\n|---------|---------|---------|\n\n---"
    },
    {
     "heading": "3. 用户故事",
     "content": "- 作为[角色]，我想要[功能]，以便[价值]\n- ...\n\n---"
    },
    {
     "heading": "4. 功能说明",
     "content": "### F1：[功能名称]\n\n**交互说明**：\n1. **[新增/改动] [页面名]** - `/页面路径`\n   - 描述\n\n**前置条件**：\n- [条件1]\n\n**操作流程**：\n1. 用户执行[操作]\n2. 系统响应[行为]\n\n**业务规则**：\n1. [规则，含边界条件]\n\n**异常场景**：\n1. 当[条件]时，系统[行为]\n\n### F2：[功能名称]\n（同上结构）\n\n### 功能对比（仅\"改造\"类功能需要）\n\n| 功能项 | 已有功能 | 变化后 | 变化类型 |\n|--------|---------|--------|----------|\n| [项目] | [原来] | [现在] | 新增/改动/删除 |\n\n### 状态类需求澄清（涉及状态调整时必填）\n\n| 方式 | 说明 | 具体内容 |\n|------|------|---------|\n| 在现有字段新增值 / 新增状态字段 | [解释] | [具体定义] |\n\n---"
    },
    {
     "heading": "5. 功能优先级矩阵",
     "content": "| 功能编号 | 功能名 | 优先级 | 依赖关系 | 说明 |\n|---------|--------|--------|---------|------|\n\n---"
    },
    {
     "heading": "6. 验收标准",
     "content": "| 编号 | 功能编号 | 场景 | 操作 | 预期结果 |\n|------|---------|------|------|---------|\n| AC1  | F1      | [场景] | [操作] | [结果] |\n\n---"
    },
    {
     "heading": "7. 非功能需求",
     "content": "### 7.1 性能期望\n- [业务层面描述，如\"查询结果2秒内返回\"]\n\n### 7.2 安全要求\n- [业务层面描述，如\"仅站长角色可操作\"]\n\n### 7.3 兼容性\n- [如\"需兼容现有OpenAPI调用方\"]\n\n---"
    },
    {
     "heading": "8. 业务流程（≥3 模块联动时必须）",
     "content": "> 涉及 N 个模块联动：模块A → 模块B → 模块C\n\n（Mermaid 流程图，用 subgraph 标注模块归属，覆盖全链路）\n\n---"
    },
    {
     "heading": "9. 业务领域提示（待研发确认）",
     "content": "- 可能涉及的业务领域：[领域1]、[领域2]\n- 可能影响的用户操作路径：[描述]\n- 需要关注的关联功能：[功能名]\n\n---"
    },
    {
     "heading": "10. 风险评估（业务风险）",
     "content": "| 风险 | 概率 | 业务影响 | 应对建议 |\n|------|------|---------|---------|\n\n---"
    },
    {
     "heading": "11. 里程碑建议",
     "content": "[产品侧的期望节奏，明确标注\"待研发评估后调整\"]\n\n---"
    },
    {
     "heading": "12. 产品备注",
     "content": "[特殊的业务细节、历史背景、利益相关方顾虑等]\n```\n\n---"
    },
    {
     "heading": "5. 编写原则",
     "content": "### 5.1 功能清单先行\n\n功能清单是 PRD 的核心入口，后续所有章节通过编号引用功能点。\n\n### 5.2 业务视角\n\n- 功能描述使用确定性语言，避免模糊词汇\n- 业务规则必须明确边界条件\n- 验收标准必须可客观验证\n- 禁止\"...或...\"等不确定表述\n\n### 5.3 职责边界\n\n- 不包含数据模型设计（研发独立产出）\n- 不包含接口设计（研发独立产出）\n- 不包含服务拆分（研发独立产出）\n- 不包含技术方案（研发独立产出）\n- 不包含研发工作量估算（只有产品侧期望节奏）\n\n### 5.4 交互与改造规范\n\n- 涉及页面交互时标注 `[新增]` 或 `[改动]` + 页面路径\n- 功能类型为\"改造\"时必须提供对比表格，仅列变化内容\n- 状态类需求必须澄清实现方式\n\n### 5.5 跨模块流程图\n\n涉及 ≥ 3 个模块联动时，必须输出 Mermaid 流程图：\n- 用 subgraph 标注模块归属\n- 标注模块间调用关系和数据流向\n- 覆盖从触发到结束的全链路\n\n### 5.6 完整性\n\n- 考虑异常流程和边界情况\n- 考虑对现有功能的影响\n- 考虑兼容性风险（如 OpenAPI 调用方）\n\n---"
    },
    {
     "heading": "6. 完成后流程",
     "content": "XL级 PRD 完成后：\n\n1. AI 发出交接声明：\"PRD 输出完成。请确认业务领域提示后开始技术设计。\"\n2. 用户确认后，切换到 development 能力标签\n3. 研发独立产出技术方案文档（架构+数据+接口+部署）\n4. 进入计划拆解和分步实现\n\n---\n\n**维护者**: GM架构团队\n**版本**: v4.0\n**最后更新**: 2026-04-10"
    }
   ]
  },
  {
   "id": ".claude--skills--product-manager--product-handoff",
   "title": "PRD 模板（L级 · 标准版）",
   "category": "skills-product",
   "path": ".claude/skills/product-manager/product-handoff.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# PRD 模板（L级 · 标准版）"
    },
    {
     "heading": "1. 技能定位",
     "content": "L级需求的 PRD 模板。内容适中，控制在1-2页。适用于多功能点或跨模块、需要业务分析的场景。\n\n**核心原则**：只描述 What 和 Why，不涉及 How。研发拿到 PRD 后独立完成技术设计。\n\n**内容遵循**：`需求文档规范.spec.md` §6.2 L级 PRD。\n\n---"
    },
    {
     "heading": "2. 使用条件",
     "content": "- 任务规模经 `workflow-routing.spec.md` 判定为 **L级**\n- 需求分析（requirement-analysis.md）完成后使用本模板\n- PRD 完成后有明确的产品→研发交接点\n\n---"
    },
    {
     "heading": "3. 生成流程",
     "content": "### 步骤1：确认需求分析完成\n\n```\n前置条件：\n□ 需求理解已完成（业务目标、目标用户、核心场景）\n□ 领域定位已完成（涉及哪些业务领域）\n□ 功能拆解已完成（核心功能 + 增强功能）\n```\n\n### 步骤2：填写功能清单\n\n⚠️ 功能清单是 PRD 的**必填入口**，开发、测试通过功能清单快速理解需求全貌。\n\n```\n为每个功能点分配编号 F1/F2/F3...：\n├── 功能名称\n├── 所属模块（order/stock/account/merchandise...）\n├── 功能类型（新增 / 改造）\n├── 涉及页面（新增页面用 [新增] 前缀）\n├── 优先级（P0/P1/P2）\n└── 功能说明\n```\n\n### 步骤3：编写用户故事\n\n```\n为每个功能点编写用户故事：\n格式：作为[角色]，我想要[功能]，以便[价值]\n```\n\n### 步骤4：详细功能说明\n\n```\n使用功能清单编号引用（F1/F2...），为每个功能编写：\n├── 前置条件\n├── 操作流程（用户操作 + 系统响应）\n├── 业务规则（含边界条件）\n├── 异常场景（异常条件 + 系统行为）\n└── 交互说明（[新增] 或 [改动] + 页面路径）\n\n功能类型为\"改造\"时，附加对比表格（仅列变化内容）\n```\n\n### 步骤5：编写验收标准\n\n每个功能点至少覆盖：正常流程、异常流程、边界条件。验收标准必须可验证，禁止模糊表述。\n\n### 步骤6：业务流程图（条件触发）\n\n⚠️ **涉及 ≥ 3 个模块联动时，必须输出 Mermaid 流程图**，用 subgraph 标注模块归属。\n\n### 步骤7：业务领域提示\n\n给出可能涉及的业务领域和关联功能，明确标注\"待研发确认\"。\n\n---"
    },
    {
     "heading": "4. PRD 模板（L级）",
     "content": "```markdown\n# [需求名称] PRD"
    },
    {
     "heading": "文档信息",
     "content": "| 项目 | 内容 |\n|------|------|\n| 创建日期 | [日期] |\n| 优先级 | P0/P1/P2 |\n| 规模 | L |\n| 状态 | 草稿/已确认 |"
    },
    {
     "heading": "1. 功能清单",
     "content": "| 编号 | 功能名称 | 所属模块 | 功能类型 | 涉及页面 | 优先级 | 功能说明 |\n|------|---------|---------|---------|---------|--------|---------|\n| F1   | [功能名] | [模块名] | 新增/改造 | [页面路径] | P1 | [说明] |\n| F2   | [功能名] | [模块名] | 新增/改造 | [页面路径] | P2 | [说明] |"
    },
    {
     "heading": "2. 业务背景",
     "content": "[当前痛点 + 期望改进，3-5句话]"
    },
    {
     "heading": "3. 用户故事",
     "content": "- 作为[角色]，我想要[功能]，以便[价值]\n- ..."
    },
    {
     "heading": "4. 功能说明",
     "content": "### F1：[功能名]\n\n**交互说明**：\n1. **[新增/改动] [页面名]** - `/页面路径`\n   - 描述\n\n**前置条件**：[条件]\n\n**操作流程**：\n1. 用户执行[操作]\n2. 系统响应[行为]\n\n**业务规则**：\n1. [规则，含边界条件]\n\n**异常场景**：\n1. 当[条件]时，系统[行为]\n\n### F2：[功能名]\n（同上结构）\n\n### 功能对比（仅\"改造\"类功能需要）\n\n| 功能项 | 已有功能 | 变化后 | 变化类型 |\n|--------|---------|--------|----------|\n| [项目] | [原来] | [现在] | 新增/改动/删除 |"
    },
    {
     "heading": "5. 验收标准",
     "content": "| 编号 | 功能编号 | 场景 | 操作 | 预期结果 |\n|------|---------|------|------|---------|\n| AC1  | F1      | [场景] | [操作] | [结果] |"
    },
    {
     "heading": "6. 业务流程（≥3 模块联动时必须）",
     "content": "> 涉及 N 个模块联动：模块A → 模块B → 模块C\n\n（输出 Mermaid 流程图，用 subgraph 标注模块归属）"
    },
    {
     "heading": "7. 业务领域提示（待研发确认）",
     "content": "- 可能涉及的业务领域：[领域1]、[领域2]\n- 可能影响的用户操作路径：[描述]\n- 需要关注的关联功能：[功能名]"
    },
    {
     "heading": "8. 产品备注",
     "content": "[特殊的业务细节、历史背景、利益相关方顾虑等]\n```\n\n---"
    },
    {
     "heading": "5. 编写原则",
     "content": "1. **功能清单先行**：功能清单是 PRD 入口，所有后续章节通过编号引用功能点\n2. **业务视角**：只描述用户看到的行为和业务规则\n3. **不含技术设计**：不涉及数据模型、接口设计、服务拆分\n4. **交互说明**：涉及页面交互时标注 `[新增]` 或 `[改动]` + 页面路径\n5. **改造对比**：功能类型为\"改造\"时必须提供对比表格，仅列变化内容\n6. **可验证验收标准**：每条验收标准关联功能编号，可客观判定\n7. **跨模块流程图**：≥ 3 模块联动时必须输出 Mermaid 流程图\n8. **禁止不确定表述**：禁止\"...或...\"、\"...等\"\n9. **异常场景覆盖**：不只描述正常流程，异常场景同样重要\n\n---"
    },
    {
     "heading": "6. 完成后流程",
     "content": "L级 PRD 完成后：\n\n1. AI 发出交接声明：\"PRD 输出完成。请确认业务领域提示后开始技术设计。\"\n2. 用户确认后，切换到 development 能力标签\n3. 研发独立产出技术要点记录（涉及服务、数据变更、接口变更）\n4. 进入任务拆解和分步实现\n\n---\n\n**维护者**: GM架构团队\n**版本**: v3.0\n**最后更新**: 2026-04-10"
    }
   ]
  },
  {
   "id": ".claude--skills--product-manager--requirement-analysis",
   "title": "需求分析技能",
   "category": "skills-product",
   "path": ".claude/skills/product-manager/requirement-analysis.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 需求分析技能"
    },
    {
     "heading": "1. 技能定位",
     "content": "帮助产品经理对新需求进行结构化分析，明确需求范围、涉及的业务领域，并输出标准化的需求分析报告。产品分析不涉及技术设计，技术影响面由研发独立评估。\n\n---"
    },
    {
     "heading": "2. 分析流程",
     "content": "### 步骤1：需求理解\n\n```\n接收需求描述 → 提取关键信息：\n├── 业务目标：这个需求要解决什么问题？\n├── 目标用户：谁在使用这个功能？（站点运营/商户/司机/管理员）\n├── 核心场景：用户在什么场景下使用？\n└── 验收标准：如何判断需求完成？\n```\n\n### 步骤2：领域定位\n\n基于 `.claude/specs/business/` 下的业务领域规范，定位需求所属领域：\n\n```\n检查清单：\n□ 是否涉及商品领域？（分类、SPU/SKU、报价单、组合商品）\n□ 是否涉及订单领域？（订单CRUD、支付、退款、积分、赠品）\n□ 是否涉及供应链领域？（采购、入出库、分拣、配送）\n□ 是否涉及用户权限领域？（登录、权限、角色、商户）\n□ 是否涉及开放平台领域？（OpenAPI、ERP对接、溯源）\n□ 是否跨领域？（识别领域间的交互点）\n```\n\n### 步骤3：现状分析\n\n```\n对于每个涉及的领域：\n├── 当前系统如何处理相关业务？\n├── 现有哪些相关功能？\n├── 当前的痛点或不足是什么？\n└── 有哪些相关的数据模型和接口？\n```\n\n### 步骤4：需求拆解\n\n```\n将原始需求拆解为：\n├── 功能需求（用户可见的功能）\n│   ├── 核心功能（必须有）\n│   └── 增强功能（锦上添花）\n└── 非功能需求\n    ├── 性能期望（业务层面）\n    ├── 安全要求（业务层面）\n    └── 兼容性要求\n```\n\n---"
    },
    {
     "heading": "3. 输出模板",
     "content": "```markdown\n# 需求分析报告"
    },
    {
     "heading": "需求概述",
     "content": "- **需求名称**：[名称]\n- **需求来源**：[客户反馈/产品规划/技术优化]\n- **优先级**：[P0/P1/P2]\n- **目标用户**：[站点运营/商户/管理员/...]"
    },
    {
     "heading": "业务目标",
     "content": "[一句话描述这个需求要解决的业务问题]"
    },
    {
     "heading": "领域分析",
     "content": "### 涉及领域\n| 领域 | 影响程度 | 说明 |\n|------|---------|------|\n| [领域名] | 主要/次要 | [具体影响] |\n\n### 现状描述\n[当前系统对该业务的支持情况]\n\n### 差距分析\n[当前状态与目标状态的差距]"
    },
    {
     "heading": "功能拆解",
     "content": "### 核心功能\n1. [功能1]：[描述]\n2. [功能2]：[描述]\n\n### 增强功能\n1. [功能1]：[描述]"
    },
    {
     "heading": "业务领域提示（待研发确认）",
     "content": "- 可能涉及的业务领域：[领域]\n- 需要关注的关联功能：[功能名]"
    },
    {
     "heading": "风险与约束",
     "content": "1. [风险1]：[描述及应对]\n2. [约束1]：[描述]\n```\n\n---"
    },
    {
     "heading": "4. 分析原则",
     "content": "1. **业务优先**：先理解业务场景，再分析技术方案\n2. **领域边界**：明确需求涉及的领域边界，避免需求范围蔓延\n3. **数据驱动**：基于现有数据模型分析影响面，避免遗漏\n4. **追问不猜测**：信息不充分时必须追问，不做假设\n5. **全链路思考**：考虑需求对上下游的影响（如新增字段是否影响OpenAPI）\n\n---"
    },
    {
     "heading": "5. 领域速查",
     "content": "快速定位需求涉及的项目和模块：\n\n| 业务关键词 | 所属领域 | 主要项目 | 核心模块 |\n|-----------|---------|---------|---------|\n| 分类、SPU、SKU、报价单 | 商品 | gm_server_merchandise | category/, product/ |\n| 订单、下单、支付、退款 | 订单 | gm_server_order | order/, pay/ |\n| 采购、入库、出库、盘点 | 供应链 | gm_web_stock | stock/, purchase_task/ |\n| 分拣、称重、拣货、装箱 | 供应链 | gm_web_sorting | weight/, picking/, box_app/ |\n| 配送、司机、路线 | 供应链 | gm_web_sorting | delivery/, driver_app/ |\n| 登录、权限、角色 | 用户权限 | gm_server_account | station/, ma/, auth/ |\n| 商户、客户、会员 | 用户权限 | gm_server_account + gm_management | customer/, member/ |\n| 优惠券、秒杀、积分 | 营销 | gm_server_bshop + gm_server_order | coupon/, point/ |\n| OpenAPI、对接、同步 | 开放平台 | gm_open | openapi/, yongyou/ |\n| 报表、数据、分析 | 数据 | gm_management + gm_service | report/ |\n| 财务、结算、冲账 | 财务 | gm_management | finance/ |\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-03-19"
    }
   ]
  },
  {
   "id": ".claude--skills--product-manager--requirement-card",
   "title": "PRD 模板（M级 · 精简版）",
   "category": "skills-product",
   "path": ".claude/skills/product-manager/requirement-card.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# PRD 模板（M级 · 精简版）"
    },
    {
     "heading": "1. 技能定位",
     "content": "M级需求的 PRD 模板。内容精简，控制在1页以内。适用于单一功能点、1个模块、业务规则清晰的场景。\n\n**核心原则**：只描述 What 和 Why，不涉及 How。\n\n**内容遵循**：`需求文档规范.spec.md` §6.1 M级 PRD。\n\n---"
    },
    {
     "heading": "2. 使用条件",
     "content": "- 任务规模经 `workflow-routing.spec.md` 判定为 **M级**\n- 用户确认规模后，AI 自动使用本模板\n\n---"
    },
    {
     "heading": "3. 生成流程",
     "content": "### 步骤1：理解需求\n\n```\n提取关键信息：\n├── 业务目标：解决什么问题？\n├── 目标用户：谁用？什么场景？\n├── 功能描述：期望的行为是什么？\n└── 验收标准：怎么算完成？\n```\n\n### 步骤2：领域定位\n\n基于 `.claude/specs/business/` 下的业务领域规范，快速定位涉及的领域。\n\n### 步骤3：填写 PRD\n\n使用下方模板，所有字段必须填写，不得留空。\n\n---"
    },
    {
     "heading": "4. PRD 模板（M级）",
     "content": "```markdown\n# [需求名称] PRD\n\n**优先级**: P0 / P1 / P2\n**日期**: [YYYY-MM-DD]\n**规模**: M"
    },
    {
     "heading": "功能清单",
     "content": "| 编号 | 功能名称 | 所属模块 | 功能类型 | 涉及页面 | 功能说明 |\n|------|---------|---------|---------|---------|---------|\n| F1   | [功能名] | [模块名] | 新增/改造 | [页面路径] | [一句话说明] |"
    },
    {
     "heading": "背景",
     "content": "[1-2句话，为什么做这个]"
    },
    {
     "heading": "目标用户",
     "content": "[谁用这个功能，什么场景]"
    },
    {
     "heading": "改动说明",
     "content": "功能类型为\"改造\"时，用对比表格标注变化：\n\n| 功能项 | 已有功能 | 变化后 | 变化类型 |\n|--------|---------|--------|----------|\n| [项目] | [原来] | [现在] | 新增/改动/删除 |\n\n功能类型为\"新增\"时，直接描述功能行为：\n\n1. **[新增/改动] [页面名]** - `[页面路径]`\n   - 描述期望行为"
    },
    {
     "heading": "业务规则",
     "content": "1. [规则1，含边界条件]\n2. [规则2]"
    },
    {
     "heading": "验收标准",
     "content": "- [ ] [标准1：具体的可验证条件]\n- [ ] [标准2：含边界条件]"
    },
    {
     "heading": "业务领域提示（待研发确认）",
     "content": "- 可能涉及：[领域名]\n- 现有相关功能：[功能名/页面路径]\n```\n\n---"
    },
    {
     "heading": "5. 编写原则",
     "content": "1. **简洁**：不超过1页，去除一切冗余\n2. **功能清单必填**：即使只有 1 个功能点，也必须通过功能清单列出，使用 F1 编号\n3. **业务视角**：只描述用户看到的行为，不涉及技术实现\n4. **可验证**：验收标准必须是可客观判定的条件，禁止模糊表述\n5. **领域提示**：给研发方向参考，明确标注\"待研发确认\"\n6. **改造对比**：功能类型为\"改造\"时必须提供对比表格，仅列变化内容\n7. **禁止不确定表述**：禁止\"...或...\"、\"...等\"\n\n---"
    },
    {
     "heading": "6. 完成后流程",
     "content": "M级 PRD 产出后，直接进入研发阶段（development 能力标签），按需加载开发 Spec 和代码生成 Skill。\n\nM级不需要产品→研发交接声明，直接开始编码。\n\n---\n\n**维护者**: GM架构团队\n**版本**: v3.0\n**最后更新**: 2026-04-10"
    }
   ]
  },
  {
   "id": ".claude--skills--tester--test-report-gen",
   "title": "测试报告生成技能",
   "category": "skills-tester",
   "path": ".claude/skills/tester/test-report-gen.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 测试报告生成技能"
    },
    {
     "heading": "1. 技能定位",
     "content": "基于测试用例集的执行结果，生成结构化的测试报告，汇总测试执行情况、缺陷统计、覆盖率分析，为产品上线决策提供客观依据。\n\n---"
    },
    {
     "heading": "2. 生成流程",
     "content": "### 步骤1：输入物检查\n\n```\n前置条件检查：\n□ 测试用例集已完成（参见 testcase-gen.md）\n□ 测试已执行（全部或部分）\n□ 缺陷已记录（Bug ID 或描述）\n□ 测试环境信息已确认\n```\n\n### 步骤2：收集执行结果\n\n收集以下信息：\n\n```\n收集清单：\n├── 用例执行结果\n│   ├── 通过的用例列表\n│   ├── 失败的用例列表（含失败原因）\n│   ├── 阻塞的用例列表（含阻塞原因）\n│   └── 未执行的用例列表（含原因）\n├── 缺陷信息\n│   ├── 缺陷 ID / 描述\n│   ├── 严重程度（S1-S4）\n│   ├── 当前状态（新建/修复中/已修复/已验证/关闭）\n│   └── 关联用例 ID\n└── 环境信息\n    ├── 测试环境版本\n    ├── 测试时间范围\n    └── 测试人员\n```\n\n### 步骤3：生成统计分析\n\n```\n统计维度：\n├── 用例执行率 = 已执行 / 总数\n├── 用例通过率 = 通过 / 已执行\n├── 缺陷密度 = 缺陷数 / 功能点数\n├── 各优先级通过率（P0/P1/P2/P3）\n├── 各功能模块通过率\n└── 缺陷严重程度分布\n```\n\n### 步骤4：输出测试报告\n\n---"
    },
    {
     "heading": "3. 测试报告模板",
     "content": "```markdown\n# [需求名称] 测试报告"
    },
    {
     "heading": "文档信息",
     "content": "| 项目 | 内容 |\n|------|------|\n| 需求来源 | [PRD 名称及版本] |\n| 测试用例版本 | [测试用例集版本] |\n| 测试时间 | [YYYY-MM-DD ~ YYYY-MM-DD] |\n| 测试人员 | [姓名] |\n| 报告日期 | [YYYY-MM-DD] |\n| 报告版本 | v1.0 |\n\n---"
    },
    {
     "heading": "1. 测试结论",
     "content": "### 1.1 总体结论\n\n**[建议上线 / 有条件上线 / 不建议上线]**\n\n| 判定维度 | 结果 | 说明 |\n|---------|------|------|\n| P0 用例通过率 | [%] | 要求 100% |\n| P1 用例通过率 | [%] | 要求 ≥ 95% |\n| S1 缺陷 | [N] 个未关闭 | 要求 0 |\n| S2 缺陷 | [N] 个未关闭 | 要求 ≤ 2 |\n| 核心流程 | 通过/未通过 | 要求全部通过 |\n\n### 1.2 上线建议\n\n[基于数据的具体建议，包括遗留问题、风险提示、后续跟进事项]\n\n---"
    },
    {
     "heading": "2. 执行概况",
     "content": "### 2.1 用例执行统计\n\n| 指标 | 数值 |\n|------|------|\n| 用例总数 | [N] |\n| 已执行 | [N] |\n| 通过 | [N] |\n| 失败 | [N] |\n| 阻塞 | [N] |\n| 未执行 | [N] |\n| **执行率** | **[%]** |\n| **通过率** | **[%]** |\n\n### 2.2 按优先级统计\n\n| 优先级 | 总数 | 通过 | 失败 | 阻塞 | 通过率 |\n|--------|------|------|------|------|--------|\n| P0 | [N] | [N] | [N] | [N] | [%] |\n| P1 | [N] | [N] | [N] | [N] | [%] |\n| P2 | [N] | [N] | [N] | [N] | [%] |\n| P3 | [N] | [N] | [N] | [N] | [%] |\n\n### 2.3 按功能模块统计\n\n| 功能模块 | 用例数 | 通过 | 失败 | 阻塞 | 通过率 |\n|---------|-------|------|------|------|--------|\n| [模块1] | [N] | [N] | [N] | [N] | [%] |\n| [模块2] | [N] | [N] | [N] | [N] | [%] |\n\n---"
    },
    {
     "heading": "3. 缺陷分析",
     "content": "### 3.1 缺陷统计\n\n| 指标 | 数值 |\n|------|------|\n| 缺陷总数 | [N] |\n| 已修复 | [N] |\n| 已验证 | [N] |\n| 未关闭 | [N] |\n| 缺陷密度 | [N/功能点] |\n\n### 3.2 缺陷严重程度分布\n\n| 严重程度 | 定义 | 数量 | 已关闭 | 未关闭 |\n|---------|------|------|--------|--------|\n| S1-致命 | 系统崩溃/数据丢失/安全漏洞 | [N] | [N] | [N] |\n| S2-严重 | 核心功能不可用/数据错误 | [N] | [N] | [N] |\n| S3-一般 | 非核心功能异常/界面问题 | [N] | [N] | [N] |\n| S4-轻微 | 文案/样式/体验优化 | [N] | [N] | [N] |\n\n### 3.3 缺陷详情\n\n| 缺陷ID | 严重程度 | 描述 | 关联用例 | 状态 | 负责人 |\n|--------|---------|------|---------|------|--------|\n| BUG-001 | S[N] | [描述] | TC-xxx | [状态] | [姓名] |\n\n---"
    },
    {
     "heading": "4. 覆盖率分析",
     "content": "### 4.1 功能覆盖率\n\n| PRD功能编号 | 功能名称 | 用例数 | 执行数 | 通过数 | 覆盖状态 |\n|------------|---------|-------|--------|--------|---------|\n| F001 | [功能名] | [N] | [N] | [N] | ✓ 全覆盖 / △ 部分 / ✗ 未覆盖 |\n\n### 4.2 接口覆盖率\n\n| 接口路径 | 正常 | 参数缺失 | 参数越界 | 权限 | 业务异常 | 数据隔离 |\n|---------|------|---------|---------|------|---------|---------|\n| [路径] | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |\n\n### 4.3 业务规则覆盖率\n\n| 规则编号 | 正向验证 | 反向验证 | 边界值 |\n|---------|---------|---------|-------|\n| R001 | ✓/✗ | ✓/✗ | ✓/✗ |\n\n---"
    },
    {
     "heading": "5. 失败用例详情",
     "content": "### TC-[ID]：[用例名称]\n\n| 属性 | 内容 |\n|------|------|\n| 优先级 | P[N] |\n| 失败原因 | [原因分类：缺陷/环境/数据/需求变更] |\n| 实际结果 | [实际表现] |\n| 预期结果 | [预期表现] |\n| 关联缺陷 | BUG-[NNN] |\n| 截图/日志 | [附件] |\n\n---"
    },
    {
     "heading": "6. 风险与遗留问题",
     "content": "### 6.1 遗留问题\n\n| 编号 | 描述 | 严重程度 | 影响范围 | 跟进计划 |\n|------|------|---------|---------|---------|\n| 1 | [描述] | S[N] | [范围] | [计划] |\n\n### 6.2 风险项\n\n| 风险 | 概率 | 影响 | 应对建议 |\n|------|------|------|---------|\n| [风险] | 高/中/低 | [影响] | [建议] |\n\n---"
    },
    {
     "heading": "7. 测试环境信息",
     "content": "| 项目 | 内容 |\n|------|------|\n| 后端版本/分支 | [分支名或tag] |\n| 前端版本/分支 | [分支名或tag] |\n| 测试服务器 | [环境地址] |\n| 数据库 | [库名/版本] |\n| 测试工具 | Postman / curl / 浏览器 |\n```\n\n---"
    },
    {
     "heading": "4. 上线判定标准",
     "content": "### 4.1 标准定义\n\n| 条件 | 建议上线 | 有条件上线 | 不建议上线 |\n|------|---------|-----------|-----------|\n| P0 通过率 | = 100% | = 100% | < 100% |\n| P1 通过率 | ≥ 95% | ≥ 80% | < 80% |\n| S1 未关闭 | = 0 | = 0 | > 0 |\n| S2 未关闭 | = 0 | ≤ 2（有规避方案） | > 2 |\n| 核心流程 | 全部通过 | 全部通过 | 有不通过 |\n| 执行率 | ≥ 95% | ≥ 80% | < 80% |\n\n### 4.2 \"有条件上线\"的附加要求\n\n- 必须列出所有遗留问题及修复排期\n- 必须确认遗留问题不影响核心业务\n- 必须经产品经理和技术负责人签字确认\n\n---"
    },
    {
     "heading": "5. 衔接机制",
     "content": "### 5.1 输入衔接（来自开发阶段）\n\n| 来源 | 交接物 | 用途 |\n|------|--------|------|\n| 开发工程师 | 功能代码 + 自测结果 | 确认功能已基本可用 |\n| 开发工程师 | 接口文档/变更日志 | 确认测试用例是否需要更新 |\n| 测试用例集 | testcase-gen 产出 | 执行测试的依据 |\n\n### 5.2 输出交付（上线决策）\n\n| 交付物 | 接收方 | 作用 |\n|--------|--------|------|\n| 测试报告 | 产品经理 | 上线决策依据 |\n| 缺陷清单 | 开发工程师 | 修复跟进 |\n| 遗留问题清单 | 技术负责人 | 风险评估 |\n\n---"
    },
    {
     "heading": "6. 提示词指导",
     "content": "当使用本技能时：\n\n1. **必须基于执行结果**：如果测试尚未执行，协助生成\"测试报告模板\"以供后续填写\n2. **数据驱动结论**：上线建议必须基于通过率和缺陷数据，不能凭感觉\n3. **标注风险**：遗留问题和风险必须显式列出，不可隐瞒\n4. **给出明确建议**：结论必须是\"建议上线/有条件上线/不建议上线\"三选一\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-03-23"
    }
   ]
  },
  {
   "id": ".claude--skills--tester--testcase-gen",
   "title": "测试用例生成技能",
   "category": "skills-tester",
   "path": ".claude/skills/tester/testcase-gen.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 测试用例生成技能"
    },
    {
     "heading": "1. 技能定位",
     "content": "基于 PRD（产品需求文档）和影响分析报告，系统性地生成结构化的功能测试用例集，确保每个功能点、业务规则、接口、异常分支都有对应的测试覆盖。\n\n**核心原则**：PRD 中的每一条业务规则、每一个接口、每一个用户故事，都必须生成至少一个测试用例。\n\n---"
    },
    {
     "heading": "2. 生成流程",
     "content": "### 步骤1：输入物检查\n\n```\n前置条件检查：\n□ PRD 已完成且已评审通过\n□ 影响分析报告已完成（可选但推荐）\n□ 接口设计已明确（路径/参数/响应/错误码）\n□ 业务规则已明确（前置条件/操作流程/边界）\n```\n\n如果缺少 PRD，提示：\"请先完成 PRD 生成（使用 `/gm-prd` 命令）\"。\n\n### 步骤2：提取测试要素\n\n从 PRD 中系统性提取以下要素：\n\n```\n提取清单：\n├── 功能列表（PRD §2.1 功能列表）\n│   └── 每个功能点 → 至少 1 组正向用例 + 1 组反向用例\n├── 用户故事（PRD §2.2 功能详细设计 → 用户故事）\n│   └── 每个用户故事 → 至少 1 组端到端用例\n├── 业务规则（PRD §2.2 功能详细设计 → 业务规则）\n│   └── 每条规则 → 至少 1 组验证用例 + 边界值用例\n├── 接口设计（PRD §4 接口设计）\n│   └── 每个接口 → 正常/参数缺失/参数越界/权限/并发 共 5 类用例\n├── 错误码（PRD §4 接口设计 → 错误码）\n│   └── 每个错误码 → 触发用例\n├── 操作流程（PRD §2.2 → 操作流程）\n│   └── 每个流程分支 → 覆盖用例\n├── 异常分支（PRD §2.2 → 操作流程 → 异常分支）\n│   └── 每个异常路径 → 异常用例\n└── 非功能需求（PRD §6）\n    └── 性能/安全/兼容 → 专项用例\n```\n\n### 步骤3：生成测试用例\n\n按照下面的模板结构生成测试用例集。\n\n### 步骤4：覆盖度检查\n\n```\n自检清单：\n□ 每个功能点是否都有正向 + 反向用例？\n□ 每条业务规则是否都有验证用例？\n□ 每个接口是否都覆盖了 5 类测试？\n□ 每个错误码是否都有触发用例？\n□ 每个操作流程分支是否都已覆盖？\n□ 边界值是否已覆盖（最小/最大/空/null/特殊字符）？\n□ 多租户隔离是否已验证（group_id 隔离）？\n□ 权限控制是否已验证？\n```\n\n如果发现覆盖缺口，自动补充用例。\n\n### 步骤5：输出测试用例文档\n\n按照下方模板输出完整文档。\n\n---"
    },
    {
     "heading": "3. 测试用例模板",
     "content": "```markdown\n# [需求名称] 测试用例集"
    },
    {
     "heading": "文档信息",
     "content": "| 项目 | 内容 |\n|------|------|\n| 需求来源 | [PRD 名称及版本] |\n| 创建日期 | [日期] |\n| 作者 | [姓名] |\n| 用例总数 | [N] |\n| 覆盖功能数 | [N] |\n\n---"
    },
    {
     "heading": "1. 测试范围",
     "content": "### 1.1 测试功能清单\n\n| 编号 | 功能名称 | PRD编号 | 用例数 | 优先级 |\n|------|---------|---------|-------|--------|\n| F001 | [功能名] | PRD-F001 | [N] | P0/P1 |\n\n### 1.2 不测试范围\n\n| 编号 | 功能/场景 | 不测原因 |\n|------|---------|---------|\n| EX001 | [功能] | [原因：如\"现有功能未变更\"] |\n\n---"
    },
    {
     "heading": "2. 测试环境要求",
     "content": "| 项目 | 要求 |\n|------|------|\n| 后端服务 | [需要启动的服务列表] |\n| 数据库 | [需要的库和初始数据] |\n| 测试账号 | [角色/权限/group_id] |\n| 依赖服务 | [RPC服务/MQ/Redis/ES] |\n\n---"
    },
    {
     "heading": "3. 测试用例",
     "content": "### 3.1 [功能名称 F001]\n\n#### TC-F001-001：[用例名称]\n\n| 属性 | 内容 |\n|------|------|\n| **用例ID** | TC-F001-001 |\n| **优先级** | P0 |\n| **测试类型** | 正向测试 / 反向测试 / 边界测试 / 异常测试 |\n| **关联PRD** | PRD §2.2 F001 |\n| **前置条件** | 1. [条件1]<br>2. [条件2] |\n\n**测试步骤**：\n\n| 步骤 | 操作 | 预期结果 |\n|------|------|---------|\n| 1 | [操作描述] | [预期结果] |\n| 2 | [操作描述] | [预期结果] |\n| 3 | [验证点] | [预期结果] |\n\n**接口请求**（如为接口测试）：\n\n```\n[METHOD] /api/path/\nContent-Type: application/json\nCookie: station_id=xxx; group_id=xxx\n\n{\n    \"param1\": \"value1\",\n    \"param2\": \"value2\"\n}\n```\n\n**预期响应**：\n\n```json\n{\n    \"code\": 0,\n    \"msg\": \"ok\",\n    \"data\": {}\n}\n```\n\n**测试结果**：\n\n| 执行日期 | 执行人 | 结果 | 备注 |\n|---------|--------|------|------|\n| | | ☐ 通过 ☐ 失败 ☐ 阻塞 | |\n\n---\n\n### 3.2 [功能名称 F002]\n\n（按 3.1 格式继续...）\n\n---"
    },
    {
     "heading": "4. 接口测试矩阵",
     "content": "对 PRD 中每个接口，按 5 维度生成用例：\n\n### 4.1 [接口名称]\n\n**接口信息**：`[METHOD] /api/path/` — [功能描述]\n\n| 用例ID | 维度 | 场景 | 请求参数概要 | 预期code | 预期msg | 优先级 |\n|--------|------|------|-------------|---------|---------|--------|\n| TC-API-001 | 正常 | 所有参数正确 | 完整有效参数 | 0 | ok | P0 |\n| TC-API-002 | 参数缺失 | 缺少必填param1 | 去掉param1 | 1 | param_err | P0 |\n| TC-API-003 | 参数越界 | param2超过最大值 | param2=999999 | 1 | param_err | P1 |\n| TC-API-004 | 权限 | 无权限用户访问 | 使用无权限账号 | 10 | auth_err | P0 |\n| TC-API-005 | 业务异常 | [具体场景] | [触发参数] | 4 | business_err | P1 |\n| TC-API-006 | 数据隔离 | 跨group_id访问 | 其他租户数据 | 4 或 空 | 无权限或数据为空 | P0 |\n\n---"
    },
    {
     "heading": "5. 业务规则验证矩阵",
     "content": "对 PRD 中每条业务规则，生成验证用例：\n\n| 用例ID | 规则编号 | 规则描述 | 验证场景 | 输入 | 预期结果 | 优先级 |\n|--------|---------|---------|---------|------|---------|--------|\n| TC-BR-001 | R001 | [规则描述] | 满足条件 | [输入] | [结果] | P0 |\n| TC-BR-002 | R001 | [规则描述] | 不满足条件 | [输入] | [结果] | P0 |\n| TC-BR-003 | R001 | [规则描述] | 边界值 | [输入] | [结果] | P1 |\n\n---"
    },
    {
     "heading": "6. 流程测试",
     "content": "对 PRD 中每个操作流程，生成端到端测试：\n\n### 6.1 [流程名称]\n\n**流程路径**：步骤1 → 步骤2 → ... → 完成\n\n| 用例ID | 路径类型 | 测试路径 | 预期结果 | 优先级 |\n|--------|---------|---------|---------|--------|\n| TC-FL-001 | 主路径 | 步骤1→2→3→完成 | 流程正常完成 | P0 |\n| TC-FL-002 | 异常路径 | 步骤1→2→异常 | 正确提示并可恢复 | P0 |\n| TC-FL-003 | 中断路径 | 步骤1→中断→重试 | 数据不丢失 | P1 |\n\n---"
    },
    {
     "heading": "7. 覆盖度统计",
     "content": "### 7.1 功能覆盖\n\n| PRD功能编号 | 功能名称 | 用例数 | P0数 | P1数 | 覆盖状态 |\n|------------|---------|-------|------|------|---------|\n| F001 | [功能名] | [N] | [N] | [N] | 已覆盖/部分覆盖 |\n\n### 7.2 接口覆盖\n\n| 接口路径 | 正常 | 参数缺失 | 参数越界 | 权限 | 业务异常 | 数据隔离 |\n|---------|------|---------|---------|------|---------|---------|\n| [路径] | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |\n\n### 7.3 业务规则覆盖\n\n| 规则编号 | 正向验证 | 反向验证 | 边界值 |\n|---------|---------|---------|-------|\n| R001 | ✓ | ✓ | ✓ |\n\n### 7.4 覆盖率汇总\n\n| 维度 | 总数 | 已覆盖 | 覆盖率 |\n|------|------|--------|-------|\n| 功能点 | [N] | [N] | [%] |\n| 接口 | [N] | [N] | [%] |\n| 业务规则 | [N] | [N] | [%] |\n| 错误码 | [N] | [N] | [%] |\n| 流程分支 | [N] | [N] | [%] |\n```\n\n---"
    },
    {
     "heading": "4. 用例编号规范",
     "content": "| 前缀 | 含义 | 示例 |\n|------|------|------|\n| TC-F{NNN}-{NNN} | 功能测试用例 | TC-F001-001 |\n| TC-API-{NNN} | 接口测试用例 | TC-API-001 |\n| TC-BR-{NNN} | 业务规则验证用例 | TC-BR-001 |\n| TC-FL-{NNN} | 流程测试用例 | TC-FL-001 |\n| TC-NF-{NNN} | 非功能测试用例 | TC-NF-001 |\n| TC-REG-{NNN} | 回归测试用例 | TC-REG-001 |\n\n---"
    },
    {
     "heading": "5. 测试类型说明",
     "content": "### 5.1 按测试目的分类\n\n| 类型 | 说明 | 生成规则 |\n|------|------|---------|\n| **正向测试** | 验证功能在正常输入下的预期行为 | 每个功能点至少 1 个 |\n| **反向测试** | 验证功能在非法/异常输入下的防御行为 | 每个参数至少 1 个非法值 |\n| **边界测试** | 验证边界值（最大/最小/空/零/临界值） | 每个有范围约束的参数 |\n| **异常测试** | 验证异常流程路径 | PRD 中每个异常分支 |\n| **兼容测试** | 验证与现有功能的兼容性 | 影响分析报告中的变更点 |\n| **回归测试** | 验证变更未影响已有功能 | 影响分析报告中的受影响模块 |\n\n### 5.2 GM 项目专项测试维度\n\n| 维度 | 说明 | 检查点 |\n|------|------|--------|\n| **多租户隔离** | 验证 group_id 数据隔离 | A 租户不能访问 B 租户数据 |\n| **权限控制** | 验证接口权限校验 | 无权限用户请求返回 code=10 |\n| **登录态** | 验证未登录访问 | 未登录请求返回 code=100 |\n| **GmDecimal 精度** | 验证金额计算精度 | 使用 GmDecimal 运算，ROUND_HALF_UP |\n| **跨服务一致性** | 验证 RPC 调用后数据一致 | View 层调用 Server 层后数据同步 |\n| **异步任务** | 验证异步任务执行结果 | 任务状态正确流转 |\n| **MQ 消息** | 验证消息发送与消费 | 消息体格式正确，消费端正确处理 |\n\n---"
    },
    {
     "heading": "6. 生成原则",
     "content": "### 6.1 用例质量标准\n\n1. **可执行**：每个用例必须包含明确的操作步骤和预期结果，测试人员无需额外询问即可执行\n2. **可验证**：预期结果必须是可客观判定的（具体的 code 值、具体的数据状态变化）\n3. **独立性**：每个用例可独立执行，不依赖其他用例的执行顺序（前置条件要显式声明）\n4. **可追溯**：每个用例必须关联到 PRD 的具体章节（通过 PRD 编号）\n\n### 6.2 优先级定义\n\n| 优先级 | 定义 | 何时执行 |\n|--------|------|---------|\n| **P0** | 核心主流程、数据安全、权限控制 | 每次必测 |\n| **P1** | 重要功能、常见异常、业务规则 | 每次建议测 |\n| **P2** | 边界值、兼容性、非常见场景 | 有时间时测 |\n| **P3** | 界面细节、提示文案、极端场景 | 回归时抽测 |\n\n### 6.3 衔接上游产出物\n\n| 上游产出物 | 提取什么 | 生成什么用例 |\n|-----------|---------|-------------|\n| PRD §2 功能说明 | 功能点 + 用户故事 | 功能测试用例 (TC-F) |\n| PRD §2 业务规则 | 业务规则 + 前置条件 | 业务规则验证用例 (TC-BR) |\n| PRD §2 操作流程 | 流程图 + 分支 | 流程测试用例 (TC-FL) |\n| PRD §4 接口设计 | 路径/参数/响应/错误码 | 接口测试矩阵 (TC-API) |\n| PRD §6 非功能需求 | 性能/安全要求 | 非功能用例 (TC-NF) |\n| 影响分析报告 | 受影响的现有功能 | 回归测试用例 (TC-REG) |\n\n---"
    },
    {
     "heading": "7. 提示词指导",
     "content": "当使用本技能时：\n\n1. **必须先读 PRD**：如果没有 PRD，不要生成用例，而是提示先完成 PRD\n2. **逐功能点生成**：不要跳过任何功能点，按 PRD §2.1 功能列表逐个生成\n3. **5 维接口测试**：每个接口至少覆盖正常/参数缺失/参数越界/权限/业务异常 5 个维度\n4. **结尾自检**：生成完毕后执行覆盖度检查，发现缺口自动补充\n5. **使用项目错误码**：code=0 成功, code=1 参数错误, code=4 业务异常, code=10 权限不足, code=100 未登录\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-03-23"
    }
   ]
  },
  {
   "id": ".claude--specs--README",
   "title": "GM Spec导航",
   "category": "specs-common",
   "path": ".claude/specs/README.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# GM Spec导航\n\n> **定位**：Spec定义\"必须这样用\"的强制性规范\n> **位置**：`.claude/specs/`\n> **优先级**：10\n\n---"
    },
    {
     "heading": "1. Spec定位",
     "content": "### 1.1 Spec vs Command vs Skill vs Guide\n\n| 类型 | 定义 | 语义 | 位置 | 优先级 |\n|------|------|------|------|--------|\n| **Spec** | \"必须这样用\" | 强制性/标准 | `.claude/specs/` | 10 |\n| **Command** | \"帮我这样用\" | 动作性/自动化 | `.claude/commands/` | 8 |\n| **Skill** | \"参考这个用\" | 模板/指导 | `.claude/skills/` | 5 |\n| **Guide** | \"在哪里做\" | 导航性/全局性 | `docs/` | 3 |\n\n### 1.2 Spec的核心作用\n\n1. **消除随机性**：确保AI输出符合架构约束\n2. **强制遵循**：AI在生成代码前会扫描Spec\n3. **合规自检**：生成后根据Spec自我Review\n4. **版本控制**：架构演进时更新Spec，AI自动适应\n\n---"
    },
    {
     "heading": "2. 目录结构",
     "content": "```\n.claude/specs/\n├── common/                        # 通用规范\n│   ├── 文档格式规范.spec.md        # 文档类型定义 ⭐\n│   └── 项目开发宪法.spec.md        # 项目核心规范 ⭐\n│\n└── developer/                     # 开发者规范\n    ├── 服务分层规范.spec.md       # 分层架构 ⭐\n    ├── RPC接口规范.spec.md         # 接口定义\n    ├── 数据模型规范.spec.md         # 数据模型\n    └── 代码风格规范.spec.md         # 代码风格 ⭐\n```\n\n---"
    },
    {
     "heading": "3. 核心规范",
     "content": "### 3.1 通用规范\n\n**文档格式规范** ⭐\n- **文件**：`common/文档格式规范.spec.md`\n- **内容**：\n  - Spec/Command/Skill/Guide/Rule格式规范\n  - YAML元数据规范\n  - 文件命名规范\n- **适用**：所有文档编写\n\n**项目开发宪法** ⭐\n- **文件**：`common/项目开发宪法.spec.md`\n- **内容**：\n  - 技术栈声明（Python 3.12、Django 4.1）\n  - 项目目录结构\n  - 服务清单和职责\n  - 代码格式化规范（black）\n  - CI/CD规范（GitLab）\n  - 测试规范（当前无自动化测试）\n  - 强制规则总结\n- **适用**：所有开发活动\n\n### 3.2 开发者规范\n\n**服务分层规范** ⭐\n- **文件**：`developer/服务分层规范.spec.md`\n- **内容**：\n  - 分层架构（website/service/common）\n  - 层级职责定义\n  - 跨层调用规范\n  - 正确/错误示例\n- **适用**：所有服务开发\n\n**代码风格规范** ⭐\n- **文件**：`developer/代码风格规范.spec.md`\n- **内容**：\n  - 命名规范（文件、类、函数、变量、常量）\n  - 注释规范（文件头、类、函数、行内）\n  - 代码格式规范（缩进、空行、行长度）\n  - DRF视图规范\n  - 错误处理规范\n- **适用**：所有代码编写\n\n---"
    },
    {
     "heading": "4. 使用方式",
     "content": "### 4.1 AI自动读取Spec\n\n**代码生成时**：\n1. AI自动读取相关Spec\n2. 检查代码是否符合规范\n3. 不符合则拒绝生成\n\n**代码Review时**：\n1. AI根据Spec检查合规性\n2. 输出Review报告\n3. 提供修改建议\n\n### 4.2 开发者遵循\n\n**开发前**：\n- 阅读相关Spec了解规范\n- 理解分层架构\n- 确认数据模型规范\n\n**开发中**：\n- 遵循Spec编写代码\n- 遵循命名规范\n- 遵循Django规范\n\n---"
    },
    {
     "heading": "5. 检查清单",
     "content": "### 开发前检查\n\n- [ ] 已阅读相关Spec\n- [ ] 理解分层架构规范\n- [ ] 确认数据模型规范\n\n### 代码生成检查\n\n- [ ] 符合分层架构规范\n- [ ] 遵循Django/Python规范\n- [ ] 正确使用gm_rmiclient\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-03-16"
    }
   ]
  },
  {
   "id": ".claude--specs--business--业务领域全景.spec",
   "title": "演示公司业务领域全景",
   "category": "specs-business",
   "path": ".claude/specs/business/业务领域全景.spec.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 演示公司业务领域全景"
    },
    {
     "heading": "1. 平台定位",
     "content": "**演示公司**是一个面向生鲜食配行业的供应链 SaaS 平台，覆盖从商品管理、采购、入库、分拣、配送到订单结算的全链路业务。\n\n核心用户角色：\n- **站点运营人员**：使用站点端管理订单、商品、采购、分拣、进销存\n- **B端商户（Customer）**：通过商城端下单采购、查看订单、支付\n- **司机**：通过司机App完成配送任务\n- **管理员（MA）**：通过管理平台管理站点、用户、财务、报表\n- **供应商**：通过供应商端接收采购订单、报价\n- **平台管理员**：通过 gm_admin 管理加盟商、站点、智能录单等\n- **第三方系统**：通过开放平台OpenAPI对接ERP/溯源\n\n---"
    },
    {
     "heading": "2. 微服务架构拓扑",
     "content": "```\n┌──────────────────────────────── 前端层 ──────────────────────────────┐\n│  gm_static_stationv2 (React 站点端)    gm_static_bshopv2 (B端商城)   │\n└──────────────────────────────────┬──────────────────────────────────┘\n                                   ▼\n┌──────────────────────────────── View 层 ────────────────────────────┐\n│  gm_service         站点端主服务（352+视图类，业务最重的 View 层）     │\n│  gm_management      管理平台（财务/客户运营/订单运营/报表/会员）       │\n│  gm_web_stock       进销存（采购/入出库/盘点/加工/调拨/结款）         │\n│  gm_web_sorting     分拣配送（称重/拣货/装箱/配送/司机App）           │\n│  gm_server_bshop    B端商城（购物车/下单/支付/优惠券/秒杀/限时促销）    │\n│  gm_open            开放平台（OpenAPI/用友/金蝶/银豹/溯源/华住）       │\n│  gm_admin           平台管理后台（加盟商/站点/智能录单/短信/运营）      │\n└──────────────────────────────────┬──────────────────────────────────┘\n                                   ▼  gm_rmiclient (HTTP RPC)\n┌──────────────────────────────── Server 层 ──────────────────────────┐\n│  gm_server_order         订单核心（100+路由/8种支付渠道/v1+v2双版本） │\n│  gm_server_merchandise   商品核心（四级分类/SPU/SKU/组合商品/菜谱）    │\n│  gm_server_account       权限核心（Station+MA双权限体系/GraphQL）     │\n└──────────────────────────────────┬──────────────────────────────────┘\n                                   ▼\n┌──────────────────────────────── 共享库 / 基础设施 ──────────────────┐\n│  gm_rmiclient      RPC客户端（30+ Service类，500+方法）              │\n│  gm_order_logic    订单计算（GmDecimal/v1v2查询聚合/ES/Excel/缓存）   │\n│  gm_mqlib          消息队列（Channel两阶段: MySQL落库+RabbitMQ发送）  │\n│  gm_configer       配置中心（Consul KV）                             │\n│  gm_async_job      异步任务调度（Go: Tracker+Agent架构，并发控制）     │\n│  marketing-interaction-layer  营销互动层（Go: MQ消费转发+HTTP+cron）  │\n└────────────────────────────────────────────────────────────────────┘\n```\n\n### 2.1 层间调用规则\n\n| 调用方向 | 是否允许 | 方式 |\n|---------|---------|------|\n| 前端 → View层 | ✅ | HTTP API |\n| View层 → Server层 | ✅ | gm_rmiclient (HTTP) |\n| View层 → View层 | ❌ | 禁止跨View调用 |\n| Server层 → Server层 | ❌ | 禁止跨Server调用 |\n| 任何层 → 共享库 | ✅ | Python import |\n| View/Server → gm_async_job | ✅ | AsyncJobService.add() (HTTP) |\n| View/Server → gm_mqlib | ✅ | Channel.prepare().send() |\n\n### 2.2 多租户机制\n\n所有业务数据以 `group_id`（站点ID）隔离，请求通过 Cookie 携带 `group_id`，View 层在 `request.group_id` 中获取。\n\n租户层级：`Partner（加盟商/MA）→ Station（站点）→ User/Customer`\n\n---"
    },
    {
     "heading": "3. 核心业务领域",
     "content": "### 3.1 领域划分\n\n| 领域 | 详细规范 | 核心实体 | 主要服务 |\n|------|---------|---------|---------|\n| **商品** | `商品领域.spec.md` | Category1/2, Pinlei, SPU, SKU, Salemenu | gm_server_merchandise |\n| **订单** | `订单领域.spec.md` | Order, OrderDetail, Payment, Refund | gm_server_order |\n| **供应链** | `供应链领域.spec.md` | PurchaseTask, StockIn/Out, SortingTask, Delivery | gm_web_stock, gm_web_sorting |\n| **用户权限** | `用户权限领域.spec.md` | User, Role, Permission, Customer, Station | gm_server_account |\n| **开放平台** | `开放平台领域.spec.md` | App, AccessToken, OpenAPI | gm_open |\n| **营销** | 分散于 gm_service/gm_server_bshop | Coupon, FlashSale, Member, Point, PriceRule | gm_service, gm_server_bshop |\n| **财务报表** | 分散于 gm_management/gm_service | Settlement, Bill, Report | gm_management, gm_service |\n| **信息平台** | `信息平台领域.spec.md` | Customer(批量编辑), Finance, Member, Report | gm_management |\n\n### 3.2 领域间依赖关系\n\n```\n商品领域 ←──── 订单领域（订单包含SKU明细）\n  │              │\n  │              ├──── 供应链领域（采购/入库引用SKU，分拣引用订单）\n  │              │\n  │              ├──── 营销领域（优惠券/秒杀/定价规则绑定SKU）\n  │              │\n  │              └──── 开放平台（对外暴露订单/商品API）\n  │\n  └──────────── 供应链领域（采购规格引用SPU/SKU）\n\n用户权限领域 ←── 所有领域（鉴权依赖）\n\n营销互动层 ←─── 订单/商品/客户领域（MQ消费转发至外部平台）\n```\n\n---"
    },
    {
     "heading": "4. 项目与业务领域映射",
     "content": "### 4.1 按项目维度\n\n| 项目 | 语言 | 架构层 | 涉及领域 | 关键业务模块 |\n|------|------|-------|---------|-------------|\n| **gm_server_order** | Python | Server | 订单、支付 | order/, pay/, weight/, point/, present_sku/ |\n| **gm_server_merchandise** | Python | Server | 商品 | category/, product/, combine_goods/, cookbook/, purchase_specification/, merchandise_template/, reward_sku/, new_merchandise_demand/ |\n| **gm_server_account** | Python | Server | 用户权限 | apps/station/, apps/ma/, apps/auth/, apps/customer/ |\n| **gm_service** | Python | View | 全领域（最大） | website/ 下 30+ 模块，station/ 子模块 20+ |\n| **gm_web_stock** | Python | View | 供应链(采购/进销存) | stock/, purchase_task/, purchase_spec/, purchase_analyse/, process/, split_spu/, station_transfer/, quote_price/, batch/, internal/ |\n| **gm_web_sorting** | Python | View | 供应链(分拣/配送) | weight/, station/, delivery/, picking/, box_app/, box_template/, driver_app/, driver_performance/ |\n| **gm_server_bshop** | Python | View | 订单(B端)、营销 | cart/, order/, pay/, coupon/, flash_sale/, limit_time_promotion/, user/, product/, cookbook/, present/, turnover/, message/ |\n| **gm_management** | Python | View | 用户、财务、运营 | account/, finance/, ordermanage/, custommanage/, report/, member/, merchandise/, op_log/ |\n| **gm_open** | Python | View | 开放平台 | openapi/(12子模块), yongyou/, kingdeeK3/, pospal/, szscgl/, chongqing_trace/, zhejiang_food_chain/, suzhou_trace/, hz_trade_platform/ |\n| **gm_admin** | Python | View | 平台管理 | partner/, station/, smart_order/, partner_administrator/, sms/, merchandise/, operations/, cloud_images/, data_show/ |\n| **gm_order_logic** | Python | 共享库 | 订单计算 | GmDecimal, order_v1/v2, ES工具, Excel导出 |\n| **gm_rmiclient** | Python | 共享库 | 跨服务通信 | 30+ Service 类，500+ 方法 |\n| **gm_mqlib** | Python | 共享库 | 消息队列 | Channel 两阶段发送 (MySQL + RabbitMQ) |\n| **gm_async_job** | **Go** | 基础设施 | 异步任务调度 | jobTracker (API+MySQL) + jobAgent (执行) |\n| **marketing-interaction-layer** | **Go** | 基础设施 | 营销互动 | MQ消费转发, HTTP API, cron补偿, 多平台对接 |\n\n### 4.2 gm_service 核心模块详细映射\n\ngm_service 是最大的 View 层项目，`website/` 下主要模块：\n\n| 模块目录 | URL前缀 | 功能域 |\n|---------|---------|--------|\n| station/ | `/station/` | **站点核心**（登录/首页/订单/客户/司机/运费/打印/权限 + 20 子模块） |\n| merchandise/ | `/merchandise/` | 分类/SPU管理、云图、模板导入 |\n| product/ | `/product/` | SKU管理、智能定价、批量导入导出、快照、工艺 |\n| salemenu/ | `/salemenu/` | 报价单CRUD、周期定价、标签、异步算价 |\n| order_status/ | `/order_status/` | 订单状态通知（微信回调） |\n| coupon/ | `/coupon/` | 优惠券 |\n| flash_sale/ | `/flash_sale/` | 秒杀活动 |\n| member/ | `/member/` | 会员卡、SKU会员价 |\n| data_center/ | `/data_center/` | 利润日报、订单/SKU统计 |\n| report/ | `/report/` | 报表异步导出 |\n| combine_goods/ | `/combine_goods/` | 组合商品 |\n| cookbook/ | `/cookbook/` | 菜谱 |\n| supplier/ | `/supplier/` | 供应商管理 |\n| purchase_spec/ | `/purchase_spec/` | 采购规格 |\n| process/ | `/process/` | 加工 |\n| sorter/ | `/sorter/` | 分拣员端接口 |\n| delivery/ | (无独立URL) | 配送（主要在station/内实现） |\n| fee/ | `/fee/` | 币种/汇率 |\n| account/ | `/gm_account/` | 账户管理 |\n| community/ | `/community/` | 社区 |\n| day_price/ | `/day_price/` | 每日菜价 |\n| allocation_rule/ | `/allocation_rule/` | 分配规则 |\n| service_time/ | `/service_time/` | 服务时间 |\n| station_messages/ | `/message/` | 站内消息 |\n| sms/ | `/sms/` | 短信 |\n| food_security_report/ | `/food_security_report/` | 食安报告 |\n| recycle_bin/ | `/recycle_bin/` | 回收站 |\n| openapi/ | `/openapi/` | 内部OpenAPI |\n| youzan_app/ | `/youzan/` | 有赞对接 |\n| home_page/ | `/home_page/` | 首页 |\n| gm_statistics/ | `/station_statistics/` | 站点统计 |\n\n### 4.3 station/ 子模块（gm_service 内最大模块）\n\n| 子模块 | 功能 |\n|--------|------|\n| yangguang/ | 阳光采购平台对接（授权/SKU映射/同步/拉单/称重同步/报表） |\n| price_rule/ | 定价规则CRUD、按地址/客户/报价单检索SKU |\n| consumer_label/ | 客户标签管理 |\n| charge_gift/ | 充值赠品 |\n| employee_commission/ | 员工提成 |\n| limit_time_promotion/ | 限时促销 |\n| promotion/ | 促销活动 |\n| picking/ | 拣货相关 |\n| point/ | 积分管理 |\n| present_sku/ | 赠品配置 |\n| spu_tag/ | 商品标签 |\n| supplier_sorting/ | 供应商分拣配置 |\n| turnover/ | 营业流水/周转物 |\n| pick_up_station/ | 自提点管理 |\n| driver_monitor/ | 司机设备温湿度/轨迹/回放/报表 |\n| food_security/ | 食品安全 |\n| operate_log/ | 操作日志 |\n| tencent_qian/ | 腾讯电子签 |\n| toolbox/ | 工具脚本 |\n\n### 4.4 按业务流程维度\n\n**主营业务流程**：\n\n```\n商品建档 → 商户下单 → 订单审核 → 采购 → 入库 → 分拣 → 配送 → 签收 → 结算\n   │          │         │        │       │       │       │       │       │\n   ▼          ▼         ▼        ▼       ▼       ▼       ▼       ▼       ▼\n 商品领域   订单领域   订单领域  供应链   供应链   供应链   供应链   订单领域  财务\n(merchandise)(bshop)   (service) (stock) (stock) (sorting)(sorting)(order) (mgmt)\n```\n\n**业务高峰时段**：\n\n| 业务 | 高峰时段 | 说明 |\n|------|---------|------|\n| 订单/商城 | 18:00-22:00 | 商户集中下单 |\n| 采购 | 14:00-22:00 | 采购任务生成与处理 |\n| 分拣 | 21:00-07:00 | 夜间分拣作业 |\n| 进销存 | 23:00-09:00 | 入出库、盘点 |\n\n---"
    },
    {
     "heading": "5. 技术栈差异对照",
     "content": "| 维度 | gm_service | gm_server_order | gm_web_stock | gm_web_sorting | gm_server_bshop | gm_server_account |\n|------|-----------|----------------|-------------|---------------|----------------|------------------|\n| **主ORM** | SQLAlchemy | Django ORM + SQLAlchemy | MongoDB + MySQL | Django ORM + SQLAlchemy | Django ORM + SQLAlchemy | SQLAlchemy |\n| **数据库** | MySQL 多库 | MySQL + TDSQL + MongoDB | MySQL 11库 + MongoDB | MySQL 6库 | MySQL + MongoDB | MySQL + MongoDB |\n| **搜索** | ES 7.x | ES 7.x | ES 6.x | ES 6.x | 无 | 无 |\n| **API形态** | REST | REST | REST | REST | REST | GraphQL + REST |\n| **View基类** | CommonBaseView | BaseView(自定义) | CommonBaseView | CommonBaseView | CommonBaseView | BaseView(自定义) |\n| **gRPC** | 有(ceres/) | 无 | 无 | 无 | 无 | 无 |\n| **视图规模** | 352+ 类 | 100+ 路由 | 200+ 路由 | 150+ 路由 | 80+ 路由 | 20+ 路由 |\n\n**非 Python 项目**：\n\n| 项目 | 语言 | 框架 | 特点 |\n|------|------|------|------|\n| gm_async_job | Go | 自研 Tracker+Agent | 中心化任务调度，支持并发控制、cron、聚合任务 |\n| marketing-interaction-layer | Go | Gin + Kombu | HTTP API + 多进程MQ消费 + cron，多Dockerfile按进程拆分 |\n\n---"
    },
    {
     "heading": "6. 数据存储拓扑",
     "content": "### 6.1 MySQL 数据库\n\n| 数据库 | 用途 | 主要使用方 |\n|--------|-----|-----------|\n| `management` | 站点管理主库（用户、权限、配置、支付记录、积分） | gm_service, gm_management, gm_server_order, gm_admin |\n| `xnn_core_product_2` | 商品主库（分类、SPU、SKU） | gm_server_merchandise, gm_service |\n| `order` (TDSQL) | 订单分布式库（按年月分表 `tbl_order_{date}`） | gm_server_order |\n| `inventory` | 进销存库（库存调整、冻结、变动日志） | gm_web_stock |\n| `sorting` | 分拣库（分拣数据、称重记录） | gm_web_sorting |\n| `delivery` | 配送库（配送记录、司机数据） | gm_web_sorting, gm_service |\n| `other` | 其他业务数据 | gm_service |\n| `third_party` | 第三方对接数据 | gm_service |\n| `process` | 加工库 | gm_web_stock |\n| `turnover` | 周转物库 | gm_web_stock |\n| `purchase` | 采购库 | gm_web_stock |\n\n### 6.2 MongoDB 数据库\n\n| 数据库 | 核心 Collection | 主要使用方 |\n|--------|----------------|-----------|\n| **inventory** | `stock_new`(库存主表), `batch_stock`(批次), `in_stock_log`(入库), `out_stock_sheet`(出库单), `out_stock_log`(出库), `settle_sheet`(结款), `shelf_spu_details`(货位), `stock_value_{group_id}`(货值) | gm_web_stock |\n| **purchase** | `purchase_sheet`(采购单), `purchase_sku_log`(采购明细), `purchase_analyse_*`(采购分析), `supplier_assess_*`(供应商考核) | gm_web_stock |\n| **product** | `spu_product`(SPU), `sku_product_new`(SKU), `sku_product_snapshot_new`(快照), `combine_goods`(组合商品), `cookbook`(菜谱), `purchase_specification`(采购规格) | gm_server_merchandise |\n| **default** | `category_level1/2`(分类), `pinlei`(品类), 供应商/站点/报价单等通用数据 | gm_server_merchandise, gm_web_stock |\n| **template** | 模板级 category1/2, pinlei, spu_product | gm_server_merchandise |\n\n### 6.3 Redis\n\n| DB | 用途 | 使用方 |\n|----|------|--------|\n| db0 | 通用缓存 | 所有项目 |\n| db2 | 分布式锁（Redlock） | gm_service, gm_web_stock |\n| db3 | 采购/分拣/配送业务缓存 | gm_web_stock, gm_web_sorting |\n\n### 6.4 Elasticsearch\n\n| 版本 | 用途 | 使用方 |\n|------|------|--------|\n| ES 7.x | 订单搜索、商品搜索 | gm_service, gm_server_order |\n| ES 6.x | 库存搜索、采购搜索 | gm_web_stock, gm_web_sorting |\n\n---"
    },
    {
     "heading": "7. 异步任务体系",
     "content": "### 7.1 gm_async_job（Go 服务）\n\n| 组件 | 职责 |\n|------|------|\n| jobTracker | 任务API（`/v1/job/create`, `/v1/job/add`等）+ MySQL存储 + 并发控制 |\n| jobAgent | 轮询取任务、本地脚本执行、心跳上报、进度回传 |\n\n### 7.2 各项目异步任务前缀\n\n| 项目 | 任务前缀 | 任务数量 | 典型任务 |\n|------|---------|---------|---------|\n| gm_service | `station.*` | ~100个 | 批量导入导出、订单同步、智能定价 |\n| gm_web_stock | `stock.*` | ~70个 | 批量入出库、盘点、采购任务、结款导出 |\n| gm_web_sorting | `sorting.*` | ~20个 | 拣货导出、分拣标签打印 |\n\n### 7.3 消息队列（gm_mqlib）\n\n两阶段可靠发送：`Channel.prepare(topic, msg)` 先写MySQL → 业务操作 → `Channel.send()` 发到 RabbitMQ\n\n常见消息场景：用户操作日志、订单状态变更、库存变动通知、营销互动事件\n\n---\n\n**维护者**: GM架构团队\n**版本**: v2.0\n**最后更新**: 2026-03-23"
    }
   ]
  },
  {
   "id": ".claude--specs--business--供应链领域.spec",
   "title": "供应链领域业务规范",
   "category": "specs-business",
   "path": ".claude/specs/business/供应链领域.spec.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 供应链领域业务规范"
    },
    {
     "heading": "1. 领域概述",
     "content": "供应链领域覆盖从采购到配送的完整履约链路，是演示公司平台中最重要的运营领域。主要由两个 View 层服务承载：\n- **gm_web_stock**：采购 + 进销存（MongoDB 为主存储）\n- **gm_web_sorting**：分拣 + 配送（MySQL 为主存储）\n\n---"
    },
    {
     "heading": "2. 子领域划分",
     "content": "```\n供应链领域\n├── 采购管理（gm_web_stock）\n│   ├── 采购任务（purchase_task/）\n│   ├── 采购单（stock/purchase/）\n│   ├── 询价/报价（quote_price/）\n│   ├── 采购分析（purchase_analyse/）\n│   └── 采购规格（purchase_spec/）\n├── 进销存管理（gm_web_stock）\n│   ├── 入库（采购入库/净菜入库/其他入库/退货入库/称重入库）\n│   ├── 出库（销售出库/手动出库/调拨出库/其他出库）\n│   ├── 盘点（模板盘点/批量盘点/安全库存/保质期预警）\n│   ├── 移库/调拨（仓内移库/站点间调拨）\n│   ├── 加工（加工计划/加工单/领料/退料/产出入库）\n│   ├── 分割（分割配置/分割计划/分割单）\n│   ├── 结算（结款单/应付明细/付款执行）\n│   └── 库存调整（入库调整/出库调整/均价修复）\n├── 分拣管理（gm_web_sorting）\n│   ├── 分拣任务（按商品/按订单/预分拣）\n│   ├── 称重（PDA/PC）\n│   ├── 拣货（按订单/按商品）\n│   └── 装箱（箱模板/装车验货）\n└── 配送管理（gm_web_sorting）\n    ├── 配送任务（配送单/打印/同步）\n    ├── 司机App（配送/验货/周转物/自定义字段）\n    ├── 司机绩效（轨迹/状态/定位/回放/温湿度）\n    └── 路线管理\n```\n\n---"
    },
    {
     "heading": "3. 采购管理",
     "content": "### 3.1 核心实体\n\n| 实体 | 存储 | 说明 |\n|------|------|------|\n| **采购任务** (PurchaseTask) | MySQL `tbl_purchase_task` (按年分表) | 基于订单汇总生成的采购需求 |\n| **采购单** (PurchaseSheet) | MongoDB `purchase_sheet` | 向供应商发出的采购订单 |\n| **采购SKU明细** | MongoDB `purchase_sku_log` | 采购单中的SKU明细 |\n| **询价单** (QuotePrice) | MongoDB `supplier_cycle_quote` | 供应商周期报价 |\n| **采购规格** (PurchaseSpec) | MongoDB (gm_server_merchandise) | SKU的采购维度属性 |\n\n### 3.2 采购流程\n\n```\n订单汇总 → 生成采购任务 → 选择供应商 → 创建采购单 → 供应商确认 → 到货入库\n                │                         │                    │\n                ├── 询价/比价             │                    │\n                └── 同步订单/工单数据      └── 发布采购任务     └── 称重入库\n```\n\n### 3.3 采购单状态（PurchaseSheetStatus）\n\n| 值 | 常量 | 说明 |\n|----|------|------|\n| -1 | Deleted | 已删除 |\n| 2 | Submitted | 已提交 |\n| 3 | Edit | 编辑中 |\n\n### 3.4 服务模块（gm_web_stock）\n\n| 模块 | URL前缀 | 核心能力 |\n|------|---------|---------|\n| purchase_task | `/purchase/task/` | 采购任务搜索、发布、导入导出、同步订单/工单数据 |\n| purchase_spec | `/purchase/purchase_spec/` | 采购规格参考价 |\n| purchase_analyse | `/purchase/analyse/` | 采购分析报表（按下单/收货时间、采购员/供应商考核） |\n| quote_price | `/purchase/quote_price/` | 站点报价导入/编辑、供应商周期报价 |\n\n---"
    },
    {
     "heading": "4. 进销存管理",
     "content": "### 4.1 核心实体\n\n| 实体 | 存储 | 说明 |\n|------|------|------|\n| **库存** (Stock) | MongoDB `stock_new` | SPU 维度库存主表 |\n| **批次库存** (BatchStock) | MongoDB `batch_stock` | 批次维度库存，支持先进先出 |\n| **入库日志** (InStockLog) | MongoDB `in_stock_log` | 入库明细记录 |\n| **出库单** (OutStockSheet) | MongoDB `out_stock_sheet` | 出库单表 |\n| **出库日志** (OutStockLog) | MongoDB `out_stock_log` | 出库明细记录 |\n| **结款单** (SettleSheet) | MongoDB `settle_sheet` | 供应商结款单 |\n| **移库单** (InnerTransferSheet) | MySQL `tbl_inner_transfer_sheet` | 仓内移库 |\n| **调拨单** | MySQL (transfer_models) | 站点间调拨出入库 |\n| **加工单** | MySQL (process_models) | 加工计划/加工单 |\n| **分割单** (SplitSheet) | MySQL `tbl_split_sheet` | 商品分割单 |\n| **库存调整单** | MySQL `in/out_stock_adjust_sheet` | 入库/出库调整 |\n| **要货单** | MySQL `require_goods_sheet` | 门店要货 |\n| **货位** (Shelf) | MongoDB `shelf_spu_details` | 仓库货位管理 |\n| **货值** (StockValue) | MongoDB `stock_value_{group_id}` | 按站点分表的货值成本 |\n\n### 4.2 单据状态枚举\n\n#### 采购入库单状态（StockSheetStatus）\n\n| 值 | 常量 | 说明 | 流转 |\n|----|------|------|------|\n| -1 | Deleted | 已删除 | - |\n| 0 | AuditNoPass | 审核不通过 | ← 待审核 |\n| 1 | BeforeSubmit | 待提交 | 初始状态 |\n| 2 | BeforeAudit | 待审核 | ← 待提交 |\n| 3 | AuditPass | 审核通过(待结款) | ← 待审核 |\n| 4 | Paid | 已结款 | ← 审核通过 |\n\n> 流转：`(1)待提交 → (2)待审核 → (3)审核通过 → (4)已结款`\n\n#### 销售出库单状态（OutStockSheetStatus）\n\n| 值 | 常量 | 说明 |\n|----|------|------|\n| 1 | BeforeSubmit | 未出库 |\n| 2 | Submited | 已出库 |\n| 3 | Deleted | 已删除 |\n\n> 流转：`(1)未出库 → (2)已出库`\n\n#### 供应商结款单状态（SettleSheetStatus）\n\n| 值 | 常量 | 说明 |\n|----|------|------|\n| -1 | Deleted | 已删除 |\n| 0 | AuditNoPass | 审核不通过 |\n| 1 | BeforeSubmit | 待提交 |\n| 2 | BeforeAudit | 待审核 |\n| 3 | PartPay | 部分结款 |\n| 4 | Paid | 已支付 |\n\n> 流转：`(1)待提交 → (2)待审核 → (3)部分结款 → (4)已支付`\n\n### 4.3 入库类型（StockSheetType）\n\n| 值 | 常量 | 说明 |\n|----|------|------|\n| 1 | PURCHASE_IN | 采购入库（最常见） |\n| 2 | REFUND_OUT | 采购退货出库 |\n| 3 | REFUND_IN | 销售退货入库 |\n| 4 | PRODUCT_IN_STOCK | 净菜成品入库 |\n\n### 4.4 库存操作类型（StockOperate）\n\n| 值 | 常量 | 说明 |\n|----|------|------|\n| 1 | StockIn | 入库 |\n| 2 | StockInReviewFail | 入库审核不通过 |\n| 3 | StockInCancel | 入库冲销 |\n| 4 | StockOut | 出库 |\n| 5 | StockOutCancel | 出库冲销 |\n| 6 | StockLoss | 报损 |\n| 7 | StockIncrease | 报溢 |\n| 8 | SupplyReturnStock | 原料退货出库 |\n| 17 | SaleReturnStockIn | 商品退货入库 |\n| 18 | StockAvgPriceRepair | 库存均价修复 |\n| 20 | StockInnerTransferOut | 仓内移库移出 |\n| 21 | StockInnerTransferIn | 仓内移库移入 |\n| 25 | SplitInStock | 分割单入库 |\n| 26 | SplitOutStock | 分割出库 |\n| 33 | InStockAdjust | 入库调整 |\n| 35 | TransferOutBound | 调拨出库 |\n| 36 | TransferInBound | 调拨入库 |\n| 38 | OtherInStock | 其他入库 |\n| 40 | OtherOutStock | 其他出库 |\n\n### 4.5 库存流转\n\n```\n采购入库(1) ──→ 在库(stock_new/batch_stock) ──→ 销售出库(4)\n  ↑                      │                         │\n  │                 盘点调整(报损6/报溢7)            ▼\n  │                      │                    客户签收\n退货入库(17) ←── 加工分割(25/26)\n                         │\n                  仓内移库(20/21)\n                  站点调拨(35/36)\n                  其他入出(38/40)\n```\n\n### 4.6 服务模块（gm_web_stock）\n\n| 模块 | URL前缀 | 核心能力 |\n|------|---------|---------|\n| stock (入库) | `/stock/in_stock/`, `/stock/net_vegetable/` | 采购入库、净菜入库、模板导入、供应商确认、称重入库 |\n| stock (出库) | `/stock/out_stock/` | 销售出库、手动出库、出库冲销 |\n| stock (退货) | `/stock/return/`, `/stock/raw_material_return/` | 采购退货、原料退货 |\n| stock (报损报溢) | `/stock/stock_loss/`, `/stock/stock_increase/` | 报损/报溢记录 |\n| stock (盘点) | `/stock/inventory/` | 模板盘点、批量盘点、安全库存、保质期预警 |\n| stock (结算) | `/stock/settle/`, `/stock/settlement/` | 结款单、应付明细、付款执行、交易流水 |\n| stock (移库) | `/stock/inner_transfer/` | 仓内移库单CRUD |\n| stock (调整) | `/stock/adjust/` | 入库调整单/出库调整单 |\n| stock (要货) | `/stock/require_goods/` | 要货单CRUD |\n| stock (货值) | `/stock/stock_value/` | 货值成本查询 |\n| stock (查询) | `/stock/batch_stock/`, `/stock/stock_change/` | 批次查询、库存变动日志、汇总 |\n| process | `/stock/process/` | 加工计划/加工单/领料/退料/产出入库/损耗 |\n| split_spu | `/stock/split/` | 分割配置/计划/分割单/入出库/损耗统计 |\n| station_transfer | `/stock/station_transfer/` | 站点调拨出入库、流水、汇总 |\n| batch | `/stock/batch/` | 批次状态、食品安全查询 |\n| internal | `/stock/internal/` | 内部/第三方同步接口 |\n| bshop_stock | `/stock/bshop/` | B商城库存（商户货值、SPU库存、日志） |\n| weight_in_stock | `/stock/weight_in_stock/` | 称重入库（称重任务、入库单创建/合并） |\n\n### 4.7 数据存储特点\n\ngm_web_stock 同时使用 MongoDB 和 MySQL，**MongoDB 为主存储**：\n- 库存主表、批次、入出库日志 → MongoDB（inventory 数据库）\n- 采购单、采购明细 → MongoDB（purchase 数据库）\n- 结款单、货值 → MongoDB（inventory 数据库）\n- 移库/调拨/分割/加工/冻结/调整 → MySQL（inventory/process 数据库）\n- 采购任务 → MySQL（按年分表 `tbl_purchase_task_{year}`）\n\n**MongoDB 事务使用**：库存操作必须使用 MongoDB 事务 + Redis 锁（`StockLock`）保证一致性。\n\n---"
    },
    {
     "heading": "5. 分拣管理",
     "content": "### 5.1 核心实体\n\n| 实体 | 存储 | 说明 |\n|------|------|------|\n| **分拣任务** (SortingTask) | MySQL (sorting 库) | 按订单/按商品的分拣任务 |\n| **SKU分拣** (SkuSorting) | MySQL `sku_sorting` | SKU维度分拣数据 |\n| **称重记录** (WeightingData) | MySQL `weighting_data` | 称重数据 |\n| **订单分拣信息** | MySQL `order_sort_info` | 订单维度分拣状态 |\n| **拣货任务** (PickingTask) | - | 按订单/按商品的拣货任务 |\n| **装箱记录** (BoxRecord) | - | 包裹装箱信息 |\n| **箱模板** (BoxTemplate) | - | 箱规格模板 |\n| **周转物** (Turnover) | - | 周转箱/筐管理 |\n| **分拣员** (Sorter) | - | 分拣员信息与绩效 |\n\n### 5.2 分拣模式\n\n| 模式 | 说明 | 适用场景 |\n|------|------|---------|\n| **按商品分拣** | 先按SKU汇总，再分到各订单 | SKU种类少、订单多 |\n| **按订单分拣** | 按订单逐一拣货 | SKU种类多、订单少 |\n| **预分拣** | 提前生成分拣计划 | 大批量作业 |\n\n分拣号生成规则（`GenerateSortNumRule`）：按订单生成 vs 按线路生成\n\n### 5.3 分拣状态枚举\n\n订单分拣状态（`OrderSortStatus`）：未分拣 → 部分分拣 → 分拣完成\n\nPDA 分拣状态（`OrderPdaSortStatus`）：未分拣 → 分拣中 → 分拣完成\n\n装箱状态（`OrderBoxStatus`）：未装箱 → 已装箱\n\n### 5.4 分拣流程\n\n```\n订单审核(PREPARE=1) → 生成分拣任务 → 分拣（PDA/PC） → 称重 → 打印标签 → 装箱 → 装车验货\n                         │                │              │\n                         │                └── 缺货处理    └── 实收数回写订单\n                         │                                    (gm_server_order/weight)\n                         └── 预分拣\n```\n\n### 5.5 服务模块（gm_web_sorting）\n\n| 模块 | URL前缀 | 核心能力 |\n|------|---------|---------|\n| station | `/station/` | 分拣任务、配送任务、称重操作、运输管理、打包 |\n| weight | `/weight/` | SKU分拣（按商品/按订单）、预分拣、篮子管理、PDA操作、周转物 |\n| picking | `/picking/` | 拣货任务（按订单/按商品）、打印 |\n| box_app | `/box/` | 装箱、条码搜索、箱体管理（创建/入箱/出箱） |\n| box_template | `/box_template/` | 箱模板 CRUD |\n\n---"
    },
    {
     "heading": "6. 配送管理",
     "content": "### 6.1 核心实体\n\n| 实体 | 存储 | 说明 |\n|------|------|------|\n| **配送单** (DistributionOrder) | MySQL `distribution_order` | 配送任务单 |\n| **配送记录** (DeliveryRecord) | MySQL `delivery_record` | 配送明细 |\n| **司机** (Driver) | MySQL `drivers` | 司机信息 |\n| **司机会话** (DriverSession) | MySQL `driver_session` | 司机登录状态 |\n| **轨迹点** (TrackPoint) | MongoDB `driver_location` | GPS轨迹记录 |\n\n### 6.2 配送流程\n\n```\n分拣完成 → 生成配送单 → 分配司机 → 司机App接单 → 开始配送 → 送达签收\n                │           │                         │\n                │           └── 路线规划               ├── 异常处理(拒收/少货)\n                └── 打印配送单                         └── 装车验货\n```\n\n### 6.3 服务模块（gm_web_sorting）\n\n| 模块 | URL前缀 | 核心能力 |\n|------|---------|---------|\n| station | `/station/` | 配送任务分配、司机调度、路线任务 |\n| delivery | `/delivery/` | 配送单 CRUD、打印、同步、导出 |\n| driver_app | `/driver/` | 司机端：登录/首页/配送/验货/周转物/自定义字段 |\n| driver_performance | `/driver_performance/` | 司机绩效：配送状态同步/轨迹点/定位查询/温湿度/回放/报表 |\n\n### 6.4 司机App功能\n\n| 功能 | 说明 |\n|------|------|\n| 配送列表 | 查看当日配送任务 |\n| 开始配送 | 标记配送开始 |\n| 配送完成 | 标记送达、商户签收 |\n| 异常处理 | 拒收、少货等异常上报 |\n| 周转物借还 | 周转箱/筐的借出与归还 |\n| 轨迹上传 | GPS轨迹实时上传 |\n| 装车验货 | 验证装车商品完整性 |\n| 自定义字段 | 司机端自定义数据采集 |\n\n---"
    },
    {
     "heading": "7. 供应链全链路协同",
     "content": "### 7.1 端到端流程\n\n```\n订单 ──→ 采购任务 ──→ 采购下单 ──→ 到货入库 ──→ 分拣 ──→ 称重 ──→ 装箱 ──→ 配送 ──→ 签收\n │                                    │           │        │                      │\n │                                    ▼           ▼        ▼                      ▼\n │                              库存变动      实收数   打印标签              订单状态更新\n │                              (MongoDB)   (weight)  (sorting)            积分/结算\n └── 数据来源: gm_server_order\n      采购/进销存: gm_web_stock\n      分拣/配送: gm_web_sorting\n```\n\n### 7.2 跨服务数据流\n\n| 数据 | 来源 | 去向 | 传递方式 |\n|------|------|------|---------|\n| 订单明细 | gm_server_order | gm_web_sorting(分拣) | gm_rmiclient |\n| SKU信息 | gm_server_merchandise | gm_web_stock(采购) | gm_rmiclient |\n| 实收数量 | gm_web_sorting(称重) | gm_server_order(weight) | gm_rmiclient |\n| 库存数据 | gm_web_stock | gm_service(展示) | gm_rmiclient |\n| 配送状态 | gm_web_sorting(司机) | gm_server_order(状态) | gm_rmiclient |\n| 入出库汇总 | gm_web_stock | gm_web_stock(MQ异步) | gm_mqlib |\n\n---"
    },
    {
     "heading": "8. 数据存储",
     "content": "### 8.1 gm_web_stock MongoDB Collections\n\n| 数据库 | Collection | 说明 |\n|--------|-----------|------|\n| **inventory** | `stock_new` | 库存主表（SPU维度） |\n| **inventory** | `batch_stock` | 批次库存表 |\n| **inventory** | `batch_stock_history` | 历史0库存（每日迁移） |\n| **inventory** | `in_stock_log` | 入库明细日志 |\n| **inventory** | `in_stock_summary` | 入库汇总（MQ异步） |\n| **inventory** | `out_stock_sheet` | 出库单表 |\n| **inventory** | `out_stock_log` | 出库明细日志 |\n| **inventory** | `out_stock_summary` | 出库汇总（MQ异步） |\n| **inventory** | `out_batch_stock_flow` | 出库批次流水 |\n| **inventory** | `settle_sheet` | 供应商结款单 |\n| **inventory** | `settlement_sheet` | 结算单 |\n| **inventory** | `transaction_flow_sheet` | 交易流水单 |\n| **inventory** | `return_to_supply_log` | 退货入库日志 |\n| **inventory** | `stock_increase_log_new` | 报溢记录 |\n| **inventory** | `stock_loss_log_new` | 报损记录 |\n| **inventory** | `shelf_spu_details` | 货位SPU详情 |\n| **inventory** | `stock_value_{group_id}` | 货值成本表（按站点分表） |\n| **inventory** | `supplier_cycle_quote` | 供应商周期报价 |\n| **purchase** | `purchase_sheet` | 采购单表 |\n| **purchase** | `purchase_sku_log` | 采购SKU明细 |\n| **purchase** | `purchase_analyse_by_*` | 采购分析（按时间维度） |\n| **purchase** | `purchaser_assess_by_*` | 采购员考核 |\n| **purchase** | `supplier_assess_by_*` | 供应商考核 |\n| **delivery** | `driver_location` | 司机定位记录 |\n\n### 8.2 gm_web_stock MySQL 表\n\n| 表 | Model 类 | 说明 |\n|----|---------|------|\n| `tbl_inner_transfer_sheet` | TblInnerTransferSheet | 仓内移库单 |\n| `tbl_inner_transfer_sheet_detail` | TblInnerTransferSheetDetail | 移库明细 |\n| `in_stock_adjust_sheet` | InStockAdjustSheet | 入库调整单 |\n| `out_stock_adjust_sheet` | OutStockAdjustSheet | 出库调整单 |\n| `tbl_stock_change_log` | TblStockChangeLog | 库存变动日志 |\n| `tbl_stock_flow` | TblStockFlow | 库存流水 |\n| `tbl_stock_frozen` | TblStockFrozen | 冻结库存 |\n| `tbl_stock_frozen_amount` | TblStockFrozenAmount | 冻结金额 |\n| `tbl_purchase_task` | PurchaseTaskModel | 采购任务（按年分表） |\n| `tbl_split_config/plan/sheet` | SplitConfig/Plan/Sheet | 分割配置/计划/单 |\n\n### 8.3 gm_web_sorting MySQL 表\n\n| 表 | Model 类 | 说明 |\n|----|---------|------|\n| `sku_sorting` | SkuSorting | SKU分拣数据 |\n| `weighting_data` | WeightingData | 称重记录 |\n| `order_sort_info` | OrderSortInfo | 订单分拣状态 |\n| `distribution_order` | DistributionOrder | 配送单 |\n| `delivery_record` | DeliveryRecord | 配送记录 |\n| `drivers` | Driver | 司机信息 |\n| `driver_session` | DriverSession | 司机登录会话 |\n\n---"
    },
    {
     "heading": "9. 异步任务",
     "content": "### 9.1 gm_web_stock 异步任务（前缀 `stock.*`）\n\n| 任务 | 说明 |\n|------|------|\n| `stock.purchase_task` | 采购任务处理 |\n| `stock.batch_in_stock` | 批量入库 |\n| `stock.batch_out_stock` | 批量出库 |\n| `stock.batch_update_stock_info` | 批量更新库存 |\n| `stock.export_settlement_detail` | 结算明细导出 |\n| `stock.export_purchase_analyse` | 采购分析导出 |\n\n### 9.2 定时任务\n\n| 脚本 | 功能 |\n|------|------|\n| `stock_value_sync.py` | 货值成本同步 |\n| `fix_error_sheet.py` | 单据历史修复 |\n| `batch_stock_history` | 0库存批次迁移至历史表 |\n\n---"
    },
    {
     "heading": "10. 数据一致性与修复",
     "content": "进销存系统 MongoDB + MySQL 双存储，常见数据不一致场景和修复方案：\n\n| 问题 | 修复脚本 | 目录 |\n|------|---------|------|\n| 货值成本数据错误 | `stock_value_sync.py` | `crontab_tasks/` |\n| 入库汇总数据错误 | `fix_in_stock_summary.py` | `tmp/` |\n| 出库汇总数据错误 | `fix_out_stock_summary.py` | `tmp/` |\n| 应付明细和付款执行表错误 | `fix_settlement.py` | `regular/` |\n| 先进先出货位错误 | `view_shelf.py` | `regular/` |\n| 库存变动记录错误 | `fix_stock_by_change_log.py` | `regular/` |\n| 批次库存数和商品库存数不一致 | `fix_stock_by_batch_stock.py` | `regular/` |\n\n---\n\n**维护者**: GM架构团队\n**版本**: v2.0\n**最后更新**: 2026-03-23"
    }
   ]
  },
  {
   "id": ".claude--specs--business--商品领域.spec",
   "title": "商品领域业务规范",
   "category": "specs-business",
   "path": ".claude/specs/business/商品领域.spec.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 商品领域业务规范"
    },
    {
     "heading": "1. 领域概述",
     "content": "商品领域是演示公司平台的基础领域，管理从分类体系到最终可售卖的 SKU 的完整商品数据。核心服务为 `gm_server_merchandise`，被多个 View 层项目通过 `gm_rmiclient` 调用。\n\n---"
    },
    {
     "heading": "2. 分类体系",
     "content": "### 2.1 四级分类结构\n\n```\n一级分类 (Category1)\n  └── 二级分类 (Category2)\n        └── 品类 (Pinlei)\n              └── SPU (Standard Product Unit)\n                    └── SKU (Stock Keeping Unit)\n```\n\n| 层级 | 实体 | MongoDB Collection | 说明 | 示例 |\n|------|------|-------------------|------|------|\n| **一级分类** | Category1 | `category_level1` | 最粗粒度分类 | 蔬菜、水果、肉禽 |\n| **二级分类** | Category2 | `category_level2` | 细化分类 | 叶菜类、根茎类 |\n| **品类** | Pinlei | `pinlei` | 标准品类 | 白菜、萝卜 |\n| **SPU** | SPU | `spu_product` | 标准产品单元 | 大白菜 |\n| **SKU** | SKU | `sku_product_new` | 最小库存单位 | 大白菜/斤、大白菜/箱 |\n\n### 2.2 分类管理\n\n- 每个站点 (`group_id`) 拥有独立的分类树\n- 分类支持图标 (`CategoryIcon`，存于 `icon` collection)\n- 分类支持拼音搜索（`pinyin` 模块，懒加载 + slug 生成）\n- **云商品库** (`merchandise_template`)：平台级模板分类，站点可从模板导入\n- 模板分类存储在独立的 MongoDB database，与站点数据隔离\n\n### 2.3 分类图标类型\n\n定义于 `gm_server_merchandise` 的 `category/values.py`：\n\n| IconType | 说明 |\n|----------|------|\n| CATEGORY1 | 一级分类图标 |\n| CATEGORY2 | 二级分类图标 |\n| PINLEI | 品类图标 |\n| SPU | SPU 图标 |\n\n---"
    },
    {
     "heading": "3. 核心业务实体",
     "content": "### 3.1 SPU（标准产品单元）\n\nSPU 代表一类商品，定义商品的基本属性：\n- 所属分类链路（Category1 → Category2 → Pinlei）\n- 商品名称、描述、图片\n- 计量单位（std_unit_name）\n- 生产地\n- 拼音/首字母（pinyin / pinyin_initial）\n- 关联采购规格\n\n### 3.2 SKU（最小库存单位）\n\nSKU 是实际可交易的最小单位：\n- 关联 SPU\n- 销售规格（sale_unit_name，如：斤、箱、包）\n- 价格信息（sale_price, std_sale_price）\n- 库存信息（stock, is_stock_up）\n- 采购规格关联\n- 快照（`sku_product_snapshot_new` collection），支持价格变动追踪\n\nSKU 状态枚举（`SkuState`）：\n\n| 值 | 状态 |\n|----|------|\n| 0 | 删除 |\n| 1 | 正常/在售 |\n| 2 | 下架/停售 |\n| 3 | 临时删除（回收站） |\n\n### 3.3 报价单（Salemenu）\n\n报价单是 SKU 对特定客户群的**可见性和定价**容器：\n- 一个站点可有多个报价单\n- 商户通过关联的报价单看到可下单的 SKU\n- 报价单决定 SKU 的售价\n- 支持合同价覆盖\n- 报价单管理在 `gm_service/website/salemenu/`，支持周期定价、标签管理\n\n报价单类型（`SalemenuType`，定义于 `gm_service/common/global_val.py`）：\n\n| 值 | 类型 |\n|----|------|\n| 1 | 普通报价单 |\n| 2 | 公共报价单（团购商城等特殊场景） |\n\n### 3.4 组合商品（Combine Goods）\n\n多个 SKU 组合成一个售卖单位（MongoDB `combine_goods` collection）：\n- 定义组合内容（SKU + 数量）\n- 组合价格\n- 关联菜谱\n\n组合商品状态（`CombineGoodsStatus`）：\n\n| 值 | 状态 |\n|----|------|\n| 0 | 删除 |\n| 1 | 正常 |\n| 2 | 临时删除（回收站） |\n\n### 3.5 菜谱（Cookbook）\n\n菜品配方定义（MongoDB `cookbook` collection）：\n- 菜品名称\n- 原料清单（SKU + 用量）\n- 关联组合商品\n\n菜谱状态（`CookBookStatus`）：\n\n| 值 | 状态 |\n|----|------|\n| 0 | 删除 |\n| 1 | 正常 |\n| 2 | 临时删除（回收站） |\n\n### 3.6 采购规格（Purchase Specification）\n\n定义 SKU 的采购维度属性（MongoDB `purchase_specification` collection）：\n- 采购单位（可能与销售单位不同）\n- 采购换算比例\n- 供应商关联\n- 采购价格\n- 支持批量写入和回收站\n\n### 3.7 赠品 SKU（Reward SKU）\n\n赠品库存管理（MySQL `tbl_reward_sku` 表）：\n- 赠品类型关联\n- 库存数量管理\n- 用于积分兑换、满赠等营销场景\n\n### 3.8 新品需求（New Merchandise Demand）\n\n商户提交新品需求（MongoDB `new_merchandise_demand` collection）：\n- 需求创建、查询、分页\n- 运营审核后转为 SPU/SKU\n\n---"
    },
    {
     "heading": "4. 服务拓扑",
     "content": "### 4.1 主服务：gm_server_merchandise\n\n| 模块 | API前缀 | 核心能力 |\n|------|---------|---------|\n| category | `v1/category1/`, `v1/category2/`, `v1/pinlei/`, `v1/spu/` | 一级/二级分类、品类、SPU 的 CRUD，tree/branch 查询 |\n| product | `v1/product/sku/` | SKU 创建/更新/删除/批量写入、快照、统计 |\n| combine_goods | `v1/combine_goods/` | 组合商品 CRUD、列表、分页 |\n| cookbook | `v1/cookbook/` | 菜谱 CRUD、列表、合并删除 |\n| purchase_specification | `v1/purchase_spec/` | 采购规格 CRUD、批量写入、回收/删除 |\n| merchandise_template | `v1/template/` | 云商品库模板（分类、品类、SPU） |\n| reward_sku | `v1/reward_sku/` | 赠品 SKU 库存管理 |\n| pinyin | `v1/pinyin/` | 拼音/slug 生成（懒加载） |\n| new_merchandise_demand | `v1/new_merchandise_demand/` | 新品需求列表/分页/创建 |\n| icon | `v1/icon/` | 分类图标管理 |\n\n### 4.2 RPC 客户端（gm_rmiclient）\n\n调用 gm_server_merchandise 的客户端类及核心方法：\n\n| Client 类 | 核心方法 |\n|-----------|---------|\n| `Category1Service` | `get`, `find`, `create`, `update`, `delete`, `get_tree` |\n| `Category2Service` | `get`, `find`, `create`, `update`, `delete` |\n| `PinleiService` | `get`, `find`, `create`, `update`, `delete` |\n| `SpuService` | `get`, `find`, `create`, `update`, `delete`, `import_by_template` |\n| `MerchandiseService` | `search`, `batch_update` |\n| `SkuProductService` | `get`, `find`, `create`, `update`, `delete`, `batch_write`, `count_by_filter` |\n| `SkuSnapshotService` | `get`, `find`, `create` |\n| `CombineGoodsService` | `get`, `find`, `create`, `update`, `delete`, `list`, `page` |\n| `CookbookService` | `get`, `find`, `create`, `update`, `delete`, `list`, `combined_deletions` |\n| `PurchaseSpecService` | `get`, `find`, `create`, `update`, `delete`, `batch_write`, `recover_many`, `delete_many` |\n| `PinyinService` | `lazy_load`, `slug` |\n| `TemplateCategory1Service` | `get_tree` |\n| `TemplateSpuService` | `find` |\n\n### 4.3 消费方\n\n| 项目 | 使用场景 |\n|------|---------|\n| **gm_service** | 站点端商品展示、报价单管理、SKU智能定价、批量操作 |\n| **gm_server_bshop** | B端商城商品展示、分类浏览、购物车商品信息 |\n| **gm_web_stock** | 采购规格关联、入库商品选择、库存与SKU映射 |\n| **gm_management** | 商品管理后台、云商品模板管理 |\n| **gm_open** | OpenAPI 商品查询接口（product 模块） |\n| **gm_admin** | 云商品库模板分类管理 |\n\n---"
    },
    {
     "heading": "5. 关键业务流程",
     "content": "### 5.1 商品建档流程\n\n```\n创建分类体系 → 创建SPU → 创建SKU → 关联报价单 → 商户可见\n     │             │          │           │\n  Category1     Pinlei      Product    Salemenu\n  Category2      SPU                  (gm_service)\n  (gm_server_merchandise)\n```\n\n### 5.2 云商品库导入流程\n\n```\ngm_admin 维护模板分类 → 站点选择模板 → 导入到站点分类树 → 创建SKU → 上架报价单\n  (merchandise_template)              (SpuService.import_by_template)\n```\n\n### 5.3 新品需求流程\n\n```\n商户提交新品需求 → 站点运营审核 → 创建SPU/SKU → 上架报价单\n (gm_server_bshop)  (gm_service)  (gm_server_merchandise)\n```\n\n### 5.4 报价单管理流程\n\n```\n创建报价单 → 添加SKU到报价单 → 设置售价 → 关联商户 → 商户可见\n     │            │               │           │\n  Salemenu    Salemenu SKU    价格规则      Customer\n                              周期定价    (gm_server_account)\n                            (gm_service)\n```\n\n### 5.5 SKU 回收站流程\n\n```\nSKU 删除 → 进入回收站(状态=3) → 可恢复(状态=1) 或 彻底删除(状态=0)\n                                     │\n                              同理适用于组合商品、菜谱\n```\n\n---"
    },
    {
     "heading": "6. 数据存储",
     "content": "### 6.1 MongoDB Collections（gm_server_merchandise）\n\n| Collection | 说明 | 关键字段 |\n|-----------|------|---------|\n| `category_level1` | 一级分类 | group_id, name, rank, icon |\n| `category_level2` | 二级分类 | group_id, upstream_id, name, rank |\n| `pinlei` | 品类 | group_id, upstream_id, name |\n| `spu_product` | SPU | group_id, category1_id, category2_id, pinlei_id, name, std_unit_name |\n| `sku_product_new` | SKU | group_id, spu_id, sale_unit_name, sale_price, state |\n| `sku_product_snapshot_new` | SKU快照 | sku_id, snapshot_time, sale_price |\n| `combine_goods` | 组合商品 | group_id, name, skus, status |\n| `cookbook` | 菜谱 | group_id, name, materials, status |\n| `purchase_specification` | 采购规格 | group_id, sku_id, purchase_unit, ratio |\n| `new_merchandise_demand` | 新品需求 | group_id, customer_id, demand_name, status |\n| `icon` | 分类图标 | type, url |\n| `system_key_generator` | 系统键生成器 | key, current_value |\n\n### 6.2 MySQL 表（gm_server_merchandise）\n\n| 表 | 说明 |\n|----|------|\n| `tbl_reward_sku` | 赠品SKU库存（reward_sku 模块） |\n\n### 6.3 模板数据库\n\n独立 MongoDB database，包含 `category_level1`, `category_level2`, `pinlei`, `spu_product` 的模板版本，供站点导入使用。\n\n---"
    },
    {
     "heading": "7. 与其他领域的交互",
     "content": "| 交互领域 | 交互方式 | 说明 |\n|---------|---------|------|\n| **订单领域** | SKU → OrderDetail | 订单明细引用 SKU 信息（价格、规格、快照） |\n| **供应链-采购** | SKU + 采购规格 → 采购任务 | 采购任务基于 SKU 的采购规格和订单需求生成 |\n| **供应链-进销存** | SPU → 库存主表 | 库存以 SPU 为主维度，入出库引用 SKU 计量 |\n| **供应链-分拣** | SKU → 分拣任务 | 分拣按 SKU 维度执行称重 |\n| **营销** | SKU → 优惠券/秒杀/会员价/定价规则 | 多种营销活动绑定 SKU |\n| **报价单** | SKU → Salemenu | SKU 通过报价单暴露给商户并定价 |\n| **开放平台** | SKU → OpenAPI | 对外暴露商品查询接口（product 模块） |\n| **B端商城** | SKU → 商品展示/购物车/下单 | 商户浏览和购买的最终商品单位 |\n\n---\n\n**维护者**: GM架构团队\n**版本**: v2.0\n**最后更新**: 2026-03-23"
    }
   ]
  },
  {
   "id": ".claude--specs--business--开放平台领域.spec",
   "title": "开放平台领域业务规范",
   "category": "specs-business",
   "path": ".claude/specs/business/开放平台领域.spec.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 开放平台领域业务规范"
    },
    {
     "heading": "1. 领域概述",
     "content": "开放平台领域提供演示公司系统的对外集成能力，包括标准 OpenAPI、第三方 ERP 系统对接、政府监管溯源平台对接、以及营销互动消息转发。\n\n核心服务：\n- **gm_open**（Python, View 层）：OpenAPI + ERP/溯源对接\n- **marketing-interaction-layer**（Go, 基础设施）：MQ消费/转发 + HTTP API + cron 补偿\n\n---"
    },
    {
     "heading": "2. 平台架构",
     "content": "```\n外部系统\n├── ISV / 第三方开发者 ──→ OpenAPI (v1/api/)  ──→ gm_open\n├── 用友 ERP ──────────→ 用友对接 (yongyou/) ──→ gm_open\n├── 金蝶K3 ERP ────────→ 金蝶对接 (kingdeeK3/) → gm_open\n├── 银豹 POS ──────────→ 银豹对接 (pospal/) ──→ gm_open\n├── 华住平台 ──────────→ 华住对接 (hz/) ──────→ gm_open + marketing-interaction-layer\n├── WDT/WMS ──────────→ WDT回调 ────────────→ marketing-interaction-layer\n├── OMS ───────────────→ OMS接口 ────────────→ marketing-interaction-layer\n└── 政府监管\n    ├── 深圳市场监管 ───→ szscgl/             → gm_open\n    ├── 重庆溯源 ───────→ chongqing_trace/    → gm_open\n    ├── 浙江食品链 ─────→ zhejiang_food_chain/ → gm_open\n    └── 苏州溯源 ───────→ suzhou_trace/       → gm_open\n```\n\n---"
    },
    {
     "heading": "3. OpenAPI 标准接口（gm_open）",
     "content": "### 3.1 认证方式\n\n- **JWT 认证**：App 申请 → 获取 AccessToken → 携带 Token 调用\n- Token 有效期管理\n- 站点 App 绑定（gm_admin 管理）\n- 认证模块路由：`v1/api/auth/`\n\n### 3.2 接口模块（12 个）\n\n| 模块 | API前缀 | 核心能力 |\n|------|---------|---------|\n| auth | `v1/api/auth/` | 应用认证、AccessToken 获取/刷新 |\n| product | `v1/api/product/` | 商品查询（报价单/分类/SPU/SKU） |\n| customer | `v1/api/customer/` | 客户/商户 CRUD |\n| order | `v1/api/order/` | 订单创建/删除/修改/明细/异常/退货查询 |\n| delivery | `v1/api/delivery/` | 配送信息查询 |\n| finance | `v1/api/finance/` | 财务数据查询 |\n| stock | `v1/api/stock/` | 库存查询 |\n| msg | `v1/api/msg/` | 消息通知推送 |\n| purchase | `v1/api/purchase/` | 采购数据查询 |\n| trace | `v1/api/trace/` | 溯源信息 |\n| image | `v1/api/image/` | 图片上传 |\n| account | `v1/api/account/` | 账户信息 |\n| orderagent | `v1/api/orderagent/` | 智能录单 |\n\n### 3.3 API 文档\n\n使用 apidoc 生成 API 文档：\n- 文档源码：`apidoc_source/`\n- 文档模板：`apidoc_template/`\n- 配置：`apidoc.json`\n\n---"
    },
    {
     "heading": "4. ERP 对接",
     "content": "### 4.1 用友 ERP\n\n| 模块 | 路由前缀 | 功能 |\n|------|---------|------|\n| yongyou | `open/yongyou/` | OAuth 授权、消息通知、数据同步 |\n\n对接内容：\n- **OAuth 流程**：用友授权 → 回调 → Token 管理\n- **消息通知**：用友 → 演示公司 的事件回调\n- **数据同步**：商品、订单、库存、财务双向同步\n- 与庖丁系统的集成接口\n\n### 4.2 金蝶 K3\n\n| 模块 | 路由前缀 | 功能 |\n|------|---------|------|\n| kingdeeK3 | `kingdeeK3/` | 授权认证、消息通知 |\n\n同步内容：商品、订单、财务凭证\n\n### 4.3 银豹 POS\n\n| 模块 | 路由前缀 | 功能 |\n|------|---------|------|\n| pospal | `pospal/` | 银豹 POS 数据对接 |\n\n同步内容：商品、订单\n\n---"
    },
    {
     "heading": "5. 溯源平台对接",
     "content": "### 5.1 概述\n\n对接各地政府监管部门的食品安全溯源平台，实现食品从源头到终端的全链路追溯。数据主要从 gm_web_stock（入库/出库/批次）获取。\n\n### 5.2 对接平台\n\n| 平台 | 路由前缀 | 主要功能 |\n|------|---------|---------|\n| **深圳市场监管** | `szscgl/` | 食品安全信息上报 |\n| **重庆溯源** | `chongqing_trace/` | 授权对接、消息通知 |\n| **浙江食品链** | `zhejiang_food_chain/` | 食品链溯源数据同步 |\n| **苏州溯源** | `suzhou_trace/` | 溯源数据上报 |\n\n### 5.3 华住平台\n\n| 路由前缀 | 功能 |\n|---------|------|\n| `hz_trade_platform/` | 授权/解绑/设置/商品同步/订单同步 |\n\n华住平台由 gm_open 和 marketing-interaction-layer 共同服务。\n\n---"
    },
    {
     "heading": "6. 营销互动层（marketing-interaction-layer）",
     "content": "### 6.1 概述\n\nGo 语言编写的微服务，基于 Gin + RabbitMQ + MySQL + Redis，充当**履约域与外部销售平台之间的事件驱动中间层**。\n\n### 6.2 核心功能\n\n| 功能维度 | 说明 |\n|---------|------|\n| **HTTP API** | 对内/对外 HTTP 接口（应用/站点/商品/客户/订单/通知配置） |\n| **MQ 消费** | 消费履约域 RabbitMQ 消息，过滤/转发至外部销售平台 |\n| **MQ 转发** | 基于配置规则将消息发送到外部系统（HTTP 回调/MQ 推送） |\n| **Cron 任务** | 失败重试补偿、定时订单推送 |\n\n### 6.3 支持的外部平台\n\n| 平台 | 对接方式 |\n|------|---------|\n| 华住 (HZ) | HTTP API + MQ消费 |\n| WDT/WMS | HTTP 回调（`wdt_wms_callback`） |\n| OMS | 订单推送 |\n| 自定义平台 | 通过通知配置灵活对接 |\n\n### 6.4 多进程架构\n\nmarketing-interaction-layer 通过多个 Dockerfile 按进程拆分部署：\n- `web`：HTTP API 服务\n- `consumer-*`：各类 MQ 消费者进程\n- `cron`：定时任务进程\n\n---"
    },
    {
     "heading": "7. 数据流向",
     "content": "### 7.1 数据导出（演示公司 → 外部）\n\n| 数据 | 来源服务 | 流出方式 | 说明 |\n|------|---------|---------|------|\n| 商品数据 | gm_server_merchandise | OpenAPI / ERP同步 | 分类、SPU/SKU |\n| 订单数据 | gm_server_order | OpenAPI / ERP同步 / MQ事件 | 订单、明细、状态变更 |\n| 库存数据 | gm_web_stock | OpenAPI | 库存余量 |\n| 客户数据 | gm_server_account | OpenAPI / ERP同步 | 商户信息 |\n| 配送数据 | gm_web_sorting | OpenAPI | 配送状态 |\n| 财务数据 | gm_management | OpenAPI | 结算信息 |\n| 溯源数据 | gm_web_stock | 溯源平台 | 批次/入出库信息 |\n| 状态变更事件 | 各服务 | marketing-interaction-layer (MQ) | 订单/商品/客户变更通知 |\n\n### 7.2 数据导入（外部 → 演示公司）\n\n| 数据 | 来源 | 去向服务 | 说明 |\n|------|------|---------|------|\n| 订单创建 | ISV/ERP/HZ/OMS | gm_server_order | 第三方系统下单 |\n| 商品同步 | ERP | gm_server_merchandise | ERP 商品导入 |\n| 客户同步 | ERP | gm_server_account | ERP 客户导入 |\n| WDT/WMS 回调 | WDT | marketing-interaction-layer | 仓储管理回调 |\n\n---"
    },
    {
     "heading": "8. 技术特点",
     "content": "| 维度 | gm_open (Python) | marketing-interaction-layer (Go) |\n|------|-----------------|--------------------------------|\n| **框架** | Django 4.1 + Gunicorn | Gin |\n| **认证** | JWT (PyJWT) | 内部认证 |\n| **数据库** | MySQL (management/stock/order) + TDSQL | MySQL + Redis |\n| **消息队列** | gm_mqlib (Kombu) | RabbitMQ (amqp091-go) |\n| **内部调用** | gm_rmiclient + gm_order_logic | HTTP 调用内部服务 |\n| **API 文档** | apidoc | - |\n| **部署** | Docker + K8s (单进程) | Docker + K8s (多进程拆分) |\n\n---"
    },
    {
     "heading": "9. gm_admin 中的开放平台管理",
     "content": "| 功能 | 说明 |\n|------|------|\n| 站点 Open 应用 | 管理站点关联的开放平台应用 |\n| 站点密钥 | API 认证密钥管理 |\n| 站点支付信息 | 站点级支付渠道配置 |\n\n---"
    },
    {
     "heading": "10. 与其他领域的交互",
     "content": "| 交互领域 | 方向 | 说明 |\n|---------|------|------|\n| **商品领域** | 开放 → 商品 | 商品查询/同步（OpenAPI product 模块） |\n| **订单领域** | 开放 ↔ 订单 | 订单创建/查询/异常/退货（双向） |\n| **供应链** | 开放 → 供应链 | 库存/采购/配送数据查询 |\n| **用户权限** | 开放 → 权限 | App认证、客户信息查询/同步 |\n| **财务** | 开放 → 财务 | 财务数据查询 |\n| **溯源** | 开放 → 溯源平台 | 食品安全数据上报 |\n| **营销互动** | MQ → 外部平台 | 业务事件消费/过滤/转发 |\n\n---\n\n**维护者**: GM架构团队\n**版本**: v2.0\n**最后更新**: 2026-03-23"
    }
   ]
  },
  {
   "id": ".claude--specs--business--用户权限领域.spec",
   "title": "用户权限领域业务规范",
   "category": "specs-business",
   "path": ".claude/specs/business/用户权限领域.spec.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 用户权限领域业务规范"
    },
    {
     "heading": "1. 领域概述",
     "content": "用户权限领域管理演示公司平台的多租户隔离、用户体系、角色权限和商户管理。核心服务为 `gm_server_account`（Server 层），管理后台为 `gm_management`（View 层），平台管理为 `gm_admin`（View 层）。\n\n---"
    },
    {
     "heading": "2. 多租户架构",
     "content": "### 2.1 租户层级\n\n```\nPartner（加盟商/MA）\n  └── Station（站点）── group_id 标识\n        ├── User（运营用户）── AuthUser\n        ├── Customer（商户）── BshopUser + BshopUserExtends\n        └── Address（配送地址）── Address + AddressExtends\n```\n\n| 层级 | 实体 | 数据表 | 说明 |\n|------|------|--------|------|\n| **Partner/MA** | 合作伙伴 | `TblPartner` | 最高层级，管理多个站点 |\n| **Station** | 站点 | `StationUser` | 业务运营单元，以 `group_id` 标识 |\n| **User** | 运营用户 | `AuthUser` | 站点内的运营人员（可登录管理系统） |\n| **Customer** | 商户 | `BshopUser` + `BshopUserExtends` | 站点的下游客户（通过B端商城下单） |\n\n### 2.2 数据隔离\n\n- 所有业务数据以 `group_id` 隔离\n- HTTP 请求通过 Cookie 携带 `group_id`\n- View 层在 `request.group_id` 获取当前站点ID\n- 数据库查询必须带 `group_id` 过滤条件\n- Django ORM 模型内置 `GroupIDManager`，`objects.filter()` 自动注入 `group_id`\n- `_do_update()` 禁止更新 `group_id` 字段\n\n---"
    },
    {
     "heading": "3. 核心业务实体与数据模型",
     "content": "### 3.1 Station 维度数据模型\n\n定义于 `gm_server_account/common/db/mysql/models/station.py`：\n\n| 模型 | 表名 | 说明 |\n|------|------|------|\n| `StationUser` | - | 站点用户关联 |\n| `AuthUser` | - | 站点运营用户（username, password, email, is_active 等） |\n| `AuthRole` | - | 站点角色（name, group_id, role_type 等） |\n| `AuthPermission` | - | 站点权限（name, codename, permission_class_id 等） |\n| `TblPermissionClass` | - | 权限分类（两级结构：name + parent_id） |\n| `AuthRolePermission` | - | 角色-权限关联 |\n| `AuthUserRole` | - | 用户-角色关联 |\n| `AuthUserUserPermission` | - | 用户直接权限关联 |\n| `TblStationPermission` | - | 站点级权限激活（station_id + permission_id） |\n\n### 3.2 MA/Partner 维度数据模型\n\n定义于 `gm_server_account/common/db/mysql/models/management.py`：\n\n| 模型 | 说明 |\n|------|------|\n| `TblPartner` | 加盟商/合作伙伴（name, logo, domain, group_ids 等） |\n| `TblPermission` | MA级权限（name, codename, permission_class_id） |\n| `TblPermissionClass` | MA级权限分类（两级结构） |\n| `TblRole` | MA级角色（name, partner_id, role_type） |\n| `TblRolePermission` | 角色-权限关联 |\n| `TblPartnerPermission` | 加盟商-权限关联 |\n| `TblEmployee` | MA员工（name, username, phone, email, is_active, type） |\n| `TblEmployeeRole` | 员工-角色关联 |\n| `TblRegion` | 区域管理 |\n| `TblEmployeeRegion` | 员工-区域关联 |\n\n### 3.3 Customer 维度数据模型\n\n定义于 `gm_server_account/common/db/mysql/models/customer.py`：\n\n| 模型 | 说明 |\n|------|------|\n| `BshopUser` | B端商户主表（username, phone, group_id 等） |\n| `BshopUserExtends` | 商户扩展信息（customer_name, balance, settle_way, salemenu_ids 等） |\n| `Address` | 配送地址主表（name, address, lat, lng 等） |\n| `AddressExtends` | 地址扩展信息（route_id, receive_way, service_time 等） |\n| `AddressSalemenu` | 地址-报价单关联 |\n| `UserPayMethod` | 商户支付方式 |\n| `UserCreditLimit` | 商户信用额度 |\n| `AddressLabelRelation` | 地址标签关联 |\n\n> **注意**：Customer 实体使用 `BshopUser` + `BshopUserExtends` 双表设计，与站点运营用户 `AuthUser` 完全分离。`group_id` 是关键隔离字段。\n\n---"
    },
    {
     "heading": "4. 权限模型",
     "content": "### 4.1 站点维度权限（Station）\n\n```\nStation(group_id)\n  → TblStationPermission（站点级权限激活）\n  → AuthUser（站点用户）\n       → AuthUserRole → AuthRole → AuthRolePermission → AuthPermission\n       → AuthUserUserPermission → AuthPermission（用户直接权限）\n```\n\n- 一个 User 可关联多个 Role\n- 一个 Role 包含多个 Permission\n- Permission 按 `TblPermissionClass` 两级分类（parent_id 指向父分类）\n- 支持用户直接权限（绕过角色直接关联权限）\n- 站点级权限激活：`TblStationPermission` 控制某站点开启/关闭特定权限\n\n角色类型（`RoleType`）：通用角色 vs 可见站点角色\n\n### 4.2 MA维度权限（Partner/MA）\n\n```\nPartner(TblPartner)\n  → TblPartnerPermission（加盟商级权限激活）\n  → TblEmployee（MA员工）\n       → TblEmployeeRole → TblRole → TblRolePermission → TblPermission\n```\n\nMA 员工类型（`MaEmployeeType`）：区分不同级别的管理员。\n\n### 4.3 权限校验方式\n\n在 gm_service 中的权限控制：\n\n| 方式 | 用途 | 代码位置 |\n|------|------|---------|\n| `CommonBaseView` | 需登录 + 权限（基础） | `website/station/views/common.py` |\n| `NoLoginView` | 不需要登录 | `website/station/views/common.py` |\n| `OpenBaseView` | 开放接口 | `website/station/views/common.py` |\n| `PermissionView` | 接口级权限装饰器 | `website/utils/views/base.py` |\n| `UserPermissionView` | 用户维度权限装饰器 | `website/utils/views/base.py` |\n| `protect_fields` | 字段级可见性控制 | `website/utils/views/base.py` |\n\n### 4.4 GraphQL 查询\n\n`gm_server_account` 使用 GraphQL（Graphene + graphene-sqlalchemy）提供查询接口：\n- 端点：`/station/graphql`\n- 用途：查询用户/角色/权限的关联数据，适合前端灵活组合查询\n- 实现：基于 SQLAlchemy 模型自动生成 GraphQL Schema\n\n---"
    },
    {
     "heading": "5. 服务拓扑",
     "content": "### 5.1 主服务：gm_server_account\n\n| 模块 | URL前缀 | 核心能力 |\n|------|---------|---------|\n| station | `/station/` | 站点用户/角色/权限 CRUD、GraphQL 查询、权限激活、批量角色调整、授权码 |\n| ma | `/ma/` | MA员工/角色/权限 CRUD、GraphQL 查询 |\n| auth | `/auth/` | 登录状态校验（check）、站点用户密码校验 |\n| customer | `/customer/` | 商户创建/更新/删除（BshopUser + BshopUserExtends） |\n\n**API形态**：GraphQL + REST 双接口\n- `/station/graphql` — GraphQL 查询（用户/角色/权限关联）\n- `/station/user/create` — REST 接口（写操作）\n- `/ma/graphql` — MA 级 GraphQL 查询\n\n### 5.2 RPC 客户端（gm_rmiclient）\n\n| Client 类 | 核心方法 |\n|-----------|---------|\n| `StAccountService` | `create_user`, `update_user`, `delete_user`, `create_role`, `update_role`, `permission_change_roles`, `get_auth_code`, `get_user_info` |\n| `MaAccountService` | `create_employee`, `update_employee`, `create_role`, `update_role` |\n| `CustomerService` | `create`, `update`, `delete`, `get` |\n\n### 5.3 消费方\n\n| 项目 | 使用场景 |\n|------|---------|\n| **gm_service** | 登录、权限校验、商户管理、用户信息 |\n| **gm_management** | 用户管理、角色配置、权限分配、商户运营 |\n| **gm_server_bshop** | 商户登录、注册、子账号、地址管理 |\n| **gm_web_stock** | 权限校验 |\n| **gm_web_sorting** | 权限校验 |\n| **gm_admin** | 加盟商管理、站点管理、站点权限配置 |\n\n---"
    },
    {
     "heading": "6. 商户管理",
     "content": "### 6.1 商户生命周期\n\n```\n注册/创建 → 审核 → 关联报价单 → 正常使用 → 停用/注销\n  │            │                    │\n  ├─ 站点创建   └── 邀请注册        ├── 商城下单 (gm_server_bshop)\n  └─ 商城注册                       ├── 支付\n                                    ├── 查看订单\n                                    └── 子账号管理\n```\n\n### 6.2 商户管理（gm_management）\n\n| 功能模块 | 说明 |\n|---------|------|\n| 商户档案 | 基本信息、联系方式、站点关联 |\n| 地址标签 | 配送地址分组和标签管理 |\n| 地址分群 | 按消费金额/频次/区域的分群规则 |\n| 对账单 | 商户维度的账单 |\n| 销售报表 | 商户维度的销售数据 |\n| 销售员关联 | 商户与销售人员的关联 |\n| 邀请注册 | 站点邀请商户注册 |\n\n### 6.3 商户结算方式（SettleWay）\n\n| 值 | 常量 | 说明 |\n|----|------|------|\n| 1 | GOODSFIRST | 先货后款（签收后结算） |\n| 2 | PAYFIRST | 先款后货（下单时支付） |\n\n### 6.4 商户B端商城功能（gm_server_bshop）\n\n| 模块 | 说明 |\n|------|------|\n| user/ | 注册/登录/商户信息/子账号/地址管理/协议 |\n| cart/ | 购物车CRUD、锁定、联动(地址/报价单/余额/赠品) |\n| order/ | 下单/改单/状态/自提/代金券/营养分析 |\n| pay/ | 支付发起/结果/扩展支付 |\n| coupon/ | 优惠券领取/使用 |\n| flash_sale/ | 秒杀活动/限购约束 |\n\n---"
    },
    {
     "heading": "7. 会员体系",
     "content": "### 7.1 gm_service 会员功能\n\n| 功能 | 说明 |\n|------|------|\n| 会员卡 | 会员卡管理、卡类型 |\n| SKU会员价 | SKU 级别的会员专属价格 |\n| 使用日志 | 会员卡使用记录 |\n\n### 7.2 gm_management 会员管理\n\n| 功能 | 说明 |\n|------|------|\n| 会员等级规则 | 定义等级条件（消费金额/频次） |\n| 等级设置 | 等级名称、权益 |\n| 升降级配置 | 自动升降级规则 |\n| 变动日志 | 等级变动记录 |\n\n---"
    },
    {
     "heading": "8. 认证与登录",
     "content": "### 8.1 站点端登录\n\n- Session-based 认证（Django Session）\n- 登录后 Cookie 携带 `group_id` 和 Session ID\n- `gm_server_account` 的 `/auth/check` 校验登录状态\n- 支持授权码（`get_auth_code`）\n\n### 8.2 B端商城登录\n\n- Session-based 认证\n- 支持第三方登录（微信公众号、小程序）\n- 支持邀请注册\n- 子账号体系（一个商户可有多个登录账号）\n\n### 8.3 开放平台认证\n\n- JWT (PyJWT) 认证\n- App + AccessToken 模式\n- 站点 App 绑定管理\n\n### 8.4 司机端登录\n\n- Session-based 认证\n- 司机通过 `gm_web_sorting/driver_app/` 登录\n- 独立的 `DriverSession` 表管理司机会话\n\n---"
    },
    {
     "heading": "9. 平台管理（gm_admin）",
     "content": "### 9.1 加盟商管理\n\n| 功能 | 说明 |\n|------|------|\n| Partner CRUD | 加盟商创建/更新/删除/搜索 |\n| 权限配置 | 加盟商级权限分配 |\n| 管理员管理 | 加盟商管理员CRUD |\n\n### 9.2 站点管理\n\n| 功能 | 说明 |\n|------|------|\n| 站点搜索 | 按条件搜索站点 |\n| 站点密钥 | 站点API密钥管理 |\n| 支付信息 | 站点支付渠道配置 |\n| 站点权限 | 站点级权限开通/关闭 |\n| 开放应用 | 站点关联的开放平台应用 |\n\n### 9.3 智能录单（Smart Order）\n\n| 功能 | 说明 |\n|------|------|\n| 租户订阅 | 智能录单功能订阅管理 |\n| 充值 | 额度充值（基础额度 + 赠送额度） |\n| 消费记录 | 按订单项 + Token 维度记录消费 |\n\n---"
    },
    {
     "heading": "10. 与其他领域的交互",
     "content": "| 交互领域 | 方向 | 说明 |\n|---------|------|------|\n| **订单领域** | 权限 → 订单 | 订单操作权限校验、商户身份校验 |\n| **商品领域** | 权限 ↔ 商品 | 报价单关联商户（通过 AddressSalemenu） |\n| **供应链** | 权限 → 供应链 | 采购/分拣/配送操作权限 |\n| **财务** | 权限 → 财务 | 结算权限、商户对账、余额管理 |\n| **开放平台** | 权限 → 开放 | API认证、站点App管理 |\n| **B端商城** | 权限 ↔ 商城 | 商户登录/注册、购物车/下单身份校验 |\n| **平台管理** | admin → 权限 | 加盟商/站点/权限的全局管理 |\n\n---\n\n**维护者**: GM架构团队\n**版本**: v2.0\n**最后更新**: 2026-03-23"
    }
   ]
  },
  {
   "id": ".claude--specs--business--订单领域.spec",
   "title": "订单领域业务规范",
   "category": "specs-business",
   "path": ".claude/specs/business/订单领域.spec.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 订单领域业务规范"
    },
    {
     "heading": "1. 领域概述",
     "content": "订单领域是演示公司平台的核心交易领域，管理订单全生命周期、支付、退款、积分、赠品等。核心 Server 层服务为 `gm_server_order`，多个 View 层项目通过 `gm_rmiclient` 调用。\n\n---"
    },
    {
     "heading": "2. 核心业务实体",
     "content": "### 2.1 订单（Order）\n\n订单主表 `TblOrder` 定义在 `gm_server_order/common/mysql/models/order_models.py`，为 `__abstract__ = True`（TDSQL 按年月分表 `tbl_order_{YYYYMM}`）。\n\n| 属性 | 类型 | 说明 |\n|------|------|------|\n| order_id | str | 订单编号 |\n| group_id | int | 站点ID（多租户隔离） |\n| customer_id | str | 商户ID |\n| station_id | str | 站点ID |\n| status | int | 订单状态（OrderStatus 枚举） |\n| pay_status | int | 支付状态（OrderPayStatus 枚举） |\n| order_price | GmDecimal | 下单金额 |\n| paid_amount | GmDecimal | 已支付金额 |\n| refund_amount | GmDecimal | 退款金额 |\n| freight | GmDecimal | 运费 |\n| settle_way | int | 结算方式（SettleWay 枚举） |\n| is_frozen | int | 锁定状态（OrderFreeze 枚举） |\n| client | int | 订单来源（OrderClient 枚举） |\n| customized_field | JSON | 自定义字段 |\n| date_time | datetime | 下单时间 |\n| receive_begin_time | datetime | 收货时间窗口开始 |\n| receive_end_time | datetime | 收货时间窗口结束 |\n\n### 2.2 订单明细（OrderDetail）\n\n订单明细 `TblOrderDetail` 同样为抽象模型，与订单主表同库分表。\n\n| 属性 | 类型 | 说明 |\n|------|------|------|\n| sku_id | str | SKU ID |\n| spu_id | str | SPU ID |\n| sku_type | int | SKU 类型 |\n| quantity | GmDecimal | 下单数量 |\n| real_quantity | GmDecimal | 实收数量（分拣/称重后由 weight 模块回写） |\n| sale_price | GmDecimal | 销售单价 |\n| outstock_price | GmDecimal | 出库单价 |\n| order_price | GmDecimal | 下单金额 |\n| account_price | GmDecimal | 套账金额 |\n| refer_sku_id | str | 关联 SKU ID（组合商品场景） |\n\n### 2.3 支付（Payment）\n\n支持 8+ 渠道支付，每个渠道在 `gm_server_order/pay/` 下有独立的回调通知路由：\n\n| 支付渠道 | 标识 | 说明 | 通知路由 |\n|---------|------|------|---------|\n| 微信支付 | wx | 公众号/小程序/H5 | `v9/pay/wx/notify` |\n| 支付宝 | alipay | 支付宝支付 | `v9/pay/alipay/notify` |\n| 汇付天下 | huifu/hf | 聚合支付（含专用order路由） | `huifu/pay/notify` |\n| 汇聚支付 | huiju/hj | 聚合支付 | `v9/pay/huiju/notify` |\n| Ksher | ksher | 海外支付（泰国等） | `v9/pay/ksher/notify` |\n| 爱农 | ainong | 农业金融支付 | `v9/pay/ainong/notify` |\n| 网商银行 | mybank | 网商银行支付 | `v9/pay/mybank/notify` |\n| EFT | eft | 电子资金转账 | - |\n| FPS | fps | 快速支付系统（香港） | - |\n| OMS | oms | OMS 渠道 | - |\n\n退款类型（`RefundType`）：\n\n| 值 | 类型 | 说明 |\n|----|------|------|\n| 1 | DIFF_REFUND | 先款差额退款（实收数变化导致的差额） |\n| 2 | ORDER_REFUND | 整单退款 |\n\n### 2.4 积分（Point）\n\n模块位于 `gm_server_order/point/`：\n- 积分奖励 SKU：配置哪些 SKU 可获得积分\n- 客户积分汇总：查询客户总积分\n- 积分流水：积分变动明细记录\n- 积分返还：退款时自动返还已发放积分\n\n### 2.5 赠品（Present SKU）\n\n模块位于 `gm_server_order/present_sku/`：\n\n| 赠品类型（PresentType） | 值 | 说明 |\n|------------------------|---|------|\n| 满赠 | 1 | 订单满额赠送 |\n| 买赠 | 2 | 购买指定SKU赠送 |\n| ALL | 3 | 同时启用满赠+买赠 |\n\n赠品基于报价单（salemenu）关联，通过 `PresentSkuService.get_info` 获取适用赠品。\n\n### 2.6 称重（Weight）\n\n模块位于 `gm_server_order/weight/`：\n- 分拣称重后回写订单明细的 `real_quantity`\n- 设置实收数、包裹状态\n- 与订单支付状态联动（实收变化可能触发差额退款）\n\n---"
    },
    {
     "heading": "3. 订单状态机",
     "content": "### 3.1 订单状态枚举（OrderStatus）\n\n定义位置：`common/global_val.py`\n\n| 值 | 常量 | 说明 | 中文名 |\n|----|------|------|--------|\n| -2 | REJECT | 驳回（审核不通过） | - |\n| -1 | DELETED | 已删除 | 订单已删除 |\n| 1 | PREPARE | 等待分拣（已审核） | 等待分拣 |\n| 2 | REVIEWING | 待审核 | - |\n| 5 | SORTING | 正在分拣 | 正在分拣 |\n| 10 | DISTRIBUTING | 正在配送 | 正在配送 |\n| 15 | RECEIVED | 已签收 | 已签收 |\n| 100 | PAID | 已结算（已废弃） | - |\n\n### 3.2 订单状态流转\n\n```\n               ┌──── 删除(DELETED=-1)\n               │\n[待审核(2)] → [等待分拣(1)] → [正在分拣(5)] → [正在配送(10)] → [已签收(15)]\n  │                                                               │\n  └─[驳回(-2)]                                              财务结算(管理平台)\n```\n\n> 注：`REVIEWING(2)` → `PREPARE(1)` 的审核操作在 gm_service 站点端完成。\n> `SORTING(5)` 由分拣操作自动触发（gm_web_sorting）。\n> `DISTRIBUTING(10)` 由配送任务启动时触发。\n\n### 3.3 支付状态枚举（OrderPayStatus）\n\n| 值 | 常量 | 说明 |\n|----|------|------|\n| 1 | UNPAY | 未支付 |\n| 5 | PARTPAY | 部分支付 |\n| 10 | PAID | 已支付 |\n| 15 | CLOSED | 超时关闭 |\n\n### 3.4 配送状态枚举（DispatchStatus）\n\n| 值 | 常量 | 说明 |\n|----|------|------|\n| 0 | UNDELIVERED | 未送达 |\n| 1 | DELIVERED | 已送达 |\n\n### 3.5 结算方式枚举（SettleWay）\n\n| 值 | 常量 | 说明 |\n|----|------|------|\n| 1 | GOODSFIRST | 先货后款（签收后结算） |\n| 2 | PAYFIRST | 先款后货（下单时支付） |\n\n### 3.6 订单锁定枚举（OrderFreeze）\n\n| 值 | 常量 | 说明 |\n|----|------|------|\n| 0 | UNFREEZE | 未锁定（可编辑） |\n| 1 | FREEZE | 已锁定（不可编辑） |\n\n### 3.7 订单来源枚举（OrderClient）\n\n| 值 | 常量 | 中文名 |\n|----|------|--------|\n| 1 | STATION | 后台下单 |\n| 2 | BSHOP | 微信商城 |\n| 3 | APP | app |\n| 4 | MP | 微信小程序 |\n| 5 | YZ | 有赞推送 |\n| 6 | OPENAPI | 开放平台 |\n| 7 | GmStationAppend | 后台补录 |\n| 8 | YunguanJiaApp | 云管家代客下单 |\n| 9 | CRM | CRM代客下单 |\n| 10 | CSHOP | C端下单 |\n| 11 | OMS | OMS下单 |\n| 12 | HZ | 华住交易平台下单 |\n\n---"
    },
    {
     "heading": "4. 服务拓扑",
     "content": "### 4.1 主服务：gm_server_order\n\n| 模块 | API前缀 | 核心能力 |\n|------|---------|---------|\n| order | `v9/order/` | 订单 CRUD (v1/v2)、合并、拆分、状态流转、自定义字段、签收、运费计算、数量限制、Redis同步 |\n| pay | `v9/pay/` | 支付下单、退款（整单/差额/B2B周转）、充值、交易流水、8+渠道回调通知 |\n| weight | `weight/` | 称重、实收数回写、包裹状态、与支付联动 |\n| point | `v9/point/` | 积分奖励SKU管理、客户积分总额、积分流水、积分返还 |\n| present_sku | `v9/present/` | 买赠/满赠规则查询 |\n\n**特殊路由**：\n- `huifu/order/`、`huifu/pay/` — 汇付专用订单/支付接口（独立路由前缀）\n\n### 4.2 订单版本\n\ngm_server_order 存在 v1 和 v2 两套订单接口：\n- **v1**：同一SKU合并为一条明细（历史接口，仍在使用）\n- **v2**：同一SKU可有多条明细（当前主用，支持多规格场景）\n\n对应 `gm_order_logic` 中的：\n- `order_v1.py`：MySQL/Mongo 混合查询路径\n- `order_v2.py`：缓存优先 + 批量写入路径\n- `order_util.py`：缓存决策逻辑\n\n### 4.3 RPC 客户端（gm_rmiclient）\n\n| Client 类 | 核心方法 |\n|-----------|---------|\n| `OrderService` | `create_v1/v2`, `update`, `delete`, `split`, `freeze`, `list`, `get_v2`, `set_customized_field`, `calc_freight`, `refund` |\n| `PayService` | `pay_order`, `charge`, `refund`, `wx_notify`, `alipay_notify`, `huifu_notify`, `ksher_notify`, `ainong_notify`, `mybank_notify` |\n| `WeightService` | `set_real_quantity`, `get_weight_data` |\n| `PointService` | `get_total_points`, `get_flow`, `return_points` |\n| `PresentSkuService` | `get_info` |\n| `OrderProofService` | 订单凭证（拍照签收） |\n\n### 4.4 消费方\n\n| 项目 | 使用场景 |\n|------|---------|\n| **gm_service** | 站点端订单管理（352+视图类中约50+处理订单相关） |\n| **gm_server_bshop** | B端商城：购物车→下单→支付→订单查询→自提→代金券 |\n| **gm_management** | 管理后台：订单搜索/创建/编辑/异常/售后/对账/日汇总 |\n| **gm_web_sorting** | 分拣配送：获取订单信息、回写实收数 |\n| **gm_open** | OpenAPI：订单创建/删除/修改/明细/异常/退货查询 |\n\n---"
    },
    {
     "heading": "5. 关键业务流程",
     "content": "### 5.1 商户下单流程\n\n```\n商户浏览报价单 → 加入购物车 → 提交订单 → 订单创建\n                  (gm_server_bshop)     (gm_server_order)\n                                              │\n                                    ┌─────────┼──────────┐\n                                    ▼         ▼          ▼\n                              库存校验    积分/赠品     运费计算\n                            (gm_web_stock) (point/    (calc_freight)\n                                          present_sku)\n```\n\n### 5.2 订单支付流程\n\n```\n选择支付方式 → 创建支付单 → 调用支付渠道 → 等待回调 → 更新支付状态 → 通知MQ\n  (bshop)      (pay/)       (wx/alipay/   (notify)    (order/)      (mqlib)\n                             huifu/ksher)\n```\n\n### 5.3 退款流程\n\n```\n发起退款 → 退款类型判断 → 调用支付渠道退款 → 退款回调 → 积分返还\n (order)   ├─ 差额退款(1)   (pay/refund)    (notify)   (point)\n           └─ 整单退款(2)\n```\n\n### 5.4 订单履约流程\n\n```\n订单审核(PREPARE=1) → 采购任务 → 入库 → 分拣(SORTING=5) → 称重 → 配送(DISTRIBUTING=10) → 签收(RECEIVED=15)\n     (gm_service)     (stock)   (stock) (sorting)       (weight)   (driver_app)         (driver_app)\n                                                           │\n                                                    回写real_quantity\n                                                    (gm_server_order)\n```\n\n### 5.5 订单异常处理\n\n```\n缺货/退货/少货/多货 → 异常上报 → 异常金额计算 → 差额退款/补款\n  (driver_app)       (gm_service)  (order_logic)  (pay)\n```\n\n---"
    },
    {
     "heading": "6. 金额计算",
     "content": "### 6.1 GmDecimal\n\n所有金额统一使用 `gm_order_logic.gm_typing.GmDecimal`：\n- 基于 Python `Decimal` 封装，`ROUND_HALF_UP` 四舍五入\n- `float` 先转 `str` 再构造，避免浮点精度问题\n- 重载算术运算符，运算结果保持 `GmDecimal` 类型\n- **版本敏感**：gm_server_order 固定 gm_order_logic 0.7.4，高版本有类型重写兼容问题\n\n### 6.2 金额字段\n\n| 字段 | 说明 |\n|------|------|\n| `sale_price` | 销售单价（报价单定价） |\n| `outstock_price` | 出库单价（可能与销售价不同，如调价） |\n| `order_price` | 下单金额 = sale_price × quantity |\n| `account_price` | 套账金额（用于财务对账，含税/不含税等） |\n\n### 6.3 订单金额汇总\n\n| 金额 | 计算方式 |\n|------|---------|\n| 下单金额 | Σ(order_detail.order_price) |\n| 出库金额 | Σ(order_detail.outstock_price × real_quantity) |\n| 运费 | 按配送规则计算（`calc_freight`） |\n| 异常金额 | 缺货/退货产生 |\n| 销售额 | 出库金额 + 运费 - 异常金额 |\n\n---"
    },
    {
     "heading": "7. 自定义字段",
     "content": "订单支持站点级自定义字段 (`customized_field`)：\n- 字段定义：站点配置自定义字段（名称、类型、权限）\n- 字段值：订单级别 JSON 存储\n- 权限控制：不同角色可见不同字段\n- 工具类：`gm_order_logic.customized_field_util`\n- 接口：`OrderService.set_customized_field()`\n\n---"
    },
    {
     "heading": "8. 数据存储",
     "content": "| 数据 | 存储位置 | 说明 |\n|------|---------|------|\n| 订单主表 (`TblOrder`) | TDSQL (order 库) | 分布式数据库，按年月分表 `tbl_order_{YYYYMM}` |\n| 订单明细 (`TblOrderDetail`) | TDSQL (order 库) | 与订单主表同库，同样分表 |\n| 支付记录 | MySQL (management) | 支付流水、交易记录 |\n| 积分流水 | MySQL (management) | 积分变动记录 |\n| 退款记录 | MongoDB + MySQL | 退款路径涉及 Mongo 文档存储 |\n| 订单搜索索引 | Elasticsearch 7.x | 支持复杂查询、按时间分索引 |\n| 订单缓存 | Redis | 热点订单缓存，`gm_order_logic` 缓存决策 |\n\n### 8.1 TDSQL 分表机制\n\n- 订单表按年月分表：`tbl_order_202603`, `tbl_order_202604`, ...\n- 订单明细表同步分表\n- `TblOrder` 为 `__abstract__ = True`，运行时动态绑定实际分表\n- 读写通过 `OrderDbReadSession` / `OrderDbWriteSession`\n\n### 8.2 双 ORM 并存\n\ngm_server_order 同时使用两套 ORM：\n- **Django ORM**：`order/models.py`（ID生成器、配送记录等）\n- **SQLAlchemy**：`common/mysql/models/`（主要数据操作层）\n\n修改前需确认当前文件使用的是哪套 ORM。\n\n---"
    },
    {
     "heading": "9. 与其他领域的交互",
     "content": "| 交互领域 | 方向 | 说明 |\n|---------|------|------|\n| **商品领域** | 订单 → 商品 | 订单明细引用 SKU 信息（价格、规格、快照） |\n| **供应链-采购** | 订单 → 采购 | 订单审核后触发采购任务生成 |\n| **供应链-分拣** | 订单 ↔ 分拣 | 分拣任务基于订单明细；称重后回写 real_quantity |\n| **供应链-配送** | 订单 ↔ 配送 | 配送单关联订单；签收更新订单状态 |\n| **供应链-进销存** | 订单 → 出库 | 销售出库单基于订单 |\n| **用户权限** | 订单 → 权限 | 订单操作权限校验、商户身份校验 |\n| **财务** | 订单 → 财务 | 订单签收后进入结算（gm_management） |\n| **营销** | 营销 → 订单 | 优惠券/秒杀/限时促销影响订单价格 |\n| **开放平台** | 订单 ↔ OpenAPI | 对外暴露订单创建/查询/异常/退货接口 |\n| **B端商城** | bshop → 订单 | 商户下单入口，购物车→订单创建 |\n\n---\n\n**维护者**: GM架构团队\n**版本**: v2.0\n**最后更新**: 2026-03-23"
    }
   ]
  },
  {
   "id": ".claude--specs--common--multi-repo-registry.spec",
   "title": "多仓库工程注册表",
   "category": "specs-common",
   "path": ".claude/specs/common/multi-repo-registry.spec.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 多仓库工程注册表"
    },
    {
     "heading": "0. 术语定义",
     "content": "| 术语 | 含义 | 禁用词 |\n|------|------|--------|\n| 业务平台 | gm_service 驱动的 PC 站点操作系统 | ~~站点端~~ |\n| 信息平台 | gm_management 驱动的信息管理平台 | - |\n| AIO | gm_admin 驱动的超级管理平台 | ~~管理后台~~ |\n| 进销存 | gm_web_stock 提供的库存管理功能（业务平台子功能） | ~~独立端~~ |\n| 分拣 | gm_web_sorting 提供的分拣管理功能（业务平台子功能） | ~~独立端~~ |\n| PA端 | gm_static_pav2 驱动的进销存+分拣移动作业端 | - |\n| 云管家 | gm_static_yunguanjia 的 H5 移动版信息平台 | - |"
    },
    {
     "heading": "1. 定位",
     "content": "定义演示公司微服务体系中所有工程的注册信息、依赖关系和路径解析规则，支持 `/gm-dev` 和 `/gm-ship` 在单个 Claude 会话中完成跨仓库编排。\n\n---"
    },
    {
     "heading": "2. 路径解析规则",
     "content": "### 2.1 目录结构约定\n\n所有工程位于同一父目录 `code/` 下：\n\n```\ncode/\n├── gm_service/              ← 当前工程（Claude 会话启动位置）\n├── gm_management/\n├── gm_static_stationv2/\n├── gm_static_managev2/\n├── gm_server_order/\n├── ...\n```\n\n### 2.2 base_path 推导\n\n**规则**：以主入口工程目录为基准，在同级兄弟目录中定位目标工程。\n\n```\n示例：\n  主入口工程：gm_service（/Users/demo/work/demo/code/gm_service）\n  同级目录：  /Users/demo/work/demo/code/\n  目标工程：  gm_static_stationv2 → /Users/demo/work/demo/code/gm_static_stationv2\n\n  base_path = dirname(gm_service 的绝对路径)\n            = /Users/demo/work/demo/code/\n```\n\n**推导方式**（运行时执行）：\n\n```bash\n# 获取当前工程的 git 根目录\ncurrent_repo_root=$(git rev-parse --show-toplevel)\n# base_path = 上一级目录\nbase_path=$(dirname \"$current_repo_root\")\n```\n\n### 2.3 跨工程文件读写\n\n通过绝对路径访问其他工程文件：\n\n```\n目标路径 = base_path + \"/\" + repo_name + \"/\" + 相对文件路径\n```\n\n---"
    },
    {
     "heading": "3. 工程注册表",
     "content": "### 3.1 后端 View 层\n\n| 工程名 | stack | serves（前端） | 说明 |\n|--------|-------|---------------|------|\n| gm_service | python-django | gm_static_stationv2 | 业务平台主 View 层 |\n| gm_management | python-django | gm_static_managev2, gm_static_yunguanjia | 信息平台 View 层 |\n| gm_admin | python-django | gm_static_admin | AIO 超级管理后台 |\n| gm_open | python-django | - | 开放平台 |\n| gm_server_bshop | python-django | gm_static_bshopv2 | B端商城 View 层 |\n| gm_web_sorting | python-django | - | 分拣 View 层（业务平台子功能） |\n| gm_web_stock | python-django | - | 进销存 View 层（业务平台子功能） |\n| marketing-interaction-layer | python | - | 营销交互层 |\n\n### 3.2 后端 Server 层\n\n| 工程名 | stack | 主存储 | ORM | 特殊模式 | CLAUDE.md |\n|--------|-------|--------|-----|---------|-----------|\n| gm_server_order | python-django | MySQL + MongoDB | SQLAlchemy | 42个DAL按功能拆分，订单双存储 | ✅ |\n| gm_server_merchandise | python-django | MySQL + **MongoDB主** | **Django ORM** 为主 | MongoDB 读写分离，模板库隔离 | ✅ |\n| gm_server_account | python-django | MySQL 双库 + MongoDB | SQLAlchemy | GraphQL 支持，RBAC 权限 | ✅ |\n\n### 3.3 业务操作端矩阵\n\n| 操作端 | 前端项目 | 后端项目 | 说明 |\n|--------|----------|----------|------|\n| 业务平台 (PC) | gm_static_stationv2 | gm_service | 核心业务操作系统 |\n| 信息平台 (PC) | gm_static_managev2 | gm_management | 信息管理平台 |\n| AIO (PC) | gm_static_admin | gm_admin | 超级管理平台 |\n| UPMS (PC) | gm_static_upms | gm_management | 用户权限管理 |\n| B端商城 (H5) | gm_static_bshopv2 | gm_server_bshop | 采购商城 |\n| MES (H5) | gm_static_mesv2 | gm_service | 制造执行 |\n| PA端 (H5) | gm_static_pav2 | gm_service | 进销存+分拣作业 |\n| Vista (PC) | gm_static_station_vista | gm_service | 新一代业务平台（UmiJS） |\n| 商户端 (H5) | gm_static_merchant | gm_service | 商户自助端 |\n| 司机端 (H5) | gm_static_driver | gm_service | 配送司机端 |\n| PDA (H5) | gm_static_pda | gm_service | PDA 作业端 |\n| 供应商 (H5) | gm_static_supplier | gm_service | 供应商自助端 |\n| 盒子 (H5) | gm_static_box | gm_service | 盒子端 |\n| 云管家 (H5) | gm_static_yunguanjia | gm_management | 信息平台 H5 移动版 |\n| More (H5) | gm_static_more | gm_service | 更多功能端 |\n| 开放平台 | - | gm_open | 第三方 API 开放平台 |\n\n### 3.4 前端技术栈分组\n\n| 组别 | UI 库 | 状态管理 | HTTP 客户端 | 构建工具 | 项目 |\n|------|-------|----------|-------------|----------|------|\n| **A组** (PC/@gmfe) | @gmfe/react | MobX 4 | @gm-common/request | gras | stationv2, managev2, upms, admin, driver |\n| **B组** (H5/@gmfe) | @gmfe/react | MobX | @gm-common/request | gras | bshopv2, mesv2 |\n| **C组** (H5/@gm-mobile) | @gm-mobile/react | MobX | @gm-common/request | gras | pav2 |\n| **D组** (轻量/gm-service) | WeUI/无 | MobX | gm-service | gras | pda, supplier, box, yunguanjia, more |\n| **E组** (UmiJS/Antd) | Antd 5.x | - | Axios | UmiJS v4 | station_vista, merchant |\n\n### 3.5 异步任务\n\n| 工程名 | stack | 说明 |\n|--------|-------|------|\n| gm_async_job | python | 异步作业 |\n\n### 3.6 前端\n\n| 工程名 | stack | calls（后端） | 说明 |\n|--------|-------|--------------|------|\n| gm_static_stationv2 | react-mobx | gm_service | 业务平台前端（工作流主入口） |\n| gm_static_managev2 | react-mobx | gm_management | 信息平台前端 |\n| gm_static_bshopv2 | react | gm_server_bshop | B端商城前端 |\n| gm_static_admin | react | gm_admin | 管理后台前端 |\n| gm_static_station_vista | react | gm_service | Vista 新一代（E组 UmiJS） |\n| gm_static_supplier | react | gm_service | 供应商前端（D组） |\n| gm_static_mesv2 | react | - | MES前端 |\n| gm_static_pav2 | react | gm_service | PA端（C组 @gm-mobile） |\n| gm_static_pda | react | gm_service | PDA端（D组） |\n| gm_static_driver | react | gm_service | 司机端（A组） |\n| gm_static_merchant | react | gm_service | 商户端（E组 UmiJS） |\n| gm_static_box | react | gm_service | 盒子端（D组） |\n| gm_static_more | react | gm_service | More端（D组） |\n| gm_static_upms | react | gm_management | UPMS权限（A组） |\n| gm_static_yunguanjia | react | gm_management | 云管家H5（D组） |\n\n### 3.7 公共库\n\n| 工程名 | type | stack | 说明 | CLAUDE.md |\n|--------|------|-------|------|-----------|\n| gm_rmiclient | library | python | RMI 客户端，三层同步修改的关键纽带 | ✅ |\n| gm_order_logic | library | python | 订单计算逻辑（GmDecimal） | - |\n| gm_mqlib | library | python | RabbitMQ 消息队列封装 | - |\n| gm_storage | library | python | 文件存储 | - |\n\n---"
    },
    {
     "heading": "4. 工程识别规则",
     "content": "### 4.1 关键词 + 架构分层推导\n\n根据 PRD 功能描述自动识别涉及的工程：\n\n| 变更信号 | 涉及工程 | 推导逻辑 |\n|---------|---------|---------|\n| API 变更（新增/修改接口） | View 层工程 | 根据业务模块匹配（如订单 → gm_service） |\n| 前端页面/组件变更 | 前端工程 | 通过 `serves` 关系推导（gm_service → gm_static_stationv2） |\n| 新增/修改 RPC 接口 | Server 层工程 | 根据服务域匹配（如商品 → gm_server_merchandise） |\n| 新增异步任务 | gm_async_job | 任务类型匹配 |\n| 修改公共库逻辑 | gm_rmiclient / gm_order_logic / gm_mqlib / gm_storage | 库级变更 |\n\n### 4.2 业务模块与工程映射\n\n| 业务模块 | View 层 | Server 层 | 前端 |\n|---------|---------|-----------|------|\n| 订单 | gm_service | gm_server_order | gm_static_stationv2 |\n| 商品/SKU | gm_service | gm_server_merchandise | gm_static_stationv2 |\n| 客户/账户 | gm_service | gm_server_account | gm_static_stationv2 |\n| 报价单 | gm_service | gm_server_merchandise | gm_static_stationv2 |\n| 配送/分拣 | gm_web_sorting | - | - |\n| 库存 | gm_web_stock | - | - |\n| 信息平台 | gm_management | - | gm_static_managev2 |\n| B端商城 | gm_server_bshop | - | gm_static_bshopv2 |\n\n---"
    },
    {
     "heading": "5. 跨工程编码约束",
     "content": "### 5.1 编码顺序\n\n```\nServer 层 → View 层 → 前端层（依赖方优先）\n```\n\n**原则**：先实现被依赖方，再实现依赖方。\n\n### 5.2 跨工程规范加载\n\n进入每个工程编码时：\n\n| 工程类型 | 加载内容 |\n|---------|---------|\n| Python 工程 | 读取 `<repo>/CLAUDE.md`（如有），获取项目规范 |\n| 前端工程 | 读取 `<repo>/package.json` 了解技术栈和脚本 |\n\n### 5.3 禁止事项\n\n- 禁止在 View 层工程直连其他 Server 的数据库\n- 禁止在前端工程中写后端逻辑\n- 禁止修改公共库（gm_rmiclient / gm_order_logic / gm_mqlib / gm_storage）除非明确需要\n\n---\n\n**维护者**: GM架构团队\n**版本**: v3.0\n**最后更新**: 2026-04-24"
    }
   ]
  },
  {
   "id": ".claude--specs--common--workflow-routing.spec",
   "title": "工作流路由规范",
   "category": "specs-common",
   "path": ".claude/specs/common/workflow-routing.spec.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 工作流路由规范"
    },
    {
     "heading": "1. 规范定位",
     "content": "定义 GM-AI 的任务规模判定规则、能力标签路由机制和产品→研发交接协议。本规范是 `/gm-prd` 和 `/gm-dev` 命令的核心决策依据。\n\n---"
    },
    {
     "heading": "2. 规模判定",
     "content": "### 2.1 判定维度\n\nAI 收到任务描述后，按以下维度打分：\n\n| 维度 | 0分 | 1分 | 2分 |\n|------|-----|-----|-----|\n| 涉及业务领域数 | 0个（纯代码调整） | 1个 | 2个以上 |\n| 数据模型变更 | 无 | 可能有 | 确定有 |\n| 跨服务影响 | 否 | 可能 | 确定 |\n| 业务规则复杂度 | 无新规则 | 简单规则 | 复杂/多条件 |\n| 用户交互变更 | 无 | 小调整 | 新增流程 |\n\n### 2.2 规模映射\n\n| 总分 | 规模 | 说明 |\n|------|------|------|\n| 0-1 | S级 | 明确的小改动，1-2个文件，无业务逻辑变更 |\n| 2-4 | M级 | 单一功能点，1个模块，业务规则清晰 |\n| 5-7 | L级 | 多功能点或跨模块，需要业务分析 |\n| 8+ | XL级 | 跨服务/跨领域，架构级变更，需评审 |\n\n### 2.3 判定流程\n\n1. AI 给出建议规模和判定理由\n2. 用户确认或覆盖\n3. 用户可显式指定规模参数：`/gm-prd --depth=standard` 或 `/gm-dev` 时交互确认\n\n---"
    },
    {
     "heading": "3. 能力标签",
     "content": "### 3.1 标签定义\n\n能力标签是 AI 的内部概念，用户不感知。决定加载哪些 Spec 和 Skill。\n\n| 标签 | 用途 | 触发条件 |\n|------|------|---------|\n| product-analysis | 产品分析 | M/L/XL 级任务 |\n| development | 研发开发 | 所有规模 |\n| debugging | 问题诊断 | Bug 类任务 |\n| testing | 测试验证 | L/XL 可选 |\n\n### 3.2 按规模加载\n\n**S级**：\n- development → 加载相关开发 Spec（按涉及领域按需加载）\n\n**M级**：\n- product-analysis → 加载相关业务 Spec + `requirement-card.md`（PRD 精简版模板）\n- development → 加载相关开发 Spec + 代码生成 Skill\n\n**L级**：\n- product-analysis → 加载相关业务 Spec + `requirement-analysis.md` + `product-handoff.md`（PRD 标准版模板）\n- development → 加载相关开发 Spec + 代码生成 Skill\n- testing → 可选加载 `testcase-gen.md`\n\n**XL级**：\n- product-analysis → 加载全套业务 Spec + `requirement-analysis.md` + `prd-gen.md`（PRD 完整版模板）+ `impact-analysis.md`\n- development → 加载全套开发 Spec + 全套代码生成 Skill\n- testing → 可选加载 `testcase-gen.md` + `test-report-gen.md`\n\n### 3.3 按需加载规则\n\n- **始终加载**：`global-behavior.rule.md`（已自动加载）\n- **按领域加载**：只加载任务涉及的业务/开发 Spec\n  - 涉及订单 → `订单领域.spec.md`\n  - 写 View → `视图层规范.spec.md` + `view-gen.md`\n  - 改数据模型 → `数据模型规范.spec.md` + `model-gen.md`\n  - 跨服务调用 → `RPC接口规范.spec.md`\n- **延迟加载**：Skill 在需要生成代码时才加载，不在初始化时加载\n\n---"
    },
    {
     "heading": "4. 工作流定义",
     "content": "### 4.1 S级工作流\n\n```\n需求输入 → 定位代码 → 修改 → 自测 → 完成\n```\n\n无文档产出。\n\n### 4.2 M级工作流\n\n```\n需求输入 → PRD（精简版） → 编码 → 自测 → 完成\n```\n\n产品产出：PRD 精简版（requirement-card.md 模板），直接在对话中输出。\n\n### 4.3 L级工作流\n\n```\n需求输入\n  ↓\n产品分析阶段\n  ├── 需求分析（requirement-analysis.md）\n  └── PRD 标准版（product-handoff.md）\n  ↓\n【产品→研发交接】\n  ↓\n研发阶段\n  ├── 技术要点梳理（涉及服务、数据变更、接口变更）\n  ├── 任务拆解\n  └── 分步实现\n```\n\n### 4.4 XL级工作流\n\n```\n需求输入\n  ↓\n产品分析阶段\n  ├── 需求分析（requirement-analysis.md）\n  ├── PRD 完整版（prd-gen.md）\n  └── 影响分析（impact-analysis.md）\n  ↓\n【产品→研发交接】\n  ↓\n研发阶段\n  ├── 技术方案文档（架构+数据+接口+部署）\n  ├── 计划拆解\n  └── 分步实现（可并行 agent）\n```\n\n---"
    },
    {
     "heading": "5. 产品→研发交接协议",
     "content": "### 5.1 交接边界\n\n产品阶段只输出 What/Why，不输出 How：\n- **产品输出**：业务背景、用户故事、功能说明、业务规则、验收标准\n- **产品提示**：业务领域提示（标注\"待研发确认\"）\n- **研发独立输出**：数据模型设计、接口设计、服务拆分、技术方案\n\n### 5.2 交接声明\n\nL/XL 级任务 PRD 输出完成后，AI 明确声明：\n\n```\nPRD 输出完成。请确认业务领域提示后开始技术设计。\n```\n\n用户确认后，切换到 development 能力标签。\n\n### 5.3 研发确认后产出\n\n| 规模 | 研发产出 |\n|------|---------|\n| L级 | 技术要点记录（涉及服务、数据变更、接口变更） |\n| XL级 | 技术方案文档（架构+数据+接口+部署） |\n\n---"
    },
    {
     "heading": "6. Superpowers 协作触发",
     "content": "| 规模 | 触发策略 | 可用能力 |\n|------|---------|---------|\n| S | 不触发 | - |\n| M | 可选 | brainstorming（需求不清晰时） |\n| L | 推荐 | brainstorming + writing-plans |\n| XL | 强制 | brainstorming + writing-plans + code-review + verification |\n\nBug 修复类任务（任何规模）：触发 systematic-debugging。\n\n详细协作接口见 superpowers 插件文档。\n\n---\n\n**维护者**: GM架构团队\n**版本**: v2.0\n**最后更新**: 2026-04-10"
    }
   ]
  },
  {
   "id": ".claude--specs--common--文档格式规范.spec",
   "title": "GM文档格式规范",
   "category": "specs-common",
   "path": ".claude/specs/common/文档格式规范.spec.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# GM文档格式规范"
    },
    {
     "heading": "规范目的",
     "content": "建立统一的文档格式标准，确保AI生成的文档符合GM项目规范，便于维护和检索。"
    },
    {
     "heading": "0. 通用命名与语言规范",
     "content": "### 0.1 目录命名规范\n\n**强制规范**：\n\n⚠️ **所有目录名必须使用英文小写+下划线**\n\n**示例**：\n\n| 场景 | ✅ 正确 | ❌ 错误 |\n|------|---------|---------|\n| 规范目录 | `.claude/specs/common/` | `.claude/specs/通用/` |\n| 服务目录 | `service/account/` | `service/账户服务/` |\n| 测试目录 | `tests/unittests/` | `tests/单元测试/` |\n\n### 0.2 文件命名规范\n\n| 文件类型 | 格式 | 示例 |\n|---------|------|------|\n| **Spec文件** | `<名称>.spec.md` | `服务分层规范.spec.md` |\n| **Rule文件** | `<名称>.rule.md` | `global-behavior.rule.md` |\n| **Command文件** | `<命令名>.md` | `gm-ai.md` |\n| **Skill文件** | `<功能>-gen.md` 或 `<功能>.md` | `service-gen.md` |\n| **Python文件** | `<模块名>.py` | `order_service.py` |\n\n---"
    },
    {
     "heading": "1. 文档类型定义",
     "content": "### 1.1 Spec（规范）\n\n**定位**：\"必须这样用\" - 强制性/标准\n**路径**：`.claude/specs/<role>/`\n**作用**：约束AI代码生成，确保符合架构规范\n**优先级**：10\n\n**示例**：\n- `服务分层规范.spec.md` - 分层架构规范\n- `数据模型规范.spec.md` - 数据模型定义规范\n\n### 1.2 Command（命令）\n\n**定位**：\"帮我这样用\" - 动作性/自动化\n**路径**：`.claude/commands/<role>/`\n**作用**：用户可通过命令调用的可执行工作流程\n**优先级**：8\n\n**示例**：\n- `gm-ai.md` - AI初始化命令\n- `gm.code.md` - 代码生成命令\n\n### 1.3 Skill（技能模板）\n\n**定位**：\"参考这个用\" - 模板性/指导性\n**路径**：`.claude/skills/<role>/`\n**作用**：被Commands引用的代码生成模板和指导\n**优先级**：5\n\n**示例**：\n- `service-gen.md` - 服务代码生成模板\n- `model-gen.md` - 数据模型生成模板\n\n### 1.4 Rule（规则）\n\n**定位**：\"AI的行为宪法\" - 思考路径/交互风格/绝对底线\n**路径**：`.claude/rules/`\n**作用**：定义AI的思考路径、交互风格和绝对不可逾越的底线\n**优先级**：10（最高）\n\n**示例**：\n- `global-behavior.rule.md` - 全局行为准则\n\n### 1.5 Guide（指南）\n\n**定位**：\"在哪里做\" - 导航性/全局性\n**路径**：`docs/`\n**作用**：提供系统架构的全局视图、业务领域索引、模块导航\n**优先级**：3\n\n**示例**：\n- `README.md` - 项目导航\n- `docs/services/account/` - 账户服务详细设计\n\n---"
    },
    {
     "heading": "2. 目录组织结构",
     "content": "```\n.claude/                            # GM AI框架核心\n├── rules/                          # AI行为规则（最高优先级）\n│   ├── README.md\n│   └── global-behavior.rule.md\n│\n├── specs/                          # 架构规范（强制）\n│   ├── README.md\n│   ├── common/                     # 通用规范\n│   │   ├── 文档格式规范.spec.md\n│   │   └── 项目开发宪法.spec.md\n│   ├── developer/                  # 开发者规范\n│   │   ├── 服务分层规范.spec.md\n│   │   ├── RPC接口规范.spec.md\n│   │   ├── 数据模型规范.spec.md\n│   │   └── 测试规范.spec.md\n│   └── architect/                  # 架构师规范\n│       └── framework-maintenance.spec.md\n│\n├── commands/                       # 可执行命令\n│   ├── README.md\n│   ├── gm-ai.md                    # AI初始化\n│   └── developer/\n│       ├── gm.spec.md              # 生成规范\n│       ├── gm.code.md              # 生成代码\n│       └── gm.test.md              # 生成测试\n│\n└── skills/                         # 技能模板\n    ├── README.md\n    ├── developer/\n    │   ├── service-gen.md          # 服务生成\n    │   ├── model-gen.md            # 模型生成\n    │   └── test-gen.md             # 测试生成\n    └── architect/\n        └── service-readme-gen.md   # 服务README生成\n\ndocs/                               # 导航文档\n├── README.md                       # 文档中心导航\n├── services/                       # 服务详细设计\n│   ├── account/                    # 账户服务\n│   ├── order/                      # 订单服务\n│   └── stock/                      # 库存服务\n├── components/                     # 组件文档\n│   ├── rpc-client/                 # RPC客户端\n│   └── message-queue/              # 消息队列\n└── iterations/                     # 迭代文档\n```\n\n---"
    },
    {
     "heading": "3. Spec文件格式规范",
     "content": "### 3.1 YAML元数据规范\n\n所有Spec文件**必须**以YAML元数据开头：\n\n```yaml\n---\nmeta:\n  title: \"规范标题\"\n  version: \"v1.0\"\n  updated: \"2026-03-16\"\n  status: \"active\"  # active, archived, draft, deprecated\n\nai:\n  role: \"architect\"  # architect, developer\n  phase: \"design\"    # design, dev, test\n  type: \"spec\"      # spec, command, skill, rule, guide\n\ntags:\n  - \"标签1\"\n  - \"标签2\"\n\npriority: 10  # 1-10, 10为最高优先级\n\ndependencies:\n  specs:\n    - \".claude/specs/common/文档格式规范.spec.md\"\n---\n```\n\n### 3.2 内容结构规范\n\n```markdown\n---\n<YAML元数据>\n---\n\n# 规范标题"
    },
    {
     "heading": "规范目的",
     "content": "<说明这个规范要解决什么问题>"
    },
    {
     "heading": "适用范围",
     "content": "<说明这个规范适用于哪些场景>"
    },
    {
     "heading": "核心规范",
     "content": "### 1. <规范1>\n\n**规范内容**：\n- ✅ 必须...\n- ✅ 必须...\n\n**示例**：\n```python\n<代码示例>\n```\n\n### 2. <规范2>\n\n..."
    },
    {
     "heading": "强制规范",
     "content": "<列出必须遵守的规范>"
    },
    {
     "heading": "禁止事项",
     "content": "❌ **禁止**：\n- 禁止...\n- 禁止...\n```\n\n---"
    },
    {
     "heading": "4. Rule文件格式规范",
     "content": "### 4.1 YAML元数据规范\n\n```yaml\n---\nmeta:\n  title: \"规则标题\"\n  version: \"v1.0\"\n  updated: \"2026-03-16\"\n  status: \"active\"\n\nai:\n  role: \"common\"\n  phase: \"all\"\n  type: \"rule\"\n\ntags:\n  - \"全局规则\"\n  - \"行为准则\"\n\npriority: 10  # Rule优先级最高\n---\n```\n\n### 4.2 内容结构规范\n\n```markdown\n---\n<YAML元数据>\n---\n\n# 规则标题"
    },
    {
     "heading": "规则定位",
     "content": "**Rule（规则）**：AI助手的\"行为宪法\"，定义AI的思考路径、交互风格和绝对不可逾越的底线。"
    },
    {
     "heading": "核心规范",
     "content": "### 1. <规范类别1>\n\n<规范内容>\n\n### 2. <规范类别2>\n\n<规范内容>"
    },
    {
     "heading": "检查清单",
     "content": "<相关检查项>\n```\n\n---"
    },
    {
     "heading": "5. Command文件格式规范",
     "content": "### 5.1 YAML元数据规范\n\n```yaml\n---\nmeta:\n  title: \"命令标题\"\n  version: \"v1.0\"\n  updated: \"2026-03-16\"\n  status: \"active\"\n\nai:\n  role: \"developer\"\n  phase: \"dev\"\n  type: \"command\"\n\ntags:\n  - \"代码生成\"\n  - \"自动化\"\n\npriority: 8\n\ndependencies:\n  specs:\n    - \".claude/specs/developer/服务分层规范.spec.md\"\n  skills:\n    - \".claude/skills/developer/service-gen.md\"\n\ninput:\n  - name: \"ParameterName\"\n    type: \"string\"\n    required: true\n    description: \"参数说明\"\n\noutput:\n  - \"生成XXX\"\n  - \"生成YYY\"\n---\n```\n\n---"
    },
    {
     "heading": "6. Skill文件格式规范",
     "content": "### 6.1 YAML元数据规范\n\n```yaml\n---\nmeta:\n  title: \"技能标题\"\n  version: \"v1.0\"\n  updated: \"2026-03-16\"\n  status: \"active\"\n\nai:\n  role: \"developer\"\n  phase: \"dev\"\n  type: \"skill\"\n\ntags:\n  - \"代码生成\"\n  - \"模板\"\n\npriority: 5\n\ndependencies:\n  specs:\n    - \".claude/specs/developer/服务分层规范.spec.md\"\n\ninput:\n  - name: \"EntityName\"\n    type: \"string\"\n    required: true\n    description: \"实体名称\"\n\noutput:\n  - \"生成Service类\"\n  - \"生成测试代码\"\n---\n```\n\n---"
    },
    {
     "heading": "7. 优先级规范",
     "content": "| 优先级 | 说明 | 使用场景 |\n|--------|------|----------|\n| 10 | 全局规则 | Rule文件、核心Spec |\n| 8-9 | 高优先级 | 重要Spec、Command |\n| 5-7 | 中优先级 | 常用Spec、Skill |\n| 1-4 | 低优先级 | 辅助文档、Guide |\n\n---"
    },
    {
     "heading": "8. 冲突处理规则",
     "content": "### 8.1 优先级顺序\n\n```\nRule (10) > Spec (10) > Command (8) > Skill (5) > Guide (3)\n```\n\n### 8.2 冲突解决原则\n\n**原则0：Rule规则绝对不可违反**\n- 用户指令违反Rule时，AI必须拒绝执行\n\n**原则1：Spec永远高于Command**\n- Command要求快速完成，但Spec要求遵循规范时，优先遵循Spec\n\n**原则2：同类型文档按priority优先**\n- 优先执行priority值高的规范\n\n---"
    },
    {
     "heading": "9. 检查清单",
     "content": "### Spec文件检查\n\n- [ ] 包含完整的YAML元数据\n- [ ] 使用.spec.md文件名\n- [ ] 提供正例和反例\n- [ ] 包含代码示例\n- [ ] dependencies只引用其他Spec\n\n### Rule文件检查\n\n- [ ] 包含完整的YAML元数据\n- [ ] 使用.rule.md文件名\n- [ ] priority设置为10\n- [ ] ai.role设置为\"common\"\n- [ ] ai.phase设置为\"all\"\n- [ ] ai.type设置为\"rule\"\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-03-16"
    }
   ]
  },
  {
   "id": ".claude--specs--developer--RPC接口规范.spec",
   "title": "GM RPC接口规范",
   "category": "specs-developer",
   "path": ".claude/specs/developer/RPC接口规范.spec.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# GM RPC接口规范"
    },
    {
     "heading": "规范目的",
     "content": "定义基于gm_rmiclient的服务间RPC接口规范，确保服务间通信的标准化和可维护性。"
    },
    {
     "heading": "适用范围",
     "content": "适用于所有GM项目间的服务间HTTP/RPC调用，包括gm_service、gm_server_order、gm_web_stock等服务。\n\n---"
    },
    {
     "heading": "1. gm_rmiclient概述",
     "content": "### 1.1 定位\n\n**gm_rmiclient**是GM系统的RPC客户端库，封装了服务间的HTTP调用。\n\n### 1.2 核心服务类\n\n| 服务类 | 功能 | 目标服务 |\n|--------|------|---------|\n| `OrderService` | 订单相关操作 | gm_server_order |\n| `AccountService` | 账户相关操作 | gm_server_account |\n| `StockService` | 库存相关操作 | gm_web_stock |\n| `MerchandiseService` | 商品相关操作 | gm_server_merchandise |\n| `SortingService` | 分拣相关操作 | gm_web_sorting |\n| `AsyncJobService` | 异步任务操作 | gm_async_job |\n\n### 1.3 集中初始化模式\n\n**所有RMI客户端在 `common/service/__init__.py` 中统一初始化**：\n\n```python\n# common/service/__init__.py\nfrom gm_rmiclient.order import OrderService\nfrom gm_rmiclient.merchandise import SpuService, Category1Service\nfrom common.config import config\n\n# Host 配置来自 gm_configer 配置中心\norder_host = config.domains.internal.service[\"order\"]\nmerchandise_host = config.domains.internal.service[\"merchandise\"]\naccount_host = config.domains.internal.service[\"account\"]\nasync_job_host = config.domains.internal.service[\"async_job\"]\n\n# 创建客户端实例\norder_srv = OrderService(order_host)\nspu_srv = SpuService(merchandise_host)\ncategory1_srv = Category1Service(merchandise_host)\nst_account_srv = AccountService(account_host)\nasync_job_srv = AsyncJobService(async_job_host)\n# ... 20+服务客户端\n```\n\n### 1.4 使用方式\n\n```python\n# ✅ 正确：从common/service导入已初始化的客户端\nfrom common.service import order_srv, spu_srv, async_job_srv\n\n# 调用接口\nresult = order_srv.create_v2(\n    customer=customer_data,\n    station=station_data,\n    products=products_data,\n    time_config_id=time_config_id,\n    client='erp'\n)\n```\n\n```python\n# ❌ 错误：手动创建客户端（应使用common/service中的实例）\nfrom gm_rmiclient.order import OrderService\nclient = OrderService(some_host)\n```\n\n---"
    },
    {
     "heading": "2. 接口定义规范",
     "content": "### 2.1 接口方法命名\n\n**命名格式**：`<动词>_<名词>`\n\n| 动词 | 含义 | 示例 |\n|------|------|------|\n| `create` | 创建 | `create_v2()` |\n| `update` | 更新 | `update_status()` |\n| `delete` | 删除 | `delete()` |\n| `list` | 查询列表 | `list_v2()` |\n| `get` | 获取单个 | `get_order_from_cache()` |\n\n### 2.2 参数传递规范\n\n**必须使用关键字参数**：\n\n```python\n# ✅ 正确：使用关键字参数\nresult = order_srv.create_v2(\n    customer=customer_data,\n    station=station_data,\n    products=products_data\n)\n\n# ❌ 错误：使用位置参数\nresult = order_srv.create_v2(customer_data, station_data, products_data)\n```\n\n### 2.3 JSON序列化规范\n\n**复杂数据类型必须使用json.dumps序列化**：\n\n```python\nimport json\n\n# ✅ 正确：复杂数据序列化\nresult = order_srv.create(\n    station_id='ST001',\n    customer=json.dumps(customer_data),\n    products=json.dumps(products_data)\n)\n```\n\n---"
    },
    {
     "heading": "3. 版本管理规范",
     "content": "### 3.1 版本后缀\n\n**接口支持版本后缀**：`_<version>`\n\n```python\norder_srv.create_v2(...)    # v2版本\norder_srv.create(...)       # 无版本（默认v1）\n```\n\n### 3.2 版本演进规则\n\n- ✅ 新增接口优先使用v2版本\n- ✅ 保持v1接口向后兼容\n- ✅ 废弃接口在文档中标注`@deprecated`\n\n---"
    },
    {
     "heading": "4. 返回值处理规范",
     "content": "### 4.1 返回值结构\n\n```python\n{\n    'code': 0,           # 状态码：0成功，非0失败\n    'message': '成功',    # 消息\n    'data': {...}        # 数据\n}\n```\n\n### 4.2 错误处理\n\n```python\nfrom gm_rmiclient.RMI_client import RequestError\nfrom common.param_check import GmError, ErrCode\n\ntry:\n    result = order_srv.create_v2(...)\n    if result.get('code') != 0:\n        raise GmError(ErrCode.business_err, result.get('message'))\nexcept RequestError as e:\n    # 网络错误或超时（CommonBaseView.dispatch会自动捕获）\n    logger.error(f\"RPC调用失败: {e}\")\n    raise\n```\n\n---"
    },
    {
     "heading": "5. 性能优化规范",
     "content": "### 5.1 批量操作\n\n```python\n# ✅ 正确：使用批量接口\norders = order_srv.bulk_update_v2(\n    update_list=[...],\n    with_msg=False\n)\n\n# ❌ 错误：循环调用\nfor order in orders:\n    order_srv.update_v2(update_dict)\n```\n\n### 5.2 字段过滤\n\n```python\n# ✅ 正确：指定需要的字段\norders = order_srv.list_v2(\n    filters={'status': 1},\n    cols=['order_id', 'customer_id'],\n    detail_cols=[],\n    count=False\n)\n```\n\n---"
    },
    {
     "heading": "6. 已初始化的服务清单",
     "content": "以下服务在 `common/service/__init__.py` 中可直接导入使用：\n\n| 变量名 | 服务类型 | 用途 |\n|--------|---------|------|\n| `order_srv` | OrderService | 订单操作 |\n| `spu_srv` | SpuService | SPU商品 |\n| `sku_product_srv` | SkuProductService | SKU产品 |\n| `category1_srv` | Category1Service | 一级分类 |\n| `async_job_srv` | AsyncJobService | 异步任务 |\n| `st_account_srv` | AccountService | 账户 |\n| `sms_srv` | SmsService | 短信 |\n| `weight_srv` | WeightService | 称重 |\n| `pay_srv` | PayService | 支付 |\n| `point_srv` | PointService | 积分 |\n| `sorting_srv` | SortingService | 分拣 |\n| `combine_goods_srv` | CombineGoodsService | 组合商品 |\n| `present_sku_srv` | PresentSkuService | 赠品 |\n| `cluster_context_srv` | ClusterContextService | 集群上下文 |\n\n---"
    },
    {
     "heading": "7. 检查清单",
     "content": "### 接口调用前\n\n- [ ] 使用 `from common.service import xxx` 导入客户端\n- [ ] 确认接口版本（v1/v2）\n- [ ] 使用关键字参数\n- [ ] 复杂数据使用json.dumps\n\n### 接口调用后\n\n- [ ] 检查返回code字段\n- [ ] 处理GmError和RequestError\n- [ ] 记录调用日志\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-03-19"
    }
   ]
  },
  {
   "id": ".claude--specs--developer--代码风格规范.spec",
   "title": "GM代码风格规范",
   "category": "specs-developer",
   "path": ".claude/specs/developer/代码风格规范.spec.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# GM代码风格规范"
    },
    {
     "heading": "规范目的",
     "content": "定义GM项目的代码风格和注释规范，确保代码一致性和可读性。"
    },
    {
     "heading": "适用范围",
     "content": "适用于所有GM项目的Python/Django代码编写。\n\n---"
    },
    {
     "heading": "1. 命名规范",
     "content": "### 1.1 文件命名\n\n**格式**：`小写字母+下划线`\n\n| 文件类型 | 命名规范 | 示例 |\n|---------|---------|------|\n| 模块文件 | `<模块名>.py` | `order_service.py` |\n| 视图文件 | `<模块>.py` 或 `<模块>_<功能>.py` | `order.py`、`order_batch.py` |\n| 模型文件 | `<实体>_model.py` 或 `<实体>.py` | `customer_model.py` |\n| DAL文件 | `<实体>.py` | `order.py`、`order_sku.py` |\n| 工具文件 | `<功能>.py` | `date_utils.py` |\n\n### 1.2 类命名\n\n**格式**：`大驼峰（PascalCase）`\n\n```python\n# ✅ 正确\nclass OrderService:\n    pass\n\nclass UserCreditLimit(Base):\n    pass\n\nclass OrderListView(CommonBaseView):\n    pass\n```\n\n### 1.3 函数命名\n\n**格式**：`小写字母+下划线`\n\n```python\n# ✅ 正确\ndef create_order():\n    pass\n\ndef get_user_by_id():\n    pass\n\ndef calculate_total_amount():\n    pass\n```\n\n### 1.4 变量命名\n\n**格式**：`小写字母+下划线`\n\n```python\n# ✅ 正确\norder_id = \"O001\"\ncustomer_name = \"张三\"\ntotal_amount = 100.50\nstation_id = \"T001\"\n```\n\n### 1.5 常量命名\n\n**格式**：`大写字母+下划线`\n\n```python\n# ✅ 正确\nMAX_RETRY_COUNT = 3\nDEFAULT_TIMEOUT = 30\nORDER_STATUS_PENDING = 1\n```\n\n---"
    },
    {
     "heading": "2. 注释规范",
     "content": "### 2.1 文件头注释\n\n**每个Python文件应包含文件头注释**：\n\n```python\n# service/order/order_service.py\n\"\"\"订单服务模块\n\n本模块提供订单相关的业务逻辑服务，包括：\n- 订单创建\n- 订单查询\n- 订单修改\n\"\"\"\n```\n\n### 2.2 类注释\n\n**类注释使用中文描述类的职责**：\n\n```python\nclass OrderService:\n    \"\"\"订单服务\n\n    提供订单相关的业务逻辑处理：\n    - 创建订单及详情\n    - 查询订单信息\n    - 修改订单状态\n    \"\"\"\n```\n\n### 2.3 函数注释\n\n**函数注释使用Google风格的中文docstring**：\n\n```python\ndef create_order(self, data: Dict[str, Any]) -> dict:\n    \"\"\"创建订单\n\n    根据提供的订单数据创建订单及其详情。\n\n    Args:\n        data: 订单数据，格式：\n            {\n                'customer_id': int,        # 客户ID\n                'station_id': str,         # 站点ID\n                'products': List[Dict],    # 商品列表\n                'total_amount': Decimal    # 订单金额\n            }\n\n    Returns:\n        dict: 创建的订单数据\n\n    Raises:\n        GmError: 当客户不存在、库存不足等业务异常时抛出\n    \"\"\"\n```\n\n### 2.4 SQLAlchemy 模型字段注释\n\n**使用 `doc=` 参数**：\n\n```python\nclass UserCreditLimit(Base):\n    \"\"\"用户授信额度表\"\"\"\n\n    __tablename__ = \"tbl_credit_limit\"\n\n    id = Column(INTEGER(11, unsigned=True), primary_key=True, doc=\"主键ID\")\n    customer_id = Column(INTEGER(11, unsigned=True), doc=\"客户ID\")\n    is_credit = Column(TINYINT(1), default=0, doc=\"是否授信，0:否 1:是\")\n    credit_limit = Column(Numeric(10, 2), doc=\"授信额度\")\n```\n\n### 2.5 Django 模型字段注释\n\n**使用 `verbose_name` 和 `help_text`**：\n\n```python\nclass UserPermission(BaseModel):\n    \"\"\"用户权限模型\"\"\"\n\n    user_id = models.IntegerField(\n        verbose_name='用户ID',\n        help_text='关联用户'\n    )\n```\n\n### 2.6 行内注释\n\n**行内注释用于解释业务逻辑，使用中文**：\n\n```python\ndef get_datetime_range(begin_stamp, end_stamp=None):\n    # 获取当前时间戳\n    if end_stamp is None:\n        end_stamp = int(time.time())\n\n    # 将时间戳转换为datetime对象\n    begin_time = datetime.fromtimestamp(begin_stamp)\n    end_time = datetime.fromtimestamp(end_stamp)\n\n    return begin_time, end_time\n```\n\n---"
    },
    {
     "heading": "3. 代码格式规范",
     "content": "### 3.1 缩进和空格\n\n**使用4个空格缩进**（black默认）。\n\n### 3.2 行长度\n\n**每行不超过88个字符（black默认值）**：\n\n```python\n# ✅ 正确：分行\nresult = order_srv.create_v2(\n    customer=customer_data,\n    station=station_data,\n    products=products_data,\n)\n```\n\n---"
    },
    {
     "heading": "4. 导入规范",
     "content": "### 4.1 导入顺序\n\n```python\n# 1. 标准库导入\nimport time\nfrom datetime import datetime\nfrom typing import Dict, Any, List\n\n# 2. 第三方库导入\nfrom django.db import models\nfrom sqlalchemy import Column, Integer\nfrom redis import Redis\n\n# 3. 本地导入\nfrom common.mysql_session import StationDbReadSession\nfrom common.service import order_srv\nfrom common.param_check import Param, GmError\n```\n\n### 4.2 导入分组\n\n**每组导入之间空一行**。\n\n---"
    },
    {
     "heading": "5. 视图规范",
     "content": "### 5.1 视图类命名\n\n**格式**：`<功能>View`\n\n```python\nclass OrderListView(CommonBaseView):\n    pass\n\nclass CreateOrderView(CommonBaseView):\n    pass\n```\n\n### 5.2 参数校验\n\n**使用 param_check_dict 进行参数校验**：\n\n```python\nfrom common.param_check import Param\n\nclass CreateOrderView(CommonBaseView):\n    \"\"\"创建订单视图\"\"\"\n\n    param_check_dict = {\n        \"customer_id\": Param(int),\n        \"station_id\": Param(str),\n        \"products\": Param(list),\n        \"total_amount\": Param(float),\n        \"remark\": Param(str, optional=True, default=\"\"),\n    }\n\n    def post(self, request):\n        # 参数已在dispatch中通过ParamCheckMixin自动校验\n        customer_id = self.params[\"customer_id\"]\n        station_id = self.params[\"station_id\"]\n        products = self.params[\"products\"]\n\n        # 调用业务逻辑\n        result = create_order(customer_id, station_id, products)\n\n        return self.JsonSuccessResponse(data_dict=result)\n```\n\n### 5.3 响应格式\n\n```python\n# 成功响应\nreturn self.JsonSuccessResponse(data_dict={\"order_id\": \"O001\"})\n# → {\"code\": 0, \"msg\": \"ok\", \"data\": {\"order_id\": \"O001\"}}\n\n# 带分页的成功响应\nreturn self.JsonSuccessResponse(\n    data_dict=order_list,\n    pagination={\"count\": total, \"offset\": offset, \"limit\": limit}\n)\n\n# 错误响应\nreturn self.JsonErrorResponse(msg=\"订单创建失败\", code=1)\n# → {\"code\": 1, \"msg\": \"订单创建失败\", \"data\": null}\n```\n\n---"
    },
    {
     "heading": "6. 错误处理规范",
     "content": "### 6.1 异常类\n\n**项目使用 GmError + ErrCode 作为统一异常体系**：\n\n```python\nfrom common.param_check import GmError, ErrCode\n\n# 抛出业务异常\nraise GmError(ErrCode.business_err, \"客户不存在\")\n\n# 抛出参数异常\nraise GmError(ErrCode.param_err, \"缺少customer_id参数\")\n```\n\n### 6.2 异常处理\n\n**CommonBaseView.dispatch() 自动捕获异常**，处理逻辑：\n- `GmError` → `JsonErrorResponse(str(e), code=e.err_code)`，记录warning\n- `RequestError`（RMI调用失败） → `JsonErrorResponse(str(e))`，记录exception\n- `SQLAlchemyError` / `PyMongoError` / `RedisError` → `JsonErrorResponse(\"系统繁忙，稍后再试\")`\n- 其他异常 → `JsonErrorResponse(\"系统繁忙，稍后再试\")`，所有WriteSession自动rollback\n\n**在DAL层可以直接抛出GmError**：\n\n```python\n# website/station/dals/order.py\nfrom common.param_check import GmError, ErrCode\n\ndef get_order_by_id(order_id, station_id):\n    session = OrderDbReadSession()\n    order = session.query(OrderModel).filter_by(\n        id=order_id, station_id=station_id\n    ).first()\n    if not order:\n        raise GmError(ErrCode.business_err, \"订单不存在\")\n    return order\n```\n\n---"
    },
    {
     "heading": "7. 代码组织规范",
     "content": "### 7.1 单一职责原则\n\n**每个函数只做一件事**：\n\n```python\n# ✅ 正确：拆分为多个函数\ndef create_order(self, data):\n    \"\"\"创建订单\"\"\"\n    self._validate_order_data(data)\n    self._check_stock_available(data['products'])\n    order = self._create_order_record(data)\n    self._deduct_stock(data['products'])\n    return order\n```\n\n### 7.2 函数长度\n\n**函数不超过50行，超过则拆分**。\n\n---"
    },
    {
     "heading": "8. 代码审查检查清单",
     "content": "### 8.1 命名检查\n\n- [ ] 文件名使用小写+下划线\n- [ ] 类名使用大驼峰\n- [ ] 函数名使用小写+下划线\n- [ ] 变量名使用小写+下划线\n- [ ] 常量名使用大写+下划线\n\n### 8.2 注释检查\n\n- [ ] 类有类注释\n- [ ] 复杂函数有docstring\n- [ ] 复杂逻辑有行内注释\n- [ ] SQLAlchemy字段有doc=\n- [ ] Django字段有verbose_name\n\n### 8.3 格式检查\n\n- [ ] 使用4个空格缩进\n- [ ] 行长度不超过88字符\n- [ ] 导入顺序正确\n- [ ] 使用black格式化\n\n### 8.4 逻辑检查\n\n- [ ] 函数单一职责\n- [ ] 函数长度不超过50行\n- [ ] 有异常处理（GmError）\n- [ ] 有日志记录\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-03-19"
    }
   ]
  },
  {
   "id": ".claude--specs--developer--异步任务规范.spec",
   "title": "GM异步任务规范",
   "category": "specs-developer",
   "path": ".claude/specs/developer/异步任务规范.spec.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# GM异步任务规范"
    },
    {
     "heading": "规范目的",
     "content": "定义GM项目的异步任务、定时任务和消息队列使用规范。"
    },
    {
     "heading": "适用范围",
     "content": "适用于gm_service中的异步任务开发（tools/async_job/）、定时任务（tools/crontab_tasks/）和消息队列使用。\n\n---"
    },
    {
     "heading": "1. gm_async_job 异步任务",
     "content": "### 1.1 目录结构\n\n```\ntools/async_job/\n├── exec_base.py              # 公共初始化脚本 ⭐\n├── router.yml                # 任务路由配置 ⭐\n├── base_export.py            # 导出任务基类（Excel → COS）\n├── batch_create_order.py     # 批量创建订单\n├── batch_create_spu.py       # 批量创建SPU\n├── sku_batch_edit.py         # SKU批量编辑\n├── import_spu_by_template.py # 模板导入SPU\n├── delete_salemenu.py        # 删除报价单\n└── ...                       # 90+个任务脚本\n```\n\n### 1.2 任务路由\n\n`tools/async_job/router.yml` 定义任务名到脚本路径的映射：\n\n```yaml\n# router.yml 格式\nstation.batch_create_order: tools/async_job/batch_create_order.py\nstation.sku_batch_edit: tools/async_job/sku_batch_edit.py\nstation.batch_create_spu: tools/async_job/batch_create_spu.py\n```\n\n**命名规则**：`station.<task_name>`\n\n### 1.3 初始化基类\n\n`tools/async_job/exec_base.py` 负责任务执行前的环境初始化：\n\n```python\n# exec_base.py 核心流程\nimport os, sys\n\nROOT_PATH = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))\nsys.path.insert(0, ROOT_PATH)\n\n# 1. Django初始化\nos.environ.setdefault(\"DJANGO_SETTINGS_MODULE\", \"website.basesettings\")\nimport django\ndjango.setup()\n\n# 2. 数据库初始化\nfrom common.mysql_session import config_db\nfrom common.config import config\nconfig_db(config)\n\n# 3. MongoDB初始化\nfrom common.mongo_client import config_mongo\nconfig_mongo(config)\n\n# 4. Redis初始化\nfrom common.redis_client import config_redis\nconfig_redis(config)\n```\n\n### 1.4 任务脚本模板\n\n```python\n#!/usr/bin/env python\n# -*- coding: utf-8 -*-\n\"\"\"批量创建订单任务\n\n通过异步任务批量处理订单创建请求。\n\"\"\"\nimport exec_base  # 必须首先导入，完成环境初始化\n\nimport logging\nfrom common.mysql_session import StationDbWriteSession\nfrom common.service import order_srv\n\nlogger = logging.getLogger(\"async_job.batch_create_order\")\n\n\ndef main(params):\n    \"\"\"任务入口函数\n\n    Args:\n        params: 任务参数字典，由gm_async_job传入\n    \"\"\"\n    station_id = params.get(\"station_id\")\n    order_list = params.get(\"order_list\", [])\n    user_id = params.get(\"user_id\")\n\n    success_count = 0\n    fail_list = []\n\n    for order_data in order_list:\n        try:\n            result = order_srv.create_v2(\n                customer=order_data[\"customer\"],\n                station=order_data[\"station\"],\n                products=order_data[\"products\"],\n            )\n            if result.get(\"code\") == 0:\n                success_count += 1\n            else:\n                fail_list.append({\"data\": order_data, \"error\": result.get(\"message\")})\n        except Exception as e:\n            logger.exception(f\"创建订单失败: {e}\")\n            fail_list.append({\"data\": order_data, \"error\": str(e)})\n\n    return {\n        \"success_count\": success_count,\n        \"fail_count\": len(fail_list),\n        \"fail_list\": fail_list,\n    }\n```\n\n### 1.5 导出任务基类\n\n`tools/async_job/base_export.py` 提供 `BaseExporterMixin`，用于Excel导出类任务：\n\n```python\nfrom tools.async_job.base_export import BaseExporterMixin\n\nclass OrderExporter(BaseExporterMixin):\n    \"\"\"订单导出任务\"\"\"\n\n    def get_data(self, params):\n        \"\"\"获取导出数据\"\"\"\n        # 查询数据\n        return order_list\n\n    def get_headers(self):\n        \"\"\"获取Excel表头\"\"\"\n        return [\"订单号\", \"客户名\", \"金额\", \"状态\"]\n```\n\n导出流程：查询数据 → 写入Excel → 上传COS → 返回下载链接。\n\n---"
    },
    {
     "heading": "2. 定时任务",
     "content": "### 2.1 目录结构\n\n```\ntools/crontab_tasks/\n├── exec_base.py              # 初始化脚本（同async_job）\n├── cron                      # cron配置文件\n├── finance_daily.py          # 每日财务统计\n├── updateEveryday.py         # 每日更新任务\n├── market_price.py           # 市场价格更新\n├── order_count_everyday.py   # 每日订单统计\n├── calculate_stock_value.py  # 库存价值计算\n├── sync_salemenu.py          # 同步报价单\n├── cal_sorter_perf.py        # 分拣绩效计算\n└── ...\n```\n\n### 2.2 定时任务模板\n\n```python\n#!/usr/bin/env python\n# -*- coding: utf-8 -*-\n\"\"\"每日订单统计\n\n通过cron定时执行，统计每日订单数据。\n\"\"\"\nimport exec_base\n\nimport logging\nfrom datetime import datetime, timedelta\nfrom common.mysql_session import OrderDbReadSession\n\nlogger = logging.getLogger(\"crontab.order_count_everyday\")\n\n\ndef run():\n    \"\"\"定时任务入口函数\"\"\"\n    yesterday = datetime.now() - timedelta(days=1)\n    logger.info(f\"开始统计 {yesterday.date()} 的订单数据\")\n\n    session = OrderDbReadSession()\n    # 统计逻辑...\n\n    logger.info(\"统计完成\")\n\n\nif __name__ == \"__main__\":\n    run()\n```\n\n---"
    },
    {
     "heading": "3. 消息队列（mqlib）",
     "content": "### 3.1 mqlib 基本用法\n\n**包名为 `mqlib`**（不是 gm_mqlib），使用 `Channel.prepare().send()` 模式：\n\n```python\nfrom mqlib import Channel\n\ndef send_order_update_message(request_uid, group_id, order_data):\n    \"\"\"发送订单更新消息\"\"\"\n    channel = Channel(request_uid, group_id)\n    channel.prepare(\n        \"order_update\",             # topic\n        {\n            \"order_id\": order_data[\"order_id\"],\n            \"status\": order_data[\"status\"],\n            \"update_time\": str(datetime.now()),\n        }\n    ).send()\n```\n\n### 3.2 常见使用场景\n\n| 场景 | topic示例 | 说明 |\n|------|----------|------|\n| 操作日志 | `user_log` | 异步记录用户操作到MongoDB |\n| 订单变更通知 | `order_update` | 订单状态变更通知下游系统 |\n| 商品变更 | `spu_update` | SPU/SKU变更通知 |\n| 配送分配 | `delivery_assign` | 司机分配完成后通知 |\n\n### 3.3 异步操作日志\n\n`common/async_operate.py` 提供异步操作日志服务：\n\n```python\nfrom common.async_operate import AsyncOperateLog\n\n# 异步记录操作日志（通过MQ发送到MongoDB）\nAsyncOperateLog.log(\n    station_id=station_id,\n    user_id=user_id,\n    op_type=\"order_create\",\n    detail={\"order_id\": order_id, \"customer_id\": customer_id},\n)\n```\n\n### 3.4 营销互动MQ\n\n`common/mq/producer.py` 提供营销互动层专用MQ（基于Kombu + CloudEvents）：\n\n```python\nfrom common.mq.producer import send_cloud_event\n\nsend_cloud_event(\n    event_type=\"coupon.used\",\n    data={\"coupon_id\": coupon_id, \"order_id\": order_id},\n)\n```\n\n---"
    },
    {
     "heading": "4. mqlib 初始化",
     "content": "`common/mq_client.py` 负责 mqlib 初始化：\n\n```python\n# common/mq_client.py\nfrom mqlib import init_mqlib\nfrom common.config import config\n\n# 使用MySQL + RabbitMQ作为broker\ninit_mqlib(\n    mysql_config=config.mysql.extra,\n    rabbitmq_config=config.rabbitmq.base,\n)\n```\n\n---"
    },
    {
     "heading": "5. 强制规范",
     "content": "### 5.1 异步任务\n\n**必须遵守**：\n- ✅ 脚本首行 `import exec_base` 完成环境初始化\n- ✅ 在 `router.yml` 中注册任务路由\n- ✅ 任务命名使用 `station.<task_name>` 格式\n- ✅ 入口函数命名为 `main(params)` 或 `run()`\n\n**禁止事项**：\n- ❌ 禁止跳过 exec_base 初始化\n- ❌ 禁止在任务脚本中硬编码数据库连接\n\n### 5.2 消息队列\n\n**必须遵守**：\n- ✅ 使用 `Channel(request_uid, group_id)` 创建通道\n- ✅ 消息数据可JSON序列化\n- ✅ topic命名使用 `<模块>_<操作>` 格式\n\n**禁止事项**：\n- ❌ 禁止在事务中发送MQ消息（应在事务提交后）\n- ❌ 禁止发送大量数据（超过1MB应使用其他方式）\n\n---"
    },
    {
     "heading": "6. 检查清单",
     "content": "### 异步任务开发\n\n- [ ] 首行导入exec_base\n- [ ] router.yml中注册路由\n- [ ] 有完整的异常处理和日志\n- [ ] 大数据量操作使用批量处理\n\n### 消息队列使用\n\n- [ ] 消息在事务之外发送\n- [ ] 消息数据可序列化\n- [ ] 有消息发送失败的处理\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-03-19"
    }
   ]
  },
  {
   "id": ".claude--specs--developer--数据模型规范.spec",
   "title": "GM数据模型规范",
   "category": "specs-developer",
   "path": ".claude/specs/developer/数据模型规范.spec.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# GM数据模型规范"
    },
    {
     "heading": "规范目的",
     "content": "定义GM项目的数据模型定义规范，确保数据库操作的一致性和可维护性。"
    },
    {
     "heading": "适用范围",
     "content": "适用于所有GM项目的数据模型定义，包括MySQL模型（SQLAlchemy为主、Django ORM为辅）和MongoDB文档模型。\n\n---"
    },
    {
     "heading": "1. SQLAlchemy 模型规范（主要模式）",
     "content": "### 1.1 模型定义位置\n\n```\ncommon/mysql/models/\n├── base_model.py              # 基础模型类（Django BaseModel + SQLAlchemy PublicModelMixin）\n├── customer_model.py          # 客户模型（SQLAlchemy）\n├── user_credit_limit.py       # 授信额度模型（SQLAlchemy）\n├── purchase_model.py          # 采购模型（SQLAlchemy）\n├── station_customer_models.py # 站点客户模型\n└── ...                        # 60+模型文件\n```\n\n### 1.2 基础模型类\n\n**SQLAlchemy 通用基类 `PublicModelMixin`**：\n\n```python\n# common/mysql/models/base_model.py\nfrom common.mysql_session import Base\nfrom sqlalchemy import Column, String\nfrom sqlalchemy.dialects.mysql import TINYINT, DATETIME, INTEGER\n\nclass PublicModelMixin(Base):\n    \"\"\"SQLAlchemy 通用基类，提供公共字段\"\"\"\n    __abstract__ = True\n\n    id = Column(INTEGER(11, unsigned=True), primary_key=True, autoincrement=True, doc=\"主键id\")\n    pstatus = Column(TINYINT(1, unsigned=True), default=0, doc=\"逻辑删除，默认0:正常，1:已删\")\n    create_time = Column(DATETIME, default=datetime.now, doc=\"创建时间\")\n    modify_time = Column(DATETIME, default=datetime.now, doc=\"最后修改时间\")\n    group_id = Column(INTEGER(11, unsigned=True), doc=\"租户id\")\n\nclass StationModelMixin(Base):\n    \"\"\"站点相关模型基类\"\"\"\n    __abstract__ = True\n    station_id = Column(String(12), nullable=False, doc=\"站点ID\")\n```\n\n### 1.3 SQLAlchemy Session 体系\n\n**common/mysql_session/ 是MySQL访问的核心基础设施**，提供多库读写分离的Session工厂：\n\n| Session | 数据库 | 用途 |\n|---------|--------|------|\n| `StationDbReadSession` / `StationDbWriteSession` | xnn_core_product_2 | 站点核心数据 |\n| `MaDbReadSession` / `MaDbWriteSession` | management | 管理后台数据 |\n| `OrderDbReadSession` / `OrderDbWriteSession` | TDSQL订单库 | 订单数据（读写分离） |\n| `SortDbReadSession` / `SortDbWriteSession` | sorting | 分拣数据 |\n| `DeliveryDbReadSession` / `DeliveryDbWriteSession` | delivery | 配送数据 |\n| `InventoryDbReadSession` / `InventoryDbWriteSession` | inventory | 库存数据 |\n| `TurnoverDbReadSession` / `TurnoverDbWriteSession` | turnover | 周转数据 |\n| `PurchaseNewDbReadSession` / `PurchaseNewDbWriteSession` | purchase | 采购数据 |\n| `OtherDbReadSession` / `OtherDbWriteSession` | extra/other | 其他业务数据 |\n| `ProcessDbReadSession` / `ProcessDbWriteSession` | extra/process | 加工数据 |\n\n**使用方式**：\n\n```python\nfrom common.mysql_session import StationDbReadSession, StationDbWriteSession\n\n# 读操作\nsession = StationDbReadSession()\nresult = session.query(UserCreditLimit).filter_by(customer_id=1001).first()\n\n# 写操作\nsession = StationDbWriteSession()\ntry:\n    record = UserCreditLimit(customer_id=1001, credit_limit=5000)\n    session.add(record)\n    session.commit()\nexcept Exception:\n    session.rollback()\n    raise\n```\n\n### 1.4 模型定义规范\n\n**必须遵守**：\n- ✅ 所有字段必须有 `doc=` 注释\n- ✅ 使用有意义的字段名（小写+下划线）\n- ✅ `__tablename__` 明确指定表名\n- ✅ 新模型继承 `PublicModelMixin` 获得公共字段\n\n**代码示例**：\n\n```python\n# common/mysql/models/user_credit_limit.py\nfrom sqlalchemy import Column, Numeric\nfrom sqlalchemy.dialects.mysql import INTEGER, TINYINT\nfrom common.mysql_session import Base\n\nclass UserCreditLimit(Base):\n    \"\"\"用户授信额度表\"\"\"\n\n    __tablename__ = \"tbl_credit_limit\"\n\n    id = Column(INTEGER(11, unsigned=True), primary_key=True, doc=\"主键ID\")\n    customer_id = Column(INTEGER(11, unsigned=True), doc=\"客户ID\")\n    is_credit = Column(TINYINT(1), default=0, doc=\"是否授信，0:否 1:是\")\n    credit_limit = Column(Numeric(10, 2), doc=\"授信额度\")\n    credit_used = Column(Numeric(10, 2), doc=\"已用额度\")\n    pstatus = Column(TINYINT(1), default=0, doc=\"逻辑删除，0:正常 1:已删\")\n```\n\n### 1.5 SrvBase 服务基类\n\n`common/mysql/new_base.py` 提供了 `SrvBase` 基类，封装了常用的 CRUD 操作：\n\n```python\nfrom common.mysql.new_base import SrvBase\n\nclass UserCreditLimitSrv(SrvBase):\n    _model = UserCreditLimit\n    _sess = StationDbReadSession\n\n    def find_by_customer(self, customer_id):\n        return self._sess().query(self._model).filter_by(\n            customer_id=customer_id, pstatus=0\n        ).first()\n```\n\n**SrvBase 支持 MongoDB 风格过滤**：`$gte`、`$in`、`$ne` 等操作符。\n\n---"
    },
    {
     "heading": "2. Django ORM 模型规范（辅助模式）",
     "content": "### 2.1 BaseModel\n\n**实际的 Django BaseModel 只提供 id 和分页功能**：\n\n```python\n# common/mysql/models/base_model.py\nclass BaseModel(models.Model):\n    \"\"\"Django ORM 基础模型类\"\"\"\n    id = models.AutoField(db_column=\"id\", primary_key=True)\n    pagination = None\n\n    class Meta:\n        abstract = True\n\n    @classmethod\n    def paginator(cls):\n        \"\"\"返回 Paginator QuerySet，支持游标分页\"\"\"\n        return Paginator(cls)\n\n    def to_dict(self, *fields):\n        \"\"\"把model数据转换成字典\"\"\"\n        # ...\n```\n\n**注意**：Django BaseModel 没有 `created_at`、`updated_at`、`is_deleted` 字段。这些字段在 SQLAlchemy 的 `PublicModelMixin` 中以 `create_time`、`modify_time`、`pstatus` 形式存在。\n\n### 2.2 使用场景\n\nDjango ORM 主要用于以下场景：\n- `Paginator` 游标分页（`BaseModel.paginator().filter(...).get_page(10)`）\n- Django Admin 管理后台\n- `website/utils/models.py` 中的权限模型（`UserPermission`、`TblStationPermission`）\n\n### 2.3 Django 模型示例\n\n```python\nfrom django.db import models\nfrom common.mysql.models.base_model import BaseModel\n\nclass UserPermission(BaseModel):\n    \"\"\"用户权限模型\"\"\"\n\n    user_id = models.IntegerField(verbose_name='用户ID')\n    permission_code = models.CharField(max_length=64, verbose_name='权限代码')\n    station_id = models.CharField(max_length=12, verbose_name='站点ID')\n\n    class Meta:\n        db_table = 'tb_user_permission'\n        verbose_name = '用户权限'\n```\n\n---"
    },
    {
     "heading": "3. MongoDB 文档规范",
     "content": "### 3.1 连接工厂\n\n`common/mongo_client.py` 提供 MongoDB 连接：\n\n```python\nfrom common.mongo_client import (\n    DefaultMongoDB,      # xnn_core_product_2（默认）\n    ProductMongoDB,      # 商品库\n    SortingMongoDB,      # 分拣库\n    DeliveryMongoDB,     # 配送库\n    PurchaseMongoDB,     # 采购库\n    InventoryMongoDB,    # 库存库（支持readonly读从库）\n    MerchandiseMongoDB,  # 商品服务库\n    OtherMongoDB,        # 其他库\n)\n```\n\n### 3.2 Collection 获取\n\n`common/collections.py` 定义 Collection 获取函数：\n\n```python\n# common/collections.py\ndef SalemenuConn():\n    conn_db = DefaultMongoDB()\n    return conn_db[\"salemenu\"]\n\ndef OrderConn():\n    conn_db = DefaultMongoDB()\n    return conn_db[\"order\"]\n\ndef StationConn():\n    conn_db = DefaultMongoDB()\n    return conn_db[\"station\"]\n```\n\n### 3.3 服务层模式\n\n`common/mongo/base_srv.py` 提供 `MongoBaseSrv` 基类：\n\n```python\nclass MongoBaseSrv:\n    \"\"\"MongoDB 服务基类\"\"\"\n    conn = None  # 子类通过类变量指定 Collection\n\n    def find(self, query, cols=None, **kwargs):\n        \"\"\"查询文档列表\"\"\"\n        return self.conn.find(query, cols, **kwargs)\n\n    def find_one(self, query, cols=None):\n        \"\"\"查询单个文档\"\"\"\n        return self.conn.find_one(query, cols)\n\n    def insert_one(self, doc):\n        \"\"\"插入单个文档\"\"\"\n        return self.conn.insert_one(doc)\n\n    def update_one(self, query, update):\n        \"\"\"更新单个文档\"\"\"\n        return self.conn.update_one(query, update)\n\n    def bulk_write(self, operations):\n        \"\"\"批量写入\"\"\"\n        return self.conn.bulk_write(operations)\n```\n\n**服务类示例**：\n\n```python\n# common/mongo/salemenu.py\nfrom common.collections import SalemenuConn, SalemenuSnapshotConn\n\nclass SalemenuService(object):\n    conn = SalemenuConn()\n    snapshot_conn = SalemenuSnapshotConn()\n\n    def find_by_ids(self, salemenu_ids, cols=None):\n        query = {\"_id\": {\"$in\": salemenu_ids}}\n        return list(self.conn.find(query, cols))\n\n    def get_by_id(self, salemenu_id):\n        return self.conn.find_one({\"_id\": salemenu_id})\n```\n\n---"
    },
    {
     "heading": "4. 命名规范",
     "content": "### 4.1 表名规范\n\n| ORM类型 | 格式 | 示例 |\n|---------|------|------|\n| SQLAlchemy | `tbl_<模块>_<实体>` 或 `tb_<模块>_<实体>` | `tbl_credit_limit`、`tb_user_permission` |\n| Django ORM | `tb_<模块>_<实体>` | `tb_user_permission` |\n\n### 4.2 字段名规范\n\n**格式**：`小写+下划线`\n\n| 字段类型 | 命名规范 | 示例 |\n|---------|---------|------|\n| 普通字段 | `描述性名称` | `customer_name` |\n| 外键字段 | `<实体>_id` | `station_id` |\n| 时间字段（SQLAlchemy） | `<操作>_time` | `create_time`、`modify_time` |\n| 布尔字段 | `is_<描述>` | `is_credit` |\n| 逻辑删除（SQLAlchemy） | `pstatus` | `0:正常，1:已删` |\n| 租户字段 | `group_id` | 租户隔离 |\n| 数量字段 | `<实体>_count` | `order_count` |\n\n---"
    },
    {
     "heading": "5. 查询优化",
     "content": "### 5.1 SQLAlchemy 查询优化\n\n```python\n# ✅ 正确：只查询需要的字段\nsession = StationDbReadSession()\nresults = session.query(\n    UserCreditLimit.customer_id,\n    UserCreditLimit.credit_limit\n).filter_by(pstatus=0).all()\n\n# ✅ 正确：批量查询\nresults = session.query(UserCreditLimit).filter(\n    UserCreditLimit.customer_id.in_([1001, 1002, 1003])\n).all()\n\n# ❌ 错误：循环中查询\nfor cid in customer_ids:\n    session.query(UserCreditLimit).filter_by(customer_id=cid).first()\n```\n\n### 5.2 Django ORM 查询优化\n\n```python\n# ✅ 正确：使用select_related\norders = Order.objects.select_related('customer', 'station').filter(status=1)\n\n# ✅ 正确：使用only()\norders = Order.objects.only('order_id', 'customer_id', 'total_amount').filter(status=1)\n\n# ✅ 正确：批量创建\nOrder.objects.bulk_create([Order(**d) for d in data_list])\n```\n\n---"
    },
    {
     "heading": "6. 事务管理规范",
     "content": "### 6.1 SQLAlchemy 事务\n\n```python\nfrom common.mysql_session import StationDbWriteSession\n\nsession = StationDbWriteSession()\ntry:\n    record = UserCreditLimit(customer_id=1001, credit_limit=5000)\n    session.add(record)\n    session.commit()\nexcept Exception:\n    session.rollback()\n    raise\n```\n\n### 6.2 Django 事务\n\n```python\nfrom django.db import transaction\n\n@transaction.atomic\ndef create_order_with_details(order_data, details_data):\n    order = Order.objects.create(**order_data)\n    for detail in details_data:\n        OrderDetail.objects.create(order=order, **detail)\n    return order\n```\n\n### 6.3 事务隔离\n\n**事务中禁止的操作**：\n- ❌ 禁止在事务中调用外部服务（RMI、MQ）\n- ❌ 禁止在事务中进行耗时操作\n- ❌ 禁止在事务中捕获异常不处理\n\n**注意**：`CommonBaseView.dispatch()` 在异常时会自动 rollback 所有 WriteSession（9个数据库），无需手动处理视图级事务回滚。\n\n---"
    },
    {
     "heading": "7. 检查清单",
     "content": "### 模型定义检查\n\n- [ ] SQLAlchemy模型：字段有 `doc=` 注释\n- [ ] Django模型：字段有 `verbose_name`\n- [ ] 明确指定 `__tablename__`（SQLAlchemy）或 `db_table`（Django）\n- [ ] 选择正确的Session（读/写、对应数据库）\n- [ ] 逻辑删除使用 `pstatus` 字段过滤\n\n### 查询操作检查\n\n- [ ] 避免了N+1查询（批量查询或join）\n- [ ] 写操作有commit/rollback处理\n- [ ] 选择了正确的ReadSession或WriteSession\n- [ ] 批量操作使用 `bulk_create` 或 `bulk_write`\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-03-19"
    }
   ]
  },
  {
   "id": ".claude--specs--developer--服务分层规范.spec",
   "title": "GM服务分层规范",
   "category": "specs-developer",
   "path": ".claude/specs/developer/服务分层规范.spec.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# GM服务分层规范"
    },
    {
     "heading": "规范目的",
     "content": "定义GM项目的分层架构，明确各层职责边界，确保代码架构清晰、可维护。"
    },
    {
     "heading": "适用范围",
     "content": "适用于所有GM项目的Django应用开发，包括gm_service、gm_server_order、gm_web_stock等服务。\n\n---"
    },
    {
     "heading": "1. 分层架构总览",
     "content": "### 1.1 架构图\n\n```\n┌─────────────────────────────────────────────────────────────┐\n│                    website/ (API Layer)                      │\n│                    HTTP接口处理层                             │\n│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │\n│  │ station/    │  │ openapi/    │  │ account/    │          │\n│  │  views/     │  │  views/     │  │  views/     │          │\n│  │  dals/      │  │  dals/      │  │  service/   │          │\n│  └─────────────┘  └─────────────┘  └─────────────┘         │\n└────────────────────────┬────────────────────────────────────┘\n                         │ 调用\n                         ▼\n┌─────────────────────────────────────────────────────────────┐\n│                    service/ (Business Layer)                  │\n│                    业务逻辑层（轻量级，跨模块协调）            │\n│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │\n│  │ order/      │  │ dals/       │  │ date_utils  │          │\n│  └─────────────┘  └─────────────┘  └─────────────┘         │\n└────────────────────────┬────────────────────────────────────┘\n                         │ 调用\n                         ▼\n┌─────────────────────────────────────────────────────────────┐\n│                    common/ (Infrastructure Layer)             │\n│                    基础设施层                                 │\n│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │\n│  │mysql/    │ │mongo/    │ │redis/    │ │service/  │        │\n│  │models/   │ │base_srv  │ │redis_   │ │(RMI客户端)│       │\n│  │session/  │ │salemenu  │ │client   │ │order_srv │        │\n│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │\n└─────────────────────────────────────────────────────────────┘\n```\n\n---"
    },
    {
     "heading": "2. website/ 层规范",
     "content": "### 2.1 职责定义\n\n**website/** 是HTTP接口处理层，负责：\n- ✅ 接收和验证HTTP请求（param_check_dict + Param）\n- ✅ 调用dals/、service/或common/执行业务逻辑\n- ✅ 格式化返回响应（JsonSuccessResponse / JsonErrorResponse）\n- ✅ 异常处理和日志记录\n\n### 2.2 结构规范\n\n**模块内分层**（大多数模块采用）：\n\n```\nwebsite/<module>/\n├── __init__.py\n├── views/                     # 视图文件\n│   ├── order.py              # 按业务分组\n│   ├── order_batch.py\n│   └── ...\n├── dals/                      # 数据访问层（模块内）\n│   ├── order.py\n│   ├── order_sku.py\n│   └── ...\n├── service/                   # 业务逻辑（模块内，可选）\n├── urls.py                    # URL路由\n├── define.py                  # 常量定义（可选）\n└── tests/                     # 测试（可选）\n```\n\n### 2.3 视图基类\n\n| 基类 | 位置 | 用途 |\n|------|------|------|\n| **CommonBaseView** | `website.station.views.common` | 标准业务视图（登录+站点+权限） |\n| **NoLoginView** | `website.station.views.common` | 无需登录的视图 |\n| **OpenBaseView** | `website.openapi.views.common` | OpenAPI（access_token校验） |\n| **BasePermitView** | `website.utils.views.base` | 登录校验基类 |\n\n### 2.4 强制规范\n\n**必须遵守**：\n- ✅ 使用 CommonBaseView 或其子类作为视图基类\n- ✅ 使用 param_check_dict + Param 进行参数校验\n- ✅ 统一使用 JsonSuccessResponse / JsonErrorResponse 返回\n- ✅ 统一异常处理（dispatch中自动捕获）\n\n**禁止事项**：\n- ❌ 禁止在website/中编写大量复杂业务逻辑（应放入dals/或service/）\n- ❌ 禁止跨模块调用（station/不能直接调用openapi/的内部代码）\n\n### 2.5 代码示例\n\n```python\n# website/station/views/order.py\nfrom common.param_check import Param\nfrom website.station.views.common import CommonBaseView\nfrom website.station.views.permissions import UserPermissionView\n\nclass OrderListView(CommonBaseView):\n    \"\"\"订单列表视图\"\"\"\n\n    param_check_dict = {\n        \"status\": Param(int, optional=True, default=0),\n        \"offset\": Param(int, optional=True, default=0),\n        \"limit\": Param(int, optional=True, default=20, min_=1, max_=100),\n    }\n\n    @UserPermissionView.get(\"order\")\n    def get(self, request):\n        status = self.params.get(\"status\")\n        offset = self.params[\"offset\"]\n        limit = self.params[\"limit\"]\n\n        # 调用 DAL 获取数据\n        orders = order_dal.get_order_list(\n            station_id=self.station_id,\n            status=status,\n            offset=offset,\n            limit=limit,\n        )\n\n        return self.JsonSuccessResponse(data_dict=orders)\n```\n\n---"
    },
    {
     "heading": "3. service/ 层规范",
     "content": "### 3.1 职责定义\n\n**service/** 是轻量级业务逻辑层，负责：\n- ✅ 跨模块协调\n- ✅ 调用common/的数据访问层\n- ✅ 业务规则校验\n\n### 3.2 当前结构\n\n```\nservice/\n├── dals/                        # 数据访问服务\n│   ├── order_backend_transport.py\n│   ├── order_deliver_info.py    # 配送信息（含MQ发送）\n│   └── settlement.py\n├── order/                       # 订单业务模块\n│   ├── distribute_type.py       # 配送类型\n│   ├── excel_processing.py      # Excel处理\n│   └── real_quantity.py         # 实际数量计算\n├── date_utils.py\n└── log.py\n```\n\n### 3.3 强制规范\n\n**必须遵守**：\n- ✅ 业务逻辑返回数据对象，不返回HTTP响应\n- ✅ 通过common/访问数据库\n\n**禁止事项**：\n- ❌ 禁止在service/中处理HTTP请求\n- ❌ 禁止在service/中直接返回HTTP响应\n\n---"
    },
    {
     "heading": "4. common/ 层规范",
     "content": "### 4.1 职责定义\n\n**common/** 是基础设施层，负责：\n- ✅ 数据模型定义（SQLAlchemy + Django ORM）\n- ✅ SQLAlchemy Session 工厂（mysql_session/）\n- ✅ MongoDB 服务（mongo/）\n- ✅ Redis 缓存操作（redis/、redis_client.py）\n- ✅ RMI 客户端管理（service/）\n- ✅ 中间件（middleware/）\n- ✅ 参数校验（param_check.py）\n- ✅ 全局枚举与常量（global_val.py）\n- ✅ 公共工具函数（util.py）\n\n### 4.2 结构规范\n\n```\ncommon/\n├── mysql/                      # MySQL模型与服务\n│   ├── models/                 # SQLAlchemy + Django ORM 模型\n│   ├── service/                # 数据访问服务\n│   └── new_base.py             # SrvBase 服务基类\n├── mysql_session/              # SQLAlchemy Session工厂 ⭐\n├── mongo/                      # MongoDB服务\n├── mongo_client.py             # MongoDB连接工厂\n├── collections.py              # MongoDB Collection获取\n├── redis/                      # Redis业务操作\n├── redis_client.py             # Redis连接池\n├── service/                    # RMI客户端 ⭐\n│   └── __init__.py             # 20+服务客户端\n├── middleware/                  # 中间件\n├── mq/                         # 营销互动MQ\n├── mq_client.py                # mqlib初始化\n├── param_check.py              # Param + ParamChecker + GmError\n├── config.py                   # 配置中心\n├── global_val.py               # 枚举常量\n├── async_operate.py            # 异步操作日志\n└── util.py                     # 工具函数\n```\n\n### 4.3 强制规范\n\n**必须遵守**：\n- ✅ MySQL模型定义在common/mysql/models/\n- ✅ MongoDB服务定义在common/mongo/\n- ✅ RMI客户端通过common/service/管理\n\n**禁止事项**：\n- ❌ 禁止在common/中处理HTTP请求\n- ❌ 禁止在common/中返回HTTP响应\n\n---"
    },
    {
     "heading": "5. 跨层调用规范",
     "content": "### 5.1 调用规则\n\n```\n┌─────────────┐\n│  website/   │  可以调用：模块内dals/、service/、common/\n│  (API层)    │  禁止：直接操作数据库、跨模块调用\n└──────┬──────┘\n       │ 调用\n       ▼\n┌─────────────┐\n│  service/   │  可以调用：common/\n│  (业务层)   │  禁止：调用website/、处理HTTP\n└──────┬──────┘\n       │ 调用\n       ▼\n┌─────────────┐\n│  common/    │  可以调用：SQLAlchemy、pymongo、redis、外部服务\n│  (基础设施) │  禁止：调用website/、service/\n└─────────────┘\n```\n\n### 5.2 正确示例\n\n```python\n# ✅ 正确：website/ → 模块内dals/ → common/\n# website/station/views/order.py\nfrom website.station.dals.order import get_order_list\n\nclass OrderListView(CommonBaseView):\n    def get(self, request):\n        orders = get_order_list(self.station_id, self.params)\n        return self.JsonSuccessResponse(data_dict=orders)\n\n# website/station/dals/order.py\nfrom common.mysql_session import OrderDbReadSession\nfrom common.service import order_srv\n\ndef get_order_list(station_id, params):\n    session = OrderDbReadSession()\n    # 使用 SQLAlchemy 查询\n    results = session.query(OrderModel).filter_by(station_id=station_id).all()\n    return results\n```\n\n```python\n# ✅ 正确：跨服务调用使用 RMI 客户端\nfrom common.service import order_srv\n\nresult = order_srv.create_v2(\n    customer=customer_data,\n    station=station_data,\n    products=products_data,\n)\n```\n\n### 5.3 错误示例\n\n```python\n# ❌ 错误1：website/直接操作数据库\nclass OrderView(CommonBaseView):\n    def post(self, request):\n        session = StationDbWriteSession()\n        session.add(SomeModel(...))  # 应该在dals/中\n        session.commit()\n\n# ❌ 错误2：common/调用website/\n# common/some_module.py\nfrom website.station.views.order import OrderView  # 禁止！\n\n# ❌ 错误3：跨模块直接导入\n# website/station/views/order.py\nfrom website.openapi.views.order import some_function  # 禁止！\n```\n\n### 5.4 模块内分层模式\n\n大部分业务逻辑通过模块内分层实现（特别是 `website/station/`）：\n\n```\nwebsite/station/\n├── views/order.py          # 接收请求、参数校验、返回响应\n├── dals/order.py           # 数据访问、查询拼装、数据转换\n└── dals/order_sku.py       # SKU相关数据访问\n```\n\n这是合法的架构模式，只要：\n- views/ 只做参数校验和响应格式化\n- dals/ 负责数据访问和简单数据转换\n- 复杂跨模块逻辑放入顶层 service/\n\n---"
    },
    {
     "heading": "6. 服务间通信规范",
     "content": "### 6.1 通信方式\n\n| 场景 | 调用方式 | 说明 |\n|------|---------|------|\n| 服务内调用 | 直接导入 | `from common.service import order_srv` |\n| 跨服务HTTP/RPC | gm_rmiclient | `order_srv.create_v2(...)` |\n| 跨服务gRPC | ceres proto | `from ceres.databi.proto import databi_pb2_grpc` |\n| 异步消息 | mqlib | `Channel(uid, gid).prepare(topic, data).send()` |\n\n### 6.2 RMI 客户端使用\n\nRMI 客户端在 `common/service/__init__.py` 中集中初始化：\n\n```python\n# common/service/__init__.py\nfrom gm_rmiclient.order import OrderService\nfrom common.config import config\n\norder_host = config.domains.internal.service[\"order\"]\norder_srv = OrderService(order_host)\n\n# 使用方\nfrom common.service import order_srv\nresult = order_srv.create_v2(customer=..., station=..., products=...)\n```\n\n---"
    },
    {
     "heading": "7. 检查清单",
     "content": "### 代码开发前\n\n- [ ] 确认代码应该放在哪一层（views/、dals/、service/、common/）\n- [ ] 确认是否需要跨模块或跨服务调用\n- [ ] 选择正确的视图基类\n\n### 代码开发后\n\n- [ ] views/代码：只处理HTTP参数和响应，不包含复杂逻辑\n- [ ] dals/代码：数据访问清晰，使用正确的Session\n- [ ] 跨层调用：符合单向调用规则\n- [ ] 跨服务调用：使用common/service中的RMI客户端\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-03-19"
    }
   ]
  },
  {
   "id": ".claude--specs--developer--视图层规范.spec",
   "title": "GM视图层规范",
   "category": "specs-developer",
   "path": ".claude/specs/developer/视图层规范.spec.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# GM视图层规范"
    },
    {
     "heading": "规范目的",
     "content": "定义GM项目的视图层开发规范，包括视图基类体系、参数校验、响应格式、权限控制和异常处理。"
    },
    {
     "heading": "适用范围",
     "content": "适用于所有GM项目中 website/ 目录下的视图开发。\n\n---"
    },
    {
     "heading": "1. 视图基类体系",
     "content": "### 1.1 基类继承关系\n\n```\nDjango View\n    ├── BasePermitView (website/utils/views/base.py)\n    │   └── CommonBaseView (website/station/views/common.py)\n    │       = BasePermitView + ParamCheckMixin + FormAjaxResponseMixin\n    │\n    ├── NoLoginView (website/station/views/common.py)\n    │   = View + ParamCheckMixin + FormAjaxResponseMixin（无需登录）\n    │\n    ├── OpenBaseView (website/openapi/views/common.py)\n    │   = 独立基类（access_token认证）\n    │\n    └── FormatParamsBaseView (website/station/views/common.py)\n        = View + FormAjaxResponseMixin（旧式参数校验，不推荐新代码使用）\n```\n\n### 1.2 基类选择指南\n\n| 场景 | 基类 | 说明 |\n|------|------|------|\n| 标准业务接口（需登录+站点） | `CommonBaseView` | 最常用，自动校验登录和站点 |\n| 无需登录的接口 | `NoLoginView` | 公开接口，如某些回调 |\n| 开放API接口 | `OpenBaseView` | 第三方对接，access_token认证 |\n| 旧式参数校验接口 | `FormatParamsBaseView` | 不推荐新代码使用 |\n\n### 1.3 CommonBaseView 核心能力\n\n**CommonBaseView** 是最常用的视图基类，继承自 `BasePermitView` + `ParamCheckMixin` + `FormAjaxResponseMixin`，在 `__init__` 和 `dispatch` 中自动完成：\n\n1. **登录校验**：验证用户已登录（Session）\n2. **站点加载**：自动加载 `self.station_id`、`self.station`（从MongoDB）\n3. **参数校验**：根据 `param_check_dict` 自动校验参数到 `self.params`\n4. **权限类型**：自动设置 `self.permission_type`（Normal/ToC/Retail）\n5. **异常处理**：dispatch中统一捕获异常，自动rollback所有WriteSession\n6. **请求日志**：自动记录请求和响应日志\n\n**自动注入的实例属性**：\n\n| 属性 | 类型 | 说明 |\n|------|------|------|\n| `self.station_id` | str | 当前站点ID |\n| `self.station` | dict | 当前站点信息（从MongoDB加载） |\n| `self.group_id` | int | 当前租户ID（partner_id） |\n| `self.userid` | int | 当前用户ID |\n| `self.username` | str | 当前用户名 |\n| `self.client` | str | 客户端标识（HTTP_X_DEMO_CLIENT） |\n| `self.permission_type` | int | 权限类型 |\n| `self.params` | dict | 校验后的请求参数 |\n| `self.request_param` | dict | 原始请求参数字典 |\n\n---"
    },
    {
     "heading": "2. 参数校验",
     "content": "### 2.1 param_check_dict 声明式校验\n\n**核心机制**：在视图类中定义 `param_check_dict` 字典，`ParamCheckMixin` 在 `dispatch` 时自动校验所有参数到 `self.params`。\n\n```python\nfrom common.param_check import Param\n\nclass OrderListView(CommonBaseView):\n    param_check_dict = {\n        \"status\": Param(int, optional=True, default=0),\n        \"customer_id\": Param(int, optional=True),\n        \"offset\": Param(int, optional=True, default=0),\n        \"limit\": Param(int, optional=True, default=20, min_=1, max_=100),\n        \"q\": Param(str, optional=True, default=\"\"),\n        \"is_retail_interface\": Param(int, optional=True, min_=0, max_=1),\n    }\n```\n\n### 2.2 Param 参数说明\n\n```python\nParam(\n    param_type,         # 类型：int, str, float, bool, list, dict\n    optional=False,     # 是否可选，默认False（必填）\n    default=None,       # 默认值（optional=True时有效）\n    min_=None,          # 最小值（int/float有效）\n    max_=None,          # 最大值（int/float有效）\n    edit=False,         # 是否为编辑模式参数\n    allow_space=True,   # 是否允许空格（str有效）\n)\n```\n\n### 2.3 ParamChecker 内置类型\n\n| 类型 | 方法 | 说明 |\n|------|------|------|\n| `int` | `ParamChecker.check_int` | 整数校验，支持min_/max_ |\n| `str` | `ParamChecker.check_str` | 字符串校验 |\n| `float` | `ParamChecker.check_float` | 浮点数校验 |\n| `bool` | `ParamChecker.check_bool` | 布尔值校验 |\n| `list` | `ParamChecker.check_list` | 列表校验（JSON解析） |\n| `dict` | `ParamChecker.check_dict` | 字典校验（JSON解析） |\n| `date` | `ParamChecker.check_date` | 日期校验 |\n| `datetime` | `ParamChecker.check_datetime` | 日期时间校验 |\n\n### 2.4 自定义校验函数\n\n当 `param_type` 不是内置类型时，作为自定义校验函数调用：\n\n```python\ndef validate_order_type(value):\n    \"\"\"自定义校验函数\"\"\"\n    v = int(value)\n    if v not in [1, 2, 3]:\n        raise GmError(ErrCode.param_err, \"无效的订单类型\")\n    return v\n\nclass OrderView(CommonBaseView):\n    param_check_dict = {\n        \"order_type\": Param(validate_order_type),\n    }\n```\n\n### 2.5 参数访问\n\n校验通过后，参数存储在 `self.params` 字典中：\n\n```python\ndef get(self, request):\n    status = self.params.get(\"status\")       # 可选参数用get\n    customer_id = self.params[\"customer_id\"]  # 必填参数直接取\n    offset = self.params[\"offset\"]\n    limit = self.params[\"limit\"]\n```\n\n---"
    },
    {
     "heading": "3. 响应格式",
     "content": "### 3.1 FormAjaxResponseMixin\n\n**website/utils/views/ajax.py** 中的 `FormAjaxResponseMixin` 提供统一响应方法：\n\n### 3.2 成功响应\n\n```python\n# 基本成功响应\nreturn self.JsonSuccessResponse(data_dict={\"order_id\": \"O001\"})\n# → {\"code\": 0, \"msg\": \"ok\", \"data\": {\"order_id\": \"O001\"}}\n\n# 无数据成功响应\nreturn self.JsonSuccessResponse()\n# → {\"code\": 0, \"msg\": \"ok\", \"data\": null}\n\n# 自定义消息\nreturn self.JsonSuccessResponse(data_dict=result, msg=\"创建成功\")\n# → {\"code\": 0, \"msg\": \"创建成功\", \"data\": {...}}\n\n# 带分页\nreturn self.JsonSuccessResponse(\n    data_dict=order_list,\n    pagination={\"count\": total, \"offset\": offset, \"limit\": limit}\n)\n# → {\"code\": 0, \"msg\": \"ok\", \"data\": [...], \"pagination\": {\"count\": 100, \"offset\": 0, \"limit\": 20}}\n```\n\n### 3.3 错误响应\n\n```python\n# 业务错误\nreturn self.JsonErrorResponse(msg=\"订单不存在\")\n# → {\"code\": 1, \"msg\": \"订单不存在\", \"data\": null}\n\n# 自定义错误码\nreturn self.JsonErrorResponse(msg=\"权限不足\", code=403)\n# → {\"code\": 403, \"msg\": \"权限不足\", \"data\": null}\n\n# 带数据的错误响应\nreturn self.JsonErrorResponse(msg=\"部分失败\", data={\"failed_ids\": [1, 2]})\n```\n\n---"
    },
    {
     "heading": "4. 权限控制",
     "content": "### 4.1 PermissionView 装饰器\n\n**website/utils/views/permissions.py** 中的 `PermissionView` 提供权限校验装饰器：\n\n```python\nfrom website.station.views.permissions import UserPermissionView\n\nclass OrderView(CommonBaseView):\n\n    @UserPermissionView.get(\"order\")\n    def get(self, request):\n        \"\"\"查看订单（需要order模块的查看权限）\"\"\"\n        pass\n\n    @UserPermissionView.add(\"order\")\n    def post(self, request):\n        \"\"\"创建订单（需要order模块的新增权限）\"\"\"\n        pass\n\n    @UserPermissionView.edit(\"order\")\n    def put(self, request):\n        \"\"\"编辑订单（需要order模块的编辑权限）\"\"\"\n        pass\n```\n\n### 4.2 权限方法\n\n| 方法 | 含义 | 示例 |\n|------|------|------|\n| `@UserPermissionView.get(\"module\")` | 查看权限 | 列表、详情查看 |\n| `@UserPermissionView.add(\"module\")` | 新增权限 | 创建记录 |\n| `@UserPermissionView.edit(\"module\")` | 编辑权限 | 修改记录 |\n| `@UserPermissionView.close(\"module\")` | 关闭权限 | 禁用/下架 |\n| `@UserPermissionView.delete(\"module\")` | 删除权限 | 删除记录 |\n| `@UserPermissionView.edit_with_auth_code(\"module\")` | 授权码编辑 | 无权限时通过授权码操作 |\n\n### 4.3 多权限组合\n\n```python\n# OR逻辑：拥有其中一个权限即可\n@UserPermissionView.edit(\"base_setting\", \"shop_setting\", logic_op=\"or\")\ndef post(self, request):\n    pass\n\n# AND逻辑：必须同时拥有所有权限\n@UserPermissionView.edit(\"base_setting\", \"shop_setting\", logic_op=\"and\")\ndef post(self, request):\n    pass\n```\n\n### 4.4 数据可见性\n\n**website/utils/data_visibility/decorator.py** 中的 `protect_fields` 装饰器按权限过滤返回字段：\n\n```python\nfrom website.utils.data_visibility.decorator import protect_fields\n\nclass OrderDetailView(CommonBaseView):\n\n    @protect_fields\n    def get(self, request):\n        order_data = get_order_detail(...)\n        return self.JsonSuccessResponse(data_dict=order_data)\n        # protect_fields 会根据 self.user_permission 自动过滤敏感字段\n```\n\n---"
    },
    {
     "heading": "5. 异常处理",
     "content": "### 5.1 GmError 异常体系\n\n```python\nfrom common.param_check import GmError, ErrCode\n\n# 业务异常\nraise GmError(ErrCode.business_err, \"客户不存在\")\n\n# 参数异常\nraise GmError(ErrCode.param_err, \"缺少customer_id参数\")\n\n# 带数据的异常\nraise GmError(ErrCode.business_err, \"部分商品无库存\", data={\"sku_ids\": [1, 2]})\n```\n\n### 5.2 dispatch 自动异常处理\n\n`CommonBaseView.dispatch()` 自动处理所有异常：\n\n| 异常类型 | 处理方式 | HTTP状态码 |\n|---------|---------|-----------|\n| `GmError` | `JsonErrorResponse(str(e), code=e.err_code)` | 200 |\n| `RequestError`（RMI） | `JsonErrorResponse(str(e))` | 200 |\n| `SQLAlchemyError` / `PyMongoError` / `RedisError` | `JsonErrorResponse(\"系统繁忙，稍后再试\")` | 200 |\n| 其他Exception | `JsonErrorResponse(\"系统繁忙，稍后再试\")` | 550 |\n\n**异常时自动 rollback**：所有 9 个 WriteSession（Station、Ma、Other、Delivery、Sort、Inventory、Process、Order、Turnover）。\n\n### 5.3 @exception_resp 装饰器\n\n对于需要在单个方法级别捕获异常的场景：\n\n```python\nfrom website.station.views.common import exception_resp\n\nclass SomeView(CommonBaseView):\n\n    @exception_resp\n    def get(self, request):\n        # 如果此方法抛出异常，会被捕获并返回JsonErrorResponse\n        pass\n```\n\n---"
    },
    {
     "heading": "6. URL路由",
     "content": "### 6.1 路由注册\n\n在 `website/weburls.py` 中通过 `include()` 挂载各模块：\n\n```python\n# website/weburls.py\nfrom django.conf.urls import re_path, include\n\nurlpatterns = [\n    re_path(r'^station/', include('website.station.urls', namespace='station')),\n    re_path(r'^gm_account/', include('website.account.urls', namespace='account')),\n    re_path(r'^openapi/', include('website.openapi.urls', namespace='openapi')),\n    re_path(r'^merchandise/', include('website.merchandise.urls', namespace='merchandise')),\n    # ...\n]\n```\n\n### 6.2 模块内路由\n\n```python\n# website/station/urls.py\nfrom django.conf.urls import re_path\nfrom website.station.views.order import OrderListView, OrderDetailView\n\nurlpatterns = [\n    re_path(r'^order/list$', OrderListView.as_view(), name='order_list'),\n    re_path(r'^order/detail$', OrderDetailView.as_view(), name='order_detail'),\n]\n```\n\n---"
    },
    {
     "heading": "7. 完整视图示例",
     "content": "```python\n# website/station/views/order.py\n\"\"\"订单视图模块\"\"\"\n\nimport logging\nfrom common.param_check import Param, GmError, ErrCode\nfrom website.station.views.common import CommonBaseView\nfrom website.station.views.permissions import UserPermissionView\nfrom website.station.dals.order import get_order_list, create_order\n\nlogger = logging.getLogger(\"station.views.order\")\n\n\nclass OrderListView(CommonBaseView):\n    \"\"\"订单列表\"\"\"\n\n    param_check_dict = {\n        \"status\": Param(int, optional=True, default=0),\n        \"q\": Param(str, optional=True, default=\"\"),\n        \"offset\": Param(int, optional=True, default=0),\n        \"limit\": Param(int, optional=True, default=20, min_=1, max_=100),\n    }\n\n    @UserPermissionView.get(\"order\")\n    def get(self, request):\n        result = get_order_list(\n            station_id=self.station_id,\n            group_id=self.group_id,\n            status=self.params.get(\"status\"),\n            q=self.params.get(\"q\"),\n            offset=self.params[\"offset\"],\n            limit=self.params[\"limit\"],\n        )\n        return self.JsonSuccessResponse(\n            data_dict=result[\"data\"],\n            pagination=result[\"pagination\"],\n        )\n\n\nclass CreateOrderView(CommonBaseView):\n    \"\"\"创建订单\"\"\"\n\n    param_check_dict = {\n        \"customer_id\": Param(int),\n        \"products\": Param(list),\n        \"receive_begin_time\": Param(str),\n        \"receive_end_time\": Param(str),\n        \"remark\": Param(str, optional=True, default=\"\"),\n    }\n\n    @UserPermissionView.add(\"order\")\n    def post(self, request):\n        order = create_order(\n            station_id=self.station_id,\n            group_id=self.group_id,\n            user_id=self.userid,\n            data=self.params,\n        )\n        return self.JsonSuccessResponse(data_dict=order)\n```\n\n---"
    },
    {
     "heading": "8. 检查清单",
     "content": "### 视图开发前\n\n- [ ] 选择正确的基类（CommonBaseView / NoLoginView / OpenBaseView）\n- [ ] 确认需要的权限级别\n- [ ] 定义完整的param_check_dict\n\n### 视图开发后\n\n- [ ] 参数校验覆盖所有输入\n- [ ] 使用JsonSuccessResponse/JsonErrorResponse统一返回\n- [ ] 权限装饰器正确使用\n- [ ] 业务逻辑不在视图中直接编写（放入dals/或service/）\n\n---\n\n**维护者**: GM架构团队\n**版本**: v1.0\n**最后更新**: 2026-03-19"
    }
   ]
  },
  {
   "id": ".claude--specs--product-manager--需求文档规范.spec",
   "title": "需求文档规范",
   "category": "specs-product",
   "path": ".claude/specs/product-manager/需求文档规范.spec.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# 需求文档规范"
    },
    {
     "heading": "规范目的",
     "content": "建立 GM-AI 产品经理角色统一的 PRD 格式标准，确保输出的需求文档结构清晰、内容完整、便于研发团队理解和实现。"
    },
    {
     "heading": "核心原则",
     "content": "⚠️ **产品经理的所有输出物统一为 PRD（产品需求文档）**。需求规模（M/L/XL）只决定 PRD 中需要体现的内容深度，不改变文档类型。"
    },
    {
     "heading": "适用范围",
     "content": "- GM-AI product-manager Agent 输出的所有 PRD\n- 从 TAPD 获取的需求转换\n- 人工描述的需求文档化\n- `/gm-prd` 命令触发的 M/L/XL 级产品分析产出\n\n---"
    },
    {
     "heading": "1. PRD 内容分级",
     "content": "GM-AI 根据任务规模自动决定 PRD 的内容深度：\n\n| 规模 | 对应 Skill | 内容深度 | 适用条件 |\n|------|-----------|---------|---------|\n| **M 级** | `requirement-card.md` | 精简 PRD：功能清单 + 改动说明 + 验收标准 | 单一功能点、1个模块、≤1个页面 |\n| **L 级** | `product-handoff.md` | 标准 PRD：+ 用户故事 + 业务规则 + 异常场景 | 多功能点或跨模块 |\n| **XL 级** | `prd-gen.md` | 完整 PRD：+ 优先级矩阵 + 非功能需求 + 风险评估 + 里程碑 | 跨服务/跨领域、架构级变更 |\n\n---"
    },
    {
     "heading": "2. 功能清单 —— 所有 PRD 必须包含",
     "content": "⚠️ **功能清单是 PRD 的核心入口**，开发、测试、产品通过功能清单快速理解需求全貌。\n\n```markdown"
    },
    {
     "heading": "功能清单",
     "content": "| 编号 | 功能名称 | 所属模块 | 功能类型 | 涉及页面 | 优先级 | 功能说明 |\n|------|---------|---------|---------|---------|--------|---------|\n| F1   | 功能A   | order   | 新增    | /station/order/list | P1 | 简要说明 |\n| F2   | 功能B   | stock   | 改造    | /station/stock/in   | P2 | 简要说明 |\n```\n\n**字段说明**：\n- **编号**：F1、F2、F3...，后续章节通过编号引用功能点\n- **所属模块**：GM 项目模块名（order、stock、account、merchandise 等）\n- **功能类型**：新增 / 改造\n- **涉及页面**：页面路径，新增页面用 `[新增]` 前缀\n- **优先级**：P0/P1/P2/P3\n- **功能说明**：一句话说明功能用途\n\n---"
    },
    {
     "heading": "3. 优先级定义",
     "content": "| 优先级 | 说明 | 响应时间 |\n|--------|------|----------|\n| P0 | 紧急，影响核心功能 | 立即处理 |\n| P1 | 重要，影响用户体验 | 24小时内 |\n| P2 | 一般，功能优化 | 本迭代内 |\n| P3 | 低，锦上添花 | 有空再处理 |\n\n---"
    },
    {
     "heading": "4. 编写规范",
     "content": "### 4.1 标题规范\n\n- ✅ 使用动宾结构：`新增客户标签筛选功能`、`优化订单导出性能`\n- ✅ 简洁明了：不超过 20 个字\n- ❌ 避免模糊描述：`一些改进`、`优化`\n\n### 4.2 描述规范\n\n- ✅ 使用用户视角描述\n- ✅ 包含使用场景\n- ✅ 说明业务价值\n- ✅ **明确解决方案逻辑**：禁止使用\"...或...\"、\"...等\"等不确定表述\n  - ❌ 错误示例：支持按 A 或 B 排序\n  - ✅ 正确示例：按 A 排序（A 规则：xxx）\n- ❌ 避免技术实现细节（数据模型、SQL、接口设计属于研发职责）\n\n### 4.3 验收标准规范\n\n1. **使用可验证的语句**\n   - ❌ \"体验更好\" → ✅ \"响应时间 < 500ms\"\n   - ❌ \"性能提升\" → ✅ \"支持 1000 并发用户\"\n\n2. **每条标准独立可测**\n\n3. **包含边界条件**\n   - 正常场景 + 异常场景\n   - 输入范围限制\n   - 错误处理方式\n\n4. **禁止模糊描述**\n\n### 4.4 状态类需求澄清\n\n⚠️ 涉及状态调整的需求必须在 PRD 中明确：\n\n| 方式 | 说明 | 示例 |\n|------|------|------|\n| 在现有字段新增值 | 在已有状态枚举中新增 | 在 `order_status` 新增\"已分配\" |\n| 新增状态字段 | 新增独立状态字段 | 新增 `assign_status` 字段 |\n\n### 4.5 交互说明规范\n\n涉及页面交互时，必须标注交互类型和页面路径：\n\n```markdown\n1. **[新增] 用户列表页** - `/station/user/list`\n   - 展示用户列表，支持搜索和分页\n\n2. **[改动] 订单详情页** - `/station/order/detail`\n   - 在现有页面增加\"分配\"按钮\n```\n\n### 4.6 功能改造对比规范\n\n功能类型为\"改造\"时，**仅列出有变化的内容**：\n\n```markdown"
    },
    {
     "heading": "功能对比",
     "content": "| 功能项 | 已有功能 | 变化后 | 变化类型 |\n|--------|---------|--------|----------|\n| 手机号 | 选填 | 必填 | 改动 |\n| 验证码 | 无此字段 | 新增6位验证码 | 新增 |\n```\n\n- ✅ 对比表格中**禁止**列出无变化的内容\n- ✅ 变化类型：新增 / 改动 / 删除\n\n### 4.7 跨模块业务联动规范\n\n⚠️ **涉及 ≥ 3 个模块联动的需求必须输出 Mermaid 流程图**\n\n**GM 模块定义**：order、stock、sorting、account、merchandise、management、open、bshop 等。\n\n**流程图要求**：\n- ✅ 用 subgraph 标注模块归属\n- ✅ 标注模块间的调用关系和数据流向\n- ✅ 标注判断分支和异常流程\n- ✅ 覆盖从触发到结束的全链路\n\n**示例**：\n\n```markdown"
    },
    {
     "heading": "业务流程",
     "content": "> 涉及 3 个模块联动：订单(order) → 库存(stock) → 分拣(sorting)\n\n```mermaid\nflowchart TD\n    subgraph order[订单模块]\n        A1[创建订单] --> A2[订单审核通过]\n    end\n\n    subgraph stock[库存模块]\n        B1[扣减库存] --> B2{库存是否充足?}\n        B2 -->|是| B3[扣减成功]\n        B2 -->|否| B4[通知缺货]\n    end\n\n    subgraph sorting[分拣模块]\n        C1[生成分拣任务] --> C2[分拣完成]\n    end\n\n    A2 -->|扣减库存| B1\n    B3 -->|推送分拣| C1\n    B4 -->|缺货通知| A2\n```​\n```\n\n---"
    },
    {
     "heading": "5. PRD 存储路径",
     "content": "### 5.1 目录结构\n\n```\ndocs/iterations/\n├── 2026-04-10_<需求名称>/           # 日期_需求名称\n│   ├── PRD.md                       # 产品需求文档（所有规模）\n│   ├── 影响分析.md                   # XL级附加产出\n│   ├── 技术要点.md                   # 研发产出\n│   └── review-report.md             # 审查报告\n```\n\n### 5.2 文件命名规范\n\n| 规模 | 输出方式 | 说明 |\n|------|---------|------|\n| M级 | PRD 直接输出到对话，不生成文件 | 内容精简，无需落盘 |\n| L级 | `PRD.md` | 写入 `docs/iterations/` 目录 |\n| XL级 | `PRD.md` + `影响分析.md` | 写入 `docs/iterations/` 目录 |\n\n---"
    },
    {
     "heading": "6. 各规模 PRD 内容要求",
     "content": "### 6.1 M 级 PRD — 精简版\n\n**必须包含**：功能清单 + 改动说明 + 验收标准 + 业务领域提示\n\n```markdown\n# [需求名称] PRD\n\n**优先级**: P1\n**日期**: 2026-04-10\n**规模**: M"
    },
    {
     "heading": "功能清单",
     "content": "| 编号 | 功能名称 | 所属模块 | 功能类型 | 涉及页面 | 功能说明 |\n|------|---------|---------|---------|---------|---------|\n| F1   | xxx     | order   | 改造    | /station/order/list | xxx |"
    },
    {
     "heading": "改动说明",
     "content": "（改造类附对比表格，新增类描述功能行为）"
    },
    {
     "heading": "验收标准",
     "content": "1. xxx\n2. xxx"
    },
    {
     "heading": "业务领域提示（待研发确认）",
     "content": "- 可能涉及：订单领域\n```\n\n### 6.2 L 级 PRD — 标准版\n\n在 M 级基础上**增加**：业务背景 + 用户故事 + 详细功能说明（前置条件、操作流程、业务规则、异常场景、交互说明） + 业务流程图（≥3 模块时）\n\n### 6.3 XL 级 PRD — 完整版\n\n在 L 级基础上**增加**：功能优先级矩阵 + 非功能需求 + 风险评估 + 里程碑建议 + 状态类需求澄清\n\n---"
    },
    {
     "heading": "7. 强制规范",
     "content": "⚠️ **必须遵守**：\n\n- ✅ **产品经理的所有输出物统一为 PRD**，规模只决定内容深度\n- ✅ **所有 PRD 都必须包含功能清单**，带编号（F1/F2/...）\n- ✅ **验收标准必须明确可验证**，禁止模糊表述\n- ✅ **需求描述必须从用户视角出发**，禁止包含技术实现细节\n- ✅ **功能改造必须提供对比表格**，仅列出变化内容\n- ✅ **跨模块需求（≥3 模块）必须输出 Mermaid 流程图**\n- ✅ **状态类需求必须澄清实现方式**"
    },
    {
     "heading": "8. 禁止事项",
     "content": "❌ **禁止**：\n- 禁止使用技术术语作为需求描述\n- 禁止验收标准使用模糊表述（\"体验更好\"、\"性能提升\"）\n- 禁止文档包含数据模型设计、接口设计、SQL 建议\n- 禁止跳过验收标准\n- 禁止功能对比列出无变化的内容\n- 禁止使用\"...或...\"等不确定表述\n\n---\n\n**维护者**: GM架构团队\n**版本**: v2.0\n**最后更新**: 2026-04-10"
    }
   ]
  },
  {
   "id": "CLAUDE",
   "title": "CLAUDE.md",
   "category": "overview",
   "path": "CLAUDE.md",
   "sections": [
    {
     "heading": "开篇",
     "content": "# CLAUDE.md\n\nThis file provides guidance to Claude Code (claude.ai/code) when working with code in this repository."
    },
    {
     "heading": "项目概述",
     "content": "gm_service 是演示公司微服务体系中的**业务平台主 View 层服务**，也是最大的 View 层项目。负责业务平台运营的订单、商品、报价单、客户、报表、营销等核心业务。作为 View 层，它通过 `gm_rmiclient` 调用各 Server 层服务（gm_server_order / gm_server_merchandise / gm_server_account），**禁止被其他 View 或 Server 直接调用**。\n\n本工程同时是 GM-AI 后端工作流的主入口，多仓库开发以本工程目录为基准，在同层兄弟目录中定位其他工程。"
    },
    {
     "heading": "技术栈",
     "content": "- Python 3.12, Django 4.1 (自定义 View 体系，未使用 DRF)\n- 数据库: MySQL (default=xnn_core_product_2, manage=management, delivery, sorting, inventory, other, third_party) + MongoDB + ClickHouse\n- ORM 并存: SQLAlchemy 1.3.23 (**主要**，通过 mysql_session 读写分离) + Django ORM 4.1 (辅助，Paginator/Admin)\n- 缓存: Redis (自定义连接池 common/redis_client.py + django-redis)\n- 搜索: Elasticsearch 7.x\n- 消息队列: RabbitMQ (kombu + gm_mqlib)\n- 配置中心: Consul (gm_configer)\n- gRPC: grpcio 1.59.5 (ceres/ 目录，市场价等服务)\n- 部署: Gunicorn (4 workers, sync, timeout=60) + Kubernetes"
    },
    {
     "heading": "常用命令",
     "content": "```bash\n# 环境变量 (必须)\nexport PYTHONPATH=pygmlib:.\nexport DJANGO_SETTINGS_MODULE=website.websettings\n\n# 运行服务\ngunicorn -c run/gunicorn.conf.py\n\n# 格式化\nblack . --config pyproject.toml   # line-length=100, target py34\n```"
    },
    {
     "heading": "架构分层",
     "content": "```\ngm_service/\n├── website/                    # 业务代码主目录 (View 层)\n│   ├── station/                # 站点核心 (登录、首页、基础配置)\n│   ├── order_status/           # 订单管理\n│   ├── merchandise/            # 商品管理 (分类、SPU)\n│   ├── product/                # SKU 管理\n│   ├── salemenu/               # 报价单管理\n│   ├── combine_goods/          # 组合商品\n│   ├── cookbook/                # 菜谱\n│   ├── purchase_spec/          # 采购规格\n│   ├── supplier/               # 供应商\n│   ├── delivery/               # 配送\n│   ├── sorter/                 # 分拣员\n│   ├── process/                # 加工\n│   ├── coupon/                 # 优惠券\n│   ├── flash_sale/             # 秒杀\n│   ├── member/                 # 会员\n│   ├── fee/                    # 费用管理\n│   ├── report/                 # 报表\n│   ├── data_center/            # 数据中心\n│   ├── gm_statistics/          # 统计\n│   ├── account/                # 账户管理\n│   ├── community/              # 社区\n│   ├── allocation_rule/        # 分配规则\n│   ├── day_price/              # 日价格\n│   ├── service_time/           # 服务时间\n│   ├── station_messages/       # 站内消息\n│   ├── sms/                    # 短信\n│   ├── food_security_report/   # 食品安全报告\n│   ├── recycle_bin/            # 回收站\n│   ├── openapi/                # 内部 OpenAPI\n│   ├── youzan_app/             # 有赞对接\n│   ├── utils/                  # 工具与基类\n│   │   └── views/              # View 基类 (BasePermitView 等)\n│   ├── weburls.py              # 主路由配置 (ROOT_URLCONF)\n│   ├── basesettings.py         # 数据库/缓存配置\n│   └── websettings.py          # Django settings\n│\n├── service/                    # 顶层业务服务 (轻量)\n│   ├── dals/                   # 数据访问层 (跨模块)\n│   └── order/                  # 订单相关服务\n│\n├── common/                     # 共享基础设施\n│   ├── mysql/                  # SQLAlchemy 数据访问\n│   │   └── models/             # SQLAlchemy 模型 (~100个文件)\n│   ├── mysql_session/          # SQLAlchemy Session 管理 (读写分离)\n│   ├── mongo_client.py         # MongoDB 连接工厂\n│   ├── collections.py          # MongoDB Collection 获取器\n│   ├── mongo/                  # MongoDB 服务层 (~60个文件，继承 MongoBaseSrv)\n│   ├── redis_client.py         # Redis 连接池 (db0/db2/db3 + RedisLock)\n│   ├── redis/                  # Redis 扩展操作\n│   ├── es_client.py            # Elasticsearch 客户端\n│   ├── clickhouse_client.py    # ClickHouse 客户端\n│   ├── mq/                     # 营销消息 (CloudEvent via kombu)\n│   ├── mq_client.py            # MQ 客户端\n│   ├── service/                # RMI 服务初始化 (所有 gm_rmiclient 实例)\n│   ├── param_check.py          # 参数校验框架 (Param/ParamChecker/GmError/ErrCode)\n│   ├── global_val.py           # 全局枚举常量\n│   ├── config.py               # Consul 配置读取入口\n│   ├── middleware/              # Django 中间件\n│   └── wechat/                 # 微信相关\n│\n├── ceres/                      # gRPC protobuf 定义 (~30个业务模块)\n│   ├── market/                 # 市场价格\n│   ├── order/                  # 订单\n│   ├── merchandise/            # 商品\n│   └── ...                     # analytics, finance, inventory 等\n│\n├── tools/                      # 运维工具\n│   ├── async_job/              # 异步任务 (~100个任务，前缀 station.)\n│   │   └── router.yml          # 异步任务路由配置\n│   └── crontab_tasks/          # 定时任务 (~30个脚本)\n│\n├── pygmlib/                    # 内嵌公共库\n│   ├── demo/framework/      # BaseView / param_schema (老体系)\n│   ├── django_mysqlpool/       # MySQL 连接池\n│   └── pyutil/                 # 工具函数\n│\n└── new_layout/                 # 旧配置 (可忽略)\n```"
    },
    {
     "heading": "关键模式",
     "content": "### 请求处理流程\n\n1. URL 路由 (website/weburls.py) → View (继承自 View 基类体系)\n2. View 基类 dispatch() 自动：Session 校验、group_id 提取、参数校验、异常捕获\n3. 参数通过 `param_check_dict` 声明式校验\n4. 响应统一格式: `{\"code\": 0, \"msg\": \"ok\", \"data\": ...}`\n\n### View 基类体系\n\n项目有两套 View 体系，**当前主流使用自定义体系**：\n\n```python\n# 主流体系 (website/station/views/common.py + website/utils/views/)\nCommonBaseView     # 需登录 + 权限\n├── NoLoginView    # 不需登录\n└── OpenBaseView   # 开放接口\n\n# 老体系 (pygmlib/demo/framework/views.py)\nBaseView           # jsonschema 校验 (部分旧代码仍在用)\n```\n\n**View 基类继承**：\n```python\nfrom website.station.views.common import CommonBaseView\n\nclass MyView(CommonBaseView):\n    param_check_dict = {\n        \"customer_id\": Param(int, required=True),\n        \"remark\": Param(str, optional=True, default=\"\"),\n    }\n\n    def post(self, request, *args, **kwargs):\n        customer_id = request.json.get('customer_id')\n        # self.group_id, self.station_id, self.username, self.userid 可用\n        return JsonSuccessResponse(data)\n```\n\n### 参数校验\n\n```python\nfrom common.param_check import Param, ParamChecker, GmError, ErrCode\n\nclass MyView(CommonBaseView):\n    param_check_dict = {\n        \"name\": Param(str, min_=1),\n        \"quantity\": Param(int, min_=0),\n        \"type\": Param(int, optional=True, default=1),\n    }\n```\n\n### 响应方法\n\n```python\nfrom common.param_check import JsonSuccessResponse, JsonErrorResponse\n\n# 成功\nreturn JsonSuccessResponse(data)\nreturn JsonSuccessResponse(data_dict=items, pagination=pg)\n\n# 错误\nreturn JsonErrorResponse(msg=\"操作失败\")\n\n# 业务异常 (被 dispatch 自动捕获，返回 JsonErrorResponse)\nraise GmError(ErrCode.business_err, \"库存不足\")\nraise GmError(ErrCode.param_err, \"参数不合法\")\n```\n\n### 数据库访问 (双 ORM 并存)\n\n- **SQLAlchemy** (主要): `common/mysql/models/` 下的模型，使用 `mysql_session` 读写分离\n- **Django ORM** (辅助): 少量场景（Paginator 分页、Django Admin）\n\n```python\n# SQLAlchemy 读写分离\nfrom common.mysql_session import (\n    StationDbReadSession,     # default 库读\n    StationDbWriteSession,    # default 库写\n    MaDbReadSession,          # manage 库读\n    MaDbWriteSession,         # manage 库写\n)\n\n# 查询示例\nfrom common.mysql.models.customer_model import Customer\ncustomer = StationDbReadSession.query(Customer).filter_by(\n    group_id=self.group_id, id=customer_id\n).first()\n```\n\n### MongoDB 访问\n\n```python\n# 方式1: 通过 mongo 服务层 (推荐)\nfrom common.mongo.order import OrderMongo\norder_mongo = OrderMongo()\norder = order_mongo.find_one({\"order_id\": order_id})\n\n# 方式2: 通过 collections 获取器\nfrom common.collections import get_collection_xxx\ncollection = get_collection_xxx()\n```\n\n### 多租户隔离\n\n所有查询必须加 `group_id` 过滤。group_id 通过 Session/Cookie 获取，存储在 `self.group_id`。\n\n### 权限控制\n\n```python\nfrom website.utils.views.base import PermissionView, UserPermissionView\n\n# 接口级权限\n@PermissionView(\"EDIT_ORDER\")\nclass EditOrderView(CommonBaseView):\n    ...\n\n# 字段级可见性\nfrom website.utils.views.base import protect_fields\n\n@protect_fields([\"cost_price\", \"profit\"])\nclass OrderDetailView(CommonBaseView):\n    ...\n```"
    },
    {
     "heading": "数据库配置",
     "content": "### MySQL 数据库\n\n| 配置名 | 库名 | 用途 | Session |\n|--------|------|------|---------|\n| default | xnn_core_product_2 | 商品主库 | StationDbReadSession / StationDbWriteSession |\n| manage | management | 管理主库 (用户/配置) | MaDbReadSession / MaDbWriteSession |\n| delivery | delivery | 配送 | DeliveryDb* |\n| sorting | sorting | 分拣 | SortingDb* |\n| inventory | inventory | 库存 | InventoryDb* |\n| other | other | 其他业务 | OtherDb* |\n| third_party | third_party | 第三方 | ThirdPartyDb* |\n\n**路由**: `website.database_app_router.DatabaseAppsRouter` 按 app_label 路由。\n\n### MongoDB\n\n通过 `common/mongo_client.py` 获取连接，`common/mongo/` 下约 60 个服务层文件。\n\n### Redis\n\n通过 `common/redis_client.py` 获取连接：\n\n| 函数 | Redis DB | 用途 |\n|------|----------|------|\n| `get_redis_client()` | db0 | 通用缓存 |\n| `get_redis_client3()` | db3 | 采购/分拣/配送 |\n| `get_redis_lock()` | db2 | 分布式锁 (Redlock) |"
    },
    {
     "heading": "RMI 服务调用",
     "content": "文件：`common/service/__init__.py`\n\n### 商品服务 (gm_server_merchandise)\n\n```python\nfrom common.service import (\n    category1_srv,     # 一级分类\n    category2_srv,     # 二级分类\n    pinlei_srv,        # 品类\n    spu_srv,           # SPU\n    sku_product_srv,   # SKU\n    sku_snapshot_srv,  # SKU 快照\n    merchandise_srv,   # 综合商品\n    combine_goods_srv, # 组合商品\n    cookbook_srv,       # 菜谱\n    spec_srv,          # 采购规格\n)\n```\n\n### 订单服务 (gm_server_order)\n\n```python\nfrom common.service import (\n    order_srv,         # 订单\n    weight_srv,        # 称重\n    pay_srv,           # 支付\n    point_srv,         # 积分\n    present_sku_srv,   # 赠品\n)\n```\n\n### 其他服务\n\n```python\nfrom common.service import (\n    st_account_srv,    # 账户权限 (gm_server_account)\n    async_job_srv,     # 异步任务 (gm_async_job)\n    sorting_srv,       # 分拣 (gm_web_sorting)\n    sms_srv,           # 短信\n    market_price_srv,  # 市场价格 (ceres gRPC)\n    storage_srv,       # 文件存储\n    cluster_context_srv, # 集群上下文\n)\n```\n\n### 调用示例\n\n```python\nfrom common.service import spu_srv, order_srv\n\n# 查询 SPU\nspu = spu_srv.get(group_id, spu_id)\n\n# 查询订单\norder = order_srv.get_v2(group_id, order_id)\n```"
    },
    {
     "heading": "gRPC 服务 (ceres/)",
     "content": "`ceres/` 目录包含约 30 个业务模块的 protobuf 定义，用于调用 Ceres 微服务集群。主要使用：\n\n| 模块 | 用途 |\n|------|------|\n| `ceres/market/` | 市场价格查询 (market_price_srv) |\n| `ceres/analytics/` | 数据分析 |\n| `ceres/merchandise/` | 商品扩展服务 |"
    },
    {
     "heading": "异步任务",
     "content": "### 路由配置\n\n文件：`tools/async_job/router.yml`\n\n- 路由前缀：**所有任务名必须以 `station.` 开头**\n- 任务脚本位于 `tools/async_job/` 目录\n- 通过 `gm_async_job` 分发执行\n\n### 常见任务分类\n\n| 类别 | 任务名示例 |\n|------|-----------|\n| 批量导出 | `station.export_*` |\n| 批量导入 | `station.import_*` |\n| 批量创建订单 | `station.batch_create_order` |\n| SKU 批量更新 | `station.sku_batch_update` |\n| 市场价格 | `station.market_price_*` |\n| 数据同步 | `station.daily_sales`, `station.sync_*` |\n\n### 定时任务\n\n文件：`tools/crontab_tasks/`\n\n| 脚本 | 功能 |\n|------|------|\n| `finance_daily.py` | 财务日报 |\n| `calc_stock_value.py` | 货值计算 |\n| `day_price.py` | 日价格更新 |\n| `order_count_everyday.py` | 每日订单统计 |\n| `set_order_status_distributing.py` | 订单状态自动流转 |\n| `salmenu_cycle_pricing.py` | 报价单周期定价 |\n| `shelf_life_warning.py` | 保质期预警 |\n| `sync_salemenu.py` | 报价单同步 |\n| `updateEveryday.py` | 每日数据更新 |"
    },
    {
     "heading": "内部依赖 (pip 私有包)",
     "content": "| 包名 | 版本 | 说明 |\n|------|------|------|\n| `gm_rmiclient` | 0.20260302.02 | RMI 客户端 (调用各 Server) |\n| `gm_order_logic` | 0.20251129.02 | 订单计算 (GmDecimal/查询/ES) |\n| `gm_mqlib` | 2.2.4 | RabbitMQ 封装 |\n| `gm_configer` | 2.1.2 | Consul 配置读取 |\n| `gm_storage` | 1.1.0 | 文件存储 |\n| `demo_framework` | 2.0.2 | 老版框架 (BaseView) |"
    },
    {
     "heading": "常量定义位置",
     "content": "| 文件 | 内容 |\n|------|------|\n| `common/global_val.py` | 核心业务枚举 |\n| `common/constants.py` | 全局常量 |\n| `common/param_check.py` | ErrCode 错误码 (param_err=1, business_err=4, auth_err=10, not_login=100) |\n| `common/pay_method.py` | 支付方式常量 |\n| `common/price_rule_status.py` | 价格规则状态 |\n| `common/op_log_define.py` | 操作日志定义 |"
    },
    {
     "heading": "模型定义",
     "content": "### SQLAlchemy 模型 (主要)\n\n- 位置: `common/mysql/models/` (~100个文件)\n- 基类: `common/mysql/models/base_model.py`\n- 使用 `mysql_session` 的 Session 进行查询/写入\n\n### Django ORM 模型 (辅助)\n\n- 少量使用，主要用于 Django Admin 和 Paginator\n- 通过 `DatabaseAppsRouter` 按 app_label 路由到对应数据库\n\n### MongoDB 服务层\n\n- 位置: `common/mongo/` (~60个文件)\n- 继承 `MongoBaseSrv`（定义在 `common/mongo/__init__.py`）\n- 通过 `common/mongo_client.py` 获取连接\n- 通过 `common/collections.py` 获取 Collection"
    },
    {
     "heading": "URL 路由",
     "content": "文件：`website/weburls.py`\n\n| 前缀 | 模块 | 说明 |\n|------|------|------|\n| `/station/` | station | 站点核心 (登录/首页/配置) |\n| `/merchandise/` | merchandise | 商品管理 |\n| `/product/` | product | SKU 管理 |\n| `/salemenu/` | salemenu | 报价单 |\n| `/combine_goods/` | combine_goods | 组合商品 |\n| `/cookbook/` | cookbook | 菜谱 |\n| `/supplier/` | supplier | 供应商 |\n| `/purchase_spec/` | purchase_spec | 采购规格 |\n| `/process/` | process | 加工 |\n| `/order_status/` | order_status | 订单管理 |\n| `/delivery/` | delivery | 配送 |\n| `/sorter/` | sorter | 分拣员 |\n| `/data_center/` | data_center | 数据中心 |\n| `/report/` | report | 报表 |\n| `/station_statistics/` | gm_statistics | 统计 |\n| `/gm_account/` | account | 账户管理 |\n| `/coupon/` | coupon | 优惠券 |\n| `/flash_sale/` | flash_sale | 秒杀 |\n| `/member/` | member | 会员 |\n| `/fee/` | fee | 费用管理 |\n| `/message/` | station_messages | 消息 |\n| `/sms/` | sms | 短信 |\n| `/service_time/` | service_time | 服务时间 |\n| `/day_price/` | day_price | 日价格 |\n| `/community/` | community | 社区 |\n| `/allocation_rule/` | allocation_rule | 分配规则 |\n| `/openapi/` | openapi | 内部 OpenAPI |\n| `/youzan/` | youzan_app | 有赞对接 |\n| `/recycle_bin/` | recycle_bin | 回收站 |\n| `/food_security/` | food_security_report | 食品安全 |"
    },
    {
     "heading": "AI 辅助开发框架",
     "content": "项目内置了 `.claude/` AI 辅助开发框架，提供完整的需求分析、开发编码、提交推送工作流。\n\n> **框架导航入口**：`.claude/README.md` - 查看完整命令体系、规范目录、角色定义\n\n### 核心命令\n\n| 命令 | 角色 | 说明 |\n|------|------|------|\n| `/gm-prd` | product-manager | PRD 生成 → 写入 TAPD（支持已有需求/新需求两种模式） |\n| `/gm-dev` | developer | 开发编码（TAPD 需求驱动 + 多仓库支持） |\n| `/gm-ship` | developer | 提交推送（格式化 → Review → Commit → Push → MR → TAPD 状态） |\n\n**端到端流程**：\n```\n/gm-prd → TAPD Story (PRD)\n    ↓\n/gm-dev → 读取 TAPD → 技术设计 → 编码 → 语雀对接清单\n    ↓\n/gm-ship → 格式化 → Review → Commit → Push → MR → TAPD 状态更新\n```\n\n### 快速入口\n\n| 文档 | 说明 |\n|------|------|\n| `.claude/README.md` | 框架导航 ⭐ |\n| `.claude/rules/global-behavior.rule.md` | AI 行为规则 (自动加载) |\n| `.claude/specs/common/项目开发宪法.spec.md` | 技术栈、架构、强制规则 |\n| `.claude/specs/developer/` | 开发者规范 (6个) |\n| `.claude/specs/business/` | 业务领域规范 (6个) |\n| `.claude/skills/developer/` | 代码生成模板 |\n| `.claude/skills/product-manager/` | 需求分析/PRD 模板 |\n\n### 角色\n\n- **developer**: 加载技术规范 + 代码生成模板\n- **architect**: 加载框架维护规范\n- **product-manager**: 加载业务领域规范 + 需求分析模板"
    },
    {
     "heading": "注意事项",
     "content": "- 本项目是 View 层，**禁止直连其他 Server 的数据库**，跨服务调用必须通过 gm_rmiclient\n- **两套 View 体系并存**：新代码使用 `CommonBaseView` + `param_check_dict`，老代码可能使用 `pygmlib.demo.framework.BaseView` + `param_schema`\n- SQLAlchemy 模型文件约 100 个，修改前务必确认模型所在库和使用的 Session\n- MongoDB 服务层约 60 个文件，通过 `common/mongo/` 访问\n- 所有异步任务名以 `station.` 为前缀，路由在 `tools/async_job/router.yml`\n- `common/global_val.py` 包含核心业务枚举，修改前需全局检索引用\n- `ceres/` 目录为 gRPC protobuf 定义，修改 proto 后需重新编译\n- 金额计算使用 `GmDecimal`（来自 gm_order_logic）"
    }
   ]
  }
 ]
};
