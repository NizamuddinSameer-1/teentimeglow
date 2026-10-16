# System Architecture — Rini TheTeen

**Stack:** Astro (Hybrid SSR/SSG) + Supabase (PostgreSQL & Auth) + Cloudflare R2 / Supabase Storage on Vercel Edge  
**Hosting Target:** `teentimeglow.me` (Primary) | `rinitheteen.vercel.app` (Staging)  
**Cost Model:** $0.00 / 100% Free Tier Guaranteed  

---

## 1. System Topology & Architectural Model

The system follows a **Decoupled Edge-First Jamstack Architecture**:

```
[ Visitor / Reader (Phone/Desktop) ]
              │ (HTTPS)
              ▼
    [ Vercel Edge CDN Network ]
    ├── Pre-rendered Static Pages (SSG / ISR) -> Sub-500ms response
    └── Edge Serverless API Functions (/api/*)
              │
              ├── [ Supabase Managed Postgres (DB) ] (500MB Free Tier)
              │   └── Row-Level Security (RLS) Enforced
              ├── [ Supabase Auth ] (JWT / Session Cookie)
              └── [ Cloudflare R2 / Supabase Storage ] (10GB Free, $0 Egress)
                    └── WebP/AVIF Optimized Media Assets

[ Rini (Admin / Phone / Laptop) ]
              │
              ▼
    [ /admin Dashboard (SSR) ]
    └── Secured by Admin JWT -> Full CRUD Access to DB & Media Storage
```

---

## 2. Component Breakdown

### 2.1 Frontend Layer: Astro Framework
* **Rendering Strategy**:
  * **Public Pages (SSG + ISR)**: Home, Blog articles, Ranking boards, Quotes, Wallpapers. Built as pure static HTML with minimal client-side JavaScript.
  * **Interactive Components (Astro Islands)**: Quiz Engine, Community Submission Form, Search/Filter chips (hydrated on demand via `client:visible` or `client:idle`).
  * **Admin Dashboard (SSR)**: Dynamic server-rendered authenticated views protected by session middleware.
* **Styling & Assets**:
  * Zero-bloat scoped CSS or Tailwind CSS configured with a bespoke anti-slop design system.
  * Web fonts loaded locally or preconnected with `font-display: swap`.

### 2.2 Backend & Data Layer: Supabase (PostgreSQL)
* **Instance**: Free Tier managed PostgreSQL on AWS/GCP (500MB database, 50,000 monthly active users).
* **Communication**: Native Supabase JS SDK via HTTPS REST/PostgREST.
* **Access Control**: Database-enforced Row-Level Security (RLS) on all tables.

### 2.3 Storage & Media Delivery: Cloudflare R2 / Supabase Storage
* **Problem Solved**: High-res wallpapers and blog photos usually break or incur bandwidth fees on typical clouds.
* **Solution**: Cloudflare R2 offers 10GB free monthly storage with **$0 egress fees**, backed by global edge caching.
* **Format Standard**: Client and admin uploads are processed to **WebP** to reduce file sizes by 60–80% without visible quality loss.

---

## 3. Database Schema Specification

```sql
-- 1. Blog Articles
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT CHECK (category IN ('beauty', 'fashion', 'decor')) NOT NULL,
    cover_image_url TEXT NOT NULL,
    excerpt TEXT,
    content_html TEXT NOT NULL,
    read_time_minutes INT DEFAULT 3,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Curated Rankings (Prime Video & Audiobooks)
CREATE TABLE rankings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT CHECK (category IN ('prime_video', 'audiobook')) NOT NULL,
    title TEXT NOT NULL,
    cover_image_url TEXT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    review_text TEXT,
    watch_url TEXT,
    rank_order INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Quizzes
CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    cover_image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_order INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE quiz_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID REFERENCES quiz_questions(id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    outcome_key TEXT NOT NULL, -- e.g. 'clean_girl', 'cozy_cottage', 'y2k_chic'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE quiz_outcomes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    outcome_key TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    badge_label TEXT,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Community Showcase ("The Teen Gallery")
CREATE TABLE community_creations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name TEXT NOT NULL,
    author_social TEXT,
    category TEXT CHECK (category IN ('nails', 'diy', 'sketch', 'decor')) NOT NULL,
    image_url TEXT NOT NULL,
    caption TEXT,
    status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    likes_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Relatable Stories, Memes & Quotes
CREATE TABLE stories_memes_quotes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT CHECK (type IN ('quote', 'story', 'meme')) NOT NULL,
    content_text TEXT,
    image_url TEXT,
    author TEXT DEFAULT 'Rini',
    likes_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Free Wallpapers
CREATE TABLE wallpapers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    device_type TEXT CHECK (device_type IN ('mobile', 'desktop')) NOT NULL,
    thumbnail_url TEXT NOT NULL,
    download_url TEXT NOT NULL,
    resolution_label TEXT DEFAULT '4K Ultra-HD',
    download_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 4. Auth & Security Policies (RLS)

```sql
-- Enable Row Level Security on all tables
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_creations ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories_memes_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallpapers ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policies
CREATE POLICY "Public can view published posts" ON posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view rankings" ON rankings FOR SELECT USING (true);
CREATE POLICY "Public can view active quizzes" ON quizzes FOR SELECT USING (is_active = true);
CREATE POLICY "Public can view approved community posts" ON community_creations FOR SELECT USING (status = 'approved');
CREATE POLICY "Public can view stories, memes, quotes" ON stories_memes_quotes FOR SELECT USING (true);
CREATE POLICY "Public can view wallpapers" ON wallpapers FOR SELECT USING (true);

-- 2. Public Submission Policy (Pending only)
CREATE POLICY "Public can submit community creations" ON community_creations FOR INSERT WITH CHECK (status = 'pending');

-- 3. Admin Full Control (Authenticated User Rini)
CREATE POLICY "Admin full access on posts" ON posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on rankings" ON rankings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on quizzes" ON quizzes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on community" ON community_creations FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on stories/memes" ON stories_memes_quotes FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access on wallpapers" ON wallpapers FOR ALL TO authenticated USING (true) WITH CHECK (true);
```

---

## 5. API Route Architecture

Serverless API routes in `/src/pages/api/*`:

| Endpoint | Method | Auth | Description |
| :--- | :--- | :--- | :--- |
| `/api/community/submit` | `POST` | Public (Rate-limited) | Uploads photo to storage & inserts with `status='pending'` |
| `/api/wallpapers/download/[id]` | `POST` | Public | Increments download counter & returns secure download URL |
| `/api/quizzes/[slug]` | `GET` | Public | Returns quiz questions, options, and calculated outcome |
| `/api/admin/login` | `POST` | Public | Authenticates Rini via Supabase Auth & sets secure HTTP-only cookie |
| `/api/admin/upload` | `POST` | Admin Only | Generates direct upload signed URL for photos & wallpapers |
| `/api/admin/community/[id]/status`| `PATCH`| Admin Only | Approves or Rejects reader submission |
| `/api/admin/posts` | `POST/PUT/DELETE`| Admin Only | Complete blog CRUD operations |

---

## 6. Hosting, CDN & CI/CD Topology

* **Source Code**: Private GitHub Repository.
* **Deployment Target**: Vercel (`teentimeglow.me` with staging at `rinitheteen.vercel.app`) using `@astrojs/vercel` adapter.
* **Edge CDN**: Vercel Edge Network spanning 300+ edge locations worldwide.
* **Build Pipeline**: Automatic deployment on `git push main` with pre-build linting and type checking (< 45s deploy).
