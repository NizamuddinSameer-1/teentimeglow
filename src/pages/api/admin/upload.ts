import type { APIRoute } from 'astro';
import { getAdminClient } from '@/lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const adminSession = cookies.get('ttg_admin_session')?.value;
  const expectedSecret = process.env.ADMIN_SECRET_KEY || 'rini-glow-2026';

  if (!adminSession || adminSession !== expectedSecret) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin session required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file !== 'object' || !('arrayBuffer' in file)) {
      return new Response(JSON.stringify({ error: 'No valid image file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const typedFile = file as File;
    if (typedFile.size === 0) {
      return new Response(JSON.stringify({ error: 'Uploaded file is empty' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const fileExt = typedFile.name.split('.').pop()?.toLowerCase() || 'jpg';
    const cleanFileName = `admin-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const supabase = getAdminClient();

    // Convert to ArrayBuffer / Buffer for reliable upload
    const arrayBuffer = await typedFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Try uploading to Supabase Storage bucket
    const { data: uploadData, error: uploadErr } = await supabase.storage
      .from('community-pending')
      .upload(cleanFileName, buffer, {
        contentType: typedFile.type || 'image/jpeg',
        upsert: true
      });

    if (!uploadErr && uploadData) {
      const { data: publicUrlData } = supabase.storage
        .from('community-pending')
        .getPublicUrl(cleanFileName);

      return new Response(JSON.stringify({
        success: true,
        url: publicUrlData.publicUrl,
        filename: typedFile.name
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fallback: If Supabase Storage bucket is not provisioned or fails, return an inline Data URL so Rini is never blocked
    console.warn('Supabase storage upload fallback triggered:', uploadErr);
    const mime = typedFile.type || 'image/jpeg';
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${mime};base64,${base64}`;

    return new Response(JSON.stringify({
      success: true,
      url: dataUrl,
      filename: typedFile.name
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Admin upload error:', err);
    return new Response(JSON.stringify({ error: err.message || 'File upload failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
