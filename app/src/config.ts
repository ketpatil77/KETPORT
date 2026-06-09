// Site configuration

export interface SiteConfig {
  language: string;
  title: string;
  description: string;
}

export const siteConfig: SiteConfig = {
  language: 'en',
  title: 'Ketan Patil | AI/ML Engineer, Full-Stack Developer, Cybersecurity Analyst',
  description:
    'Portfolio of Ketan Patil: AI/ML engineer, full-stack developer, cybersecurity analyst, three-time published researcher, and internship-backed systems builder.',
};

export interface BrandConfig {
  recruiterCtaLabel: string;
  recruiterCtaHref: string;
  interviewCtaLabel: string;
  interviewCtaHref: string;
  resumeLabel: string;
  resumeHref: string;
  resumeFileName: string;
}

export const brandConfig: BrandConfig = {
  recruiterCtaLabel: 'Request Resume',
  recruiterCtaHref: 'mailto:ket.patil77@gmail.com?subject=Resume%20Request%20-%20Ketan%20Patil',
  interviewCtaLabel: 'Book Interview Intro',
  interviewCtaHref: 'mailto:ket.patil77@gmail.com?subject=Interview%20Intro%20Call',
  resumeLabel: 'Download Resume',
  // Place your PDF at app/public/resume/KET-RESUME-NEW.pdf
  resumeHref: 'https://github.com/ketpatil77/KETPORT/raw/main/app/public/resume/KET-RESUME-NEW.pdf',
  resumeFileName: 'KET-RESUME-NEW.pdf',
};

export interface SocialConfig {
  iconName: 'Github' | 'Linkedin' | 'Mail' | 'Phone';
  href: string;
  label: string;
}

export const socialConfig: SocialConfig[] = [
  { iconName: 'Github', href: 'https://github.com/ketpatil77', label: 'GitHub' },
  { iconName: 'Linkedin', href: 'https://www.linkedin.com/in/ketan-patil77', label: 'LinkedIn' },
  { iconName: 'Mail', href: 'mailto:ket.patil77@gmail.com', label: 'Email' },
  { iconName: 'Phone', href: 'tel:+917796895767', label: '+91-7796895767' },
];

// Navigation configuration
export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  links: NavLink[];
  contactLabel: string;
  contactHref: string;
  contactDownloadName?: string;
}

export const navigationConfig: NavigationConfig = {
  logo: 'Ketan Patil',
  links: [
    { label: 'Case Studies', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'Experience', href: '#experience' },
    { label: 'Stack', href: '#tech-stack' },
    { label: 'Profile', href: '#about' },
    { label: 'Connect', href: '#contact' },
  ],
  contactLabel: brandConfig.resumeLabel,
  contactHref: brandConfig.resumeHref,
  contactDownloadName: brandConfig.resumeFileName,
};

// Hero section configuration
export interface HeroConfig {
  name: string;
  title: string;
  intro: string;
  roles: string[];
  location: string;
  availability: string;
  backgroundImage: string;
  metrics: { label: string; value: string }[];
}

export const heroConfig: HeroConfig = {
  name: 'Ketan Patil',
  title: 'AI/ML Engineer | Full-Stack Developer | Cybersecurity Analyst',
  intro:
    'B.Tech Computer Technology student at DBATU, graduating in 2027, with internships at Meta, Sophos, and the Government of India. I build production-grade AI/ML systems, full-stack web applications, and security tooling with measurable delivery outcomes.',
  roles: [
    '3 Peer-Reviewed Publications',
    'Production AI/ML & Full-Stack Systems',
    'Authorized Security Assessment Work',
    'Networking, Data, and Automation Workflows',
  ],
  location: 'India (remote-first, global collaboration)',
  availability: 'Open for internships, full-time roles, and research-aligned engineering work',
  backgroundImage: '/images/hero-bg.jpg',
  metrics: [
    { value: '3', label: 'Peer-Reviewed Papers' },
    { value: '14+', label: 'Verified Certifications' },
    { value: '15K+', label: 'Daily Requests Supported' },
  ],
};

