"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { SectionHeading, Reveal, Scrim } from "./Section";
import { useQuote } from "@/components/quote/QuoteProvider";
import { caseStudies, caseStudyFootnote } from "@/lib/content";

function CaseItem({ item, flip }: { item: (typeof caseStudies)[number]; flip: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-7%", "7%"]);

  return (
    <article
      ref={ref}
      className="grid items-center gap-8 py-12 md:grid-cols-12 md:gap-12 lg:gap-16"
    >
      {/* visual */}
      <Reveal
        className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}
      >
        <div className="group relative overflow-hidden rounded-3xl border border-line">
          <div className="relative aspect-[16/10] overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-[-8%]">
              <Image
                src={item.image}
                alt={`نمونه‌کار نمایشی: ${item.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
          </div>

          {/* floating metric chip */}
          <div className="glass absolute bottom-4 right-4 flex items-baseline gap-2 rounded-2xl px-4 py-3 sm:bottom-6 sm:right-6">
            <span className="text-gradient text-2xl font-black sm:text-3xl">{item.metric}</span>
            <span className="text-[11px] text-mist sm:text-xs">{item.metricLabel}</span>
          </div>

          <span className="absolute left-4 top-4 rounded-full border border-ember/50 bg-night/70 px-3 py-1 text-[11px] font-medium text-ember backdrop-blur sm:left-5 sm:top-5">
            نمونه دمو
          </span>
        </div>
      </Reveal>

      {/* copy */}
      <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
        <Reveal delay={0.1}>
          <div className="flex items-center gap-3">
            <span className="font-grotesk text-sm font-bold text-ember">{item.index}</span>
            <span className="h-px w-8 bg-line" />
            <span className="text-xs text-mist">
              {item.client} · {item.industry}
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.16}>
          <h3 className="mt-4 text-2xl font-black leading-snug sm:text-3xl md:text-4xl">
            {item.title}
          </h3>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mt-4 text-sm leading-8 text-mist sm:text-[15px]">{item.desc}</p>
        </Reveal>
        <Reveal delay={0.28}>
          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-night-2/60 px-3 py-1 text-[11px] text-mist"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.34}>
          <Link
            href={`/work/${item.slug}`}
            className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-mist transition-colors hover:text-ember"
          >
            <span className="rounded-full border border-line px-4 py-2 transition-colors group-hover:border-ember/60">
              مطالعه‌ی کامل موردی
            </span>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}

export default function CaseStudies() {
  const { openQuote } = useQuote();
  return (
    <section id="work" className="relative scroll-mt-24 py-28 sm:py-36" aria-label="نمونه‌کارها">
      <Scrim variant="center" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="۰۲"
          eyebrow="نمونه‌کارها و نتایج"
          title={
            <>
              نتایج، <span className="text-gradient">به زبان اعداد</span>
            </>
          }
          desc="هر پروژه یک مطالعه‌ی موردی عمیق است: چالش، استراتژی و نتیجه‌ی قابل اندازه‌گیری."
        />

        <div className="divide-y divide-line">
          {caseStudies.map((c, i) => (
            <CaseItem key={c.index} item={c} flip={i % 2 === 1} />
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="text-center text-xs text-mist/70">{caseStudyFootnote}</p>
        </Reveal>

        <Reveal className="mt-10 text-center">
          <button
            onClick={() => openQuote()}
            className="btn-ghost-ring rounded-full px-8 py-4 text-sm font-bold"
          >
            می‌خواهم نتایجی مشابه برای برند خودم بسازم
          </button>
        </Reveal>
      </div>
    </section>
  );
}
