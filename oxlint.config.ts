import { defineConfig } from "oxlint";
import astro from "ultracite/oxlint/astro";
import core from "ultracite/oxlint/core";
import react from "ultracite/oxlint/react";

export default defineConfig({
  extends: [core, astro, react],
  rules: {
    /**
     * ファイルの命名既存
     * - コンポーネント (.tsx / components・pages 配下の .astro) は PascalCase
     * - ユーティリティ .ts や Astro ルートは kebab-case
     */
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          kebabCase: true,
          pascalCase: true,
        },
      },
    ],
  },
});
