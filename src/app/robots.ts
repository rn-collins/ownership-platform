import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/site";

const SITE_URL = SITE_ORIGIN;

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
