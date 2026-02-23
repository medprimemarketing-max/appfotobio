import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import pool from "../db";
import { sendEmailViaSinaptya } from "../services/emailService";

/**
 * Firebase Auth trigger: when a new user is created in Firebase Auth,
 * auto-create a row in app_users table and send verification email via Sinaptya.
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

    // Send verification email via Sinaptya/Resend
    if (user.email) {
      try {
        const verificationLink = await admin.auth().generateEmailVerificationLink(user.email);
        await sendEmailViaSinaptya({
          type: "verification",
          to: user.email,
          data: {
            userName: user.email.split("@")[0],
            verificationLink,
          },
        });
      } catch (emailError) {
        console.error("Error sending verification email:", emailError);
      }
    }
  } catch (error) {
    console.error("Error creating app_users row:", error);
  }
});
