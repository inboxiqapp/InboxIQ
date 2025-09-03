import express from "express";
import passport from "passport";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import "./auth.js"; // Load Google OAuth strategy
import authRoutes from "./routes/auth.js";
import gmailRoutes from "./routes/gmail.js";

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

app.get("/", (req, res) => {
  res.send("🚀 InboxIQ API is running");
});

app.use("/api/gmail", gmailRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});


