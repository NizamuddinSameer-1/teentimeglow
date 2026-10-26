import type { APIRoute } from 'astro';
import { SITE_URL } from '@/config/seo';

export const prerender = false;

export const GET: APIRoute = async () => {
  const robots = `# TeenTimeGlow — crawler directives
User-agent: *
Allow: /

# Private surfaces: admin dashboard and JSON APIs
Disallow: /admin
Disallow: /admin/
Disallow: /api/

# Never index internal search / filtered views (duplicate content)
Disallow: /*?q=
Disallow: /*?category=
Disallow: /*?sort=

# Aggressive AI scrapers that provide no referral value
User-agent: AhrefsBot
Crawl-delay: 10

# XML Sitemap Location
Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
};
