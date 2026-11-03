"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, CheckCircle2, ChevronDown } from "lucide-react";
import { quoteForm as form, services } from "@/lib/content";
import { lenisRef } from "@/lib/lenis";

type QuoteContextValue = {
  openQuote: (serviceTitle?: string) => void;
};

const QuoteContext = createContext<QuoteContextValue>({ openQuote: () => {} });
export const useQuote = () => useContext(QuoteContext);

/** تبدیل ارقام فارسی/عربی به لاتین برای اعتبارسنجی شماره */
function toEnDigits(v: string) {
  return v
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

type Status = "idle" | "sending" | "sent";

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const openQuote = useCallback((serviceTitle?: string) => {
    if (serviceTitle) setService(serviceTitle);
    // reset prior submission state on every open
    setErrors({});
    setStatus((s) => (s === "sent" ? "idle" : s));
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // lock scroll while open (works with Lenis)
  useEffect(() => {
    if (open) {
      lenisRef.current?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenisRef.current?.start();
      document.documentElement.style.overflow = "";
    }
    return () => {
      lenisRef.current?.start();
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 3) e.name = form.errors.name;
    const en = toEnDigits(phone).replace(/[\s-]/g, "");
    if (!/^09\d{9}$/.test(en)) e.phone = form.errors.phone;
    if (!service) e.service = form.errors.service;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (honeypot) return; // bot trap
    if (!validate()) return;
    setStatus("sending");
    // ── نسخه دمو: در فاز تولید، اینجا POST به /api/leads وردپرس + وب‌سرویس پیامک انجام می‌شود
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
  };

  const value = useMemo(() => ({ openQuote }), [openQuote]);

  return (
    <QuoteContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {open && (
          <div
            className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-label={form.title}
          >
            <motion.button
              aria-label="بستن"
              className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />

            <motion.div
              className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-line bg-panel shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)]"
              initial={{ opacity: 0, y: 44, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* top glow line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-volt/70 to-transparent" />

              <button
                onClick={close}
                aria-label="بستن فرم"
                className="absolute left-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-line text-mist transition hover:border-ink/40 hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>

              {status === "sent" ? (
                <div className="flex flex-col items-center px-8 py-14 text-center">
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <CheckCircle2 className="mb-5 h-14 w-14 text-volt" strokeWidth={1.4} />
                  </motion.div>
                  <h3 className="mb-3 text-2xl font-extrabold">{form.successTitle}</h3>
                  <p className="max-w-sm text-sm leading-7 text-mist">{form.successBody}</p>
                  <p className="mt-6 rounded-xl border border-dashed border-line px-4 py-2 text-[11px] text-mist/80">
                    {form.demoNote}
                  </p>
                </div>
              ) : (
                <div className="max-h-[85vh] overflow-y-auto p-7 sm:p-9">
                  <h3 className="text-2xl font-extrabold">{form.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-mist">{form.desc}</p>

                  <form onSubmit={submit} noValidate className="mt-7 space-y-5">
                    {/* honeypot */}
                    <input
                      type="text"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
                    />

                    <div>
                      <label htmlFor="q-name" className="mb-2 block text-xs font-medium text-mist">
                        {form.name}
                      </label>
                      <input
                        id="q-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={form.namePh}
                        className="w-full rounded-xl border border-line bg-night-2/80 px-4 py-3 text-sm text-ink placeholder:text-mist/50 focus:border-volt/60 focus:outline-none"
                      />
                      {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="q-phone" className="mb-2 block text-xs font-medium text-mist">
                        {form.phone}
                      </label>
                      <input
                        id="q-phone"
                        type="tel"
                        inputMode="tel"
                        dir="ltr"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={form.phonePh}
                        className="w-full rounded-xl border border-line bg-night-2/80 px-4 py-3 text-right text-sm text-ink placeholder:text-mist/50 focus:border-volt/60 focus:outline-none"
                      />
                      {errors.phone && <p className="mt-1.5 text-xs text-red-400">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="q-service" className="mb-2 block text-xs font-medium text-mist">
                        {form.service}
                      </label>
                      <div className="relative">
                        <select
                          id="q-service"
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full appearance-none rounded-xl border border-line bg-night-2/80 px-4 py-3 text-sm text-ink focus:border-volt/60 focus:outline-none"
                        >
                          <option value="" disabled>
                            {form.servicePh}
                          </option>
                          {services.map((s) => (
                            <option key={s.index} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
                      </div>
                      {errors.service && <p className="mt-1.5 text-xs text-red-400">{errors.service}</p>}
                    </div>

                    <div>
                      <label htmlFor="q-msg" className="mb-2 block text-xs font-medium text-mist">
                        {form.message}
                      </label>
                      <textarea
                        id="q-msg"
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={form.messagePh}
                        className="w-full resize-none rounded-xl border border-line bg-night-2/80 px-4 py-3 text-sm text-ink placeholder:text-mist/50 focus:border-volt/60 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="btn-ember flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-extrabold disabled:opacity-70"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {form.submitting}
                        </>
                      ) : (
                        form.submit
                      )}
                    </button>

                    <p className="text-center text-[11px] leading-5 text-mist/70">{form.demoNote}</p>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </QuoteContext.Provider>
  );
}
