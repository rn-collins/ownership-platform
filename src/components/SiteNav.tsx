"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AccountNav } from "@/components/AccountNav";
import { POLYMATH_SUBSCRIBE_URL, SHARED_NAV } from "@/lib/site";

// Primary site navigation. Links and order come from SHARED_NAV (src/lib/site.ts), the same labels
// the Public Reader uses (DEC-02, interim step B).
// Client-only concerns (active link, mobile panel) live here so the (site) layout itself stays static.
function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Close the panel whenever the route changes.
  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(true); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav
        id="site-nav"
        className="nav"
        aria-label="Primary"
        data-open={open ? "true" : "false"}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) close();
        }}
      >
        {SHARED_NAV.map((link) => "external" in link && link.external ? (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}<span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <a key={link.label} href={link.href} aria-current={isActive(pathname, link.href) ? "page" : undefined}>
            {link.label}
          </a>
        ))}
        <a className="nav-cta" href={POLYMATH_SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer">
          Get the newsletter<span className="sr-only"> (opens in a new tab)</span>
        </a>
        <AccountNav />
      </nav>
    </>
  );
}
