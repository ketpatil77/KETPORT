import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Code2, ExternalLink, Sparkles } from 'lucide-react';
import { portfolioConfig, proofConfig } from '@/config';
import { AnimatedText } from '@/components/AnimatedText';
import { motionTokens } from '@/lib/motion';
import { TiltCard } from '@/components/ui/tilt-card';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

export function Portfolio() {
  const shouldReduceMotion = useReducedMotion();
  const { sceneQuality } = useDeviceCapabilities();
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const projects = portfolioConfig.projects;
  const { scrollYProgress } = useScroll({
    target: sectionRef as React.RefObject<HTMLElement>,
    offset: ['start end', 'end start'],
  });
  const glowY = useTransform(scrollYProgress, [0, 1], [-12, 14]);
  const showcaseY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  if (!portfolioConfig.heading || projects.length === 0) return null;

  const activeProject = projects[activeIdx] ?? projects[0];

  const primaryActionLabel = activeProject.liveHref.startsWith('mailto:')
    ? 'Request Private Demo'
    : 'View Live Deployment';

  return (
    <section ref={sectionRef} id="portfolio" className="section-shell relative overflow-hidden">
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] sm:h-[560px] sm:w-[560px] lg:h-[700px] lg:w-[700px]"
        style={{
          background: 'radial-gradient(circle, var(--cyan-full), transparent 65%)',
          ...(shouldReduceMotion ? {} : { y: glowY }),
        }}
        aria-hidden="true"
      />

      <div className="container-large relative z-10">
        <ScrollReveal direction="up" distance={24}>
          <div className="section-header items-start text-left">
            <span className="section-eyebrow">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {proofConfig.label}
            </span>
            <AnimatedText
              el="h2"
              text={proofConfig.heading}
              type="words"
              className="section-title max-w-4xl text-balance"
            />
            <p className="section-copy type-body max-w-3xl">{proofConfig.description}</p>
          </div>
        </ScrollReveal>

        <div className="relative mt-4 border-b border-[var(--border-subtle)] pb-1">
          <div className="scrollbar-none flex gap-1.5 overflow-x-auto py-1.5 scroll-smooth [mask-image:linear-gradient(to_right,black_88%,transparent)]">
            {projects.map((project, idx) => {
              const isActive = idx === activeIdx;
              const displayNum = String(idx + 1).padStart(2, '0');
              return (
                <button
                  key={project.title}
                  onClick={() => setActiveIdx(idx)}
                  className="focus-ring relative flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.11em] transition-all"
                  style={{
                    color: isActive ? 'var(--cyan-full)' : 'var(--text-300)',
                  }}
                  aria-pressed={isActive}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeProjectTab"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: 'var(--cyan-trace)',
                        border: '1px solid var(--border-accent)',
                        boxShadow: '0 0 12px var(--cyan-glow)',
                      }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="font-mono text-[10px] opacity-75">{displayNum}</span>
                  <span className="relative z-10">{project.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <ScrollReveal direction="up" distance={28} delay={0.1}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: motionTokens.ease.standard }}
            className="mt-4 grid items-stretch gap-3 xl:grid-cols-[minmax(300px,0.74fr)_minmax(0,1.26fr)]"
            style={shouldReduceMotion ? undefined : { y: showcaseY }}
          >
            <div className="flex flex-col justify-start">
              <TiltCard maxTilt={2.5} scale={1.005} disabled={Boolean(shouldReduceMotion) || sceneQuality !== 'high'} className="h-full">
                <div
                  className="glass-card relative flex h-full flex-col overflow-hidden rounded-2xl border"
                  style={{
                    borderColor: 'var(--border-subtle)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  <GlowingEffect
                    disabled={Boolean(shouldReduceMotion) || sceneQuality !== 'high'}
                    glow
                    blur={6}
                    spread={60}
                    proximity={100}
                    inactiveZone={0.3}
                    movementDuration={0.8}
                    borderWidth={3}
                    className="z-0 rounded-2xl opacity-80"
                  />

                  <div className="relative z-10 flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2">
                    <div className="flex gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                      <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                      <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-400)] uppercase tracking-widest">
                      {activeProject.category}
                    </span>
                    <span className="font-mono text-xs text-[var(--text-300)]">{activeProject.year}</span>
                  </div>

                  <div className="relative z-10 aspect-[4/2.56] w-full overflow-hidden bg-black/40">
                    <img
                      src={activeProject.posterImage}
                      alt={`${activeProject.title} preview`}
                      className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.03]"
                      loading="eager"
                    />
                  </div>

                  <div className="relative z-10 grid gap-2 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] p-2.5">
                    <div className="grid items-stretch gap-2 sm:grid-cols-2">
                      <div className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-2.5">
                        <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-[var(--text-400)]">Impact</p>
                        <p className="mt-1 text-[13px] font-semibold leading-relaxed text-[var(--text-100)]">{activeProject.impact}</p>
                      </div>
                      <div className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-2.5">
                        <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-[var(--text-400)]">System</p>
                        <p className="mt-1 text-[13px] font-semibold leading-relaxed text-[var(--text-100)]">{activeProject.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            <div className="flex h-full flex-col gap-2.5">
              <div className="glass-card relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] p-3 sm:p-3.5">
                <span className="absolute right-4 top-4 rounded-full border border-[var(--border-accent)] bg-[var(--accent-glow)] px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[var(--cyan-full)]">
                  {activeProject.duration}
                </span>
                <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--cyan-dim)]">
                  {activeProject.category}
                </p>
                <h3 className="type-heading mt-1 pr-20 text-[1.2rem] font-extrabold leading-none text-[var(--text-100)] sm:text-[1.42rem]">
                  {activeProject.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-[var(--text-300)]">
                  Role: <span className="text-[var(--text-200)]">{activeProject.role}</span>
                </p>
                <p className="type-body mt-2 text-[0.87rem] leading-relaxed text-[var(--text-200)]">
                  {activeProject.summary}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {activeProject.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-1 text-[10px] font-semibold text-[var(--text-200)]"
                    >
                      {metric}
                    </span>
                  ))}
                </div>

                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <a
                    href={activeProject.liveHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary focus-ring flex-1 text-xs min-h-[42px] items-center justify-center font-bold"
                  >
                    <span className="flex items-center gap-1.5">
                      {primaryActionLabel}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                  </a>
                  <a
                    href={activeProject.codeHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline focus-ring flex-1 text-xs min-h-[42px] items-center justify-center font-bold"
                    style={{ background: 'var(--bg-elevated)' }}
                  >
                    <span className="flex items-center gap-1.5">
                      View Code
                      <Code2 className="h-3.5 w-3.5" />
                    </span>
                  </a>
                </div>
              </div>

              <div className="grid items-stretch gap-2.5 lg:grid-cols-[minmax(0,1.03fr)_minmax(260px,0.97fr)]">
                <div className="glass-card h-full rounded-2xl border border-[var(--border-subtle)] p-3">
                  <p className="mb-2.5 text-[10px] font-mono uppercase tracking-widest text-[var(--text-400)]">
                    Stack Snapshot
                  </p>
                  <p className="type-body text-[13px] leading-relaxed text-[var(--text-200)]">
                    {activeProject.stackSummary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {activeProject.tech.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="glass-card h-full rounded-2xl border border-[var(--border-subtle)] p-3">
                  <p className="mb-2.5 text-[10px] font-mono uppercase tracking-widest text-[var(--text-400)]">
                    Delivery Highlights
                  </p>
                  <ul className="space-y-2">
                    {activeProject.highlights.map((highlight) => (
                      <li key={highlight} className="type-body flex gap-2 text-[13px] leading-relaxed text-[var(--text-200)]">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--cyan-full)]" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        </ScrollReveal>
      </div>
    </section>
  );
}
