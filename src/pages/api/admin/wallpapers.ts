import type { APIRoute } from 'astro';
import { getAdminClient } from '@/lib/supabase';

export const prerender = false;

const jsonHeaders = { 'Content-Type': 'application/json' };


// Create wallpaper
export const POST: APIRoute = async ({ request }) => {

  try {
    const { title, device_type, thumbnail_url, download_url, resolution_label } = await request.json();
    if (!title) return new Response(JSON.stringify({ error: 'Title is required' }), { status: 400, headers: jsonHeaders });

    const adminClient = getAdminClient();
    const { data, error } = await adminClient
      .from('wallpapers')
      .insert({
        title,
        device_type: device_type || 'mobile',
        thumbnail_url: thumbnail_url || '/assets/wallpaper-clouds.jpg',
        download_url: download_url || thumbnail_url || '/assets/wallpaper-clouds.jpg',
        resolution_label: resolution_label || '4K Ultra-HD',
        download_count: 0
      })
      .select()
      .single();

    if (error) throw error;
    return new Response(JSON.stringify({ success: true, wallpaper: data }), { status: 200, headers: jsonHeaders });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: jsonHeaders });
  }
};

// Delete wallpaper
export const DELETE: APIRoute = async ({ request }) => {

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return new Response(JSON.stringify({ error: 'Wallpaper ID is required' }), { status: 400, headers: jsonHeaders });

    const adminClient = getAdminClient();
    const { error } = await adminClient
      .from('wallpapers')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return new Response(JSON.stringify({ success: true, message: 'Wallpaper deleted' }), { status: 200, headers: jsonHeaders });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: jsonHeaders });
  }
};
