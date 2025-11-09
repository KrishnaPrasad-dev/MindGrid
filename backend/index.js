const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const UserRouter = require('./Routes/UserRouter');  // Import UserRouter
require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

// CORS setup
const allowedOrigins = [
  'https://mindgrid-gnu.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174'
];

app.use(
  cors({
    origin: function (origin, callback) {
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

app.options(/.*/, cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('MindGrid backend is running ✅');
});

app.get('/ping', (req, res) => {
  res.send('PONG');
});

// Mount routers normally
app.use('/auth', AuthRouter);
app.use('/users', UserRouter);  // Mount UserRouter

// Export for Vercel
module.exports = app;

// Listen for local dev only
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
}
