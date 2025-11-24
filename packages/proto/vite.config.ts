import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: "public",
  publicDir: "public-assets",
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/auth": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/hello": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
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
        login: resolve(__dirname, "public/login.html"),
      },
    },
    outDir: "../dist",
    emptyOutDir: true,
  },
});
