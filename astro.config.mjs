// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://text.junseinagao.com",
  integrations: [mdx(), sitemap(), react(), tailwind()],
  vite: {
    resolve: {
      // @see https://github.com/facebook/react/issues/31827#issuecomment-2563094822
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      // @ts-expect-error
      alias: import.meta.env.PROD && {
        "react-dom/server": "react-dom/server.edge",
      },
    },
  },
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});
