import { extract } from "@extractus/feed-extractor";
import dayjs from "dayjs";
import { PostType } from "./rss-model";
export * from "./rss-model";


export type Post = {
  title: string;
  description: string;
  link: string;
  thumbnailImage: string;
  postType: PostType;
  publishDate: Date;
  tags: string[];
};

export type RSSItem = {
  title?: string;
  contentSnippet?: string;
  link?: string;
  enclosure?: {
    url?: string;
  };
  isoDate?: string;
  categories?: string[];
};

export type RSSParserOutput<Item> = {
  items: Item[];
};

export async function parseURL(url: string): Promise<RSSParserOutput<RSSItem>> {
  try {
    const result = await extract(url, {
      useISODateFormat: true,
      normalization: true,
      getExtraEntryFields: (feedEntry: any) => {
        const extra: any = {};

        if (feedEntry.category) {
          extra.categories = Array.isArray(feedEntry.category)
            ? feedEntry.category
            : [feedEntry.category];
        }

        return extra;
      },
    });

    if (!result || !result.entries) {
      return { items: [] };
    }

    const items: RSSItem[] = result.entries.map((entry: any) => ({
      title: entry.title ?? "",
      contentSnippet: entry.description ?? "",
      link: entry.link ?? "",
      enclosure: { url: "" },
      isoDate: entry.published ?? "",
      categories: entry.categories ?? [],
    }));

    return { items };
  } catch (error) {
    console.warn(`Unable to parse feed from ${url}:`, error);
    return { items: [] };
  }
}

export function parseFeedItems(
  feed: RSSParserOutput<RSSItem>,
  postType: PostType
): Post[] {
  return feed.items.map((item) => ({
    title: item.title ?? "",
    description: item.contentSnippet ?? "",
    link: item.link ?? "#",
    thumbnailImage: item.enclosure?.url ?? "",
    publishDate: dayjs(item.isoDate).toDate(),
    postType,
    tags: item.categories ?? [],
  }));
}
