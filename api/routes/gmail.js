import express from "express";
import { google } from "googleapis";

const router = express.Router();

router.get("/messages", async (req, res) => {
  try {
    const { accessToken } = req.query;

    if (!accessToken) {
      return res.status(400).json({ error: "Missing accessToken" });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    // Fetch last 10 emails
    const { data } = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
    });

    const emails = await Promise.all(
      (data.messages || []).map(async (msg) => {
        const full = await gmail.users.messages.get({
          userId: "me",
          id: msg.id,
          format: "metadata",
          metadataHeaders: ["Subject", "From", "Date"],
        });

        const headers = full.data.payload.headers.reduce((acc, h) => {
          acc[h.name.toLowerCase()] = h.value;
          return acc;
        }, {});

        return {
          id: msg.id,
          subject: headers.subject,
          from: headers.from,
          date: headers.date,
        };
      })
    );

    res.json(emails);
  } catch (err) {
    console.error("❌ Error fetching Gmail messages:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
