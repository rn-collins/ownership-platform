import { PROFILE_LINKS } from "@/lib/site";

// RN's public profiles. "list" is the full list on the Connect page (platform name and handle);
// "row" is the compact row in the site footer. Every link opens in a new tab, like the site's other outside links.
export function ProfileLinks({ variant }: { variant: "list" | "row" }) {
  if (variant === "row") {
    return <ul className="profile-row" aria-label="RN Collins on other platforms">
      {PROFILE_LINKS.map((p) => <li key={p.id}><a href={p.href} target="_blank" rel="noopener noreferrer">{p.platform}<span className="sr-only"> (opens in a new tab)</span></a></li>)}
    </ul>;
  }
  return <ul className="profile-list">
    {PROFILE_LINKS.map((p) => <li key={p.id}>
      <a href={p.href} target="_blank" rel="noopener noreferrer">
        <span className="profile-platform">{p.platform}</span>
        <span className="profile-handle">{p.handle}</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </li>)}
  </ul>;
}
