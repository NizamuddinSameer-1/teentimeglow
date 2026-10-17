import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { password } = await request.json();
    const expectedSecret = process.env.ADMIN_SECRET_KEY || 'rini-glow-2026';

    if (!password || password.trim() !== expectedSecret.trim()) {
      return new Response(JSON.stringify({ error: 'Invalid admin credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Set admin session cookie valid for 7 days
    cookies.set('ttg_admin_session', expectedSecret, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
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
