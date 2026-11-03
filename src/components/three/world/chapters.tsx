"use client";

/**
 * ─────────────────────────────────────────────────────────────
 *  ARSAN — «سفر ساخت دیجیتال»
 *  کل صفحه یک دنیای پیوسته است؛ دوربین با اسکرول از ۸ فصل عبور
 *  می‌کند. جای‌گذاری فصل‌ها از اندازه‌گیری واقعی سکشن‌های DOM
 *  خوانده می‌شود (world.chapterP) پس سفر سه‌بعدی همیشه با محتوا
 *  هم‌گام است.
 *
 *  CH1 hero         — «هسته‌ی رشد»: مجسمه‌ی فلزی + حلقه‌های مداری
 *  CH2 manifesto    — «دروازه»: پرتال نورانی که دوربین از آن می‌گذرد
 *  CH3 services     — «خیابان سنگ‌نگاره‌ها»: ۵ مونولیت شیشه‌ای
 *  CH4 work         — «گالری مداری»: سه قاب نمایش چرخان
 *  CH5 why          — «شهر داده»: برج‌های فلزی روی کف بازتابنده
 *  CH6 process      — «مسیر نور»: ۴ گره درخشان روی یک لوله‌ی نور
 *  CH7 testimonials — «سحابی»: غبار آرام و خرده‌شیشه‌های شناور
 *  CH8 cta          — «منار»: هسته‌ی نور با نورپردازی کهربایی
 * ─────────────────────────────────────────────────────────────
 */

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  cameraZFor,
  pointer,
  world,
  type ChapterKey,
} from "@/lib/scroll-store";
import {
  BLUE,
  BLUE_SOFT,
  ORANGE,
  GlowRing,
  GlowSprite,
  PointField,
  ShardOrbit,
  spd,
  useBoxPoints,
  useShellPoints,
} from "./shared";

/** فاصله‌ی ثابت دوربین تا مرکز هر فصل هنگام «رسیدن» */
const LOOKAHEAD = 10.5;

/* ── Chapter wrapper: positions + culls a scene group ── */
function Chapter({
  k,
  range = 58,
  children,
}: {
  k: ChapterKey;
  range?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ camera }) => {
    const g = ref.current;
    if (!g) return;
    const z = cameraZFor(world.chapterP[k]) - LOOKAHEAD;
    g.position.z = z;
    g.visible = Math.abs(camera.position.z - z) < range;
  });
  return <group ref={ref}>{children}</group>;
}

