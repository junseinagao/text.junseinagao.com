import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import tailwindStyleshetUrl from "./styles/tailwind.css";
import globalStyles from "./styles/global.css";

import Header from "./components/header";
import Footer from "./components/footer";

export function links() {
  return [
    { rel: "stylesheet", href: "https://use.typekit.net/kev1txv.css" },
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: tailwindStyleshetUrl },
  ];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "text.junseinagao.com",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="ja">
      <head>
        <Meta />
        <Links />
        <script
          async
          src="https://unpkg.com/budoux/bundle/budoux-ja.min.js"
        ></script>
        <script async src="/font.js"></script>
      </head>
      <body className="bg-brand-base">
        <Header />
        <main className="container mx-auto flex flex-col items-center py-10">
          <Outlet />
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
