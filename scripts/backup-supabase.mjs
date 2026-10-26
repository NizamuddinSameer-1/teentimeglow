/**
 * Full JSON export of every table — run this BEFORE any destructive operation.
 *
 *   node scripts/backup-supabase.mjs
 *
 * Reads credentials from .env (gitignored). Never hardcode keys in this file:
 * the repository is public.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';

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

const headers = { apikey: KEY, Authorization: 'Bearer ' + KEY };
const tables = [
  'posts',
  'quizzes',
  'quiz_questions',
  'quiz_options',
  'quiz_outcomes',
  'wallpapers',
  'stories_memes_quotes',
  'rankings',
  'community_creations'
];

const out = { exportedAt: new Date().toISOString(), tables: {} };

for (const t of tables) {
  const r = await fetch(URL_BASE + '/rest/v1/' + t + '?select=*', { headers });
  if (!r.ok) {
    console.log(t.padEnd(22), 'ERR', r.status);
    continue;
  }
  const rows = await r.json();
  out.tables[t] = Array.isArray(rows) ? rows : [];
  console.log(t.padEnd(22), out.tables[t].length);
}

mkdirSync('backups', { recursive: true });
const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
const file = 'backups/supabase-backup-' + stamp + '.json';
writeFileSync(file, JSON.stringify(out, null, 2));
console.log('\nsaved -> ' + file);
