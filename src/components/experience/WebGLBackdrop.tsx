"use client";

import { useEffect, useState } from "react";
import { useVisualCapability } from "@/hooks/useVisualCapability";
import { EnergyField } from "@/components/experience/webgl/EnergyField";

export function WebGLBackdrop() {
  const capability = useVisualCapability();
  const [visible, setVisible] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const canLoad = capability.ready && capability.webgl && capability.tier !== "off";

  useEffect(() => {
    const onVisibility = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (!canLoad) return;
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => setAllowed(true), { timeout: 900 })
      : window.setTimeout(() => setAllowed(true), 220);
    return () => {
      if (typeof idle === "number") window.clearTimeout(idle);
      else window.cancelIdleCallback(idle);
    };
  }, [canLoad]);

  if (!canLoad || !allowed || !visible) return null;

  return (
    <div className="webgl-stage" aria-hidden="true">
      <EnergyField
        dpr={capability.dpr}
        particles={capability.particles}
        amp={capability.tier === "full" ? 1 : 0.72}
      />
    </div>
  );
}
