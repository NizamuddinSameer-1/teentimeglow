import type { APIRoute } from 'astro';
import { getAdminClient } from '@/lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const supabase = getAdminClient();
  try {
    const { title } = await request.json();

    if (!title) {
      return new Response(JSON.stringify({ error: 'Wallpaper title is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data: current } = await supabase
      .from('wallpapers')
      .select('id, download_count')
      .eq('title', title)
      .limit(1)
      .maybeSingle();

    if (current) {
      await supabase
        .from('wallpapers')
        .update({ download_count: (current.download_count || 0) + 1 })
        .eq('id', current.id);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
