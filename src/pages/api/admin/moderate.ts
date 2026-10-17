import type { APIRoute } from 'astro';
import { getAdminClient } from '@/lib/supabase';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { id, action } = await request.json();

    if (!id || !action || !['approved', 'rejected', 'delete'].includes(action)) {
      return new Response(JSON.stringify({ error: 'Valid id and action are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const adminClient = getAdminClient();

    if (action === 'delete') {
      const { error } = await adminClient
        .from('community_creations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return new Response(JSON.stringify({ success: true, message: 'Deleted successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { data, error } = await adminClient
      .from('community_creations')
      .update({ status: action })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify({
      success: true,
      message: `Creation marked as ${action}!`,
      data
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Admin moderation error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
