export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Post {
  id: string;
  title: string;
  slug: string;
  category: 'beauty' | 'fashion' | 'decor';
  cover_image_url: string;
  excerpt: string;
  content_html: string;
  read_time_minutes: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Ranking {
  id: string;
  category: 'prime_video' | 'audiobook';
  title: string;
  cover_image_url: string;
  rating: number;
  tags: string[];
  review_text: string;
  watch_url?: string | null;
  rank_order: number;
  created_at: string;
}

export interface Quiz {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover_image_url: string;
  is_active: boolean;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_order: number;
  created_at: string;
  options?: QuizOption[];
}

export interface QuizOption {
  id: string;
  question_id: string;
  option_text: string;
  outcome_key: string;
  created_at: string;
}

export interface QuizOutcome {
  id: string;
  quiz_id: string;
  outcome_key: string;
  title: string;
  description: string;
  badge_label?: string | null;
  image_url?: string | null;
  created_at: string;
}

export interface CommunityCreation {
  id: string;
  author_name: string;
  author_social?: string | null;
  category: 'nails' | 'diy' | 'sketch' | 'decor' | 'fashion' | string;
  image_url: string;
  caption?: string | null;
  status: 'pending' | 'approved' | 'rejected';
  likes_count: number;
  created_at: string;
}

export interface StoryMemeQuote {
  id: string;
  type: 'quote' | 'story' | 'meme';
  content_text?: string | null;
  image_url?: string | null;
  author: string;
  likes_count: number;
  created_at: string;
}

export interface Wallpaper {
  id: string;
  title: string;
  device_type: 'mobile' | 'desktop';
  thumbnail_url: string;
  download_url: string;
  resolution_label: string;
  download_count: number;
  created_at: string;
}
