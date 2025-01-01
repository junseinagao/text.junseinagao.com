import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    eyecatch: z.string(),
    tags: z.array(z.string()),
  }),
});

const components = defineCollection({
  loader: glob({ base: "./src/content/components", pattern: "**/*.{md,mdx}" }),
  schema: z.object({}),
});

export const collections = { posts, components };
