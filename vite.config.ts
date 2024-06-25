/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const _PORT = 3000;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: _PORT,
  },
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ["src/__tests/setup.tsx"],
    include: ["src/**/*.test.tsx"],
    environment: "happy-dom",
  },
});
