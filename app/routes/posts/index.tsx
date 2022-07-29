import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { getPostIndex } from "~/model/post.server";
import type { PostIndex } from "~/model/post.server";

export const loader: LoaderFunction = async ({ request }) => {
  const data = await getPostIndex({ request });
  if (!data) return json(null);
  return json(data);
};

export default function BlogIndex() {
  const postIndexes = useLoaderData<PostIndex | null>();
  return (
    <ul>
      {postIndexes?.map(({ meta: { title }, slug }, index) => (
        <li key={index}>
          <Link to={`/posts/${slug}`} className="text-2xl">
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
