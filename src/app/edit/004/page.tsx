import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata = {
  title: "The Exit Is Part of the Architecture — The I/1 Edit",
  description: "Edition 004 examines transfer, redirection, authority, and replacement as conditions of continuity.",
  alternates: { canonical: "/edit/004" },
  openGraph: { title: "The Exit Is Part of the Architecture", description: "The right to download the parts is not the same as a path for the work to continue somewhere else.", url: "/edit/004", type: "article", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "The Exit Is Part of the Architecture", description: "The right to download the parts is not the same as a path for the work to continue somewhere else.", images: ["/og.png"] },
};

const rehearsal = [
  ["Function", "What does this system supply that the work cannot presently do without?"],
  ["Authority", "Who can export, transfer, redirect, add an administrator, terminate access, or approve the move?"],
  ["Boundary", "What is yours, institutional, shared, entrusted, confidential, or required to remain?"],
  ["Continuity", "What history, metadata, permissions, integrations, or public address must survive?"],
  ["Time", "How long do extraction, approval, migration, testing, and correction actually take?"],
  ["Replacement", "What can supply the function next, and has the smallest reversible part been tested?"],
];

const sources = [
  { id: 1, label: "GitHub Docs, “Transferring a repository”", href: "https://docs.github.com/en/repositories/creating-and-managing-repositories/transferring-a-repository" },
  { id: 2, label: "Spotify for Creators, “Switching away from Spotify for Creators with a 301 redirect”", href: "https://support.spotify.com/us/creators/article/switching-away-from-spotify-for-creators-with-a-301-redirect/" },
  { id: 3, label: "GitHub Docs, “Backing up a repository”", href: "https://docs.github.com/en/repositories/archiving-a-github-repository/backing-up-a-repository" },
];

