"use client";

import SmoothScroll from "@/components/providers/SmoothScroll";
import { QuoteProvider } from "@/components/quote/QuoteProvider";
import Cursor from "@/components/layout/Cursor";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/**
 * پوسته‌ی مشترک صفحات داخلی — اسکرول نرم + فرم استعلام +
 * ناوبری، فوتر و کاستوم‌کرسر. صفحه اصلی (تجربه ۳D) شل خودش را دارد.
 */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <QuoteProvider>
        <div className="flex min-h-screen flex-col">
          <Cursor />
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </QuoteProvider>
    </SmoothScroll>
  );
}
