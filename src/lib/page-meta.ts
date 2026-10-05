import type { Metadata } from "next";

// Next.js replaces (does not deep-merge) a route's openGraph/twitter objects,
// so a page that sets only title/description would still share the root
// layout's site-wide social title. withSocial() copies the page's own title and
// description into openGraph and twitter so link previews match the page.
export function withSocial(meta: Metadata & { title: string; description: string }, path: string): Metadata {
  const { title, description } = meta;
  return {
    ...meta,
    openGraph: { title, description, url: path, images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
  };
}
