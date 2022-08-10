import { NProgress } from "@tanem/react-nprogress";
import { useTransition } from "@remix-run/react";
import { useMemo } from "react";

const Bar = ({
  animationDuration,
  progress,
  isFinished,
}: {
  animationDuration: number;
  progress: number;
  isFinished: boolean;
}) => {
  return (
    <div
      role="progressbar"
      style={{
        background: "#f9babc",
        height: 2,
        left: 0,
        marginLeft: isFinished ? `${(-1 + progress) * 100}%` : "100%",
        position: "fixed",
        top: 0,
        transition: `margin-left ${animationDuration}ms linear`,
        width: "100%",
        zIndex: 1031,
      }}
    >
      <div
        style={{
          boxShadow: "0 0 10px #f9babc, 0 0 5px #f9babc",
          display: "block",
          height: "100%",
          opacity: 1,
          position: "absolute",
          right: 0,
          transform: "rotate(3deg) translate(0px, -4px)",
          width: 100,
        }}
      />
    </div>
  );
};

export default function NProgressBar() {
  const { location, state } = useTransition();
  const isAnimation = useMemo(() => state === "loading", [state]);
  return (
    <NProgress
      isAnimating={isAnimation}
      key={location?.key}
      animationDuration={200}
    >
      {(renderProps) => <Bar {...renderProps} />}
    </NProgress>
  );
}
