// Release state of a finished build, for the checks that run after `next build`.
// Reads data/releases.json and the date the build used (next.config.mjs puts RELEASE_BUILD_DATE and RELEASE_REVIEW_RENDER
// into the build's config, which Next writes to .next/required-server-files.json). Same rule as src/lib/releases.ts.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isReleasedRecord } from "../src/lib/release-rule.mjs";

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const releases = JSON.parse(fs.readFileSync(path.join(root, "data/releases.json"), "utf8"));

function buildEnv() {
  const file = path.join(root, ".next/required-server-files.json");
  if (!fs.existsSync(file)) return {};
  try { return JSON.parse(fs.readFileSync(file, "utf8")).config?.env ?? {}; } catch { return {}; }
}
const env = buildEnv();
export const buildDate = env.RELEASE_BUILD_DATE || "";
export const reviewRender = env.RELEASE_REVIEW_RENDER === "1";

// The ids the build treated as public (inlined RELEASED_IDS), and the same answer worked out again from the record.
export const builtPublicIds = new Set((env.RELEASED_IDS ?? "").split(",").filter(Boolean));
export const isReleased = (record, today = buildDate) => isReleasedRecord(record, today);
export const isPublic = (record) => reviewRender || isReleased(record);
export const pieceById = (id) => releases.pieces.find((p) => p.id === id);
export const toolReleased = (slug) => isPublic(pieceById(`ioo/tool-${slug}`));
