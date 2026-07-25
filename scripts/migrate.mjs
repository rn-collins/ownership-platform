// Deploy-time migration runner that is safe to run before the database exists.
// Runs `prisma migrate deploy` ONLY when there are committed migrations AND a
// DATABASE_URL is present; otherwise it skips cleanly so the site still builds
// and deploys (all backends are guarded to no-op until wired). This removes the
// database as a blocker to shipping the front end.
import { existsSync, readdirSync } from "node:fs";
import { execSync } from "node:child_process";

const dir = "prisma/migrations";
const hasMigrations =
  existsSync(dir) &&
  readdirSync(dir).some((f) => f !== "migration_lock.toml" && !f.startsWith("."));

if (!hasMigrations) {
  console.log("[migrate] no migrations committed yet — skipping (site still builds).");
  process.exit(0);
}
if (!process.env.DATABASE_URL) {
  console.log("[migrate] no DATABASE_URL set — skipping migrate deploy.");
  process.exit(0);
}
try {
  execSync("prisma migrate deploy", { stdio: "inherit" });
} catch (e) {
  console.error("[migrate] migrate deploy failed.");
  process.exit(1);
}
