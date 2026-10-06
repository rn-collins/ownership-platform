import { signOwnedUnsubscribe } from "./token";

// Pieces of the creator-list broadcast email that must be right for every
// recipient: a personal unsubscribe link in the body and in the List-Unsubscribe
// headers (RFC 2369 and RFC 8058 one-click), plus an optional postal address.

export function ownedUnsubscribeUrl(origin: string, creatorId: string, email: string): string {
  const q = new URLSearchParams({ email: email.trim().toLowerCase(), c: creatorId, t: signOwnedUnsubscribe(creatorId, email) });
  return `${origin}/api/unsubscribe?${q.toString()}`;
}

export function unsubscribeHeaders(unsubscribeUrl: string): Record<string, string> {
  return {
    "List-Unsubscribe": `<${unsubscribeUrl}>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function renderBroadcast(opts: {
  title: string;
  contentHtml: string;
  contentText: string;
  name: string;
  url: string;
  unsubscribeUrl: string;
  postalAddress?: string | null;
}): { html: string; text: string } {
  const address = opts.postalAddress?.trim() || "";
  const html = `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;color:#1b2233;">
    <h1 style="font-size:24px;">${opts.title}</h1>
    <div style="font-family:Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;">${opts.contentHtml}</div>
    <p style="font-family:Helvetica,Arial,sans-serif;font-size:12px;color:#6b7488;margin-top:24px;">
      You&rsquo;re receiving this because you subscribed to ${esc(opts.name)}. <a href="${esc(opts.url)}">Read on the web</a>.
      <a href="${esc(opts.unsubscribeUrl)}">Unsubscribe</a>.${address ? `<br>${esc(address)}` : ""}
    </p>
  </div>`;
  const text = `${opts.title}\n\n${opts.contentText}\n\nRead: ${opts.url}\n\nYou're receiving this because you subscribed to ${opts.name}.\nUnsubscribe: ${opts.unsubscribeUrl}${address ? `\n${address}` : ""}`;
  return { html, text };
}
