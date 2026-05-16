import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error("Site is not defined");
  }
  const posts = await getCollection("posts");
  return rss({
    description: SITE_DESCRIPTION,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.id}/`,
    })),
    site,
    title: SITE_TITLE,
  });
};
