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
      company: 'KK集团',
      position: '产品负责人',
      period: '2023.11 - 至今',
      location: '深圳',
      description: '负责公司内部系统的商业化发展，制定技术中台产品发展路线图。探索技术中⼼前沿商业化能力，推动技术创新与商业价值的深度融合。',
      achievements: [
        '主导内部系统商业化发展',
        '制定产品战略规划',
        '负责核心产品线的架构设计与优化',
        '参与产品团队的人才培养与团队建设',
      ],
    },
    {
      company: '深圳豆沙包科技',
      position: '供应链金融高级SaaS产品经理',
      period: '2022.06 - 2022.11',
      location: '深圳',
      description: '负责公司供应链金融方向产品规划、方案设计。规划落地金融云SaaS系统v1.0、供应链金融平台v1.0。',
      achievements: [
        '梳理并成功落地金融云SaaS1.0版本',
        '在试点客户上线（PF银行、YS保理等）',
        '实现供应链金融1.0版本的落地并实现核心企业放款成功',
        '带领团队完成产品建设',
      ],
    },
    {
      company: '深圳明源云集团',
      position: '智慧客服事业部产品负责人',
      period: '2019.11 - 2022.06',
      location: '深圳',
      description: '深度布局产品矩阵，负责toB/C产品的价值定位、架构、设计、开发、包装、定价、运营全程规划。',
      achievements: [
        '全年业绩达到数千万',
        '荣获公司最佳团队奖',
        '个人优秀员工称号',
        '搭建15人产品团队',
      ],
    },
    {
      company: '深圳奥哲网络科技',
      position: '氚云产品经理',
      period: '2018.05 - 2019.11',
      location: '深圳',
      description: '负责公司核心商业【氚云】产品规划，市场分析，产品规划MVP，产品需求落地规划。',
      achievements: [
        '深入研究分析行业诉求和使用场景',
        '推动"氚云模板中心"落地',
        '提升产品市场占有率',
        '输出全套方法论话术并培训人员',
      ],
    },
    {
      company: '年年卡网络科技',
      position: '产品经理',
      period: '2015.06 - 2018.03',
      location: '深圳',
      description: '负责日常移动端、后台、模块功能流程图、原型设计规划，交互设计评审，项目开发管理。',
      achievements: [
        '集成公司业务资源创建互联网缴费平台',
        '负责产品功能规划和设计',
        '协调各部门需求和资源',
        '百分百完成上级交代任务研发落地',
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
                className={`exp-item relative grid grid-cols-1 md:grid-cols-2 gap-8 ${
                  index % 2 === 0 ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Date Marker */}
                <div className="date-marker absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[var(--lime)] border-4 border-black transform -translate-x-1/2 z-10 shadow-lg shadow-[var(--lime)]/30" />

                {/* Content */}
                <div
                  className={`pl-12 md:pl-0 ${
                    index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12'
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
                          className={`flex items-center gap-2 text-sm text-white/50 ${
                            index % 2 === 0 ? 'md:flex-row-reverse' : ''
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
