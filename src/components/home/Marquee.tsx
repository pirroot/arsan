"use client";

import { marqueeItems } from "@/lib/content";

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div
      dir="ltr"
      className="marquee-paused relative overflow-hidden border-y border-line bg-night-2/50 py-5"
      aria-hidden
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-night to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-night to-transparent" />

      <div className="marquee-track items-center gap-10">
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span
              className={
                /[A-Za-z0-9&]/.test(item)
                  ? "font-grotesk text-lg font-semibold uppercase tracking-[0.18em] text-mist"
                  : "text-lg font-bold text-mist"
              }
            >
              {item}
            </span>
            <span className="inline-block h-1.5 w-1.5 rotate-45 rounded-[2px] bg-ember/70" />
          </span>
        ))}
      </div>
    </div>
  );
}
