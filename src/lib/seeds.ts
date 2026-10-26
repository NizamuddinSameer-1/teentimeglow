import type { Post, Ranking, Wallpaper, StoryMemeQuote, CommunityCreation } from '@/types/database';

/**
 * Demo content — intentionally empty.
 *
 * These arrays used to hold sample articles, wallpapers, quotes, rankings and
 * community posts that shipped with the template. They were removed on
 * 2026-10-26 so the site can start from a genuinely clean slate.
 *
 * ⚠️ Do not repopulate these. The whole point of the seed pattern was to stop
 * the site looking broken when Supabase is empty — but it also meant deleting
 * content in the database appeared to do nothing, because the demo rows came
 * straight back from code. Empty states are handled in the UI now.
 *
 * If you ever want a local preview with sample data, put it in a separate
 * fixture file that is never imported by production code.
 */

export const fallbackPosts: Post[] = [];

export const fallbackRankings: Ranking[] = [];

export const fallbackQuotes: StoryMemeQuote[] = [];

export const fallbackWallpapers: Wallpaper[] = [];

export const fallbackCommunity: CommunityCreation[] = [];
