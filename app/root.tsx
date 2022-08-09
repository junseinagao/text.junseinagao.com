import type { LoaderFunction, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import tailwindStyleshetUrl from "./styles/_tailwind.css";

import Header from "./components//ui-parts/header";
import Footer from "./components/ui-parts/footer";
import { getCustomMeta } from "./lib/ogp-utils";
import { useEffect } from "react";
import * as gtag from "~/lib/gtag-utils.client";

type LoaderData = {
  gaTrackingId: string | undefined;
};

export const loader: LoaderFunction = async ({ context }) => {
  return json<LoaderData>({ gaTrackingId: context.GA_TRACKING_ID });
};

export function links() {
  return [
    { rel: "stylesheet", href: "https://use.typekit.net/kev1txv.css" },
    { rel: "stylesheet", href: tailwindStyleshetUrl },
  ];
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
  ...getCustomMeta({ url: "https://text.junseinagao.com" }),
});

export default function App() {
  const location = useLocation();
  const { gaTrackingId } = useLoaderData<LoaderData>();

  useEffect(() => {
    if (gaTrackingId?.length) {
      gtag.pageview(location.pathname, gaTrackingId);
    }
  }, [location, gaTrackingId]);
  return (
    <html lang="ja" prefix="og: https://ogp.me/ns#">
      <head>
        <Meta />
        <Links />
        <script async src="/font.js"></script>
      </head>
      <body className="bg-brand-base">
        {!gaTrackingId ? null : (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
            />
            <script
              async
              id="gtag-init"
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
              `,
              }}
            />
          </>
        )}
        <Header />
        <main className="container mx-auto flex flex-col items-center py-10 px-2 md:px-4">
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
