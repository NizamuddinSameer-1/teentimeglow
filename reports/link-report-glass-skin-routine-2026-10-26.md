# Link Strategy Report — "The Korean Glass Skin Routine for School Days"

**Prepared:** 26 October 2026
**Prepared by:** link-strategist (Phase 4)
**Article under review:** `drafts/glass-skin-korean-routine-2026-10-26.md` (2,199 words, 4 internal links, 0 external links)
**Publish URL:** `/edits/glass-skin-korean-routine`
**Cluster:** A — Skincare → `/edits/category/skincare`

---

## 0. Verdict up front

| Question | Answer |
|---|---|
| Content health score, as drafted | **60 / 100** |
| Content health score, after the fixes in this report | **72 / 100** |
| Is the article an orphan risk? | **No.** It launches with five inbound paths. This is the opposite of the situation the strategy doc fixed in §2. |
| Is 4 internal links the right number for 2,200 words? | **It is one short, and 5 is the honest ceiling.** Not because of word count — because of inventory. |
| Can the "link sideways to 2–3 siblings" rule be satisfied? | **No, and it should not be faked.** The `posts` table is empty; any sibling link is a self-inflicted 404 in a brand-new page. Say so in the changelog and satisfy it on article two. |
| Is the `/edits/category/skincare` hub link a liability? | **The link is correct. The destination's copy is not.** Ship the link; make `seo.ts:69` a publish blocker. |
| Are external citations safe to ship? | **Yes — three, all fetched and confirmed live on 26 Oct 2026.** See §5. |
| Single biggest structural risk | **The hub CTA promises plurality the hub cannot deliver on day one** (§4.3), on top of the false credential already flagged by seo-optimizer. |

---

## 1. Internal link audit — the four existing links

Assessment criteria: is the anchor descriptive of the destination; is the placement at a point where the reader actually wants to click; does the link serve the destination as well as the source.

### 1.1 `/quiz` — line 69, end of H2 #2

> Not sure which version fits you? [What Is Your Signature Teen Glow Aesthetic?](/quiz) takes two minutes.

| Check | Verdict |
|---|---|
| Anchor | **Good.** Full destination title, 6 words, unambiguous, not a generic "take the quiz". |
| Placement | **Best link in the article.** End of H2 #2 is the moment the reader has just been told the standard routine was not written for her and is deciding whether to keep reading. That is the one point in the piece where she is actively unsure what her own situation is — the exact moment a quiz is welcome rather than a distraction. |
| Serves destination | **Yes.** `/quiz` is one of the few pages on the site with independent traffic potential, and it gets the highest-attention paragraph. |
| Change needed | **None to the link.** One editorial note below. |

**Editorial note, not a link change:** the sentence *"Not sure which version fits you?"* implies the article has presented several versions. It has not — it has presented one routine plus an acne variant two thousand words later. The question slightly over-promises. Rewriting it as *"Want a second opinion on your own skin? [quiz] takes two minutes."* would be true and keeps the same click. This is content-editor's call, not mine.

### 1.2 `/quotes/small-daily-habits-create-massive-transformations` — line 201, inside H2 #8

> [Small daily habits create massive transformations](/quotes/small-daily-habits-create-massive-transformations) is that argument in one line, and the reason this routine is short enough to survive a bad week.

| Check | Verdict |
|---|---|
| Anchor | **Acceptable, not ideal.** It is the quote's own text, which reads naturally, but it describes a sentence rather than a destination — a reader cannot tell they will land on a quote page. At 6 words it is at the long end. |
| Placement | **Good.** It lands at the end of the consistency argument, which is exactly the claim the quote page makes. This is a genuine semantic match, not a slot-fill. |
| Serves destination | **Partially — and here the research brief is wrong.** |
| Change needed | **None.** But see the correction below. |

**Correction to brief §6.3.** The brief states this link "creates a bidirectional link, since that quote page's `relatedHref` already points at `/edits/category/decor`". Those two clauses contradict each other. Verified in `src/config/quoteCopy.ts:51–59`: the `small-daily-habits-create-massive-transformations` entry has `relatedHref: '/edits/category/decor'`. **The quote page does not link back to this article, or to the skincare hub.** So this is a one-way link that hands equity to a page which then routes the reader to Cluster C.

**Verdict: keep it anyway.** One cross-cluster hop is healthy on a site this small, the match is real, and the skincare cluster still receives its quote-backlink from `your-glow-is-your-signature`, whose `relatedHref` is `/edits/category/skincare`. Do **not** "fix" the config to chase a reciprocal link — that is not worth an edit. Do **not** add a second quote link to this article; two quote links from a skincare page over-weights the quotes cluster and makes the article read as a link exchange.

### 1.3 `/edits/category/skincare` — line 217, closing paragraph

> When you want the rest, there are more [skincare guides for teens](/edits/category/skincare) here.

| Check | Verdict |
|---|---|
| Anchor | **Correct.** Describes what the hub *is*, not what it contains today. Matches brief §6.1 exactly. |
| Placement | **Correct.** The closing paragraph is the natural exit; the breadcrumb and category badge already link up, so a second hub link mid-article would be navigational clutter. |
| Serves destination | **This is the one that misfires — but not for the reason expected.** The link is right; the sentence around it is false. See §4. |
| Change needed | **Reword the sentence. Keep the link, keep the anchor.** |

### 1.4 `/wallpapers/golden-hour-glow-horizon` — line 217, closing paragraph

> And if you want the mood without the mirror, the [golden hour glow wallpaper](/wallpapers/golden-hour-glow-horizon) is a good place to land.

| Check | Verdict |
|---|---|
| Anchor | **Good.** "golden hour glow wallpaper" is descriptive, keyword-bearing and reads naturally. |
| Placement | **Fine.** Second sentence of the exit, so it does not compete with the pillar link in the same clause. |
| Serves destination | **One-way only.** Verified: `/wallpapers/[slug].astro` links to `/`, `/wallpapers`, the download URL and other wallpapers — **it has no outbound link to any article.** So this is the only link in the article that structurally cannot be reciprocated. That is a reason to keep it to one wallpaper, not a reason to drop it. |
| Change needed | **None.** One relevance note below. |

**Relevance note.** `src/config/wallpaperCopy.ts:86` describes this wallpaper as *"a wide golden-hour horizon built for desktop, with warm light falling across the full 16:9 frame."* The audience for this article is mobile-first and 13–19. A desktop-format wallpaper is a small mismatch at the moment of highest intent. Not worth changing the link — but if Rini wants a better exit, `Iced Matcha Latte Minimalist` is the same reasoning with a nearer fit. Do not add both.

---

## 2. Recommended additions — one

### 2.1 `/about` — add, in paragraph 3

