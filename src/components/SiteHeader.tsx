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
    {/* Without JavaScript the Menu button cannot open the panel, so show the links in the page (MAIN-022). */}
    <noscript><style>{`.nav-toggle{display:none!important}@media(max-width:1023.98px){.site-header{height:auto!important;flex-wrap:wrap;padding-block:12px}.site-header .nav{display:flex!important;position:static!important;flex-basis:100%;padding:0 0 8px!important;border-bottom:0!important}}`}</style></noscript>
  </>;
}
