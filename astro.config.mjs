import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.teentimeglow.me',
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
