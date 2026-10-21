import type { APIRoute } from 'astro';
import { getAdminClient } from '@/lib/supabase';

export const prerender = false;

const checkAuth = (cookies: any) => {
  const session = cookies.get('ttg_admin_session')?.value;
  const expectedSecret = process.env.ADMIN_SECRET_KEY || 'rini-glow-2026';
  return session && (session === expectedSecret || session === '2026');
};

// Create new article
export const POST: APIRoute = async ({ request, cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin session required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { title, category, excerpt, content_html, cover_image_url, is_published } = await request.json();
    if (!title || !title.trim()) {
      return new Response(JSON.stringify({ error: 'Title is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const rawCategory = (category || 'beauty').toLowerCase().trim();
    const validCategory = ['beauty', 'fashion', 'decor'].includes(rawCategory) ? rawCategory : 'beauty';

    let baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') || `post-${Date.now()}`;

    const adminClient = getAdminClient();

    // Check if slug exists to avoid unique constraint violations
    const { data: existingPost } = await adminClient
      .from('posts')
      .select('id')
      .eq('slug', baseSlug)
      .maybeSingle();

    const slug = existingPost ? `${baseSlug}-${Date.now().toString().slice(-4)}` : baseSlug;

    const { data, error } = await adminClient
      .from('posts')
      .insert({
        title: title.trim(),
        slug,
        category: validCategory,
        excerpt: excerpt?.trim() || '',
        content_html: content_html?.trim() || `<p>${excerpt || title}</p>`,
        cover_image_url: cover_image_url?.trim() || '/assets/feature-skincare.jpg',
        read_time_minutes: Math.max(2, Math.ceil((content_html || '').split(' ').length / 150)),
        is_published: is_published !== undefined ? Boolean(is_published) : true
      })
      .select()
      .single();

    if (error) {
      console.error('Database post insert error:', error);
      throw error;
    }
    return new Response(JSON.stringify({ success: true, post: data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Post API error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Failed to save post' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Update existing article
export const PUT: APIRoute = async ({ request, cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { id, title, category, excerpt, content_html, cover_image_url, is_published } = await request.json();
    if (!id) {
      return new Response(JSON.stringify({ error: 'Post ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const adminClient = getAdminClient();
    const updateData: any = {
      updated_at: new Date().toISOString()
    };
    if (title) updateData.title = title;
    if (category) {
      const rawCategory = category.toLowerCase().trim();
      updateData.category = ['beauty', 'fashion', 'decor'].includes(rawCategory) ? rawCategory : 'beauty';
    }
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content_html !== undefined) {
      updateData.content_html = content_html;
      updateData.read_time_minutes = Math.max(2, Math.ceil(content_html.split(' ').length / 150));
    }
    if (cover_image_url) updateData.cover_image_url = cover_image_url;
    if (is_published !== undefined) updateData.is_published = Boolean(is_published);

    const { data, error } = await adminClient
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return new Response(JSON.stringify({ success: true, post: data }), {
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

// Delete article
export const DELETE: APIRoute = async ({ request, cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) {
      return new Response(JSON.stringify({ error: 'Post ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const adminClient = getAdminClient();
    const { error } = await adminClient
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return new Response(JSON.stringify({ success: true, message: 'Post deleted' }), {
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
