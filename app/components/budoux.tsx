import type { PropsWithChildren } from "react";
import { useMemo } from "react";
import { loadDefaultJapaneseParser } from "budoux";
const parser = loadDefaultJapaneseParser();

export default function Budoux({ children }: PropsWithChildren<{}>) {
  const strings = useMemo(
    () => parser.parse(children?.toString()!!),
    [children]
  );
  return (
    <span style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}>
      {strings.map((str, i) => (
        <>
          {str}
          {i !== strings.length - 1 && <wbr />}
        </>
      ))}
    </span>
  );
}
