import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { password, rememberMe } = await request.json();
    const expectedSecret = process.env.ADMIN_SECRET_KEY || 'rini-glow-2026';
    const trimmedInput = String(password || '').trim();

    // Accept either full secret key or convenient 4-digit PIN (2026)
    const isValid = trimmedInput === expectedSecret.trim() || trimmedInput === '2026';

    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Incorrect passcode. Try rini-glow-2026 or 2026' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Set admin session cookie: 30 days if rememberMe, otherwise 7 days
    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;
    cookies.set('ttg_admin_session', expectedSecret, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Authentication successful. Welcome, Rini!'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || 'Login error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
