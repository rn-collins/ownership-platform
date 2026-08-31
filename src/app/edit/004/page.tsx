import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata = {
  title: "The Exit Is Part of the Architecture — The I/1 Edit",
  description: "Edition 004 examines transfer, redirect, and export-and-rebuild as different mechanisms for preserving continuity when work changes containers.",
  alternates: { canonical: "/edit/004" },
  openGraph: { images: [{ url: "/og/edit/004.png", width: 1200, height: 630, alt: "Edition 004 — the exit is part of the architecture." }], title: "The Exit Is Part of the Architecture", description: "The right to download the parts is not the same as a path for the work to continue somewhere else.", url: "/edit/004", type: "article" },
  twitter: { images: ["/og/edit/004.png"], card: "summary_large_image", title: "The Exit Is Part of the Architecture", description: "The right to download the parts is not the same as a path for the work to continue somewhere else." },
};

const rehearsal = [
  ["Function", "What must continue?", "Named operational function and minimum acceptable result", "Known / Assumed / Unknown"],
  ["Authority", "Who can authorize the move?", "Account role, agreement, permission record, or approval path", "Confirmed / Shared / External / Unknown"],
  ["Boundary", "What may and may not travel?", "Ownership, license, confidentiality, privacy, security, and return/deletion rules", "Documented / Partial / Unknown"],
  ["Continuity", "What carries history and address?", "Transfer mechanism, redirect, metadata, permissions, or stable identifier", "Tested / Planned / None"],
  ["Time", "How long will transition take?", "Extraction, approval, migration, testing, correction, and notice periods", "Measured / Estimated / Unknown"],
  ["Replacement", "What supplies the function next?", "Compatible alternative, operator, cost, capacity, and reversible test", "Ready / Possible / Unknown"],
];

