import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";

// Initialize Firebase Admin
admin.initializeApp();

// Import routes
import userRoutes from "./routes/user";
import notesRoutes from "./routes/notes";
import adminRoutes from "./routes/admin";
import paymentsRoutes from "./routes/payments";

// Import triggers
import { onUserCreate } from "./triggers/onUserCreate";

// Express app
const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

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
