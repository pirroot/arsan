"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { SectionHeading, Scrim } from "./Section";
import { useQuote } from "@/components/quote/QuoteProvider";
import { services } from "@/lib/content";

export default function Services() {
  const { openQuote } = useQuote();
  const reduced = useReducedMotion();

  return (
    <section id="services" className="relative scroll-mt-24 py-28 sm:py-36" aria-label="خدمات آرسان">
      <Scrim variant="r" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="۰۱"
          eyebrow="خدمات تخصصی"
          title={
            <>
              پنج ستون <span className="text-gradient">رشد دیجیتال</span>
            </>
          }
          desc="هر خدمت یک سیستم کامل است؛ از استراتژی تا اجرا و گزارش ماهانه. روی هر ردیف کلیک کنید و مستقیم استعلام بگیرید."
        />

        <ul className="border-t border-line">
          {services.map((s, i) => (
            <motion.li
              key={s.index}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className="group relative border-b border-line transition-colors duration-500 first:border-t hover:bg-[rgba(12,22,40,0.55)]"
            >
              {/* hover glow */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(60% 120% at 85% 50%, rgba(59,157,255,0.09), transparent 70%)",
                }}
              />

              <button
                onClick={() => openQuote(s.title)}
                className="relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-7 text-right sm:gap-8 sm:py-9"
                aria-label={`استعلام برای ${s.title}`}
              >
                <span className="font-grotesk text-sm font-bold text-mist/70 transition-colors group-hover:text-ember sm:text-base">
                  {s.index}
                </span>

                <span>
                  <span className="block text-xl font-extrabold leading-snug transition-transform duration-500 group-hover:-translate-y-0.5 sm:text-3xl md:text-4xl">
                    {s.title}
                  </span>
                  <span className="mt-2.5 block max-w-2xl text-sm leading-7 text-mist sm:text-[15px] sm:leading-8">
                    {s.desc}
                  </span>
                  <span className="mt-3.5 hidden flex-wrap gap-2 sm:flex">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line px-3 py-1 text-[11px] text-mist/90"
                      >
                        {t}
                      </span>
                    ))}
                  </span>
                </span>

                <span className="grid h-11 w-11 place-items-center rounded-full border border-line text-mist transition-all duration-500 group-hover:border-ember group-hover:bg-ember group-hover:text-night sm:h-14 sm:w-14">
                  <ArrowUpLeft className="h-4 w-4 transition-transform duration-500 group-hover:scale-110 sm:h-5 sm:w-5" />
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
