import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata = {
  title: "Your Archive Is Not a Backup — The I/1 Edit",
  description: "Edition 003 distinguishes downloaded files from the context, rights, relationships, and routines required to resume the work.",
  alternates: { canonical: "/edit/003" },
  openGraph: { title: "Your Archive Is Not a Backup", description: "Downloading the files is not the same as preserving the system that made the work usable.", url: "/edit/003", type: "article" },
  twitter: { card: "summary_large_image", title: "Your Archive Is Not a Backup", description: "Downloading the files is not the same as preserving the system that made the work usable." },
};

const layers = [
  ["01", "Objects", "The visible work: writing, images, audio, video, code, contracts, presentations, datasets, notes, and correspondence.", "Do I possess a usable copy in a format I can open without the original platform?"],
  ["02", "Context", "Dates, versions, source links, captions, status, decisions, authorship, and the reason each item exists.", "Six months from now, could I tell what this is, whether it is final, and what evidence supports it?"],
  ["03", "Rights and permissions", "The legal and practical authority to reuse, revise, publish, transfer, license, or delete the material.", "Does possessing the file mean I may use it? If not, where is the controlling agreement or permission record?"],
  ["04", "Relationships", "Collaborators, sources, readers, clients, vendors, communities, and people who know how the system operates.", "Is the relationship direct and mutually recognized, or only a follower count, username, or platform-mediated history?"],
  ["05", "Routines", "The repeatable actions that turn stored material back into capacity: research, review, naming, approval, publication, maintenance, and recovery.", "Could another person—or a future version of me—restart this system from its documentation?"],
];

const drill = [
  ["Open", "Open the material with tools you control.", "Missing file, proprietary format, lost key, or original-platform dependency"],
  ["Understand", "Identify the authoritative version, status, provenance, and purpose.", "Ambiguous names, missing metadata, or undocumented decisions"],
  ["Verify", "Reconstruct the evidence, permissions, and approvals behind it.", "Missing sources, consent, licenses, agreements, or review history"],
  ["Reach", "Contact the people needed to continue without relying exclusively on the lost system.", "Platform-only identity, stale contact data, or no mutually recognized route"],
  ["Resume", "Perform the next meaningful action.", "Missing workflow, credentials, configuration, capacity, or authority"],
];

const sources = [
  ["Google Account Help — How to download your Google data", "https://support.google.com/accounts/answer/3024190"],
  ["LinkedIn Help — Download your data", "https://www.linkedin.com/help/linkedin/answer/a1339364/downloading-your-account-data"],
  ["LinkedIn Help — Export connections", "https://www.linkedin.com/help/linkedin/answer/a566336/export-connections-from-linkedin"],
  ["Substack Help — Export posts", "https://support.substack.com/hc/en-us/articles/360037466012-How-do-I-export-my-posts"],
  ["Substack Help — Export an email list", "https://support.substack.com/hc/en-us/articles/6314498343700-How-do-I-export-my-email-list-on-Substack"],
  ["Instagram Help — Export your Instagram information", "https://help.instagram.com/181231772500920/"],
  ["Facebook Help — Export your Facebook information", "https://www.facebook.com/help/212802592074644"],
  ["Facebook Help — Manage Page access", "https://www.facebook.com/help/187316341316631"],
  ["TikTok Support — Requesting your data", "https://support.tiktok.com/en/account-and-privacy/personalized-ads-and-data/requesting-your-data"],
  ["YouTube Help — Manage channel permissions", "https://support.google.com/youtube/answer/9481328"],
  ["Google Account Help — Share a copy with a third party", "https://support.google.com/accounts/answer/14452558"],
  ["X Help — Access and download your X data", "https://help.x.com/en/managing-your-account/accessing-your-x-data"],
  ["X Help — Delegate account access", "https://help.x.com/en/managing-your-account/how-to-use-the-delegate-feature"],
  ["GDPR Article 20 — Right to data portability", "https://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=CELEX%3A02016R0679-20160504"],
];

