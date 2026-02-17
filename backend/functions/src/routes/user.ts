import { Router } from "express";
import { AuthRequest, requireAuth } from "../middleware/auth";
import pool from "../db";

const router = Router();

// GET /api/user/me - Get current user profile
router.get("/me", requireAuth, async (req: AuthRequest, res) => {
  try {
    const result = await pool.query(
      `SELECT id, firebase_uid, username, email, role, preferred_language,
              is_active, subscription_type, subscription_expires_at,
              created_at, updated_at
       FROM app_users WHERE id = $1`,
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];

    // Check if subscription is still active
    if (
      user.subscription_type !== "free" &&
      user.subscription_expires_at &&
      new Date(user.subscription_expires_at) < new Date()
    ) {
      // Subscription expired, downgrade to free
      await pool.query(
        "UPDATE app_users SET subscription_type = 'free', updated_at = NOW() WHERE id = $1",
        [req.userId]
      );
      user.subscription_type = "free";
    }

    return res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /api/user/language - Update preferred language
router.put("/language", requireAuth, async (req: AuthRequest, res) => {
  const { language } = req.body;

  if (!language || !["es", "en", "pt"].includes(language)) {
    return res.status(400).json({ error: "Invalid language. Must be es, en, or pt" });
  }

  try {
    await pool.query(
      "UPDATE app_users SET preferred_language = $1, updated_at = NOW() WHERE id = $2",
      [language, req.userId]
    );

    // Audit log
    await pool.query(
      `INSERT INTO audit_log (user_id, action, resource_type, details)
       VALUES ($1, 'update_language', 'user', $2)`,
      [req.userId, JSON.stringify({ language })]
    );

    return res.json({ success: true, language });
  } catch (error) {
    console.error("Error updating language:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/user/subscription - Get subscription status
router.get("/subscription", requireAuth, async (req: AuthRequest, res) => {
  try {
    const result = await pool.query(
      `SELECT subscription_type, subscription_expires_at FROM app_users WHERE id = $1`,
      [req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const { subscription_type, subscription_expires_at } = result.rows[0];
    const isActive =
      subscription_type !== "free" &&
      subscription_expires_at &&
      new Date(subscription_expires_at) > new Date();

    return res.json({
      subscription_type,
      subscription_expires_at,
      is_active: isActive || subscription_type === "free",
    });
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
