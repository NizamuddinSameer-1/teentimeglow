import type { APIRoute } from 'astro';
import { getAdminClient } from '@/lib/supabase';

export const prerender = false;

const checkAuth = (cookies: any) => {
  const session = cookies.get('ttg_admin_session')?.value;
  const expectedSecret = process.env.ADMIN_SECRET_KEY || 'rini-glow-2026';
  return session && session === expectedSecret;
};

// Create quote
export const POST: APIRoute = async ({ request, cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { content_text, author } = await request.json();
    if (!content_text) return new Response(JSON.stringify({ error: 'Quote text is required' }), { status: 400 });

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
    return new Response(JSON.stringify({ success: true, quote: data }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

// Delete quote
export const DELETE: APIRoute = async ({ request, cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return new Response(JSON.stringify({ error: 'Quote ID is required' }), { status: 400 });

    const adminClient = getAdminClient();
    const { error } = await adminClient
      .from('stories_memes_quotes')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return new Response(JSON.stringify({ success: true, message: 'Quote deleted' }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
