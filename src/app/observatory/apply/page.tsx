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
      <p className={styles.kicker}>Apply it to my work</p>
      <h1>Begin with your work.<br/>Then read the cases differently.</h1>
      <p>Choose the structural pressure you want to examine—not a judgment about your worth, talent, or potential. We will give you a private reading pathway: one structural tension, three cases to examine in sequence, one case that resists the obvious lesson, and questions to take back to your work.</p>
      <div className={styles.promise}><span>No diagnosis</span><span>No score</span><span>No account required</span><span>Nothing is saved</span></div>
    </header>
    <ApplyToWork />
  </main>;
}
