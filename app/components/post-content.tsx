import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { ClientOnly } from "remix-utils";

type Props = {
  content: string;
};

const MDXRender = ({ content }: Props) => {
  const Component = useMemo(() => getMDXComponent(content), [content]);
  return <Component />;
};

export default function PostContent({ content }: Props) {
  return (
    <ClientOnly fallback={<div></div>}>
      {() => <MDXRender content={content} />}
    </ClientOnly>
  );
}
