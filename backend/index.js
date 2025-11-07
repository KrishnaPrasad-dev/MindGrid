const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

// ===== CORS Configuration (Place BEFORE other middleware) =====
app.use(cors({
  origin: [
    'https://mind-grid-krishnaprasad-devs-projects.vercel.app/', // ← Replace with your actual frontend Vercel URL
    'http://localhost:5173', // For local Vite development
    'http://localhost:5174'  // Backup port
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// ===== End CORS Configuration =====

app.use(bodyParser.json());

// Test route
app.get('/ping', (req, res) => {
    res.send("PONG");
});

// Auth routes
app.use('/auth', AuthRouter);

// ===== Export for Vercel (Serverless) =====
module.exports = app;

// ===== Local Development Server Only =====
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}
