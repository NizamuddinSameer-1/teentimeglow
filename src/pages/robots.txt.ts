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

# Explicit AI Search & Citation Agents (Allow Indexing & Answer Citation)
User-agent: GPTBot
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /api/

User-agent: Claude-SearchBot
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /api/

User-agent: PerplexityBot
Allow: /
Disallow: /admin
Disallow: /admin/
Disallow: /api/

# Content Signals Policy declaration (Cloudflare / IETF Draft)
Content-Signal: search=yes, ai-input=yes, ai-train=no

# Aggressive crawlers rate limit
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
