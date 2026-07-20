import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

// Exchanges the magic-link code for a session, then redirects home.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";
  const supabase = getSupabaseServer();
  if (code && supabase) {
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(`${origin}${next}`);
}
