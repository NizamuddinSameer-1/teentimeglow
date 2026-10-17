# Roadmap: TeenTimeGlow Astro & Backend Migration

## Overview of Phases

```
┌────────────────────────────────────────────────────────┐
│ Phase 1: Astro Scaffolding & Build Pipeline           │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ Phase 2: Modular Frontend Components & Design Parity   │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ Phase 3: Supabase Database Layer & Fallback Seeds      │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ Phase 4: Serverless API Endpoints & Community Uploads  │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ Phase 5: Rini's Zero-Code Admin Dashboard (/admin)     │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ Phase 6: Verification, Security Audit & Build Quality  │
└────────────────────────────────────────────────────────┘
```

---

### Phase 1: Astro Scaffolding & Build Pipeline
* **Goal**: Establish clean Astro TypeScript environment with `@astrojs/vercel` adapter while preserving all existing files and assets.
* **Tasks**:
  1. Initialize `package.json` with Astro 5, TypeScript, `@astrojs/vercel`, `@supabase/supabase-js`.
  2. Setup `astro.config.mjs` (output: 'server' / hybrid with Vercel adapter).
  3. Setup `tsconfig.json` with strict type checking.
  4. Move assets to `public/` directory (or configure Vite public asset handling).
  5. Setup `.env.example` with Supabase configuration variables.
  6. Verify `npm run dev` and `npm run build`.

### Phase 2: Modular Frontend Components & Design Parity
* **Goal**: Refactor `index.html` (4,500 lines) into modular, single-responsibility Astro components with zero visual degradation.
* **Tasks**:
  1. Extract `src/styles/global.css` with color tokens, font imports, and reset rules.
  2. Create `BaseLayout.astro` with complete SEO metadata and structured JSON-LD schemas.
  3. Build `Navbar.astro`, `Hero.astro`, and `StatsStrip.astro`.
  4. Build `EditsSection.astro`, `RankingsSection.astro`, and `QuotesSection.astro`.
  5. Build `WallpapersSection.astro` and `QuizSection.astro`.
  6. Build `GallerySection.astro` and `Footer.astro`.
  7. Build interactive scripts: `AmbientFX.astro` (pink hearts trail), `Preloader.astro`, and `AudioPlayer.astro`.
  8. Assemble `src/pages/index.astro` and verify 100% visual parity.

### Phase 3: Supabase Database Layer & Fallback Seeds
* **Goal**: Implement type-safe Supabase client with seamless offline fallback seeds.
* **Tasks**:
  1. Define database interfaces in `src/types/database.ts`.
  2. Implement Supabase client helper in `src/lib/supabase.ts`.
  3. Create default seed datasets in `src/lib/seeds.ts` for all 6 content categories.
  4. Create content fetchers (`getPosts()`, `getRankings()`, `getWallpapers()`, `getQuizzes()`, `getQuotes()`, `getCommunity()`).
  5. Bind components to the data layer.

### Phase 4: Serverless API Endpoints & Community Uploads [x] (Completed: 2026-10-17)
* **Goal**: Implement serverless backend handlers for user interactions and content submissions.
* **Tasks**:
  1. [x] Implement `POST /api/community/submit.ts` with file size/type validation, Supabase Storage uploads, and quarantine pending status.
  2. [x] Implement `POST /api/community/like.ts` for atomic like counters.
  3. [x] Implement `POST /api/wallpapers/download.ts` for download analytics.
  4. [x] Wire "Share Your Creation" modal form in `GallerySection.astro` and wallpapers download tracking to endpoints.

### Phase 5: Rini's Zero-Code Admin Dashboard (`/admin`) [x] (Completed: 2026-10-17)
* **Goal**: Provide Rini with a private, zero-code moderation and publishing cockpit.
* **Tasks**:
  1. [x] Create `src/pages/admin/login.astro` and session API routes with passkey and cookie protection.
  2. [x] Create and protect `src/pages/admin/index.astro` dashboard with tabs:
     - **Moderation Inbox**: View pending community submissions with 1-tap "Approve" / "Reject".
     - **Quick Publisher**: Multi-category form to publish edits, wallpapers, or quotes without touching code.
  3. [x] Implement `POST /api/admin/moderate.ts` (protected by admin session).

