import Profile from "~/assets/profile.mdx";
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import stylesheet from "~/styles/me.css";
import highlightStylesheet from "highlight.js/styles/github.css";
import { getCustomMeta } from "~/lib/ogp-utils";
import { json } from "remix-utils";

export const loader: LoaderFunction = async ({ request: { url } }) => {
  return json({ url });
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: highlightStylesheet },
];

export const meta: MetaFunction = ({ data: { url } }) => {
  try {

    const urlOrigin = new URL(url)?.origin;
    return {
      ...getCustomMeta({
        title: "About me",
        description: "私について",
        image: urlOrigin
        ? `${urlOrigin}/ogp.png`
        : "https://text.junseinagao/ogp.png",
        url,
      }),
    };
  } catch (_e) {
    return {
      ...getCustomMeta({
        title: "About me",
        description: "私について",
        image:"https://text.junseinagao/ogp.png",
        url,
      }),

  }
};

export default function Me() {
  return (
    <section className="container mx-auto border-2 border-dashed border-brand-sub p-4 xl:max-w-3xl 2xl:max-w-3xl">
      <div className="markdown-body grid grid-cols-1 gap-y-6 text-lg">
        <Profile></Profile>
      </div>
    </section>
  );
}
