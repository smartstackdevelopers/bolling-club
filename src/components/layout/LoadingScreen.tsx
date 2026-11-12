import { siteConfig } from "@/config/site";

export function LoadingScreen() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="text-center">
        <svg viewBox="0 0 80 80" className="loader-ball mx-auto">
          <circle cx="40" cy="40" r="34" fill="#7c3aed" />
          <circle cx="28" cy="30" r="5" fill="#07091a" />
          <circle cx="42" cy="24" r="5" fill="#07091a" />
          <circle cx="34" cy="42" r="5" fill="#07091a" />
        </svg>
        <p className="mt-4 font-display text-2xl">{siteConfig.shortName}</p>
        <p className="mt-1 text-sm tracking-[0.18em] text-muted uppercase">{siteConfig.area}</p>
      </div>
    </div>
  );
}
