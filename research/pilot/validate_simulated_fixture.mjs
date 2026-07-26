#!/usr/bin/env node
// Validates only the safety and shape of generated synthetic fixtures.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const outputDir = process.argv[2] ?? "research/pilot/simulated-output";
const files = readdirSync(outputDir);
const required = [
  "ownership-synthetic-responses.csv",
  "ownership-synthetic-preregistration.json",
  "portfolio_professional-synthetic-responses.csv",
  "portfolio_professional-synthetic-preregistration.json",
  "SYNTHETIC_ONLY.txt",
];
for (const name of required) if (!files.includes(name)) throw new Error(`Missing fixture: ${name}`);

for (const instrument of ["ownership", "portfolio_professional"]) {
  const registration = JSON.parse(readFileSync(join(outputDir, `${instrument}-synthetic-preregistration.json`), "utf8"));
  if (registration.synthetic_record !== true) throw new Error("Synthetic registration marker required");
  if (registration.registered_at !== "SYNTHETIC-NOT-REGISTERED") throw new Error("Synthetic registration may not resemble a real preregistration");
  if (registration.scoring_activated !== false) throw new Error("Scoring must remain disabled");
  if (!registration.candidate_version.endsWith("-candidate.1")) throw new Error("Archived candidate.1 fixture required");
  if (registration.item_ids.length !== 20 || new Set(registration.item_ids).size !== 20) throw new Error("Exactly 20 unique items required");

  const csv = readFileSync(join(outputDir, `${instrument}-synthetic-responses.csv`), "utf8").trim().split("\n");
  const header = csv[0].split(",");
  if (!header.includes("synthetic_record") || !header.includes("synthetic_id")) throw new Error("Synthetic row markers required");
  if (header.some((field) => /(^|_)(score|total|band|rank|diagnosis)($|_)/i.test(field))) throw new Error("Scoring fields are prohibited");
  if (csv.length !== 121) throw new Error("Expected 120 synthetic rows");
  for (const row of csv.slice(1)) if (!row.startsWith("TRUE,SIM-")) throw new Error("Every row must be marked synthetic");
}
console.log("Synthetic fixture validation passed; scoring remains disabled.");
