import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useDevice } from '../hooks/useDevice';
import Lenis from 'lenis';

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

/** Wraps the whole app in a Lenis-smoothed scroll — the "buttery" momentum scroll feel behind
 *  most premium agency sites, instead of the browser's native (slightly stepped) wheel scroll. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  const { reducedMotion } = useDevice();

  useEffect(() => {
    if (reducedMotion) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    setLenis(instance);

    let rafId: number;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
    };
  }, [reducedMotion]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
