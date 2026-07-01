/**
 * ScrollReveal — reusable scroll-triggered entrance wrapper.
 * Wraps children in a motion.div that fades + slides + blurs into view when
 * the element enters the viewport. Respects `prefers-reduced-motion`.
 */
import { type ReactNode } from 'react';
import { motion, useReducedMotion, type Transition } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';
type RevealPreset = 'subtle' | 'balanced' | 'cinematic';

const REVEAL_PRESETS: Record<RevealPreset, {
  distance: number;
  duration: number;
  margin: string;
  initialScale: number;
  once: boolean;
  staggerDelay: number;
  blur: number;
}> = {
  subtle: {
    distance: 16,
    duration: 0.4,
    margin: '0px 0px -6% 0px',
    initialScale: 1,
    once: true,
    staggerDelay: 0.06,
    blur: 0,
  },
  balanced: {
    distance: 18,
    duration: 0.42,
    margin: '0px 0px -8% 0px',
    initialScale: 0.995,
    once: true,
    staggerDelay: 0.09,
    blur: 0,
  },
  cinematic: {
    distance: 24,
    duration: 0.46,
    margin: '0px 0px -12% 0px',
    initialScale: 0.99,
    once: true,
    staggerDelay: 0.12,
    blur: 2,
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  preset?: RevealPreset;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  margin?: string;
  className?: string;
  once?: boolean;
  initialScale?: number;
  /** Blur px at start of reveal. Default: preset value */
  blur?: number;
  /** Use spring physics instead of ease curve */
  spring?: boolean;
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
  blur,
  spring = false,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const presetConfig = REVEAL_PRESETS[preset];
  const resolvedDistance = distance ?? presetConfig.distance;
  const resolvedDuration = duration ?? presetConfig.duration;
  const resolvedMargin = margin ?? presetConfig.margin;
  const resolvedOnce = once ?? presetConfig.once;
  const resolvedInitialScale = initialScale ?? presetConfig.initialScale;
  const resolvedBlur = blur ?? presetConfig.blur;
  const { x, y } = getInitialXY(direction, resolvedDistance);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const transition: Transition = spring
    ? { type: 'spring', bounce: 0.22, duration: resolvedDuration + 0.2, delay }
    : { duration: resolvedDuration, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0, x, y,
        scale: resolvedInitialScale,
        filter: resolvedBlur > 0 ? `blur(${resolvedBlur}px)` : undefined,
      }}
      whileInView={{
        opacity: 1, x: 0, y: 0,
        scale: 1,
        filter: resolvedBlur > 0 ? 'blur(0px)' : undefined,
      }}
      viewport={{ once: resolvedOnce, margin: resolvedMargin }}
      transition={transition}
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
      viewport={{ once: true, margin: resolvedMargin }}
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
