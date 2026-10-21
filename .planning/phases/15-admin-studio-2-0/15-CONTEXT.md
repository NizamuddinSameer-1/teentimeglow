# Phase 15: Admin Studio 2.0 (Quiz Builder, Advanced Article Rich Editor & Affiliate Links) - Context

**Gathered:** 2026-10-21  
**Status:** Ready for planning

## Phase Boundary
Deliver Admin Studio 2.0 at `/admin`, introducing:
1. Dynamic Interactive Quiz Builder (multi-question creation with add/remove dynamic options, photo uploads, archetype points assignment, and CRUD management).
2. Advanced Article Rich-Text Editor customizer with rock-solid in-between image uploads (preserving cursor position), affiliate hyperlink insertion dialog (`target="_blank"`, `rel="sponsored noopener"`), text alignment (left, center), and divider formatting.
3. Content Publishing Enhancements: Draft vs Published status toggle, Live Preview modal before publishing, and full Quiz management (Edit & Delete existing quizzes).

## Implementation Decisions

### 1. Interactive Quiz Builder Tab in Admin Studio
- **DECIDED:** Full dynamic builder: Add multiple questions per quiz, add/remove dynamic options (Option 1, Option 2, Option 3, Option 4, etc.) per question.
- **DECIDED:** Assign archetype/outcome points for each option (e.g., Clean Girl, Cozy Cottagecore, Sunset Muse) so user selections dynamically calculate quiz outcomes.
- **DECIDED:** Support uploading photos directly into quiz questions or answer options.
- **DECIDED:** Include full Edit & Delete management for all existing quizzes stored in Supabase with resilient fallbacks.

### 2. Article Rich-Text Editor Customization & Fixes (`RichTextEditor.astro`)
- **DECIDED:** Affiliate Hyperlink Dialog: Clean modal/prompt to enter link URL and display anchor text, automatically injecting `target="_blank"` and `rel="sponsored noopener"` for monetization links.
- **DECIDED:** Rock-solid in-between image insertion: Store exact caret/cursor selection before file dialog opens, upload to `/api/admin/upload`, and insert the image at the saved range with responsive styling and optional caption without resetting editor focus or clearing listeners.
- **DECIDED:** Formatting tools: Text alignment (left, center) and horizontal divider line formatting (`<hr class="editorial-divider">`) to structure longform lifestyle stories.

### 3. Publishing Workflow & Content Management
- **DECIDED:** Draft vs Published status toggle for both articles and quizzes, allowing Rini to save work-in-progress drafts.
- **DECIDED:** Live preview modal to see exact pixel-perfect rendering of the article lookbook or quiz card before publishing live to the public site.

## Specific Ideas & User Quotes
- *"when posting an qwuiz there is no options there like opton 1 or 2 adding while maing the quize"*
- *"while creating the articles there same not much customisation like adding image in btw the text yes there is an option there but thta was not working"*
- *"alos there is no hyperlink option there so i can add my affillate link in articles and etc"*
- *"an there iss many things othes remaing yaar"*

## Technical Architecture Notes
- Backend API endpoints required:
  - `POST /api/admin/quizzes` (Create & Update quizzes with nested JSON questions, options, and outcomes)
  - `DELETE /api/admin/quizzes` (Delete quiz by ID)
  - Updated `src/types/database.ts` ensuring Quiz, QuizQuestion, and QuizOption interfaces align with the admin payload.
  - Enhanced `RichTextEditor.astro` with range selection preservation (`window.getSelection()`, `range.cloneRange()`, and range insertion).

---
*Phase: 15-admin-studio-2-0*  
*Context gathered: 2026-10-21*
