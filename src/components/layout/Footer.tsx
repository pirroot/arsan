"use client";

import Link from "next/link";
import { Instagram, Linkedin, Send, Mail, Phone } from "lucide-react";
import { footer, site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-line bg-night-2/40" aria-label="پاورقی">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* giant wordmark */}
        <div dir="ltr" aria-hidden className="select-none overflow-hidden pt-14 text-center">
          <span className="font-grotesk text-outline text-[17vw] font-bold leading-[0.9] tracking-tighter lg:text-[11rem]">
            ARSAN
          </span>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-12">
          {/* brand */}
          <div className="md:col-span-5">
            <Link href="/" dir="ltr" className="font-grotesk inline-block text-2xl font-bold text-ink">
              ARSAN<span className="text-ember">.</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-8 text-mist">{footer.about}</p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.socials[0].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="اینستاگرام آرسان"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-mist transition hover:border-volt/60 hover:text-volt"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={site.socials[1].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="لینکدین آرسان"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-mist transition hover:border-volt/60 hover:text-volt"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={site.socials[2].href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تلگرام آرسان"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-mist transition hover:border-volt/60 hover:text-volt"
              >
                <Send className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* link columns */}
          {footer.columns.map((col) => (
            <nav key={col.title} className="md:col-span-2" aria-label={col.title}>
              <h3 className="text-sm font-bold text-ink">{col.title}</h3>
              <ul className="mt-5 space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-mist transition-colors hover:text-volt"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* contact + trust badges */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-bold text-ink">تماس</h3>
            <ul className="mt-5 space-y-3.5 text-sm text-mist">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-volt/70" />
                <a dir="ltr" href={`mailto:${site.email}`} className="transition-colors hover:text-volt">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-volt/70" />
                <span dir="ltr">
                  {site.phoneDisplay}
                  <span className="ms-2 text-[10px] text-mist/60">({site.phoneNote})</span>
                </span>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-3">
              <div className="grid h-20 w-16 place-items-center rounded-xl border border-dashed border-line px-1 text-center text-[9px] leading-4 text-mist/50">
                {footer.enamadNote}
              </div>
              <div className="grid h-20 w-16 place-items-center rounded-xl border border-dashed border-line px-1 text-center text-[9px] leading-4 text-mist/50">
                {footer.samandehiNote}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-line py-6 sm:flex-row">
          <p className="text-xs text-mist/70">{site.copyright}</p>
          <div className="flex items-center gap-5">
            {footer.legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-mist/70 transition-colors hover:text-volt"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p dir="ltr" className="font-grotesk text-[11px] uppercase tracking-[0.2em] text-mist/50">
            Designed &amp; Engineered with Next.js · WebGL
          </p>
        </div>
      </div>
    </footer>
  );
}
