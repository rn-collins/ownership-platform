import { NewsletterSignup } from "@/components/NewsletterSignup";

export const metadata = {
  title: "The I/1 Edit — Institutions of One",
  description: "Original ideas, cases, conversations, and visual findings about how a person becomes an institution.",
  alternates: { canonical: "/edit" },
  openGraph: {
    title: "The I/1 Edit",
    description: "Original ideas, cases, conversations, and visual findings about how a person becomes an institution.",
    url: "/edit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The I/1 Edit",
    description: "Original ideas, cases, conversations, and visual findings about how a person becomes an institution.",
  },
};

export default function EditPage() {
  return (
    <main className="findings-page edit-index-page">
      <p className="eyebrow">The publication · The I/1 Edit</p>
      <h1>Ideas for people whose work no longer fits inside a title.</h1>
      <p className="lede">
        Every other week, The I/1 Edit takes one question about work, power, and ownership—and follows it far enough
        to become useful. Each edition asks how a person can make work travel, last, and matter beyond the next assignment.
      </p>

      <section className="edit-promise">
        <div>
          <p className="eyebrow">What arrives</p>
          <h2>One complete edition. Not a feed of updates.</h2>
        </div>
        <div>
          <p>
            Subscribers receive the full edition by email through Beehiiv. Every edition also becomes a permanent,
            shareable page here. LinkedIn and X carry selected excerpts that lead readers back to the complete work.
          </p>
          <p>
            A typical edition contains one argument, the evidence or case behind it, what it changes, and an invitation
            only when there is a meaningful way to participate.
          </p>
        </div>
      </section>

      <a className="edit-feature edit-feature-latest" href="/edit/002">
        <span className="edit-feature-number">002</span>
        <div>
          <p className="eyebrow">Latest edition · July 2026</p>
          <h2>Your career has a supply chain.</h2>
          <p>
            Dependence is unavoidable. The danger is a dependency you cannot see, replace, negotiate with, or survive without.
          </p>
          <strong>Read Edition 002 →</strong>
        </div>
      </a>

      <a className="edit-feature" href="/edit/001">
        <span className="edit-feature-number">001</span>
        <div>
          <p className="eyebrow">Edition 001 · July 2026</p>
          <h2>When does one person become an institution?</h2>
          <p>
            What does a person have to build, carry, and control before their work begins to function like an institution?
          </p>
          <strong>Read Edition 001 →</strong>
        </div>
      </a>

      <section className="edit-signup">
        <div>
          <p className="eyebrow">Every other week</p>
          <h2>Receive the complete edition.</h2>
          <p>No platform fragments. No vague “updates.” The full work arrives in your inbox and remains readable here.</p>
        </div>
        <NewsletterSignup source="site" />
      </section>
    </main>
  );
}
