import "@/components/tools/_kit/css/kit.css";
import "@/components/tools/ed001-map/tool.css";
import "@/components/tools/framework-strip/strip.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

// Chrome for the /tools pages: the same header and footer as the rest of the site, without the (site) layout's padded wrapper,
// because the tools bring their own page width. The wrapper div is the target of the header's skip link.
// The small script sets the "scripting is on" flag before the first paint, so controls that need scripting do not flash.
export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <div className="site-shell">
    <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('tk-js')" }} />
    <SiteHeader />
    <div id="main" tabIndex={-1}>{children}</div>
    <SiteFooter />
  </div>;
}
