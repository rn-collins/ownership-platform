import { readFileSync } from "node:fs";
import { isIsoDate, publicIds, reviewRenderFor, todayInHawaii } from "./src/lib/release-rule.mjs";

// Release gate (data/releases.json, rule in src/lib/release-rule.mjs). "Today" is fixed to the build day in Hawaii, and the
// list of public ids is worked out once here and inlined, so server pages, browser code and the middleware agree and no
// detail of a held piece reaches the browser. The daily release workflow rebuilds the site on each release day.
// RELEASE_BUILD_DATE (YYYY-MM-DD) may be set by hand to check a future build locally. Review renders never apply in production.
const releases = JSON.parse(readFileSync(new URL("./data/releases.json", import.meta.url), "utf8"));
const releaseBuildDate = isIsoDate(process.env.RELEASE_BUILD_DATE) ? process.env.RELEASE_BUILD_DATE : todayInHawaii();
const releaseReview = reviewRenderFor(process.env);
const releasedIds = publicIds(releases, releaseBuildDate, releaseReview);
// Tools: the /tools route files are named page.tools.tsx and layout.tools.tsx. They join the build only while at least one
// tool is public, so a held tool has no page, no route and no script in the build output.
const anyToolPublic = releases.pieces.some((p) => p.kind === "tool" && releasedIds.includes(p.id));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: { RELEASE_BUILD_DATE: releaseBuildDate, RELEASE_REVIEW_RENDER: releaseReview ? "1" : "0", RELEASED_IDS: releasedIds.join(",") },
  pageExtensions: ["tsx", "ts", "jsx", "js", ...(anyToolPublic ? ["tools.tsx"] : [])],
  poweredByHeader: false,
  async redirects() {
    // Browsers and crawlers request /favicon.ico regardless of <link rel="icon">.
    return [{ source: "/favicon.ico", destination: "/icon-v2.svg", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self' https://rn-selected-work.vercel.app https://rncollins.com https://www.rncollins.com" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
      {
        // The Observatory embed is meant to be iframed by partners/press.
        source: "/embed/:path*",
        headers: [{ key: "Content-Security-Policy", value: "frame-ancestors *" }],
      },
    ];
  },
};

export default nextConfig;