/* ══════════════ CH1 — Growth Core ══════════════ */
function GrowthCore({ reduced, low }: { reduced: boolean; low: boolean }) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);
  const rig = useRef<THREE.Group>(null);
  const m = spd(reduced);

  useFrame((state, d) => {
    const t = state.clock.elapsedTime;
    if (outer.current) {
      outer.current.rotation.y += d * 0.12 * m;
      outer.current.rotation.x = Math.sin(t * 0.18) * 0.12;
    }
    if (inner.current) {
      inner.current.rotation.y -= d * 0.22 * m;
      inner.current.rotation.z += d * 0.07 * m;
    }
    if (glow.current) glow.current.scale.setScalar(0.55 + Math.sin(t * 1.6) * 0.05);
    if (rig.current) {
      rig.current.rotation.y = THREE.MathUtils.damp(
        rig.current.rotation.y,
        pointer.active ? pointer.x * 0.22 : 0,
        2.4,
        d
      );
      rig.current.rotation.x = THREE.MathUtils.damp(
        rig.current.rotation.x,
        pointer.active ? -pointer.y * 0.12 : 0,
        2.4,
        d
      );
    }
  });

  return (
    <group ref={rig} scale={low ? 0.92 : 1.02}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[2.05, 1]} />
        <meshPhysicalMaterial
          color="#0d1a33"
          metalness={0.95}
          roughness={0.18}
          clearcoat={0.7}
          clearcoatRoughness={0.25}
          envMapIntensity={2.1}
          flatShading
        />
      </mesh>
      <mesh ref={inner} scale={0.74}>
        <icosahedronGeometry args={[2.05, 0]} />
        <meshBasicMaterial
          color={BLUE_SOFT}
          wireframe
          transparent
          opacity={0.38}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={glow}>
        <sphereGeometry args={[0.6, 20, 20]} />
        <meshBasicMaterial
          color={ORANGE}
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* هاله‌ی نرم قلب انرژی — روی پوسته با گرادیان نرم */}
      <GlowSprite size={2.5} color={ORANGE} opacity={0.42} position={[0, 0, 0.2]} through />
      {/* نور جلوانداز برای زنده‌تر شدن فلز تیره */}
      <pointLight position={[2.5, 2, 4.5]} intensity={13} distance={17} color="#cfe4ff" />
      <pointLight position={[-3, -1, 3.5]} intensity={7} distance={14} color="#3b9dff" />

      <GlowRing radius={3.15} tube={0.012} color={BLUE} opacity={0.5} tiltX={Math.PI / 2.6} tiltZ={0.25} reduced={reduced} />
      <GlowRing radius={3.85} tube={0.009} color={ORANGE} opacity={0.42} tiltX={Math.PI / 1.9} tiltZ={-0.45} reduced={reduced} />
      <ShardOrbit radius={3.1} count={low ? 5 : 9} tiltX={0.5} tiltZ={0.2} speed={0.2} reduced={reduced} />
      <ShardOrbit radius={3.95} count={low ? 6 : 10} tiltX={-0.7} tiltZ={-0.3} speed={-0.15} reduced={reduced} />
      {!low && <ShardOrbit radius={4.7} count={7} tiltX={0.16} tiltZ={0.7} speed={0.09} reduced={reduced} />}

      <CoreDust reduced={reduced} low={low} />
    </group>
  );
}

/** غبار نزدیک هسته‌ی هیرو */
function CoreDust({ reduced, low }: { reduced: boolean; low: boolean }) {
  const shell = useShellPoints(low ? 500 : 1700, 5, 10.5);
  const ember = useShellPoints(low ? 90 : 200, 2.5, 4.6);
  return (
    <>
      <PointField positions={shell} color={BLUE_SOFT} size={0.038} opacity={0.5} speed={0.014} reduced={reduced} />
      <PointField positions={ember} color={ORANGE} size={0.05} opacity={0.7} speed={-0.02} reduced={reduced} />
    </>
  );
}

/* ══════════════ CH2 — Portal ══════════════ */
function PortalScene({ reduced, low }: { reduced: boolean; low: boolean }) {
  const satellites = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (satellites.current) satellites.current.rotation.z += d * 0.06 * spd(reduced);
  });

  return (
    <group>
      {/* حلقه‌ی اصلی پرتال */}
      <mesh>
        <torusGeometry args={[4.9, 0.07, 12, 140]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      {/* هاله‌ی دور حلقه */}
      <mesh>
        <torusGeometry args={[4.9, 0.18, 12, 140]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* حلقه‌های ماهواره‌ای کج */}
      <group ref={satellites}>
        <mesh rotation={[Math.PI / 2.4, 0, 0.4]}>
          <torusGeometry args={[6.1, 0.018, 8, 130]} />
          <meshBasicMaterial color={ORANGE} transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        <mesh rotation={[Math.PI / 1.75, 0.35, 0]}>
          <torusGeometry args={[6.75, 0.013, 8, 130]} />
          <meshBasicMaterial color={BLUE_SOFT} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>

      {/* درگاه شیشه‌ای */}
      <mesh>
        <circleGeometry args={[4.84, 64]} />
        <meshPhysicalMaterial
          color="#0a1428"
          transparent
          opacity={0.16}
          roughness={0.12}
          metalness={0.5}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      <ShardOrbit radius={4.9} count={low ? 6 : 12} speed={0.24} reduced={reduced} />
      <pointLight position={[0, 0, 2]} intensity={26} distance={30} color={BLUE} />

      {/* غبار گذر از دروازه */}
      <PortalDust reduced={reduced} low={low} />
    </group>
  );
}

