import { extract } from "@extractus/feed-extractor";
import dayjs from "dayjs";

import type { PostType } from "./rss-model";
export * from "./rss-model";

export interface Post {
  title: string;
  description: string;
  link: string;
  thumbnailImage: string;
  postType: PostType;
  publishDate: Date;
  tags: string[];
}

export interface RSSItem {
  title?: string;
  contentSnippet?: string;
  link?: string;
  enclosure?: {
    url?: string;
  };
  isoDate?: string;
  categories?: string[];
}

export interface RSSParserOutput<Item> {
  items: Item[];
}

export const parseURL = async (
  url: string
): Promise<RSSParserOutput<RSSItem>> => {
  try {
    const result = await extract(url, {
      getExtraEntryFields: (feedEntry) => {
        const entry = feedEntry as unknown as Record<string, unknown>;
        const extra: Record<string, unknown> = {};

        if (entry.category) {
          extra.categories = Array.isArray(entry.category)
            ? entry.category
            : [entry.category];
        }

        return extra;
      },
      normalization: true,
      useISODateFormat: true,
    });

    if (!result || !result.entries) {
      return { items: [] };
    }

    const items: RSSItem[] = result.entries.map((rawEntry) => {
      const entry = rawEntry as unknown as Record<string, unknown>;
      return {
        categories: (entry.categories as string[]) ?? [],
        contentSnippet: (entry.description as string) ?? "",
        enclosure: { url: "" },
        isoDate: (entry.published as string) ?? "",
        link: (entry.link as string) ?? "",
        title: (entry.title as string) ?? "",
      };
    });

    return { items };
  } catch (error) {
    console.warn(`Unable to parse feed from ${url}:`, error);
    return { items: [] };
  }
};

export const parseFeedItems = (
  feed: RSSParserOutput<RSSItem>,
  postType: PostType
): Post[] =>
  feed.items.map((item) => ({
    description: item.contentSnippet ?? "",
    link: item.link ?? "#",
    postType,
    publishDate: dayjs(item.isoDate).toDate(),
    tags: item.categories ?? [],
    thumbnailImage: item.enclosure?.url ?? "",
    title: item.title ?? "",
  }));
