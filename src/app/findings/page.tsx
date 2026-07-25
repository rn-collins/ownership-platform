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
        Every assessment adds one anonymous, consented record to a growing dataset. This is that dataset, read back as it
        fills — the same numbers that will anchor the flagship report at Cannes Lions 2027. It is early and provisional by
        design; you are watching the research take shape rather than reading a finished verdict.
      </p>
      <p className="lede"><MeasuredCounter suffix="people measured across both instruments so far." /></p>

      <FindingsView />
    </main>
  );
}
