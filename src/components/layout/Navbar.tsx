"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowLeft } from "lucide-react";
import { lenisRef } from "@/lib/lenis";
import { useQuote } from "@/components/quote/QuoteProvider";
import { nav, site } from "@/lib/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openQuote } = useQuote();
  const [prevPath, setPrevPath] = useState(pathname);

  // بستن منو هنگام تغییر مسیر — الگوی رسمی React (تنظیم state در رندر)
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      lenisRef.current?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenisRef.current?.start();
      document.documentElement.style.overflow = "";
    }
  }, [menuOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen ? "glass border-b border-line" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
          {/* brand */}
          <Link
            href="/"
            className="flex items-baseline gap-2"
            aria-label="آرسان — صفحه اصلی"
          >
            <span dir="ltr" className="font-grotesk text-xl font-bold tracking-tight text-ink">
              ARSAN
              <span className="text-ember">.</span>
            </span>
            <span className="hidden text-[11px] text-mist sm:inline">آژانس دیجیتال</span>
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="ناوبری اصلی">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:right-0 after:h-px after:bg-ember after:transition-all after:duration-300 ${
                    active
                      ? "text-ink after:w-full"
                      : "text-mist after:w-0 hover:text-ink hover:after:w-full"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openQuote()}
              className="btn-ember hidden rounded-full px-6 py-2.5 text-sm font-extrabold sm:inline-flex"
            >
              استعلام هزینه
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink lg:hidden"
              aria-label="باز کردن منو"
              aria-expanded={menuOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] flex flex-col bg-night/95 backdrop-blur-2xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="منوی موبایل"
          >
            <div className="flex h-16 items-center justify-between px-5">
              <Link href="/" dir="ltr" className="font-grotesk text-xl font-bold text-ink">
                ARSAN<span className="text-ember">.</span>
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink"
                aria-label="بستن منو"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-8" aria-label="ناوبری موبایل">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center justify-between border-b border-line/60 py-5"
                  >
                    <span
                      className={`text-2xl font-extrabold ${
                        isActive(item.href) ? "text-ember" : "text-ink"
                      }`}
                    >
                      {item.label}
                    </span>
                    <ArrowLeft className="h-5 w-5 text-mist transition-transform group-hover:-translate-x-1" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-4 px-8 pb-10"
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openQuote();
                }}
                className="btn-ember w-full rounded-2xl py-4 text-base font-extrabold"
              >
                استعلام هزینه پروژه
              </button>
              <p dir="ltr" className="text-center text-xs text-mist">
                {site.email}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
