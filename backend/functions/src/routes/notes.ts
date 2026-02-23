import { Router } from "express";
import { AuthRequest, requireAuth } from "../middleware/auth";
import { z } from "zod";
import pool from "../db";

const router = Router();

// HTML sanitization - strip all tags, attributes, and event handlers
// Notes are stored as plain text, so we aggressively remove all HTML
function sanitizeContent(str: string): string {
  // First decode HTML entities to catch encoded attacks
  let clean = str
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");
  // Remove all HTML tags (including self-closing and malformed)
  clean = clean.replace(/<\/?[^>]+(>|$)/g, "");
  // Remove any remaining event handler patterns
  clean = clean.replace(/on\w+\s*=\s*["'][^"']*["']/gi, "");
  // Remove javascript: protocol
  clean = clean.replace(/javascript\s*:/gi, "");
  // Trim excessive whitespace
  clean = clean.replace(/\s{3,}/g, "  ").trim();
  return clean;
}

// Zod schemas
const getNotesQuerySchema = z.object({
  pathology_id: z.string().max(100, "pathology_id too long"),
});

const createNoteSchema = z.object({
  pathology_id: z.string().min(1).max(100, "pathology_id too long"),
  content: z.string().min(1).max(10000, "content too long"),
  images: z.array(z.string()).max(10, "too many images").optional(),
});

const updateNoteSchema = z.object({
  content: z.string().max(10000, "content too long").optional(),
  images: z.array(z.string()).max(10, "too many images").optional(),
});

// GET /api/notes?pathology_id=X - List notes for current user
router.get("/", requireAuth, async (req: AuthRequest, res) => {
  const parsed = getNotesQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { pathology_id } = parsed.data;

  try {
    const result = await pool.query(
      `SELECT id, pathology_id, content, images, created_at, updated_at
       FROM clinical_notes
       WHERE pathology_id = $1 AND user_id = $2
       ORDER BY created_at DESC`,
      [pathology_id, req.userId]
    );

    return res.json(result.rows);
  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/notes - Create a new clinical note
router.post("/", requireAuth, async (req: AuthRequest, res) => {
  const parsed = createNoteSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { pathology_id, images } = parsed.data;
  const content = sanitizeContent(parsed.data.content);

  try {
    const result = await pool.query(
      `INSERT INTO clinical_notes (pathology_id, user_id, user_identifier, content, images)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, pathology_id, content, images, created_at, updated_at`,
      [
        pathology_id,
        req.userId,
        req.userEmail,
        content,
        JSON.stringify(images || []),
      ]
    );

    // Audit log
    await pool.query(
      `INSERT INTO audit_log (user_id, action, resource_type, resource_id, details)
       VALUES ($1, 'create', 'clinical_note', $2, $3)`,
      [
        req.userId,
        result.rows[0].id,
        JSON.stringify({ pathology_id }),
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/notes/:id - Update a clinical note
router.put("/:id", requireAuth, async (req: AuthRequest, res) => {
  const { id } = req.params;

  const parsed = updateNoteSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { images } = parsed.data;
  const content = parsed.data.content !== undefined
    ? sanitizeContent(parsed.data.content)
    : undefined;

  try {
    // Verify ownership
    const existing = await pool.query(
      "SELECT id FROM clinical_notes WHERE id = $1 AND user_id = $2",
      [id, req.userId]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Note not found or access denied" });
    }

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (content !== undefined) {
      updates.push(`content = $${paramIndex++}`);
      values.push(content);
    }
    if (images !== undefined) {
      updates.push(`images = $${paramIndex++}`);
      values.push(JSON.stringify(images));
    }
    updates.push(`updated_at = NOW()`);

    values.push(id);
    const query = `UPDATE clinical_notes SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING id, pathology_id, content, images, created_at, updated_at`;

    const result = await pool.query(query, values);

    // Audit log
    await pool.query(
      `INSERT INTO audit_log (user_id, action, resource_type, resource_id, details)
       VALUES ($1, 'update', 'clinical_note', $2, $3)`,
      [req.userId, id, JSON.stringify({ content: content !== undefined, images: images !== undefined })]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /api/notes/:id - Delete a clinical note
router.delete("/:id", requireAuth, async (req: AuthRequest, res) => {
  const { id } = req.params;

  try {
    // Verify ownership
    const existing = await pool.query(
      "SELECT id, pathology_id FROM clinical_notes WHERE id = $1 AND user_id = $2",
      [id, req.userId]
    );

    if (existing.rows.length === 0) {
      return res.status(404).json({ error: "Note not found or access denied" });
    }

    await pool.query("DELETE FROM clinical_notes WHERE id = $1", [id]);

    // Audit log
    await pool.query(
      `INSERT INTO audit_log (user_id, action, resource_type, resource_id, details)
       VALUES ($1, 'delete', 'clinical_note', $2, $3)`,
      [req.userId, id, JSON.stringify({ pathology_id: existing.rows[0].pathology_id })]
    );

    return res.json({ success: true });
  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
