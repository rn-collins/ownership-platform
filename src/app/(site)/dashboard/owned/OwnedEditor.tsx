"use client";

import { useMemo, useState } from "react";
import { fusionSummary } from "@/lib/owned";

export interface OwnedLinkForm { label: string; url: string; kind: string; owned: boolean; }
export interface OwnedInitial {
  slug: string; headline: string; bio: string; customDomain: string;
  emailCapture: boolean; published: boolean; links: OwnedLinkForm[];
}

const KINDS = ["link", "newsletter", "membership", "shop", "social"];
const OWNED_KINDS = new Set(["newsletter", "membership", "shop"]);

export function OwnedEditor({ initial, dbReady }: { initial: OwnedInitial; dbReady: boolean }) {
  const [slug, setSlug] = useState(initial.slug);
  const [headline, setHeadline] = useState(initial.headline);
  const [bio, setBio] = useState(initial.bio);
  const [customDomain, setCustomDomain] = useState(initial.customDomain);
  const [emailCapture, setEmailCapture] = useState(initial.emailCapture);
  const [published, setPublished] = useState(initial.published);
  const [links, setLinks] = useState<OwnedLinkForm[]>(initial.links);
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error" | "taken">("idle");
  const [savedSlug, setSavedSlug] = useState<string | null>(initial.published ? initial.slug : null);

  const dims = useMemo(
    () => fusionSummary({ published: true, customDomain, emailCapture, links: links.map((l) => ({ kind: l.kind, owned: l.owned, url: l.url })) }),
    [customDomain, emailCapture, links],
  );

  function addLink() { setLinks((ls) => [...ls, { label: "", url: "", kind: "link", owned: false }]); }
  function updateLink(i: number, patch: Partial<OwnedLinkForm>) {
    setLinks((ls) => ls.map((l, j) => {
      if (j !== i) return l;
      const next = { ...l, ...patch };
      if (patch.kind !== undefined) next.owned = OWNED_KINDS.has(patch.kind);
      return next;
    }));
  }
  function removeLink(i: number) { setLinks((ls) => ls.filter((_, j) => j !== i)); }

  async function save(pub: boolean) {
    setState("saving");
    const res = await fetch("/api/owned/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, headline, bio, customDomain, emailCapture, published: pub, links }),
    }).catch(() => null);
    if (!res) { setState("error"); return; }
    if (res.status === 409) { setState("taken"); return; }
    if (!res.ok) { setState("error"); return; }
    const data = await res.json();
    setPublished(pub);
    setSavedSlug(pub ? (data.slug ?? slug) : null);
    setState("saved");
  }

  const slugOk = /^[a-z0-9-]{3,40}$/.test(slug);

  return (
    <div className="ownededit">
      {!dbReady && <p className="disc">Database isn&apos;t configured in this environment, so saving is disabled. Everything below still previews.</p>}

      <label className="fld"><span>Your handle</span>
        <div className="slugrow"><span className="slugpre">/u/</span>
          <input className="opentext" value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase())} placeholder="yourname" />
        </div>
        {!slugOk && slug.length > 0 && <em className="fh">3–40 characters, lowercase letters, numbers, hyphens.</em>}
      </label>

      <label className="fld"><span>Headline</span>
        <input className="opentext" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="What you do, in a line." />
      </label>
      <label className="fld"><span>Bio</span>
        <textarea className="opentext" rows={3} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A few sentences." />
      </label>
      <label className="fld"><span>Your own domain <em className="fh">(optional — the strongest ownership signal)</em></span>
        <input className="opentext" value={customDomain} onChange={(e) => setCustomDomain(e.target.value)} placeholder="yourname.com" />
      </label>

      <label className="chkrow">
        <input type="checkbox" checked={emailCapture} onChange={(e) => setEmailCapture(e.target.checked)} />
        <span>Collect email subscribers directly on my page <em className="fh">— the relationship no platform can revoke.</em></span>
      </label>

      <div className="linkedit">
        <div className="linkedithead"><span>Your links</span><button type="button" className="ghost small" onClick={addLink}>+ Add link</button></div>
        {links.map((l, i) => (
          <div key={i} className="linkrow">
            <input className="opentext" value={l.label} onChange={(e) => updateLink(i, { label: e.target.value })} placeholder="Label" />
            <input className="opentext" value={l.url} onChange={(e) => updateLink(i, { url: e.target.value })} placeholder="https://" />
            <select className="opentext" value={l.kind} onChange={(e) => updateLink(i, { kind: e.target.value })}>
              {KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
            {l.owned && <span className="ownedtag">owned</span>}
            <button type="button" className="ghost small" onClick={() => removeLink(i)}>×</button>
          </div>
        ))}
      </div>

      {dims.length > 0 && (
        <div className="fusionbox">
          <b>Publishing lifts your verified evidence on:</b> {dims.join(", ")}.
          <span className="fh"> These are auto-verified (0.8) facts — they outrank self-report and raise your score.</span>
        </div>
      )}

      <div className="actions">
        <button className="ghost" disabled={!slugOk || state === "saving" || !dbReady} onClick={() => save(false)}>Save draft</button>
        <button className="primary" disabled={!slugOk || state === "saving" || !dbReady} onClick={() => save(true)}>Publish my page</button>
        {savedSlug && <a className="fwlink" href={`/u/${savedSlug}`} target="_blank" rel="noopener noreferrer">View live →</a>}
      </div>
      {state === "saved" && <p className="disc">{published ? "Published." : "Draft saved."}</p>}
      {state === "taken" && <p className="disc">That handle is taken — try another.</p>}
      {state === "error" && <p className="disc">Couldn&apos;t save. Try again.</p>}
    </div>
  );
}
