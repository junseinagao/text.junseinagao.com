import { Link } from "@remix-run/react";
import { formatDate } from "~/lib/date-utils";
import type { PostIndexData } from "~/model/post.server";

type Props = {
  post: PostIndexData;
  key?: React.Key;
};

export default function PostListItem({
  post: {
    meta: { title, description, date, eyecatch, tags },
    slug,
  },
  key,
}: Props) {
  return (
    <li key={key} className="block">
      <div className="flex h-full w-full max-w-xl items-start gap-y-8 gap-x-4">
        <Link to={`/posts/${slug}`} prefetch="intent" className="flex flex-col">
          <time className="inline-flex h-8 w-32 items-center justify-center rounded-md border border-solid border-brand-sub text-base text-current lg:text-xl">
            {formatDate(date)}
          </time>
          <img
            src={eyecatch}
            alt={title}
            className="h-32 w-32 rounded-3xl object-cover p-4"
          />
        </Link>
        <div className="group flex flex-1 flex-col items-stretch gap-4">
          <ul className="flex h-8 list-none gap-x-2 text-base lg:text-xl">
            {tags.map((tag, i) => (
              <li key={`tag-${slug}-${i}`} className="inline-block">
                {tag}
              </li>
            ))}
          </ul>
          <Link
            to={`/posts/${slug}`}
            prefetch="intent"
            className="link-hover flex flex-col gap-y-2"
          >
            <h1 className="text-2xl text-current lg:text-4xl">{title}</h1>
            <p className="text-base text-current lg:text-xl">
              {description?.slice(0, 50)}
              {description?.length >= 50 && "..."}
            </p>
          </Link>
        </div>
      </div>
    </li>
  );
}
