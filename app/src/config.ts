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

const primarySiteLinks: NavLink[] = [
  { label: 'Case Studies', href: '#portfolio' },
  { label: 'Innovation', href: '#innovation-lab' },
  { label: 'Services', href: '#services' },
  { label: 'Experience', href: '#experience' },
  { label: 'Research', href: '#publications' },
  { label: 'Stack', href: '#tech-stack' },
  { label: 'Profile', href: '#about' },
];

export const navigationConfig: NavigationConfig = {
  logo: 'Ketan Patil',
  links: primarySiteLinks,
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
  spotlightItems: { label: string; value: string }[];
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
  spotlightItems: [
    { label: 'Research', value: '3 peer-reviewed IJVRA papers in 2026' },
    { label: 'Experience', value: 'Meta, Sophos, and DPIIT internships' },
    { label: 'Security', value: '~40% attack-surface reduction from authorized NMU pentest' },
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
  focusAreas: string[];
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
  focusAreas: ['Applied AI/ML', 'Cybersecurity', 'AgriTech', 'HealthTech', 'GovTech', 'Cloud / AWS'],
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
    'Production technologies used across product engineering, AI/ML research, security, and delivery operations.',
  description:
    'Core stack coverage across frontend, backend, AI research, cloud delivery, security testing, data systems, and developer tooling.',
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
        { name: 'Google Gemini (Flash/Pro)', description: 'Integration of multimodal foundation models for actionable AI product workflows.', impact: 'Implemented AI forecasting and recommendations in SkyTime.' },
        { name: 'ASR & Whisper', description: 'Faster-Whisper, wake-word orchestration, and low-latency local voice pipelines.', impact: 'Reduced voice latency to <2.5s in SUNDAY.' },
        { name: 'SpeechBrain / ECAPA-TDNN', description: 'Speaker verification for secure, owner-only biometric command execution.', impact: 'Held false acceptance to <=1% in SUNDAY voice flows.' },
        { name: 'TTS (Edge/gTTS/Coqui)', description: 'Natural text-to-speech systems for interactive assistants and guided outputs.', impact: 'Delivered natural voice response systems for assistant-grade products.' }
      ],
    },
    {
      id: 'research-data',
      label: 'Research & Data Systems',
      items: [
        { name: 'Computer Vision Fusion', description: 'CNNs, multi-view fusion, VAAA, and BiFPN pipelines for viewpoint-invariant defect detection.', impact: 'Reached 95.3% accuracy and AUC 0.991 in published industrial inspection research.' },
        { name: 'Multimodal Predictive Maintenance', description: 'Thermal imaging plus LiDAR depth fused through gated cross-modal attention for industrial IoT environments.', impact: 'Enabled fault anticipation up to 72 hours before failure in published research work.' },
        { name: 'SQL & Data Modeling', description: 'Schema design, relational modeling, query optimization, and analytics-friendly data structures.', impact: 'Strengthened database and analytics fluency across Meta coursework and platform builds.' },
        { name: 'Benchmarks & Technical Writing', description: 'Ablation studies, experiment design, IEEE-style writing, and long-form technical documentation.', impact: 'Converted research and product systems into 2 papers and 165+ pages of documentation.' }
      ],
    },
    {
      id: 'ops-testing',
      label: 'Operations & Quality',
      items: [
        { name: 'Pytest / Vitest / Jest', description: 'Deterministic test suites for AI, frontend, and backend services.', impact: 'Maintained reliable verification across assistant, dashboard, and API-heavy builds.' },
        { name: 'Docker & Redis', description: 'Containerized services, Celery/Flower queues, and reproducible local-to-prod workflows.', impact: 'Shipped fully reproducible stacks with health monitoring and async jobs.' },
        { name: 'Quality: Black & ESLint', description: 'Formatting, static analysis, and maintainability enforcement across fast-moving repositories.', impact: 'Preserved enterprise-grade code readability across 7+ active repos.' },
        { name: 'Networking, SIEM & VAPT', description: 'Routing, switching, IDS/IPS tuning, SIEM awareness, and mitigation-focused security assessment.', impact: 'Remediated OTP bypass and 5+ critical issues on the NMU Student Portal.' }
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
  heading: 'Professional experience across telecom operations, cybersecurity, and network-scale support.',
  description: 'Internship experience spanning government infrastructure, cybersecurity operations, and distributed-service monitoring with quantified delivery outcomes.',
  items: [
    {
      company: 'DPIIT, Government of India',
      role: 'Tech Support Intern (Telecommunication Dept.)',
      location: 'New Delhi, India',
      duration: 'Jan 2024 – Jun 2024',
      highlights: [
        'Administered communication infrastructure supporting 1,000+ users across critical government operations.',
        'Reduced average incident resolution time by 15 minutes through structured troubleshooting workflows.',
        'Coordinated hardware upgrade execution with telecom vendors while preserving zero-downtime operations.'
      ]
    },
    {
      company: 'Sophos',
      role: 'Jr. Security Analyst Intern',
      location: 'Remote',
      duration: 'Sep 2023 – Dec 2023',
      highlights: [
        'Analyzed firewall I/O across 200+ endpoints, increasing threat visibility by 18%.',
        'Refined IDS configurations to reduce false positives by 10% and improve analyst signal quality.',
        'Documented remediation playbooks and reusable internal references for recurring threat patterns.'
      ]
    },
    {
      company: 'Meta Inc.',
      role: 'Jr. Network Analyst Intern',
      location: 'Remote',
      duration: 'May 2023 – Aug 2023',
      highlights: [
        'Optimized monitoring workflows handling ~15K daily requests, lowering latency by 12%.',
        'Supported feature validation and testing, contributing to 20% faster internal release cycles.',
        'Built monitoring dashboards that improved observability and incident visibility across distributed services.'
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
      name: 'Cisco Certified Network Professional Routing and Switching',
      issuer: 'Cisco',
      year: 'Apr 2026',
      summary: 'Advanced enterprise networking credential validating routing and switching solutions, planning, and operations.',
      focusAreas: ['Enterprise Routing', 'Switching', 'Network Optimization'],
      credentialId: 'CSCO12128865',
      verifyHref: 'https://www.cisco.com/go/verifycertificate'
    },
    {
      name: 'Cisco Certified Network Associate Routing and Switching',
      issuer: 'Cisco',
      year: 'Jun 2024',
      summary: 'Core networking credential validating foundations in routing and switching, network security, and configuration.',
      focusAreas: ['Routing & Switching', 'Network Security', 'Troubleshooting'],
      credentialId: 'CSCO12128865',
      verifyHref: 'https://www.cisco.com/go/verifycertificate'
    },
    {
      name: 'IBM Cybersecurity Analyst Professional',
      issuer: 'IBM',
      year: 'Jun 2025',
      summary: 'Comprehensive role-focused training for SOC operations, incident handling, network security, and threat management.',
      focusAreas: ['SOC Operations', 'Incident Response', 'Threat Intelligence'],
      credentialId: 'M7WQ4A9D2K',
      verifyHref: 'https://coursera.org/verify/professional-cert/M7WQ4A9D2K'
    },
    {
      name: 'Penetration Testing, Threat Hunting, and Cryptography',
      issuer: 'IBM',
      year: 'Apr 2026',
      summary: 'Advanced IBM track centered on offensive assessment, cryptographic concepts, and threat-hunting practices.',
      focusAreas: ['Penetration Testing', 'Threat Hunting', 'Cryptography'],
      credentialId: 'TCCNS5ZX8D6',
      verifyHref: 'https://coursera.org/verify/TCCNS5ZX8D6'
    },
    {
      name: 'Python for Data Science, AI & Development',
      issuer: 'IBM',
      year: 'May 2026',
      summary: 'Applied Python program spanning data science workflows, AI experimentation, and development fundamentals.',
      focusAreas: ['Python', 'Data Science', 'AI Development'],
      credentialId: 'ASD24FHIK58',
      verifyHref: 'https://coursera.org/verify/ASD24FHIK58'
    },
    {
      name: 'Introduction to Cloud Computing',
      issuer: 'IBM',
      year: 'May 2026',
      summary: 'Cloud fundamentals program covering service models, deployment patterns, and platform capabilities.',
      focusAreas: ['Cloud Basics', 'Service Models', 'Deployment Patterns'],
      credentialId: 'HGVN64EZ9RS',
      verifyHref: 'https://coursera.org/verify/HGVN64EZ9RS'
    },
    {
      name: 'Meta Database Engineer',
      issuer: 'Meta',
      year: 'Sep 2025',
      summary: 'Database engineering track covering schema design, performance tuning, and reliability fundamentals.',
      focusAreas: ['Schema Design', 'Query Optimization', 'Data Reliability'],
      credentialId: '4B5HAOL1GUXA',
      verifyHref: 'https://coursera.org/verify/4B5HAOL1GUXA'
    },
    {
      name: 'Meta Data Analyst',
      issuer: 'Meta',
      year: 'Oct 2025',
      summary: 'Analytics program centered on data interpretation, metrics storytelling, and decision support.',
      focusAreas: ['Data Interpretation', 'Metrics Reporting', 'Decision Support'],
      credentialId: '29EDD23KDOV5',
      verifyHref: 'https://coursera.org/verify/29EDD23KDOV5'
    },
    {
      name: 'Google IT Support Professional Certificate',
      issuer: 'Google',
      year: 'Nov 2025',
      summary: 'IT support professional certificate covering systems support, diagnostics, networking, security, and OS.',
      focusAreas: ['Systems Support', 'Diagnostics', 'Networking & OS'],
      credentialId: 'A9XW7K3F2M',
      verifyHref: 'https://coursera.org/verify/professional-cert/A9XW7K3F2M'
    },
    {
      name: 'Getting Started with AWS Machine Learning',
      issuer: 'Amazon Web Services',
      year: 'Nov 2025',
      summary: 'Hands-on introduction to machine learning concepts, models, pipelines, and tools on the AWS platform.',
      focusAreas: ['Machine Learning', 'AWS Services', 'ML Pipelines'],
      credentialId: 'X4M2K9A7WTRF',
      verifyHref: 'https://coursera.org/verify/X4M2K9A7WTRF'
    },
    {
      name: 'Successful Negotiation',
      issuer: 'University of Michigan',
      year: 'May 2026',
      summary: 'Professional communication and negotiation training with emphasis on collaborative decision-making.',
      focusAreas: ['Negotiation', 'Communication', 'Decision Making'],
      credentialId: 'UR9Y44CFJMYXE',
      verifyHref: 'https://coursera.org/verify/UR9Y44CFJMYXE'
    },
    {
      name: 'Leadership Skills',
      issuer: 'IIMA - IIM Ahmedabad',
      year: 'Apr 2024',
      summary: 'Leadership-oriented program on team coordination, initiative, and professional growth.',
      focusAreas: ['Leadership', 'Teamwork', 'Professional Growth'],
      credentialId: 'VZDE974GBDSW',
      verifyHref: 'https://coursera.org/verify/VZDE974GBDSW'
    },
    {
      name: 'Wireshark for Basic Network Security Analysis',
      issuer: 'Coursera',
      year: 'May 2026',
      summary: 'Hands-on packet analysis and network-security inspection using Wireshark.',
      focusAreas: ['Wireshark', 'Packet Analysis', 'Network Security'],
      credentialId: 'GJBYWASDEF549',
      verifyHref: 'https://coursera.org/verify/GJBYWASDEF549'
    },
    {
      name: 'Cloud Computing Foundations',
      issuer: 'Duke University',
      year: 'May 2026',
      summary: 'Foundational concepts of cloud computing, covering infrastructure services, virtualization, and fundamental architectures.',
      focusAreas: ['Cloud Foundations', 'Cloud Architecture', 'Infrastructure'],
      credentialId: 'CHR4TULN34',
      verifyHref: 'https://coursera.org/verify/CHR4TULN34'
    },
    {
      name: 'Cloud Virtualization, Containers and APIs',
      issuer: 'Duke University',
      year: 'Jun 2026',
      summary: 'Practical training on cloud virtualization, container deployments, Docker/Kubernetes basics, and API development.',
      focusAreas: ['Virtualization', 'Containers & Docker', 'APIs'],
      credentialId: '672NWRRYYSCC',
      verifyHref: 'https://coursera.org/verify/672NWRRYYSCC'
    }
  ]
};

export interface PublicationItem {
  title: string;
  journal: string;
  issue: string;
  publishedOn: string;
  impactFactor: string;
  paperId: string;
  authors: string;
  pdfHref: string;
  summary: string;
  contributions: string[];
  metrics: string[];
  focusAreas: string[];
}

export interface PublicationsConfig {
  label: string;
  heading: string;
  description: string;
  highlights: ProofMetric[];
  themes: string[];
  items: PublicationItem[];
}

export const publicationsConfig: PublicationsConfig = {
  label: 'Research',
  heading: 'Peer-reviewed publications that turn experimentation into deployable AI systems.',
  description:
    'Three 2026 IJVRA publications covering industrial inspection, predictive maintenance, and LLM-agent failure analysis, with quantified performance and deployment relevance.',
  highlights: [
    { label: 'Published Papers', value: '3' },
    { label: 'Best Accuracy', value: '95.3%' },
    { label: 'Agent Trials', value: '1,200' },
    { label: 'Early Fault Horizon', value: '72h' },
  ],
  themes: [
    'Computer vision fusion and viewpoint-invariant defect detection',
    'Thermal + depth multimodal predictive maintenance',
    'Ontology-driven failure analysis for LLM agents',
    'Edge-deployable AI systems for industrial environments',
    'Benchmark design, ablation studies, and technical writing'
  ],
  items: [
    {
      title: 'Multi-Angle Industrial Inspection Fusion: A Unified Deep Learning Framework for Viewpoint-Invariant Defect Detection',
      journal: 'International Journal of Versatile Research and Analysis (IJVRA)',
      issue: 'Vol. 4, Issue 3',
      publishedOn: 'March 2026',
      impactFactor: '9.12',
      paperId: 'IJVRA2603948',
      authors: 'Dr. Nitin Santosh Patil, Dr. Sandip N. Vende, Ketan V. Patil',
      pdfHref: 'https://ijpub.org/ijvra/papers/IJVRA2603948.pdf',
      summary:
        'Proposed MAIFNet, a multi-view fusion framework for industrial surface defect detection across 3-8 calibrated camera viewpoints.',
      contributions: [
        'Designed Viewpoint-Aware Attention Aggregation and BiFPN-based fusion for viewpoint-invariant inspection workflows.',
        'Validated on InspectFusion-360 covering 52,400 annotated sets, 6 component categories, and 8 defect classes.',
        'Demonstrated edge readiness at 31.4 FPS on NVIDIA Jetson AGX Orin for real industrial deployment contexts.'
      ],
      metrics: ['95.3% accuracy', 'AUC 0.991', '+3.1–15.8 pp vs baselines', '31.4 FPS on Jetson'],
      focusAreas: ['Computer Vision', 'Multi-view Fusion', 'BiFPN', 'Edge Inference']
    },
    {
      title: 'Thermal + Depth Fusion for Predictive Maintenance: A Multimodal Framework for Early Fault Anticipation in Rotating Machinery',
      journal: 'International Journal of Versatile Research and Analysis (IJVRA)',
      issue: 'Vol. 4, Issue 4',
      publishedOn: 'April 2026',
      impactFactor: '9.12',
      paperId: 'IJVRA2604277',
      authors: 'Dr. Nitin Santosh Patil, Dr. Sandip N. Vende, Ketan Vilas Patil',
      pdfHref: 'https://ijpub.org/ijvra/papers/IJVRA2604277.pdf',
      summary:
        'Designed a gated cross-modal attention framework that fuses thermal imaging and LiDAR depth data for early rotating-machinery fault anticipation.',
      contributions: [
        'Addressed single-modality predictive-maintenance limits by combining thermal anomaly signatures with geometric deformation signals.',
        'Architected the pipeline for industrial IoT and edge-deployable environments rather than lab-only evaluation.',
        'Enabled fault anticipation up to 72 hours before failure to widen operational intervention windows.'
      ],
      metrics: ['72h early warning', 'Thermal + LiDAR fusion', 'Cross-modal attention', 'Industrial IoT ready'],
      focusAreas: ['Multimodal ML', 'Predictive Maintenance', 'Cross-modal Attention', 'Industrial IoT']
    },
    {
      title: 'FONTA: Failure Ontology for LLM Agents',
      journal: 'International Journal of Versatile Research and Analysis (IJVRA)',
      issue: 'May 2026',
      publishedOn: 'May 2026',
      impactFactor: 'N/A',
      paperId: 'FONTA',
      authors: 'Ketan Patil',
      pdfHref: 'https://github.com/ketpatil77',
      summary:
        'Defined a failure ontology for LLM agents to classify, measure, and reduce autonomous-agent breakdowns across controlled trials.',
      contributions: [
        'Organized 8 failure categories and 47 sub-types for structured LLM-agent evaluation.',
        'Validated ontology over 1,200 trials to study repeatable failure patterns in autonomous agents.',
        'Reported 70.8% reduction in AutoGPT failures through ontology-guided analysis and intervention.'
      ],
      metrics: ['8 failure categories', '47 sub-types', '1,200 trials', '70.8% AutoGPT failure reduction'],
      focusAreas: ['LLM Agents', 'Failure Analysis', 'Ontology Design', 'Benchmarking']
    }
  ],
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
  label: 'Delivery Proof',
  heading: 'Case studies, research outputs, and quantified delivery proof.',
  description:
    'A curated set of projects showing what was built, why it mattered, and what improved in production or research settings.',
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
  highlights: string[];
  metrics: string[];
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
    'Recruiter-friendly case studies showing role ownership, technical depth, measurable outcomes, and research-grade execution.',
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
        'Flask + Celery/Redis pipelines, Swiss Ephemeris mechanics, NumPy computation, geopy mapping, bilingual UI delivery, and Docker Compose deployment.',
      outcome: 'Rashi, Dasha, and transit-aware prediction workflows with health monitoring, async PDF/email delivery, and rate limiting.',
      highlights: [
        'Shipped bilingual English and Marathi prediction flows with transit-aware life-domain insights.',
        'Engineered async PDF generation and email pipelines with structured logging, health checks, and rate limiting.',
        'Designed the interface and services for multi-region, multi-language scale-out.'
      ],
      metrics: ['Sub-second insights', '5 req/min/IP', 'Bilingual output', 'Dockerized multi-service stack'],
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
      outcome: 'Highly interactive data visualisations with a real-time AI weather advisor and action-oriented recommendations.',
      highlights: [
        'Combined live weather data with Gemini-powered recommendations for clothing and productivity planning.',
        'Built the dashboard around high-clarity charts, fast interactions, and polished motion systems.',
        'Converted raw forecast data into readable decisions instead of generic weather summaries.'
      ],
      metrics: ['Gemini-powered insights', 'React 19 UI', 'Interactive visualizations', 'Actionable forecasts'],
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
        'Wake-word -> VAD -> speaker verification -> ASR -> intent execution with contextual memory, planning, and cross-platform service integration.',
      outcome: 'Deterministic natural-voice control for complex desktop workflows across Windows, macOS, and Linux.',
      highlights: [
        'Built a fully offline 5-stage voice pipeline for privacy-first desktop automation.',
        'Implemented ECAPA-TDNN speaker verification with <=1% false acceptance for secure OS-level commands.',
        'Integrated deployment flows for Windows Services, systemd, and launchd.'
      ],
      metrics: ['<2.5s median latency', '<=1% false acceptance', 'Offline-first', 'Cross-platform desktop'],
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
      outcome: 'Compliance-aware recommendation layer with multi-state scalability readiness and Maharashtra availability validation.',
      highlights: [
        'Built a validated remedies database spanning 25+ diseases, 50 crops, and 70+ approved products.',
        'Embedded withholding periods, regulatory flags, and availability constraints into recommendations.',
        'Authored 165+ pages of technical and end-user documentation for rollout readiness.'
      ],
      metrics: ['25+ diseases', '50 crops', '70+ approved products', 'INR 10K-30K projected savings'],
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
      outcome: 'Real-time interaction checks with 0-100 risk scoring and offline-capable containerized deployment.',
      highlights: [
        'Delivered 7 REST endpoints backed by a 100-medicine dataset spanning 30+ drug classes.',
        'Implemented a 50+ rule inference engine covering CYP450 metabolism, additive toxicity, and contraindications.',
        'Built a React frontend with real-time search and color-coded quantitative risk stratification.'
      ],
      metrics: ['7 REST endpoints', '100-medicine dataset', '50+ inference rules', '0-100 risk score'],
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
      outcome: '20-page assessment with prioritized fixes for 5+ critical vulnerabilities and OTP bypass remediation.',
      highlights: [
        'Discovered an OTP bypass through MITM and session-layer analysis during penetration testing.',
        'Validated and documented 5+ critical vulnerabilities with remediation-ready reporting.',
        'Delivered a prioritized security report that reduced overall attack surface by roughly 40%.'
      ],
      metrics: ['OTP bypass remediated', '5+ critical issues', '~40% attack-surface reduction', '20-page report'],
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
      outcome: 'Faster publishing workflow with smaller, consistent media assets and reduced manual optimization work.',
      highlights: [
        'Built deterministic batch-processing automation for high-volume media optimization.',
        'Optimized more than 500 images while preserving usable quality.',
        'Reduced repeated manual asset-prep work for publishing workflows.'
      ],
      metrics: ['500+ images', '~70% size reduction', 'Deterministic CLI flow', 'Batch automation'],
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
      outcome: 'High-volume certificate issuing with reduced human error, faster turnaround time, and CSV-driven repeatability.',
      highlights: [
        'Automated repetitive issuance tasks through validated CSV ingestion and template workflows.',
        'Reduced manual certificate generation effort by around 70%.',
        'Improved repeatability and lowered the risk of human-entry errors.'
      ],
      metrics: ['~70% effort reduction', 'CSV-driven workflow', 'Template automation', 'Lower human error'],
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
      outcome: 'Scalable dashboard foundation with optimized re-renders, audit visibility, and premium dark glassmorphism.',
      highlights: [
        'Built a motherboard-themed secure operations dashboard focused on logs, metrics, and audit surfaces.',
        'Used React 19, Next.js 16, and Tailwind CSS 4 for performance-conscious frontend delivery.',
        'Designed motion and theming to feel premium without sacrificing clarity.'
      ],
      metrics: ['Next.js 16', 'React 19', 'Tailwind CSS 4', 'Audit-focused UI'],
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
      outcome: 'Streamlined export service with multi-format support, XML/MathML handling, and asset compression.',
      highlights: [
        'Built specialized export automation for XML, MathML, and OMML-heavy document workflows.',
        'Used browser automation and DOM tooling to preserve high-fidelity mathematical content.',
        'Supported multi-format conversion with ZIP handling and asset compression.'
      ],
      metrics: ['XML / MathML / OMML', 'Browser automation', 'Multi-format export', 'Compression ready'],
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
      outcome: 'Functional multi-actor marketplace focusing on simplicity, accessibility, and low-connectivity performance.',
      highlights: [
        'Designed separate buyer, farmer, and middle-man dashboard flows on a static architecture.',
        'Used lightweight JSON-driven data handling to avoid database complexity.',
        'Optimized for straightforward access in low-connectivity usage contexts.'
      ],
      metrics: ['Static-site architecture', 'Multi-actor dashboards', 'No database dependency', 'Low-connectivity friendly'],
    },
  ],
  viewAllLabel: 'View All on GitHub',
  githubHref: 'https://github.com/ketanpatil',
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
  utilityLinks: primarySiteLinks,
  copyright: `© ${new Date().getFullYear()} Ketan Patil. All rights reserved.`,
  credit: 'Engineered with React, TypeScript, Tailwind CSS, and Framer Motion.',
};
