import { Router, Request, Response } from "express";
import { AuthRequest, requireAuth } from "../middleware/auth";
import { createHmac, timingSafeEqual } from "crypto";
import { z } from "zod";
import pool from "../db";
import { sendEmailViaSinaptya } from "../services/emailService";

const router = Router();

// Zod schemas
const captureOrderSchema = z.object({
  orderId: z.string().min(1, "orderId is required"),
});

// Verify MercadoPago webhook signature
function verifyMercadoPagoSignature(req: Request): boolean {
  const webhookSecret = process.env.MERCADOPAGO_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error(
      "MERCADOPAGO_WEBHOOK_SECRET not configured - rejecting webhook"
    );
    return false;
  }

  const xSignature = req.headers["x-signature"] as string | undefined;
  const xRequestId = req.headers["x-request-id"] as string | undefined;

  if (!xSignature || !xRequestId) {
    return false;
  }

  // Parse x-signature: "ts=TIMESTAMP,v1=HASH"
  const parts: Record<string, string> = {};
  for (const part of xSignature.split(",")) {
    const [key, value] = part.split("=", 2);
    if (key && value) {
      parts[key.trim()] = value.trim();
    }
  }

  const ts = parts["ts"];
  const v1 = parts["v1"];

  if (!ts || !v1) {
    return false;
  }

  const dataId = req.body?.data?.id;
  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
  const hmac = createHmac("sha256", webhookSecret).update(manifest).digest("hex");

  // Use timing-safe comparison to prevent timing attacks
  try {
    const hmacBuffer = Buffer.from(hmac, "hex");
    const v1Buffer = Buffer.from(v1, "hex");
    if (hmacBuffer.length !== v1Buffer.length) return false;
    return timingSafeEqual(hmacBuffer, v1Buffer);
  } catch {
    return false;
  }
}

// ==================== MercadoPago ====================

// POST /api/payments/mercadopago/create-preference
router.post(
  "/mercadopago/create-preference",
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    try {
      const { MercadoPagoConfig, Preference } = await import("mercadopago");

      const client = new MercadoPagoConfig({
        accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
      });

      const preference = new Preference(client);

      const result = await preference.create({
        body: {
          items: [
            {
              id: "fotobio-premium",
              title: "FBM Fonoaudiologia - Suscripcion Premium",
              quantity: 1,
              unit_price: 9.99,
              currency_id: "USD",
            },
          ],
          back_urls: {
            success: `${req.headers.origin}/Suscripcion?status=success`,
            failure: `${req.headers.origin}/Suscripcion?status=failure`,
            pending: `${req.headers.origin}/Suscripcion?status=pending`,
          },
          auto_return: "approved" as any,
          external_reference: req.userId,
          notification_url: `${req.headers.origin}/api/payments/mercadopago/webhook`,
        },
      });

      // Record payment attempt
      await pool.query(
        `INSERT INTO payment_records (user_id, provider, external_id, amount, currency, status, metadata)
         VALUES ($1, 'mercadopago', $2, 9.99, 'USD', 'pending', $3)`,
        [req.userId, result.id, JSON.stringify({ preference_id: result.id })]
      );

      return res.json({ init_point: result.init_point, id: result.id });
    } catch (error) {
      console.error("MercadoPago create-preference error:", error);
      return res.status(500).json({ error: "Failed to create payment preference" });
    }
  }
);

