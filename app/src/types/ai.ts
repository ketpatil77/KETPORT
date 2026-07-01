export type AssistantRole = 'user' | 'assistant' | 'system';

export interface AssistantMessage {
  id: string;
  role: AssistantRole;
  content: string;
  timestamp: number;
}

export interface AssistantToolAction {
  action:
    | 'show_projects'
    | 'show_skills'
    | 'show_experience'
    | 'show_research'
    | 'scroll_to_section'
    | 'filter_by_technology'
    | 'highlight_project'
    | 'none';
  payload?: Record<string, string>;
}

export interface AssistantChunkEvent {
  type: 'chunk' | 'done' | 'tool';
  content?: string;
  tool?: AssistantToolAction;
}
