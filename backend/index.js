// index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const contributionRoutes = require("./Routes/Contribution");


const { connectToMongoose } = require('./Models/db'); // ✅ FIX
connectToMongoose().catch(console.error);              // ✅ FIX

const AuthRouter = require('./Routes/AuthRouter');
const MembersRouter = require('./Routes/MembersRouter');
const ProfileRouter = require('./Routes/ProfileRouter');
const ProjectRouter = require("./Routes/ProjectRouter");

const PORT = process.env.PORT || 8080;

// CORS
const allowedOrigins = [
  'https://mindgrid-gnu.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174'
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/', (req, res) => {
  res.send('MindGrid backend is running ✅');
});

app.get('/ping', (req, res) => {
  res.send('PONG');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/auth', AuthRouter);
app.use('/members', MembersRouter);
app.use('/api', ProfileRouter);
app.use("/api/contributions", contributionRoutes);
app.use("/api", ProjectRouter);


module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
}
