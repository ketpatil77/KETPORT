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

interface ScrollRevealProps {
  children: ReactNode;
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
  direction = 'up',
  distance = 28,
  delay = 0,
  duration = 0.5,
  margin = '0px',
  className,
  once = true,
  initialScale = 1,
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const { x, y } = getInitialXY(direction, distance);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y, scale: initialScale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin }}
      transition={{
        duration,
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
  staggerDelay?: number;
  direction?: Direction;
  distance?: number;
  margin?: string;
  className?: string;
}

export function ScrollRevealGroup({
  children,
  staggerDelay = 0.1,
  direction = 'up',
  distance = 24,
  margin = '0px',
  className,
}: ScrollRevealGroupProps) {
  const prefersReducedMotion = useReducedMotion();
  const { x, y } = getInitialXY(direction, distance);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
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
      viewport={{ once: true, margin }}
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
