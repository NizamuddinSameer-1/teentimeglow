import type { APIRoute } from 'astro';
import { getPosts, getWallpapers, getQuotes } from '@/lib/api';
import { buildWallpaperSlugMap, buildQuoteSlugMap } from '@/lib/slugs';
import { SITE_URL, CATEGORIES } from '@/config/seo';

export const prerender = false;

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
}

/**
 * Dynamic sitemap.
 *
 * The old version was a hardcoded array of 13 URLs — any article published
 * through the admin dashboard was invisible to Google until someone edited
 * this file by hand. It also used the non-www host, so every entry pointed at
 * a 307 redirect. Both problems are fixed here: URLs are generated from
 * SITE_URL and articles are pulled live from Supabase.
 */
export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  const [posts, wallpapers, quotes] = await Promise.all([getPosts(), getWallpapers(), getQuotes()]);

  const staticPages: SitemapEntry[] = [
    { loc: `${SITE_URL}/`, lastmod: today, changefreq: 'daily', priority: '1.0' },
    { loc: `${SITE_URL}/edits`, lastmod: today, changefreq: 'daily', priority: '0.9' },
    { loc: `${SITE_URL}/wallpapers`, lastmod: today, changefreq: 'weekly', priority: '0.9' },
    { loc: `${SITE_URL}/rankings`, lastmod: today, changefreq: 'weekly', priority: '0.8' },
    { loc: `${SITE_URL}/quotes`, lastmod: today, changefreq: 'daily', priority: '0.8' },
    { loc: `${SITE_URL}/quiz`, lastmod: today, changefreq: 'monthly', priority: '0.7' },
    { loc: `${SITE_URL}/gallery`, lastmod: today, changefreq: 'weekly', priority: '0.7' },
    { loc: `${SITE_URL}/about`, lastmod: today, changefreq: 'yearly', priority: '0.6' }
  ];

  const categoryPages: SitemapEntry[] = CATEGORIES.map((c) => ({
    loc: `${SITE_URL}/edits/category/${c.slug}`,
    lastmod: today,
    changefreq: 'weekly' as const,
    priority: '0.85'
  }));

  const articlePages: SitemapEntry[] = posts.map((p) => ({
    loc: `${SITE_URL}/edits/${p.slug}`,
    lastmod: (p.updated_at || p.created_at || new Date().toISOString()).split('T')[0],
    changefreq: 'monthly' as const,
    priority: '0.8'
  }));

  // Individual wallpaper pages — the highest-volume keyword surface on the site.
  const wallpaperSlugs = buildWallpaperSlugMap(wallpapers);
  const wallpaperPages: SitemapEntry[] = wallpapers.map((w) => ({
    loc: `${SITE_URL}/wallpapers/${wallpaperSlugs.get(w.id)}`,
    lastmod: (w.created_at || new Date().toISOString()).split('T')[0],
    changefreq: 'monthly' as const,
    priority: '0.75'
  }));

  const quoteSlugs = buildQuoteSlugMap(quotes);
  const quotePages: SitemapEntry[] = quotes.map((q) => ({
    loc: `${SITE_URL}/quotes/${quoteSlugs.get(q.id)}`,
    lastmod: (q.created_at || new Date().toISOString()).split('T')[0],
    changefreq: 'yearly' as const,
    priority: '0.6'
  }));

  // De-duplicate by loc in case a post slug ever collides with a static route.
  const seen = new Set<string>();
  const all = [...staticPages, ...categoryPages, ...articlePages, ...wallpaperPages, ...quotePages].filter((u) => {
    if (seen.has(u.loc)) return false;
    seen.add(u.loc);
    return true;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml.trim(), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800'
    }
  });
};
