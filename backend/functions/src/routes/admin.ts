import { Router } from "express";
import * as admin from "firebase-admin";
import { AuthRequest, requireAuth, requireAdmin } from "../middleware/auth";
import { z } from "zod";
import pool from "../db";

const router = Router();

// Zod schemas
const createUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  username: z.string().optional(),
  role: z.enum(["user", "admin"]).default("user"),
});

// POST /api/admin/users - Create a new user (admin only)
router.post("/users", requireAuth, requireAdmin, async (req: AuthRequest, res) => {
  const parsed = createUserSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { email, password, username, role } = parsed.data;

  try {
    // Create Firebase Auth user
    const firebaseUser = await admin.auth().createUser({
      email,
      password,
      emailVerified: false,
    });

    // Create app_users row
    const result = await pool.query(
      `INSERT INTO app_users (firebase_uid, email, username, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, firebase_uid, email, username, role, created_at`,
      [firebaseUser.uid, email, username || null, role]
    );

    // Audit log
    await pool.query(
      `INSERT INTO audit_log (user_id, action, resource_type, resource_id, details)
       VALUES ($1, 'admin_create_user', 'user', $2, $3)`,
      [req.userId, result.rows[0].id, JSON.stringify({ email, username, role })]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error("Error creating user:", error);
    if (error.code === "auth/email-already-exists") {
      return res.status(409).json({ error: "Email already registered" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/admin/export - Export standalone data (admin only)
router.post("/export", requireAuth, requireAdmin, async (req: AuthRequest, res) => {
  try {
    // Check if an export was done recently (max 1 per hour)
    const recentExport = await pool.query(
      `SELECT created_at FROM audit_log
       WHERE user_id = $1 AND action = 'export_standalone'
         AND created_at > NOW() - INTERVAL '1 hour'
       LIMIT 1`,
      [req.userId]
    );
    if (recentExport.rows.length > 0) {
      return res.status(429).json({ error: "Export limit: 1 per hour. Try again later." });
    }

    // Fetch all users (exclude sensitive fields)
    const users = await pool.query(
      "SELECT id, email, username, role, subscription_type, created_at FROM app_users WHERE is_active = true"
    );

    // Fetch all notes
    const notes = await pool.query(
      "SELECT id, pathology_id, content, images, created_at FROM clinical_notes"
    );

    // Fetch payment records (exclude external_id for security)
    const payments = await pool.query(
      "SELECT id, user_id, provider, amount, currency, status, created_at FROM payment_records"
    );

    // Audit log with IP
    await pool.query(
      `INSERT INTO audit_log (user_id, action, resource_type, details)
       VALUES ($1, 'export_standalone', 'system', $2)`,
      [req.userId, JSON.stringify({
        users: users.rowCount,
        notes: notes.rowCount,
        ip: req.ip || req.headers["x-forwarded-for"],
      })]
    );

    return res.json({
      exported_at: new Date().toISOString(),
      users: users.rows,
      clinical_notes: notes.rows,
      payment_records: payments.rows,
    });
  } catch (error) {
    console.error("Error exporting:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
