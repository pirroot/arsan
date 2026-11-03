import SmoothScroll from "@/components/providers/SmoothScroll";
import { QuoteProvider } from "@/components/quote/QuoteProvider";
import WorldCanvas from "@/components/three/WorldCanvas";
import Preloader from "@/components/layout/Preloader";
import Cursor from "@/components/layout/Cursor";
import ScrollHud from "@/components/layout/ScrollHud";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import Manifesto from "@/components/home/Manifesto";
import Services from "@/components/home/Services";
import CaseStudies from "@/components/home/CaseStudies";
import WhyArsan from "@/components/home/WhyArsan";
import Stats from "@/components/home/Stats";
import Process from "@/components/home/Process";
import Testimonials from "@/components/home/Testimonials";
import Faq from "@/components/home/Faq";
import FinalCta from "@/components/home/FinalCta";
import { faqs } from "@/lib/content";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <SmoothScroll>
      <QuoteProvider>
        {/* دنیای سه‌بعدی پیوسته — پشت تمام سکشن‌ها */}
        <WorldCanvas />

        {/* لایه‌ی تجربه */}
        <Preloader />
        <Cursor />
        <ScrollHud />

        <div id="top" className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main>
            <Hero />
            <Marquee />
            <Manifesto />
            <Services />
            <CaseStudies />
            <WhyArsan />
            <Stats />
            <Process />
            <Testimonials />
            <Faq />
            <FinalCta />
          </main>
          <Footer />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </QuoteProvider>
    </SmoothScroll>
  );
}
