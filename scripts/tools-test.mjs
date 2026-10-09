// The tools checks: node scripts/tools-test.mjs
//  1. the vendored kit still matches its lock file (nobody hand-edited src/components/tools/_kit)
//  2. every spec.json under src/components/tools passes the kit's validator (schema, quote lock, derivations, voice rules)
//  3. every *.test.mjs under src/components/tools and src/lib/tools, run with node:test (no installs beyond React, which the site already has)
// Used by `npm test`, so `npm run build` runs it too.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isSymbolicLink() || e.name === "node_modules" ? [] : e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
let failed = 0;
const run = (label, args) => {
  console.log(`\n=== ${label}`);
  const r = spawnSync(process.execPath, args, { cwd: root, stdio: "inherit" });
  if (r.status !== 0) failed++;
};

run("vendored kit matches kit.lock.json", ["scripts/kit-sync.mjs", "--check", "--dest", "src/components/tools/_kit"]);
run("kit validator over every tool spec", ["src/components/tools/_kit/check/cli.mjs", "--specs", "src/components/tools"]);
const tests = [...walk(path.join(root, "src/components/tools")), ...walk(path.join(root, "src/lib/tools"))].filter((f) => /\.test\.mjs$/.test(f) && !f.includes(`${path.sep}_kit${path.sep}`)).map((f) => path.relative(root, f)).sort();
run(`${tests.length} tools test files`, ["--test", ...tests]);
console.log(failed ? `\n${failed} tools step(s) failed` : "\nall tools steps passed");
process.exit(failed ? 1 : 0);
