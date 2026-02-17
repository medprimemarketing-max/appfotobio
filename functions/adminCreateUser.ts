import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import * as bcrypt from 'https://deno.land/x/bcrypt@v0.4.1/mod.ts';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { admin_session_token, username, password, role = 'user' } = await req.json();

    if (!admin_session_token || !username || !password) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verificar que el que llama sea admin
    const sessions = await base44.asServiceRole.entities.AppSession.filter({ session_token: admin_session_token });
    
    if (!sessions || sessions.length === 0) {
      return Response.json({ error: 'Invalid session' }, { status: 401 });
    }

    const adminUsers = await base44.asServiceRole.entities.AppUser.filter({ 
      id: sessions[0].user_id, 
      role: 'admin',
      is_active: true 
    });
    
    if (!adminUsers || adminUsers.length === 0) {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Verificar si el username ya existe
    const existingUsers = await base44.asServiceRole.entities.AppUser.filter({ username });
    if (existingUsers && existingUsers.length > 0) {
      return Response.json({ error: 'Username already exists' }, { status: 400 });
    }

    // Hashear password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Crear usuario
    const newUser = await base44.asServiceRole.entities.AppUser.create({
      username,
      password_hash: passwordHash,
      role,
      is_active: true
    });

    return Response.json({
      success: true,
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role
      }
    });

  } catch (error) {
    console.error('Create user error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
});