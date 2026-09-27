import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./launch-fixes.css";
import "./design-system.css";

const SITE_URL = "https://ownership-platform.vercel.app";
const TITLE = "Institutions of One — what people build, carry, control, and continue";
const DESC = "A research and editorial project examining what people build, what they can carry, what they control, and what work, systems, relationships, or authority could persist when an essential dependency changes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL), title: TITLE, description: DESC, applicationName: "Institutions of One", authors: [{ name: "RN Collins" }], keywords: ["Institutions of One", "Ownership Index", "Portfolio Professional", "independent creators", "portfolio careers", "RN Collins"],
  openGraph: { type: "website", siteName: "Institutions of One", title: TITLE, description: DESC, url: SITE_URL, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Institutions of One — what people build, carry, control, and continue" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/opengraph-image"] },
  icons: { icon: "/icon-v2.svg", shortcut: "/icon-v2.svg", apple: "/icon-v2.svg" },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = { themeColor: "#11100e" };

// Root layout stays free of request-time APIs (headers/cookies/auth) so every
// public page can be statically rendered and served from the CDN. Site chrome
// lives in (site)/layout.tsx; /embed/* gets its own chrome-less layout.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
