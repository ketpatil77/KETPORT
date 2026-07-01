import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { AnimatedText } from '@/components/AnimatedText';
import { motionTokens } from '@/lib/motion';
import { publicationsConfig } from '@/config';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useSectionScrollFX } from '@/hooks/useSectionScrollFX';

function PaperFront({ item }: { item: (typeof publicationsConfig.items)[number] }) {
  return (
    <>
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--border-accent) 50%, transparent)' }}
        aria-hidden="true"
      />

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="tech-tag">{item.issue}</span>
        <span className="tech-tag">{item.publishedOn}</span>
        <span className="tech-tag">IF {item.impactFactor}</span>
        <span
          className="rounded-full border px-2.5 py-1 font-mono text-[0.6rem] font-semibold uppercase tracking-wider"
          style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)', color: 'var(--text-300)' }}
        >
          {item.paperId}
        </span>
      </div>

      <div className="mt-3.5">
        <h3
          title={item.title}
          className="type-heading line-clamp-4 text-balance text-[0.9rem] font-bold leading-[1.28] text-[var(--text-100)] sm:text-[0.98rem]"
        >
          {item.title}
        </h3>
        <p className="mt-2.5 text-[0.72rem] font-semibold text-[var(--text-200)]">{item.journal}</p>
        <p className="mt-1 line-clamp-2 text-[0.72rem] leading-relaxed text-[var(--text-400)]">{item.authors}</p>
      </div>

      <p className="type-body mt-3 line-clamp-4 text-[0.88rem] leading-[1.58] text-[var(--text-200)]">{item.summary}</p>

      <div className="mt-4 flex-1">
        <p className="type-meta text-[0.62rem] font-bold text-[var(--text-400)]">Key Contributions</p>
        <ul className="mt-2.5 space-y-2">
          {item.contributions.map((contribution) => (
            <li key={contribution} className="type-body flex gap-2 text-[0.86rem] leading-[1.5] text-[var(--text-200)]">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--cyan-full)]" aria-hidden="true" />
              <span className="line-clamp-3">{contribution}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-3.5">
        <p className="hidden text-[0.62rem] text-[var(--text-500)] lg:block">Hover for proof metrics</p>
        <a
          href={item.pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline focus-ring inline-flex items-center gap-1.5 px-3 py-2 text-xs"
        >
          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
          Read Paper
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </>
  );
}

function PaperCard({
  item,
  index,
  shouldReduceMotion,
}: {
  item: (typeof publicationsConfig.items)[number];
  index: number;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.3, ease: motionTokens.ease.standard, delay: index * 0.06 }
      }
      className="theme-dark-panel relative flex min-h-[23.75rem] flex-col overflow-hidden rounded-2xl border p-3.5 sm:p-4 glass-card"
      style={{
        borderColor: 'var(--border-subtle)',
        background: 'linear-gradient(180deg, rgba(7,10,14,0.96), rgba(10,12,16,0.92))',
      }}
    >
      <PaperFront item={item} />
    </motion.article>
  );
}

export function Publications() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { headerStyle, bodyStyle, accentStyle } = useSectionScrollFX(sectionRef);

  if (publicationsConfig.items.length === 0) return null;

  return (
    <section ref={sectionRef} id="publications" className="section-shell relative overflow-hidden">
      <motion.div
        className="pointer-events-none absolute left-1/4 top-0 h-[360px] w-[360px] -translate-y-1/3 rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, var(--violet), transparent 65%)', filter: 'blur(90px)' }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] translate-x-1/4 translate-y-1/4 rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, var(--cyan-full), transparent 65%)', filter: 'blur(100px)', ...accentStyle }}
        aria-hidden="true"
      />

      <div className="container-large relative z-10">
        <ScrollReveal direction="up" distance={20}>
          <motion.div className="section-header items-start text-left" style={headerStyle}>
            <span className="section-eyebrow">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {publicationsConfig.label}
            </span>
            <AnimatedText
              el="h2"
              text={publicationsConfig.heading}
              type="words"
              className="section-title max-w-4xl text-balance"
            />
            <p className="section-copy type-body max-w-3xl">{publicationsConfig.description}</p>
          </motion.div>
        </ScrollReveal>

        <ScrollReveal direction="left" distance={20} delay={0.1}>
          <div className="mt-4 flex flex-wrap gap-2">
            {publicationsConfig.themes.map((theme) => (
              <div
                key={theme}
                className="flex items-start gap-2 rounded-lg border px-3 py-2"
                style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-elevated)' }}
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--cyan-full)]" aria-hidden="true" />
                <span className="type-body text-xs leading-relaxed text-[var(--text-200)]">{theme}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={shouldReduceMotion ? { duration: 0 } : motionTokens.spring.soft}
          className="relative mt-5 overflow-hidden rounded-[1.45rem] border p-4 sm:p-5 glass-card"
          style={{
            borderColor: 'var(--border-subtle)',
          }}
        >
          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--border-accent) 40%, rgba(201,169,97,0.36) 70%, transparent)' }}
            aria-hidden="true"
          />

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(15rem,20rem)]">
            <div className="min-w-0">
              <p className="type-meta text-[0.66rem] font-bold text-[var(--cyan-full)]">Research Snapshot</p>
              <h3 className="mt-2 type-heading text-[1.28rem] font-bold leading-tight text-[var(--text-100)] sm:text-[1.5rem]">
                Three peer-reviewed AI/ML papers published in 2026.
              </h3>
              <p className="type-body mt-3 max-w-2xl text-sm leading-relaxed text-[var(--text-300)]">
                Publication-grade proof with benchmark metrics, edge deployment context, and direct paper access.
              </p>
            </div>

            <div className="grid grid-cols-2 items-stretch gap-3">
              {publicationsConfig.highlights.map((metric) => (
                <div
                  key={metric.label}
                  className="flex h-full min-w-0 flex-col justify-between rounded-2xl border px-3 py-3 sm:px-4"
                  style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-elevated)' }}
                >
                  <p className="type-heading text-[clamp(1.08rem,2vw,1.4rem)] font-bold leading-none text-[var(--text-100)] tabular-nums">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-[0.6rem] font-semibold uppercase tracking-[0.12em] leading-snug text-[var(--text-400)]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div className="mt-4 grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3" style={bodyStyle}>
          {publicationsConfig.items.map((item, index) => (
            <PaperCard key={item.paperId} item={item} index={index} shouldReduceMotion={shouldReduceMotion} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
