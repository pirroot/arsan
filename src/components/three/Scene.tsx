"use client";

/**
 * ARSAN — World Scene
 * یک Canvas ثابت تمام‌صفحه که کل سفر سه‌بعدی صفحه را رندر می‌کند.
 * دوربین با progress اسکرول (Lenis) در عمق دنیا پرواز می‌کند و
 * پارامترهای نگاه (ارتفاع دوربین/جهت نگاه) بین فصل‌ها smooth-step
 * می‌شوند تا هر سکشن DOM دقیقاً روی فصل سه‌بعدی خودش بنشیند.
 */

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import {
  CHAPTER_KEYS,
  cameraZFor,
  pageScroll,
  pointer,
  world,
  type ChapterKey,
} from "@/lib/scroll-store";
import { useAppStore } from "@/lib/app-store";
import { BLUE, BLUE_SOFT, ORANGE, useCapabilities, useBoxPoints, PointField } from "./world/shared";
import {
  BeaconScene,
  Chapter,
  DataCity,
  GalleryOrbit,
  GrowthCore,
  NebulaZone,
  PortalScene,
  ProcessPath,
  ServicesAvenue,
} from "./world/chapters";

/* ── Keyframed camera params per chapter ─────────── */
const CAM_Y: Record<ChapterKey, number> = {
  hero: 0.2,
  manifesto: 0.1,
  services: 0.45,
  work: 0.25,
  why: 2.7,
  process: 0.35,
  testimonials: 0.2,
  cta: 0.7,
};

const LOOK_Y: Record<ChapterKey, number> = {
  hero: 0.15,
  manifesto: 0.05,
  services: 0.35,
  work: 0.15,
  why: -1.5,
  process: 0.3,
  testimonials: 0.1,
  cta: 1.15,
};

/** شفافیت بوم در هر فصل — در فصل‌های پرمتن دنیای 3D ملایم می‌شود
    تا متن کاملاً خوانا بماند؛ در هیرو و CTA تمام‌قد نمایش داده می‌شود */
const CANVAS_DIM: Record<ChapterKey, number> = {
  hero: 1,
  manifesto: 0.8,
  services: 0.5,
  work: 0.58,
  why: 0.52,
  process: 0.58,
  testimonials: 0.6,
  cta: 1,
};

function keyedAt(p: number, table: Record<ChapterKey, number>) {
  const K = CHAPTER_KEYS;
  if (p <= world.chapterP[K[0]]) return table[K[0]];
  for (let i = 0; i < K.length - 1; i++) {
    const a = world.chapterP[K[i]];
    const b = world.chapterP[K[i + 1]];
    if (p <= b) {
      const t = (p - a) / Math.max(b - a, 1e-4);
      const s = t * t * (3 - 2 * t); // smoothstep
      return table[K[i]] + (table[K[i + 1]] - table[K[i]]) * s;
    }
  }
  return table[K[K.length - 1]];
}

/* ── Cinematic scroll camera ─────────────────────── */
const look = new THREE.Vector3();

function Rig({ reduced }: { reduced: boolean }) {
  useFrame((state, d) => {
    const cam = state.camera as THREE.PerspectiveCamera;
    const p = pageScroll.progress;

    // در اولین فریم، دوربین مستقیم روی موقعیت فعلی اسکرول می‌نشیند
    if (!world.inited) {
      world.inited = true;
      cam.position.set(0, CAM_Y.hero, cameraZFor(p));
    }

    const tz = cameraZFor(p);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, tz, 3.0, d);

    const px = pointer.active ? pointer.x : 0;
    const py = pointer.active ? pointer.y : 0;
    cam.position.x = THREE.MathUtils.damp(cam.position.x, px * 0.6, 2.4, d);
    cam.position.y = THREE.MathUtils.damp(
      cam.position.y,
      keyedAt(p, CAM_Y) + py * 0.35,
      2.4,
      d
    );

    look.set(px * 1.15, keyedAt(p, LOOK_Y) + py * 0.55, cam.position.z - 13);
    cam.lookAt(look);

    // شفافیت بوم بین فصل‌ها — خوانایی متن بدون از دست دادن حس دنیای 3D
    const el = state.gl.domElement as HTMLCanvasElement;
    const dimNow = parseFloat(el.style.opacity || "1");
    const dimTarget = keyedAt(p, CANVAS_DIM);
    const dim = THREE.MathUtils.damp(dimNow, dimTarget, 3.5, d);
    if (Math.abs(dim - dimNow) > 0.002) el.style.opacity = dim.toFixed(3);

    // تنفس FOV با سرعت اسکرول — حس سرعت در سفر
    if (!reduced) {
      const targetFov = 42 + Math.min(Math.abs(pageScroll.velocity) * 0.32, 5);
      const fov = THREE.MathUtils.damp(cam.fov, targetFov, 3.2, d);
      if (Math.abs(fov - cam.fov) > 0.01) {
        cam.fov = fov;
        cam.updateProjectionMatrix();
      }
    }
  });
  return null;
}

