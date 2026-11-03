import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import QuoteCta from "@/components/quote/QuoteCta";
import { Reveal } from "@/components/home/Section";
import { aboutPage } from "@/lib/content-pages";
import { processSteps, stats } from "@/lib/content";
import { Compass, Handshake, Scale, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "درباره ما",
  description:
    "آرسان یک آژانس دیجیتال مهندسی‌محور است؛ جایی که استراتژی، طراحی و مهندسی به یک سیستم واحد برای رشد کسب‌وکار شما تبدیل می‌شوند.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "درباره ما | آژانس دیجیتال آرسان",
    description:
      "آرسان یک آژانس دیجیتال مهندسی‌محور است؛ جایی که استراتژی، طراحی و مهندسی به یک سیستم واحد تبدیل می‌شوند.",
    url: "/about",
  },
};

const valueIcons = [ShieldCheck, Scale, Compass, Handshake];

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="۰۳"
        eyebrow="درباره آرسان"
        titleLines={[...aboutPage.heroTitle]}
        accentIndex={aboutPage.heroAccentIndex}
        desc={aboutPage.heroDesc}
        breadcrumb={[{ label: "خانه", href: "/" }, { label: "درباره ما" }]}
      />

      {/* داستان آرسان */}
      <section className="relative py-14 sm:py-16" aria-label="داستان آرسان">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            {aboutPage.story.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="lg:col-span-4">
                <div className="relative h-full rounded-3xl border border-line bg-night-2/50 p-7">
                  <span className="font-grotesk text-outline text-4xl font-black">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-4 text-lg font-black">{s.title}</h2>
                  <p className="mt-3.5 text-[13px] leading-7 text-mist">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ارزش‌ها */}
      <section className="relative py-14 sm:py-16" aria-label="ارزش‌های ما">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="text-2xl font-black sm:text-3xl">
              چهار ارزشی که <span className="text-gradient">مذاکره‌ناپذیرند</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {aboutPage.values.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <Reveal key={v.title} delay={i * 0.06}>
                  <div className="card-hover h-full rounded-3xl border border-line bg-night-2/50 p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-ember/30 bg-ember/10 text-ember">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-5 text-base font-extrabold">{v.title}</h3>
                    <p className="mt-2.5 text-[13px] leading-7 text-mist">{v.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* اعداد (نمایشی) */}
      <section className="relative py-14 sm:py-16" aria-label="اعداد آرسان">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="glass relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12">
              <div aria-hidden className="aurora aurora-volt absolute -right-16 -top-16 h-56 w-56" />
              <div aria-hidden className="aurora aurora-ember absolute -bottom-20 -left-10 h-56 w-56 opacity-80" />
              <h2 className="relative text-2xl font-black sm:text-3xl">استاندارد کاری ما، در چند عدد</h2>
              <div className="relative mt-9 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {stats.items.map((s) => (
                  <div key={s.label} className="rounded-3xl border border-line bg-panel/70 p-6">
                    <p className="text-gradient text-3xl font-black sm:text-4xl">
                      {"prefix" in s ? s.prefix : ""}
                      {s.value.toLocaleString("fa-IR", {
                        maximumFractionDigits: s.decimals,
                      })}
                      {s.suffix}
                    </p>
                    <p className="mt-3 text-xs leading-6 text-mist">{s.label}</p>
                  </div>
                ))}
              </div>
              <p className="relative mt-7 text-[11px] text-mist/70">{stats.footnote}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* اصول همکاری */}
      <section className="relative py-14 sm:py-16" aria-label="اصول همکاری">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="text-2xl font-black leading-snug sm:text-3xl">
                تعهدات ما در هر پروژه،
                <br />
                <span className="text-gradient">روی کاغذ می‌آید.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[15px] leading-9 text-mist">
                این‌ها شعار نیستند؛ بندهای قرارداد ما هستند. اگر روزی آرسان یکی از این‌ها را رعایت نکند،
                شما سند کافی برای مطالبه‌اش را دارید — و این دقیقاً همان شفافیتی است که به آن باور داریم.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {aboutPage.principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.06}>
                  <div className="h-full rounded-3xl border border-line bg-panel/60 p-6">
                    <h3 className="text-base font-extrabold">{p.title}</h3>
                    <p className="mt-2.5 text-[13px] leading-7 text-mist">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* تیم */}
      <section className="relative py-14 sm:py-16" aria-label="تیم و تخصص‌ها">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="text-2xl font-black sm:text-3xl">
              تخصص‌هایی که <span className="text-gradient">کنار هم می‌نشینند</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {aboutPage.teamDisciplines.map((t, i) => (
              <Reveal key={t.role} delay={i * 0.06}>
                <div className="card-hover h-full rounded-3xl border border-line bg-night-2/50 p-6">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-volt/30 bg-volt/10 font-grotesk text-sm font-black text-volt">
                    {String(i + 1).padStart(2, "۰")}
                  </span>
                  <h3 className="mt-4 text-base font-extrabold">{t.role}</h3>
                  <p className="mt-2 text-[13px] leading-7 text-mist">{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <p className="mt-6 rounded-2xl border border-dashed border-line px-5 py-3.5 text-[11px] leading-6 text-mist/70">
              {aboutPage.teamNote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* مسیر همکاری (فرآیند) */}
      <section className="relative py-14 sm:py-16" aria-label="مسیر همکاری">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="text-2xl font-black sm:text-3xl">
              مسیر همکاری با ما، <span className="text-gradient">شکاف ندارد.</span>
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((p, i) => (
              <Reveal key={p.index} delay={i * 0.07}>
                <div className="relative h-full rounded-3xl border border-line bg-panel/60 p-6">
                  <span className="font-grotesk text-outline text-5xl font-black leading-none">
                    {p.index}
                  </span>
                  <h3 className="mt-5 text-base font-extrabold">{p.title}</h3>
                  <p className="mt-2.5 text-[13px] leading-7 text-mist">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 sm:py-20" aria-label="شروع همکاری">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-night-2/60 px-6 py-16 text-center sm:px-12">
              <div aria-hidden className="aurora aurora-ember absolute -top-20 left-1/4 h-56 w-56" />
              <div aria-hidden className="aurora aurora-volt absolute -bottom-24 right-1/4 h-64 w-64" />
              <h2 className="ink-glow relative text-3xl font-black leading-snug sm:text-4xl">
                دوست داریم <span className="text-gradient">پروژه‌ی شما</span> را بشناسیم.
              </h2>
              <p className="relative mx-auto mt-5 max-w-xl text-sm leading-8 text-mist sm:text-[15px]">
                یک جلسه‌ی ۱۵ دقیقه‌ای کافی است تا بفهمیم آیا هم‌مسیریم. بدون تعهد، بدون فشار فروش.
              </p>
              <div className="relative mt-9">
                <QuoteCta className="px-10 py-4.5 text-base" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
