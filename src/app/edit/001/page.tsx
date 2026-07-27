import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata = {
  title: "When Does One Person Become an Institution? — The I/1 Edit",
  description:
    "Edition 001 of The I/1 Edit introduces the build, carry, and control framework for understanding when individual work begins to function institutionally.",
  alternates: { canonical: "/edit/001" },
  openGraph: {
    title: "When Does One Person Become an Institution?",
    description:
      "Build, Carry, Control: a working model for understanding when individual work begins to function institutionally.",
    url: "/edit/001",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "When Does One Person Become an Institution?",
    description:
      "Build, Carry, Control: a working model for understanding when individual work begins to function institutionally.",
  },
};

const thresholds = [
  {
    number: "01",
    name: "Build",
    question: "What exists because this person made it exist?",
    body:
      "A body of work is only the beginning. Institutional capacity appears when ideas become methods, relationships become networks, attention becomes an audience, and repeated effort becomes an operating system other people can recognize or use.",
  },
  {
    number: "02",
    name: "Carry",
    question: "What survives when the container changes?",
    body:
      "A title can confer authority without making it portable. The harder test is whether capability, reputation, systems, relationships, and opportunity can travel across an employer, platform, client, format, industry, or moment.",
  },
  {
    number: "03",
    name: "Control",
    question: "Who can decide what happens next?",
    body:
      "Visibility is not ownership. A person may appear powerful while another party controls the audience, rights, revenue, data, identity, or infrastructure. Institutionhood requires examining authority and dependence—not merely reach.",
  },
];

export default function EditionOnePage() {
  return (
    <main className="edit-edition-page">
      <a className="postback" href="/edit">← The I/1 Edit</a>
      <p className="eyebrow">Edition 001 · Preview</p>
      <h1>When does one person become an institution?</h1>
      <p className="edition-dek">
        What does a person have to build, carry, and control before their work begins to function like an institution?
      </p>

      <section className="edition-opening">
        <p className="edition-dropcap">
          The person is becoming a studio, a school of thought, a distribution system, a research program, a company,
          and sometimes a category. But fame does not make someone an institution. Neither does independence, a large
          audience, or an impressive title on its own.
        </p>
        <p>
          The useful question is structural: what has become durable around the person, what can move with them, and
          what can they actually govern? Edition 001 will introduce a three-part model for answering that question and
          show how the 41-case Observatory is being used to test where the model holds—and where it breaks.
        </p>
      </section>

      <section className="edition-thresholds" aria-labelledby="thresholds-heading">
        <p className="eyebrow">The working model</p>
        <h2 id="thresholds-heading">Three thresholds. None is enough alone.</h2>
        <div className="edition-threshold-grid">
          {thresholds.map((threshold) => (
            <article key={threshold.name}>
              <span>{threshold.number}</span>
              <h3>{threshold.name}</h3>
              <h4>{threshold.question}</h4>
              <p>{threshold.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="edition-distinction">
        <p className="eyebrow">The distinction that matters</p>
        <blockquote>
          An institution of one is not a person who does everything alone. It is a person whose work has developed
          enough structure to create continuity, authority, and consequence beyond a single role—without hiding who
          supplies the infrastructure or who controls the upside.
        </blockquote>
      </section>

      <section className="edition-status">
        <div>
          <p className="eyebrow">What this edition will establish</p>
          <h2>The premise, the model, and its first real test.</h2>
        </div>
        <div>
          <p>
            The complete edition will separate institutional function from popularity, entrepreneurship, and personal
            branding; introduce the build–carry–control model; and examine contrasting Observatory cases only where
            public evidence can support the comparison.
          </p>
          <p>
            The 41 cases are a methodology pilot, not proof that the model is valid for every person or field. Edition
            001 will identify what the cases can already help us see, what remains interpretation, and what participant
            research still needs to test.
          </p>
          <a className="fwlink" href="/observatory">Explore the 41-case methodology pilot →</a>
        </div>
      </section>

      <section className="edition-subscribe">
        <p className="eyebrow">Receive Edition 001</p>
        <h2>Read the complete argument when it is released.</h2>
        <p>
          The I/1 Edit arrives every other week through Beehiiv. The complete edition also lives here as part of the
          permanent I of 1 archive; LinkedIn and X carry selected excerpts.
        </p>
        <NewsletterSignup source="site" />
      </section>
    </main>
  );
}
