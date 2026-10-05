import type { Metadata } from "next";
import { NotFoundContent } from "@/components/NotFoundContent";

export const metadata: Metadata = { title: "Page not found — Institutions of One", robots: { index: false, follow: false } };

// notFound() inside any site route (unknown edition, case, or creator slug) renders here,
// inside the site layout's header and footer.
export default function SiteNotFound() {
  return <NotFoundContent />;
}
