import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { CAP_CN, TIERS, WORKS, type Tier, type Work } from '../data/portfolio';
import { usePortfolio } from '../context/PortfolioContext';

gsap.registerPlugin(ScrollTrigger);

const statusPillClass = (label: string) => {
  if (label.includes('线上')) return 'bg-[var(--lime)] text-black border-[var(--lime)] font-bold';
  if (label.includes('可运行')) return 'text-[var(--lime)] border-[var(--lime)]/60';
  if (label.includes('原型')) return 'text-sky-300 border-sky-300/50';
  return 'text-white/70 border-white/20';
};

const WorkCard = ({ work }: { work: Work }) => {
  const { activeCap, openWork } = usePortfolio();
  const matched = activeCap ? work.tags.includes(activeCap) : false;
  const dimmed = activeCap ? !matched : false;

  return (
    <button
      onClick={() => openWork(work.id)}
      className={`project-card group relative flex flex-col gap-3 text-left rounded-2xl border p-6 transition-all duration-200 overflow-hidden ${
        matched
          ? 'border-[var(--lime)] shadow-[0_0_26px_rgba(182,243,107,0.22)]'
          : 'border-white/10 hover:border-white/25'
      } ${dimmed ? 'opacity-30 saturate-50' : 'opacity-100'} bg-white/[0.03] hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[11px] px-2.5 py-0.5 rounded-full border whitespace-nowrap ${statusPillClass(work.statusLabel)}`}>
          {work.statusLabel}
        </span>
      </div>
      <h3 className="text-lg font-bold text-white leading-snug">{work.title}</h3>
      <div className="text-xs text-white/50 -mt-1">{work.subtitle}</div>
      <p className="text-sm text-white/70 leading-relaxed line-clamp-3">{work.desc}</p>

      <div className="flex flex-wrap gap-2 mt-1">
        {work.metrics.map(([k, v], i) => (
          <span key={i} className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-white/60">
            {k} <b className="text-[var(--lime)] font-semibold">{v}</b>
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 mt-1">
        {work.tags.map((t) => (
          <span
            key={t}
            className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors ${
              activeCap === t
                ? 'text-[var(--lime)] border-[var(--lime)] bg-[var(--lime)]/10'
                : 'text-white/40 border-white/10'
            }`}
          >
            {CAP_CN[t]}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-2 flex items-center gap-1.5 text-sm text-[var(--lime)]">
        查看详情
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </button>
  );
};

const Works = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { activeCap } = usePortfolio();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.works-title',
        { clipPath: 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)' },
        {
          clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      );
      gsap.fromTo(
        '.project-card',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 55%', toggleActions: 'play none none reverse' },
          delay: 0.2,
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const matchCount = activeCap ? WORKS.filter((w) => w.tags.includes(activeCap)).length : 0;

  return (
    <section ref={sectionRef} id="works" className="relative py-24 sm:py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="section-label mb-4 block">作品集</span>
          <h2 className="works-title text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">作品</h2>
          <p className="text-white/60 text-lg max-w-3xl">
            按「能证明什么 + 完成度」分三档。点卡片 → 打开详情：交互原型直接内嵌可玩，真产品看真截图 / 架构 / 方案。
          </p>
          {activeCap && (
            <p className="mt-3 text-sm text-[var(--lime)]">
              正在按「{CAP_CN[activeCap]}」筛选 · 匹配 {matchCount} 个作品（其余已淡化）
            </p>
          )}
        </div>

        <div className="space-y-14">
          {TIERS.map((tr: { tier: Tier; name: string; desc: string }) => (
            <div key={tr.tier}>
              <div className="flex items-center gap-3 mb-5">
                <span
                  className={`w-2.5 h-2.5 rounded-sm ${
                    tr.tier === 'A' ? 'bg-[var(--lime)]' : tr.tier === 'B' ? 'bg-sky-300' : 'bg-purple-300'
                  }`}
                />
                <span className="text-base font-bold text-white">{tr.name}</span>
                <span className="text-xs text-white/40">{tr.desc}</span>
                <span className="flex-1 h-px bg-white/10" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {WORKS.filter((w) => w.tier === tr.tier).map((w) => (
                  <WorkCard key={w.id} work={w} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Works;
