import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpLeft, CheckCircle2, Clock, Package } from "lucide-react";
import QuoteCta from "@/components/quote/QuoteCta";
import { Reveal } from "@/components/home/Section";
import { caseStudies, workCategories } from "@/lib/content";
import { caseDetails } from "@/lib/content-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = caseStudies.find((c) => c.slug === slug);
  if (!item) return {};
  const description = `${item.desc} — مطالعه‌ی موردی ${item.title} در آژانس دیجیتال آرسان.`;
  return {
    title: item.title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${item.title} | آژانس دیجیتال آرسان`,
      description,
      url: `/work/${slug}`,
      images: [{ url: item.image, width: 1200, height: 750, alt: item.title }],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = caseStudies.find((c) => c.slug === slug);
  if (!item) notFound();
  const detail = caseDetails[slug];
  const categoryLabel = workCategories.find((w) => w.key === item.category)?.label ?? item.industry;

  // پروژه‌ی بعدی برای ناوبری
  const idx = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <>
      {/* هدر مطالعه‌ی موردی */}
      <section className="relative overflow-hidden pb-10 pt-32 sm:pt-40">
        <div aria-hidden className="aurora aurora-volt aurora-anim absolute -top-20 right-[8%] h-64 w-64" />
        <div aria-hidden className="grid-bg absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <nav aria-label="مسیر صفحه" className="mb-8">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-mist">
                <li>
                  <Link href="/" className="transition-colors hover:text-volt">
                    خانه
                  </Link>
                </li>
                <li aria-hidden className="flex items-center gap-1.5">
                  <ArrowRight className="h-3.5 w-3.5 rotate-180 text-mist/50" />
                  <Link href="/work" className="transition-colors hover:text-volt">
                    نمونه‌کارها
                  </Link>
                </li>
                <li aria-hidden className="flex items-center gap-1.5">
                  <ArrowRight className="h-3.5 w-3.5 rotate-180 text-mist/50" />
                  <span className="text-ink" aria-current="page">
                    {item.title}
                  </span>
                </li>
              </ol>
            </nav>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="flex flex-wrap items-center gap-3 text-xs text-mist">
              <span className="rounded-full border border-volt/40 bg-volt/10 px-3.5 py-1.5 font-medium text-volt">
                {categoryLabel}
              </span>
              <span className="font-grotesk font-bold text-ember">{item.index}</span>
              <span className="h-px w-6 bg-line" />
              <span>{item.client}</span>
              <span className="opacity-60">· {item.year}</span>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className="ink-glow mt-6 max-w-3xl text-3xl font-black leading-[1.28] tracking-tight sm:text-5xl">
              {item.title}
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 max-w-2xl text-base leading-8 text-mist sm:text-lg sm:leading-9">
              {item.desc}
            </p>
          </Reveal>

          {/* متریک شاخص */}
          <Reveal delay={0.24}>
            <div className="mt-9 inline-flex items-baseline gap-3 rounded-2xl border border-line bg-night-2/60 px-6 py-4">
              <span className="text-gradient text-4xl font-black">{item.metric}</span>
              <span className="text-xs text-mist">{item.metricLabel}</span>
              <span className="ms-3 rounded-full border border-ember/50 bg-night px-3 py-1 text-[10px] text-ember">
                نمونه دمو
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* تصویر شاخص */}
      <section className="relative pb-6">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-line">
              <div className="relative aspect-[16/8]">
                <Image
                  src={item.image}
                  alt={`تصویر پروژه‌ی ${item.title}`}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* بدنه */}
      {detail && (
        <>
          {/* متا + چالش */}
          <section className="relative py-14 sm:py-16">
            <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Reveal>
                  <div className="glass space-y-6 rounded-3xl p-7">
                    <div className="flex items-start gap-3.5">
                      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-volt" strokeWidth={1.6} />
                      <div>
                        <h3 className="text-xs font-bold text-ink">مدت اجرا</h3>
                        <p className="mt-1 text-sm text-mist">{detail.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3.5">
                      <Package className="mt-0.5 h-5 w-5 shrink-0 text-volt" strokeWidth={1.6} />
                      <div>
                        <h3 className="text-xs font-bold text-ink">دامنه‌ی کار</h3>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {detail.scope.map((s) => (
                            <span
                              key={s}
                              className="rounded-full border border-line px-2.5 py-0.5 text-[10px] text-mist"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="border-t border-line/60 pt-5">
                      <h3 className="text-xs font-bold text-ink">ابزارها و فناوری</h3>
                      <ul className="mt-3 space-y-2">
                        {detail.stack.map((s) => (
                          <li key={s} dir="auto" className="text-[13px] text-mist">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-8">
                <Reveal delay={0.08}>
                  <h2 className="text-2xl font-black sm:text-3xl">چالش</h2>
                  <p className="mt-6 text-[15px] leading-9 text-mist">{detail.challenge}</p>
                </Reveal>
              </div>
            </div>
          </section>

          {/* رویکرد اجرا */}
          <section className="relative py-14 sm:py-16" aria-label="رویکرد اجرا">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <Reveal>
                <h2 className="text-2xl font-black sm:text-3xl">
                  رویکرد ما، <span className="text-gradient">مرحله به مرحله</span>
                </h2>
              </Reveal>
              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {detail.approach.map((a, i) => (
                  <Reveal key={a.title} delay={i * 0.07}>
                    <div className="card-hover h-full rounded-3xl border border-line bg-night-2/50 p-7">
                      <div className="flex items-center gap-3">
                        <span className="font-grotesk grid h-9 w-9 place-items-center rounded-xl border border-ember/40 bg-ember/10 text-sm font-black text-ember">
                          {String(i + 1).padStart(2, "۰")}
                        </span>
                        <h3 className="text-base font-extrabold">{a.title}</h3>
                      </div>
                      <p className="mt-4 text-[13px] leading-7 text-mist">{a.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* نتایج */}
          <section className="relative py-14 sm:py-16" aria-label="نتایج">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <Reveal>
                <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-night-2/60 p-8 sm:p-12">
                  <div aria-hidden className="aurora aurora-volt absolute -left-16 -top-16 h-56 w-56" />
                  <div aria-hidden className="aurora aurora-ember absolute -bottom-20 -right-10 h-56 w-56 opacity-80" />
                  <h2 className="relative text-2xl font-black sm:text-3xl">نتیجه، به زبان اعداد</h2>
                  <div className="relative mt-9 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {detail.results.map((r) => (
                      <div key={r.label} className="rounded-3xl border border-line bg-panel/70 p-6">
                        <p className="text-gradient text-3xl font-black sm:text-4xl">{r.value}</p>
                        <p className="mt-3 text-xs leading-6 text-mist">{r.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </>
      )}

      {/* ناوبری پروژه بعدی + CTA */}
      <section className="relative pb-24 pt-6 sm:pb-28" aria-label="پروژه بعدی">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <Link
              href={`/work/${next.slug}`}
              className="card-hover group flex h-full items-center justify-between gap-6 rounded-3xl border border-line bg-night-2/50 p-7 sm:p-9"
            >
              <div>
                <p className="text-xs text-mist">پروژه‌ی بعدی</p>
                <h3 className="mt-2.5 text-xl font-black leading-snug transition-colors group-hover:text-volt sm:text-2xl">
                  {next.title}
                </h3>
                <p className="mt-2 text-xs text-mist">
                  {next.industry} · {next.metric} {next.metricLabel}
                </p>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-line text-mist transition-all duration-500 group-hover:border-ember group-hover:bg-ember group-hover:text-night">
                <ArrowUpLeft className="h-5 w-5" />
              </span>
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="glass flex h-full flex-col items-start justify-center gap-4 rounded-3xl p-7 sm:p-9">
              <h3 className="text-lg font-black leading-snug">
                نتیجه‌ی مشابه برای <span className="text-gradient">برند شما</span> می‌سازیم.
              </h3>
              <p className="text-[13px] leading-7 text-mist">
                بگویید چالش‌تان چیست؛ رویکرد پیشنهادی ما با اعداد و زمان‌بندی شفاف ارسال می‌شود.
              </p>
              <QuoteCta label="شروع گفتگو" className="mt-1" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* نکته دمو */}
      <div className="mx-auto -mt-10 max-w-7xl px-5 pb-8 sm:px-8">
        <Reveal>
          <p className="flex items-start gap-2 text-[11px] leading-6 text-mist/60">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            این مطالعه‌ی موردی نمایشی است و برای دموی طراحی ساخته شده؛ نمونه‌کارهای واقعی با تأیید کارفرما منتشر می‌شوند.
          </p>
        </Reveal>
      </div>
    </>
  );
}
