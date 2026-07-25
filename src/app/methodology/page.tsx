import { INSTRUMENT } from "@/lib/instrument";
import { METHODOLOGY_VERSION } from "@/lib/engine";
import {
  PROFESSIONAL_INSTRUMENT,
  PROFESSIONAL_OVERALL,
  PROFESSIONAL_METHODOLOGY_VERSION,
} from "@/lib/instrument_professional";
import {
  CLAIM_POLICY,
  CONSTRUCT_REGISTRY,
  DATA_FIELD_REGISTRY,
  PUBLIC_SURFACE_REGISTRY,
  THEORY_REGISTRY,
  type InstrumentId,
} from "@/lib/research-governance";
import { MeasuredCounter } from "@/components/MeasuredCounter";

export const metadata = { title: "Methodology — Institutions of One" };

const OWNERSHIP_BANDS: [string, string, string][] = [
  ["80–100", "Owned institution", "Provisional label for a high sum of the twenty stated ownership conditions."],
  ["55–79", "Building ownership", "Provisional label for an upper-middle sum of the stated conditions."],
  ["30–54", "Mostly rented", "Provisional label for a lower-middle sum of the stated conditions."],
  ["0–29", "At the platform’s mercy", "Provisional label for a low sum of the stated conditions."],
];

const instrumentName = (instrument: InstrumentId) =>
  instrument === "ownership" ? "Ownership Index" : "Portfolio Professional";

