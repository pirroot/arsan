"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

/* ── Arsan 3D palette ─────────────────────────────── */
export const BLUE = "#3b9dff";
export const BLUE_SOFT = "#7cc0ff";
export const ORANGE = "#ff7a1a";

/** reduced-motion multiplier for autonomous motion */
export const spd = (reduced: boolean) => (reduced ? 0.15 : 1);

/** Shared capability flags (computed once per session) */
export function useCapabilities() {
  return useMemo(() => {
    if (typeof window === "undefined") return { reduced: false, low: false };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const weakCpu = (navigator.hardwareConcurrency ?? 8) <= 4;
    return { reduced, low: coarse || weakCpu };
  }, []);
}

/** Random points in a spherical shell (flattened on Y) */
export function useShellPoints(count: number, rMin: number, rMax: number, flat = 0.75) {
  return useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = rMin + Math.random() * (rMax - rMin);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi) * flat;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count, rMin, rMax, flat]);
}

/** Random points in a box volume */
export function useBoxPoints(count: number, sx: number, sy: number, sz: number, zBase = 0) {
  return useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * sx;
      arr[i * 3 + 1] = (Math.random() - 0.5) * sy;
      arr[i * 3 + 2] = zBase - Math.random() * sz;
    }
    return arr;
  }, [count, sx, sy, sz, zBase]);
}

/* ── Reusable particle field ───────────────────────── */
export function PointField({
  positions,
  color,
  size,
  opacity,
  speed = 0,
  spinAxis = "y",
  reduced = false,
}: {
  positions: Float32Array;
  color: string;
  size: number;
  opacity: number;
  speed?: number;
  spinAxis?: "x" | "y" | "z";
  reduced?: boolean;
}) {
  const ref = useRef<THREE.Points>(null);
  useFrame((_, d) => {
    if (!ref.current || !speed) return;
    ref.current.rotation[spinAxis] += d * speed * spd(reduced);
  });
  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ── Metal shards orbiting a ring ──────────────────── */
export function ShardOrbit({
  radius,
  count,
  tiltX = 0,
  tiltZ = 0,
  speed = 0.2,
  reduced = false,
  plane = "y",
}: {
  radius: number;
  count: number;
  tiltX?: number;
  tiltZ?: number;
  speed?: number;
  reduced?: boolean;
  plane?: "y" | "z";
}) {
  const group = useRef<THREE.Group>(null);
  const shards = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        angle: (i / count) * Math.PI * 2 + Math.random() * 0.6,
        off: (Math.random() - 0.5) * 1.1,
        scale: 0.06 + Math.random() * 0.11,
        kind: Math.random() < 0.3 ? (Math.random() < 0.5 ? "ember" : "volt") : "metal",
        geo: Math.random() < 0.5 ? "octa" : "tetra",
      })),
    [count]
  );
  useFrame((_, d) => {
    if (group.current) group.current.rotation[plane] += d * speed * spd(reduced);
  });
  return (
    <group rotation={plane === "y" ? [tiltX, 0, tiltZ] : [tiltX, tiltZ, 0]}>
      <group ref={group}>
        {shards.map((s, i) => {
          const a = s.angle;
          const pos: [number, number, number] =
            plane === "y"
              ? [Math.cos(a) * radius, s.off, Math.sin(a) * radius]
              : [Math.cos(a) * radius, Math.sin(a) * radius, s.off];
          return (
            <mesh key={i} position={pos} scale={s.scale}>
              {s.geo === "octa" ? (
                <octahedronGeometry args={[1, 0]} />
              ) : (
                <tetrahedronGeometry args={[1, 0]} />
              )}
              {s.kind === "metal" ? (
                <meshPhysicalMaterial
                  color="#0d1a33"
                  metalness={0.95}
                  roughness={0.25}
                  envMapIntensity={1.5}
                  flatShading
                />
              ) : (
                <meshBasicMaterial
                  color={s.kind === "ember" ? ORANGE : BLUE}
                  transparent
                  opacity={0.9}
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                />
              )}
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* ── Soft radial glow sprite (shared canvas texture) ── */
let glowTex: THREE.CanvasTexture | null = null;

/** ساخت یک‌باره‌ی تکسچر گرادیان شعاعی (خارج از بدنه‌ی هوک) */
function getGlowTexture(): THREE.CanvasTexture | null {
  if (glowTex) return glowTex;
  if (typeof document === "undefined") return null;
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  if (!ctx) return null;
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.22, "rgba(255,255,255,0.6)");
  g.addColorStop(0.55, "rgba(255,255,255,0.16)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  glowTex = new THREE.CanvasTexture(c);
  return glowTex;
}

function useGlowTexture() {
  return useMemo(() => getGlowTexture(), []);
}

export function GlowSprite({
  size = 3,
  color = ORANGE,
  opacity = 0.5,
  position = [0, 0, 0],
  through = false,
}: {
  size?: number;
  color?: string;
  opacity?: number;
  position?: [number, number, number];
  /** true = حتی جلوی اجسام مات رندر می‌شود (قلب نورانی داخل پوسته) */
  through?: boolean;
}) {
  const tex = useGlowTexture();
  if (!tex) return null;
  return (
    <sprite position={position} scale={size}>
      <spriteMaterial
        map={tex}
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        depthTest={!through}
      />
    </sprite>
  );
}

/* ── Thin glowing orbit ring ───────────────────────── */
export function GlowRing({
  radius,
  tube,
  color,
  opacity,
  tiltX = 0,
  tiltZ = 0,
  speed = 0,
  reduced = false,
}: {
  radius: number;
  tube: number;
  color: string;
  opacity: number;
  tiltX?: number;
  tiltZ?: number;
  speed?: number;
  reduced?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (group.current && speed) group.current.rotation.z += d * speed * spd(reduced);
  });
  return (
    <group ref={group} rotation={[tiltX, 0, tiltZ]}>
      <mesh>
        <torusGeometry args={[radius, tube, 10, 150]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={opacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
