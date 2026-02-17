import * as functions from "firebase-functions";
import pool from "../db";

/**
 * Firebase Auth trigger: when a new user is created in Firebase Auth,
 * auto-create a row in app_users table.
 */
export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  try {
    await pool.query(
      `INSERT INTO app_users (firebase_uid, email, username)
       VALUES ($1, $2, $3)
       ON CONFLICT (firebase_uid) DO NOTHING`,
      [user.uid, user.email, user.email?.split("@")[0] || null]
    );
    console.log(`Created app_users row for ${user.email}`);
  } catch (error) {
    console.error("Error creating app_users row:", error);
  }
});
