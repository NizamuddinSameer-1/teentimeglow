import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Must match the host that actually serves 200 responses in production.
  // teentimeglow.me redirects to www.teentimeglow.me at the edge, so the
  // canonical origin is the www variant.
  site: 'https://www.teentimeglow.me',
  // Never emit trailing slashes — keeps one URL per resource and stops
  // /edits and /edits/ from competing as duplicates.
  trailingSlash: 'never',
  output: 'server',
  adapter: vercel(),
  security: {
    checkOrigin: false
  },
  integrations: [react()],
  vite: {
    envPrefix: ['PUBLIC_', 'SUPABASE_'],
    ssr: {
      noExternal: ['@supabase/supabase-js']
    }
  }
});
