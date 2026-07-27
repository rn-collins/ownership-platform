import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata = {
  title: "The I/1 Edit — Institutions of One",
  description: "Original ideas, cases, conversations, and visual findings about how a person becomes an institution.",
};

export default function EditPage() {
  return (
    <main className="findings-page">
      <p className="eyebrow">The publication · The I/1 Edit</p>
      <h1>The full idea—not the social-media fragment.</h1>
      <p className="lede">
        Every other week, The I/1 Edit follows one question about work, power, ownership, and what happens when a
        person becomes the infrastructure. Each edition begins with an original argument and grounds it in a case,
        conversation, or visual finding from Institutions of One.
      </p>

      <section className="card" style={{ marginBottom: 34 }}>
        <p className="eyebrow">What arrives</p>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 34 }}>One idea worth keeping.</h2>
        <p>
          The complete edition includes the argument, the evidence or case behind it, what it changes in the research,
          and an invitation only when there is a meaningful way to participate. Beehiiv delivers it to subscribers.
          LinkedIn and X publish selected excerpts that point back to the full work.
        </p>
      </section>

      <section className="card" style={{ marginBottom: 34 }}>
        <p className="eyebrow">Edition 001 · In development</p>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 34 }}>The first edition will open the central question.</h2>
        <p>
          What does a person have to build, carry, and control before their work begins to function like an institution?
          The first edition will introduce the argument and show how the Observatory tests it across radically different careers.
        </p>
      </section>

      <NewsletterSignup source="site" />
    </main>
  );
}
