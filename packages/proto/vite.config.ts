import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: "public",
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "public/index.html"),
        session: resolve(__dirname, "public/session.html"),
        book: resolve(__dirname, "public/book.html"),
        author: resolve(__dirname, "public/author.html"),
      },
    },
    outDir: "../dist",
    emptyOutDir: true,
  },
});
