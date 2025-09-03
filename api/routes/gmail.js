// api/routes/gmail.js
import express from "express";
import { google } from "googleapis";

const router = express.Router();

// Middleware: require authentication
function ensureAuth(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// Fetch Gmail messages
router.get("/messages", ensureAuth, async (req, res) => {
  try {
    const { accessToken } = req.user; // comes from Passport session

    const gmail = google.gmail({ version: "v1" });
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
      auth: new google.auth.OAuth2().setCredentials({
        access_token: accessToken,
      }),
    });

    const messages = response.data.messages || [];

    // Fetch details for each message
    const detailed = await Promise.all(
      messages.map(async (msg) => {
        const m = await gmail.users.messages.get({
          userId: "me",
          id: msg.id,
          auth: new google.auth.OAuth2().setCredentials({
            access_token: accessToken,
          }),
        });

        const headers = m.data.payload.headers;
        const subject = headers.find((h) => h.name === "Subject")?.value || "";
        const from = headers.find((h) => h.name === "From")?.value || "";
        const date = headers.find((h) => h.name === "Date")?.value || "";

        return { id: msg.id, subject, from, date };
      })
    );

    res.json(detailed);
  } catch (err) {
    console.error("❌ Gmail fetch error:", err);
    res.status(500).json({ error: "Failed to fetch Gmail messages" });
  }
});

export default router;