function PortalDust({ reduced, low }: { reduced: boolean; low: boolean }) {
  const dust = useBoxPoints(low ? 160 : 420, 26, 16, 34, 16);
  return (
    <PointField
      positions={dust}
      color={BLUE_SOFT}
      size={0.045}
      opacity={0.4}
      speed={0.01}
      spinAxis="z"
      reduced={reduced}
    />
  );
}

/* ══════════════ CH3 — Services Avenue ══════════════ */
const SLABS = [
  { x: -3.5, z: 5.5, ry: 0.16, edge: BLUE },
  { x: 3.5, z: -0.6, ry: -0.14, edge: ORANGE },
  { x: -3.4, z: -6.7, ry: 0.2, edge: BLUE },
  { x: 3.6, z: -12.8, ry: -0.18, edge: ORANGE },
  { x: -3.5, z: -18.9, ry: 0.12, edge: BLUE },
];

function ServicesAvenue({ reduced, low }: { reduced: boolean; low: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, d) => {
    const t = state.clock.elapsedTime;
    group.current?.children.forEach((child, i) => {
      child.position.y = Math.sin(t * 0.6 + i * 1.35) * 0.16 * spd(reduced);
    });
  });

  return (
    <group ref={group}>
      {SLABS.map((s, i) => (
        <group key={i} position={[s.x, 0, s.z]} rotation={[0, s.ry, 0]}>
          {/* مونولیت شیشه‌ای */}
          <mesh>
            <boxGeometry args={[1.62, 6.6, 0.42]} />
            <meshPhysicalMaterial
              color="#0d1a33"
              metalness={0.9}
              roughness={0.24}
              clearcoat={0.8}
              clearcoatRoughness={0.2}
              envMapIntensity={1.6}
            />
          </mesh>
          {/* لبه‌ی نورانی بالایی */}
          <mesh position={[0, 3.36, 0]}>
            <boxGeometry args={[1.72, 0.055, 0.52]} />
            <meshBasicMaterial color={s.edge} transparent opacity={0.95} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
          {/* خط نور عمودی روی بدنه */}
          <mesh position={[i % 2 ? 0.5 : -0.5, 0, 0.22]}>
            <boxGeometry args={[0.035, 5.6, 0.02]} />
            <meshBasicMaterial color={s.edge} transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      ))}

      {/* خرده‌فلزات شناور بین مونولیت‌ها */}
      <ShardOrbit radius={6.4} count={low ? 5 : 9} tiltX={0.2} tiltZ={0.1} speed={0.1} reduced={reduced} />
      <pointLight position={[0, 2.5, 2]} intensity={20} distance={34} color={BLUE} />
      <pointLight position={[0, 0, -14]} intensity={16} distance={30} color={ORANGE} />
    </group>
  );
}

/* ══════════════ CH4 — Gallery Orbit ══════════════ */
function GalleryOrbit({ reduced, low }: { reduced: boolean; low: boolean }) {
  const orbit = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (orbit.current) orbit.current.rotation.y += d * 0.085 * spd(reduced);
  });

  const frames = useMemo(() => [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3], []);

  return (
    <group>
      {/* هسته‌ی مرکزی کوچک */}
      <mesh>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial color={ORANGE} transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <group ref={orbit}>
        {frames.map((a, i) => {
          const r = 4.9;
          const x = Math.cos(a) * r;
          const z = Math.sin(a) * r;
          return (
            <group key={i} position={[x, Math.sin(a * 2) * 0.7, z]} rotation={[0, -a + Math.PI / 2, Math.sin(a) * 0.12]}>
              {/* قاب فلزی */}
              <mesh>
                <torusGeometry args={[1.95, 0.06, 10, 90]} />
                <meshPhysicalMaterial color="#0d1a33" metalness={0.95} roughness={0.22} envMapIntensity={1.7} />
              </mesh>
              {/* شیشه‌ی داخل قاب */}
              <mesh>
                <circleGeometry args={[1.9, 48]} />
                <meshPhysicalMaterial
                  color="#0a1428"
                  transparent
                  opacity={0.22}
                  roughness={0.15}
                  metalness={0.4}
                  side={THREE.DoubleSide}
                  depthWrite={false}
                />
              </mesh>
              {/* سه نقطه‌ی نور روی قاب */}
              {[0, 2.1, 4.2].map((t, j) => (
                <mesh key={j} position={[Math.cos(t) * 1.95, Math.sin(t) * 1.95, 0]}>
                  <sphereGeometry args={[0.07, 10, 10]} />
                  <meshBasicMaterial
                    color={j % 2 ? ORANGE : BLUE}
                    transparent
                    opacity={0.95}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                  />
                </mesh>
              ))}
            </group>
          );
        })}
      </group>

      <ShardOrbit radius={6.6} count={low ? 4 : 8} tiltX={1.1} tiltZ={0.2} speed={-0.12} reduced={reduced} />
      <pointLight position={[0, 1, 3]} intensity={18} distance={30} color={BLUE} />
    </group>
  );
}