export default function EditionFourPage() {
  return <main className="edit-edition-page">
    <a className="postback" href="/edit">← The I/1 Edit</a>
    <p className="eyebrow">Edition 004 · August 2026</p>
    <h1>The exit is part of the architecture.</h1>
    <p className="edition-dek">The right to download the parts is not the same as a path for the work to continue somewhere else.</p>

    <section className="edition-opening">
      <p className="edition-dropcap">A Git repository can be cloned. It can also be transferred. Both can put code somewhere else, but structurally they are different.</p>
      <p>A mirror clone preserves files and revision history. A qualifying GitHub transfer changes ownership and can carry more of the working environment: issues, pull requests, wiki, stars, watchers, commit information, and redirects from the former location.</p>
      <p>One action copies an object. The other can preserve more of the history, relationships, authority, and address around it.</p>
      <p>Edit 003 asked whether an archive could recover a capability after loss. Exit architecture asks whether the work can change containers without becoming a disconnected copy of its former self.</p>
    </section>

    <section className="edition-thresholds" aria-labelledby="movement-heading"><p className="eyebrow">Three mechanisms</p><h2 id="movement-heading">What kind of continuity does the work need?</h2><div className="edition-threshold-grid">
      <article><span>01</span><h3>Transfer</h3><h4>Change stewardship</h4><p>Move the working object with as much history, authority, and relationship structure as the system permits.</p></article>
      <article><span>02</span><h3>Redirect</h3><h4>Preserve the address</h4><p>Point readers, listeners, users, or software from the old location to the new one.</p></article>
      <article><span>03</span><h3>Export and rebuild</h3><h4>Reconstruct the function</h4><p>Move what may lawfully travel, then deliberately replace the workflow, permissions, integrations, and habits that cannot.</p></article>
    </div></section>

    <section className="edition-opening"><h2>Transfer preserves a different continuity than copying.</h2><p>A verified clone may be exactly what disaster recovery requires. But a copy of Git data is not necessarily the project as collaborators experience it. Discussions, assignments, permissions, integrations, secrets, deployments, public links, and administrative control can live elsewhere.</p><p>If the goal is stewardship rather than disaster recovery, continuity may require a transfer, updated permissions, tested integrations, new administrative authority, and a deliberate handoff. The useful question is not whether files can move, but which movement preserves the capability the project needs.</p></section>

    <section className="edition-opening"><h2>A redirect can carry a relationship.</h2><p>Spotify for Creators tells publishers changing hosts to import episodes and redirect the old RSS feed. A 301 redirect helps listeners continue receiving episodes and may take up to seven days. The files matter, but the feed is also an address through which directories and listeners learn what comes next.</p><p>Domains, email addresses, canonical URLs, package names, persistent identifiers, and forwarding rules can carry continuity between systems. Address continuity can determine whether anyone finds the work after an exit.</p></section>

    <section className="edition-opening"><h2>Export-and-rebuild is valid—and its cost should be visible.</h2><p>Not every system supports transfer or redirection. A newsletter publisher may export posts and eligible subscribers, then rebuild templates, automations, analytics, payment flows, consent records, and reader habits. An employee may carry general skill, public accomplishments, and appropriate relationships while confidential information and employer-owned work properly remain behind.</p><p>These are not failed exits. They are exits with reconstruction costs. The danger is discovering those costs only after access ends.</p></section>

    <section className="edition-status"><div><p className="eyebrow">Authority and obligation</p><h2>Ownership and exit authority are not the same thing.</h2></div><div><p>A writer may own copyright while lacking control of the publication account, subscriber relationship, analytics, or domain. A collaborator may possess a copy yet lack authority to publish, license, redirect, delete, or transfer it.</p><p>Exit architecture asks who can authorize each transition, what consent is required, what duties limit movement, what must be returned or deleted, and what can continue.</p></div></section>

    <section className="edition-opening"><h2>The institution also needs an exit.</h2><p>An organization dependent on one person’s undocumented memory has accepted a single point of failure. A client whose credentials live in a contractor’s personal account has not received a complete handoff. Good exit architecture protects every legitimate party.</p><p>The goal is not maximal independence. It is legible dependence with survivable transitions.</p></section>

    <section className="edition-opening"><h2>The Exit Rehearsal</h2><p>Choose one critical system before an exit is imminent. Document the evidence required for one lawful transition.</p><div className="table-wrap"><table><thead><tr><th>Question</th><th>Evidence to inspect</th><th>Status</th></tr></thead><tbody>{rehearsal.map(([name,q,evidence,status]) => <tr key={name}><th>{name} — {q}</th><td>{evidence}</td><td>{status}</td></tr>)}</tbody></table></div><p>Then rehearse one lawful, reversible action while cooperation exists: verify a backup, confirm administrator access, document the registrar, inspect an export, review a handoff term, or test a redirect outside production.</p><p>The result is a transition record, not a score, diagnosis, certification, ranking, or comparison. Do not aggregate it with either Institutions of One pilot instrument.</p></section>

    <section className="edition-distinction"><p className="eyebrow">Closing question</p><blockquote>If your most important work system had to change containers this month, which part of its continuity would fail first?</blockquote><p>This essay offers a structural framework, not legal advice. Access, retention, transfer, reuse, confidentiality, privacy, intellectual property, deletion, and return depend on the facts, law, contract, role, and platform terms.</p></section>

    <section className="edition-opening" aria-labelledby="source-desk"><p className="eyebrow">Source Desk</p><h2 id="source-desk">Inspect the primary documentation.</h2><ol><li><a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository" target="_blank" rel="noopener noreferrer">GitHub Docs — Transferring a repository</a></li><li><a href="https://docs.github.com/en/repositories/archiving-a-github-repository/backing-up-a-repository" target="_blank" rel="noopener noreferrer">GitHub Docs — Backing up a repository</a></li><li><a href="https://support.spotify.com/us/creators/article/switching-away-from-spotify-for-creators-with-a-301-redirect/" target="_blank" rel="noopener noreferrer">Spotify for Creators — Switching away with a 301 redirect</a></li></ol><p><strong>Source status:</strong> Primary documentation rechecked 7 August 2026. Functionality can differ by account, plan, organization, jurisdiction, and private arrangement; recheck at implementation.</p></section>
    <section className="edition-opening"><p className="eyebrow">Read in sequence</p><p><a href="/edit/003">← Edit 003: Your Archive Is Not a Backup</a></p><p><a href="/edit">Return to all editions →</a></p></section>
    <section className="closing-call"><p className="eyebrow">The I/1 Edit</p><h2>Follow the research on work, ownership, continuity, and institutional power.</h2><NewsletterSignup source="site" /></section>
  </main>;
}
