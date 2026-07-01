import { lazy, Suspense, useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CustomCursor } from '@/components/CustomCursor';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/sections/Hero';
import { Footer } from '@/sections/Footer';
import { siteConfig } from '@/config';
import { PageReveal } from '@/components/PageReveal';
import AetherFlowHero from '@/components/ui/aether-flow-hero';
import { useTheme } from '@/hooks/useTheme';
import { useIsMobile } from '@/hooks/use-mobile';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';
import { ThemeContext } from '@/context/ThemeContext';
import { DeviceCapabilitiesProvider } from '@/context/DeviceCapabilitiesContext';

const About = lazy(() => import('@/sections/About').then((module) => ({ default: module.About })));
const Services = lazy(() => import('@/sections/Services').then((module) => ({ default: module.Services })));
const TechStack = lazy(() => import('@/sections/TechStack').then((module) => ({ default: module.TechStack })));
const Portfolio = lazy(() => import('@/sections/Portfolio').then((module) => ({ default: module.Portfolio })));
const InnovationLab = lazy(() => import('@/sections/InnovationLab').then((module) => ({ default: module.InnovationLab })));
const Experience = lazy(() => import('@/sections/Experience').then((module) => ({ default: module.Experience })));
const Publications = lazy(() => import('@/sections/Publications').then((module) => ({ default: module.Publications })));
const Credentials = lazy(() => import('@/sections/Credentials').then((module) => ({ default: module.Credentials })));

function App() {
  return (
    <DeviceCapabilitiesProvider>
      <AppShell />
    </DeviceCapabilitiesProvider>
  );
}

function AppShell() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { theme, toggle } = useTheme();
  const { sceneQuality, shouldLoad3D, hardwareConcurrency, deviceMemory } = useDeviceCapabilities();
  const allowImmersiveFx =
    shouldLoad3D &&
    !prefersReducedMotion &&
    !isMobile &&
    sceneQuality === 'high' &&
    hardwareConcurrency >= 12 &&
    deviceMemory >= 8;

  const sectionFallback = useMemo(
    () => (
      <div className="container-large py-16" aria-hidden="true">
        <div className="h-28 animate-pulse rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/65" />
      </div>
    ),
    [],
  );

  useEffect(() => {
    document.title = siteConfig.title;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', siteConfig.description);

    const canonicalHref = 'https://ketpatil77.github.io/';
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalHref);

    const setMetaProperty = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaProperty('og:url', canonicalHref);

    const personLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Ketan Patil',
      url: canonicalHref,
      jobTitle: 'Full-Stack Engineer',
      sameAs: [
        'https://github.com/ketpatil77',
        'https://www.linkedin.com/in/ketan-patil77',
      ],
      knowsAbout: ['React', 'TypeScript', 'AI/ML', 'Cybersecurity', 'Cloud'],
    };

    let ldJsonScript = document.querySelector('script[data-ketan-schema="person"]') as HTMLScriptElement | null;
    if (!ldJsonScript) {
      ldJsonScript = document.createElement('script');
      ldJsonScript.type = 'application/ld+json';
      ldJsonScript.dataset.ketanSchema = 'person';
      document.head.appendChild(ldJsonScript);
    }
    ldJsonScript.textContent = JSON.stringify(personLd);
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <motion.div
        className="relative min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.42 }}
      >
        <PageReveal />
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:rounded-lg focus:bg-[var(--cyan-full)] focus:px-4 focus:py-2 focus:text-[#020202] focus:font-bold focus:shadow-lg">
          Skip to content
        </a>
        {allowImmersiveFx && <CustomCursor />}
        {allowImmersiveFx && <AetherFlowHero theme={theme} />}

        <Navigation onThemeToggle={toggle} theme={theme} />

        <main id="main-content" className="relative z-10">
          <Hero />
          <div className="section-divider" />
          <Suspense fallback={sectionFallback}>
            <Portfolio />
          </Suspense>

          <div className="hidden md:block">
            <div className="section-divider" />
            <Suspense fallback={sectionFallback}>
              <InnovationLab />
            </Suspense>
            <div className="section-divider" />
            <Suspense fallback={sectionFallback}>
              <Services />
            </Suspense>
          </div>

          <div className="section-divider" />
          <Suspense fallback={sectionFallback}>
            <Experience />
          </Suspense>

          <div className="hidden md:block">
            <div className="section-divider" />
            <Suspense fallback={sectionFallback}>
              <Publications />
            </Suspense>
            <div className="section-divider" />
            <Suspense fallback={sectionFallback}>
              <TechStack />
            </Suspense>
          </div>

          <div className="section-divider" />
          <Suspense fallback={sectionFallback}>
            <About />
          </Suspense>

          <div className="hidden md:block">
            <div className="section-divider" />
            <Suspense fallback={sectionFallback}>
              <Credentials />
            </Suspense>
          </div>
        </main>

        <Footer />
      </motion.div>
    </ThemeContext.Provider>
  );
}

export default App;
