import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import bcrypt from 'npm:bcryptjs@2.4.3';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { username, password } = await req.json();

    if (!username || !password) {
      return Response.json({ error: 'Username and password are required' }, { status: 400 });
    }

    // Buscar usuario
    const users = await base44.asServiceRole.entities.AppUser.filter({ username, is_active: true });
    
    if (!users || users.length === 0) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const user = users[0];

    // Verificar password con bcryptjs
    const passwordMatch = bcrypt.compareSync(password, user.password_hash);
    
    if (!passwordMatch) {
      return Response.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Crear sesión (7 días)
    const sessionToken = crypto.randomUUID() + '-' + crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    await base44.asServiceRole.entities.AppSession.create({
      user_id: user.id,
      session_token: sessionToken,
      expires_at: expiresAt
    });

    return Response.json({
      session_token: sessionToken,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
        preferred_language: user.preferred_language
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});