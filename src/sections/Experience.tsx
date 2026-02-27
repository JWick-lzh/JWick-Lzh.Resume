import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Calendar, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const experiences = [
    {
      company: 'KK集团 / 灯塔引擎',
      position: '产品负责人',
      period: '2022.11 - 至今',
      location: '深圳',
      description: '负责企业级 AI Agent 平台产品战略与规划，确立「开源全栈 + 企业 OA 整合」的产品定位；推动产品演进为生产力平台。',
      achievements: [
        '上线当月签约 2 家付费企业客户',
        '获得 5000+ 海内外注册用户',
        '推动 Agentlang 开源，吸引 4000+ 开发者',
        '落地内部智能审批全自动化',
      ],
    },
    {
      company: '深圳豆沙包科技',
      position: '供应链金融 SaaS 产品负责人',
      period: '2022.06 - 2022.11',
      location: '深圳',
      description: '基于集团战略，负责供应链金融方向产品规划、方案设计，统筹落地金融云 SaaS 及供应链金融平台。',
      achievements: [
        '完成金融云 SaaS 1.0 并在多行试点上线',
        '实现供应链金融 1.0 的落地与核心企业首笔打通',
        '搭建供应链能力开放平台、风控中心',
        '带领跨部门协作的 6 人小队实现目标',
      ],
    },
    {
      company: '深圳明源云集团',
      position: '智慧客服事业部产品负责人',
      period: '2019.11 - 2022.06',
      location: '深圳',
      description: '负责智慧客服 CRM 等产品矩阵的布局与落地；搭建并推动地产行业首个供应链中台的发展与商业化。',
      achievements: [
        '所负责业务模块全年业绩达到数千万',
        '荣获公司最佳团队奖及个人优秀员工称号',
        '完成四大中心的供应链中台并成为越秀等标杆案例',
        '搭建并管理 23 人的产研及交付团队',
      ],
    },
    {
      company: '深圳奥哲网络科技',
      position: '氚云产品经理',
      period: '2018.05 - 2019.11',
      location: '深圳',
      description: '负责低代码商业产品「氚云」的规划，完成从市场分析、MVP 定义到持续迭代的全生命周期工作。',
      achievements: [
        '深入研究并推出通用「氚云模板中心」',
        '有效提升产品 DAU 从 10% 到 45%',
        '渠道与直销综合转化率显著提升（达30%以上）',
        '陪访客户商机率达到 50%',
      ],
    },
    {
      company: '年年卡网络科技',
      position: '产品经理',
      period: '2015.06 - 2018.03',
      location: '深圳',
      description: '负责移动端、后台的功能流程图与原型设计，管理全公司的对外运营活动的产品输出及项目上线跟进。',
      achievements: [
        '集成公司资源建立互联网端无缝交易缴费平台',
        '按时且高质量完成各项重要缴费功能落地',
        '完成个人和代理商之间的无缝衔接协同和功能闭环',
        '与开发团队紧密协作提高整体交付质量',
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title typewriter effect
      gsap.fromTo(
        '.exp-title',
        { width: 0 },
        {
          width: 'auto',
          duration: 0.8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline draw
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.3,
        }
      );

      // Experience items
      gsap.fromTo(
        '.exp-item',
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.5,
        }
      );

      // Date markers
      gsap.fromTo(
        '.date-marker',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.7,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 sm:py-32 bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">经历</span>
          <h2 className="exp-title text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 inline-block overflow-hidden whitespace-nowrap">
            职业旅程
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            10年打造影响数百万用户的产品经验
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2">
            <div className="timeline-line absolute inset-0 bg-gradient-to-b from-[var(--lime)] via-[var(--lime)]/50 to-transparent origin-top" />
          </div>

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`exp-item relative grid grid-cols-1 md:grid-cols-2 gap-8 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Date Marker */}
                <div className="date-marker absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[var(--lime)] border-4 border-black transform -translate-x-1/2 z-10 shadow-lg shadow-[var(--lime)]/30" />

                {/* Content */}
                <div
                  className={`pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12'
                    }`}
                >
                  <div className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--lime)]/30 transition-all duration-300 hover:-translate-y-1">
                    {/* Header */}
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <Building2 className="w-5 h-5 text-[var(--lime)]" />
                      <span className="text-lg font-bold text-white">{exp.company}</span>
                    </div>

                    <div className={`flex items-center gap-4 mb-4 text-sm text-white/50 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                      <span>{exp.location}</span>
                    </div>

                    <h3 className={`text-xl font-semibold text-[var(--lime)] mb-3 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {exp.position}
                    </h3>

                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {exp.achievements.map((achievement, aIndex) => (
                        <li
                          key={aIndex}
                          className={`flex items-center gap-2 text-sm text-white/50 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                            }`}
                        >
                          <ChevronRight className="w-4 h-4 text-[var(--lime)]" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className={`hidden md:block ${index % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
