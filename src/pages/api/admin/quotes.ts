import type { APIRoute } from 'astro';
import { getAdminClient } from '@/lib/supabase';

export const prerender = false;


const jsonHeaders = { 'Content-Type': 'application/json' };

// Create quote
export const POST: APIRoute = async ({ request }) => {

  try {
    const { content_text, author } = await request.json();
    if (!content_text) return new Response(JSON.stringify({ error: 'Quote text is required' }), { status: 400, headers: jsonHeaders });

    const adminClient = getAdminClient();
    const { data, error } = await adminClient
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
    return new Response(JSON.stringify({ success: true, quote: data }), {
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

// Delete quote
export const DELETE: APIRoute = async ({ request }) => {

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ error: 'Quote ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const adminClient = getAdminClient();
    const { error } = await adminClient
      .from('stories_memes_quotes')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return new Response(JSON.stringify({ success: true, message: 'Quote deleted' }), {
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