// About section configuration
export interface AboutImage {
  src: string;
  alt: string;
}

export interface AboutConfig {
  label: string;
  heading: string;
  description: string;
  experienceValue: string;
  experienceLabel: string;
  images: AboutImage[];
  strengths: string[];
  languages: string[];
}

export const aboutConfig: AboutConfig = {
  label: 'About',
  heading: 'Engineering across AI/ML delivery, full-stack systems, and security-first execution.',
  description:
    'I work across AI/ML pipelines, full-stack product development, networking, and cybersecurity operations, with a bias toward production readiness, quantified outcomes, and research-backed system design.',
  experienceValue: '3+',
  experienceLabel: 'Years across\nproduct, AI, and security systems',
  images: [
    { src: '/images/about-1.jpg', alt: 'Desk setup with product sketches and code' },
    { src: '/images/about-2.jpg', alt: 'Collaboration session focused on delivery planning' },
  ],
  strengths: [
    'Three-time published researcher in applied AI/ML systems',
    'Production AI/ML, React, Flask, Django, and PHP delivery',
    'Authorized penetration testing, IDS/IPS tuning, and infrastructure hardening',
    'CCNP / CCNA backed networking and measurable execution discipline',
  ],
  languages: ['English', 'Hindi', 'Marathi'],
};

// Services section configuration
export interface ServiceItem {
  iconName: string;
  title: string;
  description: string;
  outcomes: string;
}

export interface ServicesConfig {
  label: string;
  heading: string;
  description: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  label: 'Services',
  heading: 'End-to-end product engineering from concept to production.',
  description:
    'I combine product thinking, engineering discipline, and delivery speed to ship systems teams can trust at scale.',
  services: [
    {
      iconName: 'Brain',
      title: 'AI Systems Integration & Workflow Automation',
      description:
        'Model-ready data pipelines, prompt/tool orchestration, and intelligent workflows embedded into real products.',
      outcomes: 'Higher throughput and reduced manual operational load.',
    },
    {
      iconName: 'Code2',
      title: 'Product Interface Engineering',
      description:
        'Accessible, high-quality interfaces with React/TypeScript, strong interaction design, and maintainable component systems.',
      outcomes: 'Faster onboarding and stronger completion rates.',
    },
    {
      iconName: 'ShieldCheck',
      title: 'Application & Infrastructure Security',
      description:
        'Threat analysis, vulnerability assessment, secure networking, and hardened app-level controls.',
      outcomes: 'Reduced attack surface and higher deployment confidence.',
    },
    {
      iconName: 'CloudCog',
      title: 'Cloud Platform & DevOps Execution',
      description:
        'Container-first workflows, CI-friendly architecture, and observability-driven deployment practices.',
      outcomes: 'Reliable releases with shorter iteration cycles.',
    },
  ],
};

export interface TechLogoItem {
  name: string;
  src: string;
}

export interface TechItem {
  name: string;
  description: string;
  impact: string;
}

export interface TechGroup {
  id: string;
  label: string;
  items: TechItem[];
}

export interface TechStackConfig {
  label: string;
  heading: string;
  description: string;
  logos: TechLogoItem[];
  groups: TechGroup[];
}

