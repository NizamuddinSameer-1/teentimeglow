/**
 * Deletes every row from the `posts` table.
 *
 *   node scripts/delete-posts.mjs
 *
 * Take a backup first: `node scripts/backup-supabase.mjs`.
 * Reads credentials from .env (gitignored). Never hardcode keys here — the
 * repository is public.
 */
import { readFileSync, existsSync } from 'node:fs';

function loadEnv() {
  if (!existsSync('.env')) return {};
  const out = {};
  for (const line of readFileSync('.env', 'utf8').split(/\r?\n/)) {
    const m = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim());
    if (m) out[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
  return out;
}

const env = { ...loadEnv(), ...process.env };
const URL_BASE = env.PUBLIC_SUPABASE_URL;
const KEY = env.SUPABASE_SERVICE_ROLE_KEY;

if (!URL_BASE || !KEY) {
  console.error('Missing PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const headers = { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' };

const listRes = await fetch(URL_BASE + '/rest/v1/posts?select=id,title,slug', { headers });
const rows = await listRes.json();

if (!Array.isArray(rows) || rows.length === 0) {
  console.log('No posts found. Nothing to delete.');
  process.exit(0);
}

console.log('Deleting ' + rows.length + ' post(s):');
for (const r of rows) console.log('  - ' + r.slug + '  "' + r.title + '"');

for (const r of rows) {
  const del = await fetch(URL_BASE + '/rest/v1/posts?id=eq.' + encodeURIComponent(r.id), {
    method: 'DELETE',
    headers: { ...headers, Prefer: 'return=minimal' }
  });
  console.log('  delete ' + r.slug + ' -> ' + del.status);
}

const check = await fetch(URL_BASE + '/rest/v1/posts?select=id', { headers });
const after = await check.json();
console.log('\nposts remaining: ' + (Array.isArray(after) ? after.length : 'unknown'));
