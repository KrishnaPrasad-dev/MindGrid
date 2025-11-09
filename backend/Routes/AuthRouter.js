console.log("⚙️ AuthRouter loaded START");

try {
  const express = require('express');
  const { signup, login } = require('../Controllers/AuthController');
  console.log("✅ AuthController imported");

  const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
  console.log("✅ Validation imported");

  const router = express.Router();

  router.post('/login', loginValidation, login);
  router.post('/signup', signupValidation, signup);

  module.exports = router;
  console.log("✅ AuthRouter exported successfully");
} catch (err) {
  console.error("❌ AuthRouter crashed:", err);
  // Export dummy router so the app still runs
  const express = require('express');
  const router = express.Router();
  router.all('*', (req, res) => res.status(503).json({ error: "AuthRouter crashed", message: err.message }));
  module.exports = router;
}
