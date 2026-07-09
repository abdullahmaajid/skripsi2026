import { createMocks } from "node-mocks-http";
import { POST } from "../../src/app/api/tryout/start/route";
import { prisma } from "../../src/lib/prisma";
import { auth } from "../../src/auth";

jest.mock("../../src/lib/prisma", () => ({
  prisma: {
    examTemplate: {
      findUnique: jest.fn(),
    },
    chapter: { findMany: jest.fn() },
    question: { findMany: jest.fn() },
    examAttempt: { create: jest.fn() },
  },
}));

jest.mock("../../src/auth", () => ({ auth: jest.fn() }));

describe("POST /api/tryout/start", () => {
  it("returns 400 when templateId missing", async () => {
    const { req, res } = createMocks({ method: "POST", body: {} });
    await POST(req, res);
    expect(res.statusCode).toBe(400);
  });
});
