/**
 * Publish the glass-skin article to the posts table.
 *
 * Idempotent: if the slug already exists the row is PATCHed instead of
 * duplicated, so re-running after an edit is safe.
 *
 * created_at and updated_at are set explicitly. [slug].astro falls back to
 * 2026-10-18 when created_at is null, which would make the JSON-LD datePublished
 * disagree with the visible "Last reviewed" line.
 */
import fs from 'fs';

const env = Object.fromEntries(
  fs.readFileSync('.env', 'utf8')
    .split(/\r?\n/)
    .filter((l) => l.includes('=') && !l.trim().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')];
    })
);

const url = env.PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error('Supabase URL / service role key missing from .env');

const post = JSON.parse(fs.readFileSync('.tmp-post.json', 'utf8'));
const now = new Date().toISOString();

const headers = {
  apikey: key,
  Authorization: 'Bearer ' + key,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
};

const existing = await fetch(
  url + '/rest/v1/posts?select=id,slug&slug=eq.' + encodeURIComponent(post.slug),
  { headers }
);
const found = await existing.json();
const isUpdate = Array.isArray(found) && found.length > 0;

const record = {
  ...post,
  updated_at: now,
  ...(isUpdate ? {} : { created_at: now }),
};

const res = await fetch(
  url + '/rest/v1/posts' + (isUpdate ? '?slug=eq.' + encodeURIComponent(post.slug) : ''),
  {
    method: isUpdate ? 'PATCH' : 'POST',
    headers,
    body: JSON.stringify(record),
  }
);

const text = await res.text();
if (!res.ok) {
  console.log('FAILED ' + res.status);
  console.log(text.slice(0, 800));
  process.exit(1);
}

const rows = JSON.parse(text);
const row = rows[0];
console.log((isUpdate ? 'UPDATED' : 'INSERTED') + ' posts row');
console.log('  id              ' + row.id);
console.log('  slug            ' + row.slug);
console.log('  title           ' + row.title);
console.log('  category        ' + row.category);
console.log('  is_published    ' + row.is_published);
console.log('  read_time       ' + row.read_time_minutes);
console.log('  created_at      ' + row.created_at);
console.log('  updated_at      ' + row.updated_at);
console.log('  content_html    ' + String(row.content_html || '').length + ' chars');
console.log('  cover           ' + row.cover_image_url);
