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

// POST /api/admin/bootstrap - One-time endpoint to sync Firebase Auth users and promote to admin
// Protected by ADMIN_BOOTSTRAP_SECRET env var. Remove after use.
router.post("/bootstrap", async (req, res) => {
  const secret = process.env.ADMIN_BOOTSTRAP_SECRET;
  if (!secret || req.headers["x-bootstrap-secret"] !== secret) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { emails } = req.body;
  if (!Array.isArray(emails) || emails.length === 0) {
    return res.status(400).json({ error: "emails array required" });
  }

  try {
    const results: any[] = [];

    for (const email of emails) {
      try {
        // Get Firebase Auth user
        const firebaseUser = await admin.auth().getUserByEmail(email);

        // Upsert into app_users
        await pool.query(
          `INSERT INTO app_users (firebase_uid, email, role)
           VALUES ($1, $2, 'admin')
           ON CONFLICT (email) DO UPDATE SET role = 'admin', updated_at = NOW()`,
          [firebaseUser.uid, email]
        );

        results.push({ email, status: "admin", firebase_uid: firebaseUser.uid });
      } catch (err: any) {
        results.push({ email, status: "error", message: err.message });
      }
    }

    return res.json({ results });
  } catch (error) {
    console.error("Bootstrap error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
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

// GET /api/admin/users - List all users with subscription and role
router.get("/users", requireAuth, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const result = await pool.query(
      `SELECT id, firebase_uid, email, username, role, subscription_type,
              subscription_expires_at, is_active, created_at, updated_at
       FROM app_users
       ORDER BY created_at DESC`
    );
    return res.json(result.rows);
  } catch (error) {
    console.error("Error listing users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/admin/users/:id/subscription - Activate/modify subscription manually
router.put("/users/:id/subscription", requireAuth, requireAdmin, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const schema = z.object({
    subscription_type: z.enum(["free", "premium_annual"]),
    active: z.boolean(),
    duration_days: z.number().int().min(1).max(730).optional(),
    start_date: z.string().optional(),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { subscription_type, active, duration_days, start_date } = parsed.data;

  try {
    let expiresAt: string | null = null;

    if (active && subscription_type === "premium_annual") {
      const startFrom = start_date ? new Date(start_date) : new Date();
      const days = duration_days || 365;
      expiresAt = new Date(startFrom.getTime() + days * 24 * 60 * 60 * 1000).toISOString();
    }

    const result = await pool.query(
      `UPDATE app_users
       SET subscription_type = $1,
           subscription_expires_at = $2,
           is_active = $3,
           updated_at = NOW()
       WHERE id = $4
       RETURNING id, email, subscription_type, subscription_expires_at, is_active`,
      [subscription_type, expiresAt, active, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    await pool.query(
      `INSERT INTO audit_log (user_id, action, resource_type, resource_id, details)
       VALUES ($1, 'admin_update_subscription', 'user', $2, $3)`,
      [req.userId, id, JSON.stringify({ subscription_type, active, duration_days, start_date })]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating subscription:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/admin/users/:id/role - Change user role
router.put("/users/:id/role", requireAuth, requireAdmin, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const schema = z.object({
    role: z.enum(["user", "admin"]),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { role } = parsed.data;

  try {
    const result = await pool.query(
      `UPDATE app_users SET role = $1, updated_at = NOW()
       WHERE id = $2
       RETURNING id, email, role`,
      [role, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    await pool.query(
      `INSERT INTO audit_log (user_id, action, resource_type, resource_id, details)
       VALUES ($1, 'admin_update_role', 'user', $2, $3)`,
      [req.userId, id, JSON.stringify({ role })]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating role:", error);
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
