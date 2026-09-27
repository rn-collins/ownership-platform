import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server-side Supabase client (App Router). Returns null when Supabase env is
// unset, so pages/routes render and the app builds without auth configured.
export function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const cookieStore = cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // called from a Server Component — safe to ignore; middleware refreshes the session
        }
      },
    },
  });
}

export async function getUser() {
  const supabase = getSupabaseServer();
  if (!supabase) return null;
  // Bounded like the middleware refresh: an auth outage reads as "signed out"
  // (protected pages redirect to sign-in) instead of hanging the render.
  try {
    const result = await Promise.race([
      supabase.auth.getUser(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000)),
    ]);
    return result?.data.user ?? null;
  } catch {
    return null;
  }
}
