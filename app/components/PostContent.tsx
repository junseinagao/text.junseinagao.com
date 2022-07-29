import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { ClientOnly } from "remix-utils";

type Props = {
  content: string;
};

const PostContent = ({ content }: Props) => {
  const Component = useMemo(() => getMDXComponent(content), [content]);
  return <Component />;
};

export default function PostContentView({ content }: Props) {
  return (
    <ClientOnly fallback={<div></div>}>
      {() => <PostContent content={content} />}
    </ClientOnly>
  );
}
