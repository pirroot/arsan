"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { manifesto } from "@/lib/content";
import { Scrim } from "./Section";

function Word({
  word,
  progress,
  range,
  highlight,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  highlight: boolean;
}) {
  const opacity = useTransform(progress, range, [0.26, 1]);
  const color = highlight ? "text-gradient" : "";
  return (
    <motion.span
      style={{ opacity }}
      className={highlight ? "inline-block" : "inline-block"}
    >
      <span className={color || undefined}>{word}</span>{" "}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = manifesto.text.split(" ");
  const highlights = new Set<string>(manifesto.highlightWords);

  return (
    <section id="manifesto" className="relative overflow-hidden py-28 sm:py-36" aria-label="بیانیه آرسان">
      <div
        aria-hidden
        className="aurora aurora-volt left-[-15%] top-[20%] h-[30rem] w-[30rem] opacity-60"
      />
      <Scrim variant="center" />
      <div ref={ref} className="relative mx-auto max-w-5xl px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          dir="ltr"
          className="font-grotesk mb-8 text-xs uppercase tracking-[0.3em] text-volt/80"
        >
          {manifesto.caption}
        </motion.p>
        <p className="text-[clamp(1.55rem,4.2vw,3rem)] font-extrabold leading-[1.65] tracking-tight sm:leading-[1.7]">
          {words.map((word, i) => (
            <Word
              key={i}
              word={word}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
              highlight={highlights.has(word)}
            />
          ))}
        </p>
      </div>
    </section>
  );
}
