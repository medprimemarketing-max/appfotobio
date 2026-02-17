import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { session_token } = await req.json();

    if (!session_token) {
      return Response.json({ error: 'Session token required' }, { status: 400 });
    }

    // Buscar y eliminar sesión
    const sessions = await base44.asServiceRole.entities.AppSession.filter({ session_token });
    
    if (sessions && sessions.length > 0) {
      await base44.asServiceRole.entities.AppSession.delete(sessions[0].id);
    }

    return Response.json({ success: true });

  } catch (error) {
    console.error('Logout error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});