/**
 * 🔗 TeenTimeGlow — Single source of truth for every SEO-critical URL.
 *
 * IMPORTANT: The production host is the WWW variant. `teentimeglow.me`
 * 307-redirects to `www.teentimeglow.me` at the Vercel edge. Every canonical,
 * og:url, sitemap entry and JSON-LD @id MUST use SITE_URL, otherwise Google
 * receives a canonical that points at a redirect and refuses to consolidate
 * signals onto one URL. Never hardcode a bare `https://teentimeglow.me` again.
 */

export const SITE_URL = 'https://www.teentimeglow.me';

export const SITE_NAME = 'TeenTimeGlow';

export const SITE_TAGLINE = 'Feel The Glow — Curated Fashion, Beauty & Lifestyle by Rini';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/hero-glow-creator.jpg`;

export const LOGO_URL = `${SITE_URL}/assets/logo.jpg`;

export const AUTHOR = {
  name: 'Rini',
  // Real profile URLs only. Placeholder roots (e.g. https://instagram.com)
  // must never appear in sameAs — Google ignores or distrusts them.
  sameAs: [
    'https://www.instagram.com/teentimeglow',
    'https://www.pinterest.com/teentimeglow'
  ]
};

export const SOCIAL_PROFILES = [
  { name: 'Instagram', handle: 'teentimeglow', url: 'https://www.instagram.com/teentimeglow' },
  { name: 'TikTok', handle: 'teentimeglow', url: 'https://www.tiktok.com/@teentimeglow' },
  { name: 'Pinterest', handle: 'teentimeglow', url: 'https://www.pinterest.com/teentimeglow' },
  { name: 'Spotify', handle: 'teentimeglow', url: 'https://open.spotify.com/user/teentimeglow' },
  { name: 'YouTube', handle: 'teentimeglow', url: 'https://www.youtube.com/@teentimeglow' }
];

/** Absolute URL helper — guards against double slashes and missing slashes. */
export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL + '/';
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/**
 * Editorial categories. Each one is a topical hub that targets a keyword
 * cluster — this is how the site earns rankings for head terms instead of
 * relying on a single flat /edits index.
 */
export interface CategoryDef {
  slug: string;
  dbValue: string;
  label: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
}

export const CATEGORIES: CategoryDef[] = [
  {
    slug: 'skincare',
    dbValue: 'beauty',
    label: 'Beauty & Skincare',
    title: 'Skincare Routines & Glow Guides for Teens',
    h1: 'Skincare That Actually Works',
    description:
      'Straight-talking skincare routines for teens: glass skin layering, ceramide barrier repair, and gentle routines for acne-prone skin, explained step by step.',
    keywords: ['teen skincare routine', 'glass skin routine', 'korean skincare for teens', 'ceramide barrier repair']
  },
  {
    slug: 'fashion',
    dbValue: 'fashion',
    label: 'Fashion Lookbooks',
    title: 'Teen Fashion Lookbooks & Outfit Formulas',
    h1: 'Outfit Formulas, Not Outfit Rules',
    description:
      'Seasonal teen lookbooks built on repeatable outfit formulas: fall layering, capsule wardrobes, and Parisian-inspired styling you can recreate from your own closet.',
    keywords: ['teen outfit ideas', 'fall lookbook', 'capsule wardrobe teen', 'school outfit formulas']
  },
  {
    slug: 'decor',
    dbValue: 'decor',
    label: 'Cozy Decor',
    title: 'Cozy Bedroom Decor & Study Space Ideas',
    h1: 'Rooms That Feel Like a Deep Breath',
    description:
      'Budget-friendly bedroom decor and study space makeovers: warm lighting, linen textures, and small-space storage that turns a normal room into a sanctuary.',
    keywords: ['cozy bedroom decor', 'aesthetic room ideas', 'study space setup', 'bedroom decor on a budget']
  }
];

export function categoryBySlug(slug: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function categoryByDbValue(value: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.dbValue === value);
}
