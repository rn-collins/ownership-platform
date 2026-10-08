import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import type { ToolSpec } from "@/components/tools/_kit/types.d.mts";
import { SITE_ORIGIN } from "@/lib/site";

const SITE_NAME = "Institutions of One";
const DEFAULT_OG = { url: "/opengraph-image", width: 1200, height: 630, alt: "Institutions of One: what people build, carry, control, and continue" };

/**
 * The tool's own card (spec.og.image, 1200 by 630) when the file exists in public/; otherwise the site-wide card, so no page
 * ever points at a missing image. No tool card has been drawn yet, because the kit has no card renderer.
 */
function ogImage(spec: ToolSpec) {
  const file = path.join(process.cwd(), "public", spec.og.image);
  return fs.existsSync(file) ? { url: spec.og.image, width: 1200, height: 630, alt: spec.og.alt } : DEFAULT_OG;
}

/** Tools whose release is not "public" are noindex, so search engines leave them alone until RN flips them. */
export function toolMetadata(spec: ToolSpec, path_: string): Metadata {
  const title = `${spec.title} | ${SITE_NAME}`;
  const image = ogImage(spec);
  return {
    title,
    description: spec.question,
    alternates: { canonical: path_ },
    ...(spec.release === "public" ? {} : { robots: { index: false, follow: false } }),
    openGraph: { type: "website", siteName: SITE_NAME, title, description: spec.question, url: path_, images: [image] },
    twitter: { card: "summary_large_image", title, description: spec.question, images: [image.url] },
  };
}

/** JSON-LD for a tool page (design section 4.3). The author is the name only, with no credential text. */
export function toolJsonLd(spec: ToolSpec, path_: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: spec.title,
    description: spec.question,
    url: `${SITE_ORIGIN}${path_}`,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    author: { "@type": "Person", name: "RN Collins" },
    isBasedOn: `${SITE_ORIGIN}${spec.origin.path}`,
    inLanguage: "en",
  };
}
