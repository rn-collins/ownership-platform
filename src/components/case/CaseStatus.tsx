import Link from "next/link";
import styles from "./CaseStatus.module.css";

// One neutral status line for a case. It states what the record is (sourced to public
// records), how much evidence is attached, and where review stands — in words, so the
// meaning never depends on colour.
const REVIEW_LABELS: Record<string, string> = {
  verified: "Independently reviewed",
  partially_supported: "Independent review: partially supported",
  disputed: "Independent review: disputed",
  rejected: "Independent review: not supported",
};

function Sep() { return <span className={styles.sep} aria-hidden="true">·</span>; }

export function CaseStatus({ total, independent, status }: { total: number; independent: number; status: string }) {
  const review = REVIEW_LABELS[status] ?? "Not independently reviewed";
  return <p className={styles.status}>
    <span className={styles.icon} aria-hidden="true">§</span>
    <span className={styles.parts}>
      <span>Sourced to public records</span><Sep />
      <span>{total} source{total === 1 ? "" : "s"} ({independent} independent)</span><Sep />
      <span>{review}</span><Sep />
      <Link href="/methodology#evidence-standard">How we check <span aria-hidden="true">→</span></Link>
    </span>
  </p>;
}
