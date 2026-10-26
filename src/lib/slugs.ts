/**
 * URL slug helpers.
 *
 * Wallpapers and quotes have no `slug` column in Supabase, so slugs are derived
 * deterministically from their content at render time. That keeps the database
 * untouched while still giving every item a stable, keyword-bearing URL.
 *
 * Constraint: a slug must not change when unrelated fields change, or the URL
 * dies. Deriving from `title` (wallpapers) and `content_text` (quotes) satisfies
 * that — those are the fields an editor would never silently rewrite.
 */

export function slugify(input: string): string {
  return (input || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/&/g, ' and ')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ') // emoji, punctuation → space
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
    .replace(/-$/g, '');
}

/** Appends -2, -3 … until the slug is unique within `taken`. */
function uniquify(base: string, taken: Set<string>): string {
  const root = base || 'item';
  let candidate = root;
  let n = 2;
  while (taken.has(candidate)) {
    candidate = `${root}-${n++}`;
  }
  taken.add(candidate);
  return candidate;
}

/**
 * Builds a stable id → slug map for all wallpapers at once, so uniqueness is
 * resolved globally rather than per-page (otherwise two pages could claim the
 * same slug and one would silently win).
 */
export function buildWallpaperSlugMap(items: { id: string; title: string }[]): Map<string, string> {
  const taken = new Set<string>();
  const map = new Map<string, string>();
  for (const item of items) {
    map.set(item.id, uniquify(slugify(item.title), taken));
  }
  return map;
}

/**
 * Quotes use the editorial theme after the "•" in the author field
 * ("Rini • Golden Hour Energy" → "golden-hour-energy"). Quotes without a theme
 * fall back to their first few words, which is still readable and keyword-rich.
 */
export function buildQuoteSlugMap(items: { id: string; author?: string | null; content_text?: string | null }[]): Map<string, string> {
  const taken = new Set<string>();
  const map = new Map<string, string>();

  for (const item of items) {
    const author = item.author || '';
    const theme = author.includes('•') ? author.split('•')[1]?.trim() : '';
    const text = item.content_text || '';

    const base = theme
      ? slugify(theme)
      : slugify(text.split(/\s+/).slice(0, 6).join(' '));

    map.set(item.id, uniquify(base, taken));
  }

  return map;
}

/** "Rini • Golden Hour Energy" → "Golden Hour Energy" (falls back to "Mindset"). */
export function quoteTheme(author?: string | null): string {
  if (!author) return 'Mindset';
  if (!author.includes('•')) return 'Mindset';
  return author.split('•')[1]?.trim() || 'Mindset';
}
