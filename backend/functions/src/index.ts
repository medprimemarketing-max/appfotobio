import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// Initialize Firebase Admin
admin.initializeApp();

// Import routes
import userRoutes from "./routes/user";
import notesRoutes from "./routes/notes";
import adminRoutes from "./routes/admin";
import paymentsRoutes from "./routes/payments";

// Import triggers
import { onUserCreate } from "./triggers/onUserCreate";
import { subscriptionExpiryCheck } from "./triggers/subscriptionExpiry";

// Express app
const app = express();

// CORS whitelist
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : [
      "https://fbmfonoaudiologia.web.app",
      "https://fbmfonoaudiologia.firebaseapp.com",
      "https://fbmfonoaudiologia.com",
      "https://www.fbmfonoaudiologia.com",
      "http://localhost:5173",
    ];

app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "1mb" }));

// General rate limit: 100 requests per 15 minutes per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later" },
});

// Webhook rate limit: 30 requests per 1 minute
const webhookLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests" },
});

// Strict rate limit for sensitive operations (payments, admin)
const sensitiveLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests to sensitive endpoint, please try again later" },
});

app.use("/api/payments/mercadopago/webhook", webhookLimiter);
app.use("/api/admin", sensitiveLimiter);
app.use("/api/payments", sensitiveLimiter);
app.use(generalLimiter);

// Routes
app.use("/api/user", userRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentsRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Export Cloud Function
export const api = functions.https.onRequest(app);

// Export Auth triggers
export const authOnUserCreate = onUserCreate;

// Export scheduled functions
export const scheduledSubscriptionExpiryCheck = subscriptionExpiryCheck;
