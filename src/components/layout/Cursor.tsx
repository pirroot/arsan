"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** کرسر سفارشی دسکتاپ — نقطه‌ی کهربایی + حلقه‌ی تعقیبی آبی که روی
    عناصر تعاملی بزرگ می‌شود. روی لمسی/Reduced غیرفعال است. */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 320, damping: 30, mass: 0.55 });
  const ry = useSpring(y, { stiffness: 320, damping: 30, mass: 0.55 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    // async callback — avoid sync setState inside the effect body
    const t = window.setTimeout(() => setEnabled(true), 0);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHot(!!t?.closest("a, button, [role='button'], [data-cursor-hot], label, select"));
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("pointerdown", dn, { passive: true });
    window.addEventListener("pointerup", up, { passive: true });

    return () => {
      window.clearTimeout(t);
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="cursor-ring"
        style={{ x: rx, y: ry }}
        animate={{ scale: down ? 0.8 : hot ? 1.65 : 1, opacity: hot ? 0.95 : 0.55 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
      />
      <motion.div
        aria-hidden
        className="cursor-dot"
        style={{ x, y }}
        animate={{ scale: down ? 0.65 : hot ? 0.5 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </>
  );
}
