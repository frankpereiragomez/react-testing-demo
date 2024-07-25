/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/jest.setup.ts",
    include: ["src/**/*.test.ts", "src/**/*.test.tsx", "src/zz/**"],
    exclude: ["**/types.ts", "**/*.d.ts", "src/main.tsx"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "**/types.ts",
        "**/*.d.ts",
        "src/main.tsx",
        "**/routers/**",
        "**/routers.**/**",
        "src/components.**",
        "src/services.**",
        "src/pages.**",
        "**/App",
        "**/*.test.{ts,tsx}",
      ],
    },
  },
});
