import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { PortfolioAssistant } from '@/components/ai/PortfolioAssistant';
import { CodeSandboxCard } from '@/components/ai/CodeSandboxCard';
import { GitHubDashboard } from '@/components/ai/GitHubDashboard';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useSectionScrollFX } from '@/hooks/useSectionScrollFX';
import { AnimatedText } from '@/components/AnimatedText';

export function InnovationLab() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { headerStyle, bodyStyle, accentStyle } = useSectionScrollFX(sectionRef);

  return (
    <section ref={sectionRef} id="innovation-lab" className="section-shell relative overflow-hidden">
      {/* Ambient blob */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, var(--cyan-full), transparent 65%)', filter: 'blur(100px)', ...accentStyle }}
        aria-hidden="true"
      />

      <div className="container-large relative z-10">
        <ScrollReveal direction="up" distance={20}>
          <motion.div className="section-header items-start text-left" style={headerStyle}>
            <span className="section-eyebrow">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              AI + Interactive Engineering
            </span>
            <AnimatedText
              el="h2"
              text="Innovation Lab"
              type="words"
              className="section-title max-w-4xl text-balance"
            />
            <p className="section-copy type-body max-w-3xl">
              Live assistant, code execution sandbox, and GitHub contribution graph integrated into portfolio flow.
            </p>
          </motion.div>
        </ScrollReveal>

        <motion.div
          className="mt-4 grid gap-3 sm:mt-5"
          style={bodyStyle}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid gap-3 xl:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] xl:items-stretch">
            <PortfolioAssistant />
            <CodeSandboxCard />
          </div>
          <GitHubDashboard />
        </motion.div>
      </div>
    </section>
  );
}
