import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import QuoteCta from "@/components/quote/QuoteCta";
import WorkGrid from "@/components/work/WorkGrid";
import { pageMeta } from "@/lib/content-pages";

export const metadata: Metadata = {
  title: pageMeta.work.title,
  description: pageMeta.work.description,
  alternates: { canonical: "/work" },
  openGraph: {
    title: `${pageMeta.work.title} | آژانس دیجیتال آرسان`,
    description: pageMeta.work.description,
    url: "/work",
  },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        index="۰۲"
        eyebrow="نمونه‌کارها و نتایج"
        titleLines={["نتایج،", "به زبان اعداد."]}
        accentIndex={1}
        desc="هر پروژه یک مطالعه‌ی موردی عمیق است: چالش، استراتژی اجرا و نتیجه‌ی قابل اندازه‌گیری. بر اساس صنعت فیلتر کنید و وارد جزئیات شوید."
        breadcrumb={[{ label: "خانه", href: "/" }, { label: "نمونه‌کارها" }]}
      >
        <div className="mt-10">
          <QuoteCta label="می‌خواهم نتیجه‌ای مشابه بسازم" />
        </div>
      </PageHero>

      <section className="relative py-14 sm:py-16" aria-label="آرشیو نمونه‌کارها">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <WorkGrid />
        </div>
      </section>
    </>
  );
}
