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

const supabaseUrl = getEnvVar('PUBLIC_SUPABASE_URL');
const supabaseAnonKey = getEnvVar('PUBLIC_SUPABASE_ANON_KEY');

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY env vars. Configure them in .env and Vercel.');
}

// Public Supabase client for safe read operations and client-side interactions
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

let adminClientInstance: ReturnType<typeof createClient> | null = null;

// Server-side admin client with service_role privileges (for API routes & admin SSR)
export const getAdminClient = () => {
  if (adminClientInstance) {
    return adminClientInstance;
  }

  const serviceRoleKey = getEnvVar('SUPABASE_SERVICE_ROLE_KEY');

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
