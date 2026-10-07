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
