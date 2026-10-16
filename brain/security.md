# Security & Hardening Architecture — Rini TheTeen

Security is paramount, especially with public photo submissions ("The Teen Gallery") and an administrative control panel on a public domain.

---

## 1. Zero Trust Database Defense (Row-Level Security)

Even if a malicious user inspects network traffic and extracts the public `PUBLIC_SUPABASE_ANON_KEY`, they **cannot alter, inject, or delete any data**.

* **Enforcement Point:** PostgreSQL engine kernel via Supabase RLS.
* **Write Barrier:** `INSERT`, `UPDATE`, and `DELETE` on posts, rankings, quizzes, and wallpapers strictly require an active authenticated JWT session belonging to Rini.
* **Public Quarantine:** Public `INSERT` is only permitted on `community_creations`, and it hardcodes `status = 'pending'`. Any attempt to set `status = 'approved'` via the public API is rejected by the database policy check.

---

## 2. Public File Upload Hardening ("The Teen Gallery")

Allowing public photo uploads is a frequent attack vector if not properly sanitized. We enforce a **4-step verification pipeline**:

```
[ User Uploads File ]
          │
          ├── 1. Size Check: Max 10 MB (Rejects oversized payloads immediately)
          │
          ├── 2. MIME & Extension Check: Allowed: image/jpeg, image/png, image/webp
          │
          ├── 3. Magic Byte Inspection: Verifies genuine binary image header (not an executable disguised as .png)
          │
          ├── 4. Sharp Transcoder: Re-encodes the image to clean WebP
          │      └── Strips all EXIF metadata (removes GPS location, device serials, personal data)
          │      └── Neutralizes embedded polyglot scripts or SVG XSS payloads
          │
          ▼
[ Store in /community-uploads/ as <uuid>.webp with status='pending' ]
```

---

## 3. Stored XSS Defense (DOMPurify)

When Rini types formatted blog articles (headings, bold text, bullet lists, lookbook links), the HTML must be sanitized before rendering to visitors:

```typescript
import DOMPurify from 'dompurify';

export function sanitizeHtml(rawHtml: string): string {
  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: [
      'h2', 'h3', 'h4', 'p', 'b', 'i', 'em', 'strong', 
      'a', 'ul', 'ol', 'li', 'blockquote', 'img', 'span'
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel'],
  });
}
```

---

## 4. Rate Limiting on Free Infrastructure ($0)

To protect from automated spam, DDoS, or malicious scraper bots without paying for enterprise firewalls:

* **Vercel Edge In-Memory Rate Limiter**:
  * `/api/community/submit`: Limit to **3 uploads per IP per 10 minutes**.
  * `/api/admin/login`: Limit to **5 attempts per IP per 15 minutes** (blocks password guessing).
  * `/api/wallpapers/download/*`: Limit to **30 downloads per IP per minute**.
* **Cloudflare Free WAF (Optional)**:
  * When using Cloudflare DNS in front of Vercel, turn on "Bot Fight Mode" (100% free) to automatically challenge known bad bots and scrapers.

---

## 5. HTTP Security Headers

Injected at edge via `vercel.json`:
* `Content-Security-Policy`: Restricts script and media execution to authorized domains.
* `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`: Forces HTTPS forever.
* `X-Frame-Options: DENY`: Prevents clickjacking (site cannot be framed inside an iframe on another site).
* `X-Content-Type-Options: nosniff`: Prevents MIME-type sniffing attacks.
* `Referrer-Policy: strict-origin-when-cross-origin`: Protects visitor privacy.
