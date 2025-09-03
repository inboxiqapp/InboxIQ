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

// Make sure SESSION_SECRET is set in production
if (!process.env.SESSION_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("❌ SESSION_SECRET must be set in production");
}

// Session middleware
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET || "dev-secret"], // safe fallback in dev only
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    httpOnly: true, // prevent JS access
    secure: process.env.NODE_ENV === "production", // only HTTPS in prod
    sameSite: "lax" // CSRF protection
  })
);

app.use(passport.initialize());
//app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);

// --- Enable CORS so frontend can call API ---
app.use(
  cors({
    origin: "https://inboxiqappweb.vercel.app", // your Vercel frontend
    credentials: true
  })
);

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

app.use("/api/gmail", gmailRoutes);

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


