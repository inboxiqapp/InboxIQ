import express from "express";
import passport from "passport";
import session from "cookie-session";
import dotenv from "dotenv";
import "./auth.js"; // Load Google OAuth strategy
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Session middleware
app.use(
  session({
    name: "session",
    keys: ["inboxiq-secret"],
    maxAge: 24 * 60 * 60 * 1000
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("🚀 InboxIQ API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
