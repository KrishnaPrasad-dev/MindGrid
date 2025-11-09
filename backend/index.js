// index.js (replace your current file with this)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./Models/db'); // make sure this connects mongoose
const AuthRouter = require('./Routes/AuthRouter');
const UserRouter = require('./Routes/UserRoutes');

const app = express();
const PORT = process.env.PORT || 8080;

// Allowed origins (exact hostnames)
const allowedOrigins = [
  'https://mindgrid-gnu.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174'
];

// CORS - must be before routes
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (curl, mobile) or from allowedOrigins
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    console.warn('CORS blocked origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight
// fixed — use a RegExp to match any path
app.options(/.*/, cors());

// JSON parser
app.use(bodyParser.json());

// Basic routes
app.get('/', (req, res) => res.send('MindGrid backend is running ✅'));
app.get('/ping', (req, res) => res.send('PONG'));

// Mount routers
app.use('/auth', AuthRouter);
app.use('/users', UserRouter);

// Global error handler (ensures CORS header is present even on errors)
app.use((err, req, res, next) => {
  console.error('Global handler error:', err && err.message);
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.status(500).json({ success:false, message: err?.message || 'Server error' });
});

// Only start a long-lived server when running locally (not on Vercel)

if (require.main === module && !process.env.VERCEL) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}
