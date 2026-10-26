/**
 * Editorial copy for individual wallpaper pages.
 *
 * Why a hand-written map instead of a template: a generator that fills
 * "[Title] is a [device] wallpaper in [resolution]" produces ten pages of
 * near-duplicate text, which is worse than having no pages at all. Google
 * treats that as boilerplate and it reads like spam to a visitor.
 *
 * Keys are the slugs produced by `slugify(title)` in `src/lib/slugs.ts`.
 * If a wallpaper has no entry here, `wallpaperFallbackCopy()` produces a short,
 * honest, non-duplicated paragraph instead.
 *
 * ⚠️ These descriptions were written from wallpaper titles. Rini should read
 * each one against the actual image before publishing — if a description
 * doesn't match what the picture shows, fix the copy, not the picture.
 */

export interface WallpaperCopy {
  /** One sentence that names what the image actually is. */
  intro: string;
  /** Why someone would want it on their screen. */
  mood: string;
  /** Comma-free list used in the meta description and keywords. */
  tags: string[];
}

export const WALLPAPER_COPY: Record<string, WallpaperCopy> = {
  'little-kitten-grey-wallpaper': {
    intro:
      'A soft grey kitten portrait on a muted background — quiet, low-contrast, and easy to live with behind a screen full of app icons.',
    mood:
      'This one is for people who want something gentle rather than loud. The grey palette keeps it from fighting with your widgets, and the subject is small enough that it still reads clearly on a lock screen.',
    tags: ['grey kitten', 'minimal pet wallpaper', 'soft neutral']
  },
  'peachy-pink-cat-and-pastel-fruit-doodle-aesthetic-wallpaper': {
    intro:
      'A pastel doodle composition mixing a peach-pink cat with fruit motifs, drawn in a loose hand-sketched style.',
    mood:
      'Doodle wallpapers work best when the illustration sits in the upper third, so your clock and notifications land on empty colour instead of on someone\'s face. This one is built around that kind of negative space.',
    tags: ['peach aesthetic', 'cat doodle', 'pastel wallpaper']
  },
  'ivory-pearl-bows-on-a-blush-pink-lace-aesthetic-wallpaper': {
    intro:
      'Ivory pearl bows layered over blush pink lace — a coquette-leaning texture study in cream and rose.',
    mood:
      'Texture-heavy wallpapers photograph beautifully on OLED screens because the lace detail stays visible at low brightness. Pair it with a cream-tinted icon pack and the whole home screen reads as one palette.',
    tags: ['coquette aesthetic', 'bow wallpaper', 'blush pink lace']
  },
  'muted-mocha-blush-aesthetic-wallpaper': {
    intro:
      'A muted mocha and blush colour-block study — warm browns softened with a dusty rose wash.',
    mood:
      'The most useful thing about a mocha palette is that it hides icon clutter. Dark text stays legible on the light half, light text stays legible on the dark half, so you can leave your home screen unedited.',
    tags: ['mocha aesthetic', 'brown wallpaper', 'warm neutral']
  },
  'cute-lqbtq-wallpaper-for-girls': {
    intro:
      'A soft-palette pride wallpaper made for phone screens, with the flag colours blended into a gentle gradient rather than a hard stripe.',
    mood:
      'Pride wallpapers tend to be either loud or clinical. This one keeps the colours readable but softened, so it works as a daily background rather than a one-week statement.',
    tags: ['pride wallpaper', 'rainbow gradient', 'soft pride aesthetic']
  },
  'fluffy-cat-patterns': {
    intro:
      'A repeating fluffy cat pattern — small illustrated cats tiled across a light background.',
    mood:
      'Repeating patterns are the most forgiving wallpaper category: there is no focal point to crop badly, so the image survives every screen ratio and every icon layout.',
    tags: ['cat pattern', 'repeating wallpaper', 'cute animal print']
  },
  'lilac-dreamscape-sunset': {
    intro:
      'A lilac-toned sunset sky, graded towards lavender and pale pink rather than the usual orange.',
    mood:
      'Purple gradients photograph badly on cheap panels and beautifully on good ones, so check it on your own screen before you commit. On a decent display the lilac keeps its depth at low brightness, which is where a wallpaper spends most of its life.',
    tags: ['lilac sunset', 'purple gradient', 'dreamy sky']
  },
  'cotton-candy-sunset-clouds': {
    intro:
      'Cotton candy clouds at golden hour — pink and peach cumulus with a soft, almost painted edge.',
    mood:
      'Sky wallpapers are the safest choice for a lock screen because the top two-thirds is naturally empty. Your clock sits in clean colour and the image still does its job behind it.',
    tags: ['cotton candy sky', 'pink clouds', 'sunset wallpaper']
  },
  'golden-hour-glow-horizon': {
    intro:
      'A wide golden-hour horizon built for desktop, with warm light falling across the full 16:9 frame.',
    mood:
      'Built for a monitor rather than a phone: the horizon sits low so menu bars and dock icons land on the darker foreground instead of cutting across the brightest part of the image.',
    tags: ['golden hour desktop', '4k sunset', 'warm horizon']
  },
  'iced-matcha-latte-minimalist': {
    intro:
      'An iced matcha latte photographed flat and minimal, with the green kept muted rather than saturated.',
    mood:
      'Minimalist object wallpapers are the closest thing to a neutral background that still has personality. Muted matcha green is dark enough to keep white text readable without being as harsh as black.',
    tags: ['matcha wallpaper', 'minimal coffee aesthetic', 'sage green']
  }
};

/**
 * Honest fallback for wallpapers added after this file was written.
 * Deliberately short and factual — no invented description of an image
 * nobody has looked at.
 */
export function wallpaperFallbackCopy(title: string, deviceType: string, resolution: string): WallpaperCopy {
  const deviceLabel = deviceType === 'desktop' ? 'desktop monitor' : 'phone screen';
  return {
    intro: `${title.replace(/\s+/g, ' ').trim()} is a free ${resolution} wallpaper sized for a ${deviceLabel}.`,
    mood:
      'Download it at full resolution and set it as your lock screen or home background. No watermark, no sign-up, free for personal use.',
    tags: [title.toLowerCase().trim(), deviceType === 'desktop' ? 'desktop wallpaper' : 'phone wallpaper', 'free 4k']
  };
}
