import { createClient } from '@supabase/supabase-js';

const getEnvVar = (key: string): string | undefined => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch {}
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env as any)[key]) {
      return (import.meta.env as any)[key];
    }
  } catch {}
  return undefined;
};

// Only the URL and the *anon* (publishable) key are safe as committed fallbacks;
// the service-role key must never live in source — set it in .env / Vercel env vars.
const defaultSupabaseUrl = 'https://txuubvzxmawjqqduavcv.supabase.co';
const defaultAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4dXVidnp4bWF3anFxZHVhdmN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyMzk0MjQsImV4cCI6MjEwNzgxNTQyNH0.Sx0rGz263LJBucLnPFVGgKI7kmiJ_ADyjxPW41DW8_Q';

const supabaseUrl = getEnvVar('PUBLIC_SUPABASE_URL') || defaultSupabaseUrl;
const supabaseAnonKey = getEnvVar('PUBLIC_SUPABASE_ANON_KEY') || defaultAnonKey;

// Public Supabase client for safe read operations and client-side interactions
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

let adminClientInstance: ReturnType<typeof createClient> | null = null;

// Server-side admin client with service_role privileges (for API routes & admin SSR)
export const getAdminClient = () => {
  if (adminClientInstance) {
    return adminClientInstance;
  }

  const serviceRoleKey =
    getEnvVar('SUPABASE_SERVICE_ROLE_KEY');

  if (!serviceRoleKey) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is required for admin operations.');
  }

  adminClientInstance = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });

  return adminClientInstance;
};
