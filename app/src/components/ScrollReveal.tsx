/**
 * ScrollReveal — reusable scroll-triggered entrance wrapper.
 * Wraps children in a motion.div that fades + slides into view when
 * the element enters the viewport. Respects `prefers-reduced-motion`.
 *
 * Usage:
 *   <ScrollReveal direction="up" delay={0.1}>
 *     <MyComponent />
 *   </ScrollReveal>
 */
import { type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';
type RevealPreset = 'subtle' | 'balanced' | 'cinematic';

const REVEAL_PRESETS: Record<RevealPreset, { distance: number; duration: number; margin: string; initialScale: number; once: boolean; staggerDelay: number }> = {
  subtle: {
    distance: 16,
    duration: 0.36,
    margin: '0px 0px -6% 0px',
    initialScale: 1,
    once: true,
    staggerDelay: 0.06,
  },
  balanced: {
    distance: 26,
    duration: 0.46,
    margin: '0px 0px -8% 0px',
    initialScale: 0.995,
    once: true,
    staggerDelay: 0.09,
  },
  cinematic: {
    distance: 40,
    duration: 0.62,
    margin: '0px 0px -12% 0px',
    initialScale: 0.985,
    once: false,
    staggerDelay: 0.12,
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  /** Motion intensity preset. Default: 'balanced' */
  preset?: RevealPreset;
  /** Initial slide direction. Default: 'up' */
  direction?: Direction;
  /** Initial y/x offset in px. Default: 32 */
  distance?: number;
  /** Delay before animation starts in seconds. Default: 0 */
  delay?: number;
  /** Animation duration in seconds. Default: 0.55 */
  duration?: number;
  /** Viewport margin to trigger earlier. Default: '-60px' */
  margin?: string;
  /** Extra class names on the wrapper */
  className?: string;
  /** Whether to replay when scrolling back up. Default: true (once only) */
  once?: boolean;
  /** Scale factor at start. Default: 1 (no scale) */
  initialScale?: number;
}

function getInitialXY(direction: Direction, distance: number) {
  switch (direction) {
    case 'up':    return { x: 0, y: distance };
    case 'down':  return { x: 0, y: -distance };
    case 'left':  return { x: distance, y: 0 };
    case 'right': return { x: -distance, y: 0 };
    default:      return { x: 0, y: 0 };
  }
}

export function ScrollReveal({
  children,
  preset = 'balanced',
  direction = 'up',
  distance,
  delay = 0,
  duration,
  margin,
  className,
  once,
  initialScale,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const presetConfig = REVEAL_PRESETS[preset];
  const resolvedDistance = distance ?? presetConfig.distance;
  const resolvedDuration = duration ?? presetConfig.duration;
  const resolvedMargin = margin ?? presetConfig.margin;
  const resolvedOnce = once ?? presetConfig.once;
  const resolvedInitialScale = initialScale ?? presetConfig.initialScale;
  const { x, y } = getInitialXY(direction, resolvedDistance);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, scale: resolvedInitialScale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: resolvedOnce, margin: resolvedMargin }}
      transition={{
        duration: resolvedDuration,
        delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollRevealGroup — staggered children reveal.
 * Children should each have a `data-reveal` attribute for selection.
 */
interface ScrollRevealGroupProps {
  children: ReactNode;
  preset?: RevealPreset;
  staggerDelay?: number;
  direction?: Direction;
  distance?: number;
  margin?: string;
  className?: string;
}

export function ScrollRevealGroup({
  children,
  preset = 'balanced',
  staggerDelay,
  direction = 'up',
  distance,
  margin,
  className,
}: ScrollRevealGroupProps) {
  const prefersReducedMotion = useReducedMotion();
  const presetConfig = REVEAL_PRESETS[preset];
  const resolvedDistance = distance ?? presetConfig.distance;
  const resolvedMargin = margin ?? presetConfig.margin;
  const resolvedStaggerDelay = staggerDelay ?? presetConfig.staggerDelay;
  const { x, y } = getInitialXY(direction, resolvedDistance);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: resolvedStaggerDelay,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: resolvedMargin }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : <motion.div variants={itemVariants}>{children}</motion.div>}
    </motion.div>
  );
}
