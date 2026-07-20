"use client";

import { useState } from "react";
import { renderMarkdown } from "@/lib/markdown";

export interface PostRow { id: string; slug: string; title: string; body: string; published: boolean; updatedAt: string; broadcastAt: string | null; broadcastCount: number; }

const BLANK = { id: "", title: "", body: "", published: false };

export function Writer({ initialPosts, slug, dbReady, subscriberCount }: { initialPosts: PostRow[]; slug: string; dbReady: boolean; subscriberCount: number }) {
  const [posts, setPosts] = useState<PostRow[]>(initialPosts);
  const [draft, setDraft] = useState<{ id: string; title: string; body: string; published: boolean }>(BLANK);
  const [preview, setPreview] = useState(false);
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [sendState, setSendState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [sendMsg, setSendMsg] = useState("");

  function edit(p: PostRow) { setDraft({ id: p.id, title: p.title, body: p.body, published: p.published }); setPreview(false); setState("idle"); }
  function newPost() { setDraft(BLANK); setPreview(false); setState("idle"); }

  async function save(publish: boolean) {
    setState("saving");
    const res = await fetch("/api/owned/post/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: draft.id || undefined, title: draft.title, body: draft.body, published: publish }),
    }).catch(() => null);
    if (!res || !res.ok) { setState("error"); return; }
    const data = await res.json();
    if (!data.saved) { setState("error"); return; }
    // Refresh local list, preserving any broadcast state on the existing row.
    const prev = posts.find((p) => p.id === data.id);
    const row: PostRow = { id: data.id, slug: data.slug, title: draft.title, body: draft.body, published: publish, updatedAt: new Date().toISOString(), broadcastAt: prev?.broadcastAt ?? null, broadcastCount: prev?.broadcastCount ?? 0 };
    setPosts((ps) => { const i = ps.findIndex((p) => p.id === row.id); const next = [...ps]; if (i >= 0) next[i] = row; else next.unshift(row); return next; });
    setDraft({ ...draft, id: data.id, published: publish });
    setState("saved");
  }

  async function broadcast() {
    if (!draft.id) return;
    setSendState("sending"); setSendMsg("");
    const res = await fetch("/api/owned/post/broadcast", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId: draft.id }),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => null) : null;
    if (data?.ok) {
      setSendState("sent");
      setSendMsg(`Sent to ${data.sent} ${data.sent === 1 ? "subscriber" : "subscribers"}.`);
      setPosts((ps) => ps.map((p) => p.id === draft.id ? { ...p, broadcastAt: new Date().toISOString(), broadcastCount: data.sent } : p));
    } else {
      setSendState("error");
      const map: Record<string, string> = {
        "email-not-configured": "Email isn't set up yet (add RESEND_API_KEY and RESEND_FROM).",
        "already-sent": "This post was already sent.",
        "no-subscribers": "You have no subscribers yet.",
        "post-not-published": "Publish the post before sending.",
      };
      setSendMsg(map[data?.error] ?? "Couldn't send.");
    }
  }

  async function remove(id: string) {
    await fetch("/api/owned/post/save", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title: "x", body: "", delete: true }),
    }).catch(() => null);
    setPosts((ps) => ps.filter((p) => p.id !== id));
    if (draft.id === id) newPost();
  }

  const canSave = dbReady && draft.title.trim().length > 0 && state !== "saving";

  return (
    <div className="writer">
      {!dbReady && <p className="disc">Database isn&apos;t configured here, so saving is off. The editor and preview still work.</p>}

      <div className="writergrid">
        <div className="writeredit">
          <input className="opentext wtitle" placeholder="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          <div className="writertabs">
            <button className={`wtab${!preview ? " on" : ""}`} onClick={() => setPreview(false)}>Write</button>
            <button className={`wtab${preview ? " on" : ""}`} onClick={() => setPreview(true)}>Preview</button>
            <span className="wmd">Markdown</span>
          </div>
          {preview ? (
            <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(draft.body || "*Nothing to preview yet.*") }} />
          ) : (
            <textarea className="opentext wbody" rows={16} placeholder="Write in markdown…" value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} />
          )}
          <div className="actions">
            <button className="ghost" disabled={!canSave} onClick={() => save(false)}>Save draft</button>
            <button className="primary" disabled={!canSave} onClick={() => save(true)}>Publish</button>
            {draft.id && draft.published && slug && <a className="fwlink" href={`/u/${slug}/${posts.find((p) => p.id === draft.id)?.slug ?? ""}`} target="_blank" rel="noopener noreferrer">View live →</a>}
            {state === "saved" && <span className="disc" style={{ margin: 0 }}>Saved.</span>}
            {state === "error" && <span className="disc" style={{ margin: 0 }}>Couldn&apos;t save.</span>}
          </div>

          {(() => {
            const cur = posts.find((p) => p.id === draft.id);
            if (!draft.id || !draft.published || !cur) return null;
            if (cur.broadcastAt) {
              return <div className="broadcastbox sent">Sent to {cur.broadcastCount} {cur.broadcastCount === 1 ? "subscriber" : "subscribers"} on {new Date(cur.broadcastAt).toLocaleDateString()}.</div>;
            }
            return (
              <div className="broadcastbox">
                <div className="bcopy"><b>Send this to your {subscriberCount} {subscriberCount === 1 ? "subscriber" : "subscribers"}.</b> Owned audience, owned content, owned delivery. This also raises your Audience Ownership score.</div>
                <button className="primary" disabled={sendState === "sending" || subscriberCount === 0} onClick={broadcast}>
                  {sendState === "sending" ? "Sending…" : "Send to subscribers"}
                </button>
                {sendMsg && <span className="disc" style={{ margin: 0 }}>{sendMsg}</span>}
              </div>
            );
          })()}
        </div>

        <aside className="writerlist">
          <div className="writerlisthead"><span>Your posts</span><button className="ghost small" onClick={newPost}>+ New</button></div>
          {posts.length === 0 && <p className="fh">No posts yet.</p>}
          {posts.map((p) => (
            <div key={p.id} className={`postitem${draft.id === p.id ? " on" : ""}`}>
              <button className="postitembtn" onClick={() => edit(p)}>
                <span className="postittitle">{p.title || "Untitled"}</span>
                <span className={`poststate ${p.published ? "pub" : "draft"}`}>{p.published ? "Published" : "Draft"}</span>
              </button>
              <button className="ghost small" onClick={() => remove(p.id)} aria-label="Delete">×</button>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
