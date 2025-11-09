const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const UserRouter = require('./Routes/UserRouter');
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;


// ===== FIXED CORS SECTION =====
const allowedOrigins = [
  'https://mindgrid-gnu.vercel.app', // ✅ your deployed frontend
  'http://localhost:5173',           // local dev
  'http://localhost:5174'
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// handle preflight requests
app.options(/.*/, cors());
// ===== END CORS SECTION =====

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('MindGrid backend is running ✅');
});

// Test route
app.get('/ping', (req, res) => {
  res.send('PONG');
});

// Auth routes
app.use('/auth', AuthRouter);
// in your main server file (index.js / app.js)
 // adjust path if needed
app.use('/users', UserRouter);



module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}
