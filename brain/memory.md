# Project Memory & Decision Log — Rini TheTeen

**Last Updated:** 2026-10-17  
**Target Custom Domain:** `teentimeglow.me` (Claimed via GitHub Student Pack on Namecheap)  
**Fallback / Staging Domain:** `rinitheteen.vercel.app`  
**Current Phase:** Pre-implementation / Spec & Architecture Alignment  

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

## 3. Implementation Roadmap

| Phase | Milestone | Deliverables |
| :--- | :--- | :--- |
| **Phase 1** | **Foundation & Specs** | PRD, Architecture, System Map, Rules, Memory (Current). Awaiting Stitch design screens to populate `designs.md`. |
| **Phase 2** | **Project Scaffold & Database** | Initialize Astro project with Vercel adapter, setup Supabase schema and RLS policies, configure R2 storage bucket. |
| **Phase 3** | **Public Experience** | Build Homepage, Beauty/Fashion/Decor Blog, Prime Video & Audiobook Rankings, Wallpaper Vault, Daily Quote card. |
| **Phase 4** | **Interactive & Community Engine** | Interactive Quiz player + result generator, Community submission modal ("The Teen Gallery"). |
| **Phase 5** | **Zero-Code Admin Dashboard** | `/admin` panel with Article editor, Quiz builder, Ranking manager, Community moderation inbox, and Wallpaper uploader. |
| **Phase 6** | **Telemetry, SEO & Ship** | GA4 integration, Open Graph cards, sitemap.xml, Lighthouse 95+ verification, deployment to `rinitheteen.vercel.app`. |

---

## 4. Pending Items
* [ ] User provides **Stitch pages/screens** for UI inspiration and visual mapping.
* [ ] Review Stitch designs and populate [designs.md](file:///c:/Users/lenovo/OneDrive/Desktop/rini%20website/docs/designs.md) with exact tokens, layouts, and component specs.