// POST /api/payments/mercadopago/webhook
router.post("/mercadopago/webhook", async (req: Request, res: Response) => {
  try {
    // Verify webhook signature
    if (!verifyMercadoPagoSignature(req)) {
      console.error("MercadoPago webhook signature verification failed");
      return res.sendStatus(401);
    }

    const { type, data } = req.body;

    if (type === "payment") {
      const { MercadoPagoConfig, Payment } = await import("mercadopago");

      const client = new MercadoPagoConfig({
        accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || "",
      });

      const paymentApi = new Payment(client);
      const payment = await paymentApi.get({ id: data.id });

      if (payment.status === "approved" && payment.external_reference) {
        const userId = payment.external_reference;

        // Validate user exists
        const userCheck = await pool.query(
          "SELECT id FROM app_users WHERE id = $1 AND is_active = true",
          [userId]
        );
        if (userCheck.rows.length === 0) {
          console.error(`MercadoPago webhook: user not found - userId=${userId}`);
          return res.sendStatus(200);
        }

        // Deduplication: check if this payment was already processed
        const existingPayment = await pool.query(
          `SELECT id FROM payment_records
           WHERE provider = 'mercadopago' AND external_id = $1 AND status = 'approved'`,
          [String(data.id)]
        );
        if (existingPayment.rows.length > 0) {
          console.warn(`MercadoPago webhook: payment already processed - id=${data.id}`);
          return res.sendStatus(200);
        }

        // Update subscription
        await pool.query(
          `UPDATE app_users
           SET subscription_type = 'premium',
               subscription_expires_at = NOW() + INTERVAL '1 year',
               updated_at = NOW()
           WHERE id = $1`,
          [userId]
        );

        // Update payment record
        await pool.query(
          `UPDATE payment_records
           SET status = 'approved', external_id = $1, metadata = metadata || $2
           WHERE user_id = $3 AND provider = 'mercadopago' AND status = 'pending'
           ORDER BY created_at DESC LIMIT 1`,
          [
            String(data.id),
            JSON.stringify({ payment_status: payment.status }),
            userId,
          ]
        );

        // Audit log
        await pool.query(
          `INSERT INTO audit_log (user_id, action, resource_type, details)
           VALUES ($1, 'payment_approved', 'subscription', $2)`,
          [userId, JSON.stringify({ provider: "mercadopago", payment_id: data.id })]
        );

        // Send purchase confirmation email
        const userResult = await pool.query(
          `SELECT email, username FROM app_users WHERE id = $1`,
          [userId]
        );
        if (userResult.rows.length > 0) {
          const user = userResult.rows[0];
          const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
          sendEmailViaSinaptya({
            type: "purchase_confirmation",
            to: user.email,
            data: {
              userName: user.username || user.email.split("@")[0],
              planName: "Premium Anual",
              amount: 9.99,
              currency: "USD",
              provider: "mercadopago",
              expiresAt: expiresAt.toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              transactionId: String(data.id),
            },
          });
        }
      }
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error("MercadoPago webhook error:", error);
    return res.sendStatus(200); // Always return 200 to avoid retries
  }
});

// ==================== PayPal ====================

// POST /api/payments/paypal/create-order
router.post(
  "/paypal/create-order",
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    try {
      const clientId = process.env.PAYPAL_CLIENT_ID || "";
      const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "";
      const mode = process.env.PAYPAL_MODE || "sandbox";
      const baseUrl =
        mode === "sandbox"
          ? "https://api-m.sandbox.paypal.com"
          : "https://api-m.paypal.com";

      // Get access token
      const authResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
      });
      const authData = await authResponse.json() as any;

      // Create order
      const orderResponse = await fetch(`${baseUrl}/v2/checkout/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.access_token}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: { currency_code: "USD", value: "9.99" },
              description: "FBM Fonoaudiologia - Suscripcion Premium",
              custom_id: req.userId,
            },
          ],
        }),
      });
      const order = await orderResponse.json() as any;

      // Record payment attempt
      await pool.query(
        `INSERT INTO payment_records (user_id, provider, external_id, amount, currency, status, metadata)
         VALUES ($1, 'paypal', $2, 9.99, 'USD', 'pending', $3)`,
        [req.userId, order.id, JSON.stringify({ order_id: order.id })]
      );

      return res.json({ id: order.id, status: order.status });
    } catch (error) {
      console.error("PayPal create-order error:", error);
      return res.status(500).json({ error: "Failed to create PayPal order" });
    }
  }
);

// POST /api/payments/paypal/capture-order
router.post(
  "/paypal/capture-order",
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    try {
      const parsed = captureOrderSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors[0].message });
      }
      const { orderId } = parsed.data;

      // Verify this order belongs to the authenticated user (deduplication + ownership)
      const orderCheck = await pool.query(
        `SELECT id, status FROM payment_records
         WHERE provider = 'paypal' AND external_id = $1 AND user_id = $2`,
        [orderId, req.userId]
      );
      if (orderCheck.rows.length === 0) {
        return res.status(403).json({ error: "Order not found or access denied" });
      }
      if (orderCheck.rows[0].status === "approved") {
        return res.json({ status: "COMPLETED", subscription_active: true });
      }

      const clientId = process.env.PAYPAL_CLIENT_ID || "";
      const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "";
      const mode = process.env.PAYPAL_MODE || "sandbox";
      const baseUrl =
        mode === "sandbox"
          ? "https://api-m.sandbox.paypal.com"
          : "https://api-m.paypal.com";

      // Get access token
      const authResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
      });
      const authData = await authResponse.json() as any;

      // Capture order
      const captureResponse = await fetch(
        `${baseUrl}/v2/checkout/orders/${orderId}/capture`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authData.access_token}`,
          },
        }
      );
      const captureData = await captureResponse.json() as any;

      if (captureData.status === "COMPLETED") {
        // Update subscription
        await pool.query(
          `UPDATE app_users
           SET subscription_type = 'premium',
               subscription_expires_at = NOW() + INTERVAL '1 year',
               updated_at = NOW()
           WHERE id = $1`,
          [req.userId]
        );

        // Update payment record
        await pool.query(
          `UPDATE payment_records SET status = 'approved', metadata = metadata || $1
           WHERE user_id = $2 AND provider = 'paypal' AND external_id = $3`,
          [
            JSON.stringify({ capture_status: captureData.status }),
            req.userId,
            orderId,
          ]
        );

        // Audit log
        await pool.query(
          `INSERT INTO audit_log (user_id, action, resource_type, details)
           VALUES ($1, 'payment_approved', 'subscription', $2)`,
          [req.userId, JSON.stringify({ provider: "paypal", order_id: orderId })]
        );

        // Send purchase confirmation email
        const userResult = await pool.query(
          `SELECT email, username FROM app_users WHERE id = $1`,
          [req.userId]
        );
        if (userResult.rows.length > 0) {
          const user = userResult.rows[0];
          const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
          sendEmailViaSinaptya({
            type: "purchase_confirmation",
            to: user.email,
            data: {
              userName: user.username || user.email.split("@")[0],
              planName: "Premium Anual",
              amount: 9.99,
              currency: "USD",
              provider: "paypal",
              expiresAt: expiresAt.toLocaleDateString("es-AR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              transactionId: orderId,
            },
          });
        }
      }

      return res.json({
        status: captureData.status,
        subscription_active: captureData.status === "COMPLETED",
      });
    } catch (error) {
      console.error("PayPal capture-order error:", error);
      return res.status(500).json({ error: "Failed to capture PayPal order" });
    }
  }
);

