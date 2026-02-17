import { Router, Request, Response } from "express";
import { AuthRequest, requireAuth } from "../middleware/auth";
import pool from "../db";

const router = Router();

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
      const { orderId } = req.body;
      if (!orderId) {
        return res.status(400).json({ error: "orderId is required" });
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

export default router;
