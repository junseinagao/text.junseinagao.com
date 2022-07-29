import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { ClientOnly } from "remix-utils";

type Props = {
  content: string;
  rawContent: string;
};

const MDXRender = ({ content }: Pick<Props, "content">) => {
  const Component = useMemo(() => getMDXComponent(content), [content]);
  return <Component />;
};

export default function PostContent({ content, rawContent }: Props) {
  return (
    <ClientOnly
      fallback={<div dangerouslySetInnerHTML={{ __html: rawContent }}></div>}
    >
      {() => <MDXRender content={content} />}
    </ClientOnly>
  );
}
