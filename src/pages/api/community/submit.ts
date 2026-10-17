import type { APIRoute } from 'astro';
import { getAdminClient } from '@/lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const supabase = getAdminClient();
  try {
    const contentType = request.headers.get('content-type') || '';
    let authorName = '';
    let caption = '';
    let category = 'nails';
    let imageUrl = '/assets/gallery-nails.jpg';

    if (contentType.includes('application/json')) {
      const body = await request.json();
      authorName = String(body.author_name || '').trim();
      caption = String(body.caption || body.title || '').trim();
      category = String(body.category || 'nails').toLowerCase();
      if (body.image_url) imageUrl = String(body.image_url);
    } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      authorName = String(formData.get('name') || '').trim();
      caption = String(formData.get('title') || '').trim();
      category = String(formData.get('category') || 'nails').toLowerCase();
      
      const file = formData.get('file');
      if (file && typeof file === 'object' && 'name' in file && file.size > 0) {
        // Upload file to Supabase Storage if bucket exists, or save file info
        const fileExt = file.name.split('.').pop() || 'jpg';
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const { data: uploadData, error: uploadErr } = await supabase.storage
          .from('community-pending')
          .upload(fileName, file, { contentType: file.type || 'image/jpeg', upsert: true });

        if (!uploadErr && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from('community-pending')
            .getPublicUrl(fileName);
          imageUrl = publicUrlData.publicUrl;
        }
      }
    }

    if (!authorName) {
      return new Response(JSON.stringify({ error: 'Author name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Sanitize category to valid enum
    const validCategories = ['nails', 'diy', 'sketch', 'decor', 'fashion'];
    const safeCategory = validCategories.includes(category) ? category : 'nails';

    // Insert into community_creations in quarantine (status: pending)
    const { data, error } = await supabase
      .from('community_creations')
      .insert({
        author_name: authorName,
        author_social: authorName.startsWith('@') ? authorName : `@${authorName}`,
        category: safeCategory,
        image_url: imageUrl,
        caption: caption || 'Community creation',
        status: 'pending',
        likes_count: 0
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Creation submitted! Rini will review and approve it shortly.',
      data
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('API submission error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
