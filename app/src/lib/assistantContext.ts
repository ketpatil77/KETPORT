import {
  experienceConfig,
  heroConfig,
  portfolioConfig,
  publicationsConfig,
  servicesConfig,
  techStackConfig,
} from '@/config';

export function buildAssistantContext(): string {
  const projectNames = portfolioConfig.projects.map((p) => p.title).join(', ');
  const topTech = techStackConfig.groups.flatMap((g) => g.items.slice(0, 3).map((i) => i.name)).join(', ');
  const experience = experienceConfig.items.map((x) => `${x.role} at ${x.company}`).join('; ');
  const services = servicesConfig.services.map((s) => s.title).join(', ');
  const publications = publicationsConfig.items.map((p) => p.title).join('; ');

  return [
    `Name: ${heroConfig.name}`,
    `Title: ${heroConfig.title}`,
    `Intro: ${heroConfig.intro}`,
    `Projects: ${projectNames}`,
    `Top technologies: ${topTech}`,
    `Experience: ${experience}`,
    `Services: ${services}`,
    `Publications: ${publications}`,
    'Rule: If unsure, explicitly say information is not available in portfolio data.',
  ].join('\n');
}
