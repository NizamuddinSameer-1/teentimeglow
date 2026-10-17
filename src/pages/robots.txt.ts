import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  const robots = `# Googlebot & Web Crawlers
User-agent: *
Allow: /

# Disallow private admin dashboard and API routes
Disallow: /admin
Disallow: /admin/*
Disallow: /api/*

# XML Sitemap Location
Sitemap: https://teentimeglow.me/sitemap.xml
`;

  return new Response(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
};
