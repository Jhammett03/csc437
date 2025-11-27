import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: "public",
  publicDir: ".",
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
    },
    fs: {
      allow: [".."],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "/src": resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "public/index.html"),
      },
      external: [],
    },
    outDir: "dist",
    emptyOutDir: true,
    ssr: false,
    assetsDir: "assets",
  },
  optimizeDeps: {
    include: ["@calpoly/mustang", "lit"],
  },
});
