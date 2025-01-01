import vercelOGPagesPlugin from "@cloudflare/pages-plugin-vercel-og";

async function loadFont() {
  const text = await fetch(
    "https://text.junseinagao.com/posts/titles.txt",
  ).then((res) => res.text());
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&text=${encodeURIComponent(text)}`,
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

interface Props {
  ogTitle: string;
}

export const onRequest = vercelOGPagesPlugin<Props>({
  imagePathSuffix: "/ogp.png",
  component: ({ ogTitle }) => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          padding: "20px",
          fontFamily: "NotoSansJP",
          borderRadius: "50px",
          backgroundColor: "#ecf0d2",
        }}
      >
        <h1 style={{ fontSize: "80px" }}>{ogTitle}</h1>
      </div>
    );
  },
  extractors: {
    on: {
      'meta[property="og:title"]': (props) => ({
        element(element) {
          // @ts-expect-error
          props.ogTitle = element.getAttribute("content");
        },
      }),
    },
  },
  options: {
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
  autoInject: {
    openGraph: true,
  },
  onError: () => {
    console.log("failed to generate ogp image");
    return new Response("Failed to generate OGP image", { status: 500 });
  },
});
