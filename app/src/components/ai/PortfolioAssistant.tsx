import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Bot, Send } from 'lucide-react';
import { buildAssistantContext } from '@/lib/assistantContext';
import { answerPortfolioQuestion } from '@/lib/assistantBrain';
import { detectToolAction, executeToolAction } from '@/lib/assistantTools';
import { loadChatHistory, saveChatHistory } from '@/lib/idbChat';
import type { AssistantMessage } from '@/types/ai';

const MAX_MESSAGES = 30;

function createMessage(role: AssistantMessage['role'], content: string): AssistantMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: Date.now(),
  };
}

export function PortfolioAssistant() {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    createMessage('assistant', 'Hi. I am Ketan portfolio assistant. Ask any question in English about Ketan projects, certifications, skills, experience, or research.'),
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const context = useMemo(() => buildAssistantContext(), []);

  useEffect(() => {
    loadChatHistory().then((saved) => {
      if (saved.length > 0) setMessages(saved.slice(-MAX_MESSAGES));
    });
  }, []);

  useEffect(() => {
    void saveChatHistory(messages.slice(-MAX_MESSAGES));
  }, [messages]);

  const askAssistant = async (userMessage: string) => {
    const tool = detectToolAction(userMessage);
    executeToolAction(tool);
    setLoading(true);
    const localAnswer = answerPortfolioQuestion(userMessage);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, context }),
      });

      if (!res.ok || !res.body) throw new Error('No stream');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
      }
      const streamed = buffer.trim();
      const looksLikeEcho = streamed.toLowerCase().startsWith('assistant (dev stream):');
      const finalAnswer = !streamed || looksLikeEcho ? localAnswer : streamed;
      setMessages((prev) => [...prev, createMessage('assistant', finalAnswer)].slice(-MAX_MESSAGES));
    } catch {
      setMessages((prev) => [...prev, createMessage('assistant', localAnswer)].slice(-MAX_MESSAGES));
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setInput('');
    setMessages((prev) => [...prev, createMessage('user', trimmed)].slice(-MAX_MESSAGES));
    await askAssistant(trimmed);
  };

  return (
    <section className="glass-card flex h-[19rem] min-h-[19rem] flex-col overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--bg-surface)_96%,transparent),color-mix(in_srgb,var(--bg-elevated)_98%,transparent))] p-3 sm:h-[20rem] sm:min-h-[20rem] xl:h-[20.5rem] xl:min-h-[20.5rem]">
      <header className="mb-2.5 flex shrink-0 items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-[var(--cyan-full)]" />
          <h3 className="type-heading text-base text-[var(--text-100)]">AI Portfolio Assistant</h3>
        </div>
        <span className="text-[9px] font-mono uppercase tracking-wider text-[var(--text-400)]">SSE Ready</span>
      </header>

      <div
        className="mb-2 min-h-0 flex-1 overflow-y-auto rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] p-2.5 pr-1.5"
        aria-live="polite"
        style={{ overscrollBehavior: 'contain' }}
        onWheelCapture={(e) => e.stopPropagation()}
        onTouchMoveCapture={(e) => e.stopPropagation()}
      >
          <ul className="space-y-2 pr-1">
            {messages.map((msg) => (
              <li key={msg.id} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
                <span
                  className="inline-block max-w-[88%] rounded-lg px-2.5 py-1.5 text-[12px] leading-relaxed"
                style={{
                  background: msg.role === 'user' ? 'var(--cyan-trace)' : 'rgba(255,255,255,0.03)',
                  color: msg.role === 'user' ? 'var(--text-100)' : 'var(--text-200)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                {msg.content}
              </span>
            </li>
          ))}
          {loading && (
            <li className="text-left text-xs text-[var(--text-400)]">Assistant thinking...</li>
          )}
        </ul>
      </div>

      <form onSubmit={onSubmit} className="flex shrink-0 gap-2">
        <label htmlFor="assistant-input" className="sr-only">Ask AI assistant</label>
        <input
          id="assistant-input"
          className="input-surface min-w-0 flex-1"
          placeholder="Ask about projects, skills, or experience"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="btn-primary focus-ring min-h-[40px] px-3" aria-label="Send message">
          <Send className="h-4 w-4" />
        </button>
      </form>
    </section>
  );
}
