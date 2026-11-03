"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Magnetic from "@/components/motion/Magnetic";
import { useQuote } from "@/components/quote/QuoteProvider";
import { finalCta } from "@/lib/content";

export default function FinalCta() {
  const { openQuote } = useQuote();
  const reduced = useReducedMotion();

  return (
    <section id="cta" className="relative scroll-mt-24 overflow-hidden py-32 sm:py-44" aria-label="شروع همکاری">
      {/* ambient */}
      <div aria-hidden className="absolute inset-0">
        <div className="aurora aurora-volt left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 opacity-70" />
        <div className="grid-bg absolute inset-0 opacity-70" />
        {/* اسکریم مرکزی برای خوانایی تیتر بزرگ روی منار نورانی 3D */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_52%_at_50%_48%,rgba(5,10,20,0.6),transparent_76%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="ink-glow text-[clamp(2.4rem,7vw,5.5rem)] font-black leading-[1.2] tracking-tight"
        >
          {finalCta.title[0]}
          <br />
          <span className="text-gradient">{finalCta.title[1]}</span>
        </motion.h2>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mx-auto mt-6 max-w-xl text-base leading-8 text-mist"
        >
          {finalCta.desc}
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="mt-10 flex flex-col items-center gap-5"
        >
          <Magnetic>
            <button
              onClick={() => openQuote()}
              className="btn-ember group flex items-center gap-3 rounded-full px-10 py-5 text-base font-extrabold sm:text-lg"
            >
              {finalCta.button}
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1.5" />
            </button>
          </Magnetic>
          <span className="flex items-center gap-2 rounded-full border border-line bg-night/70 px-5 py-2.5 text-xs text-mist backdrop-blur-sm">
            <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {finalCta.availability}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
