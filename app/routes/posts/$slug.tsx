import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import { getPostIndexDataWithContent } from "~/model/post.server";
import type { LoaderFunction, LinksFunction } from "@remix-run/cloudflare";
import type { PostIndexDataWithContent } from "~/model/post.server";
import PostContent from "~/components/post-content";
import { useMemo } from "react";

export const loader: LoaderFunction = async ({ request, params }) => {
  const data = await getPostIndexDataWithContent({
    request,
    slug: params.slug!!,
  });
  if (!data) return null;
  return json(data);
};

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://unpkg.com/@primer/css@^20.2.4/dist/primer.css",
  },
];

export default function BlogIndex() {
  const post = useLoaderData<PostIndexDataWithContent>();
  const entries = useMemo(
    () => Object.entries(post.meta).sort(([a], [b]) => (a > b ? 1 : -1)),
    [post.meta]
  );

  return (
    <>
      <h1>{post.meta?.title}</h1>
      <ul>
        {entries.map(([meta, value], i) => (
          <li key={`meta-${meta}-${i}`}>
            {typeof value === "string" && value}
            {Array.isArray(value) &&
              value.map((v, j) => (
                <span
                  key={`meta-${meta}-list-${j}`}
                  className="not-last-of-type:mr-1"
                >
                  {v}
                </span>
              ))}
          </li>
        ))}
      </ul>
      <PostContent content={post.content} rawContent={post["raw-content"]} />
    </>
  );
}
