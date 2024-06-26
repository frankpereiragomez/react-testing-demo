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
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    exclude: ["**/types.ts", "**/*.d.ts", "src/main.tsx"],
  },
});
