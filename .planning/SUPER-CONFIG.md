# GSD Super Configuration — TeenTimeGlow Astro & Backend Migration

**Locked Date:** 2026-10-17  
**Branch:** `gsd-super/astro-backend-migration`  

## Interview Answers & Settings

* **Project:** TeenTimeGlow (Rini TheTeen)
* **Mode:** Mode B — Milestone Pauses (Pause after each phase for user review)
* **Approval Gate:** Human approves roadmap first before execution begins
* **Testing Mode:** Both (Browser/visual check + automated build & verification)
* **Framework:** Astro (Hybrid SSR/SSG) with `@astrojs/vercel` adapter
* **Backend & Database:** Supabase (PostgreSQL with RLS) via `@supabase/supabase-js`
* **Media Storage:** Cloudflare R2 / Supabase Storage (Zero egress bandwidth)
* **Styling:** Modular CSS architecture adhering to `brain/designs.md` and `anti-ai-slop-frontend-playbook.md`
* **Target Quality:** Production Grade (Zero broken assets, strict TypeScript, responsive, accessible, secure)
* **Deployment Target:** Vercel Global Edge Network (`teentimeglow.me`)
* **Database Credentials:** User will provide live Supabase URL & Anon Key right away
