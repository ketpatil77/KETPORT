import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import { CustomCursor } from '@/components/CustomCursor';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Services } from '@/sections/Services';
import { TechStack } from '@/sections/TechStack';
import { Portfolio } from '@/sections/Portfolio';
import { Experience } from '@/sections/Experience';
import { Publications } from '@/sections/Publications';
import { Credentials } from '@/sections/Credentials';
import { Footer } from '@/sections/Footer';
import { siteConfig } from '@/config';
import { PageReveal } from '@/components/PageReveal';
import AetherFlowHero from '@/components/ui/aether-flow-hero';
import { useTheme } from '@/hooks/useTheme';
import { useIsMobile } from '@/hooks/use-mobile';
import { ThemeContext } from '@/context/ThemeContext';
import { DeviceCapabilitiesProvider } from '@/context/DeviceCapabilitiesContext';

/** Thin scroll-progress bar at top of page */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] origin-left"
      style={{
        scaleX,
        height: '2px',
        background: 'linear-gradient(90deg, var(--cyan-full), var(--violet))',
        transformOrigin: '0%',
      }}
      aria-hidden="true"
    />
  );
}

function App() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { theme, toggle } = useTheme();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      // 0.7 = fast enough to feel instant, smooth enough to not jar
      duration: 0.7,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
    });

    lenisRef.current = lenis;

    let frameId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    document.title = siteConfig.title;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', siteConfig.description);
  }, []);

  return (
    <DeviceCapabilitiesProvider>
      <ThemeContext.Provider value={theme}>
        <motion.div
          className="relative min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.42 }}
        >
          <PageReveal />
          {!prefersReducedMotion && <ScrollProgressBar />}
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:rounded-lg focus:bg-[var(--cyan-full)] focus:px-4 focus:py-2 focus:text-[#020202] focus:font-bold focus:shadow-lg">
            Skip to content
          </a>
          {!prefersReducedMotion && <CustomCursor />}
          {!isMobile && <AetherFlowHero theme={theme} />}

          <Navigation onThemeToggle={toggle} theme={theme} />

          <main id="main-content" className="relative z-10">
            <Hero />
            <div className="section-divider" />
            <Portfolio />
            <div className="section-divider" />
            <Services />
            <div className="section-divider" />
            <Experience />
            <div className="section-divider" />
            <Publications />
            <div className="section-divider" />
            <TechStack />
            <div className="section-divider" />
            <About />
            <div className="section-divider" />
            <Credentials />
          </main>

          <Footer />
        </motion.div>
      </ThemeContext.Provider>
    </DeviceCapabilitiesProvider>
  );
}

export default App;
