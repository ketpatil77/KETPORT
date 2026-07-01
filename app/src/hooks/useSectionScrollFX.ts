import type { RefObject } from 'react';
import { useReducedMotion, useScroll, useTransform } from 'framer-motion';

export function useSectionScrollFX(sectionRef: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef as RefObject<HTMLElement>,
    offset: ['start end', 'end start'],
  });

  // Header: slides up while entering, drifts back while exiting
  const headerY = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [36, 0, 0, -22]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [0, 1, 1, 0.5]);
  const headerBlur = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [6, 0, 0, 3]);

  // Body: slightly deeper parallax + fade
  const bodyY = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [48, 0, 0, -30]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.10, 0.88, 1], [0, 1, 1, 0.55]);

  // Accent blobs: counter-parallax for depth
  const accentScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.98]);
  const accentY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Cards grid: slight scale-in on approach
  const cardsScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.97, 1, 1, 0.98]);
  // Header blur as CSS filter string
  const headerFilter = useTransform(headerBlur, (v: number) => `blur(${v}px)`);

  return {
    reduced,
    scrollYProgress,
    headerStyle: reduced ? undefined : {
      y: headerY,
      opacity: headerOpacity,
      filter: headerFilter,
    },
    bodyStyle: reduced ? undefined : {
      y: bodyY,
      opacity: contentOpacity,
      scale: cardsScale,
    },
    accentStyle: reduced ? undefined : {
      scale: accentScale,
      y: accentY,
    },
  };
}

