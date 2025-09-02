const express = require('express');
const router = express.Router();

// Google OAuth callback placeholder
router.get('/google/callback', (req, res) => {
  res.send('Google OAuth callback handled here.');
});

module.exports = router;