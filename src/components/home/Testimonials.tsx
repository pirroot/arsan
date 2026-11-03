"use client";

import { Quote } from "lucide-react";
import { SectionHeading, Reveal, Scrim } from "./Section";
import { testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative scroll-mt-24 py-28 sm:py-36" aria-label="نظرات مشتریان">
      <Scrim variant="center" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="۰۵"
          eyebrow="اعتماد مشتریان"
          title={
            <>
              چیزی که <span className="text-gradient">کارفرماها</span> می‌گویند
            </>
          }
        />

        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.items.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="card-hover glass relative h-full rounded-3xl p-8 sm:p-10">
                <span className="absolute left-6 top-6 rounded-full border border-dashed border-line px-3 py-1 text-[10px] text-mist/70">
                  نمونه محتوا
                </span>
                <Quote className="h-8 w-8 text-volt/50" strokeWidth={1.4} aria-hidden />
                <blockquote className="mt-6 text-base leading-9 text-ink/95 sm:text-lg sm:leading-10">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-line bg-night-2 text-sm font-bold text-volt">
                    {t.author.slice(0, 1)}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{t.author}</span>
                    <span className="block text-xs text-mist">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="text-center text-[11px] text-mist/60">{testimonials.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
