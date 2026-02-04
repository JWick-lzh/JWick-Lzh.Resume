import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Cpu, Palette } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Lightbulb,
      title: '产品战略',
      description: '定义产品愿景、路线图和进入市场策略，推动业务增长。从0到1构建产品矩阵，实现商业价值最大化。',
      features: ['产品规划', '市场分析', '商业模式设计', '竞争策略'],
    },
    {
      icon: Cpu,
      title: 'AI集成',
      description: '利用机器学习创造智能用户体验，实现变革性成果。构建企业级AI Agent平台，提升工作效率近10倍。',
      features: ['AI Agent设计', '智能自动化', '机器学习集成', '自然语言处理'],
    },
    {
      icon: Palette,
      title: '用户体验设计',
      description: '以用户为中心的设计，平衡美学与功能性和可访问性。打造流畅直观的交互体验。',
      features: ['用户研究', '交互设计', '原型设计', '可用性测试'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.services-title',
        { clipPath: 'inset(50% 50% 50% 50%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards 3D orbit entrance
      gsap.fromTo(
        '.service-card',
        { rotateY: -90, translateZ: 0, opacity: 0 },
        {
          rotateY: 0,
          translateZ: 200,
          opacity: 1,
          duration: 0.7,
          ease: 'expo.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.2,
        }
      );

      // Icon animations
      gsap.fromTo(
        '.service-icon',
        { rotate: -180, scale: 0 },
        {
          rotate: 0,
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
          stagger: 0.1,
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
      id="services"
      className="relative py-24 sm:py-32 bg-black overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, var(--lime) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">服务</span>
          <h2 className="services-title text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            我能为您做什么
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            端到端的产品管理服务，从战略到执行
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--lime)]/50 transition-all duration-500 hover:-translate-y-2 preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-px bg-gradient-to-r from-[var(--lime)]/0 via-[var(--lime)]/0 to-[var(--lime)]/0 group-hover:from-[var(--lime)]/10 group-hover:via-[var(--lime)]/5 group-hover:to-[var(--lime)]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                {/* Icon */}
                <div className="service-icon w-14 h-14 rounded-xl bg-[var(--lime)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--lime)]/20 transition-colors">
                  <service.icon className="w-7 h-7 text-[var(--lime)]" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[var(--lime)] transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-center gap-2 text-sm text-white/50"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
