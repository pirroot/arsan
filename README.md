# ARSAN — آژانس دیجیتال آرسان 🚀

> وب‌سایت رسمی آژانس دیجیتال آرسان — تجربه‌ی کاملاً سه‌بعدی با Next.js و WebGL
>
> The official website of ARSAN Digital Agency — a fully immersive 3D experience built with Next.js & WebGL.

---

## ✨ امکانات | Features

- **تجربه‌ی ۳D پیوسته** — دنیای WebGL تمام‌صفحه که با اسکرول، مسیر دوربین و فصل‌های صحنه تغییر می‌کند (الهام‌گرفته از استاندارد آژانس‌های جهانی، طراحی و پیاده‌سازی اختصاصی)
- **۲۲+ صفحه کامل** — صفحه اصلی، خدمات + ۵ صفحه‌ی جزئیات خدمت، نمونه‌کارها + ۶ مطالعه‌ی موردی، درباره ما، تماس، ژورنال + ۳ مقاله، حریم خصوصی، شرایط استفاده و 404 اختصاصی
- **فیلتر زنده‌ی نمونه‌کارها** بر اساس صنعت با انیمیشن layout
- **سیستم طراحی اختصاصی** — پالت شب‌نیلی / آبی الکتریکی / نارنجی، تایپوگرافی فارسی Vazirmatn + Space Grotesk، کریستال‌متریک‌ها و گلوی محیطی
- **دسترسی‌پذیری و کارایی** — پشتیبانی از `prefers-reduced-motion`، fallback موبایل برای WebGL، اسکرول نرم Lenis با حالت کاهش حرکت، متادیتای کامل هر صفحه + JSON-LD + Sitemap پویا
- **فرم استعلام هزینه** با اعتبارسنجی شماره موبایل فارسی، honeypot ضد اسپم و حالت موفقیت (آماده‌ی اتصال به API در فاز تولید)

## 🧰 تکنولوژی | Stack

| لایه | ابزار |
| --- | --- |
| فریم‌ورک | Next.js 16 (App Router) + TypeScript |
| رابط کاربری | Tailwind CSS 4 + shadcn/ui + Framer Motion |
| سه‌بعدی | Three.js + React Three Fiber + Drei |
| اسکرول | Lenis (smooth scroll) |
| فونت‌ها | Vazirmatn Variable، Space Grotesk Variable (fontsource — بدون وابستگی به CDN) |

## 🚀 شروع سریع | Getting Started

```bash
# 1) نصب وابستگی‌ها (npm / pnpm / bun — هر سه کار می‌کنند)
bun install        # یا: npm install

# 2) اجرای محیط توسعه
bun run dev        # یا: npm run dev
# → http://localhost:3000

# 3) بیلد تولید
bun run build      # یا: npm run build

# 4) اجرای نسخه‌ی تولید
bun run start
```

> **نیازمندی:** Node.js 20+ (یا Bun 1.1+). هیچ متغیر محیطی برای اجرا لازم نیست.

## 🗂 ساختار پروژه | Structure

```
src/
├── app/
│   ├── page.tsx              # صفحه اصلی — تجربه‌ی ۳D تمام‌صفحه
│   ├── layout.tsx            # متادیتای ریشه + JSON-LD سازمان
│   ├── sitemap.ts robots.ts  # SEO فنی
│   └── (site)/               # صفحات داخلی (پوسته‌ی مشترک بدون کانواس ۳D)
│       ├── services/         # آرشیو خدمات + [slug] جزئیات
│       ├── work/             # آرشیو نمونه‌کار + [slug] مطالعه موردی
│       ├── about/ contact/
│       ├── journal/          # وبلاگ + [slug]
│       └── privacy/ terms/
├── components/
│   ├── three/                # دنیای WebGL (فصل‌ها، صحنه، کانواس)
│   ├── home/                 # سکشن‌های صفحه اصلی
│   ├── layout/               # Navbar، Footer، SiteShell، PageHero
│   └── quote/ contact/ work/ # فرم استعلام، فرم تماس، گرید فیلتردار
└── lib/
    ├── content.ts            # محتوای صفحه اصلی (CMS-ready)
    └── content-pages.ts      # محتوای صفحات داخلی (CMS-ready)
```

## ✏️ مدیریت محتوا | Content

تمام متن‌ها، خدمات، نمونه‌کارها و مقالات در دو فایل متمرکز شده‌اند:

- `src/lib/content.ts` — اطلاعات برند، خدمات، مطالعات موردی، سوالات متداول، فوتر
- `src/lib/content-pages.ts` — جزئیات خدمات، جزئیات مطالعات موردی، درباره ما، مقالات ژورنال، صفحات حقوقی

این ساختار عمداً **CMS-ready** است: در فاز تولید کافی است همین داده‌ها از WPGraphQL/هر Headless CMS خوانده شوند بدون تغییر در کامپوننت‌ها.

> ⚠️ **نکته‌ی دمو:** شماره تماس، نمونه‌کارها، آمار و نظرات فعلی «نمونه» هستند و با برچسب دمو مشخص شده‌اند؛ پیش از انتشار عمومی با اطلاعات واقعی جایگزین کنید.

## ☁️ انتشار | Deployment

**Vercel (پیشنهادی):**

```bash
npx vercel
# یا ریپو را به GitHub وصل کنید و Import کنید
```

بدون تنظیمات اضافه — `output: "standalone"` در `next.config.ts` برای میزبانی شخصی هم کار می‌کند:

```bash
npm run build && npm run start
```

## 🗺 نقشه‌ی راه | Roadmap

- [x] فاز ۱ — تجربه‌ی ۳D صفحه اصلی + همه‌ی صفحات داخلی
- [ ] فاز ۲ — اتصال Headless WordPress (WPGraphQL + ACF) و خط تولید محتوا
- [ ] فاز ۳ — ثبت لید، پیامک، Turnstile و آنالیتیکس (GA4 / Clarity)
- [ ] فاز ۴ — فروشگاه محصولات دیجیتال (معماری API-First آماده است)

## 📄 مجوز | License

© آژانس دیجیتال آرسان — تمامی حقوق محفوظ است. All rights reserved.
