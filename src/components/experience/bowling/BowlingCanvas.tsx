"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import { Color, Group, LatheGeometry, MeshStandardMaterial, Vector2 } from "three";

const PIN_SPOTS: [number, number][] = [
  [0, -1.42],
  [-0.11, -1.6],
  [0.11, -1.6],
  [-0.22, -1.78],
  [0, -1.78],
  [0.22, -1.78],
  [-0.33, -1.96],
  [-0.11, -1.96],
  [0.11, -1.96],
  [0.33, -1.96],
];

function usePinGeometry() {
  return useMemo(() => {
    const points = [
      new Vector2(0, 0),
      new Vector2(0.046, 0),
      new Vector2(0.05, 0.018),
      new Vector2(0.044, 0.07),
      new Vector2(0.036, 0.12),
      new Vector2(0.024, 0.175),
      new Vector2(0.02, 0.215),
      new Vector2(0.026, 0.248),
      new Vector2(0.02, 0.278),
      new Vector2(0.012, 0.3),
      new Vector2(0, 0.308),
    ];
    return new LatheGeometry(points, 20);
  }, []);
}

function Pin({
  x,
  z,
  index,
  geometry,
  material,
}: {
  x: number;
  z: number;
  index: number;
  geometry: LatheGeometry;
  material: MeshStandardMaterial;
}) {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    const group = ref.current;
    if (!group) return;
    const cycle = 7.4;
    const t = state.clock.elapsedTime % cycle;
    const impact = 3.05;
    if (t < impact) {
      group.rotation.set(0, 0, 0);
      group.position.set(x, 0.02, z);
      return;
    }
    const k = Math.min(1, (t - impact) / 1.15);
    const dir = index % 2 === 0 ? 1 : -1;
    group.position.set(x + dir * 0.18 * k, 0.02 + 0.22 * Math.sin(k * Math.PI), z - 0.28 * k);
    group.rotation.set(k * 1.3, k * 0.35 * dir, k * 0.9 * dir);
  });

  return (
    <group ref={ref} position={[x, 0.02, z]}>
      <mesh geometry={geometry} material={material} castShadow />
      <mesh position={[0, 0.168, 0]}>
        <torusGeometry args={[0.027, 0.004, 8, 18]} />
        <meshStandardMaterial color="#e11d48" roughness={0.4} />
      </mesh>
    </group>
  );
}

function Ball() {
  const ref = useRef<Group>(null);

  useFrame((state) => {
    const group = ref.current;
    if (!group) return;
    const cycle = 7.4;
    const t = state.clock.elapsedTime % cycle;
    const start = 0.7;
    const impact = 3.05;
    let z = 1.62;
    let spin = 0;
    if (t > start && t < impact) {
      const p = (t - start) / (impact - start);
      const eased = 1 - (1 - p) * (1 - p);
      z = 1.62 - eased * 2.95;
      spin = eased * Math.PI * 6;
    } else if (t >= impact) {
      z = -1.33;
      spin = Math.PI * 6;
    }
    group.position.set(0.02, 0.128, z);
    group.rotation.set(spin, 0.12, 0);
  });

  return (
    <group ref={ref} position={[0.02, 0.128, 1.62]}>
      <mesh castShadow>
        <sphereGeometry args={[0.108, 48, 48]} />
        <meshPhysicalMaterial
          color="#4c1d95"
          metalness={0.42}
          roughness={0.22}
          clearcoat={0.85}
          clearcoatRoughness={0.18}
          sheen={0.4}
          sheenColor={new Color("#ddd6fe")}
        />
      </mesh>
      {[
        [-0.032, 0.062, 0.07],
        [0.03, 0.068, 0.062],
        [-0.004, 0.03, 0.09],
      ].map((spot) => (
        <mesh key={spot.join(",")} position={spot as [number, number, number]}>
          <sphereGeometry args={[0.012, 12, 12]} />
          <meshStandardMaterial color="#0b1020" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Lane() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, -0.15]}>
        <planeGeometry args={[0.92, 4.4]} />
        <meshStandardMaterial color="#c4a574" roughness={0.38} metalness={0.08} />
      </mesh>
      <mesh position={[-0.52, 0.03, -0.15]} receiveShadow>
        <boxGeometry args={[0.12, 0.06, 4.4]} />
        <meshStandardMaterial color="#1c2438" roughness={0.7} />
      </mesh>
      <mesh position={[0.52, 0.03, -0.15]} receiveShadow>
        <boxGeometry args={[0.12, 0.06, 4.4]} />
        <meshStandardMaterial color="#1c2438" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.002, -0.15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.012, 3.4]} />
        <meshStandardMaterial color="#fde68a" emissive="#fbbf24" emissiveIntensity={0.65} />
      </mesh>
    </group>
  );
}

function Rig({ interactive }: { interactive: boolean }) {
  useFrame((state) => {
    if (!interactive) return;
    const camera = state.camera;
    camera.position.x += (1.05 + state.pointer.x * 0.35 - camera.position.x) * 0.05;
    camera.position.y += (0.58 + state.pointer.y * 0.12 - camera.position.y) * 0.05;
    camera.lookAt(0, 0.14, -0.85);
  });
  return null;
}

function Scene({ quality }: { quality: "high" | "low" }) {
  const pinGeometry = usePinGeometry();
  const pinMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: "#f4efe6",
        roughness: 0.32,
        metalness: 0.04,
      }),
    [],
  );

  return (
    <>
      <color attach="background" args={["#07091a"]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[2.2, 4.2, 2.4]} intensity={1.15} color="#fff4e5" castShadow={quality === "high"} />
      <spotLight position={[0, 3.2, 0.8]} angle={0.42} penumbra={0.8} intensity={2.4} color="#ffe7b0" />
      <pointLight position={[-1.6, 1.1, 1.1]} intensity={0.9} color="#38bdf8" />
      <pointLight position={[1.5, 0.9, -1.4]} intensity={0.55} color="#f472b6" />
      <Lane />
      <Ball />
      {PIN_SPOTS.map(([x, z], index) => (
        <Pin key={`${x}-${z}`} x={x} z={z} index={index} geometry={pinGeometry} material={pinMaterial} />
      ))}
      <ContactShadows position={[0, 0, 0]} opacity={0.42} scale={7} blur={2.4} far={2.8} />
      <Rig interactive={quality === "high"} />
    </>
  );
}

export function BowlingCanvas({ quality = "high" }: { quality?: "high" | "low" }) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const onVisibility = () => setActive(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <Canvas
      camera={{ position: [1.05, 0.58, 1.7], fov: 34, near: 0.1, far: 20 }}
      dpr={quality === "high" ? [1, 1.5] : 1}
      gl={{ antialias: quality === "high", alpha: false, powerPreference: quality === "high" ? "high-performance" : "low-power" }}
      shadows={quality === "high"}
      frameloop={active ? "always" : "never"}
      style={{ background: "#07091a", touchAction: "pan-y", width: "100%", height: "100%", display: "block" }}
      onCreated={({ gl }) => {
        gl.domElement.style.touchAction = "pan-y";
      }}
    >
      <Scene quality={quality} />
    </Canvas>
  );
}
