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
  passport.authenticate("google", { failureRedirect: "/", session: true }),
  (req, res) => {
    // Instead of session, return a token or redirect
    res.redirect("https://inboxiqappweb.vercel.app/inbox");
  }
);

// Expose a /me route for frontend
router.get("/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not logged in" });
  }
  res.json({ email: req.user.email,
             googleId: req.user.googleId
           });
});

// Logout route (with Passport v0.6+ support)
router.get("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      console.error("Logout error:", err);
      return next(err); // Pass to Express error handler
    }
    req.session = null; // Clear cookie-session
    res.clearCookie("session");
    res.redirect("https://inboxiqappweb.vercel.app/"); // Go back to login
  });
});

// Current user
router.get("/me", (req, res) => {
  if (req.user) {
    // Send only what frontend needs
    res.json({ email: req.user.email });
  } else {
    res.status(401).json(null);
  }
});

// Get current logged-in user
router.get("/current_user", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

export default router;