export const techStackConfig: TechStackConfig = {
  label: 'Technology Stack',
  heading:
    'Production technologies used across frontend, backend, AI workflows, security, and delivery operations.',
  description:
    'Core stack coverage across frontend, backend, AI workflows, cloud delivery, security testing, and developer tooling.',
  logos: [
    { name: 'NVIDIA', src: 'https://svgl.app/library/nvidia-wordmark-light.svg' },
    { name: 'Next.js', src: 'https://svgl.app/library/nextjs_icon_dark.svg' },
    { name: 'React', src: 'https://svgl.app/library/react.svg' },
    { name: 'OpenAI', src: 'https://svgl.app/library/openai_wordmark_light.svg' },
    { name: 'Python', src: 'https://svgl.app/library/python.svg' },
    { name: 'Tailwind v4', src: 'https://svgl.app/library/tailwindcss.svg' },
    { name: 'Vercel', src: 'https://svgl.app/library/vercel_wordmark.svg' },
    { name: 'Claude', src: 'https://svgl.app/library/claude-ai-wordmark-icon_light.svg' },
    { name: 'GitHub', src: 'https://svgl.app/library/github_wordmark_light.svg' },
    { name: 'Node.js', src: 'https://svgl.app/library/nodejs.svg' },
  ],
  groups: [
    {
      id: 'frontend',
      label: 'Frontend Engineering',
      items: [
        { name: 'React 19 & Next.js 16', description: 'Production-ready UI with Server Components, React Compiler, and advanced hydration.', impact: 'Built Secure Ops Dashboard and SkyTime with React 19.' },
        { name: 'Radix UI & Shadcn', description: 'High-quality accessible component systems (29+ library implementations).', impact: 'Ensured 100% WCAG design compliance across complex UIs.' },
        { name: 'Tailwind CSS 4', description: 'Modern utility-first engine with optimized CSS-in-JS and zero-runtime overhead.', impact: 'Significantly reduced bundle size for mobile-first apps.' },
        { name: 'Framer / GSAP / Anime.js', description: 'Professional motion choreography and complex timeline-based interactions.', impact: 'Created high-quality cinematic experiences for the portfolio.' },
        { name: 'Zustand 5', description: 'Type-safe, lightweight global state management for reactive platforms.', impact: 'Managed sub-second state sync for NAKSHATRAA.' }
      ],
    },
    {
      id: 'backend',
      label: 'Backend & Core Systems',
      items: [
        { name: 'Node.js & Express', description: 'High-performance event-driven backends and automated middleware.', impact: 'Engineered the ChatGPT Export system and XML generators.' },
        { name: 'Python & Flask', description: 'Lightweight REST APIs for specialized AI and scientific workloads.', impact: 'Processed complex Vedic and Agricultural data pipelines.' },
        { name: 'NumPy & Pandas', description: 'Scientific computation, dataset validation, and high-volume CSV analysis.', impact: 'Handled 50+ crop dataset validations for Agro Vision 2.0.' },
        { name: 'Puppeteer / JSDOM', description: 'Advanced browser automation, ZIP handling, and MathML/XML rendering.', impact: 'Automated document processing and browser scraping workflows.' }
      ],
    },
    {
      id: 'ai-ml',
      label: 'AI & ML Intelligence',
      items: [
        { name: 'Google Gemini (Flash/Pro)', description: 'Integration of state-of-the-art multimodal models for AI-driven insights.', impact: 'Implemented weather-based AI forecasting in SkyTime.' },
        { name: 'ASR & Whisper', description: 'Faster-Whisper, Wake-word triggers, and local audio-to-text pipelines.', impact: 'Reduced voice latency to <2.5s in SUNDAY assistant.' },
        { name: 'SpeechBrain / ECAPA-TDNN', description: 'Owner-only speaker verification and secure biometric authentication.', impact: 'Secured SUNDAY against unauthorized voice commands.' },
        { name: 'TTS (Edge/gTTS/Coqui)', description: 'Natural voice synthesis for real-time interactive assistants.', impact: 'Delivered realistic vocal feedback systems for Astro platforms.' }
      ],
    },
    {
      id: 'ops-testing',
      label: 'Operations & Quality',
      items: [
        { name: 'Pytest / Vitest / Jest', description: 'Deterministic test suites for AI, frontend, and backend services.', impact: 'Maintained high coverage across the SUNDAY and Astro codebases.' },
        { name: 'Docker & Redis', description: 'Containerized microservices and fast in-memory task queuing (Celery/Flower).', impact: 'Shipped fully reproducible stacks with real-time health monitoring.' },
        { name: 'Quality: Black & ESLint', description: 'Production-grade code formatting and static analysis (Flake8/Pylint).', impact: 'Maintained enterprise-level legibility across 7+ project repos.' },
        { name: 'Networking (CCNA)', description: 'Routing, switching, firewall I/O analysis, and secure VAPT testing.', impact: 'Secured NMU Student Portal against critical OTP bypasses.' }
      ],
    },
  ],
};

