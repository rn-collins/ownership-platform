"use client";

import { useState } from "react";
import { renderMarkdown } from "@/lib/markdown";

export interface PostRow { id: string; slug: string; title: string; body: string; published: boolean; updatedAt: string; }

const BLANK = { id: "", title: "", body: "", published: false };

export function Writer({ initialPosts, slug, dbReady }: { initialPosts: PostRow[]; slug: string; dbReady: boolean }) {
  const [posts, setPosts] = useState<PostRow[]>(initialPosts);
  const [draft, setDraft] = useState<{ id: string; title: string; body: string; published: boolean }>(BLANK);
  const [preview, setPreview] = useState(false);
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");

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
    // Refresh local list.
    const row: PostRow = { id: data.id, slug: data.slug, title: draft.title, body: draft.body, published: publish, updatedAt: new Date().toISOString() };
    setPosts((ps) => { const i = ps.findIndex((p) => p.id === row.id); const next = [...ps]; if (i >= 0) next[i] = row; else next.unshift(row); return next; });
    setDraft({ ...draft, id: data.id, published: publish });
    setState("saved");
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
