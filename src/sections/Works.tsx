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
      description: '主导推出公司旗舰产品超级麦吉，一款面向"企业级协同 - 通用型AI Agent平台"，围绕超级麦吉平台构建AI产品矩阵，打造覆盖流程编排、即时通讯、开发框架的完整生态体系。',
      highlights: [
        { icon: Users, label: '用户规模', value: '5000+' },
        { icon: Zap, label: '效率提升', value: '10x' },
        { icon: Code2, label: '开发者', value: '4000+' },
        { icon: Star, label: '付费客户', value: '2+' },
      ],
      achievements: [
        '上线当月内签约2+付费企业客户和5000+海内外用户',
        '主导多Agent协作体系与两条产品线深度融合，客户效率提升100%',
        '主导内部智能审批项目落地，实现审批流程的自动化，提升审批效率近10倍',
        'Agentlang成为GitHub增长较快的AI Agent框架之一',
        '推动核心框架开源，行业首个"企业级AI协同平台"，打造活跃开发者社区，吸引4000+开发者及20+贡献者',
      ],
      tags: ['AI Agent', '流程编排', '即时通讯', '开源框架'],
      featured: true,
    },
    {
      id: 'retail-saas',
      title: '连锁经营SaaS',
      subtitle: '数字化解决方案',
      category: '连锁零售企业数字化转型平台',
      year: '2022-至今',
      image: '/images/work-chatbot.jpg',
      description: '为连锁零售企业提供全链路数字化解决方案，构建涵盖智能运营、数据决策、供应链协同的一体化SaaS平台，推动传统零售企业向数字化转型。',
      highlights: [
        { icon: Users, label: '覆盖城市', value: '300+' },
        { icon: Zap, label: '效率提升', value: '40%' },
        { icon: Star, label: '年营收', value: '200万+' },
        { icon: Code2, label: '服务品牌', value: '10+' },
      ],
      achievements: [
        '3年服务10+连锁品牌客户，实现平台年营收200万+',
        '推动3家头部客户数字化转型，单店运营效率提升40%',
        '成功形成1+4体系的标准解决方案的输出',
        '覆盖全国300+城市连锁门店',
      ],
      tags: ['SaaS', '数字化转型', '智能运营', '供应链'],
      featured: false,
    },
    {
      id: 'supply-chain',
      title: '供应链金融1.0',
      subtitle: 'Dow+供应链金融平台',
      category: 'SaaS产品',
      year: '2022',
      image: '/images/work-analytics.jpg',
      description: '豆沙包与合作机构合作，建立了Dow+供应链金融服务平台，为"非典型"核心企业提供供应链融资解决方案。',
      highlights: [
        { icon: Users, label: '试点客户', value: '2+' },
        { icon: Zap, label: '放款成功', value: '100%' },
        { icon: Star, label: '核心企业', value: '接入' },
        { icon: Code2, label: '团队规模', value: '6人' },
      ],
      achievements: [
        '实现供应链金融产品v1.0版本正式上线',
        '接入核心企业，实现放款成功',
        '成为公司核心发展产品之一',
        '通过【订单数据化】、【财务自动化】、【开户线上化】优化业务断点',
      ],
      tags: ['供应链金融', '金融科技', '风控建模'],
      featured: false,
    },
    {
      id: 'property-crm',
      title: '智慧物业客服6.0',
      subtitle: '物业客户连接平台',
      category: 'SaaS产品',
      year: '2020-2022',
      image: '/images/work-ecommerce.jpg',
      description: '通过三大核心功能，重新打造物业体系客户连接以及经营方式，通过大版本的更新升级来进一步提升产品的影响力以及盈利能力。',
      highlights: [
        { icon: Users, label: '团队规模', value: '15人' },
        { icon: Zap, label: '业绩目标', value: '4xxxw' },
        { icon: Star, label: '标杆客户', value: 'YX、LG' },
        { icon: Code2, label: '交付团队', value: '8人' },
      ],
      achievements: [
        '实现第一年业绩目标4xxxw达成，形成标杆YX、LG',
        '输出全新《智慧客服新规划6.0》',
        '荣获《年度优秀员工》称号',
        '通过【智能服务自动化】、【客户信息数据化】、【私域连接器】提升业务能力',
      ],
      tags: ['智慧物业', 'CRM', '客户运营', '私域流量'],
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

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {projects.map((_, pIndex) => (
                    <button
                      key={pIndex}
                      onClick={() => setActiveIndex(pIndex)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        pIndex === activeIndex
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
