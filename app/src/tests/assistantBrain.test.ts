import { describe, expect, it } from 'vitest';
import { answerPortfolioQuestion } from '@/lib/assistantBrain';

describe('answerPortfolioQuestion', () => {
  it('returns real one-line summary for obvious intro prompt', () => {
    const answer = answerPortfolioQuestion('Summarize Ketan in one line');

    expect(answer).toContain('Ketan Patil');
    expect(answer).toContain('AI/ML Engineer');
    expect(answer).not.toContain('Interesting question');
  });

  it('answers recruiter-style value prompt without generic fallback', () => {
    const answer = answerPortfolioQuestion('Why should someone hire him?');

    expect(answer).toContain('Meta');
    expect(answer).toContain('Sophos');
    expect(answer).not.toContain('Happy to help');
  });

  it('still resolves exact project questions with project detail', () => {
    const answer = answerPortfolioQuestion('Tell me about NAKSHATRAA');

    expect(answer).toContain('NAKSHATRAA');
    expect(answer).toContain('Role:');
    expect(answer).toContain('Tech:');
  });
});
