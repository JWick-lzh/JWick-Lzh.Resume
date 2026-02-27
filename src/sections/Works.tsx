import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ChevronLeft, ChevronRight, Star, Users, Zap, Code2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Works = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = [
    {
      id: 'super-magic',
      title: '超级麦吉 (Super Magic)',
      subtitle: 'AI生产力平台',
      category: '企业级通用型AI Agent平台',
      year: '2024',
      image: '/images/super-magic.jpg',
      description: '从「企业级 AI 自动化协同」切入，作为产品负责人全程带领 20+ 人团队完成从立项到商业化的全过程。打造涵盖「超级麦吉(Agent)+神奇流程(Flow)+麦吉聊天(IM)+天书协同(OS)」的生态产品。',
      highlights: [
        { icon: Users, label: '注册用户', value: '5000+' },
        { icon: Zap, label: '效率提升', value: '10x' },
        { icon: Code2, label: '开发者', value: '4000+' },
        { icon: Star, label: '付费企业', value: '2+' },
      ],
      achievements: [
        '上线当月内签约 2 家付费企业客户，获 5000+ 注册用户',
        '多 Agent 协作体系融合，投资报告等任务效率获数倍级提升',
        '落地内部智能审批项目，审批流程从 1 天压缩至 1 小时内',
        'Agentlang 成为 GitHub 增速较快的国产 AI Agent 框架之一',
        '首月吸引 4000+ 开发者，完成闭环工具库开源与多端集成',
      ],
      tags: ['AI Agent', '流程编排', '工作流', 'MCP生态'],
      links: [
        { label: '体验国内版', url: 'https://www.letsmagic.cn/' },
        { label: '体验国际版', url: 'https://www.letsmagic.ai/' },
      ],
      featured: true,
    },
    {
      id: 'retail-saas',
      title: '连锁经营SaaS',
      subtitle: '数字化解决方案',
      category: '连锁零售企业数字化转型平台',
      year: '2022-2024',
      image: '/images/work-chatbot.jpg',
      description: '为连锁零售企业提供数字化解决方案，涵盖智能运营、数据决策、供应链协同，推动传统零售企业的数字化转型，并整合企业智能大脑、低代码平台、BI分析等核心模块。',
      highlights: [
        { icon: Users, label: '覆盖城市', value: '300+' },
        { icon: Zap, label: '效率提升', value: '40%' },
        { icon: Star, label: '平台营收', value: '200万+' },
        { icon: Code2, label: '服务品牌', value: '10+' },
      ],
      achievements: [
        '服务 10+ 连锁品牌客户，平台年营收 200 万+',
        '推动从 v1.0 到 v3.0 的迭代，单店运营效率提升 40%',
        '形成 1+4 体系标准解决方案，覆盖全国 300+ 城市',
        '完成第三方支付、物流、营销工具的核心对接集成体系',
      ],
      tags: ['SaaS', '数字化转型', '智能运营', '数据分析'],
      links: [
        { label: '了解详情', url: 'https://www.dtyq.com/' },
      ],
      featured: false,
    },
    {
      id: 'supply-chain',
      title: '供应链金融1.0',
      subtitle: 'Dow+供应链金融平台',
      category: 'SaaS产品',
      year: '2022',
      image: '/images/work-analytics.jpg',
      description: '针对跨境及直播电商行业不符合传统核心企业的问题开展创新。与行业合作机构建立 Dow+ 供应链金融平台，为「非典型」核心企业量身定制一套完整的供应链融资解决方案。',
      highlights: [
        { icon: Users, label: '团队规模', value: '6人' },
        { icon: Zap, label: '放款成功', value: '首笔' },
        { icon: Star, label: '核心企业', value: '成功接入' },
        { icon: Code2, label: 'MVP落地', value: '100%' },
      ],
      achievements: [
        '供应链金融 v1.0 成功上线并成为公司重点业务方向',
        '接入核心企业跑通全链路并完成首笔放款（涉及资产融资闭环）',
        '以 MVP 方式交付，持续优化产品可用性与扩展体系',
        '通过「订单数据化」「财务自动化」「开户线上化」优化核心断点',
      ],
      tags: ['金融科技', '供应链金融', '风控能力'],
      featured: false,
    },
    {
      id: 'property-crm',
      title: '智慧物业客服6.0',
      subtitle: '物业客户连接平台',
      category: 'SaaS产品',
      year: '2020-2022',
      image: '/images/work-ecommerce.jpg',
      description: '通过「智能服务自动化」「客户信息数据化」「私域连接器」三大核心功能深度升级，提升物业客服体系的连接与场景经营。期间同时打造了地产级别的行业首个供应链中台。',
      highlights: [
        { icon: Users, label: '总团队数', value: '23人' },
        { icon: Zap, label: '首年业绩', value: '4000万+' },
        { icon: Star, label: '标杆客户', value: '越秀、龙光' },
        { icon: Code2, label: '基础底座', value: '4个' },
      ],
      achievements: [
        '首年完成 4000 万+ 业绩目标，打造出行业顶级标杆案例',
        '输出《智慧客服新规划 6.0》，探索物业服务商业化落地闭环',
        '负责行业级供应链中台搭建，孵化出星图、数见、数芯等底层支撑',
        '全矩阵覆盖：物业自动化、企微通、CDP 数据中台、营销引擎',
      ],
      tags: ['智慧物业', 'CRM系统', '供应链中台', '数据中台'],
      featured: false,
    },
  ];

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title split reveal
      gsap.fromTo(
        '.works-title',
        { clipPath: 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)' },
        {
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Project cards
      gsap.fromTo(
        '.project-card',
        { rotateY: 180, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.3,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeProject = projects[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative py-24 sm:py-32 bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">作品</span>
          <h2 className="works-title text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            精选项目
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            展示AI驱动创新和以用户为中心的设计作品集
          </p>
        </div>

        {/* Featured Project - Super Magic */}
        <div className="project-card mb-16 relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
          {activeProject.featured && (
            <div className="absolute top-6 left-6 z-20">
              <span className="archive-badge bg-[var(--lime)]/20">
                <Star className="w-3 h-3" />
                核心项目
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-64 lg:h-auto overflow-hidden">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/50 lg:bg-gradient-to-l" />
            </div>

            {/* Content */}
            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[var(--lime)] text-sm font-medium">{activeProject.category}</span>
                <span className="text-white/30">•</span>
                <span className="text-white/50 text-sm">{activeProject.year}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                {activeProject.title}
              </h3>
              <p className="text-white/60 text-lg mb-6">{activeProject.subtitle}</p>

              <p className="text-white/70 leading-relaxed mb-8">
                {activeProject.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                {activeProject.highlights.map((highlight, hIndex) => (
                  <div key={hIndex} className="text-center">
                    <highlight.icon className="w-5 h-5 text-[var(--lime)] mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{highlight.value}</div>
                    <div className="text-xs text-white/50">{highlight.label}</div>
                  </div>
                ))}
              </div>

              {/* Achievements */}
              <ul className="space-y-2 mb-8">
                {activeProject.achievements.slice(0, 3).map((achievement, aIndex) => (
                  <li key={aIndex} className="flex items-start gap-2 text-sm text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)] mt-1.5 flex-shrink-0" />
                    {achievement}
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {activeProject.tags.map((tag, tIndex) => (
                  <span
                    key={tIndex}
                    className="px-3 py-1 text-xs rounded-full bg-white/10 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              {activeProject.links && activeProject.links.length > 0 && (
                <div className="flex flex-wrap gap-4 mb-8">
                  {activeProject.links.map((link, lIndex) => (
                    <a
                      key={lIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--lime)]/10 text-[var(--lime)] border border-[var(--lime)]/20 rounded-full text-sm font-medium hover:bg-[var(--lime)] hover:text-black transition-colors"
                    >
                      {link.label}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {projects.map((_, pIndex) => (
                    <button
                      key={pIndex}
                      onClick={() => setActiveIndex(pIndex)}
                      className={`w-2 h-2 rounded-full transition-all ${pIndex === activeIndex
                        ? 'w-8 bg-[var(--lime)]'
                        : 'bg-white/30 hover:bg-white/50'
                        }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prevProject}
                    className="p-2 rounded-full border border-white/20 hover:border-[var(--lime)] hover:text-[var(--lime)] transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextProject}
                    className="p-2 rounded-full border border-white/20 hover:border-[var(--lime)] hover:text-[var(--lime)] transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.filter((_, i) => i !== activeIndex).map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveIndex(projects.findIndex((p) => p.id === project.id))}
              className="project-card group cursor-pointer rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[var(--lime)]/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[var(--lime)] text-xs">{project.category}</span>
                  <h4 className="text-white font-bold">{project.title}</h4>
                </div>
              </div>
              <div className="p-4">
                <p className="text-white/50 text-sm line-clamp-2">{project.description}</p>
                <div className="flex items-center gap-2 mt-3 text-[var(--lime)] text-sm">
                  <span>查看详情</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