export default function EditionThreePage() {
  return <main className="edit-edition-page">
    <a className="postback" href="/edit">← The I/1 Edit</a>
    <p className="eyebrow">Edition 003 · August 2026</p>
    <h1>Your archive is not a backup.</h1>
    <p className="edition-dek">Downloading the files is not the same as preserving the system that made the work usable.</p>

    <section className="edition-opening">
      <p className="edition-dropcap">Most platforms now offer some version of an export button. You can download posts, contacts, documents, photographs, subscriber lists, and account history. That can feel like control.</p>
      <p>An export may be the difference between retaining years of work and losing it. But possession of an archive is not proof that the work can continue. A working system also contains why a decision was made, which draft became authoritative, who has permission to use what, how a reader was reached, what an unfinished idea depends on, and what must happen next.</p>
      <p>Google, LinkedIn, and Substack provide useful export functions. Instagram, Facebook, TikTok, YouTube, and X do too. Coverage, format, preparation time, eligibility, and preserved data differ. An export may retain content without recreating ranking, reach, monetization status, audience habits, moderation history, account authority, collaboration roles, or a functioning channel elsewhere.</p>
      <p>Account structure matters as much as data. Facebook Page access, X delegation, and YouTube channel permissions can distribute operational authority. An archive can preserve content while failing to preserve who may publish, manage collaborators, redirect an audience, receive revenue, or authorize a transition.</p>
      <p>A CSV of contacts is not a relationship. A folder of documents is not a method. A collection of posts is not a publication. The mistake is treating storage as continuity.</p>
    </section>

    <section className="edition-opening">
      <h2>What an archive usually loses</h2>
      <p>A finished report may survive as a PDF while its source trail, interview notes, analysis environment, permissions, scope correspondence, version rules, reader list, and updating judgment remain distributed elsewhere. The artifact survives while the capability disappears.</p>
      <p>Platforms organize information for use inside their own environments. Search, links, permissions, history, interface, and context are native features. An export necessarily flattens some of that environment. What arrives may be technically complete and operationally unusable.</p>
      <p>GDPR Article 20 creates an important data-portability right in specified circumstances. It does not guarantee that another service can reconstruct network effects, permissions, rankings, inferences, or workflow. Portability can move material. Continuity must preserve function.</p>
    </section>

    <section className="edition-thresholds" aria-labelledby="archive-layers">
      <p className="eyebrow">The working model</p><h2 id="archive-layers">The five-layer archive</h2>
      <div className="edition-threshold-grid">{layers.map(([n,name,body,ask]) => <article key={name}><span>{n}</span><h3>{name}</h3><p>{body}</p><h4>Ask</h4><p>{ask}</p></article>)}</div>
    </section>

    <section className="edition-opening">
      <h2>The Recovery Drill</h2>
      <p>Choose one body of work you would need to continue if access to the original system disappeared tonight. Name its next meaningful action, then attempt that action from the archive alone.</p>
      <div className="table-wrap"><table><thead><tr><th>Step</th><th>Attempt</th><th>Record what blocks you</th></tr></thead><tbody>{drill.map(([step,attempt,block]) => <tr key={step}><th>{step}</th><td>{attempt}</td><td>{block}</td></tr>)}</tbody></table></div>
      <p>This is a recovery drill, not a resilience score or validated assessment. Its result is a list of specific failures to repair. If the attempt fails at Resume, you may have preserved the past without preserving the future.</p>
    </section>

    <section className="edition-status"><div><p className="eyebrow">A necessary boundary</p><h2>The point is not to copy everything.</h2></div><div><p>Client confidentiality, research obligations, employment agreements, privacy duties, security requirements, and data-minimization principles may limit what a person can or should carry.</p><p>The goal is deliberate continuity within those boundaries: know what is yours, entrusted, shared, institution-bound, or subject to a destruction schedule. An Institution of One is not a person who takes everything.</p></div></section>

    <section className="edition-distinction"><p className="eyebrow">Closing question</p><blockquote>If your primary work system disappeared tonight, what would you still possess tomorrow—and what could you actually resume?</blockquote><p>This essay offers a structural framework, not legal advice. Access, retention, transfer, and reuse depend on applicable law, contract, confidentiality duties, and platform terms.</p></section>

    <section className="edition-opening" aria-labelledby="source-desk"><p className="eyebrow">Source Desk</p><h2 id="source-desk">Inspect the primary documentation.</h2><ol>{sources.map(([label,href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{label}</a></li>)}</ol><p><strong>Source status:</strong> Primary platform and legal documentation rechecked 7 August 2026. These sources establish described tools and access structures, not identical functionality for every account, region, plan, role, or export. Recheck at publication and application.</p></section>
    <section className="edition-opening"><p className="eyebrow">Read in sequence</p><p><a href="/edit/002">← Edit 002: the suppliers beneath a career</a></p><p><a href="/edit/004">Next: The Exit Is Part of the Architecture →</a></p></section>
    <section className="closing-call"><p className="eyebrow">The I/1 Edit</p><h2>Follow the research on work, ownership, continuity, and institutional power.</h2><NewsletterSignup source="site" /></section>
  </main>;
}
