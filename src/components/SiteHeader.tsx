import { SiteNav } from "@/components/SiteNav";

// Skip link + site header. Server component with no request-time APIs, so it
// never opts a page out of static rendering; SiteNav (client) handles the
// mobile menu, aria-current and the signed-in AccountNav links.
export function SiteHeader() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a className="brand" href="/" aria-label="Institutions of One, home"><span className="brand-mark" aria-hidden="true">I/1</span><span className="brand-name">Institutions<br/>of One</span></a>
      <SiteNav />
    </header>
  </>;
}