This is the single highest-value link missing from the draft, and its absence is the article's most conspicuous E-E-A-T gap.

The article's whole credibility move is paragraph 3: *"I'm Rini. I write about skincare as someone who reads labels, not as someone qualified to treat skin."* That is a claim about a person. `/about` is the page that substantiates it — verified, it carries an H1 of "Hi, I'm Rini.", an H2 of **"Editorial standards"** (`src/pages/about.astro:93`) and an H2 of "Get in touch". Right now the article makes the claim and gives the reader no way to check it.

| Field | Value |
|---|---|
| **Destination** | `/about` |
| **Anchor** | **"my editorial standards"** |
| **Insertion point** | Paragraph 3, line 29 — after "…not as someone qualified to treat skin." and before "For anything past a basic routine, a doctor is the right person, not a blog." |
| **Why there** | It is inside the first 150 words, at the exact moment a sceptical reader asks "who is this person and why should I believe her". It also puts a link in the first 5% of the article, which the current distribution badly needs (§3). |
| **Why this anchor** | It is literally the H2 on the destination page. It describes what the reader will find, not the page's URL. It does not claim a qualification. |
| **Alternative anchor** | "how I write these guides" / "who I am and how I work" |
| **Alternative placement** | The disclaimer block at line 221, if the editor wants paragraph 3 kept tight. Costs you the front-of-article distribution benefit and puts a fifth link in the final 80 words. |

**Do not** put this link on "I'm Rini" — a name is not a description of a destination, and it would be the only bare-name anchor on the site.

### 2.2 Considered and rejected

| Destination | Why rejected |
|---|---|
| `/edits` (index) | The breadcrumb already links to it, and it is one click from the hub link. A body link would be pure redundancy. |
| `/rankings` | Only topical hook is *Atomic Habits* → habits. The destination is a TV/book ranking page; any honest anchor would be irrelevant to a skincare reader. Rejected as a stretch. |
| `/gallery` | Community creations. No topical adjacency to skincare. Rejected. |
| `/` | No value; the reader arrived from it. |
| A second wallpaper / a second quote | See §1.2 and §1.4. Would tilt the exit away from the pillar. |
| `/edits/ceramide-barrier-repair`, `/edits/study-aesthetic-sanctuary`, `/edits/autumn-capsule-wardrobe` | **404 today.** Reserved slugs, linked from `quiz/index.astro`. Shipping one is worse than shipping no link. See §7 for the build order. |

### 2.3 Why not more than five

The instinct on a 2,200-word post is 6–7 internal links (the usual guidance is 1 per 300–500 words; this article is at 1 per 550, and 5 brings it to 1 per 440). But **inventory, not word count, is the binding constraint.** The site has roughly eleven real internal destinations and only five are defensible from a skincare article. The remaining ways to add links are:

1. Link the same destination twice — Google discounts repeat links to the same URL, and readers ignore them. Strictly negative.
2. Link something irrelevant — worse than no link.
3. Invent a sibling slug — ships a 404.

**Five is the honest ceiling until the cluster exists.** The four future links in §7 land in the empty middle third of the article, which is the section that currently has no links at all.

---

## 3. Link balance analysis

Positions estimated from the brief's word budget against the draft's line numbers (article body runs lines 25–221).

```
Distribution, as drafted (4 links):
  first third   (lines 25–90)   ██ 1   /quiz
  middle third  (lines 91–156)  ·· 0   —
  last third    (lines 157–221) ██████ 3   /quotes…, /edits/category/skincare, /wallpapers/…

Distribution, with /about added (5 links):
  first third   ████ 2   /about, /quiz
  middle third  ·· 0   —
  last third    ██████ 3
```

**Finding: the middle third of the article has no internal link, across roughly 800 words.** This is a real defect and it is also the clearest evidence of the cluster gap — the four links that belong there (§7: A2, A5, A6, A7) all point at articles that do not exist yet.

**Do not fix this by moving an existing link.** Moving the hub link from the exit into H2 #4 would break the one placement the brief got exactly right. The gap closes when the cluster fills, and not before.

**External/internal ratio.** After §5, the article carries 5 internal and 3 external links. That is the right side of the line — internal links should outnumber external. Do not add a fourth external citation without adding a sixth internal link.

---

## 4. The blocked hub link — verdict

### 4.1 Is the link a liability?

**No. The link is correct and should ship. The destination's copy is the liability, and it is a publish blocker — for a reason that is narrower than "SEO risk".**

I agree with seo-optimizer's §7.1 analysis and will not re-argue it. Their recommended replacement (`'Straight-talking skincare routines for teens: glass skin layering, ceramide barrier repair, and gentle routines for acne-prone skin, explained step by step.'`, 156 chars) is the right fix and I endorse it as the accepted version. My contribution is the link-strategy ruling on top of it:

1. **Do not remove the link to compensate.** It is the Cluster A pillar link. Removing it leaves the article with no up-link at all except the breadcrumb, breaks the one strategy §6 rule that *is* satisfiable today, and leaves the article's only exit pointing at a wallpaper. That is a worse trade than a bad sentence on the destination.
2. **Do not soften the anchor to compensate.** "skincare guides for teens" is accurate regardless of what the hub's description says. Changing it to something vaguer to distance the article from the hub's claim would damage the anchor and fix nothing.
3. **Do not add `rel="nofollow"`.** Nofollowing your own pillar link to hide a copy problem is the wrong tool. Fix the copy.

### 4.2 The second problem on that same line — mine, not seo-optimizer's

Even after `seo.ts:69` is fixed, line 217 still says:

> When you want the rest, there are more [skincare guides for teens](/edits/category/skincare) here.

**"There are more" is false on day one.** Verified: `src/pages/edits/category/[category].astro:16–17` filters `getPosts()` by `category === 'beauty'`. At launch that returns exactly one post — the one the reader just finished. She clicks "more skincare guides", lands on a hub, and finds a single card: the article she came from.

That is a worse first impression than the credential claim, because it is visible immediately and it makes the site look empty rather than overclaiming. It is also the highest-intent click on the page.

**Recommended rewording** (keep the link and the anchor exactly as they are, change only the promise):

> Start with the morning four. Everything I write about skin lives in [skincare guides for teens](/edits/category/skincare). And if you want the mood without the mirror, the [golden hour glow wallpaper](/wallpapers/golden-hour-glow-horizon) is a good place to land.

That is true today, true in six months, and reads better. Alternative if the editor prefers a forward-looking line: *"…the rest will land in [skincare guides for teens]."* — also honest.

### 4.3 Secondary flag on the same hub

