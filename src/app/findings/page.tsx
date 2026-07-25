import { FindingsView } from "@/components/FindingsView";
import { MeasuredCounter } from "@/components/MeasuredCounter";

export const metadata = {
  title: "Findings — the state of ownership | Institutions of One",
  description:
    "A live reading of how much creators and professionals actually own — the anonymous, consent-first dataset behind Institutions of One, growing toward a flagship report at Cannes Lions 2027.",
};

export default function FindingsPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Findings</p>
      <h1>The state of ownership, in public.</h1>
      <p className="lede">
        Each completed assessment can add one anonymous record to the integrity-checked dataset. Public readings include only
        complete records written under the current instrument and one-record-per-assessment result schema. Earlier raw
        records remain preserved for a separate reconciliation and are excluded here. These readings are provisional;
        you are watching the research take shape rather than reading a finished verdict.
      </p>
      <p className="lede"><MeasuredCounter suffix="people measured across both instruments so far." /></p>

      <FindingsView />
    </main>
  );
}
