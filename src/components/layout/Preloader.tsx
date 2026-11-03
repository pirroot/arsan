"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "@/lib/app-store";

const EASE = [0.22, 1, 0.36, 1] as const;

/** پرده‌ی ورود — تا آماده‌شدن فونت‌ها و صحنه‌ی سه‌بعدی می‌ماند،
    بعد با یک فید نرم دنیای WebGL خودش را نشان می‌دهد. */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const setReady = useAppStore((s) => s.setReady);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const min = reduced ? 450 : 1250;
    const start = performance.now();
    let raf = 0;
    let finished = false;

    const tick = (now: number) => {
      const elapsed = now - start;
      const timePart = Math.min(elapsed / min, 1) * 92;
      const fontsPart = document.fonts?.status === "loaded" ? 5 : 0;
      const scenePart = useAppStore.getState().webgl !== "pending" ? 3 : 0;
      const target = Math.min(timePart + fontsPart + scenePart, 99);
      setProgress((p) => Math.max(p, target));

      if (!finished && elapsed >= min && (useAppStore.getState().webgl !== "pending" || reduced)) {
        finished = true;
        setProgress(100);
        window.setTimeout(() => {
          setDone(true);
          setReady(true);
        }, 280);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // تور ایمنی: حداکثر ۴ ثانیه صبر
    const failsafe = window.setTimeout(() => {
      if (!finished) {
        finished = true;
        setProgress(100);
        window.setTimeout(() => {
          setDone(true);
          setReady(true);
        }, 200);
      }
    }, 4000);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
    };
  }, [setReady]);

  // قفل اسکرول تا پایان پری‌لودر
  useEffect(() => {
    if (done) {
      document.documentElement.style.overflow = "";
      return;
    }
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [done]);

  const pct = Math.round(progress).toLocaleString("fa-IR");

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-night"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.025, transition: { duration: 0.75, ease: EASE } }}
          role="status"
          aria-label="در حال بارگذاری"
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col items-center"
          >
            <span dir="ltr" className="font-grotesk text-4xl font-bold tracking-tight text-ink">
              ARSAN<span className="text-ember">.</span>
            </span>
            <span className="mt-2 text-[11px] tracking-[0.25em] text-mist">آژانس دیجیتال</span>

            <div className="relative mt-9 h-px w-44 overflow-hidden bg-line">
              <motion.div
                className="absolute inset-y-0 right-0 bg-gradient-to-l from-ember to-volt"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-4 flex items-center gap-3 text-[11px] text-mist/80">
              <span dir="ltr" className="font-grotesk tabular-nums">
                {pct}٪
              </span>
              <span className="h-3 w-px bg-line" />
              <span>در حال ساخت دنیای سه‌بعدی…</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