`src/config/seo.ts:67` sets the hub H1 to **"Skincare That Actually Works"**. This is an efficacy claim with no evidence behind it — the same defect class as "tested", one register quieter. It is not my call and it is not a blocker, but if `seo.ts` is being edited anyway, the H1 is the cheapest moment to change it. Something like *"Skincare, Explained Properly"* keeps the voice and drops the claim.

---

## 5. External citations

**This is the article's weakest dimension and the cheapest thing to fix.** Health-adjacent content, read by minors, with no medical reviewer, currently cites nothing. Outbound links to institutional sources are the only E-E-A-T asset available that does not require recruiting a reviewer.

**All three URLs below were fetched and confirmed live on 26 October 2026.** I am not guessing at any of them. Where I could not verify a URL, I say so and describe the page to search for instead — see §5.4.

> **⚠️ Superseded in part — read §12 before acting on this section.** The draft was integrated after this report was delivered, and the integrated version uses the AAD URL twice and the NHS page in a way that is jurisdictionally wrong for this audience. §12 contains the revised citation recommendation. §5.1 and §5.3 stand as written; §5.2 is replaced.

### 5.1 AAD — "A dermatologist's guide to skincare from growing up to glowing up"

| Field | Value |
|---|---|
| **URL** | `https://www.aad.org/news/dermatologist-guide-skincare` |
| **Verified** | Yes — fetched 26 Oct 2026. Dated **28 Oct 2025**. Quotes **Marisa Garshick, MD, FAAD**, board-certified dermatologist. |
| **What it actually says** | "Dr. Garshick recommends that tweens and teens avoid products with active ingredients like retinol, vitamin C, and exfoliating acids… In some cases, a dermatologist may recommend a retinoid or salicylic acid… it's important to first consult with a board-certified dermatologist." |
| **Anchor** | **"the AAD's guidance for teen and tween skin"** |
| **Attach to** | H2 #6, line 165, the retinol paragraph. |
| **Sentence** | *"Do teens need retinol? Not without a doctor involved — and [the AAD's guidance for teen and tween skin] says the same thing: retinol and exfoliating acids are not for this age group, and where a retinoid is appropriate it comes from a dermatologist, not a shelf."* |
| **Why this claim needs support** | This is the article's single most load-bearing paragraph — the one the brief §10 calls the whole moat, the direct contradiction of every competitor, and the claim a defensive 15-year-old is most likely to test. It is currently an assertion by a blogger. This citation converts it into an assertion a named board-certified dermatologist made in an AAD publication. It is also the only citation that materially improves the article rather than decorating it. |
| **Accuracy caveat — important** | This is an **AAD news/editorial page quoting a named dermatologist**, not a clinical guideline and not a position statement. Do not anchor it as "AAD guidelines" or "AAD recommends". Anchor it as guidance or advice, and if the editor wants to be maximally precise, name the page's own framing. Do not extend the claim beyond what is quoted: the page does **not** say "no teenager should ever use retinol"; it says they should avoid it, and that a dermatologist may prescribe it. Our copy must match that, and the draft's existing "that is their call and not a blog's" already does. |

### 5.2 NHS — Acne

| Field | Value |
|---|---|
| **URL** | `https://www.nhs.uk/conditions/acne/` |
| **Verified** | Yes — fetched 26 Oct 2026. |
| **What it actually says** | Under "Treatments from a GP or specialist": topical retinoid medicines **tretinoin and adapalene** are listed as prescription treatments from a GP or dermatologist. "See a GP if… you have lots of spots, or the spots are deep, painful or causing scars… it's affecting your mental health." |
| **Anchor** | **"NHS guidance on acne"** |
| **Attach to** | H2 #7, line 187 — *"If what you have is painful, deep, or leaving marks, that is a doctor conversation rather than a product swap."* |
| **Sentence** | *"If what you have is painful, deep, or leaving marks, that is a doctor conversation rather than a product swap — [NHS guidance on acne] sets out what a GP can offer that a shelf cannot."* |
| **Why this claim needs support** | Two reasons. First, it is the article's off-ramp; an off-ramp with no authoritative destination is advice. Second, and more usefully: the NHS page independently confirms that retinoids are a **prescription** category, which is the factual spine under H2 #6's advice. One citation, two sections supported. |
| **Bonus alignment** | The NHS page's "Do" list is a near line-for-line match with the article — gentle cleanser twice daily, non-comedogenic products, do not pick or squeeze, do not scrub. Worth knowing that the article is not just defensible but orthodox. |

**Gap this citation exposed — flagging to content-editor.** The NHS page lists **"it's affecting your mental health"** as a reason to see a GP. The article's "See A Dermatologist If" list (lines 205–209) has five criteria and none of them is this. For an audience of 13–19-year-olds, where skin distress and body image are tightly coupled, that is the single most relevant escalation criterion in the source and the article omits it. Adding one bullet — *"Your skin is making you miserable, not just spotty"* — costs nothing and is the most protective line in the piece. I am not editing the draft; this is content-editor's call.

### 5.3 AAD — Sun protection

| Field | Value |
|---|---|
| **URL** | `https://www.aad.org/public/everyday-care/sun-protection` |
| **Verified** | Yes — fetched 26 Oct 2026. Section hub; its child pages are `…/sun-protection/shade-clothing-sunscreen` and `…/sun-protection/sun-damage-skin`. |
| **Anchor** | **"the AAD's sun protection guidance"** |
| **Attach to** | H2 #4, Step 4, line 123 — *"Sunscreen protects the tone you are trying to even out, and it is the one people rush."* |
| **Why this claim needs support** | It is the highest-consequence daily behaviour in the article and the one most likely to be skipped on a grey morning. A reader who does not believe a blog about sunscreen might believe the AAD. |
| **Ranking** | **Third priority. Optional.** If only two citations ship, ship 5.1 and 5.2. |
| **Do not over-claim** | The AAD page supports daily broad-spectrum use. It does **not** support the "two fingers' worth" quantity in the draft, so attach the link to the daily-use sentence, not the quantity sentence. If someone wants the two-finger claim cited, that is a separate search and I have not done it. |

### 5.4 Sources I could not verify — described, not invented

I am listing these because a plausible-looking dead citation in a health article is worse than no citation, and because a future article will want them.

