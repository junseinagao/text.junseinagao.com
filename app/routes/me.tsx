import Profile from "~/components/profile.mdx";
import type { LinksFunction } from "@remix-run/cloudflare";
import stylesheet from "~/styles/me.css";
import highlightStylesheet from "highlight.js/styles/github.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: highlightStylesheet },
];

export default function Me() {
  return (
    <section className="container mx-auto border-2 border-dashed border-brand-sub p-4 xl:max-w-3xl 2xl:max-w-3xl">
      <div className="markdown-body grid grid-cols-1 gap-y-6 text-lg">
        <Profile></Profile>
      </div>
    </section>
  );
}
