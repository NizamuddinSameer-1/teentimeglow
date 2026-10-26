import type { MiddlewareHandler } from 'astro';
import { ADMIN_SESSION_COOKIE, isValidSessionToken } from '@/lib/admin-auth';

/**
 * Route guard for the whole admin surface. This is the only auth check in
 * the app — API routes and pages no longer duplicate it.
 *
 * Exempt: /admin/login (must be reachable signed out) and /api/admin/login
 * plus /api/admin/logout (login authenticates itself; logout must always be
 * able to clear the cookie).
 */
export const onRequest: MiddlewareHandler = async (context, next) => {
  const path = context.url.pathname.replace(/\/+$/, '') || '/';

  if (path === '/admin/login') return next();
  if (path === '/api/admin/login' || path === '/api/admin/logout') return next();

  const token = context.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const signedIn = (() => {
    try {
      return isValidSessionToken(token);
    } catch (err) {
      // Missing/misconfigured ADMIN_SECRET_KEY fails closed.
      console.error('[middleware] session validation error:', err);
      return false;
    }
  })();

  if (path.startsWith('/api/admin')) {
    if (!signedIn) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Admin session required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return next();
  }

  if (path === '/admin' || path.startsWith('/admin/')) {
    if (!signedIn) {
      return context.redirect('/admin/login');
    }
  }

  return next();
};
