import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Briefcase, User, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const infoItems = [
    { icon: User, label: '姓名', value: '林灶辉' },
    { icon: Calendar, label: '年龄', value: '32岁' },
    { icon: Briefcase, label: '职业', value: 'AI产品经理' },
    { icon: MapPin, label: '城市', value: '中国，深圳' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image 3D flip entrance
      gsap.fromTo(
        imageRef.current,
        { rotateY: -90, opacity: 0 },
        {
          rotateY: -5,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animations
      gsap.fromTo(
        '.about-label',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.2,
        }
      );

      gsap.fromTo(
        '.about-title',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.3,
        }
      );

      gsap.fromTo(
        '.about-text',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.6,
        }
      );

      gsap.fromTo(
        '.info-item',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.8,
        }
      );

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        y: -50,
        rotateY: -3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 sm:py-32 bg-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative perspective-1000"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--lime)]/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="https://api.dicebear.com/8.x/bottts/svg?seed=AIAvatar&backgroundColor=1a1a1a"
                alt="林灶辉"
                className="relative w-full max-w-md mx-auto lg:mx-0 rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[var(--lime)]/30 rounded-2xl -z-10" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="lg:pl-12">
            <span className="about-label section-label mb-4 block">关于我</span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              <span className="about-title block">打造以用户为中心的</span>
              <span className="about-title block text-gradient">AI产品，创造持久影响力</span>
            </h2>

            <div className="space-y-4 text-white/70 text-base sm:text-lg leading-relaxed mb-8">
              <p className="about-text">
                10 年 toB/SaaS 产品经验，做过供应链中台、智能客服、供应链金融、AI Agent 平台等产品。最近两年主要做 AI + 企业协同方向，带 20 人团队交付了一个企业级 AI Agent 平台，上线第一个月就签下了付费客户。
              </p>
              <p className="about-text">
                完整跑通过商业闭环：从售前方案到产品交付再到客户续签，带队完成过全年数千万业绩目标。有从 0 拉团队的经验，带过 20+ 人团队，4 个月内从概念验证做到商业化版本上线。
              </p>
              <p className="about-text">
                对 AI 技术有实际落地经验，熟悉大模型、Agent、MCP 等技术，负责过自然语言任务流交互、MCP 插件机制、多 Agent 协作体系的产品设计，推动框架开源吸引了 4000+ 开发者。
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {infoItems.map((item, index) => (
                <div
                  key={index}
                  className="info-item flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <item.icon className="w-5 h-5 text-[var(--lime)]" />
                  <div>
                    <div className="text-xs text-white/50">{item.label}</div>
                    <div className="text-sm font-medium text-white">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#experience"
              className="about-text inline-flex items-center gap-2 text-[var(--lime)] font-medium hover:gap-3 transition-all"
            >
              了解更多经历
              <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
