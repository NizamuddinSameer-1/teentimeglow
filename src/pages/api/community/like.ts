import type { APIRoute } from 'astro';
import { getAdminClient } from '@/lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const supabase = getAdminClient();
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'Creation ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Call rpc or fetch and increment
    const { data: current } = await supabase
      .from('community_creations')
      .select('likes_count')
      .eq('id', id)
      .single();

    const newLikes = (current?.likes_count || 0) + 1;

    const { data, error } = await supabase
      .from('community_creations')
      .update({ likes_count: newLikes })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, likes: newLikes, data }), {
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
