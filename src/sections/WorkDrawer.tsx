import { useEffect } from 'react';
import { X } from 'lucide-react';
import { CAP_CN, WORKS, type Work } from '../data/portfolio';
import { usePortfolio } from '../context/PortfolioContext';

const Media = ({ work }: { work: Work }) => {
  const m = work.media;

  if (m.type === 'iframe' && m.src) {
    return (
      <div>
        <div className="rounded-xl overflow-hidden border border-white/15 bg-[#0a0a0a]">
          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-white/5 border-b border-white/10">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            <span className="ml-2 text-xs text-white/40 font-mono">{m.url}</span>
          </div>
          {m.mobile ? (
            <div className="flex justify-center py-4 bg-black/40">
              <iframe src={m.src} title={work.title} className="border-0 rounded-[28px] bg-white" style={{ width: 390, height: 680 }} loading="lazy" />
            </div>
          ) : (
            <iframe src={m.src} title={work.title} className="w-full border-0 bg-white" style={{ height: 560 }} loading="lazy" />
          )}
        </div>
        {m.caption && <p className="text-xs text-white/40 border-l-2 border-white/15 pl-3 mt-3">↑ {m.caption}</p>}
      </div>
    );
  }

  if ((m.type === 'shot' || m.type === 'arch') && m.src) {
    return (
      <div>
        <img src={m.src} alt={work.title} className="w-full rounded-xl border border-white/15" />
        {m.caption && <p className="text-xs text-white/40 border-l-2 border-white/15 pl-3 mt-3">↑ {m.caption}</p>}
      </div>
    );
  }

  if (m.type === 'run') {
    return (
      <div>
        <pre className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-[12.5px] text-white/70 font-mono whitespace-pre-wrap leading-relaxed">
          {'$ '}{m.cmd}
        </pre>
        {m.arch && (
          <pre className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-[12.5px] text-white/60 font-mono whitespace-pre overflow-x-auto leading-relaxed">
            {m.arch}
          </pre>
        )}
        {m.caption && <p className="text-xs text-white/40 border-l-2 border-white/15 pl-3 mt-3">{m.caption}</p>}
      </div>
    );
  }

  // plan / Tier C 文案卡
  return (
    <div>
      {m.arch && (
        <pre className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-[12.5px] text-white/60 font-mono whitespace-pre overflow-x-auto leading-relaxed">
          {m.arch}
        </pre>
      )}
      {m.caption && <p className={`text-xs text-white/40 border-l-2 border-white/15 pl-3 ${m.arch ? 'mt-3' : ''}`}>{m.caption}</p>}
    </div>
  );
};

const WorkDrawer = () => {
  const { openWorkId, openWork } = usePortfolio();
  const work = WORKS.find((w) => w.id === openWorkId) ?? null;
  const open = !!work;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') openWork(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openWork]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[90] bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => openWork(null)}
      />
      <aside
        className={`fixed top-0 right-0 z-[100] h-screen w-[min(920px,94vw)] bg-[#0b0f0e] border-l border-white/15 shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!open}
      >
        {work && (
          <>
            <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-white/10">
              <div>
                <h3 className="text-xl font-bold text-white">{work.title}</h3>
                <div className="text-[13px] text-white/50">{work.subtitle}</div>
              </div>
              <button
                onClick={() => openWork(null)}
                className="w-9 h-9 rounded-lg border border-white/15 bg-white/5 text-white/80 hover:border-[var(--lime)] hover:text-[var(--lime)] transition-colors flex items-center justify-center flex-shrink-0"
                aria-label="关闭"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6 space-y-6">
              <div className="flex flex-wrap gap-2">
                {work.metrics.map(([k, v], i) => (
                  <span key={i} className="text-[11px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-white/60">
                    {k} <b className="text-[var(--lime)] font-semibold">{v}</b>
                  </span>
                ))}
              </div>

              <Media work={work} />

              <div>
                <h4 className="text-xs tracking-wider uppercase text-[var(--lime)]/80 mb-3">关键成果</h4>
                <ul className="space-y-2">
                  {work.achievements.map((a, i) => (
                    <li key={i} className="relative pl-5 text-sm text-white/70 leading-relaxed">
                      <span className="absolute left-0 top-[9px] w-2 h-2 rounded-sm bg-[var(--lime)]" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs tracking-wider uppercase text-[var(--lime)]/80 mb-3">体现的能力</h4>
                <div className="flex flex-wrap gap-1.5">
                  {work.tags.map((t) => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded-full border border-[var(--lime)] text-[var(--lime)] bg-[var(--lime)]/10">
                      {CAP_CN[t]}
                    </span>
                  ))}
                </div>
              </div>

              {work.note && (
                <p className="text-[12.5px] text-white/40 border-l-2 border-white/15 pl-3">{work.note}</p>
              )}

              {work.links.length > 0 && (
                <div>
                  <h4 className="text-xs tracking-wider uppercase text-[var(--lime)]/80 mb-3">入口</h4>
                  <div className="flex flex-wrap gap-2.5">
                    {work.links.map((l, i) => {
                      const external = l.href.startsWith('http') || l.href.endsWith('.html');
                      return (
                        <a
                          key={i}
                          href={l.href}
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className={`text-[13px] px-4 py-2 rounded-lg border transition-colors ${
                            l.primary
                              ? 'bg-[var(--lime)] text-black border-[var(--lime)] font-bold hover:opacity-90'
                              : 'bg-white/5 text-white/80 border-white/15 hover:border-[var(--lime)] hover:text-[var(--lime)]'
                          }`}
                        >
                          {l.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default WorkDrawer;
