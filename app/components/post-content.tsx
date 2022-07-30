import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { ClientOnly } from "remix-utils";

type Props = {
  content: string;
  rawContent: string;
};

const MDXRender = ({ content }: Pick<Props, "content">) => {
  const Component = useMemo(() => getMDXComponent(content), [content]);
  return (
    <div className="markdown-body container mx-auto border-2 border-dashed border-brand-sub p-4 xl:max-w-6xl 2xl:max-w-6xl">
      <Component />
    </div>
  );
};

export default function PostContent({ content, rawContent }: Props) {
  return (
    <ClientOnly
      fallback={
        <div
          className="markdown-body container mx-auto border-2 border-dashed border-brand-sub p-4 xl:max-w-6xl 2xl:max-w-6xl"
          dangerouslySetInnerHTML={{ __html: rawContent }}
        ></div>
      }
    >
      {() => <MDXRender content={content} />}
    </ClientOnly>
  );
}
