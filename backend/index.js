// index.js — safer entry: lazy require routers & defensive DB init
const express = require('express');
const app = express();
const cors = require('cors');
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
      // allow requests with no origin (curl/non-browser)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      // deny gracefully (client will see CORS blocked, but server won't crash)
      return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.options(/.*/, cors());
app.use(express.json());

// Basic health routes
app.get('/', (req, res) => res.send('MindGrid backend is running ✅'));
app.get('/ping', (req, res) => res.send('PONG'));
app.get('/health', (req, res) =>
  res.json({
    ok: true,
    time: new Date().toISOString(),
    env: {
      JWT_SECRET: !!process.env.JWT_SECRET,
      MONGO_CONN: !!process.env.MONGO_CONN || !!process.env.MONGODB_URI || !!process.env.MONGO_URL
    }
  })
);

// ----- Defensive DB init -----
// Require the DB module safely — handle both sync-throw and promise returns
let dbPromise = Promise.resolve(null);
try {
  const maybe = require('./Models/db');
  if (maybe && typeof maybe.then === 'function') {
    dbPromise = maybe;
  } else {
    dbPromise = Promise.resolve(maybe);
  }
  dbPromise
    .then((res) => {
      if (res) console.log('DB module loaded/resolved');
      else console.log('DB module loaded but returned null/failed to connect');
    })
    .catch((err) => {
      console.error('DB module promise rejected:', err && err.stack ? err.stack : err);
    });
} catch (err) {
  console.error('Requiring ./Models/db threw synchronously:', err && err.stack ? err.stack : err);
  dbPromise = Promise.resolve(null);
}

// ----- Safe router loader -----
// This prevents a router throwing on require from crashing the whole app.
// If a router fails to load, we mount a 503 fallback instead.
function safeUseRouter(mountPath, requirePath) {
  try {
    const router = require(requirePath);
    if (!router) {
      console.warn(`Router ${requirePath} exported falsy value; mounting 503 fallback at ${mountPath}`);
      app.use(mountPath, (req, res) => res.status(503).json({ error: 'Service temporarily unavailable' }));
      return;
    }
    app.use(mountPath, router);
    console.log(`Mounted router ${requirePath} at ${mountPath}`);
  } catch (err) {
    console.error(`Error requiring router ${requirePath}:`, err && err.stack ? err.stack : err);
    app.use(mountPath, (req, res) =>
      res.status(503).json({ error: 'Service temporarily unavailable', detail: `Router ${requirePath} failed to load` })
    );
  }
}

// Mount routers safely
safeUseRouter('/auth', './Routes/AuthRouter');
safeUseRouter('/users', './Routes/UserRouter');

// Example DB-dependent endpoint that respects dbPromise
app.get('/club-members', async (req, res) => {
  const db = await dbPromise;
  if (!db) return res.status(503).json({ error: 'Database not available' });
  try {
    const Members = db.models && db.models.Member ? db.models.Member : null;
    if (!Members) return res.status(500).json({ error: 'Member model not found' });
    const members = await Members.find({}).lean();
    res.json(members);
  } catch (err) {
    console.error('club-members handler error:', err && err.stack ? err.stack : err);
    res.status(500).json({ error: 'internal server error', message: err.message });
  }
});

// centralized error handler
app.use((err, req, res, next) => {
  console.error('Unhandled express error:', err && err.stack ? err.stack : err);
  if (res.headersSent) return next(err);
  res.status(500).json({ error: 'internal server error', message: err && err.message ? err.message : 'unknown' });
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

// top-level crash logging
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason && reason.stack ? reason.stack : reason);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err && err.stack ? err.stack : err);
});