export default function EditionFourPage() {
  return <main className="edit-edition-page edition-004">
    <a className="postback" href="/edit">← The I/1 Edit</a><p className="eyebrow">Edition 004 · August 2026</p>
    <h1>The exit is part of the architecture.</h1><p className="edition-dek">The right to download the parts is not the same as a path for the work to continue somewhere else.</p>

    <section className="edition-opening">
      <p className="edition-dropcap">A Git repository can be cloned. It can also be transferred.</p>
      <p>A clone preserves Git data in a new local copy. A qualifying GitHub repository transfer can move the repository to another owner while carrying issues, pull requests, wiki, stars, watchers, and commit information; GitHub also describes automatic redirects from the previous repository location.<sup><a href="#source-1">1</a></sup></p>
      <p>One action copies an object. The other can preserve more of the working history and address around it.</p>
      <p>Edition 003 asked whether an archive could recover a capability after a system disappeared. Recovery protects against loss. Exit architecture asks a different question: can the work change containers without becoming a disconnected copy of its former self?</p>
      <p>We usually choose a platform, job, client, collaborator, or tool by asking what it lets us do while the relationship works. The exit questions arrive later, often after bargaining power has changed.</p>
    </section>

    <section className="edition-distinction"><p className="eyebrow">The argument</p><blockquote>An exit is not an exceptional event added to a system at the end. It is one of the system’s original conditions.</blockquote></section>

    <section className="edition-opening">
      <h2>Transfer can preserve a working history that copying leaves behind.</h2>
      <p>GitHub’s documentation makes the distinction unusually visible. A repository transfer can preserve not only Git history but platform relationships around the work. Permissions and some features can still change, and transfer depends on the relevant account and organization authority.<sup><a href="#source-1">1</a></sup></p>
      <p>A clone remains essential as a backup and development tool. It may preserve the code and commit history needed to restore a repository elsewhere. But a clone alone is not necessarily the project as collaborators experienced it. Discussions, assignments, integrations, secrets, deployment authority, and public address may live in different layers.</p>
      <p>The useful question is not whether the files can move. It is which form of movement preserves the capability the project actually needs.</p>
    </section>

    <section className="edition-opening">
      <h2>A redirect can carry a relationship even when the files have already moved.</h2>
      <p>Spotify for Creators tells publishers moving away from its hosting service to add a 301 redirect to the new RSS feed. Its documentation says the redirect helps listeners on Spotify and other platforms continue receiving new episodes after the move.<sup><a href="#source-2">2</a></sup></p>
      <p>The audio files matter, but they are not the entire podcast. The feed is also an address through which directories and listeners learn what comes next. Move the episodes without preserving that route and the archive may be intact while the future audience relationship breaks.</p>
      <p>This principle travels beyond podcasts. Domains, email addresses, canonical URLs, package names, persistent identifiers, and forwarding rules can carry continuity between systems. They do not eliminate dependence. They make the route legible enough to change.</p>
    </section>

    <section className="edition-opening">
      <h2>Export-and-rebuild is a valid exit—and its cost should be visible.</h2>
      <p>Not every system supports transfer or redirection. Sometimes the available path is to export data and rebuild the function elsewhere. A newsletter publisher may export posts and subscriber records, then reconstruct templates, automations, analytics, payment flows, consent records, and reader habits in another service. An employee may leave with general skill, public accomplishments, and appropriate professional relationships while the employer’s files, data, and work product properly remain behind.</p>
      <p>These are not failed exits. They are exits with reconstruction costs. The danger lies in discovering those costs only after access ends.</p>
      <p>A theoretical export right offers limited protection if extraction takes longer than the notice period. A transferable file is insufficient if the receiving system cannot interpret it. Ownership of a domain means little if the registrar account belongs to somebody else. Exit architecture makes those conditions visible before they become urgent.</p>
    </section>

    <section className="edition-opening">
      <h2>Ownership and exit authority are not the same thing.</h2>
      <p>A writer may own copyright in an article while lacking administrative control of the publication account, subscriber relationship, analytics, or domain. A founder may own equity while essential infrastructure sits in an employee’s or contractor’s personal login. An employee may carry rare capability and a strong reputation while properly lacking any right to take confidential records or employer-owned systems.</p>
      <p>“Who owns it?” remains important. It is not enough. Exit architecture asks who can authorize each transition, what consent is required, what duties limit movement, what must be returned or deleted, and what can continue without pretending that every useful contribution belongs to the individual who made it.</p>
    </section>

    <section className="edition-opening">
      <h2>The institution also needs an exit.</h2>
      <p>Designing for exit is not merely personal self-protection. An organization that depends on one person’s undocumented memory has accepted a single point of failure. A client whose credentials and deployment controls live only in a contractor’s personal account does not have a complete delivery.</p>
      <p>Good exit architecture protects all sides of a legitimate relationship. It distinguishes individual, institutional, shared, and entrusted material. It creates shared administrative control where appropriate and sets handoff, deletion, return, attribution, confidentiality, and transition expectations before conflict.</p>
      <p>The goal is not maximal independence. It is legible dependence with survivable transitions.</p>
    </section>

    <section className="edition-status"><div><p className="eyebrow">A practical reflection</p><h2>Rehearse one exit while cooperation still exists.</h2></div><div className="edition-test-list">{rehearsal.map(([name, question]) => <p key={name}><b>{name}:</b> {question}</p>)}</div></section>

    <section className="edition-opening"><p>Then rehearse one lawful, reversible action: verify a backup, confirm administrator access, document the registrar, inspect an export, review a termination provision, or test a redirect in a nonproduction environment.</p><p>Do not wait for a dispute, layoff, illness, platform shutdown, lost password, price increase, or damaged relationship to learn that leaving requires cooperation you no longer have.</p></section>

    <section className="edition-distinction"><p className="eyebrow">The question to carry forward</p><blockquote>If your most important work system had to change containers this month, which part of the continuity would fail first?</blockquote></section>

    <section className="edition-status" aria-labelledby="exit-rehearsal"><div><p className="eyebrow">Interactive reflection</p><h2 id="exit-rehearsal">The Exit Rehearsal</h2><p>Choose one critical system. Record the evidence for one possible transition.</p></div><div className="edition-test-list">{rehearsal.map(([name]) => <p key={name}><b>{name}:</b> Known / Assumed / Unknown</p>)}<p className="disc">This is a planning prompt, not legal advice, a validated assessment, a score, or a diagnosis. Responses are not collected or aggregated.</p></div></section>

    <section className="edition-opening" aria-labelledby="sources-heading"><p className="eyebrow">Sources and limits</p><h2 id="sources-heading">What supports this edition</h2><p>Sources checked August 6, 2026. Platform documentation supports bounded claims about described transfer, backup, and redirection functions. Features, permissions, and instructions may change and must be rechecked on publication. No private contract, platform arrangement, employment agreement, or participant interview was reviewed.</p><ol>{sources.map(source => <li id={`source-${source.id}`} key={source.id}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ol><p>Corrections or material primary sources can be submitted through the <a href="/about">About page</a>. Substantive corrections will be dated here.</p></section>

    <nav className="edition-status" aria-label="Edition navigation"><div><p className="eyebrow">Read in sequence</p><h2>Four questions about durable work.</h2></div><div><a href="/edit/003"><strong>← Edition 003</strong><br/>Your archive is not a backup.</a><p><a href="/edit">See every edition →</a></p></div></nav>
    <section className="edition-subscribe"><p className="eyebrow">The I/1 Edit</p><h2>One original argument, every other week.</h2><NewsletterSignup source="site" /></section>
  </main>;
}
