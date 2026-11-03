"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { lenisRef } from "@/lib/lenis";
import { pageScroll } from "@/lib/scroll-store";

/**
 * Smooth scrolling (Lenis) — disabled automatically for users
 * who prefer reduced motion. Feeds the shared pageScroll store
 * (progress 0..1 + velocity) that drives the 3D camera journey.
 * When Lenis is off (reduced motion) a plain scroll listener
 * keeps the 3D world perfectly in sync with native scrolling.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const doc = document.documentElement;

    const readNative = () => {
      const max = Math.max(doc.scrollHeight - window.innerHeight, 1);
      pageScroll.progress = Math.min(Math.max(window.scrollY / max, 0), 1);
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      readNative();
      window.addEventListener("scroll", readNative, { passive: true });
      return () => window.removeEventListener("scroll", readNative);
    }

    const lenis = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onScroll = (e: Lenis) => {
      pageScroll.progress = e.progress ?? 0;
      pageScroll.velocity = e.velocity ?? 0;
    };
    lenis.on("scroll", onScroll);
    readNative();

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
