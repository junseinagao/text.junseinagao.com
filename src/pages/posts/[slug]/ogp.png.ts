import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";
import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import React from "react";

async function loadFont() {
  const titles = await fetch(
    "https://text.junseinagao.com/posts/titles.txt",
  ).then((res) => res.text());
  const text = titles.split("\n").join("長尾ソフトウェア開発事務所");
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Noto+Sans+JP&text=${encodeURIComponent(text)}`,
  ).then((res) => res.text());

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

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
        padding: "30px",
        background: "linear-gradient(135deg,#e7ebdf, #ecf0d2)",
      },
      children: React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "20px",
          backgroundColor: "#fdfff1",
          borderRadius: "50px",
        },
        children: [
          React.createElement("h1", {
            style: {
              fontFamily: "NotoSansJP",
              fontWeight: "bold",
              fontSize: "80px",
              color: "#031014",
            },
            children: text,
          }),
          React.createElement("div", {
            style: {
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            },
            children: [
              React.createElement("span", {
                style: {
                  fontFamily: "NotoSansJP",
                  fontSize: "40px",
                  fontWeight: "bold",
                  marginRight: "25px",
                  color: "#566064",
                  letterSpacing: "0.025em",
                },
                children: "長尾ソフトウェア開発事務所",
              }),
              React.createElement("img", {
                style: {
                  display: "flex",
                  borderRadius: "9999px",
                  marginBottom: "5px",
                },
                width: 120,
                height: 120,
                src: "https://i.gyazo.com/5ae64d06c0b9f0f7cb1004b46511e5e7.jpg",
              }),
            ],
          }),
        ],
      }),
    }),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "NotoSansJP",
          data: await loadFont(),
          style: "normal",
        },
      ],
    },
  );
};
