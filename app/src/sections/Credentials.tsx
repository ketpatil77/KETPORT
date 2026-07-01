import { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion';
import {
  Award,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Search,
  X,
  ChevronDown,
  Download,
  Filter,
} from 'lucide-react';
import { credentialsConfig } from '@/config';
import { AnimatedText } from '@/components/AnimatedText';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useSectionScrollFX } from '@/hooks/useSectionScrollFX';

// ─── Extended cert data with category/level mapped from config ───────────────
interface CertCard {
  id: string;
  name: string;
  issuer: string;
  year: string;
  month: string;
  displayDate: string;
  category: string;
  level: string;
  summary: string;
  focusAreas: string[];
  credentialId?: string;
  verifyHref?: string;
  issuerColor: string;
  _sortKey: number;
}

const CATEGORY_MAP: Record<string, string> = {
  'Cisco Certified Network Professional Routing and Switching': 'Networking',
  'Cisco Certified Network Associate Routing and Switching': 'Networking',
  'IBM Cybersecurity Analyst Professional': 'Cybersecurity',
  'Penetration Testing, Threat Hunting, and Cryptography': 'Cybersecurity',
  'Python for Data Science, AI & Development': 'Data & AI',
  'Introduction to Cloud Computing': 'Cloud Computing',
  'Meta Database Engineer': 'Data & AI',
  'Meta Data Analyst': 'Data & AI',
  'Google IT Support Professional Certificate': 'IT Support',
  'Getting Started with AWS Machine Learning': 'Data & AI',
  'Successful Negotiation': 'Leadership & Skills',
  'Leadership Skills': 'Leadership & Skills',
  'Wireshark for Basic Network Security Analysis': 'Cybersecurity',
  'Cloud Computing Foundations': 'Cloud Computing',
  'Cloud Virtualization, Containers and APIs': 'Cloud Computing',
};

const LEVEL_MAP: Record<string, string> = {
  'Cisco Certified Network Professional Routing and Switching': 'Advanced',
  'Cisco Certified Network Associate Routing and Switching': 'Associate',
  'IBM Cybersecurity Analyst Professional': 'Professional',
  'Penetration Testing, Threat Hunting, and Cryptography': 'Advanced',
  'Python for Data Science, AI & Development': 'Intermediate',
  'Introduction to Cloud Computing': 'Foundational',
  'Meta Database Engineer': 'Professional',
  'Meta Data Analyst': 'Professional',
  'Google IT Support Professional Certificate': 'Professional',
  'Getting Started with AWS Machine Learning': 'Foundational',
  'Successful Negotiation': 'Intermediate',
  'Leadership Skills': 'Foundational',
  'Wireshark for Basic Network Security Analysis': 'Intermediate',
  'Cloud Computing Foundations': 'Foundational',
  'Cloud Virtualization, Containers and APIs': 'Intermediate',
};

const ISSUER_COLOR_MAP: Record<string, string> = {
  Cisco: '#1ba0d7',
  IBM: '#0f62fe',
  Meta: '#0082fb',
  Google: '#ea4335',
  'Amazon Web Services': '#ff9900',
  Amazon: '#ff9900',
  Coursera: '#0056d3',
  'University of Michigan': '#00274c',
  'IIMA - IIM Ahmedabad': '#8b1a1a',
  'Duke University': '#001A57',
};

function parseDate(year: string): { month: string; sortKey: number } {
  // "Apr 2026", "Jun 2024", "Nov 2025" etc.
  const months: Record<string, number> = {
    Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
    Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
  };
  const parts = year.trim().split(' ');
  if (parts.length === 2) {
    const mo = months[parts[0]] ?? 1;
    const yr = parseInt(parts[1], 10);
    return { month: parts[0].toUpperCase(), sortKey: yr * 100 + mo };
  }
  return { month: '', sortKey: parseInt(year, 10) * 100 };
}

const CERT_CARDS: CertCard[] = credentialsConfig.certifications.map((c) => {
  const { month, sortKey } = parseDate(c.year);
  return {
    id: c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: c.name,
    issuer: c.issuer,
    year: c.year,
    month,
    displayDate: month ? `${month} ${c.year.split(' ')[1]}` : c.year,
    category: CATEGORY_MAP[c.name] ?? 'Other',
    level: LEVEL_MAP[c.name] ?? 'Intermediate',
    summary: c.summary,
    focusAreas: c.focusAreas,
    credentialId: c.credentialId,
    verifyHref: c.verifyHref,
    issuerColor: ISSUER_COLOR_MAP[c.issuer] ?? 'var(--accent-full)',
    _sortKey: sortKey,
  };
});

