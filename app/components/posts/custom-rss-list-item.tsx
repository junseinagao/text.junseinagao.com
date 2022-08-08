import type Parser from "rss-parser";
import { formatDate } from "~/lib/date-utils";
import type { QiitaCustomFeed, ZennCustomFeed } from "~/model/rss";
import type { NoteCustomFeed, PostType } from "~/model/rss";
import QiitaIcon from "~/assets/qiita-icon.png";
import ZennIcon from "~/assets/zenn-icon.svg";
import NoteIcon from "~/assets/note-icon.svg";

type Props = {
  feed:
    | Parser.Output<ZennCustomFeed>
    | Parser.Output<QiitaCustomFeed>
    | Parser.Output<NoteCustomFeed>;
  item:
    | Parser.Output<ZennCustomFeed>["items"][number]
    | Parser.Output<QiitaCustomFeed>["items"][number]
    | Parser.Output<NoteCustomFeed>["items"][number];
  postType: PostType;
};

export default function CustomRSSListItem({ item, feed, postType }: Props) {
  return (
    <li key={item.guid} className="block">
      <div className="flex h-full w-full max-w-xl items-start gap-y-8 gap-x-4">
        <a href={item.link} target="_brank" className="flex flex-col">
          <time className="inline-flex h-8 w-32 items-center justify-center rounded-md border border-solid border-brand-sub text-base text-current lg:text-xl">
            {formatDate(item.isoDate!)}
          </time>

          {postType === "zenn" && (
            <img
              src={ZennIcon}
              alt={"zenn icon"}
              className="h-32 w-32 rounded-3xl object-cover p-4"
            />
          )}
          {postType === "qiita" && (
            <img
              src={QiitaIcon}
              alt={"qiita icon"}
              className="h-32 w-32 rounded-3xl object-contain p-4"
            />
          )}
          {postType === "note" && (
            <img
              src={NoteIcon}
              alt={"note icon"}
              className="h-32 w-32 rounded-3xl object-cover p-4"
            />
          )}
        </a>
        <div className="group flex flex-1 flex-col items-stretch gap-4">
          <ul className="flex h-8 list-none gap-x-2 text-base lg:text-xl">
            <li className="inline-block">
              {postType.replace(/^[a-z]/, (char) => char.toUpperCase())}
            </li>
          </ul>
          <a
            href={item.link}
            target="_brank"
            className="link-hover flex flex-col gap-y-2"
          >
            <h1 className="text-2xl text-current lg:text-4xl">{item.title}</h1>
            <p className="text-base text-current lg:text-xl">
              {item?.contentSnippet && item.contentSnippet.slice(0, 50)}
              {item?.contentSnippet &&
                item.contentSnippet.length >= 50 &&
                "..."}
            </p>
          </a>
        </div>
      </div>
    </li>
  );
}
