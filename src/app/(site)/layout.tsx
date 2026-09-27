import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// Site chrome. Keep this free of request-time APIs (headers/cookies/auth) so
// public pages stay statically rendered. Pages render their own <main>, so the
// skip-link target is this wrapper div rather than a second <main>.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <div className="site-shell">
    <SiteHeader />
    <div className="wrap" id="main" tabIndex={-1}>{children}</div>
    <SiteFooter />
  </div>;
}
