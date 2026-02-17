import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { session_token } = await req.json();

    if (!session_token) {
      return Response.json({ error: 'Session token required' }, { status: 401 });
    }

    // Buscar sesión válida
    const sessions = await base44.asServiceRole.entities.AppSession.filter({ session_token });
    
    if (!sessions || sessions.length === 0) {
      return Response.json({ error: 'Invalid session' }, { status: 401 });
    }

    const session = sessions[0];

    // Verificar expiración
    if (new Date(session.expires_at) < new Date()) {
      await base44.asServiceRole.entities.AppSession.delete(session.id);
      return Response.json({ error: 'Session expired' }, { status: 401 });
    }

    // Obtener usuario
    const users = await base44.asServiceRole.entities.AppUser.filter({ id: session.user_id, is_active: true });
    
    if (!users || users.length === 0) {
      return Response.json({ error: 'User not found' }, { status: 401 });
    }

    const user = users[0];

    return Response.json({
      id: user.id,
      username: user.username,
      role: user.role,
      preferred_language: user.preferred_language
    });

  } catch (error) {
    console.error('Auth me error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});