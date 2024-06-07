import type { PostIndex, PostIndexData } from "~/model/post.server";
import type {
  NoteCustomFeed,
  NoteCustomItem,
  QiitaCustomFeed,
  QiitaCustomItem,
  ZennCustomFeed,
  ZennCustomItem,
} from "~/model/rss";
import { useRssParse } from "~/lib/rss-utils.client";
import PostListItem from "./post-list-item";
import { useMemo } from "react";
import { parseToDayjs, sortByDayjs } from "~/lib/date-utils";
import type dayjs from "dayjs";
import type Parser from "rss-parser";
import type { PostType } from "~/model/rss";
import CustomRSSListItem from "./custom-rss-list-item";

type PostListProps = {
  posts: PostIndex;
  qiita?: string | null;
  zenn?: string | null;
  note?: string | null;
};

type AllPostOptions = {
  dayjsDate: dayjs.Dayjs;
  postType: PostType;
};

type MarkdownPost = PostIndexData &
  AllPostOptions & {
    postType: PostType.MarkdownPost;
  };

type ZennPost = Parser.Output<ZennCustomFeed>["items"][number] &
  AllPostOptions & {
    postType: PostType.Zenn;
  };

type NotePost = Parser.Output<NoteCustomFeed>["items"][number] &
  AllPostOptions & {
    postType: PostType.Note;
  };

type QiitaPost = Parser.Output<QiitaCustomFeed>["items"][number] &
  AllPostOptions & {
    postType: PostType.Qiita;
  };

type AllPost = MarkdownPost | ZennPost | NotePost | QiitaPost;

export default function PostList({ posts, qiita, zenn, note }: PostListProps) {
  const { data: zennRSS } = useRssParse<ZennCustomFeed, ZennCustomItem>({
    text: zenn,
  });
  const { data: noteRSS } = useRssParse<NoteCustomFeed, NoteCustomItem>({
    text: note,
  });
  const { data: qiitaRSS } = useRssParse<QiitaCustomFeed, QiitaCustomItem>({
    text: qiita,
  });

  const allPosts = useMemo<Array<AllPost>>(() => {
    const postItems = posts.map(
      (post) =>
        ({
          ...post,
          dayjsDate: parseToDayjs(post.meta.date),
          postType: "markdown-post",
        }) as MarkdownPost
    );

    const zennItems = zennRSS
      ? zennRSS.items.map(
          (item) =>
            ({
              ...item,
              dayjsDate: parseToDayjs(item.isoDate!),
              postType: "zenn",
            }) as ZennPost
        )
      : [];

    const noteItems = noteRSS
      ? noteRSS.items.map(
          (item) =>
            ({
              ...item,
              dayjsDate: parseToDayjs(item.isoDate!),
              postType: "note",
            }) as NotePost
        )
      : [];

    const qiitaItems = qiitaRSS
      ? qiitaRSS.items.map(
          (item) =>
            ({
              ...item,
              dayjsDate: parseToDayjs(item.isoDate!),
              postType: "qiita",
            }) as QiitaPost
        )
      : [];
    return [...postItems, ...zennItems, ...noteItems, ...qiitaItems].sort(
      (a, b) => (sortByDayjs(a.dayjsDate, b.dayjsDate) ? 1 : -1)
    );
  }, [posts, zennRSS, noteRSS, qiitaRSS]);

  return (
    <ul className="flex flex-col gap-8 px-4">
      {allPosts?.map((post, index) => {
        if (post.postType === "markdown-post")
          return <PostListItem post={post} key={index}></PostListItem>;
        if (post.postType === "zenn" && zennRSS)
          return (
            <CustomRSSListItem
              item={post}
              key={index}
              feed={zennRSS}
              postType={post.postType}
            ></CustomRSSListItem>
          );
        if (post.postType === "qiita" && qiitaRSS)
          return (
            <CustomRSSListItem
              item={post}
              key={index}
              feed={qiitaRSS}
              postType={post.postType}
            ></CustomRSSListItem>
          );
        if (post.postType === "note" && noteRSS)
          return (
            <CustomRSSListItem
              item={post}
              key={index}
              feed={noteRSS}
              postType={post.postType}
            ></CustomRSSListItem>
          );
        return null;
      })}
    </ul>
  );
}
