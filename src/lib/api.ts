import { supabase } from '@/lib/supabase';
import {
  fallbackPosts,
  fallbackRankings,
  fallbackQuotes,
  fallbackWallpapers,
  fallbackCommunity
} from '@/lib/seeds';
import type { Post, Ranking, Wallpaper, StoryMemeQuote, CommunityCreation, Quiz, QuizQuestion, QuizOutcome } from '@/types/database';

export async function getPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackPosts;
    }
    return data as Post[];
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

export async function getQuotes(): Promise<StoryMemeQuote[]> {
  try {
    const { data, error } = await supabase
      .from('stories_memes_quotes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return fallbackQuotes;
    }
    return data as StoryMemeQuote[];
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
