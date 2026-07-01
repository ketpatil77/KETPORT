import {
  credentialsConfig,
  experienceConfig,
  heroConfig,
  portfolioConfig,
  publicationsConfig,
  servicesConfig,
  techStackConfig,
} from '@/config';

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const dp = Array.from({ length: a.length + 1 }, () => Array<number>(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;
  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost,
      );
    }
  }
  return dp[a.length][b.length];
}

function listTopProjects(): string {
  return portfolioConfig.projects
    .slice(0, 4)
    .map((p) => `${p.title} (${p.year})`)
    .join(', ');
}

function listCertifications(): string {
  return credentialsConfig.certifications
    .map((c) => `${c.name} - ${c.issuer} (${c.year})`)
    .join('; ');
}

function listExperience(): string {
  return experienceConfig.items
    .map((item) => `${item.role} at ${item.company} (${item.duration})`)
    .join('; ');
}

function listPublications(): string {
  return publicationsConfig.items
    .map((p) => `${p.title} (${p.publishedOn}, ${p.journal})`)
    .join('; ');
}

function listSkills(): string {
  const grouped = techStackConfig.groups.flatMap((g) => g.items.map((i) => i.name));
  return grouped.slice(0, 16).join(', ');
}

function includesAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function isGreeting(normalized: string): boolean {
  return ['hi', 'hello', 'hey', 'good morning', 'good evening', 'good afternoon'].some((greet) => normalized === greet || normalized.startsWith(`${greet} `));
}

function findProjectByName(normalized: string) {
  const cleanQuery = normalizeText(normalized);
  const queryTokens = cleanQuery.split(' ').filter(Boolean);

  for (const project of portfolioConfig.projects) {
    const cleanTitle = normalizeText(project.title);
    if (cleanQuery.includes(cleanTitle) || cleanTitle.includes(cleanQuery)) return project;
    if (queryTokens.some((token) => token.length >= 4 && cleanTitle.includes(token))) return project;
    if (levenshtein(cleanQuery.replace(/\s+/g, ''), cleanTitle.replace(/\s+/g, '')) <= 3) return project;
  }
  return undefined;
}

function oneLineSummary(): string {
  return `${heroConfig.name} is ${heroConfig.title} who builds production AI/ML systems, full-stack products, and security tooling, backed by internships and three peer-reviewed publications.`;
}

function shortProfileSummary(): string {
  return `${oneLineSummary()} He is a B.Tech Computer Technology student at DBATU, graduating in 2027, with internships at Meta, Sophos, and the Government of India.`;
}

function recruiterPitch(): string {
  return `${heroConfig.name} combines AI/ML delivery, full-stack engineering, and cybersecurity execution with research depth, internships at Meta, Sophos, and DPIIT, plus measurable project outcomes across production systems.`;
}

function listEducation(): string {
  return credentialsConfig.education
    .map((item) => `${item.degree} at ${item.institution} (${item.duration})`)
    .join('; ');
}

function answerByIntent(normalized: string): string | undefined {
  if (includesAny(normalized, ['one line', 'one-liner', 'one liner', 'single line', 'summarize', 'summary', 'bio', 'about him', 'about ketan', 'introduce', 'who is ketan', 'who is he'])) {
    return includesAny(normalized, ['one line', 'one-liner', 'one liner', 'single line'])
      ? oneLineSummary()
      : shortProfileSummary();
  }

  if (includesAny(normalized, ['why hire', 'why should', 'strength', 'strong point', 'best at', 'specialize', 'specialise', 'what makes', 'value'])) {
    return recruiterPitch();
  }

  if (includesAny(normalized, ['education', 'study', 'college', 'degree', 'university', 'dbatu', 'academic'])) {
    return `Ketan education: ${listEducation()}.`;
  }

  if (includesAny(normalized, ['available', 'availability', 'open to work', 'open for', 'hiring', 'remote'])) {
    return `${heroConfig.name} is ${heroConfig.availability}. Location: ${heroConfig.location}.`;
  }

  if (includesAny(normalized, ['contact', 'email', 'phone', 'location', 'reach'])) {
    return `Location: ${heroConfig.location}. Email: ket.patil77@gmail.com. Phone: +91-7796895767.`;
  }

  if (includesAny(normalized, ['project', 'build', 'made', 'portfolio', 'case study'])) {
    return `Top Ketan projects: ${listTopProjects()}. Ask project name for detailed answer.`;
  }

  if (includesAny(normalized, ['certification', 'certificate', 'certified'])) {
    return `Ketan certifications: ${listCertifications()}.`;
  }

  if (includesAny(normalized, ['experience', 'internship', 'worked', 'work history', 'career'])) {
    return `Ketan experience: ${listExperience()}.`;
  }

  if (includesAny(normalized, ['research', 'publication', 'paper', 'journal'])) {
    return `Ketan research publications: ${listPublications()}.`;
  }

  if (includesAny(normalized, ['skill', 'tech', 'stack', 'tools', 'technology'])) {
    return `Ketan core skills: ${listSkills()}.`;
  }

  if (normalized.includes('service')) {
    const services = servicesConfig.services.map((s) => s.title).join(', ');
    return `Ketan service strengths: ${services}.`;
  }

  if (includesAny(normalized, ['when', 'timeline', 'year', 'latest'])) {
    return 'Recent timeline: Projects mainly in 2026; certifications from 2024 to Nov 2025; publications in March 2026, April 2026, and May 2026.';
  }

  if (includesAny(normalized, ['help', 'what can you answer', 'what can you do'])) {
    return 'I can answer about Ketan profile, projects, certifications, skills, experience, education, publications, contact details, and availability.';
  }

  return undefined;
}

export function answerPortfolioQuestion(message: string): string {
  const normalized = normalizeText(message);
  if (!normalized) return 'Please ask a question about Ketan Patil in English.';
  if (isGreeting(normalized)) {
    return 'Hi! I am here to help. You can ask me anything about Ketan Patil, and I will guide you with projects, certifications, skills, experience, and research details.';
  }

  const exactProject = findProjectByName(normalized);
  if (exactProject) {
    return `${exactProject.title}: ${exactProject.summary} Role: ${exactProject.role}. Outcome: ${exactProject.outcome} Tech: ${exactProject.tech.slice(0, 8).join(', ')}.`;
  }

  const intentAnswer = answerByIntent(normalized);
  if (intentAnswer) return intentAnswer;

  return `${shortProfileSummary()} If you want depth, ask about project name, certifications, skills, experience, education, or publications.`;
}