// ==================== Sinaptya Webhook ====================

const sinaptyaWebhookSchema = z.object({
  email: z.string().email("Invalid email"),
});

// POST /api/payments/sinaptya/webhook - Sinaptya notifies a successful payment
router.post("/sinaptya/webhook", async (req: Request, res: Response) => {
  const secret = process.env.SINAPTYA_WEBHOOK_SECRET;
  if (!secret || req.headers["x-webhook-secret"] !== secret) {
    console.error("Sinaptya webhook: invalid or missing secret");
    return res.sendStatus(401);
  }

  const parsed = sinaptyaWebhookSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.errors[0].message });
  }

  const { email } = parsed.data;

  try {
    // Find user by email
    const userResult = await pool.query(
      "SELECT id, subscription_type FROM app_users WHERE email = $1 AND is_active = true",
      [email]
    );

    if (userResult.rows.length === 0) {
      console.error(`Sinaptya webhook: user not found - email=${email}`);
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResult.rows[0];

    // Update subscription to premium for 1 year
    await pool.query(
      `UPDATE app_users
       SET subscription_type = 'premium',
           subscription_expires_at = NOW() + INTERVAL '1 year',
           updated_at = NOW()
       WHERE id = $1`,
      [user.id]
    );

    // Record payment
    await pool.query(
      `INSERT INTO payment_records (user_id, provider, amount, currency, status, metadata)
       VALUES ($1, 'sinaptya', 0, 'USD', 'approved', $2)`,
      [user.id, JSON.stringify({ source: "sinaptya_webhook", email })]
    );

    // Audit log
    await pool.query(
      `INSERT INTO audit_log (user_id, action, resource_type, details)
       VALUES ($1, 'payment_approved', 'subscription', $2)`,
      [user.id, JSON.stringify({ provider: "sinaptya", email })]
    );

    console.log(`Sinaptya webhook: subscription activated for ${email}`);
    return res.json({ success: true, email, subscription_type: "premium" });
  } catch (error) {
    console.error("Sinaptya webhook error:", error);
    return res.sendStatus(500);
  }
});

export default router;
