import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Search,
  PenTool,
  BarChart3,
  ShieldCheck,
  Layers,
  Zap,
  ArrowUpLeft,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import QuoteCta from "@/components/quote/QuoteCta";
import { Reveal } from "@/components/home/Section";
import { services, caseStudies } from "@/lib/content";
import { serviceDetails } from "@/lib/content-pages";

const deliverableIcons = [Search, PenTool, BarChart3, ShieldCheck, Layers, Zap];

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  const description = `${service.desc} — جزئیات کامل خدمت ${service.title} در آژانس دیجیتال آرسان.`;
  return {
    title: service.title,
    description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.title} | آژانس دیجیتال آرسان`,
      description,
      url: `/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const detail = serviceDetails[slug];

  // نمونه‌کارهای مرتبط: بیشترین هم‌پوشانی تگ
  const related = caseStudies
    .map((c) => ({ c, hits: c.tags.filter((t) => service.tags.includes(t)).length }))
    .sort((a, b) => b.hits - a.hits)
    .slice(0, 3)
    .map((x) => x.c);

  return (
    <>
      <PageHero
        index={service.index}
        eyebrow="خدمات آرسان"
        titleLines={[service.title]}
        accentIndex={-1}
        desc={service.desc}
        breadcrumb={[
          { label: "خانه", href: "/" },
          { label: "خدمات", href: "/services" },
          { label: service.title },
        ]}
      >
        {detail && (
          <p className="text-gradient-anim mt-4 text-lg font-bold sm:text-xl">{detail.tagline}</p>
        )}
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <QuoteCta serviceTitle={service.title} />
          <Link href="/work" className="btn-ghost-ring rounded-full px-8 py-4 text-sm font-bold">
            نمونه‌کارهای مرتبط
          </Link>
        </div>
      </PageHero>

      {detail && (
        <>
          {/* نگاه کلی */}
          <section className="relative py-14 sm:py-16" aria-label="نگاه کلی خدمت">
            <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Reveal>
                  <h2 className="text-2xl font-black sm:text-3xl">نگاه ما به این خدمت</h2>
                </Reveal>
                {detail.overview.map((p, i) => (
                  <Reveal key={i} delay={0.08 + i * 0.06}>
                    <p className="mt-6 text-[15px] leading-9 text-mist">{p}</p>
                  </Reveal>
                ))}
              </div>
              <div className="lg:col-span-5">
                <Reveal delay={0.12}>
                  <div className="glass rounded-3xl p-7">
                    <h3 className="flex items-center gap-2 text-sm font-bold text-ink">
                      <CheckCircle2 className="h-4 w-4 text-volt" />
                      این خدمت برای چه کسی مناسب است؟
                    </h3>
                    <ul className="mt-5 space-y-4">
                      {detail.suitable.map((s, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm leading-7 text-mist">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* تحویل‌دادنی‌ها */}
          <section className="relative py-14 sm:py-16" aria-label="تحویل‌دادنی‌ها">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <Reveal>
                <h2 className="text-2xl font-black sm:text-3xl">
                  دقیقاً چه چیزی <span className="text-gradient">تحویل می‌گیرید؟</span>
                </h2>
              </Reveal>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {detail.deliverables.map((d, i) => {
                  const Icon = deliverableIcons[i % deliverableIcons.length];
                  return (
                    <Reveal key={d.title} delay={i * 0.06}>
                      <div className="card-hover h-full rounded-3xl border border-line bg-night-2/50 p-6">
                        <span className="grid h-11 w-11 place-items-center rounded-2xl border border-volt/25 bg-volt/10 text-volt">
                          <Icon className="h-5 w-5" strokeWidth={1.7} />
                        </span>
                        <h3 className="mt-5 text-base font-extrabold">{d.title}</h3>
                        <p className="mt-2.5 text-[13px] leading-7 text-mist">{d.desc}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>

          {/* فرآیند */}
          <section className="relative py-14 sm:py-16" aria-label="فرآیند اجرا">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <Reveal>
                <h2 className="text-2xl font-black sm:text-3xl">
                  فرآیند کار، <span className="text-gradient">قدم به قدم</span>
                </h2>
              </Reveal>
              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {detail.process.map((p, i) => (
                  <Reveal key={p.step} delay={i * 0.07}>
                    <div className="relative h-full rounded-3xl border border-line bg-panel/60 p-6">
                      <span className="font-grotesk text-outline text-5xl font-black leading-none">
                        {p.step}
                      </span>
                      <h3 className="mt-5 text-base font-extrabold">{p.title}</h3>
                      <p className="mt-2.5 text-[13px] leading-7 text-mist">{p.desc}</p>
                      {i < detail.process.length - 1 && (
                        <ChevronLeft
                          aria-hidden
                          className="absolute -left-3.5 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-mist/40 xl:block"
                        />
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* سوالات متداول خدمت */}
          <section className="relative py-14 sm:py-16" aria-label="سوالات متداول">
            <div className="mx-auto max-w-4xl px-5 sm:px-8">
              <Reveal>
                <h2 className="text-2xl font-black sm:text-3xl">سوالات متداول</h2>
              </Reveal>
              <div className="mt-9 space-y-4">
                {detail.faq.map((f, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <details className="group rounded-2xl border border-line bg-night-2/50 transition-colors open:border-volt/30">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[15px] font-bold text-ink [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <ChevronLeft className="h-4 w-4 shrink-0 text-mist transition-transform duration-300 group-open:-rotate-90" />
                      </summary>
                      <p className="border-t border-line/60 px-6 pb-6 pt-4 text-sm leading-8 text-mist">
                        {f.a}
                      </p>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* نمونه‌کارهای مرتبط */}
          <section className="relative py-14 sm:py-16" aria-label="نمونه‌کارهای مرتبط">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
              <Reveal>
                <div className="mb-10 flex items-end justify-between gap-6">
                  <h2 className="text-2xl font-black sm:text-3xl">
                    نتیجه‌ی همین خدمت، <span className="text-gradient">در عمل</span>
                  </h2>
                  <Link
                    href="/work"
                    className="hidden shrink-0 items-center gap-2 text-sm font-bold text-volt transition hover:text-ember sm:inline-flex"
                  >
                    همه‌ی نمونه‌کارها
                    <ArrowUpLeft className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
              <div className="grid gap-5 md:grid-cols-3">
                {related.map((c, i) => (
                  <Reveal key={c.slug} delay={i * 0.07}>
                    <Link
                      href={`/work/${c.slug}`}
                      className="card-hover group flex h-full flex-col justify-between rounded-3xl border border-line bg-night-2/50 p-6"
                    >
                      <div>
                        <div className="flex items-center gap-2.5 text-[11px] text-mist">
                          <span className="font-grotesk font-bold text-ember">{c.index}</span>
                          <span className="h-px w-6 bg-line" />
                          <span>{c.industry}</span>
                        </div>
                        <h3 className="mt-3 text-lg font-black leading-snug transition-colors group-hover:text-volt">
                          {c.title}
                        </h3>
                        <p className="mt-2.5 line-clamp-2 text-[13px] leading-6 text-mist">{c.desc}</p>
                      </div>
                      <div className="mt-5 flex items-baseline gap-2 border-t border-line/60 pt-4">
                        <span className="text-gradient text-2xl font-black">{c.metric}</span>
                        <span className="text-[10px] text-mist">{c.metricLabel}</span>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA پایانی */}
      <section className="relative py-20 sm:py-24" aria-label="شروع همکاری">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-night-2/60 px-6 py-16 text-center sm:px-12">
              <div aria-hidden className="aurora aurora-ember absolute -top-20 left-1/4 h-56 w-56" />
              <div aria-hidden className="aurora aurora-volt absolute -bottom-24 right-1/4 h-64 w-64" />
              <h2 className="ink-glow relative text-3xl font-black leading-snug sm:text-4xl">
                آماده‌اید با <span className="text-gradient">{service.title}</span> رشد کنید؟
              </h2>
              <p className="relative mx-auto mt-5 max-w-xl text-sm leading-8 text-mist sm:text-[15px]">
                مشخصات پروژه‌تان را بفرستید؛ پیشنهاد شفاف با تعرفه سه‌سطحی ظرف حداکثر ۲ ساعت کاری برایتان ارسال می‌شود.
              </p>
              <div className="relative mt-9">
                <QuoteCta serviceTitle={service.title} className="px-10 py-4.5 text-base" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
