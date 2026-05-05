import { copyFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** GitHub Pages: copy SPA shell to 404.html so client routes load on refresh. */
function ghPagesSpaFallback() {
  return {
    name: "gh-pages-spa-fallback",
    closeBundle() {
      const index = resolve(__dirname, "dist/index.html");
      const notFound = resolve(__dirname, "dist/404.html");
      copyFileSync(index, notFound);
    },
  };
}

export default defineConfig({
  plugins: [react(), ghPagesSpaFallback()],
  base: "/",
});