### Phase 6: Verification, Security Audit & Build Quality [x] (Completed: 2026-10-17)
* **Goal**: Verify production readiness, security compliance, and zero build warnings.
* **Tasks**:
  1. [x] Run `npm run build` and ensure zero errors (completed in 27.36s).
  2. [x] Verify all links, images, fonts, and interactive scripts (`public/scripts/main.js` and all 24 assets in `public/assets`).
  3. [x] Run security check (hardened admin endpoints, session authentication required, RLS adherence).
  4. [x] Validate Lighthouse performance metrics and SEO tags (title, meta description, OpenGraph).

---

## Milestone 2: Dedicated Standalone Pages

### Phase 7: Dedicated 4K Wallpaper Vault (`/wallpapers`)
* **Goal**: Build an immersive standalone wallpapers catalog with device filters (Mobile vs Desktop), tag search, resolution badges, preview modal, and instant download counter.
* **Tasks**:
  1. Create `src/pages/wallpapers/index.astro` using `BaseLayout.astro`.
  2. Include hero header with aesthetic badge, stats counter, and device filter pills (All, Mobile, Desktop).
  3. Connect to `getWallpapers()` from Supabase with instant fallback to `fallbackWallpapers`.
  4. Build full-screen modal preview and direct 1-tap download trigger wiring `/api/wallpapers/download`.
  5. Verify responsive layout, zero CLS, and clean metadata.

### Phase 8: Daily Mindset & Quotes Hub (`/quotes`)
* **Goal**: Build a dedicated inspirational mindset page with quote generator, category filters, aesthetic shareable cards, and 1-tap clipboard copying.
* **Tasks**:
  1. Create `src/pages/quotes/index.astro`.
  2. Implement interactive "Vibe of the Day" shuffle card with audio chime feedback.
  3. Display curated quote archive with topic badges (Mindset, Glow, Cozy, Ambition).
  4. Implement "Copy Quote" and "Share Card" functionality with visual toast confirmation.
  5. Connect to `getQuotes()` with seed fallbacks.

### Phase 9: Curated Leaderboard (`/rankings`)
* **Goal**: Build a dedicated reviews and ranking board for Prime Video shows and Audiobooks.
* **Tasks**:
  1. Create `src/pages/rankings/index.astro`.
  2. Add category switchers: "Prime Video Binge" vs "Addictive Audiobooks".
  3. Display rank medals (#1 Golden Hour Pick, #2, etc.), star ratings, genre tags, and deep-dive editorial reviews.
  4. Add external streaming/listen links with security rel="noopener noreferrer".
  5. Connect to `getRankings()` with seed fallbacks.

### Phase 10: Editorial Magazine & Full Article Reader (`/edits` & `/edits/[slug]`)
* **Goal**: Build a dedicated magazine lookbook catalog (`/edits`) and dynamic individual article reader (`/edits/[slug]`).
* **Tasks**:
  1. Create `src/pages/edits/index.astro` with featured cover story hero and category filters (Skincare, Fashion, Decor).
  2. Create dynamic route `src/pages/edits/[slug].astro` for full-text articles with table of contents, author profile (Rini), estimated read time, and high-res imagery.
  3. Add `getPostBySlug(slug)` helper in `src/lib/api.ts` with resilient seed matching.
  4. Include "Related Edits" carousel and social share actions.

### Phase 11: Dedicated Glow Quiz & Community Hub (`/quiz` & `/gallery`)
* **Goal**: Build dedicated standalone pages for the interactive Quiz (`/quiz`) and Community Showcase (`/gallery`).
* **Tasks**:
  1. Create `src/pages/quiz/index.astro` with a full-viewport dedicated QuizPlayer island, ambient glow, and outcome card generator.
  2. Create `src/pages/gallery/index.astro` with masonry showcase grid, category tabs (Nails, DIY, Sketch, Room Decor), live like increments (`/api/community/like`), and prominent "Upload Creation" floating button.
  3. Mount `CommunitySubmitModal.tsx` on `/gallery`.

### Phase 12: Unified Navigation, Global Links & Production Verification
* **Goal**: Update global navigation, links across all components, and run full test & build verification.
* **Tasks**:
  1. Update `Navbar.astro` to handle cross-page routing intelligently (linking to `/wallpapers`, `/quotes`, `/rankings`, `/edits`, `/quiz`, `/gallery` from any page).
  2. Add breadcrumb navigation and "← Back to Home" pills on subpages.
  3. Run `npm run build` and ensure 0 errors across all routes.
  4. Perform visual checks in the browser to ensure pixel-perfect design parity.

