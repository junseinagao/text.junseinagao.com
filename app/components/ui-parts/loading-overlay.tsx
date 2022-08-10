import { useEffect, useState } from "react";
import OutlineText from "~/assets/junseinagao-outline.svg";

export default function LoadingOverlay() {
  const [isFirstLoaded, setIsFirstLoaded] = useState<Boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      role="progressbar"
      className="loading-overlay bg-overlay-animation pointer-events-none fixed top-0 left-0 flex h-full w-full items-center justify-center opacity-0 duration-300"
      style={
        !isFirstLoaded
          ? {
              opacity: 1,
            }
          : {}
      }
    >
      <img
        src={OutlineText}
        alt="text.junseinagao.com"
        className="w-screen object-cover object-center"
      />
    </div>
  );
}
