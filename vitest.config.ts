import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { defineConfig } from "vitest/config";
import { publicIds, todayInHawaii } from "./src/lib/release-rule.mjs";

// Same public id list next.config.mjs inlines for a build today (see src/lib/released-ids.ts).
const releases = JSON.parse(readFileSync(new URL("./data/releases.json", import.meta.url), "utf8"));
const RELEASED_IDS = publicIds(releases, todayInHawaii()).join(",");

// Scope tests to the pure engine plus API route handlers (all mocked, no network or
// database) so unit tests never pull in React components.
export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: {
    include: ["src/lib/**/*.test.ts", "src/app/api/**/*.test.ts"],
    environment: "node",
    env: { RELEASED_IDS },
  },
});
