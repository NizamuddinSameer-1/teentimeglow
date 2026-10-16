# Development Rules & Anti-Slop Constraints — Rini TheTeen

These rules are strictly binding for the entire lifecycle of **Rini TheTeen** (`teentimeglow.me`).

---

## 1. Budget & Cost Constraint ($0.00 Forever)
* **Rule 1.1**: Every service, library, and cloud resource utilized must remain **100% within permanent free-tier limits**.
* **Rule 1.2**: Never introduce third-party services that require paid credit card trials or switch to paid subscriptions after 14/30 days.
* **Rule 1.3**: Zero egress bandwidth penalties. All high-res wallpaper distribution must pass through **Cloudflare R2** or direct edge caches to guarantee $0 bandwidth charges regardless of download volume.

---

## 2. Anti-AI-Slop Frontend & Aesthetic Rules
*(Derived from and enforcing [anti-ai-slop-frontend-playbook.md](file:///c:/Users/lenovo/OneDrive/Desktop/rini%20website/anti-ai-slop-frontend-playbook.md))*

* **Rule 2.1 — Typography Ban List**:
  * ❌ **BANNED**: Unconsidered default Inter for everything.
  * ❌ **BANNED**: System-ui generic fallbacks with no character.
  * ❌ **BANNED**: The "escaping Inter reflex" (Space Grotesk or Geist without purpose).
  * ✅ **REQUIRED**: Deliberate, editorial typography pairing (e.g. an expressive, high-fashion display serif like *Cormorant Garamond* or *Playfair* paired with a clean, modern geometric sans like *Plus Jakarta Sans* or *Outfit*).
* **Rule 2.2 — Color & Palette Ban List**:
  * ❌ **BANNED**: "VibeCode Purple" (indigo-500 / violet-500 gradients on white).
  * ❌ **BANNED**: Gradient text (`bg-clip-text`) splashed over ordinary headings.
  * ❌ **BANNED**: Harsh, uncurated neon glows or timid evenly-weighted palettes.
  * ✅ **REQUIRED**: A committed, bespoke aesthetic color palette reflecting warm editorial chic, clean tones, and high-contrast legible text.
* **Rule 2.3 — Component & Layout Ban List**:
  * ❌ **BANNED**: Uniform `rounded-2xl` on every card and container.
  * ❌ **BANNED**: The generic AI template waterfall (Eyebrow pill → Big centered headline → 3-column card grid with Lucide Zap/Shield icons).
  * ❌ **BANNED**: Fake AI copy ("Supercharge", "Seamless", "Unlock", "Next-gen").
  * ✅ **REQUIRED**: Authentic, organic editorial layouts: asymmetrical lookbook grids, high-fashion magazine card borders, tactile paper/linen textures, and responsive mobile-first tap targets.

---

## 3. Image & Performance Engineering Rules
*(Addressing the core pain point: "most websites show error to show image or don't run fast")*

* **Rule 3.1 — Zero Fragile Hotlinks**:
  * Never link directly to temporary third-party image URLs (e.g. random image URLs that return 403/404 after weeks).
  * All media assets must be served from Cloudflare R2, Supabase Storage, or project-bundled optimized assets.
* **Rule 3.2 — Mandatory WebP Conversion**:
  * All uploaded photos and wallpapers must be encoded in **WebP** or **AVIF** format.
  * Thumbnails must be generated for wallpaper previews so mobile phones never load full 20MB files just to show a grid.
* **Rule 3.3 — Zero Layout Shift (CLS = 0.00)**:
  * Every `<img>` tag and picture container must have strict `aspect-ratio` and explicit width/height dimensions.
  * Skeletons or blurred progressive placeholders must hold the exact space while images stream in.
* **Rule 3.4 — 1-Click Wallpaper Downloads**:
  * When a visitor clicks "Download Wallpaper", the file must download immediately using a direct `download` attribute or Content-Disposition stream.
  * No redirecting through spammy download intermediaries, ad shorteners, or captcha walls.

---

## 4. Non-Coder Admin Usability Rules (Rini-First)

* **Rule 4.1 — Zero Code / Zero Markdown Exposure**:
  * Rini must never be required to write code, edit JSON files, configure YAML, or debug syntax errors.
  * The Admin Dashboard must be fully visual with rich text inputs, dropdowns, and drag-and-drop file uploaders.
* **Rule 4.2 — Mobile-Ready Admin Controls**:
  * The `/admin` panel must be 100% responsive and fully functional on Rini's smartphone browser so she can publish or moderate from her phone on the go.
* **Rule 4.3 — Optimistic Feedback & Clear Confirmation**:
  * Every admin action (Approve, Reject, Publish, Delete) must show clear, friendly feedback toasts (e.g., *"✨ Article published live!"*, *"✅ Submission approved!"*).
  * Dangerous actions (Delete post) must have a simple confirmation modal to prevent accidental data loss.

---

## 5. Security & Content Moderation Rules

* **Rule 5.1 — Strict Moderation Sandbox**:
  * Reader submissions for the DIY/Nails/Sketch gallery must **always** enter the database with `status = 'pending'`.
  * Public SQL queries must strictly filter `WHERE status = 'approved'`.
  * No unmoderated reader image or text may ever appear on the live site automatically.
* **Rule 5.2 — Row Level Security (RLS)**:
  * RLS must remain enabled on all Supabase tables at all times.
  * Public clients only possess the `anon` key with read-only permissions on published content.
  * All mutations (create/update/delete) require valid Admin JWT session verification.
* **Rule 5.3 — Public Rate Limiting**:
  * Public submission endpoints (`/api/community/submit`) and wallpaper download endpoints must be rate-limited to prevent abuse or bot scraping.
