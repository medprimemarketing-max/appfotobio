import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();

        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { note_id } = await req.json();

        if (!note_id) {
            return Response.json({ error: 'Missing note_id' }, { status: 400 });
        }

        // Verificar ownership de la nota
        const notes = await base44.entities.ClinicalNote.filter({ id: note_id });
        const note = notes[0];

        if (!note) {
            return Response.json({ error: 'Note not found' }, { status: 404 });
        }

        const userIdentifier = user.email || user.username;
        if (note.user_identifier !== userIdentifier) {
            return Response.json({ 
                error: 'Forbidden: You can only delete your own notes',
                audit: {
                    attempted_by: userIdentifier,
                    note_owner: note.user_identifier,
                    note_id: note_id,
                    timestamp: new Date().toISOString()
                }
            }, { status: 403 });
        }

        // Eliminar nota
        await base44.entities.ClinicalNote.delete(note_id);

        return Response.json({ 
            success: true,
            message: 'Note deleted successfully',
            audit: {
                user: userIdentifier,
                note_id: note_id,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});