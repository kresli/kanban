import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: process.env.VITE_BASE_URL || "/",
  build: {
    target: "esnext",
  },
  esbuild: {
    target: "esnext",
  },
  plugins: [tailwindcss(), react(), tsconfigPaths()],
});
