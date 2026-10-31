/**
 * Stored-XSS defense for admin-authored rich text (PRD security row /
 * brain/security.md § 3). Runs server-side before any `set:html` render.
 *
 * Designed to be zero-dependency, lightweight, and completely safe for
 * serverless runtimes (avoiding the massive jsdom/isomorphic-dompurify
 * bundles that crash on Vercel AWS Lambda / Node 22).
 *
 * Strips script tags, style sheets, embed vectors, forms, inline event handlers,
 * and malicious URI schemes (javascript:, vbscript:, data:text/html).
 */

const DANGEROUS_TAGS_WITH_CONTENT = /<\s*(script|style|iframe|object|embed|applet|noscript|svg|math)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi;
const STANDALONE_DANGEROUS_TAGS = /<\s*(script|style|iframe|object|embed|applet|meta|link|base|form|input|button)\b[^>]*\/?>/gi;
const CLOSING_DANGEROUS_TAGS = /<\s*\/\s*(form|button)\s*>/gi;
const EVENT_HANDLER_ATTRS = /\s+on[a-zA-Z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const DANGEROUS_PROTOCOLS = /\s+(href|src)\s*=\s*(?:"\s*(?:javascript|vbscript|data:text\/html):[^"]*"|'\s*(?:javascript|vbscript|data:text\/html):[^']*'|[^\s>]*(?:javascript|vbscript):[^\s>]*)/gi;

export function sanitizeArticleHtml(html: string): string {
  if (!html || typeof html !== 'string') return '';
  try {
    return html
      .replace(DANGEROUS_TAGS_WITH_CONTENT, '')
      .replace(STANDALONE_DANGEROUS_TAGS, '')
      .replace(CLOSING_DANGEROUS_TAGS, '')
      .replace(EVENT_HANDLER_ATTRS, '')
      .replace(DANGEROUS_PROTOCOLS, '');
  } catch (err) {
    console.error('Failed to sanitize article HTML safely:', err);
    return '';
  }
}
