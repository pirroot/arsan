"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpLeft } from "lucide-react";
import { caseStudies, workCategories, caseStudyFootnote } from "@/lib/content";

/** گرید نمونه‌کارها با فیلتر دسته‌بندی — صفحه /work */
export default function WorkGrid() {
  const [filter, setFilter] = useState<string>("all");
  const visible =
    filter === "all" ? caseStudies : caseStudies.filter((c) => c.category === filter);

  return (
    <div>
      {/* فیلترها */}
      <div
        className="mb-12 flex flex-wrap items-center gap-2.5"
        role="group"
        aria-label="فیلتر نمونه‌کارها بر اساس صنعت"
      >
        {workCategories.map((c) => {
          const active = filter === c.key;
          const count =
            c.key === "all"
              ? caseStudies.length
              : caseStudies.filter((x) => x.category === c.key).length;
          return (
            <button
              key={c.key}
              onClick={() => setFilter(c.key)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 sm:text-sm ${
                active
                  ? "border-ember bg-ember/10 text-ember"
                  : "border-line text-mist hover:border-volt/50 hover:text-ink"
              }`}
            >
              {c.label}
              <span className="ms-2 text-[10px] opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* گرید کارت‌ها */}
      <motion.div layout className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((item) => (
            <motion.article
              key={item.slug}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/work/${item.slug}`}
                className="card-hover group block overflow-hidden rounded-3xl border border-line bg-night-2/50"
                aria-label={`مطالعه‌ی موردی: ${item.title}`}
              >
                {/* تصویر */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`نمونه‌کار نمایشی: ${item.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-ember/50 bg-night/70 px-3 py-1 text-[10px] font-medium text-ember backdrop-blur">
                    نمونه دمو
                  </span>
                  {/* متریک شاخص */}
                  <div className="absolute bottom-4 right-4 flex items-baseline gap-2">
                    <span className="text-gradient text-2xl font-black">{item.metric}</span>
                    <span className="text-[10px] text-mist">{item.metricLabel}</span>
                  </div>
                </div>

                {/* متن */}
                <div className="p-6">
                  <div className="flex items-center gap-2.5 text-[11px] text-mist">
                    <span className="font-grotesk font-bold text-ember">{item.index}</span>
                    <span className="h-px w-6 bg-line" />
                    <span>{item.industry}</span>
                    <span className="opacity-60">· {item.year}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-black leading-snug transition-colors group-hover:text-volt sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 line-clamp-2 text-[13px] leading-6 text-mist">
                    {item.desc}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line px-2.5 py-0.5 text-[10px] text-mist/90"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-mist transition-all duration-500 group-hover:border-ember group-hover:bg-ember group-hover:text-night">
                      <ArrowUpLeft className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="mt-12 text-center text-xs text-mist/70">{caseStudyFootnote}</p>
    </div>
  );
}
