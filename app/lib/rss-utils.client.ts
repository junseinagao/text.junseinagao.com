import { useCallback, useEffect, useMemo, useState } from "react";
import type { CustomFieldItem, ParserOptions } from "rss-parser";
import Parser from "rss-parser";

export type ZennCustomFeed = {
  language: string;
  lastBuildDate: string;
};

export type ZennCustomItem = {
  content: string;
  contentSnippet: string;
  "dc:creator": string;
  enclosure: { url: string; length: string; type: string };
};

type useRssParseProps<Feed, Item> = {
  customFields?: {
    feed: (keyof ParserOptions<Feed, Item>)[] | undefined;
    item:
      | CustomFieldItem<{ [key: string]: any }>[]
      | CustomFieldItem<{ [key: string]: any }>[][]
      | undefined;
  };
  text?: string | null;
};

export const useRssParse = <Feed, Item>({
  customFields,
  text,
}: useRssParseProps<Feed, Item>) => {
  const parser = useMemo(() => {
    return new Parser<Parser.ParserOptions<Feed, Item>>({ customFields });
  }, [customFields]);

  const getRSSData = useCallback(async () => {
    if (!(parser && text)) return (async () => null)();
    return await parser.parseString(text);
  }, [parser, text]);
  const [data, setData] = useState<
    (ParserOptions<Feed, Item> & Parser.Output<Feed>) | null
  >(null);

  useEffect(() => {
    getRSSData().then((v) => {
      setData(v as any);
    });
  }, [getRSSData]);

  return { getRSSData, data };
};
