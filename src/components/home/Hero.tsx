"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { scrollToId } from "@/lib/lenis";
import { useQuote } from "@/components/quote/QuoteProvider";
import { useAppStore } from "@/lib/app-store";
import Magnetic from "@/components/motion/Magnetic";
import { hero } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const fadeUpV = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};
const lineV = {
  hidden: { y: "112%" },
  show: { y: 0, transition: { duration: 1, ease: EASE } },
};
const metaV = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1 } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { openQuote } = useQuote();
  const ready = useAppStore((s) => s.ready);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 130]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const state = reduced || ready ? "show" : "hidden";

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex h-[100svh] min-h-[640px] flex-col overflow-hidden"
      aria-label="معرفی آژانس آرسان"
    >
      {/* هاله‌ی محیطی — هم عمق‌دهی روی دنیای WebGL و هم جایگزین بدون‌وب‌جی‌ال */}
      <div aria-hidden className="absolute inset-0">
        <div className="aurora aurora-volt aurora-anim -top-40 right-[-10%] h-[46rem] w-[46rem] opacity-50" />
        <div className="aurora aurora-ember aurora-anim bottom-[-20%] left-[-12%] h-[38rem] w-[38rem] opacity-40 [animation-delay:-6s]" />
        <div className="grid-bg absolute inset-0 opacity-70" />
        {/* وینیت خوانایی متن */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(5,10,20,0.62),transparent_72%)]" />
        {/* محو نرم پایین هیرو به سمت نوار متحرک */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night/70" />
      </div>

      {/* giant brand watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span className="font-grotesk text-outline select-none text-[26vw] font-bold leading-none tracking-tighter opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_75%)]">
          ARSAN
        </span>
      </div>

      {/* content */}
      <motion.div
        variants={containerV}
        initial="hidden"
        animate={state}
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 sm:px-8"
      >
        <motion.div variants={fadeUpV} className="mb-7 flex items-center gap-3">
          <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-volt" />
          <span className="text-sm font-medium text-mist">{hero.eyebrow}</span>
        </motion.div>

        <h1 className="ink-glow max-w-4xl text-[clamp(2.6rem,7.5vw,6.2rem)] font-black leading-[1.12] tracking-tight">
          {hero.titleLines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-1">
              <motion.span
                className={i === hero.gradientLineIndex ? "text-gradient-anim block" : "block"}
                variants={lineV}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          variants={fadeUpV}
          className="mt-7 max-w-xl text-base leading-8 text-mist sm:text-lg sm:leading-9"
        >
          {hero.sub}
        </motion.p>

        <motion.div variants={fadeUpV} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <button
              onClick={() => openQuote()}
              className="btn-ember rounded-full px-8 py-4 text-sm font-extrabold sm:text-base"
            >
              {hero.primaryCta}
            </button>
          </Magnetic>
          <button
            onClick={() => scrollToId("services")}
            className="btn-ghost-ring group flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-ink sm:text-base"
          >
            {hero.secondaryCta}
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          </button>
        </motion.div>
      </motion.div>

      {/* bottom meta bar */}
      <motion.div
        variants={containerV}
        initial="hidden"
        animate={state}
        className="relative z-10 mx-auto flex w-full max-w-7xl items-end justify-between px-5 pb-8 sm:px-8"
      >
        <motion.div variants={metaV} className="flex items-center gap-3">
          <span className="relative block h-10 w-px overflow-hidden bg-line">
            <span className="scroll-cue-line absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-volt to-transparent" />
          </span>
          <span className="text-xs text-mist/80">{hero.scrollHint}</span>
        </motion.div>
        <motion.span
          variants={metaV}
          className="font-grotesk hidden text-[11px] uppercase tracking-[0.22em] text-mist/60 md:inline"
          aria-hidden
        >
          WebGL · Next.js · Headless
        </motion.span>
      </motion.div>
    </section>
  );
}
