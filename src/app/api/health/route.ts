import { NextResponse } from "next/server";
import { beehiivConfigured } from "@/lib/beehiiv";
import { requireResearcher } from "@/lib/researcher-auth";

export const dynamic = "force-dynamic";

// Public callers get only a liveness answer. Which backends are wired (database, rate limit,
// email, Beehiiv) is shown to a signed-in researcher only, because a public list of what is
// missing is a map for abuse (MAIN-003). Booleans only, never secret values.
export async function GET() {
  const base = { ok: true, time: new Date().toISOString() };
  const researcher = await requireResearcher();
  if (!researcher) return NextResponse.json(base);
  return NextResponse.json({
    ...base,
    integrations: {
      database: Boolean(process.env.DATABASE_URL),
      supabaseAuth: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      ratelimit: Boolean((process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) && (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN)),
      email: Boolean(process.env.RESEND_API_KEY),
      beehiiv: beehiivConfigured(),
    },
  });
}
