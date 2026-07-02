import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { CAP_CN, WORKS, type CapId } from '../data/portfolio';

interface PortfolioState {
  activeCap: CapId | null;
  setActiveCap: (c: CapId | null) => void;
  openWorkId: string | null;
  openWork: (id: string | null) => void;
}

const PortfolioContext = createContext<PortfolioState | null>(null);

function isCapId(v: string): v is CapId {
  return v in CAP_CN;
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [activeCap, setActiveCapState] = useState<CapId | null>(null);
  const [openWorkId, setOpenWorkId] = useState<string | null>(null);
  // 防止「写 hash → hashchange → 再 set state」的回环
  const writingHash = useRef(false);

  const setActiveCap = useCallback((c: CapId | null) => {
    setActiveCapState((prev) => (prev === c ? null : c));
  }, []);

  const openWork = useCallback((id: string | null) => {
    setOpenWorkId(id);
  }, []);

  // 解析 hash → 状态
  const applyHash = useCallback(() => {
    const h = window.location.hash;
    if (h.startsWith('#work/')) {
      const id = h.slice('#work/'.length);
      if (WORKS.some((w) => w.id === id)) setOpenWorkId(id);
    } else if (h.startsWith('#cap/')) {
      const id = h.slice('#cap/'.length);
      if (isCapId(id)) setActiveCapState(id);
    } else if (h === '' || h === '#works' || h === '#skills') {
      setOpenWorkId(null);
    }
  }, []);

  useEffect(() => {
    applyHash();
    const onHash = () => {
      if (writingHash.current) {
        writingHash.current = false;
        return;
      }
      applyHash();
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [applyHash]);

  // 状态 → hash（可分享深链）
  useEffect(() => {
    if (openWorkId) {
      const target = `#work/${openWorkId}`;
      if (window.location.hash !== target) {
        writingHash.current = true;
        window.location.hash = target;
      }
    } else if (window.location.hash.startsWith('#work/')) {
      writingHash.current = true;
      window.location.hash = '#works';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openWorkId]);

  useEffect(() => {
    if (activeCap) {
      const target = `#cap/${activeCap}`;
      if (window.location.hash !== target && !window.location.hash.startsWith('#work/')) {
        writingHash.current = true;
        window.location.hash = target;
      }
    } else if (window.location.hash.startsWith('#cap/')) {
      writingHash.current = true;
      window.location.hash = '#skills';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCap]);

  return (
    <PortfolioContext.Provider value={{ activeCap, setActiveCap, openWorkId, openWork }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio(): PortfolioState {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
