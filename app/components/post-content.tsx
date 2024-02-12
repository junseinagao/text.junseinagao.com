import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { ClientOnly } from "remix-utils/client-only";

type Props = {
  content: string;
  rawContent: string;
};

const MDXRender = ({ content }: Pick<Props, "content">) => {
  const Component = useMemo(() => getMDXComponent(content), [content]);
  return (
    <div className="markdown-body container mx-auto border-2 border-dashed border-brand-sub p-4 xl:max-w-3xl 2xl:max-w-3xl">
      <Component />
    </div>
  );
};

export default function PostContent({ content, rawContent }: Props) {
  return (
    <ClientOnly
      fallback={
        <div
          className="markdown-body container mx-auto border-2 border-dashed border-brand-sub p-4 xl:max-w-3xl 2xl:max-w-3xl"
          dangerouslySetInnerHTML={{ __html: rawContent }}
        ></div>
      }
    >
      {() => <MDXRender content={content} />}
    </ClientOnly>
  );
}
