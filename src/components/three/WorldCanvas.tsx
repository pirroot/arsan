"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CHAPTER_KEYS, pointer, world, type ChapterKey } from "@/lib/scroll-store";
import { useAppStore } from "@/lib/app-store";

/** صحنه‌ی سه‌بعدی به‌صورت lazy و فقط سمت کلاینت بارگذاری می‌شود؛
    پوسته‌ی DOM (شامل تیتر هیرو) بدون منتظر WebGL نقاشی می‌شود. */
const Scene = dynamic(() => import("./Scene"), { ssr: false });

/** ترتیب فصل‌ها = ترتیب سکشن‌های DOM در صفحه */
const SECTION_IDS: Record<ChapterKey, string> = {
  hero: "hero",
  manifesto: "manifesto",
  services: "services",
  work: "work",
  why: "why",
  process: "process",
  testimonials: "testimonials",
  cta: "cta",
};

/** اندازه‌گیری لحظه‌ی «رسیدن» هر فصل از هندسه‌ی واقعی صفحه */
function measureChapters() {
  const vh = window.innerHeight;
  const doc = document.documentElement;
  const max = Math.max(doc.scrollHeight - vh, 1);
  let ok = true;

  for (const k of CHAPTER_KEYS) {
    const el = document.getElementById(SECTION_IDS[k]);
    if (!el) {
      ok = false;
      break;
    }
    const r = el.getBoundingClientRect();
    const center = r.top + window.scrollY + r.height / 2;
    world.chapterP[k] = Math.min(Math.max((center - vh / 2) / max, 0), 1);
  }

  if (ok) {
    // یکنواخت‌سازی: هر فصل حداقل ۲٪ بعد از فصل قبلی
    for (let i = 1; i < CHAPTER_KEYS.length; i++) {
      world.chapterP[CHAPTER_KEYS[i]] = Math.max(
        world.chapterP[CHAPTER_KEYS[i]],
        world.chapterP[CHAPTER_KEYS[i - 1]] + 0.02
      );
    }
    world.measured = true;
  }
}

function webglSupported(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function WorldCanvas() {
  const [ok, setOk] = useState<boolean | null>(null);
  const setWebgl = useAppStore((s) => s.setWebgl);

  useEffect(() => {
    const t = window.setTimeout(() => {
      const supported = webglSupported();
      setOk(supported);
      setWebgl(supported ? "on" : "off");
    }, 0);

    // pointer مشترک برای پارالاکس دوربین
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
      pointer.active = true;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    // هم‌گام‌سازی فصل‌ها با هندسه‌ی واقعی صفحه
    measureChapters();
    const onLoad = () => measureChapters();
    window.addEventListener("load", onLoad);
    document.fonts?.ready.then(() => measureChapters()).catch(() => {});
    let rid = 0;
    const onResize = () => {
      cancelAnimationFrame(rid);
      rid = requestAnimationFrame(measureChapters);
    };
    window.addEventListener("resize", onResize);
    // شبکه‌ی ایمن برای جابه‌جایی layout (فونت/تصویر) در ثانیه‌های اول
    const iv = window.setInterval(measureChapters, 1200);
    const stop = window.setTimeout(() => window.clearInterval(iv), 15000);

    return () => {
      window.clearTimeout(t);
      window.clearTimeout(stop);
      window.clearInterval(iv);
      window.cancelAnimationFrame(rid);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onResize);
    };
  }, [setWebgl]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      {ok === false && <CssWorld />}
      {ok === true && <Scene />}
    </div>
  );
}

/** جایگزین CSS برای دستگاه‌های بدون WebGL — دنیای همچنان زنده */
function CssWorld() {
  return (
    <div className="absolute inset-0">
      <div className="aurora aurora-volt aurora-anim top-[-15%] right-[-12%] h-[42rem] w-[42rem]" />
      <div className="aurora aurora-ember aurora-anim bottom-[-18%] left-[-14%] h-[36rem] w-[36rem] [animation-delay:-7s]" />
      <div className="grid-bg absolute inset-0" />
    </div>
  );
}