| Source | Status | What to do |
|---|---|---|
| **AAP / HealthyChildren.org** teen skincare or acne page | Not verified. `healthychildren.org` uses `.aspx` paths under `/English/health-issues/conditions/skin/Pages/`, but I did not open one and will not guess a filename. | Search `healthychildren.org acne` and open the result before citing. AAP would be the strongest source for the paediatric angle and is worth the two minutes. |
| **AAD "Acne Management for Teens"** | The AAD article above links to it at `https://www.aad.org/public/diseases/acne/acne-teenage-five-ways-to-help`. **I did not open this URL** — I am reporting a link that appears on a page I did verify. | Fetch it before citing. If it resolves it is a better target than the news page for the acne section. |
| **NHS "Sun safety"** | Not verified. NHS restructured its Live Well section and I do not know the current path. | Search `nhs.uk sun safety` and open the result. |
| **BAD (British Association of Dermatologists) patient leaflet on acne** | Not verified. | Search `bad.org.uk acne patient information`. |
| **CeraVe teen skincare page** | Verified live by keyword-researcher (brief §4.4), and it quotes a named board-certified paediatric dermatologist. | **Do not cite.** It is a brand-partner page and this site has no stock or testing relationship with it. Citing it on a page that deliberately avoids brand names would undercut the article's whole positioning. Noted so nobody "helpfully" adds it later. |

### 5.5 Implementation rules for these citations

- **Inline at the claim, not in a sources list at the bottom.** Three links do not need a block. A "Where this comes from" block becomes worth it at five or more, and at that point it must not become a link farm.
- **Plain follow links.** No `rel="nofollow"`, no `rel="sponsored"`. These are editorial citations; nofollowing them removes the one signal they exist to send.
- **Same tab, no `target="_blank"`.** Standard for citations, better for accessibility and for the back button.
- **Re-verify at publish.** All three were live today. AAD and NHS both restructure; the AAD URL I verified has a `.html` variant floating around in search results, which is the classic sign of a recent migration.
- **One sentence of framing each.** A bare link is a decoration; a link attached to the specific claim it supports is a citation. Each of the three sentences above names what the source says.

---

## 6. User journey link map

```
                        ┌─ Homepage hero card (hardcoded, above the fold)
                        ├─ /quiz result CTA (anchor: "The 7-Step Korean Glass Skin Routine")
   [THIS ARTICLE] ◄─────┼─ /edits index (featured cover story — it is the only post)
                        ├─ /edits/category/skincare (hub card)
                        └─ sitemap.xml (dynamic)

   [THIS ARTICLE] ─────►
        │
        ├─ "who is this / can I trust her"  → /about            ← ADD (§2.1)
        ├─ "what fits my situation"          → /quiz            ← keep
        ├─ "I need this to stick"            → /quotes/small-daily-habits…  ← keep
        ├─ "what do I do now"                → /edits/category/skincare     ← keep, reword (§4.2)
        └─ "I want the mood, not the mirror" → /wallpapers/golden-hour-glow-horizon  ← keep

   Dead ends by design (until the cluster exists):
        ├─ "which products do I buy first"   → no destination
        ├─ "my barrier is already damaged"   → no destination
        ├─ "I'm oily, give me the full version" → no destination
        └─ "niacinamide or vitamin C?"       → no destination
```

Four reader intents on this page currently have nowhere to go. That is the cluster gap expressed as a journey, and it is what §7 fixes.

---

## 7. Cluster architecture — build-order document

### 7.1 The map

```
                    /edits/category/skincare          ← PILLAR (built)
                    "Skincare That Actually Works"
                              │
              ┌───────────────┼───────────────┬──────────────┐
              │               │               │              │
         A1 THIS        A2 beginner      A3 ceramide     A4 oily teen
        (built)          (missing)        (RESERVED)      (missing)
              │               │               │              │
              └───────────────┴───────┬───────┴──────────────┘
                                      │
                          A5 drugstore ─ A6 layering ─ A7 niacinamide
                             (missing)     (missing)      (missing)

   Cross-cluster (do NOT link from this article):
        /edits/study-aesthetic-sanctuary   → Cluster C
        /edits/autumn-capsule-wardrobe     → Cluster B
```

**Node count: 1 of 7 built.** The pillar exists and already links down to all posts and across to the other two hubs (verified, `category/[category].astro:75` and `:104`). The pillar is fine. The spokes are absent, which means this single article is currently carrying 100% of the cluster's topical weight and there is no anchor-text diversity pointing at the hub.

### 7.2 Build order, with the link it unlocks

Ordered by cluster-integrity value, not traffic value. Traffic value may reorder A2 upward.

| # | Node | Slug | Why now | Link this article will gain |
|---|---|---|---|---|
| **A3** | Ceramide barrier repair | `/edits/ceramide-barrier-repair` **(reserved — quiz already links to it)** | Repairs a live 404 in `quiz/index.astro:41`. Every user who gets the "Clean Girl Dew" result currently dead-ends. Highest existing broken-link value on the site. | 1 |
| **A4** | Oily-skin routine for teens | `/edits/skincare-routine-for-oily-skin-teen` | Closes the only sentence in the article that promises content the site does not have (§7.3). | 1 |
| **A6** | Skincare layering order | `/edits/skincare-layering-order` | Resolves the biggest cannibalisation risk in the cluster (§9 of the brief). Until it exists, H2 #3 is doing the standalone article's job. | 1 |
| **A2** | Korean skincare for beginners | `/edits/korean-skincare-routine-for-beginners` | Absorbs the "which products first" intent this article is forbidden to serve. Probably the highest traffic of the six. | 1 |
| **A7** | Niacinamide vs vitamin C | `/edits/niacinamide-vs-vitamin-c` | Lets this article stop at naming the ingredient. | 1 |
| **A5** | Drugstore routine under $50 | `/edits/drugstore-skincare-under-50` | The only node allowed to name products and prices. | 1 |

### 7.3 Exact insertion specs — ready to execute

For each future node: the anchor this article should use, the sentence it attaches to, and where it goes. **Do not insert any of these until the target returns 200.** Each one is a one-line edit at publish time of the sibling.

---

**A2 — Korean skincare for beginners** → `/edits/korean-skincare-routine-for-beginners`

- **Anchor:** `the five-step beginner version`
- **Insert after:** line 127, *"Add it up: 45 plus 50 plus 45 plus 100 is 240 seconds. Four minutes, exactly."*
- **Added sentence:** *"If you want the shorter on-ramp first, [the five-step beginner version] starts with what to buy before it starts with what to do."*
- **Why here:** immediately after the routine is delivered, the reader's next question is "which of these do I actually buy". That is the beginner article's job and this article is forbidden to answer it (brief §9, HIGH cannibalisation risk).
- **Discipline:** the sentence must hand off the *product-selection* question and nothing else. Do not let this become a "what to buy first" section here.

---

**A3 — Ceramide barrier repair** → `/edits/ceramide-barrier-repair`

