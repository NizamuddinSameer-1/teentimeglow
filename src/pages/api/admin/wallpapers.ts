import type { APIRoute } from 'astro';
import { getAdminClient } from '@/lib/supabase';

export const prerender = false;

const checkAuth = (cookies: any) => {
  const session = cookies.get('ttg_admin_session')?.value;
  const expectedSecret = process.env.ADMIN_SECRET_KEY || 'rini-glow-2026';
  return session && session === expectedSecret;
};

// Create wallpaper
export const POST: APIRoute = async ({ request, cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { title, device_type, thumbnail_url, download_url, resolution_label } = await request.json();
    if (!title) return new Response(JSON.stringify({ error: 'Title is required' }), { status: 400 });

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
    return new Response(JSON.stringify({ success: true, wallpaper: data }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

// Delete wallpaper
export const DELETE: APIRoute = async ({ request, cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return new Response(JSON.stringify({ error: 'Wallpaper ID is required' }), { status: 400 });

    const adminClient = getAdminClient();
    const { error } = await adminClient
      .from('wallpapers')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return new Response(JSON.stringify({ success: true, message: 'Wallpaper deleted' }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
