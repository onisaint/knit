import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const _PORT = 3000;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: _PORT,
  },
  plugins: [react()],
});
