const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

// ===== UPDATE THIS CORS SECTION =====
app.use(cors({
  origin: [
    'https://mindgrid-gnu.vercel.app',  // ← Your frontend URL
    'http://localhost:5173',              // For local development
    'http://localhost:5174'               // Backup port
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// ===== END CORS SECTION =====

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("MindGrid backend is running ✅");
});


// Test route
app.get('/ping', (req, res) => {
    res.send("PONG");
});

// Auth routes
app.use('/auth', AuthRouter);

// ✅ Export for Vercel
module.exports = app;

// ✅ Only listen locally
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}
