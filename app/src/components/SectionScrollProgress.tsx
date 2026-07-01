/**
 * SectionScrollProgress — a thin glowing vertical line on the left that
 * fills from 0→100% as you scroll through the section.
 * Drop inside any section that has a ref.
 */
import { motion, MotionValue, useTransform } from 'framer-motion';

interface SectionScrollProgressProps {
  /** The scrollYProgress from useSectionScrollFX or useScroll */
  scrollYProgress: MotionValue<number>;
  /** Clamp to entry range only (0→0.5) or full (0→1). Default: false (full) */
  entryOnly?: boolean;
}

export function SectionScrollProgress({ scrollYProgress, entryOnly = false }: SectionScrollProgressProps) {
  const scaleY = useTransform(
    scrollYProgress,
    entryOnly ? [0, 0.5] : [0, 0.5, 1],
    entryOnly ? [0, 1]   : [0, 1, 1],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.85, 1], [0, 1, 1, 0]);

  return (
    <div
      className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-[2px]"
      aria-hidden="true"
    >
      {/* Track */}
      <div
        className="absolute inset-0 w-[2px]"
        style={{ background: 'var(--border-subtle)' }}
      />
      {/* Fill */}
      <motion.div
        className="absolute inset-x-0 top-0 w-[2px] origin-top"
        style={{
          background: 'linear-gradient(180deg, var(--cyan-full), var(--border-accent))',
          scaleY,
          opacity,
          height: '100%',
          boxShadow: '0 0 8px var(--cyan-full)',
        }}
      />
    </div>
  );
}