export default function MethodologyPage() {
  return (
    <main>
      <p className="eyebrow">Institutions of One · Methodology</p>
      <h1>What is measured, what is theorized, and what remains unproven.</h1>
      <p className="lede">
        Institutions of One currently uses two pilot composite self-report instruments. Each contains twenty items:
        four items in each of five proposed dimensions, with response conditions scored from 0 to 5 and summed to 100.
        The instruments produce structured descriptions of selected conditions. They are not validated psychological
        scales, causal models, diagnostic tools, or rankings of human worth.
      </p>
      <p className="meta">
        Ownership Index v{METHODOLOGY_VERSION} · Portfolio Professional v{PROFESSIONAL_METHODOLOGY_VERSION}. Equal
        weighting and score bands are provisional. Every saved result is version-stamped so the calculation can be
        reproduced.
      </p>

      <h2 className="dimhead" style={{ marginTop: 30 }}>The research architecture</h2>
      <div className="card">
        <h3>1 · Measurement constructs</h3>
        <p>
          These are the ten proposed dimensions operationalized by the current questions and options. A dimension score
          means only that the respondent selected more or fewer of its scored response conditions.
        </p>
      </div>
      <div className="card">
        <h3>2 · Causal hypotheses</h3>
        <p>
          These are propositions about possible relationships, such as whether greater control reduces vulnerability or
          whether codification increases continuity. Current cross-sectional self-report data cannot establish them.
        </p>
      </div>
      <div className="card">
        <h3>3 · Interpretive theory</h3>
        <p>
          “Institution of One” is the program&apos;s organizing theory: a way of interpreting how portable capability,
          controlled assets, institutionalized value, authority, and direction may accumulate around an individual. The
          current total scores do not by themselves validate that theory or establish one common latent trait.
        </p>
      </div>

      <h2 className="dimhead" style={{ marginTop: 34 }}>Psychology is part of the framework</h2>
      <div className="card">
        <p>
          The psychological layer was not removed. It is now named more carefully. The proposed connections include
          perceived control, psychological ownership, self-efficacy, autonomy, job crafting, career adaptability,
          professional and narrative identity, possible selves, collective efficacy, knowledge codification, social
          capital, and identity-based motivation. These literatures help explain why the constructs may matter and guide
          validation studies. They are not interchangeable with the constructs, and the present instruments should not be
          described as validated measures of those psychological variables.
        </p>
      </div>

      <h2 className="dimhead" style={{ marginTop: 34 }}>Canonical construct registry</h2>
      {CONSTRUCT_REGISTRY.map((construct) => (
        <div key={construct.id} className="card">
          <p className="eyebrow">{construct.id} · {instrumentName(construct.instrument)} · pilot</p>
          <h3>{construct.label}</h3>
          <p><b>Measured here:</b> {construct.measurementConstruct}</p>
          <p><b>Operational definition:</b> {construct.operationalDefinition}</p>
          <p><b>Psychological connection:</b> {construct.psychologicalConnection}</p>
          <p><b>Mapped items:</b> {construct.itemIds.join(", ")}</p>
          <p><b>Permissible now:</b> {construct.permissibleClaims.join(" ")}</p>
          <p><b>Not permissible now:</b> {construct.prohibitedClaims.join(" ")}</p>
          <p><b>Evidence still required:</b> {construct.evidenceRequiredNext.join("; ")}.</p>
        </div>
      ))}

      <h2 className="dimhead" style={{ marginTop: 34 }}>Theory and hypothesis register</h2>
      {THEORY_REGISTRY.map((entry) => (
        <div key={entry.id} className="card">
          <p className="eyebrow">{entry.id} · {entry.role.replaceAll("_", " ")}</p>
          <h3>{entry.label}</h3>
          <p>{entry.statement}</p>
          <p><b>Status:</b> {entry.status}.</p>
        </div>
      ))}

      <h2 className="dimhead" style={{ marginTop: 34 }}>Claim rules</h2>
      {Object.entries(CLAIM_POLICY).map(([strength, policy]) => (
        <div key={strength} className="card">
          <h3>{strength[0].toUpperCase() + strength.slice(1)} claims · {policy.permitted ? "permitted with conditions" : "not currently permitted"}</h3>
          <p>{policy.rule}</p>
        </div>
      ))}

      <h2 className="dimhead" style={{ marginTop: 34 }}>Page and claim registry</h2>
      {PUBLIC_SURFACE_REGISTRY.map((entry) => (
        <div key={entry.surface} className="card">
          <h3>{entry.surface} · {entry.knowledgeRole}</h3>
          <p><b>Permitted:</b> {entry.permitted}.</p>
          <p><b>Prohibited:</b> {entry.prohibited}.</p>
        </div>
      ))}

      <h2 className="dimhead" style={{ marginTop: 34 }}>Database-field registry</h2>
      {DATA_FIELD_REGISTRY.map((entry) => (
        <div key={entry.field} className="card">
          <h3>{entry.field}</h3>
          <p><b>Role:</b> {entry.role}.</p>
          <p><b>Construct mapping:</b> {entry.construct ?? "none; administrative or provenance field"}.</p>
          <p><b>Analysis use:</b> {entry.analysisUse}.</p>
          <p><b>Inclusion rule:</b> {entry.inclusionRule}.</p>
        </div>
      ))}

      <h2 className="dimhead" style={{ marginTop: 34 }}>Historical-record diagnostic</h2>
      <div className="card">
        <p>
          Stored assessment rows are evaluated without alteration at the grain of one database row. A row is
          <b> canonical</b> only when its instrument is identifiable, all twenty expected answers are valid, its score
          reproduces, its methodology is current, and it carries the one-record-per-assessment metadata. A
          <b> recoverable</b> row is complete and reproducible but predates that metadata. An <b>ambiguous</b> row cannot
          be resolved without an unsupported assumption. An <b>unusable</b> row has no valid response set. Only canonical
          rows enter live findings. Classification does not rewrite, merge, or delete a source row.
        </p>
        <p><a href="/api/research-integrity" className="fwlink">View the aggregate diagnostic →</a></p>
      </div>

      <h2 className="dimhead" style={{ marginTop: 34 }}>The Ownership Index — provisional bands</h2>
      {OWNERSHIP_BANDS.map(([range, label, description]) => (
        <div key={range} className="card"><h3>{range} · {label}</h3><p>{description}</p></div>
      ))}
      <h2 className="dimhead" style={{ marginTop: 24 }}>The Ownership Index — complete item bank</h2>
      {INSTRUMENT.map((dimension, index) => (
        <div key={dimension.key} className="card">
          <h3>{`0${index + 1}`} · {dimension.name}</h3>
          {dimension.items.map((item) => (
            <div key={item.id} style={{ marginTop: 14 }}>
              <p><b>{item.id} · {item.q}</b></p>
              <p>{item.options.map((option, score) => `${score}: ${option}`).join(" · ")}</p>
            </div>
          ))}
        </div>
      ))}

      <h2 className="dimhead" style={{ marginTop: 34 }}>The Portfolio Professional — provisional bands</h2>
      {PROFESSIONAL_OVERALL.map((band, index) => {
        const high = index === 0 ? 100 : PROFESSIONAL_OVERALL[index - 1].min - 1;
        return <div key={band.key} className="card"><h3>{band.min}–{high} · {band.label}</h3><p>{band.copy} This label remains unnormed and provisional.</p></div>;
      })}
      <h2 className="dimhead" style={{ marginTop: 24 }}>The Portfolio Professional — complete item bank</h2>
      {PROFESSIONAL_INSTRUMENT.map((dimension, index) => (
        <div key={dimension.key} className="card">
          <h3>{`0${index + 1}`} · {dimension.name}</h3>
          {dimension.items.map((item) => (
            <div key={item.id} style={{ marginTop: 14 }}>
              <p><b>{item.id} · {item.q}</b></p>
              <p>{item.options.map((option, score) => `${score}: ${option}`).join(" · ")}</p>
            </div>
          ))}
        </div>
      ))}

      <h2 className="dimhead" style={{ marginTop: 34 }}>The Observatory</h2>
      <div className="card">
        <p>
          The Observatory is currently a theory-building and case-mapping layer. It connects public cases, nominations,
          instrument results where available, and emerging patterns. A mapped person is not a validated exemplar, and a
          case does not establish prevalence, representativeness, or causation.
        </p>
      </div>

      <h2 className="dimhead" style={{ marginTop: 34 }}>Validation program</h2>
      <div className="card">
        <p>
          The sequence is content-validity review; cognitive and response-process interviews; missingness, distribution,
          and item-performance analysis; internal consistency; test–retest reliability; exploratory and confirmatory
          factor analysis on separate samples; convergent, discriminant, and criterion comparisons; subgroup fairness and
          measurement-invariance analysis; then longitudinal or quasi-experimental tests for predictive or causal claims.
          Items, dimensions, weights, and bands may change through versioned releases as evidence accumulates.
        </p>
      </div>

      <h2 className="dimhead" style={{ marginTop: 34 }}>Current limitations</h2>
      <div className="card">
        <p>
          The data are self-reported, cross-sectional, and drawn from a self-selecting sample. The response options impose
          an ordinal progression that has not yet been empirically calibrated. Equal item weighting is a design choice,
          not an empirical result. The proposed dimensions have not yet been confirmed as distinct factors. Score bands
          are not norms or population percentiles. Comparisons may reflect occupation, seniority, income, geography,
          disability, caregiving, discrimination, organizational power, access to capital, or other structural conditions
          that the present totals do not isolate.
        </p>
      </div>

      <div className="card">
        <h3>Eligible sample to date</h3>
        <p>
          <MeasuredCounter suffix="canonical anonymous assessments recorded across both instruments." /> Reliability
          estimates, factor results, norms, and associations will appear only when the required sample, analysis plan, and
          uncertainty reporting make them defensible.
        </p>
      </div>

      <h2 className="dimhead" style={{ marginTop: 24 }}>How to cite</h2>
      <div className="card">
        <p style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>
          Collins, RN. Institutions of One: The Ownership Index (v{METHODOLOGY_VERSION}) and The Portfolio Professional
          (v{PROFESSIONAL_METHODOLOGY_VERSION}). Independent research program, {new Date().getFullYear()}.
          ownership-platform.vercel.app
        </p>
        <p style={{ marginTop: 8 }}>
          Cite the instrument and version. Do not describe either instrument as validated, predictive, causal, clinical,
          diagnostic, or representative of a population unless a later published study supports that language.
        </p>
      </div>
    </main>
  );
}
