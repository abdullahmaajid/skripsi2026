// Prisma 7 configuration
// NOTE: directUrl (for migrations) is passed via DIRECT_URL env var at CLI time,
// not configured here — the build only needs DATABASE_URL for runtime queries.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "npx tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
