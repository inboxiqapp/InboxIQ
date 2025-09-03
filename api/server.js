import express from "express";
import passport from "passport";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import "./auth.js"; // Load Google OAuth strategy
import authRoutes from "./routes/auth.js";
import gmailRoutes from "./routes/gmail.js";
import cors from "cors";

dotenv.config();

const app = express();

// --- CORS must come first ---
app.use(
  cors({
    origin: "https://inboxiqappweb.vercel.app", // your Vercel frontend
    credentials: true,
  })
);

// --- Secure session middleware ---
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET || "dev-secret"],
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: "none", // required for cross-site cookies
  })
);

// --- Passport setup ---
app.use(passport.initialize());
app.use(passport.session()); // <-- enable sessions!

// --- Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/gmail", gmailRoutes);

// --- Current user endpoints ---
app.get("/api/auth/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json(req.user);
});

app.get("/api/auth/current_user", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  res.json(req.user);
});

// --- Root health check ---
app.get("/", (req, res) => {
  res.send("🚀 InboxIQ API is running");
});

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
