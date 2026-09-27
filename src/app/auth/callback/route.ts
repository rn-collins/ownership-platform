import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

// Only same-site paths ("/dashboard", "/dashboard/owned?x=1"). Rejects "//evil.com",
// "@evil.com", "\\evil.com" and absolute URLs, which would otherwise turn the
// magic-link flow into an open redirect.
function safeNext(next: string | null, origin: string): string {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.includes("\\")) return "/dashboard";
  const target = new URL(next, origin);
  return target.origin === origin ? target.pathname + target.search : "/dashboard";
}

// Exchanges the magic-link code for a session, then redirects home.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeNext(searchParams.get("next"), origin);
  const supabase = getSupabaseServer();
  if (code && supabase) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) return NextResponse.redirect(`${origin}/login?error=link`);
  }
  return NextResponse.redirect(`${origin}${next}`);
}
