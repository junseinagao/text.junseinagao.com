import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header>
      <div className="flex justify-center bg-brand-base-accent py-4 font-din-2014 font-bold">
        <Link
          to={"/"}
          className="text-4xl text-brand-text underline  md:text-5xl xl:text-7xl"
        >
          text.junseinagao.com
        </Link>
      </div>
      <nav>
        <ul className=" flex list-none justify-center gap-x-10 border-t border-b border-solid border-brand-sub py-4 text-2xl">
          <li>
            <Link to="/" className="link-hover">
              All Articles
            </Link>
          </li>
          <li>
            <Link to="/me" className="link-hover">
              About me
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
