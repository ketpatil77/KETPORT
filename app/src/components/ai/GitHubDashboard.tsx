import React, { useEffect, useMemo, useState, useRef } from 'react';
import { 
  Github, 
  Star, 
  GitFork, 
  Book, 
  CalendarDays, 
  ArrowUpRight, 
  TrendingUp, 
  Database, 
  Eye,
  RefreshCw
} from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  pushed_at: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
}

interface UserProfile {
  public_repos: number;
}

interface ParsedRect {
  date: string;
  score: number;
  x: string;
  y: string;
  fill: string;
}

interface ParsedText {
  content: string;
  x: string;
  y: string;
  visible: boolean;
}

interface ParsedSVG {
  width: string;
  height: string;
  rects: ParsedRect[];
  texts: ParsedText[];
}

interface CachedData<T> {
  timestamp: number;
  data: T;
}

const USERNAME = 'ketpatil77';
const USER_CACHE_KEY = `github_user_profile_${USERNAME}`;
const REPOS_CACHE_KEY = `github_repos_data_${USERNAME}`;
const SVG_CACHE_KEY = `github_heatmap_svg_${USERNAME}`;

const PROFILE_EXPIRY_MS = 1000 * 60 * 15; // 15 mins
const HEATMAP_EXPIRY_MS = 1000 * 60 * 30; // 30 mins

// Helper to handle local storage cache
function getCache<T>(key: string, expiry: number): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const cached: CachedData<T> = JSON.parse(raw);
    if (Date.now() - cached.timestamp < expiry) {
      return cached.data;
    }
  } catch {
    // Ignore error
  }
  return null;
}

function setCache<T>(key: string, data: T) {
  try {
    const entry: CachedData<T> = { timestamp: Date.now(), data };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // Ignore error
  }
}

