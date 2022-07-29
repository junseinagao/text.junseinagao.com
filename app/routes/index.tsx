import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";
import PostList from "~/components/post-list";
import type { PostIndex } from "~/model/post.server";
import { getPostIndex } from "~/model/post.server";

export const loader: LoaderFunction = async ({ request }) => {
  const data = await getPostIndex({ request });
  if (!data) return json(null);
  return json(data);
};

export default function Index() {
  const posts = useLoaderData<PostIndex | null>();

  return (
    <div>
      {posts && <PostList posts={posts} />}
      <Outlet />
    </div>
  );
}
