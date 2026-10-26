# TeenTimeGlow — Project Conventions

## Domain / canonical host

**`https://www.teentimeglow.me` is the canonical address.** Confirmed by the user on 2026-10-26.

- Vercel redirects the bare `teentimeglow.me` to `www` — this was already the case before any SEO work.
- `SITE_URL` in `src/config/seo.ts` is the single source of truth. Never hardcode a host anywhere else.
- Do **not** "fix" the www by switching to non-www without an explicit decision. The site was previously penalised by having canonicals on the bare domain while the server served www.
- Open item: the bare → www redirect is currently **307**, because it is configured at Vercel *domain* level, which overrides `vercel.json`. To make it permanent, change it in Vercel → Settings → Domains. The `vercel.json` rule is a 308 fallback that only applies if the domain-level redirect is removed.

## Deployment

- Production branch is **`main`**. Pushing to a feature branch does not deploy.
- Repo: `github.com/NizamuddinSameer-1/teentimeglow`.
- `main` had diverged from `gsd-super/separate-pages` by 5 commits (Phase 14/15 admin work). Check with `git merge-tree --write-tree main HEAD` before merging.

## Build

- Local builds in this sandbox require `NODE_OPTIONS="" npm run build` — a filesystem shim intercepts `fs.rm` on `.vercel/output` and fails on the OneDrive path. Environment quirk only; Vercel's build is unaffected.

## Content rules

- **Never publish invented metrics.** Homepage counters are computed from Supabase at request time. Fabricated social proof (readers, satisfaction %, quiz counts) was removed on 2026-10-26 and must not return.
- **`src/lib/seeds.ts` is intentionally empty.** It used to hold demo articles/wallpapers/quotes that reappeared whenever a table was emptied, which made deleting content look like it did nothing. Do not repopulate it — handle empty states in the UI instead.
- Wallpaper and quote slugs are derived from content at render time (`src/lib/slugs.ts`) — no `slug` column in the DB. Editing a wallpaper *title* changes its URL.

## Security — OPEN ISSUE

`src/lib/supabase.ts` hardcodes the **service_role** key as a fallback (lines ~17-19). The GitHub repo `NizamuddinSameer-1/teentimeglow` is **public**, so that key is world-readable and grants full DB access bypassing RLS. Present since commit `0e157b7`.

Not yet fixed. Proper fix: rotate the key in Supabase, remove the hardcoded fallbacks (rely on `PUBLIC_SUPABASE_URL` / `PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` env vars, which must first be confirmed set in Vercel), and purge history if the repo stays public.

Ops scripts in `scripts/` deliberately read credentials from `.env` — do not add hardcoded keys to them.
