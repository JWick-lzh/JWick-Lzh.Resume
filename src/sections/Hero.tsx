import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.hero-title-line',
        { y: 100, rotateX: -90, opacity: 0 },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          delay: 0.3,
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { x: -50, opacity: 0, filter: 'blur(10px)' },
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'power2.out',
          delay: 0.7,
        }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'elastic.out(1, 0.5)',
          delay: 0.9,
        }
      );

      // Floating elements
      gsap.to('.floating-element', {
        y: -15,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      });
    }, heroRef);

    // Particle animation
    const canvas = particlesRef.current;
    if (canvas) {
      const ctx2d = canvas.getContext('2d');
      if (ctx2d) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
        const particleCount = 60;

        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
          });
        }

        let animationId: number;
        const animate = () => {
          ctx2d.clearRect(0, 0, canvas.width, canvas.height);

          particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx2d.beginPath();
            ctx2d.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx2d.fillStyle = 'rgba(215, 235, 110, 0.6)';
            ctx2d.fill();

            // Draw connections
            particles.slice(i + 1).forEach((p2) => {
              const dx = p.x - p2.x;
              const dy = p.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < 150) {
                ctx2d.beginPath();
                ctx2d.moveTo(p.x, p.y);
                ctx2d.lineTo(p2.x, p2.y);
                ctx2d.strokeStyle = `rgba(215, 235, 110, ${0.2 * (1 - dist / 150)})`;
                ctx2d.lineWidth = 0.5;
                ctx2d.stroke();
              }
            });
          });

          animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
          cancelAnimationFrame(animationId);
        };
      }
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Particle Canvas */}
      <canvas
        ref={particlesRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black z-[1]" />

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-[var(--lime)]/20 rounded-full floating-element z-[2]" />
      <div className="absolute bottom-32 right-20 w-32 h-32 border border-[var(--lime)]/10 rounded-full floating-element z-[2]" />
      <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-[var(--lime)]/40 rounded-full floating-element z-[2]" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Archive Badge */}
        <div className="mb-8 inline-flex items-center gap-3">
          <span className="archive-badge">
            <Sparkles className="w-3 h-3" />
            VOL. 001 // ARCHIVED
          </span>
        </div>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 perspective-1000"
        >
          <span className="hero-title-line block" style={{ transformStyle: 'preserve-3d' }}>
            林灶辉
          </span>
          <span
            className="hero-title-line block text-gradient mt-2"
            style={{ transformStyle: 'preserve-3d' }}
          >
            AI产品经理
          </span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          10年SaaS行业深耕，专注企业级AI Agent平台从0到1商业化
          <br />
          将战略思维与技术专长相结合，打造面向未来的解决方案
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--lime)] text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300 glow-lime"
          >
            联系我
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#works"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold rounded-full hover:border-[var(--lime)] hover:text-[var(--lime)] transition-colors duration-300"
          >
            查看我的作品
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-[var(--lime)]">10+</div>
            <div className="text-sm text-white/50 mt-1">年经验</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-[var(--lime)]">20+</div>
            <div className="text-sm text-white/50 mt-1">团队管理</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold text-[var(--lime)]">5000+</div>
            <div className="text-sm text-white/50 mt-1">用户服务</div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-[5]" />
    </section>
  );
};

export default Hero;
