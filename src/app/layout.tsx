import type { Metadata, Viewport } from "next";
import "@fontsource-variable/vazirmatn";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "آژانس دیجیتال آرسان | طراحی سایت اختصاصی، سئو و رشد ارگانیک",
    template: "%s | آژانس دیجیتال آرسان",
  },
  description:
    "آژانس دیجیتال آرسان؛ طراحی و توسعه‌ی وب‌سایت اختصاصی با معماری مدرن Headless، سئوی تکنیکال، بهینه‌سازی سرعت و رشد ارگانیک — با سرعت زیر یک ثانیه و مالکیت کامل کد.",
  keywords: [
    "طراحی سایت اختصاصی",
    "آژانس دیجیتال",
    "سئو",
    "رشد ارگانیک",
    "طراحی سایت وردپرس",
    "بهینه‌سازی سرعت سایت",
    "دیجیتال مارکتینگ",
    "آرسان",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: site.url,
    siteName: site.nameFa,
    title: "آژانس دیجیتال آرسان | طراحی سایت، سئو و رشد دیجیتال",
    description:
      "تجربه‌های دیجیتال به‌یادماندنی با استاندارد مهندسی جهانی — طراحی سایت اختصاصی، سئو و رشد ارگانیک.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "آژانس دیجیتال آرسان" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "آژانس دیجیتال آرسان",
    description: "طراحی سایت اختصاصی، سئو و رشد ارگانیک با معماری Headless.",
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#050a14",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.nameFa,
  alternateName: "Arsan Digital Agency",
  url: site.url,
  logo: `${site.url}/favicon.svg`,
  email: site.email,
  description:
    "طراحی و توسعه‌ی وب‌سایت اختصاصی، سئو و رشد ارگانیک، بهینه‌سازی سرعت و امنیت وردپرس.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "تهران",
    addressCountry: "IR",
  },
  areaServed: "IR",
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <div className="noise-overlay" aria-hidden />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
