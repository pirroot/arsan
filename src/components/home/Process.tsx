"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading, Scrim } from "./Section";
import { processSteps } from "@/lib/content";

export default function Process() {
  const reduced = useReducedMotion();

  return (
    <section id="process" className="relative scroll-mt-24 overflow-hidden py-28 sm:py-36" aria-label="فرآیند همکاری">
      <div
        aria-hidden
        className="aurora aurora-ember right-[-15%] top-[10%] h-[26rem] w-[26rem] opacity-50"
      />
      <Scrim variant="r" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="۰۴"
          eyebrow="فرآیند همکاری"
          title={
            <>
              از ایده تا رشد، در <span className="text-gradient">چهار فاز شفاف</span>
            </>
          }
          desc="در هر فاز دقیقاً می‌دانید چه چیزی، کِی و با چه معیار تحویل گرفته می‌شود."
        />

        <ol className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* connector line (desktop) */}
          <div
            aria-hidden
            className="absolute right-0 top-7 hidden h-px w-full bg-gradient-to-l from-volt/40 via-line to-ember/40 lg:block"
          />

          {processSteps.map((step, i) => (
            <motion.li
              key={step.index}
              initial={reduced ? false : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="relative"
            >
              <div className="flex items-center gap-4 lg:block">
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-line bg-night-2 font-grotesk text-sm font-bold text-ink shadow-[0_0_0_6px_rgba(5,10,20,0.9)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-grotesk text-xs tracking-widest text-mist/60 lg:mt-5 lg:block">
                  فاز {step.index}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-black leading-relaxed lg:mt-2">{step.title}</h3>
              <p className="mt-2.5 max-w-xs text-sm leading-7 text-mist">{step.desc}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
