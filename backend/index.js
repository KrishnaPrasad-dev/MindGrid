// index.js (safer)
const express = require('express');
const app = express();
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const UserRouter = require('./Routes/UserRouter');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

// ===== SAFE CORS =====
const allowedOrigins = [
  'https://mindgrid-gnu.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174'
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (curl, mobile, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // do NOT throw — reject CORS without crashing
      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.options(/.*/, cors());

// Use express's built-in parser (no need for body-parser)
app.use(express.json());

app.get('/', (req, res) => {
  res.send('MindGrid backend is running ✅');
});

app.get('/ping', (req, res) => res.send('PONG'));

// ---- Lazy/defensive require of DB so we can log errors instead of crashing ----
(async function initDb() {
  try {
    // require can throw synchronously; wrap it
    await require('./Models/db'); // if your db module exports a connect() promise, `await` it
    console.log('DB initialized');
  } catch (err) {
    console.error('DB initialization failed (this will NOT crash the server):', err);
    // Optionally set a flag so you can return 503 on DB-dependent endpoints
    app.locals.dbInitError = err;
  }
})();

// Register routers after DB init attempt (they can still be required lazily if needed)
try {
  app.use('/auth', AuthRouter);
  app.use('/users', UserRouter);
} catch (err) {
  console.error('Error registering routers:', err);
}

// Simple error handler middleware (centralized)
app.use((err, req, res, next) => {
  console.error('Unhandled express error:', err);
  res.status(500).json({ error: 'internal server error', message: err.message });
});

// Top-level crash logging (still exits on severe errors in production; logs help)
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}
