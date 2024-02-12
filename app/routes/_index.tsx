import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import PostList from "~/components/posts/post-list.client";
import type { PostIndexLoaderData } from "~/model/post.server";
import {
  getPostIndex,
  getQiitaRSS,
  getNoteRSS,
  getZennRSS,
} from "~/model/post.server";
import { ClientOnly } from "remix-utils";
import { getCustomMeta } from "~/lib/ogp-utils";

export const loader: LoaderFunction = async ({ request }) => {
  const [posts, zenn, note, qiita] = await Promise.all([
    getPostIndex({ request }),
    getZennRSS(),
    getNoteRSS(),
    getQiitaRSS(),
  ]);
  if (!posts) return json(null);
  if (!(zenn && note && qiita)) return json({ posts, zenn, note, qiita });

  return json({ posts, zenn, note, qiita, url: request.url });
};

export const meta: MetaFunction = ({ data: { url } }) => {
  return {
    ...getCustomMeta({ url, image: `${new URL(url).origin}/ogp.png` }),
  };
};

export default function Index() {
  const { posts, zenn, qiita, note } = useLoaderData<PostIndexLoaderData>();

  return (
    <section>
      <ClientOnly fallback={<div className="h-[800px] w-full"></div>}>
        {() =>
          posts && (
            <PostList posts={posts} zenn={zenn} qiita={qiita} note={note} />
          )
        }
      </ClientOnly>
      <Outlet />
    </section>
  );
}