// Format relative date for updated repos
function formatRepoDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Custom manual parser for SVG rects and texts
function parseSVGData(svgText: string): ParsedSVG {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const svgEl = doc.querySelector('svg');
  const width = svgEl?.getAttribute('width') || '663';
  const height = svgEl?.getAttribute('height') || '104';

  const rects = Array.from(doc.querySelectorAll('rect')).map(el => {
    const date = el.getAttribute('data-date') || '';
    const score = Number(el.getAttribute('data-score') || '0');
    const x = el.getAttribute('x') || '0';
    const y = el.getAttribute('y') || '0';
    const fill = el.style.fill || el.getAttribute('style')?.match(/fill:\s*(#[a-fA-F0-9]{3,6})/)?.[1] || '#161b22';
    return { date, score, x, y, fill };
  });

  const texts = Array.from(doc.querySelectorAll('text')).map(el => {
    const content = el.textContent || '';
    const x = el.getAttribute('x') || '0';
    const y = el.getAttribute('y') || '0';
    const styleAttr = el.getAttribute('style') || '';
    const displayNone = el.style.display === 'none' || styleAttr.includes('display:none') || /display:\s*none/.test(styleAttr);
    return {
      content,
      x,
      y,
      visible: !displayNone,
    };
  });

  return { width, height, rects, texts };
}

// Language coloring dictionary
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  'C++': '#f34b7d',
  Go: '#00ADD8',
  Rust: '#dea584',
};

export function GitHubDashboard() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [svgData, setSvgData] = useState<ParsedSVG | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [selectedLang, setSelectedLang] = useState('All');
  
  // Custom interactive tooltip state
  const [hoveredCell, setHoveredCell] = useState<{
    date: string;
    score: number;
    top: number;
    left: number;
  } | null>(null);
  const heatmapContainerRef = useRef<HTMLDivElement>(null);

  const loadData = async (forceRetry = false) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch profile/repos
      let cachedProfile = getCache<UserProfile>(USER_CACHE_KEY, PROFILE_EXPIRY_MS);
      let cachedRepos = getCache<Repo[]>(REPOS_CACHE_KEY, PROFILE_EXPIRY_MS);

      if (forceRetry) {
        cachedProfile = null;
        cachedRepos = null;
      }

      let fetchedProfile = cachedProfile;
      if (!fetchedProfile) {
        const profileRes = await fetch(`https://api.github.com/users/${USERNAME}`, {
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (!profileRes.ok) throw new Error(`Profile load failed (${profileRes.status})`);
        fetchedProfile = await profileRes.json();
        setCache(USER_CACHE_KEY, fetchedProfile);
      }
      setProfile(fetchedProfile);

      let fetchedRepos = cachedRepos;
      if (!fetchedRepos) {
        const reposRes = await fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`, {
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (!reposRes.ok) throw new Error(`Repos load failed (${reposRes.status})`);
        fetchedRepos = await reposRes.json();
        setCache(REPOS_CACHE_KEY, fetchedRepos);
      }
      setRepos(fetchedRepos || []);

      // 2. Fetch and parse heatmap SVG
      let cachedSVGText = getCache<string>(SVG_CACHE_KEY, HEATMAP_EXPIRY_MS);
      if (forceRetry) {
        cachedSVGText = null;
      }

      if (!cachedSVGText) {
        const svgRes = await fetch('/github-contributions-dark.svg');
        if (!svgRes.ok) throw new Error(`Heatmap SVG load failed (${svgRes.status})`);
        cachedSVGText = await svgRes.text();
        setCache(SVG_CACHE_KEY, cachedSVGText);
      }
      
      const parsed = parseSVGData(cachedSVGText);
      setSvgData(parsed);
      setLastSyncedAt(new Date());
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'GitHub activity could not be loaded right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Compute total statistics
  const stats = useMemo(() => {
    const publicRepos = repos.filter(r => !r.fork && !r.archived);
    const totalStars = publicRepos.reduce((acc, r) => acc + r.stargazers_count, 0);
    const totalForks = publicRepos.reduce((acc, r) => acc + r.forks_count, 0);
    const totalPublicCount = profile?.public_repos ?? publicRepos.length;

    return {
      stars: totalStars,
      forks: totalForks,
      publicRepos: totalPublicCount,
    };
  }, [repos, profile]);

  // Compute heatmap-derived insights
  const heatmapInsights = useMemo(() => {
    if (!svgData || svgData.rects.length === 0) {
      return { total: 0, streak: 0, activeDaysPercent: 0 };
    }

    let total = 0;
    let currentStreak = 0;
    let longestStreak = 0;
    let activeDays = 0;

    const sorted = [...svgData.rects].sort((a, b) => a.date.localeCompare(b.date));

    sorted.forEach(rect => {
      // Count total contributions estimated from intensity score
      // Map score intensity (0-4) to representative contribution counts
      const countsMap: Record<number, number> = { 0: 0, 1: 1, 2: 3, 3: 6, 4: 10 };
      total += countsMap[rect.score] || rect.score;

      if (rect.score > 0) {
        activeDays++;
        currentStreak++;
        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      } else {
        currentStreak = 0;
      }
    });

    const activeDaysPercent = Math.round((activeDays / sorted.length) * 100);

    return {
      total,
      streak: longestStreak,
      activeDaysPercent,
    };
  }, [svgData]);

  // Unique languages for filtering
  const languageList = useMemo(() => {
    const list = new Set<string>();
    repos
      .filter(r => !r.fork && !r.archived && r.language)
      .forEach(r => list.add(r.language!));
    return ['All', ...Array.from(list)];
  }, [repos]);

  // Filtered and sorted repositories to show
  const filteredRepos = useMemo(() => {
    const list = repos
      .filter(r => !r.fork && !r.archived)
      .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());

    if (selectedLang === 'All') return list.slice(0, 3);
    return list.filter(r => r.language === selectedLang).slice(0, 3);
  }, [repos, selectedLang]);

  // Format date helper for tooltip
  const formatTooltipDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleCellHover = (e: React.MouseEvent<SVGRectElement>, cell: ParsedRect) => {
    const cellEl = e.currentTarget;
    const cellRect = cellEl.getBoundingClientRect();
    const containerEl = heatmapContainerRef.current;
    if (containerEl) {
      const containerRect = containerEl.getBoundingClientRect();
      setHoveredCell({
        date: cell.date,
        score: cell.score,
        top: cellRect.top - containerRect.top - 42,
        left: cellRect.left - containerRect.left + cellRect.width / 2,
      });
    }
  };

  const handleCellFocus = (e: React.FocusEvent<SVGRectElement>, cell: ParsedRect) => {
    const cellEl = e.currentTarget;
    const cellRect = cellEl.getBoundingClientRect();
    const containerEl = heatmapContainerRef.current;
    if (containerEl) {
      const containerRect = containerEl.getBoundingClientRect();
      setHoveredCell({
        date: cell.date,
        score: cell.score,
        top: cellRect.top - containerRect.top - 42,
        left: cellRect.left - containerRect.left + cellRect.width / 2,
      });
    }
  };

  // Humanized relative sync state
  const syncLabel = useMemo(() => {
    if (!lastSyncedAt) return 'Syncing...';
    return 'Synced just now';
  }, [lastSyncedAt]);

  if (loading) {
    return (
      <div className="glass-card w-full rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4 sm:p-5 animate-pulse">
        <div className="h-6 w-32 rounded bg-white/5 mb-4" />
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="h-16 rounded-xl bg-white/5" />
              <div className="h-16 rounded-xl bg-white/5" />
              <div className="h-16 rounded-xl bg-white/5" />
            </div>
            <div className="h-32 rounded-xl bg-white/5" />
          </div>
          <div className="space-y-4">
            <div className="h-48 rounded-xl bg-white/5" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card w-full rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 text-center">
        <p className="text-sm text-[var(--text-300)] mb-3">{error}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => loadData(true)}
            className="btn-outline min-h-[38px] px-4 rounded-lg flex items-center gap-2 text-xs font-semibold"
            style={{ background: 'var(--bg-elevated)' }}
          >
            <RefreshCw className="h-3 w-3" />
            Retry
          </button>
          <a
            className="btn-outline min-h-[38px] px-4 rounded-lg flex items-center gap-2 text-xs font-semibold"
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Profile
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <section className="glass-card overflow-hidden rounded-[22px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 sm:p-4 relative isolate transition-all">
      <div className="flex flex-col gap-3">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[var(--border-subtle)] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-[var(--border-accent)] bg-[var(--accent-glow)] text-[var(--accent-full)]">
              <Github className="h-4 w-4" />
            </span>
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[var(--accent-full)] block">
                GITHUB PULSE
              </span>
              <h3 className="type-heading text-sm font-extrabold text-[var(--text-100)] leading-none mt-0.5">
                Contribution Graph
              </h3>
            </div>
          </div>
          <p className="text-[11px] text-[var(--text-300)] max-w-sm hidden md:block">
            A visual summary of my coding consistency and public GitHub activity over the past year.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2 py-0.5 text-[9px] text-[var(--text-300)] font-medium">
              <span className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
              {syncLabel}
            </span>
            <a
              className="btn-outline min-h-[30px] px-2.5 rounded-lg text-[10px] font-bold flex items-center gap-1 hover:text-[var(--accent-full)]"
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: 'var(--bg-elevated)' }}
            >
              Profile
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </header>

        {/* Dashboard Split Grid */}
        <div className="grid items-start gap-3 lg:grid-cols-[1.5fr_1fr] xl:grid-cols-[1.52fr_0.98fr]">
          
          {/* LEFT SIDE: Stats, Heatmap, Summary */}
          <div className="flex flex-col gap-3">
            
            {/* 3 Compact Stat Cards */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Stars', value: stats.stars, text: 'Total received', icon: Star },
                { label: 'Forks', value: stats.forks, text: 'Total forks', icon: GitFork },
                { label: 'Public Repos', value: stats.publicRepos, text: 'Public repos', icon: Book },
              ].map(card => (
                <div 
                  key={card.label} 
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-2 relative group transition-all hover:border-[var(--border-accent)]"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-[var(--text-400)]">
                      {card.label}
                    </span>
                    <card.icon className="h-2.5 w-2.5 text-[var(--text-500)] group-hover:text-[var(--accent-full)] transition-colors" />
                  </div>
                  <p className="mt-0.5 text-sm sm:text-base font-extrabold font-mono text-[var(--text-100)] leading-none">
                    {card.value ?? '—'}
                  </p>
                  <span className="text-[8px] text-[var(--text-500)] block mt-0.5">
                    {card.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Heatmap & Summary Integrated Panel */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-2.5 relative flex flex-col gap-2.5">
              <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[var(--text-200)]">
                  <CalendarDays className="h-3.5 w-3.5 text-[var(--accent-full)]" />
                  <span>Last 12 months</span>
                </div>
                <div className="flex items-center gap-1 text-[8px] uppercase tracking-widest text-[var(--text-400)] select-none">
                  <span>Less</span>
                  <span className="h-2 w-2 rounded bg-[#161b22] border border-white/5" />
                  <span className="h-2 w-2 rounded bg-[#0e4429]" />
                  <span className="h-2 w-2 rounded bg-[#006d32]" />
                  <span className="h-2 w-2 rounded bg-[#26a641]" />
                  <span className="h-2 w-2 rounded bg-[#39d353]" />
                  <span>More</span>
                </div>
              </div>

              {/* Heatmap Scroll Container */}
              <div 
                ref={heatmapContainerRef} 
                className="overflow-x-auto scrollbar-none relative py-0.5"
              >
                {svgData ? (
                  <svg 
                    width={svgData.width} 
                    height={svgData.height} 
                    viewBox={`0 0 ${svgData.width} ${svgData.height}`}
                    className="block w-full h-auto select-none"
                    aria-label="GitHub Contributions Heatmap"
                  >
                    {svgData.rects.map((rect, idx) => (
                      <rect
                        key={idx}
                        x={rect.x}
                        y={rect.y}
                        width="10"
                        height="10"
                        rx="2"
                        className="transition-all duration-100 hover:stroke-[var(--accent-full)] hover:stroke-1 focus:stroke-[var(--accent-full)] focus:stroke-1 focus:outline-none"
                        style={{ fill: rect.fill }}
                        tabIndex={0}
                        onMouseEnter={(e) => handleCellHover(e, rect)}
                        onMouseLeave={() => setHoveredCell(null)}
                        onFocus={(e) => handleCellFocus(e, rect)}
                        onBlur={() => setHoveredCell(null)}
                      />
                    ))}
                    {svgData.texts.filter(t => t.visible).map((t, idx) => (
                      <text
                        key={idx}
                        x={t.x}
                        y={t.y}
                        className="fill-[var(--text-400)] text-[9px] font-mono"
                        style={{ textAnchor: 'start' }}
                      >
                        {t.content}
                      </text>
                    ))}
                  </svg>
                ) : (
                  <div className="h-24 flex items-center justify-center text-xs text-[var(--text-400)]">
                    No heatmap data available
                  </div>
                )}

                {/* Styled Absolute Tooltip */}
                {hoveredCell && (
                  <div
                    className="absolute pointer-events-none z-30 rounded bg-[#0d0d0d] border border-[var(--border-accent)] px-2 py-1 shadow-[0_4px_12px_rgba(0,0,0,0.9)] text-[9px] font-mono leading-normal transition-opacity duration-150 transform -translate-x-1/2 flex flex-col items-center min-w-[130px]"
                    style={{
                      top: `${hoveredCell.top}px`,
                      left: `${hoveredCell.left}px`,
                    }}
                  >
                    <span className="text-[var(--text-100)] font-bold">
                      {hoveredCell.score === 0 ? 'No contributions' : `${hoveredCell.score} contribution${hoveredCell.score > 1 ? 's' : ''}`}
                    </span>
                    <span className="text-[var(--text-400)] text-[8px] mt-0.5">
                      {formatTooltipDate(hoveredCell.date)}
                    </span>
                    {/* Tooltip caret */}
                    <div className="w-1 h-1 rotate-45 bg-[#0d0d0d] border-r border-b border-[var(--border-accent)] absolute bottom-[-3px] left-1/2 -translate-x-1/2" />
                  </div>
                )}
              </div>

              {/* Integrated Summary Strip */}
              <div className="grid grid-cols-3 divide-x divide-[var(--border-subtle)] border-t border-[var(--border-subtle)] pt-2.5 text-center">
                <div>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-[var(--text-400)] block">
                    Total Year
                  </span>
                  <p className="mt-0.5 text-xs font-extrabold font-mono text-[var(--text-100)]">
                    {heatmapInsights.total}
                  </p>
                </div>
                <div>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-[var(--text-400)] block">
                    Max Streak
                  </span>
                  <p className="mt-0.5 text-xs font-extrabold font-mono text-[var(--text-100)]">
                    {heatmapInsights.streak} days
                  </p>
                </div>
                <div>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-[var(--text-400)] block">
                    Days Active
                  </span>
                  <p className="mt-0.5 text-xs font-extrabold font-mono text-[var(--text-100)]">
                    {heatmapInsights.activeDaysPercent}%
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Repositories list & support cards */}
          <div className="flex flex-col gap-3">
            
            {/* Repositories List Card */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-2.5 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-1.5">
                <div>
                  <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-[var(--accent-full)] block">
                    RECENT REPOS
                  </span>
                  <h4 className="text-[10px] font-bold text-[var(--text-100)] mt-0.5">
                    Most active public work
                  </h4>
                </div>

                {/* Filter chips */}
                {languageList.length > 2 && (
                  <div className="flex flex-wrap gap-0.5 justify-end max-w-[60%]">
                    {languageList.map(lang => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLang(lang)}
                        className={`px-1 py-0.5 rounded text-[8px] font-mono font-semibold uppercase tracking-wider border transition-colors ${
                          selectedLang === lang
                            ? 'bg-[var(--accent-glow)] border-[var(--border-accent)] text-[var(--accent-full)]'
                            : 'bg-transparent border-transparent text-[var(--text-400)] hover:text-[var(--text-200)]'
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Repo Cards stack */}
              <ul className="flex flex-col gap-1.5">
                {filteredRepos.length > 0 ? (
                  filteredRepos.map(repo => (
                    <li 
                      key={repo.id}
                      className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-2 hover:border-[var(--border-accent)] hover:-translate-y-[1px] transition-all duration-200 group relative flex flex-col gap-0.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <a 
                          href={repo.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[11px] font-semibold text-[var(--text-100)] group-hover:text-[var(--accent-full)] transition-colors inline-flex items-center gap-0.5 max-w-[85%] truncate"
                        >
                          {repo.name}
                          <ArrowUpRight className="h-2.5 w-2.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                        <div className="flex items-center gap-1 shrink-0 text-[9px] font-mono text-[var(--text-400)]">
                          <span className="flex items-center gap-0.5">
                            <Star className="h-2.5 w-2.5 text-[var(--text-500)]" />
                            {repo.stargazers_count}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <GitFork className="h-2.5 w-2.5 text-[var(--text-500)]" />
                            {repo.forks_count}
                          </span>
                        </div>
                      </div>

                      {repo.description && (
                        <p className="text-[9px] text-[var(--text-300)] line-clamp-1 leading-normal">
                          {repo.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between gap-2 text-[8px] text-[var(--text-500)] mt-0.5">
                        <div className="flex items-center gap-1.5">
                          <span 
                            className="h-1 w-1 rounded-full" 
                            style={{ backgroundColor: LANGUAGE_COLORS[repo.language || ''] || 'var(--text-400)' }}
                          />
                          <span>{repo.language || 'Language not specified'}</span>
                        </div>
                        <span className="font-mono text-[8px]">
                          Updated {formatRepoDate(repo.pushed_at)}
                        </span>
                      </div>
                    </li>
                  ))
                ) : (
                  <div className="text-center py-4 text-xs text-[var(--text-400)]">
                    No repositories found for {selectedLang}
                  </div>
                )}
              </ul>
            </div>

            {/* Supporting Insight Cards */}
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { label: 'SIGNAL', val: 'Public commit rhythm', icon: TrendingUp },
                { label: 'SOURCE', val: 'GitHub live APIs', icon: Database },
                { label: 'FOCUS', val: 'High-signal view only. No extra chrome.', icon: Eye },
              ].map(card => (
                <div 
                  key={card.label} 
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-2 flex flex-col gap-0.5 transition-all hover:border-[var(--border-accent)] group"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-[var(--text-500)]">
                      {card.label}
                    </span>
                    <card.icon className="h-2.5 w-2.5 text-[var(--text-500)] group-hover:text-[var(--accent-full)] transition-colors" />
                  </div>
                  <p className="text-[9px] font-medium text-[var(--text-300)] leading-tight mt-0.5">
                    {card.val}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Subtle Footer Statement */}
        <footer className="text-center pt-1.5 border-t border-[var(--border-subtle)] flex flex-col items-center">
          <blockquote className="text-[10px] font-medium italic text-[var(--gold-full)]">
            “Discipline builds momentum. Momentum creates impact.”
          </blockquote>
        </footer>

      </div>
    </section>
  );
}
