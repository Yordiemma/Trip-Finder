import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // REVIEW: Relative base "./" suits GitHub Pages; use "/" if deploying to domain root on another host.
  base: "./",
});
