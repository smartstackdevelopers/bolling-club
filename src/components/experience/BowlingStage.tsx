"use client";

import { useEffect, useState, type ComponentType } from "react";
import { LaneTheatre } from "@/components/animations/LaneTheatre";
import { useVisualCapability } from "@/hooks/useVisualCapability";

export function BowlingStage() {
  const capability = useVisualCapability();
  const [Scene, setScene] = useState<ComponentType<{ quality: "high" | "low" }> | null>(null);
  const canLoad = capability.ready && capability.tier === "full";

  useEffect(() => {
    if (!canLoad) return;
    let active = true;
    import("@/components/experience/bowling/BowlingCanvas").then((module) => {
      if (active) setScene(() => module.BowlingCanvas);
    });
    return () => {
      active = false;
    };
  }, [canLoad]);

  if (!canLoad || !Scene) return <LaneTheatre />;

  return (
    <div className="lane-stage">
      <div className="absolute inset-0" style={{ touchAction: "pan-y" }}>
        <Scene quality="high" />
      </div>
    </div>
  );
}
