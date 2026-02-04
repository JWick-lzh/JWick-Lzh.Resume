import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: '张明',
      title: '云智科技CEO',
      avatar: '/images/about-portrait.jpg',
      content: '林灶辉将复杂AI概念转化为用户友好产品的能力令人瞩目。他领导的聊天机器人项目使客户支持效率提高了300%。他的战略思维和技术专长的结合是罕见的。',
      rating: 5,
    },
    {
      name: '李雪',
      title: '创新实验室产品副总裁',
      avatar: '/images/about-portrait.jpg',
      content: '战略思维与技术专长的罕见结合。林灶辉的产品路线图使我们的用户基数在18个月内增长了500%。他对市场趋势的洞察力帮助我们始终保持竞争优势。',
      rating: 5,
    },
    {
      name: '王强',
      title: '数字解决方案公司首席技术官',
      avatar: '/images/about-portrait.jpg',
      content: '杰出的产品经理，理解技术和业务两方面。他推出的SaaS平台仍然是我们的旗舰产品。他的团队领导能力也非常出色，能够激励团队达成目标。',
      rating: 5,
    },
    {
      name: '陈婷',
      title: '电商解决方案总监',
      avatar: '/images/about-portrait.jpg',
      content: '林灶辉的个性化引擎彻底改变了我们的推荐系统。转化率从未如此之高。他对用户需求的深刻理解和对细节的关注使产品脱颖而出。',
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.testimonials-title',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Quote icon
      gsap.fromTo(
        '.quote-icon',
        { scale: 0, rotate: -20 },
        {
          scale: 1,
          rotate: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.2,
        }
      );

      // Cards
      gsap.fromTo(
        '.testimonial-card',
        { y: 50, scale: 0.9, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          stagger: 0.15,
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

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 sm:py-32 bg-black overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[var(--lime)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[var(--lime)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[var(--lime)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-label mb-4 block">客户评价</span>
          <h2 className="testimonials-title text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            客户与伙伴怎么说
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            建立信任，通过交付卓越成果实现
          </p>
        </div>

        {/* Quote Icon */}
        <div className="quote-icon flex justify-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[var(--lime)]/10 flex items-center justify-center">
            <Quote className="w-8 h-8 text-[var(--lime)]" />
          </div>
        </div>

        {/* Testimonial Cards Stack */}
        <div className="relative max-w-3xl mx-auto h-[400px]">
          {testimonials.map((testimonial, index) => {
            const offset = index - activeIndex;
            const isActive = index === activeIndex;
            const isVisible = Math.abs(offset) <= 1;

            return (
              <div
                key={index}
                className={`testimonial-card absolute inset-0 transition-all duration-500 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  transform: `
                    translateY(${offset * 20}px)
                    translateZ(${-Math.abs(offset) * 50}px)
                    scale(${1 - Math.abs(offset) * 0.05})
                  `,
                  opacity: isActive ? 1 : Math.max(0, 0.8 - Math.abs(offset) * 0.3),
                  zIndex: testimonials.length - Math.abs(offset),
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <div className="h-full p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[var(--lime)] text-[var(--lime)]" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-white/80 text-lg leading-relaxed mb-8">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[var(--lime)]/30"
                    />
                    <div>
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-white/50 text-sm">{testimonial.title}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prevTestimonial}
            className="p-3 rounded-full border border-white/20 hover:border-[var(--lime)] hover:text-[var(--lime)] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? 'w-8 bg-[var(--lime)]'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-3 rounded-full border border-white/20 hover:border-[var(--lime)] hover:text-[var(--lime)] transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
