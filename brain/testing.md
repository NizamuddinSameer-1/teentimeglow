# Quality Assurance & Testing Playbook — Rini TheTeen

This guide enforces automated testing to guarantee that **no image ever fails to load** and that the site maintains a **95+ Lighthouse performance score**.

---

## 1. Automated "Zero Broken Images" Test (Playwright)

To directly solve the issue where *"most websites show error to show the image"*, this automated test crawls every page and verifies that every single image loads with HTTP 200 and renders with non-zero dimensions.

Create `tests/e2e/images.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

const ROUTES_TO_TEST = [
  '/',
  '/blog',
  '/rankings',
  '/quizzes',
  '/community',
  '/wallpapers',
  '/stories-and-memes',
];

test.describe('Zero Broken Images Verification', () => {
  for (const route of ROUTES_TO_TEST) {
    test(`Verify all images on ${route} render cleanly`, async ({ page }) => {
      await page.goto(`http://localhost:4321${route}`, { waitUntil: 'networkidle' });

      const images = await page.locator('img').all();
      expect(images.length).toBeGreaterThan(0);

      for (const img of images) {
        // 1. Verify src attribute exists
        const src = await img.getAttribute('src');
        expect(src).toBeTruthy();

        // 2. Verify image loaded in browser and has non-zero natural width
        const naturalWidth = await img.evaluate(
          (node: HTMLImageElement) => node.naturalWidth
        );
        expect(naturalWidth).toBeGreaterThan(0);

        // 3. Verify image complete property is true
        const isComplete = await img.evaluate(
          (node: HTMLImageElement) => node.complete
        );
        expect(isComplete).toBe(true);
      }
    });
  }
});
```

---

## 2. Lighthouse Performance & Web Vitals Audit

Run Lighthouse CI (`lighthouserc.json`) to guarantee sub-second speed:

```json
{
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "url": [
        "http://localhost:4321/",
        "http://localhost:4321/blog",
        "http://localhost:4321/wallpapers"
      ]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.95 }],
        "cumulative-layout-shift": ["error", { "maxNumericValue": 0.05 }],
        "first-contentful-paint": ["error", { "maxNumericValue": 1000 }]
      }
    }
  }
}
```

---

## 3. Core User Journey E2E Tests

### Test 1: Wallpaper 1-Click Download Flow
* User navigates to `/wallpapers`.
* Taps "Download" on first wallpaper.
* Verifies browser initiates file download without page errors or broken redirects.

### Test 2: Quiz Player Completion
* User opens `/quizzes/aesthetic-vibe`.
* Answers all questions in order.
* Verifies final outcome card is rendered with outcome badge and share button.

### Test 3: Community Submission Quarantine
* User submits photo with name and caption on `/community`.
* Verifies success message is displayed.
* Verifies submission does **not** appear on live gallery until approved.
* Admin approves submission in `/admin`.
* Verifies photo now displays live on `/community`.

---

## 4. Manual Smoke Test Checklist for Rini (Admin)

Before publishing:
- [ ] Open `/admin` on smartphone (Safari or Chrome).
- [ ] Log in with Rini's email & password.
- [ ] Create a draft post with 2 photos; confirm photos appear in preview.
- [ ] Tap "Publish"; verify article shows on `/blog`.
- [ ] Review pending community submissions; approve one; verify it displays on `/community`.
