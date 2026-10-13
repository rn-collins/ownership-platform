// Is today (Pacific/Honolulu) a release day in data/releases.json? Used by .github/workflows/daily-release.yml.
// Prints the ids that go live today. In GitHub Actions it also writes release=true|false, date and ids to GITHUB_OUTPUT.
// A rebuild is due when any piece, or any visual story this site links to, has releasedAt equal to today and hold false.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isIsoDate, todayInHawaii } from "../src/lib/release-rule.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const releases = JSON.parse(fs.readFileSync(path.join(root, "data/releases.json"), "utf8"));
const today = isIsoDate(process.argv[2]) ? process.argv[2] : todayInHawaii();

const due = [...releases.pieces, ...releases.related].filter((r) => !r.hold && r.releasedAt === today).map((r) => r.id);
console.log(due.length ? `${today}: ${due.length} release(s) today: ${due.join(", ")}` : `${today}: nothing is released today`);
if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `release=${due.length ? "true" : "false"}\ndate=${today}\nids=${due.join(" ")}\n`);
}
