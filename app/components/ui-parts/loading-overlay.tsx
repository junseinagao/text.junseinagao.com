import OutlineText from "~/assets/junseinagao-outline.svg";

export default function LoadingOverlay() {
  return (
    <div
      role="progressbar"
      className="loading-overlay animate-flash pointer-events-none absolute top-0 left-0 h-full w-full bg-brand-base opacity-0 duration-500 hover:opacity-0"
    >
      <img src={OutlineText} alt="text.junseinagao.com" />
    </div>
  );
}