// Experience section configuration
export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  duration: string;
  highlights: string[];
}

export const experienceConfig = {
  label: 'Experience',
  heading: 'Professional experience delivering reliability, security, and scale.',
  description: 'Internship experience across telecom support, cybersecurity operations, and network performance programs.',
  items: [
    {
      company: 'DPIIT, Government of India',
      role: 'Tech Support Intern (Telecommunication Dept.)',
      location: 'New Delhi, India',
      duration: 'Jan 2024 – Jun 2024',
      highlights: [
        'Supported telecom systems serving 1,000+ users in production operations.',
        'Reduced average incident resolution time by 15 minutes through structured troubleshooting workflows.'
      ]
    },
    {
      company: 'Sophos',
      role: 'Jr. Security Analyst Intern',
      location: 'Remote',
      duration: 'Sep 2023 – Dec 2023',
      highlights: [
        'Analyzed firewall I/O across 200+ endpoints, increasing threat visibility by 18%.',
        'Refined IDS configurations to reduce false positives by 10%.'
      ]
    },
    {
      company: 'Meta Inc.',
      role: 'Jr. Network Analyst Intern',
      location: 'Remote',
      duration: 'May 2023 – Aug 2023',
      highlights: [
        'Optimized monitoring workflows handling ~15K daily requests, lowering latency by 12%.',
        'Supported feature validation and testing, contributing to 20% faster internal release cycles.'
      ]
    }
  ]
};

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  location: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  summary: string;
  focusAreas: string[];
  credentialId?: string;
  verifyHref?: string;
}

export interface CredentialsConfig {
  label: string;
  education: EducationItem[];
  certifications: CertificationItem[];
}

