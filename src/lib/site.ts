// One place for the public addresses and shared outbound links, so a later change of domain
// is a one-line edit (DEC-04: the vercel.app addresses stay for now; nothing here changes an address).

/** This site. The official address of every edition (DEC-03). */
export const SITE_ORIGIN = "https://ownership-platform.vercel.app";

/** The Public Reader: visual stories, tools and the Source Desk. */
export const READER_ORIGIN = "https://institutions-of-one-reader.vercel.app";
export const readerUrl = (path = "") => `${READER_ORIGIN}${path}`;

/** The Polymath on Beehiiv. The subscribe link opens Beehiiv's own sign-up (DEC-07). */
export const POLYMATH_URL = "https://polymath-rn-collins.beehiiv.com";
export const POLYMATH_SUBSCRIBE_URL = `${POLYMATH_URL}/subscribe`;

export const LINKEDIN_URL = "https://www.linkedin.com/in/rn-collins";

/** RN Collins' portfolio, shown as a plain link in the footer and under source lists (October 10, 2026). */
export const PORTFOLIO_URL = "https://rn-selected-work.vercel.app";
export const PORTFOLIO_LABEL = "RN Collins, selected work";

/**
 * RN's public profiles, in the order shown on the Connect page (/contact) and in the site footer.
 * Only handles RN has given are listed (no Threads or Pinterest yet).
 */
export const PROFILE_LINKS = [
  { id: "linkedin", platform: "LinkedIn", handle: "RN Collins", href: LINKEDIN_URL },
  { id: "instagram", platform: "Instagram", handle: "@rn_collins", href: "https://www.instagram.com/rn_collins/" },
  { id: "x", platform: "X", handle: "@renaissancex2m3", href: "https://x.com/renaissancex2m3" },
  { id: "tiktok", platform: "TikTok", handle: "@renaissancex2m3", href: "https://www.tiktok.com/@renaissancex2m3" },
  { id: "bluesky", platform: "Bluesky", handle: "@rncollins.bsky.social", href: "https://bsky.app/profile/rncollins.bsky.social" },
  { id: "youtube", platform: "YouTube", handle: "@Renaissance-Woman-3000", href: "https://www.youtube.com/@Renaissance-Woman-3000" },
  { id: "polymath", platform: "The Polymath", handle: "Newsletter", href: POLYMATH_SUBSCRIBE_URL },
] as const;

/**
 * Header and footer links shared in wording and order by the main site and the Public Reader
 * (DEC-02, interim step B). Each entry names where it goes on this site; the reader repo uses the
 * same labels. Labels follow the plain-English navigation proposed in the October 7 audit.
 */
export const SHARED_NAV = [
  { label: "Read", href: "/edit" },
  { label: "Visual stories", href: readerUrl("/production/cycle-01"), external: true },
  { label: "Cases", href: "/observatory" },
  { label: "Tools", href: readerUrl("/experiences"), external: true },
  { label: "Sources", href: readerUrl("/resources"), external: true },
  { label: "Work with RN", href: "/partner" },
] as const;
