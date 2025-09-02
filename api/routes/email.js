const express = require('express');
const router = express.Router();

router.get('/inbox', (req, res) => {
  res.json({ message: 'Inbox placeholder' });
});

module.exports = router;