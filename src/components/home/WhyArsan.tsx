"use client";

import { Zap, ShieldCheck, Search, PenTool, Layers, type LucideIcon } from "lucide-react";
import { SectionHeading, Reveal, Scrim } from "./Section";
import { whyArsan } from "@/lib/content";

const ICONS: Record<string, LucideIcon> = {
  zap: Zap,
  shield: ShieldCheck,
  search: Search,
  pen: PenTool,
  layers: Layers,
};

export default function WhyArsan() {
  const [first, ...rest] = whyArsan.items;

  return (
    <section id="why" className="relative scroll-mt-24 py-28 sm:py-36" aria-label="چرا آرسان">
      <Scrim variant="r" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          index="۰۳"
          eyebrow={whyArsan.title}
          title={<>تفاوت، در <span className="text-gradient">مهندسی</span> است.</>}
          desc={whyArsan.desc}
        />

        <div className="grid gap-4 md:grid-cols-6">
          {/* flagship cell */}
          <Reveal className="md:col-span-4">
            <div className="card-hover glass relative h-full overflow-hidden rounded-3xl p-8 sm:p-10">
              <div
                aria-hidden
                className="aurora aurora-volt right-[-20%] top-[-40%] h-80 w-80 opacity-70"
              />
              <div className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-volt/30 bg-volt/10 text-volt">
                  {(() => {
                    const Icon = ICONS[first.icon] ?? Zap;
                    return <Icon className="h-5 w-5" strokeWidth={1.8} />;
                  })()}
                </span>
                <h3 className="mt-6 text-2xl font-black sm:text-3xl">{first.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-8 text-mist sm:text-[15px]">
                  {first.desc}
                </p>
                <span
                  dir="ltr"
                  className="font-grotesk mt-7 inline-flex items-center gap-2 rounded-full border border-line bg-night/60 px-4 py-2 text-xs font-semibold tracking-wider text-volt-2"
                >
                  <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-volt" />
                  {first.metric}
                </span>
              </div>
            </div>
          </Reveal>

          {/* second cell (tall) */}
          <Reveal delay={0.08} className="md:col-span-2">
            <div className="card-hover glass h-full rounded-3xl p-8">
              {(() => {
                const Icon = ICONS[rest[0].icon] ?? ShieldCheck;
                return (
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-ember/30 bg-ember/10 text-ember">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                );
              })()}
              <h3 className="mt-6 text-xl font-black">{rest[0].title}</h3>
              <p className="mt-3 text-sm leading-8 text-mist">{rest[0].desc}</p>
            </div>
          </Reveal>

          {/* three equal cells */}
          {rest.slice(1).map((item, i) => {
            const Icon = ICONS[item.icon] ?? Layers;
            return (
              <Reveal key={item.title} delay={0.06 * (i + 1)} className="md:col-span-2">
                <div className="card-hover glass h-full rounded-3xl p-7 sm:p-8">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl border border-line bg-night-2/70 text-volt-2">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 text-lg font-black leading-relaxed">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-7 text-mist">{item.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
