import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import PostList from "~/components/post-list.client";
import type { PostIndexLoaderData } from "~/model/post.server";
import {
  getPostIndex,
  getQiitaRSS,
  getNoteRSS,
  getZennRSS,
} from "~/model/post.server";
import { ClientOnly } from "remix-utils";

export const loader: LoaderFunction = async ({ request }) => {
  const [posts, zenn, note, qiita] = await Promise.all([
    getPostIndex({ request }),
    getZennRSS(),
    getNoteRSS(),
    getQiitaRSS(),
  ]);
  if (!posts) return json(null);
  if (!(zenn && note && qiita)) return json({ posts, zenn, note, qiita });

  return json({ posts, zenn, note, qiita });
};

export default function Index() {
  const data = useLoaderData<PostIndexLoaderData>();

  return (
    <section>
      <ClientOnly>
        {() => data?.posts && <PostList posts={data.posts} zenn={data.zenn} />}
      </ClientOnly>
      <Outlet />
    </section>
  );
}
