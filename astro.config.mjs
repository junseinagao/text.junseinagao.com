// @ts-check
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    imageService: "compile",
  }),
  integrations: [mdx(), sitemap(), react()],
  output: "server",
  // MEMO: Cloudflare Adapter が自動で SESSION KV を有効化するが、このサイトは使わないので無効化する。
  session: {
    driver: "memory",
  },
  site: "https://text.junseinagao.com",
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // @see https://github.com/facebook/react/issues/31827#issuecomment-2563094822
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD
        ? {
            "react-dom/server": "react-dom/server.edge",
          }
        : {
            "@cloudflare/pages-plugin-vercel-og/api":
              "/src/lib/vercel-og-stub.ts",
          },
    },
  },
});
