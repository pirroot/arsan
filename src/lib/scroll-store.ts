/**
 * ─────────────────────────────────────────────────────────────
 *  ARSAN — Shared mutable world state
 *  Written by SmoothScroll / WorldCanvas (DOM side) and read
 *  inside the R3F render loop every frame — WITHOUT causing
 *  any React re-render (plain mutable singletons).
 *
 *  pageScroll.progress : 0..1 کل مسیر اسکرول صفحه
 *  world.chapterP      : progress لحظه‌ی «رسیدن» دوربین به هر فصل
 *                        (از اندازه‌گیری واقعی آفست سکشن‌ها)
 * ─────────────────────────────────────────────────────────────
 */

/** کلیدهای فصل‌ها — ترتیب همان ترتیب سکشن‌های DOM است */
export const CHAPTER_KEYS = [
  "hero",
  "manifesto",
  "services",
  "work",
  "why",
  "process",
  "testimonials",
  "cta",
] as const;

export type ChapterKey = (typeof CHAPTER_KEYS)[number];

/** fallback: اگر اندازه‌گیری DOM در دسترس نبود */
const DEFAULT_CHAPTERS: Record<ChapterKey, number> = {
  hero: 0,
  manifesto: 0.1,
  services: 0.28,
  work: 0.46,
  why: 0.63,
  process: 0.78,
  testimonials: 0.9,
  cta: 1,
};

export const pageScroll = {
  progress: 0,
  velocity: 0,
};

export const pointer = {
  x: 0, // -1..1  (راست مثبت)
  y: 0, // -1..1  (بالا مثبت)
  active: false,
};

export const world = {
  chapterP: { ...DEFAULT_CHAPTERS } as Record<ChapterKey, number>,
  measured: false,
  /** آیا دوربین روی موقعیت فعلی اسکرول سوار شده است (اولین فریم) */
  inited: false,
  /** عمق جهانی که دوربین طی می‌کند (واحد سه‌بعدی) — به‌اندازه‌ی کافی بزرگ تا فصل‌ها در مه از هم جدا بمانند */
  depth: 420,
};

/** z دوربین برای یک progress مشخص */
export function cameraZFor(progress: number) {
  return 9.4 - progress * (9.4 + world.depth);
}
