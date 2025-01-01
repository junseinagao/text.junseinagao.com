import { XMLParser } from "fast-xml-parser";
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

function transformItem(item: any): RSSItem {
  const title = item.title ?? "";
  const link = item.link ?? "";
  const pubDate = item.pubDate ?? "";

  let snippet = item.description ?? "";
  if (!snippet && item["content:encoded"]) {
    snippet = item["content:encoded"];
  }
  snippet = snippet.replace(/<[^>]*>/g, "");

  let enclosureUrl = "";
  if (item.enclosure && item.enclosure["@_url"]) {
    enclosureUrl = item.enclosure["@_url"];
  }

  let categories: string[] = [];
  if (typeof item.category === "string") {
    categories = [item.category];
  } else if (Array.isArray(item.category)) {
    categories = item.category;
  }

  return {
    title,
    contentSnippet: snippet,
    link,
    enclosure: { url: enclosureUrl },
    isoDate: pubDate,
    categories,
  };
}

export async function parseURL(url: string): Promise<RSSParserOutput<RSSItem>> {
  const response = await fetch(url);
  const xml = await response.text();

  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(xml);

  const channel = parsed?.rss?.channel;
  if (!channel || !channel.item) {
    return { items: [] };
  }

  const itemsArray = Array.isArray(channel.item) ? channel.item : [channel.item];
  const items = itemsArray.map(transformItem);

  return { items };
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
