import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Scope tests to the pure engine plus API route handlers (all mocked, no network or
// database) so unit tests never pull in React components.
export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: {
    include: ["src/lib/**/*.test.ts", "src/app/api/**/*.test.ts"],
    environment: "node",
  },
});
