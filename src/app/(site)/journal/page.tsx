import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpLeft, Clock3 } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import { Reveal } from "@/components/home/Section";
import { journalPosts, pageMeta } from "@/lib/content-pages";

export const metadata: Metadata = {
  title: pageMeta.journal.title,
  description: pageMeta.journal.description,
  alternates: { canonical: "/journal" },
  openGraph: {
    title: `${pageMeta.journal.title} | آژانس دیجیتال آرسان`,
    description: pageMeta.journal.description,
    url: "/journal",
  },
};

export default function JournalPage() {
  const [featured, ...rest] = journalPosts;

  return (
    <>
      <PageHero
        index="۰۴"
        eyebrow="ژورنال آرسان"
        titleLines={["آنچه از", "مهندسیِ رشد آموخته‌ایم."]}
        accentIndex={1}
        desc="مقالات تخصصی درباره سئو، سرعت، معماری هدلس و رشد دیجیتال — همان چیزی که هر روز در پروژه‌ها اجرایش می‌کنیم."
        breadcrumb={[{ label: "خانه", href: "/" }, { label: "ژورنال" }]}
      />

      <section className="relative pb-24 pt-8 sm:pb-28" aria-label="فهرست مقالات">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* مقاله شاخص */}
          <Reveal>
            <Link
              href={`/journal/${featured.slug}`}
              className="card-hover group relative block overflow-hidden rounded-[2rem] border border-line bg-night-2/50"
            >
              {/* کاور تایپوگرافیک */}
              <div
                className={`relative flex aspect-[16/7] items-center overflow-hidden ${
                  featured.accent === "ember"
                    ? "bg-[radial-gradient(80%_100%_at_85%_10%,rgba(255,122,26,0.16),transparent_60%)]"
                    : "bg-[radial-gradient(80%_100%_at_85%_10%,rgba(59,157,255,0.16),transparent_60%)]"
                }`}
              >
                <div aria-hidden className="grid-bg absolute inset-0" />
                <span
                  aria-hidden
                  dir="ltr"
                  className="font-grotesk text-outline absolute -left-6 bottom-0 select-none text-[9rem] font-black leading-none sm:text-[13rem]"
                >
                  A.
                </span>
                <div className="relative max-w-2xl p-8 sm:p-12">
                  <div className="flex items-center gap-3 text-[11px] text-mist">
                    <span
                      className={`rounded-full border px-3 py-1 font-medium ${
                        featured.accent === "ember"
                          ? "border-ember/50 bg-ember/10 text-ember"
                          : "border-volt/40 bg-volt/10 text-volt"
                      }`}
                    >
                      {featured.category}
                    </span>
                    <span>{featured.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock3 className="h-3.5 w-3.5" />
                      {featured.readingTime}
                    </span>
                  </div>
                  <h2 className="mt-5 text-2xl font-black leading-snug transition-colors group-hover:text-volt sm:text-3xl md:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 line-clamp-2 text-sm leading-7 text-mist sm:text-[15px]">
                    {featured.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>

          {/* بقیه مقالات */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <Link
                  href={`/journal/${post.slug}`}
                  className="card-hover group flex h-full flex-col rounded-3xl border border-line bg-night-2/50 p-7 sm:p-8"
                >
                  <div className="flex items-center gap-3 text-[11px] text-mist">
                    <span
                      className={`rounded-full border px-3 py-1 font-medium ${
                        post.accent === "ember"
                          ? "border-ember/50 bg-ember/10 text-ember"
                          : "border-volt/40 bg-volt/10 text-volt"
                      }`}
                    >
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock3 className="h-3.5 w-3.5" />
                      {post.readingTime}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-black leading-snug transition-colors group-hover:text-volt sm:text-2xl">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 flex-1 text-[13px] leading-7 text-mist">
                    {post.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-volt transition-colors group-hover:text-ember">
                    خواندن مقاله
                    <ArrowUpLeft className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
