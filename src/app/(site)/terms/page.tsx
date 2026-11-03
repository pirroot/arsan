import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import { Reveal } from "@/components/home/Section";
import { termsPage } from "@/lib/content-pages";

export const metadata: Metadata = {
  title: "شرایط استفاده",
  description: "شرایط استفاده از وب‌سایت و خدمات آژانس دیجیتال آرسان.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        index="§"
        eyebrow="سند حقوقی"
        titleLines={["شرایط", "استفاده."]}
        accentIndex={-1}
        desc={termsPage.intro}
        breadcrumb={[{ label: "خانه", href: "/" }, { label: "شرایط استفاده" }]}
      >
        <p className="mt-6 w-fit rounded-full border border-line bg-night-2/60 px-4 py-2 text-[11px] text-mist">
          {termsPage.updated}
        </p>
      </PageHero>

      <section className="relative pb-24 sm:pb-28" aria-label="متن شرایط استفاده">
        <div className="mx-auto max-w-3xl space-y-10 px-5 sm:px-8">
          {termsPage.sections.map((s, i) => (
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
