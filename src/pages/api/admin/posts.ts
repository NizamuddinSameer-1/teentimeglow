import type { APIRoute } from 'astro';
import { getAdminClient } from '@/lib/supabase';

export const prerender = false;

const checkAuth = (cookies: any) => {
  const session = cookies.get('ttg_admin_session')?.value;
  const expectedSecret = process.env.ADMIN_SECRET_KEY || 'rini-glow-2026';
  return session && session === expectedSecret;
};

// Create new article
export const POST: APIRoute = async ({ request, cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { title, category, excerpt, content_html, cover_image_url } = await request.json();
    if (!title) return new Response(JSON.stringify({ error: 'Title is required' }), { status: 400 });

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') || `post-${Date.now()}`;

    const adminClient = getAdminClient();
    const { data, error } = await adminClient
      .from('posts')
      .insert({
        title,
        slug,
        category: category || 'beauty',
        excerpt: excerpt || '',
        content_html: content_html || `<p>${excerpt || title}</p>`,
        cover_image_url: cover_image_url || '/assets/feature-skincare.jpg',
        read_time_minutes: Math.max(2, Math.ceil((content_html || '').split(' ').length / 150)),
        is_published: true
      })
      .select()
      .single();

    if (error) throw error;
    return new Response(JSON.stringify({ success: true, post: data }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

// Update existing article
export const PUT: APIRoute = async ({ request, cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const { id, title, category, excerpt, content_html, cover_image_url } = await request.json();
    if (!id) return new Response(JSON.stringify({ error: 'Post ID is required' }), { status: 400 });

    const adminClient = getAdminClient();
    const updateData: any = {
      updated_at: new Date().toISOString()
    };
    if (title) updateData.title = title;
    if (category) updateData.category = category;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content_html !== undefined) {
      updateData.content_html = content_html;
      updateData.read_time_minutes = Math.max(2, Math.ceil(content_html.split(' ').length / 150));
    }
    if (cover_image_url) updateData.cover_image_url = cover_image_url;

    const { data, error } = await adminClient
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return new Response(JSON.stringify({ success: true, post: data }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

// Delete article
export const DELETE: APIRoute = async ({ request, cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) return new Response(JSON.stringify({ error: 'Post ID is required' }), { status: 400 });

    const adminClient = getAdminClient();
    const { error } = await adminClient
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return new Response(JSON.stringify({ success: true, message: 'Post deleted' }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};
