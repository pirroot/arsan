/**
 * ─────────────────────────────────────────────────────────────
 *  ARSAN — Central Content Module (CMS-ready)
 *  تمام محتوای صفحه اصلی به‌صورت تایپ‌شده اینجا متمرکز شده است.
 *  در فاز تولید، این ساختارها مستقیماً با WPGraphQL + ACF Pro
 *  جایگزین می‌شوند بدون آن‌که کامپوننت‌های فرانت تغییر کنند.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  nameFa: "آژانس دیجیتال آرسان",
  nameEn: "ARSAN",
  domain: "arsan.agency",
  url: "https://arsan.agency",
  email: "info@arsan.agency",
  // «نمونه» — شماره تماس و شبکه‌های اجتماعی پس از ارائه اطلاعات واقعی توسط کارفرما جایگزین می‌شوند
  phoneDisplay: "۰۲۱-۹۱۰۰ ۰۰۰۰",
  phoneNote: "نمونه",
  socials: [
    { label: "Instagram", handle: "@arsan.agency", href: "https://instagram.com/arsan.agency" },
    { label: "LinkedIn", handle: "ARSAN Agency", href: "https://linkedin.com/company/arsan-agency" },
    { label: "Telegram", handle: "@arsan_agency", href: "https://t.me/arsan_agency" },
  ],
  copyright: "© ۱۴۰۵ آژانس دیجیتال آرسان — تمامی حقوق محفوظ است.",
} as const;

export const nav = [
  { label: "خدمات", href: "/services" },
  { label: "نمونه‌کارها", href: "/work" },
  { label: "درباره ما", href: "/about" },
  { label: "ژورنال", href: "/journal" },
  { label: "تماس", href: "/contact" },
] as const;

export const hero = {
  eyebrow: "آژانس دیجیتال · تهران",
  titleLines: ["ما تجربه‌های دیجیتالِ", "به‌یادماندنی", "می‌سازیم."],
  gradientLineIndex: 1,
  sub: "طراحی و توسعه‌ی وب‌سایت اختصاصی، سئو و رشد ارگانیک — با معماری مدرن Headless، سرعت زیر یک ثانیه و استاندارد مهندسی جهانی.",
  primaryCta: "استعلام هزینه پروژه",
  secondaryCta: "مشاهده خدمات",
  scrollHint: "اسکرول کنید",
} as const;

export const marqueeItems = [
  "طراحی سایت اختصاصی",
  "SEO & Organic Growth",
  "سئو و رشد ارگانیک",
  "Headless Architecture",
  "بهینه‌سازی سرعت",
  "UI/UX Design",
  "افزایش نرخ تبدیل",
  "WordPress Security",
  "رپورتاژ آگهی",
  "Next.js · WebGL",
] as const;

export const manifesto = {
  // واژه‌هایی که هایلایت گرادیانی می‌گیرند
  highlightWords: ["مهندسی", "خلاقیت،", "رشد"],
  text: "آرسان یک آژانس دیجیتال مهندسی‌محور است؛ جایی که طراحی خلاق، توسعه‌ی مدرن و سئوی تکنیکال به یک سیستم واحد برای رشد کسب‌وکار شما تبدیل می‌شوند.",
  caption: "We design · We engineer · We grow",
} as const;

export type Service = {
  index: string;
  slug: string;
  title: string;
  desc: string;
  tags: readonly string[];
};

export const services: readonly Service[] = [
  {
    index: "01",
    slug: "seo-growth",
    title: "سئو و رشد ارگانیک",
    desc: "از ممیزی تکنیکال تا استراتژی محتوا؛ رشد پایدار و هدفمند ترافیک از جستجوی گوگل.",
    tags: ["سئو تکنیکال", "سئو محلی", "سئو فروشگاهی", "استراتژی محتوا"],
  },
  {
    index: "02",
    slug: "web-design",
    title: "طراحی سایت و UI/UX",
    desc: "وب‌سایت اختصاصی با تجربه‌ی کاربری ممتاز؛ از لندینگ کمپین تا پلتفرم سازمانی.",
    tags: ["طراحی اختصاصی", "وردپرس", "ریدیزاین", "لندینگ کمپین"],
  },
  {
    index: "03",
    slug: "cro",
    title: "افزایش فروش و CRO",
    desc: "بهینه‌سازی داده‌محورِ قیف فروش؛ تبدیل بازدیدکننده به مشتریِ واقعی.",
    tags: ["بهینه‌سازی نرخ تبدیل", "A/B تست", "استراتژی فروش"],
  },
  {
    index: "04",
    slug: "wp-care",
    title: "پشتیبانی، امنیت و سرعت وردپرس",
    desc: "نگهداری فنی، پاکسازی بدافزار و عبور از مانع سرعت — بدون دغدغه برای شما.",
    tags: ["نگهداری ماهانه", "رفع هک", "افزایش سرعت"],
  },
  {
    index: "05",
    slug: "offpage",
    title: "آف‌پیج و رپورتاژ",
    desc: "اعتبارسازی دامنه با بک‌لینک‌های باکیفیت و گزارش آگهی در رسانه‌های معتبر.",
    tags: ["استراتژی بک‌لینک", "رپورتاژ آگهی", "برندینگ دیجیتال"],
  },
];

export type CaseCategory =
  | "ecommerce"
  | "b2b"
  | "media"
  | "startup"
  | "health"
  | "industry";

export const workCategories: readonly { key: CaseCategory | "all"; label: string }[] = [
  { key: "all", label: "همه پروژه‌ها" },
  { key: "ecommerce", label: "تجارت الکترونیک" },
  { key: "b2b", label: "خدمات B2B" },
  { key: "media", label: "رسانه و نشر" },
  { key: "startup", label: "استارتاپ" },
  { key: "health", label: "سلامت" },
  { key: "industry", label: "صنعت" },
];

export type CaseStudy = {
  index: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  category: CaseCategory;
  year: string;
  desc: string;
  tags: readonly string[];
  metric: string;
  metricLabel: string;
  image: string;
};

export const caseStudies: readonly CaseStudy[] = [
  {
    index: "01",
    slug: "organic-traffic-growth",
    title: "رشد انفجاری ترافیک ارگانیک",
    client: "برند فروشگاهی",
    industry: "تجارت الکترونیک",
    category: "ecommerce",
    year: "۱۴۰۳",
    desc: "بازسازی معماری سایت، ممیزی کامل سئوی تکنیکال و استراتژی محتوای دسته‌بندی‌محور؛ نتیجه در نمودار سرچ کنسول پس از ۶ ماه.",
    tags: ["سئو فروشگاهی", "CRO", "استراتژی محتوا"],
    metric: "۱۴۲٪+",
    metricLabel: "رشد کلیک ارگانیک",
    image: "/images/case-organic.jpg",
  },
  {
    index: "02",
    slug: "enterprise-redesign",
    title: "بازطراحی کامل پلتفرم سازمانی",
    client: "هلدینگ خدماتی",
    industry: "خدمات B2B",
    category: "b2b",
    year: "۱۴۰۳",
    desc: "مهاجرت از قالب سنتی به معماری Headless با Next.js؛ رابط کاربری نو، سرعت زیر یک ثانیه و پنل مدیریت مستقل برای تیم محتوا.",
    tags: ["ریدیزاین", "Next.js", "Headless CMS"],
    metric: "۰.۸s",
    metricLabel: "زمان بارگذاری (LCP)",
    image: "/images/case-redesign.jpg",
  },
  {
    index: "03",
    slug: "hack-recovery-speed",
    title: "نجات سایت از هک و افت سرعت",
    client: "رسانه دیجیتال",
    industry: "انتشار محتوا",
    category: "media",
    year: "۱۴۰۲",
    desc: "پاکسازی کامل بدافزار، سخت‌سازی لایه‌های امنیتی و بهینه‌سازی دیتابیس؛ بازگشت به صفحه‌ی اول گوگل برای کلمات کلیدی اصلی.",
    tags: ["امنیت", "افزایش سرعت", "پشتیبانی وردپرس"],
    metric: "۹۸+",
    metricLabel: "نمره‌ی Lighthouse",
    image: "/images/case-speed.jpg",
  },
  {
    index: "04",
    slug: "fintech-product-launch",
    title: "لانچ محصول استارتاپ فینتک",
    client: "استارتاپ پرداخت",
    industry: "فینتک",
    category: "startup",
    year: "۱۴۰۴",
    desc: "طراحی لندینگ محصول و روایت برند برای عرضه‌ی اولیه؛ ساختار متنی متمرکز بر اعتمادسازی و CTA داده‌محور برای بیشینه‌کردن ثبت‌نام‌های روز لانچ.",
    tags: ["لندینگ محصول", "برندینگ دیجیتال", "CRO"],
    metric: "۳.۴x",
    metricLabel: "نرخ ثبت‌نام اولیه",
    image: "/images/case-fintech.png",
  },
  {
    index: "05",
    slug: "local-clinics-seo",
    title: "سئوی محلی زنجیره‌ی کلینیک‌ها",
    client: "زنجیره‌ی درمانی",
    industry: "سلامت",
    category: "health",
    year: "۱۴۰۳",
    desc: "بهینه‌سازی پروفایل‌های محلی، ساخت صفحات خدمت‌محور برای هر شعبه و مدیریت سیستماتیک نظرات؛ رشد تماس‌های ورودی از نقشه و جستجوی محلی.",
    tags: ["سئو محلی", "استراتژی محتوا", "مدیریت نظرات"],
    metric: "‎+۲۱۰٪",
    metricLabel: "تماس از جستجوی محلی",
    image: "/images/case-health.png",
  },
  {
    index: "06",
    slug: "industrial-b2b-portal",
    title: "پرتال استعلام قیمت صنعتی",
    client: "گروه تولیدی",
    industry: "صنعت B2B",
    category: "industry",
    year: "۱۴۰۲",
    desc: "بازسازی آرشیو محصولات فنی با ساختار سئوپسند و مسیر استعلام قیمت بدون اصطکاک؛ اتصال مستقیم تیم فروش به لیدهای واجد شرایط.",
    tags: ["سئوی B2B", "CRO", "محتوای فنی"],
    metric: "۲.۷x",
    metricLabel: "استعلام قیمت ماهانه",
    image: "/images/case-industry.png",
  },
];

export const caseStudyFootnote =
  "پروژه‌های نمایشی برای دموی طراحی هستند؛ نمونه‌کارهای واقعی پس از جمع‌آوری و تأیید کارفرما جایگزین می‌شوند.";

export const whyArsan = {
  title: "چرا آرسان؟",
  titleAccent: "تفاوت، در مهندسی است.",
  desc: "ما «قالب نصب نمی‌کنیم»؛ برای هر برند یک سیستم دیجیتال اختصاصی می‌سازیم که سرعت، سئو و مالکیت کامل را با هم تحویل می‌دهد.",
  items: [
    {
      icon: "zap",
      title: "سرعت زیر یک ثانیه",
      desc: "معماری Headless با SSG/ISR و CDN؛ تجربه‌ای که هم کاربر عاشقش می‌شود هم گوگل.",
      metric: "LCP < 1.5s",
    },
    {
      icon: "shield",
      title: "مالکیت کامل و استقلال",
      desc: "سورس کد، محتوا و تمام دسترسی‌ها متعلق به شماست؛ برای تغییر قیمت‌ها به برنامه‌نویس نیاز ندارید.",
    },
    {
      icon: "search",
      title: "سئوی تکنیکال از روز اول",
      desc: "اسکیمای ساختاریافته، متای داینامیک، نقشه سایت پویا و Core Web Vitals سبز — به‌صورت استاندارد پروژه.",
    },
    {
      icon: "pen",
      title: "طراحی متمایز، نه قالب آماده",
      desc: "هیچ قالب تکراری‌ای در کار نیست؛ هر پیکسل برای هویت برند شما طراحی می‌شود.",
    },
    {
      icon: "layers",
      title: "مقیاس‌پذیر تا فروشگاه",
      desc: "از سایت شرکتی تا فروشگاه محصولات دیجیتال؛ زیرساخت API-First بدون بازنویسی گسترش می‌یابد.",
    },
  ],
} as const;

export const stats = {
  footnote: "اعداد نمایشی برای دموی طراحی هستند؛ نتایج واقعی هر پروژه مستند و گزارش‌شده تحویل می‌شود.",
  items: [
    { value: 142, suffix: "٪+", label: "رشد ترافیک ارگانیک", decimals: 0 },
    { value: 0.8, prefix: "<", suffix: "s", label: "سرعت بارگذاری صفحات", decimals: 1 },
    { value: 3.2, suffix: "x", label: "بهبود نرخ تبدیل", decimals: 1 },
    { value: 98, suffix: "+", label: "نمره‌ی Lighthouse", decimals: 0 },
  ],
} as const;

export const processSteps = [
  {
    index: "۰۱",
    title: "کشف و استراتژی",
    desc: "تحلیل کسب‌وکار، رقبا و کلمات کلیدی؛ تعریف نقشه‌ی راه فنی و تجربه‌ای که می‌سازیم.",
  },
  {
    index: "۰۲",
    title: "طراحی و تجربه کاربری",
    desc: "وایرفریم، سیستم دیزاین و رابط کاربری اختصاصی — با تأیید شما، قبل از هر خط کد.",
  },
  {
    index: "۰۳",
    title: "توسعه و پیاده‌سازی",
    desc: "کدنویسی تمیز با Next.js و وردپرس هدلس؛ بهینه‌سازی سرعت و سئو هم‌زمان با توسعه.",
  },
  {
    index: "۰۴",
    title: "رشد، سئو و پشتیبانی",
    desc: "انتشار، رصد Core Web Vitals، تولید محتوا و پشتیبانی فنی با SLA مشخص.",
  },
] as const;

export const testimonials = {
  note: "نظرات نمایشی هستند و پس از جمع‌آوری رضایت واقعی مشتریان جایگزین می‌شوند.",
  items: [
    {
      quote: "فرآیند شفاف، تحویل منظم و تیمی که مسائل فنی را با زبان ساده توضیح می‌دهد. پنل مدیریت به‌گونه‌ای است که تیم ما بدون برنامه‌نویس محتوا منتشر می‌کند.",
      author: "مدیر محصول",
      role: "برند نمونه",
    },
    {
      quote: "سه ماه بعد از شروع سئو، نمودار سرچ کنسول جهت عوض کرد. گزارش‌های ماهانه دقیق و قابل دفاع برای هیئت‌مدیره بود.",
      author: "مدیر بازاریابی",
      role: "برند نمونه",
    },
  ],
} as const;

export const faqs = [
  {
    q: "طراحی یک وب‌سایت اختصاصی چقدر هزینه دارد؟",
    a: "هزینه به دامنه‌ی پروژه، تعداد صفحات اختصاصی و سرویس‌های همراه (سئو، محتوا، پشتیبانی) بستگی دارد. پس از تکمیل فرم استعلام، مشخصات پروژه بررسی و یک پیشنهاد شفاف با تعرفه سه‌سطحی برای شما ارسال می‌شود.",
  },
  {
    q: "زمان تحویل یک وب‌سایت چقدر است؟",
    a: "پروژه‌های شرکتی معمولاً بین ۴ تا ۸ هفته از طراحی تا لانچ زمان می‌برند. زمان‌بندی دقیق در قرارداد و بر اساس فازبندی (دیزاین، توسعه، سئو، لانچ) مشخص و متعهد می‌شود.",
  },
  {
    q: "سئو بعد از چه مدت زمانی نتیجه می‌دهد؟",
    a: "سئو یک سرمایه‌گذاری میان‌مدت است؛ معمولاً بین ۳ تا ۶ ماه اول اثرگذاری معنادار در ترافیک ارگانیک دیده می‌شود و رشد بعد از آن شتاب می‌گیرد. گزارش ماهانه‌ی شفاف از سرچ کنسول و رتبه‌ها دریافت می‌کنید.",
  },
  {
    q: "آیا سورس کد و محتوا واقعاً متعلق به ماست؟",
    a: "بله. تمام کدها، طراحی‌ها و دسترسی‌ها (سرور، دیتابیس، CMS، دامنه) تحت مالکیت شما تحویل داده می‌شوند؛ همراه با مستندات کامل تا هر تیم فنی دیگری بتواند در آینده پروژه را ادامه دهد.",
  },
  {
    q: "پشتیبانی پس از تحویل به چه شکل است؟",
    a: "سه ماه گارانتی رایگان رفع باگ با پاسخ‌گویی حداکثر ۲۴ ساعت کاری، و سپس پلن‌های نگهداری ماهانه شامل به‌روزرسانی، بک‌آپ، امنیت و مانیتورینگ سرعت.",
  },
  {
    q: "برای فروشگاه آنلاین یا محصولات دیجیتال هم آماده‌اید؟",
    a: "بله؛ زیرساخت پروژه از ابتدا API-First طراحی شده تا در فاز بعدی، فروشگاه، درگاه پرداخت و سیستم لایسنس بدون بازنویسی هسته به همان معماری اضافه شود.",
  },
] as const;

export const finalCta = {
  title: ["پروژه‌ی بعدی،", "پروژه‌ی توست."],
  accentIndex: 1,
  desc: "چند ثانیه وقت بگذارید؛ کارشناس ارشد ما ظرف حداکثر ۲ ساعت کاری با شما تماس می‌گیرد.",
  button: "شروع استعلام هزینه",
  availability: "پاسخ‌گویی در کمتر از ۲ ساعت کاری",
} as const;

export const quoteForm = {
  title: "استعلام هزینه پروژه",
  desc: "فرم را پر کنید؛ کارشناس ارشد آرسان ظرف حداکثر ۲ ساعت کاری با شما تماس می‌گیرد.",
  name: "نام و نام خانوادگی",
  namePh: "مثلاً: علی رضایی",
  phone: "شماره موبایل",
  phonePh: "۰۹۱۲ ۰۰۰ ۰۰۰۰",
  service: "خدمت موردنیاز",
  servicePh: "یک خدمت را انتخاب کنید",
  message: "توضیحات پروژه (اختیاری)",
  messagePh: "کمی از کسب‌وکار و هدفتان بگویید…",
  submit: "ثبت درخواست مشاوره",
  submitting: "در حال ارسال…",
  successTitle: "درخواست شما ثبت شد ✓",
  successBody: "کارشناس ارشد ما ظرف حداکثر ۲ ساعت کاری با شما تماس خواهد گرفت.",
  demoNote: "نسخه‌ی دمو: اتصال به API ثبت لید و سرویس پیامک در فاز تولید انجام می‌شود.",
  errors: {
    name: "نام را کامل وارد کنید.",
    phone: "شماره موبایل معتبر وارد کنید (۰۹xxxxxxxxx).",
    service: "خدمت موردنظر را انتخاب کنید.",
  },
} as const;

export const footer = {
  about:
    "آژانس دیجیتال آرسان؛ طراحی و توسعه‌ی وب‌سایت‌های اختصاصی، سئو و رشد ارگانیک با معماری مدرن Headless و استاندارد مهندسی جهانی.",
  columns: [
    {
      title: "خدمات",
      links: services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
    },
    {
      title: "دسترسی سریع",
      links: [
        { label: "نمونه‌کارها", href: "/work" },
        { label: "درباره ما", href: "/about" },
        { label: "ژورنال", href: "/journal" },
        { label: "تماس با ما", href: "/contact" },
      ],
    },
  ],
  legal: [
    { label: "حریم خصوصی", href: "/privacy" },
    { label: "شرایط استفاده", href: "/terms" },
  ],
  enamadNote: "محل کد نماد اعتماد الکترونیکی",
  samandehiNote: "محل کد نشان ساماندهی",
} as const;
