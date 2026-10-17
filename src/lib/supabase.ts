import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://txuubvzxmawjqqduavcv.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4dXVidnp4bWF3anFxZHVhdmN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyMzk0MjQsImV4cCI6MjEwNzgxNTQyNH0.Sx0rGz263LJBucLnPFVGgKI7kmiJ_ADyjxPW41DW8_Q';

// Public Supabase client for safe read operations and client-side interactions
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin client with service_role privileges (for API routes & admin SSR)
export const getAdminClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY is not defined. Falling back to public anon key.');
    return supabase;
  }
  return createClient(supabaseUrl, serviceRoleKey);
};
