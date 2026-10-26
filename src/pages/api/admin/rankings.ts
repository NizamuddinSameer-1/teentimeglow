import type { APIRoute } from 'astro';
import { getAdminClient } from '@/lib/supabase';

export const prerender = false;

const jsonHeaders = { 'Content-Type': 'application/json' };


// Create ranking
export const POST: APIRoute = async ({ request }) => {

  try {
    const { title, category, cover_image_url, rating, review_text, watch_url, tags } = await request.json();
    if (!title) return new Response(JSON.stringify({ error: 'Title is required' }), { status: 400, headers: jsonHeaders });

    const adminClient = getAdminClient();
    const { data, error } = await adminClient
      .from('rankings')
      .insert({
        title,
        category: category || 'prime_video',
        cover_image_url: cover_image_url || '/assets/ranking-summer.jpg',
        rating: typeof rating === 'number' ? rating : 5,
        review_text: review_text || 'Curated recommendation by Rini.',
        watch_url: watch_url || 'https://www.amazon.com/primevideo',
        tags: Array.isArray(tags) ? tags : ['Curated', 'Must Watch'],
        rank_order: 1
      })
      .select()
      .single();

    if (error) throw error;
    return new Response(JSON.stringify({ success: true, ranking: data }), { status: 200, headers: jsonHeaders });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: jsonHeaders });
  }
};

// Update ranking
export const PUT: APIRoute = async ({ request }) => {

  try {
    const { id, title, category, cover_image_url, rating, review_text, watch_url, tags } = await request.json();
    if (!id) return new Response(JSON.stringify({ error: 'Ranking ID is required' }), { status: 400, headers: jsonHeaders });

    const adminClient = getAdminClient();
    const updateData: any = {};
    if (title) updateData.title = title;
    if (category) updateData.category = category;
    if (cover_image_url) updateData.cover_image_url = cover_image_url;
    if (rating !== undefined) updateData.rating = rating;
    if (review_text) updateData.review_text = review_text;
    if (watch_url !== undefined) updateData.watch_url = watch_url;
    if (tags) updateData.tags = tags;

    const { data, error } = await adminClient
      .from('rankings')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return new Response(JSON.stringify({ success: true, ranking: data }), { status: 200, headers: jsonHeaders });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: jsonHeaders });
  }
};

// Delete ranking
export const DELETE: APIRoute = async ({ request }) => {

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return new Response(JSON.stringify({ error: 'Ranking ID is required' }), { status: 400, headers: jsonHeaders });

    const adminClient = getAdminClient();
    const { error } = await adminClient
      .from('rankings')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return new Response(JSON.stringify({ success: true, message: 'Ranking deleted' }), { status: 200, headers: jsonHeaders });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: jsonHeaders });
  }
};
