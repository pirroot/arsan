import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock3, Instagram, Linkedin, Send, Route } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import { Reveal } from "@/components/home/Section";
import { contactPage } from "@/lib/content-pages";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "تماس با ما",
  description:
    "برای استعلام هزینه پروژه و مشاوره رایگان با آژانس دیجیتال آرسان در تماس باشید؛ پاسخ در کمتر از ۲ ساعت کاری.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "تماس با ما | آژانس دیجیتال آرسان",
    description:
      "استعلام هزینه و مشاوره رایگان — پاسخ در کمتر از ۲ ساعت کاری.",
    url: "/contact",
  },
};

const infoIcons = [Mail, Phone, MapPin];

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="۰۵"
        eyebrow="تماس با آرسان"
        titleLines={[...contactPage.heroTitle]}
        accentIndex={contactPage.heroAccentIndex}
        desc={contactPage.heroDesc}
        breadcrumb={[{ label: "خانه", href: "/" }, { label: "تماس" }]}
      />

      <section className="relative pb-24 pt-10 sm:pb-28" aria-label="اطلاعات تماس و فرم">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12">
          {/* اطلاعات تماس */}
          <div className="space-y-5 lg:col-span-5">
            {contactPage.infoItems.map((item, i) => {
              const Icon = infoIcons[i % infoIcons.length];
              const inner = (
                <div className="card-hover flex items-start gap-4 rounded-3xl border border-line bg-night-2/50 p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-volt/25 bg-volt/10 text-volt">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <h2 className="text-xs font-bold text-mist">{item.label}</h2>
                    <p dir={item.label === "ایمیل" || item.label === "تلفن" ? "ltr" : undefined} className="mt-1.5 text-right text-base font-extrabold text-ink">
                      {item.value}
                    </p>
                    {item.note && <p className="mt-1.5 text-[11px] text-mist/70">{item.note}</p>}
                  </div>
                </div>
              );
              return (
                <Reveal key={item.label} delay={i * 0.06}>
                  {item.href ? (
                    <a href={item.href} className="block">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}

            {/* ساعات پاسخ‌گویی */}
            <Reveal delay={0.2}>
              <div className="flex items-start gap-4 rounded-3xl border border-line bg-night-2/50 p-6">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-ember/30 bg-ember/10 text-ember">
                  <Clock3 className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <div>
                  <h2 className="text-xs font-bold text-mist">ساعات پاسخ‌گویی</h2>
                  <p className="mt-1.5 text-sm font-extrabold text-ink">شنبه تا چهارشنبه، ۹ تا ۱۸</p>
                  <p className="mt-1.5 text-[11px] text-mist/70">فرم استعلام در هر ساعتی جواب می‌دهد</p>
                </div>
              </div>
            </Reveal>

            {/* شبکه‌های اجتماعی */}
            <Reveal delay={0.26}>
              <div className="rounded-3xl border border-line bg-night-2/50 p-6">
                <p className="text-xs font-bold text-mist">{contactPage.socialNote}</p>
                <div className="mt-4 flex items-center gap-3">
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
            </Reveal>

            {/* فرآیند پس از تماس */}
            <Reveal delay={0.32}>
              <div className="rounded-3xl border border-volt/25 bg-volt/5 p-6">
                <h2 className="flex items-center gap-2.5 text-sm font-extrabold text-ink">
                  <Route className="h-4 w-4 text-volt" />
                  بعد از ثبت درخواست چه می‌شود؟
                </h2>
                <p className="mt-3 text-[13px] leading-7 text-mist">{contactPage.processNote}</p>
              </div>
            </Reveal>
          </div>

          {/* فرم */}
          <Reveal delay={0.12} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
