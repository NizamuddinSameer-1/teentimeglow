import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  const urls = [
    { loc: 'https://teentimeglow.me/', lastmod: '2026-10-18', changefreq: 'daily', priority: '1.0' },
    { loc: 'https://teentimeglow.me/edits', lastmod: '2026-10-18', changefreq: 'daily', priority: '0.9' },
    { loc: 'https://teentimeglow.me/wallpapers', lastmod: '2026-10-18', changefreq: 'weekly', priority: '0.85' },
    { loc: 'https://teentimeglow.me/rankings', lastmod: '2026-10-18', changefreq: 'weekly', priority: '0.85' },
    { loc: 'https://teentimeglow.me/quotes', lastmod: '2026-10-18', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://teentimeglow.me/quiz', lastmod: '2026-10-18', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://teentimeglow.me/gallery', lastmod: '2026-10-18', changefreq: 'daily', priority: '0.8' },
    { loc: 'https://teentimeglow.me/edits/glass-skin-blueprint', lastmod: '2026-10-18', changefreq: 'weekly', priority: '0.85' },
    { loc: 'https://teentimeglow.me/edits/fall-knit-lookbook', lastmod: '2026-10-18', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://teentimeglow.me/edits/dreamy-room-decor-under-50', lastmod: '2026-10-18', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://teentimeglow.me/edits/parisian-chic-layering', lastmod: '2026-10-18', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://teentimeglow.me/edits/ceramide-barrier-repair', lastmod: '2026-10-18', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://teentimeglow.me/edits/study-aesthetic-sanctuary', lastmod: '2026-10-18', changefreq: 'weekly', priority: '0.8' }
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml.trim(), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
};
