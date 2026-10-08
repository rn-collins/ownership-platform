import { ProfileLinks } from "@/components/ProfileLinks";

const TITLE = "Connect with RN Collins | Institutions of One";
const DESC = "Find RN Collins on LinkedIn, Instagram, X, TikTok, Bluesky and YouTube, and subscribe to The Polymath newsletter.";
export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/contact" },
  openGraph: { title: TITLE, description: DESC, url: "/contact", images: ["/opengraph-image"] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/opengraph-image"] },
};

// The old contact form is gone (October 8, 2026). This route stays so links from the Hawaii and reader sites keep
// working. A ?from= parameter on those links is ignored.
export default function ConnectPage() {
  return <main className="partner-page partner-2 connect-page">
    <header className="partner-hero">
      <p className="eyebrow">Connect</p>
      <h1>Connect with RN Collins.</h1>
      <p className="lede partner-hook">Connect with me across my platforms. Find me wherever you already read and watch, or get The Polymath in your inbox.</p>
    </header>
    <section aria-labelledby="profiles-heading">
      <h2 id="profiles-heading" className="connect-h">Where to find me</h2>
      <ProfileLinks variant="list" />
      <p className="connect-dm">DMs are open on Instagram and LinkedIn.</p>
    </section>
  </main>;
}
