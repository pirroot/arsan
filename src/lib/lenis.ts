"use client";

import type Lenis from "lenis";

/** Lenis singleton — shared between the provider and nav anchors. */
export const lenisRef: { current: Lenis | null } = { current: null };

export function scrollToId(hash: string) {
  const id = hash.startsWith("#") ? hash.slice(1) : hash;
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisRef.current) {
    lenisRef.current.scrollTo(el, { offset: -84, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
