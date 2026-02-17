import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import bcrypt from 'npm:bcryptjs';

Deno.serve(async (req) => {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ error: 'Email y contraseña requeridos' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    // Buscar usuario por email
    const users = await base44.asServiceRole.entities.AppUser.filter({ email });
    
    if (!users || users.length === 0) {
      return Response.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    const user = users[0];

    // Verificar estado
    if (user.status === 'pending_activation') {
      return Response.json({ 
        error: 'Cuenta pendiente de activación',
        status: 'pending_activation'
      }, { status: 403 });
    }

    if (user.status === 'disabled' || !user.is_active) {
      return Response.json({ error: 'Cuenta deshabilitada' }, { status: 403 });
    }

    // Verificar contraseña
    const isValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isValid) {
      return Response.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    // Crear sesión
    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    await base44.asServiceRole.entities.AppSession.create({
      user_id: user.id,
      session_token: sessionToken,
      expires_at: expiresAt
    });

    return Response.json({
      session_token: sessionToken,
      user: {
        id: user.id,
        username: user.username || user.email,
        email: user.email,
        role: user.role,
        preferred_language: user.preferred_language
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});