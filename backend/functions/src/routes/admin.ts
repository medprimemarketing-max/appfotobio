import { Router } from "express";
import * as admin from "firebase-admin";
import { AuthRequest, requireAuth, requireAdmin } from "../middleware/auth";
import pool from "../db";

const router = Router();

// POST /api/admin/users - Create a new user (admin only)
router.post("/users", requireAuth, requireAdmin, async (req: AuthRequest, res) => {
  const { email, password, username, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  try {
    // Create Firebase Auth user
    const firebaseUser = await admin.auth().createUser({
      email,
      password,
      emailVerified: true,
    });

    // Create app_users row
    const result = await pool.query(
      `INSERT INTO app_users (firebase_uid, email, username, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, firebase_uid, email, username, role, created_at`,
      [firebaseUser.uid, email, username || null, role || "user"]
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
    // Fetch all users
    const users = await pool.query(
      "SELECT id, email, username, role, subscription_type, created_at FROM app_users WHERE is_active = true"
    );

    // Fetch all notes
    const notes = await pool.query(
      "SELECT id, pathology_id, user_identifier, content, images, created_at FROM clinical_notes"
    );

    // Fetch payment records
    const payments = await pool.query(
      "SELECT id, user_id, provider, external_id, amount, currency, status, created_at FROM payment_records"
    );

    // Audit log
    await pool.query(
      `INSERT INTO audit_log (user_id, action, resource_type, details)
       VALUES ($1, 'export_standalone', 'system', $2)`,
      [req.userId, JSON.stringify({ users: users.rowCount, notes: notes.rowCount })]
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
