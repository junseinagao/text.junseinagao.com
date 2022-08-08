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
  postType: "markdown-post" | "zenn";
};

type MarkdownPost = PostIndexData &
  AllPostOptions & {
    postType: "markdown-post";
  };

type ZennPost = Parser.Output<ZennCustomFeed>["items"][number] &
  AllPostOptions & {
    postType: "zenn";
  };

type AllPost = MarkdownPost | ZennPost;

export default function PostList({ posts, qiita, zenn, note }: PostListProps) {
  const { data: zennRSS } = useRssParse<ZennCustomFeed, ZennCustomItem>({
    text: zenn,
  });
  const allPosts = useMemo<Array<AllPost>>(() => {
    const arrangedPosts = posts.map(
      (post) =>
        ({
          ...post,
          dayjsDate: parseToDayjs(post.meta.date),
          postType: "markdown-post",
        } as MarkdownPost)
    );

    const arrangedZennItems = zennRSS
      ? zennRSS.items.map(
          (item) =>
            ({
              ...item,
              dayjsDate: parseToDayjs(item.isoDate!),
              postType: "zenn",
            } as ZennPost)
        )
      : [];
    return [...arrangedPosts, ...arrangedZennItems].sort((a, b) =>
      sortByDayjs(a.dayjsDate, b.dayjsDate) ? 1 : -1
    );
  }, [posts, zennRSS]);

  return (
    <ul className="flex flex-col gap-8 px-4">
      {allPosts?.map((post, index) => {
        if (post.postType === "markdown-post")
          return <PostListItem post={post} key={index}></PostListItem>;
        if (post.postType === "zenn" && zennRSS)
          return (
            <ZennListItem item={post} key={index} feed={zennRSS}></ZennListItem>
          );
        return null;
      })}
    </ul>
  );
}
