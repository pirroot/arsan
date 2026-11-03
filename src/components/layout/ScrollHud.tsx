"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { scrollToId } from "@/lib/lenis";

/** فهرست سفر — همان ۸ فصل دنیای سه‌بعدی + سوالات */
const CHAPTERS = [
  { id: "hero", label: "خانه" },
  { id: "manifesto", label: "مانیفست" },
  { id: "services", label: "خدمات" },
  { id: "work", label: "نمونه‌کارها" },
  { id: "why", label: "چرا آرسان" },
  { id: "process", label: "فرآیند" },
  { id: "testimonials", label: "نظرات" },
  { id: "faq", label: "سوالات" },
  { id: "cta", label: "شروع" },
] as const;

export default function ScrollHud() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );
    for (const c of CHAPTERS) {
      const el = document.getElementById(c.id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* خط پیشرفت سفر */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-right bg-gradient-to-l from-volt via-volt-2 to-ember"
        style={{ scaleX }}
      />

      {/* ناوبری فصل‌ها (دسکتاپ) */}
      <nav
        aria-label="فصل‌های صفحه"
        className="fixed left-5 top-1/2 z-[60] hidden -translate-y-1/2 flex-col items-center gap-2.5 lg:flex"
      >
        {CHAPTERS.map((c) => {
          const isActive = active === c.id;
          return (
            <button
              key={c.id}
              onClick={() => scrollToId(c.id)}
              aria-label={`پرش به ${c.label}`}
              aria-current={isActive ? "true" : undefined}
              className="group relative grid h-4 w-4 place-items-center"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "h-2 w-2 bg-ember shadow-[0_0_10px_rgba(255,122,26,0.85)]"
                    : "h-1.5 w-1.5 bg-mist/35 group-hover:bg-volt"
                }`}
              />
              <span className="pointer-events-none absolute left-6 whitespace-nowrap rounded-full border border-line bg-night/85 px-3 py-1 text-[11px] text-mist opacity-0 backdrop-blur transition-all duration-300 group-hover:left-7 group-hover:opacity-100">
                {c.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
