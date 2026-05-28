import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Code2, ExternalLink, Sparkles } from 'lucide-react';
import { portfolioConfig, proofConfig } from '@/config';
import { AnimatedText } from '@/components/AnimatedText';
import { motionTokens } from '@/lib/motion';
import { TiltCard } from '@/components/ui/tilt-card';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { ScrollReveal } from '@/components/ScrollReveal';

export function Portfolio() {
  const shouldReduceMotion = useReducedMotion();
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
      {/* Background radial glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] sm:h-[560px] sm:w-[560px] lg:h-[700px] lg:w-[700px]"
        style={{
          background: 'radial-gradient(circle, var(--cyan-full), transparent 65%)',
          ...(shouldReduceMotion ? {} : { y: glowY }),
        }}
        aria-hidden="true"
      />

      <div className="container-large relative z-10">
        {/* Left-aligned Section Header for consistency */}
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

        {/* Project Tab Selector */}
        <div className="relative mt-8 border-b border-[var(--border-subtle)] pb-2">
          <div className="scrollbar-none flex overflow-x-auto gap-2 py-1 scroll-smooth">
            {projects.map((project, idx) => {
              const isActive = idx === activeIdx;
              const displayNum = String(idx + 1).padStart(2, '0');
              return (
                <button
                  key={project.title}
                  onClick={() => setActiveIdx(idx)}
                  className="focus-ring relative shrink-0 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all min-h-[44px] flex items-center gap-2"
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

        {/* Selected Project Showcase & Details Bento */}
        <ScrollReveal direction="up" distance={28} delay={0.1}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, ease: motionTokens.ease.standard }}
            className="mt-8 grid gap-6 lg:grid-cols-12"
            style={shouldReduceMotion ? undefined : { y: showcaseY }}
          >
            {/* Left: Browser Mockup Visual Stage */}
            <div className="lg:col-span-5 flex flex-col justify-start">
              <TiltCard maxTilt={3} scale={1.01} disabled={Boolean(shouldReduceMotion)} className="h-full">
                <div
                  className="glass-card relative flex h-full flex-col overflow-hidden rounded-2xl border"
                  style={{
                    borderColor: 'var(--border-subtle)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  {/* Glowing Effect Background */}
                  <GlowingEffect
                    disabled={Boolean(shouldReduceMotion)}
                    glow
                    blur={6}
                    spread={60}
                    proximity={100}
                    inactiveZone={0.3}
                    movementDuration={0.8}
                    borderWidth={3}
                    className="z-0 rounded-2xl opacity-80"
                  />

                  {/* Browser Mockup Title Bar */}
                  <div className="relative z-10 flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-4 py-3">
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

                  {/* Image container */}
                  <div className="relative z-10 aspect-[4/3] w-full overflow-hidden bg-black/40 lg:aspect-auto lg:flex-1">
                    <img
                      src={activeProject.posterImage}
                      alt={`${activeProject.title} preview`}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      loading="eager"
                    />
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Right: Details Bento Container */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Bento Row 1: Overview */}
              <div className="glass-card rounded-2xl border border-[var(--border-subtle)] p-5 relative overflow-hidden">
                <span className="absolute right-4 top-4 text-xs font-mono font-bold text-[var(--cyan-full)]">
                  {activeProject.duration}
                </span>
                <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--cyan-dim)]">
                  {activeProject.category}
                </p>
                <h3 className="type-heading mt-1.5 text-2xl font-extrabold text-[var(--text-100)]">
                  {activeProject.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-[var(--text-300)]">
                  Role: <span className="text-[var(--text-200)]">{activeProject.role}</span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--text-200)]">
                  {activeProject.summary}
                </p>
              </div>

              {/* Bento Row 2: Metrics Grid */}
              <div className="glass-card rounded-2xl border border-[var(--border-subtle)] p-5">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-400)] mb-3">
                  Measurable Impact
                </p>
                <div className="grid gap-3 grid-cols-2">
                  {activeProject.metrics.map((metric) => (
                    <div
                      key={metric}
                      className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-3 shadow-xs"
                    >
                      <p className="text-[9px] font-mono font-bold text-[var(--cyan-full)] uppercase tracking-wider">
                        Key Outcome
                      </p>
                      <p className="mt-1 text-xs font-semibold leading-relaxed text-[var(--text-100)]">{metric}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bento Row 3: Achievements & Stack */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Tech Stack */}
                <div className="glass-card rounded-2xl border border-[var(--border-subtle)] p-5 flex flex-col">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-400)] mb-3">
                    Active Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.tech.map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="glass-card rounded-2xl border border-[var(--border-subtle)] p-5 flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-400)] mb-3">
                      Key Highlights
                    </p>
                    <ul className="space-y-2">
                      {activeProject.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-2 text-xs leading-relaxed text-[var(--text-200)]">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--cyan-full)]" aria-hidden="true" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions Row */}
                  <div className="mt-5 flex gap-3">
                    <a
                      href={activeProject.liveHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary focus-ring flex-1 text-xs min-h-[40px] items-center justify-center font-bold"
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
                      className="btn-outline focus-ring flex-1 text-xs min-h-[40px] items-center justify-center font-bold"
                      style={{ background: 'var(--bg-elevated)' }}
                    >
                      <span className="flex items-center gap-1.5">
                        View Code
                        <Code2 className="h-3.5 w-3.5" />
                      </span>
                    </a>
                  </div>
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
