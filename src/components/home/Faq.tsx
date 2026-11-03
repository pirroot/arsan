"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading, Reveal, Scrim } from "./Section";
import { useQuote } from "@/components/quote/QuoteProvider";
import { faqs } from "@/lib/content";

function FaqItem({
  item,
  open,
  onToggle,
}: {
  item: (typeof faqs)[number];
  open: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotion();
  return (
    <div className="border-b border-line">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-right"
      >
        <span
          className={`text-base font-bold leading-8 transition-colors sm:text-lg ${
            open ? "text-ink" : "text-ink/85"
          }`}
        >
          {item.q}
        </span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
            open ? "rotate-45 border-ember bg-ember text-night" : "border-line text-mist"
          }`}
        >
          <Plus className="h-4 w-4" />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-7 text-sm leading-8 text-mist sm:text-[15px]">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openQuote } = useQuote();

  return (
    <section id="faq" className="relative scroll-mt-24 py-28 sm:py-36" aria-label="سوالات متداول">
      <Scrim variant="r" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                index="۰۶"
                eyebrow="سوالات متداول"
                title={
                  <>
                    پاسخ شفاف، <span className="text-gradient">قبل از هر سوال</span>
                  </>
                }
                desc="اگر پاسخ‌تان را پیدا نکردید، مستقیم بپرسید — ظرف ۲ ساعت کاری جواب می‌گیرید."
              />
              <Reveal>
                <button
                  onClick={() => openQuote()}
                  className="btn-ember rounded-full px-7 py-3.5 text-sm font-extrabold"
                >
                  پرسیدن سوال اختصاصی
                </button>
              </Reveal>
            </div>
          </div>

          <Reveal className="lg:col-span-7" delay={0.1}>
            <div className="border-t border-line">
              {faqs.map((f, i) => (
                <FaqItem
                  key={i}
                  item={f}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
