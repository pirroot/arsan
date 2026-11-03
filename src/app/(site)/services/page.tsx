import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpLeft, CheckCircle2 } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import QuoteCta from "@/components/quote/QuoteCta";
import { Reveal } from "@/components/home/Section";
import { services } from "@/lib/content";
import { pageMeta } from "@/lib/content-pages";

export const metadata: Metadata = {
  title: pageMeta.services.title,
  description: pageMeta.services.description,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `${pageMeta.services.title} | آژانس دیجیتال آرسان`,
    description: pageMeta.services.description,
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        index="۰۱"
        eyebrow="خدمات تخصصی"
        titleLines={["پنج ستونِ", "رشد دیجیتال."]}
        accentIndex={1}
        desc="هر خدمت یک سیستم کامل است؛ از استراتژی و اجرا تا گزارش ماهانه. وارد هر خدمت شوید تا جزئیات، تحویل‌دادنی‌ها و فرآیند کار را ببینید."
        breadcrumb={[{ label: "خانه", href: "/" }, { label: "خدمات" }]}
      >
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <QuoteCta />
          <Link
            href="/work"
            className="btn-ghost-ring rounded-full px-8 py-4 text-sm font-bold"
          >
            اول نمونه‌کارها را ببین
          </Link>
        </div>
      </PageHero>

      {/* فهرست خدمات */}
      <section className="relative py-16 sm:py-20" aria-label="فهرست خدمات">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <ul className="border-t border-line">
            {services.map((s, i) => (
              <Reveal key={s.index} delay={i * 0.05}>
                <li className="group relative border-b border-line transition-colors duration-500 hover:bg-[rgba(12,22,40,0.55)]">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(60% 120% at 85% 50%, rgba(59,157,255,0.09), transparent 70%)",
                    }}
                  />
                  <Link
                    href={`/services/${s.slug}`}
                    className="relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-4 py-8 text-right sm:gap-8 sm:py-10"
                    aria-label={`جزئیات خدمت ${s.title}`}
                  >
                    <span className="font-grotesk text-sm font-bold text-mist/70 transition-colors group-hover:text-ember sm:text-base">
                      {s.index}
                    </span>
                    <span>
                      <span className="block text-xl font-extrabold leading-snug transition-transform duration-500 group-hover:-translate-y-0.5 sm:text-3xl">
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
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>

          {/* نوار اطمینان */}
          <Reveal className="mt-14">
            <div className="glass grid gap-5 rounded-3xl p-7 sm:grid-cols-3 sm:p-9">
              {[
                "پیشنهاد شفاف با تعرفه سه‌سطحی، بدون هزینه پنهان",
                "مالکیت کامل سورس کد و دسترسی‌ها از روز اول",
                "سه ماه گارانتی رایگان رفع باگ پس از تحویل",
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-volt" strokeWidth={1.6} />
                  <p className="text-sm leading-7 text-mist">{t}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
