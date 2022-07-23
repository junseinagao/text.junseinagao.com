import { Link } from "@remix-run/react";

export default function Header() {
  return (
    <header className="flex justify-center bg-brand-base-accent py-4 font-din-2014 font-bold">
      <Link
        to={"/"}
        className="text-4xl text-brand-text underline transition-colors hover:text-opacity-80 md:text-5xl xl:text-7xl"
      >
        text.junseinagao.com
      </Link>
    </header>
  );
}
