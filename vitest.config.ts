import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Scope tests to the pure engine so unit tests never pull in React/Next.
export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: {
    include: ["src/lib/**/*.test.ts"],
    environment: "node",
  },
});
