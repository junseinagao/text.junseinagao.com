import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getPostIndexDataWithContent } from "~/model/post.server";
import type { LoaderFunction } from "@remix-run/cloudflare";
import type { PostIndexDataWithContent } from "~/model/post.server";
import PostContent from "~/components/post-content";

export const loader: LoaderFunction = async ({ request, params }) => {
  const data = await getPostIndexDataWithContent({
    request,
    slug: params.slug!!,
  });
  if (!data) return null;
  return json(data);
};

export default function BlogIndex() {
  const post = useLoaderData<PostIndexDataWithContent>();

  return (
    <>
      <h1>{post.meta?.title}</h1>
      <p>{post.meta?.description}</p>
      <PostContent content={post.content} />
    </>
  );
}
