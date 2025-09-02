const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const emailRoutes = require('./routes/email');

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 API running on port ${PORT}`));