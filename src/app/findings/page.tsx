import { FindingsView } from "@/components/FindingsView";
import { MeasuredCounter } from "@/components/MeasuredCounter";

export const metadata = {
  title: "What the 41 careers reveal — Institutions of One",
  description: "The patterns, tensions, limits, and open questions emerging from the 41-case Institutions of One pilot.",
  alternates: { canonical: "/findings" },
  openGraph: { title: "What the 41 careers reveal — Institutions of One", description: "The patterns, tensions, limits, and open questions emerging from the 41-case Institutions of One pilot.", url: "/findings", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "What the 41 careers reveal — Institutions of One", description: "The patterns, tensions, limits, and open questions emerging from the 41-case Institutions of One pilot.", images: ["/og.png"] },
};

const signals = [
  ["31 / 41", "work primarily through organizations", "The pilot is not a founder hall of fame. Most cases help us ask what a person can build and carry while an employer still owns much of the infrastructure."],
  ["19 / 41", "may have helped shape the role around them", "A distinctive title can signal unusual authority. It does not prove ownership, portability, or that the role would follow the person elsewhere."],
  ["13", "fields are represented", "The same question behaves differently in design, media, science, government, technology, sport, law, and other fields."],
  ["21 / 41", "concentrate in two tensions", "More than half of the current roster asks either whether the role depends on the person or whether one person can hold several fields together. That is a feature of this pilot—and a selection bias to correct."],
];

export default function FindingsPage() {
  return (
    <main className="findings-page findings-2">
      <p className="eyebrow">What the research is showing</p>
      <h1>Fame is easy to see. The structure beneath a career is not.</h1>
      <p className="lede findings-hook">
        We began with 41 deliberately different careers. The first lesson is not that some people have “become institutions”
        and others have failed. It is that build, portability, ownership, and dependence can move in different directions.
        A person may be highly influential yet unable to carry the audience, rights, authority, or systems that made the influence possible.
      </p>

      <section className="finding-example">
        <div><p className="eyebrow">Start with a contrast</p><h2>Two people can look equally powerful from the outside—and have completely different continuation risks.</h2></div>
        <div>
          <p>One may own the company name, customer relationship, archive, and distribution list. Another may have a celebrated title, large budget, and global reach while the employer controls every one of those assets.</p>
          <p>Neither arrangement is automatically better. The meaningful questions are: what did the person build, what can move with them, what do they control, and which dependencies could stop the work?</p>
          <a className="fwlink" href="/observatory?mode=compare">Compare two careers →</a>
        </div>
      </section>

      <section aria-labelledby="pilot-readout">
        <p className="eyebrow">A descriptive read of this pilot</p>
        <h2 id="pilot-readout" className="display-h2">What is inside the 41—and what that does not prove.</h2>
        <div className="finding-signals">{signals.map(([number, label, meaning]) => <article key={label}><strong>{number}</strong><h3>{label}</h3><p>{meaning}</p></article>)}</div>
        <p className="disc">These are counts within a purposefully selected pilot, not estimates of the wider workforce. An empty or crowded category tells us about this roster before it tells us anything about the world.</p>
      </section>

      <section className="finding-claims">
        <p className="eyebrow">Three claims the evidence can support so far</p>
        <ol>
          <li><span>01</span><div><h3>Institutional capacity is not the same as visibility.</h3><p>Attention can increase reach without transferring rights, relationships, revenue channels, or decision-making power to the person receiving it.</p></div></li>
          <li><span>02</span><div><h3>Build, carry, and control must be examined separately.</h3><p>Creating something important does not necessarily mean it can leave the organization with you. Carrying a reputation does not necessarily mean controlling the underlying assets.</p></div></li>
          <li><span>03</span><div><h3>Dependence is normal; invisible dependence is dangerous.</h3><p>Every career relies on other people and systems. The useful distinction is whether those dependencies are visible, diversified, negotiable, and survivable.</p></div></li>
        </ol>
        <div className="actions"><a className="primary-link" href="/edit/001">Read the Build–Carry–Control argument</a><a className="text-link" href="/edit/002">Explore career supply chains →</a></div>
      </section>

      <section className="finding-not-yet">
        <p className="eyebrow">What has not been established</p>
        <h2>There is no institution-of-one score for the 41 people.</h2>
        <p>The public record rarely reveals complete contracts, equity, informal authority, private economics, data rights, or what would happen after a key relationship ended. The Observatory therefore opens comparisons and records unknowns; it does not rank people or manufacture certainty.</p>
        <a className="fwlink" href="/observatory?mode=missing">See what the pilot is missing →</a>
      </section>

      <section className="finding-assessments">
        <p className="eyebrow">A different evidence stream</p>
        <h2>What participants report about their own work</h2>
        <p className="lede">The assessments ask about conditions a public biography cannot reveal. Aggregate patterns will appear only after enough complete responses exist to protect privacy and make the summary worth interpreting.</p>
        <p className="lede"><MeasuredCounter suffix="anonymous assessments completed so far." /></p>
        <FindingsView />
      </section>
    </main>
  );
}
