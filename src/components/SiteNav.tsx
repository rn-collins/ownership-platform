"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AccountNav } from "@/components/AccountNav";

// Primary site navigation. Client-only concerns (active link, mobile panel)
// live here so the (site) layout itself stays static.
const NAV_LINKS: ReadonlyArray<{ href: string; label: string }> = [
  { href: "/methodology", label: "Method" },
  { href: "/observatory", label: "Cases" },
  { href: "/assess", label: "Assessment" },
  { href: "/edit", label: "Editions" },
  { href: "/partner", label: "Work with RN" },
];

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
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} aria-current={isActive(pathname, link.href) ? "page" : undefined}>
            {link.label}
          </a>
        ))}
        <AccountNav />
      </nav>
    </>
  );
}
