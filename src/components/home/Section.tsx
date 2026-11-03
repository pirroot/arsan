"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** پرده‌ی خوانایی — بین دنیای سه‌بعدی و متن سکشن */
export function Scrim({
  variant = "r",
  className = "",
}: {
  variant?: "r" | "center";
  className?: string;
}) {
  return <div aria-hidden className={`scrim scrim-${variant} ${className}`} />;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  desc,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
}) {
  return (
    <div className="mb-14 max-w-3xl sm:mb-16">
      <Reveal>
        <div className="mb-5 flex items-center gap-3">
          <span className="font-grotesk text-xs font-bold tracking-widest text-ember">{index}</span>
          <span className="h-px w-10 bg-gradient-to-l from-volt/60 to-transparent" />
          <span className="text-sm font-medium text-mist">{eyebrow}</span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="ink-glow text-3xl font-black leading-[1.25] tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-2xl text-base leading-8 text-mist">{desc}</p>
        </Reveal>
      )}
    </div>
  );
}