- **Anchor:** `repairing a damaged skin barrier`
- **Insert after:** line 67, *"Every extra active is one more thing your barrier absorbs."*
- **Added sentence:** *"If yours is already irritated, the order is repair before addition — [repairing a damaged skin barrier] is the longer answer."*
- **Why here:** the barrier is invoked twice (H2 #1, H2 #2) purely as a reason to do *less*. The reader whose barrier is already damaged has no next step. This is where she asks.
- **Discipline:** brief §9 caps this at one paragraph and no heading. The link replaces the explanation you are not allowed to write, which is exactly the right use of a link.

---

**A4 — Oily-skin routine for teens** → `/edits/skincare-routine-for-oily-skin-teen`

- **Anchor:** `an oily-skin routine that doesn't strip your face`
- **Attach to:** line 177 — convert the existing sentence's dangling promise into the anchor.
- **Current text:** *"A full oily-skin routine is a separate article."*
- **⚠️ This is the only broken promise in the draft.** There is no such article. A reader who reads that line today and goes looking finds nothing. Until A4 publishes, reword to something that does not promise a destination: *"A full oily-skin routine is a different article, and a longer one."* Then, at A4's publish, restore the link: *"A full [oily-skin routine that doesn't strip your face] is a separate article."*

---

**A5 — Drugstore routine under $50** → `/edits/drugstore-skincare-under-50`

- **Anchor:** `a drugstore routine under $50`
- **Insert after:** line 117, *"Look for a fragrance-free gel or light cream if you are oily, something a little richer if you are dry. Label, not brand."*
- **Added sentence:** *"If you want the version where someone else has already read the labels, [a drugstore routine under $50] is where I do that."*
- **Why here:** this is the exact point where the article hits the budget wall. It gives criteria and deliberately withholds brands; A5 is the only page allowed to name them.

---

**A6 — Skincare layering order** → `/edits/skincare-layering-order`

- **Anchor:** `skincare layering order, explained without the jargon`
- **Insert after:** line 91, *"A misplaced step does not only underperform; it can stop the step before it from working."*
- **Added sentence:** *"That rule is the whole of it for these seven steps; [skincare layering order, explained without the jargon] is the general version, with the exceptions."*
- **Why here:** end of H2 #3, where the reader has just learned the one rule and can see there is more.
- **⚠️ This is a trim, not an add.** Brief §9 flags H2 #3 as HIGH cannibalisation risk. When A6 publishes, H2 #3 must be **cut**, not just linked — drop the table to three representative rows and point out for the rest. Linking without trimming leaves two pages competing for `how to layer skincare order`, and this article will lose that fight because A6 owns the keyword in its slug.

---

**A7 — Niacinamide vs vitamin C** → `/edits/niacinamide-vs-vitamin-c`

- **Anchor:** `whether teens need niacinamide or vitamin C`
- **Insert after:** line 145, *"A niacinamide or centella serum, or a gentle exfoliant, applied to dry skin after cleansing."*
- **Added sentence:** *"[Whether teens need niacinamide or vitamin C] is a fair question and a separate one; here, the ingredient matters less than the frequency."*
- **Why here:** the article names the ingredient and is forbidden to compare it (brief §9, LOW risk but explicit). A link is the correct substitute for the comparison you are not allowed to write.

### 7.4 Missing connections that no future article will fix

| Missing link | Reality | Recommendation |
|---|---|---|
| Article → sibling, sibling → article | Impossible. No siblings. | Accept. Satisfy on article two. Note it in the changelog so it is not silently dropped. |
| `/edits` → all articles | Works. Verified `getPosts()` merges and `/edits` renders cards. | Nothing to do. |
| Hub → article | Works **only if `category = 'beauty'`**. See §8.2. | Verify the DB value. |
| Wallpaper page → article | Does not exist. Wallpaper pages link only to `/`, `/wallpapers`, download, and other wallpapers. | Low priority. Not worth building for one link. |
| Quote page → article | Does not exist; `small-daily-habits` routes to Cluster C. | Leave it. One cross-cluster hop is healthy. |
| Homepage → hubs | Still an open item (strategy §9, P1). | Partial mitigation already in place: the hero card → this article → hub gives the hub an inbound path from the homepage. Not a substitute for direct homepage→hub links, but it means the hub is not stranded. |

---

## 8. Content health score

### 8.1 Scoring

| Dimension | Weight | As drafted | After this report's fixes | Cluster complete (7 nodes) |
|---|---|---|---|---|
| Topical depth | 25 | 21 | 21 | 21 |
| Link equity flow | 20 | 13 | 15 | 19 |
| Orphan risk | 20 | 17 | 17 | 18 |
| Cluster coverage | 20 | 7 | 7 | 18 |
| Citation quality | 15 | 2 | 12 | 12 |
| **Total** | **100** | **60** | **72** | **88** |

**Topical depth — 21/25.** Eight substantive sections, real timings, a safety section that contradicts the SERP, an honest definition, and a specific off-ramp. Deductions: "essence" is introduced at Step 2 — the most important step — without ever being defined, and a 14-year-old does not know what one is; "non-comedogenic" appears in H2 #7 undefined (the NHS page defines it in six words, which is a hint that it needs defining); and H2 #7 promises an article that does not exist.

**Link equity flow — 13/20.** 4 internal links over 2,199 words is 1.8 per 1,000 — low; 2.5–4 is the working range for informational long-form. Distribution is 1 front / 0 middle / 3 back. The hub link is present, which is the one rule that is satisfiable. No sibling links, which is structural rather than editorial. Rises to 15 with `/about` and to 19 once the middle third has four destinations.

**Orphan risk — 17/20.** **Low, and the concern in the task brief does not materialise.** Verified: `/edits` renders a real card grid from `getPosts()` (`edits/index.astro:172`), so publishing this article turns `/edits` from its "No edits published yet" empty state into a populated index with this article as the **featured cover story** (`featuredPost = posts[0]`, ordered `created_at desc`). The hub lists it via the `category === 'beauty'` filter. The sitemap includes it (`sitemap.xml.ts:47`). The homepage hero card and the quiz result CTA both point at the exact slug. **That is five inbound paths at launch** — this is the best-connected page the site will have.

What "orphan risk" means when there is only one article: the technical definition (zero internal inbound links from indexable pages) does not apply, and the *inverse* problem is the real one — nothing on the site can be orphaned because nothing else exists, but nothing else can reinforce this page either. Deducted 3 for: three of the five inbound paths depend on the same DB row being correct; both hardcoded links are exact-slug matches that break silently if the slug is ever changed; and there is no sibling to provide a second topical inbound link.

**Cluster coverage — 7/20.** 1 of 7 nodes. The pillar is well built and correctly wired; it simply has nothing to link down to. This is the dimension that caps the article's ceiling and no amount of editing this page changes it.

**Citation quality — 2/15.** Zero external citations today, for health-adjacent content read by minors with no reviewer. Two points for the honest "not a doctor" positioning line, which is the right instinct without a source behind it. Rises to 12 with the three verified citations in §5 — not to 15, because there is still no named reviewer and the strongest claim in the article is supported by an AAD news page rather than a clinical guideline.

