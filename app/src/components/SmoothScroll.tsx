import { useEffect, type PropsWithChildren } from 'react';
import Lenis from 'lenis';

export function SmoothScroll({ children }: PropsWithChildren) {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: -84 },
      duration: 0.58,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1.12,
      prevent: (node) => Boolean(node.closest('[data-lenis-prevent], [role="dialog"]')),
    });

    const handleVisibility = () => {
      if (document.hidden) lenis.stop();
      else lenis.start();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      lenis.destroy();
    };
  }, []);

  return children;
}
