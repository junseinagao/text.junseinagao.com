const initialOGP = {
  title: "text.junseinagao.com",
  description: "フロントエンドエンジニア junseinagao のブログ",
  keywords: "フロントエンド エンジニア ブログ React Remix",
  image: "https://text.junseinagao.com/ogp.png",
};

type MetaReturn = {
  [name: string]:
    | null
    | string
    | undefined
    | Record<string, string>
    | Array<Record<string, string> | string>;
};

export const getCustomMeta = ({
  title,
  description,
  keywords,
  image,
  url,
}: {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url: string;
}): MetaReturn => {
  return {
    title: title ? `${title} | ${initialOGP}` : initialOGP.title,
    keywords: keywords ? keywords : initialOGP.keywords,
    image: image ? image : initialOGP.image,
    "og:url": url,
    "og:title": title ? `${title} | ${initialOGP}` : initialOGP.title,
    "og:description": description ? description : initialOGP.description,
    "og:image": image ? image : initialOGP.image,
    "twitter:card": image ? "summary_large_image" : "summary",
    "twitter:creator": "@junpai_code",
    "twitter:site": "@junpai_code",
    "twitter:title": title ? `${title} | ${initialOGP}` : initialOGP.title,
    "twitter:description": description ? description : initialOGP.description,
    "twitter:image": image ? image : initialOGP.image,
    "twitter:alt": title ? `${title} | ${initialOGP}` : initialOGP.title,
  };
};
