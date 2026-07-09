/**
 * Mock Prisma client used only in the Jest test environment.
 * The real client requires a live PostgreSQL connection which is not
 * available during unit tests. Providing an empty object satisfies the
 * import statements used in the test suites.
 */
const mockSubjectScore = {
  findMany: jest.fn().mockResolvedValue([]),
};

const mockSubject = {
  findMany: jest.fn().mockResolvedValue([]),
};

const mockUser = {
  count: jest.fn().mockResolvedValue(0),
  findUnique: jest.fn().mockResolvedValue({ role: 'ADMIN' }),
  groupBy: jest.fn().mockResolvedValue([]),
};

const mockExamAttempt = {
  aggregate: jest.fn().mockResolvedValue({ _avg: { scaledScore: null } }),
  count: jest.fn().mockResolvedValue(0),
  findMany: jest.fn().mockResolvedValue([]),
};

const mockQuestionResponse = {
  groupBy: jest.fn().mockResolvedValue([]),
};

const mockTutoringSession = {
  groupBy: jest.fn().mockResolvedValue([]),
};

export const prisma = {
  subjectScore: mockSubjectScore,
  subject: mockSubject,
  user: mockUser,
  examAttempt: mockExamAttempt,
  questionResponse: mockQuestionResponse,
  tutoringSession: mockTutoringSession,
} as any;

