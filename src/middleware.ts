import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Subdomains that are the app itself, never a creator tenant.
const RESERVED = new Set(["www", "app", "api", "admin", "dashboard", "auth", "assets", "cdn", "mail"]);

// Hostname-based multi-tenancy (OWNED v2.0).
// If the request arrives on <handle>.<OWNED_ROOT_DOMAIN>, rewrite internally to
// that creator's page (/u/<handle>) while the creator's own address stays in the
// bar. Inert until OWNED_ROOT_DOMAIN is set, so nothing changes before the brand
// domain is live. Pure string parsing — safe on the edge runtime (no DB here).
function tenantRewrite(req: NextRequest): NextResponse | null {
  const root = process.env.OWNED_ROOT_DOMAIN; // e.g. "ownedby.co"
  if (!root) return null;
  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();
  if (host === root || host === `www.${root}`) return null;
  if (!host.endsWith(`.${root}`)) return null; // main app domains, localhost, previews
  const sub = host.slice(0, -1 * (root.length + 1)); // strip ".root"
  if (!sub || sub.includes(".") || RESERVED.has(sub)) return null;

  const url = req.nextUrl.clone();
  if (url.pathname.startsWith("/u/") || url.pathname.startsWith("/_next") || url.pathname.startsWith("/api")) {
    return null; // don't double-rewrite internal/asset paths
  }
  url.pathname = `/u/${sub}${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}

export async function middleware(req: NextRequest) {
  // Tenant hosts render a public page; short-circuit before session refresh.
  const rewrite = tenantRewrite(req);
  if (rewrite) return rewrite;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const res = NextResponse.next({ request: req });
  if (!url || !key) return res;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return req.cookies.getAll();
      },
      setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          req.cookies.set(name, value);
          res.cookies.set(name, value, options);
        });
      },
    },
  });
  await supabase.auth.getUser();
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
