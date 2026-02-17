import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { session_token, language } = await req.json();

    if (!session_token || !language) {
      return Response.json({ error: 'Session token and language are required' }, { status: 400 });
    }

    if (!['es', 'en', 'pt'].includes(language)) {
      return Response.json({ error: 'Invalid language' }, { status: 400 });
    }

    // Buscar sesión válida
    const sessions = await base44.asServiceRole.entities.AppSession.filter({ session_token });
    
    if (!sessions || sessions.length === 0) {
      return Response.json({ error: 'Invalid session' }, { status: 401 });
    }

    const session = sessions[0];

    // Verificar expiración
    if (new Date(session.expires_at) < new Date()) {
      return Response.json({ error: 'Session expired' }, { status: 401 });
    }

    // Actualizar idioma del usuario
    await base44.asServiceRole.entities.AppUser.update(session.user_id, {
      preferred_language: language
    });

    return Response.json({ success: true });

  } catch (error) {
    console.error('Set language error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});