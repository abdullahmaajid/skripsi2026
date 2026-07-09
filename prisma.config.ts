// Prisma 7 configuration — connection URLs go HERE, not in schema.prisma
// See: https://pris.ly/d/config-datasource
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    // Pooled connection (with pgbouncer) — used for runtime queries via PrismaClient
    url: process.env["DATABASE_URL"],
    // Direct connection (no pgbouncer) — used for prisma migrate deploy
    directUrl: process.env["DIRECT_URL"],
  },
});
