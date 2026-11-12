export type VisualTier = "off" | "css" | "webgl" | "full";

export type VisualCapability = {
  ready: boolean;
  reduced: boolean;
  webgl: boolean;
  coarse: boolean;
  saveData: boolean;
  lowPower: boolean;
  tier: VisualTier;
  dpr: number;
  particles: number;
};

const fallback: VisualCapability = {
  ready: false,
  reduced: false,
  webgl: false,
  coarse: false,
  saveData: false,
  lowPower: false,
  tier: "css",
  dpr: 1,
  particles: 0,
};

export function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function readVisualCapability(): VisualCapability {
  if (typeof window === "undefined") return fallback;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 1023px)").matches;
  const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  const lowPower = saveData || (narrow && coarse);
  const webgl = !reduced && detectWebGL();

  let tier: VisualTier = "css";
  if (reduced) tier = "off";
  else if (webgl && !narrow) tier = "full";
  else if (webgl) tier = "webgl";

  return {
    ready: true,
    reduced,
    webgl,
    coarse,
    saveData,
    lowPower,
    tier,
    dpr: Math.min(window.devicePixelRatio || 1, tier === "full" ? 1.5 : 1),
    particles: tier === "full" ? 28 : tier === "webgl" ? 12 : 0,
  };
}
