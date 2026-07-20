import { PrismaClient } from "@prisma/client";

// Prisma singleton against Supabase Postgres. Null when DATABASE_URL is unset,
// so the app builds and runs locally with no database configured.
const globalForPrisma = globalThis as unknown as { __prisma?: PrismaClient };

export const prisma: PrismaClient | null = process.env.DATABASE_URL
  ? (globalForPrisma.__prisma ?? (globalForPrisma.__prisma = new PrismaClient()))
  : null;
