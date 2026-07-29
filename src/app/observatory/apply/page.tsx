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
  </main>;
}
