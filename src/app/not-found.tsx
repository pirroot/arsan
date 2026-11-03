import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { nav } from "@/lib/content";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-night px-6 text-center">
      <div aria-hidden className="aurora aurora-volt aurora-anim absolute right-[15%] top-[20%] h-64 w-64" />
      <div aria-hidden className="aurora aurora-ember absolute bottom-[15%] left-[12%] h-56 w-56 opacity-70" />
      <div aria-hidden className="grid-bg absolute inset-0" />

      <p dir="ltr" className="font-grotesk text-outline relative text-[10rem] font-bold leading-none sm:text-[15rem]">
        404
      </p>
      <h1 className="ink-glow relative mt-2 text-2xl font-black sm:text-3xl">
        این مسیر در <span className="text-gradient">دنیای آرسان</span> وجود ندارد
      </h1>
      <p className="relative mt-4 max-w-md text-sm leading-8 text-mist">
        صفحه‌ای که دنبالش بودید جابه‌جا شده یا هرگز ساخته نشده. از اینجا به یکی از مسیرهای اصلی برگردید:
      </p>

      <nav className="relative mt-8 flex flex-wrap items-center justify-center gap-3" aria-label="مسیرهای اصلی">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="btn-ghost-ring rounded-full px-6 py-3 text-sm font-bold"
          >
            {item.label}
          </Link>
        ))}
        <Link href="/" className="btn-ember inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold">
          صفحه اصلی
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </nav>
    </main>
  );
}
