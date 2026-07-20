import { defineConfig } from "vitest/config";

// Scope tests to the pure engine so unit tests never pull in React/Next.
export default defineConfig({
  test: {
    include: ["src/lib/**/*.test.ts"],
    environment: "node",
  },
});
