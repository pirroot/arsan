"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, ChevronDown } from "lucide-react";
import { quoteForm as form, services } from "@/lib/content";

/** تبدیل ارقام فارسی/عربی به لاتین برای اعتبارسنجی شماره */
function toEnDigits(v: string) {
  return v
    .replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}

type Status = "idle" | "sending" | "sent";

/** فرم تماس مستقیم صفحه‌ی تماس — همان منطق و ظاهر مودال استعلام */
export default function ContactForm({ presetService }: { presetService?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(presetService ?? "");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

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
    if (honeypot) return; // تله‌ی ربات
    if (!validate()) return;
    setStatus("sending");
    // ── نسخه دمو: در فاز تولید، POST به /api/leads و سرویس پیامک انجام می‌شود
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center rounded-3xl border border-line bg-panel px-8 py-16 text-center"
      >
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
      </motion.div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-panel p-6 sm:p-9">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-l from-transparent via-volt/70 to-transparent" />

      <h3 className="text-xl font-extrabold sm:text-2xl">{form.title}</h3>
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

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="c-name" className="mb-2 block text-xs font-medium text-mist">
              {form.name}
            </label>
            <input
              id="c-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={form.namePh}
              className="w-full rounded-xl border border-line bg-night-2/80 px-4 py-3 text-sm text-ink placeholder:text-mist/50 focus:border-volt/60 focus:outline-none"
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="c-phone" className="mb-2 block text-xs font-medium text-mist">
              {form.phone}
            </label>
            <input
              id="c-phone"
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
        </div>

        <div>
          <label htmlFor="c-service" className="mb-2 block text-xs font-medium text-mist">
            {form.service}
          </label>
          <div className="relative">
            <select
              id="c-service"
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
          <label htmlFor="c-msg" className="mb-2 block text-xs font-medium text-mist">
            {form.message}
          </label>
          <textarea
            id="c-msg"
            rows={4}
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
  );
}
