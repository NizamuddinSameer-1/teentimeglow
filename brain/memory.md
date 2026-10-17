# Project Memory & Decision Log — TeenTimeGlow

**Last Updated:** 2026-10-17  
**Production Custom Domain:** [`https://teentimeglow.me`](https://teentimeglow.me) | [`https://www.teentimeglow.me`](https://www.teentimeglow.me)  
**Deployment Platform:** Vercel Global Edge Network  
**Current Phase:** Production Live & Polished  

---

## 1. Architectural Decision Records (ADRs)

### ADR-001: Framework Selection — Astro over Next.js & WordPress
* **Context:** The site must be 100% free, load in under 600ms, and serve high-resolution media without lag or broken images.
* **Decision:** Selected **Astro (Hybrid SSR/SSG)** with `@astrojs/vercel`.
* **Rationale:** WordPress requires paid PHP hosting, gets slow, and has high maintenance costs. Next.js includes heavier client-side runtime JS by default. Astro ships **0kb of JavaScript** by default for content pages (blog, rankings, wallpapers) while allowing interactive islands (quiz player, community upload form, admin dashboard) to hydrate dynamically.
* **Status:** Accepted.

### ADR-002: Database & Backend Engine — Supabase (PostgreSQL)
* **Context:** Need free, reliable database storage with built-in auth for Rini and strict security against malicious visitors.
* **Decision:** Selected **Supabase Free Tier**.
* **Rationale:** Offers 500MB PostgreSQL, built-in Row-Level Security (RLS), instant REST APIs, and authentication for up to 50,000 monthly active users at $0 cost.
* **Status:** Accepted.

### ADR-003: Media & Wallpaper Storage — Cloudflare R2 / Supabase Storage
* **Context:** The site provides 4K mobile/desktop wallpaper downloads and high-res blog lookbook imagery. Most cloud providers (AWS S3, Vercel Blob) charge hefty bandwidth fees for file downloads.
* **Decision:** Selected **Cloudflare R2** with Supabase Storage as companion.
* **Rationale:** Cloudflare R2 provides 10GB free storage every month with **$0 egress bandwidth fees**, preventing any unexpected bills when wallpapers go viral.
* **Status:** Accepted.

### ADR-004: Non-Coder Admin Architecture
* **Context:** Rini does not know coding and needs to create quizzes, articles, rankings, and moderate community photos directly from her phone or laptop.
* **Decision:** Build a custom, visual `/admin` dashboard powered by Astro SSR + Supabase Auth.
* **Rationale:** Off-the-shelf headless CMS tools (Sanity, Strapi, Contentful) either have complex developer setups, require separate paid plans, or confuse non-technical users. A bespoke, streamlined dashboard gives Rini exact 1-tap controls with zero technical jargon.
* **Status:** Accepted.

### ADR-005: Community Showcase Moderation Sandbox
* **Context:** Visitors can share photos of DIYs, nail art, and sketches. Malicious users or bots could attempt to post inappropriate content.
* **Decision:** Public submissions must save to `status = 'pending'` and never display publicly until Rini taps "Approve" in her Admin Inbox.
* **Status:** Accepted.

### ADR-006: Navigation Bar Redesign & Two-Tone Brand Identity
* **Context:** The user provided an exact reference design showing a two-tone brand mark (`teen time glow.`), active capsule pill for `Home`, 6 core nav links, hairline divider, capsule search input, audio toggle, like counter, and deep forest green `Take Quiz ✨` CTA button.
* **Decision:** Re-architected `<header id="siteHeader">` to match the exact reference layout while strictly preserving the user's circular logo avatar (`assets/logo.jpg`).
* **Rationale:** Keeps brand recognition while elevating visual craftsmanship to elite editorial standards. Search bar includes instant smart jump navigation to page sections (`#edits`, `#rankings`, `#quotes`, `#wallpapers`, `#quiz`, `#gallery`).
* **Status:** Accepted & Deployed.

### ADR-007: Romantic Aesthetics & Pink Little Hearts Interactive Trail
* **Context:** The user requested replacing generic cursor particle dust with romantic pink little hearts, adding morphing animation effects, and a cinematic preloader.
* **Decision:** Implemented inline SVG mini pink hearts with rotation, upward drift, and decay physics on mouse movement, radial click explosions, CSS keyframe `@keyframes organicMorph` background blobs, and a real percentage preloader (`0%` → `100%`).
* **Rationale:** Deepens the "Teen Glow" brand immersion and delight factor without degrading performance (lightweight DOM recycling, 60fps).
* **Status:** Accepted & Deployed.

---

## 2. Environment Variables & Secrets Inventory (Template)

```ini
# Supabase Configuration (Free Tier)
PUBLIC_SUPABASE_URL="https://xxxxxxxx.supabase.co"
PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Cloudflare R2 Storage (Zero Egress Media)
R2_ACCOUNT_ID="xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
R2_ACCESS_KEY_ID="xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
R2_SECRET_ACCESS_KEY="xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
R2_BUCKET_NAME="rini-the-teen-media"
PUBLIC_R2_DEV_URL="https://pub-xxxxxxxx.r2.dev"

# Google Analytics 4
PUBLIC_GA_MEASUREMENT_ID="G-XXXXXXXXXX"

# Application Settings
SITE_URL="https://teentimeglow.me"
ADMIN_EMAIL="rini@example.com"
```

---

## 3. Implementation Roadmap & Current Status

| Phase | Milestone | Deliverables | Status |
| :--- | :--- | :--- | :--- |
| **Phase 1** | **Foundation & Specs** | PRD, Architecture, System Map, Rules, Memory, Brand Identity | ✅ **Complete** |
| **Phase 2** | **Frontend Core & Visual Identity** | Editorial Hero, Theme Color Tokens, Typography, WebP Assets | ✅ **Complete** |
| **Phase 3** | **Interactive Experience Engine** | Beauty/Fashion/Decor Edits, Prime Rankings, Wallpaper Vault, Glow Quiz, Quotes | ✅ **Complete** |
| **Phase 4** | **Micro-Interactions & Nav Overhaul** | Pink heart cursor trail, preloader, organic morph blobs, reference navbar | ✅ **Complete** |
| **Phase 5** | **Zero-Code Admin & Supabase Sync** | Full backend sync, R2 zero-egress bucket connection, `/admin` moderation queue | 🟡 **Ready / Planned** |
| **Phase 6** | **Telemetry, Analytics & Growth** | GA4 tracking, SEO Rich Snippets, WebP automation, social share cards | ✅ **Live on Production** |

---

## 4. Completed & Live Milestones
* [x] Custom domain active: [`https://teentimeglow.me`](https://teentimeglow.me) and [`https://www.teentimeglow.me`](https://www.teentimeglow.me).
* [x] Brand identity verified: Two-tone `teen time ` and `glow.` wordmark in Playfair Display italic + circular brand avatar (`assets/logo.jpg`).
* [x] Reference navigation bar implemented: Active Home pill, 6 curated category links, vertical divider, expandable capsule search bar, sound toggle (`🔊`), saved moodboard counter (`♡ 4`), and `Take Quiz ✨` button.
* [x] Ambient FX integrated: Floating pink little hearts cursor trail, click burst ripples, cinematic counter preloader, and organic morphing blobs.
* [x] Design specifications document fully updated in [`brain/designs.md`](file:///c:/Users/lenovo/OneDrive/Desktop/rini%20website/brain/designs.md).