/* ══════════════ CH5 — Data City ══════════════ */
function DataCity({ reduced, low }: { reduced: boolean; low: boolean }) {
  const pillars = useMemo(() => {
    const cols = low ? 11 : 14;
    const spacing = 1.75;
    const data: { x: number; z: number; h: number; rot: number }[] = [];
    for (let ix = 0; ix < cols; ix++) {
      for (let iz = 0; iz < 12; iz++) {
        const x = (ix - (cols - 1) / 2) * spacing + (Math.random() - 0.5) * 0.35;
        const z = (iz - 5.5) * spacing * 1.35 + (Math.random() - 0.5) * 0.5;
        if (Math.abs(x) < 1.35) continue; // خیابان مرکزی برای عبور دوربین
        const h = 0.5 + Math.pow(Math.random(), 2.2) * (low ? 3.6 : 4.8);
        data.push({ x, z, h, rot: Math.random() * Math.PI });
      }
    }
    return data;
  }, [low]);

  const inst = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const o = new THREE.Object3D();
    pillars.forEach((p, i) => {
      o.position.set(p.x, p.h / 2 - 1.25, p.z);
      o.scale.set(1, p.h, 1);
      o.rotation.y = p.rot;
      o.updateMatrix();
      inst.current?.setMatrixAt(i, o.matrix);
    });
    if (inst.current) inst.current.instanceMatrix.needsUpdate = true;
  }, [pillars]);

  const beacons = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        x: (i % 2 ? 1 : -1) * (2.6 + Math.random() * 7.5),
        z: -9 + i * 3.6,
        h: 4.5 + Math.random() * 2.6,
        c: i % 2 ? ORANGE : BLUE,
      })),
    []
  );

  return (
    <group>
      {/* کف بازتابنده */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.26, 0]}>
        <planeGeometry args={[70, 46]} />
        <meshStandardMaterial color="#070d1a" metalness={0.85} roughness={0.32} envMapIntensity={1.15} />
      </mesh>

      {/* برج‌های داده */}
      <instancedMesh ref={inst} args={[undefined, undefined, pillars.length]} frustumCulled={false}>
        <boxGeometry args={[0.55, 1, 0.55]} />
        <meshPhysicalMaterial color="#0c1830" metalness={0.92} roughness={0.24} envMapIntensity={1.4} />
      </instancedMesh>

      {/* برج‌های علامت نورانی */}
      {beacons.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2 - 1.2, b.z]}>
          <boxGeometry args={[0.16, b.h, 0.16]} />
          <meshBasicMaterial color={b.c} transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}

      <pointLight position={[0, 4.5, 2]} intensity={22} distance={36} color={BLUE} />
      <pointLight position={[0, 2, -16]} intensity={14} distance={30} color={ORANGE} />
    </group>
  );
}

/* ══════════════ CH6 — Process Path ══════════════ */
const PATH_POINTS = [
  new THREE.Vector3(-5.1, -0.5, 6.5),
  new THREE.Vector3(-1.9, 0.45, 1.6),
  new THREE.Vector3(2.1, -0.25, -3.2),
  new THREE.Vector3(-1.6, 0.6, -8.0),
  new THREE.Vector3(3.6, 0.15, -12.8),
];

