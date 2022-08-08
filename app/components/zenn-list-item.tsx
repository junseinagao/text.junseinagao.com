import { Link } from "@remix-run/react";
import type Parser from "rss-parser";
import { formatDate } from "~/lib/date-utils";
import type { ZennCustomFeed, ZennCustomItem } from "~/lib/rss-utils.client";
import type { PostIndexData } from "~/model/post.server";

type Props = {
  feed: Parser.Output<ZennCustomFeed>;
  item: Parser.Output<ZennCustomFeed>["items"][number];
};

export default function ZennListItem({ item, feed }: Props) {
  return (
    <li key={item.guid} className="block">
      <div className="flex h-full w-full max-w-xl items-start gap-y-8 gap-x-4">
        <a href={item.link} target="_brank" className="flex flex-col">
          <time className="inline-flex h-8 w-32 items-center justify-center rounded-md border border-solid border-brand-sub text-base text-current lg:text-xl">
            {formatDate(item.isoDate!)}
          </time>
          {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
          <img
            src={feed.image?.url}
            alt={feed.image?.title}
            className="h-auto w-32 rounded-3xl object-cover p-4"
          />
        </a>
        <div className="group flex flex-1 flex-col items-stretch gap-4">
          <ul className="flex h-8 list-none gap-x-2 text-base lg:text-xl">
            <li className="inline-block">Zenn</li>
          </ul>
          <a
            href={item.link}
            target="_brank"
            className="link-hover flex flex-col gap-y-2"
          >
            <h1 className="text-2xl text-current lg:text-4xl">{item.title}</h1>
            <p className="text-base text-current lg:text-xl">
              {item?.content?.slice(0, 50)}
              {item?.content && item.content.length >= 50 && "..."}
            </p>
          </a>
        </div>
      </div>
    </li>
  );
}
