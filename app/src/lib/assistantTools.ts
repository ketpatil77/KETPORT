import type { AssistantToolAction } from '@/types/ai';
import { portfolioConfig } from '@/config';

export function detectToolAction(message: string): AssistantToolAction {
  const normalized = message.toLowerCase();
  if (normalized.includes('project')) return { action: 'show_projects' };
  if (normalized.includes('skill') || normalized.includes('stack')) return { action: 'show_skills' };
  if (normalized.includes('experience')) return { action: 'show_experience' };
  if (normalized.includes('research') || normalized.includes('publication')) return { action: 'show_research' };

  if (normalized.includes('scroll')) {
    if (normalized.includes('portfolio')) return { action: 'scroll_to_section', payload: { id: 'portfolio' } };
    if (normalized.includes('tech')) return { action: 'scroll_to_section', payload: { id: 'tech-stack' } };
    if (normalized.includes('experience')) return { action: 'scroll_to_section', payload: { id: 'experience' } };
  }

  const matchedProject = portfolioConfig.projects.find((project) =>
    normalized.includes(project.title.toLowerCase()),
  );
  if (matchedProject) {
    return { action: 'highlight_project', payload: { project: matchedProject.title } };
  }

  return { action: 'none' };
}

export function executeToolAction(action: AssistantToolAction): void {
  if (action.action === 'scroll_to_section') {
    const id = action.payload?.id;
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
