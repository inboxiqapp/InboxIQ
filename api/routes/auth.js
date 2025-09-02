import express from "express";
import passport from "passport";

const router = express.Router();

// Step 1: Kick off Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "openid",
      "profile",
      "email",
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/gmail.labels"
    ],
    accessType: "offline",
    prompt: "consent"
  })
);

// Step 2: Handle callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Redirect to your frontend app
    res.redirect("https://inboxiqappweb.vercel.app/");
  }
);

// Expose a /me route for frontend
router.get("/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not logged in" });
  }
  res.json({ email: req.user.email });
});

export default router;
