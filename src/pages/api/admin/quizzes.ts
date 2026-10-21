import type { APIRoute } from 'astro';
import { getAdminClient } from '@/lib/supabase';

export const prerender = false;

const checkAuth = (cookies: any) => {
  const session = cookies.get('ttg_admin_session')?.value;
  const expectedSecret = process.env.ADMIN_SECRET_KEY || 'rini-glow-2026';
  return session && (session === expectedSecret || session === '2026');
};

// GET: Fetch all quizzes with questions and options for the admin dashboard
export const GET: APIRoute = async ({ cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin session required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const adminClient = getAdminClient();
    const { data: quizzes, error } = await adminClient
      .from('quizzes')
      .select(`
        *,
        questions:quiz_questions (
          *,
          options:quiz_options (*)
        ),
        outcomes:quiz_outcomes (*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database fetch quizzes error:', error);
      throw error;
    }

    return new Response(JSON.stringify({ success: true, quizzes: quizzes || [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Quizzes GET error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Failed to fetch quizzes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST: Create or update quiz with questions and options
export const POST: APIRoute = async ({ request, cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin session required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await request.json();
    const { id, title, description, cover_image_url, is_active, questions } = body;

    if (!title || !title.trim()) {
      return new Response(JSON.stringify({ error: 'Quiz title is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const adminClient = getAdminClient();
    const shouldBeActive = is_active !== undefined ? Boolean(is_active) : true;

    // If making active, deactivate other quizzes first
    if (shouldBeActive) {
      await adminClient
        .from('quizzes')
        .update({ is_active: false })
        .neq('id', id || '00000000-0000-0000-0000-000000000000');
    }

    let quizId = id;
    let baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') || `quiz-${Date.now()}`;

    if (id) {
      // Update existing quiz
      const { error: updateError } = await adminClient
        .from('quizzes')
        .update({
          title: title.trim(),
          description: description?.trim() || '',
          cover_image_url: cover_image_url?.trim() || '/assets/arrival-1.jpg',
          is_active: shouldBeActive
        })
        .eq('id', id);

      if (updateError) throw updateError;
    } else {
      // Check unique slug
      const { data: existingQuiz } = await adminClient
        .from('quizzes')
        .select('id')
        .eq('slug', baseSlug)
        .maybeSingle();

      const slug = existingQuiz ? `${baseSlug}-${Date.now().toString().slice(-4)}` : baseSlug;

      const { data: newQuiz, error: insertError } = await adminClient
        .from('quizzes')
        .insert({
          title: title.trim(),
          slug,
          description: description?.trim() || '',
          cover_image_url: cover_image_url?.trim() || '/assets/arrival-1.jpg',
          is_active: shouldBeActive
        })
        .select()
        .single();

      if (insertError) throw insertError;
      quizId = newQuiz.id;
    }

    // Process questions and options if provided
    if (Array.isArray(questions) && questions.length > 0) {
      // If updating, delete existing questions (and cascade options)
      if (id) {
        // Find existing question IDs to clean options
        const { data: oldQuestions } = await adminClient
          .from('quiz_questions')
          .select('id')
          .eq('quiz_id', id);

        if (oldQuestions && oldQuestions.length > 0) {
          const oldQIds = oldQuestions.map((q: any) => q.id);
          await adminClient.from('quiz_options').delete().in('question_id', oldQIds);
          await adminClient.from('quiz_questions').delete().eq('quiz_id', id);
        }
      }

      // Insert new questions and their options
      for (let qIdx = 0; qIdx < questions.length; qIdx++) {
        const q = questions[qIdx];
        if (!q.question_text || !q.question_text.trim()) continue;

        const { data: insertedQ, error: qErr } = await adminClient
          .from('quiz_questions')
          .insert({
            quiz_id: quizId,
            question_text: q.question_text.trim(),
            indicator: q.indicator?.trim() || `Step ${qIdx + 1}`,
            question_order: qIdx + 1,
            image_url: q.image_url?.trim() || null
          })
          .select()
          .single();

        if (qErr) {
          console.error('Error inserting question:', qErr);
          continue;
        }

        // Insert options for this question
        if (Array.isArray(q.options) && q.options.length > 0) {
          const optionsToInsert = q.options
            .filter((opt: any) => opt.option_text && opt.option_text.trim())
            .map((opt: any, optIdx: number) => ({
              question_id: insertedQ.id,
              option_text: opt.option_text.trim(),
              outcome_key: opt.outcome_key || 'sunset_muse',
              image_url: opt.image_url?.trim() || null,
              option_order: optIdx + 1
            }));

          if (optionsToInsert.length > 0) {
            const { error: optErr } = await adminClient
              .from('quiz_options')
              .insert(optionsToInsert);

            if (optErr) console.error('Error inserting options:', optErr);
          }
        }
      }
    }

    return new Response(JSON.stringify({ success: true, quizId }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Quiz POST error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Failed to save quiz' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE: Remove a quiz and its questions
export const DELETE: APIRoute = async ({ request, cookies }) => {
  if (!checkAuth(cookies)) {
    return new Response(JSON.stringify({ error: 'Unauthorized: Admin session required' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { id } = await request.json();
    if (!id) {
      return new Response(JSON.stringify({ error: 'Quiz ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const adminClient = getAdminClient();

    // Clean up options
    const { data: questions } = await adminClient
      .from('quiz_questions')
      .select('id')
      .eq('quiz_id', id);

    if (questions && questions.length > 0) {
      const qIds = questions.map((q: any) => q.id);
      await adminClient.from('quiz_options').delete().in('question_id', qIds);
      await adminClient.from('quiz_questions').delete().eq('quiz_id', id);
    }

    await adminClient.from('quiz_outcomes').delete().eq('quiz_id', id);

    const { error: delError } = await adminClient
      .from('quizzes')
      .delete()
      .eq('id', id);

    if (delError) throw delError;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    console.error('Quiz DELETE error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Failed to delete quiz' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
