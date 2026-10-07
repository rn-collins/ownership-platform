import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { NotFoundContent } from "@/components/NotFoundContent";

export const metadata: Metadata = { title: "Page not found | Institutions of One", robots: { index: false, follow: false } };

// Root-level 404 for URLs that match no route. It sits outside the (site) route group,
// so it renders the same header and footer chrome itself.
export default function NotFound() {
  return <div className="site-shell">
    <SiteHeader />
    <div className="wrap" id="main" tabIndex={-1}><NotFoundContent /></div>
    <SiteFooter />
  </div>;
}