// Education and Certifications Configuration
export const credentialsConfig: CredentialsConfig = {
  label: 'Credentials',
  education: [
    {
      institution: 'Dr. Babasaheb Ambedkar Technological University (DBATU)',
      degree: 'B.Tech – Computer Technology',
      duration: 'Sept 2024 – Present (Expected 2027)',
      location: 'Lonere, Maharashtra'
    },
    {
      institution: 'Maharashtra State Board of Technical Education (MSBTE)',
      degree: 'Diploma – Computer Technology',
      duration: 'Jun 2021 – Jun 2024',
      location: 'Maharashtra, India'
    },
    {
      institution: 'Maharashtra State Board',
      degree: '12th – PCM',
      duration: 'Completed 2021',
      location: 'Maharashtra, India'
    }
  ],
  certifications: [
    {
      name: 'CCNP - Routing & Switching',
      issuer: 'Cisco',
      year: '2026',
      summary:
        'Advanced networking certification focused on enterprise routing, switching, and production network operations.',
      focusAreas: ['Enterprise Routing', 'Switching', 'Operational Networking'],
    },
    {
      name: 'CCNA - Routing & Switching',
      issuer: 'Cisco',
      year: '2024',
      summary:
        'Core networking certification covering enterprise routing, switching, and operational troubleshooting.',
      focusAreas: ['Routing & Switching', 'Network Security Basics', 'Troubleshooting Workflows'],
    },
    {
      name: 'IBM Cybersecurity Analyst Professional',
      issuer: 'IBM',
      year: '2025',
      summary:
        'Role-focused cybersecurity training for SOC operations, incident handling, and vulnerability management.',
      focusAreas: ['SOC Operations', 'Incident Response', 'Threat Management'],
    },
    {
      name: 'Penetration Testing, Threat Hunting & Cryptography',
      issuer: 'IBM',
      year: '2026',
      summary:
        'Advanced IBM track centered on offensive assessment, cryptographic concepts, and threat-hunting practices.',
      focusAreas: ['Penetration Testing', 'Threat Hunting', 'Cryptography'],
    },
    {
      name: 'Python for Data Science, AI & Development',
      issuer: 'IBM',
      year: '2026',
      summary:
        'Applied Python program spanning data science workflows, AI experimentation, and development fundamentals.',
      focusAreas: ['Python', 'Data Science', 'AI Development'],
    },
    {
      name: 'Introduction to Cloud Computing',
      issuer: 'IBM',
      year: '2026',
      summary:
        'Cloud fundamentals program covering service models, deployment patterns, and platform capabilities.',
      focusAreas: ['Cloud Basics', 'Service Models', 'Deployment Patterns'],
    },
    {
      name: 'Database Engineer',
      issuer: 'Meta',
      year: '2025',
      summary:
        'Database engineering track covering schema design, performance tuning, and reliability fundamentals.',
      focusAreas: ['Schema Design', 'Query Optimization', 'Data Reliability'],
    },
    {
      name: 'Data Analyst',
      issuer: 'Meta',
      year: '2025',
      summary:
        'Analytics program centered on data interpretation, metrics storytelling, and decision support.',
      focusAreas: ['Data Interpretation', 'Metrics Reporting', 'Decision Support'],
    },
    {
      name: 'Getting Started with Machine Learning',
      issuer: 'Amazon',
      year: '2025',
      summary:
        'Cloud ML learning path on model workflows, managed services, and scalable deployment practices.',
      focusAreas: ['ML Workflows on AWS', 'Model Deployment', 'Cloud-Scale Inference'],
    },
    {
      name: 'Google IT Support Professional Certificate',
      issuer: 'Google',
      year: '2025',
      summary:
        'IT support certification covering operating systems, diagnostics, networking, and user-focused troubleshooting.',
      focusAreas: ['Systems Support', 'Diagnostics', 'Networking & OS'],
    },
    {
      name: 'Successful Negotiation',
      issuer: 'University of Michigan',
      year: '2026',
      summary:
        'Professional communication and negotiation training with emphasis on collaborative decision-making.',
      focusAreas: ['Negotiation', 'Communication', 'Decision Making'],
    },
    {
      name: 'Leadership Skills',
      issuer: 'IIM Ahmedabad',
      year: '2024',
      summary:
        'Leadership-oriented program on team coordination, initiative, and professional growth.',
      focusAreas: ['Leadership', 'Teamwork', 'Professional Growth'],
    },
    {
      name: 'Wireshark for Basic Network Security Analysis',
      issuer: 'Coursera',
      year: '2026',
      summary:
        'Hands-on packet analysis and network-security inspection using Wireshark.',
      focusAreas: ['Wireshark', 'Packet Analysis', 'Network Security'],
    }
  ]
};

export interface ProofMetric {
  label: string;
  value: string;
}

export interface ProofConfig {
  label: string;
  heading: string;
  description: string;
  highlights: ProofMetric[];
}

export const proofConfig: ProofConfig = {
  label: 'Case Studies',
  heading: 'Case studies with clear ownership, technical depth, and quantified outcomes.',
  description:
    'A curated set of projects showing what was built, why it mattered, and what improved.',
  highlights: [
    { label: 'Peer-Reviewed Papers', value: '3' },
    { label: 'Verified Certifications', value: '14+' },
    { label: 'Daily Traffic Supported', value: '15K+' },
    { label: 'Attack Surface Reduction', value: '~40%' },
  ],
};

// Portfolio section configuration
export interface ProjectItem {
  title: string;
  category: string;
  year: string;
  posterImage: string;
  summary: string;
  tech: string[];
  liveHref: string;
  codeHref: string;
  impact: string;
  role: string;
  duration: string;
  stackSummary: string;
  outcome: string;
  featured?: boolean;
}

export interface PortfolioConfig {
  label: string;
  heading: string;
  description: string;
  projects: ProjectItem[];
  viewAllLabel: string;
  githubHref: string;
}

