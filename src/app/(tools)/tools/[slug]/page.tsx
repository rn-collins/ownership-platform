import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { filterApproved } from "@/components/tools/_kit/core/approved.mjs";
import type { ToolSpec } from "@/components/tools/_kit/types.d.mts";
import { bySlug, tools } from "@/lib/tools/registry";
import { relatedFor } from "@/lib/tools/related";
import { toolJsonLd, toolMetadata } from "@/lib/tools/seo";

export const dynamicParams = false;
export const generateStaticParams = () => tools.map(({ slug }) => ({ slug }));

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const tool = bySlug(params.slug);
  return tool ? toolMetadata(tool.spec, `/tools/${tool.slug}`) : {};
}

const crumbs = [{ label: "Institutions of One", href: "/" }, { label: "Tools", href: "/tools" }];

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = bySlug(params.slug);
  if (!tool) notFound();
  // Only approved content ever reaches the browser: held items are removed here, on the server.
  const spec = filterApproved(tool.spec) as unknown as ToolSpec;
  const { Tool } = tool;
  // The kit's shell brings its own header and footer. Inside an article they are not page-level banner and footer landmarks,
  // so a screen reader finds one banner and one footer (the site's), one main (the tool's) and the navigation regions.
  return <article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd(spec, `/tools/${tool.slug}`)).replace(/</g, "\\u003c") }} />
    <Tool spec={spec} related={relatedFor(tool.id)} crumbs={crumbs} siteLinks={{ about: "/about" }} />
  </article>;
}
