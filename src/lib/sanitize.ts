import DOMPurify from 'isomorphic-dompurify';

/**
 * Stored-XSS defense for admin-authored rich text (PRD security row /
 * brain/security.md §3). Runs server-side before any `set:html` render.
 *
 * Editorial HTML comes from the admin rich-text editor on a service-role
 * API, so allow standard editorial tags but drop inline styles, scripts and
 * every event handler vector.
 */
const SANITIZE_CONFIG = {
  USE_PROFILES: { html: true },
  FORBID_TAGS: ['style', 'form', 'input', 'button'],
  FORBID_ATTR: ['style', 'onerror', 'onload', 'onclick']
} as const;

export function sanitizeArticleHtml(html: string): string {
  if (!html) return '';
  return DOMPurify.sanitize(html, SANITIZE_CONFIG);
}
