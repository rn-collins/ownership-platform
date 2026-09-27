import { Assessment } from "@/components/Assessment";
import { METHODOLOGY_VERSION } from "@/lib/engine";

export const metadata = {
  title: "Ownership Index — Institutions of One",
  description: "A pilot assessment of control over audience, rights, revenue, identity, and business infrastructure.",
  alternates: { canonical: "/assess/creator" },
  openGraph: { title: "Ownership Index — Institutions of One", description: "A pilot assessment of control over audience, rights, revenue, identity, and business infrastructure.", url: "/assess/creator", images: ["/og.png"] },
  twitter: { card: "summary_large_image", title: "Ownership Index — Institutions of One", description: "A pilot assessment of control over audience, rights, revenue, identity, and business infrastructure.", images: ["/og.png"] },
};

export default function CreatorAssessPage() {
  return (
    <main className="instrument-page ownership-page">
      <p className="eyebrow">Institutions of One · Ownership Index</p>
      <h1>How much of the system behind your work do you control?</h1>
      <p className="lede">
        This twenty-question pilot examines five areas: audience, rights, revenue, identity, and infrastructure. Your
        result offers a structured picture of where control is concentrated and where dependence may remain.
      </p>
      <p className="meta">
        Methodology v{METHODOLOGY_VERSION} · anonymous · approximately five minutes · exploratory, not diagnostic or normed
      </p>
      <Assessment />

      <section className="instrument-notes" style={{ marginTop: 40 }}>
        <h2>The five areas, and why these five</h2>
        <p>
          <b>Audience</b> asks whether you can reach the people who follow your work without a
          platform&apos;s permission. <b>Rights</b> asks who owns what you have made and on what
          terms. <b>Revenue</b> asks how many independent channels your income arrives through.
          <b> Identity</b> asks whether your public name is yours to move. <b>Infrastructure</b>
          asks whether the tools, data and records the work runs on would survive changing
          supplier. They are grouped this way because they fail independently: it is common to
          own your rights outright and still be unable to reach a single reader without one
          company&apos;s cooperation.
        </p>

        <h2 style={{ marginTop: 26 }}>What the result is, and what it is not</h2>
        <p>
          The output is five area scores and a short reading of the pattern between them. It is
          not a rank against other people, and there is no threshold anyone is expected to clear.
          Scores are not normed, which means they have not been calibrated against a
          representative sample &mdash; so the useful comparison is between your own five areas,
          or between the same assessment taken at two points in time, rather than against anyone
          else&apos;s number.
        </p>

        <h2 style={{ marginTop: 26 }}>Answering it usefully</h2>
        <p>
          Answer for how things stand now rather than how they are meant to stand once a plan
          lands. Where a question could be read two ways, the version that assumes less in your
          favour will give you the more useful result. Nothing is stored against your identity:
          responses are anonymous, no account is required, and you can close the page at any
          point without a partial result being kept.
        </p>
      </section>
    </main>
  );
}