export const portfolioConfig: PortfolioConfig = {
  label: 'Projects',
  heading: 'Selected work with measurable outcomes',
  description:
    'Recruiter-friendly case studies showing role ownership, technical depth, and delivery impact.',
  projects: [
    {
      title: 'NAKSHATRAA',
      category: 'Vedic Intelligence Platform',
      year: '2026',
      posterImage: '/images/portfolio-1.jpg',
      summary:
        'Architected a production-ready Vedic kundli intelligence system with deterministic prediction engines and bilingual life-domain insights.',
      tech: ['Python', 'Flask', 'NumPy', 'geopy', 'Celery', 'Redis', 'Vite', 'Zustand', 'Swiss Ephemeris', 'Docker Compose'],
      liveHref: 'mailto:ket.patil77@gmail.com?subject=NAKSHATRAA%20Demo',
      codeHref: 'https://github.com/ketanpatil',
      impact: 'Delivered sub-second personalized predictions and platform architecture ready for multi-region, multi-language scale.',
      role: 'Full-Stack Engineer & AI System Integration',
      duration: 'Feb 2026',
      stackSummary:
        'Flask + Celery/Redis pipelines, NumPy computation, geopy mapping, Swiss Ephemeris.',
      outcome: 'Rashi, Dasha, and transit-aware prediction workflows with health monitoring and rate limiting.',
      featured: true,
    },
    {
      title: 'SkyTime',
      category: 'Weather with AI Insights',
      year: '2026',
      posterImage: '/images/hero-bg.jpg',
      summary:
        'Engineered an AI-powered weather dashboard that leverages Google Gemini models to provide intelligent clothing and productivity recommendations.',
      tech: ['React 19', 'TypeScript', 'Vite', 'Recharts', 'Gemini API', 'Framer Motion'],
      liveHref: 'https://github.com/ketanpatil',
      codeHref: 'https://github.com/ketanpatil',
      impact: 'Built a predictive UI that translates raw meteorological data into human-actionable insights.',
      role: 'Frontend Architect',
      duration: 'Feb 2026',
      stackSummary: 'React 19 + TypeScript, Google Generative AI (Gemini 3-Flash), Recharts 3.7.0.',
      outcome: 'Highly interactive data visualisations with real-time AI weather advisor.',
      featured: true,
    },
    {
      title: 'SUNDAY',
      category: 'Offline Voice AI Assistant',
      year: '2026',
      posterImage: '/images/portfolio-2.jpg',
      summary:
        'Engineered a fully offline, privacy-first desktop AI assistant with a secure voice pipeline and context-aware planning.',
      tech: ['Python 3.11', 'Faster-Whisper', 'SpeechBrain', 'Silero VAD', 'openWakeWord', 'Edge-TTS', 'pytest', 'Docker Compose'],
      liveHref: 'mailto:ket.patil77@gmail.com?subject=SUNDAY%20Demo',
      codeHref: 'https://github.com/ketanpatil',
      impact: 'Delivered a safety-first offline assistant with <2.5s median voice latency and owner-only secure command execution.',
      role: 'Full-Stack Engineer & Voice Systems Architect',
      duration: 'Feb 2026',
      stackSummary:
        'Wake-word -> VAD -> speaker verification -> ASR -> intent execution with contextual memory and planning.',
      outcome: 'Deterministic natural-voice control for complex desktop workflows across Windows, macOS, and Linux.',
      featured: true,
    },
    {
      title: 'Agro Vision 2.0',
      category: 'AI / Data Platform',
      year: '2025',
      posterImage: '/images/portfolio-3.jpg',
      summary:
        'Engineered a production-ready remedies intelligence layer with validated agriculture recommendations and compliance-aware outputs.',
      tech: ['Python', 'Pandas', 'AI Integration', 'Data Validation Pipelines'],
      liveHref: 'mailto:ket.patil77@gmail.com?subject=Agro%20Vision%202.0%20Demo',
      codeHref: 'https://github.com/ketanpatil',
      impact: 'Enabled actionable AI support with potential seasonal savings of INR 10K-30K per farmer.',
      role: 'AI / Data Engineering & System Integration',
      duration: 'Sep 2025',
      stackSummary: 'Region-validated remedies data across 25+ diseases, 50 crops, and 70+ approved products.',
      outcome: 'Compliance-aware recommendation layer with multi-state scalability readiness.',
    },
    {
      title: 'Chikitsamedha',
      category: 'HealthTech Product',
      year: '2025',
      posterImage: '/images/portfolio-4.jpg',
      summary:
        'Built a complete pharmacological interaction analysis platform with rules-based inference and quantitative risk scoring.',
      tech: ['Python', 'Flask', 'React', 'JavaScript', 'Docker', 'REST APIs'],
      liveHref: 'mailto:ket.patil77@gmail.com?subject=Chikitsamedha%20Demo',
      codeHref: 'https://github.com/ketanpatil',
      impact: 'Enabled fast medication-risk screening with clear visual stratification for educational workflows.',
      role: 'Full-Stack Developer',
      duration: 'Nov 2025',
      stackSummary: 'Flask backend (7 endpoints), 100-medicine dataset, 50+ rules engine, risk scoring, React frontend.',
      outcome: 'Real-time interaction checks with offline-capable containerized deployment.',
    },
    {
      title: 'NMU Student Portal Penetration Testing',
      category: 'Cybersecurity',
      year: '2024',
      posterImage: '/images/portfolio-5.jpg',
      summary:
        'Performed penetration testing and remediated OTP bypass plus additional critical vulnerabilities using MITM and session analysis.',
      tech: ['VAPT', 'MITM Testing', 'Session Security', 'OWASP'],
      liveHref: 'mailto:ket.patil77@gmail.com?subject=NMU%20Portal%20Security%20Case%20Study',
      codeHref: 'https://github.com/ketanpatil',
      impact: 'Reduced security exposure by roughly 40% with prioritized remediation.',
      role: 'Security Analyst',
      duration: '2024',
      stackSummary: 'Exploit validation, session-hijack testing, and remediation-focused risk reporting.',
      outcome: '20-page assessment with prioritized fixes for 5+ critical vulnerabilities.',
    },
    {
      title: 'Universal Image Tool',
      category: 'Developer Tooling',
      year: '2025',
      posterImage: '/images/service-ai.png',
      summary:
        'Built a batch image processing pipeline to handle high-volume media optimization with deterministic outputs.',
      tech: ['Python', 'Automation', 'Image Processing', 'CLI'],
      liveHref: 'mailto:ket.patil77@gmail.com?subject=Universal%20Image%20Tool%20Demo',
      codeHref: 'https://github.com/ketanpatil',
      impact: 'Processed 500+ images with around 70% size reduction.',
      role: 'Tooling Engineer',
      duration: '2025',
      stackSummary: 'Automated transform/compression pipeline for large image batches.',
      outcome: 'Faster publishing workflow with smaller and consistent media assets.',
    },
    {
      title: 'LC Issuer App',
      category: 'Automation System',
      year: '2025',
      posterImage: '/images/service-frontend.png',
      summary:
        'Developed a CSV-driven certificate generation workflow to automate repetitive issuance tasks.',
      tech: ['Python', 'CSV Pipelines', 'Automation'],
      liveHref: 'mailto:ket.patil77@gmail.com?subject=LC%20Issuer%20App%20Demo',
      codeHref: 'https://github.com/ketanpatil',
      impact: 'Reduced manual certificate generation effort by around 70%.',
      role: 'Automation Developer',
      duration: '2025',
      stackSummary: 'Input validation, CSV parsing, and deterministic template-based generation.',
      outcome: 'High-volume certificate issuing with reduced human error and turnaround time.',
    },
    {
      title: 'Secure Ops Dashboard',
      category: 'Cybersecurity Admin Platform',
      year: '2025',
      posterImage: '/images/service-security.png',
      summary:
        'Built a performance-driven Next.js motherboard-themed dashboard for secure operations, audit logs, and system metrics.',
      tech: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'TypeScript', 'Framer Motion 12'],
      liveHref: 'mailto:ket.patil77@gmail.com',
      codeHref: 'https://github.com/ketanpatil',
      impact: 'Implemented React Compiler (Babel) and Tailwind 4 for peak runtime efficiency.',
      role: 'Frontend Lead',
      duration: '2025',
      stackSummary: 'Next.js 16.1.4, React 19.2.3, Tailwind CSS v4, dynamic aether-flow animations.',
      outcome: 'Scalable dashboard foundation with optimized re-renders and dark-themed glassmorphism.',
    },
    {
      title: 'ChatGPT Export Backend',
      category: 'Node.js Backend Service',
      year: '2025',
      posterImage: '/images/service-ai.png',
      summary:
        'Developed a specialized Node.js service for parsing and generating complex document exports (XML/MathML/Omml) using browser automation.',
      tech: ['Node.js', 'Express', 'Puppeteer', 'JSZip', 'JSDOM', 'MathJax'],
      liveHref: 'https://github.com/ketanpatil',
      codeHref: 'https://github.com/ketanpatil',
      impact: 'Enabled automated high-fidelity mathematical document conversion at scale.',
      role: 'Backend Engineer',
      duration: '2025',
      stackSummary: 'Express backend, Puppeteer for automation, MathML to OMML conversion logic.',
      outcome: 'Streamlined export service with multi-format support and asset compression.',
    },
    {
      title: 'Farmer Market Guide',
      category: 'Marketplace Platform',
      year: '2024',
      posterImage: '/images/service-frontend.png',
      summary:
        'Designed a multi-dashboard marketplace for agriculture, connecting buyers, farmers, and middle-men via a static-site architecture.',
      tech: ['Vanilla HTML', 'CSS', 'JavaScript', 'JSON Data Store'],
      liveHref: 'https://github.com/ketanpatil',
      codeHref: 'https://github.com/ketanpatil',
      impact: 'Delivered an accessible, no-database architecture suitable for low-connectivity environments.',
      role: 'Product Developer',
      duration: '2024',
      stackSummary: 'Static HTML/JS stack with dynamic JSON dashboards and browser testing.',
      outcome: 'Functional multi-actor marketplace focusing on simplicity and loading performance.',
    },
  ],
  viewAllLabel: 'View All on GitHub',
  githubHref: 'https://github.com/ketanpatil',
};

