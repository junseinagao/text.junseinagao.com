---
title: 新年あけましておめでとうございます(2025)
date: 2025-01-03
eyecatch: https://i.gyazo.com/4a335635b5bbba5405f5d1184e70d497.png
tags: ["記事", "Astro", "Cloudflare", "Cloudflare Pages", "OGP"]
---

## あけましておめでとうございます

気づけばあっという間に2025年を迎えました。昨年（2024年）は、このサイトに1記事しか投稿できなかったものの、[Docswellのスライド](https://www.docswell.com/user/junseinagao)を活用した登壇が多くありました。

今年（2025年）は、もう少しコンスタントに記事を執筆していきたいと思います。

## Astro でサイトを再構成しました

新年に合わせて、このサイトを[Astro](https://astro.build/)に移行してみました。

以前は、[ソースコードと同じリポジトリにあるMarkdownファイル](https://github.com/junseinagao/text.junseinagao.com/tree/main/src/content/blog)を利用し、Remixでカスタム実装した仕組みで記事を配信していました。

しかし、[Astro v5 が提供しているAPI](https://docs.astro.build/ja/guides/content-collections/)なら、ほぼ同様のことをより手軽に実現できるとわかり、このタイミングで思い切って移行を決めました。

`md` や `mdx` ファイルを直接インポートする機能は、Next.js などでも利用可能です。とはいえ、ディレクトリ単位で並べた Markdown ファイルをリポジトリ的に管理・取得できる仕組み（いわゆる「リモートレポジトリ」）が、ほかには見当たりません。その点、Astro v5 の[コンテンツコレクション](https://docs.astro.build/ja/guides/content-collections/)は、私にとって理想的なソリューションになりそうです。

以下のように、`getCollection()` や `getEntry()` を利用すると、ローカルにある `md` や `mdx` ファイルを簡単に取得できます。

```tsx
const posts = await getCollection("posts");
```

これは裏側で `content.config.ts` という設定ファイルを用意しておく必要があります。Astro はビルド時にコンテンツを読み込み、配信用にまとめてくれます。

```ts
import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    eyecatch: z.string(),
    tags: z.array(z.string()),
  }),
});

const components = defineCollection({
  loader: glob({ base: "./src/content/components", pattern: "**/*.{md,mdx}" }),
  schema: z.object({}),
});

export const collections = { posts, components };
```

以前、似たような仕組みを自作したことがありますが、非常に使い勝手の良いAPIだと思います。

## Astro x Cloudflare Pages でOGPを生成する時の苦心

このサイトはCloudflare Pagesでホスティングしているのですが、記事のOGP画像を動的生成するのに少し苦労しました。

OGP画像というのはこれのことです。

![](https://i.gyazo.com/971f68c7a654bd7b398726b89359f0ec.png)

この画像は、記事のタイトルを元に生成しています。具体的には、以下のようなコードで生成しています。

```tsx
import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import React from "react";

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;
  if (!slug) {
    return new Response("Not Found", { status: 404 });
  }
  const title = (await getEntry("posts", slug))?.data.title;
  if (!title) {
    return new Response("Not Found", { status: 404 });
  }
  const clipLength = 60;
  const text =
    title.length > clipLength ? title.slice(0, clipLength) + "..." : title;

  return new ImageResponse(
    React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      },
      children: text,
    }),
    {
      width: 1200,
      height: 630,
    },
  );
};
```

サーバーレス関数で画像を生成する際に有名なライブラリとして、`@vercel/og` があります。

しかし `@vercel/og` は Node.js に依存しているため、Cloudflare Pages では直接使用するのは難しそうです（未検証）。

そこで登場するのが、`@cloudflare/pages-plugin-vercel-og` です。

「Cloudflare vercel og」で検索すると、nkznさんによる[Remix on Cloudflare Pagesで、@vercel/ogを使ってOGP画像を生成する](https://zenn.dev/monicle/articles/cloudflare-pages-vercel-og-remix)という記事が出てきます。

どうやらCloudflareのチームが、`@vercel/og` を Cloudflare Worker（あるいは Cloudflare Pages Functions）で使えるようにしたのが[@cloudflare/pages-plugin-vercel-og](https://developers.cloudflare.com/pages/functions/plugins/vercel-og/) とのこと。Cloudflare Pagesのドキュメントでも紹介されています。

ただし、`@cloudflare/pages-plugin-vercel-og` の使用例は、Cloudflare Pagesでのお約束である 「`/functions`以下に配置されたファイルは自動的にCloudflare Functionsとしてデプロイされる」構成を前提としています。

nkznさんの記事も同様の構成になっています。

しかし私の場合は、`/functions` 以下に配置したファイルをCloudflare Functionsとしてデプロイできませんでした。

というのも、`@astrojs/cloudflare` を使ってAstroでビルドした成果物には、Cloudflare Functionsとして動作させるためのコードがすでに含まれており、 さらに `_worker.js` という構成を用いているためです。

その結果、たとえプロジェクトのルートディレクトリに`/functions`を作っても、Astroのビルド成果物に組み込まれないためデプロイできないのです。

そこで、Astroの機能である `API Routes` を利用することにしました。

具体的には、OGP画像を生成するAPI Routeを用意することで対応します。

```
[0] ./src
└── [19] pages
    └── [26] posts
        ├── [27] [slug]
        │   ├── [28] index.astro <-- 記事のページ
        │   └── [29] ogp.png.ts <-- 記事のOGP画像を生成するAPI Route
        └── [30] titles.txt.ts <-- (記事のタイトルを一覧を取得できるAPI Route)
```

`src/pages/posts/[slug]/ogp.png.ts` を作成しておくことで `https://.../posts/記事ID/ogp.png` というURLでアクセスしたときに `ogp.png.ts` に書かれた処理を実行するようになります。

ただし、もう1つ問題があります。AstroのAPI Routeでは `tsx` ファイルを使用できません。`@vercel/og` は React を使って画像を描画するため、Reactを利用する必要があります。

そこで、`React.createElement` を使ってReactElementを生成し、`tsx` を使わずに`@vercerl/og`を活用する形でOGP画像が生成・配信することができました。

```tsx
import React from "react";

export const GET: APIRoute = async ({ params }) => {
  // 略
  return new ImageResponse(
    React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      },
      children: text,
    }),
    {
      width: 1200,
      height: 630,
    },
  );
};
```
