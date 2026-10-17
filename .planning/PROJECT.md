# Project Specification: TeenTimeGlow Astro & Backend Migration

## Executive Summary
Convert **TeenTimeGlow** (`teentimeglow.me`) from a monolithic static HTML file (`index.html`) into a production-grade, modular **Astro (Hybrid SSR/SSG)** application connected to a live **Supabase PostgreSQL** backend, **Cloudflare R2** media storage, and a visual **Zero-Code `/admin` Dashboard** for Rini.

## Architecture & Tech Stack
* **Framework**: Astro 5+ with `@astrojs/vercel` (Hybrid rendering: static pre-rendering for content, SSR for API routes & admin)
* **Language**: TypeScript (`strict: true`)
* **Styling**: Scoped CSS / Design System Tokens (`brain/designs.md`, `anti-ai-slop-frontend-playbook.md`)
* **Database**: Supabase PostgreSQL with 9 tables, Row-Level Security (RLS), and automated quarantine status (`brain/backend.md`)
* **Media Storage**: Cloudflare R2 / Supabase Storage with $0 egress fees
* **Security**: DOMPurify for user submissions, strict Content Security Policy, rate limiting on submission endpoints
* **Target Domain**: `https://teentimeglow.me` deployed via Vercel Edge

## Success Criteria
1. **Zero Regression**: Every single visual feature and interaction from `index.html` (Playfair display font, two-tone logo, floating capsule navbar, romantic pink hearts trail, preloader, ambient audio, hero showcase, glow stats) works identically in the Astro build.
2. **Modular Architecture**: Split the 4,500-line `index.html` into clean, reusable `.astro` components.
3. **Dynamic Data Hydration**: `#edits`, `#rankings`, `#quotes`, `#wallpapers`, and `#quiz` pull from Supabase tables with instant fallback to local curated data if offline.
4. **Interactive Community Gallery**: Visitors can submit creations to a `/api/community/submit` endpoint that stores in `status = 'pending'`.
5. **Visual Admin Panel (`/admin`)**: A clean, mobile-optimized admin interface for Rini to approve/reject submissions and add content.
6. **100% Type-Safe & Build-Clean**: `npm run build` passes with zero errors and no bundle bloat.