const ALL_CATEGORIES = ['All Certifications', 'Networking', 'Cybersecurity', 'Cloud Computing', 'Data & AI', 'IT Support', 'Leadership & Skills'];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'provider', label: 'Provider A–Z' },
  { value: 'category', label: 'Category' },
];

// ─── Issuer initials avatar ───────────────────────────────────────────────────
function IssuerAvatar({ issuer, color }: { issuer: string; color: string }) {
  const initials = issuer.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold"
      style={{
        background: `${color}18`,
        border: `1px solid ${color}40`,
        color,
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

// ─── Certificate Card ─────────────────────────────────────────────────────────
function CertCard({
  cert,
  index,
  onClick,
  shouldReduceMotion,
}: {
  cert: CertCard;
  index: number;
  onClick: (cert: CertCard) => void;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <motion.article
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { delay: Math.min(index * 0.04, 0.35), duration: 0.4, ease: [0.22, 1, 0.36, 1] }
      }
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
      onClick={() => onClick(cert)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(cert)}
      aria-label={`View details for ${cert.name}`}
      className="group relative flex h-full flex-col justify-between gap-3 overflow-hidden rounded-xl border p-4 transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-full)]"
      style={{
        background: 'rgba(16,16,16,0.72)',
        backdropFilter: 'blur(12px)',
        borderColor: 'var(--border-subtle)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Hover border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: 'inset 0 0 0 1px var(--accent-dim)',
        }}
        aria-hidden="true"
      />
      {/* Top accent line on hover */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[1.5px] origin-left"
        style={{ background: 'linear-gradient(90deg, var(--accent-full), var(--gold-full))' }}
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />

      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <IssuerAvatar issuer={cert.issuer} color={cert.issuerColor} />
          <span
            className="text-[0.58rem] font-bold uppercase tracking-widest"
            style={{ color: 'var(--text-500)' }}
          >
            {cert.displayDate}
          </span>
        </div>
        <div className="min-w-0">
          <p
            className="line-clamp-2 text-[0.78rem] font-semibold leading-snug transition-colors duration-200 group-hover:text-[var(--accent-full)]"
            style={{ color: 'var(--text-100)', fontFamily: 'var(--font-body)' }}
          >
            {cert.name}
          </p>
          <p className="mt-1 text-[0.68rem]" style={{ color: 'var(--text-400)' }}>
            {cert.issuer}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span
          className="rounded-full border px-2 py-0.5 text-[0.58rem] font-semibold uppercase tracking-wide"
          style={{
            borderColor: 'var(--border-accent)',
            color: 'var(--accent-full)',
            background: 'var(--accent-trace)',
          }}
        >
          {cert.category}
        </span>
        <span
          className="rounded-full border px-2 py-0.5 text-[0.58rem] font-medium"
          style={{
            borderColor: 'var(--border-dim)',
            color: 'var(--text-400)',
            background: 'var(--gold-glow)',
          }}
        >
          {cert.level}
        </span>
        <ExternalLink
          className="ml-auto h-3 w-3 shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-60"
          style={{ color: 'var(--accent-full)' }}
          aria-hidden="true"
        />
      </div>
    </motion.article>
  );
}

// ─── Detail Modal ─────────────────────────────────────────────────────────────
function CertModal({
  cert,
  onClose,
  shouldReduceMotion,
}: {
  cert: CertCard | null;
  onClose: () => void;
  shouldReduceMotion: boolean | null;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!cert) return;
    closeRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [cert, onClose]);

  // Focus trap
  useEffect(() => {
    if (!cert) return;
    const prev = document.activeElement as HTMLElement | null;
    return () => prev?.focus();
  }, [cert]);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
          onClick={(e) => e.target === overlayRef.current && onClose()}
          role="dialog"
          aria-modal="true"
          aria-label={`Details for ${cert.name}`}
          style={{ background: 'rgba(2,2,2,0.82)', backdropFilter: 'blur(6px)' }}
        >
          <motion.div
            className="relative w-full overflow-y-auto rounded-t-2xl sm:max-w-lg sm:rounded-2xl"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{
              maxHeight: '90vh',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-accent)',
              boxShadow: '0 0 0 1px var(--border-accent), 0 32px 64px -16px rgba(0,0,0,0.95)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header gradient line */}
            <div
              className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl"
              style={{ background: 'linear-gradient(90deg, var(--accent-full), var(--gold-full), transparent)' }}
              aria-hidden="true"
            />

            <div className="p-5 sm:p-6">
              {/* Close */}
              <div className="mb-5 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <IssuerAvatar issuer={cert.issuer} color={cert.issuerColor} />
                  <div>
                    <p className="text-[0.6rem] font-bold uppercase tracking-widest" style={{ color: 'var(--accent-full)' }}>
                      {cert.displayDate}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--text-400)' }}>
                      {cert.issuer}
                    </p>
                  </div>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="focus-ring inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-white/5"
                  style={{ color: 'var(--text-400)' }}
                  aria-label="Close certificate details"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <h3
                className="text-base font-bold leading-snug sm:text-lg"
                style={{ color: 'var(--text-100)', fontFamily: 'var(--font-heading)' }}
              >
                {cert.name}
              </h3>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span
                  className="rounded-full border px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wide"
                  style={{ borderColor: 'var(--border-accent)', color: 'var(--accent-full)', background: 'var(--accent-trace)' }}
                >
                  {cert.category}
                </span>
                <span
                  className="rounded-full border px-2.5 py-1 text-[0.62rem] font-medium"
                  style={{ borderColor: 'var(--border-dim)', color: 'var(--gold-full)', background: 'var(--gold-glow)' }}
                >
                  {cert.level}
                </span>
              </div>

              {/* Summary */}
              <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-200)' }}>
                {cert.summary}
              </p>

              {/* Focus Areas */}
              <div className="mt-4">
                <p className="mb-2 text-[0.6rem] font-bold uppercase tracking-widest" style={{ color: 'var(--text-400)' }}>
                  Focus Areas
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cert.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border px-2 py-0.5 text-[0.65rem] font-medium"
                      style={{ borderColor: 'var(--border-dim)', color: 'var(--text-300)', background: 'var(--bg-subtle)' }}
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Credential ID + Verify */}
              {(cert.credentialId || cert.verifyHref) && (
                <div className="mt-4 space-y-2 border-t pt-4" style={{ borderColor: 'var(--border-subtle)' }}>
                  {cert.credentialId && (
                    <p className="text-xs" style={{ color: 'var(--text-400)' }}>
                      Credential ID:{' '}
                      <span style={{ color: 'var(--text-200)' }}>{cert.credentialId}</span>
                    </p>
                  )}
                  {cert.verifyHref && (
                    <a
                      href={cert.verifyHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition-all hover:border-[var(--accent-dim)]"
                      style={{
                        borderColor: 'var(--border-accent)',
                        color: 'var(--accent-full)',
                        background: 'var(--accent-trace)',
                      }}
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      Verify Credential
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export function Credentials() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { headerStyle, bodyStyle, accentStyle } = useSectionScrollFX(sectionRef);

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Certifications');
  const [sort, setSort] = useState('newest');
  const [selectedCert, setSelectedCert] = useState<CertCard | null>(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'All Certifications': CERT_CARDS.length };
    CERT_CARDS.forEach((c) => {
      counts[c.category] = (counts[c.category] ?? 0) + 1;
    });
    return counts;
  }, []);

  // Stats
  const stats = useMemo(() => {
    const years = CERT_CARDS.map((c) => parseInt(c.year.split(' ').at(-1) ?? '0', 10)).filter(Boolean);
    const domains = new Set(CERT_CARDS.map((c) => c.category)).size;
    return {
      total: CERT_CARDS.length,
      first: Math.min(...years),
      latest: Math.max(...years),
      domains,
    };
  }, []);

  // Filtered & sorted
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let result = CERT_CARDS.filter((c) => {
      const catMatch = activeCategory === 'All Certifications' || c.category === activeCategory;
      const searchMatch = !q || [c.name, c.issuer, c.category, ...c.focusAreas].some((f) => f.toLowerCase().includes(q));
      return catMatch && searchMatch;
    });

    if (sort === 'newest') result = [...result].sort((a, b) => b._sortKey - a._sortKey);
    else if (sort === 'oldest') result = [...result].sort((a, b) => a._sortKey - b._sortKey);
    else if (sort === 'provider') result = [...result].sort((a, b) => a.issuer.localeCompare(b.issuer));
    else if (sort === 'category') result = [...result].sort((a, b) => a.category.localeCompare(b.category));

    return result;
  }, [search, activeCategory, sort]);

  const handleOpenCert = useCallback((cert: CertCard) => setSelectedCert(cert), []);
  const handleCloseCert = useCallback(() => setSelectedCert(null), []);

  const activeSortLabel = SORT_OPTIONS.find((o) => o.value === sort)?.label ?? 'Sort';

  return (
    <>
      <section
        ref={sectionRef}
        id="credentials"
        className="section-shell relative overflow-hidden"
      >
        {/* Ambient blob */}
        <motion.div
          className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, var(--gold-full), transparent 70%)', filter: 'blur(80px)', ...accentStyle }}
          aria-hidden="true"
        />
        <motion.div
          className="pointer-events-none absolute left-0 bottom-0 h-[320px] w-[320px] -translate-x-1/2 rounded-full opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, var(--accent-full), transparent 70%)', filter: 'blur(60px)' }}
          aria-hidden="true"
        />

        <div className="container-large relative z-10">
          {/* ── Layout: sidebar + main ── */}
          <motion.div
            className="flex flex-col gap-8 lg:flex-row lg:gap-10 xl:gap-12"
            style={bodyStyle}
          >
            {/* ════════════════════════════════════════
                LEFT SIDEBAR
            ════════════════════════════════════════ */}
            <ScrollReveal direction="left" distance={28} preset="cinematic" blur={8}>
              <aside
                className="shrink-0 lg:w-[260px] xl:w-[280px]"
                aria-label="Certification filters and statistics"
              >
                {/* Sticky wrapper on desktop */}
                <div className="lg:sticky lg:top-[88px]">

                  {/* Header */}
                  <motion.div style={headerStyle}>
                    <span className="section-eyebrow">
                      <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
                      {credentialsConfig.label}
                    </span>
                    <AnimatedText
                      el="h2"
                      text="Professional Certifications"
                      type="words"
                      className="section-title text-balance mt-2 text-2xl sm:text-3xl lg:text-2xl xl:text-3xl"
                    />
                    <p className="mt-2 text-[0.78rem] leading-relaxed" style={{ color: 'var(--text-400)' }}>
                      Industry credentials spanning networking, cybersecurity, cloud, data & AI, and professional skills.
                    </p>
                  </motion.div>

                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-2 gap-2">
                    {[
                      { label: 'Total', value: stats.total },
                      { label: 'Domains', value: stats.domains },
                      { label: 'Since', value: stats.first },
                      { label: 'Latest', value: stats.latest },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl border p-3 text-center"
                        style={{
                          borderColor: 'var(--border-subtle)',
                          background: 'rgba(16,16,16,0.6)',
                          backdropFilter: 'blur(8px)',
                        }}
                      >
                        <p className="text-lg font-bold" style={{ color: 'var(--accent-full)', fontFamily: 'var(--font-heading)' }}>
                          {s.value}
                        </p>
                        <p className="text-[0.6rem] font-bold uppercase tracking-widest" style={{ color: 'var(--text-500)' }}>
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Education summary */}
                  <div className="mt-6">
                    <h3 className="mb-3 flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-widest" style={{ color: 'var(--text-400)' }}>
                      <GraduationCap className="h-3.5 w-3.5" style={{ color: 'var(--accent-dim)' }} aria-hidden="true" />
                      Education
                    </h3>
                    <div className="space-y-3">
                      {credentialsConfig.education.map((edu, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={shouldReduceMotion ? { duration: 0 } : { delay: idx * 0.08, duration: 0.35 }}
                          className="group relative pl-4"
                        >
                          <motion.div
                            className="absolute left-0 top-0 w-px"
                            initial={{ height: 0 }}
                            whileInView={{ height: '100%' }}
                            viewport={{ once: true }}
                            transition={shouldReduceMotion ? { duration: 0 } : { delay: idx * 0.08 + 0.1, duration: 0.5 }}
                            style={{ background: 'linear-gradient(to bottom, var(--accent-full), var(--gold-full))' }}
                          />
                          <p className="text-[0.6rem] font-bold" style={{ color: 'var(--accent-full)' }}>{edu.duration}</p>
                          <p className="mt-0.5 text-[0.72rem] font-semibold leading-snug" style={{ color: 'var(--text-100)' }}>{edu.degree}</p>
                          <p className="text-[0.65rem]" style={{ color: 'var(--text-400)' }}>{edu.institution}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Category filters — desktop */}
                  <nav className="mt-6" aria-label="Filter certifications by category">
                    <h3 className="mb-2 text-[0.65rem] font-bold uppercase tracking-widest" style={{ color: 'var(--text-400)' }}>
                      Filter
                    </h3>
                    <ul className="space-y-1">
                      {ALL_CATEGORIES.map((cat) => {
                        const isActive = activeCategory === cat;
                        return (
                          <li key={cat}>
                            <button
                              type="button"
                              onClick={() => setActiveCategory(cat)}
                              aria-pressed={isActive}
                              className="focus-ring flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[0.72rem] font-medium transition-all duration-200"
                              style={{
                                color: isActive ? 'var(--accent-full)' : 'var(--text-300)',
                                background: isActive ? 'var(--accent-trace)' : 'transparent',
                                border: isActive ? '1px solid var(--border-accent)' : '1px solid transparent',
                              }}
                            >
                              <span>{cat}</span>
                              <span
                                className="rounded-full px-1.5 py-0.5 text-[0.58rem] font-bold"
                                style={{
                                  background: isActive ? 'var(--accent-glow)' : 'var(--bg-elevated)',
                                  color: isActive ? 'var(--accent-full)' : 'var(--text-500)',
                                }}
                              >
                                {categoryCounts[cat] ?? 0}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>

                  {/* Download button */}
                  <button
                    type="button"
                    className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all duration-200 hover:border-[var(--accent-dim)] hover:bg-[var(--accent-trace)]"
                    style={{ borderColor: 'var(--border-dim)', color: 'var(--text-300)' }}
                    aria-label="Download credentials summary"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    Download Credentials
                  </button>
                </div>
              </aside>
            </ScrollReveal>

            {/* ════════════════════════════════════════
                RIGHT: TOOLBAR + GRID
            ════════════════════════════════════════ */}
            <ScrollReveal direction="right" distance={28} preset="cinematic" blur={8} delay={0.08}>
              <div className="min-w-0 flex-1">

                {/* ── Toolbar ── */}
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  {/* Search */}
                  <div className="relative flex-1 min-w-[160px]">
                    <Search
                      className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2"
                      style={{ color: 'var(--text-500)' }}
                      aria-hidden="true"
                    />
                    <input
                      type="search"
                      placeholder="Search certifications..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="focus-ring w-full rounded-xl border py-2 pl-9 pr-4 text-[0.78rem] transition-colors placeholder:text-[var(--text-500)]"
                      style={{
                        background: 'rgba(16,16,16,0.7)',
                        borderColor: 'var(--border-dim)',
                        color: 'var(--text-200)',
                        backdropFilter: 'blur(8px)',
                      }}
                      aria-label="Search certifications"
                    />
                  </div>

                  {/* Mobile filter toggle */}
                  <button
                    type="button"
                    onClick={() => setShowMobileFilters((p) => !p)}
                    className="focus-ring flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[0.72rem] font-medium transition-colors hover:border-[var(--accent-dim)] lg:hidden"
                    style={{ borderColor: 'var(--border-dim)', color: 'var(--text-300)', background: 'rgba(16,16,16,0.7)' }}
                    aria-expanded={showMobileFilters}
                  >
                    <Filter className="h-3.5 w-3.5" aria-hidden="true" />
                    Filter
                  </button>

                  {/* Sort dropdown */}
                  <div className="relative" ref={sortRef}>
                    <button
                      type="button"
                      onClick={() => setShowSortDropdown((p) => !p)}
                      className="focus-ring flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[0.72rem] font-medium transition-colors hover:border-[var(--accent-dim)] whitespace-nowrap"
                      style={{ borderColor: 'var(--border-dim)', color: 'var(--text-300)', background: 'rgba(16,16,16,0.7)', backdropFilter: 'blur(8px)' }}
                      aria-expanded={showSortDropdown}
                      aria-haspopup="listbox"
                    >
                      {activeSortLabel}
                      <ChevronDown className="h-3 w-3" aria-hidden="true" />
                    </button>
                    <AnimatePresence>
                      {showSortDropdown && (
                        <motion.ul
                          initial={{ opacity: 0, y: -6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.97 }}
                          transition={{ duration: 0.18 }}
                          className="absolute right-0 top-full z-50 mt-1 w-44 rounded-xl border py-1 shadow-xl"
                          style={{
                            background: 'var(--bg-elevated)',
                            borderColor: 'var(--border-dim)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                          }}
                          role="listbox"
                          aria-label="Sort certifications"
                        >
                          {SORT_OPTIONS.map((opt) => (
                            <li
                              key={opt.value}
                              role="option"
                              aria-selected={sort === opt.value}
                            >
                              <button
                                type="button"
                                onClick={() => { setSort(opt.value); setShowSortDropdown(false); }}
                                className="w-full px-3 py-2 text-left text-[0.72rem] font-medium transition-colors hover:bg-white/5"
                                style={{ color: sort === opt.value ? 'var(--accent-full)' : 'var(--text-300)' }}
                              >
                                {opt.label}
                              </button>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>

                </div>

                {/* Mobile category pills */}
                <AnimatePresence>
                  {showMobileFilters && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.24 }}
                      className="mb-4 overflow-hidden lg:hidden"
                    >
                      <div className="flex flex-wrap gap-1.5 pb-1">
                        {ALL_CATEGORIES.map((cat) => {
                          const isActive = activeCategory === cat;
                          return (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => { setActiveCategory(cat); setShowMobileFilters(false); }}
                              aria-pressed={isActive}
                              className="focus-ring rounded-full border px-3 py-1 text-[0.65rem] font-semibold transition-all"
                              style={{
                                borderColor: isActive ? 'var(--border-accent)' : 'var(--border-dim)',
                                color: isActive ? 'var(--accent-full)' : 'var(--text-400)',
                                background: isActive ? 'var(--accent-trace)' : 'rgba(16,16,16,0.6)',
                              }}
                            >
                              {cat} ({categoryCounts[cat] ?? 0})
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Count */}
                <p className="mb-3 text-[0.68rem]" style={{ color: 'var(--text-500)' }}>
                  {filtered.length} certification{filtered.length !== 1 ? 's' : ''} found
                  {activeCategory !== 'All Certifications' && ` in ${activeCategory}`}
                  {search && ` matching "${search}"`}
                </p>

                {/* ── Grid ── */}
                <AnimatePresence mode="popLayout">
                  {filtered.length === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center rounded-2xl border py-12 text-center"
                      style={{ borderColor: 'var(--border-subtle)', background: 'rgba(16,16,16,0.4)' }}
                    >
                      <Award className="mb-3 h-8 w-8 opacity-30" style={{ color: 'var(--accent-full)' }} aria-hidden="true" />
                      <p className="text-sm font-medium" style={{ color: 'var(--text-400)' }}>
                        No certifications found for the selected filters.
                      </p>
                      <button
                        type="button"
                        onClick={() => { setSearch(''); setActiveCategory('All Certifications'); }}
                        className="focus-ring mt-3 text-xs underline underline-offset-2"
                        style={{ color: 'var(--accent-full)' }}
                      >
                        Clear filters
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`grid-${activeCategory}-${sort}`}
                      className="cert-grid grid gap-3"
                      role="list"
                      aria-label="Certification cards"
                    >
                      {filtered.map((cert, idx) => (
                        <div key={cert.id} role="listitem" className="h-full">
                          <CertCard
                            cert={cert}
                            index={idx}
                            onClick={handleOpenCert}
                            shouldReduceMotion={shouldReduceMotion}
                          />
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          </motion.div>
        </div>
      </section>

      {/* ── Detail Modal (portal-like, outside section) ── */}
      <CertModal cert={selectedCert} onClose={handleCloseCert} shouldReduceMotion={shouldReduceMotion} />
    </>
  );
}
