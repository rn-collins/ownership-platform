import { FindingsView } from "@/components/FindingsView";
import { MeasuredCounter } from "@/components/MeasuredCounter";

export const metadata = {
  title: "Findings — Institutions of One",
  description: "Early aggregate results from the Institutions of One pilot assessments.",
};

export default function FindingsPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Findings</p>
      <h1>What the pilot data shows so far.</h1>
      <p className="lede">
        This page reports aggregate results from completed anonymous assessments once there are enough responses to avoid
        presenting a handful of scores as a meaningful pattern. Ownership Index and Portfolio Professional results are
        displayed separately because the assessments measure different conditions.
      </p>
      <p className="lede"><MeasuredCounter suffix="anonymous assessments completed so far." /></p>
      <FindingsView />
    </main>
  );
}
