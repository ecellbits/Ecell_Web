import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tanstackStart({
      srcDirectory: "src",
      spa: {
        enabled: true,
        maskPath: "/",
      },
    }),
    viteReact(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  server: {
    port: 3000,
  },
  environments: {
    ssr: {
      resolve: {
        noExternal: ["react-helmet-async"],
      },
      define: {
        __TSS_NODE_SSR__: "true",
      },
    },
    client: {
      define: {
        __TSS_NODE_SSR__: "false",
      },
    },
  },
  build: {
    outDir: "dist",
  },
});
