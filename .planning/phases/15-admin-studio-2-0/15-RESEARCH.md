# Phase 15: Admin Studio 2.0 — Research

## Implementation Approach
Deliver an elevated creator cockpit in `/admin` empowering Rini with zero-friction article formatting and full dynamic quiz authoring.

1. **Caret-Preserving In-Between Image Upload**:
   - `contenteditable` browsers lose focus when an `<input type="file">` opens.
   - Solution: Capture `const range = window.getSelection().getRangeAt(0).cloneRange()` immediately before opening the file picker.
   - On upload success from `/api/admin/upload`, restore selection via `sel.removeAllRanges(); sel.addRange(savedRange)`.
   - Insert an `<img>` element directly via `savedRange.insertNode(img)` followed by a trailing `<p><br></p>` so typing resumes smoothly underneath.

2. **Affiliate Hyperlink Dialog**:
   - Rather than browser's crude `prompt()`, use a branded modal overlay.
   - Captures: `href` (valid URL), `anchor text`, and automatically attaches `target="_blank" rel="sponsored noopener"`.
   - Prevents Google SEO ranking penalties by complying with Google Search Central guidelines on affiliate links (`rel="sponsored"`).

3. **Dynamic Interactive Quiz Builder**:
   - Quizzes in TeenTimeGlow map options to archetype keys (`sunset_muse`, `clean_girl`, `cozy_vanilla`, `downtown`).
   - The admin UI requires an interactive question builder:
     - Question input + indicator badge (e.g. "Morning Routine")
     - Dynamic option rows (add option button, remove option button)
     - Archetype selector dropdown per option
     - Question photo / option photo upload button
   - Persisted via `POST /api/admin/quizzes` to `quizzes`, `quiz_questions`, and `quiz_options` in Supabase (or structured JSON storage with fallbacks).

4. **Draft vs. Published Toggle & Live Previews**:
   - Visual toggle switch between "🟢 Live (Published)" and "🟡 Draft (Hidden from Public)".
   - Instant client-side modal preview rendering HTML through the exact reader styling found in `/edits/[slug]`.

## Libraries & Tools
| Library / API | Purpose | Why | Confidence | Source |
|---|---|---|---|---|
| DOM Selection & Range API | Preserving cursor & inserting nodes | Native browser API; 100% reliable across browsers without external deps | HIGH | [MDN Range.insertNode](https://developer.mozilla.org/en-US/docs/Web/API/Range/insertNode) |
| `@supabase/supabase-js` | Database persistence | Existing project client; handles auth & transactional writes | HIGH | Existing codebase (`src/lib/supabase.ts`) |
| Astro APIRoute | Serverless endpoints | Handles multipart photo uploads and JSON payloads | HIGH | Existing codebase (`src/pages/api/admin/`) |

## Patterns to Follow
- **Range Restoration Pattern**:
  ```javascript
  let savedCaretRange = null;
  function captureSelection() {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      savedCaretRange = sel.getRangeAt(0).cloneRange();
    }
  }
  function restoreAndInsert(node) {
    if (!savedCaretRange) return;
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(savedCaretRange);
    savedCaretRange.insertNode(node);
  }
  ```
- **Affiliate Link Sanitization**:
  Ensure URLs begin with `https://` or `http://` and include `rel="sponsored noopener"` for Google affiliate compliance.

## Pitfalls to Avoid
- **Pitfall 1**: Overwriting file input innerHTML when displaying "Uploading...".
  *Fix*: Place a dedicated status spinner or indicator next to the button rather than replacing the label's child nodes.
- **Pitfall 2**: Loose question ordering in dynamic forms.
  *Fix*: Maintain an in-memory array `questions = [{ id, text, options: [...] }]` and re-render cleanly on add/remove, syncing to a single hidden input or form submission payload.
- **Pitfall 3**: Losing draft work on accidental page reload.
  *Fix*: Auto-save drafts to `localStorage.getItem('ttg_admin_draft_post')`.

---
*Researched: 2026-10-21*
