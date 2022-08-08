import { Link } from "@remix-run/react";
import type { PostIndex, PostIndexData } from "~/model/post.server";
import type { ZennCustomFeed, ZennCustomItem } from "~/lib/rss-utils.client";
import { useRssParse } from "~/lib/rss-utils.client";
import PostListItem from "./post-list-item";
import ZennListItem from "./zenn-list-item";
import { useMemo } from "react";
import { parseToDayjs, sortByDayjs } from "~/lib/date-utils";
import type dayjs from "dayjs";
import type Parser from "rss-parser";

type PostListProps = {
  posts: PostIndex;
  qiita?: string | null;
  zenn?: string | null;
  note?: string | null;
};

type AllPostOptions = {
  dayjsDate: dayjs.Dayjs;
  postType: "post" | "zenn";
};

type MarkdownPost = {
  postType: "post";
};

type ZennPost = {
  postType: "zenn";
};

type AllPost =
  | (PostIndexData & AllPostOptions & MarkdownPost)
  | (Parser.Output<ZennCustomFeed>["items"][number] &
      AllPostOptions &
      ZennPost);

export default function PostList({ posts, qiita, zenn, note }: PostListProps) {
  const { data: zennRSS } = useRssParse<ZennCustomFeed, ZennCustomItem>({
    text: zenn,
  });
  const allPosts = useMemo<Array<AllPost>>(() => {
    if (!zennRSS) return [];
    const arrangedPosts = posts.map((post) => ({
      ...post,
      dayjsDate: parseToDayjs(post.meta.date),
      postType: "post",
    }));

    const arrangedZennItems = zennRSS.items.map((item) => ({
      ...item,
      dayjsDate: parseToDayjs(item.isoDate!),
      postType: "zenn",
    }));
    return [...arrangedPosts, ...arrangedZennItems].sort((a, b) =>
      sortByDayjs(a.dayjsDate, b.dayjsDate) ? 1 : -1
    ) as unknown as AllPost;
  }, [posts, zennRSS]);

  return (
    <ul className="flex flex-col gap-8 px-4">
      {allPosts?.map((post, index) => {
        if (post.postType === "post")
          return <PostListItem post={post} key={index}></PostListItem>;
        if (post.postType === "zenn" && zennRSS)
          return (
            <ZennListItem item={post} key={index} feed={zennRSS}></ZennListItem>
          );
        return <></>;
      })}
    </ul>
  );
}
