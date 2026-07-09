import { createMocks } from 'node-mocks-http';
import { POST } from '@/app/api/tutor/ask/route';

// Mock environment variable for GROQ API key to trigger fallback behavior
process.env.GROQ_API_KEY = '';

describe('Tutor Ask API - Scaffold Levels', () => {
  const baseBody = {
    question: 'Apa arti kata "dikarenakan"?',
    studentAnswer: 'karena',
    correctAnswer: 'karena',
    questionId: 'test-id',
    history: [],
  };

  test('SOCRATIC level returns Socratic prompt', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { ...baseBody, level: 'SOCRATIC' },
    });
    // @ts-ignore
    await POST(req);
    const json = JSON.parse(res._getData());
    expect(json.response).toContain('Socratic');
    expect(json.nextLevel).toBe('HINT');
  });

  test('HINT level returns hint prompt', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { ...baseBody, level: 'HINT' },
    });
    // @ts-ignore
    await POST(req);
    const json = JSON.parse(res._getData());
    expect(json.response).toContain('Petunjuk');
    expect(json.nextLevel).toBe('SOLUTION');
  });

  test('SOLUTION level returns full solution', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: { ...baseBody, level: 'SOLUTION' },
    });
    // @ts-ignore
    await POST(req);
    const json = JSON.parse(res._getData());
    expect(json.response).toContain('Penjelasan');
    expect(json.nextLevel).toBeNull();
  });
});

