import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Reveal } from "@/components/home/Section";

type PageHeroProps = {
  index: string;
  eyebrow: string;
  titleLines: readonly string[];
  accentIndex?: number;
  desc?: string;
  breadcrumb: { label: string; href?: string }[];
  children?: React.ReactNode;
};

/** هدر مشترک صفحات داخلی — هم‌خانواده‌ی هیرو صفحه اصلی */
export default function PageHero({
  index,
  eyebrow,
  titleLines,
  accentIndex = 1,
  desc,
  breadcrumb,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-14 pt-32 sm:pb-20 sm:pt-44">
      {/* نورهای محیطی + شبکه */}
      <div aria-hidden className="aurora aurora-volt aurora-anim absolute -top-24 right-[6%] h-72 w-72" />
      <div aria-hidden className="aurora aurora-ember absolute left-[4%] top-40 h-56 w-56 opacity-70" />
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {/* breadcrumb */}
        <Reveal>
          <nav aria-label="مسیر صفحه" className="mb-10">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-mist">
              {breadcrumb.map((b, i) => (
                <li key={b.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronLeft className="h-3.5 w-3.5 text-mist/50" aria-hidden />}
                  {b.href ? (
                    <Link href={b.href} className="transition-colors hover:text-volt">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="text-ink" aria-current="page">
                      {b.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mb-6 flex items-center gap-3">
            <span className="font-grotesk text-xs font-bold tracking-widest text-ember">{index}</span>
            <span className="h-px w-10 bg-gradient-to-l from-volt/60 to-transparent" />
            <span className="text-sm font-medium text-mist">{eyebrow}</span>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <h1 className="ink-glow text-4xl font-black leading-[1.22] tracking-tight sm:text-5xl md:text-6xl">
            {titleLines.map((line, i) =>
              i === accentIndex ? (
                <span key={i} className="text-gradient-anim block">
                  {line}
                </span>
              ) : (
                <span key={i} className="block">
                  {line}
                </span>
              )
            )}
          </h1>
        </Reveal>

        {desc && (
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-2xl text-base leading-8 text-mist sm:text-lg sm:leading-9">
              {desc}
            </p>
          </Reveal>
        )}

        {children && <Reveal delay={0.28}>{children}</Reveal>}
      </div>
    </section>
  );
}
