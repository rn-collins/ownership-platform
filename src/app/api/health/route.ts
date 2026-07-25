import { NextResponse } from "next/server";
import { beehiivConfigured } from "@/lib/beehiiv";

// Which backends are wired, at a glance. No secrets returned — only booleans —
// so it's safe to hit publicly. Turns "is it configured?" into a URL.
export async function GET() {
  return NextResponse.json({
    ok: true,
    time: new Date().toISOString(),
    integrations: {
      database: Boolean(process.env.DATABASE_URL),
      supabaseAuth: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      ratelimit: Boolean(process.env.UPSTASH_REDIS_REST_URL),
      email: Boolean(process.env.RESEND_API_KEY),
      beehiiv: beehiivConfigured(),
    },
  });
}
