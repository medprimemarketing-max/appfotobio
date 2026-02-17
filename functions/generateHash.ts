import bcrypt from 'npm:bcryptjs@2.4.3';

Deno.serve(async (req) => {
  try {
    const { password } = await req.json();
    
    if (!password) {
      return Response.json({ error: 'Password required' }, { status: 400 });
    }
    
    const hash = bcrypt.hashSync(password, 10);
    
    return Response.json({ hash, password });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});