import { json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { getPostIndexDataWithContent } from "~/model/post.server";
import type {
  LoaderFunction,
  LinksFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import type { PostIndexDataWithContent } from "~/model/post.server";
import PostContent from "~/components/post-content";
import { formatDate } from "~/lib/date-utils";
import highlightStylesheet from "highlight.js/styles/github.css";
import { getCustomMeta } from "~/lib/ogp-utils";

export const loader: LoaderFunction = async ({ request, params }) => {
  const data = await getPostIndexDataWithContent({
    request,
    slug: params.slug!!,
  });
  if (!data) return json({ url: request.url });
  return json({ ...data, url: request.url });
};

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://unpkg.com/@primer/css@^20.2.4/dist/primer.css",
  },
  {
    rel: "stylesheet",
    href: highlightStylesheet,
  },
];

export const meta: MetaFunction = ({
  data: {
    meta: { title, description, eyecatch, tags },
    url,
  },
}) => {
  return {
    ...getCustomMeta({
      title,
      description,
      image: eyecatch,
      keywords: tags.join(" "),
      url,
    }),
  };
};

export default function BlogIndex() {
  const post = useLoaderData<PostIndexDataWithContent>();
  const {
    meta: { title, tags, date, eyecatch },
    previous,
    next,
  } = post;

  return (
    <>
      <h1 className="text-3xl md:text-5xl">{title}</h1>
      <ul className="flex w-full flex-col justify-center gap-4 py-4 xl:max-w-3xl 2xl:max-w-3xl">
        <li className="inline-flex h-8 items-center justify-center px-4">
          <time className="text-base text-current lg:text-xl">
            {formatDate(date)}
          </time>
        </li>
        <li className="self-start px-4">
          <ul className="flex list-none justify-center gap-2">
            {tags.map((tag, i) => (
              <li
                key={`tag-${i}`}
                className="text-base text-current lg:text-xl"
              >
                {tag}
              </li>
            ))}
          </ul>
        </li>
        <li className="h-80 w-full">
          <img
            className="h-full w-full rounded-md object-cover"
            src={eyecatch}
            alt={title}
          />
        </li>
      </ul>
      <PostContent content={post.content} rawContent={post["raw-content"]} />
      <nav className="grid grid-cols-3 py-8 text-2xl font-bold">
        {previous !== null ? (
          <Link
            to={`/posts/${previous.slug}`}
            className="text-brand-text"
          >{`${previous.meta.title} 👈`}</Link>
        ) : (
          <span>🚧</span>
        )}
        <span
          className="cursor-pointer text-center text-brand-text"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          🌿
        </span>
        {next !== null ? (
          <Link
            to={`/posts/${next.slug}`}
            className="text-brand-text"
          >{`👉 ${next.meta.title}`}</Link>
        ) : (
          <span>🚧</span>
        )}
      </nav>
    </>
  );
}