function ProcessPath({ reduced, low }: { reduced: boolean; low: boolean }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(PATH_POINTS), []);
  const flow = useRef<THREE.Group>(null);
  const nodeTs = [0.15, 0.38, 0.63, 0.92];
  const nodePos = useMemo(() => nodeTs.map((t) => curve.getPoint(t)), [curve]);

  useFrame((state, d) => {
    // جریان نور: حلقه‌ی کوچک روی مسیر حرکت می‌کند
    if (flow.current) {
      const t = (state.clock.elapsedTime * 0.05 * spd(reduced)) % 1;
      flow.current.position.copy(curve.getPoint(t));
      const s = 0.9 + Math.sin(state.clock.elapsedTime * 4) * 0.15;
      flow.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      {/* مسیر نور */}
      <mesh>
        <tubeGeometry args={[curve, 90, 0.045, 8, false]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.85} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <tubeGeometry args={[curve, 90, 0.14, 8, false]} />
        <meshBasicMaterial color={BLUE} transparent opacity={0.14} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      {/* قطره‌ی نور جاری */}
      <group ref={flow}>
        <mesh>
          <sphereGeometry args={[0.16, 12, 12]} />
          <meshBasicMaterial color={BLUE_SOFT} transparent opacity={1} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>

      {/* گره‌های فرآیند */}
      {nodePos.map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <sphereGeometry args={[0.34, 20, 20]} />
            <meshPhysicalMaterial
              color="#0d1a33"
              metalness={0.95}
              roughness={0.2}
              clearcoat={0.8}
              envMapIntensity={1.8}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.5, 16, 16]} />
            <meshBasicMaterial
              color={i === 3 ? ORANGE : BLUE}
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
            <torusGeometry args={[0.68, 0.012, 8, 60]} />
            <meshBasicMaterial color={i === 3 ? ORANGE : BLUE} transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
          {!low && (
            <group>
              <OrbitDot radius={0.95} speed={0.7 + i * 0.12} color={i === 3 ? ORANGE : BLUE_SOFT} reduced={reduced} />
            </group>
          )}
        </group>
      ))}

      <pointLight position={[0, 2, 0]} intensity={18} distance={34} color={BLUE} />
      <pointLight position={[3.4, 1, -12.8]} intensity={16} distance={26} color={ORANGE} />
    </group>
  );
}

