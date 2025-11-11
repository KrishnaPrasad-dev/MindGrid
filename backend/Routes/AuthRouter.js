// Routes/AuthRouter.js
const express = require('express');
const router = express.Router();

try {
  const { signup, login } = require('../Controllers/AuthController');
  const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

  router.post('/login', loginValidation, login);
  router.post('/signup', signupValidation, signup);

  module.exports = router;
} catch (err) {
  console.error('AuthRouter initialization error:', err);
  // fallback router so app still runs
  const fallback = express.Router();
  fallback.all('*', (req, res) => res.status(503).json({ error: 'AuthRouter crashed', message: err.message }));
  module.exports = fallback;
}
