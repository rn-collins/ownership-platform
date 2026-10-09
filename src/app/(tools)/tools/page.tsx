import "./hub.css";
import type { Metadata } from "next";
import hub from "@/lib/tools/hub.json";
import { tools } from "@/lib/tools/registry";
import type { ToolSpec } from "@/components/tools/_kit/types.d.mts";

const TITLE = `${hub.title} | Institutions of One`;
const DESC = hub.lede;

// The hub stays noindex until RN moves a tool to public.
export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: "/tools" },
  robots: { index: false, follow: false },
  openGraph: { type: "website", siteName: "Institutions of One", title: TITLE, description: DESC, url: "/tools", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Institutions of One: what people build, carry, control, and continue" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC, images: ["/opengraph-image"] },
};

type HubImage = (typeof hub.items)[number]["image"];

function Card({ spec, slug, image, theme, level }: { spec: ToolSpec; slug: string; image: HubImage; theme?: string; level: "h2" | "h3" }) {
  const Heading = level;
  return <li className="tkh-card">
    <figure>
      <img src={image.file} alt={image.alt} width={image.width} height={image.height} decoding="async" />
      <figcaption>
        Illustrative photo. Photo: {image.creator}, <a href={image.licenceUrl} rel="noopener">{image.licence}</a>, via <a href={image.sourcePage} rel="noopener" aria-label={`Wikimedia Commons, photo page for the picture by ${image.creator}`}>Wikimedia Commons</a>.
      </figcaption>
    </figure>
    <div className="tkh-body">
      {theme ? <span className="tkh-theme">{theme}</span> : null}
      <Heading><a href={`/tools/${slug}`}>{spec.title}</a></Heading>
      <p>{spec.question}</p>
      <p className="tkh-meta">{spec.promise.minutes} {spec.promise.minutes === 1 ? "minute" : "minutes"} · You leave with: {spec.promise.leaveWith}</p>
    </div>
  </li>;
}

export default function ToolsHub() {
  const themes = hub.themes as Record<string, string>;
  const sections = hub.pageSections;
  return <div className="tk" data-program="IOO">
    <div className="tk-keyline" />
    <nav className="tk-wrap" aria-label="Breadcrumb"><p className="tk-crumbs"><a href="/">Institutions of One</a> › Tools</p></nav>
    <main id="tk-main" className="tk-main" tabIndex={-1}>
      <header className="tk-head"><div className="tk-wrap">
        <p><span className="tk-plate">TOOLS</span><span className="tk-plate chip">IOO</span></p>
        <h1>{hub.title}</h1>
        <p className="tk-lede">{hub.lede}</p>
        <p className="tk-by">By RN Collins</p>
      </div></header>
      <div className="tk-wrap">
        <p className="tkh-note" role="note">{hub.previewNote}</p>
        <section aria-labelledby="tkh-tools-h">
          <h2 id="tkh-tools-h" className="tk-sr">The tools</h2>
          <ul className="tkh-cards">
            {hub.items.map((item) => {
              const tool = tools.find((t) => t.id === item.id)!;
              return <Card key={item.id} spec={tool.spec} slug={tool.slug} image={item.image} theme={themes[item.theme]} level="h3" />;
            })}
          </ul>
        </section>
        <section className="tkh-section tkh-foot" aria-labelledby="tkh-sections-h">
          <h2 id="tkh-sections-h">{sections.heading}</h2>
          <p>{sections.note}</p>
          <ul className="tkh-cards">
            {sections.items.map((item) => {
              const tool = tools.find((t) => t.id === item.id)!;
              return <Card key={item.id} spec={tool.spec} slug={tool.slug} image={item.image} level="h3" />;
            })}
          </ul>
        </section>
      </div>
    </main>
  </div>;
}
