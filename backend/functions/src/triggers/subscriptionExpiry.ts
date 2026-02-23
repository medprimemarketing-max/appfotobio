import * as functions from "firebase-functions";
import pool from "../db";
import { sendEmailViaSinaptya } from "../services/emailService";

const FOTOBIO_APP_URL = process.env.FOTOBIO_APP_URL || "https://fbmfonoaudiologia.web.app";

/**
 * Scheduled Cloud Function that runs daily at 09:00 UTC.
 * Checks for premium subscriptions expiring in ~30 days and ~7 days,
 * and sends reminder emails via Sinaptya.
 */
export const subscriptionExpiryCheck = functions.pubsub
  .schedule("every day 09:00")
  .timeZone("UTC")
  .onRun(async () => {
    try {
      // Find users whose subscriptions expire in approximately 30 or 7 days
      const result = await pool.query(
        `SELECT id, email, username, subscription_expires_at
         FROM app_users
         WHERE subscription_type = 'premium'
           AND subscription_expires_at IS NOT NULL
           AND (
             DATE(subscription_expires_at) = CURRENT_DATE + INTERVAL '30 days'
             OR DATE(subscription_expires_at) = CURRENT_DATE + INTERVAL '7 days'
           )`
      );

      if (result.rows.length === 0) {
        console.log("[SubscriptionExpiry] No expiring subscriptions found today.");
        return;
      }

      console.log(`[SubscriptionExpiry] Found ${result.rows.length} expiring subscriptions.`);

      for (const user of result.rows) {
        const expiresAt = new Date(user.subscription_expires_at);
        const now = new Date();
        const daysRemaining = Math.ceil(
          (expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        await sendEmailViaSinaptya({
          type: "subscription_expiry",
          to: user.email,
          data: {
            userName: user.username || user.email.split("@")[0],
            expiresAt: expiresAt.toLocaleDateString("es-AR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            daysRemaining,
            renewalLink: `${FOTOBIO_APP_URL}/Suscripcion`,
          },
        });
      }

      console.log("[SubscriptionExpiry] All expiry emails processed.");
    } catch (error) {
      console.error("[SubscriptionExpiry] Error:", error);
    }
  });
