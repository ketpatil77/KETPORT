import { useEffect, useRef } from 'react';
import { useReducedMotion, useScroll, useTransform, motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  BriefcaseBusiness,
  Download,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { brandConfig, heroConfig, proofConfig } from '@/config';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { ParticleTextEffect } from '@/components/ui/particle-text-effect';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { useThemeContext } from '@/context/ThemeContext';
import { LiquidWebGLBackground } from '@/components/ui/liquid-webgl-bg';
import { useIsMobile } from '@/hooks/use-mobile';
import anime from 'animejs';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

function useSpotlight(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };
    el.addEventListener('mousemove', handler);
    return () => el.removeEventListener('mousemove', handler);
  }, [enabled, ref]);
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { shouldLoad3D, sceneQuality } = useDeviceCapabilities();
  const lowPerformanceMode = shouldReduceMotion || isMobile || !shouldLoad3D || sceneQuality !== 'high';
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const theme = useThemeContext();
  const isLight = theme === 'light';
  useSpotlight(cardRef, !lowPerformanceMode);

  // Parallax for vCard on desktop scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef as React.RefObject<HTMLElement>,
    offset: ['start start', 'end start'],
  });
  const cardParallaxY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const titleParts = heroConfig.title.split('|').map((part) => part.trim()).filter(Boolean);
  const mobileHeroLabel = titleParts[0] ?? heroConfig.title;
  const mobileStats = heroConfig.metrics.slice(0, 3);
  const spotlightItems = heroConfig.spotlightItems.slice(0, 3);
  const particlePalette = sceneQuality === 'low'
    ? (isLight ? ['#c84b00', '#e65100'] : ['#ffccbc', '#ff7043'])
    : isLight
      ? ['#bf360c', '#e65100']
      : ['#ffccbc', '#ff7043'];

  useEffect(() => {
    if (lowPerformanceMode) return;

    const tl = anime.timeline({ easing: 'easeOutExpo' });

    tl.add({
      targets: '.hero-fade-up',
      translateY: [24, 0],
      opacity: [0, 1],
      filter: ['blur(6px)', 'blur(0px)'],
      duration: 1000,
      delay: anime.stagger(150, { start: 500 }),
      easing: 'easeOutQuint',
    })
      .add(
        {
          targets: '.hero-tag',
          scale: [0.8, 1],
          opacity: [0, 1],
          duration: 800,
          delay: anime.stagger(60),
          easing: 'easeOutElastic(1, 0.6)',
        },
        '-=600',
      )
      .add(
        {
          targets: '.hero-card-wrapper',
          translateX: [40, 0],
          translateY: [20, 0],
          rotateX: [12, 0],
          rotateY: [-12, 0],
          scale: [0.96, 1],
          opacity: [0, 1],
          duration: 1200,
          easing: 'easeOutQuart',
        },
        '-=1000',
      )
      .add(
        {
          targets: '.btn-magnetic',
          opacity: [0, 1],
          translateY: [15, 0],
          duration: 600,
          delay: anime.stagger(100),
          easing: 'easeOutBack',
        },
        '-=800',
      );
  }, [lowPerformanceMode]);

  if (!heroConfig.name) return null;

  /* ─── MOBILE LAYOUT ─────────────────────────────────── */
  if (isMobile) {
    return (
      <section id="hero" className="hero-mobile-section relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.15]" aria-hidden="true" />

        <div className="hero-vcard-photo">
          <div className="hero-vcard-badge">Available 2026</div>
          <img
            src="/images/profile.jpg"
            alt={`Portrait of ${heroConfig.name}`}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="hero-vcard-content">
          <div>
            <p className="hero-vcard-role">{mobileHeroLabel}</p>
            <h1 className="hero-vcard-name">{heroConfig.name}</h1>
          </div>

          <p className="hero-vcard-intro">{heroConfig.intro}</p>

          {/* Stats ribbon */}
          <div className="hero-vcard-stats" aria-label="Portfolio metrics">
            {mobileStats.map((metric) => (
              <div key={metric.label} className="hero-vcard-stat">
                <p className="hero-vcard-stat-value">{metric.value}</p>
                <p className="hero-vcard-stat-label">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Role chip */}
          <div className="hero-vcard-chips">
            <span className="hero-vcard-chip">{heroConfig.roles[0]}</span>
          </div>

          <a href="#portfolio" className="hero-vcard-cta btn-primary focus-ring">
            Explore Case Studies
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>
    );
  }

  /* ─── DESKTOP LAYOUT ─────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden pt-14 pb-6 sm:pt-16 sm:pb-8 lg:pt-[4.5rem] lg:pb-8"
      style={{ perspective: '1200px' }}
    >
      {!lowPerformanceMode && <LiquidWebGLBackground />}

      <div className="pointer-events-none absolute inset-0 bg-dot-grid opacity-[0.25]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg-base)]/50 to-[var(--bg-base)] z-0"
        aria-hidden="true"
      />

      <div className="container-large relative z-10">
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)] lg:gap-5 xl:gap-6">
          {/* ── Left column ── */}
          <div className="flex flex-col gap-3.5 md:gap-4.5">
            <div className={shouldReduceMotion ? '' : 'hero-fade-up opacity-0'}>
              <span className="section-eyebrow">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Available for 2026 engineering roles and high-impact product collaborations
              </span>
            </div>

            <div className="space-y-1">
              {lowPerformanceMode ? (
                <h1 className="hero-heading text-balance">{heroConfig.name}</h1>
              ) : (
                <>
                  <h1 className="sr-only">{heroConfig.name}</h1>
                <ParticleTextEffect
                    text={heroConfig.name}
                    className="max-w-[40rem]"
                    height={120}
                    pixelStep={4}
                    targetFps={30}
                    fontFamily="'Sentient', 'Times New Roman', serif"
                    fontWeight={700}
                    palette={particlePalette}
                  />
                </>
              )}

              <div className={shouldReduceMotion ? '' : 'hero-fade-up opacity-0'}>
                <p
                  className="type-accent text-gradient font-semibold"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', letterSpacing: '-0.02em' }}
                >
                  {heroConfig.title}
                </p>
              </div>
            </div>

            <p
              className={`type-body max-w-[34rem] text-sm leading-[1.6] sm:text-[0.98rem] text-[var(--text-300)] ${
                lowPerformanceMode ? '' : 'hero-fade-up opacity-0'
              }`}
            >
              {heroConfig.intro}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`tech-tag ${lowPerformanceMode ? '' : 'hero-tag opacity-0'}`}
              >
                {heroConfig.roles[0]}
              </span>
            </div>

            <div className="mt-2 flex flex-col flex-wrap gap-2.5 sm:flex-row">
              <a
                href="#portfolio"
                className={`w-full sm:w-auto ${lowPerformanceMode ? '' : 'btn-magnetic opacity-0'}`}
              >
                <MagneticButton variant="primary" intensity={0.5} className="w-full justify-center sm:w-auto">
                  Explore Case Studies
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
              </a>
              <a
                href={brandConfig.resumeHref}
                download={brandConfig.resumeFileName}
                className={`w-full sm:w-auto ${lowPerformanceMode ? '' : 'btn-magnetic opacity-0'}`}
              >
                <MagneticButton variant="outline" intensity={0.35} className="w-full justify-center sm:w-auto">
                  <Download className="w-4 h-4" />
                  {brandConfig.resumeLabel}
                </MagneticButton>
              </a>
            </div>

            <div className={`proof-ribbon mt-2 max-w-[38rem] ${lowPerformanceMode ? '' : 'hero-fade-up opacity-0'}`}>
              {proofConfig.highlights.slice(0, 4).map((metric) => (
                <div key={metric.label} className="proof-ribbon-item">
                  <p className="proof-ribbon-value">{metric.value}</p>
                  <p className="proof-ribbon-label">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── vCard aside — parallax on desktop ── */}
          <motion.aside
            style={lowPerformanceMode ? undefined : { y: cardParallaxY }}
            className={`relative mx-auto w-full max-w-[20rem] sm:max-w-[22rem] md:max-w-[24rem] lg:max-w-[28rem] xl:max-w-[29rem] origin-center ${
              lowPerformanceMode ? '' : 'hero-card-wrapper opacity-0'
            }`}
          >
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.18] blur-3xl transition-opacity duration-1000"
              style={{ background: 'radial-gradient(circle, rgba(255,112,67,0.14), transparent 68%)' }}
              aria-hidden="true"
            />

            <div
              ref={cardRef}
              className="card-spotlight surface-card relative overflow-hidden rounded-[1.35rem] bg-[var(--bg-surface)] p-3.5"
              style={{ boxShadow: '0 18px 46px -34px rgba(0, 0, 0, 0.55)' }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: isLight
                    ? 'linear-gradient(90deg, transparent, rgba(230,81,0,0.22) 30%, rgba(201,169,97,0.18) 70%, transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(255,112,67,0.3) 30%, rgba(201,169,97,0.2) 70%, transparent)',
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 flex flex-col gap-2.5">
                <div
                  className="group relative isolate overflow-hidden rounded-2xl"
                  style={
                    isLight
                      ? {
                          border: '1px solid rgba(230,81,0,0.3)',
                          boxShadow: '0 0 0 1px rgba(230,81,0,0.4), 0 0 20px rgba(230,81,0,0.15)',
                        }
                      : {
                          border: '1px solid rgba(255,112,67,0.5)',
                          boxShadow: '0 0 0 1px rgba(255,112,67,0.6), 0 0 40px rgba(255,112,67,0.25)',
                        }
                  }
                >
                  <GlowingEffect
                    disabled={Boolean(lowPerformanceMode)}
                    glow
                    blur={8}
                    spread={80}
                    proximity={120}
                    inactiveZone={0.3}
                    movementDuration={1}
                    borderWidth={4}
                    className="z-20 rounded-2xl opacity-100 mix-blend-screen"
                  />
                  <img
                    src="/images/profile.jpg"
                    alt={`Portrait of ${heroConfig.name}`}
                    className="aspect-[4/4.5] w-full object-cover object-top transition-transform duration-1000 group-hover:scale-[1.04]"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="surface-soft flex items-start gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2.5 shadow-sm">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cyan-full)]" aria-hidden="true" />
                    <div className="flex min-h-full flex-col justify-start">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--cyan-full)]/80">Location</p>
                      <p className="type-body mt-1 text-[13px] leading-relaxed text-[var(--text-300)]">{heroConfig.location}</p>
                    </div>
                  </div>
                  <div className="surface-soft flex items-start gap-2.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2.5 shadow-sm">
                    <BriefcaseBusiness className="mt-0.5 h-4 w-4 shrink-0 text-[var(--cyan-full)]" aria-hidden="true" />
                    <div className="flex min-h-full flex-col justify-start">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--cyan-full)]/80">Availability</p>
                      <p className="type-body mt-1 text-[13px] leading-relaxed text-[var(--text-300)]">{heroConfig.availability}</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {spotlightItems.map((item, index) => (
                    <div
                      key={item.label}
                      className={`flex flex-col justify-start gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-2.5 ${
                        index === spotlightItems.length - 1 && spotlightItems.length % 2 === 1 ? 'sm:col-span-2' : ''
                      }`}
                    >
                      <p className="type-meta text-[0.58rem] font-bold text-[var(--cyan-full)]">{item.label}</p>
                      <p className="type-body text-[12.5px] leading-relaxed text-[var(--text-200)]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
