import type { MetadataRoute } from "next";
import { SEED, nodeSlug } from "@/lib/observatory_seed";
import { publicEditions } from "@/lib/edit-cycle-one";

const SITE_URL = "https://ownership-platform.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicRoutes = [
    "", "/methodology", "/methodology/candidates", "/methodology/pilot", "/findings", "/observatory/findings", "/observatory/timeline", "/assess", "/assess/creator", "/assess/professional", "/observatory", "/observatory/apply", "/observatory/dependencies", "/observatory/countercases", "/observatory/evidence", "/observatory/documentation", "/edit", ...publicEditions().map(({ number }) => `/edit/${number}`), "/partner", "/about", "/research/cognitive-interviews", "/privacy",
  ];
  return [
    ...publicRoutes.map((path) => ({ url: `${SITE_URL}${path}`, changeFrequency: path === "" || path.startsWith("/edit") ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : path === "/observatory" || path === "/edit" ? 0.9 : 0.7 })),
    ...SEED.map((person) => ({ url: `${SITE_URL}/observatory/${nodeSlug(person.name)}`, changeFrequency: "monthly" as const, priority: 0.6 })),
  ];
}
