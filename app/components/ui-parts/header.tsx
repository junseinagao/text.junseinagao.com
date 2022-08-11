import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header>
      <div className="box-border flex max-h-20 items-center justify-center bg-brand-base-accent py-4 font-din-2014 font-bold lg:max-h-24 lg:py-6">
        <Link
          to={"/"}
          prefetch="intent"
          className="text-4xl leading-none text-brand-text underline lg:text-6xl"
        >
          text.junseinagao.com
        </Link>
      </div>
      <nav>
        <ul className="flex h-20 list-none items-center justify-center gap-x-10 border-t border-b border-solid border-brand-sub py-4 text-2xl">
          <li>
            <Link
              to="/"
              prefetch="intent"
              className="link-hover text-brand-text"
            >
              All Articles
            </Link>
          </li>
          <li>
            <Link
              to="/me"
              prefetch="intent"
              className="link-hover text-brand-text"
            >
              About me
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
