import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpLeft, CheckCircle2, Clock3 } from "lucide-react";
import QuoteCta from "@/components/quote/QuoteCta";
import { Reveal } from "@/components/home/Section";
import { journalPosts } from "@/lib/content-pages";

export const dynamicParams = false;

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} | آژانس دیجیتال آرسان`,
      description: post.excerpt,
      url: `/journal/${slug}`,
    },
  };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = journalPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const others = journalPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      {/* سربرگ مقاله */}
      <article className="relative overflow-hidden pt-32 sm:pt-40">
        <div aria-hidden className="aurora aurora-volt aurora-anim absolute -top-24 right-[6%] h-72 w-72" />
        <div aria-hidden className="grid-bg absolute inset-0" />

        <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
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
                  <Link href="/journal" className="transition-colors hover:text-volt">
                    ژورنال
                  </Link>
                </li>
              </ol>
            </nav>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-mist">
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
          </Reveal>

          <Reveal delay={0.12}>
            <h1 className="ink-glow mt-6 text-3xl font-black leading-[1.35] tracking-tight sm:text-4xl">
              {post.title}
            </h1>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 border-r-2 border-volt/50 pr-5 text-[15px] leading-8 text-mist">
              {post.excerpt}
            </p>
          </Reveal>
        </div>

        {/* بدنه مقاله */}
        <div className="relative mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
          {post.sections.map((s, i) => (
            <Reveal key={s.h} delay={0.04}>
              <section className={i > 0 ? "mt-12" : ""} aria-label={s.h}>
                <h2 className="text-xl font-black leading-snug sm:text-2xl">
                  <span className="ml-2 text-ember">{String(i + 1).padStart(2, "۰")}.</span>
                  {s.h}
                </h2>
                {s.p.map((para, j) => (
                  <p key={j} className="mt-5 text-[15px] leading-9 text-mist">
                    {para}
                  </p>
                ))}
              </section>
            </Reveal>
          ))}

          {/* جمع‌بندی */}
          <Reveal>
            <aside className="mt-14 rounded-3xl border border-line bg-night-2/60 p-7 sm:p-8" aria-label="جمع‌بندی مقاله">
              <h2 className="text-lg font-black">سه نکته که باید ببرید</h2>
              <ul className="mt-5 space-y-3.5">
                {post.takeaways.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[13px] leading-7 text-mist">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-volt" strokeWidth={1.6} />
                    {t}
                  </li>
                ))}
              </ul>
            </aside>
          </Reveal>

          {/* CTA داخل مقاله */}
          <Reveal>
            <div className="mt-10 flex flex-col items-center gap-5 rounded-3xl border border-line bg-panel/60 px-6 py-10 text-center">
              <h2 className="text-xl font-black leading-snug sm:text-2xl">
                این‌ها را می‌خواهید در <span className="text-gradient">پروژه‌ی خودتان</span> اجرا کنید؟
              </h2>
              <QuoteCta />
            </div>
          </Reveal>
        </div>
      </article>

      {/* مقالات مرتبط */}
      <section className="relative pb-24 sm:pb-28" aria-label="مقالات مرتبط">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <h2 className="mb-8 text-xl font-black sm:text-2xl">ادامه‌ی مطالعه</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.07}>
                <Link
                  href={`/journal/${p.slug}`}
                  className="card-hover group flex h-full flex-col rounded-3xl border border-line bg-night-2/50 p-6"
                >
                  <span
                    className={`w-fit rounded-full border px-3 py-1 text-[10px] font-medium ${
                      p.accent === "ember"
                        ? "border-ember/50 bg-ember/10 text-ember"
                        : "border-volt/40 bg-volt/10 text-volt"
                    }`}
                  >
                    {p.category}
                  </span>
                  <h3 className="mt-4 text-base font-black leading-snug transition-colors group-hover:text-volt">
                    {p.title}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-xs font-bold text-volt transition-colors group-hover:text-ember">
                    خواندن مقاله
                    <ArrowUpLeft className="h-3.5 w-3.5" />
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
