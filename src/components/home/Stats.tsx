"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Reveal } from "./Section";
import { stats } from "@/lib/content";

function StatItem({
  item,
}: {
  item: (typeof stats.items)[number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) =>
    (Math.round(v * 10) / 10).toLocaleString("fa-IR", {
      maximumFractionDigits: item.decimals,
    })
  );

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      mv.set(item.value);
      return;
    }
    const controls = animate(mv, item.value, { duration: 1.8, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, item.value, reduced, mv]);

  return (
    <div ref={ref} className="relative text-center md:text-right">
      {/* dir=ltr so Latin prefix/suffix tokens (<, s, x, +) keep correct order */}
      <div dir="ltr" className="flex items-baseline justify-center gap-1 md:justify-start">
        {"prefix" in item && item.prefix && (
          <span dir="ltr" className="text-gradient text-3xl font-black sm:text-5xl">
            {item.prefix}
          </span>
        )}
        <motion.span dir="ltr" className="text-gradient text-4xl font-black tabular-nums sm:text-6xl">
          {text}
        </motion.span>
        <span dir="ltr" className="text-gradient text-2xl font-black sm:text-4xl">
          {item.suffix}
        </span>
      </div>
      <p className="mt-3 text-sm text-mist">{item.label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative border-y border-line bg-night-2/60 py-16 sm:py-20" aria-label="نتایج کسب‌وکار">
      {/* hairline گرادیانی بالا و پایین */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-volt/50 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-l from-transparent via-ember/40 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {stats.items.map((item) => (
            <StatItem key={item.label} item={item} />
          ))}
        </div>
        <Reveal className="mt-12">
          <p className="text-center text-[11px] text-mist/60">{stats.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}
