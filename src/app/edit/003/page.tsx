import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata = {
  title: "Your Archive Is Not a Backup — The I/1 Edit",
  description: "Edition 003 asks whether an archive preserves enough operating memory to recover the capability behind the work.",
  alternates: { canonical: "/edit/003" },
  openGraph: { title: "Your Archive Is Not a Backup", description: "An export can preserve the objects you made while losing the operating memory that made them useful.", url: "/edit/003", type: "article", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Your Archive Is Not a Backup", description: "An export can preserve the objects you made while losing the operating memory that made them useful.", images: ["/og.png"] },
};

const actions = [
  ["Open", "Can you access the material with tools you control?"],
  ["Identify", "Can you tell which version is authoritative, what its status is, who made it, and why it exists?"],
  ["Verify", "Can you trace the evidence, permissions, decisions, and dependencies behind it?"],
  ["Reach", "Can you contact the people needed for the next step through an appropriate direct route?"],
  ["Resume", "Can you perform the next meaningful action without reconstructing the entire system from memory?"],
];

const sources = [
  { id: 1, label: "Google Account Help, “How to download your Google data”", href: "https://support.google.com/accounts/answer/3024190" },
  { id: 2, label: "LinkedIn Help, “Download your data”", href: "https://www.linkedin.com/help/linkedin/answer/a1339364/downloading-your-account-data" },
  { id: 3, label: "LinkedIn Help, “Export connections from LinkedIn”", href: "https://www.linkedin.com/help/linkedin/answer/a566336/export-connections-from-linkedin" },
  { id: 4, label: "GitHub Docs, “Backing up a repository”", href: "https://docs.github.com/en/repositories/archiving-a-github-repository/backing-up-a-repository" },
  { id: 5, label: "Regulation (EU) 2016/679, Article 20", href: "https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng" },
];

export default function EditionThreePage() {
  return <main className="edit-edition-page edition-003">
    <a className="postback" href="/edit">← The I/1 Edit</a>
    <p className="eyebrow">Edition 003 · August 2026</p>
    <h1>Your archive is not a backup.</h1>
    <p className="edition-dek">An export can preserve the objects you made while losing the operating memory that made them useful.</p>

    <section className="edition-opening">
      <p className="edition-dropcap">The download finishes. A folder appears. Years of documents, photographs, posts, contacts, or account history are suddenly sitting on a drive you control.</p>
      <p>It feels like the work is safe.</p>
      <p>Sometimes it is safer. An export can prevent a platform change, lost login, job transition, or account closure from erasing the only copy of something valuable. But an archive answers a narrower question than most of us ask of it.</p>
      <p>It can show that files survived. It cannot, by itself, show that the capacity behind them survived too.</p>
      <p>Edition 001 asked what a person can Build, Carry, Control, and Continue. Edition 002 mapped the suppliers beneath that continuity. This edition asks what must remain after one of those suppliers disappears: not only the objects produced, but the context, authority, relationships, and routines required to use them again.</p>
    </section>

    <section className="edition-distinction"><p className="eyebrow">The governing distinction</p><blockquote>Stored objects are not the same as operating memory.</blockquote></section>

    <section className="edition-opening">
      <h2>A Google archive can be extensive without becoming a new Google account.</h2>
      <p>Google Takeout allows a person to select data from Google products and create an archive. Depending on the chosen method, Google can provide a download link or add the archive to another storage service.<sup><a href="#source-1">1</a></sup></p>
      <p>That is real portability at the file level. It can preserve messages, documents, photographs, calendars, and other records in forms that no longer depend on immediate access to the original account.</p>
      <p>What it does not promise is reconstruction of the environment in which those records worked: sharing permissions, search habits, automations, account identity, or the tacit rule by which a team knew which draft was final.</p>
      <p>The difference is not a defect unique to Google. It is the difference between exporting identifiable data and recreating a functioning system. A box of parts may be complete as an inventory and incomplete as a machine.</p>
    </section>

    <section className="edition-opening">
      <h2>A LinkedIn connections file preserves entries, not necessarily relationships.</h2>
      <p>LinkedIn allows members to download account data and export first-degree connections. Its help documentation notes that some email addresses will be absent unless those connections allowed their addresses to be included; it also identifies format and character limitations.<sup><a href="#source-2">2</a></sup><sup><a href="#source-3">3</a></sup></p>
      <p>The file may preserve names, roles, companies, connection dates, and some direct contact information. But a CSV of contacts is not a relationship.</p>
      <p>It cannot establish that another person remembers you, consents to communication outside the platform, trusts your work, understands why you connected, or wants the relationship to continue. The archive preserves evidence that a connection existed inside a system. The relationship survives only if it has enough context and mutuality to exist beyond that system.</p>
    </section>

    <section className="edition-opening">
      <h2>A finished artifact can survive after the capability behind it disappears.</h2>
      <p>A report delivered as a PDF may remain readable for decades. Yet the capacity behind it may be distributed across interview notes, source files, analysis code, image permissions, correspondence, naming conventions, approval decisions, and the judgment of collaborators.</p>
      <p>The same problem appears in software. A local copy of code may omit deployment settings, secrets, external services, issue history, administrative authority, domain control, and maintenance routines. GitHub’s backup guidance distinguishes cloning the Git repository from separately preserving items such as wikis and Git Large File Storage objects.<sup><a href="#source-4">4</a></sup></p>
      <p>Preserving the result may require only the finished artifact. Preserving the ability to defend, update, correct, or reproduce it requires the operating memory for that task.</p>
    </section>

    <section className="edition-opening">
      <h2>Data portability is important—and still narrower than continuity.</h2>
      <p>Article 20 of the European Union’s General Data Protection Regulation provides, in specified circumstances, a right to receive certain personal data in a structured, commonly used, machine-readable format and to transmit those data to another controller.<sup><a href="#source-5">5</a></sup></p>
      <p>That right can reduce the extent to which personal data are trapped inside one service. It is not a general right to another company’s software, ranking system, network effects, interface, private inferences, intellectual property, or equivalent service elsewhere. Nor does possession of data answer whether a person owns the work, may reuse it, or can lawfully carry it away from an employer, client, research project, or collaboration.</p>
      <p>Access, ownership, permission, and recoverability are separate questions.</p>
    </section>

    <section className="edition-status">
      <div><p className="eyebrow">A practical reflection</p><h2>Test the next action, not the size of the download.</h2></div>
      <div className="edition-test-list">{actions.map(([name, question]) => <p key={name}><b>{name}:</b> {question}</p>)}</div>
    </section>

    <section className="edition-opening">
      <h2>Some things should not travel.</h2>
      <p>An ownership framework becomes irresponsible if it treats extraction as the answer to every dependency. Employees may not have the right to retain employer work product or confidential information. Lawyers, researchers, clinicians, consultants, and collaborators may hold material under duties that survive the relationship. Subscriber and customer records carry privacy and consent obligations. Security credentials should not be copied into an indiscriminate archive. Retention rules may require deletion, not preservation.</p>
      <p>The goal is not to take everything. It is to know what is yours, shared, entrusted, required to remain, or required to be returned or destroyed—and which parts of your capability can be documented without violating those boundaries.</p>
      <p>The archive of an Institution of One is not a digital attic. It is a deliberately limited recovery system: enough lawful context to make important work intelligible and usable again.</p>
    </section>

    <section className="edition-distinction"><p className="eyebrow">The question to carry forward</p><blockquote>If your primary work system disappeared tonight, what could you actually resume tomorrow?</blockquote></section>

    <section className="edition-status" aria-labelledby="recovery-drill">
      <div><p className="eyebrow">Interactive reflection</p><h2 id="recovery-drill">The Recovery Drill</h2><p>Choose one body of work. Attempt one real next action and record where recovery stops.</p></div>
      <div className="edition-test-list">{actions.map(([name]) => <p key={name}><b>{name}:</b> Completed / Blocked / Not tested</p>)}<p className="disc">This is a reflection and planning prompt, not a validated measure, score, diagnosis, or legal determination. Responses are not collected or aggregated.</p></div>
    </section>

    <section className="edition-opening" aria-labelledby="sources-heading">
      <p className="eyebrow">Sources and limits</p><h2 id="sources-heading">What supports this edition</h2>
      <p>Sources checked August 6, 2026. Platform documentation supports bounded claims about described export and backup functions. It does not establish identical functionality for every account, product, jurisdiction, or data type. Legal rights and duties depend on the relevant facts, law, contract, and role.</p>
      <ol>{sources.map(source => <li id={`source-${source.id}`} key={source.id}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ol>
      <p>Corrections or material primary sources can be submitted through the <a href="/about">About page</a>. Substantive corrections will be dated here.</p>
    </section>

    <nav className="edition-status" aria-label="Edition navigation"><div><p className="eyebrow">Continue the inquiry</p><h2>Next: design the transition.</h2></div><div><a href="/edit/002"><strong>← Edition 002</strong><br/>Your career has a supply chain.</a><p><a href="/edit/004"><strong>Edition 004 →</strong><br/>The exit is part of the architecture.</a></p></div></nav>
    <section className="edition-subscribe"><p className="eyebrow">The I/1 Edit</p><h2>One original argument, every other week.</h2><NewsletterSignup source="site" /></section>
  </main>;
}