### 8.2 Publish-time checks that affect whether the links resolve

These are link-integrity items, not general SEO items, so they are mine to flag:

| # | Check | Why it matters to the links |
|---|---|---|
| 1 | `category` must be exactly **`beauty`**, not `skincare` | `CATEGORIES[].dbValue` for the skincare hub is `'beauty'`. If the row says `skincare`, the hub filter misses and the article **disappears from its own pillar**. It still appears on `/edits` and in the sitemap, so the failure is silent. The article page will not crash — `categoryUrl` falls back to `/edits` (`[slug].astro:29`) — so the breadcrumb degrades quietly rather than erroring. This is the single most likely way to ship this article and lose the pillar link. |
| 2 | `slug` must be exactly `glass-skin-korean-routine` | Two hardcoded links depend on it: `Hero.astro:92` and `quiz/index.astro:23`. A different slug breaks both, and both are on high-traffic pages. |
| 3 | `read_time_minutes` must be set | `/edits` and the hub render `{post.read_time_minutes} min read` unguarded. A null renders " min read" on the card that links to this article. The frontmatter has `word_count: 2199` but no `read_time_minutes` — map it (≈9–10). |
| 4 | `is_published = true` | `getPosts()` filters on it. Without it the article is reachable by direct URL only and appears on no index. |
| 5 | `seo.ts:69` fixed | Blocks the hub link per §4.1. |
| 6 | All five internal links return 200 | `/quiz`, `/about`, `/edits/category/skincare`, `/quotes/small-daily-habits-create-massive-transformations`, `/wallpapers/golden-hour-glow-horizon`. Four are confirmed resolvable from source. The quote slug is derived at runtime by `buildQuoteSlugMap()` from the author's theme field — `quoteCopy.ts:51` keys on that slug, which is strong evidence it resolves, but confirm with a 200 rather than assuming. |

---

## 9. Competitive gap

**Epistemic status, stated plainly:** I did **not** run a live SERP. The ranking set below is keyword-researcher's 26 Oct 2026 snapshot from the brief. My observations about what competitors link to are **inferred** from the brief's description of those pages (DTC K-beauty store blogs, product named at every step, ends with a shop link) plus general knowledge of the K-beauty store-blog genre. **I did not crawl their link graphs.** I attempted one verification — a search for the skincarelab.uk page the brief called "the strongest of the set" — and it did not surface in the top five, which I report as an observation about the page's discoverability, not about its content. Treat everything below as directional.

### 9.1 What they link to that we do not, and should not

| Their pattern | Why we cannot copy it |
|---|---|
| Internal links to their own product pages at every step | No stock, no testing capability. Strategy §4.3 bans "best [product]" outright. |
| Internal links to brand collection pages | Same. Also attracts mismatched commercial intent. |
| Named products with outbound links to brand sites | Brand names are banned in this article by design; it is the article's differentiator. |

### 9.2 What they link to that we do not, and should

**Almost nothing — and that is the gap.**

On the pattern the brief describes, the five ranking store blogs cite no health authority at all. Not one of them puts a citation on the retinol claim, because a shop cannot afford to tell a 14-year-old to ask a doctor instead of adding to cart. That leaves the citation layer completely unclaimed on this SERP.

**The gap this article should take:** be the only page on that SERP where the safety claim has a source. Three verified institutional citations (§5) do that, and they cost nothing.

### 9.3 The authority benchmark we cannot match

In the teen-qualified SERP, CeraVe's page quotes a named board-certified paediatric dermatologist. That is the ceiling, and no amount of citation work closes it — a named reviewer beats a linked institution. **Institutional citations are the substitute, not the equivalent.** This is why strategy §9 P3 lists recruiting a qualified reviewer as the strongest available E-E-A-T upgrade, and this report should be read as supporting that item rather than replacing it.

### 9.4 The gap nobody on either SERP has noticed

The brief's §4.2 finding is the most valuable one in the research: **no page is both a genuine glass-skin routine guide and written for a teenager with a timetable.** The link-strategy consequence is that whoever builds the cluster around that intersection first owns it, because the internal links between those pages are what make the intersection legible to a crawler. Right now we have one node of it. Six more and the cluster is the only complete answer to the query in either SERP.

---

## 10. Implementation checklist

**Copy edits (content-editor):**
- [ ] Add `/about` link in paragraph 3, anchor "my editorial standards" (§2.1)
- [ ] Reword line 217 so it does not promise "more" guides on a one-article hub (§4.2)
- [ ] Reword line 177 so it does not promise an oily-skin article that does not exist (§7.3, A4)
- [ ] Attach the AAD citation to the retinol paragraph (§5.1)
- [ ] Attach the NHS citation to the acne off-ramp (§5.2)
- [ ] Optionally attach the AAD sun protection citation to Step 4 (§5.3)
- [ ] Consider adding a mental-health bullet to "See A Dermatologist If" (§5.2)

**Code (whoever ships):**
- [ ] `src/config/seo.ts:69` — replace the description per seo-optimizer's MF-1
- [ ] `src/config/seo.ts:67` — consider the hub H1 (§4.3, optional)
- [ ] Verify `category = 'beauty'` in the DB row (§8.2 item 1)
- [ ] Set `read_time_minutes` (§8.2 item 3)

**Verification before publish:**
- [ ] All 5 internal links return 200
- [ ] All 2 external links return 200 (re-verify; AAD has a `.html` variant in circulation) — see §12.7 for the final two
- [ ] No external link uses `nofollow` or `target="_blank"`
- [ ] No internal link uses an absolute `www.teentimeglow.me` URL
- [ ] Anchor text on all 7 links is descriptive — no "click here", no bare URLs
- [ ] No paragraph contains more than 2 links
- [ ] Confirm the article appears on `/edits` **and** `/edits/category/skincare` after publish
- [ ] Confirm the homepage hero card and the quiz "Sunset Muse" result both resolve

