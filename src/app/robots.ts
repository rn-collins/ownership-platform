import type { MetadataRoute } from "next";

const SITE_URL = "https://ownership-platform.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard",
        "/research/admin",
        "/research/observatory",
        "/observatory/guest/",
        "/observatory/resources",
        "/observatory/teaching",
        "/login",
        "/auth/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
