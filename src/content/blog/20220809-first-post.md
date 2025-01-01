---
title: ブログを作りました。
date: 2022-08-09
eyecatch: https://images.unsplash.com/photo-1579017308347-e53e0d2fc5e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3648&q=80
tags: ["ポエム"]
---

# ブログを作りました。

発信活動のためにブログを兼ねたポートフォリオサイトを作りました。

# どんな記事が書かれますか

このブログは、基本的に各種メディアで本格的な記事にするまでもない自分の学習中の防備録として記事を書いていきます。

# このサイトは何でできているか。何ができるか。

### 技術スタック

このブログは以下の技術スタックで作っています。

#### Remix

![remix logo](https://cdn.svgporn.com/logos/remix.svg)

少し触ったら一瞬で好きになりました。Next.js を打倒して欲しい。

#### Tailwind CSS

![tailwindcss logo](https://cdn.svgporn.com/logos/tailwindcss.svg)

昔から愛用しています。デザイントークンをすぐに使えるのが良い。

#### Cloudflare Pages

![cloudflare](https://cdn.svgporn.com/logos/cloudflare.svg)

インフラには、Cloudflare Pages を採用しています。とりあえず、Cloudflare Worker を活用した構成にしてみたくて使っています。
結果としてエッジサイドでは Node.js を使うことがほとんどできないので色々苦しいです。その代わり早さを手に入れてるはず。

### Features

#### ブログの投稿機能

Remix のビルド時に markdown ファイルをビルドしてアセットの一部として配信しています。
Git で記事を管理したくて、このような構成にしていますが、ファイル数とビルドサイズが増大することは目に見えているのでそのうちアプリケーションのレポジトリからは切り離して配信サーバーを立てる予定です。

#### 各週メディアの一覧表示機能

Zenn や note などの各種メディアにも投稿することがあるので、そちらの RSS から記事を取得して表示しています。

# 終わりに

1 週間に 2~3 記事を目安頑張るぞ！
