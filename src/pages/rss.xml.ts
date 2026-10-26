import type { APIRoute } from 'astro';
import { getPosts } from '@/lib/api';
import { SITE_URL, SITE_NAME } from '@/config/seo';

export const prerender = false;

function escapeXml(str: string): string {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * RSS feed. Feeds are a cheap discovery surface — aggregators, newsletters and
 * Google Publisher Center all pick these up, and they give readers a reason to
 * subscribe without an email capture.
 */
export const GET: APIRoute = async () => {
  const posts = await getPosts();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/edits/${post.slug}`;
      const pubDate = new Date(post.created_at || Date.now()).toUTCString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <category>${escapeXml(post.category)}</category>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} — Editorial Edits</title>
    <link>${SITE_URL}/edits</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Curated teen fashion lookbooks, glass skin skincare routines, and cozy decor guides by Rini.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800'
    }
  });
};
