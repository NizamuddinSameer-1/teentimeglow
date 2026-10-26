import fs from 'fs';

const old = fs.readFileSync('.tmp-old-supabase.ts', 'utf8');
const keyRe = /'(eyJ[A-Za-z0-9_.-]{20,})'/g;
const urlRe = /'(https:\/\/[a-z0-9]+\.supabase\.co)'/g;
const keys = [...old.matchAll(keyRe)].map((m) => m[1]);
const urls = [...old.matchAll(urlRe)].map((m) => m[1]);

const env = Object.fromEntries(
  fs.readFileSync('.env', 'utf8').split(/\r?\n/)
    .filter((l) => l.includes('=') && !l.trim().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim().replace(/^["']|["']$/g, '')];
    })
);

const fp = (s) => (s ? s.slice(0, 14) + '…(len ' + s.length + ')' : '(unset)');

console.log('OLD hardcoded keys found: ' + keys.length);
keys.forEach((k, i) => console.log('  old key ' + i + ': ' + fp(k)));
console.log('OLD hardcoded url       : ' + (urls[0] ? fp(urls[0]) : 'none'));
console.log('ENV url                 : ' + fp(env.PUBLIC_SUPABASE_URL));
console.log('ENV anon                : ' + fp(env.PUBLIC_SUPABASE_ANON_KEY));
console.log('ENV service             : ' + fp(env.SUPABASE_SERVICE_ROLE_KEY));
console.log('');
console.log('env anon  == an old key   ? ' + keys.includes(env.PUBLIC_SUPABASE_ANON_KEY));
console.log('env svc   == an old key   ? ' + keys.includes(env.SUPABASE_SERVICE_ROLE_KEY));
console.log('env url   == old url      ? ' + urls.includes(env.PUBLIC_SUPABASE_URL));
