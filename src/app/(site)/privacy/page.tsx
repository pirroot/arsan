import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { Reveal } from "@/components/home/Section";
import { privacyPage } from "@/lib/content-pages";

export const metadata: Metadata = {
  title: "حریم خصوصی",
  description: "سیاست حریم خصوصی آژانس دیجیتال آرسان — نحوه‌ی جمع‌آوری، استفاده و حفاظت از داده‌های شما.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        index="§"
        eyebrow="سند حقوقی"
        titleLines={["حریم", "خصوصی."]}
        accentIndex={-1}
        desc={privacyPage.intro}
        breadcrumb={[{ label: "خانه", href: "/" }, { label: "حریم خصوصی" }]}
      >
        <p className="mt-6 w-fit rounded-full border border-line bg-night-2/60 px-4 py-2 text-[11px] text-mist">
          {privacyPage.updated}
        </p>
      </PageHero>

      <section className="relative pb-24 sm:pb-28" aria-label="متن سند حریم خصوصی">
        <div className="mx-auto max-w-3xl space-y-10 px-5 sm:px-8">
          {privacyPage.sections.map((s, i) => (
            <Reveal key={s.h} delay={i * 0.04}>
              <section>
                <h2 className="text-lg font-black sm:text-xl">{s.h}</h2>
                {s.p.map((p, j) => (
                  <p key={j} className="mt-4 text-[14px] leading-9 text-mist">
                    {p}
                  </p>
                ))}
              </section>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
