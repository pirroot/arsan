import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";

export const metadata: Metadata = {
  title: { default: undefined, template: "%s | آژانس دیجیتال آرسان" },
};

/** پوسته‌ی مشترک همه‌ی صفحات داخلی (بدون کانواس ۳D صفحه اصلی) */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
