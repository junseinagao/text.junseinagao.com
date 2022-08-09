import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header>
      <div className="flex max-h-28 items-center justify-center bg-brand-base-accent py-4 font-din-2014 font-bold">
        <Link
          to={"/"}
          prefetch="intent"
          className="text-4xl text-brand-text underline  lg:text-7xl"
        >
          text.junseinagao.com
        </Link>
      </div>
      <nav>
        <ul className="flex list-none items-center justify-center gap-x-10 border-t border-b border-solid border-brand-sub py-4 text-2xl">
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
