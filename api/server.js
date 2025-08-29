// Express server entrypoint
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/healthz', (req, res) => res.json({status: 'ok'}));
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
