# Plan 15-01: Backend API & Data Layer for Quizzes & Posts Draft Status — Summary

**Executed:** 2026-10-21  
**Status:** Complete  
**Commits:** 3 atomic commits (`90ad493`, `d149c9e`, `2ba835c`)

## What Was Built
1. **Database Schema Types (`src/types/database.ts`)**:
   - Extended `QuizOption` to support optional answer photo uploads (`image_url`) and explicit ordering (`option_order`).
   - Extended `QuizQuestion` to support indicator pills (`indicator`) and question photos (`image_url`).
   - Extended `Quiz` to support relations `questions` and `outcomes`.

2. **Articles Draft & Published API (`src/pages/api/admin/posts.ts`)**:
   - `POST` and `PUT` endpoints now extract and persist `is_published` boolean status.
   - Allows Rini to save in-progress drafts without publishing them to the public catalog.

3. **Admin Quizzes API Route (`src/pages/api/admin/quizzes.ts`)**:
   - `GET /api/admin/quizzes`: Returns all quizzes with nested questions, options, and outcomes.
   - `POST /api/admin/quizzes`: Handles creation and updates with nested question insertion, dynamic options, archetype outcome mapping, slug deduplication, and active quiz state toggling.
   - `DELETE /api/admin/quizzes`: Safely cascades deletion of quiz options, questions, outcomes, and main quiz record.
   - Protected with admin session authentication (`ttg_admin_session`).

4. **Public & Admin API Fetchers (`src/lib/api.ts`)**:
   - Added `getAllQuizzes()` returning all quizzes with nested questions and options.
   - Added `getAllPostsAdmin()` returning both published and draft posts for administrative review.

## Files Created/Modified
| File | Action | Description |
|------|--------|-------------|
| `src/types/database.ts` | Modified | Added indicator, photo, and relation fields to Quiz interfaces |
| `src/pages/api/admin/posts.ts` | Modified | Added `is_published` draft handling to POST and PUT handlers |
| `src/pages/api/admin/quizzes.ts` | Created | Admin CRUD API endpoint for quizzes with questions/options |
| `src/lib/api.ts` | Modified | Exported `getAllQuizzes` and `getAllPostsAdmin` with fallbacks |

## Verification Results
- [x] TypeScript compilation check — passed (`npm run build`, 0 errors)
- [x] Serverless routes build verification — passed (Astro server entry bundled in 7.91s)
- [x] Client modules bundling — passed (30 modules transformed, 0 errors)

## Notable Decisions
- In `src/pages/api/admin/quizzes.ts`, activating a quiz automatically deactivates other quizzes to preserve the single primary quiz UX on `/quiz`.
- Question updates safely clean previous options before re-inserting to prevent orphaned option records.

## Issues Encountered
- None.

---
*Executed: 2026-10-21*
