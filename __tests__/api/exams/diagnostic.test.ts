import { createMocks } from "node-mocks-http";
import { POST } from "../../src/app/api/exams/diagnostic/route";
import { prisma } from "../../src/lib/prisma";
import { auth } from "../../src/auth";

jest.mock("../../src/lib/prisma", () => ({
  prisma: {
    examAttempt: { findFirst: jest.fn() },
    examTemplate: { findFirst: jest.fn(), create: jest.fn() },
    subject: { findMany: jest.fn() },
  },
}));

jest.mock("../../src/auth", () => ({ auth: jest.fn() }));

describe("POST /api/exams/diagnostic", () => {
  it("returns 401 when not authenticated", async () => {
    const { req, res } = createMocks({ method: "POST" });
    auth.mockResolvedValue({ user: null });
    await POST(req as any, res as any);
    expect(res.statusCode).toBe(401);
  });
});