function OrbitDot({
  radius,
  speed,
  color,
  reduced,
}: {
  radius: number;
  speed: number;
  color: string;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.z += d * speed * spd(reduced);
  });
  return (
    <group ref={ref}>
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ══════════════ CH7 — Nebula ══════════════ */
function NebulaZone({ reduced, low }: { reduced: boolean; low: boolean }) {
  const dust = useBoxPoints(low ? 420 : 1100, 30, 18, 30, 15);
  const embers = useBoxPoints(low ? 70 : 160, 22, 12, 24, 12);

  const glass = useMemo(
    () =>
      Array.from({ length: low ? 4 : 7 }, () => ({
        x: (Math.random() - 0.5) * 13,
        y: (Math.random() - 0.5) * 5.5,
        z: -2.5 - Math.random() * 13,
        s: 0.3 + Math.random() * 0.55,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI,
        spin: 0.05 + Math.random() * 0.09,
      })),
    [low]
  );
  const gRef = useRef<THREE.Group>(null);
  useFrame((state, d) => {
    if (!gRef.current) return;
    gRef.current.children.forEach((c, i) => {
      c.rotation.y += d * glass[i].spin * spd(reduced) * (i % 2 ? 1 : -1);
      c.rotation.x += d * glass[i].spin * 0.5 * spd(reduced);
      c.position.y = glass[i].y + Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.3;
    });
  });

  return (
    <group>
      <PointField positions={dust} color={BLUE_SOFT} size={0.042} opacity={0.34} speed={0.006} reduced={reduced} />
      <PointField positions={embers} color={ORANGE} size={0.055} opacity={0.5} speed={-0.008} reduced={reduced} />

      <group ref={gRef}>
        {glass.map((g, i) => (
          <mesh key={i} position={[g.x, g.y, g.z]} rotation={[g.rx, g.ry, 0]} scale={g.s}>
            <icosahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
              color="#0d1a33"
              metalness={0.9}
              roughness={0.16}
              clearcoat={0.9}
              envMapIntensity={1.6}
              flatShading
              transparent
              opacity={0.85}
            />
          </mesh>
        ))}
      </group>

      <pointLight position={[0, 1, 4]} intensity={12} distance={30} color={BLUE_SOFT} />
    </group>
  );
}

/* ══════════════ CH8 — Beacon ══════════════ */
function BeaconScene({ reduced, low }: { reduced: boolean; low: boolean }) {
  const core = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);
  useFrame((state, d) => {
    const t = state.clock.elapsedTime;
    if (core.current) {
      core.current.rotation.y += d * 0.16 * spd(reduced);
      core.current.rotation.x = Math.sin(t * 0.22) * 0.1;
    }
    if (glow.current) glow.current.scale.setScalar(1 + Math.sin(t * 1.3) * 0.07);
  });

  const sparks = useShellPoints(low ? 350 : 900, 3.4, 9);
  const column = useBoxPoints(low ? 90 : 200, 2.4, 1, 1, 0).map((v, i) =>
    i % 3 === 2 ? 6 + Math.random() * 16 : v
  );

  return (
    <group>
      {/* کل منار پایین‌تر از مرکز — تا پشت تیتر CTA نیاید و متن خوانا بماند */}
      <group position={[0, -2.6, -0.5]}>
      {/* منار مرکزی — بازگشت هسته */}
      <mesh ref={core}>
        <icosahedronGeometry args={[1.55, 1]} />
        <meshPhysicalMaterial
          color="#101f3c"
          metalness={0.96}
          roughness={0.16}
          clearcoat={1}
          clearcoatRoughness={0.15}
          envMapIntensity={2.1}
          flatShading
        />
      </mesh>
      <mesh scale={0.78}>
        <icosahedronGeometry args={[1.55, 0]} />
        <meshBasicMaterial color={BLUE_SOFT} wireframe transparent opacity={0.42} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={glow} scale={1}>
        <sphereGeometry args={[0.85, 24, 24]} />
        <meshBasicMaterial color={ORANGE} transparent opacity={0.65} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>

      <GlowRing radius={2.9} tube={0.014} color={ORANGE} opacity={0.6} tiltX={Math.PI / 2.2} tiltZ={0.3} speed={0.1} reduced={reduced} />
      <GlowRing radius={3.6} tube={0.01} color={BLUE} opacity={0.4} tiltX={Math.PI / 1.8} tiltZ={-0.4} speed={-0.08} reduced={reduced} />
      <ShardOrbit radius={4.3} count={low ? 6 : 11} tiltX={0.4} tiltZ={0.25} speed={0.18} reduced={reduced} />

      {/* ستون نور به آسمان */}
      <mesh position={[0, 9, 0]}>
        <cylinderGeometry args={[0.85, 1.15, 26, 20, 1, true]} />
        <meshBasicMaterial
          color={BLUE}
          transparent
          opacity={0.035}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      </group>

      <PointField positions={sparks} color={BLUE_SOFT} size={0.05} opacity={0.55} speed={0.012} reduced={reduced} />
      <PointField positions={column} color={ORANGE} size={0.075} opacity={0.5} speed={-0.03} reduced={reduced} />

      <pointLight position={[0, -1.4, 2.5]} intensity={42} distance={44} color={ORANGE} />
      <pointLight position={[0, -3, -4]} intensity={22} distance={30} color={BLUE} />
    </group>
  );
}

/* ── Exported chapter list used by Scene ── */
export {
  Chapter,
  GrowthCore,
  PortalScene,
  ServicesAvenue,
  GalleryOrbit,
  DataCity,
  ProcessPath,
  NebulaZone,
  BeaconScene,
};
