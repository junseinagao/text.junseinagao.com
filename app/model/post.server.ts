import type { LoaderArgs } from "@remix-run/cloudflare";

export type PostMetaData = {
  title: string;
  description: string;
  date: ReturnType<Date["toISOString"]>;
  eyecatch: string;
};

export type PostIndexData = {
  meta: PostMetaData;
  slug: string;
  url: string;
  code: string;
};

export type PostIndexDataWithContent = PostIndexData & {
  content: string;
};

export type PostIndex = Array<PostIndexData>;

const getUrlOrigin = (url: string) => new URL(url).origin;
const fetchSameOriginResource = (
  url: string,
  path: string,
  init?: RequestInit
) => {
  const origin = getUrlOrigin(url);
  return fetch(`${origin}/${path}`, init);
};

export const getPostIndex = async ({
  request,
}: Pick<LoaderArgs, "request">) => {
  try {
    const res = await fetchSameOriginResource(
      request.url,
      "_markdowns/index.json"
    );
    const data = await res.json<PostIndex>();
    return data;
  } catch (error) {
    return null;
  }
};

export const getPostIndexData = async ({
  request,
  slug: pageSlug,
}: Pick<LoaderArgs, "request"> & { slug: string }) => {
  const postIndex = await getPostIndex({ request });
  if (!postIndex) return null;
  const post = postIndex.find(({ slug }) => slug === pageSlug);
  if (!post) return null;
  return post;
};

export const getPostIndexDataWithContent = async ({
  request,
  slug: pageSlug,
}: Pick<LoaderArgs, "request"> & { slug: string }) => {
  const postIndex = await getPostIndex({ request });
  if (!postIndex) return null;
  const post = postIndex.find(({ slug }) => slug === pageSlug);
  if (!post) return null;
  const res = await fetchSameOriginResource(request.url, post.code);
  if (!res.ok) return null;
  const content = await res.text();
  return { ...post, content } as PostIndexDataWithContent;
};
