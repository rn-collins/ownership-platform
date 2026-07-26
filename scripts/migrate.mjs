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
// Recover the one known failed, transaction-rolled-back import before retrying it.
// This is migration-specific and becomes a no-op after successful application.
try {
  execSync("prisma migrate resolve --rolled-back 20260727010000_marques_brownlee_review_package_110", { stdio: "ignore" });
  console.log("[migrate] cleared the rolled-back Marques 1.1.0 attempt for safe retry.");
} catch {
  // Expected when this migration is not recorded as failed.
}

try {
  execSync("prisma migrate resolve --rolled-back 20260727080000_shonda_rhimes_review_package", { stdio: "ignore" });
  console.log("[migrate] cleared the rolled-back Shonda Rhimes attempt for safe retry.");
} catch {
  // Expected when this migration is not recorded as failed.
}

try {
  execSync("prisma migrate resolve --rolled-back 20260727130000_colin_samir_review_package_100", { stdio: "ignore" });
  console.log("[migrate] cleared the rolled-back Colin & Samir attempt for safe retry.");
} catch {
  // Expected when this migration is not recorded as failed.
}

try {
  execSync("prisma migrate deploy", { stdio: "inherit" });
} catch (e) {
  console.error("[migrate] migrate deploy failed.");
  process.exit(1);
}