**Post-publish (backfill, not this article's job):**
- [ ] Add the A3 ceramide link when that article publishes — it also repairs a live quiz 404
- [ ] Add the four remaining cluster links per §7.3 as each node ships
- [ ] Trim H2 #3 when A6 publishes — link *and* cut, not just link
- [ ] Satisfy the "2–3 sibling links" rule on article two and record that it was not satisfiable on article one

---

## 11. What I could not verify

| Claim | Status |
|---|---|
| Live SERP composition for this cluster | **Not checked by me.** From keyword-researcher's 26 Oct 2026 snapshot. |
| Competitors' outbound link profiles | **Inferred, not crawled.** See §9 preamble. |
| AAP / HealthyChildren.org URL | **Not verified.** Described in §5.4, not guessed. |
| AAD "Acne Management for Teens" URL | **Not opened.** Appears as a link on a page I did verify. |
| NHS "Sun safety" URL | **Not verified.** NHS restructured Live Well. |
| `/quotes/small-daily-habits-create-massive-transformations` resolves | **Strong indirect evidence, not a 200.** `quoteCopy.ts` keys on that exact slug; the slug itself is derived at runtime from the author's theme field. Confirm with a request. |
| Whether the article actually renders after Markdown→HTML conversion | **Not checked.** I read the `.md` draft, not a build. The links are standard Markdown and should convert to `<a>`; nobody has confirmed that. |

---

*Report ends. No draft file was modified.*

---

## 12. Post-integration re-audit — 26 October 2026

The draft was integrated after this report was delivered. I re-read the integrated file (`word_count: 2151`, `read_time_minutes: 9`, frontmatter marked FINAL) and re-audited the link layer. **Five of my six recommendations landed correctly. The citation layer picked up two defects during integration, one of which is mine.**

### 12.1 What landed correctly

| Recommendation | Status |
|---|---|
| `/about` in paragraph 3, anchor "my editorial standards" | ✅ line 35 — anchor and placement exactly as specified |
| Reword the hub CTA off "there are more" | ✅ line 224 — now "sits in the skincare guides for teens hub, which is where I keep everything I write about skin". True today and true at 20 articles. |
| AAD citation on the retinol claim | ✅ line 171 — best placement in the article |
| H3 renamed to "See A Doctor If" | ✅ line 209 |
| Mental-health bullet added, last, before the closer | ✅ line 216 |
| Internal link count 4 → 5 | ✅ verified, 5 links at lines 35, 75, 207, 224 |
| Distribution | 2 front / 0 middle / 3 back — as predicted in §3. The middle gap is structural and closes with the cluster. |

**Internal link layer: clean. No further changes recommended.**

### 12.2 Defect 1 — the AAD URL is linked twice

| Line | Anchor | URL |
|---|---|---|
| 71 | "the AAD describes" | `https://www.aad.org/news/dermatologist-guide-skincare` |
| 171 | "The AAD's guidance" | `https://www.aad.org/news/dermatologist-guide-skincare` — **same URL** |

Two problems, and this is the anti-pattern §1.2 of this report tells you to avoid:

1. **Duplicate destination.** Google discounts repeat links to the same URL; the second one passes close to nothing. The article now spends two link slots to send one signal.
2. **The line-71 anchor is not descriptive.** "the AAD describes" describes an *action*, not a destination. A reader cannot tell what they are clicking. This is the one anchor in the article that breaks the rule in §1.2.

**Fix: cut the link at line 71, keep the plain text.** The claim there ("thinner, more sensitive, and more prone to irritation than adult skin") is real but it is not load-bearing — the retinol claim at line 171 is, and it keeps the citation. Deleting one link is a better outcome than any rewording.

### 12.3 Defect 2 — the NHS citation is jurisdictionally wrong, and the copy went British with it

**This one is mine.** I recommended the NHS acne page in §5.2 without checking the article's audience. It is:

- **US English throughout** — American spelling by instruction, plus "bus", "drugstore", "fall", "dorm".
- **US-audience content** — the strategy doc's own keyword list is `aesthetic wallpapers for iphone`, `fall outfit ideas for school`, `dorm room decor ideas`, and the budget node is `$50`.

The integrated line 193 reads:

> [The NHS acne guidance](https://www.nhs.uk/conditions/acne/) is the plainest place to check what a pharmacist can help with and what needs a **GP**.

**"GP" is British.** An American teenager does not have one; they have a doctor, a primary care physician or a dermatologist. So the citation I recommended has put a British institution and a British job title into a US-targeted article, in the paragraph immediately before the safety list. That is precisely the dialect failure content-editor is running a lexicon pass to prevent, and I introduced it.

It also collides with the article's own consistency: line 171 says "if a **dermatologist** suggests it", line 209 says "See A **Doctor** If", and line 193 says "**GP**". Three names for one idea within forty lines.

**Fix: swap the NHS page for a verified AAD page.** I fetched and confirmed this one live on 26 Oct 2026:

| Field | Value |
|---|---|
| **URL** | `https://www.aad.org/public/diseases/acne/acne-teenage-five-ways-to-help` |
| **Title** | "5 ways to help your teenager survive acne" |
| **Type** | AAD patient-education page — a **stronger** citation class than the news release used at line 171 |
| **Supports** | "Without treatment, acne sometimes becomes severe. When severe acne clears, it can leave **permanent acne scars**." And point 4, "Watch for signs of depression": "having acne can lead to depression, anxiety, or both… it may be time to see a **dermatologist**." |

**Recommended replacement for line 193 — superseded by §12.7, which corrects an overstatement in the version below.**

> ~~If what you have is painful, deep, or leaving scars, that is a doctor conversation rather than a product swap. [The AAD's guidance for teen acne](https://www.aad.org/public/diseases/acne/acne-teenage-five-ways-to-help) is blunt about why: untreated acne can leave permanent scars, and it treats the mood side as part of the problem rather than a side effect.~~

**What was wrong with my draft:** "untreated acne can leave permanent scars" is a compression the source does not license. The page says *"When **severe** acne clears, it can leave permanent acne scars."* That is the exact error class this report warns about in §5.1 — extending a claim past what is quoted — and content-editor caught it by fetching the page rather than trusting me. Corrected version in §12.7.

That single sentence does five jobs:

1. Kills **"GP"**.
2. Fixes **"leaving marks" → "leaving scars"** — which also repairs an inconsistency introduced during integration: line 211 already says "pimples that are leaving **scars**", so lines 193 and 211 currently use different words for the same clinical outcome.
3. Uses a **US** authority with **US** vocabulary.
4. Sources the **mental-health bullet** added at line 216, which is currently the most sensitive line in the article and has nothing behind it. No separate link is needed on the bullet itself — keep that list clean.
5. Stays accurate. Note carefully what the AAD page does **not** say: it does not name "painful or deep" as a trigger the way the NHS page did. It supports **scarring** and **mood**. So do not hang the "painful or deep" clause on this citation — attach the link to the scarring-and-mood sentence, exactly as above.

**The trade-off, stated honestly.** This takes the article to **all-AAD citations** — two unique URLs, one domain. That is less institutional diversity than AAD + NHS. I am recommending it anyway because AAD is the correct authority for US teen skincare and three links to one authoritative body for three different claims is not a link scheme. If Rini wants the diversity back, the answer is **AAP / HealthyChildren.org** — but I searched for a specific acne page and could not confirm a URL, so per §5.4 it stays a to-do, not a recommendation. Do not guess it.

### 12.4 Citation count in the frontmatter is wrong

Frontmatter line 18–19 claims *"Added 3 external citations… AAD teen skincare guide…, NHS acne page"*. Reality at the time of the integrated draft: **three link instances, two unique URLs, and only two sources named.**

After §12.2 and §12.7 the final state is **2 external links, 2 unique URLs, no NHS page**. The frontmatter note must be rewritten to match, because it is the only record of what was verified and when — and a note claiming three citations when the body has two is the kind of small untruth that a reviewer finds and then distrusts everything else on the page. Suggested replacement for lines 18–20:

> Added 2 external citations, each fetched and verified live on 26 Oct 2026:
> the AAD's dermatologist guide (developing skin, retinol) and the AAD's acne
> guidance for parents (severe-acne scarring, signs of depression). Both support
> the article's core thesis: "consistency matters more than a 10-step routine" —
> Marisa Garshick, MD, FAAD.

An earlier draft cited the NHS acne page. It was removed, not because it is wrong but because this is a US-audience article with US vocabulary and the NHS is a UK health system. Record the removal rather than silently deleting it — a future editor will otherwise re-add it.

### 12.5 Two copy items still open (content-editor's, flagged not fixed)

| Line | Issue |
|---|---|
| 183 | *"A full oily-skin routine is a separate article."* — **the last dangling promise in the draft.** No such article exists. Agreed wording was *"…is its own topic."* It did not make it into the integrated file. |
| 214 | *"Anything is scarring"* is ungrammatical in any dialect, and it now duplicates line 211's "pimples that are leaving scars". Two scarring criteria in a six-item list, one of them broken English. Merge them. |

### 12.6 Revised link scorecard

| | As drafted | Integrated (now) | After §12.2 + §12.3 |
|---|---|---|---|
| Internal links | 4 | **5** ✅ | 5 |
| External links (instances) | 0 | 3 | 2 |
| External links (unique) | 0 | **2** | 2 |
| Duplicate destinations | — | **1** | 0 |
| Non-descriptive anchors | 0 | **1** | 0 |
| Citation quality | 2/15 | 9/15 | **12/15** |
| **Content health** | **60** | **66** | **72** |

The integrated draft scores 66 rather than the 72 predicted in §8.1 because the duplicate URL and the jurisdiction mismatch cancel most of the citation gain. Both fixes are one-line edits.

### 12.7 Final citation state — after content-editor's verification

content-editor fetched the AAD page independently and made three corrections. All three are accepted; one is a correction to me.

**Correction 1 — my wording overstated the source.** I wrote "untreated acne can leave permanent scars". The page says *"When **severe** acne clears, it can leave permanent acne scars."* The qualifier is **severe**, not untreated. This is the failure mode §5.1 warns about in my own words — extending a claim past what is quoted — and it is worth recording that it happened in the recommendation rather than in the article.

**Correction 2 — the page is addressed to parents, and my anchor hid that.** It says "your teenager", "if your teen seems upset", "be cautious about reminding your teen". Anchoring it as "guidance for teen acne" to a 15-year-old is a register mismatch: it presents a parent-facing document as if it were written for the reader. The fix is better than the original, because it turns an awkward mismatch into an action:

**Final agreed sentence for line 193:**

> If what you have is painful, deep, or leaving scars, that is a doctor conversation rather than a product swap. The AAD's [advice for parents of teens with acne](https://www.aad.org/public/diseases/acne/acne-teenage-five-ways-to-help) is worth showing to yours: severe acne can leave permanent scars, and it lists the signs of depression as a reason to get treatment.

**One residual fix — the pronoun.** content-editor's draft read "…and **they** list the signs of depression". The nearest plural antecedent is "yours" (your parents), not the AAD, so "they" reads as the parents. "…and **it** lists" or "…and the AAD lists" removes the ambiguity. This matters more than it looks: the whole point of the sentence is that the authority, not Rini and not the parent, says mood counts.

**Correction 3 — drop the NHS link, do not replace it.** I recommended swapping NHS → AAD. content-editor's stronger position is that the NHS link should simply go, and they are right: line 187 defines "non-comedogenic" inline, so nothing in the article is left uncited by the removal. The NHS page's two unique contributions were the severity triad ("deep, painful or causing scars") and the mental-health trigger. The first is carried by the article's own escalation list without needing a citation; the second is now carried by the AAD page. **NHS is redundant. Delete it.**

**Final external link inventory — 2 links, 2 unique URLs, 1 domain:**

| Line | Anchor | Destination | Job |
|---|---|---|---|
| 171 | "The AAD's guidance" | `aad.org/news/dermatologist-guide-skincare` | Retinol is not for this age group; where it is, a dermatologist decides |
| 193 | "advice for parents of teens with acne" | `aad.org/public/diseases/acne/acne-teenage-five-ways-to-help` | Severe acne scars; mood counts as a reason to get treatment |

Plus: **delete the duplicate AAD link at line 71** (§12.2). That leaves 2 external links against 5 internal — a healthy ratio, one citation per major safety claim, and no duplicate destinations.

**On domain diversity — closing the loop honestly.** All citations are now AAD. I flagged the monotony cost in §12.3; content-editor's judgement is that two AAD links is right for a first article, and I accept it. The diversity path remains **AAP / HealthyChildren.org**, and it remains **unverified** — I searched for a specific acne page and could not confirm a URL. It stays a to-do for a later article, not a publish blocker, and nobody should guess it.

**One strategic upside worth recording.** Because the line-193 source is parent-facing, it is the only link in the article aimed at a *second* reader. Teens forward articles to parents, and parents search "teen skincare" independently. A parent-facing authority link is the one asset on the page that serves both audiences without splitting the voice. That is worth remembering when the cluster's `skincare routine for 13 year old` node gets written — that node should be built parent-facing from the start.

**Also settled:** content-editor's list merge — line 211 becomes *"You have painful or cystic acne, or anything that is leaving a scar"* and line 214 ("Anything is scarring") is deleted. Five parallel criteria, no duplication, mood bullet still last before the reassurance.

**Corrected scorecard.** With the duplicate removed, NHS dropped, the overstatement fixed and the parent-facing anchor in place:

| | Integrated (as delivered to me) | After §12.2 + §12.7 |
|---|---|---|
| Internal links | 5 | 5 |
| External links (instances / unique) | 3 / 2 | **2 / 2** |
| Duplicate destinations | 1 | **0** |
| Non-descriptive anchors | 1 | **0** |
| Claims overstated vs source | 1 | **0** |
| Citation quality | 9/15 | **12/15** |
| **Content health** | **66** | **72** |

*Addendum ends.*
