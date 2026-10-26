import { supabase } from '@/lib/supabase';
import {
  fallbackPosts,
  fallbackRankings,
  fallbackQuotes,
  fallbackWallpapers,
  fallbackCommunity
} from '@/lib/seeds';
import type { Post, Ranking, Wallpaper, StoryMemeQuote, CommunityCreation, Quiz, QuizQuestion, QuizOutcome } from '@/types/database';

/**
 * Published articles for the public site.
 *
 * IMPORTANT: this merges database posts with the bundled seed articles instead
 * of replacing one with the other. The previous logic was:
 *
 *     if (data.length === 0) return fallbackPosts;  // else return data
 *
 * which meant that the moment a single row was inserted into Supabase, all six
 * seed articles disappeared from /edits, from internal links and from the
 * sitemap — while `getPostBySlug` kept serving them with a 200 because it falls
 * back per-slug. The result was five live, indexable, completely orphaned URLs.
 * Merging keeps every reachable article discoverable. Database rows win on slug
 * collisions so editorial edits always take precedence over seed copy.
 */
export async function getPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    const dbPosts = (!error && data ? data : []) as Post[];

    if (dbPosts.length === 0) {
      return fallbackPosts;
    }

    const dbSlugs = new Set(dbPosts.map((p) => p.slug));
    const seedOnly = fallbackPosts.filter((p) => !dbSlugs.has(p.slug));

    return [...dbPosts, ...seedOnly];
  } catch (err) {
    console.warn('Supabase fetch posts error, using fallback:', err);
    return fallbackPosts;
  }
}

export async function getRankings(): Promise<Ranking[]> {
  try {
    const { data, error } = await supabase
      .from('rankings')
      .select('*')
      .order('rank_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackRankings;
    }
    return data as Ranking[];
  } catch (err) {
    console.warn('Supabase fetch rankings error, using fallback:', err);
    return fallbackRankings;
  }
}

/**
 * Published mindset quotes.
 *
 * The live table currently contains three identical rows for the same quote
 * ("Not every opportunity deserves a yes…"), which rendered the same card three
 * times in the archive. Duplicates are collapsed here rather than deleted from
 * the database, so nothing is lost if they turn out to be intentional variants.
 */
export async function getQuotes(): Promise<StoryMemeQuote[]> {
  try {
    const { data, error } = await supabase
      .from('stories_memes_quotes')
      .select('*')
      .order('created_at', { ascending: false });

    const rows = (!error && data && data.length > 0 ? data : fallbackQuotes) as StoryMemeQuote[];

    const seen = new Set<string>();
    return rows.filter((q) => {
      const key = (q.content_text || '').toLowerCase().replace(/\s+/g, ' ').trim();
      if (!key) return false;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  } catch (err) {
    console.warn('Supabase fetch quotes error, using fallback:', err);
    return fallbackQuotes;
  }
}

export async function getWallpapers(): Promise<Wallpaper[]> {
  try {
    const { data, error } = await supabase
      .from('wallpapers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackWallpapers;
    }
    return data as Wallpaper[];
  } catch (err) {
    console.warn('Supabase fetch wallpapers error, using fallback:', err);
    return fallbackWallpapers;
  }
}

export async function getCommunityCreations(): Promise<CommunityCreation[]> {
  try {
    const { data, error } = await supabase
      .from('community_creations')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackCommunity;
    }
    return data as CommunityCreation[];
  } catch (err) {
    console.warn('Supabase fetch community error, using fallback:', err);
    return fallbackCommunity;
  }
}

export async function getActiveQuiz(): Promise<{
  quiz: Quiz | null;
  questions: QuizQuestion[];
  outcomes: QuizOutcome[];
}> {
  try {
    const { data: quizData } = await supabase
      .from('quizzes')
      .select('*')
      .eq('is_active', true)
      .limit(1)
      .single();

    if (!quizData) {
      return { quiz: null, questions: [], outcomes: [] };
    }

    const { data: questions } = await supabase
      .from('quiz_questions')
      .select('*, options:quiz_options(*)')
      .eq('quiz_id', quizData.id)
      .order('question_order', { ascending: true });

    const { data: outcomes } = await supabase
      .from('quiz_outcomes')
      .select('*')
      .eq('quiz_id', quizData.id);

    return {
      quiz: quizData as Quiz,
      questions: (questions || []) as QuizQuestion[],
      outcomes: (outcomes || []) as QuizOutcome[]
    };
  } catch (err) {
    console.warn('Supabase fetch quiz error:', err);
    return { quiz: null, questions: [], outcomes: [] };
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();

    if (error || !data) {
      const fallback = fallbackPosts.find(p => p.slug === slug);
      return fallback || null;
    }
    return data as Post;
  } catch (err) {
    console.warn(`Supabase fetch post by slug [${slug}] error, using fallback:`, err);
    const fallback = fallbackPosts.find(p => p.slug === slug);
    return fallback || null;
  }
}

export async function getSiteSettings(): Promise<any | null> {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', 'homepage_copy')
      .single();

    if (!error && data?.value) {
      return data.value;
    }
  } catch (err) {
    // Return null to use default siteContent
  }
  return null;
}

export async function getAllQuizzes(): Promise<Quiz[]> {
  try {
    const { data, error } = await supabase
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

    if (error || !data) {
      return [];
    }
    return data as Quiz[];
  } catch (err) {
    console.warn('Supabase fetch all quizzes error:', err);
    return [];
  }
}

export async function getAllPostsAdmin(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackPosts;
    }
    return data as Post[];
  } catch (err) {
    console.warn('Supabase fetch all admin posts error, using fallback:', err);
    return fallbackPosts;
  }
}


