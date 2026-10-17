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

### Phase 4: Serverless API Endpoints & Community Uploads
* **Goal**: Implement serverless backend handlers for user interactions and content submissions.
* **Tasks**:
  1. Implement `POST /api/community/submit.ts` with file size/type validation and pending status.
  2. Implement `POST /api/community/like.ts` for like counters.
  3. Implement `POST /api/wallpapers/download.ts` for download analytics.
  4. Wire "Share Your Creation" modal form in `GallerySection.astro` to the endpoint.

### Phase 5: Rini's Zero-Code Admin Dashboard (`/admin`)
* **Goal**: Provide Rini with a private, zero-code moderation and publishing cockpit.
* **Tasks**:
  1. Create `src/pages/admin/login.astro` with Supabase passwordless / email-password auth.
  2. Create `src/pages/admin/index.astro` dashboard with tabs:
     - **Moderation Inbox**: View pending community submissions with 1-tap "Approve" / "Reject".
     - **Quick Publisher**: Form to publish new edits, rankings, or wallpapers without touching code.
  3. Implement `POST /api/admin/moderate.ts` (protected by admin session).

### Phase 6: Verification, Security Audit & Build Quality
* **Goal**: Verify production readiness, security compliance, and zero build warnings.
* **Tasks**:
  1. Run `npm run build` and ensure zero errors.
  2. Verify all links, images, fonts, and interactive scripts.
  3. Run security check (RLS adherence, XSS protection, rate limiting).
  4. Validate Lighthouse performance metrics and SEO tags.
