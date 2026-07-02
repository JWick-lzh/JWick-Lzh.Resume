import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CAPS, GROUP_NAMES, WORKS, type CapId } from '../data/portfolio';
import { usePortfolio } from '../context/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

// 每条能力对应多少个作品（tags 含该能力）
const capWorkCount = (id: CapId) => WORKS.filter((w) => w.tags.includes(id)).length;

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { activeCap, setActiveCap, openWork } = usePortfolio();

  const groups: (1 | 2 | 3)[] = [1, 2, 3];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-title',
        { x: -50, opacity: 0, filter: 'blur(10px)' },
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.fromTo(
        '.cap-group',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse' },
          delay: 0.15,
        }
      );
      gsap.fromTo(
        '.cap-chip',
        { opacity: 0, y: 12, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'expo.out',
          stagger: 0.03,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 55%', toggleActions: 'play none none reverse' },
          delay: 0.25,
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleClick = (id: CapId) => {
    setActiveCap(id);
    // 点能力后滚到作品区，聚焦匹配结果
    const works = document.getElementById('works');
    if (works && activeCap !== id) {
      setTimeout(() => works.scrollIntoView({ behavior: 'smooth' }), 60);
    }
  };

  return (
    <section ref={sectionRef} id="skills" className="relative py-24 sm:py-32 bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, var(--lime) 25%, transparent 25%), linear-gradient(-45deg, var(--lime) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--lime) 75%), linear-gradient(-45deg, transparent 75%, var(--lime) 75%)`,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="section-label mb-4 block">能力矩阵</span>
          <h2 className="skills-title text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            点一个能力，看哪些作品能证明它
          </h2>
          <p className="text-white/60 text-lg max-w-3xl">
            点击任意能力标签 → 下方作品自动 <span className="text-[var(--lime)] font-semibold">高亮匹配、淡化无关</span>；
            再点一次取消。每条能力都由真实作品支撑，不是熟练度自评。
          </p>
        </div>

        <div className="space-y-8">
          {groups.map((g) => (
            <div key={g} className="cap-group">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-[var(--lime)]" />
                {GROUP_NAMES[g]}
              </h3>
              <div className="flex flex-wrap gap-3">
                {CAPS.filter((c) => c.group === g).map((cap) => {
                  const active = activeCap === cap.id;
                  const n = capWorkCount(cap.id);
                  return (
                    <button
                      key={cap.id}
                      className={`cap-chip group text-left rounded-2xl border px-4 py-3 transition-all duration-200 min-w-[160px] ${
                        active
                          ? 'border-[var(--lime)] bg-[var(--lime)]/10 shadow-[0_0_24px_rgba(182,243,107,0.22)]'
                          : 'border-white/12 bg-white/[0.03] hover:border-[var(--lime)] hover:-translate-y-0.5'
                      }`}
                      onClick={() => handleClick(cap.id)}
                      aria-pressed={active}
                    >
                      <span
                        className={`block text-sm font-semibold ${active ? 'text-[var(--lime)]' : 'text-white/90'}`}
                      >
                        {cap.cn}
                      </span>
                      <span className="block text-xs text-white/40 mt-0.5">{n} 个作品</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {activeCap && (
          <div className="mt-8 flex items-center gap-3 text-sm text-white/60">
            <span>
              已按「<span className="text-[var(--lime)]">{CAPS.find((c) => c.id === activeCap)?.cn}</span>」筛选
            </span>
            <button
              className="rounded-full border border-white/15 px-3 py-1 hover:border-[var(--lime)] hover:text-[var(--lime)] transition-colors"
              onClick={() => setActiveCap(null)}
            >
              清除筛选
            </button>
            <button
              className="rounded-full border border-white/15 px-3 py-1 hover:border-[var(--lime)] hover:text-[var(--lime)] transition-colors"
              onClick={() => openWork(WORKS.find((w) => w.tags.includes(activeCap))?.id ?? null)}
            >
              打开第一个匹配作品
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
