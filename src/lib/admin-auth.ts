import crypto from 'node:crypto';

/**
 * Admin authentication — one module, used by middleware and the login/logout
 * routes. Sessions are HMAC-signed opaque tokens:
 *
 *   token := <expiry_epoch>.<hmac_sha256("v1:<expiry>", ADMIN_SECRET_KEY)>
 *
 * Nothing about the passcode ever lives in the cookie. Expiry is enforced
 * even if a cookie is replayed. Global "revocation" is deliberate: rotating
 * ADMIN_SECRET_KEY invalidates every outstanding session at once (the
 * honest trade for a single-admin site on stateless serverless functions —
 * a DB-backed per-session denylist would require a live migration).
 */

export const ADMIN_SESSION_COOKIE = 'ttg_admin_session';

const TTL_REMEMBER = 60 * 60 * 24 * 30; // 30 days
const TTL_SESSION = 60 * 60 * 24 * 7; // 7 days

export class AdminConfigError extends Error {}

function getAdminSecret(): string {
  const secret = (process.env.ADMIN_SECRET_KEY || '').trim();
  if (secret.length < 16) {
    throw new AdminConfigError(
      'ADMIN_SECRET_KEY is missing or too weak. Set a long random value (e.g. `openssl rand -base64 32`) in .env and Vercel env vars.'
    );
  }
  return secret;
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', getAdminSecret()).update(payload).digest('hex');
}

export function createSessionToken(rememberMe: boolean): { value: string; maxAge: number } {
  const maxAge = rememberMe ? TTL_REMEMBER : TTL_SESSION;
  const exp = String(Math.floor(Date.now() / 1000) + maxAge);
  const mac = sign(`v1:${exp}`);
  return { value: `${exp}.${mac}`, maxAge };
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const dot = token.indexOf('.');
  if (dot < 1) return false;
  const exp = token.slice(0, dot);
  const mac = token.slice(dot + 1);
  if (!/^\d+$/.test(exp)) return false;
  const expected = Buffer.from(sign(`v1:${exp}`), 'hex');
  const given = Buffer.from(mac, 'hex');
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) {
    return false;
  }
  return Number(exp) > Math.floor(Date.now() / 1000);
}

/** True only when an explicit valid ADMIN_SECRET_KEY was configured and supplied. */
export function verifyAdminPassword(input: unknown): boolean {
  const secret = getAdminSecret();
  const given = crypto.createHash('sha256').update(String(input || '')).digest();
  const expected = crypto.createHash('sha256').update(secret).digest();
  return crypto.timingSafeEqual(given, expected);
}

export function setSessionCookie(cookies: AstroCookies, rememberMe: boolean): void {
  const session = createSessionToken(rememberMe);
  cookies.set(ADMIN_SESSION_COOKIE, session.value, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: session.maxAge
  });
}

type AstroCookies = {
  set: (name: string, value: string, options: Record<string, unknown>) => void;
  delete?: (name: string, options: Record<string, unknown>) => void;
};
