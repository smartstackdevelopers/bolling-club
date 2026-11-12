"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  ShaderMaterial,
  Vector2,
} from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform float uTime;
uniform vec2 uMouse;
uniform float uAmp;
varying vec2 vUv;

float ribbon(vec2 uv, float offset, float speed, float amp, float thickness) {
  float wave = sin(uv.x * 4.4 + uTime * speed + offset) * amp;
  wave += sin(uv.x * 9.1 - uTime * speed * 0.62 + offset) * amp * 0.38;
  float y = 0.5 + offset + wave;
  float d = abs(uv.y - y);
  return smoothstep(thickness, 0.0, d);
}

void main() {
  vec2 uv = vUv;
  float r1 = ribbon(uv, -0.14, 0.32, 0.11 * uAmp, 0.07);
  float r2 = ribbon(uv, 0.01, 0.24, 0.14 * uAmp, 0.055);
  float r3 = ribbon(uv, 0.16, 0.41, 0.08 * uAmp, 0.045);
  vec3 gold = vec3(0.98, 0.75, 0.22);
  vec3 cyan = vec3(0.22, 0.74, 0.97);
  vec3 rose = vec3(0.96, 0.48, 0.72);
  vec3 col = gold * r1 + cyan * r2 * 0.82 + rose * r3 * 0.48;
  float energy = r1 + r2 + r3;
  float vignette = smoothstep(1.15, 0.28, length(uv - 0.5));
  float alpha = energy * 0.34 * vignette;
  gl_FragColor = vec4(col * alpha, alpha);
}
`;

function Ribbons({ amp }: { amp: number }) {
  const material = useRef<ShaderMaterial>(null);
  const mouse = useRef(new Vector2(0, 0));

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      mouse.current.set(event.clientX / window.innerWidth - 0.5, 0.5 - event.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    const mat = material.current;
    if (!mat) return;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uMouse.value.lerp(mouse.current, 0.06);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new Vector2(0, 0) },
          uAmp: { value: amp },
        }}
      />
    </mesh>
  );
}

function hashed(seed: number) {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

function Dust({ count }: { count: number }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = hashed(index + 1) * 2 - 1;
      positions[index * 3 + 1] = hashed(index + 19) * 2 - 1;
      positions[index * 3 + 2] = 0;
      speeds[index] = 0.04 + hashed(index + 41) * 0.08;
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(positions, 3));
    geo.setAttribute("aSpeed", new BufferAttribute(speeds, 1));
    return geo;
  }, [count]);

  useFrame((_, delta) => {
    const position = geometry.getAttribute("position") as BufferAttribute;
    const speed = geometry.getAttribute("aSpeed") as BufferAttribute;
    for (let index = 0; index < count; index += 1) {
      const y = position.getY(index) + speed.getX(index) * delta;
      position.setY(index, y > 1.05 ? -1.05 : y);
    }
    position.needsUpdate = true;
  });

  useEffect(() => () => geometry.dispose(), [geometry]);

  return (
    <points geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        color="#f4efe4"
        size={0.012}
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={AdditiveBlending}
        sizeAttenuation={false}
      />
    </points>
  );
}

function Scene({ particles, amp }: { particles: number; amp: number }) {
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    gl.setClearColor("#07091a", 0);
  }, [gl]);

  return (
    <>
      <Ribbons amp={amp} />
      {particles > 0 ? <Dust count={particles} /> : null}
    </>
  );
}

export function EnergyField({
  dpr,
  particles,
  amp,
}: {
  dpr: number;
  particles: number;
  amp: number;
}) {
  return (
    <Canvas
      orthographic
      camera={{ position: [0, 0, 1], zoom: 1 }}
      dpr={dpr}
      gl={{ alpha: true, antialias: false, premultipliedAlpha: true, powerPreference: "low-power" }}
      frameloop="always"
      style={{ pointerEvents: "none", background: "transparent" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Scene particles={particles} amp={amp} />
    </Canvas>
  );
}
