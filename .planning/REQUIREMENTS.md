# Requirements: TeenTimeGlow Astro & Backend Migration

## v1 Requirements (Core Scope — In-Flight)

### 1. Astro Scaffolding & Component Modularization
- [ ] Initialize Astro project structure (`src/components/`, `src/layouts/`, `src/pages/`, `src/lib/`, `src/styles/`) without breaking existing static assets.
- [ ] Extract global CSS tokens, typography, and reset styles from `index.html` into `src/styles/global.css`.
- [ ] Build reusable UI components:
  - `src/layouts/BaseLayout.astro` (Head, SEO meta, OpenGraph, JSON-LD schemas)
  - `src/components/Navbar.astro` (Two-tone brand mark, search capsule, sound toggle, moodboard pill, Quiz CTA)
  - `src/components/Hero.astro` (Creator badge, title, subtitle, model banner, trust chips)
  - `src/components/StatsStrip.astro` (Monthly readers, curated guides, wallpaper downloads, glow vibes)
  - `src/components/EditsSection.astro` (Beauty, Fashion, Decor tabs with category filters)
  - `src/components/RankingsSection.astro` (Prime Video & Book ranking cards, review score badges)
  - `src/components/QuotesSection.astro` (Daily mindset quotes, copy/share quote card)
  - `src/components/WallpapersSection.astro` (Mobile/desktop 4K grids, direct download triggers)
  - `src/components/QuizSection.astro` (Interactive 5-question personality engine + outcome modal)
  - `src/components/GallerySection.astro` (Community creations, like counter, "Share Your Creation" modal)
  - `src/components/Footer.astro` (Brand columns, newsletter signup, copyright)
  - `src/components/AmbientFX.astro` (Pink hearts cursor trail, morphing blobs, cursor glow)
  - `src/components/Preloader.astro` (0% to 100% counter with smooth exit transition)
  - `src/components/AudioPlayer.astro` (Web Audio ASMR ambient background player)

### 2. Backend & Supabase Integration Layer
- [ ] Supabase client configuration in `src/lib/supabase.ts` (public client + admin service-role client).
- [ ] TypeScript interfaces in `src/types/database.ts` matching the 9 tables in `brain/backend.md`.
- [ ] Fallback static datasets for all 6 content types so the site runs gracefully if Supabase connection drops.
- [ ] Migration documentation and `.env.example` setup for user.

### 3. Serverless API Endpoints (`/api/*`)
- [ ] `POST /api/community/submit`: Secure multipart image upload and insert with `status = 'pending'`.
- [ ] `POST /api/community/like`: Increment likes on a community creation or quote.
- [ ] `POST /api/wallpapers/download`: Increment wallpaper download counter.

### 4. Zero-Code Visual Admin Dashboard (`/admin`)
- [ ] Secure login gate with Supabase Auth for Rini.
- [ ] Moderation inbox: View quarantined pending user submissions with 1-tap "Approve" / "Reject".
- [ ] Quick Publishing: Add a new post, wallpaper, or ranking without writing code.

---

## v2 Requirements (Post-Launch Enhancements)
- Multi-image moodboards in Community Creations.
- Social login (Google / Apple) for visitors to bookmark favorites.
- Automated email digests for weekly glow updates.

---

## Out of Scope (Explicitly Excluded)
- Complex e-commerce / payment checkout (the site is 100% free / editorial).
- User commenting threads / forums (moderation overhead).
- Third-party tracking scripts that degrade performance below 90 Lighthouse score.

---

## Non-Functional Requirements
- **Performance**: Lighthouse score >= 90 across Mobile & Desktop.
- **Visual Fidelity**: 100% visual parity with current `index.html` design aesthetics.
- **Security**: Strict RLS policies, DOMPurify sanitization, and upload mime-type verification.
- **Reliability**: 0kb broken image tolerance, instant fallback to static seeds.
