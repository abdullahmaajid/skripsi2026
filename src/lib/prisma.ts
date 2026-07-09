import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"

// ── Singleton pattern — safe for Next.js dev HMR & Vercel serverless ──
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // In production (Neon), DATABASE_URL already has ?pgbouncer=true
  // In development, it points to local postgres — both work the same way
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Keep connections alive in serverless — Neon handles pooling externally
    max: 1,
  })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  })
}

// Reuse the same client across hot-reloads in development
// In production (Vercel), each function invocation gets a fresh instance
export const prisma = global.__prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma
}
