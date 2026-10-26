import type { APIRoute } from 'astro';
import { ADMIN_SESSION_COOKIE, AdminConfigError, setSessionCookie, verifyAdminPassword } from '@/lib/admin-auth';
import { clientIp, isRateLimited } from '@/lib/rate-limit';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  const ip = clientIp(request);

  if (isRateLimited(`login:${ip}`, 5, 10 * 60 * 1000)) {
    return new Response(JSON.stringify({ error: 'Too many failed attempts. Try again in a few minutes.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { password, rememberMe } = await request.json();

    if (!verifyAdminPassword(password)) {
      return new Response(JSON.stringify({ error: 'Incorrect passcode.' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Signed HttpOnly session token; never store the passcode itself.
    setSessionCookie(cookies, rememberMe === true);

    return new Response(JSON.stringify({
      success: true,
      message: 'Authentication successful. Welcome, Rini!'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    if (err instanceof AdminConfigError) {
      return new Response(JSON.stringify({ error: 'Server not configured: set ADMIN_SECRET_KEY before signing in.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    return new Response(JSON.stringify({ error: 'Login failed' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
