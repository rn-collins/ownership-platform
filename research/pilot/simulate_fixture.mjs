#!/usr/bin/env node
// Generates deterministic synthetic data for software-path validation only.
// Output is never admissible as participant evidence, psychometric evidence, or an activation record.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outputDir = process.argv[2] ?? "research/pilot/simulated-output";
mkdirSync(outputDir, { recursive: true });

const instruments = {
  ownership: {
    version: "0.3.0-candidate.1",
    items: ["A1","A2","A3","A4","R1","R2","R3","R4","V1","V2","V3","V4","I1","I2","I3","I4","B1","B2","B3","B4"],
    models: { five_constructs: "audience =~ A1 + A2 + A3 + A4\nrights =~ R1 + R2 + R3 + R4\nrevenue =~ V1 + V2 + V3 + V4\nidentity =~ I1 + I2 + I3 + I4\nbusiness =~ B1 + B2 + B3 + B4" },
  },
  portfolio_professional: {
    version: "0.2.0-candidate.1",
    items: ["C1","C2","C3","C4","V1","V2","V3","V4","M1","M2","M3","M4","A1","A2","A3","A4","T1","T2","T3","T4"],
    models: { five_constructs: "capability =~ C1 + C2 + C3 + C4\nvalue =~ V1 + V2 + V3 + V4\nmandate =~ M1 + M2 + M3 + M4\nauthority =~ A1 + A2 + A3 + A4\ntrajectory =~ T1 + T2 + T3 + T4" },
  },
};

function csvEscape(value) {
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

for (const [instrument, spec] of Object.entries(instruments)) {
  const headers = ["synthetic_record","synthetic_id","career_stage","work_arrangement","platform_dependence","jurisdiction_group","disability_care_context","resource_access",...spec.items];
  const rows = [];
  for (let i = 0; i < 120; i += 1) {
    const row = {
      synthetic_record: "TRUE",
      synthetic_id: `SIM-${instrument.toUpperCase()}-${String(i + 1).padStart(3, "0")}`,
      career_stage: ["early","mid","senior","transitioning"][i % 4],
      work_arrangement: ["employee","independent","creator","founder","mixed"][i % 5],
      platform_dependence: ["low","mixed","high"][i % 3],
      jurisdiction_group: ["US","non_US","multiple"][i % 3],
      disability_care_context: ["represented","not_disclosed","not_represented"][i % 3],
      resource_access: ["limited","some","substantial"][i % 3],
    };
    spec.items.forEach((item, j) => {
      const marker = (i * 7 + j * 3) % 41;
      row[item] = marker === 0 ? "DK" : marker === 1 ? "NAP" : String(((i + j * 2) % 6) + 1);
    });
    rows.push(row);
  }
  const csv = [headers.join(","), ...rows.map((row) => headers.map((h) => csvEscape(row[h])).join(","))].join("\n") + "\n";
  writeFileSync(join(outputDir, `${instrument}-synthetic-responses.csv`), csv);
  writeFileSync(join(outputDir, `${instrument}-synthetic-preregistration.json`), JSON.stringify({
    synthetic_record: true,
    instrument,
    candidate_version: spec.version,
    registered_at: "SYNTHETIC-NOT-REGISTERED",
    item_ids: spec.items,
    models: spec.models,
    missing_data: { minimum_answered_items: 14, states: ["omitted","DK","NAP"] },
    fairness_groups: ["career_stage","work_arrangement","platform_dependence","jurisdiction_group","disability_care_context","resource_access"],
    minimum_group_n: 20,
    scoring_activated: false,
    permitted_use: "software path validation only",
  }, null, 2) + "\n");
}

writeFileSync(join(outputDir, "SYNTHETIC_ONLY.txt"), "These files are generated data for software-path validation. They are not participant or psychometric evidence and cannot satisfy a research gate.\n");
console.log(`Synthetic fixtures written to ${outputDir}`);
