# End-to-End System Map — Rini TheTeen

This document maps all data flows, user journeys, moderation pipelines, and component relationships across **Rini TheTeen** (`teentimeglow.me`).

---

## 1. High-Level System Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CLIENT LAYER (Edge Devices)                        │
│                                                                             │
│   [ Visitor Phone (85%) ]            [ Visitor Desktop ]         [ Rini (Admin) ]
└──────────────┬────────────────────────────────┬──────────────────────┬──────┘
               │                                │                      │
               ▼                                ▼                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      VERCEL GLOBAL EDGE NETWORK                             │
│                                                                             │
│  ├── Edge Cache (HTML, WebP Wallpapers, Static CSS/JS)                      │
│  │     └── Hit Rate: ~95% (Latency: 20-50ms)                                │
│  │                                                                          │
│  └── Edge Serverless Functions (/api/* & /admin SSR)                        │
│        ├── /api/community/submit  (Rate Limited)                           │
│        ├── /api/wallpapers/download                                         │
│        ├── /api/admin/* (Protected by Supabase JWT)                         │
│        └── Dynamic Quiz Engine Router                                       │
└──────────────┬────────────────────────────────┬──────────────────────┬──────┘
               │                                │                      │
               ▼                                ▼                      ▼
┌───────────────────────────────────┐    ┌────────────────────────────────────┐
│      SUPABASE POSTGRESQL          │    │    CLOUDFLARE R2 / SUPABASE MEDIA  │
│                                   │    │                                    │
│  ├── posts                        │    │  ├── /wallpapers/ (Original 4K)    │
│  ├── rankings                     │    │  ├── /wallpapers/thumbs/ (WebP)    │
│  ├── quizzes / questions / options│    │  ├── /blog-media/ (WebP)           │
│  ├── community_creations          │    │  └── /community-uploads/ (Pending) │
│  ├── stories_memes_quotes         │    │                                    │
│  └── Row-Level Security (RLS)     │    │  Zero Egress Bandwidth Charges     │
└───────────────────────────────────┘    └────────────────────────────────────┘
```

---

## 2. Core User Journey Maps

### Journey A: Public Visitor (Mobile Browsing & Freebies)
```mermaid
sequenceDiagram
    autonumber
    actor Reader as Visitor (Mobile)
    participant Edge as Vercel Edge CDN
    participant API as /api Serverless
    participant R2 as Cloudflare R2 / Storage
    participant DB as Supabase DB

    Reader->>Edge: Request / (Homepage)
    Edge-->>Reader: Instant HTML + CSS (< 400ms)
    Reader->>Edge: Open Wallpapers Tab
    Edge-->>Reader: Wallpapers Grid (WebP previews)
    Reader->>API: Click "1-Click Download Wallpaper #4"
    API->>DB: Increment download_count
    API-->>Reader: Direct 4K WebP File Download
    Reader->>Edge: Take "Aesthetic Vibe Quiz"
    Reader->>Edge: Complete 5 questions
    Edge-->>Reader: Instant animated result card ("Clean Girl Minimalist")
    Reader->>Reader: Tap "Share to Instagram/WhatsApp"
```

---

### Journey B: Community Member (Submitting a Creation)
```mermaid
sequenceDiagram
    autonumber
    actor Contributor as Reader (DIY/Nail Artist)
    participant Client as Frontend Form
    participant API as /api/community/submit
    participant R2 as Cloudflare R2 Storage
    participant DB as Supabase DB

    Contributor->>Client: Open "Share Your Creation" Modal
    Contributor->>Client: Enters Name, Category ("Nail Art"), Caption & Photo
    Client->>API: POST /api/community/submit (multipart form)
    API->>API: Validate file (type: image/*, max: 10MB)
    API->>R2: Upload photo to /community-uploads/
    API->>DB: Insert row with status = 'pending'
    DB-->>API: Row created
    API-->>Contributor: "🎉 Submitted! Rini will review your creation shortly."
```

---

### Journey C: Rini (Zero-Code Moderation & Content Publishing)
```mermaid
sequenceDiagram
    autonumber
    actor Rini as Rini (Admin on Phone)
    participant AdminUI as /admin Dashboard
    participant API as /api/admin/*
    participant R2 as Cloudflare R2 Storage
    participant DB as Supabase DB

    Rini->>AdminUI: Opens teentimeglow.me/admin
    AdminUI->>AdminUI: Checks Supabase JWT Session
    AdminUI-->>Rini: Shows Creator Dashboard (6 Tabs)
    Note over Rini, AdminUI: Notification: "🔔 3 New Submissions Waiting"
    Rini->>AdminUI: Taps "Community Inbox"
    AdminUI->>DB: Fetch community_creations WHERE status = 'pending'
    DB-->>AdminUI: Returns photos & captions
    Rini->>API: Taps "✅ Approve" on Nail Art Submission #1
    API->>DB: UPDATE community_creations SET status = 'approved'
    DB-->>AdminUI: Instant UI update (Submission moves to Live Gallery)
    Note over Rini, AdminUI: Adding a new Prime Video recommendation
    Rini->>AdminUI: Taps "+ Add Ranking"
    Rini->>AdminUI: Types "The Summer I Turned Pretty", 5 Stars, sets rank #1
    Rini->>API: Taps "Publish"
    API->>DB: INSERT / UPDATE rankings
    API->>AdminUI: Success toast ("Published Live!")
```

---

## 3. Data Flow & Moderation Pipeline

```
[ Reader Uploads Photo ] 
          │
          ▼
   [ Server Validation ] ───(Invalid MIME / >10MB)───> [ 400 Bad Request ]
          │ (Valid)
          ▼
   [ Save to Storage ] ──> /community-uploads/<uuid>.webp
          │
          ▼
   [ Insert DB Row ] ────> status = 'pending' (HIDDEN FROM PUBLIC)
          │
          ▼
   [ Rini's Private Inbox ] ──> Displays image, caption, submitter name
          │
          ├─── [ Rini Taps "Reject" ] ───> DELETE file & row
          │
          └─── [ Rini Taps "Approve" ] ──> UPDATE status = 'approved' ──> [ LIVE ON SITE ]
```

---

## 4. Edge Caching & Content Invalidation Flow

* **Static Reads**: Visitors requesting `/blog`, `/rankings`, `/wallpapers` hit the **Vercel Edge Cache**.
* **Zero Database Load**: 99% of visitor traffic is served from Edge memory.
* **On-Demand Cache Purging**:
  * When Rini saves a new blog post or updates a ranking in `/admin`, the API route sends a tag-based revalidation signal (`res.revalidate('/blog')`).
  * The edge cache refreshes within **5 seconds** without rebuilding the entire site.

---

## 5. System Component Dependency Graph

```
teentimeglow.me (Staging: rinitheteen.vercel.app)
│
├── [ Frontend Pages (Astro) ]
│     ├── /                     (Home: Featured Hero, Quick Links, Daily Quote)
│     ├── /blog                 (Beauty, Fashion, Decor Articles)
│     ├── /blog/[slug]          (Full Article + Zoomable Lightbox + Lookbook)
│     ├── /rankings             (Prime Video & Audiobook Leaderboards)
│     ├── /quizzes              (Quiz Directory & Interactive Player)
│     ├── /community            (The Teen Gallery: Approved DIY/Nails/Art)
│     ├── /wallpapers           (Free Mobile/Desktop Wallpaper Vault)
│     ├── /stories-and-memes    (Relatable Feed)
│     └── /admin                (Private Creator Dashboard for Rini)
│
├── [ Serverless API Handlers (/src/pages/api) ]
│     ├── /community/submit.ts
│     ├── /wallpapers/download.ts
│     ├── /admin/auth.ts
│     ├── /admin/upload.ts
│     └── /admin/crud.ts
│
└── [ External Free Infrastructure ]
      ├── Supabase Cloud       (Auth + PostgreSQL Engine + RLS)
      ├── Cloudflare R2        (Object Storage + Zero Egress Bandwidth)
      ├── Google Analytics 4   (GA4 Performance & Visitor Telemetry)
      └── Vercel Platform      (SSL, Edge Routing, Git Deployments)
```
