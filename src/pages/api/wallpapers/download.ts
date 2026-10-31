import type { APIRoute } from 'astro';
import { supabase, getAdminClient } from '@/lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    let client = supabase;
    try {
      client = getAdminClient();
    } catch {}

    const { title } = await request.json();

    if (!title) {
      return new Response(JSON.stringify({ error: 'Wallpaper title is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data: current } = await client
      .from('wallpapers')
      .select('id, download_count')
      .eq('title', title)
      .limit(1)
      .maybeSingle();

    if (current) {
      await client
        .from('wallpapers')
        .update({ download_count: (current.download_count || 0) + 1 })
        .eq('id', current.id);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