/* ── Star dust spread across the whole corridor ──── */
function StarField({ low, reduced }: { low: boolean; reduced: boolean }) {
  const field = useBoxPoints(low ? 900 : 2300, 36, 24, world.depth + 50, 14);
  const ember = useBoxPoints(low ? 160 : 380, 30, 20, world.depth + 40, 12);
  return (
    <>
      <PointField positions={field} color={BLUE_SOFT} size={0.052} opacity={0.4} speed={0.004} spinAxis="z" reduced={reduced} />
      <PointField positions={ember} color={ORANGE} size={0.06} opacity={0.34} speed={-0.003} spinAxis="z" reduced={reduced} />
    </>
  );
}

export default function Scene() {
  const { reduced, low } = useCapabilities();

  return (
    <Canvas
      dpr={[1, low ? 1.25 : 1.75]}
      camera={{ position: [0, 0.2, 9.4], fov: 42, near: 0.1, far: 320 }}
      gl={{ antialias: !low, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearAlpha(0);
        useAppStore.getState().setWebgl("on");
      }}
      style={{ pointerEvents: "none" }}
    >
      <fogExp2 attach="fog" args={["#050a14", 0.0245]} />

      <ambientLight intensity={0.42} />
      <directionalLight position={[6, 7, 8]} intensity={1.25} color="#cfe4ff" />
      <directionalLight position={[-7, -3, -5]} intensity={1.5} color={ORANGE} />

      <Rig reduced={reduced} />
      <StarField low={low} reduced={reduced} />

      <Chapter k="hero">
        <GrowthCore reduced={reduced} low={low} />
      </Chapter>
      <Chapter k="manifesto">
        <PortalScene reduced={reduced} low={low} />
      </Chapter>
      <Chapter k="services" range={72}>
        <ServicesAvenue reduced={reduced} low={low} />
      </Chapter>
      <Chapter k="work">
        <GalleryOrbit reduced={reduced} low={low} />
      </Chapter>
      <Chapter k="why" range={80}>
        <DataCity reduced={reduced} low={low} />
      </Chapter>
      <Chapter k="process" range={72}>
        <ProcessPath reduced={reduced} low={low} />
      </Chapter>
      <Chapter k="testimonials">
        <NebulaZone reduced={reduced} low={low} />
      </Chapter>
      <Chapter k="cta">
        <BeaconScene reduced={reduced} low={low} />
      </Chapter>

      {/* Environment محلی (بدون CDN) — نوارهای نور استودیویی برای بازتاب کروم */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#02040a"]} />
        <Lightformer intensity={2.2} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[10, 10, 1]} color="#bfe0ff" />
        <Lightformer intensity={3} position={[-5, 1, -1]} rotation-y={Math.PI / 2} scale={[8, 2.5, 1]} color={BLUE} />
        <Lightformer intensity={2.6} position={[5, -1, 0]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} color={ORANGE} />
        <Lightformer intensity={1.1} position={[0, 1.5, 6]} scale={[6, 3, 1]} color="#ffffff" />
      </Environment>
    </Canvas>
  );
}
