import { Request, Response, NextFunction } from "express";
import * as admin from "firebase-admin";
import pool from "../db";

export interface AuthRequest extends Request {
  uid?: string;
  userId?: string; // UUID from app_users
  userRole?: string;
  userEmail?: string;
  subscriptionType?: string;
  subscriptionExpiresAt?: Date | null;
}

/**
 * Middleware: verify Firebase ID token and attach user info to request.
 */
export async function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization header" });
  }

  const idToken = authHeader.split("Bearer ")[1];
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    req.uid = decoded.uid;
    req.userEmail = decoded.email;

    // Fetch app_users row
    const result = await pool.query(
      "SELECT id, role, email, subscription_type, subscription_expires_at FROM app_users WHERE firebase_uid = $1 AND is_active = true",
      [decoded.uid]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ error: "User not found in application database" });
    }

    req.userId = result.rows[0].id;
    req.userRole = result.rows[0].role;
    req.userEmail = result.rows[0].email;
    req.subscriptionType = result.rows[0].subscription_type || "free";
    req.subscriptionExpiresAt = result.rows[0].subscription_expires_at;

    return next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

/**
 * Middleware: require active premium subscription (must be used after requireAuth).
 */
export function requirePremium(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (req.subscriptionType === "free" || !req.subscriptionType) {
    return res.status(403).json({ error: "Premium subscription required" });
  }

  // Check if subscription has expired
  if (req.subscriptionExpiresAt && new Date(req.subscriptionExpiresAt) < new Date()) {
    return res.status(403).json({ error: "Premium subscription required" });
  }

  return next();
}

/**
 * Middleware: require admin role (must be used after requireAuth).
 */
export function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (req.userRole !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  return next();
}
