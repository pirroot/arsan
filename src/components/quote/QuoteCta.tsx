"use client";

import { useQuote } from "./QuoteProvider";

type QuoteCtaProps = {
  label?: string;
  serviceTitle?: string;
  variant?: "ember" | "ghost";
  className?: string;
};

/** دکمه‌ی CTA که مودال استعلام هزینه را باز می‌کند — در همه‌ی صفحات در دسترس */
export default function QuoteCta({
  label = "استعلام هزینه پروژه",
  serviceTitle,
  variant = "ember",
  className = "",
}: QuoteCtaProps) {
  const { openQuote } = useQuote();
  const base =
    variant === "ember"
      ? "btn-ember rounded-full font-extrabold"
      : "btn-ghost-ring rounded-full font-bold";
  return (
    <button
      onClick={() => openQuote(serviceTitle)}
      className={`${base} px-8 py-4 text-sm ${className}`}
    >
      {label}
    </button>
  );
}
