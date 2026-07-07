/* 工作流演示：/gm-prd → /gm-dev → /gm-ship 步进时间线（内容提炼自 .claude/commands/ 三份命令文档） */
(function () {
  const D = (p) => ({ id: p.replace(/\//g, "--").replace(/\.md$/, ""), label: p.split("/").pop().replace(/\.(spec|rule)?\.?md$/, "").replace(".md", "") });

  const FLOW = [
    {
      cmd: "/gm-prd",
      role: "产品经理",
      tagline: "一句话需求，变成一份合格的 PRD",
      color: "a",
      steps: [
        {
          name: "识别工作模式",
          what: "判断是基于 TAPD 已有需求（给链接/ID），还是业务侧全新需求（直接描述）。新需求会先做需求确认。",
          loads: [D(".claude/specs/common/workflow-routing.spec.md")],
          output: "确认后的需求输入",
        },
        {
          name: "需求分析",
          what: "AI 按需求分析模板拆解：目标用户、业务价值、边界范围，并自动判定需求规模（S/M/L/XL），规模决定后续深度。",
          loads: [D(".claude/skills/product-manager/requirement-analysis.md"), D(".claude/skills/product-manager/requirement-card.md")],
          output: "需求卡片 + 规模判定",
        },
        {
          name: "产品设计与影响面分析",
          what: "对照业务领域全景，分析这个需求会影响哪些领域（订单？商品？报价单？），再按需求文档规范生成完整 PRD。",
          loads: [D(".claude/specs/business/业务领域全景.spec.md"), D(".claude/skills/product-manager/impact-analysis.md"), D(".claude/specs/product-manager/需求文档规范.spec.md"), D(".claude/skills/product-manager/prd-gen.md")],
          output: "完整 PRD 文档",
        },
        {
          name: "写入 TAPD",
          what: "模式A 把 PRD 更新到已有 TAPD 需求详情；模式B 创建新的 TAPD 需求并写入 PRD。产品经理可以直接在 TAPD 里继续流转。",
          loads: [D(".claude/skills/common/tapd-integration.md")],
          output: "TAPD 需求单（含 PRD）",
        },
      ],
    },
    {
      cmd: "/gm-dev",
      role: "开发",
      tagline: "从 TAPD 需求到写完代码",
      color: "b",
      steps: [
        {
          name: "确定任务来源",
          what: "输入 TAPD 需求 ID、跨仓库任务（如 stock 库存盘点）或直接描述。跨仓库时按注册表自动定位到对应工程。",
          loads: [D(".claude/specs/common/multi-repo-registry.spec.md")],
          output: "明确的开发目标与目标仓库",
        },
        {
          name: "读取需求与技术设计",
          what: "读取 TAPD 里的 PRD 和 API 契约，输出摘要供确认；再基于项目宪法和分层规范做技术设计。",
          loads: [D(".claude/specs/common/项目开发宪法.spec.md"), D(".claude/specs/developer/服务分层规范.spec.md")],
          output: "技术设计方案",
        },
        {
          name: "编码实现",
          what: "按视图/服务/模型代码模板生成代码，每个函数带 @generated-by-gm-ai 标识，写完自动对照规范自我审计。",
          loads: [D(".claude/skills/developer/view-gen.md"), D(".claude/skills/developer/service-gen.md"), D(".claude/skills/developer/model-gen.md"), D(".claude/specs/developer/视图层规范.spec.md"), D(".claude/specs/developer/数据模型规范.spec.md")],
          output: "可运行的代码 + 审计报告",
        },
        {
          name: "产出对接清单",
          what: "生成前端对接清单（接口、参数、示例）写入语雀，链接回填到 TAPD，前端同学照单开发。",
          loads: [D(".claude/skills/developer/dev-workflow.md")],
          output: "语雀对接清单",
        },
      ],
    },
    {
      cmd: "/gm-ship",
      role: "开发",
      tagline: "一条命令，从格式化到 PR 到 TAPD 流转",
      color: "c",
      steps: [
        {
          name: "识别变更工程 + 环境检查",
          what: "多仓库改动时逐个工程检测变更文件和分支；单仓库直接检查工作区状态。",
          loads: [D(".claude/specs/common/multi-repo-registry.spec.md")],
          output: "变更工程清单",
        },
        {
          name: "格式化 + Code Review",
          what: "先跑 black 统一代码风格，再按代码审查规范做 AI Code Review，发现问题先修再走。小改动可 --skip-review。",
          loads: [D(".claude/specs/developer/代码风格规范.spec.md")],
          output: "通过审查的代码",
        },
        {
          name: "Commit → Push → PR",
          what: "规范化提交信息、推送分支、自动创建 PR/MR 并带上需求链接和变更说明。",
          loads: [],
          output: "待合并的 PR",
        },
        {
          name: "更新 TAPD + 总结",
          what: "把 TAPD 需求状态流转到“开发完成”，输出本次交付总结：改了什么、影响什么、怎么验证。",
          loads: [D(".claude/skills/common/tapd-integration.md")],
          output: "闭环的需求单",
        },
      ],
    },
  ];

  const SPECKIT = "除了 GM 命令，项目还内置 speckit 套件（另一套通用规格驱动工作流）：specify 写规格 → clarify 澄清 → plan 出计划 → tasks 拆任务 → implement 实现，适合从零开始的全新功能。";

  let active = 0;
  let playing = null;

  function render() {
    const root = document.getElementById("view-workflow");
    if (root.dataset.rendered) { return; }
    root.dataset.rendered = "1";
    root.innerHTML = `
      <h1 class="view-title">AI 辅助开发，是怎么转起来的</h1>
      <p class="view-sub">三条命令串起「需求 → 开发 → 交付」全流程。点击每个阶段看细节，或者直接自动播放。</p>
      <div class="wf-rail" id="wf-rail">
        <div class="wf-rail-line"><i id="wf-rail-fill"></i></div>
        ${FLOW.map((f, i) => `
          <button class="wf-node" data-i="${i}">
            <span class="wf-cmd">${f.cmd}</span>
            <span class="wf-role">${f.role}</span>
          </button>`).join("")}
      </div>
      <p class="wf-tagline" id="wf-tagline"></p>
      <div class="wf-steps" id="wf-steps"></div>
      <div class="wf-actions">
        <button class="btn btn-ghost" id="wf-play"><svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>自动播放</button>
      </div>
      <div class="card wf-speckit"><p>${SPECKIT}</p></div>`;

    root.querySelectorAll(".wf-node").forEach((n) =>
      n.addEventListener("click", () => { stopPlay(); show(+n.dataset.i); })
    );
    document.getElementById("wf-play").addEventListener("click", togglePlay);
    show(0);
  }

  function show(i) {
    active = i;
    const root = document.getElementById("view-workflow");
    root.querySelectorAll(".wf-node").forEach((n, j) => n.classList.toggle("on", j <= i));
    document.getElementById("wf-rail-fill").style.width = ((i + 0.5) / FLOW.length) * 100 + "%";
    document.getElementById("wf-tagline").textContent = FLOW[i].tagline;
    const steps = document.getElementById("wf-steps");
    steps.innerHTML = FLOW[i].steps
      .map(
        (s, j) => `
      <div class="card wf-step" style="animation-delay:${j * 60}ms">
        <span class="wf-step-n">${j + 1}</span>
        <div class="wf-step-body">
          <h3>${s.name}</h3>
          <p>${s.what}</p>
          ${s.loads.length ? `<div class="wf-loads">加载规范：${s.loads.map((d) => `<button class="chip" data-doc="${d.id}">${d.label}</button>`).join("")}</div>` : ""}
          <p class="wf-output">产出 → <b>${s.output}</b></p>
        </div>
      </div>`
      )
      .join("");
    steps.querySelectorAll("[data-doc]").forEach((c) =>
      c.addEventListener("click", () => App.openDoc(c.dataset.doc))
    );
  }

  function togglePlay() {
    if (playing) { stopPlay(); return; }
    const btn = document.getElementById("wf-play");
    btn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>暂停';
    let i = active;
    playing = setInterval(() => {
      i = (i + 1) % FLOW.length;
      show(i);
      if (i === FLOW.length - 1) stopPlay();
    }, 3000);
  }

  function stopPlay() {
    if (playing) { clearInterval(playing); playing = null; }
    const btn = document.getElementById("wf-play");
    if (btn) btn.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>自动播放';
  }

  App.onShow.workflow = render;
})();
