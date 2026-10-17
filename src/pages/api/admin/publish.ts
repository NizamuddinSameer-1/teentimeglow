import type { APIRoute } from 'astro';
import { getAdminClient } from '@/lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { type, data } = await request.json();
    const adminClient = getAdminClient();

    if (type === 'post') {
      const { title, category, excerpt, content_html, cover_image_url } = data;
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const { data: post, error } = await adminClient
        .from('posts')
        .insert({
          title,
          slug,
          category,
          excerpt,
          content_html: content_html || `<p>${excerpt}</p>`,
          cover_image_url: cover_image_url || '/assets/feature-skincare.jpg',
          read_time_minutes: 3,
          is_published: true
        })
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify({ success: true, post }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (type === 'quote') {
      const { content_text, author } = data;
      const { data: quote, error } = await adminClient
        .from('stories_memes_quotes')
        .insert({
          type: 'quote',
          content_text,
          author: author || 'Rini',
          likes_count: 0
        })
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify({ success: true, quote }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (type === 'wallpaper') {
      const { title, device_type, thumbnail_url, download_url } = data;
      const { data: wp, error } = await adminClient
        .from('wallpapers')
        .insert({
          title,
          device_type: device_type || 'mobile',
          thumbnail_url: thumbnail_url || '/assets/wallpaper-clouds.jpg',
          download_url: download_url || thumbnail_url || '/assets/wallpaper-clouds.jpg',
          resolution_label: '4K Ultra-HD',
          download_count: 0
        })
        .select()
        .single();

      if (error) throw error;
      return new Response(JSON.stringify({ success: true, wallpaper: wp }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid publish type' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Publish API error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