// CTA section configuration
export interface CTAConfig {
  tags: string[];
  heading: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  email: string;
  backgroundImage: string;
  responseTime: string;
  timezone: string;
}

export const ctaConfig: CTAConfig = {
  tags: ['Product UI', 'AI Workflows', 'Secure APIs', 'Scalable Delivery'],
  heading: 'Open to conversations for engineering roles and outcome-focused product mandates.',
  description:
    'If your team is hiring for product engineering, AI-enabled systems, or secure full-stack delivery, I can share relevant case studies and role-fit details quickly.',
  buttonText: brandConfig.resumeLabel,
  buttonHref: brandConfig.resumeHref,
  email: 'ket.patil77@gmail.com',
  backgroundImage: '/images/cta-bg.jpg',
  responseTime: '< 24 hours',
  timezone: 'IST (UTC+5:30)',
};

// Footer section configuration
export interface FooterConfig {
  logo: string;
  utilityLinks: { label: string; href: string }[];
  copyright: string;
  credit: string;
}

export const footerConfig: FooterConfig = {
  logo: 'Ketan Patil',
  utilityLinks: [
    { label: 'Case Studies', href: '#portfolio' },
    { label: 'Services', href: '#services' },
    { label: 'Experience', href: '#experience' },
    { label: 'Stack', href: '#tech-stack' },
    { label: 'Profile', href: '#about' },
    { label: 'Connect', href: '#contact' },
  ],
  copyright: `© ${new Date().getFullYear()} Ketan Patil. All rights reserved.`,
  credit: 'Engineered with React, TypeScript, Tailwind CSS, and Framer Motion.',
};

