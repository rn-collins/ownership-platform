import type { Metadata } from "next";
import ApplyToWork from "./ApplyToWork";
import styles from "./apply.module.css";

export const metadata: Metadata = {
  title: "Apply the cases to your work — The Observatory",
  description: "Choose a structural pressure and receive a private, unscored pathway through four Observatory cases.",
  alternates: { canonical: "/observatory/apply" },
};

export default function ApplyPage() {
  return <main className={styles.page}>
    <a className={styles.back} href="/observatory">← The Observatory</a>
    <header className={styles.hero}>
      <p className={styles.kicker}>Apply the cases to your work</p>
      <h1>Choose a question about your work.<br/>Receive four relevant cases.</h1>
      <p>Choose the problem you want to examine. The tool will show one recurring tension, three relevant cases, one case that complicates the apparent lesson, and questions you can apply to your situation. Your selection and optional note stay in your browser.</p>
      <div className={styles.promise}><span>No diagnosis</span><span>No score</span><span>No account required</span><span>Nothing is saved</span></div>
    </header>
    <ApplyToWork />

    <section style={{ marginTop: 44 }}>
      <h2>Why four cases rather than one answer</h2>
      <p>
        A single case read on its own tends to flatten into a lesson, and the lesson is usually
        wrong for the next person who reads it. Each path therefore returns three cases that
        point the same way and one that does not. The fourth is the useful one: it is chosen
        because it shares the situation but not the outcome, which is what stops a pattern from
        being mistaken for a rule. The reading works best when the complicating case is the one
        you spend longest on.
      </p>

      <h2 style={{ marginTop: 26 }}>What a recurring tension is</h2>
      <p>
        Every path opens with a tension rather than a recommendation, because the six problems
        on this page are not solvable in the sense of going away. Visibility that outruns
        control, a mandate that exists in practice but not on paper, a dependency that is
        profitable and constraining at once &mdash; these are conditions to be managed and
        periodically re-decided. Naming the tension is what makes it possible to notice when the
        trade you accepted two years ago has quietly changed terms.
      </p>

      <h2 style={{ marginTop: 26 }}>How the cases were selected</h2>
      <p>
        The paths draw on the forty-one public cases in the Observatory, each documented from
        material that is on the public record. They are examined for what the arrangement was
        and how it held up, not to praise or fault the people in them. Nothing you choose or
        write on this page is transmitted or stored; the selection and your note stay in your
        browser and are shown back to you only as context for the reading.
      </p>
    </section>
  </main>;
}
