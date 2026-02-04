import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillCategories = [
    {
      title: '产品管理',
      skills: [
        { name: '产品策略', level: 95 },
        { name: '路线图规划', level: 90 },
        { name: '敏捷/Scrum', level: 95 },
        { name: '数据分析', level: 85 },
      ],
    },
    {
      title: 'AI与技术',
      skills: [
        { name: 'AI Agent设计', level: 90 },
        { name: '机器学习', level: 80 },
        { name: 'Python', level: 75 },
        { name: 'API设计', level: 90 },
      ],
    },
    {
      title: '设计与协作',
      skills: [
        { name: '用户体验设计', level: 85 },
        { name: '线框图制作', level: 90 },
        { name: '利益相关者管理', level: 95 },
        { name: '用户研究', level: 80 },
      ],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.skills-title',
        { x: -50, opacity: 0, filter: 'blur(10px)' },
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Category titles
      gsap.fromTo(
        '.category-title',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.2,
        }
      );

      // Skill bars
      gsap.fromTo(
        '.skill-bar-fill',
        { width: '0%' },
        {
          width: (_index: number, el: HTMLElement) => el.dataset.level + '%',
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.4,
        }
      );

      // Percentage counter
      gsap.fromTo(
        '.skill-percent',
        { textContent: 0 },
        {
          textContent: (_index: number, el: HTMLElement) => el.dataset.level,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.08,
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.4,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 sm:py-32 bg-black overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, var(--lime) 25%, transparent 25%), linear-gradient(-45deg, var(--lime) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--lime) 75%), linear-gradient(-45deg, transparent 75%, var(--lime) 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <span className="section-label mb-4 block">技能</span>
          <h2 className="skills-title text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            我的专业工具箱
          </h2>
          <p className="text-white/60 text-lg max-w-2xl">
            将技术专长与产品敏锐度相结合，交付卓越成果
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skillCategories.map((category, cIndex) => (
            <div key={cIndex}>
              <h3 className="category-title text-xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-[var(--lime)]" />
                {category.title}
              </h3>

              <div className="space-y-5">
                {category.skills.map((skill, sIndex) => (
                  <div key={sIndex} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80 text-sm font-medium group-hover:text-[var(--lime)] transition-colors">
                        {skill.name}
                      </span>
                      <span
                        className="skill-percent text-[var(--lime)] text-sm font-bold"
                        data-level={skill.level}
                      >
                        0%
                      </span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="skill-bar-fill h-full bg-gradient-to-r from-[var(--lime)] to-[#a8d46f] rounded-full relative"
                        data-level={skill.level}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
